"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

// Window bar component
function WindowBar({ title }: { title: string }) {
  return (
    <div className="bg-[#161620] py-2.5 px-3.5 flex items-center gap-1.5 border-b border-white/6">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      <div className="flex-1 text-center text-[9px] text-text-muted">
        {title}
      </div>
    </div>
  );
}

// Step 1: GitHub Connect
function GitHubConnect() {
  return (
    <div className="p-5">
      <div className="text-[10px] uppercase tracking-[1.5px] text-text-muted mb-3.5">
        Selecione o repositório
      </div>
      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex items-center gap-2 py-2 px-3 bg-[#141420] border border-white/6 rounded-md text-[11px] text-white/70">
          <span>📁</span>
          meu-ecommerce
          <span className="ml-auto text-star">✓</span>
        </div>
        <div className="flex items-center gap-2 py-2 px-3 bg-[#1A1A28] border border-star/40 rounded-md text-[11px] text-white">
          <span>📁</span>
          meu-saas
          <span className="ml-auto text-star">★</span>
        </div>
        <div className="flex items-center gap-2 py-2 px-3 bg-[#141420] border border-white/6 rounded-md text-[11px] text-white/70">
          <span>📁</span>
          landing-page
        </div>
      </div>
      <button className="w-full py-2.5 bg-star text-black rounded-md text-[10px] font-bold tracking-[1px] uppercase transition-opacity hover:opacity-85">
        Conectar via GitHub OAuth →
      </button>
    </div>
  );
}

// Step 2: Scanning
function Scanning() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3.5">
        <div className="text-[10px] uppercase tracking-[1.5px] text-text-muted">
          Análise em progresso
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-star bg-star/8 py-[3px] px-2 rounded-full">
          <span className="w-[5px] h-[5px] bg-star rounded-full animate-pulse" />
          Ao vivo
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm">
          <div className="w-[5px] h-[5px] rounded-full bg-[#F87171]" />
          <span className="text-[10px] text-[#F87171]">
            api/payments.js
          </span>
          <span className="text-[9px] text-text-muted ml-auto">
            3 críticos
          </span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm">
          <div className="w-[5px] h-[5px] rounded-full bg-[#F87171]" />
          <span className="text-[10px] text-[#F87171]">
            middleware/auth.js
          </span>
          <span className="text-[9px] text-text-muted ml-auto">
            2 críticos
          </span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm">
          <div className="w-[5px] h-[5px] rounded-full bg-[#FB923C]" />
          <span className="text-[10px] text-[#FB923C]">
            webhooks/stripe.js
          </span>
          <span className="text-[9px] text-text-muted ml-auto">
            2 avisos
          </span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-sm animate-pulse">
          <div className="w-[5px] h-[5px] rounded-full bg-text-muted" />
          <span className="text-[10px] text-text-muted">
            utils/helpers.js
          </span>
          <span className="text-[9px] text-text-muted ml-auto">
            escaneando...
          </span>
        </div>
      </div>

      <div className="h-0.5 bg-white/6 rounded mt-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-star to-accent rounded"
          style={{
            width: "65%",
            animation: "scanFill 2.5s ease-in-out infinite alternate",
          }}
        />
      </div>
    </div>
  );
}

