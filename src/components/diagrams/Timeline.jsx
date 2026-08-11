const ROW_H = 64
const LINE_X = 12

export default function Timeline({ milestones }) {
  const height = milestones.length * ROW_H + 16
  const width = 520

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width, height: 'auto', display: 'block' }}
    >
      <line
        x1={LINE_X}
        y1={16}
        x2={LINE_X}
        y2={height - 16}
        stroke="var(--border)"
        strokeWidth={1.5}
      />

      {milestones.map((m, i) => {
        const y = 16 + i * ROW_H

        return (
          <g key={i}>
            <circle cx={LINE_X} cy={y} r={5} fill="var(--bg2)" stroke="var(--teal)" strokeWidth={2} />
            <text
              x={LINE_X + 20}
              y={y - 6}
              fontFamily="'JetBrains Mono', monospace"
              fontSize={10}
              letterSpacing="0.08em"
              fill="var(--muted)"
            >
              {m.date}
            </text>
            <text
              x={LINE_X + 20}
              y={y + 14}
              fontFamily="'Inter', sans-serif"
              fontSize={13}
              fill="var(--text)"
            >
              {m.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
