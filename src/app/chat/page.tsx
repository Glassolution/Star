'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Send, Search, HelpCircle, Shield, Layers, ChevronDown } from 'lucide-react';
import './chat.css';

export default function ChatLandingPage() {
  const [introOut, setIntroOut] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [wsInputValue, setWsInputValue] = useState('');
  const router = useRouter();

  const introL1Ref = useRef<HTMLDivElement>(null);
  const introL2Ref = useRef<HTMLDivElement>(null);

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

      <div id="welcome-screen" className={welcomeVisible ? 'visible' : ''}>
        <div className="ws-greeting">
          <span className="ws-greeting-star">★</span>
          Boa tarde, Dev
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
                <button className="ws-attach">
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
          </div>
        </div>
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
