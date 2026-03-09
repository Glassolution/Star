"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth spring animation for cursor following
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Check for touch device on mount
    setIsTouchDevice("ontouchstart" in window);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Detect hoverable elements (CTAs)
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cta") ||
        target.closest(".cta") ||
        target.dataset.cursor === "cta" ||
        target.closest("[data-cursor='cta']")
      ) {
        setIsHovering(true);
        // Hide system cursor when hovering over CTAs
        document.body.style.cursor = 'none';
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      // Restore system cursor when leaving CTAs
      document.body.style.cursor = '';
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      // Ensure cursor is restored on unmount
      document.body.style.cursor = '';
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        display: isHovering ? 'block' : 'none',
      }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: isHovering ? 1 : 0.6,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Outer ring - 48px diameter, 2px gold border */}
        <div
          className="w-12 h-12 rounded-full border-2 border-[#FFD000] bg-transparent flex items-center justify-center"
        >
          {/* Center dot - 6px solid gold */}
          <div className="w-[6px] h-[6px] bg-[#FFD000] rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
