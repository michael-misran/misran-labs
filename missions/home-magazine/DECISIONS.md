# Mission home-magazine — DECISIONS

Décisions prises sans Michael. Les décisions D1–D5 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 0 | Étape expert (Opus) pour la direction visuelle | La home est la page la plus vue ; le bloc est la seule partie qui change chaque semaine. |
| 2026-09-27 | 2 | Composant `LatestIssue({ c, lang, isMobile })` local à `ArchiveHome.jsx`, pas de composant partagé dans `src/magazine/` | Un seul usage sur la home ; D5 réserve `src/magazine/` au cas réutilisable. |
| 2026-09-27 | 2 | Pas de `Stamp` sur le bloc | Un `Stamp` est déjà affiché dans `ProtocolPlate` juste au-dessus ; un deuxième serait redondant. |
| 2026-09-27 | 2 | Édito limité à 4 lignes (5 sur mobile) via `line-clamp` CSS (`-webkit-line-clamp`), pas de troncature JS | Aucune technique de ce type n'existe déjà dans le dépôt ; l'édito complet reste lisible via le lien "Lire le numéro →". |
| 2026-09-27 | 2 | Filet du haut du bloc en `border-thick` + `var(--primary)` | `--border-thin` et `--border-regular` valent tous deux 1px (voir `tokens.css`) — insuffisant pour distinguer visuellement le bloc des `FileEntry` sans sortir des tokens ; `--border-thick` (2px) existe déjà dans `tokens.css`. |
