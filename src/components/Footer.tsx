"use client";

import { StarLogo } from "./StarLogo";

const footerLinks = [
  { label: "Privacidade", href: "#" },
  { label: "Termos", href: "#" },
  { label: "Contato", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative py-10">
      {/* Cross marker at top */}
      <div className="grid-cross" style={{ top: 0, left: '50%' }} />
      
      {/* Horizontal line at top */}
      <div className="grid-h" style={{ top: 0 }} />

      {/* 2 column layout with border separator */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 border-l border-r-0 border-white/10">
        {/* Left column - Logo */}
        <div className="flex items-center border-r border-white/10 pr-8">
          <a href="#" className="no-underline">
            <StarLogo variant="dark" size="md" />
          </a>
        </div>

        {/* Right column - Links and copyright */}
        <div className="flex items-center justify-between pl-8">
          <ul className="flex gap-7 list-none">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[10px] tracking-[1px] uppercase text-text-muted no-underline transition-colors hover:text-star"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[10px] text-white/18 tracking-[0.5px]">
            © 2025 STAR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
