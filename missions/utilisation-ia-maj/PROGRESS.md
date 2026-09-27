# Mission utilisation-ia-maj — PROGRESS

**Statut :** FR + EN écrits, build et lint vérifiés
**Prochaine action :** étape 6 (vérification des critères 1 à 9)
**Blocages :** aucun

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx).

## Étapes 2-3
- `AUDIT.md` et le plan détaillé écrits (voir DECISIONS.md).

## Étapes 4-5 — Rédaction FR et EN
- Corrections appliquées dans les deux langues : `finalFlow` (9 étapes), `gitFlow` (« Push (Claude) »), `remaining`, `modelChart`/`modelsTableRows` (+ veilleur, relecteur), `metaP` (mission 7).
- `ModelOrgChart` agrandi (viewBox 480×480, 2 boîtes de plus).
- 6 nouvelles sections en FR et EN avant « Le circuit final » : 3ᵉ mission, Magazine, file d'attente, téléphone (+ schéma `phoneFlow`), compromis `main`, bilan chiffré.
- 6 nouveaux jalons dans la chronologie (10 à 15), FR et EN.
- Après édition : `npm run build` OK ; `npm run lint` toujours 6 erreurs préexistantes, aucune dans UtilisationIA.jsx ; grep couleurs et secrets : rien.
