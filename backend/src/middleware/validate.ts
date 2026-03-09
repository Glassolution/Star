import type { Context, Next } from 'hono';
import type { ZodSchema, ZodTypeAny } from 'zod';

export type AnyZodSchema = ZodSchema | ZodTypeAny;

/** Context type that allows storing validated body for downstream handlers */
type ValidateContext = Context<{ Variables: { validatedBody?: unknown } }>;

export const validateBody =
  (schema: AnyZodSchema) =>
  async (c: ValidateContext, next: Next): Promise<Response | void> => {
    let body: unknown;

    try {
      body = await c.req.json();
    } catch {
      return c.json(
        {
          success: false,
          errors: [
            {
              path: '',
              message: 'Body inválido. Certifique-se de enviar um JSON válido.',
            },
          ],
        },
        422,
      );
    }

    const result = schema.safeParse(body);

    if (!result.success) {
      return c.json(
        {
          success: false,
          errors: result.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        422,
      );
    }

    c.set('validatedBody', result.data);
    await next();
  };

