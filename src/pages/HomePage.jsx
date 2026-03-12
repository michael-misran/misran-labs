import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const BOOT_LINES = [
  '> MISRAN LABS v1.0.0',
  '> Initializing systems...',
  '> Loading design protocols... OK',
  '> Connecting AI interface... OK',
  '> Portfolio ready.',
]

const EXPERIMENTS = [
  {
    id: 'EXP-001',
    slug: 'exp-001',
    title: 'UX Audit Engine',
    description:
      'Système automatisé d\'audit UX piloté par IA. Analyse heuristique, génération de rapports structurés, priorisation des frictions.',
    status: 'IN PROGRESS',
  },
  {
    id: 'EXP-002',
    slug: 'exp-002',
    title: 'Product Brief Machine',
    description:
      'Transformer une idée floue en brief produit actionnable en moins de 5 minutes avec l\'IA comme co-pilote.',
    status: 'READY',
  },
  {
    id: 'EXP-003',
    slug: 'exp-003',
    title: 'Session Replay',
    description:
      'Documentation narrative d\'un build en live avec Claude Code. Prompts, décisions, itérations — le making-of complet.',
    status: 'IN PROGRESS',
  },
]

// ─── Boot Sequence ────────────────────────────────────────────────────────────

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const timers = []

    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 300 + i * 520))
    })

    const PROGRESS_START = 200
    const PROGRESS_DURATION = 2600
    const STEPS = 100
    for (let i = 1; i <= STEPS; i++) {
      timers.push(
        setTimeout(
          () => setProgress(i),
          PROGRESS_START + (PROGRESS_DURATION / STEPS) * i,
        ),
      )
    }

    timers.push(setTimeout(() => setFading(true), 3100))
    timers.push(setTimeout(() => onComplete(), 3700))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ width: 480, maxWidth: '90vw' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#25e2cc',
            marginBottom: 32,
            minHeight: 130,
          }}
        >
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: i < visibleLines ? 1 : 0,
                transform: i < visibleLines ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                lineHeight: '2',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  color:
                    line.includes('OK')
                      ? '#25e2cc'
                      : line.includes('v1.0.0')
                      ? '#e8f4f8'
                      : '#7a9bb5',
                }}
              >
                {line}
              </span>
              {i === visibleLines - 1 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 14,
                    background: '#25e2cc',
                    animation: 'blink 1s step-end infinite',
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            height: 2,
            background: '#1a2a3a',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #25e2cc, #00d4ff)',
              transition: 'width 0.05s linear',
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#7a9bb5',
            textAlign: 'right',
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}

// ─── Experiment Card ──────────────────────────────────────────────────────────

