'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import './projects.css';

type Project = {
  name: string;
  url: string;
  lastAnalyzed: string;
  status: 'crit' | 'ok' | 'none';
  problems?: number;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('star:projects:v2') : null;
      if (stored) {
        setProjects(JSON.parse(stored));
        return;
      }
    } catch {}
    setProjects([
      { name: 'meu-saas-app', url: 'github.com/user/meu-saas-app', lastAnalyzed: 'Hoje', status: 'crit', problems: 5 },
      { name: 'Maximare', url: 'github.com/user/maximare', lastAnalyzed: 'Ontem', status: 'crit', problems: 1 },
      { name: 'Berry', url: 'github.com/user/berry', lastAnalyzed: '02/03', status: 'ok' },
      { name: 'landing-page', url: 'github.com/user/landing-page', lastAnalyzed: '28/02', status: 'none' },
      { name: 'api-gateway', url: 'github.com/user/api-gateway', lastAnalyzed: '25/02', status: 'crit', problems: 5 },
    ]);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('star:projects:v2', JSON.stringify(projects));
    } catch {}
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(p => p.name.toLowerCase().includes(q) || p.url.toLowerCase().includes(q));
  }, [projects, query]);

  const addProject = () => {
    const n = newName.trim();
    const u = newUrl.trim();
    if (!n || !u) return;
    const next = [{ name: n, url: u, lastAnalyzed: 'Não analisado', status: 'none' as const }, ...projects];
    setProjects(next);
    setAdding(false);
    setNewName('');
    setNewUrl('');
  };

  const openProject = (p: Project) => {
    try {
      localStorage.setItem('star:repo_name', p.name);
      localStorage.setItem('star:repo_url', p.url);
    } catch {}
    window.location.href = '/chat/dashboard';
  };

  return (
    <div className="projects-wrap">
      <div className="projects-head">
        <div className="projects-title">Meus Projetos</div>
        <div className="projects-actions">
          <input
            className="proj-search"
            placeholder="Buscar projetos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="proj-new" onClick={() => setAdding(true)}>+ Novo projeto</button>
        </div>
      </div>

      <div className="projects-table">
        <div className="proj-header">
          <div className="col-name">Projeto</div>
          <div className="col-date">Repositório</div>
          <div className="col-status">Status</div>
        </div>
        {filtered.map((p, i) => {
          const letter = p.name[0]?.toUpperCase() || 'P';
          const active = i === 0;
          return (
            <div key={p.name + i} className={`proj-row ${active ? 'active' : ''}`} onClick={() => openProject(p)}>
              <div className="col-name">
                <div className="proj-name">
                  <div className={`proj-icon ${active ? 'hi' : ''}`}>{letter}</div>
                  <div className="proj-meta">
                    <div className="proj-title">{p.name}</div>
                    <div className="proj-link">{p.url}</div>
                  </div>
                </div>
              </div>
              <div className="col-date">{p.lastAnalyzed}</div>
              <div className="col-status">
                {p.status === 'crit' && <span className="status-badge bad">{p.problems} problemas</span>}
                {p.status === 'ok' && <span className="status-badge ok">Sem problemas</span>}
                {p.status === 'none' && <span className="status-badge none">Não analisado</span>}
              </div>
            </div>
          );
        })}
      </div>

      {adding && (
        <div className="proj-modal">
          <div className="proj-backdrop" onClick={() => setAdding(false)}></div>
          <div className="proj-card">
            <div className="proj-card-title">Novo projeto</div>
            <input
              className="proj-inp"
              placeholder="nome do projeto"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              className="proj-inp"
              placeholder="github.com/user/repo"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <div className="proj-actions">
              <button className="p-btn p-btn-ghost" onClick={() => setAdding(false)}>Cancelar</button>
              <button className="p-btn p-btn-gold" onClick={addProject}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
