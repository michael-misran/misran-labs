# Mission projets — DECISIONS

Décisions prises sans Michael. Les décisions D1–D9 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 0 | Validation stricte des clés comme garde-fou de confidentialité | Des idées « qui rapportent » sur une page publique : une info économique ne doit pas pouvoir fuiter par un champ en trop. |
| 2026-09-27 | 0 | Première idée = l'app de mandats immobiliers citée par Michael | Idée réelle, aucune idée inventée par le cadrage. |
| 2026-09-27 | 2 | Direction visuelle : `/projets` = registre en lignes calqué sur `IssueRow` du Magazine, numéro `P-001` en colonne de tête (Fraunces 700, `--primary`) ; détail = gabarit `MagazineMasthead` + `ProjetsHero` + `CaseMetaRow`. Détail complet ci-dessous. | Même univers « archive imprimée » que le Magazine, composants déjà éprouvés à 375 px ; aucun nouveau token. |
| 2026-09-27 | 2 | Statut = marque `StatusMark` à triple codage : glyphe distinct + libellé texte + couleur (glyphe et bordure seulement). Le texte du libellé reste toujours en `--text`. | D4 (pas seulement la couleur) ; `--mandarine`/`--warning` sur crème sont sous 3:1, d'où couleur réservée au glyphe/bordure et choix de tokens contrastés. |
| 2026-09-27 | 2 | Filtres : même logique que `LabTokens` (Set, tout actif au départ, clic = bascule), compteur par statut dans chaque pilule, calculé sur la liste complète ; bouton « Tout afficher » visible seulement si un filtre est désactivé. | Réutilise un comportement existant du site ; compteurs stables quel que soit le filtre. |
| 2026-09-27 | 2 | Lien de mission : lien GitHub (`/tree/main/missions/<nom>`) seulement si `faite` ; pour `en-cours`, nom de mission en texte sans lien. | Une mission en cours vit sur une branche `auto/*` non poussée : un lien serait cassé. |
| 2026-09-27 | 2 | Bloc privé local : `<aside>` à bordure épaisse **en tirets** `--error` sur fond `--bg3`, bandeau « NOTES PRIVÉES (LOCAL) — DEV UNIQUEMENT · NON PUBLIÉ », contenu en `<pre>` pre-wrap. | Aucune autre surface du site n'utilise une bordure en tirets rouille : impossible à confondre avec du contenu public. |

## Direction visuelle — étape 2

Rédigée par l'expert (Opus 5.5). À suivre telle quelle aux étapes 3-4. Aucun nouveau token : uniquement ceux listés. Interdit dans `src/projets/*.jsx` : `#hex`, `rgb()`, `rgba()` (critère 8).

### A. Fichiers et composants

| Fichier | Contenu |
|---|---|
| `src/projets/projetsText.js` | Pas de composant (règle react-refresh, comme `magazineText.js`). Exporte `STATUTS`, `TYPES`, `TAILLES`, `PROJ_TEXT` (fr/en : `home`, `idee`, `prive`), `statutLabel()`, `typeLabel()`, `tailleLabel()`. Réutilise `formatDateShort` importé de `../magazine/magazineText`. |
| `src/projets/ProjetsParts.jsx` | `ProjetsHero`, `StatusMark`, `StatusFilter`, `IdeaRow`, `PrivateNotes`. |
| `src/projets/ProjetsHome.jsx` | Page `/projets`. |
| `src/projets/ProjetIdee.jsx` | Page `/projets/:id` + `NotFound` local. |

Réutilisés tels quels : `CaseMasthead`, `CaseMetaRow`, `CaseFooter`, `CASE_CHROME` (`src/lab/CaseFile.jsx`), `MagazineMasthead` (import depuis `../magazine/MagazineParts`, il est déjà générique : `backTo`, `backLabel`…), `SectionTitle`, `Stamp`, `useIsMobile`, `useLanguage`.

`ProjetsHero` = copie de `MagazineHero` dont seul le tampon change : `<Stamp label="MISRAN · LABS · PROJETS ·" size={isMobile ? 52 : 72} />`. (Ne pas modifier `MagazineHero` : hors périmètre.)

Conteneur de page identique au Magazine : `padding: isMobile ? 20 : 40`, `maxWidth: 880`, `margin: '0 auto'`, `fontFamily: var(--font-body)`, `color: var(--text)`.

### B. Statuts — table `STATUTS` (dans `projetsText.js`)

