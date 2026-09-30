# Mission finitions-lab — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : regrouper cinq finitions relevées dans les rapports des missions précédentes (topo du 2026-09-30, points 1 à 5).

## Contexte
- **Jeu Lost Cauldron** : deux exports web Godot dans `public/games/lost-cauldron-game/` (v0.1, `GameDemo.jsx`) et `public/games/lost-cauldron-game-v0.2/` (`GameDemoV2.jsx`), 36 Mo chacun. Le moteur `index.wasm` (37,7 Mo, **identique** dans les deux : même md5) et `index.js` + les deux worklets audio sont communs ; seuls `index.pck` (le jeu, ~90 Ko) et `index.html` (tailles dans `GODOT_CONFIG.fileSizes`) diffèrent. Vercel sert déjà le wasm compressé en brotli (8,9 Mo transférés, mesuré le 2026-09-30).
- **Accueil du Lab** : `src/modules/ArchiveHome.jsx`, bloc `LatestIssue` (dernier numéro du Magazine), terminé par une rangée de liens (`{c.magRead} →`, `{c.magAll} →`, `gap: 20`). Aucun lien vers `/suivre` sur l'accueil. Libellés « Suivre » existants : `src/suivre/suivreText.js`.
- **`src/lab/projects/AuditTokens.jsx`** : 807 lignes (seuil maison 900). Contient les textes FR/EN (l. 45-185), des sous-composants (`PastilleGravite`, `FiltreGravite`, `GroupeRegle`), des fonctions de texte (`libelleFormat`, `emplacementTexte`, `construireRapport`) et le composant de page. Les autres morceaux sont déjà dans `src/lab/projects/audit/`.
- **Appel à l'action** de la page audit (`ctaTitle`/`ctaText`/`ctaLink`, FR l. 110-112, EN l. 180-182) : le texte dit qu'un audit complet ajoute « une feuille de route priorisée », alors que l'outil produit maintenant lui-même une matrice impact × effort (mission audit-grille).
- **Espacements** : trame `--space-xs|sm|md|lg|xl` = 8/12/16/24/32 px (`src/styles/tokens.css` l. 180-184, primitives `--primitive-size-2|4|10|20` déjà présentes). Environ 190 espacements à 2, 4, 10 ou 20 px sont écrits en dur dans les `.jsx`. Mesure existante : `missions/site-avant-apres/mesurer-audit.mjs avant|apres` (champ `dejaTokenisees`), snapshots de styles calculés : `recevoir-snapshot.mjs` (même dossier). Documentation vivante des tokens : `src/lab/projects/LabTokens.jsx` (l. ~205-209).
- État initial (2026-09-30, `main` 5f5a316) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
Un site plus léger à déployer, un lien vers `/suivre` depuis l'accueil, une page audit plus lisible dans le code et à jour dans son texte, et des espacements qui passent par des tokens.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Moteur Godot partagé.** Créer `public/games/godot-engine/` et y **déplacer** (`git mv`, depuis le dossier v0.1) `index.js`, `index.wasm`, `index.audio.worklet.js`, `index.audio.position.worklet.js` ; supprimer ces 4 fichiers du dossier v0.2 (`git rm`). Dans chacun des deux `index.html` : `<script src="../godot-engine/index.js">`, et dans `GODOT_CONFIG` : `"executable":"../godot-engine/index"`, `"mainPack":"index.pck"` (explicite, sinon Godot cherche le pack à côté du moteur), clés de `fileSizes` adaptées aux chemins réellement demandés (relever dans l'onglet réseau quels chemins Godot utilise ; si une clé ne correspond plus, la barre de chargement reste juste mais sans taille — acceptable, à noter). Rien d'autre ne change dans les `index.html`, `GameDemo.jsx` ni `GameDemoV2.jsx`. **Repli** : si l'une des deux versions ne démarre plus après 2 essais, remettre les fichiers comme avant (`git checkout` des deux dossiers), noter l'échec dans DECISIONS et le RAPPORT, et passer à la suite.
Note pour le RAPPORT : l'historique Git garde l'ancien fichier (le dépôt cloné ne rétrécit pas) ; le gain porte sur chaque déploiement (−36 Mo) et sur le visiteur qui ouvre les deux versions (le moteur est téléchargé une seule fois, puis mis en cache).

**D2 — Lien « Suivre » sur l'accueil.** Dans la rangée de liens en bas de `LatestIssue`, ajouter un troisième lien react-router `Link` vers `/suivre`, poussé à droite (`marginLeft: 'auto'`), même style que `{c.magAll}` (mono 10 px, `letterSpacing: '0.08em'`, `--text2`, sans soulignement), texte `◉ Suivre le Lab →` / `◉ Follow the Lab →` (le `◉` en `--primary`). Texte ajouté dans l'objet `COPY` de `ArchiveHome.jsx` (clé `magFollow`). À 375 px, la rangée passe à la ligne sans débordement (`flexWrap` déjà présent).

**D3 — Découpage de `AuditTokens.jsx`**, sans aucun changement de comportement ni de rendu :
- objets `FR`, `EN` et `CONTENT` → `src/lab/projects/audit/contenu.js` (export `CONTENT`) ;
- `ACCENT_GRAVITE`, `PastilleGravite`, `FiltreGravite`, `GroupeRegle` → `src/lab/projects/audit/Constats.jsx` ;
- `libelleFormat`, `emplacementTexte`, `construireRapport` → `src/lab/projects/audit/rapportTexte.js`.
Imports ajustés, noms inchangés. Objectif : `AuditTokens.jsx` sous 450 lignes. Déplacer du code, ne pas le réécrire.

