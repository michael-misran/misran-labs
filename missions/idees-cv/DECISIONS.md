# Mission idees-cv — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 2 | `MagazineMasthead` remplacé par un `NoteMasthead` local dans `ProjetsParts.jsx`, pas modifié dans `MagazineParts.jsx` | D1 l'autorise explicitement (« remplacer par un équivalent local ») ; `MagazineParts.jsx` est interdit |
| 2026-10-04 | 2 | Teinte kraft des onglets de classeur redéclarée en constante locale dans `ProjetsParts.jsx` (`ONGLET_KRAFT`), identique à celle de `src/lab/DossierParts.jsx` | D1 interdit tout import de `src/lab/*` depuis cette mission ; les deux fichiers évoluent en parallèle sur des branches différentes |
| 2026-10-04 | 2 | Inclinaison du tampon de statut fixée par statut (`STATUT_TILT`), pas aléatoire | Un angle aléatoire changerait à chaque re-rendu (re-filtrage, survol) — visuellement instable |
| 2026-10-04 | 3 | `NOTE ${idee.id}` : le mot « NOTE » n'est pas traduit (identique en anglais) | Mot identique dans les deux langues, comme d'autres éléments de marque déjà non traduits sur le site |
| 2026-10-04 | 3 | `ProjetsFonctionnement.jsx` n'importe pas `fonctionnementText.js` pour le nouveau libellé « NOTE DE SERVICE » : ajouté via `projetsText.js` (`noteDeService`) | `fonctionnementText.js` est interdit en écriture (D1) ; rien n'empêche cette page d'importer aussi `projetsText.js` pour un élément d'habillage partagé |