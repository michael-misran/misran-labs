# Mission fiole-perchee-404 — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (Fiole perchée : position dans Statusbar.jsx, `--mascotte-overhang`, padding-bottom de `.shell-main`)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main b8e7ac3)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30)
- `npm run build` : passe (21 pages d'aperçu générées, sitemap 22 URL)
- `npm run lint` : aucune erreur
- Rien à corriger, état identique au cadrage.

## Étape 2 (2026-09-30)
- `Fiole.jsx` : props `scale` (défaut 3), `variant` (`'fiole'` | `'toxique'`, défaut `'fiole'`), `sleeps` (défaut `true`).
- `PX` constant supprimé, remplacé par la prop `scale` partout (rendu SVG, `--fiole-bob` en CSS, calcul de la taille des particules).
- `fiole.css` : `fiole-bob` utilise `var(--fiole-bob, 2px)` au lieu de `-2px` fixe.
- Nouvelle réaction `reactToxicPage` (clic sur la Fiole toxique de la 404, D7) : tangage + `happy` + 6 particules `poison` + bulle avec une phrase de `SPRITES.toxique.phrases` (5 FR/EN ajoutées dans `sprites.js`).
- `aria-label` dépend du variant (`ARIA_LABEL_TOXIQUE` pour `variant="toxique"`).
- `wake()` ne programme plus l'endormissement si `sleeps={false}`.
- Comportement de la barre (variant par défaut `'fiole'`) inchangé : clignement, survol, 10ᵉ clic → secret toxique, dodo — sauf l'échelle, désormais 3 par défaut (48 px) au lieu de 2 (D1, D5).
- `npm run build` et `npm run lint` : passent.
