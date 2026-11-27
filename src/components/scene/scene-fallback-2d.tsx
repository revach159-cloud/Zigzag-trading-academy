import type { SceneKind } from "./scene-kinds";

export function SceneFallback2D({ kind }: { kind: Exclude<SceneKind, "none"> }) {
  switch (kind) {
    case "cover":
      return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_55%_40%,rgba(201,168,76,0.16),transparent_50%),radial-gradient(ellipse_at_20%_70%,rgba(46,230,255,0.1),transparent_45%),#02040a]">
          <svg viewBox="0 0 320 120" className="absolute inset-x-0 h-full w-full opacity-60" aria-hidden>
            <polyline
              points="20,90 60,40 100,75 150,25 200,80 250,35 300,55"
              fill="none"
              stroke="#E0C36A"
              strokeWidth="2.5"
            />
          </svg>
          <p className="relative text-2xl font-extrabold tracking-[0.18em] text-[var(--zz-ink)] sm:text-3xl">
            ZIGZAG · LOOKBACK
          </p>
        </div>
      );
    case "traffic-light":
      return (
        <div className="flex h-full items-center justify-center gap-4 bg-[#03050c]">
          {["#3DDC97", "#F5C542", "#F07178"].map((color) => (
            <span
              key={color}
              className="h-10 w-10 rounded-full"
              style={{ background: color, boxShadow: `0 0 18px ${color}55` }}
            />
          ))}
        </div>
      );
    case "realize-75":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#03050c] px-8">
          <div className="flex w-full max-w-sm items-end gap-2">
            <div className="flex h-24 w-3/4 items-center justify-center rounded-md bg-[rgba(46,230,255,0.35)] text-sm font-semibold text-[var(--zz-ink)]">
              75%
            </div>
            <div className="flex h-14 w-1/4 items-center justify-center rounded-md bg-[rgba(201,168,76,0.4)] text-xs font-medium text-[var(--zz-ink)]">
              25%
            </div>
          </div>
        </div>
      );
    case "return-balance":
      return (
        <div className="flex h-full items-center justify-center bg-[#03050c]">
          <svg viewBox="0 0 320 120" className="h-24 w-full max-w-sm">
            <path
              d="M20 90 C60 20, 100 100, 160 40 S240 20, 300 70"
              fill="none"
              stroke="#2EE6FF"
              strokeWidth="3"
            />
            <rect
              x="148"
              y="58"
              width="24"
              height="24"
              rx="3"
              fill="rgba(46,230,255,0.35)"
              stroke="#2EE6FF"
            />
            <text
              x="160"
              y="75"
              textAnchor="middle"
              fill="#E8EEF8"
              fontSize="11"
              fontFamily="monospace"
            >
              ×1
            </text>
            <circle cx="300" cy="70" r="6" fill="#C9A84C" />
          </svg>
        </div>
      );
    case "improvement":
      return (
        <div className="flex h-full flex-col items-center justify-end gap-2 bg-[#03050c] px-10 pb-8">
          <div className="h-6 w-2/5 rounded-sm bg-[rgba(201,168,76,0.35)]" />
          <div className="h-6 w-3/5 rounded-sm bg-[rgba(46,230,255,0.3)]" />
          <div className="h-6 w-4/5 rounded-sm bg-[rgba(46,230,255,0.2)]" />
        </div>
      );
    case "zigzag":
    default:
      return (
        <div className="flex h-full items-center justify-center bg-[#03050c]">
          <svg viewBox="0 0 320 120" className="h-28 w-full max-w-md">
            <line
              x1="20"
              y1="60"
              x2="300"
              y2="60"
              stroke="rgba(143,160,184,0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <polyline
              fill="none"
              stroke="#2EE6FF"
              strokeWidth="3"
              points="20,90 70,30 120,75 170,25 220,70 270,35 300,60"
            />
          </svg>
        </div>
      );
  }
}
