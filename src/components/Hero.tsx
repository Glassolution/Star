"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CodeRain } from "./CodeRain";

const titleText = "Você coda. A STAR cuida do resto.";
const typingSpeed = 38;
const pauseAfterTyping = 600;
const revealDuration = 600;

export function Hero() {
  const [phase, setPhase] = useState<"typing" | "complete">("typing");
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Bracket typewriter animation state with human-like errors
  const BRACKET_PAIRS = [
    ["<", "/>"],
    ["{", "}"],
    ["[", "]"],
    ["/*", "*/"],
    ["(", ")"],
  ];

  // Adjacent keyboard characters for realistic typos
  const ADJACENT_KEYS: Record<string, string[]> = {
    '<': [',', '.', '>', '/'],
    '>': ['<', '.', ',', '/'],
    '{': ['[', '(', '}', '|'],
    '}': ['{', ']', ')', '|'],
    '[': ['{', '(', ']', '\\'],
    ']': ['[', '}', ')', '\\'],
    '(': ['[', '{', ')', '9'],
    ')': ['(', ']', '}', '0'],
    '/': ['.', ',', '\\', '?'],
    '*': ['&', '8', '(', '^'],
  };

  const [pairIndex, setPairIndex] = useState(0);
  const [prefixText, setPrefixText] = useState(BRACKET_PAIRS[0][0]);
  const [suffixText, setSuffixText] = useState(BRACKET_PAIRS[0][1]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState<'prefix' | 'suffix'>('prefix');

  useEffect(() => {
    if (phase !== "typing") return;
    const interval = setInterval(() => {
      setTypedCount((prev) => (prev < titleText.length ? prev + 1 : prev));
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedCount >= titleText.length) {
      setTimeout(() => { setShowCursor(false); setPhase("complete"); }, pauseAfterTyping);
    }
  }, [typedCount, phase]);

  // Human-like bracket typewriter animation with errors
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const randomDelay = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const getRandomTypo = (char: string): string => {
      const adjacent = ADJACENT_KEYS[char];
      if (adjacent && Math.random() < 0.3) {
        return adjacent[Math.floor(Math.random() * adjacent.length)];
      }
      return char;
    };

    const runAnimation = async () => {
      const currentPair = BRACKET_PAIRS[pairIndex];
      const fullPrefix = currentPair[0];
      const fullSuffix = currentPair[1];

      // 1. Show complete pair for random delay (1800-2400ms)
      setPrefixText(fullPrefix);
      setSuffixText(fullSuffix);
      setIsTyping(false);

      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => resolve(), randomDelay(1800, 2400));
      });

      // 2. Erase suffix char by char (60-120ms each)
      setIsTyping(true);
      setCursorPosition('suffix');
      for (let i = fullSuffix.length - 1; i >= 0; i--) {
        setSuffixText(fullSuffix.slice(0, i));
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), randomDelay(60, 120));
        });
      }

      // 3. Erase prefix char by char (60-120ms each)
      setCursorPosition('prefix');
      for (let i = fullPrefix.length - 1; i >= 0; i--) {
        setPrefixText(fullPrefix.slice(0, i));
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), randomDelay(60, 120));
        });
      }

      // 4. Pause 200ms with everything empty
      setIsTyping(false);
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => resolve(), 200);
      });

      // 5. Move to next pair
      const nextPairIndex = (pairIndex + 1) % BRACKET_PAIRS.length;
      setPairIndex(nextPairIndex);

      const nextPair = BRACKET_PAIRS[nextPairIndex];
      const newPrefix = nextPair[0];
      const newSuffix = nextPair[1];

      // 6. Type prefix with possible errors
      setIsTyping(true);
      setCursorPosition('prefix');

      // Check for typo (30% chance)
      const prefixTypoChance = Math.random();
      if (prefixTypoChance < 0.3 && newPrefix.length > 0) {
        // Type first char correctly
        setPrefixText(newPrefix[0]);
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), randomDelay(55, 100));
        });

        // Type wrong char
        const typoChar = getRandomTypo(newPrefix[0]);
        if (typoChar !== newPrefix[0]) {
          setPrefixText(newPrefix[0] + typoChar);
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), 180);
          });

          // Erase typo
          setPrefixText(newPrefix[0]);
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), randomDelay(60, 100));
          });
        }
      }

      // Type remaining prefix correctly
      for (let i = setPrefixText.length === 0 ? 0 : 1; i < newPrefix.length; i++) {
        setPrefixText(newPrefix.slice(0, i + 1));
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), randomDelay(55, 100));
        });
      }

      // 7. Pause 120ms between prefix and suffix
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => resolve(), 120);
      });

      // 8. Type suffix with possible errors
      setCursorPosition('suffix');

      // Check for typo (25% chance)
      const suffixTypoChance = Math.random();
      if (suffixTypoChance < 0.25 && newSuffix.length > 0) {
        // Type first char correctly
        setSuffixText(newSuffix[0]);
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), randomDelay(55, 100));
        });

        // Type wrong char
        const typoChar = getRandomTypo(newSuffix[0]);
        if (typoChar !== newSuffix[0]) {
          setSuffixText(newSuffix[0] + typoChar);
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), 180);
          });

          // Erase typo
          setSuffixText(newSuffix[0]);
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), randomDelay(60, 100));
          });
        }

        // Type remaining suffix
        for (let i = 1; i < newSuffix.length; i++) {
          setSuffixText(newSuffix.slice(0, i + 1));
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), randomDelay(55, 100));
          });
        }
      } else {
        // Type suffix normally
        for (let i = 0; i < newSuffix.length; i++) {
          setSuffixText(newSuffix.slice(0, i + 1));
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => resolve(), randomDelay(55, 100));
          });
        }
      }

      // 9. Repeat cycle
      setIsTyping(false);
      timeoutId = setTimeout(runAnimation, randomDelay(1800, 2400));
    };

    runAnimation();

    return () => clearTimeout(timeoutId);
  }, [pairIndex]);

  // Blinking cursor for bracket animation
  useEffect(() => {
    if (!isTyping) return;
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isTyping]);

  const renderTitle = (showFull = false) => {
    const text = showFull ? titleText : titleText.slice(0, typedCount);
    const starStart = text.indexOf("STAR");

    if (starStart === -1 || (!showFull && typedCount <= starStart)) {
      return formatWithLineBreaks(text);
    }

    const beforeStar = text.slice(0, starStart);
    const starText = text.slice(starStart, Math.min(starStart + 4, typedCount));
    const afterStar = text.slice(Math.min(starStart + 4, typedCount));

    // Build the full <STAR /> tag progressively as letters are typed
    // titleText has "STAR" at index 13. The tag renders as: <STAR />
    // We show the bracket prefix in gold, STAR in white, suffix in gold
    const isComplete = showFull || starText.length === 4;

    return (
      <>
        {formatWithLineBreaks(beforeStar)}
        {/* <STAR /> — JSX tag treatment */}
        <span
          className="relative inline-block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            letterSpacing: "-0.02em"
          }}
        >
          {/* Opening bracket — gold with typewriter animation */}
          <span
            style={{
              color: "#FFD000",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.78em",
              verticalAlign: "middle"
            }}
          >
            {prefixText}
            {isTyping && cursorPosition === 'prefix' && cursorVisible && (
              <span style={{ color: "#FFD000" }}>|</span>
            )}
          </span>
          {/* STAR — white with Syne */}
          <span
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.06em",
              fontSize: "0.72em",
              verticalAlign: "baseline"
            }}
            className="text-white"
          >
            {starText}
          </span>
          {/* Closing tag — only show when STAR fully typed */}
          {isComplete && (
            <span
              style={{
                color: "#FFD000",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "0.78em",
                verticalAlign: "middle"
              }}
            >
              {suffixText}
              {isTyping && cursorPosition === 'suffix' && cursorVisible && (
                <span style={{ color: "#FFD000" }}>|</span>
              )}
            </span>
          )}
        </span>
        {formatWithLineBreaks(afterStar)}
      </>
    );
  };

  const formatWithLineBreaks = (text: string) => {
    const parts = text.split(" ");
    const result: React.ReactNode[] = [];
    let currentLine = 0;
    let lineContent = "";

    for (let i = 0; i < parts.length; i++) {
      const word = parts[i];
      if (parts[i - 1] === "coda." || parts[i - 1] === "cuida") {
        result.push(<span key={`line-${currentLine}`}>{lineContent}</span>);
        result.push(<br key={`br-${currentLine}`} />);
        lineContent = word;
        currentLine++;
      } else {
        lineContent += (lineContent ? " " : "") + word;
      }
    }
    if (lineContent) result.push(<span key={`line-${currentLine}`}>{lineContent}</span>);
    return result;
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ zIndex: 1 }}
      id="hero-section"
    >
      {/* Code rain — very subtle, behind everything */}
      <CodeRain />

      {/* Bottom fade — code fades out before content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(8,8,8,0.82) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="max-w-[1280px] mx-auto relative flex flex-col items-center" style={{ zIndex: 2 }}>
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

        <h1
          className={`font-dm-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.1] tracking-[-1.5px] text-white text-center max-w-[800px] ${
            phase === "complete" ? "mb-6" : ""
          }`}
        >
          {phase === "typing" ? renderTitle() : renderTitle(true)}
          {showCursor && (
            <span
              className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
              style={{ animation: "cursor-blink 0.9s step-end infinite" }}
            />
          )}
        </h1>

        {phase === "complete" && (
          <>
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: revealDuration / 1000, ease: "easeOut" }}
              className="font-dm-sans font-light text-[15px] text-white/40 text-center max-w-[420px] mb-10 leading-[1.7]"
            >
              Segurança, pagamentos e arquitetura — analisados e corrigidos com um prompt.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: revealDuration / 1000, ease: "easeOut" }}
              className="flex items-center justify-center gap-3"
            >
              <a href="/early-access" className="flex items-center gap-2 font-dm-sans text-sm font-medium text-black bg-star border-none py-3 px-6 rounded-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,215,0,0.3)] cursor-pointer">
                Early Access
              </a>
              <a href="#como-funciona" className="font-dm-sans text-sm font-normal text-white/50 bg-transparent border border-white/15 py-3 px-6 rounded-full transition-all duration-200 hover:text-white/80 hover:border-white/25 hover:-translate-y-[2px]">
                Ver como funciona →
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
