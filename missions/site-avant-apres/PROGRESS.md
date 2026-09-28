# Mission site-avant-apres — PROGRESS

**Statut :** étapes 1 et 2 terminées (2026-09-28). Étape 3 (contraste) écrite dans le code, à vérifier (build/lint) puis commiter.
**Prochaine action :** commit étape 3, puis étape 4 (D5 selon INVENTAIRE.md, partie B ; faite par la session principale si le sous-agent ne se lance pas)
**Blocages :** le classifieur des sous-agents/commandes échoue par moments (« aucun verdict ») ; une seule nouvelle tentative, puis faire soi-même.

## État initial (référence)
- Build : OK. Lint : 6 erreurs (attendues). Scripts `verifier-analyse`, `verifier-github`, `verifier-grille` : OK.
- Mesure avant : moyenne 0,8 ; Architecture 2, Couverture 2, Accessibilité 0, Composants 0, Documentation 1, Gouvernance 0 ; couverture 82,4 % ; 9 valeurs déjà tokenisées (78 occurrences) ; 4 paires primary/selected < 4,5 (3,36).
- `mesure-avant.json` et `snapshot-avant.json` écrits.

## Rappels
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». **Un `vite preview` a été lancé en arrière-plan (port 4173) : l'arrêter en fin de session.**
- Sous-agents au premier plan ; jamais de fenêtre système (impression, sélecteur de fichiers).
- Snapshot : `node missions/site-avant-apres/recevoir-snapshot.mjs apres` en arrière-plan, puis POST depuis la page (voir DECISIONS).
- Si le navigateur est refusé dans la routine : faire tout le reste, noter ce qui manque dans le RAPPORT ; la clôture vérifiera.
