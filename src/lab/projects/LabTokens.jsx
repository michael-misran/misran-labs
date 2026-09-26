import { useState } from 'react'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

/* --- Confidentialité --------------------------------------------------- *
 * Cette page documente les tokens réels du Lab (src/styles/tokens.css).
 * Les noms, les valeurs et les références ci-dessous doivent rester
 * synchronisés avec ce fichier — c'est la seule autre source de vérité
 * qui existe pour ces valeurs. Si tokens.css change, cette liste change
 * avec, dans le même geste.
 * ------------------------------------------------------------------- */

const TIERS = ['primitive', 'semantic', 'component']

// Groupes de tokens. `pointsTo` est le token (ou la formule) que la
// définition référence réellement dans tokens.css — null pour une valeur
// brute qui ne pointe nulle part.
const TOKEN_GROUPS = [
  {
    category: { fr: 'Couleurs — primitives (crème)', en: 'Colors — primitives (cream)' },
    rows: [
      { name: '--primitive-cream-50', tier: 'primitive', type: 'color', pointsTo: null, value: '#f8f2e7' },
      { name: '--primitive-cream-100', tier: 'primitive', type: 'color', pointsTo: null, value: '#f3ebdc' },
      { name: '--primitive-cream-150', tier: 'primitive', type: 'color', pointsTo: null, value: '#efe4d0' },
      { name: '--primitive-cream-200', tier: 'primitive', type: 'color', pointsTo: null, value: '#e6dac4' },
      { name: '--primitive-cream-300', tier: 'primitive', type: 'color', pointsTo: null, value: '#d8c9ab' },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (encre)', en: 'Colors — primitives (ink)' },
    rows: [
      { name: '--primitive-ink-400', tier: 'primitive', type: 'color', pointsTo: null, value: '#8f8573' },
      { name: '--primitive-ink-600', tier: 'primitive', type: 'color', pointsTo: null, value: '#5b5044' },
      { name: '--primitive-ink-800', tier: 'primitive', type: 'color', pointsTo: null, value: '#2c231b' },
      { name: '--primitive-ink-850', tier: 'primitive', type: 'color', pointsTo: null, value: '#2a2018' },
      { name: '--primitive-ink-900', tier: 'primitive', type: 'color', pointsTo: null, value: '#241c16' },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (corail)', en: 'Colors — primitives (coral)' },
    rows: [
      { name: '--primitive-coral-400', tier: 'primitive', type: 'color', pointsTo: null, value: '#e26a50' },
      { name: '--primitive-coral-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#dd5a3e' },
      { name: '--primitive-coral-600', tier: 'primitive', type: 'color', pointsTo: null, value: '#c94f36' },
      { name: '--primitive-coral-700', tier: 'primitive', type: 'color', pointsTo: null, value: '#b8452e' },
      { name: '--primitive-coral-tint-100', tier: 'primitive', type: 'color', pointsTo: null, value: '#f5ddd2' },
      { name: '--primitive-coral-tint-200', tier: 'primitive', type: 'color', pointsTo: null, value: '#f0c3b4' },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (catégorielles)', en: 'Colors — primitives (categorical)' },
    rows: [
      { name: '--primitive-ochre-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#a9762c' },
      { name: '--primitive-plum-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#8c3b3a' },
      { name: '--primitive-rose-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#c97a6d' },
      { name: '--primitive-tangerine-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#e0862f' },
      { name: '--primitive-rust-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#b23324' },
      { name: '--primitive-amber-500', tier: 'primitive', type: 'color', pointsTo: null, value: '#c1861f' },
    ],
  },
  {
    category: { fr: 'Couleurs — rôles sémantiques', en: 'Colors — semantic roles' },
    rows: [
      { name: '--bg', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-100', value: '#f3ebdc' },
      { name: '--bg2', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-50', value: '#f8f2e7' },
      { name: '--bg3', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-200', value: '#e6dac4' },
      { name: '--primary', tier: 'semantic', type: 'color', pointsTo: '--primitive-coral-500', value: '#dd5a3e' },
      { name: '--on-primary', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-50', value: '#f8f2e7' },
      { name: '--cyan', tier: 'semantic', type: 'color', pointsTo: '--primitive-ochre-500', value: '#a9762c' },
      { name: '--violet', tier: 'semantic', type: 'color', pointsTo: '--primitive-plum-500', value: '#8c3b3a' },
      { name: '--pink', tier: 'semantic', type: 'color', pointsTo: '--primitive-rose-500', value: '#c97a6d' },
      { name: '--mandarine', tier: 'semantic', type: 'color', pointsTo: '--primitive-tangerine-500', value: '#e0862f' },
      { name: '--warning', tier: 'semantic', type: 'color', pointsTo: '--primitive-amber-500', value: '#c1861f' },
      { name: '--error', tier: 'semantic', type: 'color', pointsTo: '--primitive-rust-500', value: '#b23324' },
      { name: '--text', tier: 'semantic', type: 'color', pointsTo: '--primitive-ink-900', value: '#241c16' },
      { name: '--text2', tier: 'semantic', type: 'color', pointsTo: '--primitive-ink-600', value: '#5b5044' },
      { name: '--muted', tier: 'semantic', type: 'color', pointsTo: '--primitive-ink-400', value: '#8f8573' },
      { name: '--prose', tier: 'semantic', type: 'color', pointsTo: '--primitive-ink-800', value: '#2c231b' },
      { name: '--border', tier: 'semantic', type: 'color', pointsTo: '--primitive-ink-850', value: '#2a2018' },
      { name: '--grid-line', tier: 'semantic', type: 'color', pointsTo: null, value: 'rgba(36,28,22,.12)' },
      { name: '--active-tint', tier: 'semantic', type: 'color', pointsTo: null, value: 'rgba(221,90,62,.12)' },
      { name: '--hover-tint', tier: 'semantic', type: 'color', pointsTo: null, value: 'rgba(36,28,22,.05)' },
    ],
  },
  {
    category: { fr: 'Couleurs — surfaces', en: 'Colors — surfaces' },
    rows: [
      { name: '--surface-base', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-100', value: '#f3ebdc' },
      { name: '--surface-raised', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-50', value: '#f8f2e7' },
      { name: '--surface-inset', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-200', value: '#e6dac4' },
      { name: '--surface-pressed', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-300', value: '#d8c9ab' },
      { name: '--hover-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-150', value: '#efe4d0' },
      { name: '--selected-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-coral-500', value: '#dd5a3e' },
      { name: '--on-selected', tier: 'semantic', type: 'color', pointsTo: '--primitive-cream-50', value: '#f8f2e7' },
    ],
  },
  {
    category: { fr: 'Couleurs — composant (onglets de dossier)', en: 'Colors — component (dossier tabs)' },
    rows: [
      { name: '--case-tabs-tint-1', tier: 'component', type: 'color', pointsTo: '--mandarine, --bg3', value: 'color-mix 20%' },
      { name: '--case-tabs-tint-2', tier: 'component', type: 'color', pointsTo: '--violet, --bg3', value: 'color-mix 16%' },
      { name: '--case-tabs-tint-3', tier: 'component', type: 'color', pointsTo: '--pink, --bg3', value: 'color-mix 16%' },
      { name: '--case-tabs-tint-4', tier: 'component', type: 'color', pointsTo: '--warning, --bg3', value: 'color-mix 18%' },
      { name: '--case-tabs-tint-5', tier: 'component', type: 'color', pointsTo: '--cyan, --bg3', value: 'color-mix 16%' },
    ],
  },
  {
    category: { fr: 'Élévation', en: 'Elevation' },
    rows: [
      { name: '--elev-1', tier: 'semantic', type: 'elevation', pointsTo: null, value: 'none' },
      { name: '--elev-2', tier: 'semantic', type: 'elevation', pointsTo: '--border', value: '0 1px 0' },
      { name: '--elev-3', tier: 'semantic', type: 'elevation', pointsTo: '--border', value: '0 2px 0' },
      { name: '--elev-4', tier: 'semantic', type: 'elevation', pointsTo: null, value: '3px 3px 0 rgba(…,.18)' },
      { name: '--elev-5', tier: 'semantic', type: 'elevation', pointsTo: null, value: '5px 5px 0 rgba(…,.22)' },
      { name: '--elev-inset', tier: 'semantic', type: 'elevation', pointsTo: null, value: 'inset 0 1px 0 rgba(…,.18)' },
      { name: '--elev-pressed', tier: 'semantic', type: 'elevation', pointsTo: null, value: 'inset 0 2px 0 rgba(…,.25)' },
    ],
  },
  {
    category: { fr: 'Rayons & bordures', en: 'Radius & borders' },
    rows: [
      { name: '--radius-xs', tier: 'semantic', type: 'radius', pointsTo: null, value: '4px' },
      { name: '--radius-sm', tier: 'semantic', type: 'radius', pointsTo: null, value: '8px' },
      { name: '--radius-md', tier: 'semantic', type: 'radius', pointsTo: null, value: '10px' },
      { name: '--radius-lg', tier: 'semantic', type: 'radius', pointsTo: null, value: '16px' },
      { name: '--radius-xl', tier: 'semantic', type: 'radius', pointsTo: null, value: '24px' },
      { name: '--radius-pill', tier: 'semantic', type: 'radius', pointsTo: null, value: '999px' },
      { name: '--border-thin', tier: 'semantic', type: 'border', pointsTo: null, value: '1px' },
      { name: '--border-regular', tier: 'semantic', type: 'border', pointsTo: null, value: '1px' },
      { name: '--border-thick', tier: 'semantic', type: 'border', pointsTo: null, value: '2px' },
      { name: '--icon-stroke', tier: 'semantic', type: 'border', pointsTo: null, value: '1.5' },
    ],
  },
  {
    category: { fr: 'Typographie', en: 'Typography' },
    rows: [
      { name: '--font-heading', tier: 'semantic', type: 'font', pointsTo: null, value: "'Fraunces', Georgia, serif" },
      { name: '--font-body', tier: 'semantic', type: 'font', pointsTo: null, value: "'Work Sans', system-ui, sans-serif" },
      { name: '--font-mono', tier: 'semantic', type: 'font', pointsTo: null, value: "'JetBrains Mono', monospace" },
      { name: '--label-transform', tier: 'semantic', type: 'text', pointsTo: null, value: 'uppercase' },
      { name: '--label-tracking', tier: 'semantic', type: 'text', pointsTo: null, value: '0.1em' },
      { name: '--heading-transform', tier: 'semantic', type: 'text', pointsTo: null, value: 'none' },
      { name: '--heading-tracking', tier: 'semantic', type: 'text', pointsTo: null, value: '-0.01em' },
    ],
  },
  {
    category: { fr: 'Structure — espacement & icônes', en: 'Structure — spacing & icons' },
    rows: [
      { name: '--space-xs', tier: 'semantic', type: 'spacing', pointsTo: null, value: '8px' },
      { name: '--space-sm', tier: 'semantic', type: 'spacing', pointsTo: null, value: '12px' },
      { name: '--space-md', tier: 'semantic', type: 'spacing', pointsTo: null, value: '16px' },
      { name: '--space-lg', tier: 'semantic', type: 'spacing', pointsTo: null, value: '24px' },
      { name: '--space-xl', tier: 'semantic', type: 'spacing', pointsTo: null, value: '32px' },
      { name: '--icon-sm', tier: 'semantic', type: 'spacing', pointsTo: null, value: '16px' },
      { name: '--icon-md', tier: 'semantic', type: 'spacing', pointsTo: null, value: '20px' },
      { name: '--icon-lg', tier: 'semantic', type: 'spacing', pointsTo: null, value: '24px' },
      { name: '--chrome-height', tier: 'semantic', type: 'spacing', pointsTo: null, value: '32px' },
    ],
  },
]

const CONTENT = {
  fr: {
    title: 'Tokens du Lab',
    role: 'Documentation vivante — chaque ligne vient de src/styles/tokens.css',
    fileNo: 'DOSSIER Nº 007',
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'ID DOSSIER — ML-ARCHIVE-007',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    intro: "Trois niveaux, une règle : un token ne porte jamais une valeur brute s'il existe un niveau au-dessus de lui. Filtre par niveau pour isoler les primitives, les rôles sémantiques, ou les tokens propres à un seul composant.",
    filterLabel: 'FILTRER PAR NIVEAU',
    tierLabels: { primitive: 'Primitive', semantic: 'Semantic', component: 'Component' },
    columns: { name: 'Token', tier: 'Niveau', type: 'Type', pointsTo: 'Pointe vers', value: 'Valeur', preview: 'Aperçu', status: 'Statut' },
    empty: 'Aucun token pour ce filtre.',
    countLabel: (n) => `${n} tokens affichés`,
    violationCountLabel: (n) => `${n} erreur${n > 1 ? 's' : ''} détectée${n > 1 ? 's' : ''}`,
    violationLabels: { 'raw-value': 'Valeur brute' },
    violationTooltips: { 'raw-value': "Ce token sémantique porte une valeur brute au lieu de pointer vers une primitive — contraire à la règle du niveau au-dessus." },
  },
  en: {
    title: 'Lab Tokens',
    role: 'Living documentation — every row comes from src/styles/tokens.css',
    fileNo: 'FILE Nº 007',
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'DOCUMENT ID — ML-ARCHIVE-007',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    intro: "Three tiers, one rule: a token never carries a raw value if a tier exists above it. Filter by tier to isolate primitives, semantic roles, or tokens scoped to a single component.",
    filterLabel: 'FILTER BY TIER',
    tierLabels: { primitive: 'Primitive', semantic: 'Semantic', component: 'Component' },
    columns: { name: 'Token', tier: 'Tier', type: 'Type', pointsTo: 'Points to', value: 'Value', preview: 'Preview', status: 'Status' },
    empty: 'No token matches this filter.',
    countLabel: (n) => `${n} tokens shown`,
    violationCountLabel: (n) => `${n} error${n > 1 ? 's' : ''} detected`,
    violationLabels: { 'raw-value': 'Raw value' },
    violationTooltips: { 'raw-value': 'This semantic token carries a raw value instead of pointing to a primitive — against the tier-above rule.' },
  },
}

// La règle est sans exception : tout token semantic pointe vers une
// primitive. Elle ne dit rien du type — un premier passage ne vérifiait
// que les couleurs, en supposant que police/rayon/espacement n'avaient
// pas besoin d'un niveau primitive parce que ce niveau n'existe pas
// encore pour eux dans tokens.css. C'était une exception inventée pour
// combler un trou dans l'architecture, pas une lecture de la règle telle
// qu'énoncée. Elle est retirée ici : la règle s'applique à tout semantic,
// et c'est le manque de primitives pour ces catégories qui est l'erreur
// — pas quelque chose à masquer dans le détecteur.
function getViolation(row) {
  if (row.tier !== 'semantic') return null
  if (row.pointsTo) return null
  return 'raw-value'
}

const TIER_ACCENT = {
  primitive: 'var(--mandarine)',
  semantic: 'var(--primary)',
  component: 'var(--violet)',
}

function Swatch({ name }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 18,
        height: 18,
        flexShrink: 0,
        border: 'var(--border-thin) solid var(--border)',
        background: `var(${name})`,
      }}
    />
  )
}

function TierBadge({ tier, label }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: TIER_ACCENT[tier],
        border: `var(--border-thin) solid ${TIER_ACCENT[tier]}`,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function ViolationBadge({ label, title }) {
  return (
    <span
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--on-primary)',
        background: 'var(--error)',
        padding: '2px 6px',
        whiteSpace: 'nowrap',
        cursor: 'help',
      }}
    >
      ⚠ {label}
    </span>
  )
}

function FilterPill({ tier, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: active ? 'var(--text)' : 'var(--muted)',
        background: active ? 'var(--bg2)' : 'var(--bg3)',
        border: `var(--border-thin) solid ${active ? TIER_ACCENT[tier] : 'var(--border)'}`,
        padding: '7px 12px',
        cursor: 'pointer',
        fontWeight: active ? 700 : 400,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: active ? TIER_ACCENT[tier] : 'transparent',
          border: `1px solid ${TIER_ACCENT[tier]}`,
          flexShrink: 0,
        }}
      />
      {label}
    </button>
  )
}

export default function LabTokens({ project }) {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const c = CONTENT[lang] ?? CONTENT.fr
  const [activeTiers, setActiveTiers] = useState(() => new Set(TIERS))

  function toggleTier(tier) {
    setActiveTiers((prev) => {
      const next = new Set(prev)
      if (next.has(tier)) next.delete(tier)
      else next.add(tier)
      return next
    })
  }

  const visibleGroups = TOKEN_GROUPS.map((group) => ({
    ...group,
    rows: group.rows.filter((row) => activeTiers.has(row.tier)),
  })).filter((group) => group.rows.length > 0)

  const totalCount = visibleGroups.reduce((sum, g) => sum + g.rows.length, 0)
  const violationCount = visibleGroups.reduce(
    (sum, g) => sum + g.rows.filter((row) => getViolation(row)).length,
    0
  )

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c} />

      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 20px' }}>
        {c.intro}
      </p>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
          {c.filterLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TIERS.map((tier) => (
            <FilterPill
              key={tier}
              tier={tier}
              label={c.tierLabels[tier]}
              active={activeTiers.has(tier)}
              onClick={() => toggleTier(tier)}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', margin: '16px 0 8px' }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)' }}>
          {c.countLabel(totalCount)}
        </span>
        {violationCount > 0 && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--error)', fontWeight: 700 }}>
            ⚠ {c.violationCountLabel(violationCount)}
          </span>
        )}
      </div>

      <div style={{ overflowX: 'auto', border: 'var(--border-thin) solid var(--border)', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr>
              {['preview', 'name', 'tier', 'type', 'pointsTo', 'value', 'status'].map((key) => (
                <th
                  key={key}
                  style={{
                    textAlign: 'left',
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    background: 'var(--bg3)',
                    padding: '8px 12px',
                    borderBottom: 'var(--border-regular) solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.columns[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {totalCount === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 20, textAlign: 'center', fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--muted)' }}>
                  {c.empty}
                </td>
              </tr>
            )}
            {visibleGroups.map((group) => (
              <FragmentGroup key={group.category.fr} group={group} lang={lang} c={c} />
            ))}
          </tbody>
        </table>
      </div>

      <CaseFooter c={c} />
    </div>
  )
}

function FragmentGroup({ group, lang, c }) {
  return (
    <>
      <tr>
        <td
          colSpan={7}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            background: 'var(--bg2)',
            padding: '8px 12px',
            borderBottom: 'var(--border-thin) solid var(--border)',
            borderTop: 'var(--border-thin) solid var(--border)',
          }}
        >
          {group.category[lang] ?? group.category.fr}
        </td>
      </tr>
      {group.rows.map((row) => {
        const violation = getViolation(row)
        return (
        <tr key={row.name} style={violation ? { background: 'color-mix(in srgb, var(--error) 8%, transparent)' } : undefined}>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', borderLeft: violation ? 'var(--border-thick) solid var(--error)' : 'var(--border-thick) solid transparent' }}>
            {row.type === 'color' && <Swatch name={row.name} />}
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--text)', whiteSpace: 'nowrap' }}>
            {row.name}
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
            <TierBadge tier={row.tier} label={c.tierLabels[row.tier]} />
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
            {row.type}
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: row.pointsTo ? 'var(--text2)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
            {row.pointsTo ?? '—'}
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
            {row.value}
          </td>
          <td style={{ padding: '8px 12px', borderBottom: 'var(--border-thin) solid var(--border)', whiteSpace: 'nowrap' }}>
            {violation && <ViolationBadge label={c.violationLabels[violation]} title={c.violationTooltips[violation]} />}
          </td>
        </tr>
        )
      })}
    </>
  )
}
