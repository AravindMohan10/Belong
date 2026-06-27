# Slice 1: Landing + Sunday Cinema Walks club page

## Manual test path

1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000`
   - Confirm warm ivory background, cinematic typography, and Belong positioning copy.
   - Click **See Sunday Cinema Walks** or the featured club card.
3. Open `http://localhost:3000/clubs/sunday-cinema-walks`
   - Confirm hero image, ritual label, vibe tags, first-timer promise, what to expect, host, memories, and next session sidebar.
4. Open `http://localhost:3000/clubs/unknown-club`
   - Confirm 404 page.
5. Run quality checks:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`

## What Slice 1 includes

- Landing page with hero, featured club card, and how-it-works section
- Public club page for seeded **Sunday Cinema Walks**
- Seed data layer (`lib/seed/demo-clubs.ts`) behind `db/queries/clubs.ts` for later DB swap

## What Slice 1 does not include

- RSVP, Warm Start, membership, host dashboard, attendance, or recap flows
