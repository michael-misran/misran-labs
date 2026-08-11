const STEP_W = 240
const GAP = 56
const LABEL_H = 24
const LINE_H = 14
const PAD_TOP = 26
const PAD_BOTTOM = 14
const MAX_CHARS_PER_LINE = 34

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''

  words.forEach(word => {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  })
  if (current) lines.push(current)

  return lines
}

export default function FlowDiagram({ steps, direction = 'horizontal' }) {
  const isHorizontal = direction === 'horizontal'
  const n = steps.length

  const wrapped = steps.map(step => ({
    ...step,
    lines: step.sublabel ? wrapText(step.sublabel, MAX_CHARS_PER_LINE) : [],
  }))

  const stepH = PAD_TOP + LABEL_H + Math.max(0, ...wrapped.map(s => s.lines.length)) * LINE_H + PAD_BOTTOM

  const width = isHorizontal ? n * STEP_W + (n - 1) * GAP : STEP_W
  const height = isHorizontal ? stepH : n * stepH + (n - 1) * GAP

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width, height: 'auto', display: 'block' }}
    >
      {wrapped.map((step, i) => {
        const x = isHorizontal ? i * (STEP_W + GAP) : 0
        const y = isHorizontal ? 0 : i * (stepH + GAP)

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={STEP_W}
              height={stepH}
              rx={6}
              fill="#0d1220"
              stroke="#25e2cc"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <text
              x={x + STEP_W / 2}
              y={y + PAD_TOP}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={12}
              fontWeight={600}
              fill="#e8f4f8"
            >
              {step.label}
            </text>
            {step.lines.map((line, li) => (
              <text
                key={li}
                x={x + STEP_W / 2}
                y={y + PAD_TOP + LABEL_H + li * LINE_H}
                textAnchor="middle"
                fontFamily="'Inter', sans-serif"
                fontSize={10.5}
                fill="#7a9bb5"
              >
                {line}
              </text>
            ))}

            {i < n - 1 && (
              isHorizontal ? (
                <g>
                  <line
                    x1={x + STEP_W}
                    y1={y + stepH / 2}
                    x2={x + STEP_W + GAP - 8}
                    y2={y + stepH / 2}
                    stroke="var(--muted)"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${x + STEP_W + GAP - 8},${y + stepH / 2 - 4} ${x + STEP_W + GAP},${y + stepH / 2} ${x + STEP_W + GAP - 8},${y + stepH / 2 + 4}`}
                    fill="var(--muted)"
                  />
                </g>
              ) : (
                <g>
                  <line
                    x1={x + STEP_W / 2}
                    y1={y + stepH}
                    x2={x + STEP_W / 2}
                    y2={y + stepH + GAP - 8}
                    stroke="var(--muted)"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${x + STEP_W / 2 - 4},${y + stepH + GAP - 8} ${x + STEP_W / 2},${y + stepH + GAP} ${x + STEP_W / 2 + 4},${y + stepH + GAP - 8}`}
                    fill="var(--muted)"
                  />
                </g>
              )
            )}
          </g>
        )
      })}
    </svg>
  )
}
