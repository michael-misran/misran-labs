# Mission rss-suivre — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 2 | Les fonctions `collect…` exportées reçoivent un champ `raw` (JSON brut) en plus des champs existants, plutôt que d'être dupliquées. | Leurs champs actuels (`title`, `description`…) sont taillés pour l'aperçu de partage (tronqués, suffixés) et ne correspondent pas aux titres/descriptions RSS de la SPEC (D1) ; `raw` donne accès aux champs bruts sans dupliquer la lecture/validation des fichiers ni changer un seul champ déjà produit pour les aperçus et le sitemap. |
| 2026-09-30 | 2 | Nouvelle fonction `formatDateLongNoWeekday` dans `magazineText.js`, au lieu de réutiliser `formatDateLong` tel quel. | `formatDateLong` inclut le jour de semaine (« lundi 28 septembre 2026 »), utilisé par les pages existantes ; D1 et le critère 8 demandent explicitement une date sans jour de semaine (« 30 septembre 2026 »). Réutilisée à l'étape 3 pour le libellé `/breves/:date`. |
| 2026-09-30 | 2 | `pubDate` calculé par une approximation locale (mois avril-octobre = +0200, sinon +0100, heure fixe 07:00), sans vraie conversion de fuseau. | Explicitement demandé par D1 de la SPEC (« approximation assumée, la noter en commentaire ») — commenté dans `scripts/rss.js`. |
