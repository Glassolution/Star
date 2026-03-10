'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Send, Search, HelpCircle, Shield, Layers, ChevronDown, Link as LinkIcon, FileUp, Clipboard, History } from 'lucide-react';
import './chat.css';

export default function ChatLandingPage() {
  const [introOut, setIntroOut] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [wsInputValue, setWsInputValue] = useState('');
  const [repoOpen, setRepoOpen] = useState(false);
  const [repoInput, setRepoInput] = useState('');
  const [attachOpen, setAttachOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const router = useRouter();

  const introL1Ref = useRef<HTMLDivElement>(null);
  const introL2Ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const L1 = 'Pronto para fazer sua';
    const L2_PLAIN = 'STARtup decolar?';
    const cursor = '<span class="intro-cursor"></span>';

    let charIdx = 0;
    let typingLine = 1;

    const type = () => {
      if (typingLine === 1) {
        charIdx++;
        if (introL1Ref.current) {
          introL1Ref.current.innerHTML = L1.slice(0, charIdx) + cursor;
        }
        if (charIdx < L1.length) {
          setTimeout(type, 50);
        } else {
          charIdx = 0;
          typingLine = 2;
          if (introL1Ref.current) introL1Ref.current.innerHTML = L1;
          setTimeout(type, 300);
        }
      } else {
        charIdx++;
        if (introL2Ref.current) {
          const typed = L2_PLAIN.slice(0, charIdx);
          if (charIdx <= 4) {
             introL2Ref.current.innerHTML = `<span style="color:#FFD700; transition: color .45s ease">${typed}</span>` + cursor;
          } else {
             introL2Ref.current.innerHTML = `<span style="color:#FFD700">STAR</span>${typed.slice(4)}` + cursor;
          }
        }
        if (charIdx < L2_PLAIN.length) {
          setTimeout(type, 50);
        } else {
          setTimeout(() => {
            setIntroOut(true);
            setTimeout(() => {
              setWelcomeVisible(true);
            }, 1000);
          }, 1500);
        }
      }
    };

    const timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    router.push('/chat/dashboard');
  };
  const saveRepo = () => {
    const v = repoInput.trim();
    if (!v) {
      setRepoOpen(false);
      return;
    }
    let name = v;
    const m = v.match(/github\.com\/([^\/\s]+)\/([^\/\s]+)/i);
    if (m) {
      name = `${m[1]}/${m[2]}`;
    }
    try {
      localStorage.setItem('star:repo_url', v);
      localStorage.setItem('star:repo_name', name);
    } catch {}
    setRepoOpen(false);
  };
  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      try {
        localStorage.setItem('star:last_file', f.name);
      } catch {}
    }
    e.target.value = '';
    setAttachOpen(false);
  };
  const saveCode = () => {
    const v = codeInput.trim();
    if (v) {
      try {
        localStorage.setItem('star:last_paste', v.slice(0, 200));
      } catch {}
    }
    setCodeOpen(false);
    setAttachOpen(false);
  };

  return (
    <div className="chat-container">
      {!welcomeVisible && (
        <div id="intro" className={introOut ? 'out' : ''}>
          <div className="intro-text-wrap">
            <div className="intro-line1" ref={introL1Ref}></div>
            <div className="intro-line2" ref={introL2Ref}></div>
          </div>
        </div>
      )}

      <div id="welcome-screen" className={`${welcomeVisible ? 'visible' : ''} ${attachOpen ? 'attach-open' : ''}`}>
        <div className="ws-greeting">
          <span className="ws-greeting-star">★</span>
          Bem vindo, Dev
        </div>
        <div className="ws-input-card">
          <div className="ws-input-inner">
            <textarea 
              className="ws-inp" 
              placeholder="Pergunte qualquer coisa..."
              value={wsInputValue}
              onChange={(e) => setWsInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleStart();
                }
              }}
            />
            <div className="ws-input-footer">
              <div className="ws-footer-left">
                <button className="ws-attach" onClick={() => setAttachOpen(v => !v)}>
                  <Plus size={14} />
                </button>
              </div>
              <div className="ws-footer-right">
                <span className="ws-footer-model">
                  STAR v1
                  <ChevronDown size={11} style={{ marginLeft: '4px' }} />
                </span>
                <button className="ws-send" onClick={handleStart}>
                  <Send size={14} color="#000" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFilePick} />
            {attachOpen && (
              <>
              <div className="attach-backdrop" onClick={() => setAttachOpen(false)}></div>
              <div className="attach-menu">
                <button className="attach-item" onClick={() => { setRepoOpen(true); setAttachOpen(false); }}>
                  <LinkIcon size={13} />
                  Conectar repositório
                </button>
                <button className="attach-item" onClick={() => fileInputRef.current?.click()}>
                  <FileUp size={13} />
                  Enviar arquivo
                </button>
                <button className="attach-item" onClick={() => { setCodeOpen(true); }}>
                  <Clipboard size={13} />
                  Colar código
                </button>
              </div>
              </>
            )}
          </div>
        </div>
        {repoOpen && (
          <div className="repo-modal">
            <div className="repo-backdrop" onClick={() => setRepoOpen(false)}></div>
            <div className="repo-card">
              <div className="repo-title">Conectar repositório</div>
              <input
                className="repo-inp"
                placeholder="https://github.com/usuario/repo"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
              />
              <div className="repo-actions">
                <button className="p-btn p-btn-ghost" onClick={() => setRepoOpen(false)}>Cancelar</button>
                <button className="p-btn p-btn-gold" onClick={saveRepo}>Salvar</button>
              </div>
            </div>
          </div>
        )}
        {codeOpen && (
          <div className="repo-modal">
            <div className="repo-backdrop" onClick={() => setCodeOpen(false)}></div>
            <div className="repo-card">
              <div className="repo-title">Colar código</div>
              <textarea
                className="repo-inp"
                placeholder="// Seu snippet aqui..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                rows={6}
              />
              <div className="repo-actions">
                <button className="p-btn p-btn-ghost" onClick={() => setCodeOpen(false)}>Cancelar</button>
                <button className="p-btn p-btn-gold" onClick={saveCode}>Salvar</button>
              </div>
            </div>
          </div>
        )}
        <div className="ws-disclaimer">
          isso é uma IA e ela pode cometer erros
        </div>
        <div className="ws-chips">
          <div className="ws-chip" onClick={handleStart}>
            <Search size={13} strokeWidth={1.8} />
            Analisar projeto
          </div>
          <div className="ws-chip" onClick={handleStart}>
            <HelpCircle size={13} strokeWidth={1.8} />
            O que é webhook?
          </div>
          <div className="ws-chip" onClick={handleStart}>
            <Shield size={13} strokeWidth={1.8} />
            Proteger Stripe
          </div>
          <div className="ws-chip" onClick={handleStart}>
            <Layers size={13} strokeWidth={1.8} />
            Pronto para lançar?
          </div>
        </div>
      </div>
    </div>
  );
}
