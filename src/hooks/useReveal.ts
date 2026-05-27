import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });

    return () => {
      reveals.forEach(reveal => revealObserver.unobserve(reveal));
    };
  }, []);
}
