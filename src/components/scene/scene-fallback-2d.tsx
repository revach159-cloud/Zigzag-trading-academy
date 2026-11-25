import type { SceneKind } from "./scene-kinds";

export function SceneFallback2D({ kind }: { kind: Exclude<SceneKind, "none"> }) {
  switch (kind) {
    case "cover":
      return (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(46,230,255,0.18),transparent_55%),#03050c]">
          <p className="text-3xl font-extrabold tracking-[0.28em] text-[var(--zz-cyan)]">
            LOOKBACK
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
        <div className="flex h-full items-end justify-center gap-1 bg-[#03050c] px-8 pb-8">
          <div className="h-[70%] w-2/3 rounded-t-md bg-[rgba(46,230,255,0.35)]" />
          <div className="h-[28%] w-1/4 rounded-t-md bg-[rgba(201,168,76,0.4)]" />
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
