# Mission audit-grille — PROGRESS

**Statut :** étape 4 terminée
**Prochaine action :** étape 5 (`RapportImprimable.jsx`, règles `@media print`, bouton « Exporter en PDF », D8/D13)
**Blocages :** aucun

## Fait
- Étape 1 : état initial. Build OK ; lint : 6 erreurs préexistantes hors mission (`VisuallyHidden.jsx`, `design-system/kit/Surface.jsx`, `lab/CaseFile.jsx`, `lab/GameDemo.jsx`, `shell/LanguageContext.jsx`, `shell/Shell.jsx`) — critère 9 : ne pas en ajouter ; deux scripts existants OK.
- Étape 2 : `contrastes.js` ; `explorerDepot` renvoie `chemins` ; `verifier-grille.mjs` partie 1.
- Étape 3 : `grille.js` (`evaluerGrille`, `appliquerAjustements`), `priorites.js` (`prioriser`), 34 vérifications ; textes FR + EN du moteur écrits ensemble.
- Étape 4 : interface.
  - `audit/Grille.jsx` (7 axes, critères justifiés, bouton « Ajuster » avec note 0–3 / non évalué + commentaire, liste des paires sous 4,5:1), `audit/Matrice.jsx` (4 quadrants, 1 colonne à 375 px), `audit/rapportGrille.js` (libellés partagés + lignes Markdown de la grille et de la matrice).
  - `AuditTokens.jsx` : états `contexteAudit` et `ajustements` (remis à zéro à chaque analyse), mémos `audit` (contrastes, grille brute, matrice) et `grille` (avec ajustements), ordre D10 (grille → matrice → constats → couverture → boutons → appel à l'action), Markdown complété, texte de l'appel à l'action réécrit (D9, FR + EN). `SourceGithub.jsx` transmet `chemins`.
  - `textes.js` : bloc `grille` en FR ; en EN, structure prête mais **valeurs encore en français** (marquées « À TRADUIRE ») → étape 6.
  - Lint : aucune nouvelle erreur (les 2 restantes de `src/lab` sont préexistantes). Build OK. Vérification navigateur non faite ici (le contrôle d'auto-mode a refusé deux fois `navigate`) : reportée à l'étape 7.
- Un serveur `vite preview` (port 4173) est lancé en arrière-plan : **à arrêter en fin de session**.

## À prévoir
- Étape 5 : le bouton « Exporter en PDF » (`c.grille.exportPdf` existe déjà dans les textes) va dans la rangée d'actions de `AuditTokens.jsx`, à côté de « Copier le rapport » ; le bloc `RapportImprimable` a besoin de `grille` (ajustée), `audit.priorites`, `resultat`, `couverture`, `contexteAudit` (source, noms) et de la date du jour.
- `AuditTokens.jsx` ≈ 780 lignes (seuil de la SPEC : 900).

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- Sous-agents au premier plan ; jamais de fenêtre système : ne pas cliquer « Exporter en PDF » sans avoir remplacé `window.print` (SPEC D13).
- Réseau autorisé pendant la vérification : uniquement le dépôt public michael-misran/misran-labs (SPEC D14).
