# Mission audit-github — PROGRESS

**Statut :** en cours — étapes 0 à 2 terminées
**Prochaine action :** étape 3 (`couverture.js`, option `usagesExternes` dans `analyse`, partie 2 de `verifier-github.mjs`)
**Blocages :** aucun

## Fait
- Étape 1 : état initial noté. Build OK ; lint : 6 erreurs déjà présentes hors périmètre (VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell) — ne pas en ajouter ; `verifier-analyse.mjs` OK (tokens.css du site : 153 tokens, 3 avertissements, 56 infos).
- Étape 2 : `src/lab/audit/github.js` (`lireAdresse`, `reperer`, `filtrerCandidatsLus`, `explorerDepot`, `lireContenus`, `formaterHeure`), fixtures dans `missions/audit-github/fixtures/`, `verifier-github.mjs` partie 1 (20 vérifications, toutes OK, eslint propre sur les nouveaux fichiers).

## Pour l'étape 3
- Ajouter la partie 2 de `verifier-github.mjs` à l'endroit marqué « PARTIE 2 » (avant le bilan final).
- Formes retournées par `github.js` utiles à l'interface (étape 4) : `explorerDepot` → `{ ok, proprietaire, depot, branche, dossier, taille, avertissements, candidats:[{chemin,taille}], candidatsTotal, echantillon:[{chemin,taille}], eligibles }` ou `{ ok:false, erreur:{fr,en} }` ; `lireContenus(depot, chemins, fetch, onProgression)` → `{ fichiers:[{nom,contenu}], echecs:[{chemin,erreur}] }`.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; pour le sélecteur de fichiers, injection par `javascript_tool` (voir missions/README.md).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D11) et la requête 404 du critère 4.
