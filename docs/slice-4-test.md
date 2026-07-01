# Slice 4 test path — mock membership & billing

Local QA for monthly club memberships (demo checkout, no real charges).

## Prerequisites

```bash
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

## 1. Unlock membership (attendance gate)

- [ ] Sign in as **Alex** (guest) at `/enter`
- [ ] Open `/clubs/sunday-cinema-walks`
- [ ] Sidebar **Membership** card says you can join (Alex has a past RSVP from seed)
- [ ] Sign out → card says attend first

## 2. Join flow (mock checkout)

- [ ] As Alex → **Join this club** → `/clubs/sunday-cinema-walks/join`
- [ ] See price (e.g. **$12/month**) and mock benefits
- [ ] Enter demo card `4242424242424242` + name → **Confirm membership**
- [ ] Land on `/memberships` with active membership listed

## 3. My clubs

- [ ] Tab **My clubs** in guest nav
- [ ] Membership shows club name, plan, member since
- [ ] **Club page** link works
- [ ] **Cancel membership** removes it from list

## 4. Club page (member state)

- [ ] After joining, sidebar shows **Member since {month}**
- [ ] **Manage membership** links to `/memberships`
- [ ] Join button hidden when already a member

## 5. Host view

- [ ] Sign in as **Mara** (host) → **Tonight** for Sunday Cinema Walks
- [ ] **Monthly members** count includes Alex after he joins
- [ ] **Members** sidebar lists Alex
- [ ] Guest roster shows **Member** label next to name when on tonight's list

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```
