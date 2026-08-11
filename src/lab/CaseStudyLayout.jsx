import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import PhaseCoverage from './PhaseCoverage'

export function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--teal)',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}
        >
          {`// ${title.toUpperCase()}`}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--prose)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

export default function CaseStudyLayout({ title, role, period, tools = [], phases, children }) {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        fontFamily: "'Inter', sans-serif",
        color: 'var(--text)',
        maxWidth: 880,
        margin: '0 auto',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text2)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 24,
        }}
      >
        {'← Lab'}
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
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>RÔLE</div>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>{role}</div>
          </div>
        )}
        {period && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>PÉRIODE</div>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>{period}</div>
          </div>
        )}
        {tools.length > 0 && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>OUTILS</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tools.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: 'var(--teal)',
                    background: 'var(--active-tint)',
                    border: '1px solid var(--teal)',
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

      {phases && <PhaseCoverage phases={phases} />}

      {children}
    </div>
  )
}
