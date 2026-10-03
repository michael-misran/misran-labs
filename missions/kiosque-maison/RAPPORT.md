# Mission kiosque-maison — RAPPORT

Rédigé par Claude Sonnet 5 (exécution), 2026-10-04. Cadrage par Claude Opus 5.5, 2026-10-03.

## Fait

Les 10 étapes du PLAN sont faites et commitées sur `auto/kiosque-maison` (base : `refonte-kiosque`, D1) :

0. Cadrage (SPEC, PLAN, fichiers de suivi).
1. État initial confirmé (build/lint OK).
2. Polices : `index.html` charge les 17 familles de D2 en un seul lien Google Fonts (`display=swap`).
3. Tokens (D3) : primitives papier/encre/gris/filet/titre-\* + polices D2 ajoutées dans `src/styles/tokens.css` ; sémantiques `--bg`/`--bg2`/`--bg3`, `--text`/`--text2`/`--muted`/`--prose`, `--border`, `--primary` et dérivés (`--primary-surface`, `--on-primary-surface`, `--active-tint`, `--selected-surface`, `--on-selected`), `--font-heading`/`--font-body`/`--font-mono` réaffectés ; dix tokens de typo (`--font-bois/-2/-3/-etiquette/-chapo/-gothique/-bd/-pixel/-ecran/-machine`) et cinq de couleur de titre (`--titre-*`) ajoutés.
4. `Shell.jsx` : défilement du document (plus de grille 100vh/overflow hidden), route `/lab` ajoutée (affiche `ArchiveHome`, D8), règles d'impression simplifiées.
5. `Masthead.jsx` : filet haut (marque, date, liens Les idées/S'abonner/CV, FR/EN) + tête de la maison (badge ML, « MISRAN LABS » en Ultra, accroche, cartouche « Kiosque ouvert »).
6. `NavTitres.jsx` : 5 titres typographiés, état actif par route, Zine non cliquable (« Bientôt »), barre collante, défilement horizontal sans hamburger sur mobile.
7. `Defilant.jsx` : bandeau défilant à données réelles (dernière brève IA, dernier numéro du Magazine, noms des jeux, nombre de projets visibles), pause au survol, `prefers-reduced-motion`.
8. `Colophon.jsx` + Fiole en `position: fixed` (D6) ; `Topbar.jsx`/`Sidebar.jsx`/`Statusbar.jsx` supprimés (D7) ; `--mascotte-overhang` retiré (devenu inutile).
9. Vérification finale : tous les critères d'acceptation passent (détail ci-dessous).

## Pas fait

Rien du PLAN n'est resté de côté. Tout ce qui n'a pas été fait est volontairement hors périmètre (voir plus bas).

## Critères d'acceptation

1. **Polices** — PASS. Un seul lien `fonts.googleapis.com/css2` dans `index.html`, avec les 17 familles de D2. `git diff refonte-kiosque...auto/kiosque-maison --stat` ne contient aucun `.otf`/`.ttf`/`.woff`/`.woff2` ni fichier de `screens/`. Vérifié par grep.
2. **Tokens CSS** — PASS. `getComputedStyle(document.body).backgroundColor` = `rgb(246, 241, 230)` ; `--font-body` se résout en Crimson Pro. Vérifié dans le navigateur (verificateur).
3. **Composants de cadre** — PASS. `Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx` existent et sont rendus par `Shell.jsx` (8 références). `Topbar`/`Sidebar`/`Statusbar` ne sont plus importés nulle part (grep, fichiers supprimés). Les seules mentions textuelles restantes (`SessionReplay.jsx`, `DesignSystem.jsx`) sont du contenu de page sans rapport, pas du code.
4. **Routes sans erreur console** — PASS. Les 14 routes listées par la SPEC s'affichent sans erreur (verificateur, `npx vite preview`).
5. **Navigation** — PASS. Liens vers `/breves`, `/magazine`, `/jeux`, `/lab` ; Zine non cliquable (`aria-disabled`, pas de `href`) ; `aria-current="page"` correct sur `/breves/2026-10-03` (Gazette), `/projets` (Lab), `/jeux` (Jeux).
6. **Bandeau défilant** — PASS. Contient le titre de la dernière brève IA et du dernier numéro du Magazine (données réelles, pas de texte figé). `prefers-reduced-motion: reduce` met `animation-name` à `none` (confirmé via `document.styleSheets`).
7. **Mobile 375 px** — PASS. `document.documentElement.scrollWidth === window.innerWidth` sur `/`, `/breves`, `/lab/design-system`. La barre de navigation reste visible en haut après défilement (`position: sticky`, confirmé `top: 0` après scroll).
8. **FR/EN et document.title** — PASS. Le bouton change la langue et les textes du cadre. Le verificateur avait d'abord rapporté un FAIL en comparant le titre FR à l'EN (ce qui change normalement, déjà le cas avant la mission) au lieu de comparer `refonte-kiosque` à `auto/kiosque-maison` à langue fixée. Recorrigé par diff Git : `registry.js` n'a reçu qu'une ligne ajoutée (`/lab`), rien de changé pour `/`, `/breves`, `/jeux` ; le `useEffect` de titre dans `Shell.jsx` est resté strictement identique. Pas de régression.
9. **Fiole** — PASS. Visible, entière, non rognée, en bas à droite, desktop et 375 px.
10. **Build/lint** — PASS. `npm run build` et `npm run lint` passent à chaque étape, 0 erreur, 0 régression par rapport à l'état initial.
11. **Git** — PASS. Tout est commité sur `auto/kiosque-maison` (10 commits). `main` et `refonte-kiosque` sont restés à `aee617c`, inchangés. Rien n'a été poussé.

## Comment vérifier

```bash
git checkout auto/kiosque-maison
npm run build
npm run lint
npx vite preview --port 4173
```

Puis ouvrir `http://localhost:4173/` et naviguer : filet haut (date, liens, FR/EN), tête de la maison, barre des 5 titres (collante au défilement), bandeau défilant (données réelles), contenu des pages inchangé dans son agencement, Colophon et Fiole en bas de page. Réduire la fenêtre à 375 px pour vérifier l'absence de défilement horizontal.

## Décisions

Toutes consignées dans `DECISIONS.md` avec leur raison. Points marquants :
- Les anciennes primitives crème/ink/corail sont conservées (non supprimées) : `fiole.css` les consomme directement et la page « Tokens du Lab » (`LabTokens.jsx`) les recopie en dur — toutes deux hors périmètre de cette mission.
- `--primitive-font-playfair-display` n'a pas de token sémantique dédié (D3 n'en listait pas) : utilisée directement dans `NavTitres.jsx` pour le seul titre « Le Magazine ».
- Les tokens `--surface-*`, `--grid-line`, `--active-tint`, `--selected-surface`, `--elev-4/5/inset/pressed` ont été repointés vers la nouvelle palette même si D3 ne les nommait pas explicitement, pour que les pages intérieures héritent une identité visuelle cohérente sans toucher leur JSX.

