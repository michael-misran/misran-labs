# Mission magazine-web — RAPPORT

**Branche** : `auto/magazine-web`, partie de `refonte-kiosque` (07a40cd). Rien commité sur `main` ni `refonte-kiosque`. Rien poussé.
**La pull request de clôture doit viser `refonte-kiosque`**, pas `main` (règle commune aux missions de la refonte kiosque).

## Fait
- `src/magazine/RevueParts.jsx` (nouveau) : `TeteRevue` (bandeau d'accueil), `CouvertureNumero` (couverture réutilisable, variantes `vedette`/`grille`, inspirée de `KiosqueParts.CouvertureMagazine` sans l'importer), `UneNumero` (en-tête de la page numéro), `ArticleRevue` (article complet avec catégorie, encadré « pourquoi ça compte », sources).
- `src/magazine/magazineText.js` : ajout de `home.lireLabel`, `home.rssLabel`, `issue.contentsTitle`, `issue.previousLabel`, `issue.nextLabel` (fr/en). Aucune clé existante renommée ou supprimée (d'autres fichiers les importent).
- `src/magazine/MagazineHome.jsx` réécrit : tête de revue bleue, dernier numéro en vedette (couverture + extrait d'édito avec lettrine + « Lire le numéro → »), grille des numéros précédents (3/2/1 colonnes via `repeat(auto-fit, minmax(220px, 1fr))`, sans breakpoint JS), lien vers le flux RSS.
- `src/magazine/MagazineIssue.jsx` réécrit : couverture du numéro en tête (bandeau bleu, N°+date longue, titre très grand), édito sur 2 colonnes avec lettrine bleue, sommaire numéroté avec ancres, articles, navigation « ← Numéro précédent / Numéro suivant → / Tous les numéros » (calculée depuis `getIssues()`), page « Ce numéro n'existe pas » dans le même style (mascotte Fiole conservée).
- Plus aucun import de `MagazineParts.jsx`, `CaseFile.jsx` ni `caseChrome.js` dans ces 3 fichiers.

## Pas fait
- Rien du périmètre de la SPEC n'a été laissé de côté.
- Hors périmètre (prévu ainsi par la SPEC, pour d'autres missions) : flux RSS, images OG et aperçus de partage (`kiosque-annexes`) ; nettoyage du code mort de `MagazineParts.jsx`/`CaseFile.jsx` (`kiosque-finitions`, à cadrer plus tard).

## Critères d'acceptation
1. `git grep -nE "MagazineParts|lab/CaseFile|lab/caseChrome" -- src/magazine/MagazineHome.jsx src/magazine/MagazineIssue.jsx src/magazine/RevueParts.jsx` → **vide**. Diff limité aux fichiers de D1 et `missions/magazine-web/`. ✅
2. `/magazine` : vedette = `getIssues()[0]` (2026-09-28), lien vers `/magazine/2026-09-28` ; numéro précédent (2026-09-27) a son lien dans la grille. Vérifié dans le navigateur. ✅
3. `/magazine/2026-09-28` : édito, sommaire (une ancre par article, clic testé), chaque article avec son « pourquoi » et ses sources cliquables. Vérifié dans le navigateur. ✅
4. `/magazine/1999-01-01` : « Ce numéro n'existe pas » / « Issue not found », aucune erreur console. Vérifié. ✅
5. En anglais, aucun texte resté en français sur ces deux pages. Vérifié. ✅
6. À 375 px : aucun débordement horizontal, ni sur `/magazine` ni sur `/magazine/2026-09-28`. Vérifié visuellement par le `verificateur`. ✅
7. `document.title` : `/magazine` → « Magazine · Misran Labs », `/magazine/2026-09-28` → « Magazine — Prices down, agents expanding · Misran Labs » (logique inchangée : `resolveRouteMeta`/`registry.js` non touchés). Aucune erreur console sur `/magazine`, `/magazine/2026-09-28`, `/`, `/projets`, `/suivre`. ✅
8. `npm run build` : OK. `npm run lint` : OK, 0 erreur (vérifié après chaque étape). ✅
9. Tout commité sur `auto/magazine-web`, rien sur `main` ni `refonte-kiosque`, rien poussé. ✅

## Comment vérifier
1. `git log --oneline refonte-kiosque..auto/magazine-web` pour voir les 4 commits de la mission.
2. `npm run build` puis `npx vite preview` (en routine, pas `preview_start`), visiter `/magazine` et `/magazine/2026-09-28` en FR et en EN, à largeur normale puis 375 px.
3. Cliquer un lien du sommaire sur `/magazine/2026-09-28` et vérifier le défilement vers l'article.
4. Visiter `/magazine/1999-01-01` pour la page d'erreur.
5. `git grep -nE "MagazineParts|lab/CaseFile|lab/caseChrome" -- src/magazine/MagazineHome.jsx src/magazine/MagazineIssue.jsx src/magazine/RevueParts.jsx` doit rester vide.

## Décisions prises sans Michael
Voir `DECISIONS.md` pour le détail. En résumé :
- Mot-dièse « MAGAZINE » dans les couvertures codé en dur (non traduit) : identique en français et en anglais, comme d'autres éléments de marque déjà non traduits dans le site (ex. « MISRAN LABS »).
- Grille des numéros précédents en CSS `repeat(auto-fit, minmax(220px,1fr))` plutôt qu'avec des breakpoints JS : responsive nativement, satisfait D4 sans code supplémentaire.
- Numérotation des couvertures sans padding (`N° 1` et non `N° 001`), pour coller à la composition `KiosqueParts.CouvertureMagazine` que D2 demande explicitement de reproduire.
- Lien RSS en `<a href>` classique (pas `<Link>` de react-router) : `/magazine/rss.xml` est un fichier statique généré au build, pas une route SPA.

## Délégations (modèles réellement utilisés)
- Cadrage (étape 0) : Opus 5.5.
- Étapes 1 à 4 et 6 : session principale, Sonnet 5.5.
- Étape 5 (vérification navigateur) : sous-agent `verificateur`, Haiku — lancé avec succès au premier essai, tous les points vérifiés OK. Détail dans `DELEGATIONS.md`.

## Recommandations
- La mission **kiosque-finitions** (à cadrer après fusion de toutes les missions de la refonte) devra supprimer les exports désormais inutilisés de `MagazineParts.jsx` liés aux pages `/magazine` (si `MagazineMasthead`, `MagazineHero`, `IssueRow`, `ArticleCard` ne sont plus utilisés que par ce Magazine avant la refonte — à revérifier une fois toutes les missions fusionnées, car `ArchiveHome`/`Suivre`/`Projets`/`Brèves` les utilisent peut-être encore).
- Avant la mise en ligne, vérifier le rendu visuel réel de la mission (cette session n'a pas de capture d'écran à joindre — le `verificateur` a confirmé l'absence d'erreur et de débordement, mais une relecture visuelle humaine reste utile, en particulier l'équilibre de la vedette à 2 colonnes et la lisibilité de la lettrine).
