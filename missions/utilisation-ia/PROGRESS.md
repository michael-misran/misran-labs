# Mission utilisation-ia — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (architecture de la page, expert Opus)
**Blocages :** aucun

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (react-hooks) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx.

## Inventaire (étape 2)

**FlowDiagram** (`src/components/diagrams/FlowDiagram.jsx`) — props `{ steps, direction = 'horizontal' }`, `steps: Array<{ label, sublabel? }>`. SVG, tokens uniquement. Exemple : `WorkflowSolo.jsx:381`.

**Timeline** (`src/components/diagrams/Timeline.jsx`) — props `{ milestones }`, `milestones: Array<{ date, label }>`. Pas de champ description séparé : tout le texte du jalon va dans `label`. Non utilisé ailleurs.

**SiteMapDiagram** (`src/components/diagrams/SiteMapDiagram.jsx`) — props `{ before, after }`, arbres `{ label, children? }`. **Titres de colonnes codés en dur : "AVANT" / "APRÈS", en français, non paramétrables.** Non utilisé ailleurs.

**WorkflowSolo.jsx** — `Section` (depuis `../CaseStudyLayout`, props `{ title, children }`), `CaseMasthead`/`CaseHero`/`CaseFooter` (depuis `../CaseFile`, props `{ c, lang }` / `{ project, c }` / `{ c }`), `SectionTitle` (depuis `../../design-system/SectionTitle`, props `{ children }`). Contenu dans `CONTENT = { fr: {...}, en: {...} }`, langue via `useLanguage()`, responsive via `useIsMobile()`. JSX : `CaseMasthead` → `CaseHero` → sections → `CaseFooter`. Numéro de dossier via `dossierNo(project?.slug)` affiché dans `CaseHero`.

**projects.js** — entrée : `{ slug, icon, title:{fr,en}, summary:{fr,en}, status, type, featured, tags:{fr,en}, phases?, component, demoComponent? }`.

**Sidebar.jsx** — `LAB_SLUGS` ligne 16 : `['design-system', 'lab-tokens', 'lost-cauldron-game', 'exp-003']`, utilisé en boucle `map()` lignes 180-186.
