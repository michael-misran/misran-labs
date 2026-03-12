import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TERMINAL_LINES = [
  '> Misran Labs Contact Terminal v1.0',
  '> Initializing secure connection...',
  '> Connection established.',
  '',
  '> Bonjour. Je suis disponible pour :',
  '> — Missions product design',
  '> — Projets IA & automatisation',
  '> — Collaborations techniques',
  '',
  '> Pour me contacter directement :',
]

const CONTACT_INFO = [
  { label: 'EMAIL', value: 'contact@michaelmisran.com', href: 'mailto:contact@michaelmisran.com' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/michaelmisran', href: 'https://linkedin.com/in/michaelmisran' },
  { label: 'GITHUB', value: 'github.com/michael-misran', href: 'https://github.com/michael-misran' },
]

const QUICK_LINKS = [
  { icon: '[ GH ]', label: 'GitHub', url: 'github.com/michael-misran', href: 'https://github.com/michael-misran' },
  { icon: '[ LI ]', label: 'LinkedIn', url: 'linkedin.com/in/michaelmisran', href: 'https://linkedin.com/in/michaelmisran' },
  { icon: '[ @ ]', label: 'Email', url: 'contact@michaelmisran.com', href: 'mailto:contact@michaelmisran.com' },
]

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const { pathname } = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
        background: 'rgba(10,14,23,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,42,58,0.8)',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#25e2cc',
          letterSpacing: '0.06em',
          textDecoration: 'none',
        }}
      >
        MISRAN LABS
      </Link>

      <div style={{ display: 'flex', gap: 36 }}>
        {[
          { label: 'Lab', to: '/lab' },
          { label: 'Process', to: '/process' },
          { label: 'Contact', to: '/contact' },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: pathname === to ? '#e8f4f8' : '#7a9bb5',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
              borderBottom: pathname === to ? '1px solid #25e2cc' : '1px solid transparent',
              paddingBottom: 2,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

// ─── Terminal Window ──────────────────────────────────────────────────────────

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showContact, setShowContact] = useState(false)
  const [input, setInput] = useState('')
  const [sent, setSent] = useState(false)
  const ran = useRef(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const timers = []
    TERMINAL_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 300 + i * 180))
    })
    timers.push(setTimeout(() => setShowContact(true), 300 + TERMINAL_LINES.length * 180 + 200))

    return () => timers.forEach(clearTimeout)
  }, [])

  function handleSend() {
    if (!input.trim() || sent) return
    setSent(true)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div
      style={{
        background: '#060a10',
        border: '1px solid #1a2a3a',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: '#0d1220',
          borderBottom: '1px solid #1a2a3a',
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span
          style={{
            marginLeft: 12,
            fontSize: 12,
            color: '#4a7a94',
            letterSpacing: '0.04em',
          }}
        >
          misran-labs — bash
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '24px 28px', minHeight: 320 }}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: i < visibleLines ? 1 : 0,
              transition: 'opacity 0.15s ease',
              fontSize: 13,
              lineHeight: '1.9',
              color: line === '' ? 'transparent' : line.startsWith('>') ? '#c4d8e8' : '#7a9bb5',
              userSelect: 'none',
            }}
          >
            {line === '' ? '\u00a0' : line}
          </div>
        ))}

        {/* Contact info */}
        {showContact && (
          <div style={{ marginTop: 8 }}>
            {CONTACT_INFO.map(({ label, value, href }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  gap: 24,
                  fontSize: 13,
                  lineHeight: '2',
                }}
              >
                <span style={{ color: '#25e2cc', minWidth: 80, letterSpacing: '0.06em' }}>
                  {label}
                </span>
                <a
                  href={href}
                  style={{
                    color: '#7a9bb5',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => (e.target.style.color = '#e8f4f8')}
                  onMouseLeave={e => (e.target.style.color = '#7a9bb5')}
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Sent confirmation */}
        {sent && (
          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              color: '#25e2cc',
              lineHeight: '1.9',
            }}
          >
            &gt; Message reçu. Je reviens vers toi rapidement.
          </div>
        )}

        {/* Input row */}
        {!sent && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              marginTop: 20,
              borderTop: '1px solid #1a2a3a',
              paddingTop: 16,
            }}
          >
            <span style={{ fontSize: 13, color: '#25e2cc', marginRight: 8 }}>&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tape ton message..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#e8f4f8',
                caretColor: '#25e2cc',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                color: '#25e2cc',
                background: 'rgba(37,226,204,0.12)',
                border: '1px solid #25e2cc',
                borderRadius: 4,
                padding: '5px 16px',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                marginLeft: 12,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,226,204,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,226,204,0.12)')}
            >
              SEND
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .quick-card:hover {
          border-color: #243545 !important;
          background: rgba(26,42,58,0.3) !important;
        }
        ::placeholder { color: #4a7a94; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: '#0a0e17',
          backgroundImage:
            'linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: '#e8f4f8',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Nav />

        <main style={{ maxWidth: 780, margin: '0 auto', padding: '112px 40px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
              <h1
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  color: '#25e2cc',
                  letterSpacing: '0.04em',
                }}
              >
                // CONTACT
              </h1>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#25e2cc',
                  border: '1px solid rgba(37,226,204,0.3)',
                  background: 'rgba(37,226,204,0.06)',
                  borderRadius: 4,
                  padding: '5px 12px',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
              >
                TERMINAL READY
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#7a9bb5',
                lineHeight: 1.7,
              }}
            >
              Ouvrir une session de collaboration
            </p>
          </div>

          {/* ── Terminal ── */}
          <div style={{ marginBottom: 40 }}>
            <Terminal />
          </div>

          {/* ── Disponibilité ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 28px',
              background: '#0d1220',
              border: '1px solid #1a2a3a',
              borderRadius: 8,
              marginBottom: 40,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#25e2cc',
                  display: 'inline-block',
                  animation: 'pulseDot 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#25e2cc',
                  letterSpacing: '0.1em',
                }}
              >
                AVAILABLE FOR WORK
              </span>
            </div>
            <span style={{ color: '#1a2a3a', fontSize: 14 }}>|</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#7a9bb5',
              }}
            >
              Ouvert aux missions freelance et opportunités full-time à partir d'avril 2026
            </span>
          </div>

          {/* ── Liens rapides ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {QUICK_LINKS.map(({ icon, label, url, href }) => (
              <a
                key={label}
                href={href}
                className="quick-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: '20px 24px',
                  background: '#0d1220',
                  border: '1px solid #1a2a3a',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                    color: '#25e2cc',
                    letterSpacing: '0.06em',
                  }}
                >
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#e8f4f8',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#4a7a94',
                    letterSpacing: '0.04em',
                  }}
                >
                  {url}
                </span>
              </a>
            ))}
          </div>

        </main>
      </div>
    </>
  )
}
