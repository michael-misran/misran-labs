import { useLocation } from 'react-router-dom'
import { resolveRouteMeta } from '../shell/registry'

export default function ActiveModuleWidget({ history = [] }) {
  const location = useLocation()
  const active = resolveRouteMeta(location.pathname)

  return (
    <div
      style={{
        background: 'rgba(10,14,23,0.4)',
        borderBottom: '1px solid #1a2a3a',
        padding: '12px 16px',
      }}
    >
      {/* Active */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          marginBottom: 6,
        }}
      >
        ACTIF
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#25e2cc' }}>
          {active.icon}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e8f4f8' }}>
          {active.label}
        </span>
      </div>

      {/* History */}
      {history.length > 0 && (
        <>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              marginBottom: 4,
            }}
          >
            HISTORIQUE
          </div>
          {history.map((pathname, i) => {
            const m = resolveRouteMeta(pathname)
            return (
              <div
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                }}
              >
                {m.icon} {m.label}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
