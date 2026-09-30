# Mission jeux-geste — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, brouillons des missions jeux-estimation et jeux-majorite → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md (déjà relevés au cadrage : vérifier seulement qu'ils passent toujours) → session principale (Sonnet)
- [x] 2. Socle : `socle/jour.js`, `socle/serie.js`, `socle/partage.js`, `socle/ResultatPartage.jsx`, `registre.js`, `jeuxText.js` (D1, D2, D4, D6, D7). Ajouter un petit contrôle en Node des fonctions pures de `jour.js`/`serie.js` : `missions/jeux-geste/verifier-socle.mjs` (numéro de jour, déterminisme de la graine, calcul de série). Build + lint → session principale (Sonnet)
- [x] 3. Intégration : routes, `JeuxHome.jsx`, `JeuPage.jsx`, `registry.js`, menu, clés i18n, 404 des slugs inconnus (D3, D9, D10, D11). Build + lint → session principale (Sonnet)
- [x] 4. Aperçus de partage + sitemap génériques dans `share-previews.js`, et routes dans `verifier-routes.mjs` (D3). Build, puis contrôle de `dist/` (critère 9) → session principale (Sonnet)
- [x] 5. Jeu : `geste-parfait/meta.js`, `Jeu.jsx` (essai officiel, entraînement, `?date=` en dev), défis 2 (chrono) et 3 (verre) (D5, D8). Build + lint → session principale (Sonnet)
- [x] 6. Défis 1 (cercle, avec refus des tracés trop courts) et 4 (tour empilée) (D8, D11). Build + lint → session principale (Sonnet)
- [x] 7. Vérification dans le navigateur (`npx vite preview`) : critères 1 à 8 et 10 ; captures `/jeux` (desktop + 375 px) et un défi terminé. Rappel : lire le presse-papiers ou le texte de partage dans le même appel que le clic → verificateur (Haiku)
- [ ] 8. Corrections éventuelles, vérification finale : build, lint, critères 11 à 13 (`git diff main...` : ni secret, ni donnée personnelle) → session principale (Sonnet)
- [ ] 9. RAPPORT.md (captures, recommandations hors périmètre, rappel D12 : missions suivantes à lancer après fusion) → session principale (Sonnet)
