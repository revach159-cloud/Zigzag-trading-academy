type VisualKind =
  | "zigzag-swings"
  | "position-stack"
  | "adverse-ladder"
  | "leverage-paths"
  | "avg-entry"
  | "profit-split"
  | "multi-position"
  | "risk-bands";

export function ContentVisual({
  kind,
  captionHe,
}: {
  kind: VisualKind;
  captionHe: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-sm border border-[var(--zz-line)] bg-[var(--zz-panel)]/40">
      <div className="px-3 pt-4 sm:px-5">
        <VisualSvg kind={kind} />
      </div>
      <figcaption className="border-t border-[var(--zz-line)] px-4 py-3 text-sm text-[var(--zz-muted)]">
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
            optional 10x layer (draft)
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
        <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" role="img" aria-label="1x to 10x paths">
          <rect x="40" y="80" width="140" height="60" fill="rgba(46,230,255,0.15)" stroke="#2ee6ff" />
          <text x="110" y="115" fill="#e8eef8" fontSize="14" textAnchor="middle">
            1x position
          </text>
          <path d="M190 95 H250" stroke="#c9a84c" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M190 125 H250" stroke="#2ee6ff" strokeWidth="2" />
          <rect x="260" y="40" width="160" height="60" fill="rgba(201,168,76,0.18)" stroke="#c9a84c" />
          <text x="340" y="65" fill="#e8eef8" fontSize="12" textAnchor="middle">
            Path A
          </text>
          <text x="340" y="85" fill="#8fa0b8" fontSize="11" textAnchor="middle">
            separate 10x
          </text>
          <rect x="260" y="120" width="160" height="60" fill="rgba(46,230,255,0.18)" stroke="#2ee6ff" />
          <text x="340" y="145" fill="#e8eef8" fontSize="12" textAnchor="middle">
            Path B
          </text>
          <text x="340" y="165" fill="#8fa0b8" fontSize="11" textAnchor="middle">
            re-lever in place
          </text>
          <text x="500" y="110" fill="#c9a84c" fontSize="12">
            not equivalent
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
            75% realize (draft)
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
  }
}
