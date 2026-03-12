import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLORS = [
  { name: 'Background',     hex: '#0a0e17', usage: 'Fond principal' },
  { name: 'Background Alt', hex: '#0d1220', usage: 'Fond secondaire' },
  { name: 'Cyan',           hex: '#00d4ff', usage: 'Accent primaire' },
  { name: 'Teal',           hex: '#25e2cc', usage: 'Accent secondaire' },
  { name: 'Text Primary',   hex: '#e8f4f8', usage: 'Texte principal' },
  { name: 'Text Secondary', hex: '#7a9bb5', usage: 'Texte secondaire' },
  { name: 'Border',         hex: '#1a2a3a', usage: 'Bordures et grilles' },
  { name: 'Error',          hex: '#ff4444', usage: 'États d\'erreur' },
  { name: 'Success',        hex: '#00ff88', usage: 'États de succès' },
]

const SPACING = [4, 8, 16, 24, 32, 40, 48, 64, 80]

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const { pathname } = useLocation()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: 64,
      background: 'rgba(10,14,23,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(26,42,58,0.8)',
    }}>
      <Link to="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#25e2cc', letterSpacing: '0.06em', textDecoration: 'none' }}>
        MISRAN LABS
      </Link>
      <div style={{ display: 'flex', gap: 36 }}>
        {[{ label: 'Lab', to: '/lab' }, { label: 'Process', to: '/process' }, { label: 'DS', to: '/design-system' }, { label: 'Contact', to: '/contact' }].map(({ label, to }) => (
          <Link key={to} to={to} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14,
            color: pathname === to ? '#e8f4f8' : '#7a9bb5',
            textDecoration: 'none', transition: 'color 0.15s ease',
            borderBottom: pathname === to ? '1px solid #25e2cc' : '1px solid transparent',
            paddingBottom: 2,
          }}>{label}</Link>
        ))}
      </div>
    </nav>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#25e2cc', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
    </div>
  )
}

