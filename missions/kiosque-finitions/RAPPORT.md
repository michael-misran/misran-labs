# Mission kiosque-finitions — RAPPORT

Exécutée par la tâche programmée `misran-labs-missions`, session Sonnet 5, 2026-10-04.
**Cette PR vise `refonte-kiosque`, pas `main`** (règle commune à toutes les missions de la refonte kiosque). Ensuite, en session interactive avec Michael : fusion de `kiosque-annexes` (si pas déjà fait), ajout de `/zine` dans `scripts/share-previews.js` (sitemap, aperçus — hors périmètre de cette mission, D1), synchronisation de `refonte-kiosque` avec `main`, puis la PR finale vers `main`.

## Fait

- **D2 — Code mort.** Supprimé `MagazineHero`, `IssueRow`, `SourceList`, `ArticleCard` de `src/magazine/MagazineParts.jsx` et `TabBar` de `src/lab/CaseStudyLayout.jsx`, avec leurs imports et constantes devenus inutiles. Gardés `MagazineMasthead` et `CategoryMark` (encore utilisés). Un commentaire obsolète dans `ProjetsParts.jsx` reformulé.
- **D3 — Polices.** `DesignSystem.jsx` : tableau typographique et spécimens mis aux vraies polices (Alfa Slab One, Crimson Pro, IBM Plex Mono), plus une nouvelle section « Polices de la maison » avec les 8 polices de titre (bois, étiquette, chapô, gothique, BD, pixel, écran, machine). `index.html` : Fraunces/Work Sans/JetBrains Mono retirés du lien Google Fonts (seulement ces 3 familles).
- **D4 — Primitives inutilisées.** 15 primitives de `tokens.css` sans aucun consommateur supprimées (3 polices D3 + `cream-150/200/300`, `ink-400/600/800/850`, `ink-900-a05/a18/a22/a25`, `coral-500-a12`). Gardées celles que consomment la mascotte Fiole et `[data-invert]`. En-tête de `tokens.css` corrigé (ne prétend plus que « Tokens du Lab » consomme ces primitives — faux, vérifié).
- **D5 — `/lab`.** `LatestIssue` reconstruite autour de `CouvertureNumero` (réutilisé depuis `RevueParts.jsx`, non modifié) : bandeau bleu, Playfair Display italique, « N° 1 » sans zéros. Fiche agent : « VERT DOSSIER »/« FILE GREEN » avec pastille `--titre-lab`.
- **D6 — Couverture Zine.** `CouvertureZine` affiche désormais le dernier numéro (« #NN » + titre) quand `getNumeros()` en renvoie un, au lieu de l'étoile « Bientôt ! » fixe. Testé avec un numéro d'essai (jamais commité).
- **D7 — Consigne en double.** Les 4 défis du « Geste parfait » n'affichent plus leur consigne qu'une fois (retirée des `defis/*.jsx`, gardée centralisée dans `Jeu.jsx`) ; `chrono.jsx` garde son message d'état « attente » (information différente, pas un doublon).
- **D8 — Documentation.** `CLAUDE.md` décrit la structure des tokens de la refonte (5 titres, polices de la maison, Germanica/Comic Book locales). `CHANGELOG.md` a une section « Refonte kiosque » sous « Non publié » résumant les 11 PR fusionnées dans `refonte-kiosque` et cette mission.
- **D9 — Revue complète.** 25 routes vérifiées (FR/EN, 1366/375 px). Un vrai défaut trouvé et corrigé : débordement horizontal à 375 px en français sur `/` (titre « Sur les présentoirs », `SectionTitreKiosque`), hors de la portée du constat initial du `verificateur` qui annonçait (à tort) que 100 % des routes étaient touchées — voir « Décisions ».

## Pas fait

Rien laissé de côté dans le périmètre de la SPEC.

## Critères d'acceptation

1. **Diff limité aux fichiers autorisés.** OK — `git diff --stat refonte-kiosque...auto/kiosque-finitions` ne touche aucun fichier de la liste interdite D1.
2. **Code mort absent.** OK — `grep -rn "IssueRow\|SourceList\|ArticleCard\|MagazineHero\|TabBar" src` → rien.
3. **Polices.** OK — lien Google Fonts sans les 3 familles (toutes les autres présentes), `tokens.css` sans leurs primitives, `DesignSystem.jsx` sans mention de Fraunces/Work Sans.
4. **`/lab/lab-tokens` sans ligne vide.** OK — 134 lignes de token, 0 colonne Valeur vide ou « — ».
5. **`/lab` revue bleue.** OK — bandeau `rgb(43, 58, 155)`, « N° 1 », fiche agent « VERT DOSSIER »/« FILE GREEN ».
6. **Couverture Zine.** OK — sans numéro : « Bientôt ! » inchangé. Avec le numéro d'essai : « #01 » + titre. `git ls-files src/zine/numeros` → seulement `.gitkeep`.
7. **Consigne du geste parfait une seule fois.** OK pour le défi du jour (Cercle), vérifié en direct. Les 3 autres défis (Verre, Tour, Chrono) vérifiés par lecture de code, pas en direct — `?date=` pour forcer un autre défi n'est actif qu'en `vite dev`, refusé en routine (seul `vite preview` est autorisé). Voir recommandations.
8. **Mascotte Fiole inchangée.** OK — les 8 valeurs calculées des variables CSS qu'elle consomme sont identiques avant/après (vérifié via `getComputedStyle`).
9. **Tableau des routes dans PROGRESS.md.** OK — 25 routes, voir étape 9.
10. **Build et lint.** OK — `npm run build` passe, `npx eslint . --ignore-pattern '.worktrees/**'` 0 erreur (le worktree orphelin `.worktrees/verif-magazine`, laissé par une autre session et hors périmètre de toute mission, continue de polluer `eslint .` sans cette exclusion — voir recommandations).
11. **Tout commité sur `auto/kiosque-finitions`.** OK — 10 commits sur la branche, rien sur `main` ni `refonte-kiosque`, rien poussé.

## Comment vérifier

```bash
git checkout auto/kiosque-finitions
npm run build
npx eslint . --ignore-pattern '.worktrees/**'
npx vite preview --port 4173
```
Puis dans le navigateur : `/` (vérifier l'absence de débordement à 375 px), `/lab` (revue bleue, fiche agent), `/lab/design-system` (onglet Typographies), `/lab/lab-tokens`, le kiosque avec et sans numéro de Zine (ajouter temporairement `src/zine/numeros/01.json` depuis `src/zine/FORMAT.md`, ne jamais le commiter), `/jeux/geste-parfait`. Arrêter le serveur avant de changer de branche.

## Décisions

Voir `DECISIONS.md` pour le détail. En résumé, au-delà des décisions de cadrage (étape 0) : nom de teinte « VERT SAPIN »/« PINE GREEN » choisi pour `accentValue` (D5 ne précisait que le label et la couleur de la pastille) ; les quasi-doublons de `verre.jsx`/`tour.jsx` traités comme des doublons malgré un texte légèrement différent (même instruction reformulée) ; **le rapport du `verificateur` à l'étape 9 n'a pas été pris au mot** — son « débordement sur 100 % des routes » était faux, seule `/` était concernée, et je l'ai revérifié moi-même avant de corriger quoi que ce soit (évite de modifier des fichiers qui n'avaient rien).

## Délégations

Voir `DELEGATIONS.md`. 2 sous-agents : `general-purpose` (Haiku) pour `CLAUDE.md`/`CHANGELOG.md` (étape 8, texte exact fourni, diff conforme) et `verificateur` (Haiku) pour la revue des 25 routes (étape 9, défauts console/erreurs tous exacts, mais le diagnostic de débordement généralisé était faux — corrigé après vérification indépendante). Le reste (cadrage excepté) fait par la session principale Sonnet.

## Recommandations

- **`.worktrees/verif-magazine`** : worktree orphelin qui pollue `npm run lint` pour toute session future tant qu'il traîne (déjà signalé dans le RAPPORT de `kiosque-annexes`). Toujours hors périmètre d'une mission de la refonte kiosque ; à traiter par Michael (`git worktree remove .worktrees/verif-magazine` après vérification).
- **Geste parfait, Verre/Tour/Chrono** : vérifier visuellement une fois en session interactive (preview « dev » avec `?date=`) que la consigne ne s'affiche bien qu'une fois sur ces 3 défis — la lecture de code est cohérente avec le fix appliqué au Cercle (vérifié en direct), mais une session de routine ne peut pas forcer leur affichage.
- **Fiabilité du `verificateur`** : à l'étape 9, son rapport annonçait un débordement sur 100 % des routes alors que seule une l'était réellement. Une prochaine mission qui délègue une revue de routes devrait prévoir une contre-vérification rapide (2-3 routes au hasard) avant d'agir sur un rapport de ce genre, surtout quand le correctif impliquerait de toucher beaucoup de fichiers.
- **Lien Google Fonts de `index.html`** : à la fusion vers `refonte-kiosque`, pas de conflit attendu (seules les 3 familles D3 retirées, rien d'autre touché).

## Retouches à la clôture (session interactive, 2026-10-04)
- Vérifié dans l’état final complet (essai local : `refonte-kiosque` + `kiosque-annexes` + cette mission) : aucun conflit.
- Geste parfait : Chrono, Verre et Tour vérifiés en direct avec `?date=` (preview dev) : consigne affichée une seule fois.
- Fiche agent de `/lab` : l’étiquette « ACCENT » avait été remplacée par « VERT DOSSIER / FILE GREEN » et la valeur par « VERT SAPIN / PINE GREEN ». Remis comme la SPEC : « ACCENT : VERT DOSSIER / FILE GREEN ».
- Liens sous l’aperçu du Magazine (« Lire le numéro », « Tous les numéros », « Suivre le Lab ») : passés de l’ancien style mono corail aux étiquettes Oswald bleu revue.
- Accueil à 375 px, `/lab`, onglet Polices de `/lab/design-system` : vus, conformes.
