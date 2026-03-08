"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  opacity: number;
  color: string;
  angle: number;
  driftVx: number;
  driftVy: number;
}

export function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles spread across the entire canvas
    // They already exist, no lifecycle
    const createParticle = (x?: number, y?: number): Particle => {
      const px = x ?? Math.random() * W;
      const py = y ?? Math.random() * H;
      const isGold = Math.random() > 0.6;

      return {
        x: px,
        y: py,
        originX: px,
        originY: py,
        vx: 0,
        vy: 0,
        width: Math.random() * 2 + 2,
        height: Math.random() * 1 + 1,
        opacity: Math.random() * 0.3 + 0.3,
        color: isGold ? "#FFD700" : "#FFFFFF",
        angle: Math.random() * Math.PI,
        driftVx: (Math.random() - 0.5) * 0.08,
        driftVy: (Math.random() - 0.5) * 0.08,
      };
    };

    particlesRef.current = Array.from({ length: 200 }, () => createParticle());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const repulsionRadius = 140;
      const returnStrength = 0.03; // How fast particles return to origin
      const repulsionStrength = 8;

      particles.forEach((p) => {
        // Calculate distance from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion if within radius
        if (distance < repulsionRadius && distance > 0) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * repulsionStrength * 0.1;
          p.vy += Math.sin(angle) * force * repulsionStrength * 0.1;
        }

        // Return to origin with easing
        const returnDx = p.originX - p.x;
        const returnDy = p.originY - p.y;
        p.vx += returnDx * returnStrength;
        p.vy += returnDy * returnStrength;

        // Apply very slow drift to origin position
        p.originX += p.driftVx;
        p.originY += p.driftVy;

        // Wrap origin position around screen
        if (p.originX < 0) p.originX = W;
        if (p.originX > W) p.originX = 0;
        if (p.originY < 0) p.originY = H;
        if (p.originY > H) p.originY = 0;

        // Apply velocity with damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap position around screen
        if (p.x < 0) {
          p.x = W;
          p.originX = W + (p.originX - p.x);
        }
        if (p.x > W) {
          p.x = 0;
          p.originX = -(p.originX - p.x);
        }
        if (p.y < 0) {
          p.y = H;
          p.originY = H + (p.originY - p.y);
        }
        if (p.y > H) {
          p.y = 0;
          p.originY = -(p.originY - p.y);
        }

        // Ensure origin stays in bounds
        if (p.originX < 0) p.originX += W;
        if (p.originX > W) p.originX -= W;
        if (p.originY < 0) p.originY += H;
        if (p.originY > H) p.originY -= H;

        // Subtle rotation
        p.angle += 0.002;

        // Draw particle as small rectangle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle =
          p.color === "#FFD700"
            ? `rgba(255, 215, 0, ${p.opacity})`
            : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      id="cosmos"
    />
  );
}
