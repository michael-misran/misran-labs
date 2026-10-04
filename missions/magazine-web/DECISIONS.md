# Mission magazine-web — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 2 | Mot « MAGAZINE » codé en dur dans `CouvertureNumero`, non traduit, pas de nouvelle clé de texte | Identique en français et en anglais, comme d'autres éléments de marque déjà non traduits sur le site |
| 2026-10-04 | 3 | Grille des numéros précédents en CSS `repeat(auto-fit, minmax(220px,1fr))` plutôt qu'avec des breakpoints JS (`useIsMobile`) | Responsive nativement à toutes les largeurs, satisfait D4 sans code supplémentaire |
| 2026-10-04 | 2 | Numéro affiché sans padding (« N° 1 », pas « N° 001 ») dans `CouvertureNumero`/`UneNumero` | Colle à la composition `KiosqueParts.CouvertureMagazine` que D2 demande explicitement de reproduire (qui n'utilise pas `issueNo`) |
| 2026-10-04 | 3 | Lien RSS en `<a href="/magazine/rss.xml">` classique, pas `<Link>` de react-router | `/magazine/rss.xml` est un fichier statique généré au build, pas une route SPA |
| 2026-10-04 | 4 | Navigation précédent/suivant calculée par position dans `getIssues()` (`idx + 1` = précédent, `idx - 1` = suivant) plutôt que par comparaison de `numero` | `getIssues()` est déjà trié du plus récent au plus ancien ; plus simple et tout aussi correct que de chercher `numero ± 1` |
