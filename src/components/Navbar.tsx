"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StarLogo } from "./StarLogo";

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
      <div className={`max-w-[1280px] mx-auto px-0 flex items-center justify-center`}>
        <div
          className={`flex items-center gap-6 px-[20px] py-[12px] rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border border-white/5"
              : "bg-transparent"
          }`}
        >
        <a href="#" className="no-underline group">
          <StarLogo variant="dark" size="sm" />
        </a>

        <div className="w-px h-3 bg-white/10" />

        <ul className="flex gap-5 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[12px] text-white/60 no-underline transition-colors duration-200 hover:text-white font-normal tracking-[0.2px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-px h-3 bg-white/10" />

        <div className="flex items-center">
          <button className="text-[12px] font-medium py-[7px] px-4 bg-white text-black rounded-full transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]">
            Early access
          </button>
        </div>
        </div>
      </div>
    </motion.nav>
  );
}
