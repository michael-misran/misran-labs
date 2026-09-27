# AUDIT — page « Utilisation de l'IA » (état au 27/09/2026)

Sources : `src/lab/projects/UtilisationIA.jsx` (lu en entier, FR et EN) et `CONTENU-MAJ.md` (seule source de faits). Chaque point est marqué **corrigé** ou **conservé (historique)** avec sa raison — mis à jour au fil de la rédaction (étapes 4–5), pas seulement écrit d'avance.

## 1. Passages inexacts sur la page actuelle (§A de CONTENU-MAJ)

| # | Emplacement (FR / EN) | Problème | Correction prévue | Statut |
|---|---|---|---|---|
| 1 | `finalFlow` étape 8, ligne 419 / 635 : « Push (moi) — interdit à Claude par les permissions » | Depuis « clôture les missions » (27/09), c'est **Claude** qui pousse les branches de mission et ouvre les PR ; Michael ne fait plus que fusionner. | Réécrire les étapes 6-9 du circuit final : rapport → « clôture les missions » (mot-clé) → vérification + push + PR (Claude) → fusion (moi). | corrigé |
| 2 | `gitFlow` étape « Push (moi) », ligne 394 / 610, dans la section « La clôture » | Même schéma général (pas seulement le circuit final) : attribue le push des branches de mission à Michael, alors que c'est Claude qui les pousse à la clôture. Push de `main` reste chez Michael (§H). | Renommer l'étape « Push (Claude, branches de mission) » et ajouter la nuance sur `main` dans le texte qui suit le schéma. | corrigé |
| 3 | `remaining` (« Ce qui me reste »), ligne 428 / 644 : « Le push et la fusion » | Il ne reste que **la fusion**, et le push de `main` quand Michael le demande explicitly (§H). Le push des branches de mission est fait par Claude. | Remplacer par « La fusion (et le push de `main`, sur ma demande explicite) ». | corrigé |
| 4 | `modelChart` (ModelOrgChart) et `modelsTableRows`, section « L'organigramme des modèles » | Ne montre que 3 sous-agents (explorateur, verificateur, expert). Il y en a **5** : + veilleur (Haiku, veille web Magazine) + relecteur (Sonnet, vérification factuelle Magazine). | Étendre `ModelOrgChart` (2 rangées de sous-agents) et ajouter 2 lignes au tableau des rôles. | corrigé |
| 5 | Arborescence projet (`TREE_PROJECT_FR/EN`), section « La mise en place » | Ne montre qu'une seule mission (`tokens-fix`) et 3 fiches d'agent. | **Conservé (historique)** : cette arborescence documente ce qui existait au moment de la mission 2 (26/09), passage narratif daté — pas une description de l'état actuel. La croissance (6→7 missions, 5 fiches, `src/magazine/`) est couverte par les nouvelles sections D et E. | conservé (historique) |
| 6 | `finalFlow` étape 4, ligne 415 / 631 : « Tâche programmée (Sonnet) — Toutes les 2 heures ; reprend après chaque coupure de quota » | Incomplet : la routine traite maintenant une **file d'attente** de missions (§E), pas une seule. | Ajouter à la sous-légende : « gère une file d'attente : la plus ancienne mission sans rapport, puis enchaîne ». | corrigé |
| 7 | `wrapupItems`, section « La clôture » (récit de la clôture de la mission 2, 26/09) | Décrit Michael poussant la branche lui-même. | **Conservé (historique)** : c'est le récit précis de la clôture de la mission 2, vrai à sa date ; le procédé a changé depuis (voir circuit final corrigé et nouvelles sections F/G). | conservé (historique) |
| 8 | `metaP` (mise en abyme), ligne 434 / 650 : « cette page est la deuxième mission » | Cette mise à jour est la **7ᵉ** mission du système. | Réécrire tout le paragraphe : la page a été écrite par la mission 2, elle est désormais entretenue par le système lui-même (mission 7, cette mise à jour). | corrigé |

## 2. Sections manquantes (§B à §I de CONTENU-MAJ) — à ajouter avant « Le circuit final »

| Section | Contenu | Statut |
|---|---|---|
| La 3ᵉ mission, et la fin des interruptions | §B (circuits-colonnes, schémas en grille serpentin) + §C (réglages d'autonomie : mode Auto, commandes simples, arrêt des serveurs, commits signés) | ajouté |
| Le Magazine | §D : rubrique `/magazine`, routine du lundi, le test et ses 3 inexactitudes corrigées, création du relecteur | ajouté |
| La file d'attente | §E : missions cadrées d'avance, recherche dans les branches, traitement à la suite | ajouté |
| Piloter depuis le téléphone | §F (Remote Control, cloud écarté) + §G (« clôture les missions » en un mot) | ajouté |
| Le push de `main` : un compromis | §H : compromis validé, refus de contourner le verrou | ajouté |
| Bilan chiffré | §I : tableau des 7 missions + la routine Magazine | ajouté |

## 3. Schémas à mettre à jour ou créer (D4)

| Schéma | Changement | Statut |
|---|---|---|
| `Timeline` (chronologie, §sequenceTitle) | Ajouter les jalons du 27/09 (mission 3, réglages d'autonomie, Magazine + test + relecteur, file d'attente, pilotage téléphone, compromis `main`, cette mise à jour) | ajouté |
| `ModelOrgChart` | Ajouter veilleur (Haiku) et relecteur (Sonnet) : 5 sous-agents au lieu de 3 | ajouté |
| Nouveau : pilotage depuis le téléphone | `FlowDiagram` : téléphone → session tour de contrôle → routine (missions) → pull requests → fusion dans l'app GitHub | ajouté |
| `finalFlow` (circuit final) | Refléter le nouveau partage push/fusion (point 1 ci-dessus) | corrigé |
| `gitFlow` (La clôture) | Idem (point 2 ci-dessus) | corrigé |

## Conclusion

Tous les points du §A sont traités (5 corrigés, 2 conservés comme historiques avec raison, 1 correction supplémentaire trouvée à l'audit — le `gitFlow` en plus du `finalFlow`). Les §B à §I sont couverts par 6 nouvelles sections. Détail des données de chaque schéma et texte exact : `DECISIONS.md`.
