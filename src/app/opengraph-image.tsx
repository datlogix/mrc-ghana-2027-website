import { ImageResponse } from "next/og";
import { event } from "@/config/event";

export const alt = `${event.shortName} — ${event.dates.display}, ${event.city}, ${event.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(135deg,#070f22 0%,#112449 100%)", color: "#fff", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#c9a24a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 40 40"><path d="M20 4.5l3.6 10.1h10.7l-8.6 6.2 3.3 10.2L20 24.8l-9 6.2 3.3-10.2-8.6-6.2h10.7z" fill="#070f22" /></svg>
          </div>
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#ecd79c" }}>MINOAN ROBOTSPORTS COMPETITION</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 800, letterSpacing: -2 }}>
            <span>MRC GHANA</span>
            <span style={{ color: "#dcbc68", marginLeft: 28 }}>2027</span>
          </div>
          <div style={{ fontSize: 44, color: "#ecd79c", marginTop: 8 }}>{event.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 34 }}>{`${event.dates.display} · ${event.city}, ${event.country}`}</div>
          <div style={{ display: "flex", height: 10, width: 240 }}>
            <div style={{ flex: 1, background: "#ce1126" }} /><div style={{ flex: 1, background: "#fcd116" }} /><div style={{ flex: 1, background: "#006b3f" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
