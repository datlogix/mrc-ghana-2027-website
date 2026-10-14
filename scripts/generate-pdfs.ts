/**
 * Generates the seven A4 category information sheets from the single content
 * source (src/data/categories.ts + src/config/event.ts).
 *
 *   npm run pdfs
 *
 * Output: public/downloads/categories/mrc-ghana-2027-<slug>.pdf
 * Edit content in the data files, then re-run this script and commit the PDFs.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { categories, type Category } from "../src/data/categories";
import { event } from "../src/config/event";

const OUT = path.join(process.cwd(), "public", "downloads", "categories");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrcghana.com").replace(/\/$/, "");

// Brand palette — matches the website and the registration app.
const C = {
  ink: "#031c30",
  navy: "#0a2b44",
  gold: "#d6a21f",
  goldSoft: "#fbf3db",
  green: "#156a4c",
  body: "#233f56",
  muted: "#55626e",
  line: "#dbe2e9",
  mist: "#f0f6fa",
};

const PAGE = { w: 595.28, h: 841.89, m: 50 };
const BODY = 12; // minimum body/table size (pt)

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

async function build(c: Category) {
  const version = c.rulesCheckedOn;
  const file = path.join(OUT, `mrc-ghana-2027-${c.slug}.pdf`);
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE.m, bottom: PAGE.m + 20, left: PAGE.m, right: PAGE.m },
    bufferPages: true,
    tagged: true,
    lang: "en-GB",
    displayTitle: true,
    pdfVersion: "1.7",
    info: {
      Title: `${c.name} — MRC Ghana 2027 Category Information Sheet`,
      Author: event.organisers.ghana.name,
      Subject: `${event.name}: ${c.name}`,
      Keywords: `MRC Ghana 2027, ${c.name}, robotics, Accra, H.E.R.O.`,
      CreationDate: new Date(`${version}T00:00:00Z`),
    },
  });
  const stream = fs.createWriteStream(file);
  doc.pipe(stream);

  // @types/pdfkit lags behind pdfkit's tagged-PDF structure API, so loosen the signature here.
  type StructEl = { add: (child: unknown) => StructEl; end: () => void };
  const struct = (doc.struct as unknown as (type: string, a?: unknown, b?: unknown) => StructEl).bind(doc);
  const root = struct("Document");
  (doc.addStructure as unknown as (el: StructEl) => void).call(doc, root);
  const contentW = PAGE.w - PAGE.m * 2;

  const artifact = (fn: () => void) => {
    doc.markContent("Artifact", { type: "Layout" });
    fn();
    doc.endMarkedContent();
  };

  const BOTTOM = PAGE.h - (PAGE.m + 20); // matches the bottom margin
  const ensureSpace = (h: number) => {
    if (doc.y + h > BOTTOM - 4) doc.addPage();
  };

  const heading = (text: string) => {
    ensureSpace(95); // keep headings with at least their first lines
    doc.moveDown(0.8);
    const y = doc.y;
    artifact(() => doc.rect(PAGE.m, y + 3, 4, 15).fill(C.green));
    root.add(
      struct("H2", () => {
        doc.font("Helvetica-Bold").fontSize(15).fillColor(C.navy).text(text, PAGE.m + 14, y, { width: contentW - 14 });
      }),
    );
    doc.moveDown(0.35);
    doc.x = PAGE.m;
  };

  const para = (text: string, opts: { color?: string; size?: number } = {}) => {
    root.add(
      struct("P", () => {
        doc.font("Helvetica").fontSize(opts.size ?? BODY).fillColor(opts.color ?? C.body).text(text, PAGE.m, doc.y, { width: contentW, lineGap: 3 });
      }),
    );
    doc.moveDown(0.4);
  };

  const list = (items: string[], marker: "bullet" | "check" = "bullet") => {
    const L = struct("L");
    root.add(L);
    for (const it of items) {
      doc.font("Helvetica").fontSize(BODY);
      const h = doc.heightOfString(it, { width: contentW - 22, lineGap: 3 });
      ensureSpace(h + 6);
      const y = doc.y;
      artifact(() => {
        if (marker === "check") doc.lineWidth(1.2).roundedRect(PAGE.m + 1, y + 1.5, 10, 10, 2).stroke(C.navy);
        else doc.rect(PAGE.m + 2.5, y + 4.5, 5, 5).fill(C.gold);
      });
      L.add(
        struct("LI", [
          struct("LBody", () => {
            doc.font("Helvetica").fontSize(BODY).fillColor(C.body).text(it, PAGE.m + 22, y, { width: contentW - 22, lineGap: 3 });
          }),
        ]),
      );
      doc.moveDown(0.3);
    }
    doc.x = PAGE.m;
    L.end();
  };

  const table = (head: [string, string], rows: [string, string][]) => {
    const col1 = 150;
    const pad = 8;
    const T = struct("Table");
    root.add(T);
    const row = (cells: [string, string], header: boolean) => {
      doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(BODY);
      const h = Math.max(
        doc.heightOfString(cells[0], { width: col1 - pad * 2 }),
        doc.heightOfString(cells[1], { width: contentW - col1 - pad * 2 }),
      ) + pad * 2;
      ensureSpace(h);
      const y = doc.y;
      artifact(() => {
        if (header) doc.rect(PAGE.m, y, contentW, h).fill(C.mist);
        doc.lineWidth(0.6).moveTo(PAGE.m, y + h).lineTo(PAGE.m + contentW, y + h).stroke(C.line);
      });
      const tag = header ? "TH" : "TD";
      T.add(
        struct("TR", [
          struct("TH", () => {
            doc.font("Helvetica-Bold").fontSize(BODY).fillColor(C.navy).text(cells[0], PAGE.m + pad, y + pad, { width: col1 - pad * 2 });
          }),
          struct(tag, () => {
            doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(BODY).fillColor(header ? C.navy : C.body).text(cells[1], PAGE.m + col1 + pad, y + pad, { width: contentW - col1 - pad * 2 });
          }),
        ]),
      );
      doc.y = y + h;
    };
    ensureSpace(Math.min(36 * (rows.length + 1), 260)); // keep short tables together
    row(head, true);
    rows.forEach((r) => row(r, false));
    T.end();
    doc.x = PAGE.m;
    doc.moveDown(0.6);
  };

  const notice = (title: string, body: string, tone: "gold" | "navy" = "gold") => {
    doc.font("Helvetica").fontSize(BODY);
    const h = doc.heightOfString(body, { width: contentW - 32, lineGap: 3 }) + 44;
    ensureSpace(h + 8);
    const y = doc.y;
    artifact(() => {
      doc.rect(PAGE.m, y, contentW, h).fill(tone === "gold" ? C.goldSoft : C.mist);
      doc.rect(PAGE.m, y, 4, h).fill(tone === "gold" ? C.gold : C.green);
    });
    root.add(struct("P", () => {
      doc.font("Helvetica-Bold").fontSize(BODY).fillColor(C.navy).text(title, PAGE.m + 16, y + 12, { width: contentW - 32 });
    }));
    root.add(struct("P", () => {
      doc.font("Helvetica").fontSize(BODY).fillColor(C.body).text(body, PAGE.m + 16, doc.y + 3, { width: contentW - 32, lineGap: 3 });
    }));
    doc.y = y + h + 10;
    doc.x = PAGE.m;
  };

  // ── Cover band ──
  const bandH = 205;
  artifact(() => {
    doc.rect(0, 0, PAGE.w, bandH).fill(C.navy);
    const sw = PAGE.w / 3;
    doc.rect(0, 0, sw, 5).fill(C.green);
    doc.rect(sw, 0, sw, 5).fill(C.gold);
    doc.rect(sw * 2, 0, sw, 5).fill(C.ink);
    // emblem
    doc.roundedRect(PAGE.m, 44, 30, 30, 8).fill(C.gold);
  });
  root.add(struct("P", () => {
    doc.font("Helvetica-Bold").fontSize(13).fillColor("#ffffff").text("MRC GHANA 2027", PAGE.m + 42, 48, { characterSpacing: 1.5 });
    doc.font("Helvetica").fontSize(10.5).fillColor("#f0d48a").text("CATEGORY INFORMATION SHEET", PAGE.m + 42, 64, { characterSpacing: 1.2 });
  }));
  root.add(struct("H1", () => {
    doc.font("Helvetica-Bold").fontSize(34).fillColor("#ffffff").text(c.name, PAGE.m, 100, { width: contentW });
  }));
  root.add(struct("P", () => {
    doc.font("Helvetica").fontSize(13).fillColor("#f0d48a").text(c.strapline, PAGE.m, doc.y + 2, { width: contentW });
    doc.font("Helvetica").fontSize(BODY).fillColor("#d6dbe6")
      .text(`${event.dates.display}  ·  ${event.city}, ${event.country}  ·  Venue to be announced`, PAGE.m, doc.y + 10, { width: contentW });
  }));
  doc.y = bandH + 26;
  doc.x = PAGE.m;

  notice(
    "The current official H.E.R.O. rules take precedence",
    `This sheet is a plain-English summary prepared by the MRC Ghana 2027 organisers. Always check the official rules before building or competing: ${c.rulesUrl}`,
  );

  heading("Sport overview");
  c.overview.forEach((p) => para(p));

  if (!c.rulesPublished) {
    notice(
      "Official rules awaiting publication",
      "When this sheet was prepared, the official H.E.R.O. page for this category did not display detailed rules. Requirements will be added once published and confirmed.",
    );
  }

  heading("Competition objective");
  list(c.objectives);

  if (c.ageBands.length) {
    heading("Age eligibility");
    if (c.divisions) para(c.divisions);
    table(["Age category", "Published ages"], c.ageBands.map((a) => [a.label, a.note ? `${a.ages} — ${a.note}` : a.ages]));
  }

  if (c.team.length) {
    heading("Team requirements");
    list(c.team);
  }

  if (c.format.length || c.scoring.length) {
    heading("Format and scoring");
    list([...c.format, ...c.scoring]);
  }

  if (c.equipment.length) {
    heading("Robot and equipment requirements");
    list(c.equipment);
  }

  heading("Preparation checklist");
  list(c.checklist, "check");

  heading("Safety notes");
  list(c.safety);

  if (c.clarifications.length) {
    heading("Awaiting clarification");
    list(c.clarifications);
  }

  heading("Registration guidance");
  list([
    `Register through the official MRC Ghana 2027 registration application: ${SITE}/register`,
    "Have your team name, team members, coach details and chosen sport(s) ready.",
    `Registration fees and deadlines: ${event.registration.fee ?? "to be announced"}${event.registration.deadline ? `; deadline ${event.registration.deadline}` : ""}.`,
    "Participant information is collected only through the official registration application.",
    `Questions: ${event.contact.email}`,
  ]);

  // ── Official rules + QR ──
  heading("Official rules and source");
  ensureSpace(130);
  const qr = await QRCode.toBuffer(c.rulesUrl, { margin: 1, width: 360, color: { dark: C.ink, light: "#ffffff" } });
  const y = doc.y + 4;
  root.add(struct("Figure", { alt: `QR code linking to the official H.E.R.O. ${c.name} rules at ${c.rulesUrl}` }, () => {
    doc.image(qr, PAGE.m, y, { width: 104 });
  }));
  const tx = PAGE.m + 122;
  const tw = contentW - 122;
  root.add(struct("P", () => {
    doc.font("Helvetica-Bold").fontSize(BODY).fillColor(C.navy).text("Official H.E.R.O. rules", tx, y + 4, { width: tw });
  }));
  root.add(struct("Link", () => {
    doc.font("Helvetica").fontSize(BODY).fillColor(C.green).text(c.rulesUrl, tx, doc.y + 2, { width: tw, link: c.rulesUrl, underline: true });
  }));
  root.add(struct("P", () => {
    doc.font("Helvetica").fontSize(BODY).fillColor(C.body)
      .text(`Source checked: ${formatDate(c.rulesCheckedOn)}`, tx, doc.y + 6, { width: tw })
      .text(`Sheet version: ${version}`, tx, doc.y + 2, { width: tw })
      .text(`Category page: ${SITE}/categories/${c.slug}`, tx, doc.y + 2, { width: tw, link: `${SITE}/categories/${c.slug}` });
  }));
  doc.y = Math.max(doc.y, y + 112);
  doc.x = PAGE.m;

  // ── Footer on every page ──
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.page.margins.bottom = 0; // allow drawing the footer inside the bottom margin without paginating
    artifact(() => {
      const fy = PAGE.h - PAGE.m + 4;
      doc.lineWidth(0.6).moveTo(PAGE.m, fy - 8).lineTo(PAGE.w - PAGE.m, fy - 8).stroke(C.line);
      doc.font("Helvetica").fontSize(9).fillColor(C.muted)
        .text(`${event.shortName} · ${c.name} information sheet · v${version} · Official rules take precedence`, PAGE.m, fy, { width: contentW - 60, lineBreak: false })
        .text(`Page ${i - range.start + 1} of ${range.count}`, PAGE.w - PAGE.m - 60, fy, { width: 60, align: "right", lineBreak: false });
    });
  }

  root.end();
  doc.end();
  await new Promise<void>((res, rej) => { stream.on("finish", () => res()); stream.on("error", rej); });
  return { file, pages: range.count };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const c of categories) {
    const { file, pages } = await build(c);
    const kb = (fs.statSync(file).size / 1024).toFixed(0);
    console.log(`✓ ${path.relative(process.cwd(), file)} (${pages} page${pages > 1 ? "s" : ""}, ${kb} KB)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
