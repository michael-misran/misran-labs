import { useState } from 'react'
import CaseStudyLayout, { Section, BulletList } from '../CaseStudyLayout'
import { useLanguage } from '../../shell/LanguageContext'
import { useSecondarySidebar } from '../../shell/SecondarySidebarContext'
import {
  Icon, Surface, Button, Badge, TextField, Checkbox, Radio, Switch, Slider,
  Tabs, Breadcrumbs, Pagination, Stepper, Card, Avatar, ListItem, Tooltip,
  TableHeader, Modal, Toast, ToastStack, AlertBanner, ProgressBar, Spinner,
  Skeleton, EmptyState,
} from '../../design-system/kit'

/* Grille de démonstration : un libellé en mono au-dessus de chaque
   spécimen, comme sur une planche de design system. */
function Specimen({ label, note, children, span = 1 }) {
  return (
    <div style={{ gridColumn: `span ${span}`, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--text2)' }}>
          {label.toUpperCase()}
        </span>
        {note && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--muted)' }}>
            {note.toUpperCase()}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function Grid({ cols = 2, children, gap = 28 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${cols === 4 ? 140 : 220}px, 1fr))`, gap }}>
      {children}
    </div>
  )
}

// Échantillon rendu à l'identique dans les deux portées : seul le contexte
// change, le balisage est le même. C'est la démonstration du mécanisme.
function ScopeSample({ lang }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--primary)',
          letterSpacing: 'var(--label-tracking)',
          textTransform: 'var(--label-transform)',
          marginBottom: 8,
        }}
      >
        {'// ' + lang.scopeTitle}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: 'var(--heading-tracking)',
          textTransform: 'var(--heading-transform)',
          marginBottom: 6,
        }}
      >
        {lang.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 14 }}>
        {lang.scopeNormal} / {lang.scopeInverted}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="sm">{lang.btnPrimary}</Button>
        <Badge tone="soft">{lang.badges[0]}</Badge>
        <span
          style={{
            background: 'var(--surface-inset)',
            boxShadow: 'var(--elev-inset)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text2)',
            padding: '6px 10px',
          }}
        >
          inset
        </span>
      </div>
    </div>
  )
}

function Swatch({ token, label }) {
  return (
    <div>
      <div
        style={{
          height: 74,
          borderRadius: 'var(--radius-md)',
          background: `var(${token})`,
          boxShadow: 'var(--elev-2)',
          marginBottom: 8,
        }}
      />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{token}</div>
    </div>
  )
}

const CONTENT = {
  fr: {
    title: 'Kit UI',
    role: 'Design system appliqué — composants React, tokens partagés avec le site',
    period: 'Septembre 2026',
    tools: ['React', 'Tokens CSS', 'Élévations neumorphiques', 'SVG'],
    tabs: [
      { id: 'foundations', label: 'Fondations' },
      { id: 'controls', label: 'Contrôles' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'data', label: 'Données' },
      { id: 'feedback', label: 'Retours' },
      { id: 'rules', label: 'Règles' },
    ],

    intro:
      "Ce kit n’est pas une planche de démonstration : ce sont les composants réels du Lab, importés depuis src/design-system/kit/ et rendus ici avec leurs états. Change de kit dans la barre du haut et cette page change avec tout le site — aucun composant n’est réécrit, seuls les tokens changent.",
    themeNote:
      "Il n’y a pas de mode clair / sombre : un kit est un rendu unique, et c’est le kit qu’on change. Ce qui existe en revanche, c’est la portée inversée — un sous-arbre qui bascule sur les surfaces inverses du kit actif. Ce n’est pas un thème : c’est un rôle de surface, pour une colonne de navigation noire ou une carte mise en avant au milieu de cartes ordinaires.",

    scopeTitle: 'Portée inversée',
    scopeIntro:
      "Le même composant, sans une ligne de code de différence : à gauche la portée normale du kit, à droite sa portée inversée. C'est ce mécanisme qui donne une colonne de navigation noire dans un kit clair, ou une carte mise en avant au milieu de cartes ordinaires.",
    scopeNormal: 'Portée normale',
    scopeInverted: 'Portée inversée',
    cardEmphasisHeading: 'Mis en avant',
    cardEmphasisDesc: 'La même carte avec la prop emphasis — aucune couleur codée en dur.',
    surfacesTitle: 'Surfaces',
    surfaces: [
      { label: 'Base', variant: 'raised', level: 1 },
      { label: 'Relief', variant: 'raised', level: 3 },
      { label: 'Creux', variant: 'inset' },
      { label: 'Enfoncé', variant: 'pressed' },
    ],
    elevationTitle: 'Niveaux d’élévation',
    elevationLevels: ['Plat', 'Survol', 'Relief', 'Modale', 'Popover'],
    radiusTitle: 'Échelle de rayons',
    borderTitle: 'Épaisseurs de bordure',
    borders: ['1px fin', '2px régulier', '4px épais'],
    iconTitle: 'Règles d’iconographie',
    iconNote: 'Trait : 2px',
    paletteTitle: 'Palette',
    swatches: [
      { token: '--primary', label: 'Accent' },
      { token: '--bg', label: 'Fond de page' },
      { token: '--surface-inset', label: 'Creux' },
      { token: '--error', label: 'Erreur' },
      { token: '--warning', label: 'Alerte' },
      { token: '--text', label: 'Texte' },
    ],

    buttonsTitle: 'Boutons',
    btnPrimary: 'Envoyer',
    btnLoading: 'Envoi…',
    btnDisabled: 'Indisponible',
    btnGhost: 'Secondaire',
    fieldTitle: 'Champs texte',
    fieldLabel: 'Adresse e-mail',
    fieldPlaceholder: 'nom@exemple.fr',
    fieldHelper: 'Saisis une adresse valide',
    fieldError: 'Format d’adresse invalide',
    choiceTitle: 'Cases et boutons radio',
    checkboxes: ['Option 1', 'Option 2'],
    radioLegend: 'Choix unique',
    radioOptions: [{ value: 'a', label: 'Option 1' }, { value: 'b', label: 'Option 2' }],
    switchTitle: 'Interrupteurs',
    sliderTitle: 'Curseur',
    sliderLabel: 'Répartition',

    tabsTitle: 'Onglets',
    demoTabs: [{ id: 'o', label: 'Vue d’ensemble' }, { id: 'd', label: 'Détails' }, { id: 's', label: 'Réglages' }],
    breadcrumbTitle: 'Fil d’Ariane',
    breadcrumbs: ['Accueil', 'Catégories', 'Fiche produit', 'Modifier'],
    paginationTitle: 'Pagination',
    stepperTitle: 'Parcours en 4 étapes',
    steps: ['Compte', 'Détails', 'Vérification', 'Paiement'],
    stepperHint: 'Étape en cours : saisis tes informations',

    cardTitle: 'Cartes',
    cardHeading: 'Nom du produit',
    cardDesc: 'Une description courte, sur deux lignes au maximum.',
    cardAction: 'Voir plus',
    listTitle: 'Lignes de liste',
    people: [
      { name: 'Camille Roussel', description: 'Product designer' },
      { name: 'Idriss Benali', description: 'Développeur front' },
      { name: 'Nora Lefèvre', description: 'Product owner' },
    ],
    badgeTitle: 'Badges',
    badges: ['Nouveau', 'Bêta', '24'],
    avatarTitle: 'Avatars',
    tooltipTitle: 'Infobulle',
    tooltipTrigger: 'Survole-moi',
    tooltipContent: 'En savoir plus',
    tableTitle: 'En-tête de tableau',
    columns: [{ id: 'name', label: 'Nom (A-Z)' }, { id: 'date', label: 'Date' }, { id: 'status', label: 'Statut' }, { id: 'action', label: 'Action' }],

    modalTitle: 'Modale de confirmation',
    modalOpen: 'Ouvrir la modale',
    modalHeading: 'Supprimer le compte ?',
    modalQuestion: 'Cette action est définitive. Confirmer ?',
    modalConfirm: 'Supprimer',
    modalCancel: 'Annuler',
    toastTitle: 'Notifications',
    toastSuccess: 'Fichier envoyé',
    toastInfo: 'Mises à jour disponibles',
    alertTitle: 'Bandeau d’alerte',
    alertHeading: 'Important :',
    alertBody: 'maintenance système planifiée ce soir à 22 h.',
    progressTitle: 'Progression',
    progressLabel: 'Téléversement',
    spinnerTitle: 'Attente',
    skeletonTitle: 'Squelette de chargement',
    emptyTitle: 'État vide',
    emptyHeading: 'Aucun résultat',
    emptyDesc: 'Aucune entrée ne correspond à ces filtres.',
    emptyAction: 'Réinitialiser',

    rulesTitle: 'Les règles du kit',
    rules: [
      "Aucune ombre codée en dur. Tout passe par les sept tokens d’élévation ; un composant qui a besoin d’une ombre inédite révèle un niveau manquant dans le système, pas une exception à écrire sur place.",
      "La profondeur porte l’information, la couleur la confirme. Un onglet actif est en relief, un champ de saisie est en creux, un bouton pressé s’enfonce — l’état reste lisible même quand la teinte ne se distingue pas.",
      "Jamais la couleur seule. L’interrupteur affiche ON / OFF, les notifications portent une icône, l’étape courante est nommée. C’est ce qui rend le kit utilisable par un daltonien.",
      "Le focus est toujours visible. Une règle unique dans tokens.css dessine l’anneau sur tout élément focalisable au clavier — aucun composant ne la contourne.",
      "Les tokens structurels ne se surchargent pas. Rayons, épaisseurs, tailles d’icône et espacements sont déclarés une fois dans :root ; seules les couleurs, surfaces et élévations changent selon le thème.",
      "Le mouvement est optionnel. prefers-reduced-motion coupe transitions et animations en une règle, y compris le spinner et le squelette.",
    ],
    honestyTitle: 'Ce qui reste à faire',
    honesty: [
      "Le contraste : le neumorphisme repose sur des écarts de luminosité faibles. Le texte et l’accent passent AA, mais les reliefs eux-mêmes ne sont pas un signal fiable en plein soleil ou sur un écran mal calibré. C’est pour ça que chaque état a un second marqueur.",
      "La portée inversée du neumorphisme est posée mais peu éprouvée : les reliefs y sont retournés à la main, et seul un usage réel dira s’ils tiennent. Le kit brutaliste, lui, n’a pas ce problème — ses décalages nets fonctionnent dans les deux portées.",
      "Le curseur et l’interrupteur ne gèrent pas encore le glissement tactile de façon idéale sur mobile — l’input natif est là et fonctionne, l’affinage reste à faire.",
    ],
  },

  en: {
    title: 'UI Kit',
    role: 'Design system in practice — React components, tokens shared with the site',
    period: 'September 2026',
    tools: ['React', 'CSS tokens', 'Neumorphic elevations', 'SVG'],
    tabs: [
      { id: 'foundations', label: 'Foundations' },
      { id: 'controls', label: 'Controls' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'data', label: 'Data' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'rules', label: 'Rules' },
    ],

    intro:
      'This kit is not a demo board: these are the Lab’s real components, imported from src/design-system/kit/ and rendered here with their states. Switch kits in the top bar and this page changes along with the whole site — no component is rewritten, only the tokens change.',
    themeNote:
      'There is no light / dark mode: a kit is a single rendering, and the kit is what you switch. What does exist is the inverted scope — a subtree that flips to the active kit’s inverse surfaces. That is not a theme: it is a surface role, for a black navigation column or an emphasised card among ordinary ones.',

    scopeTitle: 'Inverted scope',
    scopeIntro:
      "The same component, with not one line of code different: on the left the kit's normal scope, on the right its inverted scope. That mechanism is what gives a black navigation column inside a light kit, or an emphasised card among ordinary ones.",
    scopeNormal: 'Normal scope',
    scopeInverted: 'Inverted scope',
    cardEmphasisHeading: 'Emphasised',
    cardEmphasisDesc: 'The same card with the emphasis prop — no hard-coded colour.',
    surfacesTitle: 'Surfaces',
    surfaces: [
      { label: 'Base', variant: 'raised', level: 1 },
      { label: 'Raised', variant: 'raised', level: 3 },
      { label: 'Inset', variant: 'inset' },
      { label: 'Pressed', variant: 'pressed' },
    ],
    elevationTitle: 'Elevation levels',
    elevationLevels: ['Flat', 'Hover', 'Raised', 'Modal', 'Popover'],
    radiusTitle: 'Radius scale',
    borderTitle: 'Border thickness',
    borders: ['1px thin', '2px regular', '4px thick'],
    iconTitle: 'Iconography rules',
    iconNote: 'Stroke: 2px',
    paletteTitle: 'Palette',
    swatches: [
      { token: '--primary', label: 'Accent' },
      { token: '--bg', label: 'Page background' },
      { token: '--surface-inset', label: 'Inset' },
      { token: '--error', label: 'Error' },
      { token: '--warning', label: 'Warning' },
      { token: '--text', label: 'Text' },
    ],

    buttonsTitle: 'Buttons',
    btnPrimary: 'Submit now',
    btnLoading: 'Sending…',
    btnDisabled: 'Not available',
    btnGhost: 'Secondary',
    fieldTitle: 'Text fields',
    fieldLabel: 'Email address',
    fieldPlaceholder: 'name@example.com',
    fieldHelper: 'Enter a valid email',
    fieldError: 'Invalid email format',
    choiceTitle: 'Checkbox and radio',
    checkboxes: ['Option 1', 'Option 2'],
    radioLegend: 'Single choice',
    radioOptions: [{ value: 'a', label: 'Option 1' }, { value: 'b', label: 'Option 2' }],
    switchTitle: 'Switches',
    sliderTitle: 'Slider',
    sliderLabel: 'Allocation',

    tabsTitle: 'Tabs',
    demoTabs: [{ id: 'o', label: 'Overview' }, { id: 'd', label: 'Details' }, { id: 's', label: 'Settings' }],
    breadcrumbTitle: 'Breadcrumbs',
    breadcrumbs: ['Home', 'Categories', 'Product details', 'Edit'],
    paginationTitle: 'Pagination',
    stepperTitle: '4-step process',
    steps: ['Account', 'Details', 'Review', 'Payment'],
    stepperHint: 'Current step: enter your information',

    cardTitle: 'Cards',
    cardHeading: 'Product name',
    cardDesc: 'A short description, two lines at most.',
    cardAction: 'View more',
    listTitle: 'List items',
    people: [
      { name: 'Camille Roussel', description: 'Product designer' },
      { name: 'Idriss Benali', description: 'Front-end developer' },
      { name: 'Nora Lefèvre', description: 'Product owner' },
    ],
    badgeTitle: 'Badges',
    badges: ['New', 'Beta', '24'],
    avatarTitle: 'Avatars',
    tooltipTitle: 'Tooltip',
    tooltipTrigger: 'Hover me',
    tooltipContent: 'More info',
    tableTitle: 'Table header',
    columns: [{ id: 'name', label: 'Name (A-Z)' }, { id: 'date', label: 'Date' }, { id: 'status', label: 'Status' }, { id: 'action', label: 'Action' }],

    modalTitle: 'Confirmation modal',
    modalOpen: 'Open the modal',
    modalHeading: 'Delete account?',
    modalQuestion: 'This cannot be undone. Are you sure?',
    modalConfirm: 'Delete',
    modalCancel: 'Cancel',
    toastTitle: 'Toasts',
    toastSuccess: 'File uploaded',
    toastInfo: 'Updates available',
    alertTitle: 'Alert banner',
    alertHeading: 'Important:',
    alertBody: 'system maintenance scheduled tonight at 10pm.',
    progressTitle: 'Progress',
    progressLabel: 'Upload',
    spinnerTitle: 'Waiting',
    skeletonTitle: 'Loading skeleton',
    emptyTitle: 'Empty state',
    emptyHeading: 'No results found',
    emptyDesc: 'No entry matches these filters.',
    emptyAction: 'Clear filters',

    rulesTitle: 'The kit’s rules',
    rules: [
      'No hard-coded shadow. Everything goes through the seven elevation tokens; a component needing an unlisted shadow reveals a missing level in the system, not an exception to write inline.',
      'Depth carries the information, colour confirms it. An active tab is raised, an input is inset, a pressed button sinks — the state stays legible even when the hue does not read.',
      'Never colour alone. The switch shows ON / OFF, toasts carry an icon, the current step is named. That is what makes the kit usable by a colour-blind user.',
      'Focus is always visible. A single rule in tokens.css draws the ring on every keyboard-focusable element — no component works around it.',
      'Structural tokens are not overridable. Radii, thicknesses, icon sizes and spacing are declared once in :root; only colours, surfaces and elevations change per theme.',
      'Motion is optional. prefers-reduced-motion cuts transitions and animations in one rule, spinner and skeleton included.',
    ],
    honestyTitle: 'What is still open',
    honesty: [
      'Contrast: neumorphism relies on small luminance differences. Text and accent pass AA, but the reliefs themselves are not a reliable signal in bright sunlight or on a poorly calibrated screen. That is why every state has a second marker.',
      'Neumorphism’s inverted scope is in place but lightly tested: its reliefs were flipped by hand, and only real use will tell whether they hold. The brutalist kit has no such problem — its hard offsets work in both scopes.',
      'The slider and the switch do not yet handle touch dragging ideally on mobile — the native input is there and works, the polish is not done.',
    ],
  },
}

export default function UIKit() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const [activeTab, setActiveTab] = useState('foundations')

  useSecondarySidebar(c.tabs, activeTab, setActiveTab)

  // État vivant des démos — les composants sont réellement interactifs.
  const [email, setEmail] = useState('')
  const [checks, setChecks] = useState([true, false])
  const [radio, setRadio] = useState('a')
  const [switches, setSwitches] = useState([true, false])
  const [slider, setSlider] = useState(75)
  const [demoTab, setDemoTab] = useState('o')
  const [page, setPage] = useState(2)
  const [step, setStep] = useState(2)
  const [sort, setSort] = useState({ by: 'name', dir: 'asc' })
  const [modalOpen, setModalOpen] = useState(false)
  const [progress, setProgress] = useState(50)

  const toggleCheck = (i) => setChecks((prev) => prev.map((v, j) => (j === i ? !v : v)))
  const toggleSwitch = (i) => setSwitches((prev) => prev.map((v, j) => (j === i ? !v : v)))

  return (
    <CaseStudyLayout title={c.title} role={c.role} period={c.period} tools={c.tools}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--prose)', lineHeight: 1.7, margin: '0 0 16px' }}>
        {c.intro}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.7,
          borderLeft: 'var(--border-regular) solid var(--border)',
          paddingLeft: 14,
          margin: '0 0 40px',
        }}
      >
        {c.themeNote}
      </p>

      <div style={{ marginBottom: 36 }}>
        <Tabs tabs={c.tabs} active={activeTab} onChange={setActiveTab} label={c.title} />
      </div>

      {activeTab === 'foundations' && (
        <>
          <Section title={c.surfacesTitle}>
            <Grid cols={4}>
              {c.surfaces.map((s) => (
                <Specimen key={s.label} label={s.label}>
                  <Surface level={s.level ?? 1} variant={s.variant} style={{ height: 88 }} />
                </Specimen>
              ))}
            </Grid>
          </Section>

          <Section title={c.elevationTitle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {c.elevationLevels.map((label, i) => (
                <Surface
                  key={label}
                  level={i + 1}
                  radius="var(--radius-md)"
                  padding="14px 18px"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', letterSpacing: '0.06em' }}
                >
                  {`${i + 1} · ${label.toUpperCase()}`}
                </Surface>
              ))}
            </div>
          </Section>

          <Section title={c.radiusTitle}>
            <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 14 }}>
              {['xs', 'sm', 'md', 'lg', 'xl'].map((r, i) => (
                <div key={r} style={{ textAlign: 'center' }}>
                  <Surface
                    level={3}
                    radius={`var(--radius-${r})`}
                    style={{ width: 46 + i * 8, height: 46 + i * 8, marginBottom: 8 }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                    {[4, 8, 12, 16, 24][i]}PX
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section title={c.borderTitle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360 }}>
              {['thin', 'regular', 'thick'].map((w, i) => (
                <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', width: 110, letterSpacing: '0.06em' }}>
                    {c.borders[i].toUpperCase()}
                  </span>
                  <span style={{ flex: 1, borderTop: `var(--border-${w}) solid var(--primary)` }} />
                </div>
              ))}
            </div>
          </Section>

          <Section title={c.iconTitle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              {[['--icon-sm', 16], ['--icon-md', 20], ['--icon-lg', 24]].map(([token, px]) => (
                <div key={token} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: 18, color: 'var(--primary)', marginBottom: 8, alignItems: 'center', height: 26 }}>
                    <Icon name="gear" size={`var(${token})`} />
                    <Icon name="user" size={`var(${token})`} />
                    <Icon name="search" size={`var(${token})`} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{px}PX</span>
                </div>
              ))}
              <div style={{ alignSelf: 'flex-end', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text2)', letterSpacing: '0.08em' }}>
                {c.iconNote.toUpperCase()}
              </div>
            </div>
          </Section>

          <Section title={c.paletteTitle}>
            <Grid cols={4} gap={20}>
              {c.swatches.map((s) => <Swatch key={s.token} token={s.token} label={s.label} />)}
            </Grid>
          </Section>

          <Section title={c.scopeTitle}>
            <p style={{ marginTop: 0, marginBottom: 24 }}>{c.scopeIntro}</p>
            <Grid cols={2}>
              <Specimen label={c.scopeNormal}>
                <Surface level={3} radius="var(--radius-lg)" padding="var(--space-md)">
                  <ScopeSample lang={c} />
                </Surface>
              </Specimen>
              <Specimen label={c.scopeInverted}>
                <Surface level={3} invert radius="var(--radius-lg)" padding="var(--space-md)">
                  <ScopeSample lang={c} />
                </Surface>
              </Specimen>
            </Grid>
          </Section>
        </>
      )}

      {activeTab === 'controls' && (
        <>
          <Section title={c.buttonsTitle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <Button>{c.btnPrimary}</Button>
              <Button loading>{c.btnLoading}</Button>
              <Button disabled>{c.btnDisabled}</Button>
              <Button variant="ghost">{c.btnGhost}</Button>
              <Button tone="danger" icon="close">{c.modalConfirm}</Button>
            </div>
          </Section>

          <Section title={c.fieldTitle}>
            <Grid cols={2}>
              <Specimen label="Default">
                <TextField label={c.fieldLabel} placeholder={c.fieldPlaceholder} helper={c.fieldHelper} value={email} onChange={(e) => setEmail(e.target.value)} />
              </Specimen>
              <Specimen label="Error">
                <TextField label={c.fieldLabel} placeholder={c.fieldPlaceholder} error={c.fieldError} value="nom@" onChange={() => {}} />
              </Specimen>
              <Specimen label="Disabled">
                <TextField label={c.fieldLabel} placeholder={c.fieldPlaceholder} disabled value="" onChange={() => {}} />
              </Specimen>
            </Grid>
          </Section>

          <Section title={c.choiceTitle}>
            <Grid cols={2}>
              <Specimen label="Checkbox">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {c.checkboxes.map((label, i) => (
                    <Checkbox key={label} label={label} checked={checks[i]} onChange={() => toggleCheck(i)} />
                  ))}
                </div>
              </Specimen>
              <Specimen label="Radio">
                <Radio legend={c.radioLegend} name="kit-demo" options={c.radioOptions} value={radio} onChange={setRadio} />
              </Specimen>
            </Grid>
          </Section>

          <Section title={c.switchTitle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
              {switches.map((on, i) => (
                <Switch key={i} checked={on} onChange={() => toggleSwitch(i)} label={`${c.switchTitle} ${i + 1}`} />
              ))}
            </div>
          </Section>

          <Section title={c.sliderTitle}>
            <div style={{ maxWidth: 380 }}>
              <Slider label={c.sliderLabel} value={slider} onChange={setSlider} ticks={[0, 25, 50, 75, 100]} />
            </div>
          </Section>
        </>
      )}

      {activeTab === 'navigation' && (
        <>
          <Section title={c.tabsTitle}>
            <Tabs tabs={c.demoTabs} active={demoTab} onChange={setDemoTab} label={c.tabsTitle} />
          </Section>

          <Section title={c.breadcrumbTitle}>
            <Breadcrumbs items={c.breadcrumbs.map((label) => ({ label }))} label={c.breadcrumbTitle} />
          </Section>

          <Section title={c.paginationTitle}>
            <Pagination page={page} pages={4} onChange={setPage} labels={{ prev: 'PREV', next: 'NEXT', nav: c.paginationTitle }} />
          </Section>

          <Section title={c.stepperTitle}>
            <Stepper steps={c.steps} current={step} hint={c.stepperHint} />
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Button size="sm" variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))}>−</Button>
              <Button size="sm" variant="ghost" onClick={() => setStep((s) => Math.min(c.steps.length, s + 1))}>+</Button>
            </div>
          </Section>
        </>
      )}

      {activeTab === 'data' && (
        <>
          <Section title={c.cardTitle}>
            <Grid cols={2}>
              <Card
                title={c.cardHeading}
                description={c.cardDesc}
                onAction={() => {}}
                action={<Button size="sm">{c.cardAction}</Button>}
              />
              <Card
                icon="plus"
                emphasis
                title={c.cardEmphasisHeading}
                description={c.cardEmphasisDesc}
                onAction={() => {}}
                action={<Button size="sm">{c.cardAction}</Button>}
              />
              <Specimen label={c.listTitle}>
                <Surface level={3} radius="var(--radius-lg)" padding={8}>
                  {c.people.map((p) => (
                    <ListItem key={p.name} name={p.name} description={p.description} onClick={() => {}} />
                  ))}
                </Surface>
              </Specimen>
            </Grid>
          </Section>

          <Section title={c.badgeTitle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <Badge tone="soft">{c.badges[0]}</Badge>
              <Badge tone="neutral">{c.badges[1]}</Badge>
              <Badge tone="solid">{c.badges[2]}</Badge>
            </div>
          </Section>

          <Section title={c.avatarTitle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {c.people.map((p, i) => (
                <Avatar key={p.name} name={p.name} size={['sm', 'md', 'lg'][i]} />
              ))}
            </div>
          </Section>

          <Section title={c.tooltipTitle}>
            <Tooltip content={c.tooltipContent}>
              <Button variant="ghost" size="sm" icon="cursor">{c.tooltipTrigger}</Button>
            </Tooltip>
          </Section>

          <Section title={c.tableTitle}>
            <TableHeader
              columns={c.columns}
              sortBy={sort.by}
              direction={sort.dir}
              onSort={(id) => setSort((s) => ({ by: id, dir: s.by === id && s.dir === 'asc' ? 'desc' : 'asc' }))}
            />
          </Section>
        </>
      )}

      {activeTab === 'feedback' && (
        <>
          <Section title={c.alertTitle}>
            <AlertBanner title={c.alertHeading}>{c.alertBody}</AlertBanner>
          </Section>

          <Section title={c.toastTitle}>
            <div style={{ maxWidth: 340 }}>
              <ToastStack>
                <Toast tone="success">{c.toastSuccess}</Toast>
                <Toast tone="info">{c.toastInfo}</Toast>
              </ToastStack>
            </div>
          </Section>

          <Section title={c.modalTitle}>
            {modalOpen ? (
              <Modal
                open
                title={c.modalHeading}
                question={c.modalQuestion}
                confirmLabel={c.modalConfirm}
                cancelLabel={c.modalCancel}
                onConfirm={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
              />
            ) : (
              <Button variant="ghost" onClick={() => setModalOpen(true)}>{c.modalOpen}</Button>
            )}
          </Section>

          <Section title={c.progressTitle}>
            <div style={{ maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ProgressBar value={progress} label={c.progressLabel} />
              <Slider value={progress} onChange={setProgress} suffix="%" />
            </div>
          </Section>

          <Section title={c.spinnerTitle}>
            <Spinner label={c.spinnerTitle} />
          </Section>

          <Section title={c.skeletonTitle}>
            <div style={{ maxWidth: 340 }}>
              <Skeleton rows={4} />
            </div>
          </Section>

          <Section title={c.emptyTitle}>
            <div style={{ maxWidth: 340 }}>
              <EmptyState
                title={c.emptyHeading}
                description={c.emptyDesc}
                action={<Button size="sm">{c.emptyAction}</Button>}
              />
            </div>
          </Section>
        </>
      )}

      {activeTab === 'rules' && (
        <>
          <Section title={c.rulesTitle}>
            <BulletList items={c.rules} />
          </Section>

          <Section title={c.honestyTitle}>
            <BulletList items={c.honesty} />
          </Section>
        </>
      )}
    </CaseStudyLayout>
  )
}
