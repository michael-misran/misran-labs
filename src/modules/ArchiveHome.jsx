import { Link } from 'react-router-dom'
import { visibleProjects, pt, dossierNo } from '../lab/projects'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { STATUS, METHOD_STEP_COLORS } from '../lab/phases'
import { RULES_CONTENT } from '../lab/labRulesContent'
import { Stamp, Barcode } from '../design-system/ArchiveMarks'
import { getIssues } from '../magazine/numeros'
import { CouvertureNumero } from '../magazine/RevueParts'
import { KRAFT } from '../lab/caseChrome'
import { TamponDeclassifie, EtiquetteTapee } from '../lab/DossierParts'

// Page d'accueil du Lab (D2) : une armoire à dossiers confidentiels plutôt
// qu'un portfolio lissé — chemise kraft, note de service tapée à la
// machine, index de chemises, fiche agent. Le contenu (règles du Lab,
// liste des projets) reste le même qu'ailleurs ; seule la mise en scène
// change.

const COPY = {
  fr: {
    onglet: 'ML-LAB',
    agent: 'AGENT : M. MISRAN',
    classement: 'CLASSEMENT : ouvert au public',
    piecesLabel: 'PIÈCES : ',
    mastheadCenter: 'INDEX DU LAB //// SÉRIE PROJETS',
    heroTag: 'PRODUCT DESIGNER & LAB',
    heroDesc: "Un journal de bord honnête, pas un catalogue lissé. Chaque dossier documente une hypothèse, ce qui a été construit, et ce qui a réellement été vérifié.",
    fichierAgentTitle: 'FICHE AGENT',
    overviewRole: 'RÔLE',
    overviewRoleValue: 'Product Designer',
    overviewFiles: 'DOSSIERS',
    overviewStatus: 'STATUT',
    overviewStatusValue: 'ACTIF',
    overviewSince: 'DEPUIS',
    accentLabel: 'ACCENT',
    accentValue: 'VERT DOSSIER',
    protocolTitle: 'NOTE DE SERVICE — MÉTHODE DU LAB',
    protocolIntro: RULES_CONTENT.fr.intro,
    statusLegend: 'STATUTS UTILISÉS',
    magLabel: 'MAGAZINE — DERNIER NUMÉRO',
    magRead: 'Lire le numéro',
    magAll: 'Tous les numéros',
    magFollow: 'Suivre le Lab',
    indexTitle: 'DOSSIERS',
    indexSub: 'Classés par ordre d’ouverture, pas par importance.',
    keywords: 'MOTS-CLÉS',
    openFile: 'OUVRIR LE DOSSIER',
    docId: 'ID DOCUMENT — ML-ARCHIVE-000',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    tamponBarre: 'CONFIDENTIEL',
    tamponBas: 'DÉCLASSIFIÉ',
    typeLabels: { 'case-study': 'ÉTUDE DE CAS', method: 'MÉTHODE', tool: 'OUTIL' },
    statusLabels: { READY: 'PRÊT', PLACEHOLDER: 'À VENIR' },
  },
  en: {
    onglet: 'ML-LAB',
    agent: 'AGENT: M. MISRAN',
    classement: 'CLEARANCE: open to the public',
    piecesLabel: 'FILES: ',
    mastheadCenter: 'LAB INDEX //// PROJECT SERIES',
    heroTag: 'PRODUCT DESIGNER & LAB',
    heroDesc: "An honest logbook, not a polished catalogue. Every file documents a hypothesis, what got built, and what was actually verified.",
    fichierAgentTitle: 'AGENT FILE',
    overviewRole: 'ROLE',
    overviewRoleValue: 'Product Designer',
    overviewFiles: 'FILES',
    overviewStatus: 'STATUS',
    overviewStatusValue: 'ACTIVE',
    overviewSince: 'SINCE',
    accentLabel: 'ACCENT',
    accentValue: 'FILE GREEN',
    protocolTitle: 'MEMO — LAB METHOD',
    protocolIntro: RULES_CONTENT.en.intro,
    statusLegend: 'STATUSES USED',
    magLabel: 'MAGAZINE — LATEST ISSUE',
    magRead: 'Read the issue',
    magAll: 'All issues',
    magFollow: 'Follow the Lab',
    indexTitle: 'FILES',
    indexSub: 'Ordered by when they were opened, not by importance.',
    keywords: 'KEYWORDS',
    openFile: 'OPEN FILE',
    docId: 'DOCUMENT ID — ML-ARCHIVE-000',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    tamponBarre: 'CLASSIFIED',
    tamponBas: 'DECLASSIFIED',
    typeLabels: { 'case-study': 'CASE STUDY', method: 'METHOD', tool: 'TOOL' },
    statusLabels: { READY: 'READY', PLACEHOLDER: 'UPCOMING' },
  },
}