| clé | FR | EN | glyphe | `color` (glyphe + bordure) | style de bordure |
|---|---|---|---|---|---|
| `proposee` | PROPOSÉE | PROPOSED | `○` | `var(--text2)` | `dashed` (brouillon, pas encore tranché) |
| `gardee` | GARDÉE | KEPT | `◆` | `var(--cyan)` (ocre) | `solid` |
| `en-cours` | EN COURS | IN PROGRESS | `◐` | `var(--violet)` | `solid` |
| `faite` | FAITE | DONE | `✓` | `var(--primary)` | `solid` |
| `arretee` | ARRÊTÉE | STOPPED | `✕` | `var(--error)` | `solid` |

Ne pas utiliser `--mandarine` ni `--warning` pour un statut (contraste insuffisant sur crème). Ordre d'affichage des filtres = ordre de ce tableau (cycle de vie).

**`StatusMark({ statut, lang, size = 'sm' })`** — `<span>` inline-flex, `alignItems: center`, `gap: 6`, `fontFamily: var(--font-mono)`, `fontSize: 10` (`'md'` : 11), `letterSpacing: '0.08em'`, `textTransform: 'uppercase'`, **`color: var(--text)`** (libellé toujours en encre), `border: var(--border-thin) <style> <color>`, `borderRadius: var(--radius-xs)`, `padding: '2px 8px'`, `background: var(--bg)`, `whiteSpace: 'nowrap'`. Contient `<span aria-hidden="true" style={{ color: <color>, fontSize: 11, lineHeight: 1 }}>{glyphe}</span>` puis le libellé. Sens porté par le texte ; glyphe et couleur = repères redondants.

### C. `/projets` (liste)

