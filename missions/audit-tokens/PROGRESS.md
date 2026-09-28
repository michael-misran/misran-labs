# Mission audit-tokens — PROGRESS

**Statut :** étapes 1 à 3 faites — moteur complet (CSS, DTCG, Tokens Studio, R1 à R8), `verifier-analyse.mjs` vert
**Prochaine action :** étape 4 (page `src/lab/projects/AuditTokens.jsx`, entrée dans `PROJECTS`, textes FR complets, EN à compléter à l'étape 5)
**Blocages :** aucun

## Notes pour l'étape 4
- API du moteur : `analyse([{ nom, contenu }])` → `{ tokens, fichiers: [{nom, format, tokens}], constats, resume, avertissements }`. Constat : `{ regle, gravite, tokens[], fichier, emplacement, detail: {fr, en} }`. Avertissement : `{ fichier, detail: {fr, en} }`. Résumé : `fichiers, tokens, tokensParFormat, tokensParType, constatsParGravite, tokensSains, partSaine (0..1 ou null)`.
- Les détails de règles (FR + EN) sont déjà produits par le moteur ; la page n'a à traduire que son interface et les titres/explications génériques des règles R1 à R8.
- Exemples à importer avec `?raw` depuis `src/lab/audit/exemples/`, et `src/styles/tokens.css?raw` pour « Auditer les tokens de ce site ».
- Tokens du site (`tokens.css`) : 153 tokens, 0 erreur, 3 avertissements, 56 infos.

## État initial (relevé au cadrage, 2026-09-28, confirmé à l'étape 1)
- `npm run build` : OK (avertissement de taille de chunk, préexistant).
- `npm run lint` : 6 erreurs, 0 avertissement (préexistantes : VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell).
