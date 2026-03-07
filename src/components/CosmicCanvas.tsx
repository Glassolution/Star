"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  op: number;
  speed: number;
  phase: number;
  big: boolean;
  vx: number;
  vy: number;
  warm: boolean;
}

interface Connection {
  a: number;
  b: number;
  d: number;
}

export function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number>(0);

  const mkStar = useCallback((W: number, H: number): Star => {
    const big = Math.random() < 0.025;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: big ? Math.random() * 1.4 + 0.9 : Math.random() * 0.55 + 0.12,
      op: Math.random() * 0.55 + 0.15,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      big,
      vx: (Math.random() - 0.5) * 0.025,
      vy: (Math.random() - 0.5) * 0.025,
      warm: Math.random() < 0.12,
    };
  }, []);

  const buildConns = useCallback((stars: Star[]) => {
    const conns: Connection[] = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110 && Math.random() < 0.12) {
          conns.push({ a: i, b: j, d });
        }
      }
    }
    return conns;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight * 3;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight * 3;
      canvas.width = W;
      canvas.height = H;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    starsRef.current = Array.from({ length: 320 }, () => mkStar(W, H));
    connsRef.current = buildConns(starsRef.current);

    // Rebuild connections periodically
    const connInterval = setInterval(() => {
      connsRef.current = buildConns(starsRef.current);
    }, 10000);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const stars = starsRef.current;
      const conns = connsRef.current;

      // Draw constellation lines
      conns.forEach(({ a, b, d }) => {
        const op = (1 - d / 110) * 0.07;
        ctx.beginPath();
        ctx.moveTo(stars[a].x, stars[a].y);
        ctx.lineTo(stars[b].x, stars[b].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${op})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      });

      // Draw stars
      stars.forEach((s) => {
        s.phase += s.speed;
        const tw = Math.sin(s.phase) * 0.14;
        const op = Math.max(0, Math.min(1, s.op + tw));

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        if (s.big) {
          const g = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.r * 6
          );
          g.addColorStop(
            0,
            s.warm
              ? `rgba(255, 220, 130, ${op * 0.3})`
              : `rgba(200, 210, 255, ${op * 0.18})`
          );
          g.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? `rgba(255, 235, 180, ${op})`
          : `rgba(255, 255, 255, ${op})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(connInterval);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mkStar, buildConns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      id="cosmos"
    />
  );
}
