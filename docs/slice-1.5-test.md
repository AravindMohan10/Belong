# Slice 1.5: Demo roles & routing

## Prerequisites

```bash
docker compose up -d
cp env.example .env.local
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Guest path

1. Open `/enter`
2. Click **Alex** (demo guest) or enter a custom name as guest
3. Land on `/clubs/sunday-cinema-walks`
4. Header shows `Hi, Alex` and **Sign out**

## Host path

1. Sign out if needed
2. Open `/enter`
3. Click **Mara** (demo host)
4. Land on `/host/clubs/sunday-cinema-walks`
5. Header shows **Host** link and tonight shell with 0 RSVPs

## Guards

1. Open `/host/clubs/sunday-cinema-walks` while signed out → redirects to `/enter`
2. Sign in as guest, visit `/host/clubs/sunday-cinema-walks` → redirected to club page

## Database check

```bash
npm run db:studio
```

Confirm `users` has Alex and Mara, `sessions` row after sign in.

## Aurora swap (later)

Replace `DATABASE_URL` in `.env.local` and Vercel with Aurora URL, run `npm run db:migrate` and `npm run db:seed` against Aurora.
