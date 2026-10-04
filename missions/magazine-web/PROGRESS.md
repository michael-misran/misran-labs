# Mission magazine-web — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (page `/magazine`)
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.

## Étape 2 (exécution, 2026-10-04)
- `src/magazine/RevueParts.jsx` créé : `TeteRevue`, `CouvertureNumero` (variante `vedette`/`grille`, inspirée de `KiosqueParts.CouvertureMagazine` sans import), `UneNumero` (en-tête de la page numéro), `ArticleRevue`. Constante `etiquette` non exportée (sinon erreur `react-refresh/only-export-components`, même raison que le commentaire en tête de `magazineText.js`).
- `magazineText.js` : ajout de `home.lireLabel`, `home.rssLabel`, `issue.contentsTitle`, `issue.previousLabel`, `issue.nextLabel` (fr/en). Aucune clé existante renommée.
