# Idées du dimanche — procédure de la routine

Document lu par la routine « misran-labs — idées du dimanche » à chaque exécution, avec `FORMAT.md` (format des fiches). Décisions de Michael (2026-09-27) : **rubrique publique**, **3 à 5 idées par semaine, le dimanche à 19 h**, **tout projet** (y compris nouveaux), avec pour but de **trouver des idées réalisables qui peuvent rapporter de l'argent**. Le modèle économique reste **privé**.

## 0. Règles absolues
- **Aucun chiffre inventé.** Taille de marché, prix pratiqués, nombre de clients… : seulement avec une source lue pendant cette exécution (WebFetch), citée dans la note privée. Sinon : « à évaluer ».
- **Les revenus sont des hypothèses**, écrites comme telles (« si 20 agents paient 30 €/mois… »), jamais des promesses.
- **Rien d'économique dans le fichier public** (la validation le rejetterait) : prix, revenus, modèle, stratégie → note privée uniquement.
- **Ne jamais reproposer une idée arrêtée**, ni une variante proche, sauf fait nouveau explicite (le dire dans le `resume`).
- Pas d'idée illégale, trompeuse, ou qui repose sur la collecte abusive de données personnelles.
- Site public au nom de Michael : ton sobre et factuel.

## 1. Contexte à relire à chaque fois
1. Toutes les fiches `src/projets/idees/*.json` (numéros, statuts, et surtout les **raisons d'arrêt** dans `decision.note`).
2. Les notes privées existantes `src/private/projets/*.md` (pour ne pas dupliquer).
3. Le profil de Michael : développeur fullstack (12 ans), designer UX/UI (8 ans), design systems, workflow IA Figma ↔ Claude Code, missions autonomes (voir `CLAUDE.md` et la page `src/lab/projects/UtilisationIA.jsx`). Ses projets existants : la liste `PROJECTS` de `src/lab/projects.js`.
4. Les 2 derniers numéros du Magazine (`src/magazine/numeros/`) : une nouveauté IA est souvent une opportunité.
5. Les `RAPPORT.md` des missions récentes (`missions/*/RAPPORT.md`) : les recommandations « hors périmètre » sont des idées d'amélioration toutes trouvées.

## 2. Recherche (sous-agent `veilleur`, Haiku)
Lui demander des **signaux concrets de la semaine** en lien avec le profil de Michael : besoins exprimés (forums, Hacker News, Reddit, Product Hunt, annonces d'outils), outils qui manquent, nouveautés IA qui ouvrent un usage. Chaque signal avec son URL et sa date.

## 3. Sélection (session principale, Sonnet)
Proposer **3 à 5 idées**, en général :
- **1 à 2 améliorations** de projets existants (site, workflow IA, projets du Lab) ;
- **2 à 3 idées qui peuvent rapporter de l'argent** : produit, service, outil ou contenu.

Pour chaque idée, noter mentalement (grille, sur 5) : adéquation avec les compétences de Michael, effort (réalisable en missions autonomes ?), temps avant le premier euro, intérêt du signal trouvé, risque. Ne garder que les idées **réalisables par Michael et le système de missions**. Privilégier celles qui ont une **première étape de validation peu coûteuse** (page de présentation, prototype, 3 entretiens…).

## 4. Rédaction
1. Numéro : le plus grand `P-NNN` existant + 1 (y compris les idées arrêtées), un numéro par idée.
2. Fiche publique `src/projets/idees/P-NNN.json` selon `FORMAT.md`, `statut: "proposee"`, FR puis EN (traduction naturelle).
3. Note privée `src/private/projets/P-NNN.md` avec le gabarit de `FORMAT.md` ; ajouter en tête la **grille** (5 critères notés sur 5, une ligne de justification chacun) et la liste des **sources** utilisées.
4. Si une note privée contient des chiffres sourcés : lancer le sous-agent `relecteur` sur cette note (en lui indiquant que c'est une note privée Markdown) et corriger ce qu'il signale.

## 5. Contrôles
1. `npm run build` passe.
2. Chaque nouvelle fiche respecte `FORMAT.md` (clés autorisées uniquement, FR et EN non vides, valeurs de `type`/`taille`/`statut` valides, nom de fichier = `id`). Relire chaque fiche contre les règles, car la session n'a pas de navigateur.

## 6. Publication
**Fiches publiques** :
1. `git checkout main`, puis `git pull`.
2. `git checkout -b auto/projets-<date du jour>`.
3. `git add src/projets/idees` (uniquement les nouvelles fiches), commit : `git commit -m "Weekly ideas <date>: P-NNN to P-NNN" -m "<titres>" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" -m "Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"`.
4. `git push -u origin auto/projets-<date>` (jamais `main`, jamais `--force`).
5. `gh pr create --base main --head auto/projets-<date> --title "Idées de la semaine — <date>" --body "<pour chaque idée : numéro, titre, une phrase, et sa note de grille globale>"`, dernière ligne `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
6. `git checkout main`.

**Notes privées** (sauvegarde dans le dépôt privé, jamais dans misran-labs) :
1. `git -C src/private add projets`
2. `git -C src/private commit -m "Notes privées <date>: P-NNN à P-NNN"`
3. `git -C src/private push`
Si le dossier `src/private` n'est pas un dépôt Git (sauvegarde pas encore installée), le signaler dans le résumé final et continuer.

**Ne jamais fusionner.** Michael fusionne, puis décide des statuts en écrivant à la session tour de contrôle.

## 7. Commandes shell
Une commande simple par appel (pas de `&&`, `;`, boucle, `$(…)`, heredoc).
