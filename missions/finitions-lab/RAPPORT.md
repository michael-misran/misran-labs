# Mission finitions-lab — RAPPORT

## Résultat en une ligne
Les 5 finitions du brief sont faites : moteur Godot partagé (site 74 Mo → 37 Mo de jeux), lien « Suivre » sur l'accueil, `AuditTokens.jsx` découpé (807 → 437 lignes) avec son texte d'accroche à jour, 4 nouveaux tokens d'espacement, et ~600 valeurs en dur remplacées par ces tokens — sans aucune différence de rendu mesurée (0 écart sur 10 pages/largeurs comparées pixel par pixel).

## Fait
- **D1 — Moteur Godot partagé** : `public/games/godot-engine/` créé, `index.js`/`index.wasm`/les deux worklets audio déplacés depuis la v0.1 (`git mv`), supprimés de la v0.2 (`git rm`). Les deux `index.html` pointent vers ce dossier commun (`executable`, `mainPack`, `fileSizes` ajustés). Les deux versions du jeu vérifiées dans le navigateur (canvas affiché, wasm en 200, aucune erreur).
- **D2 — Lien Suivre** : troisième lien dans la rangée `LatestIssue` de l'accueil, `◉ Suivre le Lab →` / `◉ Follow the Lab →`, poussé à droite, vers `/suivre`.
- **D3 — Découpage d'`AuditTokens.jsx`** : `audit/contenu.js` (textes FR/EN), `audit/Constats.jsx` (pastilles, filtre, groupe de règles), `audit/rapportTexte.js` (fonctions de texte du rapport) créés ; code déplacé à l'identique. Un quatrième fichier (`audit/Cta.jsx`) a été nécessaire pour atteindre l'objectif de 450 lignes (voir Décisions).
- **D4 — Nouveau texte d'accroche** : `ctaText` mis à jour en FR et en EN dans `contenu.js`, vérifié affiché sur la page (les deux langues).
- **D5 — Tokens d'espacement** : `--space-3xs` (2px), `--space-2xs` (4px), `--space-xs-plus` (10px), `--space-md-plus` (20px) ajoutés dans `tokens.css` et documentés dans `LabTokens.jsx`.
- **D6 — Remplacement des espacements en dur** : 610 remplacements dans 64 fichiers (`.jsx`), y compris dans les chaînes multi-valeurs (remplacement partiel, ex. `'6px 10px'` → `'6px var(--space-xs-plus)'`) et dans les branches de ternaires qui correspondent à une valeur listée. Aucun fichier exclu touché, aucune valeur `calc()` ou négative touchée.
- **D7 — Mesures avant/après** : scripts copiés et adaptés dans `missions/finitions-lab/`, mesure d'audit (`mesure-avant.json`/`mesure-apres.json`) et snapshots de styles calculés (`snapshot-avant.json`/`snapshot-apres.json`) sur 5 pages × 2 largeurs.

## Pas fait / écarts
- **Trois fichiers non prévus par D3** ont dû être créés pour respecter l'ensemble de la SPEC (objectif de lignes de D3, dépendances de `REGLES_IDS`/`AFFICHAGE_INITIAL`) : détail et raison dans DECISIONS.md, étape 5.
- **Étape 8 faite par la session principale plutôt que par un sous-agent Haiku** : l'inventaire produit par l'agent `explorateur` s'est révélé incomplet et partiellement incorrect (voir DECISIONS.md, étape 8) ; refait via un script déterministe pour garantir l'exactitude d'une modification touchant 64 fichiers.
- **Aucun repli D1 nécessaire** : les deux versions du jeu ont fonctionné du premier coup après le déplacement du moteur.
- Rien d'autre laissé de côté ; tous les critères d'acceptation listés dans SPEC.md sont atteints (détail ci-dessous).

