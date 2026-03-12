import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHIPS = [
  'Une app pour tracker ses lectures',
  'Un outil de feedback UX pour designers',
  'Un SaaS de facturation pour freelances',
]

const BRIEFS_DATA = {
  'Une app pour tracker ses lectures': `## PROBLÈME
Les lecteurs perdent le fil de leurs lectures, oublient les livres commencés et n'ont pas de vue globale de leur bibliothèque personnelle.

## UTILISATEUR CIBLE
Lecteur actif 25-45 ans, lit 2-5 livres simultanément, utilise Goodreads mais trouve l'UX trop complexe.

## PROPOSITION DE VALEUR
L'app de suivi de lecture la plus simple du marché — ajouter un livre en 10 secondes, voir sa progression en un coup d'œil.

## USER STORIES
- En tant que lecteur, je veux ajouter un livre par scan ISBN pour ne pas saisir les infos manuellement.
- En tant que lecteur, je veux noter ma page actuelle pour reprendre exactement où j'en étais.
- En tant que lecteur, je veux voir mes stats annuelles pour mesurer mes progrès.

## MÉTRIQUES DE SUCCÈS
- 500 utilisateurs actifs à M+3
- Rétention J7 > 40%
- Temps d'ajout d'un livre < 15 secondes

## STACK RECOMMANDÉE
React Native · Supabase · Open Library API · Expo`,

  'Un outil de feedback UX pour designers': `## PROBLÈME
Collecter du feedback UX est chronophage : les outils existants sont trop complexes ou trop génériques pour les besoins spécifiques des designers produit.

## UTILISATEUR CIBLE
Product Designer en agence ou startup, 2-8 ans d'expérience, doit livrer des insights clients rapidement à son PM.

## PROPOSITION DE VALEUR
Transforme un lien Figma en session de feedback structurée en 2 minutes. Le recruteur clique, annote, et les insights arrivent directement dans votre Notion.

## USER STORIES
- En tant que designer, je veux partager un lien unique pour collecter du feedback sans compte requis.
- En tant que designer, je veux des annotations directement sur le design pour contextualiser chaque retour.
- En tant que PM, je veux exporter les insights en PDF pour les inclure dans mon rapport de sprint.

## MÉTRIQUES DE SUCCÈS
- NPS > 50 dès la beta
- Temps de setup d'une session < 2 minutes
- 3 feedbacks collectés par session en moyenne

## STACK RECOMMANDÉE
React · Figma API · Notion API · Vercel · Supabase`,

  'Un SaaS de facturation pour freelances': `## PROBLÈME
Les freelances perdent en moyenne 3h/mois sur leur facturation. Les outils existants sont soit trop chers, soit trop complexes pour des indépendants solo.

## UTILISATEUR CIBLE
Freelance tech ou créatif, CA 30-80K€/an, facture 5-15 clients récurrents, souvent bloqué sur la conformité légale française (mentions obligatoires, TVA).

## PROPOSITION DE VALEUR
Génère une facture conforme en 60 secondes. Relances automatiques, suivi des paiements, export comptable — tout ce dont un freelance a besoin, rien de plus.

## USER STORIES
- En tant que freelance, je veux créer une facture depuis un template pour ne pas repartir de zéro à chaque fois.
- En tant que freelance, je veux recevoir une alerte quand une facture est en retard pour relancer sans stress.
- En tant que comptable, je veux exporter toutes les factures en CSV pour simplifier la déclaration.

## MÉTRIQUES DE SUCCÈS
- Temps de création d'une facture < 60 secondes
- Taux de recouvrement > 95% à 30 jours
- Churn mensuel < 3%

## STACK RECOMMANDÉE
Next.js · Stripe · PostgreSQL · Resend · Vercel`,

  __fallback__: `## PROBLÈME
[Problème identifié à partir de votre description]
Les utilisateurs manquent d'un outil adapté à ce besoin spécifique. Les solutions existantes sont trop génériques.

## UTILISATEUR CIBLE
Early adopter tech-savvy, 25-40 ans, cherche une solution simple à un problème récurrent dans son quotidien.

## PROPOSITION DE VALEUR
La solution la plus directe au problème décrit — zéro friction, résultat immédiat.

## USER STORIES
- En tant qu'utilisateur, je veux résoudre ce problème rapidement sans courbe d'apprentissage.
- En tant qu'utilisateur, je veux voir des résultats concrets dès la première utilisation.
- En tant qu'utilisateur, je veux pouvoir recommander l'outil à mes collègues facilement.

## MÉTRIQUES DE SUCCÈS
- 100 utilisateurs beta en 30 jours
- Satisfaction > 4/5 après première utilisation
- Temps d'activation < 5 minutes

## STACK RECOMMANDÉE
React · Node.js · PostgreSQL · Vercel`,
}

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

// ─── Brief Output ─────────────────────────────────────────────────────────────

