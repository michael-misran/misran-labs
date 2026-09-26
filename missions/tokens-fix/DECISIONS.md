# Mission tokens-fix — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D9 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-26 | 1 | Ajout de `public/games` aux `globalIgnores` d'ESLint | ESLint restait bloqué indéfiniment sur les bundles minifiés des jeux (315 Ko chacun) ; sans ça, aucune session autonome ne peut valider le critère 4. Ce sont des builds tiers, pas du code source. |
| 2026-09-26 | 2 | Snapshots relevés par Chrome headless (`snapshot.sh` + `token-snapshot.html`, page statique qui charge tokens.css) au lieu du preview « dev » | Le lancement du serveur de dev est refusé en session planifiée (personne pour approuver). `getComputedStyle` reste la source ; les valeurs des custom properties ne dépendent que de tokens.css. Normalisation : espaces compressés, espaces autour des virgules retirés. |
| 2026-09-26 | 3 | Ordre dans la section 1 : couleurs → alpha → ombre → dimensions → polices → texte ; commentaire d'en-tête de la section élargi (« valeurs brutes » au lieu de « palette brute ») | D7 : groupés par famille, commentaire devenu faux sinon. |
