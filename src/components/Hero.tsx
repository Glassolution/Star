"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Wavy hand-drawn underline SVG component - subtle, natural look
function WavyUnderline({ width, progress }: { width: number; progress: number }) {
  const pathLength = 100;
  
  // Generate a subtle, natural hand-drawn underline
  // Like a quick highlight marker stroke - minimal waviness
  const generateWavyPath = () => {
    // Simple, gentle curve - just a slight natural hand movement
    const points = [
      { x: 0, y: 3.5 },
      { x: 20, y: 4.2 },
      { x: 40, y: 3.8 },
      { x: 60, y: 4.5 },
      { x: 80, y: 3.9 },
      { x: 100, y: 4.1 },
    ];
    
    let d = `M ${points[0].x} ${points[0].y}`;
    
    // Use smooth curves between points for natural look
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` Q ${midX} ${prev.y} ${curr.x} ${curr.y}`;
    }
    
    return d;
  };
  
  const pathD = generateWavyPath();

  return (
    <svg
      viewBox={`0 0 ${pathLength} 8`}
      className="absolute left-0 -bottom-2 w-full overflow-visible"
      style={{ width: `${width * 100}%`, minWidth: '100%' }}
      preserveAspectRatio="none"
    >
      {/* Subtle glow effect */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#FFD400"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.25}
        filter="blur(2px)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(progress, 1) }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Main line - natural hand-drawn look */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#FFD400"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(progress, 1) }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

// Title text for typing
const titleText = "Você coda. A STAR cuida do resto.";
const typingSpeed = 94; // ms per letter (~3 seconds total)
const pauseAfterTyping = 600; // ms
const revealDuration = 600; // ms;

export function Hero() {
  const [phase, setPhase] = useState<"typing" | "complete">("typing");
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Phase 1: Typing animation
  useEffect(() => {
    if (phase !== "typing") return;

    const interval = setInterval(() => {
      setTypedCount((prev) => {
        if (prev < titleText.length) {
          return prev + 1;
        }
        return prev;
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [phase]);

  // Check if typing is complete
  useEffect(() => {
    if (phase !== "typing") return;

    if (typedCount >= titleText.length) {
      // Pause then hide cursor and show other elements
      setTimeout(() => {
        setShowCursor(false);
        setPhase("complete");
      }, pauseAfterTyping);
    }
  }, [typedCount, phase]);

  // Render title with STAR in gold and animated underline
  const renderTitle = (showFull: boolean = false) => {
    const text = showFull ? titleText : titleText.slice(0, typedCount);

    // Position of "STAR" in the text (after "Você coda. A ")
    const starStart = 13;
    const starEnd = starStart + 4;

    if (!showFull && typedCount <= starStart) {
      // STAR hasn't been reached yet
      return formatWithLineBreaks(text);
    }

    // STAR is partially or fully typed
    const beforeStar = text.slice(0, starStart);
    const typedStarEnd = showFull ? starEnd : Math.min(starEnd, typedCount);
    const starText = text.slice(starStart, typedStarEnd);
    const afterStar = text.slice(typedStarEnd);

    // Calculate underline width based on how much of STAR is typed
    const starProgress = showFull ? 1 : (typedCount - starStart) / 4;

    return (
      <>
        {formatWithLineBreaks(beforeStar)}
        <span className="relative inline text-star">
          {starText}
          {/* Animated wavy underline under STAR - only when STAR is being/has been typed */}
          {(starProgress > 0 || showFull) && (
            <WavyUnderline width={1} progress={Math.min(starProgress, 1)} />
          )}
        </span>
        {formatWithLineBreaks(afterStar)}
      </>
    );
  };

  // Helper to add line break after "coda." (2 lines only)
  const formatWithLineBreaks = (text: string) => {
    // Line 1: "Você coda."
    // Line 2: "A STAR cuida do resto."
    
    const codaIndex = text.indexOf("coda.");
    
    if (codaIndex === -1) {
      return text;
    }
    
    const afterCoda = codaIndex + 5; // "coda.".length
    const line1 = text.slice(0, afterCoda);
    const line2 = text.slice(afterCoda);
    
    if (line2.trim()) {
      return (
        <>
          {line1}
          <br />
          {line2}
        </>
      );
    }
    
    return line1;
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative z-1 bg-transparent px-6"
      id="hero"
    >
      {/* Logo - appears after typing */}
      {phase === "complete" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: revealDuration / 1000, ease: "easeOut" }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-star text-xl">★</span>
          <span className="text-[16px] text-star font-bold tracking-[-0.5px]">
            STAR
          </span>
        </motion.div>
      )}

      {/* Title - always present, typing or complete */}
      <h1 className="text-[clamp(40px,7vw,72px)] leading-[1.1] tracking-[-1.5px] text-white text-center max-w-[800px] font-bold">
        {phase === "typing" ? renderTitle() : renderTitle(true)}
        {showCursor && (
          <span
            className="inline-block w-[3px] h-[1em] bg-star ml-1 align-middle"
            style={{ animation: "cursor-blink 0.9s step-end infinite" }}
          />
        )}
      </h1>

      {/* Subtitle - appears after typing */}
      {phase === "complete" && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: revealDuration / 1000, ease: "easeOut" }}
          className="text-[15px] text-text-muted text-center max-w-[480px] mt-8 mb-10 leading-[1.7] font-light"
        >
          Segurança, pagamentos e arquitetura — analisados e corrigidos com um prompt.
        </motion.p>
      )}

      {/* Buttons - appears after typing */}
      {phase === "complete" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: revealDuration / 1000, ease: "easeOut" }}
          className="flex items-center justify-center gap-3"
        >
          <button className="flex items-center gap-2 text-sm text-black bg-white py-[13px] px-7 rounded-full transition-all duration-200 hover:bg-white/90 hover:-translate-y-[1px] font-medium">
            <span className="text-star">★</span>
            Early access
          </button>
          <button className="text-sm text-white/60 bg-transparent border border-white/15 py-[13px] px-7 rounded-full transition-all duration-200 hover:text-white/80 hover:border-white/25 hover:-translate-y-[1px] font-normal">
            Ver como funciona →
          </button>
        </motion.div>
      )}

      {/* Scroll indicator - minimal */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white/30"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
