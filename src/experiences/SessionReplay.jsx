import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SESSIONS = [
  {
    id: '001',
    date: '2026-01-20',
    title: 'Infrastructure',
    summary: 'GitHub, Vercel, domaine custom',
    status: 'DONE',
    duration: '2h',
    tags: ['GitHub', 'Vercel', 'DNS'],
    what: 'Création du repo GitHub, déploiement sur Vercel, configuration DNS Squarespace → michaelmisran.com. Première page live en moins de 2 heures.',
    decision: 'Vercel plutôt que Netlify — auto-deploy sur push main, intégration GitHub native, domaine custom gratuit.',
    prompt: 'N/A — session de configuration manuelle, pas de génération de code.',
  },
  {
    id: '002',
    date: '2026-01-20',
    title: 'Claude Code',
    summary: 'Installation + premier déploiement',
    status: 'DONE',
    duration: '1h',
    tags: ['Claude Code', 'npm', 'Vite'],
    what: 'Installation de Claude Code via npm, configuration du workspace, génération de la structure Vite + React + React Router. Premier push automatique.',
    decision: 'Claude Code comme outil central de génération — pas d\'éditeur traditionnel. Tout le code est généré via prompts structurés.',
    prompt: 'Initialise un projet Vite + React + React Router DOM. Crée la structure de base : src/pages/, src/experiences/, App.jsx avec les routes principales.',
  },
  {
    id: '003',
    date: '2026-01-21',
    title: 'HomePage',
    summary: 'Boot sequence + hero + cards',
    status: 'DONE',
    duration: '3h',
    tags: ['React', 'Animation', 'Design'],
    what: 'Génération complète de la HomePage : boot sequence typewriter plein écran, hero 100vh, badge AVAILABLE FOR WORK pulsant, stats row, 3 cards experiments, CTA.',
    decision: 'Boot sequence comme première impression — montre immédiatement le concept "lab scientifique / Jarvis" sans texte d\'explication.',
    prompt: 'Crée src/pages/HomePage.jsx avec une boot sequence typewriter de 5 lignes plein écran, puis une transition vers le hero. Design system : bg #0a0e17, accent #25e2cc, fonts Space Grotesk + Inter + JetBrains Mono.',
  },
  {
    id: '004',
    date: '2026-01-21',
    title: 'Corrections HomePage',
    summary: 'Itérations design post-review',
    status: 'DONE',
    duration: '1h30',
    tags: ['Bugfix', 'Design', 'Itération'],
    what: 'Review visuelle complète de la HomePage après déploiement. Corrections ciblées : espacements, couleurs, contenu éditorial réécrit (Claude Code avait inventé des descriptions).',
    decision: 'Toujours relire le contenu éditorial généré par l\'IA — les descriptions techniques sont fiables, le contenu marketing est à vérifier.',
    prompt: 'Dans HomePage.jsx : 1. Remplace la description du hero par [...] 2. Augmente le gap entre les cards à 24px 3. Passe le badge AVAILABLE FOR WORK en position fixe.',
  },
  {
    id: '005',
    date: '2026-01-22',
    title: 'LabPage',
    summary: 'Grille des 5 expériences',
    status: 'DONE',
    duration: '2h',
    tags: ['React', 'Grid', 'Filter'],
    what: 'Génération de LabPage avec header, badge compteur, filtres ALL/READY/IN PROGRESS, grille de 5 cards. Cards entièrement cliquables via React Router Link.',
    decision: 'Cards entièrement cliquables plutôt qu\'un bouton "Voir →" — meilleure UX, surface de clic maximale.',
    prompt: 'Crée src/pages/LabPage.jsx avec une grille de 5 experiment cards filtrables par statut. Chaque card est un <Link> vers /experience/:slug. Données hardcodées dans le fichier.',
  },
  {
    id: '006',
    date: '2026-01-23',
    title: 'ProcessPage',
    summary: 'Comment je travaille avec l\'IA',
    status: 'DONE',
    duration: '1h30',
    tags: ['Contenu', 'Timeline', 'Stack'],
    what: 'Page documentant la méthode de travail : timeline 5 étapes du workflow, stack IA (Claude Desktop, Claude Code, MCP), philosophie Human × AI.',
    decision: 'Figma retiré de tout le workflow documenté — le portfolio prouve que le design peut se faire directement en code avec l\'IA.',
    prompt: 'Crée src/pages/ProcessPage.jsx avec une timeline verticale de 5 étapes du workflow AI-first, puis une section Stack IA avec 6 outils documentés.',
  },
  {
    id: '007',
    date: '2026-01-24',
    title: 'ContactPage + SPA Fix',
    summary: 'Terminal interactif + Vercel routing',
    status: 'DONE',
    duration: '2h',
    tags: ['Terminal UI', 'Vercel', 'Routing'],
    what: 'Terminal interactif style macOS sur /contact. Correction critique : ajout de vercel.json avec rewrite SPA pour éviter les 404 sur accès direct aux routes.',
    decision: 'Sans vercel.json, chaque URL directe retourne 404. Le fichier rewrite source: "/(.*)" → destination: "/index.html" est obligatoire pour tout SPA React sur Vercel.',
    prompt: 'Crée src/pages/ContactPage.jsx style terminal macOS avec dots rouge/orange/vert, typewriter 180ms/ligne, liens EMAIL/LINKEDIN/GITHUB cliquables, input + SEND.',
  },
  {
    id: '008',
    date: '2026-03-12',
    title: 'EXP-002 Product Brief Machine',
    summary: 'Première expérience interactive live',
    status: 'DONE',
    duration: '3h',
    tags: ['Streaming', 'Claude API', 'Simulation'],
    what: 'Génération de la première expérience interactive : interface 2 colonnes INPUT/OUTPUT, streaming simulé caractère par caractère, 3 briefs pré-écrits, états idle/generating/done.',
    decision: 'Streaming simulé plutôt qu\'appel API réel — coût $0 vs ~$0.04/requête. Sur un portfolio public sans auth, une clé API dans le bundle JS = risque financier et sécurité. Le code montre la maîtrise du pattern.',
    prompt: 'Crée src/experiences/ProductBriefMachine.jsx avec streaming simulé 18ms/3chars, 3 briefs pré-écrits pour les chips, états idle/generating/done, bouton COPIER après génération.',
  },
  {
    id: '009',
    date: '2026-03-12',
    title: '/design-system + Nav',
    summary: 'Documentation vivante du DS',
    status: 'DONE',
    duration: '2h',
    tags: ['Design System', 'Nav', 'Bugfixes'],
    what: 'Page /design-system complète : 9 swatches cliquables, 3 specimens typo, section Components style Storybook, spacing scale. Lien DS ajouté dans la nav de toutes les pages. 3 bugfixes layout.',
    decision: 'Un designer qui documente son DS en code sans Figma, c\'est rare. La page /design-system renforce le positionnement "designer qui code" sans nécessiter de mockups.',
    prompt: 'Crée DesignSystemPage.jsx avec sections Colors (swatches cliquables), Typography (3 specimens), Components (boutons + badges + card avec code tokens), Spacing (échelle visuelle).',
  },
  { id:'010', date:'2026-03-12', title:'EXP-003 Session Replay', summary:'Timeline interactive des sessions de build', status:'DONE', duration:'2h', tags:['React','useState','Accordéon'], what:'Génération de EXP-003 SessionReplay.jsx : timeline verticale avec 9 cards accordéon, sections WHAT / DECISION / PROMPT, stats row 4 métriques.', decision:'Données hardcodées dans le composant plutôt que fetch JSON — zéro latence, zéro dépendance réseau.', prompt:'Crée SessionReplay.jsx avec timeline verticale de 9 sessions. Chaque card est un accordéon avec sections WHAT / DECISION / PROMPT.' },
  { id:'011', date:'2026-03-12', title:'Session Log Viewer', summary:'Accès aux docs HTML depuis EXP-003', status:'DONE', duration:'1h30', tags:['Modal','iframe','UX'], what:'Lien VOIR LE LOG COMPLET dans chaque card, modale overlay 90vw×85vh avec iframe. Fichiers HTML dans public/session-logs/ servis statiquement.', decision:'Modale overlay blur(4px) plutôt que plein écran — le visiteur conserve le contexte de la page. Overlay cliquable pour fermer.', prompt:'Ajouter useState activeLog, prop onOpenLog sur SessionCard, modale overlay avec iframe src dynamique /session-logs/misran-labs-session{id}.html.' },
  { id:'012', date:'2026-03-13', title:'Formspree Contact', summary:'Terminal séquentiel + envoi email réel', status:'DONE', duration:'30min', tags:['Formspree','fetch','UX'], what:'Intégration Formspree sur /contact. UX séquentielle nom → email → message. Chaque saisie apparaît comme ligne de terminal avant de passer à l\'étape suivante. Confirmation colorée selon résultat.', decision:'Formspree plutôt que backend custom — le portfolio montre des compétences product, pas du SMTP. 30 min vs 3h de travail pour un résultat identique côté recruteur.', prompt:'Remplacer handleSend() par handleEnter() async avec machine d\'états step. fetch POST vers Formspree avec { name, email, message }.' },
  { id:'013', date:'2026-03-14', title:'EXP-001 UX Audit Engine', summary:'Upload screenshot → audit UX structuré en streaming simulé', status:'DONE', duration:'1h30', tags:['React','FileReader','Streaming simulé'], what:'Création de UXAuditEngine.jsx : zone de drop avec FileReader, 5 SCAN_MESSAGES en séquence (500ms chacun), streaming simulé 20ms/+3 chars, coloration syntaxique inline (## teal, → F rouge, P· cyan, badges [CRITIQUE]/[ATTENTION]/[CORRECT], barres █░). Fix post-déploiement : chips horizontaux teal avec label "Essayer avec".', decision:'3 audits pré-définis (Airbnb, Analytics, LinkedIn) plutôt qu\'un vrai appel API — permet de démontrer le pattern de coloration syntaxique et le scoring visuel sans backend. Chaque audit illustre un cas UX différent : densité, surcharge cognitive, dark patterns.', prompt:'Crée src/experiences/UXAuditEngine.jsx avec upload FileReader, 5 SCAN_MESSAGES séquentiels, streaming simulé et coloration syntaxique : ## → teal Space Grotesk, → F· → rouge, P· → cyan, badges inline, barres █░ colorées.' },
]

