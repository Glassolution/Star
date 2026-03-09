"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: "square" | "circle" | "triangle" | "cross" | "diamond";
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

const generateShapes = (count: number): Shape[] => {
  const types: Shape["type"][] = ["square", "circle", "triangle", "cross", "diamond"];
  const shapes: Shape[] = [];

  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 24,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    });
  }

  return shapes;
};

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    setShapes(generateShapes(25));
  }, []);

  const renderShape = (shape: Shape) => {
    const baseClasses = "absolute pointer-events-none";
    const style = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: shape.size,
      height: shape.size,
    };

    switch (shape.type) {
      case "square":
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} border border-white/[0.06]`}
            style={style}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              rotate: [0, shape.rotation + 90, shape.rotation + 180],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      case "circle":
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} rounded-full border border-white/[0.06]`}
            style={style}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: shape.duration * 0.8,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      case "triangle":
        return (
          <motion.div
            key={shape.id}
            className={baseClasses}
            style={{ ...style, width: 0, height: 0 }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              rotate: [0, 120, 240],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(255,255,255,0.04)`,
              }}
            />
          </motion.div>
        );
      case "cross":
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} flex items-center justify-center`}
            style={style}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute w-full h-[1px] bg-white/[0.06]" />
            <div className="absolute w-[1px] h-full bg-white/[0.06]" />
          </motion.div>
        );
      case "diamond":
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} border border-white/[0.06] rotate-45`}
            style={style}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
              rotate: [45, 135, 225],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map(renderShape)}
    </div>
  );
}
