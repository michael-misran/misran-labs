# Procédure d'extraction — Brèves

Ce document se suffit à lui-même : il décrit comment tirer une version publique « Brèves » du Journal du matin, sans avoir besoin de lire ailleurs. Le format du fichier produit est documenté dans `src/breves/FORMAT.md`.

Lue par la routine du Journal du matin, après la fabrication du PDF du jour.

## 1. Vérifier qu'il y a quelque chose à faire

Lire `src/private/journal/numeros/<date>.json` (le journal du jour, privé, déjà relu par le `relecteur`).

Si l'une de ces conditions est vraie, **arrêter ici, sans rien faire d'autre** :
- `src/breves/jours/<date>.json` existe déjà sur `origin/main`.
- Une branche `auto/breves-<date>` existe déjà (locale ou distante).

## 2. Extraire et rédiger

Sélectionner uniquement, selon `src/breves/FORMAT.md` :
- l'article `une` (À la une · IA) ;
- les articles de `page2`/`page3` dont `type` vaut `tech` (grands et « éclair »).

**Jamais** : irritant, modèle économique, étude de cas, design (`type: "design"`), énigme, bonus, carnet — ces rubriques du journal restent privées.
Le `mot` et le `chiffre` de `page4` peuvent être repris tels quels (facultatifs).

Pour chaque brève retenue :
- `rubrique` : `ia` pour l'article `une`, `tech` pour les autres.
- `titre` et `resume` : rédigés à nouveau en 2 à 3 phrases (≤ 60 mots), **jamais copiés** du journal — mais aucun fait ajouté, aucune donnée personnelle, aucune mention du carnet ni des irritants.
- `sources` : reprendre les URL du journal, avec le nom du site comme `titre`.
- Traduire `titre` et `resume` en anglais (`en`).

Écrire le fichier `src/breves/jours/<date>.json` selon le schéma exact de `src/breves/FORMAT.md`.

## 3. Publier dans un worktree séparé

Ne jamais toucher le dossier de travail habituel (une mission peut être en cours dessus) : tout se fait dans un worktree Git séparé, une commande shell par appel.

```bash
git fetch origin
```
```bash
git worktree add /chemin/vers/scratchpad/breves-<date> -b auto/breves-<date> origin/main
```

Écrire `src/breves/jours/<date>.json` dans ce worktree (pas de `npm run build` nécessaire : la validation se fait avec `node` + `JSON.parse`, voir ci-dessous).

```bash
node -e "JSON.parse(require('fs').readFileSync('src/breves/jours/<date>.json','utf-8'))"
```

```bash
git add src/breves/jours/<date>.json
```
```bash
git commit -m "breves: <date>"
```
```bash
git push -u origin auto/breves-<date>
```
```bash
gh pr create --title "Brèves du <date>" --body "..."
```
Le corps de la pull request liste les titres des brèves du jour.

```bash
git worktree remove /chemin/vers/scratchpad/breves-<date>
```

## 4. Interdits

Jamais `main`, jamais de fusion, jamais `--force`. Une commande par appel de terminal (pas de `&&`, `;`, heredoc).

## 5. Résumé

Terminer par le lien de la pull request créée.
