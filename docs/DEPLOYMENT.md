# Deployment, domain replacement & rollback

> **Do not overwrite or take down the current production website without explicit final approval from the organisers.**

## 1. Current production (audit, 14 October 2026)

| Item | Finding |
|---|---|
| Domain | `www.mrcghana.com` (apex `mrcghana.com`) |
| DNS | Vercel DNS: `ns1.vercel-dns.com`, `ns2.vercel-dns.com` |
| Hosting | Vercel (`server: Vercel`). A records 216.198.79.1, 64.29.17.1, 64.29.17.65 |
| App | Vite + React single-page app (`/assets/index-*.js`), last modified 30 Sep 2026 |
| Source repo | **Not found** in the GitHub accounts available to this project (`datlogix`, `Datlogix-Innovation`, `themakersplace`, `codeseedo`). The Vercel project owner must confirm which repo or account deploys it. |
| `register.mrcghana.com` | Vercel `DEPLOYMENT_NOT_FOUND` (domain assigned, no deployment) |
| Search Console | Verification meta tag `aeYWF4Wfi0rg5uo7gz-…` — **carried over** to the new site so ownership is preserved |
| Indexed/sitemap URLs | `/`, `/sports`, `/rules`, `/pathway`, `/media`, `/resources` (+ `/sponsors`, `/privacy`, `/terms` in the app). **Deep links already return 404 on the live site** because the SPA has no rewrites. |
| Content issues on current site | States Heraklion instead of Chania for the Olympiad, a single date of 30 Jan, an invented "National RobotSports Arena Complex" in structured data, "3 divisions", a price of 0, mislabelled videos, and a registration form that appears not to reach a backend (see LOVABLE_INTEGRATION.md) |

## 2. Recommended hosting

Stay on **Vercel**. Domain and DNS are already there, Next.js is first-class, the static pages fit the free/Hobby tier, and preview deployments come per pull request.

**Important:** if the organisation is commercial, Vercel's Hobby plan terms may require a Pro plan. The organisers should confirm the plan with the Vercel account owner.

## 3a. Static test preview (live now)

**https://datlogix.github.io/mrc-ghana-2027-preview/**: a static build for reviewers, hosted on GitHub Pages from the
public repo `datlogix/mrc-ghana-2027-preview`. That repo holds generated files only; the source stays private.

- A "Test preview" banner shows on every page. Search engines are told not to index it (`noindex` + `robots.txt` disallow).
- Online forms are switched off, because Pages cannot run server code. Visitors see the email fallback instead.
- Security headers and legacy redirects only apply on the Vercel build.
- Register buttons go to the real registration app (`mrcghana2027.lovable.app`).

Update it after changes:

```bash
scripts/build-preview.sh                   # builds ./out with base path /mrc-ghana-2027-preview
cd out && git init -b main && git add -A && git commit -m "Update preview" \
  && git push -f https://github.com/datlogix/mrc-ghana-2027-preview.git main
```

Take it down when Vercel staging exists: GitHub → `mrc-ghana-2027-preview` → Settings → Pages → Unpublish, or delete the repo.

## 3. Staging / preview deployment (Vercel)

1. In Vercel, **Add New → Project → Import Git Repository** → `mrc-ghana-2027-website`.
   - Framework: Next.js (auto-detected). Build command `npm run build`, output default, Node 20+ (22 recommended).
2. Environment variables (Settings → Environment Variables):

   | Name | Production | Preview |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://www.mrcghana.com` | (leave unset or use the preview URL) |
   | `NEXT_PUBLIC_REGISTRATION_URL` | Lovable URL | Lovable URL |
   | `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` + `ENQUIRY_FROM_EMAIL` | ✓ | ✓ (or a test mailbox) |
   | or `FORM_WEBHOOK_URL` | ✓ | ✓ |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` (optional) | ✓ | ✓ |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional) | `mrcghana.com` | — |

   For Resend: verify the sending domain `mrcghana.com` in Resend (it gives DKIM/SPF TXT records to add in Vercel DNS). Then set `ENQUIRY_FROM_EMAIL="MRC Ghana Website <no-reply@mrcghana.com>"`.
3. **Do not add the production domain to this project yet.** Use the generated `*.vercel.app` URL as staging. Preview deployments are served with `robots: disallow` automatically (via `VERCEL_ENV`).
4. Run the QA checklist (`docs/QA_REPORT.md`) against the staging URL, including a real enquiry to the approved mailbox and the full Lovable journey.

## 4. Backing up the current site (before cut-over)

1. In Vercel, open the **current** mrcghana.com project → Deployments → note the current production deployment URL and ID. Vercel keeps it, and it can be re-promoted instantly.
2. Record its domain list (Settings → Domains) and all environment variables (they are not needed by the new site, but keep a record).
3. Export a static snapshot as an extra safeguard:
   ```bash
   mkdir mrcghana-backup && cd mrcghana-backup
   wget --mirror --page-requisites --convert-links --no-parent https://www.mrcghana.com/
   ```
4. Find and archive the source repository of the current site (owner to confirm).

## 5. Production cut-over (after written approval)

1. Final approvals collected (see `docs/QA_REPORT.md` § Approvals).
2. In the **current** project → Settings → Domains → remove `www.mrcghana.com` and `mrcghana.com`. Do **not** delete the project.
3. In the **new** project → Settings → Domains → add `www.mrcghana.com` (primary) and `mrcghana.com` (redirect to www). Because DNS is on Vercel DNS, records update automatically. Vercel issues SSL within minutes.
4. Legacy URL redirects are built in (`next.config.ts`):
   `/sports`, `/sports/*`, `/rules` → `/categories` · `/pathway` → `/global-finals` · `/sponsors` → `/partners` · `/terms` → `/privacy#terms` · `/admin` → `/register` (temporary).
5. Smoke-test immediately (15 minutes):
   - `https://www.mrcghana.com` loads over HTTPS. `http://` and the apex redirect to `https://www.`.
   - All seven category pages and PDFs load. `/sitemap.xml` and `/robots.txt` are correct.
   - Register buttons reach the Lovable app. Send one enquiry through each form.
6. In Google Search Console: submit `https://www.mrcghana.com/sitemap.xml`.
7. Monitor for 72 hours: Vercel → Logs (look for `/api/enquiry` errors and 404s), the enquiry mailbox, and Search Console coverage.

## 6. Rollback (< 5 minutes)

If anything is wrong after cut-over:

1. New project → Settings → Domains → remove `www.mrcghana.com` and `mrcghana.com`.
2. Old project → Settings → Domains → add them back. The old production deployment is still live in that project. If needed, use Deployments → ⋯ → **Promote to Production** on the recorded deployment.
3. Verify `https://www.mrcghana.com` shows the old site.

Within the new project, a bad release can also be reverted instantly: Deployments → previous deployment → **Promote to Production** (or "Instant Rollback").

## 7. Ongoing releases

- Work on a branch, then open a pull request. Vercel builds a preview, someone reviews it, then it is merged to `main` and deploys to production.
- `npm run build` fails on content-rule violations, so broken content cannot be deployed.
