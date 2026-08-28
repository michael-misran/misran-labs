// Single source of truth for every "// TITLE" section header on the site.
// Change the look here — color, size, the trailing rule — and it propagates everywhere.
export default function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: 'var(--primary)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {`// ${String(children).toUpperCase()}`}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