// La chemise kraft pleine largeur (D2) : onglet « ML-LAB », étiquette
// tapée à la machine, tampon déclassifié.
function ChemiseEnTete({ c, count }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ background: KRAFT.chemise, border: 'var(--border-regular) solid var(--border)', padding: isMobile ? 'var(--space-md)' : '18px 22px', marginBottom: 'var(--space-xl)', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: isMobile ? 16 : 28,
          background: KRAFT.onglet,
          border: 'var(--border-regular) solid var(--border)',
          borderBottom: 0,
          padding: '5px 16px 14px',
          fontFamily: "var(--font-machine)",
          fontSize: 13,
          letterSpacing: '0.08em',
          color: '#3a2f1e',
        }}
      >
        {c.onglet}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: isMobile ? 6 : 14 }}>
        <EtiquetteTapee>
          {c.agent}<br />{c.classement}<br />{c.piecesLabel}{count}
        </EtiquetteTapee>
        <TamponDeclassifie barre={c.tamponBarre} bas={c.tamponBas} />
      </div>
    </div>
  )
}

function FicheAgent({ c, count }) {
  const rows = [
    [c.overviewRole, c.overviewRoleValue],
    [c.overviewFiles, String(count).padStart(2, '0')],
    [c.overviewStatus, c.overviewStatusValue],
    [c.overviewSince, '2024'],
    [c.accentLabel, c.accentValue],
  ]
  return (
    <div style={{ background: KRAFT.papier, border: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, letterSpacing: '0.04em', color: 'var(--text)', padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        {c.fichierAgentTitle}
      </div>
      <div style={{ padding: 'var(--space-2xs) var(--space-sm)' }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-sm)', padding: '7px 0', borderBottom: 'var(--border-thin) solid var(--border)' }}>
            <span style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--muted)' }}>{label}</span>
            {label === c.accentLabel ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, background: 'var(--titre-lab)', border: 'var(--border-thin) solid var(--border)', flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text)' }}>{value}</span>
              </span>
            ) : (
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// La note de service (D2) : l'ancien protocole en 5 étapes, tapé à la
// machine plutôt qu'en mono/heading. Le contenu ne change pas.
function NoteDeService({ c, lang }) {
  const steps = RULES_CONTENT[lang]?.steps ?? RULES_CONTENT.fr.steps
  const statusMap = STATUS[lang] ?? STATUS.fr

  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', position: 'relative', flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', padding: '14px var(--space-md-plus)', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        <div>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, letterSpacing: '0.04em', color: 'var(--text)' }}>{c.protocolTitle}</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '58ch', margin: 'var(--space-xs-plus) 0 0' }}>{c.protocolIntro}</p>
        </div>
        <Stamp label="MISRAN · LABS · ARCHIVE ·" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
        {steps.map((step, i) => {
          // Le dernier step (05) tombe seul sous la première colonne quand la
          // grille en compte 4 — les filets des autres colonnes n'avaient
          // alors rien pour aller jusqu'en bas. Il occupe toute la largeur
          // de sa ligne pour fermer la grille proprement, quel que soit le
          // nombre de colonnes qu'auto-fit produit à une largeur donnée.
          const isLast = i === steps.length - 1
          return (
            <div
              key={i}
              style={{
                gridColumn: isLast ? '1 / -1' : undefined,
                padding: '14px var(--space-md-plus)',
                borderRight: isLast ? 'none' : 'var(--border-thin) solid var(--border)',
                borderTop: 'var(--border-thin) solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-xs)', marginBottom: 'var(--space-2xs)' }}>
                <span style={{ fontFamily: "var(--font-machine)", fontSize: 12, color: METHOD_STEP_COLORS[i] }}>0{i + 1}</span>
                <span style={{ fontFamily: "var(--font-machine)", fontSize: 14, color: 'var(--text)' }}>{step.title}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: 0, maxWidth: isLast ? '60ch' : undefined }}>{step.desc}</p>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md-plus)', borderTop: 'var(--border-thin) solid var(--border)' }}>
        <span style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--muted)' }}>{c.statusLegend}</span>
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

