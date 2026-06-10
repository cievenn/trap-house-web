import { useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** IntersectionObserver threshold (0–1). Default 0.2 */
  threshold?: number;
  /** Extra rootMargin for the observer. Default "0px 0px -50px 0px" */
  rootMargin?: string;
}

/**
 * Composant wrapper d'animation au scroll.
 * Chaque instance gère son propre IntersectionObserver via une ref locale,
 * ce qui fonctionne avec le lazy-loading et les composants ajoutés dynamiquement.
 */
export default function Reveal({
  children,
  threshold = 0.2,
  rootMargin = '0px 0px -50px 0px',
  className = '',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('active');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </div>
  );
}
