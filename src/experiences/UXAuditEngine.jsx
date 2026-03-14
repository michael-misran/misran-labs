import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const AUDITS_DATA = {
  'audit-airbnb.png': `## SCORE GLOBAL
UX Score : 7.2 / 10  ███████░░░

## HIÉRARCHIE VISUELLE                         [ATTENTION]
Le prix total n'apparaît qu'en bas de page après 3 sections de contenu.
L'œil du visiteur est attiré par les photos avant le CTA de réservation.
La décomposition des frais (ménage, service) arrive trop tardivement dans le flow.

## POINTS DE FRICTION                          [4 détectés]
→ F1 · Frais cachés révélés uniquement à l'étape de paiement — rupture de confiance
→ F2 · Calendrier de disponibilité non immédiatement visible sans scroll
→ F3 · Le bouton "Réserver" est répété 2x sans différenciation claire d'intention
→ F4 · Les avis sont tronqués — l'utilisateur doit cliquer pour voir les critiques

## ACCESSIBILITÉ                               [PARTIEL]
Contraste du texte secondaire insuffisant sur fond photo (#767676 sur blanc cassé).
Absence de labels ARIA sur les boutons d'incrémentation (nombre de voyageurs).

## CHARGE COGNITIVE                            [ÉLEVÉE]
23 éléments interactifs visibles simultanément.
Recommandation : progressive disclosure sur la section "Ce que vous devez savoir".

## RECOMMANDATIONS PRIORITAIRES
P1 · Afficher le prix total TTC dès la première vue, sans scroll obligatoire
P2 · Réduire la section hôte à un composant compact — elle noie le CTA principal
P3 · Grouper les frais dans un tooltip au survol du prix pour plus de transparence

## VERDICT
Interface mature avec des patterns établis, mais la dissimulation progressive des coûts
crée une friction mesurable au moment de la conversion. Score pénalisé principalement
sur la transparence tarifaire et la densité de l'interface mobile.`,

  'audit-analytics.png': `## SCORE GLOBAL
UX Score : 5.4 / 10  █████░░░░░

## HIÉRARCHIE VISUELLE                         [CRITIQUE]
Aucune hiérarchie claire entre les métriques primaires et secondaires.
Tous les chiffres ont le même poids visuel — l'utilisateur ne sait pas où regarder en premier.
Le taux de rebond et les sessions actives sont visuellement équivalents malgré leur importance différente.

## POINTS DE FRICTION                          [6 détectés]
→ F1 · Sélecteur de plage temporelle enfoui en haut à droite — élément pourtant critique
→ F2 · Graphiques sans valeurs de référence (vs période précédente non visible par défaut)
→ F3 · Terminologie technique non expliquée : "Engaged sessions", "Engagement rate"
→ F4 · Navigation latérale de 47 items sans regroupement logique clair
→ F5 · Pas d'état vide géré — dashboard vide = page blanche anxiogène
→ F6 · Exports et rapports nécessitent 4+ clics pour y accéder

## ACCESSIBILITÉ                               [INSUFFISANT]
Les graphiques reposent uniquement sur la couleur pour différencier les segments.
Aucune alternative textuelle sur les visualisations de données.
Taille de police des légendes : 10px — en dessous du seuil de lisibilité recommandé.

## CHARGE COGNITIVE                            [CRITIQUE]
Surcharge informationnelle sévère : 14 métriques visibles en premier écran.
L'absence de vue "résumé exécutif" force chaque utilisateur à construire sa propre lecture.

## RECOMMANDATIONS PRIORITAIRES
P1 · Créer une vue "highlights" avec 3-5 KPIs clés en tête de dashboard
P2 · Introduire un système de comparaison automatique vs période précédente
P3 · Réduire la navigation à 8-10 items avec regroupement par cas d'usage

## VERDICT
Dashboard puissant techniquement mais qui échoue sur l'essentiel : permettre
une lecture rapide de la santé du produit. L'interface a été pensée pour les
data analysts, pas pour les product managers qui en sont les utilisateurs primaires.`,

  'audit-linkedin.png': `## SCORE GLOBAL
UX Score : 6.1 / 10  ██████░░░░

## HIÉRARCHIE VISUELLE                         [CORRECT]
La progression par étapes est bien communiquée visuellement.
Cependant, la barre de progression sous-estime volontairement les étapes restantes
pour maximiser l'engagement — pattern dark au détriment de la confiance.

## POINTS DE FRICTION                          [5 détectés]
→ F1 · 11 étapes d'onboarding pour atteindre la valeur — benchmark secteur : 4-5
→ F2 · Import de CV transforme les données sans preview avant validation
→ F3 · Suggestions de connexions apparaissent avant que le profil soit complet
→ F4 · Champ "Résumé" sans exemple ni guideline — taux d'abandon élevé à cette étape
→ F5 · Impossible de passer des étapes sans comprendre qu'elles sont optionnelles

## ACCESSIBILITÉ                               [PARTIEL]
Bonne gestion du focus keyboard sur les champs principaux.
Manque : les messages d'erreur de validation ne sont pas annoncés aux lecteurs d'écran.

## CHARGE COGNITIVE                            [ÉLEVÉE]
Chaque écran pose 2-3 questions mais l'objectif global n'est jamais rappelé.
L'utilisateur perd le fil de sa progression après l'étape 5.

## DARK PATTERNS IDENTIFIÉS                    [ATTENTION]
→ Barre de progression trompeuse (affiche 60% à l'étape 3 sur 11)
→ Case "Activer les alertes emploi" pré-cochée par défaut
→ "Ajouter des connexions" présentée comme obligatoire alors qu'optionnelle

## RECOMMANDATIONS PRIORITAIRES
P1 · Réduire l'onboarding à 5 étapes max — différer les informations secondaires
P2 · Ajouter un aperçu du profil final pour motiver la complétion
P3 · Supprimer les dark patterns — ils détériorent la confiance à long terme

## VERDICT
Onboarding fonctionnel mais trop long, avec des dark patterns qui trahissent
un objectif de croissance court-terme au détriment de l'expérience utilisateur.
Un cas d'école sur les compromis entre métriques d'activation et éthique design.`,

  __fallback__: `## SCORE GLOBAL
UX Score : 6.5 / 10  ██████░░░░

## HIÉRARCHIE VISUELLE                         [ATTENTION]
La structure visuelle principale est fonctionnelle mais manque de signaux d'emphase clairs.
Les éléments d'action primaires et secondaires ont un poids visuel trop similaire.
Le regard de l'utilisateur ne suit pas de chemin naturel vers la conversion.

## POINTS DE FRICTION                          [3 détectés]
→ F1 · Absence d'état de chargement sur les actions principales — feedback insuffisant
→ F2 · Libellés des CTA génériques ("Envoyer", "Valider") sans contexte d'action
→ F3 · Densité de l'interface trop élevée sur mobile — zone de tap insuffisante

## ACCESSIBILITÉ                               [PARTIEL]
Contraste insuffisant sur les éléments secondaires.
Navigation clavier non optimisée sur les composants interactifs complexes.

## CHARGE COGNITIVE                            [MODÉRÉE]
Interface correcte mais perfectible sur la progressive disclosure.
Plusieurs informations pourraient être révélées à la demande plutôt qu'affichées par défaut.

## RECOMMANDATIONS PRIORITAIRES
P1 · Renforcer la hiérarchie visuelle du CTA principal — taille, couleur, position
P2 · Ajouter des microfeedbacks sur toutes les actions (loading, success, error)
P3 · Revoir les libellés des boutons avec une formulation orientée bénéfice

## VERDICT
Interface solide avec des bases correctes, mais qui n'exploite pas pleinement
les principes de conception centrée utilisateur. Des ajustements ciblés sur
la hiérarchie et le feedback permettraient un gain significatif sur la conversion.`,
}

