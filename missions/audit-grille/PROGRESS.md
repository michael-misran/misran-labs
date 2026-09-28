# Mission audit-grille — PROGRESS

**Statut :** étape 3 terminée
**Prochaine action :** étape 4 (interface : `Grille.jsx` avec ajustement, `Matrice.jsx`, ordre de la page, appel à l'action, Markdown complété)
**Blocages :** aucun

## Fait
- Étape 1 : état initial. Build OK ; lint : 6 erreurs préexistantes hors mission (`VisuallyHidden.jsx`, `design-system/kit/Surface.jsx`, `lab/CaseFile.jsx`, `lab/GameDemo.jsx`, `shell/LanguageContext.jsx`, `shell/Shell.jsx`) — critère 9 : ne pas en ajouter ; deux scripts existants OK.
- Étape 2 : `contrastes.js` ; `explorerDepot` renvoie `chemins` ; `verifier-grille.mjs` partie 1.
- Étape 3 : moteur terminé, textes FR + EN déjà dans le moteur (`detail`, `resume`, `titre`).
  - `src/lab/audit/grille.js` : `evaluerGrille({ resultat, couverture, chemins, contrastes, fichiersCode })` → `{ axes, moyenne, axesEvalues }` ; `appliquerAjustements(grille, { [idAxe]: { note, commentaire } })` → axes avec `noteFinale`, `ajustee`, `commentaire` + moyenne recalculée ; `AXES`, `outlinesSansFocus`, `reperComposants`. Chaque critère : `{ id, ok, detail:{fr,en}, manque? }`.
  - `src/lab/audit/priorites.js` : `prioriser({ resultat, couverture, grille, contrastes })` → `{ sujets, quadrants }` ; `QUADRANTS`, `quadrantDe`. Sujet : `{ id, titre, unite, compte, impact, effort, quadrant }`.
  - `verifier-grille.mjs` : 34 vérifications, les trois scripts passent, eslint propre sur `src/lab/audit` et `missions/audit-grille`.
- Pour l'interface (étape 4) : appeler `evaluerContrastes(resultat.tokens)`, passer `fichiersCode` (contenus lus de l'échantillon, déjà en état `contexteCode`) et `chemins` (à conserver depuis `explorerDepot`).

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; jamais de fenêtre système : ne pas cliquer « Exporter en PDF » sans avoir remplacé `window.print` (SPEC D13).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D14).
