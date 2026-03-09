"use client";

import { useEffect, useRef } from "react";

// Real-looking code snippets related to security/auth/webhooks
const CODE_LINES = [
  "const auth = await verifyToken(req.headers)",
  "if (!session) return res.status(401).json({})",
  "app.use(helmet({ contentSecurityPolicy: true }))",
  "await stripe.webhooks.constructEvent(body, sig)",
  "const hash = bcrypt.hashSync(password, 12)",
  "db.query('SELECT * FROM users WHERE id = ?', [id])",
  "cors({ origin: process.env.ALLOWED_ORIGINS })",
  "rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })",
  "jwt.verify(token, process.env.JWT_SECRET)",
  "res.setHeader('X-Content-Type-Options', 'nosniff')",
  "await prisma.user.findUnique({ where: { id } })",
  "if (req.method !== 'POST') return res.status(405)",
  "const encrypted = CryptoJS.AES.encrypt(data, key)",
  "webhook.on('payment_intent.succeeded', handler)",
  "sanitize(input).replace(/<[^>]*>/g, '')",
  "process.env.DATABASE_URL || 'localhost:5432'",
  "await redis.set(sessionId, data, 'EX', 3600)",
  "validateSchema(body, z.object({ email: z.string() }))",
  "fetch(url, { headers: { Authorization: `Bearer ${t}` }})",
  "try { await db.transaction(async (trx) => { ... })",
];

interface Column {
  x: number;
  y: number;
  speed: number;
  lineIndex: number;
  opacity: number;
  charOpacity: number[];
}

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 11;
    const COLUMN_COUNT = 10; // sparse — not matrix, just a few columns
    const GAP = canvas.width / (COLUMN_COUNT + 1);

    // Create sparse columns at irregular positions
    const columns: Column[] = Array.from({ length: COLUMN_COUNT }, (_, i) => {
      const lineIdx = Math.floor(Math.random() * CODE_LINES.length);
      const line = CODE_LINES[lineIdx];
      return {
        x: GAP * (i + 1) + (Math.random() - 0.5) * GAP * 0.4,
        y: Math.random() * -canvas.height, // start above viewport
        speed: 0.18 + Math.random() * 0.22, // very slow
        lineIndex: lineIdx,
        opacity: 0.04 + Math.random() * 0.07, // very subtle: 4-11%
        charOpacity: Array.from({ length: line.length }, () => 0.5 + Math.random() * 0.5),
      };
    });

    ctx.font = `${FONT_SIZE}px "JetBrains Mono", "Fira Mono", monospace`;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      columns.forEach((col) => {
        const line = CODE_LINES[col.lineIndex];

        // Draw each character with slight opacity variation
        for (let i = 0; i < line.length; i++) {
          const charAlpha = col.opacity * col.charOpacity[i];
          // Slight gold tint on keywords
          const char = line[i];
          const isKeyword = /[{}()=>;]/.test(char);
          if (isKeyword) {
            ctx.fillStyle = `rgba(255, 200, 0, ${charAlpha * 1.3})`;
          } else {
            ctx.fillStyle = `rgba(255, 215, 80, ${charAlpha})`;
          }
          ctx.fillText(char, col.x + i * 6.8, col.y);
        }

        // Move upward slowly
        col.y -= col.speed;

        // Reset when fully above viewport
        if (col.y < -FONT_SIZE * 2) {
          col.y = canvas.height + FONT_SIZE;
          col.lineIndex = Math.floor(Math.random() * CODE_LINES.length);
          const newLine = CODE_LINES[col.lineIndex];
          col.charOpacity = Array.from({ length: newLine.length }, () => 0.5 + Math.random() * 0.5);
          col.opacity = 0.04 + Math.random() * 0.07;
          col.speed = 0.18 + Math.random() * 0.22;
          // Slightly shift x position for variety
          col.x = GAP * (columns.indexOf(col) + 1) + (Math.random() - 0.5) * GAP * 0.4;
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
