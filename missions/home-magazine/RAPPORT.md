# Mission home-magazine — RAPPORT

## Fait
`src/modules/ArchiveHome.jsx` : nouveau bloc « Magazine », composant `LatestIssue({ c, lang, isMobile })`, placé entre le bloc héros et l'index des dossiers (D1). Il met en avant `getIssues()[0]` : étiquette de rubrique sur fond `--active-tint`, filet supérieur `--border-thick` en `--primary` (pour se distinguer des `FileEntry` malgré `--border-thin` = `--border-regular`), Nº + date, titre, édito tronqué à 4 lignes (5 sur mobile, via `-webkit-line-clamp`), liste des articles avec leur `CategoryMark`, deux liens (« Lire le numéro → » / « Tous les numéros → »). Deux colonnes sur ordinateur, tout empilé sur mobile. Textes FR/EN ajoutés dans `COPY`. Aucun autre fichier source modifié (D5).

## Pas fait
Rien — le périmètre de la SPEC est entièrement couvert.

## Critères d'acceptation

1. **`/` affiche le bloc entre le héros et l'index, FR et EN, Nº 001** — PASS. Vérifié visuellement (screenshots 1280px, FR et EN) : titre correct, 4 articles avec `CategoryMark` (MODÈLES ×2, WORKFLOW, DEV).
2. **Les deux liens mènent à `/magazine/2026-09-28` et `/magazine`** — PASS. `href` vérifiés.
3. **Test de mise à jour automatique** — PASS. Un fichier `src/magazine/numeros/2026-10-05.json` valide (Nº 002) a été créé temporairement ; le nouveau numéro apparaissait sur la home sans aucun changement de code. Le fichier a ensuite été supprimé et son absence confirmée (`git status` propre, `ls` sur le dossier).
4. **Aucune erreur console sur `/` (FR/EN) et `/magazine`** — PASS.
5. **375px, pas de débordement horizontal** — PASS. Bloc lisible, empilé, édito proprement tronqué (screenshot vérifié).
6. **`grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/modules/ArchiveHome.jsx` sans nouvelle occurrence** — PASS. Grep vide (aucune couleur en dur, tout en tokens).
7. **`npm run build` OK, `npm run lint` ≤6 erreurs préexistantes, aucune dans les fichiers modifiés** — PASS.
8. **Tout commité sur `auto/home-magazine`, rien sur `main`, rien poussé, aucun serveur en marche** — PASS. `git status` propre, chaque `preview_start` a été suivi d'un `preview_stop`.

## Comment vérifier
```bash
git checkout auto/home-magazine
npm run build
```
Ouvrir `/` : le bloc Magazine doit apparaître entre le protocole et la liste des dossiers, avec le dernier numéro. Basculer FR/EN et réduire à 375px pour confirmer la mise en page.

## Décisions prises sans Michael
Voir `DECISIONS.md` — composant local à `ArchiveHome.jsx` (pas de partage dans `src/magazine/`, un seul usage), pas de `Stamp` (déjà présent au-dessus dans `ProtocolPlate`), édito tronqué en CSS (`line-clamp`), filet supérieur en `--border-thick` + `--primary` pour compenser l'égalité `--border-thin` = `--border-regular`.

## Délégations (modèles réellement utilisés)
Voir `DELEGATIONS.md` — cadrage et état initial par la session principale (Opus 5.5), direction visuelle par l'`expert` (Opus 5.5), implémentation par la session principale (Sonnet 5), vérifications par le `verificateur` (Haiku 4.5, en deux passes : la première par revue de code et shell, la seconde par navigateur pour compléter les critères visuels que la première n'avait pas testés).

## Recommandations
- Rien dans le périmètre de cette mission.
- Remarque générale : si un futur numéro a un édito très court, la boîte `-webkit-line-clamp: 4` ne posera pas de problème (elle n'agit que si le texte dépasse). Pas de vérification supplémentaire nécessaire.
