# Mission audit-grille — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (`grille.js` D2/D3/D6, `priorites.js` D7, suite de `verifier-grille.mjs`)
**Blocages :** aucun

## Fait
- Étape 1 : état initial. Build OK ; lint : 6 erreurs préexistantes hors mission (`VisuallyHidden.jsx`, `design-system/kit/Surface.jsx`, `lab/CaseFile.jsx`, `lab/GameDemo.jsx`, `shell/LanguageContext.jsx`, `shell/Shell.jsx`) — critère 9 : ne pas en ajouter ; deux scripts existants OK.
- Étape 2 : `src/lab/audit/contrastes.js` (`evaluerContrastes`, `rapportContraste`) ; `explorerDepot` renvoie `chemins` (tous les blobs, sans filtre, aucune requête en plus) ; `verifier-grille.mjs` partie 1 (14 vérifications). Les trois scripts passent, eslint propre sur `src/lab/audit` et `missions/audit-grille`.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; jamais de fenêtre système : ne pas cliquer « Exporter en PDF » sans avoir remplacé `window.print` (SPEC D13).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D14).
