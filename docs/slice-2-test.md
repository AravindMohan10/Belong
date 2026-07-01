# Slice 2 test path — catalog, create club, RSVP, Warm Start

Local QA for Postgres-backed clubs and saved seats.

## Prerequisites

```bash
docker compose up -d
cp env.example .env.local   # if needed

npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## 1. Catalog from database

- [ ] Open `/` — four clubs in spotlight (from database, not static file)
- [ ] Open `/discover` — full catalog with next sessions
- [ ] Open `/clubs/sunday-cinema-walks` — club loads with next session

## 2. Guest — save a seat

- [ ] Sign out → open `/clubs/sunday-cinema-walks`
- [ ] Click **Save a seat** → lands on `/clubs/sunday-cinema-walks/save` with gathering summary
- [ ] Enter name + city → **Confirm seat** → redirects to Warm Start (no second tap)
- [ ] Back to club page → **You are on the list** ticket with Warm Start link
- [ ] Refresh — still on the list (row persists in Postgres)
- [ ] `/gatherings` and `/inbox` show your saved seat
- [ ] Direct `/clubs/sunday-cinema-walks/warm-start` without RSVP redirects to club page

### Already signed in

- [ ] `/enter` → **Continue as guest** with your name
- [ ] Open `/clubs/sunday-cinema-walks/save` → shows **Saving as {name}** → **Confirm seat** → Warm Start

## 3. Host — roster (your own club)

Use two browsers or a normal + incognito window.

- [ ] Browser A: `/enter` → **Continue as host** with your name → **Create a club** → publish
- [ ] Browser B: `/enter` → **Continue as guest** with a different name → open your club’s public page → **Save a seat**
- [ ] Browser A: **Tonight** → **Saved seats 1**, **First-timers 1**, guest name on roster

## 4. Create a club (new host)

- [ ] `/enter` → **Continue as host** with a new name
- [ ] `/host` → **Create a club**
- [ ] Fill form → **Publish club**
- [ ] Land on **Tonight** for your new club
- [ ] Public page `/clubs/your-slug` works
- [ ] Club appears on landing spotlight and `/discover`

## 5. Logged-out RSVP (single submit)

- [ ] Sign out → club page → **Save a seat** → `/clubs/{slug}/save`
- [ ] Name + city on confirm page → **Confirm seat** → Warm Start (no `/enter` detour)

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```