**D4 — Nouveau texte d'appel à l'action** (dans `contenu.js` après D3) :
- FR — `ctaTitle` : « Besoin d’un audit complet de votre design system ? » (inchangé). `ctaText` : « Cet outil fait le relevé, la note sur 7 axes et la matrice des priorités, à partir des fichiers. Un audit complet y ajoute ce qu’aucun fichier ne montre : l’entretien avec l’équipe, la parité Figma ↔ code, l’usage réel du produit, puis l’accompagnement pendant les corrections. » `ctaLink` inchangé.
- EN — `ctaTitle` inchangé. `ctaText` : « This tool does the survey, the 7-axis score and the priority matrix, from the files. A full audit adds what no file shows: the interview with the team, Figma ↔ code parity, how the product is really used, then support while the fixes are made. » `ctaLink` inchangé.

**D5 — Tokens d'espacement.** Dans `tokens.css`, trame semantic, dans l'ordre croissant autour des existants :
`--space-3xs: var(--primitive-size-2)` · `--space-2xs: var(--primitive-size-4)` · (`--space-xs` 8) · `--space-xs-plus: var(--primitive-size-10)` · (`--space-sm` 12, `--space-md` 16) · `--space-md-plus: var(--primitive-size-20)` · (`--space-lg` 24…). Les ajouter aussi à `LabTokens.jsx` (même format que les lignes `--space-*` existantes).

**D6 — Remplacement des espacements en dur.** Dans les fichiers `.jsx` et `.css` de `src/`, **seulement** pour les propriétés d'espacement (`gap`, `rowGap`, `columnGap`, `padding*`, `margin*`, et leurs équivalents CSS) : toute valeur positive exactement égale à 2, 4, 8, 10, 12, 16, 20, 24 ou 32 px devient le token `--space-*` correspondant (nombre JS `gap: 10` → `gap: 'var(--space-xs-plus)'` ; dans une chaîne multi-valeurs `'6px 10px'` → `'6px var(--space-xs-plus)'`). Valeur rendue strictement identique.
Ne **jamais** toucher : `src/private/`, `src/lab/audit/exemples/`, `src/styles/tokens.css` (définitions), `src/shell/Shell.jsx` et `src/shell/Topbar.jsx` (réservés à la mission menu-barre-haut), les valeurs négatives, les valeurs calculées (`calc`, ternaires dont une branche n'est pas une valeur listée : remplacer seulement les branches qui le sont), les propriétés qui ne sont pas des espacements (`fontSize`, `width`, `borderRadius`, `top`…), les données (textes, JSON). Un token d'un autre rôle n'est jamais utilisé pour un espacement, et inversement.

**D7 — Mesure avant / après.** `node missions/site-avant-apres/mesurer-audit.mjs` : copier le script dans `missions/finitions-lab/` (même contenu, chemin de sortie adapté à ce dossier), lancé une fois **après D5 et avant D6** (étiquette `avant`) puis après D6 (`apres`). Snapshots de styles calculés avant/après D6 avec le même principe que `recevoir-snapshot.mjs` (copie adaptée), sur `/`, `/lab/audit-tokens`, `/magazine`, `/projets`, `/suivre`, à 1280 px et 375 px.

## Critères d'acceptation
1. `public/games/godot-engine/index.wasm` existe, aucun autre `index.wasm` dans `public/` ; `du -sh public/games` < 40 Mo (ou repli D1 documenté).
2. `/lab/lost-cauldron-game/demo` et `/lab/lost-cauldron-game/demo/v2` : le jeu se charge jusqu'à l'écran de jeu (canvas affiché, plus de barre de chargement), pas d'erreur en console, requêtes réseau du wasm en 200.
3. Accueil `/` : lien « ◉ Suivre le Lab → » visible dans le bloc Magazine, mène à `/suivre` sans rechargement ; texte anglais en EN ; à 375 px pas de défilement horizontal.
4. `wc -l src/lab/projects/AuditTokens.jsx` < 450. Sur `/lab/audit-tokens`, avec chacun des 3 exemples et « Tokens du site » : même texte rendu qu'avant découpage (comparaison de `innerText` de la zone de résultats, relevée avant et après, identique), aucune erreur console.
5. Texte D4 affiché en FR et en EN.
6. Les 4 nouveaux tokens existent dans `tokens.css` et apparaissent sur `/lab/lab-tokens` (page 007).
7. `mesure-apres.json` : `nombreDejaTokenisees` inférieur à celui de `mesure-avant.json`, et < 10 visé ; si non atteint, les valeurs restantes et leur raison sont listées dans le RAPPORT.
8. Snapshots avant/après D6 identiques (aucune valeur calculée ne change). Toute différence est expliquée ou corrigée.
9. `grep -rnE "(gap|padding|margin)[A-Za-z]*: ?(2|4|10|20)[,} ]" src --include=*.jsx` hors fichiers exclus par D6 ne renvoie rien (résultat copié dans PROGRESS).
10. Aucune erreur ni avertissement nouveau en console sur les pages de D7.
11. `npm run build` passe ; `npm run lint` : aucune erreur.
12. Tout est commité sur `auto/finitions-lab`, rien sur `main`, rien de poussé.

## Hors périmètre
- Réexporter le jeu depuis Godot, alléger le moteur lui-même, en-têtes de cache dans `vercel.json` (réservé à la mission vrai-404).
- `Shell.jsx`, `Topbar.jsx`, `--mobile-nav-offset` (mission menu-barre-haut).
- Tokens de taille de police, de largeur ou de position.
- Réécrire l'historique Git pour alléger le dépôt.
