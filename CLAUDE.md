# misran-labs — règles projet

Site portfolio / Lab de Michael Misran. Vite + React 19 + react-router, déployé sur Vercel.
Design tokens : `src/styles/tokens.css` (primitive → semantic → component).
Documentation vivante des tokens : `src/lab/projects/LabTokens.jsx` (dossier 007).

## Commandes
- Dev : `npm run dev` (port 5173, config preview « dev » dans `.claude/launch.json`)
- Build : `npm run build`
- Lint : `npm run lint`

## Missions autonomes

Une mission = un dossier `missions/<nom>/` :

| Fichier | Rôle |
|---|---|
| `SPEC.md` | Objectif, décisions d'architecture, critères d'acceptation. Ne pas modifier. |
| `PLAN.md` | Étapes à cocher `[x]` au fur et à mesure. |
| `PROGRESS.md` | État courant, court : où on en est, prochaine action, blocages. Réécrit à chaque étape. |
| `DECISIONS.md` | Toute décision prise sans Michael (ambiguïté, choix technique). Une ligne par décision + raison. |
| `DELEGATIONS.md` | Journal de chaque sous-agent lancé : agent, modèle, tâche, résultat. |
| `RAPPORT.md` | Écrit à la fin : ce qui est fait, pas fait, comment vérifier. |

### Lancer une mission (session interactive avec Michael)
Quand Michael donne un brief (« mission : … ») :
1. Explorer le code concerné, puis rédiger `SPEC.md` : contexte, objectif, **décisions d'architecture tranchées** (numérotées D1, D2…), critères d'acceptation vérifiables, hors périmètre. Ne poser à Michael que les questions qu'on ne peut vraiment pas trancher seul.
2. Rédiger `PLAN.md` : étapes courtes, chacune avec son agent et son modèle (voir « Modèle par étape »). Initialiser `PROGRESS.md`, `DECISIONS.md`, `DELEGATIONS.md`.
3. Relever l'état initial (build, lint) dans `PROGRESS.md` comme référence.
4. Créer la branche `auto/<nom>`, commiter le cadrage dessus. L'arbre de travail doit être propre, sinon la tâche programmée refuse de démarrer.
5. Dire à Michael que la tâche programmée `misran-labs-missions` (toutes les 2h, sur Sonnet) prendra le relais, ou qu'il peut la lancer tout de suite avec « Run now » dans Scheduled.

