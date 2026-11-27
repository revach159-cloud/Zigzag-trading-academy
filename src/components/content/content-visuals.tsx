type VisualKind =
  | "zigzag-swings"
  | "position-stack"
  | "adverse-ladder"
  | "leverage-paths"
  | "avg-entry"
  | "profit-split"
  | "multi-position"
  | "risk-bands"
  | "traffic-light"
  | "return-balance"
  | "lookback-path";

export function ContentVisual({
  kind,
  captionHe,
}: {
  kind: VisualKind;
  captionHe: string;
}) {
  return (
    <figure className="my-8 overflow-hidden border-y border-[var(--zz-line)] bg-[radial-gradient(ellipse_at_50%_0%,rgba(46,230,255,0.08),transparent_55%),rgba(7,11,22,0.55)]">
      <div className="px-2 pt-5 sm:px-4">
        <VisualSvg kind={kind} />
      </div>
      <figcaption className="px-1 py-4 text-sm leading-7 text-[var(--zz-muted)]">
        {captionHe}
      </figcaption>
    </figure>
  );
}

function VisualSvg({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "zigzag-swings":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="ZigZag swings">
          <defs>
            <linearGradient id="zz-grid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2ee6ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2ee6ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="640" height="220" fill="url(#zz-grid)" />
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="24" x2="616" y1={y} y2={y} stroke="rgba(125,211,252,0.12)" />
          ))}
          <polyline
            fill="none"
            stroke="#2ee6ff"
            strokeWidth="3"
            points="40,150 120,70 220,130 320,50 420,120 520,60 600,110"
          />
          {[
            [120, 70],
            [220, 130],
            [320, 50],
            [420, 120],
            [520, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#c9a84c" />
          ))}
          <text x="120" y="56" fill="#8fa0b8" fontSize="12" textAnchor="middle">
            swing high
          </text>
          <text x="220" y="152" fill="#8fa0b8" fontSize="12" textAnchor="middle">
            swing low
          </text>
        </svg>
      );
    case "position-stack":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Position stack">
          <rect x="80" y="140" width="480" height="36" fill="rgba(46,230,255,0.18)" stroke="#2ee6ff" />
          <rect x="120" y="90" width="400" height="36" fill="rgba(46,230,255,0.28)" stroke="#2ee6ff" />
          <rect x="180" y="40" width="280" height="36" fill="rgba(201,168,76,0.28)" stroke="#c9a84c" />
          <text x="320" y="163" fill="#e8eef8" fontSize="13" textAnchor="middle">
            entry 1 · allocated capital
          </text>
          <text x="320" y="113" fill="#e8eef8" fontSize="13" textAnchor="middle">
            reinforcement 1x
          </text>
          <text x="320" y="63" fill="#e8eef8" fontSize="13" textAnchor="middle">
            ×10 stage (same quantity)
          </text>
        </svg>
      );
    case "adverse-ladder":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Adverse move ladder">
          {[0, 1, 2, 3, 4].map((step) => {
            const y = 40 + step * 32;
            const width = 420 - step * 40;
            return (
              <g key={step}>
                <rect
                  x={(640 - width) / 2}
                  y={y}
                  width={width}
                  height="24"
                  fill={step === 0 ? "rgba(46,230,255,0.25)" : "rgba(240,113,120,0.18)"}
                  stroke={step === 0 ? "#2ee6ff" : "#f07178"}
                />
                <text x="320" y={y + 16} fill="#e8eef8" fontSize="12" textAnchor="middle">
                  {step === 0 ? "reference price" : `−${step * 10}% educational rung`}
                </text>
              </g>
            );
          })}
        </svg>
      );
    case "leverage-paths":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="1x to 10x stage transition">
          <rect x="40" y="70" width="150" height="80" fill="rgba(46,230,255,0.15)" stroke="#2ee6ff" />
          <text x="115" y="105" fill="#e8eef8" fontSize="14" textAnchor="middle">
            ×1 stage
          </text>
          <text x="115" y="128" fill="#8fa0b8" fontSize="11" textAnchor="middle">
            margin ≤ תקציב מדורג
          </text>
          <path d="M200 110 H270" stroke="#c9a84c" strokeWidth="2" />
          <polygon points="270,110 258,104 258,116" fill="#c9a84c" />
          <text x="235" y="98" fill="#c9a84c" fontSize="11" textAnchor="middle">
            budget cap
          </text>
          <rect x="280" y="70" width="150" height="80" fill="rgba(201,168,76,0.18)" stroke="#c9a84c" />
          <text x="355" y="105" fill="#e8eef8" fontSize="14" textAnchor="middle">
            ×10 stage
          </text>
          <text x="355" y="128" fill="#8fa0b8" fontSize="11" textAnchor="middle">
            same quantity
          </text>
          <path d="M440 110 H510" stroke="#2ee6ff" strokeWidth="2" />
          <polygon points="510,110 498,104 498,116" fill="#2ee6ff" />
          <rect x="520" y="70" width="100" height="80" fill="rgba(46,230,255,0.1)" stroke="#2ee6ff" strokeDasharray="4 3" />
          <text x="570" y="105" fill="#e8eef8" fontSize="12" textAnchor="middle">
            max L
          </text>
          <text x="570" y="128" fill="#8fa0b8" fontSize="10" textAnchor="middle">
            Bybit only
          </text>
        </svg>
      );
    case "avg-entry":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Average entry">
          <line x1="80" y1="160" x2="560" y2="160" stroke="rgba(125,211,252,0.3)" />
          <circle cx="160" cy="160" r="8" fill="#2ee6ff" />
          <circle cx="320" cy="160" r="8" fill="#2ee6ff" />
          <circle cx="440" cy="160" r="10" fill="#c9a84c" />
          <text x="160" y="140" fill="#8fa0b8" fontSize="12" textAnchor="middle">
            fill A
          </text>
          <text x="320" y="140" fill="#8fa0b8" fontSize="12" textAnchor="middle">
            fill B
          </text>
          <text x="440" y="140" fill="#c9a84c" fontSize="12" textAnchor="middle">
            VWAP / avg entry
          </text>
          <text x="320" y="195" fill="#e8eef8" fontSize="13" textAnchor="middle">
            weighted by quantity
          </text>
        </svg>
      );
    case "profit-split":
      return (
        <svg viewBox="0 0 640 180" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="75 percent profit split">
          <rect x="80" y="60" width="360" height="48" fill="rgba(46,230,255,0.25)" stroke="#2ee6ff" />
          <rect x="440" y="60" width="120" height="48" fill="rgba(201,168,76,0.28)" stroke="#c9a84c" />
          <text x="260" y="90" fill="#e8eef8" fontSize="14" textAnchor="middle">
            75% close qty
          </text>
          <text x="500" y="90" fill="#e8eef8" fontSize="14" textAnchor="middle">
            25% remain
          </text>
        </svg>
      );
    case "multi-position":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Multiple positions">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={60 + i * 180}
                y={50 + i * 18}
                width="150"
                height="100"
                fill="rgba(46,230,255,0.12)"
                stroke="#2ee6ff"
              />
              <text x={135 + i * 180} y={105 + i * 18} fill="#e8eef8" fontSize="13" textAnchor="middle">
                {`position ${i + 1}`}
              </text>
            </g>
          ))}
        </svg>
      );
    case "risk-bands":
      return (
        <svg viewBox="0 0 640 180" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Risk bands">
          <rect x="80" y="50" width="120" height="80" fill="rgba(46,230,255,0.2)" stroke="#2ee6ff" />
          <rect x="220" y="50" width="160" height="80" fill="rgba(201,168,76,0.22)" stroke="#c9a84c" />
          <rect x="400" y="50" width="160" height="80" fill="rgba(240,113,120,0.22)" stroke="#f07178" />
          <text x="140" y="95" fill="#e8eef8" fontSize="13" textAnchor="middle">
            allocated
          </text>
          <text x="300" y="95" fill="#e8eef8" fontSize="13" textAnchor="middle">
            stress band
          </text>
          <text x="480" y="95" fill="#e8eef8" fontSize="13" textAnchor="middle">
            breach zone
          </text>
        </svg>
      );
    case "traffic-light":
      return (
        <svg viewBox="0 0 640 240" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Traffic light stages">
          <rect x="270" y="24" width="100" height="192" rx="16" fill="rgba(16,26,46,0.9)" stroke="rgba(125,211,252,0.35)" />
          <circle cx="320" cy="70" r="22" fill="#3DDC97" />
          <circle cx="320" cy="120" r="22" fill="#F5C542" />
          <circle cx="320" cy="170" r="22" fill="#F07178" />
          <text x="200" y="76" fill="#8fa0b8" fontSize="13" textAnchor="end">
            ×1 green
          </text>
          <text x="440" y="126" fill="#8fa0b8" fontSize="13">
            ×10 yellow
          </text>
          <text x="200" y="176" fill="#8fa0b8" fontSize="13" textAnchor="end">
            max red
          </text>
        </svg>
      );
    case "return-balance":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Return to balance">
          <path
            d="M60 160 C140 40, 220 200, 300 90 S460 40, 580 130"
            fill="none"
            stroke="#2ee6ff"
            strokeWidth="3"
          />
          <circle cx="580" cy="130" r="10" fill="#c9a84c" />
          <text x="80" y="190" fill="#8fa0b8" fontSize="12">
            storm
          </text>
          <text x="520" y="190" fill="#c9a84c" fontSize="12">
            toward ×1
          </text>
        </svg>
      );
    case "lookback-path":
      return (
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="Lookback prepared routes">
          <defs>
            <linearGradient id="lb-path" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#2ee6ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M40 170 L120 90 L200 140 L280 60 L360 120 L440 50 L520 110 L600 70"
            fill="none"
            stroke="url(#lb-path)"
            strokeWidth="4"
          />
          {[40, 120, 200, 280, 360, 440, 520, 600].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[170, 90, 140, 60, 120, 50, 110, 70][i]}
              r={i === 0 || i === 7 ? 7 : 4}
              fill={i === 7 ? "#c9a84c" : "#2ee6ff"}
            />
          ))}
          <text x="320" y="200" fill="#8fa0b8" fontSize="13" textAnchor="middle">
            prepared routes · Lookback
          </text>
        </svg>
      );
  }
}
