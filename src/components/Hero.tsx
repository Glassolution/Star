"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Title text for typing
const titleText = "Você coda. A STAR cuida do resto.";
const typingSpeed = 38; // ms per letter
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

    // Position of "STAR" in the text
    const starStart = 13; // "Você coda. A ".length

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
        <span className="text-[#C8960C]">{starText}</span>
        {formatWithLineBreaks(afterStar)}
      </>
    );
  };

  // Helper to add line breaks at specific points
  const formatWithLineBreaks = (text: string) => {
    // Line 1: "Você coda."
    // Line 2: "A STAR cuida"
    // Line 3: "do resto."
    
    const parts = text.split(/(\s+)/);
    const result: React.ReactNode[] = [];
    let currentText = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const prevWord = i > 0 ? parts[i - 2] : "";
      
      // Add line break after "coda." or after "cuida"
      if ((prevWord === "coda." || prevWord === "cuida") && !part.match(/^\s+$/)) {
        result.push(<span key={`text-${i}`}>{currentText}</span>);
        result.push(<br key={`br-${i}`} />);
        currentText = part;
      } else {
        currentText += part;
      }
    }
    
    if (currentText) {
      result.push(<span key="text-end">{currentText}</span>);
    }

    return result;
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
              className="inline-block w-[3px] h-[1em] bg-[#C8960C] ml-1 align-middle"
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
            <button className="flex items-center gap-2 font-dm-sans text-sm font-medium text-black bg-star border-none py-3 px-6 rounded-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,215,0,0.3)]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                className="text-current"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  fill="currentColor"
                />
              </svg>
              Conectar GitHub
            </button>
            <button className="font-dm-sans text-sm font-normal text-white/50 bg-transparent border border-white/15 py-3 px-6 rounded-full transition-all duration-200 hover:text-white/80 hover:border-white/25 hover:-translate-y-[2px]">
              Ver como funciona →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
