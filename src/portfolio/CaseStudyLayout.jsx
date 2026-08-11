import { Link } from 'react-router-dom'

export function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#25e2cc',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}
        >
          {`// ${title.toUpperCase()}`}
        </span>
        <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#c8dae5', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

export default function CaseStudyLayout({ title, role, period, tools = [], children }) {
  return (
    <div
      style={{
        padding: 40,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
        color: '#e8f4f8',
        maxWidth: 880,
      }}
    >
      <Link
        to="/portfolio"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#7a9bb5',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 24,
        }}
      >
        {'← Portfolio'}
      </Link>

      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 600,
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {role && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4a7a94', letterSpacing: '0.1em', marginBottom: 4 }}>RÔLE</div>
            <div style={{ fontSize: 13, color: '#e8f4f8' }}>{role}</div>
          </div>
        )}
        {period && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4a7a94', letterSpacing: '0.1em', marginBottom: 4 }}>PÉRIODE</div>
            <div style={{ fontSize: 13, color: '#e8f4f8' }}>{period}</div>
          </div>
        )}
        {tools.length > 0 && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4a7a94', letterSpacing: '0.1em', marginBottom: 4 }}>OUTILS</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tools.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#25e2cc',
                    background: 'rgba(37,226,204,0.06)',
                    border: '1px solid rgba(37,226,204,0.2)',
                    borderRadius: 3,
                    padding: '2px 8px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
