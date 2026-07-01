# Database setup (local + Aurora production)

Belong uses **PostgreSQL + Drizzle**. The same `DATABASE_URL` and migrations work locally and on **Amazon Aurora PostgreSQL**. Production deploy steps: **`docs/deploy-production.md`**.

## Phase 1: Before AWS credits (now)

### Option A: Docker (recommended)

```bash
docker compose up -d
```

Default local URL:

```text
DATABASE_URL=postgresql://belong:belong@localhost:5433/belong
```

Copy to `.env.local` in the project root (create the file; it is gitignored).

### Option B: Existing Postgres

Point `DATABASE_URL` at any Postgres 14+ instance. Keep it PostgreSQL-compatible (no provider-specific extensions).

### Migrations (once Slice 1.5 schema lands)

```bash
npm run db:generate   # after schema changes
npm run db:migrate    # apply to local DB
npm run db:seed       # demo personas (Alex, Mara)
```

### Verify

```bash
npm run db:studio     # optional: Drizzle Studio
```

## Phase 2: Production (Aurora + Vercel)

Full walkthrough: **`docs/deploy-production.md`**.

Quick version:

1. Create **Aurora PostgreSQL** with **public access** and security group port **5432**.
2. `DATABASE_URL=postgresql://USER:PASS@ENDPOINT:5432/belong?sslmode=require`
3. `npm run db:migrate` and `npm run db:seed` against that URL.
4. Add `DATABASE_URL` in Vercel (Production + Preview), deploy.
5. Screenshot Aurora in AWS Console + Vercel env for submission.

## Architecture (for submission diagram)

```text
User → Vercel (Next.js App Router)
         → Server Actions / Route Handlers
         → Aurora PostgreSQL (users, sessions, rsvps, …)
```

## What stays the same across environments

| Layer | Local | Production |
|-------|-------|------------|
| ORM | Drizzle | Drizzle |
| Schema | `db/schema/*` | same |
| Migrations | `drizzle/*` | same |
| Auth UX | Demo persona login | same |
| Auth data | Real rows in Postgres | Aurora |

## Troubleshooting

- **Build fails without DB**: Slice 1.5+ will use lazy DB connects; auth routes need `DATABASE_URL`, marketing pages do not.
- **SSL errors on Aurora**: append `?sslmode=require` to the URL.
- **Connection limits**: use Vercel connection pooling or RDS Proxy later; not needed for hackathon demo scale.
