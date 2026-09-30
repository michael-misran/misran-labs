# Mission menu-mobile — RAPPORT

Branche `auto/menu-mobile`. Terminée le 2026-09-30 par la tâche programmée `misran-labs-missions` (session principale Sonnet 5, sous-agents Haiku 4.5).

## Fait
- **D1 — Chevauchement du bouton ☰.** Nouvelle variable CSS component `--mobile-nav-offset` dans [tokens.css](../../src/styles/tokens.css), égale à l'ancien calcul du `top` du bouton (`calc(var(--chrome-height) + var(--space-sm))`, 44px). Utilisée par [Shell.jsx](../../src/shell/Shell.jsx) à deux endroits liés : le `top` du bouton ☰ (valeur inchangée, même position, même style) et le `paddingTop` de `<main className="shell-main">`, ajouté uniquement en mobile (`calc(var(--mobile-nav-offset) + 30px + var(--space-sm))`, soit 86px — 30px = hauteur mesurée du bouton, 12px de marge). Le contenu de chaque page commence désormais sous le bouton, sans avoir touché les pages une par une.
  - La page plein écran `/lab/:slug/demo` (ex. `GameDemo.jsx`) utilise `position: fixed; inset: 0` et ignore ce padding : pas d'exclusion de route nécessaire.
- **D2 — Icône Magazine dans le menu.** `Sidebar.jsx` : ✎ → 📖.
- **D3 — Icônes cohérentes dans les en-têtes.** `MagazineHome.jsx` : ✎ → 📖 ; `BrevesHome.jsx` : ✎ → 🗞 (corrige une incohérence : l'en-tête des Brèves reprenait l'icône du Magazine). Grep élargi : 2 occurrences supplémentaires trouvées dans `src/shell/registry.js` (icône d'onglet/barre d'état pour `/magazine`), remplacées aussi car elles désignent la même rubrique.

## Pas fait
Rien — les 4 étapes de correction (2 à 5) du PLAN sont toutes complètes.

## Critères d'acceptation (un par un)
1. **375×812, pas de chevauchement sur les 7 pages** (`/`, `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-09-30`, `/projets`, `/lab/design-system`) : ✅ vérifié par `document.elementsFromPoint` sur les coins/centre du bouton — seul le bouton et des conteneurs vides y apparaissent. Captures prises par le sous-agent verificateur pour `/`, `/magazine/2026-09-28`, `/breves/2026-09-30` (session éphémère de routine, non jointes en fichiers — voir « Comment vérifier » pour les reproduire).
2. **Pas de défilement horizontal à 375px** : ✅ `document.documentElement.scrollWidth === 375` sur les 7 pages.
3. **Aucun changement visuel en desktop (1280×900)** : ✅ `top` du premier élément de `<main>` = 32px sur `/magazine` et `/breves`, identique à la mesure avant correction.
4. **Le bouton ouvre/ferme le menu** : ✅ ouverture par le bouton ☰, fermeture par clic sur l'overlay et par le bouton fermer.
5. **Icône 📖 partout (menu + grep + en-têtes)** : ✅ 📖 confirmé dans le menu (desktop déplié, mobile), en-tête `/magazine` en 📖, en-tête `/breves` en 🗞, sans débordement ni décalage (desktop et 375px). `grep -n '"✎"' src/shell/Sidebar.jsx src/magazine/MagazineHome.jsx src/breves/BrevesHome.jsx` ne renvoie rien.
6. **Build et lint** : ✅ `npm run build` OK (22 URL dans le sitemap, inchangé), `npm run lint` OK, aucune nouvelle erreur par rapport à l'état initial (déjà 0 erreur avant la mission).
7. **Tout commité sur `auto/menu-mobile`, rien sur `main`, rien poussé** : ✅ 3 commits sur la branche (mesure, correction, vérification), plus ce rapport. Aucun push, aucune action sur `main`.

## Comment vérifier
1. `git checkout auto/menu-mobile`
2. `npm run build` puis `npx vite preview --port 4174` (en session interactive, la preview « dev » habituelle fonctionne aussi)
3. Redimensionner à 375×812 et ouvrir `/`, `/magazine/2026-09-28`, `/breves/2026-09-30` : le bouton ☰ ne doit chevaucher aucun texte, le contenu commence sous lui.
4. Ouvrir le menu (☰), vérifier l'icône 📖 sur Magazine et 🗞 sur Brèves ; refermer en cliquant sur le fond.
5. Redimensionner à 1280×900, ouvrir `/magazine` et `/breves` : aucun espace ajouté en haut du contenu par rapport à l'état avant la mission (commit `0993db0` de `main`).

## Décisions
Voir [DECISIONS.md](DECISIONS.md) : pas d'exclusion de route pour la démo plein écran (D1, déjà compatible via `position: fixed`) ; extension du remplacement d'icône à `registry.js` (D3, 2 occurrences supplémentaires désignant la rubrique Magazine).

## Délégations
Voir [DELEGATIONS.md](DELEGATIONS.md). Modèles réellement utilisés :
- **Opus 5.5** : cadrage (SPEC, PLAN, état initial).
- **Sonnet 5.5** (exécution) : correction D1 (`tokens.css`, `Shell.jsx`), icônes D2/D3, build/lint/grep, rédaction de ce rapport.
- **Haiku 4.5** (sous-agent `verificateur`) : mesure avant correction (étape 2), vérification finale dans le navigateur (étape 5).

## Recommandations
- Hors périmètre (demandé par la SPEC) : le bouton ☰ pourrait à terme rejoindre la barre du haut plutôt que de flotter par-dessus le contenu — non fait ici, fidélité visuelle conservée comme demandé.
- La valeur `30px` (hauteur du bouton ☰) est écrite en dur dans le calc de `Shell.jsx` plutôt que dans un token, faute d'un token existant pour cette hauteur précise ; si le style du bouton change un jour (padding, taille de police), penser à ajuster ce chiffre en même temps.
