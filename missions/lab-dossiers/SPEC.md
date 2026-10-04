# Mission lab-dossiers — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 6e mission : le Lab). Michael avait demandé : « pour le lab j'aurais plus vu un genre de police typewritter de dossier confidentiels ».

## Contexte
- **L'index du Lab** est `src/modules/ArchiveHome.jsx` (405 lignes), servi à `/lab` (et encore à `/` avant la refonte). Aujourd'hui c'est un portfolio « M. PORTFOLIO » avec un protocole en 5 étapes et un index de dossiers.
- **Les fiches projets** `/lab/:slug` passent par `src/lab/ProjectPage.jsx`, puis par les pages de `src/lab/projects/*.jsx`. Elles utilisent l'habillage commun `src/lab/CaseFile.jsx` (`CaseMasthead`, `CaseMetaRow`, `CaseFooter`, la pile d'onglets…), `src/lab/caseChrome.js`, `src/lab/CaseStudyLayout.jsx` et `src/lab/ToolProcessTemplate.jsx`.
- **Les données** sont dans `src/lab/projects.js` : `PROJECTS`, `visibleProjects()`, `dossierNo(slug)` et `pt(project, lang)`.
- `CaseFile.jsx` sert aussi aux Projets/idées, au CV, à Suivre, au Magazine et à la Gazette (pour ces deux derniers, d'autres missions les en détachent). **Restyler `CaseFile` transformera donc aussi les Projets, le CV et Suivre** : c'est voulu, ils font partie de l'univers « dossiers ».
- La page « Tokens du Lab » (`src/lab/projects/LabTokens.jsx`, dossier 007) documente les tokens. Elle décrit encore l'ancienne palette crème et corail, recopiée en dur.

## Objectif
Le Lab devient une **armoire de dossiers confidentiels** : chemises kraft, étiquettes et textes tapés à la machine (Special Elite), tampons « CONFIDENTIEL » barré et « DÉCLASSIFIÉ » en vert `--titre-lab`, onglets de classeur. L'esprit est celui de la couverture Lab du kiosque.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** `src/modules/ArchiveHome.jsx`, `src/lab/CaseFile.jsx`, `src/lab/caseChrome.js`, `src/lab/CaseStudyLayout.jsx`, `src/lab/ToolProcessTemplate.jsx`, `src/lab/projects/LabTokens.jsx`, un nouveau `src/lab/DossierParts.jsx`, et les fichiers de textes du Lab s'ils existent (`labRulesContent.js`, ajouts seulement). **Interdit** : le contenu des autres pages de `src/lab/projects/` (DesignSystem, AuditTokens, TheLostCauldronGame…), `src/lab/audit/`, `projects.js`, `src/projets/`, `src/modules/CVModule.jsx`, et tous les fichiers listés dans les règles communes.

**D2 — `/lab`, l'armoire.**
- En tête, une **chemise kraft** pleine largeur : un onglet « ML-LAB », et une étiquette tapée à la machine « DOSSIERS DU LAB · AGENT : M. MISRAN · CLASSEMENT : ouvert au public · PIÈCES : <nombre de visibleProjects()> », avec le tampon « ~~CONFIDENTIEL~~ DÉCLASSIFIÉ ».
- Le **protocole en 5 étapes** existant devient une « note de service » tapée à la machine. Le contenu ne change pas, seul l'habillage change.
- L'**index des dossiers** : chaque projet est une chemise avec son onglet (numéro `dossierNo`), son titre tapé, une ligne de méta (type, statut, date si disponible) et un lien vers `/lab/<slug>`. Disposition en grille, avec un léger décalage des onglets comme dans un classeur.
- Les informations de portfolio d'`ArchiveHome` (rôle, statut, accent…) sont conservées, sur une « fiche agent ».

**D3 — `CaseFile`, l'habillage des fiches.** `CaseMasthead` devient l'en-tête d'un dossier : une bande kraft, « DOSSIER N° xxx » tapé et un tampon. `CaseMetaRow` devient un tableau de champs tapés (« CHAMP : valeur »). `CaseFooter` devient le pied d'un document confidentiel. La pile d'onglets devient des **onglets de classeur kraft**, en Special Elite, et l'onglet actif est sur papier blanc. Les **noms des exports et leurs props ne changent pas** : toutes les pages qui les utilisent doivent continuer de fonctionner sans modification. Les tokens component des onglets de `tokens.css` restent intacts : les nouvelles teintes kraft se déclarent en constantes dans `caseChrome.js` ou `DossierParts.jsx`.

**D4 — Tokens du Lab.** La page 007 présente la **nouvelle palette de la maison**, lue dans les variables CSS calculées plutôt que recopiée en dur dans la mesure du possible : papier, encre, filets, les 5 couleurs de titres et les polices de chaque titre. Elle explique en quelques lignes le concept « maison d'édition / un univers par titre ». La partie sur l'architecture primitive → semantic → component est conservée.

**D5 — Lisibilité.** Special Elite est réservé aux titres, étiquettes, champs et notes courtes. Les longs paragraphes des fiches restent en `--font-body`. À 375 px, rien ne déborde.

## Critères d'acceptation
1. Le diff ne touche que les fichiers de D1 et `missions/lab-dossiers/`.
2. Sur `/lab`, l'étiquette affiche « PIÈCES : n » où n = `visibleProjects().length`. Chaque projet visible a un lien vers `/lab/<slug>` avec son numéro de dossier.
3. Chaque fiche `/lab/<slug>` de `visibleProjects()` s'affiche sans erreur console, avec l'en-tête de dossier et les onglets de classeur.
4. Sans erreur console et sans changement de contenu (seul l'habillage change) : `/projets`, `/projets/fonctionnement`, `/projets/<un id>`, `/lab/cv` et `/suivre`.
5. La page `/lab/lab-tokens` affiche les 5 couleurs de titres de la maison. `git grep -n "#dd5a3e" -- src/lab/projects/LabTokens.jsx` ne renvoie rien.
6. En anglais, aucun texte ajouté par la mission ne reste en français.
7. À 375 px, `document.documentElement.scrollWidth === window.innerWidth` sur `/lab`, `/lab/design-system` et `/lab/cv`.
8. `document.title` inchangé sur `/lab` et `/lab/<slug>`.
9. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
10. Tout est commité sur `auto/lab-dossiers`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- Le contenu des fiches projets, les pages Projets/idées et le CV (mission idees-cv), Suivre (kiosque-annexes).
- Supprimer les anciennes primitives crème et corail de `tokens.css` (mission de finitions).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
