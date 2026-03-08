# Early Access Backend

Backend Node.js + TypeScript para página de Early Access, usando Hono, PostgreSQL (Neon) com Drizzle ORM, Resend e Zod.

## Requisitos

- Node.js 20+
- Conta no Neon (PostgreSQL)
- Conta no Resend para envio de emails

## Instalação e execução local

```bash
cd backend
npm install

# configurar variáveis de ambiente
cp .env.example .env

# criar/atualizar tabelas no banco
npm run db:push

# rodar em modo desenvolvimento
npm run dev
```

O servidor sobe por padrão em `http://localhost:3000` (ou na `PORT` definida).

## Variáveis de ambiente

- `DATABASE_URL`  
  URL de conexão PostgreSQL (Neon). Exemplo:  
  `postgres://user:password@ep-xxxxxx.us-east-1.aws.neon.tech/neondb`

- `JWT_SECRET`  
  Segredo usado para geração/validação de tokens JWT (reservado para futuras rotas autenticadas).

- `RESEND_API_KEY`  
  API key do Resend para envio de emails transacionais.

- `PORT`  
  Porta do servidor HTTP. Padrão: `3000`.

- `FRONTEND_URL`  
  URL do frontend (landing page). Usada para montar links de confirmação no email.  
  Exemplo em desenvolvimento: `http://localhost:3000`.

- `FROM_EMAIL`  
  Endereço de remetente usado pelo Resend.  
  Exemplo: `noreply@seudominio.com`.

## Banco de dados

Tabela principal `waitlist_users` (Drizzle ORM):

- `id` (uuid, primary key, default `crypto.randomUUID()`)
- `email` (text, unique, not null)
- `password_hash` (text, not null)
- `confirmed` (boolean, default `false`)
- `confirmation_token` (text, nullable)
- `position` (integer, posição na fila)
- `created_at` (timestamp, default `now()`)

Para aplicar o schema no banco:

```bash
npm run db:push
```

## Endpoints

Todas as rotas são servidas com prefixo `/api`.

### Healthcheck

- **GET** `/health`  
  Retorna status de saúde da API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-07T12:34:56.000Z",
  "uptime": 123.456
}
```

### Registrar na waitlist

- **POST** `/api/waitlist/register`

Validação com Zod:

```ts
{ email: string().email(), password: string().min(8) }
```

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "minimo8caracteres"
}
```

**Regras de negócio:**

1. Normaliza o email (lowercase + trim)
2. Bloqueia domínios temporários (`mailinator`, `tempmail`, `guerrillamail`, `10minutemail`, `throwam`, `sharklasers`, `yopmail`)
3. Verifica se o email já existe → `EmailAlreadyExistsError` (`409`)
4. Faz hash da senha com `bcrypt` (saltRounds = 12)
5. Gera `confirmation_token` via `crypto.randomUUID()`
6. Calcula `position = COUNT(*) + 1`
7. Insere no banco (`waitlist_users`)
8. Envia email de boas-vindas (não bloqueia se falhar)
9. Retorna:

```json
{
  "success": true,
  "message": "Você está na lista!",
  "position": 42
}
```

### Confirmar email

- **GET** `/api/waitlist/confirm/:token`

**Lógica:**

1. Busca usuário por `confirmation_token`
2. Se não encontrado → `InvalidTokenError` (`400`)
3. Se já confirmado → retorna mensagem amigável
4. Marca `confirmed = true` e limpa o token
5. Envia email de sucesso (não bloqueia se falhar)
6. Retorna:

```json
{
  "success": true,
  "message": "Email confirmado! 🎉"
}
```

### Estatísticas da waitlist

- **GET** `/api/waitlist/stats`

**Response:**

```json
{
  "total": 123,
  "message": "123 pessoas já na lista"
}
```

## Rate limiting

Na rota `POST /api/waitlist/register` é aplicado rate limiting:

- Máximo de **5 requisições por IP a cada 60 segundos**
- Em caso de estouro: resposta `429` com mensagem clara.

## Deploy no Railway (resumo)

1. Criar um novo projeto no Railway.
2. Adicionar um serviço PostgreSQL (ou apontar para o Neon via `DATABASE_URL`).
3. Criar um serviço a partir deste repositório apontando para a pasta `backend`.
4. Definir as variáveis de ambiente no painel do Railway (`DATABASE_URL`, `RESEND_API_KEY`, `JWT_SECRET`, `FROM_EMAIL`, `FRONTEND_URL`, `PORT` etc.).
5. Configurar o comando de build/start:
   - Build: `npm run build`
   - Start: `npm run start`
6. Rodar `npm run db:push` em um shell do Railway para criar as tabelas.

## Exemplo de chamada do frontend

Exemplo em React/Next.js usando `fetch` para `POST /api/waitlist/register`:

```ts
async function registerOnWaitlist(email: string, password: string) {
  const res = await fetch('/api/waitlist/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? 'Falha ao entrar na lista de espera');
  }

  return data as {
    success: true;
    message: string;
    position: number;
  };
}
```

Use esse helper em um formulário da landing page para integrar o frontend com o backend de Early Access.
*** End Patch```}세요} >>
