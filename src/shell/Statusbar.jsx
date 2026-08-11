export default function Statusbar({ moduleLabel }) {
  return (
    <div
      style={{
        height: 32,
        background: '#060a10',
        borderTop: '1px solid #1a2a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: '#4a7a94',
        letterSpacing: '0.06em',
      }}
    >
      <span>MISRAN LABS v2.0.0 · LAB ENVIRONMENT</span>
      <span>▸ {moduleLabel}</span>
      <span>VERCEL · AUTO-DEPLOY · GITHUB</span>
    </div>
  )
}
