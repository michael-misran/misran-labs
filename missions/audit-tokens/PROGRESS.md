# Mission audit-tokens — PROGRESS

**Statut :** étapes 1 à 5 faites — moteur complet, page FR + EN (traduction Haiku relue, 1 erreur de syntaxe corrigée). Build OK, lint : 6 erreurs préexistantes, aucune nouvelle. Page pas encore vue dans le navigateur.
**Prochaine action :** étape 6 — build/lint/script + grep des chiffres économiques par la session principale, puis navigateur (critères 1, 2, 3, 5, 6, 7, FR et EN) par le `verificateur` (Haiku).
**Blocages :** aucun

## Notes
- Dans une routine : `npm run build` puis `npx vite preview` (port 4173), pas la preview « dev ». Arrêter le serveur en fin de session.
- La page : `/lab/audit-tokens`. Le sélecteur de fichiers est un `<input type="file">` masqué (opacité 0, dans un `<label>`). Boutons : Analyser, Exemples (CSS / DTCG / Tokens Studio), « Auditer les tokens de ce site ».
- Tokens du site (`tokens.css`) : 153 tokens, 0 erreur, 3 avertissements, 56 infos.

## État initial (relevé au cadrage, 2026-09-28, confirmé à l'étape 1)
- `npm run build` : OK (avertissement de taille de chunk, préexistant).
- `npm run lint` : 6 erreurs, 0 avertissement (préexistantes : VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell).
