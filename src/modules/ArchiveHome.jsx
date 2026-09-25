import { Link } from 'react-router-dom'
import { visibleProjects, pt } from '../lab/projects'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { STATUS, METHOD_STEP_COLORS } from '../lab/phases'
import { RULES_CONTENT } from '../lab/labRulesContent'

// Page d'accueil du kit rétro. Ce n'est pas HomeModule recoloré : c'est une
// composition différente — planche d'archive plutôt que grille de cards —
// parce qu'un kit qui ne change que des tokens ne rompt jamais vraiment.
// Le contenu (règles du Lab, liste des projets) est le même qu'ailleurs ;
// seule la mise en scène change.

const COPY = {
  fr: {
    mastheadLeft: 'M.LABS',
    mastheadLeftSub: 'ARCHIVE DE PORTFOLIO',
    mastheadCenter: 'INDEX DU LAB //// SÉRIE PROJETS',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    heroTag: 'PRODUCT DESIGNER & LAB',
    heroDesc: "Un journal de bord honnête, pas un catalogue lissé. Chaque dossier documente une hypothèse, ce qui a été construit, et ce qui a réellement été vérifié.",
    overviewTitle: 'APERÇU',
    overviewRole: 'RÔLE',
    overviewRoleValue: 'Product Designer',
    overviewFiles: 'DOSSIERS',
    overviewStatus: 'STATUT',
    overviewStatusValue: 'ACTIF',
    overviewSince: 'DEPUIS',
    accentLabel: 'ACCENT',
    accentValue: 'CORAIL BRÛLÉ',
    protocolTitle: 'PROTOCOLE — MÉTHODE DU LAB',
    protocolIntro: RULES_CONTENT.fr.intro,
    statusLegend: 'STATUTS UTILISÉS',
    indexTitle: 'DOSSIERS',
    indexSub: 'Classés par ordre d’ouverture, pas par importance.',
    keywords: 'MOTS-CLÉS',
    openFile: 'OUVRIR LE DOSSIER',
    docId: 'ID DOCUMENT — ML-ARCHIVE-000',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    sideStrip: 'MISRAN LABS — ARCHIVE DE PORTFOLIO — INDEX ',
  },
  en: {
    mastheadLeft: 'M.LABS',
    mastheadLeftSub: 'PORTFOLIO ARCHIVE',
    mastheadCenter: 'LAB INDEX //// PROJECT SERIES',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    heroTag: 'PRODUCT DESIGNER & LAB',
    heroDesc: "An honest logbook, not a polished catalogue. Every file documents a hypothesis, what got built, and what was actually verified.",
    overviewTitle: 'OVERVIEW',
    overviewRole: 'ROLE',
    overviewRoleValue: 'Product Designer',
    overviewFiles: 'FILES',
    overviewStatus: 'STATUS',
    overviewStatusValue: 'ACTIVE',
    overviewSince: 'SINCE',
    accentLabel: 'ACCENT',
    accentValue: 'BURNT CORAL',
    protocolTitle: 'PROTOCOL — LAB METHOD',
    protocolIntro: RULES_CONTENT.en.intro,
    statusLegend: 'STATUSES USED',
    indexTitle: 'FILES',
    indexSub: 'Ordered by when they were opened, not by importance.',
    keywords: 'KEYWORDS',
    openFile: 'OPEN FILE',
    docId: 'DOCUMENT ID — ML-ARCHIVE-000',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    sideStrip: 'MISRAN LABS — PORTFOLIO ARCHIVE — INDEX ',
  },
}

function Stamp({ label, size = 92 }) {
  const pathId = 'archive-stamp-curve'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
      <circle cx="50" cy="50" r="47" fill="none" stroke="var(--primary)" strokeWidth="1" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="var(--primary)" strokeWidth="1" />
      <path id={pathId} d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
      <text fontSize="6" fill="var(--primary)" letterSpacing="2" fontFamily="var(--font-mono)">
        <textPath href={`#${pathId}`} startOffset="2%">{label}</textPath>
      </text>
      <text x="50" y="57" textAnchor="middle" fontFamily="var(--font-heading)" fontWeight="700" fontSize="22" fill="var(--primary)">✛</text>
    </svg>
  )
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 2, 1, 3]
  return (
    <svg width="90" height="24" viewBox="0 0 90 24" aria-hidden="true">
      {bars.map((w, i) => {
        const x = bars.slice(0, i).reduce((a, b) => a + b + 1, 0)
        return <rect key={i} x={x} y="0" width={w} height="24" fill="var(--text)" />
      })}
    </svg>
  )
}

function Masthead({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 28, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{c.mastheadLeft}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{c.mastheadLeftSub}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {c.mastheadCenter}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{c.mastheadRight}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{c.mastheadRightSub}</div>
      </div>
    </div>
  )
}

