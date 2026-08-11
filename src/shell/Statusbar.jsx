export default function Statusbar({ moduleLabel, isMobile }) {
  return (
    <footer
      style={{
        height: 32,
        background: 'var(--bg3)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        padding: '0 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: 'var(--muted)',
        letterSpacing: '0.06em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {isMobile ? (
        <span>▸ {moduleLabel}</span>
      ) : (
        <>
          <span>MISRAN LABS v2.0.0 · LAB ENVIRONMENT</span>
          <span>▸ {moduleLabel}</span>
          <span>VERCEL · AUTO-DEPLOY · GITHUB</span>
        </>
      )}
    </footer>
  )
}
