import { useState } from 'react'
import Section from '../../design-system/Section'
import SectionTitle from '../../design-system/SectionTitle'
import FieldLabel from '../../design-system/FieldLabel'
import Tag from '../../design-system/Tag'
import IconButton from '../../design-system/IconButton'
import ThemeSwatch from '../ThemeSwatch'
import { CaseMasthead, CaseHero, CaseTabs, CaseFooter } from '../CaseFile'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

function RoleCard({ name, spec, usage, children }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: 'var(--border-thin) solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ minHeight: 44, display: 'flex', alignItems: 'center' }}>{children}</div>
      <div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', marginBottom: 2 }}>{spec}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)' }}>{usage}</div>
      </div>
    </div>
  )
}

function FontCard({ family, cssFamily, role, usage, weights }) {
  return (
    <div style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 24 }}>
      <div style={{ fontFamily: cssFamily, fontSize: 48, fontWeight: 600, color: 'var(--text)', lineHeight: 1, marginBottom: 18 }}>
        Aa
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{family}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', marginBottom: 10 }}>{role}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 8 }}>{usage}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)' }}>{weights}</div>
    </div>
  )
}

function PaletteSwatch({ name, varName }) {
  return (
    <div style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{ height: 56, background: `var(${varName})` }} />
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--text2)' }}>{varName}</div>
      </div>
    </div>
  )
}

function ColorRole({ varName, name, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: `var(${varName})`, flexShrink: 0, marginTop: 2, border: 'var(--border-thin) solid var(--border)' }} />
      <div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  )
}

function UpdateCard({ date, title, desc }) {
  return (
    <div style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 20 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>{date}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  )
}

function RoadmapCard({ version, statusLabel, statusColor, items }) {
  return (
    <div style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 20, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
          {version}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: statusColor,
            border: `var(--border-thin) solid ${statusColor}`,
            borderRadius: 'var(--radius-xs)',
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          {statusLabel}
        </span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}

function NavCard({ title, desc, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-raised)',
        boxShadow: hovered ? 'var(--elev-4)' : 'var(--elev-3)',
        border: 'none',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-lg)',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'box-shadow 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{title}</span>
        <span style={{ color: 'var(--primary)' }}>→</span>
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</span>
    </button>
  )
}

