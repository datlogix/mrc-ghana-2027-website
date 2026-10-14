"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import { categories } from "@/data/categories";
import { asset } from "@/lib/asset";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [cat, setCat] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const years = useMemo(() => [...new Set(images.map((i) => i.event.year))].sort((a, b) => b - a), [images]);
  const usedCats = useMemo(() => categories.filter((c) => images.some((i) => i.category === c.slug)), [images]);
  const filtered = images.filter(
    (i) => (cat === "all" || i.category === cat) && (year === "all" || String(i.event.year) === year),
  );

  const open = (i: number, el: HTMLElement) => {
    lastFocus.current = el;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) dlg.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? filtered[index] : null;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end" role="group" aria-label="Filter photographs">
        <label className="sm:w-64">
          <span className="field-label">Category</span>
          <select className="field" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">All categories</option>
            {usedCats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
        <label className="sm:w-48">
          <span className="field-label">Event year</span>
          <select className="field" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="all">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <p className="text-muted sm:ml-auto" aria-live="polite">{filtered.length} photograph{filtered.length === 1 ? "" : "s"}</p>
      </div>

      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {filtered.map((img, i) => (
          <li key={img.src} className="mb-5 break-inside-avoid">
            <figure className="card overflow-hidden">
              <button type="button" className="group block w-full" onClick={(e) => open(i, e.currentTarget)} aria-label={`Open photo: ${img.caption}`}>
                <Image
                  src={asset(img.src)}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>
              <figcaption className="p-4 text-[0.95rem]">
                <span className="block font-semibold text-navy-950">{img.caption}</span>
                <span className="block text-sm text-muted">
                  {img.event.name} · {img.event.location}{img.credit ? ` · Photo: ${img.credit}` : ""}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[100dvh] w-full max-w-6xl bg-transparent p-3 backdrop:bg-ink/90"
        aria-label={current ? current.caption : "Photo viewer"}
      >
        {current && (
          <div className="relative">
            <Image
              src={asset(current.src)}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="mx-auto max-h-[80dvh] w-auto rounded-md object-contain"
            />
            <p className="mt-3 text-center text-white">
              {current.caption} <span className="text-slate-400">· {current.event.name}, {current.event.location}</span>
            </p>
            <div className="mt-3 flex justify-center gap-3">
              <button type="button" className="btn btn-ghost-light" onClick={() => step(-1)}>Previous</button>
              <button type="button" className="btn btn-gold" onClick={close}>Close</button>
              <button type="button" className="btn btn-ghost-light" onClick={() => step(1)}>Next</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
