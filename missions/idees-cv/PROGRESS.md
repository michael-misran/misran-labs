# Mission idees-cv — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5 (vérification finale)
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ». `CaseFile.jsx` est restylé par `lab-dossiers` en parallèle, pas par cette mission : sur cette branche il reste dans son état d'avant mission, c'est attendu.

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.

## Étape 2 (exécution, 2026-10-04)
- `src/projets/ProjetsParts.jsx` : `ProjetsHero` restylé (numéro/sous-titre en Special Elite, titre gardé en `--font-heading`, D6) ; nouveau `NoteMasthead` (remplace localement `MagazineMasthead` emprunté au Magazine, D1) ; nouveau `StampStatut` (tampon de statut, couleur + inclinaison par statut, `STATUT_TILT`) ; `StatusMark` passé en Special Elite ; `StatusFilter` restylé en onglet de classeur kraft (`ONGLET_KRAFT`, constante locale — pas d'import de `src/lab/*`, interdit par D1) ; `IdeaRow` remplacé par `FicheBristol` (fiche papier à lignes bleues, trou de perforation en CSS, décision annotée en `--font-chapo` italique si elle existe).
- `src/projets/projetsText.js` : ajout de `noteDeService` et `clearancePublic` (fr/en). Valeur de `home.subtitle` changée en « NOTES DE RECHERCHE — LES IDÉES DU LAB » / « RESEARCH NOTES — THE LAB'S IDEAS » (D2) — un changement de contenu, pas de renommage de clé, donc compatible avec « ajouts seulement ».
- `npm run build` et `npm run lint` : OK.

## Étape 3 (exécution, 2026-10-04)
- `ProjetsHome.jsx` : grille de `FicheBristol` à la place de la liste `IdeaRow`.
- `ProjetIdee.jsx` : `NoteMasthead` à la place de `MagazineMasthead` ; en-tête de la note « NOTE P-NNN · CLASSEMENT : public » (D3, via la nouvelle clé `clearancePublic`) ; étiquettes diverses passées en Special Elite (D6) ; les identifiants/URL de mission restent en `--font-mono` (ce sont des slugs, pas des étiquettes).
- `ProjetsFonctionnement.jsx` : `NoteMasthead`, étiquette « NOTE DE SERVICE »/« MEMO » ajoutée au-dessus du hero (D4). Le contenu vient toujours de `fonctionnementText.js` (interdit, non modifié) : seul l'habillage change.
- `npm run build` et `npm run lint` : OK.

## Étape 4 (exécution, 2026-10-04)
- `CVModule.jsx` : bandeau « FICHE AGENT · M. MISRAN » (`--titre-lab`) ajouté au-dessus de `CaseHero` ; `CadrePhoto` (cadre vide à trame diagonale, « PHOTO NON COMMUNIQUÉE » — pas de vraie photo, hors périmètre) placé à côté du bloc contact ; deux champs tapés ajoutés (`RÔLE`, `SPÉCIALITÉS`, cette dernière réutilisant les libellés déjà présents dans `c.expertise`) ; `SectionHeader`/`RoleHeader`/`Bullets` passés en Special Elite (D6) ; kicker « RAPPORTS DE MISSION, PAR ORDRE CHRONOLOGIQUE » ajouté avant la liste des expériences. Contenu (textes, dates, contact) inchangé.
- `npm run build` et `npm run lint` : OK.
