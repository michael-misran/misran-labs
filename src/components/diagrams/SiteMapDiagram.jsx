const ROW_H = 40
const INDENT = 28
const NODE_W = 168
const NODE_H = 28
const COL_W = 260
const TOP_PAD = 36
const CHAR_W = 8
const NODE_PAD = 20
const COL_PAD = 16

function nodeWidth(label, depth) {
  const base = NODE_W - depth * INDENT
  const fitted = label.length * CHAR_W + NODE_PAD
  return Math.max(base, fitted)
}

function flatten(node, depth, rows) {
  const row = rows.length
  rows.push({ label: node.label, depth, row })
  const parentRow = row
  ;(node.children || []).forEach(child => {
    flatten(child, depth + 1, rows)
  })
  return parentRow
}

function maxColWidth(rows) {
  const widest = Math.max(0, ...rows.map(r => r.depth * INDENT + nodeWidth(r.label, r.depth)))
  return Math.max(COL_W, widest + COL_PAD * 2)
}

function Column({ tree, x, title, accent }) {
  const rows = []
  flatten(tree, 0, rows)

  const byRow = {}
  rows.forEach(r => { byRow[r.row] = r })

  // rebuild parent links via a second pass using a stack keyed by depth
  const parentOf = {}
  const stack = []
  rows.forEach(r => {
    while (stack.length && stack[stack.length - 1].depth >= r.depth) stack.pop()
    if (stack.length) parentOf[r.row] = stack[stack.length - 1].row
    stack.push(r)
  })

  return (
    <g>
      <text
        x={x}
        y={16}
        fontFamily="'JetBrains Mono', monospace"
        fontSize={11}
        letterSpacing="0.1em"
        fill={accent}
      >
        {title}
      </text>

      {rows.map(r => {
        const nx = x + r.depth * INDENT
        const ny = TOP_PAD + r.row * ROW_H
        const w = nodeWidth(r.label, r.depth)

        const parentRow = parentOf[r.row]
        const parent = parentRow !== undefined ? byRow[parentRow] : null

        return (
          <g key={r.row}>
            {parent && (
              <path
                d={`M ${x + parent.depth * INDENT + 12} ${TOP_PAD + parent.row * ROW_H + NODE_H} V ${ny + NODE_H / 2} H ${nx}`}
                fill="none"
                stroke="var(--border)"
                strokeWidth={1.5}
              />
            )}
            <rect
              x={nx}
              y={ny}
              width={w}
              height={NODE_H}
              rx={4}
              fill="var(--bg2)"
              stroke={r.depth === 0 ? accent : 'var(--border)'}
              strokeOpacity={r.depth === 0 ? 0.6 : 1}
              strokeWidth={1}
            />
            <text
              x={nx + 10}
              y={ny + NODE_H / 2 + 4}
              fontFamily="'JetBrains Mono', monospace"
              fontSize={11}
              fill={r.depth === 0 ? 'var(--text)' : 'var(--text2)'}
            >
              {r.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export default function SiteMapDiagram({ before, after }) {
  const beforeRows = []
  flatten(before, 0, beforeRows)
  const afterRows = []
  flatten(after, 0, afterRows)

  const maxRows = Math.max(beforeRows.length, afterRows.length)
  const height = TOP_PAD + maxRows * ROW_H + 8

  const colW = Math.max(maxColWidth(beforeRows), maxColWidth(afterRows))
  const width = colW * 2

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width, height: 'auto', display: 'block' }}
    >
      <line x1={colW} y1={0} x2={colW} y2={height} stroke="var(--border)" strokeWidth={1} />
      <Column tree={before} x={COL_PAD} title="AVANT" accent="var(--warning)" />
      <Column tree={after} x={colW + COL_PAD} title="APRÈS" accent="var(--teal)" />
    </svg>
  )
}
