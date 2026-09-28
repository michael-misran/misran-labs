# Mission audit-github — PROGRESS

**Statut :** en cours — étapes 0 à 3 terminées (moteur complet)
**Prochaine action :** étape 4 (interface : `SourceGithub.jsx`, `Couverture.jsx`, intégration dans `AuditTokens.jsx`, D7/D8, rapport copié)
**Blocages :** aucun

## Fait
- Étape 1 : état initial. Build OK ; lint : 6 erreurs déjà présentes hors périmètre (VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell) — ne pas en ajouter ; `verifier-analyse.mjs` OK.
- Étape 2 : `src/lab/audit/github.js`, fixtures, `verifier-github.mjs` partie 1.
- Étape 3 : `src/lab/audit/couverture.js`, option `usagesExternes` dans `analyse` (sans option : résultat identique, vérifié), partie 2 de `verifier-github.mjs`. Les deux scripts passent (35 + 33 vérifications), eslint propre sur `src/lab/audit`. Essai local (sans réseau) sur le code du site : 98 fichiers, taux 73 %, R6 passe de 55 à 4 constats grâce aux usages du code.

## Pour l'étape 4 — API des modules
- `github.js` : `lireAdresse(texte)` ; `explorerDepot(adresse, fetch)` → `{ ok, proprietaire, depot, branche, dossier, taille, avertissements, candidats:[{chemin,taille}], candidatsTotal, echantillon:[{chemin,taille}], eligibles }` ou `{ ok:false, erreur:{fr,en} }` ; `lireContenus(depot{proprietaire,depot,branche}, chemins, fetch, onProgression(faits,total))` → `{ fichiers:[{nom,contenu}], echecs:[{chemin,erreur:{fr,en}}] }` ; `filtrerCandidatsLus(fichiers)` → `{ gardes, avertissements }` (à appliquer aux candidats css/scss lus). Les avertissements ont la forme du moteur : `{ fichier, detail:{fr,en} }`.
- `couverture.js` : `extraireUsagesTokens(fichiersCode)` → Set ; `mesurerCouverture(fichiersCode, tokens)` → `{ fichiersAnalyses, usagesTokens, valeursEnDur, taux|null, parFichier:[{fichier,valeursEnDur,usagesTokens}], valeursRepetees:[{valeur,occurrences,fichiers[]}], dejaTokenisees:[{valeur,token,occurrences}], nombreDejaTokenisees }`.
- Ordre d'appel dans l'interface : lire tokens + code → `usages = extraireUsagesTokens(code)` → `analyse(fichiersTokens, { usagesExternes: usages })` → `mesurerCouverture(code, resultat.tokens)`.
- `fetch` du navigateur : passer `(url) => fetch(url)` (un seul argument, aucun en-tête).

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; pour le sélecteur de fichiers, injection par `javascript_tool` (voir missions/README.md).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D11) et la requête 404 du critère 4.
