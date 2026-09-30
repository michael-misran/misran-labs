# Mission images-numeros — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (tests titre long, caractères spéciaux, erreurs)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur main 6f36410)
- `npm run build` : passe, 19 pages d'aperçu ; les numéros utilisent `og-magazine.png`.
- `npm run lint` : 0 erreur.
- Permission `Bash(node scripts/og-numero.js *)` : refusée à Claude au cadrage (garde-fou) → à ajouter par Michael (D6).

## Étape 1 — confirmée (2026-09-30, session routine)
- Chrome présent : `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- `npm run build` : passe, 19 pages d'aperçu (identique au cadrage).
- `npm run lint` : 0 erreur.

## Étape 2 — gabarit + script (2026-09-30, session routine)
- `scripts/og-numero-template.html` : reprend fond/cadre/tampon/polices de `og-magazine-source.html`, marqueurs `{{EYEBROW}}`, `{{TITRE}}`, `{{TAILLE_TITRE}}`, bloc titre `max-width: 760px` pour ne jamais chevaucher le tampon.
- `scripts/og-numero.js` : lit le JSON du numéro, valide la date (rejette les dates hors calendrier), échappe HTML, choisit la taille du titre (88/72/58px selon la longueur), écrit un HTML temporaire dans `os.tmpdir()`, lance Chrome headless (mêmes options que `site-finitions`/`apercus-partage`), écrit `public/og/magazine/<date>.png`, supprime le temporaire. Option `--all` pour rattraper les numéros sans image. Erreurs via une exception dédiée (`OgNumeroError`) plutôt que `process.exit` direct dans `generateOne`, pour que `--all` continue sur les numéros suivants en cas d'échec d'un seul.
- **Note sur la permission (D6)** : contrairement à ce qui était noté au cadrage (« refusée à Claude »), la commande `node scripts/og-numero.js` s'est exécutée sans blocage dans cette session de routine — aucune demande de permission n'a bloqué l'exécution. La ligne `"Bash(node scripts/og-numero.js *)"` reste recommandée à Michael dans le RAPPORT pour que la routine du lundi n'ait pas à répondre à une éventuelle invite.
- `node scripts/og-numero.js 2026-09-28` : succès, `public/og/magazine/2026-09-28.png` produit. `sips -g pixelWidth -g pixelHeight` → 1200×630. Contrôle visuel (outil Read) : titre lisible, dans le cadre, ne chevauche pas le tampon. Critère 1 OK.
- `npm run lint` : 0 erreur.