const CONTENT = {
  fr: {
    badge: 'Design System',
    title: 'Design System',
    heroTitle: 'Design System',
    heroSubtitle: "Design system du Lab.",
    fileNo: 'DOSSIER Nº 003',
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'ID DOSSIER — ML-ARCHIVE-003',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    tabs: [
      { id: 'overview', label: 'Vue d’ensemble' },
      { id: 'colors', label: 'Couleurs' },
      { id: 'fonts', label: 'Typographies' },
      { id: 'spacing', label: 'Espacement' },
      { id: 'tokens', label: 'Tokens' },
      { id: 'roadmap', label: 'Roadmap' },
    ],
    overviewTitle: 'Contexte',
    overviewBody: [
      "Je ne passe pas par un logiciel de design (Figma, Sketch…) pour faire des maquettes avant de coder. Le design system se construit en vibe coding : je décris ce que je veux à un assistant IA, qui écrit et modifie le code directement, à partir du fichier de tokens src/styles/tokens.css et des composants du dossier src/design-system/ (Section.jsx, SectionTitle.jsx, FieldLabel.jsx, Tag.jsx). Pas de maquette séparée du code — le code est la maquette.",
    ],
    updatesTitle: 'Dernières mises à jour',
    updates: [
      { date: '25 août 2026', title: 'Bouton icône unifié', desc: "Une seule règle pour tout bouton icône interactif du shell (langue, thème, repli du menu…) : transparent au repos, carré var(--hover-surface) (radius 6px) au survol. src/design-system/IconButton.jsx." },
      { date: '21 août 2026', title: 'Structure en onglets', desc: "Vue d'ensemble, Couleurs, Typographies, Espacement — plutôt qu'une seule longue page." },
      { date: '21 août 2026', title: 'Rôles de couleur documentés', desc: "Chaque couleur du Lab associée à ce qu'elle veut dire, pas juste sa valeur hexadécimale." },
      { date: '21 août 2026', title: 'FieldLabel et Tag extraits', desc: "Deux duplications de plus supprimées en creusant l'audit — 15 occurrences pour le seul label de champ." },
    ],
    nextTitle: 'Prochaines étapes',
    next: [
      { tab: 'colors', title: 'Couleurs', desc: 'La palette du kit actif, ce que chaque couleur signifie, et sa portée inversée côte à côte.' },
      { tab: 'fonts', title: 'Typographies', desc: 'Les 3 polices du Lab et les rôles qui en découlent.' },
      { tab: 'spacing', title: 'Espacement', desc: 'La règle qui garde un écart identique entre toutes les sections.' },
    ],
    fontsTitle: 'Typographies',
    fontsIntro: "Trois polices, trois rôles distincts. Aucune ne doit empiéter sur le rôle d'une autre — c'est ce qui évite qu'un titre et un label se ressemblent, ou qu'un même rôle finisse rendu différemment à deux endroits.",
    fonts: [
      { family: 'Fraunces', cssFamily: "var(--font-heading)", role: 'DISPLAY — TITRES', usage: 'Titres de page et de card. Une police avec du caractère, réservée aux moments où on veut marquer une hiérarchie forte.', weights: '600 / 900' },
      { family: 'Work Sans', cssFamily: "var(--font-body)", role: 'CORPS DE TEXTE — LECTURE', usage: 'Paragraphes, texte courant. Optimisée pour la lisibilité à petite taille, sur écran.', weights: '400 / 600' },
      { family: 'JetBrains Mono', cssFamily: "var(--font-mono)", role: 'TECHNIQUE — LABELS, TAGS, CODE', usage: 'Titres de section ("// TITRE"), labels de champ, tags, badges. Tout ce qui a une saveur technique ou système.', weights: '400 / 600 / 700' },
    ],
    rolesTitle: 'Rôles typographiques',
    rolesIntro: "Chaque rôle utilisé plus d'une fois dans le Lab est extrait en composant. Le nom du rôle, le spécimen rendu avec son vrai style, et où il vit dans le code.",
    roles: [
      { name: 'Titre de page', spec: 'Fraunces · 34px · 700', usage: 'src/lab/CaseFile.jsx (CaseHero h1)', render: 'pageTitle', text: 'Titre de page' },
      { name: 'Titre de section', spec: 'JetBrains Mono · 12px · principal', usage: 'src/design-system/SectionTitle.jsx', render: 'sectionTitle', text: 'Titre de section' },
      { name: 'Corps de texte', spec: 'Work Sans · 14px · 1.7', usage: 'src/lab/CaseStudyLayout.jsx (Section)', render: 'body', text: "Un paragraphe de lecture, comme celui-ci." },
      { name: 'Label de champ', spec: 'JetBrains Mono · 9px · muted', usage: 'src/design-system/FieldLabel.jsx', render: 'fieldLabel', text: 'RÔLE' },
      { name: 'Tag', spec: 'JetBrains Mono · 10px · couleur paramétrable', usage: 'src/design-system/Tag.jsx', render: 'tag', text: 'React' },
      { name: 'Bouton icône', spec: '25×25 · transparent · var(--hover-surface) au survol · radius 6px', usage: 'src/design-system/IconButton.jsx', render: 'iconButton', text: '' },
    ],
    spacingTitle: 'Espacement entre sections',
    spacingBody: "Chaque section (le titre + son contenu) est enveloppée par src/design-system/Section.jsx, qui fixe l'espace après la section à 40px. Avant, certaines sections définissaient cette marge elles-mêmes et d'autres l'oubliaient. Maintenant une seule règle, appliquée automatiquement partout où Section est utilisé.",
    colorsTitle: 'Couleurs',
    colorsIntro: "Comme pour la typographie : la palette brute, puis ce que chaque couleur veut dire, puis comment ça se comporte selon le thème.",
    paletteTitle: 'Palette',
    paletteIntro: "Les tokens CSS du thème actif — src/styles/tokens.css. Changer une valeur ici change tout le site.",
    palette: [
      { name: 'Fond', varName: '--bg' },
      { name: 'Fond secondaire', varName: '--bg2' },
      { name: 'Fond tertiaire', varName: '--bg3' },
      { name: 'Principal', varName: '--primary' },
      { name: 'Cyan', varName: '--cyan' },
      { name: 'Violet', varName: '--violet' },
      { name: 'Rose', varName: '--pink' },
      { name: 'Mandarine', varName: '--mandarine' },
      { name: 'Avertissement', varName: '--warning' },
      { name: 'Erreur', varName: '--error' },
      { name: 'Texte', varName: '--text' },
      { name: 'Texte secondaire', varName: '--text2' },
      { name: 'Muted', varName: '--muted' },
      { name: 'Bordure', varName: '--border' },
    ],
    colorRolesTitle: 'Rôles de couleur',
    colorRolesIntro: "Ce que chaque couleur veut dire, pas juste sa valeur — c'est ce qui évite qu'une couleur soit réutilisée pour un sens contradictoire d'un endroit à l'autre.",
    colorRoles: [
      { varName: '--primary', name: 'Accent principal', desc: "Interactif, actif, validé — liens, boutons, statut « fait »." },
      { varName: '--cyan', name: 'Accent secondaire', desc: "Deuxième teinte d'accent, utilisée pour distinguer une catégorie de l'accent principal (ex : un warning contextuel dans SessionReplay)." },
      { varName: '--violet', name: 'Catégorielle', desc: "Couleur dédiée à une catégorie spécifique parmi plusieurs (types de contrat, étapes de méthode…), pas un sens fixe en soi." },
      { varName: '--pink', name: 'Catégorielle', desc: "Autre couleur de la même famille catégorielle, pour distinguer visuellement plusieurs options d'un même menu." },
      { varName: '--warning', name: 'Attention', desc: "Statut intermédiaire ou à surveiller — facture en attente, candidature envoyée sans réponse." },
      { varName: '--error', name: 'Négatif', desc: "Refus, échec, action destructive." },
      { varName: '--text', name: 'Texte principal', desc: "Contenu le plus important de l'écran." },
      { varName: '--text2', name: 'Texte secondaire', desc: "Contenu de support — métadonnées, descriptions." },
      { varName: '--muted', name: 'Texte discret', desc: "Labels de champ, statut neutre ou non applicable." },
      { varName: '--border', name: 'Séparateur', desc: "Contours de champs et de cards, lignes de séparation." },
    ],
    schemesTitle: 'Thèmes',
    schemesIntro: "Les mêmes rôles, deux jeux de valeurs — sombre et clair, côte à côte.",
    tokensTitle: 'Tokens',
    tokensIntro: "Tous les tokens définis dans src/styles/tokens.css, avec où et comment ils sont réellement utilisés dans le code — pas juste leur valeur.",
    tokens: [
      { varName: '--bg', type: 'color', usage: 'Fond de la page et du shell principal.' },
      { varName: '--bg2', type: 'color', usage: "Fond des cards et panels (RoleCard, FontCard, diagrammes)." },
      { varName: '--bg3', type: 'color', usage: 'Fond des menus — Sidebar, menu secondaire, Statusbar.' },
      { varName: '--primary', type: 'color', usage: 'Accent principal — liens, icônes actives, statut « fait ».' },
      { varName: '--cyan', type: 'color', usage: "Accent secondaire — distingue une catégorie de l'accent principal (SessionReplay)." },
      { varName: '--violet', type: 'color', usage: 'Couleur catégorielle, sans sens fixe — définie mais pas encore consommée ailleurs dans le code.' },
      { varName: '--pink', type: 'color', usage: 'Autre couleur catégorielle, même famille que --violet — définie mais pas encore consommée ailleurs dans le code.' },
      { varName: '--mandarine', type: 'color', usage: "Listée dans la palette mais pas encore appliquée ailleurs dans l'UI." },
      { varName: '--warning', type: 'color', usage: 'Statut intermédiaire ou point d’attention — sévérité « majeure » du changelog, notes de décision (TheLostCauldronGame, SessionReplay).' },
      { varName: '--error', type: 'color', usage: 'Refus, échec, action destructive — défini mais pas encore déclenché ailleurs dans le code.' },
      { varName: '--text', type: 'color', usage: 'Texte principal — titres, contenu, labels de menu.' },
      { varName: '--text2', type: 'color', usage: 'Texte secondaire — métadonnées, descriptions.' },
      { varName: '--muted', type: 'color', usage: 'Texte discret — labels de champ (FieldLabel), statut neutre.' },
      { varName: '--prose', type: 'color', usage: 'Texte de paragraphe long (Section, CV, Home).' },
      { varName: '--border', type: 'color', usage: 'Contours de champs et de cards, lignes de séparation.' },
      { varName: '--grid-line', type: 'color', usage: 'Grille décorative de fond — définie mais pas encore consommée ailleurs dans le code.' },
      { varName: '--active-tint', type: 'color', usage: 'Fond des items de menu sélectionnés (Sidebar, menu secondaire, Tag).' },
      { varName: '--hover-tint', type: 'color', usage: 'Fond au survol des items de menu (Sidebar, menu secondaire).' },
      { varName: '--font-heading', type: 'font', cssFamily: "var(--font-heading)", usage: 'Police des titres (Fraunces) — h1 de page, planche héro, cards.' },
      { varName: '--font-body', type: 'font', cssFamily: "var(--font-body)", usage: 'Police du corps de texte (Work Sans) — paragraphes, labels, contenu courant.' },
      { varName: '--font-mono', type: 'font', cssFamily: "var(--font-mono)", usage: 'Police technique (JetBrains Mono) — titres de section, tags, labels de champ, code.' },
    ],
    roadmapTitle: 'Roadmap',
    roadmapIntro: "Pas d'engagement de date — chaque étape ne démarre qu'une fois la précédente jugée nécessaire.",
    roadmap: [
      {
        version: 'Design Token',
        statusLabel: 'ENVISAGÉ',
        statusColor: 'var(--muted)',
        items: [
          "Architecture à 3 niveaux : primitive (valeurs brutes, sans signification, ex : --teal-500, --sepia-600, --ink-900) → semantic (rôle, ex : --primary, qui référence la bonne primitive selon le thème) → component (rôle d'un composant précis, ex : --button-bg qui référence le semantic).",
          "Aujourd'hui tokens.css saute l'étape primitive : chaque token va directement du nom sémantique (--primary, --text…) à la valeur hex codée en dur par thème, sans couche de valeurs brutes en dessous.",
          "L'intérêt de la couche component : un bouton pourrait diverger d'un rôle partagé (ex : sa bordure) sans dupliquer une valeur brute ni casser les autres usages de ce même rôle ailleurs dans l'appli.",
          "Style Dictionary (outil open-source d'Amazon) pourrait générer ces tokens depuis une seule source JSON/YAML vers plusieurs formats — CSS, SCSS, JS, XML Android, Swift iOS. Pas retenu pour l'instant : M.Labs est un seul projet web avec des tokens écrits à la main dans tokens.css — ça ajouterait une dépendance npm et une étape de build pour un problème de synchronisation multi-plateforme qu'on n'a pas.",
        ],
      },
    ],
  },
  en: {
    badge: 'Design System',
    title: 'Design System',
    heroTitle: 'Design System',
    heroSubtitle: "The Lab's design system.",
    fileNo: 'FILE Nº 003',
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'DOCUMENT ID — ML-ARCHIVE-003',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'colors', label: 'Colors' },
      { id: 'fonts', label: 'Fonts' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'tokens', label: 'Tokens' },
      { id: 'roadmap', label: 'Roadmap' },
    ],
    overviewTitle: 'Context',
    overviewBody: [
      "I don't go through design software (Figma, Sketch…) to make mockups before coding. The design system is built by vibe coding: I describe what I want to an AI assistant, which writes and edits the code directly, drawing on the tokens file src/styles/tokens.css and the components in src/design-system/ (Section.jsx, SectionTitle.jsx, FieldLabel.jsx, Tag.jsx). No mockup separate from the code — the code is the mockup.",
    ],
    updatesTitle: 'Latest updates',
    updates: [
      { date: 'Aug 25, 2026', title: 'Unified icon button', desc: 'One rule for every interactive icon button in the shell (language, theme, menu collapse…): transparent at rest, var(--hover-surface) square (6px radius) on hover. src/design-system/IconButton.jsx.' },
      { date: 'Aug 21, 2026', title: 'Tabbed structure', desc: 'Overview, Colors, Fonts, Spacing — instead of one long page.' },
      { date: 'Aug 21, 2026', title: 'Color roles documented', desc: "Every color in the Lab paired with what it means, not just its hex value." },
      { date: 'Aug 21, 2026', title: 'FieldLabel and Tag extracted', desc: 'Two more duplications removed while auditing — 15 occurrences for the field label alone.' },
    ],
    nextTitle: 'Next steps',
    next: [
      { tab: 'colors', title: 'Colors', desc: 'The active kit’s palette, what each color means, and its inverted scope side by side.' },
      { tab: 'fonts', title: 'Fonts', desc: "The Lab's 3 typefaces and the roles built on top of them." },
      { tab: 'spacing', title: 'Spacing', desc: 'The rule that keeps the gap identical across every section.' },
    ],
    fontsTitle: 'Fonts',
    fontsIntro: "Three typefaces, three distinct roles. None should encroach on another's job — that's what keeps a heading and a label from looking alike, or the same role rendering differently in two places.",
    fonts: [
      { family: 'Fraunces', cssFamily: "var(--font-heading)", role: 'DISPLAY — HEADINGS', usage: 'Page and card titles. A typeface with character, reserved for moments that need a strong hierarchy.', weights: '600 / 900' },
      { family: 'Work Sans', cssFamily: "var(--font-body)", role: 'BODY — READING', usage: 'Paragraphs, running text. Optimized for legibility at small sizes, on screen.', weights: '400 / 600' },
      { family: 'JetBrains Mono', cssFamily: "var(--font-mono)", role: 'TECHNICAL — LABELS, TAGS, CODE', usage: 'Section titles ("// TITLE"), field labels, tags, badges. Anything with a technical or system flavor.', weights: '400 / 600 / 700' },
    ],
    rolesTitle: 'Typographic roles',
    rolesIntro: "Every role used more than once in the Lab is extracted into a component. The role name, the specimen rendered with its actual style, and where it lives in the code.",
    roles: [
      { name: 'Page title', spec: 'Fraunces · 34px · 700', usage: 'src/lab/CaseFile.jsx (CaseHero h1)', render: 'pageTitle', text: 'Page title' },
      { name: 'Section title', spec: 'JetBrains Mono · 12px · primary', usage: 'src/design-system/SectionTitle.jsx', render: 'sectionTitle', text: 'Section title' },
      { name: 'Body text', spec: 'Work Sans · 14px · 1.7', usage: 'src/lab/CaseStudyLayout.jsx (Section)', render: 'body', text: 'A paragraph of reading text, like this one.' },
      { name: 'Field label', spec: 'JetBrains Mono · 9px · muted', usage: 'src/design-system/FieldLabel.jsx', render: 'fieldLabel', text: 'ROLE' },
      { name: 'Tag', spec: 'JetBrains Mono · 10px · configurable color', usage: 'src/design-system/Tag.jsx', render: 'tag', text: 'React' },
      { name: 'Icon button', spec: '25×25 · transparent · var(--hover-surface) on hover · 6px radius', usage: 'src/design-system/IconButton.jsx', render: 'iconButton', text: '' },
    ],
    spacingTitle: 'Spacing between sections',
    spacingBody: "Every section (the title plus its content) is wrapped by src/design-system/Section.jsx, which fixes the gap after the section at 40px. Before, some sections defined that margin themselves and others forgot to. Now there's one rule, applied automatically wherever Section is used.",
    colorsTitle: 'Colors',
    colorsIntro: "Same as typography: the raw palette, then what each color means, then how it behaves per theme.",
    paletteTitle: 'Palette',
    paletteIntro: "The active theme's CSS tokens — src/styles/tokens.css. Change a value here and the whole site follows.",
    palette: [
      { name: 'Background', varName: '--bg' },
      { name: 'Background 2', varName: '--bg2' },
      { name: 'Background 3', varName: '--bg3' },
      { name: 'Primary', varName: '--primary' },
      { name: 'Cyan', varName: '--cyan' },
      { name: 'Violet', varName: '--violet' },
      { name: 'Pink', varName: '--pink' },
      { name: 'Mandarine', varName: '--mandarine' },
      { name: 'Warning', varName: '--warning' },
      { name: 'Error', varName: '--error' },
      { name: 'Text', varName: '--text' },
      { name: 'Text 2', varName: '--text2' },
      { name: 'Muted', varName: '--muted' },
      { name: 'Border', varName: '--border' },
    ],
    colorRolesTitle: 'Color roles',
    colorRolesIntro: "What each color means, not just its value — that's what keeps a color from being reused for a contradictory meaning somewhere else.",
    colorRoles: [
      { varName: '--primary', name: 'Primary accent', desc: 'Interactive, active, done — links, buttons, "done" status.' },
      { varName: '--cyan', name: 'Secondary accent', desc: "Second accent hue, used to tell a category apart from the primary accent (e.g. a contextual warning in SessionReplay)." },
      { varName: '--violet', name: 'Categorical', desc: "Dedicated to one specific category among several (contract types, method steps…), no fixed meaning on its own." },
      { varName: '--pink', name: 'Categorical', desc: 'Another color from the same categorical family, to visually tell apart several options of the same menu.' },
      { varName: '--warning', name: 'Attention', desc: 'An in-between or worth-watching status — a pending bill, an application sent with no reply yet.' },
      { varName: '--error', name: 'Negative', desc: 'Rejection, failure, destructive action.' },
      { varName: '--text', name: 'Primary text', desc: 'The most important content on screen.' },
      { varName: '--text2', name: 'Secondary text', desc: 'Supporting content — metadata, descriptions.' },
      { varName: '--muted', name: 'Muted text', desc: 'Field labels, neutral or not-applicable status.' },
      { varName: '--border', name: 'Separator', desc: 'Field and card outlines, dividing lines.' },
    ],
    schemesTitle: 'Themes',
    schemesIntro: 'The same roles, two sets of values — dark and light, side by side.',
    tokensTitle: 'Tokens',
    tokensIntro: "Every token defined in src/styles/tokens.css, with where and how it's actually used in the code — not just its value.",
    tokens: [
      { varName: '--bg', type: 'color', usage: 'Background of the page and the main shell.' },
      { varName: '--bg2', type: 'color', usage: 'Background of cards and panels (RoleCard, FontCard, diagrams).' },
      { varName: '--bg3', type: 'color', usage: 'Background of the menus — Sidebar, secondary sidebar, Statusbar.' },
      { varName: '--primary', type: 'color', usage: 'Primary accent — links, active icons, "done" status.' },
      { varName: '--cyan', type: 'color', usage: 'Secondary accent — tells a category apart from the primary accent (SessionReplay).' },
      { varName: '--violet', type: 'color', usage: 'Categorical color, no fixed meaning — defined but not yet consumed elsewhere in the code.' },
      { varName: '--pink', type: 'color', usage: 'Another categorical color, same family as --violet — defined but not yet consumed elsewhere in the code.' },
      { varName: '--mandarine', type: 'color', usage: "Listed in the palette but not yet applied elsewhere in the UI." },
      { varName: '--warning', type: 'color', usage: 'In-between or worth-watching status — "major" changelog severity, decision notes (TheLostCauldronGame, SessionReplay).' },
      { varName: '--error', type: 'color', usage: 'Rejection, failure, destructive action — defined but not yet triggered elsewhere in the code.' },
      { varName: '--text', type: 'color', usage: 'Primary text — headings, content, menu labels.' },
      { varName: '--text2', type: 'color', usage: 'Secondary text — metadata, descriptions.' },
      { varName: '--muted', type: 'color', usage: 'Muted text — field labels (FieldLabel), neutral status.' },
      { varName: '--prose', type: 'color', usage: 'Long-form paragraph text (Section, CV, Home).' },
      { varName: '--border', type: 'color', usage: 'Field and card outlines, dividing lines.' },
      { varName: '--grid-line', type: 'color', usage: 'Decorative background grid — defined but not yet consumed elsewhere in the code.' },
      { varName: '--active-tint', type: 'color', usage: 'Background of selected menu items (Sidebar, secondary sidebar, Tag).' },
      { varName: '--hover-tint', type: 'color', usage: 'Background on menu item hover (Sidebar, secondary sidebar).' },
      { varName: '--font-heading', type: 'font', cssFamily: "var(--font-heading)", usage: 'Heading typeface (Fraunces) — page h1, hero plate, cards.' },
      { varName: '--font-body', type: 'font', cssFamily: "var(--font-body)", usage: 'Body typeface (Work Sans) — paragraphs, labels, running content.' },
      { varName: '--font-mono', type: 'font', cssFamily: "var(--font-mono)", usage: 'Technical typeface (JetBrains Mono) — section titles, tags, field labels, code.' },
    ],
    roadmapTitle: 'Roadmap',
    roadmapIntro: 'No date commitments — each stage only starts once it\'s judged necessary.',
    roadmap: [
      {
        version: 'Design Token',
        statusLabel: 'CONSIDERED',
        statusColor: 'var(--muted)',
        items: [
          "3-tier architecture: primitive (raw, meaningless values, e.g. --teal-500, --sepia-600, --ink-900) → semantic (role, e.g. --primary, which references the right primitive per theme) → component (a specific component's role, e.g. --button-bg, which references the semantic tier).",
          "Today tokens.css skips the primitive tier: every token goes straight from a semantic name (--primary, --text…) to a hardcoded per-theme hex value, with no raw-value layer underneath.",
          "What the component tier buys: a button could diverge from a shared role (e.g. its border) without duplicating a raw value or breaking other uses of that same role elsewhere in the app.",
          "Style Dictionary (an open-source tool from Amazon) could generate these tokens from a single JSON/YAML source into multiple formats — CSS, SCSS, JS, Android XML, iOS Swift. Not planned for now: M.Labs is a single web project with tokens hand-written in tokens.css — that would add an npm dependency and a build step for a multi-platform sync problem we don't have.",
        ],
      },
    ],
  },
}

