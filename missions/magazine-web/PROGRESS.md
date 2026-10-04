# Mission magazine-web — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5 (vérification finale)
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

## Étape 3 (exécution, 2026-10-04)
- `MagazineHome.jsx` réécrit : `TeteRevue`, vedette (`CouvertureNumero` variante `vedette` + extrait d'édito avec lettrine + lien « lire »), grille des numéros précédents (`CouvertureNumero` variante `grille`, `repeat(auto-fit, minmax(220px, 1fr))` pour le 3/2/1 colonnes responsive sans breakpoints JS), lien RSS en `<a href>` classique (pas de `Link` : `/magazine/rss.xml` est un fichier statique, pas une route SPA). Plus d'import de `MagazineParts`/`CaseFile`. `npm run build` et `npm run lint` : OK.

## Étape 4 (exécution, 2026-10-04)
- `MagazineIssue.jsx` réécrit : `UneNumero` en tête, édito sur 2 colonnes avec lettrine bleue (`.mag-dropcap`), sommaire numéroté avec ancres `#article-N`, articles via `ArticleRevue`, navigation précédent/suivant calculée depuis `getIssues()` (par index, car triée) + lien « tous les numéros », page « Ce numéro n'existe pas » réécrite dans le même style bleu (mascotte Fiole conservée). Plus d'import de `MagazineParts`/`CaseFile`/`caseChrome`.
- Critère d'acceptation 1 revérifié (`git grep`) : un commentaire de `RevueParts.jsx` contenait les mots interdits (juste en prose, aucun import) — reformulé pour que le grep ne renvoie plus rien.
- `npm run build` et `npm run lint` : OK.
