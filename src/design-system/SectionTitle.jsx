// Single source of truth for every "// TITLE" section header on the site.
// Change the look here — color, size, the trailing rule — and it propagates everywhere.
export default function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: 'var(--primary)',
          letterSpacing: '0.1em',
          // Va à la ligne sur mobile : un titre long faisait déborder la page
          minWidth: 0,
        }}
      >
        {`// ${String(children).toUpperCase()}`}
      </span>
      <div style={{ flex: 1, minWidth: 24, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
