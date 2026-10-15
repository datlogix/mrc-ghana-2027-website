# Content editing guide

This guide is for organisers. You can make every routine update by editing **one data file**. You do not need to touch page layouts.

The easiest way to edit is directly on GitHub. Open the file, click the pencil icon, make the change, then choose **Create a new branch and start a pull request**. Vercel builds a preview link for the pull request automatically. Check the preview, then merge.

> **Golden rule:** publish only confirmed information. If something is undecided, leave it empty or `null`. The website then shows "To be announced" automatically.

---

## 1. Event facts — `src/config/event.ts`

| To change… | Edit |
|---|---|
| Event dates | `dates` (also update the check in `scripts/validate-content.ts` once the committee approves a change) |
| Venue | Fill in `venue.name`, `address`, `googleMapsUrl`, `directions`, `accessibility` and `visitorGuidance`, then set `status: "confirmed"` |
| Timetable | Add items to `programme.schedule["2027-01-29"]` / `["2027-01-30"]`, e.g. `{ time: "08:00", title: "Registration desk opens" }`, then set `programme.status: "confirmed"` |
| Reporting / inspection arrangements | `programme.reportingAndInspection` |
| Sports programme approval | `programmeApproval` → `status: "approved"`, `approvedOn`, `reference`. This removes the "subject to confirmation" notice. |
| Registration status | `registration.status`: `"open"`, `"opening-soon"` or `"closed"` |
| Registration fee / deadline | `registration.fee`, `registration.deadline` (text) |
| Category pre-selection in Lovable | `registration.categoryParam` (only after testing; see LOVABLE_INTEGRATION.md) |
| Contact email / phone / WhatsApp | `contact` |
| Social channels | `contact.social`: `[{ label: "Instagram", url: "https://…" }]` (verified accounts only) |
| Global Olympiad details | `globalOlympiad` (re-verify on he-ro.gr and update `verifiedOn`) |

The **registration URL** is set in the hosting environment as `NEXT_PUBLIC_REGISTRATION_URL`, not in this file.

## 2. Sports — `src/data/categories.ts`

Each of the seven sports has its own block: overview, objectives, skills, age bands, team rules, equipment, format, scoring, safety, checklist and clarifications.

- **Do not add or remove sports.** The build is deliberately blocked if you do.
- Write in plain English and keep it short. Summarise the rules rather than copying them.
- When you re-check a sport against its official H.E.R.O. page, update `rulesCheckedOn` (YYYY-MM-DD).
- If an official rule is unclear, add a sentence to `clarifications` rather than guessing.
- For Exhibition, once H.E.R.O. publishes rules, fill in the empty sections and set `rulesPublished: true`.

**After any change here, regenerate the PDFs:**

```bash
npm run pdfs
```

Then commit the updated files in `public/downloads/categories/`.

## 3. Videos — `src/data/videos.ts`

Before adding a video:

1. Copy the 11-character ID from the YouTube URL (`youtube.com/watch?v=THIS_PART`).
2. Confirm the uploader and title, and watch it to check it shows the correct sport.
3. For competition footage, record the real `event` year and location. Never label a Greece event as Ghana.
4. Set `verifiedOn` to today. Use `published: false` to hold a video back.

Category videos appear automatically on the matching sport page and in the video library.

## 4. Photos — `src/data/gallery.ts`

1. Put the image in `public/images/gallery/` (JPEG or WebP, about 2000 px on the long edge).
2. Add an entry with `width`, `height`, descriptive `alt` text, `caption`, `event` and `credit`.
3. **Record the rights/permission reference** in `rightsRef`. Where children can be identified, also record the consent reference in `consentRef`.
4. Set `published: true`.

The gallery shows a polished "being curated" state until the first photo is published.

## 5. Partners — `src/data/partners.ts`

Add a partner only once they have confirmed **in writing**, including permission to show their logo:

```ts
{ name: "Example Ltd", logo: "/images/partners/example.svg", url: "https://example.com", role: "Venue Partner", approved: true }
```

The partner logo wall appears on the homepage and the Partners page only once at least one approved partner exists.

## 6. FAQs — `src/data/faqs.ts`

Add `{ group, q, a }`. Set `home: true` to also show it on the homepage. Use only verified answers.

## 7. Downloads — `src/data/downloads.ts`

- Put the approved PDF in `public/downloads/`.
- Set its `href` (e.g. `"/downloads/coach-guide.pdf"`) and change `status` from `"forthcoming"` to `"published"`.
- Never publish a placeholder as a final document.

## 8. Blog — `content/blog/*.md`

Each post is one Markdown file. The file name becomes the address: `content/blog/team-update.md` → `/blog/team-update`.

```markdown
---
title: Registration now open for schools
date: 2026-11-01
excerpt: One or two sentences shown on cards and in search results.
tags: [Announcements, Registration]
cover: hero            # or category:drones, category:archery … (optional)
published: true        # false keeps it as a hidden draft
---

Write the post here in **Markdown**. Use ## for headings, - for bullet lists,
and [link text](/categories/drones) for links to other pages.
```

- Publish only confirmed information, the same rules as everywhere else on the site.
- Posts appear automatically on `/blog`, on the homepage ("Latest updates"), in the sitemap and in the RSS feed (`/blog/rss.xml`).
- Files starting with `_` are ignored, which is useful for templates.

## 9. Checking your change

- Open the pull request's preview link and look at the affected pages, including on a phone.
- The build runs `validate:content` automatically and fails with a clear message if something breaks the rules.
