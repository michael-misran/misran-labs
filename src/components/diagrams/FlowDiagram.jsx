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

export default function FlowDiagram({ steps, direction = 'horizontal', columns = 3 }) {
  const isHorizontal = direction === 'horizontal'
  const isGrid = direction === 'grid'
  const n = steps.length

  const wrapped = steps.map(step => ({
    ...step,
    lines: step.sublabel ? wrapText(step.sublabel, MAX_CHARS_PER_LINE) : [],
  }))

  const stepH = PAD_TOP + LABEL_H + Math.max(0, ...wrapped.map(s => s.lines.length)) * LINE_H + PAD_BOTTOM

  // Grille en serpentin : ligne paire → gauche à droite, ligne impaire → droite à gauche.
  const cols = isGrid ? Math.max(1, Math.min(columns, n)) : 0
  const rows = isGrid ? Math.ceil(n / cols) : 0

  const width = isGrid
    ? cols * STEP_W + (cols - 1) * GAP
    : isHorizontal
      ? n * STEP_W + (n - 1) * GAP
      : STEP_W
  const height = isGrid
    ? rows * stepH + (rows - 1) * GAP
    : isHorizontal
      ? stepH
      : n * stepH + (n - 1) * GAP

  const positions = wrapped.map((_, i) => {
    if (isGrid) {
      const row = Math.floor(i / cols)
      const p = i % cols
      const col = row % 2 === 0 ? p : cols - 1 - p
      return { x: col * (STEP_W + GAP), y: row * (stepH + GAP), row }
    }
    return {
      x: isHorizontal ? i * (STEP_W + GAP) : 0,
      y: isHorizontal ? 0 : i * (stepH + GAP),
    }
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width, height: 'auto', display: 'block' }}
    >
      {wrapped.map((step, i) => {
        const { x, y } = positions[i]

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={STEP_W}
              height={stepH}
              rx={20}
              fill="var(--bg2)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={x + STEP_W / 2}
              y={y + PAD_TOP}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={12}
              fontWeight={600}
              fill="var(--text)"
            >
              {step.label}
            </text>
            {step.lines.map((line, li) => (
              <text
                key={li}
                x={x + STEP_W / 2}
                y={y + PAD_TOP + LABEL_H + li * LINE_H}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontSize={10.5}
                fill="var(--text2)"
              >
                {line}
              </text>
            ))}

            {i < n - 1 && (
              isGrid ? (
                positions[i].row === positions[i + 1].row ? (
                  (() => {
                    const next = positions[i + 1]
                    const rightward = next.x > x
                    const fromEdge = rightward ? x + STEP_W : x
                    const apex = rightward ? next.x : next.x + STEP_W
                    const lineEnd = rightward ? apex - 8 : apex + 8
                    const midY = y + stepH / 2

                    return (
                      <g>
                        <line
                          x1={fromEdge}
                          y1={midY}
                          x2={lineEnd}
                          y2={midY}
                          stroke="var(--muted)"
                          strokeWidth={1.5}
                        />
                        <polygon
                          points={`${lineEnd},${midY - 4} ${apex},${midY} ${lineEnd},${midY + 4}`}
                          fill="var(--muted)"
                        />
                      </g>
                    )
                  })()
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
              ) : isHorizontal ? (
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
