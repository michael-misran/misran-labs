# Mission idees-cv — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 7e mission : les idées et le CV, rattachés au Lab).

## Contexte
- **Les idées** (P-NNN) vivent à `/projets` (`src/projets/ProjetsHome.jsx`), `/projets/:id` (`ProjetIdee.jsx`) et `/projets/fonctionnement` (`ProjetsFonctionnement.jsx`), avec `ProjetsParts.jsx` et `projetsText.js` (`STATUTS`, `TYPES`, `TAILLES`, `PROJ_TEXT`). Les données sont dans `src/projets/idees.js` (`getIdeas()`, `getIdea(id)`) et les fiches JSON dans `src/projets/idees/`.
- **Le CV** est `src/modules/CVModule.jsx` (264 lignes), servi à `/lab/cv`.
- Ces pages utilisent `CaseFile.jsx` et parfois `MagazineParts.jsx`. La mission **lab-dossiers** restyle `CaseFile` en dossier confidentiel (en parallèle) : cette mission-ci ne touche pas `CaseFile`. Elle habille le contenu propre aux idées et au CV.
- Dans la navigation de la maison, les idées et le CV appartiennent au **Lab** (titre vert `--titre-lab`, univers « dossiers confidentiels », Special Elite).

## Objectif
Les idées deviennent des **notes de recherche classées** et le CV une **fiche d'agent**, dans l'univers dossiers du Lab. Le contenu et les données ne changent pas.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** `src/projets/ProjetsHome.jsx`, `ProjetIdee.jsx`, `ProjetsFonctionnement.jsx`, `ProjetsParts.jsx`, `projetsText.js` (ajouts seulement) et `src/modules/CVModule.jsx`. **Interdit** : `src/projets/idees/` (données), `idees.js`, `src/lab/*` (dont `CaseFile.jsx`), `MagazineParts.jsx`, et les fichiers des règles communes. Si une page importe `MagazineParts` uniquement pour un élément d'habillage, elle peut le remplacer par un équivalent local (dans `ProjetsParts.jsx`).

**D2 — `/projets`, le tiroir des idées.**
- Un en-tête « NOTES DE RECHERCHE — LES IDÉES DU LAB », tapé à la machine, avec le nombre d'idées.
- Chaque idée est une **fiche bristol** : papier blanc, lignes fines bleues, un trou de perforation en CSS, « P-NNN » tapé en gros, le titre, le type et la taille, et un **tampon de statut** dont la couleur et l'inclinaison dépendent du statut (à l'étude, en cours, gardée, arrêtée… d'après `STATUTS`). Une décision de Michael, si elle existe, est annotée comme une note manuscrite (en `--font-chapo` italique).
- Les filtres ou tris existants sont conservés, habillés en onglets de classeur.

**D3 — `/projets/:id`, une note de recherche** : en-tête « NOTE P-NNN · CLASSEMENT : public », les champs tapés, le contenu de la fiche dans l'ordre actuel, le tampon de statut et la navigation actuelle.

**D4 — `/projets/fonctionnement`** : le même contenu, présenté comme une « note de service ».

**D5 — `/lab/cv`, la fiche agent.** Une **fiche signalétique** : bandeau « FICHE AGENT · M. MISRAN », un cadre photo vide façon dossier avec « PHOTO NON COMMUNIQUÉE » (pas de photo de Michael), les champs tapés (rôle, années d'expérience, spécialités…), puis le parcours sous forme de **rapports de mission** datés et les compétences en liste tapée. Le contenu reste celui du CV actuel. La mise en page d'impression existante du CV (`print-only` et `no-print`) est conservée et toujours lisible à l'impression.

**D6 — Lisibilité.** Special Elite pour les titres, les champs et les étiquettes. Les paragraphes longs restent en `--font-body`.

## Critères d'acceptation
1. Le diff ne touche que les fichiers de D1 et `missions/idees-cv/`.
2. `/projets` affiche une fiche par idée de `getIdeas()`, chacune avec un lien vers `/projets/<id>` et son tampon de statut. Les filtres existants fonctionnent toujours.
3. `/projets/<chaque id>` et `/projets/fonctionnement` s'affichent sans erreur console, avec le même texte qu'avant la mission. Comparaison par `innerText` hors habillage : aucune phrase de contenu disparue.
4. `/lab/cv` affiche « FICHE AGENT » et tout le contenu du CV actuel. L'aperçu d'impression (émulation `print`) reste lisible.
5. En anglais, aucun texte ajouté par la mission ne reste en français.
6. À 375 px, `document.documentElement.scrollWidth === window.innerWidth` sur `/projets`, `/projets/<un id>` et `/lab/cv`.
7. `document.title` inchangé sur ces pages.
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/idees-cv`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- `CaseFile.jsx` (lab-dossiers), la routine des idées du dimanche et son format JSON.
- Une vraie photo de Michael (à lui de décider plus tard).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
