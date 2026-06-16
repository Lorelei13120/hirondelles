import { useEffect, useRef } from 'react';

/**
 * Hook de parallax vertical sur une image de fond (`background-position`).
 *
 * Ce qu'il fait : fait glisser la `background-position` verticale d'un élément
 * de `from`% à `to`% au fur et à mesure que l'élément traverse le viewport.
 * La glisse est proportionnelle à la progression réelle de l'élément à l'écran,
 * donc elle s'étale sur toute la hauteur scrollable de la section au lieu de
 * saturer en quelques pixels.
 *
 * Choix non-évidents :
 *   - Progression basée sur `getBoundingClientRect()` (et non sur `offsetTop`
 *     mis en cache) : robuste au resize, aux layout shifts et aux éléments
 *     positionnés en `absolute` dont l'`offsetTop` ne reflète pas la position
 *     visuelle.
 *   - `progress` = avancée du scroll entre le moment où l'élément entre par le
 *     bas du viewport et celui où il sort par le haut. Pour un élément en haut
 *     de page (héros), le point d'entrée est clampé à 0 → la glisse démarre à
 *     `from` dès le chargement, sans saut.
 *   - Throttle via `requestAnimationFrame` : au plus une écriture de style par
 *     frame, pour éviter le reflow forcé à chaque événement scroll.
 *   - `prefers-reduced-motion: reduce` → parallax désactivé, position figée à
 *     `from` (état au repos), conformément aux règles d'accessibilité.
 *
 * Invariants à préserver :
 *   - La `background-position` Y initiale du style inline DOIT valoir `from`%
 *     (sinon léger saut entre le rendu serveur/initial et la première frame).
 *   - L'élément ciblé porte `bg-cover` (ou équivalent) pour qu'un déplacement
 *     en % ait un effet visible.
 *
 * @example
 *   const ref = useParallax({ from: 50, to: 0 }); // glisse de 50% vers 0%
 *   <div ref={ref} className="bg-cover"
 *        style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 50%' }} />
 *
 * @param from - Position Y (%) au repos / à l'entrée dans le viewport.
 * @param to   - Position Y (%) atteinte quand l'élément a fini de traverser.
 */
interface ParallaxOptions {
  from: number;
  to: number;
}

export const useParallax = ({ from, to }: ParallaxOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Accessibilité : pas de mouvement si l'utilisateur le demande.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.backgroundPosition = `center ${from}%`;
      return;
    }

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const topAbsolute = rect.top + window.scrollY;

      // Scroll au moment où l'élément entre par le bas (clampé à 0 pour un
      // élément déjà visible en haut de page), et distance totale à parcourir
      // jusqu'à sa sortie par le haut.
      const startScroll = Math.max(0, topAbsolute - viewportH);
      const travel = Math.max(1, topAbsolute + rect.height - startScroll);
      const progress = clamp01((window.scrollY - startScroll) / travel);

      node.style.backgroundPosition = `center ${from + (to - from) * progress}%`;
    };

    const onScroll = () => {
      if (rafId) return; // une seule mise à jour par frame
      rafId = window.requestAnimationFrame(update);
    };

    update(); // position correcte dès le montage (zéro saut)
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [from, to]);

  return ref;
};
