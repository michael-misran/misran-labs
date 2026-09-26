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

### Reprise
Toute session de mission commence par lire `SPEC.md`, `PLAN.md`, `PROGRESS.md`, puis reprend à la première étape non cochée. Ne jamais refaire une étape cochée.
Le travail doit pouvoir s'interrompre à tout moment (limite de quota) : fichiers de suivi à jour et commit après **chaque** étape.

### Git (exception validée par Michael le 2026-09-26)
- Travail uniquement sur la branche `auto/<nom-mission>`. Vérifier la branche avant toute modification.
- Commits libres sur `auto/*`, sans demander. Un commit par étape du plan. Message en anglais, terminé par `Co-Authored-By: <modèle utilisé> <noreply@anthropic.com>`.
- **Interdit** : commit sur `main`, push, merge, rebase de `main`, déploiement, `--force`. Ces actions restent à Michael.

### Autonomie
- Ne jamais s'arrêter pour poser une question. En cas d'ambiguïté : option la plus prudente et réversible, notée dans `DECISIONS.md`, puis continuer.
- Si une étape est impossible (bloquante) : la noter dans `PROGRESS.md`, passer à la suivante si elle est indépendante, sinon écrire `RAPPORT.md` et s'arrêter.
- Pas de `npm install`, pas de nouvelle dépendance.
- Pas de secrets, pas d'appels à des services externes.
- Hors périmètre de la SPEC : ne pas le faire, le noter comme recommandation dans `RAPPORT.md`.

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
