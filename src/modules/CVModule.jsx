import useIsMobile from '../shell/useIsMobile'

export default function CVModule() {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        fontFamily: "'Inter', sans-serif",
        color: 'var(--text)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--teal)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {'// CV'}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
      </div>

      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 600,
          margin: 0,
        }}
      >
        CV
      </h1>
    </div>
  )
}
