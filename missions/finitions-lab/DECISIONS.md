# Mission finitions-lab — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 5 | `AFFICHAGE_INITIAL` déplacé dans `Constats.jsx` (non listé dans D3) | Constante utilisée uniquement par `GroupeRegle`, qui déménage ; la laisser dans `AuditTokens.jsx` aurait forcé à la passer en prop, ce qui aurait changé la signature du composant (« ne pas réécrire »). |
| 2026-09-30 | 5 | `REGLES_IDS` déplacé et exporté depuis `rapportTexte.js` (non listé dans D3) | Utilisé à la fois par `construireRapport` (déplacé) et par `AuditTokens.jsx` (le regroupement des constats) ; le garder dans `rapportTexte.js` et l'y importer évite une dépendance circulaire et une duplication. |
| 2026-09-30 | 5 | Section « Appel à l'action » extraite dans un nouveau fichier `src/lab/projects/audit/Cta.jsx` (non listé dans D3) | Après le découpage D3 strict, `AuditTokens.jsx` faisait 462 lignes, au-dessus de l'objectif de 450 (critère d'acceptation 4). Cette section est autonome (ne dépend que de `c`) et suit le même modèle que les sous-composants déjà présents dans `audit/` (Couverture, Grille, Matrice). Ramène le fichier à 437 lignes. |
