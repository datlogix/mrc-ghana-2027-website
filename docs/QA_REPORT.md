# QA report — MRC Ghana 2027 website

**Build tested:** local production build (`next build` + `next start`), 14 October 2026. Re-themed to match the registration app the same day.
**Status:** **Live on www.mrcghana.com since 15 Oct 2026** (owner-approved). Remaining dependencies in §3 still apply, notably enquiry email delivery.

## 1. Acceptance criteria

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Ghana event shows 29–30 January 2027 | ✅ | `event.ts`; build guard in `validate-content.ts` |
| 2 | Accra shown as host city | ✅ | Header, hero, footer, programme, structured data |
| 3 | Venue shown as not yet announced | ✅ | Hero badge, programme, essentials. JSON-LD omits a venue name |
| 4 | Exactly seven sports everywhere | ✅ | Single source `categories.ts`; build fails otherwise; forbidden-sport scan passes |
| 5 | Each category has a working page | ✅ | 7 static pages, all 200 |
| 6 | Each category has a readable PDF | ✅ | 7 tagged A4 PDFs (2–4 pages, ≤ 31 KB), body text ≥ 12 pt, QR to rules, source date, precedence notice |
| 7 | Each category links to the correct H.E.R.O. rules | ✅ | URLs enforced by build guard; all return 200 (external link check) |
| 8 | Videos have verified destinations and accurate labels | ✅ | 14 videos verified via oEmbed (title, uploader, date, embeddable); privacy-enhanced embed loads on click |
| 9 | Past event materials have verified dates and sources | ✅ | Olympiad 2025/2026 videos labelled "Greece", explicitly not Ghana |
| 10 | Gallery works on mobile | ✅ | 13 photos from MRC Global Olympiad 2025 (5 of Team Ghana); category / year / Team Ghana filters, keyboard lightbox, lazy loading; no overflow at 375 px |
| 11 | Lovable registration journey works | ⚠️ Partly | Website → `/register` → `mrcghana2027.lovable.app/register` → sign-in page verified. Form submission → confirmation not run: it would create a real record. Needs an agreed test entry (see LOVABLE_INTEGRATION.md) |
| 12 | Sponsorship enquiries reach the approved destination | ⚠️ Partly | Endpoint verified end-to-end against a mock webhook (all fields delivered). Needs production mailbox + Resend key or webhook |
| 13 | No fabricated sponsors or unconfirmed venue | ✅ | Partner wall hidden (0 approved); venue TBA |
| 14 | No travel-funding or qualification guarantees | ✅ | Explicit disclaimers; build scan for guarantee language |
| 15 | Mobile navigation & accessibility | ✅ | Menu opens, locks scroll, closes on Esc and returns focus; no horizontal overflow at 375 px; Lighthouse Accessibility 100 on 8 pages |
| 16 | No broken links or build errors | ✅ | 36 internal URLs and 43 external links checked, 0 broken; build passes |
| 17 | Source on GitHub | ✅ | See README / repository |
| 18 | Hosting & DNS documented | ✅ | `docs/DEPLOYMENT.md` |
| 19 | Current site restorable | ✅ (documented) | Rollback = reassign domains to the existing Vercel project (§6 of DEPLOYMENT.md) |

## 2. Test results

**Lighthouse 12.8 (mobile emulation, local production build):**

| Page | Perf | A11y | Best Pr. | SEO |
|---|---|---|---|---|
| `/` | 90–95 (3 runs; one outlier at 82) | 100 | 100 | 100 |
| `/categories/marathon` | 94 | 100 | 100 | 100 |
| `/categories/drone-soccer` | 92 | 100 | 100 | 100 |
| `/partners` | 94 | 100 | 100 | 100 |
| `/media` | 96 | 100 | 100 | 100 |
| `/register` | 91 | 100 | 100 | 100 |
| `/resources` | 94 | 100 | 100 | 100 |
| `/gallery` | 97 | 100 | 100 | 100 |

