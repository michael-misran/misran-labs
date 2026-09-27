# Mission projets — RAPPORT

Rédigé par la session principale (Sonnet 5), tâche programmée `misran-labs-missions`, 2026-09-27.

## Fait

- **Direction visuelle** (étape 2, expert Opus) : décision complète dans `missions/projets/DECISIONS.md` § « Direction visuelle — étape 2 », suivie à la lettre aux étapes 3-4.
- **Données** (étape 3) : `src/projets/projetsText.js` (statuts/types/tailles + textes fr/en), `src/projets/idees.js` (chargement + validation stricte D1–D2 via `import.meta.glob`), `src/projets/idees/P-001.json` (idée réelle — application de prise de mandat pour agent immobilier, citée par Michael le 26.09.2026, statut `proposee`), `src/projets/FORMAT.md` (documentation du format public/privé et de la marche à suivre pour la routine hebdomadaire), `src/private/projets/P-001.md` (note privée, gabarit D3, sections « à évaluer », **jamais commitée**).
- **Pages, routes, navigation** (étape 4) : `src/projets/ProjetsParts.jsx` (`ProjetsHero`, `StatusMark`, `StatusFilter`, `IdeaRow`, `PrivateNotes`), `src/projets/ProjetsHome.jsx` (`/projets`, liste + filtres par statut), `src/projets/ProjetIdee.jsx` (`/projets/:id`, détail + page « introuvable »), routes ajoutées dans `src/App.jsx`, section sidebar « Projets » après « Magazine » dans `src/shell/Sidebar.jsx` (symbole ◇), titres d'onglet dans `src/shell/registry.js`, textes `navSectionProjets`/`projetsNav` (fr/en) dans `src/i18n/ui.js`.
- **Vue privée locale** (D5) : bloc « Notes privées (local) » chargé uniquement si `import.meta.env.DEV`, via `import.meta.glob` non eager sur `src/private/projets/*.md`.

## Critères d'acceptation

| # | Critère | Statut |
|---|---|---|
| 1 | Sidebar « Projets » après Magazine (FR/EN), actif sur `/projets` et `/projets/P-001` | Code en place (copie exacte du motif Magazine — `NavItem` avec `end={false}`) ; **rendu non vérifié dans un navigateur** (voir « Non vérifié » ci-dessous) |
| 2 | `/projets` et `/projets/P-001` s'affichent en FR et EN ; filtres fonctionnent ; `/projets/P-999` → « Idée introuvable » | Code en place et relu ; **non vérifié dans un navigateur** |
| 3 | Validation : fichier avec clé `prix` et fichier sans `en` rejetés avec `console.error`, puis supprimés | **Fait autrement** : deux fichiers invalides créés dans `src/projets/idees/`, logique de validation d'`idees.js` rejouée dans un script Node autonome (`import.meta.glob` n'existe pas hors Vite, donc pas d'exécution directe du module) → les deux sont bien rejetés (clé `prix` non prévue ; texte `en` manquant), `P-001.json` reste valide. Fichiers supprimés ensuite, jamais commités. Le message `console.error` réel (dans le navigateur) n'a pas pu être observé. |
| 4 | Notes privées absentes du build de production | **Fait, testé réellement** : chaîne repère ajoutée dans `src/private/projets/P-001.md`, `npm run build`, `grep -r` sur `dist/` → chaîne absente, confirmée deux fois, chaîne retirée ensuite |
| 5 | `git status` : rien de `src/private/` suivi ; `git check-ignore` confirme | Fait — vérifié après chaque étape |
| 6 | Aucune erreur console sur `/projets`, `/projets/P-001` (FR/EN), `/`, `/magazine` | **Non vérifié** (pas de navigateur dans cette session) |
| 7 | 375 px : pas de débordement horizontal | **Non vérifié** (pas de navigateur) ; conçu avec `overflowWrap: anywhere` et `flexWrap: wrap` partout, comme le Magazine |
| 8 | `grep -nE "#[0-9a-fA-F]{3,8}\|rgba?\("` sur `src/projets/*.jsx` ne renvoie rien | Fait — confirmé, aucun résultat |
| 9 | `npm run build` passe ; `npm run lint` ≤ 6 erreurs préexistantes, aucune dans les fichiers de la mission | Fait — build OK, lint : 6 erreurs, toutes préexistantes (identiques à la référence de l'étape 1) |
| 10 | Tout commité sur `auto/projets` (sauf `src/private/`), rien sur `main`, rien poussé, aucun serveur laissé en marche | Fait — 4 commits (étapes 2 à 4 + ce rapport), aucun `git push`, aucun serveur lancé (le harnais a refusé `preview_start` dans cette session programmée) |

## Pas fait / bloqué

**Aucun accès navigateur dans cette session.** Le harnais refuse `preview_start` (« Dev servers can't be started from unattended sessions ») pour une tâche programmée. Cela bloque structurellement les critères 1, 2, 6 et 7, qui exigent d'observer le rendu réel des pages. Ce n'est pas un échec de la mission : `CLAUDE.md` du projet prévoit explicitement que les sessions de routine n'ont pas cet accès et que la clôture (avec vérification navigateur complète) se fait en session interactive.

**Avant de pousser cette mission**, la session de clôture (interactive, avec Remote Control) doit impérativement :
1. Passer sur `auto/projets`, lancer la preview « dev ».
2. Vérifier `/`, `/magazine`, `/projets`, `/projets/P-001` en FR et EN : aucune erreur console, rendu correct.
3. Vérifier `/projets/P-999` → page « Idée introuvable ».
4. Cliquer les 5 filtres de statut sur `/projets` (bascule, compteurs, lien « Tout afficher »).
5. Vérifier le bloc « Notes privées (local) » visible sous `/projets/P-001` en dev (contenu de `src/private/projets/P-001.md`).
6. Redimensionner à 375 px sur `/projets` et `/projets/P-001` : pas de débordement horizontal.
7. Arrêter le serveur de preview avant de revenir sur `main`.

Si tout est bon, la clôture peut suivre la procédure normale de `CLAUDE.md` (`git push -u origin auto/projets`, `gh pr create`).

## Décisions prises sans Michael

Voir `missions/projets/DECISIONS.md` (D1–D9 dans SPEC.md, décisions d'étape 0, 2 et 4 dans le tableau).

## Délégations

Voir `missions/projets/DELEGATIONS.md`. Un sous-agent réellement utilisé : `expert` (Opus 5.5) pour la direction visuelle (étape 2). Le `verificateur` n'a pas été lancé (même limitation d'accès navigateur que la session principale).

## Recommandations pour la routine hebdomadaire (mission suivante)

- La routine qui proposera des idées chaque semaine devra suivre exactement `src/projets/FORMAT.md` (§ « Marche à suivre pour la routine hebdomadaire ») : un fichier JSON par idée, jamais de clé économique, note privée séparée avec gabarit, jamais commitée.
- Prévoir que la routine tourne, comme le Magazine, dans une session ayant accès au navigateur pour sa propre vérification (ou qu'elle délègue ce contrôle à la session de clôture), puisque les sessions programmées de missions n'y ont pas accès.
- La numérotation `P-NNN` n'est jamais réutilisée : la routine doit lire le plus grand numéro existant (y compris les idées `arretee`) avant d'en créer une nouvelle.
- Envisager, une fois plusieurs idées publiées, un tri secondaire ou une recherche sur `/projets` si la liste devient longue (hors périmètre de cette mission).
