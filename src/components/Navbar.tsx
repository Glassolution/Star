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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-between px-[60px] py-[22px] transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      id="mainNav"
    >
      <a href="#" className="flex items-center gap-2.5 no-underline group">
        <span className="w-[22px] h-[22px] relative">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="animate-spin"
            style={{ animationDuration: "12s" }}
          >
            <path
              d="M11 1L13.5 8.5H21.5L15 13L17.5 20.5L11 16L4.5 20.5L7 13L0.5 8.5H8.5L11 1Z"
              fill="#FFD700"
            />
          </svg>
        </span>
        <span className="font-syne font-extrabold text-[26px] tracking-[-1px] text-white">
          STAR
        </span>
      </a>

      <ul className="flex gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-dm-sans text-sm text-white/65 no-underline transition-colors duration-200 hover:text-white font-normal tracking-[0.2px]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <span className="font-space-mono text-[10px] py-[3px] px-[9px] border border-star/35 text-star rounded-full tracking-[0.5px]">
          Em breve
        </span>
        <button className="font-dm-sans text-[13px] font-medium py-[9px] px-[22px] bg-white/15 text-white border border-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/22 hover:-translate-y-[1px]">
          Early Access
        </button>
      </div>
    </motion.nav>
  );
}
