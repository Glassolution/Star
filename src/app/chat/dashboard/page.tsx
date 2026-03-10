'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MessageSquare, Github, History, Search, HelpCircle, Lock, Rocket, Send, ChevronDown, PanelLeft, PanelRight, Zap, CheckCircle2, Star } from 'lucide-react';
import '../chat.css';

interface Message {
  type: 'star' | 'user' | 'loading';
  content?: string;
  id?: string;
}

const CHIP_RESPONSES: Record<string, () => string> = {
  'Analisar projeto': () => `Iniciando análise completa do seu repositório... 🔍<br><br>Encontrei 4 pontos que precisam da sua atenção. Você pode vê-los no painel de saúde à direita ou me perguntar sobre qualquer um deles aqui.`,
  'O que é webhook?': () => `Um webhook é como um recado automático que serviços externos (como o Stripe) mandam para o seu site quando algo acontece. <br><br>O problema no seu projeto é que esses recados podem ser processados duas vezes, gerando cobranças duplicadas. 💸<br><br>Quer ver como proteger? Clique em "Pagamento pode duplicar" no painel ao lado.`,
  'Proteger Stripe': () => `Encontrei sua senha do Stripe escrita diretamente no código. Isso é um risco crítico de segurança! 😬<br><br>O prompt de correção já está pronto no painel de saúde. Clique em "Senha do Stripe visível" para ver como resolver.`,
  'Pronto para lançar?': () => `Ainda não! 🚀<br><br>Você tem 2 problemas urgentes de segurança. Recomendo resolver a <strong>Senha do Stripe</strong> e a <strong>Proteção do Admin</strong> antes de colocar o site no ar.`,
};

