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
    
    // Délégation d'événements pour le style "hover" sur les éléments interactifs
    const handleMouseOverOut = (e: MouseEvent) => {
      const isInteractive = (e.target as HTMLElement).closest('a, button, .cursor-pointer, .group');
      if (isInteractive) {
        customCursor.classList.add('hover-active');
      } else {
        customCursor.classList.remove('hover-active');
      }
    };

    document.addEventListener('mouseover', handleMouseOverOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOverOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