function OverviewBox({ c, count }) {
  const rows = [
    [c.overviewRole, c.overviewRoleValue],
    [c.overviewFiles, String(count).padStart(2, '0')],
    [c.overviewStatus, c.overviewStatusValue],
    [c.overviewSince, '2024'],
  ]
  return (
    <div style={{ border: 'var(--border-thin) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        {c.overviewTitle}
      </div>
      <div style={{ padding: '4px 12px' }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '7px 0', borderBottom: 'var(--border-thin) solid var(--border)' }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.06em', color: 'var(--muted)' }}>{label}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AccentSwatch({ c }) {
  return (
    <div style={{ border: 'var(--border-thin) solid var(--border)', marginTop: 16 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        {c.accentLabel}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12 }}>
        <div style={{ width: 28, height: 28, background: 'var(--primary)', border: 'var(--border-thin) solid var(--border)', flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text)' }}>{c.accentValue}</span>
      </div>
    </div>
  )
}

function ProtocolPlate({ c, lang }) {
  const steps = RULES_CONTENT[lang]?.steps ?? RULES_CONTENT.fr.steps
  const statusMap = STATUS[lang] ?? STATUS.fr

  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', position: 'relative', flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '14px 20px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)' }}>{c.protocolTitle}</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '58ch', margin: '10px 0 0' }}>{c.protocolIntro}</p>
        </div>
        <Stamp label="MISRAN · LABS · ARCHIVE ·" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ padding: '14px 20px', borderRight: 'var(--border-thin) solid var(--border)', borderTop: 'var(--border-thin) solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: METHOD_STEP_COLORS[i] }}>0{i + 1}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{step.title}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '12px 20px', borderTop: 'var(--border-thin) solid var(--border)' }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.08em', color: 'var(--muted)' }}>{c.statusLegend}</span>
        {Object.entries(statusMap).map(([key, s]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, background: s.color, flexShrink: 0, opacity: key === 'skipped' ? 0.5 : 1 }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: 'var(--text2)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FileEntry({ project, index, c, lang }) {
  const { title, summary, tags } = pt(project, lang)

  return (
    <Link to={`/lab/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          border: 'var(--border-thin) solid var(--border)',
          padding: 18,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-tint)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--muted)' }}>
            {lang === 'fr' ? 'DOSSIER' : 'FILE'} {String(index + 1).padStart(3, '0')}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: 'var(--primary)' }}>{project.icon}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.2 }}>
          {title}
        </h3>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6, margin: 0, flex: 1 }}>
          {summary}
        </p>

        {tags.length > 0 && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 4 }}>{c.keywords}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)' }}>{tags.join(' · ')}</div>
          </div>
        )}

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--primary)', marginTop: 4 }}>
          {c.openFile} →
        </div>
      </div>
    </Link>
  )
}

function DocFooter({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 32, paddingTop: 16, borderTop: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.06em', color: 'var(--muted)' }}>
        {c.docId} — {c.clearance}
      </div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', color: 'var(--text)', textAlign: 'center', flex: '1 1 240px' }}>
        {c.tagline}
      </div>
      <Barcode />
    </div>
  )
}

export default function ArchiveHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const projects = visibleProjects()
  const c = COPY[lang] ?? COPY.fr

  return (
    <div style={{ display: 'flex', color: 'var(--text)' }}>
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            width: 28,
            flexShrink: 0,
            borderRight: 'var(--border-thin) solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: '0.2em',
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {c.sideStrip.repeat(3)}
          </div>
        </div>
      )}

      <div style={{ padding: isMobile ? 20 : 40, flex: 1, minWidth: 0 }}>
        <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Michael Misran — Product Designer & Lab
        </h1>

        <Masthead c={c} />

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 24, marginBottom: 32 }}>
          <div style={{ flex: isMobile ? '1 1 auto' : '0 0 220px' }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 64, lineHeight: 0.85, color: 'var(--text)', marginBottom: 6 }}>M.</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, color: 'var(--primary)', lineHeight: 1, marginBottom: 8 }}>PORTFOLIO</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.08em', color: 'var(--text2)', marginBottom: 14 }}>{c.heroTag}</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '34ch' }}>{c.heroDesc}</p>

            <OverviewBox c={c} count={projects.length} />
            <AccentSwatch c={c} />
          </div>

          <ProtocolPlate c={c} lang={lang} />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text)' }}>{c.indexTitle}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--muted)' }}>{c.indexSub}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0, border: 'var(--border-thin) solid var(--border)', borderRight: 'none', borderBottom: 'none' }}>
          {projects.map((project, i) => (
            <div key={project.slug} style={{ borderRight: 'var(--border-thin) solid var(--border)', borderBottom: 'var(--border-thin) solid var(--border)' }}>
              <FileEntry project={project} index={i} c={c} lang={lang} />
            </div>
          ))}
        </div>

        <DocFooter c={c} />
      </div>
    </div>
  )
}
