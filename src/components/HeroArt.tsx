/**
 * Original abstract arena illustration used until an authorised event
 * photograph or video is approved (set `heroMedia` in src/app/page.tsx).
 */
export function HeroArt() {
  return (
    <svg viewBox="0 0 560 560" className="h-full w-full" role="img" aria-label="Abstract illustration of a robotics competition arena">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c9a24a" stopOpacity=".35" />
          <stop offset="1" stopColor="#c9a24a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ecd79c" />
          <stop offset="1" stopColor="#c9a24a" />
        </linearGradient>
      </defs>
      <circle cx="280" cy="280" r="250" fill="url(#glow)" />
      <g fill="none" stroke="#ffffff" strokeOpacity=".12">
        <circle cx="280" cy="280" r="230" />
        <circle cx="280" cy="280" r="180" />
        <circle cx="280" cy="280" r="130" />
        <path d="M50 280h460M280 50v460" strokeDasharray="4 10" />
      </g>
      <g fill="none" stroke="url(#gold)" strokeWidth="3" strokeLinecap="round">
        <path d="M280 50a230 230 0 0 1 199 115" />
        <path d="M100 280a180 180 0 0 1 52-127" strokeOpacity=".8" />
        <path d="M410 280a130 130 0 0 1-58 108" strokeOpacity=".9" />
      </g>
      {/* line-following track */}
      <path d="M120 400c40-60 90-40 120-80s30-110 90-120 100 40 110 90" fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
      {/* drone */}
      <g transform="translate(330 150)" stroke="#ecd79c" strokeWidth="2.5" fill="none">
        <circle cx="-26" cy="-26" r="14" /><circle cx="26" cy="-26" r="14" /><circle cx="-26" cy="26" r="14" /><circle cx="26" cy="26" r="14" />
        <path d="M-16-16-8-8M16-16 8-8M-16 16-8 8M16 16 8 8" />
        <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#0b1a36" />
      </g>
      {/* robot */}
      <g transform="translate(170 340)">
        <rect x="-26" y="-18" width="52" height="30" rx="8" fill="#112449" stroke="#ffffff" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="-14" cy="16" r="7" fill="#c9a24a" /><circle cx="14" cy="16" r="7" fill="#c9a24a" />
        <circle cx="10" cy="-4" r="4" fill="#ecd79c" />
      </g>
      {/* target */}
      <g transform="translate(420 380)" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2">
        <circle r="34" /><circle r="22" /><circle r="9" fill="#c9a24a" stroke="none" />
      </g>
      <g fill="#ecd79c">
        <circle cx="280" cy="50" r="5" /><circle cx="479" cy="165" r="4" /><circle cx="152" cy="153" r="4" />
      </g>
    </svg>
  );
}
