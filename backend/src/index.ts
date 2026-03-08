import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { timing } from 'hono/timing';
import type { Context, Next } from 'hono';
import { waitlistRouter } from './routes/waitlist.js';
import { AppError } from './lib/errors.js';

type RateLimitInfo = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, RateLimitInfo>();

function getClientIp(c: Context): string {
  const xff = c.req.header('x-forwarded-for');
  if (xff) {
    return xff.split(',')[0]?.trim() || 'unknown';
  }
  const realIp = c.req.header('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

const rateLimiter = async (c: Context, next: Next): Promise<Response | void> => {
  const ip = getClientIp(c);
  const now = Date.now();

  const current = rateLimitStore.get(ip) ?? { count: 0, windowStart: now };

  if (now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    current.count = 0;
    current.windowStart = now;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return c.json(
      {
        success: false,
        error: 'Muitas tentativas. Tente novamente em 1 minuto.',
      },
      429,
    );
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

  await next();
};

const app = new Hono();

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5500';
const corsOrigins = [frontendUrl, 'http://localhost:3000', 'http://localhost:5500'];

app.use('*', logger());
app.use('*', timing());
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return corsOrigins[0];
      if (corsOrigins.includes(origin)) return origin;
      return corsOrigins[0];
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
});

app.get('/health', (c) =>
  c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }),
);

app.use('/api/waitlist/register', rateLimiter);
app.route('/api/waitlist', waitlistRouter);

app.onError((err: unknown, c) => {
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        error: err.message,
        code: err.code,
      },
      err.statusCode,
    );
  }

  console.error('[unhandled-error]', err instanceof Error ? err.message : String(err));

  return c.json(
    {
      success: false,
      error: 'Erro interno',
    },
    500,
  );
});

const port = Number(process.env.PORT ?? '3333');

console.log(`🚀 Server running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