Ordre vertical :
1. `CaseMasthead` avec `fileNo` « RUBRIQUE — PROJETS » / « SECTION — PROJECTS », `mastheadCenter` « ARCHIVE DU LAB //// REGISTRE DES IDÉES » / « LAB ARCHIVE //// IDEA REGISTER », `mastheadRight` « MISRAN LABS », `mastheadRightSub` « HEBDOMADAIRE » / « WEEKLY ».
2. `ProjetsHero` `number="◇"` (symbole de la sidebar, D6), `title` « Projets » / « Projects », `subtitle` « IDÉES PROPOSÉES PAR CLAUDE — TRIÉES PAR MICHAEL » / « IDEAS PROPOSED BY CLAUDE — SORTED BY MICHAEL ». Enfant `CaseMetaRow` : `IDÉES` → total ; `CADENCE` → « Chaque semaine » / « Every week » ; `DÉCISION` → « Michael, sur proposition d'une routine Claude » / « Michael, on a Claude routine's proposal ».
3. Paragraphe concept (même style que le Magazine : 15 px, `lineHeight 1.7`, `--prose`, `maxWidth 720`, marge basse 32) : principe hebdomadaire, numérotation jamais réutilisée, idées arrêtées conservées (pour ne pas les reproposer), **« le modèle économique de chaque idée n'est pas publié »**.
4. Bloc filtres (voir D).
5. Ligne de résultat : mono 10, `--muted`, `aria-live="polite"`, marge `16px 0 8px` : « 3 idées affichées sur 5 » / « 3 of 5 ideas shown ».
6. `SectionTitle` « Registre » / « Register », puis `<ol>` sans puces, `borderBottom: var(--border-thin) solid var(--border)`, un `<li>` par idée → `IdeaRow`. Tri numéro décroissant (fourni par `idees.js`).
   - Aucune idée du tout : `PROJ_TEXT.home.empty` (« Aucune idée proposée pour l'instant. »), style `empty` du Magazine.
   - Filtres ne laissant rien : « Aucune idée pour ce filtre. » + le bouton « Tout afficher ».
7. `CaseFooter` `docId` « ID RUBRIQUE — ML-PROJETS » / « SECTION ID — ML-PROJECTS », `clearance`/`tagline` de `CASE_CHROME`.

**`IdeaRow({ idee, lang })`** — `<Link to={`/projets/${idee.id}`}>`, survol `background: var(--hover-tint)` (comme `IssueRow`), `borderTop: var(--border-thin) solid var(--border)`.
- Desktop : grille `gridTemplateColumns: '96px 1fr auto'`, `columnGap 20`, `alignItems: 'start'`, `padding: '18px 12px'`.
  - Col. 1 — **le numéro** : `idee.id` (« P-001 ») en `var(--font-heading)` 700, 22 px, `lineHeight 1`, `color: var(--primary)`, `whiteSpace: nowrap`, `fontVariantNumeric: 'tabular-nums'`, `paddingTop 2`.
  - Col. 2 — titre (heading 700, 20 px, `lineHeight 1.2`, `--text`, `overflowWrap: anywhere`) ; résumé (body 14 px, `lineHeight 1.6`, `--prose`, marge haute 6) ; ligne méta (mono 10, `--muted`, `letterSpacing 0.08em`, uppercase, marge haute 8) : `PRODUIT · TAILLE MOYENNE · 27.09.2026` (EN : `PRODUCT · MEDIUM SIZE · 27.09.2026`).
  - Col. 3 — `StatusMark` puis flèche `→` (mono 14, `--primary`, `aria-hidden`), en ligne, `gap 10`.
- Mobile : pas de grille. Ligne 1 = flex `space-between` : numéro (heading 700, 20 px, `--primary`) | `StatusMark`. Puis titre (18 px), résumé (14 px), méta. Pas de flèche (toute la ligne est le lien). `padding: '14px 8px'`.
- Idée `arretee` : numéro en `--muted` et titre en `--text2` (dossier classé), le reste inchangé. Pas de texte barré (lisibilité).

### D. Filtres par statut

Libellé de groupe au-dessus : mono 9, `letterSpacing 0.1em`, `--muted`, « FILTRER PAR STATUT » / « FILTER BY STATUS ». Conteneur : `role="group"` + `aria-label` identique, `display flex`, `flexWrap: 'wrap'`, `gap 8`.

État : `const [actifs, setActifs] = useState(() => new Set(Object.keys(STATUTS)))`, bascule identique à `toggleTier` de `LabTokens`. Compteurs `compte[statut]` calculés sur **toutes** les idées (pas sur la liste filtrée).

**`StatusFilter({ statut, label, count, active, onClick })`** — adapté de `FilterPill` :
- `<button type="button" aria-pressed={active}>`, flex, `gap 6`, mono 11 (mobile 10), `letterSpacing 0.04em`, uppercase, `cursor: pointer`, `padding: '7px 12px'` (mobile `'8px 10px'`, `minHeight 36`).
- Actif : `color: var(--text)`, `background: var(--bg2)`, `border: var(--border-thin) <style du statut> <color du statut>`, `fontWeight 700`, glyphe en `<color du statut>`.
- Inactif : `color: var(--muted)`, `background: var(--bg3)`, `border: var(--border-thin) solid var(--border)`, `fontWeight 400`, glyphe en `var(--muted)`.
- Contenu : glyphe (`aria-hidden`) + libellé + compteur `<span style={{ fontWeight: 400, color: var(--muted) }}>· {count}</span>`. Nom accessible = « Gardée · 3 ».
- Compteur à 0 : pilule affichée quand même, non désactivée (disposition stable).

Bouton « Tout afficher » / « Show all » : rendu **seulement** si au moins un statut est inactif ; lien texte (pas une pilule) mono 11, `--primary`, sans bordure ni fond, remet le Set complet.

### E. `/projets/:id` (détail)

1. `MagazineMasthead` : `backTo="/projets"`, `backLabel` « ← Projets » / « ← Projects », `fileNo` `PROJET ${id}` / `PROJECT ${id}`, `center` = même centre que la liste, `right` « MISRAN LABS », `rightSub` = `formatDateShort(idee.date)`.
2. `ProjetsHero` `number={idee.id}` (P-001 à la place du numéro de dossier), `title={idee.titre[lang]}`, `subtitle` « PROPOSÉE LE 27.09.2026 » / « PROPOSED ON 27.09.2026 ». Enfant `CaseMetaRow` : `TYPE` → libellé du type ; `TAILLE` / `SIZE` → libellé de taille ; `STATUT` / `STATUS` → `value={<StatusMark statut size="md" />}` (le `value` accepte un nœud React).
3. Chapô = `resume` avec le traitement de l'édito du Magazine : `borderLeft: var(--border-thick) solid var(--primary)`, `paddingLeft` 20 (mobile 14), heading 600, 19 px (mobile 17), `lineHeight 1.5`, `maxWidth 720`, marge basse 40.
4. `SectionTitle` « Le problème » / « The problem » → paragraphe body 15 px, `lineHeight 1.7`, `--prose`, `maxWidth 720`, marge basse 32.
5. `SectionTitle` « L'idée » / « The idea » → même style.
6. `SectionTitle` « Décision » / « Decision » → encadré `border: var(--border-thin) solid var(--border)`, `background: var(--bg2)`, `padding` 20 (mobile 16), `maxWidth 720` :
   - Ligne d'en-tête flex wrap `gap 10` : `StatusMark` + mono 10 `--muted` « DÉCISION DU 28.09.2026 » / « DECISION OF 28.09.2026 ».
   - Note : body 15 px, `--text`, marge haute 10. Pour `arretee`, précédée du label mono 10 `--error` « RAISON DE L'ARRÊT » / « WHY IT WAS STOPPED ».
   - Pas de `decision` (cas `proposee`) : `StatusMark` + texte `--text2` « En attente de décision — Michael tranche en écrivant à Claude. » / « Awaiting decision — Michael decides by writing to Claude. »
   - `mission` présente : ligne mono 11 sous la note, `borderTop: var(--border-thin) solid var(--border)`, `paddingTop 12`, marge haute 14 : label « MISSION » `--muted` puis
     - `faite` → `<a href="https://github.com/michael-misran/misran-labs/tree/main/missions/<nom>" target="_blank" rel="noopener noreferrer">` en `--text`, souligné (`textUnderlineOffset 3`), suivi de `↗` en `--primary` (même motif que `SourceList`) ;
     - `en-cours` → nom de la mission en texte simple `--text` (pas de lien).
7. `PrivateNotes` (dev seulement, voir F), marge haute 40.
8. Lien « ← Toutes les idées » / « ← All ideas » (mono 11, `--text2`, marge basse 40), puis `CaseFooter` `docId` `ID IDÉE — ML-${id}` / `IDEA ID — ML-${id}`.

**Idée introuvable** : reprendre `NotFound` de `MagazineIssue.jsx` à l'identique de structure — `MagazineMasthead` (`fileNo` « PROJET P-??? », `rightSub` « — »), encadré `var(--border-regular) solid var(--border)`, label mono « RÉFÉRENCE DEMANDÉE : P-999 » / « REQUESTED REFERENCE: P-999 » (`overflowWrap: anywhere`, l'id vient de l'URL), `h1` « Idée introuvable » / « Idea not found », texte « Aucune idée ne porte ce numéro. » / « No idea has this number. », lien `--primary` « ← Toutes les idées ». Une idée rejetée par la validation D2 est aussi « introuvable » (pas d'autre message public).

