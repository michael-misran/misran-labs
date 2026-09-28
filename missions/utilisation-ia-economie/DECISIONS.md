# Mission utilisation-ia-economie — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Branche créée depuis `chore/economie-tokens` (PR #11) et non depuis `main`. | La page décrit `missions/README.md`, et la tâche programmée lit ce fichier : il doit exister sur la branche. Si Michael fusionne la PR #11 avant celle-ci, la PR de la mission ne montrera que ses propres changements. |
| 2026-09-28 | 0 | Pas de nouveau schéma, deux tableaux avec `Table`. | Contenu comparatif (avant/après, pratique/système) : un tableau est plus lisible et moins coûteux qu'un nouveau diagramme. |
| 2026-09-28 | 2 | Étape marquée « sous-agent (Haiku) » faite par la session principale (Sonnet). | Le lancement du sous-agent a échoué 4 fois (le contrôle de sécurité du mode Auto ne répondait pas, erreur transitoire). Étape mécanique, faite directement ; écart vers un modèle plus cher noté, sans effet sur le résultat. |
| 2026-09-28 | 2 | Ligne « Exécutants » du tableau des modèles : colonne « Quand » réécrite en « Recherche dans le code ; contrôles dans le navigateur ». | L'ancien texte (« Tâches simples ou volumineuses ») ne disait plus rien de précis depuis que le build et le lint ne passent plus par le verificateur. |
| 2026-09-28 | 4 | Dans la section tokens, « étapes mécaniques prévues pour Haiku » et non « confiées à Haiku ». | L'étape 2 de cette mission, marquée Haiku, a finalement été faite par Sonnet (échec du lancement du sous-agent) : ne pas affirmer sur la page ce qui ne s'est pas passé. |
| 2026-09-28 | 5 | Critères 3 et 7 vérifiés contre `main` au lieu de `chore/economie-tokens`. | La branche `chore/economie-tokens` n'existe plus : la PR #11 a été fusionnée dans `main`, qui contient donc déjà la base de cette mission. |
| 2026-09-28 | 6 | Contrôles navigateur faits par la session principale (Sonnet) sur `npx vite preview` (port 4173, après build), et non par le verificateur sur la preview « dev ». | Le lancement du verificateur a échoué (contrôle de sécurité sans réponse) et la preview « dev » est refusée en session non surveillée ; le repli `vite preview` est prévu par missions/README.md. Serveur arrêté ensuite. |
