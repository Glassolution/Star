"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: "🔗",
    title: "Conecte seu GitHub",
    description:
      "Autorize a STAR via OAuth em segundos. Funciona com qualquer stack — Next.js, React, Node, Python.",
    tag: "OAuth seguro",
  },
  {
    number: "02",
    icon: "🔍",
    title: "STAR analisa tudo",
    description:
      "Nossa IA varre cada arquivo em busca de vulnerabilidades, falhas de pagamento, webhooks inseguros e arquitetura frágil.",
    tag: "IA proprietária",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Receba os prompts certos",
    description:
      "Prompts prontos para o Lovable, Replit, Claude Code ou qualquer IA — consertando exatamente o que precisa, na ordem certa.",
    tag: "Pronto pra usar",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
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
      className="bg-muted p-11 px-9 relative overflow-hidden transition-all duration-300 cursor-default group hover:bg-[#262632]"
    >
      {/* Top border animation on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-star scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

      <div className="font-syne font-extrabold text-[72px] text-star/7 leading-none mb-5 transition-colors duration-300 group-hover:text-star/13">
        {step.number}
      </div>

      <div className="text-[26px] mb-4">{step.icon}</div>

      <h3 className="font-syne font-bold text-xl mb-2.5 tracking-[-0.5px]">
        {step.title}
      </h3>

      <p className="text-text-muted text-sm leading-[1.7] font-light">
        {step.description}
      </p>

      <span className="inline-block mt-4 font-space-mono text-[9px] tracking-[1px] uppercase py-1 px-2.5 bg-star/8 text-star">
        {step.tag}
      </span>
    </motion.div>
  );
}

export function HowItWorks() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-1 py-[120px]" id="como-funciona">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <div className="font-space-mono text-[11px] tracking-[3px] uppercase text-star mb-5 flex items-center gap-3">
            <span className="w-7 h-px bg-star" />
            Como funciona
          </div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            Simples como
            <br />
            deveria ser.
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-0.5">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
