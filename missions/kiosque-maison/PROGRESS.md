# Mission kiosque-maison — PROGRESS

**Statut :** étapes 1-9 faites, mission prête pour RAPPORT.md
**Prochaine action :** étape 10 (RAPPORT.md)
**Blocages :** aucun

## Étape 9 (vérification finale)
Critères 1 et 3 vérifiés par grep/git diff (session principale) : lien Google
Fonts unique conforme, aucun fichier de police/`screens/` dans le diff vers
`refonte-kiosque`, les 4 composants existent et sont rendus, `Topbar`/`Sidebar`/
`Statusbar` ne sont plus importés nulle part. Critères 2 et 4-9 vérifiés par le
verificateur (Haiku) dans `npx vite preview` : 6/7 PASS directement ; le 7ᵉ
(FR/EN + document.title) était rapporté FAIL par erreur d'interprétation du
critère (voir DECISIONS.md) — requalifié PASS après vérification par diff Git.
Build et lint OK (déjà confirmés à chaque étape précédente).

## Étape 8 (Colophon + Fiole + nettoyage)
`Colophon.jsx` créé : badge ML, texte de la maison, lien GitHub
(github.com/michael-misran/misran-labs), version reprise de
`statusbarBrand`. Fiole déplacée en `position: fixed; right:24; bottom:24`
directement dans `Shell.jsx` (D6) : plus de `fiole-perch` sur une barre
d'état qui n'existe plus. `--mascotte-overhang` supprimé de `tokens.css`
(devenu inutile, D6 autorisait la suppression). `Topbar.jsx`, `Sidebar.jsx`,
`Statusbar.jsx` supprimés (D7, vérifié : plus aucun import ailleurs que des
mentions textuelles sans rapport dans SessionReplay.jsx/DesignSystem.jsx,
du contenu de pages, pas du code). Vérifié dans `npx vite preview` sur
`/breves/2026-10-03` : Colophon et Fiole rendus correctement en bas de page,
desktop et 375 px (Fiole entière, pas de débordement horizontal), 0 erreur
console. Build et lint OK.

## Étape 7 (Defilant)
`Defilant.jsx` créé : 4 segments à données réelles — titre de la dernière brève
IA (`getDays()[0]`), titre du dernier numéro du Magazine (`getIssues()[0]`),
noms des jeux (`listeJeux()`), nombre de projets visibles du Lab
(`visibleProjects().length`, pas de segment Zine : pas de donnée réelle à
afficher, D5 n'en demande pas). Contenu dupliqué une fois pour la boucle
`translateX(-50%)`. Pause au survol (`animation-play-state: paused`),
`prefers-reduced-motion: reduce` met `animation-name` à `none` (vérifié via
`document.styleSheets`, confirmé en calculant le style sans l'émulation —
`animationName: "defilant-scroll"`). `aria-hidden` sur tout le bandeau :
contenu décoratif/redondant, boucle infinie peu utile au lecteur d'écran.
Branché dans `Shell.jsx`, sous NavTitres, pas sticky (D4). Build et lint OK,
vérifié dans `npx vite preview` (0 erreur console, données correctement
affichées).

## Étape 6 (NavTitres)
`NavTitres.jsx` créé : 5 titres (Gazette/Magazine/Zine/Jeux/Lab), chacun dans sa
typo (gothique/Playfair/BD/pixel/machine à écrire), état actif par préfixe de
route (`/breves*`, `/magazine*`, `/jeux*`, `/lab*` + `/projets*` → Lab),
`aria-current="page"` posé. Le Zine est un `<span aria-disabled>`, pas un lien,
avec la mention « Bientôt ». Barre `position: sticky; top: 0`, collée sous le
Masthead qui défile avec la page. Sur mobile, grille à 5 colonnes avec
`overflow-x: auto`, pas de hamburger. Branché dans `Shell.jsx`. Vérifié dans
`npx vite preview` : actif correct sur `/breves/2026-10-03`, `/projets`, `/jeux`,
barre collante confirmée après scroll (`top: 0`), pas de débordement horizontal
de la page à 375 px. Build et lint OK.

## Étape 5 (Masthead)
`Masthead.jsx` créé : filet haut (marque, date du jour via `formatDateLong`,
liens Les idées/S'abonner/CV, bouton FR/EN) + tête de la maison (badge ML,
« MISRAN LABS » en Ultra, accroche en IM Fell English italique, cartouche
« Kiosque ouvert » masqué sur mobile). Textes fr/en dans `src/i18n/ui.js`
(clé `masthead*`). Branché dans `Shell.jsx`. Vérifié dans `npx vite preview` :
rendu conforme à la référence `screens/accueil-kiosque.src.html`, 0 erreur
console, pas de débordement horizontal à 375 px. Build et lint OK.

## Étape 4 (Shell)
`Shell.jsx` réécrit : document qui défile (plus de grille 100vh/overflow hidden),
Topbar/Sidebar/Statusbar retirés du rendu (fichiers pas encore supprimés, prévu
étape 8 avec D7), SecondarySidebar/Outlet/document.title conservés. Règles
d'impression simplifiées (plus besoin de rétablir height/overflow puisque le
flux est déjà normal). Route `/lab` ajoutée dans `App.jsx` (affiche ArchiveHome)
+ entrée dans `registry.js` pour que `resolveRouteMeta('/lab')` ne tombe pas sur
la 404. État intermédiaire attendu : pas de header/nav visible tant que Masthead/
NavTitres (étapes 5-6) ne sont pas branchés. Vérifié dans `npx vite preview` sur
`/` et `/lab` : rendu correct, 0 erreur console. Build et lint OK.

## Étape 3 (tokens)
Primitives papier/encre/gris/filet/titre-* + polices D2 ajoutées, sémantiques réaffectées
(`--bg`, `--text`, `--border`, `--primary` et leurs dérivés, `--font-heading/body/mono`),
tokens `--titre-*` et `--font-bois/-2/-3/-etiquette/-chapo/-gothique/-bd/-pixel/-ecran/-machine`
ajoutés. Anciennes primitives crème/ink/corail conservées (Fiole, Tokens du Lab) — voir
DECISIONS.md. Build et lint OK.

## État initial (relevé au cadrage, 2026-10-03, branche `refonte-kiosque` = `main` aee617c)
- `npm run build` : OK (share-previews, sitemap, 4 flux RSS écrits).
- `npm run lint` : OK, 0 erreur.

## Reconfirmation (2026-10-04, routine)
- `npm run build` : OK, identique (36 pages d'aperçu, sitemap 37 URL, 4 flux RSS).
- `npm run lint` : OK, 0 erreur.
