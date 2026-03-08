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
      <a href="#" className="flex items-center gap-2 no-underline group">
        <span className="text-star text-xl">★</span>
        <span className="font-syne font-extrabold text-[16px] text-star tracking-[-0.5px]">
          STAR
        </span>
      </a>

      <ul className="flex gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-dm-sans text-sm text-white/50 no-underline transition-colors duration-200 hover:text-white font-normal tracking-[0.2px]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button className="font-dm-sans text-sm font-medium py-[10px] px-5 bg-star text-black rounded-full transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(255,215,0,0.3)]">
          Conectar GitHub
        </button>
      </div>
    </motion.nav>
  );
}
