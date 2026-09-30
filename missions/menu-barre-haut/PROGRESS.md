# Mission menu-barre-haut — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (vérification navigateur, verificateur Haiku)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main 5f5a316)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 — État initial + relevé référence desktop (2026-09-30)
- `npm run build` : passe (session principale)
- `npm run lint` : aucune erreur (session principale)
- Relevé référence Topbar à 1280px (avant modification), via verificateur (Haiku) :
  - Élément `HEADER.shell-chrome`
  - Hauteur calculée : 32px
  - Padding calculé : `0px` haut/bas, `20px` gauche/droite
  - `display: flex`, `position: static`
  - Aucun bouton ☰ en desktop (seul le bouton de langue est présent, à droite)
  - Aucune erreur/avertissement console
  - Capture d'écran prise pour comparaison post-modification (critère 4)

## Étape 2 (faite, 2026-10-01)
- `Topbar.jsx` : props `navOpen`/`onToggleNav`, bouton ☰/✕ rendu en premier sur mobile (groupé avec « M.LABS ARCHIVE » dans un conteneur flex), `aria-label`/`aria-expanded` via `t(lang, ...)`. Padding mobile de la barre changé pour `'0 var(--space-sm) 0 0'`. Desktop inchangé (aucun bouton, padding `'0 20px'` inchangé).
- `Shell.jsx` : bouton flottant supprimé, `navOpen`/`onToggleNav` passés à `Topbar`, `paddingTop` mobile de `<main>` supprimé.
- `tokens.css` : `--mobile-nav-offset` et son commentaire supprimés.
- Critère 5 (grep `30px|mobile-nav-offset` sur les 3 fichiers) : aucune occurrence.
- `npm run build` : passe. `npm run lint` : 0 erreur.
