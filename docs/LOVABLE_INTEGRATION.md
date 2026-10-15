# Lovable registration integration

**Principle:** the registration application already exists in Lovable. This website does **not** recreate its database, forms, authentication or business logic. It only links visitors into it.

## Current state (audit, 14 October 2026)

- **Registration app:** https://mrcghana2027.lovable.app ("MRC Ghana 2027 Registration", by MakersPlace Ghana). It is a TanStack Router single-page app with these routes:

  | Route | Purpose |
  |---|---|
  | `/` | Landing page (overview, seven sports, preparation, next steps) |
  | `/rules?sport=<slug>` | Sports & rules. Slugs: `drones, drone-soccer, marathon, football, shooting, archery, exhibition` (identical to this website's) |
  | `/prepare` | "Before you begin" checklist |
  | `/auth` | Passwordless email sign-in |
  | `/register` | **Authenticated** registration form. Accepts only `?id=<draft uuid>` (resume a draft); there is **no sport/category parameter** |
  | `/registrations` | Applicant's saved drafts and submissions |
  | `/admin` | Reviewer workspace (protected) |
  | `/privacy` | Draft privacy & safeguarding notice |

- The app describes entries as an **"Expression of Interest — eligibility review required"**. The website now uses the same wording (homepage notice band, `/register`, FAQ).
- `register.mrcghana.com` resolves to Vercel but returns `DEPLOYMENT_NOT_FOUND`: the subdomain exists in Vercel DNS but no project is attached to it.
- **Important finding on the current mrcghana.com:** its built-in "Team Registration Portal" sends registrations to `/api/registrations` on the same domain. Production returns 404 for `/api/*` (e.g. `/api/health`). The front-end code then catches non-validation errors, saves the entry only in the visitor's browser (`localStorage`), and still displays a generated "MRC27-GH-xxxx" confirmation code. Registrations submitted through the current homepage form may never have reached the organisers. **Please check whether any teams believe they registered there**, and contact them if so. (We did not submit any test data to production.)

### Differences between the app and the official rules (for review)

- The app lists **Exhibition** as "1–3 team members". The official H.E.R.O. Exhibition page published no rules when checked (14 Oct 2026), so the website shows "Team size TBC". Confirm the source before either is changed.
- The app's age bands and boundary-review notices match the website's summaries.
- The app uses display names such as "MRC Drones" and "MRC Football 3x3". The website uses the approved names ("Drones", "Football 3×3"). Both refer to the same seven sports.

## How the new site integrates

| Piece | Behaviour |
|---|---|
| Every "Register a Team" button | Goes to the branded landing page `/register` |
| Category buttons | Go to `/register?category=<slug>`. The page confirms the chosen sport and tells the applicant to select it in the form |
| `/register` | Explains what is needed, then **Start registration** links to `https://mrcghana2027.lovable.app/register` (sign-in first, then the form) |
| URL source | `NEXT_PUBLIC_REGISTRATION_URL` if set, otherwise the fallback in `src/config/event.ts` |
| Category pre-selection | Not available (the app's `/register` accepts only `?id=`). It is enabled automatically if `event.registration.categoryParam` is set after the app adds support |
| Data | No participant data touches this website |

The link opens in the same tab, which avoids pop-up blockers and keeps the back button working. An iframe is **not** used. Embedded registration forms often break authentication cookies, file uploads and mobile keyboards, and the site's `frame-src` policy would need widening.

## Steps to go live

1. ~~Find the published Lovable URL.~~ Done: `https://mrcghana2027.lovable.app`.
2. **(Recommended) custom subdomain `register.mrcghana.com`**
   - In Lovable: Project → Settings → **Domains** → *Connect domain* → `register.mrcghana.com`. Lovable shows the DNS records it needs, typically an `A` record and a `TXT` verification record.
   - mrcghana.com DNS is hosted on **Vercel DNS** (`ns1/ns2.vercel-dns.com`). In Vercel → Domains → `mrcghana.com` → DNS Records, add the records Lovable specifies for the `register` host.
   - Check for an existing `register` record or wildcard in Vercel DNS, and that no Vercel project claims `register.mrcghana.com`. Today it resolves to Vercel with `DEPLOYMENT_NOT_FOUND`, so remove that domain from any Vercel project first.
   - Wait for Lovable to issue SSL, then confirm `https://register.mrcghana.com` loads.
3. **Set the environment variable** in Vercel (Production and Preview):
   `NEXT_PUBLIC_REGISTRATION_URL=https://register.mrcghana.com` (or the lovable.app URL). Redeploy.
4. **Category parameter (optional).** If the Lovable form should pre-select a sport, make a documented change in Lovable so `/register` also accepts `?sport=<slug>` (the app already uses `sport` on `/rules`) and preserves it through sign-in. Then set `registration.categoryParam: "sport"` in `src/config/event.ts`.
5. **Back-link.** In the Lovable app header, add a "← mrcghana.com" link to `https://www.mrcghana.com`.

## Changes to request inside the Lovable project (handle separately)

Do not modify the data model silently. Document and review each change:

- [x] Sports list shows the seven Ghana sports (verified on the app's landing page). Still to do: confirm the registration form's selection lists **exactly** the seven Ghana sports with these names: Drones · Drone Soccer 3×3 · Marathon (Basic / Advanced) · Football 3×3 · Shooting · Archery · Exhibition.
- [ ] Eligibility uses **age**, not school class. Show the published bands and note that the organisers will confirm how age is calculated.
- [ ] Drone Soccer 3×3 and Football 3×3 explain alliances of three teams from the same school or institution.
- [ ] Event details match: **29–30 January 2027** (changed from 30–31 January on 15 Oct 2026), Accra, venue to be announced.
- [x] Branding: the website now uses the app's theme (navy `#0a2b44`, gold `#d6a21f`, green `#156a4c`, DM Sans + Manrope, green·gold·navy stripe).
- [ ] Privacy notice linked, with a parental-consent step for under-18s as the organisers decide.
- [ ] Duplicate-registration safeguards in Lovable (e.g. unique team name + coach email) — confirm existing behaviour before changing.
- [ ] Service-role keys stay server-side only. Never expose Supabase service keys in the client.

## End-to-end test before publishing

Run on a preview deployment with the real URL set:

1. Website home → **Register a Team** → `/register` → **Continue to registration** → the Lovable app loads over HTTPS.
2. Category page (e.g. Archery) → **Register for This Category** → `/register?category=archery` → Lovable. Check pre-selection if enabled.
3. Choose a category → complete the form with **clearly marked test data** agreed with the organisers → submit → confirmation screen and email.
4. Confirm the test record appears **once** in the Lovable admin, then delete it according to the organisers' process.
5. Repeat on a phone (Android Chrome and iOS Safari).
6. Use the back-link to return to mrcghana.com.

Record results in `docs/QA_REPORT.md`.
