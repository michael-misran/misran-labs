# Mission kiosque-annexes — PROGRESS

**Statut :** terminée
**Prochaine action :** aucune — RAPPORT.md écrit, mission close
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 — confirmation (2026-10-04)
- `npm run build` : OK, génère bien `dist/404.html`, les 4 flux RSS et les images OG.
- `npm run lint` : un worktree orphelin `.worktrees/verif-magazine` (laissé par une autre session, hors périmètre de cette mission) est scanné par `eslint .` et remonte ~566 erreurs qui ne viennent pas de ce dépôt. Vérifié avec `npx eslint . --ignore-pattern '.worktrees/**'` : 0 erreur, 0 warning. Référence retenue pour la suite : lint propre hors ce worktree étranger.

## Étape 2 — noms harmonisés (2026-10-04)
- Délégué à un sous-agent Haiku (`DELEGATIONS.md`) : `FEEDS_BASE` dans `src/suivre/suivreText.js` et les 3 `title` dans `scripts/rss.js` (D2). Diff relu : exactement les 6 remplacements demandés, rien d'autre.
- `npm run build` relancé : `dist/magazine/rss.xml` → « Le Magazine », `dist/projets/rss.xml` → « Les idées du Lab », `dist/rss.xml` → « Tout le kiosque ». URL des flux inchangées.

## Étape 3 — bulletin d'abonnement (2026-10-04)
- `/suivre` refaite en coupon à découper (D3) : cadre en pointillés, étiquette « ✂ Découper ici », une ligne par flux avec case ☐/☒ au survol, nom du titre dans sa propre typo (Gazette gothique + initiale « G » rouge comme dans `NavTitres`, Magazine Playfair italique bleu, Les idées du Lab en machine à écrire verte, Tout le kiosque en lettres de bois), rythme, URL copiable, bouton Copier/Ouvrir. Réseaux existants dessous sous « Autres façons de nous lire ».
- Ancien `MagazineMasthead`/`CaseFooter` retirés : redondants avec le Masthead/Colophon globaux du Shell (acquis de la refonte, rendus une fois pour toutes les pages) — jamais utilisés par Page404 non plus.
- `SuivreBandeau` passé au même style coupon (cadre pointillé, ✂, étiquette Oswald) sans changer son API (`rubrique`) : toujours utilisé par magazine/breves/projets (hors périmètre, non touchés).
- Vérifié moi-même dans le navigateur (`npx vite preview`, routine) : rendu FR et EN conformes, aucune erreur console, aucun débordement à 375 px, les 4 flux et les réseaux s'affichent avec leur lien.

## Étape 4 — avis de recherche (2026-10-04)
- `Page404.jsx` refaite en affiche western (D4) : cadre double filet, étiquette « Avis de recherche », titre « Page disparue » en Rye (`--font-bois-3`), adresse demandée en machine à écrire, « Dernière fois vue : Nulle part », « Récompense : Un café », 5 liens (`/`, `/breves`, `/magazine`, `/jeux`, `/lab`) colorés par titre.
- Textes fr/en définis localement dans `Page404.jsx` (`PAGE404_TEXT`) : `src/i18n/ui.js` est hors périmètre de cette mission, donc pas touché. Les clés `notFound404*` y restent mais ne sont plus utilisées par cette page (`notFound404Tab` reste utilisé par `registry.js` pour l'onglet) — ménage possible dans une mission de finitions, noté en recommandation du RAPPORT.
- `dist/404.html` (généré par `build404Html` dans `share-previews.js`, non touché à cette étape) garde son titre « Page introuvable · Misran Labs », cohérent avec « Page disparue » affichée ; sa description par défaut sera mise à jour à l'étape 5 (D5).
- Vérifié moi-même dans le navigateur : FR et EN, aucune erreur console, aucun débordement à 375 px, les 5 liens présents et fonctionnels.

## Étape 5 — aperçus et images OG (2026-10-04)
- `og-numero-template.html` : papier `#f6f1e6`, encre `#16120e`, bandeau bleu `#2b3a9b` (titre-magazine) sur le bord gauche, titre en Playfair Display italique, étiquettes et tampon circulaire en Oswald (remplace Fraunces/JetBrains Mono/corail). Police chargée par le même unique `<link>` Google Fonts qu'avant, juste les familles changées (lu avant modif, comme demandé).
- `og-numero.js` : eyebrow `LAB MAGAZINE` → `LE MAGAZINE` (D2). Régénéré les 2 images existantes (`public/og/magazine/2026-09-27.png`, `2026-09-28.png`) avec Chrome headless local — build OK, images vérifiées avec l'outil Read : palette maison + bandeau bleu visibles, voir DELEGATIONS.md pour rien (fait en session principale, pas de sous-agent ici).
- `scripts/share-previews.js` : titres harmonisés au-delà de D2 strict (voir DECISIONS.md) — numéro de Magazine, `MAGAZINE_FIXED`, `PROJETS_FIXED`, `PROJETS_FONCTIONNEMENT_FIXED`. `SUIVRE_FIXED.description` porte la formule « Misran Labs, maison d'édition indépendante » (D5).
- `index.html` : `theme-color` → `#16120e` uniquement, rien d'autre touché. Lien Google Fonts vérifié identique à son propre état d'avant cette mission (`git diff` sur la seule ligne theme-color) ; `git diff refonte-kiosque -- index.html` montre aussi un écart sur ce lien (refonte-kiosque a gagné une police `Chango` entre-temps, via une autre mission fusionnée) — normal pour des missions parallèles, je n'ai pas touché cette ligne donc un merge la reprendra sans conflit.
- `npm run build` et lint ciblé : OK.

## Étape 6 — vérification finale (2026-10-04)
- Critère 1 (périmètre du diff) vérifié par la session principale : `git diff --stat refonte-kiosque...auto/kiosque-annexes` ne touche que les fichiers de D1 et `missions/kiosque-annexes/`.
- `npm run build` : OK. `npx eslint . --ignore-pattern '.worktrees/**'` : 0 erreur (le worktree orphelin `.worktrees/verif-magazine`, hors périmètre, reste exclu — voir étape 1).
- Reste des critères (2 à 8, navigateur) délégué au `verificateur (Haiku)` : rendu testé à 1366 px et 375 px, FR et EN, sur `npx vite preview` (pas la preview dev, refusée en routine). Résultat : tout OK — 4 flux cliquables sur /suivre avec leurs réseaux, aucune erreur console, aucun débordement 375 px ; 404 affiche AVIS DE RECHERCHE/WANTED avec l'adresse et les 5 liens ; aucun résidu de langue dans un sens ou l'autre. Voir DELEGATIONS.md.
