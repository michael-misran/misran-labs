# Mission librairie-rayons — RAPPORT

## Fait
- `volumes.js` : champs `collection` et `parution` ajoutés aux 4 volumes existants ; 3 nouveaux volumes (L'Atelier automatique, Le Nuancier, Carnet d'inventions), commentaire d'en-tête à jour.
- 3 nouvelles couvertures dans `Couverture` (`Etagere.jsx` + `etagere.css`) : `atelier` (bleu de plan, bandeau « Notice MM-1977 »), `nuancier` (bandeau des 5 couleurs de titres), `carnet` (carnet noir, élastique rouge) — lisibles en grand dans le dialogue.
- Présentoir « Nouveautés » calculé dynamiquement (`nouveautes()`) : les 4 volumes parus les plus récents, du plus récent au plus ancien ; `PRESENTOIR` ne référence plus un id fixe. Enseigne rouge « Nouveautés » ajoutée, celle du « Chocolat Chaud » inchangée.
- 4 rayons muraux (Journaux, Magazines, Manuels, Carnets) : plaques de laiton avec titre et sous-titre, livres posés de face calculés par formule (groupe centré sur la colonne, écart 4,5 %), `Expose` généralisé pour accepter une position `top` (rayon) en plus de `bottom` (présentoir), tampon « À paraître »/« Coming soon » sur les volumes non parus.
- Téléphone (< 700 px) : la scène défile horizontalement dans un cadre (`.sl-cadre`), centrée au départ sur le présentoir, indication « ← Glissez pour voir les rayons → » qui disparaît au premier défilement réel. Bureau inchangé.
- Tous les nouveaux textes en FR et EN (bandeau, enseigne, plaques, tampons).
- Vérification finale : build, lint, grep secrets (session principale) + navigateur en FR/EN, 3 saisons, 375 px (agent verificateur) : tout conforme.
- Bug trouvé et corrigé en vérifiant : `.sl-scene` en `position:static` sous 700 px cassait le repère des positions en % de ses enfants (voir DECISIONS.md).

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté.

## Critères d'acceptation
1. **Présentoir « Nouveautés » dans l'ordre attendu, 4 plaques, 8 livres en rayon.** Partiellement — l'ordre du présentoir est exact (Atelier, Portfolio, Misran Labs, Oracle) et les 4 plaques sont correctes, mais il y a **7** livres en rayon, pas 8 : la propre liste entre parenthèses du critère (Oracle ; Misran Labs, Midnight Snack ; Atelier, Nuancier ; Portfolio, Carnet d'inventions) totalise 7. Coquille de comptage au cadrage, documentée dans DECISIONS.md ; les 7 volumes listés sont bien tous affichés.
2. **Clic sur un livre de rayon : dialogue, « Lire » ou « À paraître » selon le cas.** OK — vérifié par l'agent verificateur sur plusieurs livres (Oracle « Lire », Midnight Snack et Carnet d'inventions « À paraître »), Échap et clic sur le fond ferment.
3. **`?saison=halloween` et `?saison=noel` : livres et plaques bien posés.** OK — alignement identique à l'image normale sur les 3 images, vérifié par l'agent verificateur.
4. **375 × 812 : scène défilable dans son cadre, page sans défilement horizontal, rayons atteignables, indication qui apparaît puis disparaît.** OK — vérifié par la session principale puis par l'agent verificateur avec un vrai geste de molette (pas une assignation JS, qui ne déclenche pas d'événement `scroll` fiable dans cet environnement).
5. **EN : plaques, enseigne, bandeau, tampons traduits.** OK.
6. **Console sans erreur.** OK.
7. **`npm run build` passe ; `npm run lint` 0 erreur.** OK, vérifié après chaque étape.
8. **Tout commité sur `auto/librairie-rayons`, rien sur `main`, rien poussé.** OK — 5 commits sur la branche, arbre de travail propre, aucun `git push` exécuté.

## Comment vérifier
```
git checkout auto/librairie-rayons
npm run build && npm run lint
npx vite preview
```
Puis ouvrir `/`, vérifier le présentoir et les 4 rayons, cliquer plusieurs livres, essayer `?saison=halloween` et `?saison=noel`, et réduire la fenêtre à 375 px pour tester le défilement de la scène (à la souris, le défilement horizontal classique fonctionne).

## Décisions
Voir `DECISIONS.md` (dates de parution reprises du cadrage, 7 livres en rayon et non 8, emplacements calculés par formule plutôt que recopiés de la maquette, correction du bug de positionnement mobile).

## Délégations
Voir `DELEGATIONS.md`. Modèles réellement utilisés :
- **Opus 5.5** : cadrage (étape 0, avant cette exécution, dans un worktree).
- **Sonnet 5.5** : toutes les étapes d'implémentation (3 à 6, 7 partiellement).
- **Haiku 4.5** : données mécaniques (étape 2, sous-agent) et vérification finale dans le navigateur (étape 7, verificateur).

Aucun sous-agent n'a échoué à rendre un verdict ; aucune nouvelle tentative n'a été nécessaire.

## Recommandations
- Hors périmètre, non traité (comme prévu par la SPEC) : pages des futurs livres (Nuancier, Carnet d'inventions), retrait de Misran Labs ou réorganisation des dossiers du Lab, nouvelles images Gemini.
- À signaler à Michael : le critère d'acceptation 1 de la SPEC annonçait « 8 livres en rayon » ; le compte réel est 7, conforme à la liste de volumes donnée dans la SPEC elle-même. Rien à corriger côté code, juste une coquille dans le texte de cadrage.
- Le composant `Etagere` par défaut (export par défaut d'`Etagere.jsx`, distinct de `Couverture`) n'est importé nulle part dans le site actuellement : les nouveaux volumes `rayon: 0/1` n'ont donc aucun effet sur une page existante au-delà de la bibliothèque. À garder à l'esprit si ce composant est un jour réutilisé.
