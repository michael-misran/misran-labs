# Mission zine — RAPPORT

**Branche** : `auto/zine`, partie de `refonte-kiosque` (07a40cd). Rien commité sur `main` ni `refonte-kiosque`. Rien poussé.
**La pull request de clôture doit viser `refonte-kiosque`**, pas `main` (règle commune aux missions de la refonte kiosque).

## Fait
- `src/zine/numeros.js` : chargement (`import.meta.glob`) et validation d'un numéro — champs de tête, et chacun des 7 types de bloc de `pages` (`photo`, `dessin`, `texte`, `carnet`, `jeu`, `bulle`, `etoile`). `getNumeros()` / `getNumero(numero)`.
- `src/zine/FORMAT.md` : schéma complet documenté, un exemple JSON par type de bloc, règles, exemple complet.
- `src/zine/zineText.js` : textes fr/en, `formatMoisAnnee`, `numeroAffiche`.
- `src/zine/ZineParts.jsx` : `MastheadZine` (tête « MISRAN ZINE » en Anton), `TrameDots` et `Etoile` (étoile à 20 pointes en CSS pur, `clip-path`), `Bulle` (BD), un composant par type de bloc, `BlocZine` (dispatcheur), `CouvertureNumero` (réutilisable vedette/grille).
- `src/zine/ZineHome.jsx` : page d'attente sans numéro (tête, étoile « Le #1 arrive ! », bulle, trame de points — aucune image) ; page normale avec vedette + grille dès qu'un numéro existe.
- `src/zine/ZineNumero.jsx` : lecture d'un numéro (en-tête à l'encre du numéro, édito, blocs, navigation), page « Ce numéro n'existe pas ».
- Branchement (D1, exception) : `App.jsx` (2 routes), `registry.js` (libellé d'onglet, réutilise `navTitreZine` déjà présent dans `i18n/ui.js`), `NavTitres.jsx` et `KiosqueParts.jsx` (le Zine devient un lien dès que `getNumeros().length > 0`, sinon comportement identique à avant).
- `public/zine/.gitkeep` et `src/zine/numeros/.gitkeep`.
- Testé avec un numéro d'essai temporaire (D6), puis supprimé — voir ci-dessous.

## Pas fait
- Rien du périmètre de la SPEC n'a été laissé de côté.
- Hors périmètre (prévu ainsi) : le contenu du numéro 1, la version PDF imprimable, le flux RSS du Zine.

## Critères d'acceptation
1. Diff limité aux fichiers de D1 et `missions/zine/` ; `src/zine/numeros/` ne contient que `.gitkeep` (vérifié après suppression du numéro d'essai). ✅
2. `/zine` affiche la page d'attente sans erreur console ; `/zine/1` affiche « Ce numéro n'existe pas ». Vérifié dans le navigateur. ✅
3. Dans `NavTitres` et sur le kiosque, le Zine reste non cliquable (`aria-disabled="true"`), identique à `refonte-kiosque`. Vérifié. ✅
4. Le test du numéro d'essai (D6) est décrit ci-dessous : blocs rendus, ouverture automatique du lien vérifiée, puis suppression. ✅
5. `src/zine/FORMAT.md` décrit chaque type de bloc avec un exemple JSON valide. ✅
6. En anglais, aucun texte de `/zine` ne reste en français. Vérifié. ✅
7. À 375 px : aucun débordement horizontal sur `/zine`. Vérifié. ✅
8. `npm run build` : OK. `npm run lint` : OK, 0 erreur (vérifié après chaque étape). ✅
9. Tout commité sur `auto/zine`, rien sur `main` ni `refonte-kiosque`, rien poussé. ✅

## Test du numéro d'essai (D6, critère 4)
Un fichier temporaire `src/zine/numeros/01.json` a été créé (4 blocs : `etoile`, `bulle`, `texte`, `carnet` — aucune image, par prudence D1/D6), puis vérifié dans le navigateur (`npx vite preview`, fait par la session principale elle-même, pas par le `verificateur`, pour garder le contrôle de la suppression juste après) :
- `/zine` : la vedette affichait le numéro d'essai, avec son encre (`#ff4f8b`) et un lien « Lire le numéro → ».
- `/zine/1` : les 4 blocs s'affichaient correctement (étoile à 20 pointes, bulle avec pointe, texte avec titre, carnet sur fond à lignes).
- `NavTitres` et la couverture du kiosque devenaient bien des liens cliquables (`/zine` et `/zine/1`) — l'ouverture automatique (D5) fonctionne.
- Aucune erreur console, aucun débordement à 375 px, texte entièrement traduit en anglais.
- Le fichier a ensuite été supprimé (`rm`) **avant tout commit** — il n'a jamais été ajouté à Git. `git status` après suppression : working tree clean.

## Comment vérifier
1. `git log --oneline refonte-kiosque..auto/zine` pour voir les 6 commits de la mission.
2. `git ls-files src/zine/numeros/` doit renvoyer uniquement `.gitkeep`.
3. `npm run build` puis `npx vite preview` (en routine, pas `preview_start`), visiter `/zine` en FR et EN, à largeur normale puis 375 px : page d'attente, pas d'image, pas de faux contenu.
4. Sur `/`, la couverture Zine du kiosque reste grisée/non cliquable ; dans la barre de titres, « Le Zine » aussi.
5. Pour revoir le rendu d'un numéro réel sans attendre Michael : recréer temporairement un fichier dans `src/zine/numeros/` selon `src/zine/FORMAT.md`, vérifier, puis le supprimer avant de commiter quoi que ce soit.

## Décisions prises sans Michael
Détail dans `DECISIONS.md`. En résumé :
- Tous les champs texte du format sont bilingues `{fr, en}`, y compris `dessin.legende` et `jeu.titre`/`jeu.consigne` que la SPEC ne précisait pas explicitement — pour rester cohérent avec tous les autres formats du site (Brèves, Magazine, Projets).
- La séquence `numero` démarre à 1 (pas 0 comme le Magazine), pour que `/zine/1` soit un numéro « normal » dès la première publication.
- `registry.js` suit le patron Magazine/Brèves (toujours afficher le libellé de la rubrique, pas une icône 404) plutôt que le patron Jeux (404 si le numéro n'existe pas), car le Zine est chronologique/séquentiel comme eux.
- Aucune ligne ajoutée à `src/i18n/ui.js` (interdit) : les clés `navTitreZine`/`navRythmeZine`/`navBientot` existaient déjà, prêtes pour ce branchement.

## Délégations (modèles réellement utilisés)
- Cadrage (étape 0) : Opus 5.5.
- Étapes 1 à 6 et 8 : session principale, Sonnet 5.5 (étape 6 : test du numéro d'essai fait par la session principale elle-même, pas déléguée, pour contrôler la suppression du fichier).
- Étape 7 (vérification navigateur de l'état final) : sous-agent `verificateur`, Haiku — lancé avec succès au premier essai.

## Recommandations
- `scripts/share-previews.js` (sitemap, flux RSS, images de partage) ne connaît pas encore `/zine` : la rubrique n'apparaît pas dans `sitemap.xml` tant que ce script n'est pas mis à jour. Ce script n'est pas dans les « fichiers autorisés » de cette mission (D1) ; une mission future (quand le numéro 1 existera, ou `kiosque-finitions`) devra l'étendre, comme le mentionne déjà le hors-périmètre de la SPEC pour le flux RSS.
- Les blocs `photo`, `dessin` et le champ `src` de `jeu` ont été écrits avec soin (styles en ligne simples, pas de logique risquée) mais n'ont pas pu être vérifiés avec une vraie image, faute de pouvoir ajouter une ressource en dehors de `src/private/` (D1 l'interdit). À vérifier dès que Michael fournira une première photo ou un premier dessin.
