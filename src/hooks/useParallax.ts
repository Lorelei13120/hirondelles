import { useEffect, useRef } from 'react';

/**
 * Hook pour créer un effet parallax au scroll.
 *
 * En mode 'bottom', la background-position glisse entre minPercent et maxPercent
 * au fur et à mesure du scroll. Permet d'isoler la fenêtre visible dans une zone
 * précise de l'image — utile quand le haut ou le bas de la photo doit rester
 * hors champ (ex: ciel dans la moitié haute).
 *
 * Sens du mouvement :
 *   - reverse=false (défaut) : part de maxPercent → glisse vers minPercent.
 *     Visuellement : l'image MONTE dans le cadre (on découvre le haut de la photo).
 *   - reverse=true : part de minPercent → glisse vers maxPercent.
 *     Visuellement : l'image DESCEND dans le cadre (on découvre le bas de la photo).
 *
 * Conseil : aligner `backgroundPosition` initial du style inline sur le point de
 * départ (maxPercent si reverse=false, sinon minPercent) pour éviter un saut au
 * premier événement scroll.
 *
 * @param factor - Amplitude du parallax (0.1 = doux, 0.5 = marqué). Entre 0 et 1.
 * @param positionY - 'center' (translation en px) ou 'bottom' (position en % avec ancrage bas).
 * @param minPercent - Plancher de la position en mode 'bottom' (0-100). Défaut 0.
 * @param maxPercent - Plafond de la position en mode 'bottom' (0-100). Défaut 100.
 * @param reverse - Inverse le sens : démarre à minPercent et glisse vers maxPercent. Défaut false.
 */
export const useParallax = (
  factor: number = 0.5,
  positionY: 'center' | 'bottom' = 'center',
  minPercent: number = 0,
  maxPercent: number = 100,
  reverse: boolean = false,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const elementOffsetRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      // Calculer la position de l'élément une fois
      if (elementOffsetRef.current === 0) {
        elementOffsetRef.current = ref.current.offsetTop;
      }

      // Distance de scroll depuis le haut de la fenêtre
      const scrolled = window.scrollY;

      // Distance depuis la position de l'élément
      const distance = scrolled - elementOffsetRef.current;

      // Appliquer le parallax uniquement si l'élément est visible à l'écran
      if (scrolled >= elementOffsetRef.current - window.innerHeight) {
        if (positionY === 'bottom') {
          // Glisse entre minPercent et maxPercent selon `reverse`, clampé strictement
          // dans [minPercent, maxPercent] pour préserver le cadrage souhaité.
          const start = reverse ? minPercent : maxPercent;
          const sign = reverse ? 1 : -1;
          const raw = start + sign * distance * factor;
          const positionPercent = Math.max(minPercent, Math.min(maxPercent, raw));
          ref.current.style.backgroundPosition = `center ${positionPercent}%`;
        } else {
          ref.current.style.backgroundPosition = `center ${distance * factor}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [factor, positionY, minPercent, maxPercent, reverse]);

  return ref;
};
