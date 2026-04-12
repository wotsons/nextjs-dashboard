# Next.js Dashboard

Aplicação de dashboard inspirada no [curso oficial do Next.js App Router](https://nextjs.org/learn/dashboard-app) — gestão de faturas (invoices) e clientes, com autenticação e PostgreSQL.

![Dashboard preview](./docs/images/dashboard.avif)

## Funcionalidades

- **Autenticação** com NextAuth (credenciais) e bcrypt
- **Dashboard** com métricas, gráfico de receita e últimas faturas
- **Faturas** — listagem com pesquisa e paginação, criar, editar e eliminar (Server Actions + Zod)
- **Clientes** — listagem com pesquisa e totais por cliente
- **Middleware** para proteger rotas sob `/dashboard`

## Stack

| Tecnologia | Uso |
|------------|-----|
| [Next.js 15](https://nextjs.org/) (App Router) | Framework |
| [React](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [postgres](https://github.com/porsager/postgres) | Cliente SQL |
| [NextAuth.js v5](https://authjs.dev/) | Sessão e login |
| [Zod](https://zod.dev/) | Validação de formulários |

## Requisitos

- Node.js 18+
- [pnpm](https://pnpm.io/) (recomendado; o projeto fixa a versão em `package.json`)
- Base de dados PostgreSQL acessível via `POSTGRES_URL`

## Configuração

1. **Clonar e instalar dependências**

   ```bash
   pnpm install
   ```

2. **Variáveis de ambiente**

   Copia `.env.example` para `.env` e preenche pelo menos:

   - `POSTGRES_URL` — URL de ligação ao Postgres (SSL em produção, conforme o teu hosting)
   - `AUTH_SECRET` — gera com `openssl rand -base64 32`
   - `AUTH_URL` — em local, tipicamente `http://localhost:3000/api/auth`

3. **Popular a base de dados**

   Com o servidor de desenvolvimento a correr, acede uma vez a:

   ```text
   http://localhost:3000/seed
   ```

   Isto cria tabelas e dados de exemplo (utilizadores, clientes, faturas, receita).

4. **Executar em desenvolvimento**

   ```bash
   pnpm dev
   ```

   Abre [http://localhost:3000](http://localhost:3000). Credenciais de exemplo vêm dos dados do seed (ver `app/lib/placeholder-data.ts`).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento (Turbopack) |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção (após `build`) |
| `pnpm lint` | ESLint |

## Estrutura

```text
app/
  dashboard/     # Rotas do painel (overview, invoices, customers)
  lib/           # Dados, actions, tipos, seeds
  ui/            # Componentes reutilizáveis
auth.ts          # Configuração NextAuth (providers, sessão)
auth.config.ts   # Config partilhada (ex.: middleware)
middleware.ts    # Proteção de rotas /dashboard
```

## Licença e créditos

Projeto educativo alinhado ao [Next.js Learn](https://nextjs.org/learn).
