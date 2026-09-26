# Mission utilisation-ia — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : CONTENU.md, SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build OK, lint 6 erreurs préexistantes (voir PROGRESS.md) → session principale (Opus)
- [x] 2. Inventaire : API de `FlowDiagram`, `Timeline`, `SiteMapDiagram`, `CaseMasthead`/`CaseHero`/`CaseFooter`, `Section`, `SectionTitle`, et structure de `WorkflowSolo.jsx` (props, forme des données, exemples d'appel). Résultat résumé dans PROGRESS.md → explorateur (Haiku)
- [x] 3. Lire CONTENU.md en entier, puis architecture de la page : ordre des sections, titre de chacune, quel schéma pour quel passage (les 7 de D4), forme des données de chaque schéma. Écrit dans DECISIONS.md → expert (Opus)
- [ ] 4. Registre + squelette : entrée dans `projects.js`, `LAB_SLUGS` dans `Sidebar.jsx`, composant `UtilisationIA.jsx` avec en-tête/pied qui s'affiche → session principale (Sonnet)
- [ ] 5. Rédaction FR à partir de CONTENU.md (seule source de faits) : toutes les sections et tous les schémas selon l'architecture de l'étape 3 → session principale (Sonnet)
- [ ] 6. Traduction EN (D8) → session principale (Sonnet)
- [ ] 7. Vérification : critères 1 à 6, dont la couverture des §0 à §12 de CONTENU.md (navigateur FR/EN, console, 375 px, greps, build, lint) → verificateur (Haiku)
- [ ] 8. Corrections éventuelles issues de l'étape 7, puis RAPPORT.md → session principale (Sonnet)
