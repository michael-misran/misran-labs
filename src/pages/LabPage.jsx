import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EXPERIMENTS = [
  {
    id: 'EXP-001',
    slug: 'exp-001',
    title: 'UX Audit Engine',
    description:
      'Upload screenshot → audit UX structuré avec annotations et recommandations.',
    status: 'IN PROGRESS',
    stack: ['Claude API', 'Vision', 'React', 'PDF Export'],
  },
  {
    id: 'EXP-002',
    slug: 'exp-002',
    title: 'Product Brief Machine',
    description:
      'Une phrase → brief produit complet : persona, user stories, KPIs en 30 secondes.',
    status: 'READY',
    stack: ['Claude API', 'React', 'Streaming'],
  },
  {
    id: 'EXP-003',
    slug: 'exp-003',
    title: 'Session Replay',
    description:
      "Documentation narrative d'un build en live avec Claude Code. Le making-of complet.",
    status: 'IN PROGRESS',
    stack: ['React', 'Framer Motion', 'Markdown'],
  },
  {
    id: 'EXP-004',
    slug: 'exp-004',
    title: 'Design Token Extractor',
    description:
      'Screenshot → tokens.json prêt pour Figma. Plus jamais de copy-paste manuel.',
    status: 'IN PROGRESS',
    stack: ['Claude API', 'Vision', 'Node.js', 'Figma API'],
  },
  {
    id: 'EXP-005',
    slug: 'exp-005',
    title: 'Micro-SaaS Generator',
    description:
      'Une phrase → landing page générée en live avec streaming temps réel.',
    status: 'IN PROGRESS',
    stack: ['Claude API', 'Streaming', 'React', 'Tailwind'],
  },
]

const FILTERS = ['ALL', 'READY', 'IN PROGRESS']

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const { pathname } = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
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

// ─── Experiment Card ──────────────────────────────────────────────────────────

function ExperimentCard({ exp }) {
  const [hovered, setHovered] = useState(false)
  const isReady = exp.status === 'READY'

  return (
    <div
      style={{
        background: '#0a0e17',
        border: `1px solid ${hovered ? (isReady ? '#25e2cc' : '#00d4ff') : '#243545'}`,
        borderRadius: 8,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered
          ? `0 0 20px ${isReady ? 'rgba(37,226,204,0.12)' : 'rgba(0,212,255,0.12)'}`
          : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: ID + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#7a9bb5',
            letterSpacing: '0.08em',
          }}
        >
          {exp.id}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: isReady ? '#25e2cc' : '#f59e0b',
            border: `1px solid ${isReady ? '#25e2cc' : '#f59e0b'}`,
            borderRadius: 3,
            padding: '2px 8px',
            letterSpacing: '0.1em',
          }}
        >
          {exp.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: '#e8f4f8',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {exp.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#7a9bb5',
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {exp.description}
      </p>

      {/* Stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {exp.stack.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#4a7a94',
              background: 'rgba(26,42,58,0.6)',
              border: '1px solid #1a2a3a',
              borderRadius: 3,
              padding: '2px 8px',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        to={`/experience/${exp.slug}`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: '#25e2cc',
          textDecoration: 'none',
          letterSpacing: '0.06em',
          transition: 'color 0.15s ease',
          marginTop: 2,
        }}
      >
        Voir l'expérience →
      </Link>
    </div>
  )
}

// ─── Lab Page ─────────────────────────────────────────────────────────────────

export default function LabPage() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered =
    activeFilter === 'ALL'
      ? EXPERIMENTS
      : EXPERIMENTS.filter((e) => e.status === activeFilter)

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
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

        <main
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '112px 40px 80px',
          }}
        >
          {/* ── Page Header ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 12,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  color: '#25e2cc',
                  letterSpacing: '0.04em',
                  marginBottom: 10,
                }}
              >
                // LAB
              </h1>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#7a9bb5',
                  lineHeight: 1.6,
                }}
              >
                Expériences documentées de A à Z — brief, design, code, résultat
              </p>
            </div>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#25e2cc',
                border: '1px solid rgba(37,226,204,0.3)',
                background: 'rgba(37,226,204,0.06)',
                borderRadius: 4,
                padding: '6px 14px',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
                alignSelf: 'center',
              }}
            >
              5 EXPERIMENTS
            </span>
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: '#1a2a3a', marginBottom: 36 }} />

          {/* ── Filters ── */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    padding: '7px 18px',
                    borderRadius: 20,
                    border: `1px solid ${active ? '#25e2cc' : '#243545'}`,
                    background: active ? 'rgba(37,226,204,0.15)' : 'transparent',
                    color: active ? '#25e2cc' : '#7a9bb5',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: active ? '0 0 12px rgba(37,226,204,0.3)' : 'none',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* ── Grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            {filtered.map((exp) => (
              <ExperimentCard key={exp.id} exp={exp} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 0',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#4a7a94',
                letterSpacing: '0.06em',
              }}
            >
              // NO EXPERIMENTS MATCH THIS FILTER
            </div>
          )}
        </main>
      </div>
    </>
  )
}
