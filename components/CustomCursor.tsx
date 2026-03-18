"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Détecte si on survole un lien, un bouton ou un élément avec la classe interactive-element
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest(".interactive-element")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    }
  }, []);

  return (
    <>
      {/* Le point central réactif */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen hidden md:block rounded-full"
        animate={{ 
          x: mousePosition.x - (isHovered ? 12 : 4), 
          y: mousePosition.y - (isHovered ? 12 : 4),
          width: isHovered ? 24 : 8,
          height: isHovered ? 24 : 8,
          backgroundColor: isHovered ? "rgba(0, 242, 255, 0.5)" : "#ffffff",
          boxShadow: isHovered ? "0 0 20px rgba(0, 242, 255, 0.8)" : "0 0 10px #fff"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
      />
      
      {/* Le Spotlight géant qui éclaire la fumée */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen hidden md:block"
        animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      >
        <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.12)_0%,rgba(0,242,255,0.05)_30%,transparent_70%)]" />
      </motion.div>
    </>
  );
};