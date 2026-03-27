"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovered = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.2 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovered =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest(".interactive-element");

      if (hovered !== isHovered.current) {
        isHovered.current = hovered;
        if (dotRef.current) {
          dotRef.current.style.width = hovered ? "24px" : "8px";
          dotRef.current.style.height = hovered ? "24px" : "8px";
          dotRef.current.style.backgroundColor = hovered
            ? "rgba(0, 242, 255, 0.5)"
            : "#ffffff";
          dotRef.current.style.boxShadow = hovered
            ? "0 0 20px rgba(0, 242, 255, 0.8)"
            : "0 0 10px #fff";
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen hidden md:block rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px #fff",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen hidden md:block"
        style={{ x: springX, y: springY, translateX: "-250px", translateY: "-250px" }}
      >
        <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.12)_0%,rgba(0,242,255,0.05)_30%,transparent_70%)]" />
      </motion.div>
    </>
  );
};