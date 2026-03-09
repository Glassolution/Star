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
    console.log("Email submitted:", email);
  };

  return (
    <section
      ref={ref}
      className="relative py-[140px] overflow-hidden"
    >
      {/* Grid: 2 vertical lines at 8% and 92% - same as Hero */}
      <div className="grid-v" style={{ left: '8%' }} />
      <div className="grid-v" style={{ left: '92%' }} />
      
      {/* Cross markers */}
      <div className="grid-cross" style={{ top: 0, left: '8%' }} />
      <div className="grid-cross" style={{ top: 0, left: '92%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '8%' }} />
      <div className="grid-cross" style={{ bottom: 0, left: '92%' }} />
      
      {/* Horizontal lines */}
      <div className="grid-h" style={{ top: 0 }} />
      <div className="grid-h" style={{ bottom: 0 }} />

      {/* Radial glow */}
      <div
        className="absolute w-[500px] h-[500px] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content between 8% and 92% */}
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <div className="text-[11px] tracking-[3px] uppercase text-star mb-4 flex items-center justify-center gap-3">
            Acesso antecipado
          </div>

          <h2 className="font-extrabold text-[clamp(48px,6.5vw,90px)] leading-[0.98] tracking-[-2px] text-white mx-auto mb-5 max-w-[700px]">
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
              className="text-[11px] font-bold tracking-[1px] uppercase py-3.5 px-6 bg-star text-black border-none whitespace-nowrap transition-colors hover:bg-[#FFE040] flex items-center gap-2"
            >
              Entrar na lista
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="#080808"/>
              </svg>
            </button>
          </form>

          <div className="text-[10px] text-white/20 mt-3.5 tracking-[0.5px]">
            Sem spam · Só avisamos quando estiver pronto
          </div>
        </motion.div>
      </div>
    </section>
  );
}
