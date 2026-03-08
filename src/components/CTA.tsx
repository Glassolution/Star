"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="relative z-1 py-[140px] px-6 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(80, 50, 200, 0.12) 0%, transparent 70%), var(--color-black)",
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative">
        <div className="text-[11px] tracking-[3px] uppercase text-star mb-4 flex items-center justify-center gap-3">
          Acesso antecipado
        </div>

        <h2 className="font-bold text-[clamp(48px,6.5vw,90px)] leading-[0.98] tracking-[-2px] text-white mx-auto mb-5 max-w-[700px]">
          Pronto para
          <br />
          construir <span className="text-star">direito?</span>
        </h2>

        <p className="text-text-muted text-[17px] max-w-[440px] mx-auto mb-11 font-light leading-[1.7]">
          Entre na lista de early access. Seja o primeiro quando lançarmos. Vagas
          limitadas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="inline-flex bg-white/4 border border-star/18 overflow-hidden transition-all focus-within:border-star/40 focus-within:shadow-[0_0_0_4px_rgba(255,215,0,0.06)]"
        >
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-none outline-none py-3.5 px-5 text-sm text-white w-[260px] placeholder:text-text-muted"
          />
          <button
            type="submit"
            className="text-[11px] font-bold tracking-[1px] uppercase py-3.5 px-6 bg-star text-black border-none whitespace-nowrap transition-colors hover:bg-[#FFE040]"
          >
            Entrar na lista ★
          </button>
        </form>

        <div className="text-[10px] text-white/20 mt-3.5 tracking-[0.5px]">
          Sem spam · Só avisamos quando estiver pronto
        </div>
      </div>
    </motion.section>
  );
}
