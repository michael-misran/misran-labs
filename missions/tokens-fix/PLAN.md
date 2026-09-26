# Mission tokens-fix — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.

- [x] 0. Cadrage : SPEC, PLAN, cadre de mission (Opus, session interactive)
- [x] 1. État initial : noter dans PROGRESS.md le résultat de `npm run lint` et `npm run build` (référence pour le critère 4). Délégation possible : `verificateur`.
- [x] 2. Snapshot avant : relever les valeurs calculées de tous les tokens définis dans tokens.css, sur `:root` et sur un élément `[data-invert]` (en créer un temporairement via JS dans la page si besoin), écrire `snapshot-avant.json`. **Avant toute modification de tokens.css.** Délégation : `verificateur`.
- [x] 3. tokens.css — ajouter les primitives D1 à D5 (section 1).
- [x] 4. tokens.css — convertir les semantics en alias (section 2), supprimer la section STRUCTURE (D7), convertir `[data-invert]` (D6), mettre à jour les commentaires.
- [x] 5. Snapshot après + comparaison avec l'avant → doit être identique. Si différence : corriger et recommencer cette étape. Délégation : `verificateur`.
- [x] 6. LabTokens.jsx — nouvelles catégories de primitives, `pointsTo`/`value` des semantics corrigés, aperçus (D8), relecture des textes FR/EN.
- [ ] 7. Vérification finale : page Tokens du Lab (`/lab/lab-tokens`) (FR + EN) → 0 erreur, pas d'erreur console ; page d'accueil sans erreur console ; build ; lint. Délégation : `verificateur`.
- [ ] 8. RAPPORT.md : fait / pas fait, comment vérifier, décisions, délégations (résumé de DELEGATIONS.md), recommandations hors périmètre.