Re-run on the staging URL (real CDN) for final figures.

**Forms** (`/api/enquiry`):
- Validation: all required-field errors are returned and shown inline. Focus moves to the first invalid field.
- Honeypot filled → silent 200 (dropped). Submitted too fast (< 2.5 s) → silent 200 (dropped). Cross-origin POST → 403. Rate limit: 5 per 10 minutes per IP (per instance).
- No delivery configured → 503 with an email fallback shown to the user.
- Mock webhook delivery → 200, payload complete. HTML email body is escaped.

**Security headers:** CSP (self + YouTube-nocookie / i.ytimg / optional Turnstile and Plausible), HSTS, nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy. No secrets in the repository (`.env*` ignored; only `.env.example`).

**SEO:** per-page titles, descriptions and canonicals; Open Graph image; `sitemap.xml` (21 URLs); `robots.txt` (preview deployments are noindex); JSON-LD for Organization, WebSite, SportsEvent (no invented venue), BreadcrumbList and FAQPage; legacy-URL 308 redirects.

## 3. Unresolved dependencies (owner action required)

| # | Dependency | Who | Notes |
|---|---|---|---|
| D1 | ~~Lovable URL~~ resolved (`mrcghana2027.lovable.app`). **End-to-end test submission** still needed | Owner | Agree a clearly marked test entry, submit, confirm the single record, delete it |
| D2 | **Possible lost registrations on the current site** | Owner | The current homepage form appears to save only in the visitor's browser. Check with the teams |
| D3 | Lovable app updates (seven sports, age-based eligibility, branding, back-link) | Owner / Lovable maintainer | Checklist in LOVABLE_INTEGRATION.md |
| D4 | Enquiry delivery: approved mailbox + Resend API key (domain verified) or webhook | Owner | Environment variables only |
| D5 | Vercel access: import the repo, set env vars, create staging | Vercel account owner | `docs/DEPLOYMENT.md` §3 |
| D6 | Source repo of the current mrcghana.com | Vercel account owner | For archival/rollback records |
| D7 | Authorised photographs + consent records | Organisers | `src/data/gallery.ts` |
| D8 | Official logo files and permission (MRC / H.E.R.O. / The MakersPlace) | Organisers | The site uses an original typographic mark in the registration app's style until then |
| D12 | Exhibition team size | Organisers | The app says 1–3 members; the official H.E.R.O. page publishes none. The website shows "TBC" |
| D9 | Hero photo licence | Organisers | The hero reuses `robotics-lab.jpg` from the Lovable app. Confirm its licence/source (it is illustrative, not event footage) |
| D10 | Social media account URLs | Organisers | `event.contact.social` (only verified accounts) |
| D11 | Verified Exhibition video | Organisers | Slot intentionally empty |

## 4. Approvals required before publishing

- [ ] **Ghana organising committee:** approval record for the seven-sport programme (`event.programmeApproval`). Written H.E.R.O. confirmation if required.
- [ ] **Age eligibility:** how ages are calculated; whether mixed-school alliances are allowed (source flags 1 and 7).
- [ ] Exhibition rules (flag 2) and the Drone Soccer ball model (flag 3).
- [ ] Review of every category summary against the live rules (organiser sign-off).
- [ ] Privacy, cookies, photography-consent and terms content: **legal review** (marked as draft on `/privacy`).
- [ ] Indicative budget ranges on the partner form (GHS bands). Remove or adjust if not wanted.
- [ ] Each video watched once to confirm the footage.
- [ ] **Photo consent:** confirm the MRC 2025 event photography consent covers use of these gallery photos on mrcghana.com (young participants are visible in some).
- [ ] **H.E.R.O. permission** to use the official MRC sport tile images (and MRC mark) on mrcghana.com.
- [x] Final go-live approval for the domain cut-over (owner, 15 Oct 2026).
