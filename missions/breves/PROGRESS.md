# Mission breves — PROGRESS

**Statut :** terminée
**Prochaine action :** clôture (session interactive avec Michael — voir Hors périmètre du RAPPORT.md)
**Blocages :** aucun

## Étape 8 (2026-09-30)
Vérification finale, tous les critères d'acceptation au vert :
- Session principale : `npm run build` OK (sitemap 22 URL, `/breves` et `/breves/2026-09-30` présents — critère 6), `npm run lint` OK sans nouvelle erreur (critère 9), grep des mots interdits vide (critère 7), `git status` propre et `git diff main...auto/breves -- src/private/` vide, rien sur `main`, rien poussé (critère 10).
- `verificateur` (Haiku), navigateur (`npx vite preview`, pas la preview « dev » en routine) : critères 1 à 5 tous PASS — jour du 2026-09-30 affiché fr/en avec sources en nouvel onglet, `/breves/2000-01-01` affiche le message vide sans erreur console, un jour invalide de test (titre sans `en`) est bien ignoré avec `console.error` puis retiré, entrée « Brèves » active dans la sidebar desktop et mobile, pas de défilement horizontal à 375 px. `git status` reconfirmé propre après le test.

## Étape 7 (2026-09-30)
`src/breves/EXTRACTION.md` écrit (D9), public et autonome : vérifier qu'il n'y a rien à faire (fichier ou branche déjà là), extraire selon D1-D3, publier dans un worktree Git séparé (jamais le dossier de travail habituel), une commande par appel, jamais `main`/fusion/`--force`.

## Étape 6 (2026-09-30)
`BREVES_FIXED` + `collectBrevesJours(rootDir)` ajoutés dans `scripts/share-previews.js`, sur le modèle de `collectMagazineNumeros` : page fixe `/breves` (titre D7, image `og-magazine.png` réutilisée, pas de nouvelle image), une entrée par jour `/breves/<date>` (titre = titre de la première brève, description tronquée à partir de son résumé). Vérifié au build : `dist/sitemap.xml` contient `/breves` et `/breves/2026-09-30` (critère 6), `dist/breves/index.html` a le bon `<title>`. `npm run lint` passe.

## Étape 5 (2026-09-30)
Entrée « Brèves » ajoutée dans `Sidebar.jsx`, juste sous « Magazine » dans la même section (pas de nouvelle `NavSectionLabel`, `end={false}`) ; libellés `brevesNav` (fr « Brèves », en « Briefs ») dans `ui.js`. Fait par le sous-agent `general-purpose` (Haiku) selon le plan ; diff relu avant commit, conforme. `npm run lint` passe.

## Étape 4 (2026-09-30)
`brevesText.js` (textes fr/en + table RUBRIQUES ia/tech, réutilise `formatDateShort`/`formatDateLong` du Magazine), `BrevesParts.jsx` (RubriqueMark, SourceLinks, BreveCard, WordFigureBox, DayRow — mêmes principes que MagazineParts, adaptés), `BrevesHome.jsx` et `BrevesJour.jsx` (réutilisent `MagazineHero`/`MagazineMasthead` du Magazine, `CaseMasthead`/`CaseMetaRow`/`CaseFooter` de CaseFile, `SectionTitle`/`Tag` du design-system). Routes `/breves` et `/breves/:date` ajoutées en `lazy` dans `App.jsx`. `npm run build` et `npm run lint` passent.

## Étape 3 (2026-09-30)
`src/breves/jours/2026-09-30.json` créé à partir de `src/private/journal/numeros/2026-09-30.json` selon D1/D8 : la une (OpenAI DevDay, rubrique "ia"), Starship et le Walkman (rubrique "tech", les deux seuls articles `type: "tech"` des pages 2-3 — l'article design de la page 3 n'est pas repris), mot CMP, chiffre 844. Résumés réécrits (2-3 phrases, ≤60 mots), jamais copiés du journal ; traduction en fr/en faite à l'extraction. Définition du mot CMP reformulée pour éviter le mot « cookie » (critère d'acceptation 7) et toute référence à Consent-O-Matic / à la page 2 (rubrique irritant, privée). Validé : JSON.parse OK, grep des mots interdits vide.

## Étape 2 (2026-09-30)
`src/breves/FORMAT.md` et `src/breves/jours.js` créés sur le modèle du Magazine (`src/magazine/numeros.js`), sans champ `numero` (D2) : validation de `date`/nom de fichier, 1-5 `breves`, `rubrique` ∈ {ia, tech}, bilingue fr/en, `sources` ≥ 1 en https, `mot`/`chiffre` facultatifs mais bilingues si présents. Ajout de `getAdjacentDays(date)` (pas dans le modèle magazine) pour la navigation jour précédent/suivant de D5.

## État initial (2026-09-30, commit de2bd1a de main)
- `npm run build` : OK (sitemap.xml : 20 URL)
- `npm run lint` : OK, aucune erreur
