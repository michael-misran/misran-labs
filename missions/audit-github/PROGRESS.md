# Mission audit-github — PROGRESS

**Statut :** en cours — étape 1 terminée
**Prochaine action :** étape 2 (`github.js` + fixtures + `verifier-github.mjs`)
**Blocages :** aucun

## État initial (2026-09-28, avant modification)
- `npm run build` : passe (bundle JS 699,96 kB, avertissement de taille habituel).
- `npm run lint` : **6 erreurs déjà présentes**, aucune dans le périmètre de la mission — VisuallyHidden.jsx, Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 8 : ne pas en ajouter.
- `node missions/audit-tokens/verifier-analyse.mjs` : passe (code 0) ; tokens.css du site : 153 tokens, 3 avertissements, 56 infos.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; pour le sélecteur de fichiers, injection par `javascript_tool` (voir missions/README.md).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D11) et la requête 404 du critère 4.