// ─── Color Swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({ color }) {
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(color.hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const isLight = ['#e8f4f8', '#7a9bb5', '#00ff88', '#00d4ff', '#25e2cc'].includes(color.hex)

  return (
    <div
      onClick={handleClick}
      style={{
        borderRadius: 8, overflow: 'hidden', border: '1px solid #1a2a3a',
        cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ height: 80, background: color.hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {copied && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: isLight ? '#0a0e17' : '#e8f4f8', letterSpacing: '0.1em', background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: 3 }}>
            COPIÉ ✓
          </span>
        )}
      </div>
      <div style={{ padding: '12px 14px', background: '#0d1220' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#e8f4f8', marginBottom: 4 }}>
          {color.name}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#25e2cc', marginBottom: 4 }}>
          {color.hex}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7a9bb5' }}>
          {color.usage}
        </div>
      </div>
    </div>
  )
}

// ─── Code Block ───────────────────────────────────────────────────────────────

function CodeBlock({ children }) {
  return (
    <div style={{
      background: '#060a10', border: '1px solid #1a2a3a', borderRadius: 6,
      padding: '16px 20px',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
      color: '#7a9bb5', lineHeight: 1.8, whiteSpace: 'pre',
    }}>
      {children}
    </div>
  )
}

// ─── Design System Page ───────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        .cta-btn:hover { background: rgba(37,226,204,0.22) !important; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: '#0a0e17',
        backgroundImage: 'linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)',
        backgroundSize: '40px 40px', color: '#e8f4f8', fontFamily: "'Inter', sans-serif",
      }}>
        <Nav />

        <main style={{ maxWidth: 1080, margin: '0 auto', padding: '112px 40px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#25e2cc', letterSpacing: '0.04em' }}>
                // DESIGN SYSTEM
              </h1>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#25e2cc', border: '1px solid rgba(37,226,204,0.3)', background: 'rgba(37,226,204,0.06)', borderRadius: 4, padding: '5px 12px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                MISRAN LABS DS v1.0
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a9bb5', lineHeight: 1.7, maxWidth: 580 }}>
              Tokens, typographie, couleurs et composants — documentés en code, sans outil intermédiaire
            </p>
          </div>

          {/* ── Colors ── */}
          <section style={{ marginBottom: 80 }}>
            <SectionHeader title="// COLORS" />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', marginBottom: 24, letterSpacing: '0.04em' }}>
              // Cliquez sur un swatch pour copier la valeur hex
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
              {COLORS.map(c => <ColorSwatch key={c.hex} color={c} />)}
            </div>
          </section>

          {/* ── Typography ── */}
          <section style={{ marginBottom: 80 }}>
            <SectionHeader title="// TYPOGRAPHY" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Space Grotesk */}
              <div style={{ padding: '40px', background: '#0d1220', borderRadius: '8px 8px 0 0', border: '1px solid #1a2a3a' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 40, color: '#e8f4f8', lineHeight: 1.1, marginBottom: 20 }}>
                  Le Product Designer qui code avec l'IA
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.06em' }}>
                  Space Grotesk 700 · Headings
                </span>
              </div>

              {/* Inter */}
              <div style={{ padding: '40px', background: '#0d1220', borderTop: '1px solid #1a2a3a', border: '1px solid #1a2a3a', borderTop: 'none' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 18, color: '#7a9bb5', lineHeight: 1.7, marginBottom: 20 }}>
                  Je dirige l'IA de A à Z pour livrer des produits complets.
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.06em' }}>
                  Inter 400 · Body text
                </span>
              </div>

              {/* JetBrains Mono */}
              <div style={{ padding: '40px', background: '#060a10', borderRadius: '0 0 8px 8px', border: '1px solid #1a2a3a', borderTop: 'none' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 16, color: '#25e2cc', lineHeight: 1.6, marginBottom: 20 }}>
                  &gt; Initializing design system... OK
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.06em' }}>
                  JetBrains Mono 400 · Code &amp; data
                </span>
              </div>

            </div>
          </section>

          {/* ── Components ── */}
          <section style={{ marginBottom: 80 }}>
            <SectionHeader title="// COMPONENTS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Buttons */}
              <div style={{ background: '#0d1220', border: '1px solid #1a2a3a', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '8px 20px', borderBottom: '1px solid #1a2a3a' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.08em' }}>Buttons</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderRight: '1px solid #1a2a3a' }}>
                    <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: '#25e2cc', background: 'rgba(37,226,204,0.12)', border: '1px solid #25e2cc', borderRadius: 6, padding: '11px 20px', cursor: 'pointer' }}>
                      Voir les expériences →
                    </button>
                    <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#7a9bb5', background: 'transparent', border: '1px solid #1a2a3a', borderRadius: 6, padding: '11px 20px', cursor: 'pointer' }}>
                      Comment je travaille
                    </button>
                    <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#7a9bb5', background: 'transparent', border: '1px solid #1a2a3a', borderRadius: 6, padding: '11px 20px', cursor: 'not-allowed', opacity: 0.4 }} disabled>
                      Non disponible
                    </button>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <CodeBlock>{`// Primary button
background: rgba(37,226,204,0.12)
border: 1px solid #25e2cc
color: #25e2cc

// Secondary button
background: transparent
border: 1px solid #1a2a3a
color: #7a9bb5

// Disabled
opacity: 0.4`}</CodeBlock>
                  </div>
                </div>
              </div>

              {/* Status badges */}
              <div style={{ background: '#0d1220', border: '1px solid #1a2a3a', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '8px 20px', borderBottom: '1px solid #1a2a3a' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.08em' }}>Status Badges</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderRight: '1px solid #1a2a3a' }}>
                    {[
                      { label: 'READY',       color: '#25e2cc' },
                      { label: 'IN PROGRESS', color: '#f59e0b' },
                      { label: 'BETA',        color: '#00d4ff' },
                    ].map(({ label, color }) => (
                      <span key={label} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color, border: `1px solid ${color}`, borderRadius: 3, padding: '2px 8px', letterSpacing: '0.1em' }}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <CodeBlock>{`// Badge
fontFamily: JetBrains Mono
fontSize: 10px
border: 1px solid {color}
color: {color}
padding: 2px 8px
borderRadius: 3px

// READY     → #25e2cc
// IN PROGRESS → #f59e0b
// BETA      → #00d4ff`}</CodeBlock>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div style={{ background: '#0d1220', border: '1px solid #1a2a3a', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '8px 20px', borderBottom: '1px solid #1a2a3a' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4a7a94', letterSpacing: '0.08em' }}>Experiment Card</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ padding: '32px', borderRight: '1px solid #1a2a3a' }}>
                    <div style={{ background: '#0a0e17', border: '1px solid #243545', borderRadius: 8, padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7a9bb5', letterSpacing: '0.08em' }}>EXP-XXX</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#25e2cc', border: '1px solid #25e2cc', borderRadius: 3, padding: '2px 8px', letterSpacing: '0.1em' }}>READY</span>
                      </div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#e8f4f8', margin: 0 }}>Nom du projet</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5', margin: 0, lineHeight: 1.6 }}>Description courte du projet en une ou deux lignes maximum.</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {['React', 'Claude API', 'Vercel'].map(t => (
                          <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4a7a94', background: 'rgba(26,42,58,0.6)', border: '1px solid #1a2a3a', borderRadius: 3, padding: '2px 8px' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <CodeBlock>{`// Card container
background: #0a0e17
border: 1px solid #243545
borderRadius: 8px
padding: 24px

// Hover state
border-color: #00d4ff
box-shadow: 0 0 20px
  rgba(0,212,255,0.12)

// Stack tag
background: rgba(26,42,58,0.6)
border: 1px solid #1a2a3a
color: #4a7a94`}</CodeBlock>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── Spacing ── */}
          <section style={{ marginBottom: 72 }}>
            <SectionHeader title="// SPACING" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SPACING.map(px => (
                <div key={px} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: px, height: 8, background: 'linear-gradient(90deg, #25e2cc, #00d4ff)', borderRadius: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', letterSpacing: '0.06em' }}>
                    {px}px
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div style={{ textAlign: 'center', padding: '48px 40px', background: '#0d1220', border: '1px solid #1a2a3a', borderRadius: 8 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a9bb5', marginBottom: 24, lineHeight: 1.6 }}>
              Ce design system en action → Voir les expériences
            </p>
            <Link to="/lab" className="cta-btn" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: '#25e2cc', background: 'rgba(37,226,204,0.12)', padding: '12px 28px', borderRadius: 6, border: '1px solid #25e2cc', display: 'inline-block', transition: 'background 0.2s ease' }}>
              Voir les expériences →
            </Link>
          </div>

        </main>
      </div>
    </>
  )
}