function TokenTable({ tokens }) {
  return (
    <div style={{ overflowX: 'auto', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {tokens.map((tok) => (
            <tr key={tok.varName} style={{ borderBottom: 'var(--border-thin) solid var(--border)' }}>
              <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--primary)' }}>
                  {tok.varName}
                </span>
              </td>
              <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                {tok.type === 'font' ? (
                  <span style={{ fontFamily: tok.cssFamily, fontSize: 18, color: 'var(--text)' }}>Aa</span>
                ) : (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: 'var(--radius-sm)',
                      background: `var(${tok.varName})`,
                      border: 'var(--border-thin) solid var(--border)',
                    }}
                  />
                )}
              </td>
              <td style={{ padding: '14px 16px', fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                {tok.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RoleSpecimen({ render, text }) {
  if (render === 'pageTitle') {
    return (
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text)' }}>
        {text}
      </div>
    )
  }
  if (render === 'sectionTitle') return <SectionTitle>{text}</SectionTitle>
  if (render === 'body') {
    return (
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, margin: 0 }}>
        {text}
      </p>
    )
  }
  if (render === 'fieldLabel') return <FieldLabel>{text}</FieldLabel>
  if (render === 'tag') return <Tag>{text}</Tag>
  if (render === 'iconButton') {
    return (
      <IconButton label="Exemple">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      </IconButton>
    )
  }
  return null
}

export default function DesignSystem({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const [activeTab, setActiveTab] = useState('overview')
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c} />
      <CaseTabs tabs={c.tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <Section title={c.overviewTitle}>
            {c.overviewBody.map((para, i) => (
              <p key={i} style={{ marginBottom: i < c.overviewBody.length - 1 ? 12 : 0 }}>{para}</p>
            ))}
          </Section>

          <Section title={c.updatesTitle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {c.updates.map((u) => (
                <UpdateCard key={u.title} date={u.date} title={u.title} desc={u.desc} />
              ))}
            </div>
          </Section>

          <Section title={c.nextTitle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {c.next.map((n) => (
                <NavCard key={n.tab} title={n.title} desc={n.desc} onClick={() => setActiveTab(n.tab)} />
              ))}
            </div>
          </Section>
        </>
      )}

      {activeTab === 'fonts' && (
        <Section title={c.fontsTitle}>
          <p style={{ marginBottom: 20 }}>{c.fontsIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
            {c.fonts.map((font) => (
              <FontCard key={font.family} {...font} />
            ))}
          </div>

          <SectionTitle>{c.rolesTitle}</SectionTitle>
          <p style={{ marginBottom: 20 }}>{c.rolesIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {c.roles.map((role) => (
              <RoleCard key={role.name} name={role.name} spec={role.spec} usage={role.usage}>
                <RoleSpecimen render={role.render} text={role.text} />
              </RoleCard>
            ))}
          </div>
        </Section>
      )}

      {activeTab === 'spacing' && (
        <Section title={c.spacingTitle}>
          <p>{c.spacingBody}</p>
        </Section>
      )}

      {activeTab === 'colors' && (
        <Section title={c.colorsTitle}>
          <p style={{ marginBottom: 32 }}>{c.colorsIntro}</p>

          <SectionTitle>{c.paletteTitle}</SectionTitle>
          <p style={{ marginBottom: 20 }}>{c.paletteIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
            {c.palette.map((sw) => (
              <PaletteSwatch key={sw.varName} name={sw.name} varName={sw.varName} />
            ))}
          </div>

          <SectionTitle>{c.colorRolesTitle}</SectionTitle>
          <p style={{ marginBottom: 20 }}>{c.colorRolesIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
            {c.colorRoles.map((role) => (
              <ColorRole key={role.varName + role.name} varName={role.varName} name={role.name} desc={role.desc} />
            ))}
          </div>

          <SectionTitle>{c.schemesTitle}</SectionTitle>
          <p style={{ marginBottom: 20 }}>{c.schemesIntro}</p>
          <ThemeSwatch />
        </Section>
      )}

      {activeTab === 'tokens' && (
        <Section title={c.tokensTitle}>
          <p style={{ marginBottom: 20 }}>{c.tokensIntro}</p>
          <TokenTable tokens={c.tokens} />
        </Section>
      )}

      {activeTab === 'roadmap' && (
        <Section title={c.roadmapTitle}>
          <p style={{ marginBottom: 20 }}>{c.roadmapIntro}</p>
          {c.roadmap.map((r) => (
            <RoadmapCard key={r.version} version={r.version} statusLabel={r.statusLabel} statusColor={r.statusColor} items={r.items} />
          ))}
        </Section>
      )}

      <CaseFooter c={c} />
    </div>
  )
}
