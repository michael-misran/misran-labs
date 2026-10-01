# Mission menu-barre-haut — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : sur mobile, le bouton ☰ passe dans la barre du haut au lieu de flotter par-dessus le contenu (recommandation du RAPPORT de menu-mobile).

## Contexte
- `src/shell/Shell.jsx` (l. ~88-110) : sur mobile, quand le tiroir est fermé, un bouton ☰ flotte en `position: absolute`, `top: var(--mobile-nav-offset)`, `left: 12`, `zIndex: 45`, fond `--bg2`, bordure fine `--border`, `--radius-sm`, couleur `--primary`, 16 px, `padding: '6px 10px'`. Il ouvre le tiroir (`setMobileNavOpen(true)`). `<main>` réserve sa place : `paddingTop: 'calc(var(--mobile-nav-offset) + 30px + var(--space-sm))'` (30px en dur = hauteur du bouton).
- `--mobile-nav-offset: calc(var(--chrome-height) + var(--space-sm))` dans `src/styles/tokens.css` (l. ~203-208, avec son commentaire), utilisé seulement par ces deux lignes de `Shell.jsx`. Absent de `LabTokens.jsx`.
- `src/shell/Topbar.jsx` : barre de 32 px (`--chrome-height`), « M.LABS ARCHIVE » à gauche, bouton de langue à droite. Sur mobile, `padding: '0 10px 0 52px'` (les 52 px à gauche étaient un espace réservé, plus utile).
- `src/shell/Sidebar.jsx` : le tiroir mobile est en `position: absolute; top: 0` **dans** la zone sous la barre du haut ; son en-tête a un bouton ✕ (`onCloseMobile`). Un voile (`Shell.jsx`, `zIndex: 40`) ferme le tiroir au clic. Libellés `openNav` / `closeNav` via `t(lang, …)`.
- La mission finitions-lab (branche séparée) ne touche **pas** `Shell.jsx` ni `Topbar.jsx` ; ne pas toucher de fichier qu'elle modifie (en particulier aucun remplacement d'espacements ailleurs que dans les fichiers de cette SPEC).
- État initial (2026-09-30, `main` 5f5a316) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
Sur mobile, le ☰ vit dans la barre du haut, toujours visible, et plus rien ne flotte ni ne réserve de place au-dessus du contenu. Desktop inchangé.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Bouton dans `Topbar`.** `Topbar` reçoit deux nouvelles props, `navOpen` (booléen) et `onToggleNav` (fonction). Sur mobile seulement, un `<button>` est rendu **en premier** dans la barre, à gauche, avant « M.LABS ARCHIVE », groupé avec lui dans un conteneur `display: flex; alignItems: center; gap: var(--space-xs)`. Style : fond `none`, sans bordure, couleur `--primary`, `fontSize: 16`, `lineHeight: 1`, `height: 'var(--chrome-height)'`, padding horizontal `0 var(--space-sm)`, `cursor: pointer`. Contenu : `☰` quand le tiroir est fermé, `✕` quand il est ouvert. `aria-label` = `t(lang, 'openNav')` ou `t(lang, 'closeNav')` selon l'état, `aria-expanded={navOpen}`. Le clic appelle `onToggleNav`. Padding mobile de la barre : `'0 var(--space-sm) 0 0'` (le bouton porte sa propre marge à gauche). Desktop : rien ne change (même rendu, même padding `'0 20px'`).

**D2 — `Shell.jsx`.** Supprimer le bouton flottant (tout le bloc `isMobile && !mobileNavOpen`). Passer à `Topbar` : `navOpen={mobileNavOpen}` et `onToggleNav={() => setMobileNavOpen(o => !o)}`. `<main>` : supprimer la ligne `paddingTop` mobile et son commentaire (plus de `30px` en dur). Voile, tiroir, fermeture automatique au changement de page : inchangés.

**D3 — Token retiré.** Supprimer `--mobile-nav-offset` et son commentaire de `tokens.css` (plus aucun usage). Rien d'autre ne change dans ce fichier.

**D4 — Tiroir.** Le ✕ de l'en-tête du tiroir reste (deux façons de fermer). Le tiroir s'ouvre toujours sous la barre du haut, qui reste visible et cliquable (le voile ne la recouvre pas, il est dans la zone sous la barre).

## Critères d'acceptation
1. À 375×812 : ☰ visible dans la barre du haut, à gauche de « M.LABS ARCHIVE », sur `/`, `/magazine`, `/lab/audit-tokens`, `/projets`, `/suivre`, et sur la page 404 (`/nimporte-quoi`). Aucun bouton flottant sur le contenu.
2. Clic sur ☰ : le tiroir s'ouvre, le bouton devient ✕ avec `aria-expanded="true"` ; re-clic : il se ferme. Le ✕ du tiroir et le clic sur le voile ferment aussi. Un lien du tiroir mène à la page et referme le tiroir.
3. Le haut du contenu n'est plus décalé : sur `/`, la distance entre le bas de la barre du haut et le premier contenu de `<main>` est le padding propre de la page (relever la valeur `paddingTop` calculée de `<main>` = `0px` sur mobile).
4. À 1280 px : barre du haut identique à `main` (mêmes valeurs calculées de hauteur, padding, contenu ; aucun bouton ☰), capture comparée.
5. `grep -n "30px\|mobile-nav-offset" src/shell/Shell.jsx src/shell/Topbar.jsx src/styles/tokens.css` ne renvoie rien.
6. Aucune erreur ni avertissement en console ; FR et EN : libellés d'accessibilité dans la bonne langue.
7. Captures au RAPPORT : 375 px tiroir fermé et ouvert, 1280 px barre du haut.
8. `npm run build` passe ; `npm run lint` : aucune erreur.
9. Tout est commité sur `auto/menu-barre-haut`, rien sur `main`, rien de poussé.

## Hors périmètre
- Fermeture au clavier (Échap), piège de focus, animations nouvelles.
- Tout autre fichier que `Shell.jsx`, `Topbar.jsx`, `tokens.css` (et les fichiers de libellés seulement si `closeNav` n'est pas accessible depuis `Topbar`).
- Remplacement des espacements en dur hors des lignes modifiées (mission finitions-lab).
