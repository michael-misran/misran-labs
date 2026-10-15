# Mission librairie-rayons — PROGRESS

**Statut :** terminée
**Prochaine action :** clôture (push + pull request), en session interactive avec Michael
**Blocages :** aucun

## État initial (2026-10-15, depuis main 6a4fb06)
- `npm run build` : OK
- `npm run lint` : OK, 0 erreur, 0 avertissement

## Étape 2 — Données (2026-10-15)
Sous-agent Haiku : `collection` et `parution` ajoutés aux 4 volumes existants
(numero-1, midnight-1, gazette, portfolio), 3 volumes ajoutés à la fin du
tableau (atelier, nuancier, carnet), commentaire d'en-tête mis à jour.
Diff relu par la session principale, conforme à la SPEC D1. `npm run build`
et `npm run lint` : OK.

## Étape 3 — Nouvelles couvertures (2026-10-15)
3 nouveaux cas dans `Couverture` (Etagere.jsx) + CSS (etagere.css) :
- `atelier` : bleu de plan (`--titre-atelier`), bandeau crème « Notice
  MM-1977 », titre en Oswald, petit rouage en pointillé.
- `nuancier` : papier crème, bandeau des 5 couleurs de titres en haut.
- `carnet` : carnet noir, élastique rouge, étiquette en machine à écrire.
`npm run build` et `npm run lint` : OK. Vérification visuelle (grande
taille, dans le dialogue « sorti ») prévue avec le reste à l'étape 7.

## Étapes 4 et 5 — Présentoir calculé, rayons, enseigne (2026-10-15)
Présentoir : `nouveautes()` calcule les 4 volumes parus les plus récents
(filtre `parution`, tri décroissant) ; `PRESENTOIR` ne référence plus un
id fixe. Enseigne rouge « Nouveautés »/« New releases » ajoutée, celle du
« Chocolat Chaud » inchangée. Rayons : 4 plaques de laiton (`RAYONS`,
titres + sous-titres FR/EN), emplacements des livres calculés par formule
(D3), `Expose` généralisé pour accepter `top` (rayon) en plus de `bottom`
(présentoir), tampon « À paraître »/« Coming soon » sur les volumes non
parus. Vérifié avec `npx vite preview` à 1300 px : aucune erreur console,
7 livres en rayon + 4 au présentoir dans l'ordre attendu (Atelier,
Portfolio, Misran Labs, Oracle), alignement correct sur les 3 images
(normale, Halloween, Noël), tampons sur Midnight Snack/Nuancier/Carnet
uniquement, 3 nouvelles couvertures lisibles en grand dans le dialogue,
textes EN corrects (bandeau, enseigne, plaques, tampons). `npm run build`
et `npm run lint` : OK.

## Étape 6 — Défilement téléphone (2026-10-15)
`.sl-scene` enveloppée dans `.sl-cadre` (défilable sous 700 px, inchangé
au-dessus), centrée sur le présentoir à l'ouverture (`scrollLeft` calculé),
indication « ← Glissez pour voir les rayons → » qui disparaît au premier
défilement réel (écouteur `scroll`, once). Bug trouvé et corrigé en
vérifiant à 375 px : `.sl-scene` en `position:static` cassait le repère
des enfants en % (voir DECISIONS.md) — passé en `position:relative`.
Revérifié : `document.documentElement.scrollWidth` égal à `clientWidth`
(aucun défilement de page), scène défilable sur toute sa largeur (les 4
rayons atteints, vérifié par un vrai geste de défilement), indication
disparue après le geste, bureau (≥ 1024 px) strictement inchangé.
`npm run build` et `npm run lint` : OK.

## Étape 7 — Vérification finale (2026-10-15)
Session principale : `npm run build` OK, `npm run lint` 0 erreur, grep
secrets/chemins/e-mails sur `src/bibliotheque/` et `src/numero/` : aucun
résultat. Agent verificateur (Haiku) sur `npx vite preview` : VERDICT OK —
ordre du présentoir conforme, 7 livres en rayon + 4 plaques, dialogues
« Lire »/« À paraître » corrects (Échap et clic fond ferment), 3 saisons
alignées, défilement téléphone vérifié par un vrai geste de molette (pas
une assignation JS) avec indication qui disparaît, textes EN complets,
console vide. Voir DELEGATIONS.md.
