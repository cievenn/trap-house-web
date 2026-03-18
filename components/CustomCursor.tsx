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
      if (target.closest("a") || target.closest("button") || target.closest(".interactive-element")) {
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
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-screen hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] shadow-[0_0_15px_#00F2FF]" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] mix-blend-screen hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? "rgba(0, 242, 255, 0.8)" : "rgba(0, 242, 255, 0.2)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      >
        <div className={`absolute w-full h-full rounded-full border transition-all duration-300 ${isHovered ? 'bg-[#00F2FF]/10 backdrop-blur-sm' : ''}`} />
      </motion.div>
    </>
  );
};