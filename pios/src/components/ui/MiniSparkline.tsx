'use client';

export default function MiniSparkline({ data, color = '#3b82f6', height = 32, width = 80 }: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={data.length > 0 ? (data.length - 1) * step : 0}
        cy={data.length > 0 ? height - ((data[data.length - 1] - min) / range) * (height - 4) - 2 : 0}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}
