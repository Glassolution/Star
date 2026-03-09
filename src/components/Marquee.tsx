"use client";

const marqueeItems = [
  "Análise de Segurança",
  "Implementação de Pagamentos",
  "Configuração de Webhooks",
  "Arquitetura de Software",
  "Revisão de Código",
  "Rate Limiting",
  "Auth & JWT",
  "CI/CD Automático",
];

export function Marquee() {
  // Duplicate items for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative z-1 border-t border-star/8 border-b border-star/8 py-3.5 overflow-hidden bg-star/2">
      <div
        className="flex gap-14 animate-marquee whitespace-nowrap"
        style={{
          animation: "marquee 22s linear infinite",
        }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="text-[11px] tracking-[2px] uppercase text-text-muted flex items-center gap-3.5 shrink-0"
          >
            {item}
            <span className="text-star opacity-50">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
