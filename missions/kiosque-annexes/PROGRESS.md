# Mission kiosque-annexes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5
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
