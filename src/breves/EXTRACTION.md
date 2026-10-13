# Procédure de publication — L’Oracle du Matin sur le web

**Depuis le 2026-10-14 (décision de Michael) : tout le journal est public.** La page /oracle affiche le numéro complet, identique au papier (une, Business, Dev · Tech, mot, chiffre, bonus, énigme), en français et en anglais, avec le PDF à télécharger. Les brèves courtes continuent d'exister : elles nourrissent le flux RSS, la pile des numéros précédents et la page « Dernière minute » du magazine.

Ce document se suffit à lui-même : il décrit comment publier le numéro du jour et tirer ses « Brèves », sans avoir besoin de lire ailleurs. Le format du fichier produit est documenté dans `src/breves/FORMAT.md`.

Lue par la routine de L’Oracle du Matin (le journal papier du matin), après la fabrication du PDF du jour.

## 1. Vérifier qu'il y a quelque chose à faire

Lire `src/private/journal/numeros/<date>.json` (le journal du jour, déjà relu par le `relecteur`) et vérifier que sa traduction `numeros/<date>.en.json` et les deux PDF `pdf/<date>-a4.pdf` et `pdf/<date>-a4-en.pdf` existent (REDACTION.md §7).

Si l'une de ces conditions est vraie, **arrêter ici, sans rien faire d'autre** :
- `src/breves/jours/<date>.json` existe déjà sur `origin/main`.
- Une branche `auto/breves-<date>` existe déjà (locale ou distante).

## 2. Rédiger les brèves

Sélectionner, selon `src/breves/FORMAT.md` (3 à 5 brèves au plus) :
- l'article `une` (À la une · IA) ; **le mercredi**, la une est consacrée aux sorties cinéma (type `cinema`) : elle n'est pas reprise en brève, et la brève `ia` est tirée de l'article d'actualité IA de la page 3 ;
- les articles de `page2`/`page3` dont `type` vaut `tech` (grands et « éclair »).

Le numéro complet étant public, il n'y a plus de rubrique privée ; seule règle : aucune donnée personnelle.
**Toujours** reprendre le `mot` et le `chiffre` de `page4` :
- Retirer seulement les renvois de page (« (p. 2) », etc.) ; garder le terme, la valeur et le sens.
- `mot` : `terme` tel quel, `definition` en `fr` et `en`. `chiffre` : `valeur` telle quelle, `texte` en `fr` et `en`.

Pour chaque brève retenue :
- `rubrique` : `ia` pour l'article `une`, `tech` pour les autres.
- `titre` et `resume` : rédigés à nouveau en 2 à 3 phrases (≤ 60 mots), **jamais copiés** du journal — mais aucun fait ajouté, aucune donnée personnelle.
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
Faire relire la forme par le sous-agent `secretaire` (fichier `.worktrees/breves/src/breves/jours/<date>.json` : orthographe, typographie, anglais) et appliquer ses corrections de forme, sans jamais ajouter de fait ; revalider le JSON avec la commande ci-dessus.
Copier ensuite le numéro complet et ses PDF (quatre commandes, une par appel) :
```bash
cp src/private/journal/numeros/<date>.json .worktrees/breves/src/breves/numeros/<date>.json
```
```bash
cp src/private/journal/numeros/<date>.en.json .worktrees/breves/src/breves/numeros/<date>.en.json
```
```bash
cp src/private/journal/pdf/<date>-a4.pdf .worktrees/breves/public/oracle/pdf/<date>.pdf
```
```bash
cp src/private/journal/pdf/<date>-a4-en.pdf .worktrees/breves/public/oracle/pdf/<date>-en.pdf
```
Le mercredi, copier aussi chaque affiche de la une cinéma (une commande par film, `<n>` = 1 à 4) :
```bash
cp src/private/journal/affiches/<date>-<n>.jpg .worktrees/breves/public/oracle/affiches/<date>-<n>.jpg
```
Si la traduction ou le PDF anglais manque (étape anglaise échouée), publier quand même le français : la page anglaise affiche alors les brèves.
```bash
git -C .worktrees/breves add src/breves/jours/<date>.json src/breves/numeros public/oracle/pdf public/oracle/affiches
```
```bash
git -C .worktrees/breves commit -m "breves: <date>" -m "Co-Authored-By: <modèle utilisé> <noreply@anthropic.com>"
```
Le worktree partage les branches du dépôt principal : le push et la pull request se lancent donc depuis le projet principal.
```bash
git push -u origin auto/breves-<date>
```
```bash
gh pr create --base main --head auto/breves-<date> --title "L’Oracle du Matin du <date>" --body "…"
```
Le corps de la pull request liste les titres du numéro du jour.

```bash
git worktree remove .worktrees/breves
```

## 4. Interdits

Jamais `main`, jamais de fusion, jamais `--force`. Une commande par appel de terminal (pas de `&&`, `;`, heredoc).

## 5. Résumé

Terminer par le lien de la pull request créée.
