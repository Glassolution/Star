"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const roadmap = [
  {
    phase: "01",
    phaseName: "Fundação",
    title: "Análise de repositório GitHub",
    description:
      "OAuth, escaneamento completo, detecção de vulnerabilidades e geração de prompts para qualquer ferramenta de IA.",
    tags: [
      { label: "Construindo agora", type: "live" as const },
      { label: "GitHub OAuth", type: "default" as const },
    ],
  },
  {
    phase: "02",
    phaseName: "Profundidade",
    title: "Sistemas completos",
    description:
      "Pagamentos end-to-end, webhooks com retry e idempotência, autenticação completa e CI/CD.",
    tags: [
      { label: "Q2 2025", type: "soon" as const },
      { label: "Stripe", type: "default" as const },
    ],
  },
  {
    phase: "03",
    phaseName: "Tempo Real",
    title: "App Desktop",
    description:
      "App nativo Mac e Windows — monitora arquivos locais enquanto a IA escreve, dicas e alertas ao vivo.",
    tags: [
      { label: "Q4 2025", type: "future" as const },
      { label: "Desktop App", type: "default" as const },
    ],
  },
  {
    phase: "04",
    phaseName: "Ecossistema",
    title: "Plataforma STAR",
    description:
      "API pública, marketplace de templates e integrações diretas com Lovable, Replit, Cursor e outros.",
    tags: [
      { label: "2026", type: "future" as const },
      { label: "API", type: "default" as const },
    ],
  },
];

function Tag({ label, type }: { label: string; type: "live" | "soon" | "future" | "default" }) {
  const baseClasses = "text-[9px] tracking-[1px] uppercase py-[3px] px-2 rounded";

  const typeClasses: Record<"live" | "soon" | "future" | "default", string> = {
    live: "bg-[#4ADE80]/10 text-[#4ADE80]",
    soon: "bg-[#FFA500]/10 text-[#FFA500]",
    future: "bg-white/5 text-text-muted",
    default: "bg-star/7 text-star",
  };

  return <span className={`${baseClasses} ${typeClasses[type]}`}>{label}</span>;
}

function RoadmapCard({
  item,
  index,
}: {
  item: (typeof roadmap)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      className="p-8 flex flex-col h-full"
    >
      {/* Phase number - monospace gold */}
      <div className="text-star text-[11px] tracking-[2px] font-mono mb-3">
        {item.phase}
      </div>
      
      {/* Phase name */}
      <h3 className="text-white text-lg font-bold tracking-[-0.5px] mb-2">
        {item.phaseName}
      </h3>
      
      {/* Title */}
      <h4 className="text-white/80 text-sm font-medium mb-3">
        {item.title}
      </h4>
      
      {/* Description */}
      <p className="text-text-muted text-[13px] leading-[1.7] font-light flex-grow">
        {item.description}
      </p>
      
      {/* Tags at bottom */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {item.tags.map((tag, i) => (
          <Tag key={i} label={tag.label} type={tag.type} />
        ))}
      </div>
    </motion.div>
  );
}

export function Roadmap() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-[120px]" id="roadmap">
      {/* Cross markers at top */}
      <div className="grid-cross" style={{ top: 0, left: '25%' }} />
      <div className="grid-cross" style={{ top: 0, left: '50%' }} />
      <div className="grid-cross" style={{ top: 0, left: '75%' }} />
      
      {/* Cross markers at bottom */}
      <div className="grid-cross" style={{ bottom: 0, left: '25%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '50%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '75%' }} />
      
      {/* Horizontal lines */}
      <div className="grid-h" style={{ top: 0 }} />
      <div className="grid-h" style={{ bottom: 0 }} />

      <div className="max-w-[1280px] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="text-[11px] tracking-[3px] uppercase text-star mb-5 flex items-center gap-3">
            <span className="w-7 h-px bg-star" />
            Roadmap
          </div>
          <h2 className="font-extrabold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            Onde estamos
            <br />
            indo.
          </h2>
        </motion.div>

        {/* 4 cards side by side with border separators */}
        <div className="grid grid-cols-4 border-t border-b border-white/10 mt-[72px]">
          {roadmap.map((item, index) => (
            <div
              key={index}
              className={`border-r border-white/10 last:border-r-0`}
            >
              <RoadmapCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
