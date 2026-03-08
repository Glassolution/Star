"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "🛡️",
    title: "Cybersegurança automatizada",
    description:
      "Detecta SQL injection, XSS, CSRF, keys expostas, APIs sem auth — e gera os prompts para corrigir tudo de uma vez.",
    list: [
      "Chaves de API e secrets expostos",
      "APIs sem autenticação ou rate limiting",
      "Headers de segurança ausentes (CORS, CSP)",
      "SQL injection e XSS desprotegidos",
    ],
    big: true,
    gold: true,
  },
  {
    icon: "🖥️",
    title: "App Desktop\nem tempo real",
    description:
      "Monitora seus arquivos locais enquanto a IA escreve código ao vivo — alertas instantâneos via app nativo.",
    soon: true,
  },
  {
    icon: "💳",
    title: "Pagamentos completos",
    description:
      "Stripe, Mercado Pago, PagSeguro — implementação end-to-end com webhooks, retry e reconciliação.",
  },
  {
    icon: "🏗️",
    title: "Arquitetura revisada",
    description:
      "Identifica código duplicado, acoplamento excessivo e sugere separações de camada que realmente escalam.",
  },
  {
    icon: "🔔",
    title: "Webhooks robustos",
    description:
      "Retry, idempotência, validação de assinatura e fila de processamento — tudo via prompt pronto.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const baseClasses =
    "bg-muted border border-white/5 rounded-2xl p-9 relative overflow-hidden transition-all duration-300 cursor-default hover:bg-[#242432] hover:border-star/10";

  const sizeClasses = feature.big ? "col-span-2" : "";
  const goldClasses = feature.gold
    ? "bg-star border-transparent hover:bg-[#FFE030]"
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className={`${baseClasses} ${sizeClasses} ${goldClasses}`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-6 ${
          feature.gold
            ? "bg-black/10 border border-black/15"
            : "bg-star/8 border border-star/15"
        }`}
      >
        {feature.icon}
      </div>

      <h3
        className={`font-bold text-[22px] tracking-[-0.5px] mb-2.5 whitespace-pre-line ${
          feature.gold ? "text-black" : ""
        }`}
      >
        {feature.title}
      </h3>

      <p
        className={`text-sm leading-[1.7] font-light ${
          feature.gold ? "text-black/70" : "text-text-muted"
        }`}
      >
        {feature.description}
      </p>

      {feature.list && (
        <ul className="mt-4 flex flex-col gap-2">
          {feature.list.map((item, i) => (
            <li
              key={i}
              className={`text-[13px] flex items-center gap-2 ${
                feature.gold ? "text-black/70" : "text-text-muted"
              }`}
            >
              <span
                className={`w-[5px] h-[5px] rounded-full shrink-0 ${
                  feature.gold ? "bg-black/30" : "bg-star"
                }`}
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {feature.soon && (
        <div className="inline-flex items-center gap-1.5 mt-3.5 text-[9px] text-[#FB923C] bg-[#FB923C]/10 py-[3px] px-2.5 rounded-full tracking-[0.5px]">
          ⏳ Em breve
        </div>
      )}
    </motion.div>
  );
}

export function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative z-1 py-[120px] border-t border-star/6"
      id="features"
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
            Features
          </div>
          <h2 className="font-bold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white">
            O que a STAR
            <br />
            faz por você.
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 grid-rows-2 gap-3 mt-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
