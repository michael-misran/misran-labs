# Mission menu-mobile — PROGRESS

**Statut :** étape 5 terminée, tous les critères OK
**Prochaine action :** étape 6 (RAPPORT.md)
**Blocages :** aucun

## État initial (2026-09-30, commit 0993db0 de main)
- `npm run build` : OK (sitemap.xml : 22 URL)
- `npm run lint` : OK, aucune erreur

## Mesure avant correction (2026-09-30, verificateur/Haiku)
À 375×812, sur les 7 pages du critère 1 (`/`, `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-09-30`, `/projets`, `/lab/design-system`) :
- Chevauchement vertical confirmé partout entre le bouton ☰ (rect Y ≈ 76-106) et le premier élément de contenu (Y ≈ 32).
- `document.documentElement.scrollWidth` = 375 partout : pas de défilement horizontal (déjà OK, à ne pas casser).

En 1280×900 (desktop), référence avant correction pour le critère d'acceptation 3 :
- `/magazine` : top du premier élément de contenu = 32px
- `/breves` : top du premier élément de contenu = 32px
(à revérifier identique après la correction D1, qui ne doit s'appliquer qu'en mobile)

## Correction D1 (étape 3)
- `src/styles/tokens.css` : nouvelle variable component `--mobile-nav-offset: calc(var(--chrome-height) + var(--space-sm))` — reprend exactement l'ancien calcul du `top` du bouton (32+12=44px), inchangé visuellement.
- `src/shell/Shell.jsx` : le bouton ☰ utilise `top: 'var(--mobile-nav-offset)'` (même valeur qu'avant, juste tokenisée). Sur `<main className="shell-main">`, ajout de `paddingTop: isMobile ? 'calc(var(--mobile-nav-offset) + 30px + var(--space-sm))' : undefined` (30px = hauteur mesurée du bouton, var(--space-sm)=12px de marge) — réserve donc 44+30+12=86px de haut en mobile seulement, aucun changement en desktop.
- Page plein écran `/lab/:slug/demo` (`GameDemo.jsx`) : `position: fixed; inset: 0`, ignore le padding ajouté — pas d'exclusion de route nécessaire (voir DECISIONS.md).

## Icônes (étape 4)
- `Sidebar.jsx` : ✎ → 📖 (D2).
- `MagazineHome.jsx` : `MagazineHero number="✎"` → `"📖"` (D3).
- `BrevesHome.jsx` : `MagazineHero number="✎"` → `"🗞"` (D3, corrige une incohérence : l'en-tête utilisait l'icône du Magazine).
- `grep -rn "✎" src/` a trouvé 2 occurrences de plus dans `registry.js` (icône d'onglet/barre d'état pour `/magazine`) : remplacées aussi (voir DECISIONS.md). Plus aucun `✎` dans `src/`.

## Build/lint après étapes 3-4
- `npm run build` : OK
- `npm run lint` : OK, aucune erreur

## Vérification finale (étape 5)
- Session principale : build OK, lint OK, `grep -n '"✎"' src/shell/Sidebar.jsx src/magazine/MagazineHome.jsx src/breves/BrevesHome.jsx` ne renvoie rien (critère 5).
- verificateur (Haiku), navigateur via `npx vite preview` (routine, pas de preview "dev") :
  - A. 375×812, 7 pages : aucun chevauchement bouton ☰/contenu (elementsFromPoint), scrollWidth=375 partout. OK.
  - B. 1280×900, `/magazine` et `/breves` : top du 1er élément de `<main>` = 32px, identique à l'état avant correction. OK.
  - C. Bouton ☰ ouvre le menu, clic sur l'overlay et bouton fermer le referment. OK.
  - D. Icônes 📖 (Magazine) / 🗞 (Brèves) confirmées dans le menu (desktop et mobile) et dans les en-têtes des deux pages, sans débordement. OK.
- Tous les critères d'acceptation 1 à 7 de SPEC.md sont satisfaits.
