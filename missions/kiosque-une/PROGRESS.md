# Mission kiosque-une — PROGRESS

**Statut :** étapes 1 à 5 faites (squelette, Gazette, présentoirs, bulletin)
**Prochaine action :** étape 6 (en-tête compact mobile, D8, `Masthead.jsx`)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-10-04, branche `refonte-kiosque` = 99d9d7f)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étape 1 (reconfirmation, 2026-10-04)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étapes 2 à 5 (2026-10-04)
Créé `src/kiosque/kiosqueText.js`, `KiosqueParts.jsx`, `KiosqueHome.jsx` ; route `/` → `KiosqueHome` dans `App.jsx` (index route), `/lab` inchangé (`ArchiveHome`). `npm run build` et `npm run lint` : OK après deux corrections lint (props non utilisées). Vérification visuelle dans le navigateur reportée à l'étape 7.
