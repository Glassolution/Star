"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface CodeSnippet {
  id: number;
  x: number;
  y: number;
  text: string;
  delay: number;
}

const codeSnippets = [
  "const star = new Star();",
  "function init() { return true; }",
  "import { useState } from 'react';",
  "console.log('Hello World');",
  "export default function App() {}",
  "const data = await fetch('/api');",
  "if (user.isAuthenticated) { }",
  "return <div>STAR</div>;",
  "const config = { port: 3000 };",
  "async function handleSubmit() {}",
  "type User = { id: string; }",
  "const result = array.map(item => item);",
  "import type { Metadata } from 'next';",
  "const router = useRouter();",
  "useEffect(() => { }, []);",
];

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
}

function generateCodeSnippets(count: number): CodeSnippet[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    delay: Math.random() * 10,
  }));
}

export function StarBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [codes, setCodes] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    setStars(generateStars(30));
    setCodes(generateCodeSnippets(8));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Cursor follower circle */}
      <motion.div
        className="absolute w-12 h-12 border-2 border-[#FFD700] rounded-full"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2)",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[#FFD700]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 215, 0, 0.8), 0 0 ${star.size * 4}px rgba(255, 215, 0, 0.4)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Plus signs */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`plus-${i}`}
          className="absolute text-[#FFD700] text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          +
        </motion.div>
      ))}

      {/* Code snippets */}
      {codes.map((code) => (
        <motion.div
          key={code.id}
          className="absolute text-[#FFD700]/20 font-mono text-xs whitespace-nowrap"
          style={{
            left: `${code.x}%`,
            top: `${code.y}%`,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: [0, 50, 100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: code.delay,
            ease: "linear",
          }}
        >
          {code.text}
        </motion.div>
      ))}

      {/* Labels */}
      <motion.div
        className="absolute top-8 left-8 text-[#FFD700]/30 text-xs font-mono"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        REPLAY
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-8 text-[#FFD700]/30 text-xs font-mono"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        SCAN
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-8 text-[#FFD700]/30 text-xs font-mono"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        API
      </motion.div>
    </div>
  );
}
