// Micro-label role: field captions (form labels, metadata like RÔLE/PÉRIODE/OUTILS).
// Pure typography only — no margin/gap baked in, so it drops into flex layouts
// with their own `gap` without doubling up spacing.
export default function FieldLabel({ children }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        color: 'var(--muted)',
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </span>
  )
}
