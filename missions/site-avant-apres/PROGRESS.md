# Mission site-avant-apres — PROGRESS

**Statut :** étape 1 terminée (2026-09-28)
**Prochaine action :** étape 2 (inventaire D3 + D5 → `INVENTAIRE.md`, explorateur Haiku)
**Blocages :** aucun

## État initial (référence)
- Build : OK. Lint : 6 erreurs (attendues). Scripts `verifier-analyse`, `verifier-github`, `verifier-grille` : OK.
- Mesure avant : moyenne 0,8 ; Architecture 2, Couverture 2, Accessibilité 0, Composants 0, Documentation 1, Gouvernance 0 ; couverture 82,4 % ; 9 valeurs déjà tokenisées ; 4 paires primary/selected < 4,5 (3,36).
- `mesure-avant.json` et `snapshot-avant.json` écrits.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session (un `vite preview` tourne peut-être encore : le vérifier).
- Sous-agents au premier plan ; jamais de fenêtre système (impression, sélecteur de fichiers).
- Snapshot : `node missions/site-avant-apres/recevoir-snapshot.mjs apres` en arrière-plan, puis POST depuis la page (voir DECISIONS).
- Si le navigateur est refusé dans la routine : faire tout le reste, noter ce qui manque dans le RAPPORT ; la clôture vérifiera.
