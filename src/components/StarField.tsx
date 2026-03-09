"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  fadeSpeed: number;
  size: number;
  type: "dot" | "plus" | "cross";
  color: "white" | "gold";
  life: number;
  lifeSpeed: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const PARTICLE_COUNT = 110;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const createParticle = (): Particle => {
      const isEdge = Math.random() > 0.45;
      const side = Math.floor(Math.random() * 4);
      let px = Math.random() * canvas.width;
      let py = Math.random() * canvas.height;
      if (isEdge) {
        const margin = canvas.width * 0.15;
        if (side === 0) px = Math.random() * margin;
        else if (side === 1) px = canvas.width - Math.random() * margin;
        const vmargin = canvas.height * 0.12;
        if (side === 2) py = Math.random() * vmargin;
        else if (side === 3) py = canvas.height - Math.random() * vmargin;
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.18;
      const typeRoll = Math.random();
      return {
        x: px, y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 0,
        targetOpacity: 0.08 + Math.random() * 0.18,
        fadeSpeed: 0.003 + Math.random() * 0.006,
        size: 1 + Math.random() * 1.5,
        type: typeRoll < 0.55 ? "dot" : typeRoll < 0.8 ? "plus" : "cross",
        color: Math.random() > 0.35 ? "white" : "gold",
        life: Math.random(),
        lifeSpeed: 0.0008 + Math.random() * 0.0015,
      };
    };
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle);
    const drawDot = (ctx: CanvasRenderingContext2D, p: Particle, alpha: number) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = p.color === "gold" ? `rgba(255,212,0,${alpha})` : `rgba(255,255,255,${alpha})`;
      ctx.fill();
    };
    const drawPlus = (ctx: CanvasRenderingContext2D, p: Particle, alpha: number) => {
      const s = p.size * 3.5;
      ctx.strokeStyle = p.color === "gold" ? `rgba(255,212,0,${alpha})` : `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y);
      ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s);
      ctx.stroke();
    };
    const drawCross = (ctx: CanvasRenderingContext2D, p: Particle, alpha: number) => {
      const s = p.size * 4;
      const inner = s * 0.25;
      ctx.fillStyle = p.color === "gold" ? `rgba(255,212,0,${alpha})` : `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - s);
      ctx.quadraticCurveTo(p.x + inner, p.y - inner, p.x + s, p.y);
      ctx.quadraticCurveTo(p.x + inner, p.y + inner, p.x, p.y + s);
      ctx.quadraticCurveTo(p.x - inner, p.y + inner, p.x - s, p.y);
      ctx.quadraticCurveTo(p.x - inner, p.y - inner, p.x, p.y - s);
      ctx.closePath();
      ctx.fill();
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.life += p.lifeSpeed;
        if (p.life > 1) p.life = 0;
        const alpha = Math.sin(p.life * Math.PI) * p.targetOpacity;
        const pad = 20;
        if (p.x < -pad) p.x = canvas.width + pad;
        if (p.x > canvas.width + pad) p.x = -pad;
        if (p.y < -pad) p.y = canvas.height + pad;
        if (p.y > canvas.height + pad) p.y = -pad;
        if (alpha <= 0) return;
        if (p.type === "dot") drawDot(ctx, p, alpha);
        else if (p.type === "plus") drawPlus(ctx, p, alpha);
        else drawCross(ctx, p, alpha);
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
