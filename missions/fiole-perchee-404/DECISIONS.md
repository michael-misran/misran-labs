# Mission fiole-perchee-404 — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 3 | `--mascotte-overhang` (tokens.css) n'est utilisé que pour le `padding-bottom` de `.shell-main`. Le positionnement de la Fiole dans `Statusbar.jsx` utilise directement `calc(var(--chrome-height) - 3px)`, indépendant de ce token. | D3 dit que la variable « sert à la fois » aux deux usages ; en pratique les deux calculs ne partagent qu'une même donnée source (48 px de Fiole, 3 px de chevauchement), pas la même formule CSS — les dupliquer proprement documentés est plus lisible qu'une dépendance croisée artificielle. Si l'échelle de la Fiole change un jour, les deux endroits (tokens.css et Statusbar.jsx) doivent être mis à jour ensemble. |
| 2026-09-30 | 3 | Ajout de `vertical-align: bottom` sur `.fiole-btn` (fiole.css). | Sans cette ligne, l'alignement de base par défaut d'un `inline-flex` réserve la hauteur de descente de la police du parent (~3 px avec `font-size: 10px` sur la barre), ce qui décalait le chevauchement mesuré de 3 px vers 0 px. Trouvé en vérifiant les coordonnées exactes dans le navigateur (critère d'acceptation 1). |
