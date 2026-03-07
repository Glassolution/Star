"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sentence = "Seu repositório GitHub, analisado pela STAR.";

export function Hero() {
  const [introVisible, setIntroVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 42;

    const type = () => {
      if (i <= sentence.length) {
        setTypedText(sentence.slice(0, i));
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          setIntroVisible(false);
          setTimeout(() => setHeroVisible(true), 700);
        }, 900);
      }
    };

    const timeout = setTimeout(type, 320);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-500 bg-black flex items-center justify-center px-[60px] pointer-events-none"
            id="intro"
          >
            <div className="font-syne font-bold text-[clamp(22px,3vw,38px)] text-white tracking-[-0.5px] leading-[1.3] max-w-[640px]">
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-[1.1em] bg-star ml-[3px] align-text-bottom animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        className={`min-h-screen flex flex-col items-center justify-center text-center pt-[100px] px-6 pb-20 relative z-1 bg-transparent transition-opacity duration-800 ${
          heroVisible ? "opacity-100" : "opacity-0"
        }`}
        id="hero"
      >
        {/* Hero Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-star/7 border border-star/20 rounded-full py-[5px] px-[14px] pl-[9px] text-[11px] text-star/80 mb-11 font-space-mono tracking-[0.5px]"
        >
          <span className="w-[5px] h-[5px] bg-star rounded-full animate-pulse opacity-70" />
          Early access aberto
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="font-syne font-extrabold text-[clamp(36px,4.8vw,72px)] leading-[1.08] tracking-[-2px] text-white mb-6 max-w-[680px]"
        >
          Conecte seu repo.
          <br />
          A <span className="text-star">STAR</span> cuida
          <br />
          do que a IA esqueceu.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.36, duration: 0.55 }}
          className="text-[15px] leading-[1.75] text-white/42 max-w-[400px] mx-auto mb-11 font-light"
        >
          Segurança, pagamentos, webhooks e arquitetura — analisados e corrigidos
          com um prompt.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.48, duration: 0.55 }}
          className="flex items-center justify-center gap-3"
        >
          <button className="flex items-center gap-2 font-dm-sans text-sm font-medium text-black bg-star border-none py-[13px] px-7 rounded-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_10px_32px_rgba(255,215,0,0.25)]">
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
          <button className="font-dm-sans text-sm text-white/45 bg-transparent border border-white/12 py-3 px-6 rounded-full transition-all duration-200 hover:text-white/80 hover:border-white/25 hover:-translate-y-[2px]">
            Ver como funciona →
          </button>
        </motion.div>
      </section>
    </>
  );
}
