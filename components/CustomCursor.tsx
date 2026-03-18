"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      {/* Le point central ultra-brillant */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-screen hidden md:block rounded-full bg-white shadow-[0_0_10px_#fff]"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
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