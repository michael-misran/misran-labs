# Mission kiosque-une — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 2-5 | Étapes 2 à 5 faites en un seul passage (un commit) au lieu de 4 | Le squelette, la Gazette, les présentoirs et le bulletin forment un seul petit ensemble de fichiers (`KiosqueHome.jsx`/`KiosqueParts.jsx`/`kiosqueText.js`) écrit d'un seul tenant ; les séparer en commits aurait laissé des étapes intermédiaires avec des imports inutilisés (échec lint). |
| 2026-10-04 | 3 | Manchette (headline) : brève `rubrique === 'ia'` du jour, repli sur `breves[0]` si absente ; étiquette « À la une · <rubrique> » dynamique plutôt que « · IA » figé | La SPEC D4 décrit le cas du jour courant (ia présent) ; un futur jour sans brève IA doit rester correct sans retouche de texte. |
| 2026-10-04 | 3/5 | Titre bilingue de la Gazette construit comme un tableau de segments `['La ', 'G', 'azette du ', 'L', 'ab']` (indices impairs colorés) plutôt que deux variables figées | Permet de colorer G et L dans les deux langues (« La Gazette du Lab » / « The Lab Gazette ») sans dupliquer la logique de rendu. |
| 2026-10-04 | 4 | « INSERT COIN », « 1UP »/« HI » (scores d'arcade) et le sigle « ML-LAB » gardés identiques en fr/en | Jargon d'arcade universel, jamais traduit dans la vraie vie — traité comme un nom propre au sens du critère 5. |
| 2026-10-04 | 4 | Étoile « Bientôt ! » du Zine en `clip-path: polygon(...)` fixe (5 branches) plutôt que calculée en JS comme la référence | La référence calcule la forme au montage (script dents-de-scie) ; un polygone fixe donne un résultat visuellement proche sans script, plus simple et sans dépendance au DOM après rendu. |
| 2026-10-04 | 4 | Pas de magazine affiché sur les présentoirs si `getIssues()` est vide | SPEC D5/critère 3 suppose un numéro existant ; comportement défensif raisonnable et réversible pour un futur état sans numéro, non couvert explicitement par la SPEC. |
| 2026-10-04 | 7 (vérif. navigateur) | `mot.terme` (« Taux de conversion ») reste en français en EN | La donnée (`jours.js`) n'a qu'un seul texte pour `terme`, pas de `fr`/`en` ; `BrevesParts.jsx` (`WordFigureBox`) fait déjà pareil sur `/breves`. Changer le schéma de données est hors périmètre de cette mission. |
| 2026-10-04 | 7 (vérif. navigateur) | `prefers-reduced-motion: reduce` (critère 7) vérifié par parité de code avec `Defilant.jsx`, pas par émulation réelle dans le navigateur | Les outils de navigateur de cette session émulent `colorScheme` mais pas `prefers-reduced-motion` ; la règle CSS de `KiosqueHome.jsx` reproduit exactement le motif déjà en production dans `Defilant.jsx`. |
