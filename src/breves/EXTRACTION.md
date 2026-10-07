# Procédure d'extraction — Brèves

Ce document se suffit à lui-même : il décrit comment tirer une version publique « Brèves » de La Gazette du Lab (le journal papier du matin), sans avoir besoin de lire ailleurs. Le format du fichier produit est documenté dans `src/breves/FORMAT.md`.

Lue par la routine de La Gazette du Lab (le journal papier du matin), après la fabrication du PDF du jour.

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
**Toujours** reprendre le `mot` et le `chiffre` de `page4` quand le journal en a : le kiosque de /breves les affiche (affiches et page droite) et reste vide sans eux.
- Retirer seulement les renvois de page (« (p. 2) », etc.) et, dans le texte, ce qui ne se comprend qu'avec un article privé ; garder le terme, la valeur et le sens.
- `mot` : `terme` tel quel, `definition` en `fr` et `en`. `chiffre` : `valeur` telle quelle, `texte` en `fr` et `en`.
- Ne les omettre que s'ils contiennent une donnée personnelle ou une mention du carnet ou des irritants.

Pour chaque brève retenue :
- `rubrique` : `ia` pour l'article `une`, `tech` pour les autres.
- `titre` et `resume` : rédigés à nouveau en 2 à 3 phrases (≤ 60 mots), **jamais copiés** du journal — mais aucun fait ajouté, aucune donnée personnelle, aucune mention du carnet ni des irritants.
- `sources` : reprendre les URL du journal, avec le nom du site comme `titre`.
- Traduire `titre` et `resume` en anglais (`en`).

Écrire le fichier `src/breves/jours/<date>.json` selon le schéma exact de `src/breves/FORMAT.md`.

## 3. Publier dans un worktree séparé

Ne jamais toucher le dossier de travail habituel (une mission peut être en cours dessus) : tout se fait dans un worktree Git séparé, au chemin fixe `.worktrees/breves` (ignoré par Git). Le terminal reste dans le projet principal ; une commande shell par appel, écrites **exactement** comme ci-dessous (elles sont pré-autorisées dans `.claude/settings.json`, toute variante déclenche une demande à laquelle personne ne répond).

Vérification préalable (§1) : `git fetch origin`, puis `git show origin/main:src/breves/jours/<date>.json` (doit échouer) et `git for-each-ref refs/heads/auto/breves-<date> refs/remotes/origin/auto/breves-<date>` (doit être vide). Si `.worktrees/breves` existe encore (exécution précédente interrompue) : `git worktree remove .worktrees/breves --force`.

```bash
git worktree add .worktrees/breves -b auto/breves-<date> origin/main
```

Écrire le fichier `.worktrees/breves/src/breves/jours/<date>.json` (outil Write, chemin absolu dans le projet), puis le valider :

```bash
python3 -m json.tool .worktrees/breves/src/breves/jours/<date>.json
```
```bash
git -C .worktrees/breves add src/breves/jours/<date>.json
```
```bash
git -C .worktrees/breves commit -m "breves: <date>" -m "Co-Authored-By: <modèle utilisé> <noreply@anthropic.com>"
```
Le worktree partage les branches du dépôt principal : le push et la pull request se lancent donc depuis le projet principal.
```bash
git push -u origin auto/breves-<date>
```
```bash
gh pr create --base main --head auto/breves-<date> --title "Brèves du <date>" --body "…"
```
Le corps de la pull request liste les titres des brèves du jour.

```bash
git worktree remove .worktrees/breves
```

## 4. Interdits

Jamais `main`, jamais de fusion, jamais `--force`. Une commande par appel de terminal (pas de `&&`, `;`, heredoc).

## 5. Résumé

Terminer par le lien de la pull request créée.
