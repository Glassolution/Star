"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#demo", label: "Ver ao vivo" },
  { href: "#features", label: "Features" },
  { href: "#roadmap", label: "Roadmap" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-[30px] left-0 right-0 z-200 flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-8 px-[24px] py-[14px] rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border border-white/5"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2 no-underline group">
          <span className="text-star text-lg">★</span>
          <span className="text-[14px] text-star font-bold tracking-[-0.5px]">
            STAR
          </span>
        </a>

        <div className="w-px h-4 bg-white/10" />

        <ul className="flex gap-6 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] text-white/60 no-underline transition-colors duration-200 hover:text-white font-normal tracking-[0.2px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-px h-4 bg-white/10" />

        <div className="flex items-center">
          <button className="text-[13px] font-medium py-[8px] px-4 bg-white text-black rounded-full transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]">
            Early access
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
