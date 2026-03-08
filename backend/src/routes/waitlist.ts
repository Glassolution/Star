import { randomUUID } from 'node:crypto';
import { Hono } from 'hono';
import { z } from 'zod';
import { sql, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { waitlistUsers } from '../db/schema.js';
import { validateBody } from '../middleware/validate.js';
import { AppError, EmailAlreadyExistsError, InvalidTokenError } from '../lib/errors.js';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail, sendConfirmationSuccessEmail } from '../services/email.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterBody = z.infer<typeof registerSchema>;

const disposableDomains = [
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwam.com',
  'sharklasers.com',
  'yopmail.com',
];

function isDisposableEmailDomain(email: string): boolean {
  const parts = email.split('@');
  if (parts.length !== 2) return true;
  const domain = parts[1].toLowerCase();
  return disposableDomains.some(
    (blocked) => domain === blocked || domain.endsWith(`.${blocked}`),
  );
}

type WaitlistVariables = { validatedBody?: RegisterBody };

export const waitlistRouter = new Hono<{ Variables: WaitlistVariables }>();

// POST /register — Cadastra novo usuário na waitlist com email e senha
waitlistRouter.post('/register', validateBody(registerSchema), async (c): Promise<Response> => {
  const body = c.get('validatedBody');
  if (!body) {
    throw new Error('Validated body not found');
  }

  const { email: rawEmail, password } = body;

  const email = rawEmail.trim().toLowerCase();

  if (isDisposableEmailDomain(email)) {
    return c.json(
      {
        success: false,
        error: 'Emails de domínios temporários não são permitidos.',
      },
      400,
    );
  }

  try {
    const existing = await db
      .select({ id: waitlistUsers.id })
      .from(waitlistUsers)
      .where(eq(waitlistUsers.email, email));

    if (existing.length > 0) {
      throw EmailAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const confirmationToken = randomUUID();

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistUsers);

    const position = Number(countResult[0]?.count ?? 0) + 1;

    await db.insert(waitlistUsers).values({
      email,
      passwordHash,
      confirmed: false,
      confirmationToken,
      position,
    });

    void sendWelcomeEmail(email, position, confirmationToken).catch((err: unknown) => {
      console.error('[email] falha ao enviar email de boas-vindas', {
        message: err instanceof Error ? err.message : String(err),
      });
    });

    return c.json({
      success: true,
      message: 'Você está na lista!',
      position,
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      throw err;
    }
    console.error('[waitlist] erro ao registrar', {
      message: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
});

// GET /confirm/:token — Confirma email do usuário via token
waitlistRouter.get('/confirm/:token', async (c): Promise<Response> => {
  const token = c.req.param('token');

  if (!token) {
    throw InvalidTokenError();
  }

  try {
    const [user] = await db
      .select()
      .from(waitlistUsers)
      .where(eq(waitlistUsers.confirmationToken, token));

    if (!user) {
      throw InvalidTokenError();
    }

    if (user.confirmed) {
      return c.json({
        success: true,
        message: 'Seu email já foi confirmado anteriormente.',
      });
    }

    await db
      .update(waitlistUsers)
      .set({
        confirmed: true,
        confirmationToken: null,
      })
      .where(eq(waitlistUsers.id, user.id));

    void sendConfirmationSuccessEmail(user.email).catch((err: unknown) => {
      console.error('[email] falha ao enviar email de confirmação', {
        message: err instanceof Error ? err.message : String(err),
      });
    });

    return c.json({
      success: true,
      message: 'Email confirmado! 🎉',
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      throw err;
    }
    console.error('[waitlist] erro ao confirmar email', {
      message: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
});

// GET /stats — Retorna total de pessoas na waitlist (para landing page)
waitlistRouter.get('/stats', async (c): Promise<Response> => {
  try {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistUsers);

    const total = Number(countResult[0]?.count ?? 0);

    return c.json({
      total,
      message: `${total} pessoas já na lista`,
    });
  } catch (err: unknown) {
    console.error('[waitlist] erro ao buscar stats', {
      message: err instanceof Error ? err.message : String(err),
    });
    return c.json(
      {
        total: 0,
        message: '0 pessoas já na lista',
      },
      200,
    );
  }
});

