import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const fromEmail = process.env.FROM_EMAIL ?? 'Early Access <noreply@seudominio.com>';

const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

function getBaseUrl(): string {
  return frontendUrl.replace(/\/+$/, '');
}

export async function sendWelcomeEmail(
  to: string,
  position: number,
  confirmToken: string,
): Promise<void> {
  if (!resendClient) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[email] RESEND_API_KEY não configurada, email de boas-vindas não será enviado.');
    }
    return;
  }

  const confirmUrl = `${getBaseUrl()}/waitlist/confirm/${confirmToken}`;

  const subject = '🎉 Você está na lista de espera!';

  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${subject}</title>
    </head>
    <body style="margin:0;padding:0;background:#050816;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:24px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#020617;border-radius:24px;border:1px solid #1f2937;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.8);">
              <tr>
                <td style="padding:32px 28px 24px 28px;">
                  <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b7280;margin-bottom:12px;">Early Access</div>
                  <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f9fafb;font-weight:600;">
                    Você entrou na lista de espera 🎉
                  </h1>
                  <p style="margin:16px 0 0 0;font-size:14px;line-height:1.6;color:#9ca3af;">
                    Obrigado por se inscrever. Estamos construindo algo especial e você acabou de garantir seu lugar.
                  </p>
                  <p style="margin:12px 0 0 0;font-size:13px;line-height:1.6;color:#9ca3af;">
                    Sua posição atual na fila é:
                  </p>
                  <div style="margin-top:12px;margin-bottom:4px;">
                    <span style="display:inline-block;padding:10px 18px;border-radius:999px;background:linear-gradient(135deg,#22c55e,#a855f7);color:#f9fafb;font-weight:600;font-size:18px;">
                      #${position}
                    </span>
                  </div>
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    Quanto mais cedo na lista, mais cedo você recebe o convite.
                  </p>
                  <div style="margin-top:24px;margin-bottom:8px;">
                    <a
                      href="${confirmUrl}"
                      style="
                        display:inline-block;
                        padding:10px 20px;
                        border-radius:999px;
                        background:linear-gradient(135deg,#4f46e5,#0ea5e9);
                        color:#f9fafb;
                        font-size:14px;
                        font-weight:500;
                        text-decoration:none;
                        box-shadow:0 10px 30px rgba(37,99,235,0.4);
                      "
                    >
                      Confirmar meu email
                    </a>
                  </div>
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    Se você não se cadastrou, ignore este email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px 20px 28px;border-top:1px solid #111827;">
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    Enviado pelo time <span style="color:#e5e7eb;">Early Access</span>.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });
}

export async function sendConfirmationSuccessEmail(to: string): Promise<void> {
  if (!resendClient) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[email] RESEND_API_KEY não configurada, email de confirmação não será enviado.');
    }
    return;
  }

  const subject = 'Email confirmado! 🎉';

  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${subject}</title>
    </head>
    <body style="margin:0;padding:0;background:#050816;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:24px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#020617;border-radius:24px;border:1px solid #1f2937;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.8);">
              <tr>
                <td style="padding:32px 28px 24px 28px;">
                  <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b7280;margin-bottom:12px;">Early Access</div>
                  <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f9fafb;font-weight:600;">
                    Email confirmado com sucesso 🎉
                  </h1>
                  <p style="margin:16px 0 0 0;font-size:14px;line-height:1.6;color:#9ca3af;">
                    Tudo certo por aqui. Assim que o Early Access estiver pronto, você será um dos primeiros a saber.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px 20px 28px;border-top:1px solid #111827;">
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    Enviado pelo time <span style="color:#e5e7eb;">Early Access</span>.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });
}