const SCAN_MESSAGES = [
  '> Detecting UI components...',
  '> Mapping visual hierarchy...',
  '> Identifying friction points...',
  '> Running accessibility checks...',
  '> Generating audit report...',
]

const EXAMPLE_FILES = ['audit-airbnb.png', 'audit-analytics.png', 'audit-linkedin.png']

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

// ─── Line rendering helpers ───────────────────────────────────────────────────

const BADGE_COLORS = {
  'CRITIQUE':    { color: '#ff4444', bg: 'rgba(255,68,68,0.12)' },
  'ATTENTION':   { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'CORRECT':     { color: '#25e2cc', bg: 'rgba(37,226,204,0.12)' },
  'PARTIEL':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'INSUFFISANT': { color: '#ff4444', bg: 'rgba(255,68,68,0.12)' },
  'ÉLEVÉE':      { color: '#ff4444', bg: 'rgba(255,68,68,0.12)' },
  'MODÉRÉE':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
}

function renderLineContent(text) {
  const parts = text.split(/(\[[^\]]+\])/g)

  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const inner = part.slice(1, -1)
      const badgeStyle = BADGE_COLORS[inner] ?? (/^\d/.test(inner) ? { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' } : null)
      if (badgeStyle) {
        return (
          <span
            key={i}
            style={{
              color: badgeStyle.color,
              border: `1px solid ${badgeStyle.color}`,
              borderRadius: 3,
              padding: '1px 6px',
              fontSize: 9,
              background: badgeStyle.bg,
              marginLeft: 6,
              letterSpacing: '0.06em',
              verticalAlign: 'middle',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {part}
          </span>
        )
      }
    }

    if (part.includes('█') || part.includes('░')) {
      return (
        <span key={i}>
          {[...part].map((ch, j) =>
            ch === '█' ? <span key={j} style={{ color: '#25e2cc' }}>{ch}</span> :
            ch === '░' ? <span key={j} style={{ color: '#1a2a3a' }}>{ch}</span> :
            <span key={j}>{ch}</span>
          )}
        </span>
      )
    }

    return <span key={i}>{part}</span>
  })
}

function getLineStyle(line) {
  const t = line.trim()
  if (t.startsWith('##')) {
    return {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
      fontSize: 13,
      color: '#25e2cc',
      letterSpacing: '0.04em',
      lineHeight: 1.4,
      isHeading: true,
    }
  }
  if (t.startsWith('UX Score')) {
    return { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#e8f4f8', fontWeight: 600, lineHeight: 1.8 }
  }
  if (/^→\s+F/.test(t)) {
    return { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#ff4444', lineHeight: 1.75 }
  }
  if (/^→/.test(t)) {
    return { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#f59e0b', lineHeight: 1.75 }
  }
  if (/^P\d\s·/.test(t)) {
    return { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#00d4ff', lineHeight: 1.75 }
  }
  return { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', lineHeight: 1.75 }
}

// ─── Audit Output ─────────────────────────────────────────────────────────────

function AuditOutput({ phase, scanStep, output }) {
  const lines = output.split('\n')

  const phaseBadge = {
    idle:      { label: 'EN ATTENTE',     color: '#4a7a94' },
    scanning:  { label: 'SCANNING...',    color: '#f59e0b' },
    streaming: { label: 'ANALYSING...',   color: '#25e2cc' },
    done:      { label: 'AUDIT COMPLETE', color: '#25e2cc' },
  }[phase]

  return (
    <div
      style={{
        background: '#060a10',
        border: '1px solid #1a2a3a',
        borderRadius: 8,
        padding: '24px 28px',
        minHeight: 520,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
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
          // AUDIT REPORT
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: phaseBadge.color,
            border: `1px solid ${phaseBadge.color}`,
            borderRadius: 3,
            padding: '2px 8px',
            letterSpacing: '0.1em',
          }}
        >
          {phaseBadge.label}
        </span>
      </div>

      {/* Idle */}
      {phase === 'idle' && (
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
          En attente d'un screenshot...
        </div>
      )}

      {/* Scanning */}
      {phase === 'scanning' && (
        <div style={{ flex: 1 }}>
          {SCAN_MESSAGES.slice(0, scanStep).map((msg, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: i === scanStep - 1 ? '#c4d8e8' : '#4a7a94',
                lineHeight: '2.1',
                letterSpacing: '0.02em',
              }}
            >
              {msg}
              {i === scanStep - 1 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: '1em',
                    background: '#25e2cc',
                    marginLeft: 4,
                    verticalAlign: 'text-bottom',
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Streaming / done */}
      {(phase === 'streaming' || phase === 'done') && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {lines.map((line, i) => {
            const trimmed = line.trim()
            const isCursor = i === lines.length - 1 && phase === 'streaming'
            const style = getLineStyle(line)

            if (!trimmed) return <div key={i} style={{ height: 8 }} />

            return (
              <div
                key={i}
                style={{
                  fontFamily: style.fontFamily,
                  fontWeight: style.fontWeight ?? 400,
                  fontSize: style.fontSize,
                  color: style.color,
                  letterSpacing: style.letterSpacing ?? '0.01em',
                  lineHeight: style.lineHeight,
                  marginTop: style.isHeading && i > 0 ? 20 : 0,
                  marginBottom: style.isHeading ? 6 : 0,
                }}
              >
                {renderLineContent(line)}
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

// ─── UX Audit Engine ──────────────────────────────────────────────────────────

export default function UXAuditEngine() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [scanStep, setScanStep] = useState(0)
  const [output, setOutput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const scanTimers = useRef([])

  function processFile(f) {
    setFile(f)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
    startScan(f.name)
  }

  function startScan(filename) {
    clearInterval(intervalRef.current)
    scanTimers.current.forEach(clearTimeout)
    scanTimers.current = []

    setPhase('scanning')
    setScanStep(0)
    setOutput('')

    SCAN_MESSAGES.forEach((_, i) => {
      scanTimers.current.push(
        setTimeout(() => setScanStep(i + 1), 500 * (i + 1))
      )
    })

    const streamDelay = 500 * SCAN_MESSAGES.length + 400
    scanTimers.current.push(
      setTimeout(() => {
        setPhase('streaming')
        const audit = AUDITS_DATA[filename] ?? AUDITS_DATA.__fallback__
        let idx = 0
        intervalRef.current = setInterval(() => {
          idx += 3
          if (idx >= audit.length) {
            setOutput(audit)
            setPhase('done')
            clearInterval(intervalRef.current)
          } else {
            setOutput(audit.slice(0, idx))
          }
        }, 20)
      }, streamDelay)
    )
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    scanTimers.current.forEach(clearTimeout)
    setFile(null)
    setPreview(null)
    setPhase('idle')
    setScanStep(0)
    setOutput('')
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }

  function handleFileChange(e) {
    const f = e.target.files[0]
    if (f) processFile(f)
  }

  useEffect(() => () => {
    clearInterval(intervalRef.current)
    scanTimers.current.forEach(clearTimeout)
  }, [])

  const statusBadge = {
    scanning:  { label: 'SCANNING...',    color: '#f59e0b' },
    streaming: { label: 'ANALYSING...',   color: '#25e2cc' },
    done:      { label: 'AUDIT COMPLETE', color: '#25e2cc' },
  }[phase]

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
        .drop-zone:hover { border-color: #25e2cc !important; }
        .reset-btn:hover { background: rgba(37,226,204,0.22) !important; }
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
                EXP-001
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
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#f59e0b',
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: 3,
                  padding: '2px 8px',
                  letterSpacing: '0.1em',
                  background: 'rgba(245,158,11,0.06)',
                }}
              >
                SIMULATION
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
              UX Audit Engine
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#7a9bb5',
                marginBottom: 16,
              }}
            >
              Upload a screenshot → get a structured UX audit
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['React', 'FileReader', 'Streaming simulé'].map(tag => (
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

              {/* Upload zone or preview */}
              {!preview ? (
                <div
                  className="drop-zone"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${dragOver ? '#25e2cc' : '#1a2a3a'}`,
                    borderRadius: 8,
                    padding: '52px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    background: dragOver ? 'rgba(37,226,204,0.04)' : '#060a10',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 32,
                      color: '#25e2cc',
                      opacity: 0.5,
                      lineHeight: 1,
                    }}
                  >
                    ↑
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: '#7a9bb5',
                      letterSpacing: '0.04em',
                      textAlign: 'center',
                    }}
                  >
                    Drag & drop ou cliquer
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#4a7a94',
                    }}
                  >
                    PNG · JPG · WebP
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    background: '#060a10',
                    border: '1px solid #1a2a3a',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={preview}
                    alt="Screenshot uploadé"
                    style={{ width: '100%', display: 'block', maxHeight: 260, objectFit: 'cover' }}
                  />
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* File info + status badge */}
              {file && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#7a9bb5',
                      letterSpacing: '0.04em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {file.name}
                  </span>
                  {statusBadge && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: statusBadge.color,
                        border: `1px solid ${statusBadge.color}`,
                        borderRadius: 3,
                        padding: '2px 7px',
                        letterSpacing: '0.08em',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {statusBadge.label}
                    </span>
                  )}
                </div>
              )}

              {/* Example file chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#4a7a94',
                    letterSpacing: '0.04em',
                  }}
                >
                  {'// Essayer avec :'}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {EXAMPLE_FILES.map(name => (
                    <span
                      key={name}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: '#25e2cc',
                        background: 'rgba(37,226,204,0.06)',
                        border: '1px solid rgba(37,226,204,0.2)',
                        borderRadius: 4,
                        padding: '4px 10px',
                        letterSpacing: '0.02em',
                        cursor: 'default',
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reset button */}
              {phase === 'done' && (
                <button
                  className="reset-btn"
                  onClick={handleReset}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#25e2cc',
                    background: 'rgba(37,226,204,0.12)',
                    border: '1px solid #25e2cc',
                    borderRadius: 6,
                    padding: '13px 24px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    letterSpacing: '0.02em',
                  }}
                >
                  NOUVELLE ANALYSE →
                </button>
              )}

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#4a7a94',
                  letterSpacing: '0.04em',
                }}
              >
                {'// Simulation — voir le vrai appel API sur GitHub'}
              </span>
            </div>

            {/* ── Right: Output ── */}
            <AuditOutput phase={phase} scanStep={scanStep} output={output} />

          </div>

        </main>
      </div>
    </>
  )
}