// Step 3: Results
function Results() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["🔴 Segurança", "🟡 Pagamentos", "🏗️ Arquit."];

  return (
    <div className="p-3.5">
      <div className="flex gap-0 mb-3 border-b border-white/7">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`text-[9px] tracking-[1px] uppercase py-1.5 px-3 border-b-2 transition-colors ${
              index === activeTab
                ? "text-star border-star"
                : "text-text-muted border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-start py-2 px-2.5 bg-[#080810] border border-white/5 rounded-md mb-2 border-l-2 border-l-[#F87171]">
        <div className="w-[22px] h-[22px] bg-red-500/10 rounded-md flex items-center justify-center text-[11px] shrink-0">
          🔑
        </div>
        <div>
          <div className="text-[10.5px] font-semibold text-white mb-0.5">
            API key exposta no código
          </div>
          <div className="text-[9.5px] text-text-muted leading-[1.4]">
            STRIPE_SECRET hardcoded em payments.js linha 12
          </div>
        </div>
      </div>

      <div className="bg-[#060609] border border-star/15 rounded-md p-2.5 mt-2">
        <div className="text-[8px] uppercase tracking-[1.5px] text-star mb-1.5 flex items-center gap-1">
          ★ Prompt STAR
        </div>
        <div className="text-[9.5px] text-[#AAAABB] leading-[1.6]">
          Mova <span className="text-star">STRIPE_SECRET</span> para{" "}
          <span className="text-star">process.env</span> e adicione ao{" "}
          <span className="text-star">.env.local</span>...
        </div>
        <div className="flex gap-1.5 mt-2 justify-end">
          <button className="text-[8px] py-1 px-2.5 rounded bg-star/8 text-star border border-star/20 uppercase tracking-[0.5px] transition-colors hover:bg-star/15">
            Copiar
          </button>
          <button className="text-[8px] py-1 px-2.5 rounded bg-star text-black font-bold uppercase tracking-[0.5px]">
            → Lovable
          </button>
        </div>
      </div>
    </div>
  );
}

// Demo Card
function DemoCard({
  windowTitle,
  children,
  stepNum,
  title,
  description,
  delay,
}: {
  windowTitle: string;
  children: React.ReactNode;
  stepNum: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55 }}
      className="flex flex-col gap-4"
    >
      <div className="bg-[#0C0C14] border border-white/9 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(0,0,0,0.75)]">
        <WindowBar title={windowTitle} />
        {children}
      </div>
      <div>
        <div className="text-[13px] font-extrabold text-star mb-1">
          {stepNum}
        </div>
        <h4 className="font-bold text-[17px] tracking-[-0.3px]">
          {title}
        </h4>
        <p className="text-[13px] text-text-muted leading-[1.6] font-light mt-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Chat Demo
function ChatDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.55 }}
      className="mt-0"
    >
      <div className="bg-[#0C0C14] border border-white/9 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        {/* Window Bar */}
        <div className="bg-[#141420] py-3 px-4 flex items-center gap-2 border-b border-white/6">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <div className="flex-1 text-center text-[11px] text-text-muted">
            star — chat · meu-saas
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-star bg-star/8 py-[3px] px-2.5 rounded-full">
            <span className="w-[5px] h-[5px] bg-star rounded-full animate-pulse" />
            3 críticos encontrados
          </div>
        </div>

        {/* Chat Body */}
        <div className="grid grid-cols-2 min-h-[380px]">
          {/* Chat Messages */}
          <div className="p-6 border-r border-white/5 flex flex-col gap-3.5 overflow-hidden">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-star text-black py-2.5 px-4 rounded-2xl rounded-br-sm max-w-[75%] text-[13px] font-medium">
                Meu app está em produção mas não sei se está seguro. O que fazer?
              </div>
            </div>

            {/* STAR Response */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 bg-star rounded-full flex items-center justify-center shrink-0 text-xs">
                ★
              </div>
              <div className="bg-[#141420] border border-white/8 py-3 px-4 rounded-md rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-w-[85%]">
                <div className="text-xs font-semibold text-star mb-1.5">
                  STAR analisou seu repositório
                </div>
                <div className="text-[13px] text-white/75 leading-[1.6]">
                  Encontrei{" "}
                  <strong className="text-[#F87171]">3 problemas críticos</strong>{" "}
                  e <strong className="text-[#FB923C]">7 avisos</strong> no seu
                  código. O mais urgente:
                </div>
                <div className="mt-2.5 bg-[#0A0A12] border border-[#F87171]/20 rounded-lg py-2.5 px-3">
                  <div className="text-[10px] text-[#F87171] mb-1">
                    🔑 CRÍTICO · api/payments.js
                  </div>
                  <div className="text-xs text-white/60">
                    Sua chave Stripe está exposta no código. Qualquer pessoa com
                    acesso ao repo pode usar sua conta.
                  </div>
                </div>
              </div>
            </div>

            {/* User Message 2 */}
            <div className="flex justify-end">
              <div className="bg-star text-black py-2.5 px-4 rounded-2xl rounded-br-sm max-w-[75%] text-[13px] font-medium">
                Como resolvo isso no Lovable?
              </div>
            </div>

            {/* STAR Prompt Response */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 bg-star rounded-full flex items-center justify-center shrink-0 text-xs">
                ★
              </div>
              <div className="bg-[#141420] border border-white/8 py-3 px-4 rounded-md rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-w-[90%]">
                <div className="text-xs font-semibold text-star mb-2">
                  Prompt pronto para o Lovable ✓
                </div>
                <div className="bg-[#060609] border border-star/15 rounded-lg p-3 text-[10.5px] text-[#AAAABB] leading-[1.65]">
                  Em <span className="text-star">api/payments.js</span>, remova a
                  linha com{" "}
                  <span className="text-[#7DD3FC]">
                    STRIPE_SECRET = "sk_live_..."
                  </span>{" "}
                  e substitua por{" "}
                  <span className="text-star">process.env.STRIPE_SECRET_KEY</span>.
                  Crie o arquivo <span className="text-star">.env.local</span> com
                  a variável.
                </div>
                <div className="flex gap-2 mt-2.5">
                  <button className="text-[9px] py-1.5 px-3.5 bg-star/8 text-star border border-star/20 rounded hover:bg-star/15 tracking-[0.5px]">
                    Copiar prompt
                  </button>
                  <button className="text-[9px] py-1.5 px-3.5 bg-star text-black rounded font-bold tracking-[0.5px]">
                    Abrir no Lovable →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: File Context */}
          <div className="p-6 bg-[#09090F] flex flex-col gap-4">
            <div className="text-[10px] uppercase tracking-[1.5px] text-white/20 mb-1">
              Contexto · meu-saas
            </div>

            {/* File Being Analyzed */}
            <div className="bg-[#111119] border border-[#F87171]/20 rounded-lg p-3.5 border-l-2 border-l-[#F87171]">
              <div className="text-[10px] text-[#F87171] mb-2">
                📄 api/payments.js
              </div>
              <div className="text-[10.5px] text-white/50 leading-[1.7]">
                <span className="text-white/20">10</span>{" "}
                <span className="text-[#7DD3FC]">const</span> stripe = require(
                <span className="text-[#86efac]">&apos;stripe&apos;</span>)
                <br />
                <span className="text-[#F87171]">11</span>{" "}
                <span className="text-[#7DD3FC]">const</span> KEY ={" "}
                <span className="text-[#F87171] bg-[#F87171]/8 px-1 rounded">
                  &quot;sk_live_abc123...&quot;
                </span>
                <br />
                <span className="text-white/20">12</span>{" "}
                <span className="text-[#7DD3FC]">const</span> s = stripe(KEY)
              </div>
            </div>

            {/* Suggested Fix */}
            <div className="bg-[#111119] border border-[#4ADE80]/15 rounded-lg p-3.5 border-l-2 border-l-[#4ADE80]">
              <div className="text-[10px] text-[#4ADE80] mb-2">
                ✓ Correção sugerida
              </div>
              <div className="text-[10.5px] text-white/50 leading-[1.7]">
                <span className="text-white/20">10</span>{" "}
                <span className="text-[#7DD3FC]">const</span> stripe = require(
                <span className="text-[#86efac]">&apos;stripe&apos;</span>)
                <br />
                <span className="text-[#4ADE80]">11</span>{" "}
                <span className="text-[#7DD3FC]">const</span> KEY ={" "}
                <span className="text-[#4ADE80]">process.env</span>.
                <span className="text-star">STRIPE_SECRET_KEY</span>
                <br />
                <span className="text-white/20">12</span>{" "}
                <span className="text-[#7DD3FC]">const</span> s = stripe(KEY)
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="bg-[#111119] border border-white/5 rounded-lg p-3 text-center">
                <div className="font-extrabold text-2xl text-[#F87171]">
                  3
                </div>
                <div className="text-[9px] text-text-muted uppercase tracking-[1px] mt-0.5">
                  Críticos
                </div>
              </div>
              <div className="bg-[#111119] border border-white/5 rounded-lg p-3 text-center">
                <div className="font-extrabold text-2xl text-[#FB923C]">
                  7
                </div>
                <div className="text-[9px] text-text-muted uppercase tracking-[1px] mt-0.5">
                  Avisos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Demo() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="relative z-1 py-[120px] bg-white/8 border-t border-star/6"
      id="demo"
    >
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-[72px]"
        >
          <div className="text-[11px] tracking-[3px] uppercase text-star mb-5 flex items-center gap-3">
            <span className="w-7 h-px bg-star" />
            Veja ao vivo
          </div>
          <h2 className="font-extrabold text-[clamp(36px,4.5vw,66px)] leading-[0.98] tracking-[-2px] text-white mb-5">
            Três passos.
            <br />
            <span className="text-star">Do repo ao fix.</span>
          </h2>
          <p className="text-base text-text-muted leading-[1.7] font-light max-w-[460px]">
            Conecte, analise e receba o prompt exato. Veja como é em cada etapa.
          </p>
        </motion.div>

        {/* Steps Visual */}
        <div className="grid grid-cols-[1fr_32px_1fr_32px_1fr] items-center gap-0 mb-20">
          <DemoCard
            windowTitle="star — conectar repositório"
            stepNum="1 — Conectar"
            title="Selecione seu repositório"
            description="Login com GitHub OAuth. A STAR lê seu repo em modo somente-leitura — sem alterar nada."
            delay={0}
          >
            <GitHubConnect />
          </DemoCard>

          <div className="flex items-center justify-center text-text-muted text-xl pt-5">
            →
          </div>

          <DemoCard
            windowTitle="star — escaneando / meu-saas"
            stepNum="2 — Analisar"
            title="IA escaneia cada arquivo"
            description="Segurança, pagamentos, webhooks, arquitetura — tudo verificado em segundos."
            delay={0.1}
          >
            <Scanning />
          </DemoCard>

          <div className="flex items-center justify-center text-text-muted text-xl pt-5">
            →
          </div>

          <DemoCard
            windowTitle="star — resultados / meu-saas"
            stepNum="3 — Corrigir"
            title="Prompt pronto para usar"
            description="Cole diretamente no Lovable, Replit ou Claude Code e o problema é resolvido."
            delay={0.2}
          >
            <Results />
          </DemoCard>
        </div>

        {/* Chat Demo */}
        <ChatDemo />
      </div>
    </section>
  );
}
