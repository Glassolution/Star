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
  return (
    <span className="text-[#FB923C] text-[10px]">Em breve</span>
  );
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
      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-b border-white/4 transition-colors hover:bg-white/[0.015] last:border-b-0"
    >
      <div className="py-4 px-5 text-sm text-[#C0C0D0] flex items-center">
        {item.feature}
      </div>
      <div className="py-4 px-5 flex items-center bg-star/3">
        {item.star === true ? (
          <CheckMark />
        ) : item.star === "soon" ? (
          <Soon />
        ) : (
          <Dash />
        )}
      </div>
      <div className="py-4 px-5 flex items-center">
        {item.lovable === true ? (
          <CheckMark />
        ) : item.lovable === "parcial" ? (
          <Partial text="parcial" />
        ) : (
          <Dash />
        )}
      </div>
      <div className="py-4 px-5 flex items-center">
        {item.replit === true ? (
          <CheckMark />
        ) : item.replit === "parcial" ? (
          <Partial text="parcial" />
        ) : (
          <Dash />
        )}
      </div>
      <div className="py-4 px-5 flex items-center">
        {item.claudeCode === true ? (
          <CheckMark />
        ) : item.claudeCode === "manual" ? (
          <Partial text="manual" />
        ) : (
          <Dash />
        )}
      </div>
    </motion.div>
  );
}

export function Compare() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative z-1 py-[120px] bg-white/8 border-t border-star/6"
      id="comparativo"
    >
      <div className="max-w-[1100px] mx-auto px-[60px]">
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
          <h2 className="font-bold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            Por que a STAR
            <br />
            é diferente.
          </h2>
        </motion.div>

        <div className="border border-star/10 overflow-hidden mt-14">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-star/4 border-b border-star/10">
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted">
              Feature
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-star bg-star/7 flex items-center gap-1.5">
              ★ STAR
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted">
              Lovable
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted">
              Replit
            </div>
            <div className="py-4 px-5 text-[10px] uppercase tracking-[1.5px] text-text-muted">
              Claude Code
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((item, index) => (
            <CompareRow key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
