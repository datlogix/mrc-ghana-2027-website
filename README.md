# MRC Ghana 2027 — Official Website

Source code for **www.mrcghana.com**, the website of the **Minoan RobotSports Competition Ghana 2027**
(30–31 January 2027, Accra, Ghana · venue to be announced), organised in Ghana by **The MakersPlace**
with the international programme of the **Hellenic Educational Robotics Organization (H.E.R.O.)**.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4. The visual theme matches the
registration app at https://mrcghana2027.lovable.app (tokens in `src/app/globals.css`). All public pages are
statically generated; the only server code is the enquiry form endpoint.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Validates content, then builds the production site |
| `npm start` | Serves the production build |
| `npm run typecheck` | TypeScript check |
| `npm run pdfs` | Regenerates the seven category PDFs from the content files |
| `npm run validate:content` | Content guard-rails (seven sports, no forbidden sports, verified videos, etc.) |
| `npm run check:links -- http://localhost:3000 --external` | Crawls a running site for broken links |

## Where things live

```
src/config/event.ts      ← dates, venue, registration URL, contacts, Global Olympiad (edit here first)
src/data/categories.ts   ← THE seven sports (single source for pages, menus, PDFs, registration links)
src/data/videos.ts       ← verified YouTube videos
src/data/gallery.ts      ← authorised photographs (empty until approved)
src/data/partners.ts     ← approved partners (logo wall hidden until populated) + partnership areas
src/data/faqs.ts         ← FAQs
src/data/downloads.ts    ← resources library (published / forthcoming / hidden)
src/data/sources.ts      ← source-verification register (machine-readable)
src/data/steps.ts        ← participation journey
src/app/                 ← routes (one folder per page)
src/components/          ← reusable UI
scripts/                 ← PDF generation, content validation, link checking
public/downloads/        ← generated PDFs
docs/                    ← handover documentation
```

## Documentation

- [Content editing guide](docs/CONTENT_EDITING.md) — for organisers updating text, dates, videos, photos, partners
- [Deployment, domain replacement & rollback](docs/DEPLOYMENT.md)
- [Lovable registration integration](docs/LOVABLE_INTEGRATION.md)
- [Source-verification register](docs/SOURCE_VERIFICATION.md)
- [QA report, open dependencies & approvals](docs/QA_REPORT.md)

## Principles

- Only verified information is published. Undecided matters show **“To be announced”**.
- Exactly **seven** sports: Drones, Drone Soccer 3×3, Marathon, Football 3×3, Shooting, Archery, Exhibition.
  The build fails if this changes.
- The current official H.E.R.O. rules always take precedence over our summaries.
- Registration stays in the **existing Lovable application** — this site never stores participant data.
- No secrets in the repository. Configure keys in the hosting provider's environment settings.
