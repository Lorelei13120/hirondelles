import { useEffect, useRef } from 'react';

/**
 * Hook pour créer un effet parallax au scroll
 * @param factor - Facteur de parallax (0.3 = 30% du scroll). Entre 0 et 1.
 * @returns Ref à attacher à l'élément et valeur du translate calculée
 */
export const useParallax = (factor: number = 0.5) => {
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
        ref.current.style.backgroundPosition = `center ${distance * factor}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [factor]);

  return ref;
};
