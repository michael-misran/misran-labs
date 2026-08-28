// Tag / pill role: tool tags, project tags — a bordered, tinted label.
// Color is the one thing that varies by context; shape stays fixed.
export default function Tag({ children, color = 'var(--primary)' }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color,
        background: 'var(--active-tint)',
        border: `1px solid ${color}`,
        borderRadius: 3,
        padding: '2px 8px',
      }}
    >
      {children}
    </span>
  )
}
