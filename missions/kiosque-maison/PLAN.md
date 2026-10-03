# Mission kiosque-maison — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md (déjà relevés au cadrage, à reconfirmer) → session principale (Sonnet)
- [x] 2. Polices : remplacer le lien Google Fonts de `index.html` par celui de D2 (une seule balise `<link>`, `display=swap`) → sous-agent (Haiku)
- [x] 3. Tokens : primitives de la maison, réaffectation des sémantiques, tokens de titres et de typo, commentaire d'en-tête (D3) → session principale (Sonnet)
- [x] 4. Shell : passer au défilement du document (D4), retirer Topbar/Sidebar/Statusbar du rendu, garder SecondarySidebar, Outlet et `document.title`, adapter les règles d'impression, ajouter la route `/lab` (D8) → session principale (Sonnet)
- [x] 5. `Masthead.jsx` : filet haut (date, liens, FR/EN) et tête de la maison, d'après la référence `screens/accueil-kiosque.src.html` (D5) → session principale (Sonnet)
- [x] 6. `NavTitres.jsx` : 5 titres typographiés, état actif, Zine « bientôt », barre collante, défilement horizontal sur mobile (D5, D9) → session principale (Sonnet)
- [x] 7. `Defilant.jsx` : données réelles, couleurs par titre, boucle, pause au survol, `prefers-reduced-motion` (D5) → session principale (Sonnet)
- [ ] 8. `Colophon.jsx` + Fiole en `position: fixed` (D5, D6), puis suppression des fichiers devenus inutiles (D7) et textes fr/en dans `src/i18n/ui.js` → session principale (Sonnet)
- [ ] 9. Vérification finale : build, lint, greps des critères 1 et 3 par la session principale ; critères 2 et 4 à 9 dans le navigateur (desktop + 375 px) → verificateur (Haiku)
- [ ] 10. RAPPORT.md (rappeler D1 : la PR vise `refonte-kiosque`, et lister les missions suivantes) → session principale (Sonnet)
