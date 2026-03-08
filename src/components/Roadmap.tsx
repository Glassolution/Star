"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const roadmap = [
  {
    phase: "Fase 1",
    phaseName: "Fundação",
    title: "Análise de repositório GitHub",
    description:
      "OAuth, escaneamento completo, detecção de vulnerabilidades e geração de prompts para qualquer ferramenta de IA.",
    tags: [
      { label: "Construindo agora", type: "live" },
      { label: "GitHub OAuth", type: "default" },
      { label: "Scan de segurança", type: "default" },
    ],
  },
  {
    phase: "Fase 2",
    phaseName: "Profundidade",
    title: "Sistemas completos",
    description:
      "Pagamentos end-to-end, webhooks com retry e idempotência, autenticação completa e CI/CD.",
    tags: [
      { label: "Q2 2025", type: "soon" },
      { label: "Stripe", type: "default" },
      { label: "Mercado Pago", type: "default" },
      { label: "Auth", type: "default" },
    ],
  },
  {
    phase: "Fase 3",
    phaseName: "Tempo Real",
    title: "App Desktop",
    description:
      "App nativo Mac e Windows — monitora arquivos locais enquanto a IA escreve, dicas e alertas ao vivo.",
    tags: [
      { label: "Q4 2025", type: "future" },
      { label: "Desktop App", type: "default" },
      { label: "Real-time", type: "default" },
    ],
  },
  {
    phase: "Fase 4",
    phaseName: "Ecossistema",
    title: "Plataforma STAR",
    description:
      "API pública, marketplace de templates e integrações diretas com Lovable, Replit, Cursor e outros.",
    tags: [
      { label: "2026", type: "future" },
      { label: "API", type: "default" },
      { label: "Marketplace", type: "default" },
    ],
  },
];

function Tag({ label, type }: { label: string; type: string }) {
  const baseClasses =
    "text-[9px] tracking-[1px] uppercase py-[3px] px-2 rounded";

  const typeClasses = {
    live: "bg-[#4ADE80]/10 text-[#4ADE80]",
    soon: "bg-[#FFA500]/10 text-[#FFA500]",
    future: "bg-white/5 text-text-muted",
    default: "bg-star/7 text-star",
  };

  return <span className={`${baseClasses} ${typeClasses[type]}`}>{label}</span>;
}

function RoadmapItem({
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
      className="grid grid-cols-[180px_1px_1fr] gap-0 gap-x-10 py-9 border-b border-white/5 items-start last:border-b-0"
    >
      {/* Phase */}
      <div className="text-[10px] tracking-[1px] uppercase text-text-muted pt-1">
        <strong className="block text-[17px] text-white tracking-[-0.5px] mb-1 font-bold">
          {item.phase}
        </strong>
        {item.phaseName}
      </div>

      {/* Line with dot */}
      <div className="w-px bg-star/18 relative self-stretch">
        <div className="w-2 h-2 bg-star rounded-full absolute top-1 left-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-bold text-xl tracking-[-0.5px] mb-2">
          {item.title}
        </h3>
        <p className="text-text-muted text-sm leading-[1.7] font-light">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {item.tags.map((tag, i) => (
            <Tag key={i} label={tag.label} type={tag.type} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Roadmap() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-1 py-[120px] border-t border-star/6" id="roadmap">
      <div className="max-w-[1100px] mx-auto px-[60px]">
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
          <h2 className="font-bold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            Onde estamos
            <br />
            indo.
          </h2>
        </motion.div>

        <div className="mt-[72px] flex flex-col">
          {roadmap.map((item, index) => (
            <RoadmapItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