function BriefOutput({ text, status, onCopy, copied }) {
  const lines = text.split('\n')

  return (
    <div
      style={{
        background: '#060a10',
        border: '1px solid #1a2a3a',
        borderRadius: 8,
        padding: '24px 28px',
        minHeight: 480,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: '1px solid #1a2a3a',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#25e2cc',
            letterSpacing: '0.1em',
          }}
        >
          // OUTPUT
        </span>
        {status === 'done' && (
          <button
            onClick={onCopy}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              color: copied ? '#25e2cc' : '#7a9bb5',
              background: copied ? 'rgba(37,226,204,0.1)' : 'transparent',
              border: `1px solid ${copied ? '#25e2cc' : '#243545'}`,
              borderRadius: 3,
              padding: '4px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copied ? 'COPIÉ ✓' : 'COPIER'}
          </button>
        )}
      </div>

      {/* Content */}
      {status === 'idle' ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: '#4a7a94',
            letterSpacing: '0.04em',
          }}
        >
          Le brief apparaîtra ici...
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          {lines.map((line, i) => {
            const isHeading = line.startsWith('##')
            const isCursor = i === lines.length - 1 && status === 'generating'

            return (
              <div
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  lineHeight: isHeading ? '1' : '1.75',
                  marginTop: isHeading && i > 0 ? 20 : 0,
                  marginBottom: isHeading ? 10 : 0,
                  color: isHeading ? '#25e2cc' : '#c4d8e8',
                  letterSpacing: isHeading ? '0.06em' : '0.01em',
                  fontWeight: isHeading ? 600 : 400,
                }}
              >
                {line || '\u00a0'}
                {isCursor && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      background: '#25e2cc',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Product Brief Machine ────────────────────────────────────────────────────

export default function ProductBriefMachine() {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | generating | done
  const [displayed, setDisplayed] = useState('')
  const [copied, setCopied] = useState(false)
  const intervalRef = useRef(null)

  function getBrief(value) {
    return BRIEFS_DATA[value.trim()] ?? BRIEFS_DATA.__fallback__
  }

  function handleGenerate() {
    if (!input.trim() || status === 'generating') return

    const brief = getBrief(input)
    setDisplayed('')
    setStatus('generating')
    setCopied(false)

    let i = 0
    intervalRef.current = setInterval(() => {
      i += 3
      if (i >= brief.length) {
        setDisplayed(brief)
        setStatus('done')
        clearInterval(intervalRef.current)
      } else {
        setDisplayed(brief.slice(0, i))
      }
    }, 18)
  }

  function handleCopy() {
    navigator.clipboard.writeText(displayed).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleChip(chip) {
    setInput(chip)
    setStatus('idle')
    setDisplayed('')
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .chip:hover { border-color: #25e2cc !important; color: #25e2cc !important; }
        .generate-btn:hover { background: rgba(37,226,204,0.22) !important; }
        textarea::placeholder { color: #4a7a94; }
        textarea:focus { outline: none; border-color: #243545 !important; }
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

        <main style={{ maxWidth: 1080, margin: '0 auto', padding: '96px 40px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 48 }}>
            <Link
              to="/lab"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#7a9bb5',
                letterSpacing: '0.06em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 24,
                transition: 'color 0.15s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8f4f8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7a9bb5')}
            >
              ← Lab
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#7a9bb5',
                  border: '1px solid #243545',
                  borderRadius: 3,
                  padding: '2px 8px',
                  letterSpacing: '0.08em',
                }}
              >
                EXP-002
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#25e2cc',
                  border: '1px solid #25e2cc',
                  borderRadius: 3,
                  padding: '2px 8px',
                  letterSpacing: '0.1em',
                }}
              >
                READY
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: '#e8f4f8',
                letterSpacing: '-0.02em',
                marginBottom: 10,
              }}
            >
              Product Brief Machine
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#7a9bb5',
                marginBottom: 16,
              }}
            >
              Une phrase → brief produit complet en 30 secondes
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Claude API', 'React', 'Streaming'].map((tag) => (
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
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── 2 columns ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {/* ── Left: Input ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#25e2cc',
                  letterSpacing: '0.1em',
                }}
              >
                // INPUT
              </span>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Décris ton produit en une phrase..."
                rows={4}
                style={{
                  background: '#060a10',
                  border: '1px solid #1a2a3a',
                  borderRadius: 8,
                  padding: '16px 18px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: '#e8f4f8',
                  lineHeight: 1.7,
                  resize: 'vertical',
                  width: '100%',
                  transition: 'border-color 0.15s ease',
                }}
              />

              {/* Chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    className="chip"
                    onClick={() => handleChip(chip)}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: input === chip ? '#25e2cc' : '#7a9bb5',
                      background: 'transparent',
                      border: `1px solid ${input === chip ? '#25e2cc' : '#243545'}`,
                      borderRadius: 6,
                      padding: '8px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Generate button */}
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!input.trim() || status === 'generating'}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: !input.trim() ? '#4a7a94' : '#25e2cc',
                  background: !input.trim() ? 'rgba(26,42,58,0.3)' : 'rgba(37,226,204,0.12)',
                  border: `1px solid ${!input.trim() ? '#243545' : '#25e2cc'}`,
                  borderRadius: 6,
                  padding: '13px 24px',
                  cursor: !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
              >
                {status === 'generating' ? 'GÉNÉRATION EN COURS...' : 'GÉNÉRER LE BRIEF →'}
              </button>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#4a7a94',
                  letterSpacing: '0.04em',
                }}
              >
                // Simulation — voir le vrai appel API sur GitHub
              </span>
            </div>

            {/* ── Right: Output ── */}
            <BriefOutput
              text={displayed}
              status={status}
              onCopy={handleCopy}
              copied={copied}
            />
          </div>

        </main>
      </div>
    </>
  )
}
