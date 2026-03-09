"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const comparisons = [
  { feature: "Análise de segurança automática", star: true, lovable: false, replit: false, claudeCode: false },
  { feature: "Integração nativa com GitHub", star: true, lovable: true, replit: "parcial", claudeCode: true },
  { feature: "Prompts prontos para pagamentos", star: true, lovable: false, replit: false, claudeCode: false },
  { feature: "Revisão de arquitetura", star: true, lovable: false, replit: false, claudeCode: "manual" },
  { feature: "Funciona com qualquer IA", star: true, lovable: false, replit: false, claudeCode: false },
  { feature: "App desktop em tempo real", star: "soon", lovable: false, replit: false, claudeCode: false },
  { feature: "Zero conhecimento técnico necessário", star: true, lovable: "parcial", replit: "parcial", claudeCode: false },
];

function CheckMark() {
  return <span className="text-[#4ADE80] text-[15px] font-semibold">✓</span>;
}

function Dash() {
  return <span className="text-[#3F3F52] text-sm">—</span>;
}

function Partial({ text }: { text: string }) {
  return <span className="text-[10px] text-[#FB923C]">{text}</span>;
}

function Soon() {
  return <span className="text-[#FB923C] text-[10px]">Em breve</span>;
}

function CompareRow({
  item,
  index,
}: {
  item: (typeof comparisons)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="grid grid-cols-5 transition-colors hover:bg-white/[0.015] relative border-b border-white/10 last:border-b-0"
    >
      <div className="py-4 px-5 text-sm text-[#C0C0D0] flex items-center border-r border-white/10">
        {item.feature}
      </div>
      <div className="py-4 px-5 flex items-center bg-star/3 border-r border-white/10">
        {item.star === true ? <CheckMark /> : item.star === "soon" ? <Soon /> : <Dash />}
      </div>
      <div className="py-4 px-5 flex items-center border-r border-white/10">
        {item.lovable === true ? <CheckMark /> : item.lovable === "parcial" ? <Partial text="parcial" /> : <Dash />}
      </div>
      <div className="py-4 px-5 flex items-center border-r border-white/10">
        {item.replit === true ? <CheckMark /> : item.replit === "parcial" ? <Partial text="parcial" /> : <Dash />}
      </div>
      <div className="py-4 px-5 flex items-center">
        {item.claudeCode === true ? <CheckMark /> : item.claudeCode === "manual" ? <Partial text="manual" /> : <Dash />}
      </div>
    </motion.div>
  );
}

export function Compare() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-[120px]" id="comparativo">
      {/* Cross markers at top */}
      <div className="grid-cross" style={{ top: 0, left: '20%' }} />
      <div className="grid-cross" style={{ top: 0, left: '40%' }} />
      <div className="grid-cross" style={{ top: 0, left: '60%' }} />
      <div className="grid-cross" style={{ top: 0, left: '80%' }} />
      
      {/* Cross markers at bottom */}
      <div className="grid-cross" style={{ bottom: 0, left: '20%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '40%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '60%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '80%' }} />
      
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
            Comparativo
          </div>
          <h2 className="font-extrabold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            Por que a STAR
            <br />
            é diferente.
          </h2>
        </motion.div>

        {/* Table with border separators */}
        <div className="mt-14 border-t border-white/10">
          {/* Header row */}
          <div className="grid grid-cols-5 relative border-b border-white/10">
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted border-r border-white/10">
              Feature
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-star bg-star/7 flex items-center gap-1.5 border-r border-white/10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="#FFD400"/>
              </svg>
              STAR
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted border-r border-white/10">
              Lovable
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted border-r border-white/10">
              Replit
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted">
              Claude Code
            </div>
          </div>

          {/* Data rows */}
          {comparisons.map((item, index) => (
            <CompareRow key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