### Clôturer une mission (session interactive avec Michael)
**Règle par défaut (validée par Michael le 2026-09-27)** : quand Michael dit « clôture les missions » (ou qu'une mission est terminée), Claude fait toute la clôture d'un coup, sur Mac comme depuis le téléphone ; Michael n'a plus qu'à fusionner.
1. Trouver les missions terminées : branches `auto/*` (hors `auto/magazine-*`) dont `missions/<nom>/RAPPORT.md` existe.
2. Pour chacune : lire `RAPPORT.md`, `DECISIONS.md`, `DELEGATIONS.md` ; vérifier soi-même dans le navigateur (passer sur la branche, preview « dev », puis arrêter le serveur et revenir sur `main`) ; vérifier qu'aucun secret ni donnée personnelle n'est dans `git diff main...auto/<nom>` (le dépôt est **public**).
3. Si tout est bon : pousser la branche (`git push -u origin auto/<nom>`, jamais `main`) et ouvrir la pull request (`gh pr create`, résumé du RAPPORT + modèles utilisés). Si un point bloque : ne pas pousser cette mission, l'expliquer à Michael.
4. Résumer à Michael, court : par mission, le résultat, les modèles réellement utilisés, le lien de la PR. Le lien de prévisualisation Vercel est dans le commentaire Vercel de la PR (ou `gh pr checks <n>`).
5. Michael fusionne (fusion interdite à Claude). Quand il le dit : `git checkout main`, `git pull`, `git fetch --prune`, puis supprimer les branches locales fusionnées (`git branch -d auto/<nom>`).

Michael n'est pas à l'aise avec Git/GitHub : expliquer chaque étape simplement, commande à lancer dans son propre bloc.

### File d'attente
Plusieurs missions peuvent être cadrées d'avance : chacune vit sur sa branche `auto/<nom>`, partie de `main`, et donne sa propre pull request. Les fichiers d'une mission n'existent que sur sa branche : **ne jamais chercher les missions dans le dossier ouvert**, mais dans les branches.
1. Lister les branches de mission, de la plus ancienne à la plus récente : `git for-each-ref --sort=creatordate --format=%(refname:short) refs/heads/auto/` (ignorer `auto/magazine-*`, gérées par la routine du Magazine).
2. Pour chacune, `git show <branche>:missions/<nom>/RAPPORT.md` : si le fichier existe, la mission est terminée.
3. Traiter **la plus ancienne mission sans RAPPORT.md**. Une fois terminée, revenir sur `main` (`git checkout main`) et passer à la suivante s'il reste du quota.
4. Au moment du cadrage, créer toujours la branche d'une nouvelle mission depuis `main`, jamais depuis une autre branche de mission.

### Reprise
Toute session de mission commence par lire `SPEC.md`, `PLAN.md`, `PROGRESS.md`, puis reprend à la première étape non cochée. Ne jamais refaire une étape cochée.
Le travail doit pouvoir s'interrompre à tout moment (limite de quota) : fichiers de suivi à jour et commit après **chaque** étape.

### Git (exception validée par Michael le 2026-09-26)
- Travail uniquement sur la branche `auto/<nom-mission>`. Vérifier la branche avant toute modification.
- Commits libres sur `auto/*`, sans demander. Un commit par étape du plan. Message en anglais, terminé par `Co-Authored-By: <modèle utilisé> <noreply@anthropic.com>`.
- **Interdit** : commit sur `main`, push, merge, rebase de `main`, déploiement, `--force`. Ces actions restent à Michael.
- **Push de `main` (compromis validé par Michael le 2026-09-27)** : autorisé **uniquement** dans une session interactive où Michael est présent, sur sa demande explicite pour ce push-là (pousser `main` met le site en production via Vercel). **Jamais** dans une routine ou une session de mission autonome, quelle que soit la situation. Jamais de `--force`.

### Autonomie
- Ne jamais s'arrêter pour poser une question. En cas d'ambiguïté : option la plus prudente et réversible, notée dans `DECISIONS.md`, puis continuer.
- Si une étape est impossible (bloquante) : la noter dans `PROGRESS.md`, passer à la suivante si elle est indépendante, sinon écrire `RAPPORT.md` et s'arrêter.
- Pas de `npm install`, pas de nouvelle dépendance.
- Pas de secrets, pas d'appels à des services externes.
- Hors périmètre de la SPEC : ne pas le faire, le noter comme recommandation dans `RAPPORT.md`.
- **Commandes shell simples** : une commande par appel, sans `&&`, `;`, boucle `for`, `$(…)` ni heredoc. Une commande composée n'est pas reconnue par les autorisations et déclenche une demande à laquelle personne ne répond. Commit : `git commit -m "titre" -m "corps"` plutôt qu'un heredoc. Lire des fichiers avec l'outil Read plutôt que `cat`.
- Vérification dans le navigateur : preview « dev » (`preview_start`). S'il est indisponible, `npx vite preview` après `npm run build`.
- **Fin de session** : arrêter tout serveur lancé pendant la session (`preview_stop`, ou arrêt du processus `vite preview`) avant de terminer.
- **Commits** : seule la session principale commite. Les sous-agents ne commitent jamais. Le commit d'une étape porte une ligne `Co-Authored-By` par modèle ayant travaillé dessus (ex. `Claude Haiku 4.5` pour une étape déléguée au verificateur).

### Répartition des modèles
Session principale : Sonnet (exécution du plan). Sous-agents autorisés sans demander, dans `.claude/agents/` :

| Agent | Modèle | Quand |
|---|---|---|
| `explorateur` | Haiku | Recherche dans le code, inventaires (« où est utilisé X ? »). |
| `verificateur` | Haiku | Build, lint, contrôle des pages dans le navigateur, snapshots de valeurs. |
| `expert` | Opus | Uniquement après 2 échecs sur un même problème, ou décision d'architecture non couverte par la SPEC. Rare. |

Ne pas déléguer ce qui est plus court à faire soi-même. Chaque délégation est consignée dans `DELEGATIONS.md`.

**Modèle par étape.** Au cadrage, chaque étape du `PLAN.md` se termine par `→ <agent> (<modèle>)`, selon sa difficulté. La session d'exécution suit cette indication ; elle peut appeler `expert` en plus si une étape bloque, jamais en moins (une étape marquée `expert` n'est pas faite par Sonnet seul). Tout écart est noté dans `DECISIONS.md`.

## Conventions
- Commentaires en français.
- Priorité : fidélité visuelle > qualité du code.

## Magazine
Veille IA hebdomadaire (/magazine), un numéro = un fichier JSON dans src/magazine/numeros/. Format : src/magazine/FORMAT.md. Procédure : src/magazine/REDACTION.md.
**Exception Git validée par Michael le 2026-09-27** : la routine du Magazine pousse sa branche auto/magazine-<date> et ouvre la pull request. Les missions ne poussent jamais. Fusionner reste toujours à Michael.
