"use client";

import { useState } from "react";
import type { Video } from "@/data/videos";
import { formatDuration } from "@/lib/format";

/**
 * Privacy-enhanced YouTube facade: nothing loads from YouTube until the
 * visitor presses play. Falls back to a direct YouTube link if embeds are blocked.
 */
export function VideoEmbed({ video, priority = false }: { video: Video; priority?: boolean }) {
  const [active, setActive] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-video bg-navy-900">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
            aria-label={`Play video: ${video.displayTitle}`}
          >
            {!thumbFailed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink shadow-xl transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="absolute bottom-3 right-3 rounded-md bg-ink/80 px-2 py-0.5 text-xs font-semibold text-white">
              {formatDuration(video.durationSeconds)}
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="font-display text-lg font-bold text-navy-950">{video.displayTitle}</p>
        {video.event && (
          <p className="mt-1 text-sm font-semibold text-gold-700">
            {video.event.name} · {video.event.location}
          </p>
        )}
        <p className="mt-2 text-[0.95rem] text-muted">{video.description}</p>
        <p className="mt-3 text-sm text-muted">
          Source: {video.uploader} on YouTube ·{" "}
          <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-navy-700 underline underline-offset-4">
            Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
