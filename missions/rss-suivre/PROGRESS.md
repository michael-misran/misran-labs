# Mission rss-suivre — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (libellés Brèves et Suivre dans registry.js, D7)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main b6663e8)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30, sur auto/rss-suivre)
- `npm run build` : passe (21 pages d'aperçu, sitemap 22 URL)
- `npm run lint` : aucune erreur
- Confirme l'état initial, rien à corriger avant de commencer

## Étape 2 (2026-09-30, sur auto/rss-suivre)
- `scripts/rss.js` créé : écrit `dist/rss.xml`, `dist/magazine/rss.xml`, `dist/breves/rss.xml`, `dist/projets/rss.xml`.
- `scripts/share-previews.js` : `collectMagazineNumeros`/`collectBrevesJours`/`collectProjetsIdees` exportées, chacune renvoie en plus `raw` (le JSON brut) sans changer les champs déjà produits pour les aperçus et le sitemap ; `SITE_URL` et `escapeXml` exportés ; `closeBundle` appelle `writeRssFeeds` avec les pages déjà collectées.
- `index.html` : 4 balises `<link rel="alternate" type="application/rss+xml">` ajoutées dans `<head>`.
- `src/magazine/magazineText.js` : nouvelle fonction `formatDateLongNoWeekday` (date longue FR/EN sans jour de semaine), réutilisée par `rss.js` pour les titres « Brèves du {date} » — voir DECISIONS.md.
- Vérifications : `npm run build` passe ; `xmllint --noout` OK sur les 4 flux ; contenu relu (magazine, brèves) conforme à D1 ; `npx vite preview` sert `/rss.xml` et `/magazine/rss.xml` en `Content-Type: text/xml` (pas le HTML du site) ; `dist/index.html` et `dist/magazine/index.html` contiennent les 4 balises `alternate` ; `npm run lint` sans erreur.