const STATS = [
  { num: '13',    label: 'Sessions' },
  { num: '~22h',  label: 'De build' },
  { num: '1',     label: 'Développeur' },
  { num: '100%',  label: 'AI-assisted' },
]

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
        {[
          { label: 'Lab', to: '/lab' },
          { label: 'Process', to: '/process' },
          { label: 'DS', to: '/design-system' },
          { label: 'Contact', to: '/contact' },
        ].map(({ label, to }) => (
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

// ─── Session Card ─────────────────────────────────────────────────────────────

function SessionCard({ session, onOpenLog }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isNA = session.prompt === 'N/A — session de configuration manuelle, pas de génération de code.'

  return (
    <div
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0d1220',
        border: `${open ? '1px' : '1px'} solid ${open || hovered ? '#25e2cc' : '#1a2a3a'}`,
        borderLeft: open ? '3px solid #25e2cc' : '1px solid #1a2a3a',
        borderRadius: 8,
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
        userSelect: 'none',
      }}
    >
      {/* ── Closed header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Row 1: id + date + badge + duration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#25e2cc', letterSpacing: '0.08em' }}>
              SESSION-{session.id}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7a9bb5', letterSpacing: '0.04em' }}>
              {session.date}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#25e2cc', border: '1px solid #25e2cc', borderRadius: 3, padding: '1px 7px', letterSpacing: '0.1em' }}>
              {session.status}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7a9bb5' }}>
              {session.duration}
            </span>
          </div>

          {/* Row 2: title */}
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: '#e8f4f8', margin: 0, lineHeight: 1.3 }}>
            {session.title}
          </h3>

          {/* Row 3: summary */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7a9bb5', margin: 0, lineHeight: 1.6 }}>
            {session.summary}
          </p>

          {/* Row 4: tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {session.tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4a7a94', background: 'rgba(26,42,58,0.6)', border: '1px solid #1a2a3a', borderRadius: 3, padding: '2px 8px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5',
          transition: 'transform 0.2s ease', display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0, marginTop: 4,
        }}>
          ▼
        </span>
      </div>

      {/* ── Accordion content ── */}
      <div style={{
        maxHeight: open ? 600 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{ borderTop: '1px solid #1a2a3a', marginTop: 16, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* WHAT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#25e2cc', letterSpacing: '0.1em' }}>
              // WHAT
            </span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7a9bb5', margin: 0, lineHeight: 1.7 }}>
              {session.what}
            </p>
          </div>

          {/* DECISION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#f59e0b', letterSpacing: '0.1em' }}>
              // DECISION ⚡
            </span>
            <div style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '3px solid #f59e0b', padding: '12px 16px', borderRadius: '0 4px 4px 0' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#fbbf24', margin: 0, lineHeight: 1.7 }}>
                {session.decision}
              </p>
            </div>
          </div>

          {/* PROMPT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00d4ff', letterSpacing: '0.1em' }}>
              // PROMPT
            </span>
            <div style={{ background: '#060a10', border: '1px solid #1a2a3a', borderRadius: 6, padding: '14px 18px' }}>
              {isNA ? (
                <em style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', fontStyle: 'italic' }}>
                  {session.prompt}
                </em>
              ) : (
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', margin: 0, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {session.prompt}
                </p>
              )}
            </div>
          </div>

          <div
            onClick={e => { e.stopPropagation(); onOpenLog(session.id) }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: '#00d4ff', letterSpacing: '0.08em', cursor: 'pointer',
              borderTop: '1px solid #1a2a3a', paddingTop: 16, marginTop: 4,
              opacity: 0.7, transition: 'opacity 0.15s ease',
              userSelect: 'none',
            }}
          >
            {'// VOIR LE LOG COMPLET →'}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Session Replay ───────────────────────────────────────────────────────────

export default function SessionReplay() {
  const [activeLog, setActiveLog] = useState(null)

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

        <main style={{ maxWidth: 860, margin: '0 auto', padding: '96px 40px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 40 }}>
            <Link to="/lab" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#7a9bb5', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 24, textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8f4f8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7a9bb5')}
            >
              ← Lab
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7a9bb5', border: '1px solid #243545', borderRadius: 3, padding: '2px 8px', letterSpacing: '0.08em' }}>
                EXP-003
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#f59e0b', border: '1px solid #f59e0b', borderRadius: 3, padding: '2px 8px', letterSpacing: '0.1em' }}>
                IN PROGRESS
              </span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#e8f4f8', letterSpacing: '-0.02em', marginBottom: 10 }}>
              Session Replay
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a9bb5', marginBottom: 16 }}>
              Documentation narrative du build en live — prompts, décisions, itérations
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['React', 'Framer Motion', 'Markdown'].map(tag => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4a7a94', background: 'rgba(26,42,58,0.6)', border: '1px solid #1a2a3a', borderRadius: 3, padding: '2px 8px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Stats ── */}
          <div style={{ display: 'flex', borderTop: '1px solid #1a2a3a', borderBottom: '1px solid #1a2a3a', background: '#0d1220', marginBottom: 56, borderRadius: 8 }}>
            {STATS.map(({ num, label }, i) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '28px 16px', borderLeft: i > 0 ? '1px solid #1a2a3a' : 'none' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: '#25e2cc', lineHeight: 1 }}>
                  {num}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7a9bb5', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Timeline ── */}
          <div style={{ position: 'relative', paddingLeft: 32 }}>

            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: 'rgba(37,226,204,0.3)', borderRadius: 1 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {SESSIONS.map(session => (
                <div key={session.id} style={{ position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: -28, top: 24, width: 8, height: 8, borderRadius: '50%', background: '#25e2cc', border: '2px solid #0a0e17', boxShadow: '0 0 6px rgba(37,226,204,0.6)', zIndex: 1 }} />
                  <SessionCard session={session} onOpenLog={setActiveLog} />
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{ textAlign: 'center', marginTop: 64, padding: '48px 40px', background: '#0d1220', border: '1px solid #1a2a3a', borderRadius: 8 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a9bb5', marginBottom: 24, lineHeight: 1.6 }}>
              Voir le résultat → Product Brief Machine
            </p>
            <Link to="/experience/exp-002" className="cta-btn" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: '#25e2cc', background: 'rgba(37,226,204,0.12)', padding: '12px 28px', borderRadius: 6, border: '1px solid #25e2cc', display: 'inline-block', transition: 'background 0.2s ease' }}>
              Product Brief Machine →
            </Link>
          </div>

        </main>
      </div>

      {activeLog && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setActiveLog(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(5,8,15,0.85)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: '90vw', maxWidth: 1100,
            height: '85vh',
            background: '#0d1220',
            border: '1px solid #1a2a3a',
            borderRadius: 12,
            boxShadow: '0 0 0 1px rgba(37,226,204,0.15), 0 32px 80px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px', height: 52, flexShrink: 0,
              borderBottom: '1px solid #1a2a3a',
              background: '#080c18',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: '#25e2cc', letterSpacing: '0.12em',
                }}>
                  SESSION-{activeLog} // LOG COMPLET
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: '#7a9bb5',
                  background: 'rgba(26,42,58,0.6)',
                  border: '1px solid #1a2a3a',
                  borderRadius: 3, padding: '2px 8px',
                }}>
                  Cliquer en dehors pour fermer
                </span>
              </div>
              <button
                onClick={() => setActiveLog(null)}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#e8f4f8'
                  e.currentTarget.style.borderColor = '#e8f4f8'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#7a9bb5'
                  e.currentTarget.style.borderColor = '#1a2a3a'
                }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: '#7a9bb5', background: 'none',
                  border: '1px solid #1a2a3a', borderRadius: 4,
                  padding: '5px 12px', cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                ✕ FERMER
              </button>
            </div>

            {/* iframe */}
            <iframe
              src={`/session-logs/misran-labs-session${activeLog}.html`}
              style={{ flex: 1, border: 'none', width: '100%' }}
              title={`Session ${activeLog} log`}
            />
          </div>
        </>
      )}
    </>
  )
}
