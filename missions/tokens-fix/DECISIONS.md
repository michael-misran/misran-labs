# Mission tokens-fix — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D9 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-26 | 1 | Ajout de `public/games` aux `globalIgnores` d'ESLint | ESLint restait bloqué indéfiniment sur les bundles minifiés des jeux (315 Ko chacun) ; sans ça, aucune session autonome ne peut valider le critère 4. Ce sont des builds tiers, pas du code source. |
| 2026-09-26 | 2 | Snapshots relevés par Chrome headless (`snapshot.sh` + `token-snapshot.html`, page statique qui charge tokens.css) au lieu du preview « dev » | Le lancement du serveur de dev est refusé en session planifiée (personne pour approuver). `getComputedStyle` reste la source ; les valeurs des custom properties ne dépendent que de tokens.css. Normalisation : espaces compressés, espaces autour des virgules retirés. |
| 2026-09-26 | 3 | Ordre dans la section 1 : couleurs → alpha → ombre → dimensions → polices → texte ; commentaire d'en-tête de la section élargi (« valeurs brutes » au lieu de « palette brute ») | D7 : groupés par famille, commentaire devenu faux sinon. |
| 2026-09-26 | 4 | Ex-tokens STRUCTURE placés en fin de section 2, sous un commentaire « Structure » | D7 : ils deviennent des semantics ; placés après la typographie pour garder l'ordre du tableau de la SPEC. |
| 2026-09-26 | 6 | Colonne Aperçu : `—` (gris, mono) pour toute ligne non-couleur, anciennes comme nouvelles | D8 demande `—` quand aucun aperçu n'a de sens ; les lignes existantes n'affichaient rien, harmonisées pour la cohérence. Les primitives transparentes (type color) gardent la pastille. |
| 2026-09-26 | 6 | `--primitive-shadow-none` documentée en tête du groupe « Élévation » (type elevation), pas dans une nouvelle catégorie | Seule primitive d'ombre ; D8 ne liste pas de catégorie pour elle. |
| 2026-09-26 | 6 | Types des nouvelles primitives : `dimension`, `font`, `text`, `color` ; `--primitive-stroke-1-5` en `border` comme `--icon-stroke` | Réutiliser les types existants quand ils existent. |
| 2026-09-26 | 6 | Valeurs des semantics de la doc passées de `.12` à `0.12` | `value` = valeur résolue, recopiée à l'identique de tokens.css (D4). |
| 2026-09-26 | 6 | Commentaire de `getViolation` réécrit au passé (le trou est comblé) ; aucun autre texte FR/EN n'affirmait des erreurs volontaires | D8, relecture des textes. |
| 2026-09-26 | 7 | Vérification de la page par rendu serveur React (`ssr-tokens-fr-en.mjs`, `ssr-app.mjs` : Vite `ssrLoadModule` en middleware, aucun port ouvert) au lieu du navigateur | Serveur de dev refusé en session planifiée ; lancer un serveur via Bash contournerait ce refus. Couvre le compteur d'erreurs FR/EN et les `console.error` du rendu, pas les effets côté navigateur. |
