# Belong

**Infrastructure for the second visit.** Belong is a full-stack web app for recurring real-life clubs: save a seat, get a Warm Start before you arrive, post memories after you attend, and join as a monthly member when you want to keep coming back.

[Live demo](https://belong-black.vercel.app) · [GitHub](https://github.com/AravindMohan10/Belong)

## What it does

| Role | Flow |
|------|------|
| **Guest** | Discover clubs → save a seat → Warm Start → attend → share photos & reviews → join as a member |
| **Host** | Create a club → see Tonight's roster → track first-timers and monthly members |

Belong is not event discovery. It is the layer between "I'm interested" and "I showed up and came back."

## Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend:** Server Actions, Zod validation, httpOnly session cookies
- **Database:** PostgreSQL via Drizzle ORM (Docker locally, Aurora in production)
- **Deploy:** Vercel

## Features (end-to-end)

- Location-aware discover (city presets, distance sorting)
- Guest auth (name + city) and host auth with route guards
- RSVP / save-a-seat flow with post-RSVP Warm Start
- Club pages with first-timer promise, schedule, host, and guest memories
- Verified memory uploads (attendance-gated)
- Monthly memberships with checkout and cancellation
- Host Tonight dashboard (RSVPs, first-timers, members)

## Local development

```bash
docker compose up -d
cp env.example .env.local
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Default local database: `postgresql://belong:belong@localhost:5433/belong`

## Production

Aurora PostgreSQL + Vercel. See [docs/deploy-production.md](docs/deploy-production.md).

```bash
npm run db:migrate:iam   # Aurora with IAM auth
npm run db:seed:iam
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Manual QA: [docs/slice-2-test.md](docs/slice-2-test.md), [docs/slice-4-test.md](docs/slice-4-test.md).

## Architecture

```
Browser → Vercel (Next.js) → Aurora PostgreSQL
                ↓
         Server Actions + Drizzle
         httpOnly session cookies
```

## Author

Built by [Aravind Mohan](https://github.com/AravindMohan10).