## Délégations (modèles réellement utilisés)

- Cadrage (étape 0) : Claude Opus 5.5.
- Étape 2 (polices) : sous-agent `general-purpose` sur Haiku.
- Étape 9 (vérification navigateur) : sous-agent `verificateur` sur Haiku.
- Toutes les autres étapes : session principale, Claude Sonnet 5.

Détail complet dans `DELEGATIONS.md`.

## Recommandations

- **Prochaine mission (kiosque-une)** : la page d'accueil kiosque à `/` (la Gazette du jour à la une, les présentoirs de couvertures, le bulletin d'abonnement), avec les vraies données. `/` affiche encore `ArchiveHome` dans cette mission-ci, en attendant.
- Puis, dans l'ordre déjà fixé par la SPEC : **gazette-web**, **magazine-web**, **jeux-arcade**, **lab-dossiers** (qui doit aussi mettre à jour la page « Tokens du Lab », restée décrite avec l'ancienne palette), **kiosque-annexes**, **zine** (à cadrer avec Michael, contenu à fournir).
- Le fichier de référence `screens/accueil-kiosque.src.html` (et son rendu `screens/accueil-kiosque.html`) reste utile pour les prochaines missions de la refonte (présentoirs, couleurs par rubrique) : toujours local, exclu de Git.
