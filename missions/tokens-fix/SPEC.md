# Mission tokens-fix — SPEC

Rédigée par Opus (cadrage), 2026-09-26. Brief de Michael : « corriger les tokens qui sont en erreur ».

## Contexte
`src/styles/tokens.css` suit trois niveaux : primitive → semantic → component. Règle : **tout token semantic pointe vers une primitive, jamais vers une valeur brute.**
La page « Tokens du Lab » (`src/lab/projects/LabTokens.jsx`, dossier 007) documente chaque token dans le tableau `GROUPS` et signale en erreur (`getViolation` → `raw-value`) tout semantic sans `pointsTo`. Elle affiche aujourd'hui **34 erreurs** :

| Groupe | Tokens en erreur |
|---|---|
| Couleurs | `--grid-line`, `--active-tint`, `--hover-tint` (3) |
| Élévation | `--elev-1`, `--elev-4`, `--elev-5`, `--elev-inset`, `--elev-pressed` (5) |
| Rayons & bordures | `--radius-xs/sm/md/lg/xl/pill`, `--border-thin/regular/thick`, `--icon-stroke` (10) |
| Typographie | `--font-heading/body/mono`, `--label-transform`, `--label-tracking`, `--heading-transform`, `--heading-tracking` (7) |
| Structure | `--space-xs/sm/md/lg/xl`, `--icon-sm/md/lg`, `--chrome-height` (9) |

## Objectif
Zéro erreur sur la page, **sans aucun changement visuel** : on ajoute les primitives manquantes et on transforme les semantics en alias. On ne masque rien dans le détecteur.

## Décisions d'architecture (tranchées, ne pas rediscuter)

**D1 — Échelle de dimensions.** Une seule échelle primitive nommée par sa valeur en px :
`--primitive-size-1: 1px`, `-2`, `-4`, `-8`, `-10`, `-12`, `-16`, `-20`, `-24`, `-32`, et `--primitive-size-full: 999px`.
Espacements, icônes, `--chrome-height`, rayons, épaisseurs de bordure pointent tous vers cette échelle.

**D2 — Polices.** `--primitive-font-fraunces`, `--primitive-font-work-sans`, `--primitive-font-jetbrains-mono`, avec exactement les piles actuelles (fallbacks compris).

**D3 — Texte.** `--primitive-tracking-tight: -0.01em`, `--primitive-tracking-wide: 0.1em`, `--primitive-case-upper: uppercase`, `--primitive-case-none: none`, `--primitive-stroke-1-5: 1.5`. Oui, même pour des mots-clés CSS : la règle est sans exception (voir le commentaire au-dessus de `getViolation`).

**D4 — Couleurs avec transparence.** Primitives dédiées, suffixe `-aNN` = opacité en centièmes, valeur rgba **recopiée à l'identique** (même écriture, ex. `0.12` et non `.12`) :
- encre 900 (36,28,22) : `a05`, `a12`, `a18`, `a22`, `a25` → `--primitive-ink-900-a05`…
- corail 500 (221,90,62) : `a12`
- crème 50 (248,242,231) : `a10`, `a12`, `a18`, `a35`
- noir (0,0,0) : `--primitive-black-a15`, `a18`, `a20`, `a25`

**D5 — Ombres.** Une ombre est une composition : conforme si **sa couleur** pointe vers une primitive. Les décalages (`3px 3px 0`) restent littéraux. `pointsTo` dans la doc = la primitive de couleur. `--elev-1: none` → `--primitive-shadow-none: none`.

**D6 — Portée.** Le bloc `[data-invert]` suit la même règle (ses rgba passent par les primitives D4), même s'il n'est pas dans le tableau. Le bloc `@media print` reste tel quel (surcharge d'impression, hors règle).

**D7 — Organisation de tokens.css.** Les nouvelles primitives vont dans la section `1. PRIMITIVE`, groupées par famille avec un court commentaire en français. La section `STRUCTURE` en tête de fichier disparaît : ses tokens deviennent des semantics dans la section 2. Mettre à jour les commentaires qui ne sont plus vrais (ex. « un troisième niveau n'y ajouterait rien »).

**D8 — Documentation (LabTokens.jsx).** Ajouter les nouvelles primitives dans `GROUPS` (nouvelles catégories FR/EN : dimensions, polices, texte, couleurs avec transparence), renseigner `pointsTo` et `value` (valeur résolue) de chaque semantic corrigé. L'aperçu (`preview`) doit rester lisible pour les nouveaux types ; si aucun aperçu n'a de sens, afficher `—` comme les types existants sans aperçu. Relire les textes de la page (FR et EN) : aucun texte ne doit encore affirmer que des erreurs sont laissées volontairement.

**D9 — Hors périmètre** (à mentionner en recommandation dans le RAPPORT, ne pas faire) : générer `GROUPS` automatiquement depuis tokens.css ; renommer les tokens semantics ; toucher aux composants consommateurs.

## Critères d'acceptation
1. La page Tokens du Lab affiche **0 erreur**, en FR et en EN.
2. **Non-régression visuelle** : les valeurs calculées de tous les tokens (`:root` et un élément `[data-invert]`), relevées avant et après via `getComputedStyle`, sont identiques après normalisation des espaces. Fichiers `snapshot-avant.json` / `snapshot-apres.json` dans ce dossier.
3. Aucune valeur brute restante dans les sections semantic et component de tokens.css, ni dans `[data-invert]` (hors décalages d'ombre, D5).
4. `npm run build` passe. `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
5. Aucune erreur console sur la page Tokens du Lab ni sur la page d'accueil.
6. Tout est commité sur `auto/tokens-fix`, rien sur `main`, rien de poussé.
