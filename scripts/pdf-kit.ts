/**
 * Shared layout helpers for the A4 guide PDFs (tagged, accessible pdfkit output).
 * Used by scripts/generate-guides.ts. Visual style matches the category sheets.
 */
import fs from "node:fs";
import PDFDocument from "pdfkit";

export const C = {
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

export const PAGE = { w: 595.28, h: 841.89, m: 50 };
const BODY = 12; // minimum body/table size (pt)

type StructEl = { add: (child: unknown) => StructEl; end: () => void };

export function createGuide(opts: { file: string; title: string; subject: string; keywords: string; date: string }) {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE.m, bottom: PAGE.m + 20, left: PAGE.m, right: PAGE.m },
    bufferPages: true,
    tagged: true,
    lang: "en-GB",
    displayTitle: true,
    pdfVersion: "1.7",
    info: { Title: opts.title, Author: "The MakersPlace", Subject: opts.subject, Keywords: opts.keywords, CreationDate: new Date(`${opts.date}T00:00:00Z`) },
  });
  const stream = fs.createWriteStream(opts.file);
  doc.pipe(stream);

  // @types/pdfkit lags behind pdfkit's tagged-PDF structure API, so loosen the signature here.
  const struct = (doc.struct as unknown as (type: string, a?: unknown, b?: unknown) => StructEl).bind(doc);
  const root = struct("Document");
  (doc.addStructure as unknown as (el: StructEl) => void).call(doc, root);
  const contentW = PAGE.w - PAGE.m * 2;
  const BOTTOM = PAGE.h - (PAGE.m + 20);

  const artifact = (fn: () => void) => {
    doc.markContent("Artifact", { type: "Layout" });
    fn();
    doc.endMarkedContent();
  };
  const ensureSpace = (h: number) => {
    if (doc.y + h > BOTTOM - 4) doc.addPage();
  };

  const cover = (label: string, title: string, strap: string, line: string) => {
    const bandH = 205;
    artifact(() => {
      doc.rect(0, 0, PAGE.w, bandH).fill(C.navy);
      const sw = PAGE.w / 3;
      doc.rect(0, 0, sw, 5).fill(C.green);
      doc.rect(sw, 0, sw, 5).fill(C.gold);
      doc.rect(sw * 2, 0, sw, 5).fill(C.ink);
      doc.roundedRect(PAGE.m, 44, 30, 30, 8).fill(C.gold);
    });
    root.add(struct("P", () => {
      doc.font("Helvetica-Bold").fontSize(13).fillColor("#ffffff").text("MRC GHANA 2027", PAGE.m + 42, 48, { characterSpacing: 1.5 });
      doc.font("Helvetica").fontSize(10.5).fillColor("#f0d48a").text(label.toUpperCase(), PAGE.m + 42, 64, { characterSpacing: 1.2 });
    }));
    root.add(struct("H1", () => {
      doc.font("Helvetica-Bold").fontSize(30).fillColor("#ffffff").text(title, PAGE.m, 100, { width: contentW });
    }));
    root.add(struct("P", () => {
      doc.font("Helvetica").fontSize(13).fillColor("#f0d48a").text(strap, PAGE.m, doc.y + 2, { width: contentW });
      doc.font("Helvetica").fontSize(BODY).fillColor("#d6dbe6").text(line, PAGE.m, doc.y + 10, { width: contentW });
    }));
    doc.y = bandH + 26;
    doc.x = PAGE.m;
  };

  /** `keep` = space to keep free below the heading, so it never sits alone at the foot of a page. */
  const heading = (text: string, keep = 95) => {
    ensureSpace(keep);
    doc.moveDown(0.8);
    const y = doc.y;
    artifact(() => doc.rect(PAGE.m, y + 3, 4, 15).fill(C.green));
    root.add(struct("H2", () => {
      doc.font("Helvetica-Bold").fontSize(15).fillColor(C.navy).text(text, PAGE.m + 14, y, { width: contentW - 14 });
    }));
    doc.moveDown(0.35);
    doc.x = PAGE.m;
  };

  const subheading = (text: string) => {
    ensureSpace(70);
    doc.moveDown(0.3);
    root.add(struct("H3", () => {
      doc.font("Helvetica-Bold").fontSize(BODY + 1).fillColor(C.green).text(text, PAGE.m, doc.y, { width: contentW });
    }));
    doc.moveDown(0.25);
  };

  const para = (text: string, o: { color?: string; size?: number } = {}) => {
    root.add(struct("P", () => {
      doc.font("Helvetica").fontSize(o.size ?? BODY).fillColor(o.color ?? C.body).text(text, PAGE.m, doc.y, { width: contentW, lineGap: 3 });
    }));
    doc.moveDown(0.4);
  };

  const list = (items: string[], marker: "bullet" | "check" | "number" = "bullet") => {
    const L = struct("L");
    root.add(L);
    items.forEach((it, i) => {
      const indent = marker === "number" ? 24 : 22;
      doc.font("Helvetica").fontSize(BODY);
      const h = doc.heightOfString(it, { width: contentW - indent, lineGap: 3 });
      ensureSpace(h + 6);
      const y = doc.y;
      artifact(() => {
        if (marker === "check") doc.lineWidth(1.2).roundedRect(PAGE.m + 1, y + 1.5, 10, 10, 2).stroke(C.navy);
        else if (marker === "number") doc.font("Helvetica-Bold").fontSize(BODY).fillColor(C.green).text(`${i + 1}.`, PAGE.m, y, { width: 20, lineBreak: false });
        else doc.rect(PAGE.m + 2.5, y + 4.5, 5, 5).fill(C.gold);
      });
      L.add(struct("LI", [
        struct("LBody", () => {
          doc.font("Helvetica").fontSize(BODY).fillColor(C.body).text(it, PAGE.m + indent, y, { width: contentW - indent, lineGap: 3 });
        }),
      ]));
      doc.moveDown(0.3);
    });
    doc.x = PAGE.m;
    L.end();
  };

  const table = (head: [string, string], rows: [string, string][], col1 = 150) => {
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
      T.add(struct("TR", [
        struct("TH", () => {
          doc.font("Helvetica-Bold").fontSize(BODY).fillColor(C.navy).text(cells[0], PAGE.m + pad, y + pad, { width: col1 - pad * 2 });
        }),
        struct(header ? "TH" : "TD", () => {
          doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(BODY).fillColor(header ? C.navy : C.body).text(cells[1], PAGE.m + col1 + pad, y + pad, { width: contentW - col1 - pad * 2 });
        }),
      ]));
      doc.y = y + h;
    };
    ensureSpace(Math.min(36 * (rows.length + 1), 260));
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

  const link = (label: string, url: string) => {
    root.add(struct("Link", () => {
      doc.font("Helvetica").fontSize(BODY).fillColor(C.body).text(`${label}: `, PAGE.m, doc.y, { continued: true })
        .fillColor(C.green).text(url, { link: url, underline: true });
    }));
    doc.moveDown(0.3);
  };

  const finish = async (footer: string) => {
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.page.margins.bottom = 0;
      artifact(() => {
        const fy = PAGE.h - PAGE.m + 4;
        doc.lineWidth(0.6).moveTo(PAGE.m, fy - 8).lineTo(PAGE.w - PAGE.m, fy - 8).stroke(C.line);
        doc.font("Helvetica").fontSize(9).fillColor(C.muted)
          .text(footer, PAGE.m, fy, { width: contentW - 60, lineBreak: false })
          .text(`Page ${i - range.start + 1} of ${range.count}`, PAGE.w - PAGE.m - 60, fy, { width: 60, align: "right", lineBreak: false });
      });
    }
    root.end();
    doc.end();
    await new Promise<void>((res, rej) => { stream.on("finish", () => res()); stream.on("error", rej); });
    return range.count;
  };

  return { doc, cover, heading, subheading, para, list, table, notice, link, finish };
}
