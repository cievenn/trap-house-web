import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const customCursor = cursorRef.current;
    
    // Si le curseur n'existe pas ou sur mobile, on arrête
    if (!customCursor || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    let cursorX = clientX;
    let cursorY = clientY;
    
    const handleMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId: number;
    
    // Animation fluide et traînée (Lerp)
    const renderCursor = () => {
      cursorX += (clientX - cursorX) * 0.2;
      cursorY += (clientY - cursorY) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(renderCursor);
    };
    renderCursor();
    
    // Ajout du style "hover" sur les éléments interactifs
    const updateInteractiveElements = () => {
      const interactives = document.querySelectorAll('a, button, .cursor-pointer, .group');
      interactives.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.cursorAttached !== "true") {
          htmlEl.dataset.cursorAttached = "true";
          htmlEl.addEventListener('mouseenter', () => customCursor.classList.add('hover-active'));
          htmlEl.addEventListener('mouseleave', () => customCursor.classList.remove('hover-active'));
        }
      });
    };
    
    updateInteractiveElements();
    
    const observer = new MutationObserver(() => updateInteractiveElements());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
