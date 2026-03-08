"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  width: number;
  height: number;
  opacity: number;
  color: string;
  angle: number;
}

export function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const createParticle = useCallback((centerX: number, centerY: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 20;
    const speed = Math.random() * 0.15 + 0.05;
    const baseVx = Math.cos(angle) * speed;
    const baseVy = Math.sin(angle) * speed;
    const isGold = Math.random() > 0.6;

    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      originX: centerX + Math.cos(angle) * distance,
      originY: centerY + Math.sin(angle) * distance,
      vx: baseVx,
      vy: baseVy,
      baseVx,
      baseVy,
      width: Math.random() * 2 + 2,
      height: Math.random() * 1 + 1,
      opacity: Math.random() * 0.3 + 0.3,
      color: isGold ? "#FFD700" : "#FFFFFF",
      angle: Math.random() * Math.PI,
    };
  }, []);

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
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles from center
    const centerX = W / 2;
    const centerY = H / 2;
    particlesRef.current = Array.from({ length: 200 }, () => createParticle(centerX, centerY));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const repulsionRadius = 120;
      const repulsionStrength = 2;

      particles.forEach((p) => {
        // Calculate distance from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion if within radius
        if (distance < repulsionRadius && distance > 0) {
          const force = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.1;
          p.vy += Math.sin(angle) * force * 0.1;
        }

        // Gradually return to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Slowly drift outward from center
        const currentCenterX = W / 2;
        const currentCenterY = H / 2;
        const toCenterX = p.x - currentCenterX;
        const toCenterY = p.y - currentCenterY;
        const distFromCenter = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);

        // Slight outward drift
        if (distFromCenter > 0) {
          const driftSpeed = 0.005;
          p.baseVx += (toCenterX / distFromCenter) * driftSpeed;
          p.baseVy += (toCenterY / distFromCenter) * driftSpeed;
        }

        // Reset if too far from center
        if (distFromCenter > Math.max(W, H) * 0.8) {
          const newParticle = createParticle(currentCenterX, currentCenterY);
          p.x = newParticle.x;
          p.y = newParticle.y;
          p.originX = newParticle.originX;
          p.originY = newParticle.originY;
          p.vx = newParticle.vx;
          p.vy = newParticle.vy;
          p.baseVx = newParticle.baseVx;
          p.baseVy = newParticle.baseVy;
        }

        // Subtle rotation
        p.angle += 0.01;

        // Draw particle as small rectangle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color === "#FFD700" 
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
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      id="cosmos"
    />
  );
}
