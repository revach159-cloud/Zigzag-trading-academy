"use client";

/**
 * 2D / reduced-motion fallback for the ZigZag symbol.
 * Always available; never depends on WebGL.
 */
export function ZigZagFallback() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,230,255,0.14)_0%,transparent_58%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(46,230,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(46,230,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <svg
        viewBox="0 0 320 220"
        className="relative z-10 h-[min(52vh,420px)] w-[min(90vw,560px)]"
        role="img"
        aria-label="סמל ZigZag"
      >
        <defs>
          <linearGradient id="zz-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2EE6FF" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#2EE6FF" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.85" />
          </linearGradient>
          <filter id="zz-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M28 168 L92 52 L148 148 L214 40 L292 168"
          fill="none"
          stroke="url(#zz-stroke)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#zz-glow)"
        />
        <circle cx="92" cy="52" r="5" fill="#2EE6FF" />
        <circle cx="148" cy="148" r="4" fill="#C9A84C" />
        <circle cx="214" cy="40" r="5" fill="#2EE6FF" />
      </svg>
    </div>
  );
}
