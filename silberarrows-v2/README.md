# SilberArrows v2

A modern, black-themed website with silver accents for **SilberArrows** — Dubai's independent Mercedes-Benz service centre.

Built from scratch with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. All copy is sourced from `SITE_CONTENT.md` in the parent folder.

## Stack

- Next.js 15 (App Router, RSC)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (zero-config via `@tailwindcss/postcss`)
- `lucide-react` for icons

## Getting Started

```bash
cd silberarrows-v2
npm install
npm run dev
```

The dev server runs at [http://localhost:3001](http://localhost:3001).

## Pages

| Route                              | Purpose                                              |
| ---------------------------------- | ---------------------------------------------------- |
| `/`                                | Home (hero, why us, services, team, contracts, etc.) |
| `/services`                        | Services index                                       |
| `/services/[slug]`                 | 10 service detail pages (statically generated)       |
| `/service-pricing`                 | Transparent pricing tables                           |
| `/service-contracts`               | Standard / Premium service contracts                 |
| `/contact`                         | Contact + workshop map                               |
| `/thank-you/service`               | Post-submit thank you (noindex)                      |
| `/lp/[slug]`                       | 5 PPC landing pages (noindex, follow)                |

## Design System

- **Theme**: black foundation (`#050505 → #1c1c20`) with **silver** accents (`#e5e4e2 → #6c6c72`).
- **Type**: Inter, with display headings using a vertical silver gradient (`text-silver-shine`).
- **UI primitives**: `glass-card`, `ring-silver`, `btn-silver`, `btn-ghost`, `divider-chrome` defined in `app/globals.css`.
- **Motion**: subtle rise / fade animations, hover lifts, shimmer on key surfaces.

## Folder Structure

```
silberarrows-v2/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── globals.css                 # Theme tokens & utilities
│   ├── icon.svg
│   ├── not-found.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── service-pricing/page.tsx
│   ├── service-contracts/page.tsx
│   ├── contact/page.tsx
│   ├── thank-you/service/page.tsx
│   └── lp/[slug]/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── ContactModal.tsx
│   ├── ContactModalProvider.tsx
│   ├── CTAButton.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── PageHero.tsx
│       ├── SectionHeader.tsx
│       ├── WhyChooseUs.tsx
│       ├── Services.tsx
│       ├── Team.tsx
│       ├── Contracts.tsx
│       └── Contact.tsx
├── lib/
│   ├── site.ts          # Business info, nav, badges
│   ├── services.ts      # 10 services with overviews & process
│   ├── content.ts       # Team, why-choose, contracts, pricing, lp
│   └── utils.ts
├── public/
└── ...config files
```

## Notes

- Image filenames from the original site are referenced in `lib/services.ts` (`hero` field) but the build does not yet ship binary assets — drop your `.webp/.avif` files into `public/assets/images/` to enable them in service detail hero backgrounds if desired.
- The contact modal redirects users to WhatsApp with their pre-filled details.
