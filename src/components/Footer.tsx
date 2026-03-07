"use client";

const footerLinks = [
  { label: "Privacidade", href: "#" },
  { label: "Termos", href: "#" },
  { label: "Contato", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative z-1 py-10 px-[60px] border-t border-white/5 flex justify-between items-center">
      <a
        href="#"
        className="font-syne font-extrabold text-xl tracking-[-1px] text-white no-underline flex items-center gap-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M11 1L13.5 8.5H21.5L15 13L17.5 20.5L11 16L4.5 20.5L7 13L0.5 8.5H8.5L11 1Z"
            fill="#FFD700"
          />
        </svg>
        STAR
      </a>

      <ul className="flex gap-7 list-none">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-space-mono text-[10px] tracking-[1px] uppercase text-text-muted no-underline transition-colors hover:text-star"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="font-space-mono text-[10px] text-white/18 tracking-[0.5px]">
        © 2025 STAR. Todos os direitos reservados.
      </p>
    </footer>
  );
}
