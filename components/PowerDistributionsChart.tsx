interface Props {
  lambda: number; // non-centrality (H1 mean in z-space)
  zCrit: number;
  labels: {
    power: string;
    alpha: string;
    beta: string;
    h0: string;
    h1: string;
  };
}

const W = 600;
const H = 250;
const PAD_L = 16;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 40; // room for legend
const Y_DOM_MAX = 0.44;

const ALPHA_COLOR = "#cf5240";

const pdf = (x: number, mean: number) =>
  Math.exp(-0.5 * (x - mean) ** 2) / Math.sqrt(2 * Math.PI);

export default function PowerDistributionsChart({ lambda, zCrit, labels }: Props) {
  const xMin = -4;
  const xMax = Math.max(7.5, lambda + 4);
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const xToPx = (x: number) => PAD_L + ((x - xMin) / (xMax - xMin)) * plotW;
  const yToPy = (y: number) => PAD_T + plotH - (y / Y_DOM_MAX) * plotH;
  const baseY = yToPy(0);

  const curve = (mean: number) => {
    const steps = 220;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      d += `${i === 0 ? "M" : "L"} ${xToPx(x).toFixed(1)} ${yToPy(pdf(x, mean)).toFixed(1)} `;
    }
    return d.trim();
  };

  const area = (mean: number, xa: number, xb: number) => {
    if (xb <= xa) return "";
    const steps = 90;
    let d = `M ${xToPx(xa).toFixed(1)} ${baseY.toFixed(1)} `;
    for (let i = 0; i <= steps; i++) {
      const x = xa + ((xb - xa) * i) / steps;
      d += `L ${xToPx(x).toFixed(1)} ${yToPy(pdf(x, mean)).toFixed(1)} `;
    }
    d += `L ${xToPx(xb).toFixed(1)} ${baseY.toFixed(1)} Z`;
    return d;
  };

  const cx = xToPx(zCrit);
  const legend = [
    { color: "var(--positive)", label: labels.power },
    { color: ALPHA_COLOR, label: labels.alpha },
    { color: "var(--negative)", label: labels.beta },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Power chart">
      {/* β: H1 left of critical (miss) */}
      <path d={area(lambda, xMin, zCrit)} fill="var(--negative)" fillOpacity={0.3} />
      {/* power: H1 right of critical (detect) */}
      <path d={area(lambda, zCrit, xMax)} fill="var(--positive)" fillOpacity={0.32} />
      {/* α: H0 right tail (false positive) */}
      <path d={area(0, zCrit, xMax)} fill={ALPHA_COLOR} fillOpacity={0.42} />

      {/* baseline */}
      <line x1={PAD_L} y1={baseY} x2={W - PAD_R} y2={baseY} stroke="currentColor" strokeOpacity={0.2} />

      {/* critical line */}
      <line x1={cx} y1={PAD_T} x2={cx} y2={baseY} stroke="currentColor" strokeOpacity={0.5} strokeDasharray="4 3" />

      {/* curves */}
      <path d={curve(0)} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.5} />
      <path d={curve(lambda)} fill="none" stroke="var(--accent)" strokeWidth={1.8} />

      {/* curve labels */}
      <text x={xToPx(0)} y={yToPy(pdf(0, 0)) - 6} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.6}>
        {labels.h0}
      </text>
      <text x={xToPx(lambda)} y={yToPy(pdf(lambda, lambda)) - 6} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--accent)">
        {labels.h1}
      </text>

      {/* legend */}
      {legend.map((item, i) => {
        const lx = PAD_L + i * 150;
        const ly = H - 14;
        return (
          <g key={i}>
            <rect x={lx} y={ly - 8} width={10} height={10} rx={2} fill={item.color} fillOpacity={0.7} />
            <text x={lx + 16} y={ly} fontSize={11} fill="currentColor" fillOpacity={0.7}>
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
