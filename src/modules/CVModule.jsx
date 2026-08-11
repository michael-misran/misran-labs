export default function CVModule() {
  return (
    <div
      style={{
        padding: 40,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
        color: '#e8f4f8',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#25e2cc',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {'// CV'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
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
