"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  projectType: string | null;
  referralSource: string | null;
  confirmed: boolean;
  position: number | null;
  createdAt: string;
};

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);

  const baseUrl = "";

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/early-access`);
      const json = await res.json();
      if (!res.ok || json?.error) {
        throw new Error(json?.error ?? "Falha ao carregar usuários");
      }
      const rows = (json.data ?? []) as Array<{
        id: string;
        full_name: string | null;
        email: string;
        phone: string | null;
        project_type: string | null;
        referral_source: string | null;
        created_at: string;
      }>;
      const mapped: User[] = rows.map((r) => ({
        id: r.id,
        email: r.email,
        fullName: r.full_name,
        phone: r.phone,
        projectType: r.project_type,
        referralSource: r.referral_source,
        confirmed: false,
        position: null,
        createdAt: r.created_at,
      }));
      setUsers(mapped);
      if (json.counts) {
        setTotal(json.counts.total ?? 0);
        setToday(json.counts.today ?? 0);
        setWeek(json.counts.week ?? 0);
      } else {
        setTotal(mapped.length);
        const now = new Date();
        const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const sevenDays = now.getTime() - 7 * 24 * 60 * 60 * 1000;
        setToday(mapped.filter((u) => new Date(u.createdAt).getTime() >= startToday).length);
        setWeek(mapped.filter((u) => new Date(u.createdAt).getTime() >= sevenDays).length);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const viewUser = async (id: string) => {
    const u = users.find((x) => x.id === id) || null;
    setSelected(u);
  };

  const filtered = users.filter((u) => {
    const t = `${u.email} ${u.fullName ?? ""} ${u.phone ?? ""} ${u.projectType ?? ""}`.toLowerCase();
    return t.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard · Waitlist</h1>
          <button onClick={load} className="py-2 px-4 bg-[#FFD700] text-black rounded hover:opacity-90">Atualizar</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#111119] border border-white/5 rounded-lg p-3 text-center">
            <div className="font-extrabold text-2xl text-white">{total}</div>
            <div className="text-[9px] text-text-muted uppercase tracking-[1px] mt-0.5">Total cadastrados</div>
          </div>
          <div className="bg-[#111119] border border-white/5 rounded-lg p-3 text-center">
            <div className="font-extrabold text-2xl text-[#4ADE80]">{today}</div>
            <div className="text-[9px] text-text-muted uppercase tracking-[1px] mt-0.5">Hoje</div>
          </div>
          <div className="bg-[#111119] border border-white/5 rounded-lg p-3 text-center">
            <div className="font-extrabold text-2xl text-[#FB923C]">{week}</div>
            <div className="text-[9px] text-text-muted uppercase tracking-[1px] mt-0.5">Esta semana</div>
          </div>
        </div>
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, email, telefone ou tipo"
            className="w-full md:w-96 px-4 py-2 bg-[#111111] border border-white/10 rounded outline-none"
          />
        </div>
        {loading ? (
          <div className="text-[#888888]">Carregando...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto border border-white/10 rounded">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[#BBBBBB]">
                <tr>
                  <th className="text-left p-3">Nome</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Telefone</th>
                  <th className="text-left p-3">Projeto</th>
                  <th className="text-left p-3">Criado</th>
                  <th className="text-left p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t border-white/10">
                    <td className="p-3">{u.fullName ?? "—"}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.phone ?? "—"}</td>
                    <td className="p-3">{u.projectType ?? "—"}</td>
                    <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
                    <td className="p-3">
                      <button onClick={() => viewUser(u.id)} className="py-1 px-3 bg-white/10 rounded hover:bg-white/20">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selected && (
          <div className="mt-6 border border-white/10 rounded p-4 bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Detalhes</h2>
              <button onClick={() => setSelected(null)} className="py-1 px-3 bg-white/10 rounded hover:bg-white/20">Fechar</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-white/60">ID:</span> {selected.id}</div>
              <div><span className="text-white/60">Criado:</span> {new Date(selected.createdAt).toLocaleString()}</div>
              <div><span className="text-white/60">Nome:</span> {selected.fullName ?? "—"}</div>
              <div><span className="text-white/60">Email:</span> {selected.email}</div>
              <div><span className="text-white/60">Telefone:</span> {selected.phone ?? "—"}</div>
              <div><span className="text-white/60">Projeto:</span> {selected.projectType ?? "—"}</div>
              <div><span className="text-white/60">Origem:</span> {selected.referralSource ?? "—"}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
