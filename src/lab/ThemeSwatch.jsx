function Panel({ label, bg, bg2, text, text2, accent, border }) {
  return (
    <div style={{ flex: '1 1 220px', minWidth: 220 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: 14 }}>
        <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 6, padding: 14 }}>
          <div style={{ color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', marginBottom: 8 }}>
            {'// CONTEXTE'}
          </div>
          <div style={{ color: text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
            Création du lab
          </div>
          <div style={{ color: text2, fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.5 }}>
            Un paragraphe de lecture pour comparer le confort visuel entre les deux thèmes.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemeSwatch() {
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <Panel
        label="SOMBRE"
        bg="#0a0e17"
        bg2="#0d1220"
        text="#e8f4f8"
        text2="#7a9bb5"
        accent="#25e2cc"
        border="#1a2a3a"
      />
      <Panel
        label="CLAIR"
        bg="#f6f8fa"
        bg2="#ffffff"
        text="#12202c"
        text2="#4b6478"
        accent="#087a6e"
        border="#dde5ec"
      />
    </div>
  )
}