// Met en avant le dernier numéro du Magazine — seule partie de la home qui
// change chaque semaine, sans intervention de code (pas de numéro
// valide → pas de bloc). Réutilise CouvertureNumero (RevueParts.jsx) pour
// rester dans le style « revue bleue » du Magazine plutôt que de recopier
// l'ancien habillage archive du Lab (D5, mission kiosque-finitions).
function LatestIssue({ c, lang }) {
  const issue = getIssues()[0]
  if (!issue) return null

  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
        <span style={{ fontFamily: "var(--font-machine)", fontSize: 12, letterSpacing: '0.03em', color: 'var(--titre-lab)' }}>{c.magLabel}</span>
      </div>

      <CouvertureNumero issue={issue} lang={lang} variante="vedette" />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md-plus)', padding: 'var(--space-sm) 0 0' }}>
        <Link to={`/magazine/${issue.date}`} style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.08em', fontWeight: 700, color: 'var(--titre-magazine)', textDecoration: 'none', borderBottom: '2px solid var(--titre-magazine)', paddingBottom: 1 }}>
          {c.magRead} →
        </Link>
        <Link to="/magazine" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.08em', fontWeight: 700, color: 'var(--text2)', textDecoration: 'none' }}>
          {c.magAll} →
        </Link>
        <Link to="/suivre" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.08em', fontWeight: 700, color: 'var(--text2)', textDecoration: 'none', marginLeft: 'auto' }}>
          <span style={{ color: 'var(--titre-magazine)' }}>◉</span> {c.magFollow} →
        </Link>
      </div>
    </div>
  )
}

// Une chemise de l'index (D2) : onglet avec le numéro de dossier, léger
// décalage alterné comme dans un tiroir de classeur, titre tapé, ligne de
// méta (type, statut), lien vers /lab/<slug>.
function ChemiseIndex({ project, index, c, lang }) {
  const { title, summary, tags } = pt(project, lang)
  const no = dossierNo(project.slug) ?? '—'
  const decalage = index % 2 === 0 ? 0 : 8

  return (
    <Link to={`/lab/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: decalage,
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-tint)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
      >
        <div style={{ alignSelf: 'flex-start', background: KRAFT.onglet, border: 'var(--border-thin) solid var(--border)', borderBottom: 0, padding: '3px 10px', fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.04em', color: '#3a2f1e' }}>
          Nº {no}
        </div>
        <div style={{ border: 'var(--border-thin) solid var(--border)', padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs-plus)' }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.2 }}>
            {title}
          </h3>

          <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--titre-lab)' }}>
            {c.typeLabels[project.type] ?? project.type} · {c.statusLabels[project.status] ?? project.status}
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6, margin: 0, flex: 1 }}>
            {summary}
          </p>

          {tags.length > 0 && (
            <div>
              <div style={{ fontFamily: "var(--font-machine)", fontSize: 10, letterSpacing: '0.03em', color: 'var(--muted)', marginBottom: 'var(--space-2xs)' }}>{c.keywords}</div>
              <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, color: 'var(--text2)' }}>{tags.join(' · ')}</div>
            </div>
          )}

          <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--primary)', marginTop: 'var(--space-2xs)' }}>
            {c.openFile} →
          </div>
        </div>
      </div>
    </Link>
  )
}

function DocFooter({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-xl)', paddingTop: 'var(--space-md)', borderTop: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--muted)' }}>
        {c.docId} — {c.clearance}
      </div>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, color: 'var(--text)', textAlign: 'center', flex: '1 1 240px' }}>
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
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, color: 'var(--text)' }}>
      <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Michael Misran — Product Designer & Lab
      </h1>

      <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.1em', color: 'var(--text2)', textAlign: 'center', marginBottom: 'var(--space-sm)' }}>
        {c.mastheadCenter}
      </div>

      <ChemiseEnTete c={c} count={projects.length} />

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ flex: isMobile ? '1 1 auto' : '0 0 240px' }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 64, lineHeight: 0.85, color: 'var(--text)', marginBottom: 6 }}>M.</div>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 24, color: 'var(--titre-lab)', lineHeight: 1, marginBottom: 'var(--space-xs)' }}>PORTFOLIO</div>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, letterSpacing: '0.03em', color: 'var(--text2)', marginBottom: 14 }}>{c.heroTag}</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '34ch', margin: '0 0 14px' }}>{c.heroDesc}</p>

          <FicheAgent c={c} count={projects.length} />
        </div>

        <NoteDeService c={c} lang={lang} />
      </div>

      <LatestIssue c={c} lang={lang} />

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-md)', marginBottom: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, letterSpacing: '0.04em', color: 'var(--text)' }}>{c.indexTitle}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--muted)' }}>{c.indexSub}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md) var(--space-sm)' }}>
        {projects.map((project, i) => (
          <ChemiseIndex key={project.slug} project={project} index={i} c={c} lang={lang} />
        ))}
      </div>

      <DocFooter c={c} />
    </div>
  )
}
