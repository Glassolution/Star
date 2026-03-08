"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Title text for typing
const titleText = "Você coda. A STAR cuida do resto.";
const typingSpeed = 94; // ms per letter (~3 seconds total)
const pauseAfterTyping = 600; // ms
const revealDuration = 600; // ms

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

  // Render title with STAR in gold
  const renderTitle = (showFull: boolean = false) => {
    const text = showFull ? titleText : titleText.slice(0, typedCount);

    // Position of "STAR" in the text (after "Você coda. A ")
    const starStart = 13;

    if (!showFull && typedCount <= starStart) {
      // STAR hasn't been reached yet
      return formatWithLineBreaks(text);
    }

    // STAR is partially or fully typed
    const beforeStar = text.slice(0, starStart);
    const starEnd = starStart + 4;
    const typedStarEnd = showFull ? starEnd : Math.min(starEnd, typedCount);
    const starText = text.slice(starStart, typedStarEnd);
    const afterStar = text.slice(typedStarEnd);

    return (
      <>
        {formatWithLineBreaks(beforeStar)}
        <span className="text-star">{starText}</span>
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
      {/* Container for all hero content */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo - appears after typing */}
        {phase === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: revealDuration / 1000, ease: "easeOut" }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-star text-xl">★</span>
            <span className="font-syne font-extrabold text-[16px] text-star tracking-[-0.5px]">
              STAR
            </span>
          </motion.div>
        )}

        {/* Title - always present, typing or complete */}
        <h1 className="font-dm-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.1] tracking-[-1.5px] text-white text-center max-w-[800px]">
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
            className="font-dm-sans font-light text-[15px] text-white/40 text-center max-w-[420px] mt-6 mb-10 leading-[1.7]"
          >
            Segurança, pagamentos e arquitetura — analisados e corrigidos com um
            prompt.
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
            <button className="flex items-center gap-2 font-dm-sans text-sm font-medium text-black bg-white py-[13px] px-7 rounded-full transition-all duration-200 hover:bg-white/90 hover:-translate-y-[1px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-black"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
              Early access
            </button>
            <button className="font-dm-sans text-sm font-normal text-white/60 bg-transparent border border-white/15 py-[13px] px-7 rounded-full transition-all duration-200 hover:text-white/80 hover:border-white/25 hover:-translate-y-[1px]">
              Ver como funciona →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
