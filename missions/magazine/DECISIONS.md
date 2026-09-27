# Mission magazine — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D8 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 0 | Étape `expert` (Opus) pour la direction visuelle | Nouvelle rubrique visible de tous, pas de modèle existant à copier : c'est l'étape où la qualité de jugement compte le plus. Le code suit ensuite sur Sonnet. |
| 2026-09-27 | 0 | Numéro 0 daté du lundi 2026-09-28 | Premier lundi suivant le cadrage ; cohérent avec le rythme hebdomadaire décidé par Michael. |
| 2026-09-27 | 2 | Direction visuelle du magazine : planche « registre d'archive » (masthead + hero bordé + registre des numéros) et articles en fiches `--bg2` façon `StakeholderCard`, détaillée ci-dessous (V1–V12) | `CaseMasthead` (lien retour figé sur `/`) et `CaseHero` (numéro tiré de `dossierNo`) ne peuvent pas porter un lien vers `/magazine` ni un Nº de numéro : deux variantes locales qui recopient leurs styles, sans toucher à `CaseFile.jsx`. Catégories codées par les teintes sémantiques existantes (précédent : `src/lab/phases.js`), jamais par la couleur seule. |
| 2026-09-27 | 3 | `numeros.js` valide en plus que le nom de fichier correspond exactement au champ `date` | Non explicite dans D2/D4, mais D1 dit que le nom de fichier *est* la date de parution : sans ce contrôle, un fichier mal nommé (ex. `numero-1.json` avec `"date": "2026-10-05"`) serait accepté silencieusement, ce qui rendrait le tri par date fragile pour la future routine de veille. Documenté dans FORMAT.md. |
| 2026-09-27 | 3 | Vérification de la séquence `numero = précédent + 1` faite après le tri chronologique, position par position (le numéro trié en position *i* doit porter `numero === i`) | C'est la seule lecture de D2 qui reste vérifiable automatiquement sans état externe (pas de fichier "dernier numéro publié" à maintenir) ; un numéro qui casse la séquence est rejeté seul, les autres restent affichés. |
| 2026-09-27 | 5 | Critères 2, 4 et 5 (rendu réel, absence d'erreur console, 375 px) tenus pour vérifiés à partir des contrôles navigateur déjà faits par la session principale aux étapes 3–4, pas par le `verificateur` | Le sandbox du sous-agent `verificateur` n'a pas d'accès navigateur dans cette session non supervisée ; il a vérifié 3, 6, 7, 8 par le code et les commandes (résultats identiques à ceux de la session principale) et 9 par `git status`. Aucun nouveau doute soulevé sur 2/4/5 : ne pas relancer une vérification qui ferait la même chose que ce qui a déjà été fait. |

## Direction visuelle — étape 2 (expert, Opus)

Tout ce qui suit est tranché : l'étape 4 applique, sans rejuger. Les valeurs numériques (px) sont des tailles de police / espacements littéraux, comme dans le reste du site ; **toutes les couleurs, bordures, rayons passent par des tokens**.

### V1 — Fichiers et composants

| Fichier | Contenu |
|---|---|
| `src/magazine/magazineText.js` | (`.js`, pas `.jsx` : pas d'avertissement `react-refresh/only-export-components`) `MAG_TEXT` (textes fr/en des deux pages, voir V11), `CATEGORIES` (V8), et trois helpers : `issueNo(n)` → `String(n).padStart(3, '0')` ; `formatDateShort(iso)` → `"28.09.2026"` ; `formatDateLong(iso, lang)` → `"lundi 28 septembre 2026"` / `"Monday, September 28, 2026"`. |
| `src/magazine/MagazineParts.jsx` | Composants locaux : `MagazineMasthead`, `MagazineHero`, `CategoryMark`, `IssueRow`, `ArticleCard`, `SourceList`. |
| `src/magazine/MagazineHome.jsx` | Page `/magazine`. |
| `src/magazine/MagazineIssue.jsx` | Page `/magazine/:date` (et l'état « introuvable »). |

**Dates** : ne jamais faire `new Date("2026-09-28")` (interprété en UTC, peut afficher le dimanche selon le fuseau). Découper la chaîne : `const [y, m, d] = iso.split('-').map(Number); new Date(y, m - 1, d)`. `formatDateLong` : `toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })`. `formatDateShort` : concaténation manuelle `JJ.MM.AAAA` (pas d'`Intl`, rendu identique partout).

**Réutilisés tels quels** : `CaseMasthead`, `CaseMetaRow`, `CaseFooter`, `CASE_CHROME` (`src/lab/CaseFile.jsx`) ; `Stamp` (`src/design-system/ArchiveMarks.jsx`) ; `SectionTitle` (`src/design-system/SectionTitle.jsx`) ; `Tag` (`src/design-system/Tag.jsx`) ; `useIsMobile`, `useLanguage`, `t`.
**Non utilisés** : `CaseHero` (numéro imposé par `dossierNo`), `CaseTabs` (pas d'onglets ici), `Section` de `CaseStudyLayout` (on appelle `SectionTitle` directement, comme `WorkflowSolo` pour ses cartes), tokens `--case-tabs-tint-N` (portés au composant `CaseTabs` par leur nom même ; les réutiliser ailleurs casserait la règle des niveaux de tokens).
**Attention** : `SectionTitle` est en `white-space: nowrap` → ne l'utiliser que pour des libellés courts fixes (« Numéros », « Édito », « Articles »), **jamais** pour un titre de numéro ou d'article (débordement à 375 px).

### V2 — Conteneur (les deux pages)
Identique à `WorkflowSolo` : `<div style={{ padding: isMobile ? 20 : 40, fontFamily: 'var(--font-body)', color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>`. Ajouter `minWidth: 0` et, sur tout texte venant du JSON (titres, sources, date de l'URL), `overflowWrap: 'anywhere'` : garantie anti-débordement à 375 px.

### V3 — Composants locaux (props exactes)

**`MagazineMasthead({ backTo, backLabel, fileNo, center, right, rightSub })`** — copie conforme des styles de `CaseMasthead` (mêmes tailles, mêmes tokens, même `flexWrap`), seule différence : le `<Link>` prend `to={backTo}` et affiche `backLabel`. Commentaire en tête : « même bandeau que CaseMasthead, mais le lien retour est paramétrable ».

**`MagazineHero({ number, title, subtitle, children })`** — copie des styles de `CaseHero` ; appelle `useIsMobile()` lui-même (pas de prop). Avec :
- `number` affiché à la place de `dossierNo(...)` (Fraunces, 700, 26 px, `--primary`, `lineHeight: 1`) ;
- `title` dans le `<h1>` (mêmes styles que `CaseHero`, + `overflowWrap: 'anywhere'`) ;
- `subtitle` dans la ligne mono 11 px `--text2` (emplacement de `c.role`) ;
- `Stamp` avec `label="MISRAN · LABS · MAGAZINE ·"`, `size={isMobile ? 52 : 72}` ;
- padding de l'en-tête : `isMobile ? '16px 16px' : '18px 24px'` ;
- le bloc titre (`<div>` qui contient h1 + subtitle) reçoit `minWidth: 0` et le conteneur gauche `flex: 1, minWidth: 0` pour que le titre se replie au lieu de pousser le tampon hors cadre.
- `children` (la `CaseMetaRow`) sous un filet `var(--border-thin) solid var(--border)`, comme `CaseHero`.

**`CategoryMark({ categorie, lang })`** — étiquette de catégorie (V8). `<span>` inline-flex, `alignItems: 'center'`, `gap: 6`, mono 10 px, `letterSpacing: '0.08em'`, texte en majuscules `--text2`, `border: var(--border-thin) solid var(--border)`, `borderRadius: var(--radius-xs)`, `padding: '2px 8px'`, `background: var(--bg)`. Avant le libellé, un carré plein de 8×8 px, `background: <couleur de la catégorie>`, `border: var(--border-thin) solid var(--border)`, `flexShrink: 0`, `aria-hidden`. Le libellé porte l'information (lisible sans la couleur) ; la couleur est un repère de tri, comme une gommette d'archive.

**`IssueRow({ issue, lang, latest, isMobile })`** — une ligne du registre des numéros (V4).

**`ArticleCard({ article, index, total, lang, isMobile })`** — une fiche article (V6).

**`SourceList({ sources, lang })`** — liste des sources d'un article (V6).

### V4 — `/magazine` : structure

1. **`CaseMasthead`** (réutilisé tel quel, le retour vers `/` « ← Lab » convient ici) avec `c = { fileNo, mastheadCenter, mastheadRight, mastheadRightSub }` de `MAG_TEXT[lang].home` (V11).
2. **`MagazineHero`** : `number="✎"` (même symbole que la sidebar), `title="Magazine"`, `subtitle` = « VEILLE IA HEBDOMADAIRE — DESIGN & DEV » / « WEEKLY AI WATCH — DESIGN & DEV ». `children` = `<CaseMetaRow columns={[…]} />` avec 3 colonnes :
   - `PARUTION` / `PUBLISHED` → `value` « Chaque lundi » / « Every Monday » ;
   - `RÉDACTION` / `EDITORIAL` → `value` « Routine Claude, relue par Michael » / « Claude routine, reviewed by Michael » ;
   - `RUBRIQUES` / `SECTIONS` → `chips` = les 5 libellés de catégories dans l'ordre de V8.
3. **Paragraphe de concept** (le « sous-titre expliquant le magazine » de D5) : `<p>` `maxWidth: 720`, body 15 px, `lineHeight: 1.7`, `--prose`, `margin: '0 0 40px'`. Texte en V11.
4. **Registre des numéros** : `<SectionTitle>{Numéros | Issues}</SectionTitle>` puis une `<ol>` (`listStyle: 'none'`, `margin: 0`, `padding: 0`, `borderBottom: var(--border-thin) solid var(--border)`) avec un `<li>` par numéro, du plus récent au plus ancien, chaque `<li>` contenant un `IssueRow`. `latest` = vrai pour le premier.
5. **Registre vide** (aucun numéro valide) : à la place de la `<ol>`, `<p>` body 14 px `--muted` : « Aucun numéro publié pour l'instant. » / « No issue published yet. »
6. **`CaseFooter`** avec `c = { docId: 'ID RUBRIQUE — ML-MAGAZINE' | 'SECTION ID — ML-MAGAZINE', clearance, tagline }` (clearance et tagline pris dans `CASE_CHROME[lang]`).

**`IssueRow` — une ligne de registre, pas une carte** (un registre d'archive se lit en lignes, les fiches sont réservées aux articles) :
- Élément racine : `<Link to={`/magazine/${issue.date}`}>` en `display: 'grid'`, `textDecoration: 'none'`, `color: 'inherit'`, `borderTop: var(--border-thin) solid var(--border)`, `padding: '16px 12px'`, `alignItems: 'center'`, `columnGap: 20`, `rowGap: 6`, transition `background 0.15s ease` ; survol : `background: var(--hover-tint)` (via `onMouseEnter`/`onMouseLeave`, même technique que `NavItem`). Le focus clavier est déjà géré par la règle globale `:focus-visible`.
- **Desktop** : `gridTemplateColumns: '88px 1fr auto'`.
  - Col. 1 : `Nº` + `issueNo(issue.numero)` — Fraunces, 700, 22 px, `--primary`, `lineHeight: 1`, `whiteSpace: 'nowrap'`.
  - Col. 2 : titre du numéro (Fraunces 700, 20 px, `lineHeight: 1.2`, `--text`, `overflowWrap: 'anywhere'`) puis, dessous (`marginTop: 4`), la date courte mono 11 px `--text2`, `letterSpacing: '0.08em'` (ex. `28.09.2026`).
  - Col. 3 : alignée à droite, `display: 'flex'`, `alignItems: 'center'`, `gap: 10` : si `latest`, `<Tag>{DERNIER NUMÉRO | LATEST}</Tag>` (couleur par défaut `--primary`) ; puis le nombre d'articles mono 10 px `--muted`, `letterSpacing: '0.08em'`, en majuscules (« 1 ARTICLE », « 3 ARTICLES » — singulier si 1) ; puis `→` mono 14 px `--primary`.
- **Mobile** : `gridTemplateColumns: '1fr auto'` ; col. 1 empilée : ligne méta mono 10 px `--text2` `Nº 000 · 28.09.2026`, titre Fraunces 700 18 px, puis ligne `Tag` (si `latest`) + nombre d'articles (flex, `gap: 8`, `flexWrap: 'wrap'`) ; col. 2 : la flèche `→` seule, centrée verticalement. `padding: '14px 8px'`.

### V5 — `/magazine/:date` : en-tête et édito

1. **`MagazineMasthead`** : `backTo="/magazine"`, `backLabel` « ← Magazine », `fileNo` « MAGAZINE Nº 000 » (avec `issueNo`), `center` = même que la home, `right` « MISRAN LABS », `rightSub` = `formatDateShort(date)`.
2. **`MagazineHero`** : `number = issueNo(issue.numero)` (ex. `000`, même rôle visuel que `004` sur une fiche), `title = issue.titre[lang]`, `subtitle = formatDateLong(issue.date, lang).toUpperCase()`. `children` = `<CaseMetaRow columns={[…]} />` :
   - `ARTICLES` → `value` = nombre d'articles (nombre seul) ;
   - `RUBRIQUES` / `SECTIONS` → `chips` = libellés des catégories présentes dans ce numéro, dédoublonnées, dans l'ordre d'apparition ;
   - `RÉDACTION` / `EDITORIAL` → même valeur que sur la home.
3. **Édito** : `<SectionTitle>{Édito | Editorial}</SectionTitle>` puis un bloc `maxWidth: 720`, `marginBottom: 40`, `borderLeft: var(--border-thick) solid var(--primary)`, `paddingLeft: isMobile ? 14 : 20` :
   - `<p>` Fraunces **600** (seules graisses chargées : 600 et 900, pas d'italique — ne pas mettre `fontStyle: italic`), `fontSize: isMobile ? 17 : 19`, `lineHeight: 1.5`, `--text`, `margin: 0`.
   - Signature dessous, `marginTop: 10`, mono 10 px `--muted`, `letterSpacing: '0.1em'` : « — LA RÉDACTION · MISRAN LABS » / « — THE EDITORS · MISRAN LABS ».

### V6 — `/magazine/:date` : articles

`<SectionTitle>Articles</SectionTitle>` (même mot en fr et en), puis une pile verticale **à une seule colonne** (`display: 'flex'`, `flexDirection: 'column'`, `gap: 20`, `marginBottom: 40`) — pas de grille : les articles sont des textes longs, une colonne se lit mieux et évite tout débordement.

**`ArticleCard`** — fiche dérivée de `StakeholderCard` :
- Racine `<article>` : `background: var(--bg2)`, `border: var(--border-thin) solid var(--border)`, `borderRadius: var(--radius-xl)`, `padding: isMobile ? 20 : 28`, `display: 'flex'`, `flexDirection: 'column'`, `gap: 14`, `minWidth: 0`.
- **Ligne 1** (flex, `justifyContent: 'space-between'`, `alignItems: 'center'`, `gap: 8`, `flexWrap: 'wrap'`) : à gauche `<CategoryMark>` ; à droite mono 10 px `--muted`, `letterSpacing: '0.1em'` : `ARTICLE 01 / 03` (`String(index + 1).padStart(2, '0')`, idem pour le total).
- **Titre** : `<h2>` Fraunces 700, `fontSize: isMobile ? 19 : 22`, `lineHeight: 1.2`, `--text`, `margin: 0`, `overflowWrap: 'anywhere'`.
- **Résumé** : `<p>` body 15 px, `lineHeight: 1.7`, `--prose`, `margin: 0`.
- **« Pourquoi ça compte »** : encadré `background: var(--active-tint)`, `borderRadius: var(--radius-md)`, `padding: isMobile ? '12px 14px' : '14px 16px'`. Libellé mono 10 px `--primary`, `letterSpacing: '0.06em'`, `marginBottom: 4` : « POURQUOI ÇA COMPTE » / « WHY IT MATTERS ». Texte body 14 px, `lineHeight: 1.6`, `--text`.
- **Sources** : `<SourceList>` séparé par `borderTop: var(--border-thin) solid var(--border)`, `paddingTop: 12`.

**`SourceList`** : libellé mono 10 px `--muted`, `letterSpacing: '0.06em'`, `marginBottom: 6` : « SOURCES » (fr et en). Puis `<ul>` (`listStyle: 'none'`, `margin: 0`, `padding: 0`, `display: 'flex'`, `flexDirection: 'column'`, `gap: 6`). Chaque `<li>` : `<a href={url} target="_blank" rel="noopener noreferrer">` body 13 px, `--text`, `textDecoration: 'underline'`, `textUnderlineOffset: 3`, `overflowWrap: 'anywhere'`, texte = `source.titre` suivi de ` ↗` dans un `<span>` `--primary` `aria-hidden`. Après le lien, un `<span>` mono 10 px `--muted` avec le nom d'hôte (`new URL(url).hostname` sans `www.`, dans un `try/catch` ; rien si l'URL ne se parse pas), séparé par `marginLeft: 8`. L'URL brute n'est jamais affichée.

**Bas de page** : après les articles, `<Link to="/magazine">` mono 11 px `--text2`, `textDecoration: 'none'`, `display: 'inline-block'` : « ← Tous les numéros » / « ← All issues ». Puis `CaseFooter` avec `docId` « ID NUMÉRO — ML-MAG-000 » / « ISSUE ID — ML-MAG-000 » (avec `issueNo`), `clearance` et `tagline` de `CASE_CHROME[lang]`.

### V7 — Numéro introuvable
Même conteneur (V2). `MagazineMasthead` avec `backTo="/magazine"`, `backLabel` « ← Magazine », `fileNo` « MAGAZINE Nº ??? », `center` identique, `right` « MISRAN LABS », `rightSub` « — ». Puis un bloc `border: var(--border-regular) solid var(--border)`, `padding: isMobile ? 20 : 32` :
- mono 10 px `--muted`, `letterSpacing: '0.1em'`, `overflowWrap: 'anywhere'` : « RÉFÉRENCE DEMANDÉE : {date} » / « REQUESTED REFERENCE: {date} » (`date` = paramètre d'URL, rendu comme texte par React) ;
- `<h1>` Fraunces 700, `fontSize: 'clamp(24px, 3.4vw, 34px)'`, `margin: '10px 0 8px'` : « Numéro introuvable » / « Issue not found » ;
- `<p>` body 15 px `--text2`, `margin: '0 0 20px'` : « Aucun numéro ne correspond à cette date. » / « No issue matches this date. » ;
- `<Link to="/magazine">` mono 11 px `--primary` : « ← Tous les numéros » / « ← All issues ».
Pas de tampon, pas de pied : un dossier manquant n'a pas de cartouche.

### V8 — Catégories

Définies une fois dans `CATEGORIES` (`magazineText.js`) :

| Clé JSON | Libellé FR | Libellé EN | Couleur (carré) |
|---|---|---|---|
| `outils` | OUTILS | TOOLS | `var(--mandarine)` |
| `modeles` | MODÈLES | MODELS | `var(--violet)` |
| `design` | DESIGN | DESIGN | `var(--pink)` |
| `dev` | DEV | DEV | `var(--cyan)` |
| `workflow` | WORKFLOW | WORKFLOW | `var(--warning)` |

Repli (ne devrait pas arriver, la validation rejette une catégorie inconnue) : libellé = la clé en majuscules, couleur `var(--muted)`.
Pourquoi pas `Tag` avec ces couleurs en texte : `Tag` impose un fond `--active-tint` (corail) sous le texte, et l'ambre `--warning` / l'ocre `--cyan` en texte 10 px sur crème sont peu lisibles. La couleur passe donc sur un carré plein, le texte reste en `--text2`. Pourquoi pas `--case-tabs-tint-N` : tokens de niveau composant, réservés à `CaseTabs` par leur nom. Les cinq teintes sémantiques utilisées ici servent déjà de palette catégorielle dans `src/lab/phases.js`.

### V9 — Sidebar (D6)
- `NavItem({ to, number, label, collapsed, end = true })` et `<NavLink to={to} end={end} …>`. Valeur par défaut `true` : tous les appels existants, qui ne passent pas la prop, gardent exactement leur comportement.
- Dans `navList`, entre le bloc Lab et `NavSectionLabel` Portfolio :
  `<NavSectionLabel collapsed={collapsed}>{t(lang, 'navSectionMagazine')}</NavSectionLabel>`
  `<NavItem to="/magazine" number="✎" label={t(lang, 'magazineNav')} end={false} collapsed={collapsed} />`
- Clés i18n à ajouter dans `src/i18n/ui.js` : `navSectionMagazine` (fr « Magazine », en « Magazine ») et `magazineNav` (fr « Magazine », en « Magazine »). Aucun autre texte du magazine dans `ui.js` : ils vivent dans `MAG_TEXT`, comme le `CONTENT` des fiches.
- `end={false}` : react-router compare par segments, donc `/magazine/2026-09-28` active le lien mais pas une hypothétique `/magazines`.

### V10 — Rendu mobile (375 px), récapitulatif
Le seuil est celui de `useIsMobile()` ; rien d'autre ne change que ce qui suit.
- **Les deux pages** : padding du conteneur 20 ; `CaseMasthead`/`MagazineMasthead` se replient déjà (`flexWrap`) ; `CaseMetaRow` passe à une colonne par ligne (base 220 px) — comportement existant des fiches, accepté tel quel ; hero : tampon 52 px, padding 16.
- **`/magazine`** : `IssueRow` en 2 colonnes (bloc empilé + flèche), numéro dans la ligne méta, titre 18 px, padding 14/8.
- **`/magazine/:date`** : édito 17 px, filet gauche + padding 14 ; fiches article padding 20, titre 19 px, encadré « pourquoi » padding 12/14 ; sources et titres avec `overflowWrap: 'anywhere'`.
- Contrôle de l'étape 5 : `document.documentElement.scrollWidth <= window.innerWidth` sur les deux pages (et sur l'état introuvable).

### V11 — Textes (`MAG_TEXT`)
- `home.fileNo` : « RUBRIQUE — MAGAZINE » / « SECTION — MAGAZINE »
- `mastheadCenter` (home et numéro) : « ARCHIVE DU LAB //// REVUE DE VEILLE » / « LAB ARCHIVE //// WATCH REVIEW »
- `home.mastheadRightSub` : « HEBDOMADAIRE » / « WEEKLY »
- Concept (paragraphe de la home) :
  - FR : « Une veille IA hebdomadaire pour les designers et les développeurs : outils, modèles, workflows, Claude, Figma. Chaque lundi, une routine Claude sélectionne et résume l'essentiel de la semaine, puis Michael relit et valide le numéro avant sa parution. »
  - EN : « A weekly AI watch for designers and developers: tools, models, workflows, Claude, Figma. Every Monday, a Claude routine selects and summarizes what mattered that week, then Michael reviews and approves the issue before it goes out. »
- Tous les autres libellés sont donnés en place dans V4–V8.

### V12 — Hors de cette direction
Pas d'image, pas d'illustration, pas d'animation autre que la transition de survol existante. Pas de `document.title` spécifique (non demandé). Pas de mise en avant sur la home (hors périmètre SPEC).
