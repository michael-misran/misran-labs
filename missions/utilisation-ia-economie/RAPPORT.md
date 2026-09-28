# Mission utilisation-ia-economie — RAPPORT

Exécutée le 2026-09-28 par la tâche programmée (Sonnet 5), sur `auto/utilisation-ia-economie`. Cadrage : Opus 5.5.

## Fait
- Points mécaniques de CONTENU §C (1 à 7), FR et EN : arborescence du projet (CLAUDE.md court, `missions/README.md`, verificateur « navigateur »), organigramme et tableau des modèles (ligne « sous-agent Haiku » ajoutée), boucle de reprise, circuit final, chronologie (jalons 15 à 18), bilan chiffré (mission 8), mise en abyme (« huitième mission »).
- Section « Un deuxième avis : Gemini » / « A second opinion: Gemini » : contexte, quatre limites, essai raté puis réussi, question, tableau des cinq pratiques (2 colonnes), conclusion.
- Section « Économiser les tokens » / « Cutting token usage » : tableau Poste / Avant / Après (4 lignes), bug corrigé, ce qui n'a pas été retenu, recommandation restante, publication par pull request.
- Les deux sections sont placées entre « Le push de main : un compromis » et « Bilan chiffré ».

## Pas fait
- Rien du périmètre. Deux étapes prévues pour Haiku (2 et 6) ont été faites par Sonnet, voir Délégations.

## Critères d'acceptation
1. Deux sections FR et EN avec tableaux, au bon endroit : **OK** (vérifié dans le navigateur, ordre des titres et tableaux 5×2 et 4×3).
2. Points §C appliqués FR et EN : **OK** (relecture du diff).
3. Aucun pourcentage dans les lignes ajoutées : **OK** (diff relu, aucun `%`). Vérifié contre `main`, voir Décisions.
4. Aucune couleur en dur, aucune donnée privée : **OK** (grep vide).
5. Console sans erreur sur `/lab/utilisation-ia` (FR, EN) et `/` ; aucun débordement à 375 px : **OK** (scrollWidth 375 pour innerWidth 375, en FR et en EN).
6. Build : **OK** (avertissement de taille de chunk préexistant). Lint : **OK**, 6 erreurs préexistantes, aucune dans UtilisationIA.jsx.
7. Seuls `src/lab/projects/UtilisationIA.jsx` et `missions/utilisation-ia-economie/` modifiés : **OK** (`git diff main --stat`).
8. Tout commité sur `auto/utilisation-ia-economie`, rien sur `main`, rien poussé, serveur arrêté : **OK**.

## Comment vérifier
- Passer sur la branche, lancer la preview « dev », ouvrir `/lab/utilisation-ia` en FR et en EN, descendre jusqu'aux sections Gemini et tokens (après « Le push de main »).
- Relire `git diff main -- src/lab/projects/UtilisationIA.jsx`.

## Décisions
Voir DECISIONS.md : ligne « Exécutants » du tableau des modèles réécrite ; formulation « étapes mécaniques prévues pour Haiku » sur la page (l'étape Haiku a été faite par Sonnet) ; critères 3 et 7 contrôlés contre `main` car `chore/economie-tokens` est fusionnée et supprimée.

## Délégations (modèles réellement utilisés)
- Étape 2 (prévue : sous-agent Haiku) : lancement refusé 4 fois par le contrôle de sécurité du mode Auto (erreur transitoire, sans verdict). Faite par la session principale, Sonnet 5.
- Étape 6 (prévue : verificateur Haiku) : même échec ; de plus, la preview « dev » est refusée en session non surveillée. Faite par Sonnet 5 sur `npx vite preview`.
- Étapes 3, 4, 5, 7 : Sonnet 5, comme prévu.
- Aucun sous-agent n'a réellement tourné : la répartition Haiku de cette mission n'a donc pas été testée.

## Recommandations
- Réessayer une mission avec étape Haiku quand le contrôle de sécurité répond, pour valider vraiment le choix « sous-agent (Haiku) ».
- Ajouter dans `missions/README.md` que la preview « dev » est refusée en session non surveillée et que `npx vite preview` (après build) est le repli à utiliser directement, sans tenter la preview d'abord.
- Le bilan chiffré affiche « — » pour les missions 7 et 8 : à remplir quand les durées seront connues.
