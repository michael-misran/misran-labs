# Mission kiosque-finitions — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 96debce)
- `npm run build` : OK (4 flux RSS écrits).
- `npm run lint` : OK, 0 erreur.
- `kiosque-annexes` n'est pas encore fusionnée : elle passe avant cette mission dans la file. Respecter les fichiers interdits de D1.

## Étape 1 — reconfirmation (2026-10-04)
- `npm run build` : OK, 4 flux RSS écrits, sitemap 37 URL.
- `npm run lint` (`npx eslint . --ignore-pattern '.worktrees/**'`) : 0 erreur. Un worktree orphelin `.worktrees/verif-magazine`, laissé par une autre session et hors périmètre de toute mission, pollue `eslint .` sans l'exclusion — non touché (pas dans les fichiers autorisés par D1 de cette mission non plus).

## Étape 2 — code mort (2026-10-04)
- Supprimés de `src/magazine/MagazineParts.jsx` : `MagazineHero`, `IssueRow` (+ son seul appelant d'aide `articleCountLabel`), `SourceList` (+ son seul appelant d'aide `hostnameOf`), `ArticleCard`. Imports devenus inutiles retirés : `useState`, `Stamp`, `Tag`, `useIsMobile`, `MAG_TEXT`, `issueNo`, `formatDateShort`. Gardés : `MagazineMasthead` (encore utilisé par `src/suivre/SuivrePage.jsx`, fichier de kiosque-annexes), `CategoryMark` (encore utilisé par `src/modules/ArchiveHome.jsx` — à revoir à l'étape 5/D5).
- Supprimé `TabBar` de `src/lab/CaseStudyLayout.jsx` (aucun importeur, aucune dépendance propre).
- Commentaire obsolète dans `src/projets/ProjetsParts.jsx` (citait `MagazineHero` par son nom) reformulé pour pointer vers `CaseHero` à la place (structure réellement commune).
- Critère 2 : `grep -rn "IssueRow\|SourceList\|ArticleCard\|MagazineHero\|TabBar" src` → rien. `npm run build` et lint : OK.
