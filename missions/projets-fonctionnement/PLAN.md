# Mission projets-fonctionnement — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : CONTENU.md, SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build OK, lint 6 erreurs préexistantes (voir PROGRESS.md) → session principale (Opus)
- [x] 2. Route + squelette : route dans `App.jsx` (D1), `ProjetsFonctionnement.jsx` avec masthead/hero/footer et lien retour, `fonctionnementText.js` vide mais structuré, lien depuis `ProjetsHome.jsx` (D5). La page s'affiche → session principale (Sonnet)
- [ ] 3. Rédaction FR à partir de CONTENU.md (seule source de faits) : toutes les sections, les 4 arborescences (composant `Pre` copié de `UtilisationIA.jsx`), le circuit en 5 étapes, les deux cas « on développe » → session principale (Sonnet)
- [ ] 4. Traduction EN complète (D9), commentaires d'arborescences compris → sous-agent (Haiku)
- [ ] 5. Vérification : critères 1 à 7 (navigateur FR/EN, console, 375 px, greps, build, lint) → verificateur (Haiku)
- [ ] 6. Corrections éventuelles issues de l'étape 5, puis RAPPORT.md → session principale (Sonnet)
