# Mission atelier-automatique-2 — RAPPORT

## Fait
- Pagination de `AtelierLivre.jsx` entièrement calculée (plus aucun folio en dur) : chaque page a son folio = sa position dans la liste, et une table `cle → folio` fait le lien pour le sommaire. Vérifié : rendu identique avant toute insertion.
- Fiche n° 0 « Le rédacteur » : double page (figure `SchemaRedacteur`, machine à écrire éclatée A rouleau / B clavier / C levier de retour / D feuille, Fig. 6 ; fiche rôle/qui l'occupe/appelé/ne fait jamais + encadré ATTENTION + écran VT323), insérée juste après l'ouverture de la partie 2, avant le controleur. Ouverture de la partie 2 et garde (« avant de lire ») mises à jour.
- Partie 4 — Les missions autonomes : ouverture, figure du cycle (`SchemaCycleMission`, Fig. 9), les six fichiers d'une mission, file d'attente et reprise, modèle par étape, cas d'école de la première mission (13 min, 7 commits).
- Partie 5 — Les accessoires : ouverture, les 4 mods (garde-git, retour-routine, kiosque, garde-controleur), le skill /mission, les connexions utiles (navigateur intégré, Figma, Lightpanda en secours).
- Partie 6 — Réglages et consommation : ouverture, les vrais leviers sur le quota, économiser les tokens, quel modèle pour quel travail.
- Partie 7 — Pannes et dépannage : ouverture, 7 pannes en tableau Symptôme/Cause/Remède sur 3 pages.
- Partie 8 — Carnet d'entretien : ouverture, registre des 24 entrées de la chronologie d'UtilisationIA.jsx, condensées sur 3 pages (colonnes Entrée/Intervention/Opérateur).
- Annexe — Glossaire : 19 termes définis en une ligne, sur 2 pages.
- Sommaire nettoyé : plus de ternaire ni de clé « en préparation », tous les folios sont désormais réels.
- Relecture de forme par l'agent secretaire : 4 corrections de cohérence terminologique appliquées.
- Vérification finale : build, lint, greps (session principale) + navigateur en FR et EN à 375 px (agent verificateur) : tout conforme.
- Correction tardive repérée en relecture finale : la phrase de la garde annonçant « quatre parties prêtes, les suivantes en chantier » était devenue fausse ; corrigée (voir DECISIONS.md).
- Livre : 26 → 54 pages (nombre pair conservé).

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté. Voir « Recommandations » pour ce qui est volontairement hors périmètre.

## Critères d'acceptation
1. **`/atelier` se parcourt sans erreur, console vide.** OK — vérifié par l'agent verificateur (console vide, 54 pages).
2. **Fiche n° 0 en double page, figure à gauche sur folio pair, juste avant le controleur qui reste en double page.** OK — figure au folio 10 (pair), fiche au folio 11, controleur toujours sur sa propre double page juste après.
3. **Parties 4 à 8 et glossaire présents en FR/EN ; plus aucun usage de « en préparation ».** OK — `grep -rn "enPreparation\|en préparation\|in preparation" src/atelier/` : aucun résultat.
4. **Les folios du sommaire correspondent aux folios réellement imprimés.** OK — vérifié page par page par l'agent verificateur (10/10 entrées) et à plusieurs reprises pendant la mission après chaque insertion.
5. **À 375 px : aucun défilement horizontal, aucun débordement de page.** OK — vérifié en FR et en EN par l'agent verificateur, après correction de deux débordements trouvés en cours de route (glossaire page 1, leviers du quota en FR).
6. **`grep -rn "/Users/\|@gmail\|ghp_" src/atelier/ missions/atelier-automatique-2/` : aucun résultat.** OK — seules les mentions dans SPEC.md, qui documente la commande elle-même (pas un secret réel).
7. **Relecture de la forme par l'agent secretaire, corrections appliquées.** OK — 4 corrections appliquées (voir DELEGATIONS.md).
8. **`npm run build` passe ; `npm run lint` 0 erreur.** OK — vérifié après chaque étape.
9. **Tout commité sur `auto/atelier-automatique-2`, rien sur `main`, rien poussé.** OK — 12 commits sur la branche, arbre de travail propre, aucun `git push` exécuté.

## Comment vérifier
```
git checkout auto/atelier-automatique-2
npm run build && npm run lint
npx vite preview
```
Puis ouvrir `/atelier` dans un navigateur, tourner les pages jusqu'à la 4ᵉ de couverture, basculer FR/EN, et réduire la fenêtre à 375 px pour vérifier l'absence de défilement horizontal.

## Décisions
Voir `DECISIONS.md` (10 décisions prises sans Michael, dont : fiche du rédacteur en double page, folio calculé plutôt qu'en dur, position des nouvelles parties avant la page Notes, numérotation des figures à la suite, colonnes du carnet d'entretien sans date calendaire absente des sources, correction tardive de la garde).

## Délégations
Voir `DELEGATIONS.md`. Modèles réellement utilisés :
- **Opus 5.5** : cadrage (étape 0, avant cette exécution).
- **Sonnet 5.5** : toutes les étapes d'exécution (2 à 9, 11), et la relecture de forme (secretaire, étape 10).
- **Haiku 4.5** : vérification finale dans le navigateur (verificateur, étape 11).

Aucun sous-agent n'a échoué à rendre un verdict ; aucune nouvelle tentative n'a été nécessaire.

## Recommandations
- Hors périmètre, non traité (comme prévu par la SPEC) : redirection ou retrait des dossiers IA du Lab (`UtilisationIA`, `SalleDesMachines`), place du livre sur le présentoir de la librairie, vérification détaillée de l'impression A5.
- Le livre est maintenant complet (parties 0 à 8 + glossaire) ; une future mission pourrait se concentrer sur un contrôle d'impression A5 réel, ou sur la place du livre dans la bibliothèque du site.
