# Mission magazine — PROGRESS

**Statut :** étapes 2 à 4 terminées, mission implémentée et vérifiée manuellement
**Prochaine action :** étape 5 — vérification formelle des critères 1 à 8 (dont le test du fichier invalide) → verificateur (Haiku)
**Blocages :** aucun

## Étape 2 — direction visuelle (expert, Opus)
Proposition détaillée (V1–V12) écrite dans DECISIONS.md : composants locaux à créer (`magazineText.js`, `MagazineParts.jsx`, `MagazineHome.jsx`, `MagazineIssue.jsx`), structure exacte des deux pages, traitement des catégories par carré de couleur + libellé, rendu mobile, textes FR/EN. `CaseMasthead`/`CaseMetaRow`/`CaseFooter`/`CASE_CHROME` réutilisés tels quels ; `CaseHero` recopié en local (`MagazineHero`) car son numéro est figé sur `dossierNo()`.

## Étapes 3–4 — données et pages (session principale, Sonnet)
Implémenté selon la direction visuelle de l'étape 2 : `src/magazine/{magazineText,numeros,MagazineParts,MagazineHome,MagazineIssue}.jsx|js`, `FORMAT.md`, numéro 0, routes `/magazine` et `/magazine/:date` dans `App.jsx`, section sidebar « Magazine » (`Sidebar.jsx`, prop `end` sur `NavItem`), clés i18n `navSectionMagazine`/`magazineNav`.

Vérifié manuellement (build `npm run build` + `npx vite preview --port 4175`, session non supervisée donc pas de `npm run dev`) :
- `/magazine`, `/magazine/2026-09-28` (FR et EN), `/magazine/1999-01-01` (« Numéro introuvable ») : aucune erreur console.
- Sidebar : « Magazine » surligné sur `/magazine` et sur `/magazine/2026-09-28`.
- 375 px : `document.documentElement.scrollWidth <= window.innerWidth` vrai sur les deux pages.
- Fichier invalide temporaire (`titre.en` manquant) : rejeté avec `console.error` explicite (fichier + règle), reste du magazine inchangé ; fichier supprimé ensuite, jamais commité.
- `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/magazine/*.jsx` : aucun résultat.
- `npm run lint` : toujours 6 erreurs préexistantes, aucune dans les fichiers de la mission.
- `/` et `/lab/utilisation-ia` : aucune erreur console (contrôle de non-régression).
- Serveur `vite preview` arrêté en fin de session.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (react-hooks) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx.
