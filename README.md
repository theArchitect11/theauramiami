# The Aura Miami

Private Miami residence guide and inquiry concierge.

## What Is Here

- `src/` - Vite + React + TypeScript application source.
- `src/components/aura/` - The Aura Miami experience components.
- `src/components/ui/` - Shared shadcn-style primitive components.
- `src/data/` - Area, building, and journal data.
- `src/assets/` - Local imagery and visual assets.
- `docs/blueprint/` - Archived AXIOM / LAB planning materials.
- `public/` - Static files served directly by Vite.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Launch Notes

- Set `VITE_N8N_WEBHOOK_URL` before launch to connect the inquiry form.
- Public contact email: `hello@theauramiami.com`.
- Concierge/automation inbox: `concierge@theauramiami.com`.
- Real estate services should be routed through licensed brokerage partners.

## Current Routes

- `/` - Homepage and private guide.
- `/buy` - Purchase-focused intent page.
- `/rent` - Lease-focused intent page.
- `/sell` - Seller-focused intent page.
- `/explore` - AURA Map directory with area search and filters.
- `/area/:slug` - Neighborhood and area guides.
- `/building/:slug` - Building dossier pages.
- `/journal` - Magazine-style editorial layer.
- `/privacy` - Privacy notice.
- `/terms` - Terms of use.
