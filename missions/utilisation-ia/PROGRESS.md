# Mission utilisation-ia — PROGRESS

**Statut :** étapes 5 et 6 terminées (faites ensemble)
**Prochaine action :** étape 7 (vérification, verificateur Haiku)
**Blocages :** aucun

## Rédaction FR + EN (étapes 5-6)
`UtilisationIA.jsx` couvre les 14 sections + intro de l'architecture (DECISIONS.md étape 3), les 7 schémas (Timeline, 3× FlowDiagram vertical, 2 SVG `DiagramBox` maison, 2 blocs `<pre>`), en FR et en EN. Vérifié par la session : build OK, lint 6 erreurs préexistantes (aucune nouvelle), greps couleurs/confidentialité propres, rendu sans erreur console en FR et EN via `vite preview` (serveur statique — la session ne peut pas lancer `npm run dev` sans supervision), 0 débordement horizontal à 375 px, entrée bien positionnée dans la sidebar et sur la home.

## Registre + squelette (étape 4)
- `src/lab/projects.js` : entrée `utilisation-ia` ajoutée à la fin de `PROJECTS` → `dossierNo('utilisation-ia') = '008'`.
- `src/shell/Sidebar.jsx` : `LAB_SLUGS` a `'utilisation-ia'` juste après `'lab-tokens'`.
- `src/lab/projects/UtilisationIA.jsx` : squelette (CaseMasthead/CaseHero/CaseFooter + une Section placeholder), `npm run build` OK.

## Architecture (étape 3)
Plan complet dans DECISIONS.md : 14 sections + intro, 7 schémas avec données exactes (FR/EN), décision `<pre>` (pas `SiteMapDiagram`) pour les arborescences §7/§10, composant local `DiagramBox` pour les schémas 4 et 5 (organigramme des modèles, local vs cloud). Aucun risque de confidentialité trouvé dans CONTENU.md ; garde-fous notés pour la rédaction (ne pas citer le token, le compte GitHub, les heures de commit, le contenu de settings.json).

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
