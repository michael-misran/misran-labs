# Mission kiosque-annexes — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 3 | `/suivre` : retrait de `MagazineMasthead` et `CaseFooter`, plus de section « Flux RSS »/« Réseaux » génériques (`SectionTitle`) | Doublons avec le Masthead/Colophon globaux du Shell (acquis de la refonte, déjà rendus sur chaque page) ; `SectionTitle` garde le style développeur (« // TITRE ») qui ne correspond plus à l'identité maison. Page404 (déjà en place) ne les utilise pas non plus. |
| 2026-10-04 | 4 | `Page404.jsx` : textes fr/en définis localement (`PAGE404_TEXT`) plutôt que via `t(lang, ...)` de `src/i18n/ui.js` | `src/i18n/ui.js` est hors « Fichiers autorisés » de la SPEC (règle commune des missions parallèles) ; les clés `notFound404*` restent dans ce fichier mais ne sont plus lues par cette page, sauf `notFound404Tab` (onglet, via `registry.js`, non touché). |