### F. Bloc « Notes privées (local) » — `PrivateNotes({ id, lang })`

Rendu seulement si `import.meta.env.DEV` (le composant lui-même renvoie `null` sinon ; le `import.meta.glob` non eager reste dans la branche `if (import.meta.env.DEV)` exigée par D5).

- Conteneur `<aside aria-label="Notes privées (local)">` : `border: var(--border-thick) dashed var(--error)`, `background: var(--bg3)`, `padding` 20 (mobile 14), `maxWidth 720`. Aucune autre surface du site n'est en tirets rouille : c'est le signe distinctif.
- Bandeau haut, flex `space-between` wrap `gap 8`, `borderBottom: var(--border-thin) dashed var(--error)`, `paddingBottom 10`, marge basse 12 :
  - gauche : mono 10, 700, `letterSpacing 0.1em`, `color: var(--error)` : « ✕ NOTES PRIVÉES (LOCAL) — DEV UNIQUEMENT · NON PUBLIÉ » / « ✕ PRIVATE NOTES (LOCAL) — DEV ONLY · NOT PUBLISHED » ;
  - droite : mono 10, `--muted`, `overflowWrap: anywhere` : `src/private/projets/P-001.md`.
- Contenu : `<pre>` `whiteSpace: 'pre-wrap'`, `overflowWrap: 'anywhere'`, mono 12, `lineHeight 1.6`, `--text`, `margin 0`, fond transparent. Texte brut, aucun rendu Markdown.
- Chargement en cours : mono 10 `--muted` « Chargement… » / « Loading… ».
- Fichier absent : même cadre, texte body 14 `--text2` « Aucune note privée pour cette idée. Créer `src/private/projets/P-001.md` (gabarit dans `src/projets/FORMAT.md`). »

### G. Mobile (375 px)

- `useIsMobile()` comme partout ; conteneur `padding 20` → largeur utile 335 px.
- Filtres : `flexWrap: 'wrap'` (pas de défilement horizontal : les 5 statuts restent visibles), pilules mono 10, `padding '8px 10px'`, `minHeight 36` ; 5 pilules + compteurs tiennent sur 2-3 lignes. Le bouton « Tout afficher » passe à la ligne s'il le faut.
- Liste : disposition mobile de `IdeaRow` (§C). Tous les textes longs en `overflowWrap: 'anywhere'`.
- `ProjetsHero` : `padding '16px 16px'`, tampon 52 px (déjà prévu dans la copie de `MagazineHero`). `CaseMetaRow` s'empile tout seul (`flex 1 1 220px`).
- Détail : `StatusMark` dans `CaseMetaRow` avec `whiteSpace: nowrap` (plus court libellé qui déborde : « IN PROGRESS », ~110 px, OK).
- Aucun élément à largeur fixe > 335 px ; `<pre>` du bloc privé en `pre-wrap` (jamais de défilement horizontal).
