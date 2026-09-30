# Mission breves — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 7 (src/breves/EXTRACTION.md)
**Blocages :** aucun

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
