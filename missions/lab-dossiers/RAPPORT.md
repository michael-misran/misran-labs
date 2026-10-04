# Mission lab-dossiers — RAPPORT

**Branche** : `auto/lab-dossiers`, partie de `refonte-kiosque` (07a40cd). Rien commité sur `main` ni `refonte-kiosque`. Rien poussé.
**La pull request de clôture doit viser `refonte-kiosque`**, pas `main` (règle commune aux missions de la refonte kiosque).

## Fait
- `src/lab/caseChrome.js` : ajout de `KRAFT` (palette kraft en dur, mêmes teintes que la couverture Lab du kiosque) et des textes bilingues du tampon (`tamponBarre`/`tamponBas`).
- `src/lab/DossierParts.jsx` (nouveau) : `TamponDeclassifie`, `EtiquetteTapee`, `OngletClasseur`.
- `src/lab/CaseFile.jsx` réécrit (mêmes exports, mêmes props — D3) : `CaseMasthead` devient une bande kraft avec tampon ; `CaseMetaRow` des champs tapés ; `CaseHero` garde un titre lisible (`--font-heading`) avec un filet et un numéro de dossier tapés ; `CaseTabs` délègue à `OngletClasseur` (onglets kraft, actif = papier) ; `CaseFooter` en Special Elite. Comme ce fichier est partagé, `/projets`, `/projets/fonctionnement`, `/projets/<id>`, `/lab/cv` et `/suivre` héritent du nouvel habillage sans qu'on y touche.
- `src/lab/CaseStudyLayout.jsx` : même traitement (lien de retour, titre, période/outils).
- `src/modules/ArchiveHome.jsx` réécrit (D2) : chemise kraft en tête (onglet, étiquette « AGENT/CLASSEMENT/PIÈCES », tampon), note de service (ancien protocole, même contenu), fiche agent (ancien aperçu portfolio), index de chemises avec onglet de dossier et léger décalage alterné, ligne de méta type + statut ajoutée par dossier.
- `src/lab/projects/LabTokens.jsx` réécrit (D4) : palette réelle de la maison (papier, encre/gris/filet, les 5 couleurs de titres, une police par titre), concept « maison d'édition / un univers par titre » expliqué, architecture 3 niveaux conservée. Aucune valeur recopiée à la main : chaque valeur de la colonne « Valeur » est lue une fois dans les variables CSS calculées (`getComputedStyle`).
- Bug corrigé en cours de route : le lien « ← Lab » de `CaseMasthead` et `CaseStudyLayout` visait encore `/` (l'ancienne home, avant que `/` devienne le kiosque) ; corrigé vers `/lab`.

## Pas fait
- Rien du périmètre de la SPEC n'a été laissé de côté.
- Hors périmètre (prévu ainsi) : contenu des fiches projets, Projets/idées et CV (mission `idees-cv`), Suivre (`kiosque-annexes`), suppression des anciennes primitives crème/corail (mission de finitions).

## Critères d'acceptation
1. Diff limité aux fichiers de D1 et `missions/lab-dossiers/` : vérifié par `git diff --stat refonte-kiosque...auto/lab-dossiers` (hors dossier de suivi). ✅
2. `/lab` : étiquette « PIÈCES : 9 » (= `visibleProjects().length`), chaque chemise a son lien et son numéro de dossier. Vérifié dans le navigateur. ✅
3. Chaque fiche `/lab/<slug>` de `visibleProjects()` s'affiche sans erreur console avec en-tête de dossier et onglets de classeur (échantillon de 3 vérifié, dont une à onglets multiples). ✅
4. `/projets`, `/projets/fonctionnement`, `/projets/<id>`, `/lab/cv`, `/suivre` : sans erreur console, contenu inchangé. Vérifié. ✅
5. `/lab/lab-tokens` affiche les 5 couleurs de titres. `git grep -n "#dd5a3e" -- src/lab/projects/LabTokens.jsx` → vide. ✅
6. En anglais, aucun texte ajouté par la mission resté en français. Vérifié sur `/lab` et `/lab/lab-tokens`. ✅
7. À 375 px : aucun débordement horizontal sur `/lab`, `/lab/design-system`, `/lab/cv`. Vérifié. ✅
8. `document.title` inchangé sur `/lab` et `/lab/<slug>` (logique non touchée). ✅
9. `npm run build` : OK. `npm run lint` : OK, 0 erreur (vérifié après chaque étape). ✅
10. Tout commité sur `auto/lab-dossiers`, rien sur `main` ni `refonte-kiosque`, rien poussé. ✅

## Comment vérifier
1. `git log --oneline refonte-kiosque..auto/lab-dossiers` pour voir les 6 commits de la mission.
2. `npm run build` puis `npx vite preview` (en routine, pas `preview_start`), visiter `/lab` en FR et EN, à largeur normale puis 375 px.
3. Ouvrir 2-3 fiches `/lab/<slug>`, cliquer les onglets d'une fiche qui en a plusieurs (ex. `design-system-multimarques`).
4. Visiter `/projets`, `/lab/cv`, `/suivre` : le contenu doit être identique à avant, seul l'habillage (pied de page, champs) change visuellement.
5. `/lab/lab-tokens` : la colonne « Valeur » doit être remplie (valeurs lues en direct), pas de tiret partout.

## Décisions prises sans Michael
Détail dans `DECISIONS.md`. En résumé :
- Lien « ← Lab » corrigé de `/` vers `/lab` (bug pré-existant, orphelin de la refonte kiosque).
- `CaseHero` garde son titre en police normale (lisibilité, D5), pas en Special Elite.
- Bande latérale décorative de l'ancien `ArchiveHome` retirée (ne correspondait plus à la nouvelle composition).
- Le teaser Magazine (`LatestIssue`) sur `/lab` est conservé avec un habillage minimal, bien que hors périmètre explicite de D2 — pour ne pas couper une fonctionnalité existante sans raison.
- `LabTokens.jsx` ne documente plus les primitives de transparence comme lignes à part (seulement comme `pointsTo`) : D4 ne les demande pas.
- Valeurs de `LabTokens.jsx` lues dans un initialiseur paresseux de `useState`, pas un `useEffect` (interdit par `react-hooks/set-state-in-effect`).

## Délégations (modèles réellement utilisés)
- Cadrage (étape 0) : Opus 5.5.
- Étapes 1 à 5 et 7 : session principale, Sonnet 5.5.
- Étape 6 (vérification navigateur) : sous-agent `verificateur`, Haiku — lancé avec succès au premier essai. Détail dans `DELEGATIONS.md`.

## Recommandations
- La mission **kiosque-finitions** pourra supprimer les anciennes primitives crème/encre-archive/corail de `tokens.css` une fois que la mascotte Fiole (seule autre consommatrice directe) sera aussi migrée, ou les garder si Fiole en a encore besoin.
- `CaseStudyLayout.TabBar` (dans `CaseStudyLayout.jsx`) n'a aucun importeur dans le reste du site : code mort probablement antérieur à cette mission, à nettoyer dans `kiosque-finitions`.
- Avant fusion, vérifier visuellement l'équilibre de la nouvelle chemise kraft de `/lab` sur un vrai écran (couleurs, lisibilité du Special Elite) — le `verificateur` confirme l'absence d'erreur et de débordement, mais pas le rendu esthétique fin.

## Retouches à la clôture (session interactive, 2026-10-04)
- `/lab/lab-tokens` : la colonne « Valeur » sortait du cadre sur ordinateur (tableau de 1047 px dans 798). Les noms de tokens et « pointe vers » vont maintenant à la ligne, la valeur complète apparaît au survol.
- Fiches `/lab/<slug>` sur mobile : le tampon rond est masqué, il coinçait le titre dans une colonne étroite.
- `src/design-system/SectionTitle.jsx` (hors fichiers autorisés, défaut antérieur) : les titres de section ne restent plus sur une seule ligne. Sur mobile, « La contrainte qui a façonné le reste » faisait déborder la page de 23 px.
- À voir avec Michael : sur `/lab`, l’aperçu du Magazine garde l’ancien style rose avec « N° 001 », alors que le Magazine est passé en bleu avec « N° 1 » ; la fiche agent affiche « ACCENT : BURNT CORAL », l’ancienne couleur.
