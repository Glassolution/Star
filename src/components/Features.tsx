"use client";

export function Features() {
  return (
    <section style={{
      background: "#080808",
      padding: "96px 0 120px",
    }}>
      <style>{`
        .feat-card {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .feat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "52px" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FFD400",
            opacity: 0.7,
            marginBottom: "14px",
          }}>O produto</p>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 4vw, 48px)",
            color: "white",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
          }}>
            Seu co-piloto de segurança,<br />de verdade.
          </h2>
        </div>

        {/* BENTO 2x2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "16px",
        }}>

          {/* CARD 1 — Grande topo esquerdo */}
          <div className="feat-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              height: "260px",
              background: "linear-gradient(160deg, #161616 0%, #0f0f0f 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "28px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{
                width: "100%", maxWidth: "380px",
                background: "#0a0a0a",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "14px" }}>★</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Boa tarde, Dev</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ background: "#161616", borderRadius: "10px", padding: "12px 14px", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "12px" }}>
                    Pergunte qualquer coisa...
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Analisar projeto", "O que é webhook?", "Proteger Stripe"].map(s => (
                      <span key={s} style={{ padding: "5px 11px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", marginBottom: "8px", lineHeight: 1.3 }}>Pergunte qualquer coisa sobre seu projeto</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>A STAR entende seu repositório e responde com contexto real — não respostas genéricas de GPT.</p>
            </div>
          </div>

          {/* CARD 2 — Menor topo direito */}
          <div className="feat-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              height: "260px",
              background: "linear-gradient(160deg, #161616 0%, #0f0f0f 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "28px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ width: "100%", maxWidth: "300px", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
                  <div style={{ background: "#FFD400", borderRadius: "18px 18px 4px 18px", padding: "9px 14px", fontSize: "12px", color: "#080808", fontWeight: 600, maxWidth: "200px" }}>
                    Verifique a estrutura do meu código
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ width: "26px", height: "26px", background: "#FFD400", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px" }}>★</div>
                  <div style={{ background: "#1a1a1a", borderRadius: "4px 18px 18px 18px", padding: "10px 14px", fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                    Encontrei alguns problemas no seu projeto. 🔍
                  </div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#c0392b", borderRadius: "20px", padding: "5px 12px 5px 5px", fontSize: "11px", color: "white", fontWeight: 600 }}>
                  <div style={{ width: "20px", height: "20px", background: "white", borderRadius: "50%", color: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 900 }}>N</div>
                  3 Issues ✕
                </div>
              </div>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", marginBottom: "8px", lineHeight: 1.3 }}>Issues críticos detectados na hora</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>Badge vermelho aparece quando há vulnerabilidades. Você nunca lança sem saber.</p>
            </div>
          </div>

          {/* CARD 3 — Menor baixo esquerdo */}
          <div className="feat-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              height: "260px",
              background: "linear-gradient(160deg, #161616 0%, #0f0f0f 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "28px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "360px", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ width: "130px", background: "#0d0d0d", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)", padding: "14px 12px", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
                    <span style={{ fontSize: "12px" }}>★</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>STAR</span>
                  </div>
                  {["Nova análise", "Conversar", "Projetos", "Histórico"].map((item, i) => (
                    <div key={i} style={{ padding: "6px 8px", fontSize: "11px", color: i === 1 ? "white" : "rgba(255,255,255,0.35)", background: i === 1 ? "rgba(255,255,255,0.07)" : "transparent", borderRadius: "8px", marginBottom: "2px" }}>{item}</div>
                  ))}
                  <div style={{ marginTop: "14px", padding: "0 8px", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em", marginBottom: "6px" }}>RECENTES</div>
                  {["Chave Stripe exposta", "Como funciona webhook?"].map((c, i) => (
                    <div key={i} style={{ padding: "5px 8px", fontSize: "10px", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{c}</div>
                  ))}
                </div>
                <div style={{ flex: 1, background: "#0d0d0d", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "22px" }}>★</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Olá! Sou a STAR.</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", marginBottom: "8px", lineHeight: 1.3 }}>Todos os seus projetos em um lugar</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>Histórico de análises e conversas recentes. Troca de projeto em segundos.</p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="feat-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              height: "260px",
              background: "linear-gradient(160deg, #161616 0%, #0f0f0f 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "32px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ width: "100%", maxWidth: "320px", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Perfil + notificação */}
                <div style={{ background: "#1a1a1a", borderRadius: "16px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
                  {/* Avatar */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #2a2a2a, #3a3a3a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👤</div>
                    {/* Badge vermelho */}
                    <div style={{ position: "absolute", top: "-2px", right: "-2px", width: "14px", height: "14px", background: "#e74c3c", borderRadius: "50%", border: "2px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "7px", color: "white", fontWeight: 900 }}>!</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "white", margin: "0 0 2px" }}>meu-saas-app</p>
                    <p style={{ fontSize: "11px", color: "#e74c3c", margin: 0, fontWeight: 500 }}>⚠️ Vulnerabilidade encontrada</p>
                  </div>
                </div>

                {/* Mensagem da STAR */}
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "30px", height: "30px", background: "#FFD400", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "13px" }}>★</div>
                  <div style={{ background: "#1a1a1a", borderRadius: "6px 16px 16px 16px", padding: "12px 16px", flex: 1 }}>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: "0 0 12px" }}>
                      Seu sistema de pagamento está aceitando cobranças falsas. Gerei a correção pra você. ✅
                    </p>
                    <div style={{ background: "#FFD400", borderRadius: "10px", padding: "9px 16px", fontSize: "12px", fontWeight: 700, color: "#080808", textAlign: "center", cursor: "pointer" }}>
                      ✨ Aplicar correção no Lovable
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", marginBottom: "8px", lineHeight: 1.3 }}>Você é avisado antes que vire problema</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>A STAR monitora seu projeto e entrega a correção pronta — sem precisar entender o código.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