function ExperimentCard({ exp }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/experience/${exp.slug}`}
      style={{
        background: '#0a0e17',
        border: `1px solid ${hovered ? '#00d4ff' : '#243545'}`,
        borderRadius: 8,
        padding: '28px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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
            color: exp.status === 'READY' ? '#25e2cc' : '#00d4ff',
            border: `1px solid ${exp.status === 'READY' ? '#25e2cc' : '#00d4ff'}`,
            borderRadius: 3,
            padding: '2px 8px',
            letterSpacing: '0.1em',
          }}
        >
          {exp.status}
        </span>
      </div>

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

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#7a9bb5',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {exp.description}
      </p>
    </Link>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [bootDone, setBootDone] = useState(false)

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        .nav-link:hover { color: #e8f4f8 !important; }
        .btn-secondary:hover {
          background: rgba(37,226,204,0.08) !important;
          border-color: #25e2cc !important;
        }
        .exp-link:hover { color: #25e2cc !important; }
        .btn-primary:hover { background: rgba(37, 226, 204, 0.22) !important; }
      `}</style>

      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}

      <div
        style={{
          opacity: bootDone ? 1 : 0,
          transition: 'opacity 0.5s ease',
          minHeight: '100vh',
          background: '#0a0e17',
          backgroundImage:
            'linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: '#e8f4f8',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Navigation ── */}
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
            }}
          >
            MISRAN LABS
          </Link>

          <div style={{ display: 'flex', gap: 36 }}>
            {[
              { label: 'Lab', to: '/lab' },
              { label: 'Process', to: '/process' },
              { label: 'DS', to: '/design-system' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="nav-link"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#7a9bb5',
                  transition: 'color 0.15s ease',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Hero ── */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: 64,
          }}
        >
          {/* Blueprint grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(26,42,58,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.15) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              pointerEvents: 'none',
            }}
          />

          {/* Radial glow center */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 600,
              background:
                'radial-gradient(circle, rgba(37,226,204,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* HUD corners */}
          {[
            { text: 'LAT: 48.8566° N', top: 80, left: 40 },
            { text: 'LON: 2.3522° E', top: 80, right: 40 },
            { text: 'SYS: NOMINAL', bottom: 40, left: 40 },
            { text: 'BUILD: 2026.03', bottom: 40, right: 40 },
          ].map(({ text, ...pos }) => (
            <span
              key={text}
              style={{
                position: 'absolute',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: 'rgba(122,155,181,0.5)',
                letterSpacing: '0.1em',
                ...pos,
              }}
            >
              {text}
            </span>
          ))}

          {/* Hero content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: 720,
              padding: '0 24px',
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 28,
                padding: '6px 14px',
                border: '1px solid rgba(37,226,204,0.3)',
                borderRadius: 4,
                background: 'rgba(37,226,204,0.05)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#25e2cc',
                  display: 'inline-block',
                  animation: 'pulseDot 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#25e2cc',
                  letterSpacing: '0.12em',
                }}
              >
                [ AVAILABLE FOR WORK ]
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 72px)',
                lineHeight: 1.1,
                color: '#e8f4f8',
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}
            >
              Product Designer
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #25e2cc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                qui code avec l'IA
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: '#7a9bb5',
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 560,
                margin: '0 auto 36px',
              }}
            >
              Je ne suis pas juste designer. Je ne suis pas juste dev.
              <br />
              Je dirige l'IA de A à Z pour livrer des produits complets.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: 14,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/lab"
                className="btn-primary"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#25e2cc',
                  background: 'rgba(37, 226, 204, 0.12)',
                  padding: '12px 24px',
                  borderRadius: 6,
                  border: '1px solid #25e2cc',
                  letterSpacing: '0.01em',
                  transition: 'background 0.2s ease',
                }}
              >
                Voir les expériences →
              </Link>
              <Link
                to="/process"
                className="btn-secondary"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#e8f4f8',
                  background: 'transparent',
                  padding: '12px 24px',
                  borderRadius: 6,
                  border: '1px solid #1a2a3a',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
              >
                Comment je travaille
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid #1a2a3a',
            borderBottom: '1px solid #1a2a3a',
            background: '#0d1220',
          }}
        >
          {[
            { num: '5', label: 'Expériences de lab' },
            { num: '3', label: 'Outils IA maîtrisés' },
            { num: '1', label: 'Stack de A à Z' },
          ].map(({ num, label }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                maxWidth: 240,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '36px 24px',
                borderLeft: i > 0 ? '1px solid #1a2a3a' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 42,
                  fontWeight: 700,
                  color: '#25e2cc',
                  lineHeight: 1,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#7a9bb5',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </section>

        {/* ── Experiments ── */}
        <section
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '80px 40px 40px',
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#25e2cc',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}
            >
              // EXPERIMENTS
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: '#1a2a3a',
              }}
            />
            <Link
              to="/lab"
              className="exp-link"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#7a9bb5',
                letterSpacing: '0.08em',
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Voir tout →
            </Link>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {EXPERIMENTS.map((exp) => (
              <ExperimentCard key={exp.id} exp={exp} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: '#0d1220',
            borderTop: '1px solid #1a2a3a',
            textAlign: 'center',
            padding: '80px 40px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#e8f4f8',
              marginBottom: 14,
              letterSpacing: '-0.02em',
            }}
          >
            Prêt à collaborer ?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#7a9bb5',
              lineHeight: 1.7,
              maxWidth: 460,
              margin: '0 auto 32px',
            }}
          >
            Disponible pour des missions design produit, des projets IA,
            ou des collaborations créatives qui sortent de l'ordinaire.
          </p>
          <Link
            to="/contact"
            className="btn-primary"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: '#25e2cc',
              background: 'rgba(37, 226, 204, 0.12)',
              padding: '13px 28px',
              borderRadius: 6,
              border: '1px solid #25e2cc',
              display: 'inline-block',
              transition: 'background 0.2s ease',
            }}
          >
            Me contacter →
          </Link>
        </section>
      </div>
    </>
  )
}
