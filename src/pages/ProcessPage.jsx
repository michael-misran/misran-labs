import { Link, useLocation } from 'react-router-dom'

const STEPS = [
  {
    num: '01',
    title: 'BRIEF & CADRAGE',
    description: 'Avant de toucher à l\'IA, je définis le problème en langage naturel : quel est l\'objectif, quelles sont les contraintes, quel est le résultat attendu. Cette étape est 100% humaine. Un mauvais brief = un mauvais output, peu importe l\'outil.',
    tools: ['claude.ai', 'Markdown'],
    example: '→ Ex: "EXP-001 doit permettre d\'uploader un screenshot et recevoir un audit structuré en streaming. Pas d\'appel API réel — simulation. Output coloré : ## teal, frictions rouge, recommandations cyan."',
  },
  {
    num: '02',
    title: 'PROMPT STRUCTURÉ',
    description: 'Je traduis le brief en prompt chirurgical pour Claude Code. Chaque prompt précise : le fichier cible, les états React, la logique, le layout, ce qu\'il ne faut PAS toucher. Plus le prompt est précis, moins il y a d\'itérations.',
    tools: ['Claude Code', 'Claude claude.ai'],
    example: '→ Pattern: "Crée [fichier]. États : [liste]. Logique : [description]. Layout : [colonnes]. Ne modifie pas [liste]."',
  },
  {
    num: '03',
    title: 'GÉNÉRATION & CRITIQUE',
    description: 'Claude Code génère. Je review visuellement dès le déploiement Vercel (~30s). Je note les écarts entre le brief et le résultat. Je génère un prompt de correction ciblé — jamais de réécriture complète si possible.',
    tools: ['Claude Code', 'Vercel', 'Browser'],
    example: '→ Ex: "Les chips sont en colonne et ressemblent à des inputs. Corriger : flex-wrap wrap, couleur teal, border rgba teal. Ne rien toucher d\'autre."',
  },
  {
    num: '04',
    title: 'DÉPLOIEMENT CONTINU',
    description: 'Chaque push GitHub déclenche un déploiement automatique sur Vercel. En production en moins de 30 secondes. Pas de pipeline à configurer, pas de serveur à maintenir.',
    tools: ['GitHub', 'Vercel'],
    example: '→ git add -A && git commit -m "fix: chips style" && git push → live en 30s',
  },
  {
    num: '05',
    title: 'DOCUMENTATION SESSION',
    description: 'Après chaque session de build, je génère un doc HTML qui archive les décisions prises, les prompts utilisés, les bugs rencontrés et les solutions. 14 sessions documentées accessibles depuis EXP-003.',
    tools: ['claude.ai', 'HTML', 'EXP-003'],
    example: '→ Chaque log contient : // WHAT (ce qui a été fait), // DECISION ⚡ (pourquoi), // PROMPT (le prompt exact)',
  },
]

const TOOLS = [
  { name: 'Claude claude.ai', desc: 'Conversations & stratégie' },
  { name: 'Claude Code', desc: 'Génération de code terminal' },
  { name: 'Design System', desc: 'CSS tokens + composants React' },
  { name: 'Claude API', desc: 'Projets avec IA intégrée' },
  { name: 'GitHub', desc: 'Versioning & collaboration' },
  { name: 'Vercel', desc: 'Déploiement continu' },
]

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
          { label: 'DS', to: '/design-system' },
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

// ─── Tool Badge ───────────────────────────────────────────────────────────────

function ToolBadge({ label }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: '#25e2cc',
        border: '1px solid rgba(37,226,204,0.35)',
        background: 'rgba(37,226,204,0.07)',
        borderRadius: 3,
        padding: '3px 10px',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

// ─── Process Page ─────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        .tool-card:hover {
          border-color: #243545 !important;
          background: rgba(26,42,58,0.4) !important;
        }
        .cta-btn:hover { background: rgba(37,226,204,0.22) !important; }
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

        <main style={{ maxWidth: 1080, margin: '0 auto', padding: '112px 40px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 56 }}>
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
                // PROCESS
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
                HUMAN × AI WORKFLOW
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#7a9bb5',
                lineHeight: 1.7,
                maxWidth: 580,
              }}
            >
              Comment je dirige l'IA pour livrer des produits complets
            </p>
          </div>

          {/* ── Intro 2 colonnes ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 40,
              marginBottom: 72,
              padding: '36px 40px',
              background: '#0d1220',
              border: '1px solid #1a2a3a',
              borderRadius: 8,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#c4d8e8',
                lineHeight: 1.8,
              }}
            >
              Je ne code pas — j'orchestre. Chaque décision de design, d'architecture et de priorité reste la mienne. Claude Code exécute. Je dirige avec des prompts précis, je critique avec un œil de designer, j'itère avec la rigueur d'un PM.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { num: '~10x', label: 'Vitesse d\'exécution' },
                { num: '100%', label: 'Décisions humaines' },
                { num: 'A→Z', label: 'Stack maîtrisée' },
              ].map(({ num, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#25e2cc',
                      lineHeight: 1,
                      minWidth: 72,
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: '#7a9bb5',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div style={{ marginBottom: 80 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 48,
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
                // WORKFLOW
              </span>
              <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
            </div>

            <div style={{ position: 'relative', paddingLeft: 56 }}>
              <div
                style={{
                  position: 'absolute',
                  left: 19,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: 'linear-gradient(to bottom, #25e2cc, rgba(37,226,204,0.1))',
                }}
              />

              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    position: 'relative',
                    marginBottom: i < STEPS.length - 1 ? 48 : 0,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: -56,
                      top: 0,
                      width: 38,
                      height: 38,
                      border: '1px solid #25e2cc',
                      background: '#0a0e17',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#25e2cc',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {step.num}
                  </div>

                  <div style={{ paddingTop: 6 }}>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#e8f4f8',
                        letterSpacing: '0.04em',
                        marginBottom: 10,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#7a9bb5',
                        lineHeight: 1.7,
                        marginBottom: 14,
                        maxWidth: 600,
                      }}
                    >
                      {step.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {step.tools.map((t) => (
                        <ToolBadge key={t} label={t} />
                      ))}
                    </div>
                    {step.example && (
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: '#4a7a94',
                        lineHeight: 1.7,
                        marginTop: 12,
                        paddingLeft: 12,
                        borderLeft: '2px solid rgba(37,226,204,0.2)',
                      }}>
                        {step.example}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stack IA ── */}
          <div style={{ marginBottom: 72 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 36,
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
                // STACK IA
              </span>
              <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="tool-card"
                  style={{
                    background: '#0d1220',
                    border: '1px solid #1a2a3a',
                    borderRadius: 8,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#e8f4f8',
                    }}
                  >
                    {tool.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: '#7a9bb5',
                    }}
                  >
                    {tool.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              textAlign: 'center',
              padding: '48px 40px',
              background: '#0d1220',
              border: '1px solid #1a2a3a',
              borderRadius: 8,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#7a9bb5',
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Ce process appliqué à des cas concrets, de A à Z.
            </p>
            <Link
              to="/lab"
              className="cta-btn"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: '#25e2cc',
                background: 'rgba(37,226,204,0.12)',
                padding: '12px 28px',
                borderRadius: 6,
                border: '1px solid #25e2cc',
                display: 'inline-block',
                transition: 'background 0.2s ease',
              }}
            >
              Voir les expériences concrètes →
            </Link>
          </div>

        </main>
      </div>
    </>
  )
}
