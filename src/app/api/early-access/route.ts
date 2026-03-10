import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, projectType, referralSource } = body;

    if (!fullName || !email || !phone || !projectType) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("early_access")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado" },
        { status: 409 }
      );
    }

    const { error } = await supabase.from("early_access").insert({
      full_name: fullName,
      email,
      phone,
      project_type: projectType,
      referral_source: referralSource || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Erro ao salvar dados" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Cadastro realizado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [{ data, error: listError }, { count: totalCount, error: totalError }, { count: todayCount, error: todayError }, { count: weekCount, error: weekError }] =
      await Promise.all([
        supabase
          .from("early_access")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200),
        supabase
          .from("early_access")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("early_access")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString()),
        supabase
          .from("early_access")
          .select("*", { count: "exact", head: true })
          .gte("created_at", weekStart.toISOString()),
      ]);

    if (listError || totalError || todayError || weekError) {
      return NextResponse.json({ error: "Erro ao listar dados" }, { status: 500 });
    }

    return NextResponse.json(
      {
        data: data ?? [],
        counts: {
          total: totalCount ?? 0,
          today: todayCount ?? 0,
          week: weekCount ?? 0,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
