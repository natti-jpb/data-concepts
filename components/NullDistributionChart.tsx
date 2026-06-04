interface Props {
  z: number;
  zCrit: number;
  significant: boolean;
  observedLabel: string;
  criticalLabel: string;
}

const W = 600;
const H = 260;
const PAD_L = 24;
const PAD_R = 24;
const PAD_T = 16;
const PAD_B = 28;
const X_MIN = -4.2;
const X_MAX = 4.2;
const Y_DOM_MAX = 0.42;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const xToPx = (x: number) => PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
const yToPy = (y: number) => PAD_T + PLOT_H - (y / Y_DOM_MAX) * PLOT_H;
const pdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
const BASELINE = yToPy(0);

function curvePath(): string {
  const steps = 240;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / steps;
    d += `${i === 0 ? "M" : "L"} ${xToPx(x).toFixed(2)} ${yToPy(pdf(x)).toFixed(2)} `;
  }
  return d.trim();
}

function areaPath(xa: number, xb: number): string {
  if (xb <= xa) return "";
  const steps = 80;
  let d = `M ${xToPx(xa).toFixed(2)} ${BASELINE.toFixed(2)} `;
  for (let i = 0; i <= steps; i++) {
    const x = xa + ((xb - xa) * i) / steps;
    d += `L ${xToPx(x).toFixed(2)} ${yToPy(pdf(x)).toFixed(2)} `;
  }
  d += `L ${xToPx(xb).toFixed(2)} ${BASELINE.toFixed(2)} Z`;
  return d;
}

export default function NullDistributionChart({
  z,
  zCrit,
  significant,
  observedLabel,
  criticalLabel,
}: Props) {
  const zAbs = Math.abs(z);
  const tailColor = significant ? "var(--positive)" : "var(--negative)";
  const zLineX = xToPx(Math.max(X_MIN, Math.min(X_MAX, z)));
  const showTails = zAbs < X_MAX;
  const critIn = zCrit < X_MAX;
  const ticks = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Null distribution chart"
    >
      {/* shaded p-value tails: |x| >= |z| */}
      {showTails && (
        <>
          <path d={areaPath(zAbs, X_MAX)} fill={tailColor} fillOpacity={0.28} />
          <path d={areaPath(X_MIN, -zAbs)} fill={tailColor} fillOpacity={0.28} />
        </>
      )}

      {/* baseline */}
      <line
        x1={PAD_L}
        y1={BASELINE}
        x2={W - PAD_R}
        y2={BASELINE}
        stroke="currentColor"
        strokeOpacity={0.25}
      />

      {/* x ticks */}
      {ticks.map((tk) => (
        <g key={tk}>
          <line
            x1={xToPx(tk)}
            y1={BASELINE}
            x2={xToPx(tk)}
            y2={BASELINE + 4}
            stroke="currentColor"
            strokeOpacity={0.35}
          />
          <text
            x={xToPx(tk)}
            y={BASELINE + 18}
            textAnchor="middle"
            fontSize={11}
            fill="currentColor"
            fillOpacity={0.5}
          >
            {tk}
          </text>
        </g>
      ))}

      {/* critical bounds */}
      {critIn && (
        <>
          {[zCrit, -zCrit].map((c) => (
            <line
              key={c}
              x1={xToPx(c)}
              y1={yToPy(pdf(c))}
              x2={xToPx(c)}
              y2={BASELINE}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeDasharray="4 3"
            />
          ))}
          <text
            x={xToPx(zCrit)}
            y={PAD_T + 4}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.5}
          >
            ±{zCrit.toFixed(2)} ({criticalLabel})
          </text>
        </>
      )}

      {/* the normal curve */}
      <path d={curvePath()} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.5} />

      {/* observed z line */}
      <line
        x1={zLineX}
        y1={PAD_T}
        x2={zLineX}
        y2={BASELINE}
        stroke={tailColor}
        strokeWidth={2}
      />
      <text
        x={zLineX}
        y={PAD_T + 14}
        textAnchor={z >= 0 ? "end" : "start"}
        dx={z >= 0 ? -4 : 4}
        fontSize={11}
        fontWeight={600}
        fill={tailColor}
      >
        {observedLabel} = {z.toFixed(2)}
      </text>
    </svg>
  );
}
