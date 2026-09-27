# Mission workflow-grille — PROGRESS

**Statut :** étapes 2 et 3 faites
**Prochaine action :** étape 4 (vérification des critères, verificateur Haiku)
**Blocages :** aucun

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx).

## Étape 2 — mesures avant
- `missions/workflow-grille/mesures.json` (clé `avant`) écrit par le verificateur (Haiku).
- `/lab/workflow` : c.runFlow 916px, c.unifyFlow 1000px (desktop = mobile, `direction="vertical"` avant modification).
- `/lab/utilisation-ia` (non-régression) : 5 SVG mesurés sur la page (3 FlowDiagram : resumeLoop, gitFlow, finalFlow ; + 2 SVG codés en dur hors FlowDiagram, hors périmètre mais capturés pour info).
- Aucune erreur console détectée.

## Étape 3 — modification
- `src/lab/projects/WorkflowSolo.jsx` : les 2 `FlowDiagram` (runFlow, unifyFlow) passés à `direction={isMobile ? 'vertical' : 'grid'} columns={3}` (D1).
- `npm run build` : OK après modification.
