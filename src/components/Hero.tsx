"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const typingText = "Seu repositório GitHub, analisado pela STAR.";
const typingSpeed = 38; // ms per letter
const pauseAfterTyping = 700; // ms
const fadeOutDuration = 500; // ms
const revealDuration = 700; // ms

export function Hero() {
  const [phase, setPhase] = useState<"typing" | "fadeout" | "reveal">("typing");
  const [typedText, setTypedText] = useState("");

  // Phase 1: Typing animation
  useEffect(() => {
    if (phase !== "typing") return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typingText.length) {
        setTypedText(typingText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Pause then transition to fadeout
        setTimeout(() => {
          setPhase("fadeout");
        }, pauseAfterTyping);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: Fade out then reveal
  useEffect(() => {
    if (phase !== "fadeout") return;

    const timer = setTimeout(() => {
      setPhase("reveal");
    }, fadeOutDuration);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative z-1 bg-transparent px-6"
      id="hero"
    >
      {/* Phase 1 & 2: Typing text */}
      <AnimatePresence>
        {phase !== "reveal" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeOutDuration / 1000, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="font-dm-sans font-normal text-[32px] text-white text-left max-w-[640px] px-6">
              {typedText}
              <span className="inline-block w-[2px] h-[32px] bg-star ml-1 align-middle" style={{ animation: "cursor-blink 0.9s step-end infinite" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Hero content */}
      <AnimatePresence>
        {phase === "reveal" && (
          <>
            {/* Logo */}
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

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: revealDuration / 1000, ease: "easeOut" }}
              className="font-dm-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.1] tracking-[-1.5px] text-white text-center max-w-[800px] mb-6"
            >
              Você coda.
              <br />
              A <span className="text-star">STAR</span> cuida
              <br />
              do resto.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: revealDuration / 1000, ease: "easeOut" }}
              className="font-dm-sans font-light text-[15px] text-white/40 text-center max-w-[420px] mb-10 leading-[1.7]"
            >
              Segurança, pagamentos e arquitetura — analisados e corrigidos com um
              prompt.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: revealDuration / 1000, ease: "easeOut" }}
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
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
