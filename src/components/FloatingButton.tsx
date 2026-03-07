"use client";

export function FloatingButton() {
  return (
    <a
      href="#"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-white/7 border border-star/18 py-2.5 px-4 font-space-mono text-[11px] text-white no-underline rounded-lg transition-all hover:border-star/40 hover:-translate-y-[2px] hover:bg-white/10"
    >
      <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 1L13.5 8.5H21.5L15 13L17.5 20.5L11 16L4.5 20.5L7 13L0.5 8.5H8.5L11 1Z"
          fill="#FFD700"
        />
      </svg>
      Conectar GitHub
    </a>
  );
}
