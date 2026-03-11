import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  text: string;
};

export async function POST(request: Request) {
  try {
    const key = process.env.GEMINI_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "GEMINI_KEY não configurada no ambiente" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: IncomingMessage[] };
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return NextResponse.json({ error: "messages é obrigatório" }, { status: 400 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

    const geminiBody = {
      systemInstruction: {
        parts: [
          {
            text: "Você é a Star AI, especialista em segurança de código, vibe coding e desenvolvimento web. Analise repositórios, encontre vulnerabilidades e gere prompts prontos para Lovable, Replit e Claude Code. Responda em português de forma direta e técnica.",
          },
        ],
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });

    const json = await res.json();
    if (!res.ok) {
      const message = json?.error?.message ?? "Erro ao chamar Gemini";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const text =
      json?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("") ?? "";

    return NextResponse.json({
      text: text.trim() || "Não consegui gerar uma resposta agora. Tente novamente.",
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
