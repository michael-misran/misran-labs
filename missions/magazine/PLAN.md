# Mission magazine — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build OK, lint 6 erreurs préexistantes → session principale (Opus)
- [ ] 2. Direction visuelle : proposer la mise en page de `/magazine` et d'un numéro dans l'esthétique « archive imprimée » du site (quels composants existants réutiliser, structure de l'en-tête de rubrique et d'un article, rendu mobile). Écrire le résultat dans DECISIONS.md → expert (Opus)
- [ ] 3. Données : `src/magazine/numeros.js` (chargement `import.meta.glob` + validation D4), `FORMAT.md` (D3), numéro 0 (D8) → session principale (Sonnet)
- [ ] 4. Pages : `MagazineHome.jsx`, `MagazineIssue.jsx`, routes dans `App.jsx`, section « Magazine » de la sidebar + prop `NavItem` (D5, D6, D7), textes i18n FR/EN → session principale (Sonnet)
- [ ] 5. Vérification des critères 1 à 8 (dont le test du fichier invalide, supprimé ensuite) → verificateur (Haiku)
- [ ] 6. Corrections éventuelles (si échec deux fois : expert (Opus)), puis RAPPORT.md, avec en recommandation ce que la mission « routine de veille » devra prévoir → session principale (Sonnet)