## Critères d'acceptation
1. **OK** — `public/games/godot-engine/index.wasm` est le seul `index.wasm` de `public/` ; `du -sh public/games` = 37 Mo (< 40 Mo).
2. **OK** — Les deux versions du jeu (`/lab/lost-cauldron-game/demo` et `/demo/v2`) chargent jusqu'au canvas, aucune erreur console, wasm en 200. Vérifié deux fois (étape 2 et étape 10, après les changements D6 sur `GameDemo.jsx`/`GameDemoV2.jsx`).
3. **OK** — Lien « ◉ Suivre le Lab → » visible sur l'accueil, mène à `/suivre` sans rechargement, texte anglais correct, aucun défilement horizontal à 375 px.
4. **OK** — `wc -l src/lab/projects/AuditTokens.jsx` = 437 (< 450). Texte identique avant/après découpage sur les 4 boutons de résultats (comparaison `innerText`, étapes 4 et 6), hors le texte D4 changé intentionnellement.
5. **OK** — Texte D4 affiché en FR et en EN (vérifié à l'écran, étape 10).
6. **OK** — Les 4 nouveaux tokens existent dans `tokens.css` et apparaissent sur `/lab/lab-tokens`.
7. **OK** — `nombreDejaTokenisees` : 9 (avant) → 6 (après), < 10 visé. Les 6 occurrences restantes (sur l'échantillon audité par l'outil) sont des usages hors périmètre D6 (l'audit détecte tout px en dur, y compris `fontSize`/`borderRadius`, que D6 exclut explicitement) — voir PROGRESS.md étape 9.
8. **OK** — Snapshots avant/après D6 : 0 différence sur 19 propriétés calculées, ~2 450 éléments cumulés, 10 pages/largeurs. Deux incidents de méthode rencontrés et corrigés en cours de route (capture à 375 px non stabilisée, mascotte Fiole exclue) — détaillés dans DECISIONS.md étape 9 ; n'affectent pas le résultat final.
9. **OK** — `grep -rnE "(gap|padding|margin)[A-Za-z]*: ?(2|4|10|20)[,} ]" src --include="*.jsx"` : aucun résultat. Élargi aux 9 valeurs de la trame : 2 résultats restants, tous deux hors périmètre (`Topbar.jsx` exclu par D6, `FigmaDSReader/` ignoré par Git).
10. **OK** — Aucune erreur ni avertissement console sur les pages de D7 (`/`, `/lab/audit-tokens`, `/magazine`, `/projets`, `/suivre`) ni sur `/lab/lab-tokens`.
11. **OK** — `npm run build` passe ; `npm run lint` : aucune erreur (vérifié à chaque étape et une dernière fois en fin de mission).
12. **OK** — Tout est commité sur `auto/finitions-lab` (11 commits), rien sur `main`, rien poussé.

## Comment vérifier
- `git log --oneline main..auto/finitions-lab` pour la liste des commits ; `git diff main...auto/finitions-lab --stat` pour l'ampleur du changement.
- `npm run build && npm run lint`.
- `node missions/finitions-lab/mesurer-audit.mjs apres` (recalcule la mesure ; comparer à `mesure-avant.json`).
- Aperçu : `npm run dev`, puis `/`, `/lab/audit-tokens` (bouton « Auditer les tokens de ce site »), `/lab/lab-tokens`, `/lab/lost-cauldron-game/demo` et `/demo/v2`.
- `grep -rnE "(gap|padding|margin)[A-Za-z]*: ?(2|4|8|10|12|16|20|24|32)[,} ]" src --include="*.jsx"` : ne doit renvoyer que la ligne de `Topbar.jsx` (hors périmètre) et, si présent sur le disque, `FigmaDSReader/TreeNode.jsx` (ignoré par Git).

## Décisions
Voir `DECISIONS.md` (7 décisions) : trois fichiers supplémentaires nécessaires pour D3 (étape 5), méthode de mesure pour D7 (étape 7, deux décisions), remplacement par script plutôt que par sous-agent pour D6 et exclusion de `FigmaDSReader/` (étape 8, deux décisions), corrections de méthode de capture pour D7/D9 (étape 9, trois décisions).

## Délégations
5 lancées, modèles réellement utilisés :
- **verificateur (Haiku)**, étape 4 : relevé de référence avant découpage. Réussi.
- **verificateur (Haiku)**, étape 6 : relevé après découpage + comparaison. Réussi.
- **explorateur (Haiku)**, étape 8 : inventaire des espacements en dur. **Échec partiel** (incomplet, règle de remplacement partiel mal appliquée) — non utilisé, étape refaite par la session principale (Sonnet) via un script déterministe.
- **verificateur (Haiku)**, étape 10 : vérification finale dans le navigateur. Réussi.
- Cadrage (étape 0) : Opus 5.5.
Toutes les autres étapes (1, 2, 3, 5, 7, 9, 11) faites par la session principale (Sonnet), conformément ou en écart documenté au PLAN.

## Recommandations
- **Fiabilité des sous-agents Haiku sur les inventaires larges** : comme dans la mission `site-avant-apres`, un inventaire mécanique mais large (ici ~600 occurrences) confié à un sous-agent Haiku s'est révélé peu fiable. Pour une prochaine mission de ce type, envisager de cadrer directement un script de vérification/remplacement plutôt que de déléguer l'inventaire à un sous-agent.
- **Mascotte Fiole et mesures de styles calculés** : toute future mesure de styles calculés (comme celle-ci ou celle de `site-avant-apres`) devrait exclure `[class*="fiole"]` d'emblée, et toujours redimensionner la fenêtre **avant** de charger la page plutôt qu'après, pour un rendu responsive stable.
- **File d'attente** : deux missions restent en attente sur leurs branches (`auto/vrai-404`, `auto/menu-barre-haut`), cadrées avant `finitions-lab`. La tâche programmée peut enchaîner directement dessus.
