# Mission images-numeros — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « une image de partage par numéro du Magazine, fabriquée par la routine du lundi en même temps que le numéro ».

## Contexte
- La mission `apercus-partage` (PR 19, fusionnée) : le plugin Vite `scripts/share-previews.js` génère au build `dist/magazine/<date>/index.html` pour chaque numéro, avec l'image de rubrique commune `og-magazine.png` (`MAGAZINE_FIXED.image`, dans `collectMagazineNumeros`).
- Le build tourne sur Vercel, **sans Chrome** : impossible d'y fabriquer une image PNG sans nouvelle dépendance. Les robots de partage (LinkedIn, etc.) n'acceptent pas le SVG.
- Chrome est présent sur le Mac de Michael, où tournent les routines : `site-finitions` et `apercus-partage` ont rendu leurs images avec `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=<png> --window-size=1200,630 --virtual-time-budget=4000 file://<html>`.
- Source de l'image de rubrique : `missions/apercus-partage/og-magazine-source.html` (fond crème `#f3ebdc`, cadre encre `#241c16`, tampon corail `#dd5a3e` en SVG, Fraunces 900 / JetBrains Mono via Google Fonts).
- Routine du Magazine : `src/magazine/REDACTION.md` (§5 bis contrôles, §6 publication — le §6.3 dit d'ajouter « **uniquement** » le JSON du numéro). Permissions de la routine : `.claude/settings.json`.
- Numéros existants : `2026-09-27` (Nº 0 « Présentation ») et `2026-09-28` (Nº 1 « Prix en baisse, agents en expansion »).

## Objectif
Chaque numéro du Magazine a sa propre image de partage (numéro, date et titre du numéro), fabriquée sur le Mac par une commande unique que la routine du lundi lance, et utilisée automatiquement par l'aperçu de la page ; si l'image manque, l'image de rubrique sert de repli.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Script générateur local.** Nouveau script Node sans dépendance `scripts/og-numero.js`, usage : `node scripts/og-numero.js <AAAA-MM-JJ>`. Il lit `src/magazine/numeros/<date>.json`, remplit un gabarit HTML, l'écrit dans un fichier temporaire (`os.tmpdir()`), lance Chrome headless avec `child_process.execFileSync` (chemin Chrome ci-dessus, mêmes options), écrit `public/og/magazine/<date>.png` (1200×630), supprime le fichier temporaire, et affiche le chemin produit. Il échoue avec un message clair (code de sortie ≠ 0) si : argument absent ou mal formé, JSON introuvable ou sans `numero`/`date`/`titre.fr`, Chrome introuvable, PNG non produit. Option `--all` : génère l'image de chaque numéro qui n'en a pas encore (sert au rattrapage). Jamais lancé au build (Vercel n'a pas Chrome) : ce n'est **pas** un plugin Vite.

**D2 — Gabarit.** Gabarit HTML dans `scripts/og-numero-template.html`, avec des marqueurs `{{EYEBROW}}`, `{{TITRE}}`, `{{TAILLE_TITRE}}` remplacés par le script (valeurs échappées HTML). Mise en page dérivée de `og-magazine-source.html` : même fond, cadre, tampon, polices ; surtitre JetBrains Mono corail « LAB MAGAZINE · Nº <numero> · <JJ.MM.AAAA> » ; titre du numéro (`titre.fr`) en Fraunces 900 ; sous-titre fixe « Misran Labs — veille IA hebdomadaire ». Taille du titre selon la longueur : ≤ 30 caractères → 88px, ≤ 55 → 72px, au-delà → 58px ; le titre ne doit jamais sortir du cadre ni chevaucher le tampon (largeur max du bloc titre ~ 760px). Français uniquement.

**D3 — Aperçu : image du numéro si elle existe.** Dans `collectMagazineNumeros` de `scripts/share-previews.js` : si `public/og/magazine/<date>.png` existe, `image: 'og/magazine/<date>.png'`, sinon `og-magazine.png` (repli, avec un avertissement console `[share-previews] pas d'image pour le numéro <date>, image de rubrique utilisée`). Aucune autre modification du plugin.

**D4 — Rattrapage.** Générer les images des deux numéros existants avec `node scripts/og-numero.js --all` et les commiter (`public/og/magazine/2026-09-27.png`, `public/og/magazine/2026-09-28.png`).

**D5 — Routine du lundi.** Dans `src/magazine/REDACTION.md` :
- §5 bis, ajouter avant le build : « Générer l'image de partage : `node scripts/og-numero.js <date>` ; l'ouvrir (outil Read) et vérifier que le titre est lisible et ne sort pas du cadre. Si la commande échoue, continuer sans image (le site utilise l'image de rubrique) et le signaler dans la pull request. »
- §6.3, remplacer « uniquement le fichier `src/magazine/numeros/<date>.json` » par « uniquement `src/magazine/numeros/<date>.json` et, s'il a été généré, `public/og/magazine/<date>.png` ».
- §7 : ne rien changer.
Dans `src/magazine/FORMAT.md` : compléter la ligne ajoutée par `apercus-partage` pour mentionner l'image `public/og/magazine/<date>.png` produite par `node scripts/og-numero.js <date>` (facultative, repli sur l'image de rubrique).

**D6 — Permission de la routine.** La routine du lundi devra lancer `node scripts/og-numero.js <date>`. Claude ne peut pas modifier `.claude/settings.json` (garde-fou d'auto-modification, constaté au cadrage) : **ne pas y toucher**. Le RAPPORT donne à Michael la ligne à ajouter lui-même dans `allow` : `"Bash(node scripts/og-numero.js *)"`.

## Critères d'acceptation
1. `node scripts/og-numero.js 2026-09-28` produit `public/og/magazine/2026-09-28.png` en 1200×630 (`sips -g pixelWidth -g pixelHeight`) ; l'image est lisible, cohérente avec `og-magazine.png`, titre dans le cadre (contrôle visuel par la session, avec l'outil Read).
2. Titre long : test **temporaire** avec un JSON factice (titre de ~80 caractères, date fictive `2099-01-05`) dans `src/magazine/numeros/` → l'image montre le titre en 58px sur 2-3 lignes sans débordement ; JSON factice et PNG factice supprimés ensuite (jamais commités). Titre avec `&` et `"` correctement affiché.
3. Erreurs : `node scripts/og-numero.js` (sans argument), `node scripts/og-numero.js 2026-13-40` et une date sans JSON renvoient un message clair et un code de sortie ≠ 0 (`echo $?` noté dans PROGRESS.md).
4. `public/og/magazine/2026-09-27.png` et `2026-09-28.png` existent et sont commités.
5. `npm run build` : `dist/magazine/2026-09-28/index.html` a `og:image` et `twitter:image` = `https://misran-labs.vercel.app/og/magazine/2026-09-28.png` ; en retirant temporairement une image (sans commit), le build passe, avertit et retombe sur `og-magazine.png` pour ce numéro.
6. `REDACTION.md` et `FORMAT.md` modifiés selon D5, rien d'autre dans ces fichiers ; `.claude/settings.json` inchangé ; la ligne de D6 figure dans le RAPPORT.
7. Aucun changement de rendu du site (seuls les fichiers de D1–D6 changent, `src/` hors `.md` intact : `git diff --stat main` le montre). `npm run lint` : 0 erreur (état initial : 0).
8. Tout est commité sur `auto/images-numeros`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Images par idée P-NNN (même principe réutilisable pour la routine du dimanche).
- Image en anglais.
- Génération au build sur Vercel.
- Test réel dans LinkedIn Post Inspector : à faire par Michael après fusion, sur `https://misran-labs.vercel.app/magazine/2026-09-28`.
