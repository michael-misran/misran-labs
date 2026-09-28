# Mission audit-github — PROGRESS

**Statut :** en cours — étapes 0 à 4 terminées (moteur + interface FR)
**Prochaine action :** étape 5 — traduction EN de `src/lab/projects/audit/textes.js` par un sous-agent Haiku (au premier plan, `run_in_background: false`)
**Blocages :** aucun

## Fait
- Étape 1 : état initial. Build OK ; lint : 6 erreurs déjà présentes hors périmètre (VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell) — ne pas en ajouter ; `verifier-analyse.mjs` OK.
- Étape 2 : `src/lab/audit/github.js`, fixtures, `verifier-github.mjs` partie 1.
- Étape 3 : `src/lab/audit/couverture.js`, option `usagesExternes` dans `analyse`, partie 2 de `verifier-github.mjs` (les deux scripts passent). Essai local sur le code du site : 98 fichiers, taux 73 %, R6 de 55 à 4 constats.
- Étape 4 : interface. `src/lab/projects/audit/` : `ui.jsx` (Bouton, Tuile), `styles.js`, `textes.js` (FR + EN provisoire = copie du FR), `SourceGithub.jsx`, `Couverture.jsx` ; `AuditTokens.jsx` intègre le bloc GitHub (en tête de la zone d'entrée), la section Couverture, le rapport copié complété. `npm run build` OK ; `npx eslint src/lab` : seules 2 erreurs déjà présentes (CaseFile, GameDemo). Pas encore testé dans le navigateur (étape 6).

## Pour l'étape 5
- Seul fichier à traduire : `src/lab/projects/audit/textes.js`. Remplacer `const EN = { ...FR }` par un objet EN complet, **mêmes clés**, mêmes fonctions (`(n) => …`, `pluriel`), mêmes formes (ne pas changer les clés ni les signatures). Ne rien modifier d'autre.
- Vérifier après : `npx eslint src/lab/projects/audit`, `npm run build`, et que EN n'a plus aucune phrase française.

## Pour l'étape 6 (navigateur)
- `npm run build` puis `npx vite preview` (port 4173) ; page `/lab/audit-tokens` (vérifier l'URL exacte dans `src/lab/projects.js` ou la sidebar).
- Réseau autorisé : uniquement `michael-misran/misran-labs` (SPEC D11) + `michael-misran/nexiste-pas-xyz` (1 requête, critère 4).

## Rappels
- Dans une routine : pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; pour le sélecteur de fichiers, injection par `javascript_tool` (voir missions/README.md).
