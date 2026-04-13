# Next.js Dashboard

*Next.js App Router dashboard with invoices, customers, PostgreSQL, and NextAuth (credentials).*

![Dashboard preview](./docs/images/dashboard.avif)

## Features

- Authentication (NextAuth credentials + bcrypt)
- Dashboard metrics, revenue chart, latest invoices
- Invoices — search, pagination, create / edit / delete (Server Actions + Zod)
- Customers — search with invoice totals
- Middleware protecting `/dashboard`

## Tech stack

| Tech | Role |
|------|------|
| [Next.js 15](https://nextjs.org/) (App Router) | Framework |
| [React](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Types |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [postgres](https://github.com/porsager/postgres) | SQL client |
| [Auth.js / NextAuth v5](https://authjs.dev/) | Session & login |
| [Zod](https://zod.dev/) | Form validation |

## Requirements

- Node.js 18+
- [pnpm](https://pnpm.io/) (version pinned in `package.json`)
- PostgreSQL (connection string in `POSTGRES_URL`)

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `POSTGRES_URL` | Yes | Postgres connection URL (SSL as required by your host) |
| `AUTH_SECRET` | Yes | Secret for session signing — generate with `openssl rand -base64 32` |
| `AUTH_URL` | Yes | Base URL for Auth.js — local: `http://localhost:3000/api/auth`; production: `https://your-domain.vercel.app/api/auth` |
| `ALLOW_SEED` | No | Set to `true` **only** if you intentionally want `GET /seed` on production |

Copy `.env.example` to `.env` and fill the values. **Never commit `.env` or real secrets** — they are gitignored.

On [Vercel](https://vercel.com/), add the same variables under **Project → Settings → Environment Variables** for Production (and Preview if needed).

## Local setup

```bash
pnpm install
cp .env.example .env
# Edit .env with POSTGRES_URL, AUTH_SECRET, AUTH_URL
pnpm dev
```

### Seed the database (development only)

With `pnpm dev` running, open **once**:

```text
http://localhost:3000/seed
```

In **production**, `/seed` returns **404** unless you set `ALLOW_SEED=true` (discouraged on public apps). Prefer seeding from a trusted machine against your DB, or a one-off admin script.

### Demo login (after seed)

These match the sample data in `app/lib/placeholder-data.ts` — **change or remove** for any real deployment.

| | |
|---|---|
| **Email** | `user@nextmail.com` |
| **Password** | `123456` |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Production server (after `build`) |
| `pnpm lint` | ESLint |

## Security notes

- **Removed** the old `/query` dev route from the app surface.
- **Production `/seed`:** disabled by default (`NODE_ENV=production` without `ALLOW_SEED=true`).
- **Postgres:** restrict network access where your provider allows (e.g. allow only Vercel IPs or use the host’s recommended integration).
- **Dependencies:** this template may show upgrade advisories (e.g. Next.js) — run `pnpm outdated` and follow [Next.js security advisories](https://nextjs.org/blog).

## Project layout

```text
app/
  dashboard/     # Dashboard routes
  lib/           # Data, actions, types, seed data
  ui/            # Components
auth.ts
auth.config.ts
middleware.ts
```

## License

[MIT](./LICENSE) — educational project aligned with [Next.js Learn](https://nextjs.org/learn).
