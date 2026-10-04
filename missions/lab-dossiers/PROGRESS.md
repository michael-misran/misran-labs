# Mission lab-dossiers — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (`CaseFile.jsx`, `CaseStudyLayout.jsx`, `ToolProcessTemplate.jsx`)
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.

## Étape 2 (exécution, 2026-10-04)
- `src/lab/caseChrome.js` : ajout de `KRAFT` (3 teintes en dur, mêmes que `KiosqueParts.CouvertureLab` : chemise `#d8c094`, onglet `#c9ae7c`, papier `#fbf6ea`) et de `tamponBarre`/`tamponBas` (fr/en) dans `CASE_CHROME`.
- `src/lab/DossierParts.jsx` créé : `TamponDeclassifie` (tampon barré/déclassifié, réutilisable petit/normal), `EtiquetteTapee` (étiquette papier tapée à la machine), `OngletClasseur` (un onglet de classeur kraft, actif = papier blanc).
- Repéré en lisant le code existant : `CaseStudyLayout.TabBar` n'a aucun importeur dans le reste du site (seulement défini/exporté) — probablement du code mort antérieur à la mission, hors périmètre (pas de nettoyage de code mort hors D1).
