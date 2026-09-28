# Mission audit-grille — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Grille calculée par règles fixes + ajustement manuel par axe | Pas d'IA (choix de Michael) ; l'auditeur garde la main sur la note finale, c'est sa valeur ajoutée |
| 2026-09-28 | 0 | Export PDF par l'impression du navigateur | Pas de nouvelle dépendance |
| 2026-09-28 | 2 | Contrastes : chaque token est résolu dans son propre contexte ; `detectees` et `echecs` comptent les paires après le plafond de 200 | Cohérence entre la liste affichée et les compteurs de la grille ; la SPEC ne précise pas |
| 2026-09-28 | 3 | `evaluerGrille` reçoit en plus `fichiersCode` (contenus de l'échantillon) ; `prioriser` reçoit en plus `contrastes` | L'axe 3 (outline) lit le code et le sujet « contrastes » a besoin du nombre d'échecs ; D1 ne les prévoyait pas dans les entrées |
| 2026-09-28 | 3 | `appliquerAjustements` (grille.js) porte l'ajustement D4 dans le moteur : `noteFinale`, `ajustee` (note différente de la calculée), `commentaire` | Le Markdown, l'écran et le rapport imprimable partagent la même moyenne, testable sans React |
| 2026-09-28 | 3 | Sujet « Composants » : compte = composants sans story + sans test ; « Documentation » / « Gouvernance » : compte = critères non remplis ; « Déjà tokenisées » : valeurs distinctes | La SPEC demande « le compte » sans le définir |
| 2026-09-28 | 3 | Textes FR et EN du moteur écrits ensemble dans les modules (comme `regles.js`) ; l'étape 6 (Haiku) traduira les textes de l'interface | Pas de retraduction du moteur ensuite |
| 2026-09-28 | 2 | Un token dont le nom contient un mot « texte » et un mot « fond » est classé texte ; `on-X` sans token X retombe sur les fonds génériques | Cas ambigu non tranché par D5 : option la plus prudente |
