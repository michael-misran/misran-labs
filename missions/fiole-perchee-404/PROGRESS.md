# Mission fiole-perchee-404 — PROGRESS

**Statut :** étape 3 terminée
**Prochaine action :** étape 4 (Page 404 : `Page404.jsx`, i18n, route `*`, `resolveRouteMeta`, meta noindex)
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

## Étape 3 (2026-09-30)
- `tokens.css` : `--mascotte-overhang` (component) = `calc(45px + var(--space-sm))` (45 px = 48 px de Fiole − 3 px de chevauchement), à côté de `--mobile-nav-offset`.
- `Shell.jsx` : `padding-bottom: var(--mascotte-overhang)` sur `.shell-main`, desktop et mobile (aucune modification page par page).
- `Statusbar.jsx` : la Fiole n'est plus un item flex ; enveloppe `.fiole-perch` en `position: absolute; right: 24px; bottom: calc(var(--chrome-height) - 3px); z-index: 20; pointer-events: none`, avec une ombre `.fiole-shadow`. Le texte de déploiement retrouve toute la largeur (D2).
- `fiole.css` : `.fiole-btn { pointer-events: auto }` (D4) et surtout `vertical-align: bottom` — sans quoi l'alignement de base par défaut d'un inline-flex réservait ~3 px de descente de police sous le bouton, faussant le chevauchement de 3 px au pixel près (trouvé en vérifiant dans le navigateur, voir DECISIONS.md).
- Vérifié dans le navigateur (`npm run build` + `npx vite preview`, session de routine, pas de preview « dev ») sur `/` et `/lab/design-system`, desktop 1280×900 et mobile 375×812 : Fiole 48×48 px, bord droit à 24 px (exact), chevauchement 3 px (exact) sur la barre, textes de la barre disjoints du rectangle de la Fiole, clic à 4 px à gauche de la Fiole atteint `.shell-main`, bas de défilement de `/lab/design-system` sans chevauchement, pas de défilement horizontal en mobile, menu mobile ouvert → `elementFromPoint` au centre de la Fiole renvoie le fond du menu, bulle du 1ᵉʳ clic visible au-dessus de la Fiole dans la fenêtre.
- `npm run build` et `npm run lint` : passent.
