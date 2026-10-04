import { useState } from 'react'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

/* --- Confidentialité --------------------------------------------------- *
 * Cette page documente les tokens réels du Lab (src/styles/tokens.css).
 * Les noms et les relations (tier, pointsTo) ci-dessous doivent rester
 * synchronisés avec ce fichier — c'est la seule autre source de vérité
 * qui existe pour ces relations. La valeur affichée, elle, n'est jamais
 * recopiée : elle est lue dans les variables CSS calculées au chargement
 * (getComputedStyle), donc toujours juste même si tokens.css change.
 * ------------------------------------------------------------------- */

const TIERS = ['primitive', 'semantic', 'component']

// Groupes de tokens. `pointsTo` est le token (ou la formule) que la
// définition référence réellement dans tokens.css — null pour une valeur
// brute qui ne pointe nulle part. Pas de `value` ici : lue en direct dans
// le navigateur (D4), jamais recopiée à la main dans ce fichier.
const TOKEN_GROUPS = [
  {
    category: { fr: 'Couleurs — primitives (papier)', en: 'Colors — primitives (paper)' },
    rows: [
      { name: '--primitive-papier-50', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-papier-100', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-papier-150', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-papier-200', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-papier-300', tier: 'primitive', type: 'color', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (encre, gris, filet)', en: 'Colors — primitives (ink, gray, rule)' },
    rows: [
      { name: '--primitive-encre', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-gris', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-gris-clair', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-filet', tier: 'primitive', type: 'color', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (les 5 titres de la maison)', en: 'Colors — primitives (the house’s 5 mastheads)' },
    rows: [
      { name: '--primitive-titre-gazette', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-titre-gazette-dark', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-titre-magazine', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-titre-zine', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-titre-jeux', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-titre-lab', tier: 'primitive', type: 'color', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (en-tête pulp)', en: 'Colors — primitives (pulp header)' },
    rows: [
      { name: '--primitive-kraft', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-kraft-ombre', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-rouge-pulp', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-rouge-pulp-fonce', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-creme-pulp', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-radioactif', tier: 'primitive', type: 'color', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Couleurs — primitives (catégorielles)', en: 'Colors — primitives (categorical)' },
    rows: [
      { name: '--primitive-ochre-500', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-plum-500', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-rose-500', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-tangerine-500', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-rust-500', tier: 'primitive', type: 'color', pointsTo: null },
      { name: '--primitive-amber-500', tier: 'primitive', type: 'color', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Dimensions — primitives', en: 'Dimensions — primitives' },
    rows: [
      { name: '--primitive-size-1', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-2', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-4', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-8', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-10', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-12', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-16', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-20', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-24', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-32', tier: 'primitive', type: 'dimension', pointsTo: null },
      { name: '--primitive-size-full', tier: 'primitive', type: 'dimension', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Polices — une par titre de la maison', en: 'Fonts — one per house masthead' },
    rows: [
      { name: '--font-gothique', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-unifraktur-maguntia' },
      { name: '--primitive-font-playfair-display', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--font-bd', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-comic-neue' },
      { name: '--font-pixel', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-press-start-2p' },
      { name: '--font-machine', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-special-elite' },
    ],
  },
  {
    category: { fr: 'Polices — en-tête pulp', en: 'Fonts — pulp header' },
    rows: [
      { name: '--font-pulp', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-bowlby-one-sc' },
      { name: '--font-affiche', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-bangers' },
      { name: '--font-bandeau', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-anton' },
    ],
  },
  {
    category: { fr: 'Polices — primitives (autres)', en: 'Fonts — primitives (other)' },
    rows: [
      { name: '--primitive-font-ultra', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-alfa-slab-one', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-rye', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-oswald', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-vt323', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-crimson-pro', tier: 'primitive', type: 'font', pointsTo: null },
      { name: '--primitive-font-ibm-plex-mono', tier: 'primitive', type: 'font', pointsTo: null },
    ],
  },
  {
    category: { fr: 'Couleurs — rôles sémantiques', en: 'Colors — semantic roles' },
    rows: [
      { name: '--bg', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-100' },
      { name: '--bg2', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-50' },
      { name: '--bg3', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-200' },
      { name: '--primary', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-gazette' },
      { name: '--primary-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-gazette-dark' },
      { name: '--on-primary-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-50' },
      { name: '--cyan', tier: 'semantic', type: 'color', pointsTo: '--primitive-ochre-500' },
      { name: '--violet', tier: 'semantic', type: 'color', pointsTo: '--primitive-plum-500' },
      { name: '--pink', tier: 'semantic', type: 'color', pointsTo: '--primitive-rose-500' },
      { name: '--mandarine', tier: 'semantic', type: 'color', pointsTo: '--primitive-tangerine-500' },
      { name: '--warning', tier: 'semantic', type: 'color', pointsTo: '--primitive-amber-500' },
      { name: '--error', tier: 'semantic', type: 'color', pointsTo: '--primitive-rust-500' },
      { name: '--text', tier: 'semantic', type: 'color', pointsTo: '--primitive-encre' },
      { name: '--text2', tier: 'semantic', type: 'color', pointsTo: '--primitive-gris' },
      { name: '--muted', tier: 'semantic', type: 'color', pointsTo: '--primitive-gris-clair' },
      { name: '--prose', tier: 'semantic', type: 'color', pointsTo: '--primitive-encre' },
      { name: '--border', tier: 'semantic', type: 'color', pointsTo: '--primitive-encre' },
      { name: '--grid-line', tier: 'semantic', type: 'color', pointsTo: '--primitive-encre-a12' },
      { name: '--active-tint', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-gazette-a12' },
      { name: '--hover-tint', tier: 'semantic', type: 'color', pointsTo: '--primitive-encre-a05' },
    ],
  },
  {
    category: { fr: 'Couleurs — les 5 titres de la maison (rôles)', en: 'Colors — the house’s 5 mastheads (roles)' },
    rows: [
      { name: '--titre-gazette', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-gazette' },
      { name: '--titre-magazine', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-magazine' },
      { name: '--titre-zine', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-zine' },
      { name: '--titre-jeux', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-jeux' },
      { name: '--titre-lab', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-lab' },
    ],
  },
  {
    category: { fr: 'Couleurs — surfaces', en: 'Colors — surfaces' },
    rows: [
      { name: '--surface-base', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-100' },
      { name: '--surface-raised', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-50' },
      { name: '--surface-inset', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-200' },
      { name: '--surface-pressed', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-300' },
      { name: '--hover-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-150' },
      { name: '--selected-surface', tier: 'semantic', type: 'color', pointsTo: '--primitive-titre-gazette-dark' },
      { name: '--on-selected', tier: 'semantic', type: 'color', pointsTo: '--primitive-papier-50' },
    ],
  },
  {
    category: { fr: 'Couleurs — composant (onglets de dossier)', en: 'Colors — component (dossier tabs)' },
    rows: [
      { name: '--case-tabs-tint-1', tier: 'component', type: 'color', pointsTo: '--mandarine, --bg3' },
      { name: '--case-tabs-tint-2', tier: 'component', type: 'color', pointsTo: '--violet, --bg3' },
      { name: '--case-tabs-tint-3', tier: 'component', type: 'color', pointsTo: '--pink, --bg3' },
      { name: '--case-tabs-tint-4', tier: 'component', type: 'color', pointsTo: '--warning, --bg3' },
      { name: '--case-tabs-tint-5', tier: 'component', type: 'color', pointsTo: '--cyan, --bg3' },
    ],
  },
  {
    category: { fr: 'Couleurs — composant (en-tête pulp)', en: 'Colors — component (pulp header)' },
    rows: [
      { name: '--masthead-bandeau', tier: 'component', type: 'color', pointsTo: '--primitive-rouge-pulp' },
      { name: '--masthead-fond', tier: 'component', type: 'color', pointsTo: '--primitive-kraft' },
      { name: '--masthead-fond-ombre', tier: 'component', type: 'color', pointsTo: '--primitive-kraft-ombre' },
      { name: '--masthead-lettre', tier: 'component', type: 'color', pointsTo: '--primitive-creme-pulp' },
      { name: '--masthead-ombre', tier: 'component', type: 'color', pointsTo: '--primitive-rouge-pulp-fonce' },
      { name: '--masthead-encre', tier: 'component', type: 'color', pointsTo: '--primitive-encre' },
      { name: '--masthead-radioactif', tier: 'component', type: 'color', pointsTo: '--primitive-radioactif' },
    ],
  },
  {
    category: { fr: 'Élévation', en: 'Elevation' },
    rows: [
      { name: '--primitive-shadow-none', tier: 'primitive', type: 'elevation', pointsTo: null },
      { name: '--elev-1', tier: 'semantic', type: 'elevation', pointsTo: '--primitive-shadow-none' },
      { name: '--elev-2', tier: 'semantic', type: 'elevation', pointsTo: '--border' },
      { name: '--elev-3', tier: 'semantic', type: 'elevation', pointsTo: '--border' },
      { name: '--elev-4', tier: 'semantic', type: 'elevation', pointsTo: '--primitive-encre-a18' },
      { name: '--elev-5', tier: 'semantic', type: 'elevation', pointsTo: '--primitive-encre-a22' },
      { name: '--elev-inset', tier: 'semantic', type: 'elevation', pointsTo: '--primitive-encre-a18' },
      { name: '--elev-pressed', tier: 'semantic', type: 'elevation', pointsTo: '--primitive-encre-a25' },
    ],
  },
  {
    category: { fr: 'Rayons & bordures', en: 'Radius & borders' },
    rows: [
      { name: '--radius-xs', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-4' },
      { name: '--radius-sm', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-8' },
      { name: '--radius-md', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-10' },
      { name: '--radius-lg', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-16' },
      { name: '--radius-xl', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-24' },
      { name: '--radius-pill', tier: 'semantic', type: 'radius', pointsTo: '--primitive-size-full' },
      { name: '--border-thin', tier: 'semantic', type: 'border', pointsTo: '--primitive-size-1' },
      { name: '--border-regular', tier: 'semantic', type: 'border', pointsTo: '--primitive-size-1' },
      { name: '--border-thick', tier: 'semantic', type: 'border', pointsTo: '--primitive-size-2' },
      { name: '--icon-stroke', tier: 'semantic', type: 'border', pointsTo: '--primitive-stroke-1-5' },
    ],
  },
  {
    category: { fr: 'Typographie', en: 'Typography' },
    rows: [
      { name: '--font-heading', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-alfa-slab-one' },
      { name: '--font-body', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-crimson-pro' },
      { name: '--font-mono', tier: 'semantic', type: 'font', pointsTo: '--primitive-font-ibm-plex-mono' },
      { name: '--label-transform', tier: 'semantic', type: 'text', pointsTo: '--primitive-case-upper' },
      { name: '--label-tracking', tier: 'semantic', type: 'text', pointsTo: '--primitive-tracking-wide' },
      { name: '--heading-transform', tier: 'semantic', type: 'text', pointsTo: '--primitive-case-none' },
      { name: '--heading-tracking', tier: 'semantic', type: 'text', pointsTo: '--primitive-tracking-tight' },
    ],
  },
  {
    category: { fr: 'Structure — espacement & icônes', en: 'Structure — spacing & icons' },
    rows: [
      { name: '--space-3xs', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-2' },
      { name: '--space-2xs', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-4' },
      { name: '--space-xs', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-8' },
      { name: '--space-xs-plus', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-10' },
      { name: '--space-sm', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-12' },
      { name: '--space-md', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-16' },
      { name: '--space-md-plus', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-20' },
      { name: '--space-lg', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-24' },
      { name: '--space-xl', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-32' },
      { name: '--icon-sm', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-16' },
      { name: '--icon-md', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-20' },
      { name: '--icon-lg', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-24' },
      { name: '--chrome-height', tier: 'semantic', type: 'spacing', pointsTo: '--primitive-size-32' },
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
    concept: "Misran Labs est une maison d'édition : chaque rubrique (Gazette, Magazine, Zine, Jeux, Lab) est un titre avec sa propre couleur et sa propre police — un univers par titre, sur le même papier et la même encre. Les valeurs ci-dessous sont lues en direct dans le navigateur : si tokens.css change, cette page change avec, sans qu'on ait à la retoucher.",
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
    concept: "Misran Labs is a publishing house: each section (Gazette, Magazine, Zine, Jeux, Lab) is a masthead with its own color and its own font — one world per masthead, on the same paper and ink. The values below are read live in the browser: if tokens.css changes, this page changes with it, with nothing to touch here.",
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
// pas besoin d'un niveau primitive parce que ce niveau n'existait pas
// encore pour eux dans tokens.css. C'était une exception inventée pour
// combler un trou dans l'architecture, pas une lecture de la règle telle
// qu'énoncée. Elle a été retirée : la règle s'applique à tout semantic.
// Le trou a ensuite été comblé à la source — primitives de dimensions,
// polices, texte et couleurs transparentes — plutôt que masqué ici.
// Pour une ombre, c'est sa couleur qui pointe vers une primitive ; les
// décalages restent littéraux.
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
        padding: 'var(--space-3xs) 6px',
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
        gap: 'var(--space-2xs)',
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--on-primary-surface)',
        background: 'var(--error)',
        padding: 'var(--space-3xs) 6px',
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
        padding: '7px var(--space-sm)',
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

// Lit chaque token une fois dans les variables CSS calculées (D4) : jamais
// de valeur recopiée à la main, donc jamais de désynchro avec tokens.css.
// Calculé dans l'initialiseur paresseux de useState — pas un effet : la
// page est rendue côté client dès le premier rendu, le DOM est déjà là.
function computeValues() {
  if (typeof window === 'undefined') return {}
  const computed = getComputedStyle(document.documentElement)
  const next = {}
  for (const group of TOKEN_GROUPS) {
    for (const row of group.rows) {
      next[row.name] = computed.getPropertyValue(row.name).trim()
    }
  }
  return next
}

export default function LabTokens({ project }) {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const c = CONTENT[lang] ?? CONTENT.fr
  const [activeTiers, setActiveTiers] = useState(() => new Set(TIERS))
  const [values] = useState(computeValues)

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
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c} />

      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 var(--space-sm)' }}>
        {c.intro}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 var(--space-md-plus)' }}>
        {c.concept}
      </p>

      <div style={{ marginBottom: 'var(--space-xs)' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>
          {c.filterLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', alignItems: 'center', margin: 'var(--space-md) 0 var(--space-xs)' }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)' }}>
          {c.countLabel(totalCount)}
        </span>
        {violationCount > 0 && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--error)', fontWeight: 700 }}>
            ⚠ {c.violationCountLabel(violationCount)}
          </span>
        )}
      </div>

      {/* Noms de tokens et « pointe vers » vont à la ligne : la colonne Valeur reste visible sans défilement sur ordinateur */}
      <div style={{ overflowX: 'auto', border: 'var(--border-thin) solid var(--border)', marginBottom: 'var(--space-xl)' }}>
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
                    padding: 'var(--space-xs) var(--space-sm)',
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
                <td colSpan={7} style={{ padding: 'var(--space-md-plus)', textAlign: 'center', fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--muted)' }}>
                  {c.empty}
                </td>
              </tr>
            )}
            {visibleGroups.map((group) => (
              <FragmentGroup key={group.category.fr} group={group} lang={lang} c={c} values={values} />
            ))}
          </tbody>
        </table>
      </div>

      <CaseFooter c={c} />
    </div>
  )
}

function FragmentGroup({ group, lang, c, values }) {
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
            padding: 'var(--space-xs) var(--space-sm)',
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
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', borderLeft: violation ? 'var(--border-thick) solid var(--error)' : 'var(--border-thick) solid transparent' }}>
            {row.type === 'color'
              ? <Swatch name={row.name} />
              : <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)' }}>—</span>}
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--text)', overflowWrap: 'anywhere' }}>
            {row.name}
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)' }}>
            <TierBadge tier={row.tier} label={c.tierLabels[row.tier]} />
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
            {row.type}
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: row.pointsTo ? 'var(--text2)' : 'var(--muted)', overflowWrap: 'anywhere' }}>
            {row.pointsTo ?? '—'}
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', whiteSpace: 'nowrap', maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis' }} title={values[row.name] || undefined}>
            {values[row.name] || '—'}
          </td>
          <td style={{ padding: 'var(--space-xs) var(--space-sm)', borderBottom: 'var(--border-thin) solid var(--border)', whiteSpace: 'nowrap' }}>
            {violation && <ViolationBadge label={c.violationLabels[violation]} title={c.violationTooltips[violation]} />}
          </td>
        </tr>
        )
      })}
    </>
  )
}
