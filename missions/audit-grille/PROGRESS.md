# Mission audit-grille — PROGRESS

**Statut :** étape 1 terminée
**Prochaine action :** étape 2 (`contrastes.js`, `chemins` dans `explorerDepot`, début de `verifier-grille.mjs`)
**Blocages :** aucun

## État initial (2026-09-28, référence)
- `npm run build` : passe (152 modules, bundle 726 Ko, avertissement de taille habituel).
- `npm run lint` : 6 erreurs préexistantes, hors mission — `VisuallyHidden.jsx` (Tag inutilisé), `design-system/kit/Surface.jsx` (Tag inutilisé), `lab/CaseFile.jsx` (react-refresh), `lab/GameDemo.jsx` (`t` inutilisé), `shell/LanguageContext.jsx` (react-refresh), `shell/Shell.jsx` (setState dans un effet). Critère 9 : ne pas en ajouter.
- `node missions/audit-github/verifier-github.mjs` : passe.
- `node missions/audit-tokens/verifier-analyse.mjs` : passe.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; jamais de fenêtre système : ne pas cliquer « Exporter en PDF » sans avoir remplacé `window.print` (SPEC D13).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D14).