const CODES: Record<string, string> = {
  stripe: `Abra o arquivo payments.js e procure por STRIPE_SECRET.

Substitua:
  STRIPE_SECRET = "sk_live_..."

Por:
  process.env.STRIPE_SECRET_KEY

Depois crie um arquivo .env na raiz do projeto:
  STRIPE_SECRET_KEY=sua_chave_aqui`,
  admin: `Adicione uma verificação de login em todas as páginas que começam com /admin.`,
  webhook: `Verifique se o ID do evento já foi processado antes de executar a lógica de pagamento.`,
  speed: `Use uma busca única (batch fetch) em vez de buscar usuários um por um no loop.`,
};

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [fixedIssues, setFixedIssues] = useState<Set<string>>(new Set());
  const [pickedIssue, setPickedIssue] = useState('stripe');
  const [placeholder, setPlaceholder] = useState('O que é essa senha do Stripe?');
  const [repoName, setRepoName] = useState('meu-saas-app');
  const [mode, setMode] = useState<'star' | 'starcoder'>('star');
  const [changeRepoOpen, setChangeRepoOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const placeholders = [
      'O que é essa senha do Stripe?',
      'Como protejo minha área de admin?',
      'O que é um webhook?',
      'Por que o site vai ficar lento?',
      'Como sei se meu projeto está seguro?',
      'O que faço antes de lançar?',
    ];
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[++i % placeholders.length]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    try {
      const n = typeof window !== 'undefined' ? localStorage.getItem('star:repo_name') : null;
      if (n) setRepoName(n);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      const m = typeof window !== 'undefined' ? localStorage.getItem('star:mode') : null;
      if (m === 'starcoder') setMode('starcoder');
    } catch {}
  }, []);

  const scrollFeed = () => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: text }, { type: 'loading' }]);
    setTimeout(scrollFeed, 50);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.type !== 'loading'));
      const response = CHIP_RESPONSES[text] || (() => `Entendido! Deixa eu verificar isso no seu projeto. 🔍<br><br>Pode me dar mais detalhes sobre o que está acontecendo?`);
      setMessages(prev => [...prev, { type: 'star', content: response() }]);
      setTimeout(scrollFeed, 50);
    }, 1000);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const togglePanel = () => setPanelCollapsed(!panelCollapsed);
  const toggleMode = () => {
    const next = mode === 'star' ? 'starcoder' : 'star';
    setMode(next);
    try { localStorage.setItem('star:mode', next); } catch {}
  };
  const openProjects = () => router.push('/projects');
  const startAnalysis = () => {
    setToastText('Análise iniciada');
    setTimeout(() => setToastText(null), 2500);
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(CODES[key] || '').then(() => {
      setFixedIssues(prev => new Set(prev).add(key));
    });
  };

  return (
    <div className="chat-container">
      <div className="app" style={{ visibility: 'visible' }}>
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sb-top">
            <div className="logo"><span className="logo-star">★</span><span className="logo-text"> STAR</span></div>
            <button className="new-btn" onClick={startAnalysis} title="Nova analise">
              <Plus size={14} />
              <span className="new-label">Nova analise</span>
            </button>
          </div>
          <nav className="sb-nav">
            <button className="nav-item on" title="Conversar com a STAR">
              <MessageSquare size={15} />
              <span className="nav-label">Conversar com a STAR</span>
            </button>
            <button className="nav-item" onClick={openProjects} title="Meus projetos">
              <Github size={15} />
              <span className="nav-label">Meus projetos</span>
            </button>
            <button className="nav-item" title="Histórico">
              <History size={15} />
              <span className="nav-label">Histórico</span>
            </button>
          </nav>
          <div className="sb-div"></div>
          <div className="sb-scroll">
            <div className="sb-section">Conversas recentes</div>
            <div className="hist-item"><div className="hist-name">Chave do Stripe exposta</div><div className="hist-date">hoje</div></div>
            <div className="hist-item"><div className="hist-name">Como funciona webhook?</div><div className="hist-date">ontem</div></div>
          </div>
          <div className="sb-foot">
            <div className="user-row">
              <div className="avatar">GH</div>
              <div>
                <div className="user-name">{repoName}</div>
                <div className="user-plan">Plano gratuito</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <button className={`tb-btn ${!sidebarCollapsed ? 'active' : ''}`} onClick={toggleSidebar}>
                <PanelLeft size={15} />
              </button>
              <div className="tb-sep"></div>
              <button className={`tb-btn ${!panelCollapsed ? 'active' : ''}`} onClick={togglePanel}>
                <PanelRight size={15} />
              </button>
              <div className="tb-sep"></div>
              <Github size={14} color="#6A6A80" />
              <span className="topbar-repo">{repoName}</span>
              <span className="topbar-sep">·</span>
              <button className="topbar-analyze" onClick={startAnalysis}>
                Analisar projeto
              </button>
              <span className="topbar-meta">Analisado há 3 minutos</span>
            </div>
            <div className="mode-toggle">
              <button
                className={`seg ${mode === 'star' ? 'on' : ''}`}
                onClick={() => setMode('star')}
              >
                <div className={`dot-status ${mode === 'star' ? 'on' : ''}`}></div>
                Star
              </button>
              <button
                className={`seg ${mode === 'starcoder' ? 'on' : ''}`}
                onClick={() => setMode('starcoder')}
              >
                <div className={`dot-status ${mode === 'starcoder' ? 'on' : ''}`}></div>
                Star Coder
              </button>
            </div>
            <div className="topbar-right">
              <div className="topbar-status"><div className="pulse"></div>Conectado</div>
              <button className="change-repo-btn" onClick={() => setChangeRepoOpen(v => !v)}>
                <Zap size={12} />
                Trocar projeto
              </button>
            </div>
          </div>
          {changeRepoOpen && (
            <div className="change-repo-menu">
              <div className="change-repo-head">RECENTE</div>
              {[
                { name: repoName, url: `github.com/user/${repoName}`, color: '#FFD700' },
                { name: 'Maximare', url: 'github.com/user/maximare', color: '#5EEAD4' },
                { name: 'Berry', url: 'github.com/user/berry', color: '#C4B5FD' },
              ].map((p, i) => (
                <button
                  key={i}
                  className="change-repo-item"
                  onClick={() => {
                    setRepoName(p.name);
                    try { localStorage.setItem('star:repo_name', p.name); localStorage.setItem('star:repo_url', p.url); } catch {}
                    setChangeRepoOpen(false);
                  }}
                >
                  <span className="menu-icon" style={{ background: p.color }}>{p.name[0]}</span>
                  <span className="menu-info">
                    <span className="menu-title">{p.name}</span>
                    <span className="menu-sub">{p.url}</span>
                  </span>
                  {p.name === repoName && <CheckCircle2 size={14} className="menu-check" />}
                </button>
              ))}
              <button className="change-repo-item" onClick={() => { setChangeRepoOpen(false); window.location.href = '/projects'; }}>
                <Plus size={13} />
                Adicionar projeto
              </button>
            </div>
          )}

          <div className="feed" ref={feedRef}>
            {messages.length === 0 ? (
              <div className="welcome visible">
                <div className="welcome-star">★</div>
                <div className="welcome-title">Olá! Sou a STAR. 👋</div>
                <div className="welcome-sub">Analisei seu projeto e encontrei algumas coisas para resolver. Pode me perguntar qualquer coisa.</div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={m.type === 'user' ? 'msg-user' : 'msg-star'}>
                  {m.type === 'star' && <div className="star-av">★</div>}
                  {m.type === 'loading' ? (
                    <div className="loading-bubble"><div className="dot-b"></div><div className="dot-b"></div><div className="dot-b"></div></div>
                  ) : (
                    <div className={m.type === 'user' ? 'bubble-user' : 'bubble'} dangerouslySetInnerHTML={{ __html: m.content || '' }} />
                  )}
                  {m.type === 'user' && <div className="avatar-user">GH</div>}
                </div>
              ))
            )}
          </div>

          <div className="input-area">
            <div className="input-area-inner">
              <div className="input-box">
                <div className="input-row">
                  <textarea 
                    className="inp" 
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(inputValue);
                        setInputValue('');
                      }
                    }}
                  />
                  <button className="send" onClick={() => { handleSend(inputValue); setInputValue(''); }}>
                      <Send size={14} color="#000" strokeWidth={2.5} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className={`panel ${panelCollapsed ? 'collapsed' : ''}`}>
          <div className="panel-head">
            <span className="panel-title">Painel de Saúde</span>
          </div>
          <div className="health">
            <div className="health-top">
              <div className="health-badge">
                <div className="health-badge-num">{4 - fixedIssues.size}</div>
              </div>
              <div className="health-info">
                <div className="health-title">Precisa de atenção ⚠️</div>
              </div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(fixedIssues.size / 4) * 100}%` }}></div>
            </div>
          </div>
          <div className="issues-scroll" style={{ padding: '10px' }}>
            {[
              { id: 'stripe', title: 'Senha do Stripe visível', urgent: true },
              { id: 'admin', title: 'Admin sem proteção', urgent: true },
              { id: 'webhook', title: 'Pagamento pode duplicar', urgent: false },
              { id: 'speed', title: 'Site vai ficar lento', urgent: false },
            ].map(issue => (
              <div 
                key={issue.id} 
                className={`issue-row ${pickedIssue === issue.id ? 'picked' : ''} ${fixedIssues.has(issue.id) ? 'fixed' : ''}`}
                onClick={() => setPickedIssue(issue.id)}
              >
                <div className="issue-txt">
                  <div className="issue-title">{issue.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px' }}>
            <button className="p-btn p-btn-gold" onClick={() => handleCopy(pickedIssue)}>
              Corrigir com IA
            </button>
          </div>
        </aside>
      </div>
      {toastText && (
        <div className="toast">
          <span className="toast-icon">★</span>
          <div className="toast-body">
            <div className="toast-label">STAR</div>
            <div className="toast-title">Análise pronta</div>
            <div className="toast-sub">{repoName} · {Math.max(1, 3 - fixedIssues.size)} problemas encontrados</div>
            <div className="toast-progress"></div>
          </div>
          <button className="toast-close" onClick={() => setToastText(null)}>×</button>
        </div>
      )}
    </div>
  );
}
