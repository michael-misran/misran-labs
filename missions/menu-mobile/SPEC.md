# Mission menu-mobile — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : corriger le bouton menu mobile qui chevauche l'en-tête des pages, et remplacer l'icône du Magazine dans le menu de gauche par « un livre ouvert par exemple ».

## Contexte
- Sur mobile (< 768 px), `src/shell/Shell.jsx` (l. ~88-110) affiche le bouton ☰ en `position: absolute`, `top: calc(var(--chrome-height) + 12px)`, `left: 12`, par-dessus la zone de contenu. Le contenu des pages commence en haut sans réserver cette place : sur `/magazine/2026-09-28` et `/breves/2026-09-30` à 375 px, le bouton recouvre le lien retour (« ← Magazine », « ← Brèves ») et la première ligne du `CaseMasthead` (`src/lab/CaseFile.jsx`). Constaté en clôture de la mission breves.
- Menu de gauche : `src/shell/Sidebar.jsx` l. 185, `<NavItem to="/magazine" number="✎" …>`. Les autres icônes : ✛ (Lab), 🗞 (Brèves), ◇ (Projets).

## Objectif
Plus aucun chevauchement du bouton ☰ sur le contenu, sur toutes les pages, à 375 px ; et l'icône du Magazine dans le menu devient un livre ouvert.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Le bouton reste où il est, le contenu lui fait de la place.** Garder le bouton flottant (même position, même style : fidélité visuelle). Sur mobile uniquement, réserver en haut de la zone de contenu défilante (dans `Shell.jsx`, le conteneur qui reçoit l'`<Outlet />`) un espace égal à : décalage du bouton + hauteur du bouton + une marge, pour que le premier élément de chaque page commence sous le bouton. Définir cette valeur une seule fois (variable CSS dans `src/styles/tokens.css`, niveau component, par ex. `--mobile-nav-offset`) et l'utiliser à la fois pour le `top` du bouton et pour l'espace réservé, afin qu'ils restent liés. Ne pas modifier les pages une par une.
Si D1 s'avère impossible sans casser une page (ex. une page plein écran comme une démo de `/lab/:slug/demo`), exclure cette page par la route et le noter dans `DECISIONS.md`.

**D2 — Icône du Magazine : 📖** (livre ouvert, U+1F4D6) à la place de ✎ dans `Sidebar.jsx` uniquement. Cohérent avec 🗞 déjà utilisé pour Brèves. Vérifier le rendu dans le menu déplié et replié (desktop) et dans le menu mobile : même taille visuelle que les autres icônes, alignement correct ; ajuster seulement si l'emoji déborde, sans valeur en dur hors des tokens.

## Critères d'acceptation
1. À 375×812, sur `/`, `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-09-30`, `/projets`, `/lab/design-system` : le rectangle du bouton ☰ (`getBoundingClientRect`) ne recouvre aucun élément de texte ou lien du contenu en haut de page (vérifier avec `document.elementsFromPoint` sur les coins et le centre du bouton : seul le bouton et des conteneurs sans texte doivent y être). Captures d'écran jointes au rapport pour 3 pages.
2. À 375 px : pas de défilement horizontal (`document.documentElement.scrollWidth <= 375`) sur ces mêmes pages.
3. En desktop (1280×900) : aucun changement visuel de la zone de contenu (pas d'espace ajouté en haut) — vérifier `/magazine` et `/breves` avant/après (position `top` du premier élément du contenu identique).
4. Le bouton ☰ ouvre toujours le menu, et le menu se ferme en cliquant sur le fond.
5. L'entrée Magazine du menu affiche 📖 (desktop déplié, desktop replié, mobile) ; `grep -n '"✎"' src/shell/Sidebar.jsx` ne renvoie rien.
6. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
7. Tout est commité sur `auto/menu-mobile`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Changer le ✎ des en-têtes (`MagazineHero`) de `/magazine` et `/breves` : à proposer à Michael pour cohérence avec la nouvelle icône du menu.
- Déplacer le bouton ☰ dans la barre du haut.
