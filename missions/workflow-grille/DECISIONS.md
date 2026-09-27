# Mission workflow-grille — DECISIONS

Décisions prises sans Michael. Les décisions D1–D3 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 0 | Pas d'étape expert (Opus) | Mission de reprise d'un mode déjà construit et vérifié ; une ligne à changer par schéma. |
| 2026-09-27 | 2–3 | Commit unique pour les étapes 2 et 3 | Mesure puis modification faites dans la même passe, sans point de rupture naturel ; pas de perte de traçabilité (PLAN.md coche les deux séparément). |
| 2026-09-27 | 4 | Écart `outerHTML` du schéma « Cycle Git » sur `/lab/utilisation-ia` (mobile) classé faux positif, critère 3 validé PASS | Le texte diffère entre `auto/<nom>` (FR) et `auto/<name>` (EN) — c'est `UtilisationIA.jsx` lignes 392/414 vs 608/630, deux libellés distincts par langue, pas une regression. `git diff main --stat` confirme que `UtilisationIA.jsx` n'a pas été touché par cette mission ; la bascule de langue vient de la session de vérification (critère 4 lui demandait de tester FR et EN), pas du code. |
