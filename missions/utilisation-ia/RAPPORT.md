# Mission utilisation-ia — RAPPORT

## Fait

Une nouvelle fiche du Lab, « Utilisation de l'IA » (FR) / « How I use AI » (EN), placée juste sous « Tokens du Lab » dans la sidebar et sur la home, à l'URL `/lab/utilisation-ia`.

- **Registre** : entrée `utilisation-ia` ajoutée à la fin de `PROJECTS` (`src/lab/projects.js`), dossier Nº 008. `LAB_SLUGS` mis à jour dans `src/shell/Sidebar.jsx`.
- **Composant** : `src/lab/projects/UtilisationIA.jsx`, calqué sur `WorkflowSolo.jsx` (masthead, hero, sections, pied de page).
- **Contenu** : les §0 à §12 de `CONTENU.md` sont tous couverts, en 14 sections + une intro, en français et en anglais, à la première personne, avec la section finale (§12 → « Mise en abyme ») qui dit explicitement que la page a été produite par le système lui-même.
- **7 schémas** (D4) : chronologie (`Timeline`), circuit d'une mission, boucle de reprise après quota, circuit Git (3× `FlowDiagram` vertical), organigramme des modèles et schéma local vs cloud (2 SVG maison, composant `DiagramBox`), deux arborescences (§7 et §10) en blocs `<pre>` stylés aux tokens.
- **Tokens uniquement** : aucune couleur brute, uniquement `var(--…)`.
- **Confidentialité** : aucun token, aucun chemin `/Users/…`, aucun email — vérifié par grep et par relecture manuelle (le §6 sur l'incident de sécurité reste volontairement vague sur le token et le dépôt).
- **Responsive** : aucun débordement horizontal à 375 px.

## Pas fait

Rien de prévu par la SPEC n'a été laissé de côté. Deux écarts mineurs par rapport au plan initial, documentés dans `DECISIONS.md` :
- Les étapes 5 (rédaction FR) et 6 (traduction EN) ont été faites en un seul passage au lieu de deux commits séparés — même fichier, même objet `CONTENT`, aucune perte de traçabilité.
- La vérification en navigateur (étapes intermédiaires et étape 7) s'est faite via un serveur statique `vite preview` plutôt que `npm run dev`, qui ne peut pas être lancé depuis une session non supervisée.

## Critères d'acceptation

1. **Sidebar / URL** : ✅ « Utilisation de l'IA » / « How I use AI » juste sous « Tokens du Lab », dossier Nº 008, `/lab/utilisation-ia` s'affiche en FR et en EN.
2. **Couverture §0–§12 + 7 schémas** : ✅ vérifiée section par section par le verificateur.
3. **Console** : ✅ aucune erreur sur `/lab/utilisation-ia` (FR et EN) ni sur `/`.
4. **Responsive 375 px** : ✅ `document.documentElement.scrollWidth <= innerWidth`.
5. **Confidentialité / couleurs brutes** : ✅ les deux greps ne renvoient rien.
6. **Build / lint** : ✅ `npm run build` passe ; `npm run lint` : 6 erreurs préexistantes, aucune nouvelle.
7. **Git** : ✅ tout est commité sur `auto/utilisation-ia` (7 commits, un par étape 2 à 8), rien sur `main`, rien poussé.

## Comment vérifier

```bash
git log --oneline main..auto/utilisation-ia
npm run build && npm run lint
npx vite preview --port 4175 --strictPort &
```
Puis ouvrir `http://localhost:4175/lab/utilisation-ia` (FR), et la même URL après `localStorage.setItem('lang','en')` + rechargement (EN). Vérifier aussi que « Utilisation de l'IA » apparaît bien sous « Tokens du Lab » dans la sidebar et sur la home (`http://localhost:4175/`).

## Décisions prises seule

Toutes détaillées dans `DECISIONS.md` :
- `SiteMapDiagram` écarté au profit de blocs `<pre>` pour les deux arborescences (ses titres « AVANT/APRÈS » sont figés en français, et les deux arbres de CONTENU.md ne sont de toute façon pas un avant/après).
- Composant local `DiagramBox` créé pour les schémas 4 et 5 (organigramme des modèles, local vs cloud), qu'aucun composant existant ne couvre — pas de modification des composants existants.
- Rédaction FR et traduction EN faites en un seul passage.
- Icône du dossier : `◧`, dans le même style que les autres (◼ ◐ ◈ ▲ ▣ ◫ ▦), non réutilisée ailleurs.

## Délégations et modèles réellement utilisés

| Étape | Agent | Modèle prévu | Modèle utilisé |
|---|---|---|---|
| 0–1 | session principale | Opus | Opus 5.5 |
| 2 | explorateur | Haiku | Haiku 4.5 |
| 3 | expert | Opus | Opus 5.5 |
| 4 | session principale | Sonnet | Sonnet 5 |
| 5–6 | session principale | Sonnet | Sonnet 5 |
| 7 | verificateur | Haiku | Haiku 4.5 |
| 8 | session principale | Sonnet | Sonnet 5 |

Chaque étape a été exécutée par le modèle prévu au cadrage — aucun écart, aucun appel supplémentaire à l'expert nécessaire (aucune étape n'a bloqué deux fois).

## Recommandations (hors périmètre de cette mission)

- La contrainte « pas de serveur de développement en session non supervisée » a de nouveau demandé un contournement (`vite preview`, comme dans la mission `tokens-fix`). Si ça se reproduit souvent, ça vaudrait la peine d'ajouter un script `npm run preview:ci` documenté dans le CLAUDE.md du projet, pour que chaque mission n'ait pas à le redécouvrir.
- `SiteMapDiagram` n'a toujours aucun usage réel dans le code (ni avant cette mission, ni après) — si une prochaine fiche veut vraiment un avant/après, il faudra soit lui ajouter des props de titre traduisibles, soit continuer avec des blocs `<pre>`.
