# Mission lab-dossiers — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5 (`LabTokens.jsx`)
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

## Étape 3 (exécution, 2026-10-04)
- `CaseFile.jsx` réécrit (mêmes exports, mêmes props) : `CaseMasthead` devient une bande kraft avec lien de retour, « DOSSIER N° xxx » tapé et `TamponDeclassifie` ; `CaseMetaRow` devient des champs « LABEL : valeur » en Special Elite ; `CaseHero` garde le titre en `--font-heading` (lisibilité, D5) mais prend un filet `--titre-lab` et un numéro de dossier tapé ; `CaseTabs` délègue à `OngletClasseur` (onglets kraft, actif = papier) ; `CaseFooter` passe en Special Elite. Les tokens `--case-tabs-tint-N` ne sont plus référencés ici (restent intacts dans `tokens.css`, D3).
- Bug repéré en même temps : `CaseMasthead` et `CaseStudyLayout` liaient leur lien « ← Lab » vers `/` — c'était juste avant la refonte kiosque (où `/` était encore l'archive), mais `/` est maintenant le kiosque. Corrigé vers `/lab` dans les deux fichiers (`DECISIONS.md`).
- `CaseStudyLayout.jsx` : lien de retour corrigé, filet `--titre-lab` sur le titre, période/outils passés en Special Elite (rôle resté en `--font-body`, potentiellement plus long, D5). `ToolProcessTemplate.jsx` ne compose que des exports de `CaseFile.jsx` : rien à changer dedans, hérite automatiquement du nouvel habillage.
- `npm run build` et `npm run lint` : OK.

## Étape 4 (exécution, 2026-10-04)
- `ArchiveHome.jsx` réécrit : `ChemiseEnTete` (onglet « ML-LAB », `EtiquetteTapee` avec AGENT/CLASSEMENT/PIÈCES, `TamponDeclassifie`), `NoteDeService` (ancien `ProtocolPlate`, même contenu, habillage tapé à la machine), `FicheAgent` (fusion d'`OverviewBox`+`AccentSwatch`), `ChemiseIndex` (ancien `FileEntry`, onglet avec numéro de dossier en léger décalage alterné, ligne de méta type+statut ajoutée). `LatestIssue` (teaser Magazine) conservé, habillage minimal (filet `--titre-lab`), hors périmètre direct de D2 mais pas retiré (décision).
- Bande latérale verticale décorative (`sideStrip`) retirée : ne correspondait à aucun élément demandé par D2, et la nouvelle composition (chemise pleine largeur) ne s'y prêtait plus (`DECISIONS.md`).
- `npm run build` et `npm run lint` : OK.
