# Mission utilisation-ia-maj — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : « regarde si la partie Utilisation de l'IA est à jour sur le site ».

Interprétation retenue au cadrage : **auditer la page, puis la mettre à jour** (Michael délègue en fondateur : un audit sans correction lui demanderait une mission de plus). L'audit reste un livrable à part (`AUDIT.md`), pour que Michael voie ce qui était faux ou manquant.

## Contexte
- Page : `src/lab/projects/UtilisationIA.jsx` (`/lab/utilisation-ia`), écrite le 26/09 à partir de `missions/utilisation-ia/CONTENU.md`. Textes dans `CONTENT = { fr, en }` ; schémas `Timeline`, `FlowDiagram` (déjà en `grid` sur ordinateur), `DiagramBox` local, blocs `Pre` pour les arborescences.
- **Tout ce qui s'est passé depuis est dans `CONTENU-MAJ.md`** (ce dossier) : seule source de faits pour la mise à jour. Le §A liste déjà les passages devenus inexacts repérés au cadrage ; l'audit doit les confirmer et chercher les autres.

## Décisions (tranchées)
**D1 — Audit d'abord.** `AUDIT.md` : chaque passage de la page (FR et EN) devenu inexact, incomplet ou daté, avec la correction prévue ; puis la liste de ce qui manque (sections de CONTENU-MAJ §B à §I).
**D2 — Histoire vs état actuel.** Les passages qui racontent le 26/09 restent (ils sont vrais à leur date) ; les passages qui décrivent **le fonctionnement actuel** (circuit final, « Ce qui me reste », organigramme, arborescences) sont mis à jour à l'état du 27/09.
**D3 — Nouvelles sections**, dans l'ordre chronologique, avant « Le circuit final » : la 3ᵉ mission et les réglages d'autonomie (§B, §C) ; le Magazine et la relecture factuelle (§D) ; la file d'attente (§E) ; le pilotage depuis le téléphone et la clôture en un mot (§F, §G) ; le compromis sur le push de `main` (§H) ; le bilan chiffré (§I, en tableau). Titres courts, même ton que le reste (première personne de Michael).
**D4 — Schémas.** Prolonger la chronologie (Timeline) avec les jalons du 27/09. Mettre à jour les données du circuit final et de l'organigramme. Au moins **un nouveau schéma** : le pilotage depuis le téléphone (téléphone → session tour de contrôle → routine → pull request → fusion dans l'app GitHub). Réutiliser les composants existants ; `FlowDiagram` en `direction={isMobile ? 'vertical' : 'grid'} columns={3}` comme les autres.
**D5 — Mise en abyme.** Mettre à jour la section finale : cette page est désormais entretenue par le système lui-même (mission 7).
**D6 — Contraintes.** Tokens uniquement ; FR et EN complets (traduction naturelle) ; aucune donnée sensible ; lisible à 375 px ; aucun autre fichier source modifié.

## Critères d'acceptation
1. `AUDIT.md` existe et chaque point y est marqué « corrigé » ou « conservé (historique) » avec sa raison.
2. Tous les points du §A de CONTENU-MAJ sont corrigés sur la page, en FR et en EN.
3. Les §B à §I de CONTENU-MAJ sont couverts ; la chronologie contient les jalons du 27/09 ; le nouveau schéma de pilotage depuis le téléphone est présent.
4. Aucune erreur console sur `/lab/utilisation-ia` (FR et EN), `/` et `/magazine`.
5. 375 px : aucun débordement horizontal de la page.
6. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/lab/projects/UtilisationIA.jsx` et `grep -nE "ghp_|gho_|/Users/|@gmail" src/lab/projects/UtilisationIA.jsx` ne renvoient rien.
7. `git diff main --stat` : seuls `src/lab/projects/UtilisationIA.jsx` et `missions/utilisation-ia-maj/` sont modifiés.
8. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans UtilisationIA.jsx.
9. Tout est commité sur `auto/utilisation-ia-maj`, rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- Toute autre page, le Magazine, les composants de schéma.
