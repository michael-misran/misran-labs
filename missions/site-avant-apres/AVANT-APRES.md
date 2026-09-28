# Avant / après — audit du site par son propre outil

Mesuré par `mesurer-audit.mjs` (mêmes modules et mêmes règles de repérage que le mode GitHub de `/lab/audit-tokens`), sur les fichiers suivis par Git. Chiffres copiés de `mesure-avant.json` et `mesure-apres.json`.

| Axe | Avant | Après | Critères gagnés |
|---|---|---|---|
| Architecture | 2 | 2 | — |
| Couverture | 2 | 2 | — (couverture 82,4 % → 88,4 %, mais « déjà tokenisées < 10 » reste faux) |
| Accessibilité | 0 | **1** | `focus-visible` |
| Composants | 0 | 0 | — |
| Documentation | 1 | 1 | — |
| Gouvernance | 0 | **3** | changelog, codeowners, workflows, licence |
| Parité Figma ↔ code | non évalué | non évalué | — (jamais automatique) |
| **Moyenne (6 axes évalués)** | **0,8** | **1,5** | |

## Détail des mesures
- **Couverture par les tokens** : 82,4 % → 88,4 % (usages de tokens 646 → 693, valeurs en dur 138 → 91).
- **Valeurs en dur qui ont déjà un token** : 9 valeurs / 78 occurrences → 7 valeurs / 31 occurrences. Le critère exige moins de 10 occurrences : non atteint. Il reste des paddings à 10, 20, 2 et 4 px (aucun token d'espacement à ces valeurs), des `blur()`, des tailles de police et des textes éditoriaux qui citent des px.
- **Contrastes** : 15 paires détectées ; échecs 8 → 4.
  - Corrigées : `--on-primary` / `--primary` et `--on-selected` / `--selected-surface`, dans `:root` et `[data-invert]` (3,36:1 → 4,80:1, paires maintenant `--on-primary-surface` / `--primary-surface` et `--on-selected` / `--selected-surface`).
  - Restent : `--text` sur `--bg` (3,36), `--surface-base` (3,36), `--surface-inset` (4,05), `--surface-raised` (2,94) **dans `[data-invert]`**. Choix de Michael : les grands blocs corail plein gardent le corail vif. Les critères « toutes les paires » et « 90 % » (11/15 = 73 %) restent donc faux.
- **Tokens** : 153 → 155 (2 ajoutés, 1 supprimé dans chaque contexte). Constats de l'audit des tokens : 0 erreur avant et après.
- **Lint** : 6 erreurs → 0. Build : OK. Les 3 scripts de vérification passent.

## Ce que ça change côté public
La note publique de l'outil (sur GitHub) est calculée sur la branche `main` du dépôt : elle ne bougera qu'**après fusion** de la pull request de cette mission.
