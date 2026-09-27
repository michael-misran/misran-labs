# Mission magazine — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 — données (`src/magazine/numeros.js`, `FORMAT.md`, numéro 0) → session principale (Sonnet)
**Blocages :** aucun

## Étape 2 — direction visuelle (expert, Opus)
Proposition détaillée (V1–V12) écrite dans DECISIONS.md : composants locaux à créer (`magazineText.js`, `MagazineParts.jsx`, `MagazineHome.jsx`, `MagazineIssue.jsx`), structure exacte des deux pages, traitement des catégories par carré de couleur + libellé, rendu mobile, textes FR/EN. `CaseMasthead`/`CaseMetaRow`/`CaseFooter`/`CASE_CHROME` réutilisés tels quels ; `CaseHero` recopié en local (`MagazineHero`) car son numéro est figé sur `dossierNo()`.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (react-hooks) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx.
