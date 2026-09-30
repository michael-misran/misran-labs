# Mission images-numeros — PROGRESS

**Statut :** étape 5 terminée
**Prochaine action :** étape 6 (documentation D5, sous-agent Haiku)
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

## Étape 3 — tests critères 2 et 3 (2026-09-30, session routine)
- JSON factice temporaire `src/magazine/numeros/2099-01-05.json` (titre 93 caractères, avec `&`, `"` et apostrophe) → `node scripts/og-numero.js 2099-01-05` : succès, image générée à 58px, 1200×630 (`sips`). Contrôle visuel (outil Read) : le titre est sur 4 lignes (plus que les « 2-3 lignes » de la SPEC, le titre choisi étant un peu plus long que l'exemple à ~80 caractères) mais **reste entièrement dans le cadre, ne chevauche pas le tampon** — le critère réel (pas de débordement) est respecté. `&`, `"` et l'apostrophe s'affichent correctement (pas d'échappement visible, pas de rupture de balise).
- JSON et PNG factices supprimés immédiatement après contrôle (`rm src/magazine/numeros/2099-01-05.json public/og/magazine/2099-01-05.png`), `git status --porcelain` vérifié propre avant de continuer — jamais commités. Critère 2 OK.
- Erreurs (critère 3) :
  - `node scripts/og-numero.js` (sans argument) → `[og-numero] usage : node scripts/og-numero.js <AAAA-MM-JJ> | --all`, `echo $?` = 1.
  - `node scripts/og-numero.js 2026-13-40` → `[og-numero] date invalide : "2026-13-40" (attendu AAAA-MM-JJ, calendrier valide)`, `echo $?` = 1.
  - `node scripts/og-numero.js 2030-05-15` (date valide, sans JSON) → `[og-numero] numéro introuvable : .../src/magazine/numeros/2030-05-15.json`, `echo $?` = 1.
  Critère 3 OK.
- `npm run lint` : 0 erreur.

## Étape 4 — rattrapage --all (2026-09-30, session routine)
- `node scripts/og-numero.js --all` : génère `public/og/magazine/2026-09-27.png` (manquant), ignore `2026-09-28.png` (déjà présent, produit à l'étape 2). `sips` : 1200×630 pour les deux. Contrôle visuel (outil Read) des deux images : titres lisibles, dans le cadre. Critère 4 OK.

## Étape 5 — plugin D3 (2026-09-30, session routine)
- `collectMagazineNumeros` (`scripts/share-previews.js`) : si `public/og/magazine/<date>.png` existe, `image: 'og/magazine/<date>.png'`, sinon `og-magazine.png` + avertissement console.
- `npm run build` : `dist/magazine/2026-09-28/index.html` → `og:image` et `twitter:image` = `https://misran-labs.vercel.app/og/magazine/2026-09-28.png` (grep confirmé).
- Test de repli : `mv public/og/magazine/2026-09-28.png /tmp/...` (sans commit) → build passe, log `[share-previews] pas d'image pour le numéro 2026-09-28, image de rubrique utilisée`, `og:image` retombe sur `https://misran-labs.vercel.app/og-magazine.png`. Image remise en place ensuite, `git status --porcelain public/og/` vide (rien à commiter, état identique à avant le test). Critère 5 OK.
- `npm run lint` : 0 erreur.
