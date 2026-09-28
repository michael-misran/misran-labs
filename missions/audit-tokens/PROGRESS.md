# Mission audit-tokens — PROGRESS

**Statut :** étapes 1 à 4 faites — moteur complet + page `AuditTokens.jsx` branchée dans `PROJECTS` (dossier 009). Build OK, lint : 6 erreurs préexistantes, aucune nouvelle. Page pas encore vue dans le navigateur (étape 6).
**Prochaine action :** étape 5 — traduction EN par un sous-agent Haiku : dans `src/lab/projects/AuditTokens.jsx`, remplacer `const EN = { ...FR }` par un objet EN complet, mêmes clés que `FR` (y compris les fonctions et `rules.R1` à `R8`).
**Blocages :** aucun

## Notes
- Pour les étapes 6 et 7 : dans une routine, servir avec `npx vite preview` après `npm run build` (port 4173), pas la preview « dev ». Critères navigateur à contrôler : 1, 2, 3, 5, 6, 7, FR et EN. Le sélecteur de fichiers a un `<input type="file">` masqué (opacité 0, dans un `<label>`).
- Tokens du site (`tokens.css`) : 153 tokens, 0 erreur, 3 avertissements, 56 infos.

## État initial (relevé au cadrage, 2026-09-28, confirmé à l'étape 1)
- `npm run build` : OK (avertissement de taille de chunk, préexistant).
- `npm run lint` : 6 erreurs, 0 avertissement (préexistantes : VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell).
