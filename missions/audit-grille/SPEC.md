# Mission audit-grille — SPEC

Rédigée par Opus (cadrage), 2026-09-28. Brief de Michael : P-004, mission 3 sur 3 — l'outil doit « faire tout ça » : l'audit complet d'un design system (grille notée, priorisation, rapport livrable). Choix validés : dans le Lab, dépôts publics, **pas d'IA**.

## Contexte
Missions 1 et 2 (fusionnées) : `/lab/audit-tokens` lit des tokens (CSS, DTCG, Tokens Studio), applique R1 à R8, lit un dépôt GitHub public et mesure la couverture du code.
- Moteur pur `src/lab/audit/` : `analyse(fichiers, { usagesExternes })`, `mesurerCouverture(fichiersCode, tokens)`, `github.js` (`explorerDepot` → `candidats`, `echantillon`, `eligibles`… ; l'arborescence complète n'est **pas** conservée aujourd'hui), `outils.js` (`analyserCouleur`, `normaliserValeur`…).
- Interface `src/lab/projects/AuditTokens.jsx` (≈ 750 lignes, états `resultat`, `couverture`, `contexteCode`) + `src/lab/projects/audit/` (`SourceGithub.jsx`, `Couverture.jsx`, `textes.js`, `ui.jsx`, `styles.js`) ; rapport Markdown par `construireRapport`.
- Impression : `src/shell/Shell.jsx` masque déjà `.no-print` en `@media print`.
- Vérifications Node : `missions/audit-tokens/verifier-analyse.mjs`, `missions/audit-github/verifier-github.mjs`.

L'audit « à la main » que Michael vend suit 5 temps : cadrer, inventorier, évaluer sur une grille fixe de 7 axes notés 0 à 3, prioriser (impact × effort), livrer un rapport. Les missions 1 et 2 couvrent l'inventaire des tokens et du code ; celle-ci ajoute **la grille, la priorisation et le livrable**.

## Objectif
Après une analyse, la page affiche une **grille notée sur 7 axes** (0 à 3, ou « non évalué »), justifiée critère par critère, ajustable à la main par l'auditeur, une **matrice impact × effort**, et un **rapport d'audit imprimable en PDF** et copiable en Markdown.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Fichiers.** Moteur pur (sans React ni Vite, importable par Node) :
- `src/lab/audit/grille.js` : `evaluerGrille(entrees)` → `{ axes: [ { id, note: 0..3 | null, criteres: [ { id, ok: bool | null, detail: {fr,en} } ], resume: {fr,en} } ], moyenne: number | null, axesEvalues }`. `entrees = { resultat, couverture | null, chemins | null, contrastes | null }`.
- `src/lab/audit/contrastes.js` : `evaluerContrastes(tokens)` (D5).
- `src/lab/audit/priorites.js` : `prioriser({ resultat, couverture, grille })` (D7).
- `github.js` : `explorerDepot` renvoie **en plus** `chemins` : la liste de tous les chemins de fichiers (`blob`) reçus, sans filtre (sert aux axes 4 à 6). Rien d'autre ne change, aucune requête en plus.
Interface : `src/lab/projects/audit/Grille.jsx`, `Matrice.jsx`, `RapportImprimable.jsx` ; textes dans `textes.js` (FR + EN).

**D2 — Les 7 axes et leurs critères.** Note = nombre de critères remplis parmi ceux évaluables, ramené à 0–3 (`round(3 × remplis / évaluables)`) ; axe sans critère évaluable → `null` (« non évalué », affiché grisé avec la raison, ex. « nécessite un dépôt GitHub »).
1. **Architecture des tokens** (fichiers ou dépôt) : aucune erreur (R1, R2) ; ≤ 5 % des tokens avec un avertissement ; au moins 20 % des tokens sont des alias (ont une référence) — signe de niveaux primitive → semantic ; au moins 90 % des tokens JSON ont un type (critère ignoré s'il n'y a pas de JSON).
2. **Couverture du code** (dépôt seulement) : taux ≥ 50 % ; taux ≥ 80 % ; moins de 10 valeurs en dur qui ont déjà un token (`dejaTokenisees`, occurrences cumulées).
3. **Accessibilité** (fichiers ou dépôt) : toutes les paires texte/fond détectées (D5) atteignent 4,5:1 ; au moins 90 % les atteignent ; aucun `outline: none` / `outline: 0` dans l'échantillon de code sans `:focus-visible` dans le même fichier (dépôt seulement, sinon critère non évaluable). Aucune paire détectée → les deux premiers critères sont non évaluables.
4. **Composants** (dépôt seulement) : composants = fichiers `.jsx .tsx .vue .svelte` dont le nom commence par une majuscule, dans un dossier `components/` (ou `ui/`), hors tests et stories. Critères : au moins 5 composants ; au moins 50 % ont une story (`<Nom>.stories.*` n'importe où) ; au moins 50 % ont un test (`<Nom>.test.*` / `.spec.*`).
5. **Documentation** (dépôt seulement) : `README.md` à la racine ; dossier `docs/` ou fichiers `.mdx` ; configuration Storybook (`.storybook/`) ; `CONTRIBUTING.md`.
6. **Gouvernance** (dépôt seulement) : `CHANGELOG.md` ou dossier `.changeset/` ; `CODEOWNERS` (racine, `.github/` ou `docs/`) ; au moins un fichier dans `.github/workflows/` ; `LICENSE*`.
7. **Parité Figma ↔ code** : jamais automatique (`null`, « à évaluer par l'auditeur »), en attendant l'API Figma.

**D3 — Moyenne.** Moyenne des axes évalués, à une décimale, affichée « 2,1 / 3 — 5 axes évalués sur 7 ». Jamais de note sur 100, jamais de note inventée pour un axe non évalué.

**D4 — Ajustement par l'auditeur.** Chaque axe a un bouton « Ajuster » : choix de la note (0, 1, 2, 3 ou « non évalué ») + commentaire libre. Une note ajustée est marquée « ajustée » à côté de la note calculée (toujours visible), et entre dans la moyenne. C'est le seul moyen de noter l'axe 7. Ajustements gardés en mémoire (état React) jusqu'à une nouvelle analyse ; pas de stockage, rien n'est envoyé.

**D5 — Contrastes (`contrastes.js`).** Résoudre chaque token couleur jusqu'à sa valeur finale (via les références, par nom), opaque seulement. Paires = tokens dont le nom (insensible à la casse, par segment `-` `.` `/`) contient `text`, `fg`, `foreground`, `ink` ou commence par `on-` / `on.` × tokens dont le nom contient `bg`, `background`, `surface`, `canvas`, `paper`, **dans le même contexte** (ou contexte `null` avec n'importe lequel). Règle `on-X` : apparier en priorité avec `X`. Contraste WCAG 2.x (luminance relative). Au plus 200 paires (tri par nom) ; résultat `{ paires: [{ texte, fond, ratio, ok }], detectees, echecs }`. La grille (axe 3) et la matrice l'utilisent ; la page liste les échecs (au plus 20) sous l'axe 3.

**D6 — Axes 4 à 6 sans nouvelle requête.** Ils se calculent sur `chemins` (D1). Aucun fichier supplémentaire n'est lu.

**D7 — Matrice impact × effort (`priorites.js`).** Des **sujets agrégés**, pas un point par constat. Table fixe :
| Sujet | Source | Impact | Effort |
|---|---|---|---|
| Références cassées ou circulaires | R1, R2 | fort | faible |
| Valeurs en dur qui ont déjà un token | `dejaTokenisees` | fort | faible |
| Contrastes insuffisants | D5 échecs | fort | moyen |
| Doublons et couleurs quasi identiques | R4, R5 | moyen | faible |
| Couverture < 80 % | couverture | fort | fort |
| Composants sans stories ou sans tests | axe 4 | moyen | fort |
| Documentation manquante | axe 5 | moyen | moyen |
| Gouvernance manquante | axe 6 | moyen | faible |
| Valeurs codées en dur dans les tokens (R3), types manquants (R8), chaînes longues (R7) | R3, R7, R8 | faible | faible |
| Tokens inutilisés | R6 | faible | moyen |
Un sujet n'apparaît que s'il a au moins une occurrence (avec le compte). Quadrants : **Gains rapides** (impact fort, effort faible ou moyen), **Chantiers structurants** (impact fort, effort fort), **Améliorations d'appoint** (impact moyen ou faible, effort faible), **À planifier plus tard** (le reste). Affichage 2 × 2 (une colonne à 375 px).

**D8 — Rapport imprimable.** Bouton « Exporter en PDF » → `window.print()`. Un bloc `RapportImprimable` (masqué à l'écran, visible à l'impression) ; en `@media print`, tout le reste de la page d'audit est masqué (classe `no-print` déjà gérée par `Shell.jsx`, plus une règle locale si besoin). Contenu : titre « Audit de design system », source (dépôt + branche, ou liste des fichiers), date du jour, moyenne, tableau des 7 axes (note, ajustée ou non, commentaire), matrice, 10 premiers constats par gravité, couverture si présente, méthode en 3 lignes, pied « Réalisé avec l'outil d'audit de misran-labs ». Fond clair, texte foncé, pas de couleurs pleines (impression). « Copier le rapport » (Markdown) inclut aussi la grille et la matrice.

**D9 — Appel à l'action.** Texte réécrit (obsolète depuis la mission 2) : l'outil fait le relevé et la note ; un audit complet ajoute l'entretien avec l'équipe, la parité Figma ↔ code, l'usage réel du produit et une feuille de route priorisée. Même lien LinkedIn. **Aucun prix, aucun chiffre économique.**

**D10 — Ordre de la page après analyse.** Grille (avec moyenne) → Matrice → rapport des constats existant → Couverture (si dépôt) → boutons Copier / Exporter en PDF → appel à l'action. Styles : uniquement les tokens existants.

**D11 — Bilingue.** Tous les nouveaux textes FR et EN, y compris le rapport imprimable et le Markdown.

**D12 — Vérification sans réseau.** `missions/audit-grille/verifier-grille.mjs` (Node, `assert`) : contraste WCAG exact sur des paires connues (noir/blanc = 21, `#777`/blanc ≈ 4,48 → échec) ; appariement `on-primary`/`primary` et texte/fond par contexte ; notes de chaque axe sur des entrées construites à la main (y compris `null` sans dépôt) ; arrondi de la note et moyenne ; quadrants de la matrice ; `explorerDepot` renvoie `chemins` (réutiliser le `fetch` simulé et les fixtures de `missions/audit-github/`). Les deux scripts des missions précédentes doivent toujours passer.

**D13 — Impression pendant la mission.** Ne **jamais** cliquer sur « Exporter en PDF » dans une routine (boîte d'impression du Mac). Vérifier plutôt : `window.print` remplacé par une fonction espion via `javascript_tool` avant le clic ; et le rendu imprimé via la présence des règles `@media print` et du bloc `RapportImprimable` dans le DOM.

**D14 — Réseau pendant la mission.** Comme la mission 2 : seul le dépôt public `michael-misran/misran-labs` peut être exploré pour la vérification.

## Critères d'acceptation
1. `node missions/audit-grille/verifier-grille.mjs`, `node missions/audit-github/verifier-github.mjs`, `node missions/audit-tokens/verifier-analyse.mjs` passent.
2. Avec « Auditer les tokens de ce site » (sans dépôt) : grille affichée, axes 2, 4, 5, 6, 7 « non évalués » avec leur raison, axes 1 et 3 notés, moyenne sur 2 axes.
3. Avec « Essayer avec ce site » → Explorer → Analyser : axes 1 à 6 notés, axe 7 non évalué ; chaque note est justifiée critère par critère ; matrice affichée avec au moins un sujet.
4. Ajuster l'axe 7 à 2 avec un commentaire : la moyenne change, la mention « ajustée » et le commentaire apparaissent, et figurent dans le Markdown copié.
5. « Exporter en PDF » (avec `window.print` espionné) appelle `window.print` une fois ; le bloc imprimable contient la grille, la matrice et la source ; des règles `@media print` masquent le reste.
6. Aucune requête réseau supplémentaire par rapport à la mission 2 (2 `api.github.com` + fichiers `raw.githubusercontent.com` par exploration ; aucune pour des fichiers collés).
7. FR et EN complets ; lisible à 375 px sans défilement horizontal de la page ; aucune erreur console.
8. Les fonctionnalités des missions 1 et 2 marchent toujours.
9. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
10. Aucun secret ni chiffre économique dans `git diff main...auto/audit-grille`.
11. Tout est commité sur `auto/audit-grille`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- API Figma (parité automatique), dépôts privés, recommandations rédigées par IA (décisions et secrets avec Michael).
- Sauvegarde des audits, lien de partage, historique d'un même dépôt.
- Génération d'un vrai fichier PDF (bibliothèque) : l'impression du navigateur suffit.
- Contrastes des composites (dégradés, transparences), APCA / WCAG 3.
- Découpage de `AuditTokens.jsx` au-delà de ce que la mission ajoute (le noter si le fichier dépasse 900 lignes).
