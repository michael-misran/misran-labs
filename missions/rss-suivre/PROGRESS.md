# Mission rss-suivre — PROGRESS

**Statut :** étape 6 terminée
**Prochaine action :** étape 7 (corrections éventuelles, vérification finale, critère 11)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main b6663e8)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30, sur auto/rss-suivre)
- `npm run build` : passe (21 pages d'aperçu, sitemap 22 URL)
- `npm run lint` : aucune erreur
- Confirme l'état initial, rien à corriger avant de commencer

## Étape 2 (2026-09-30, sur auto/rss-suivre)
- `scripts/rss.js` créé : écrit `dist/rss.xml`, `dist/magazine/rss.xml`, `dist/breves/rss.xml`, `dist/projets/rss.xml`.
- `scripts/share-previews.js` : `collectMagazineNumeros`/`collectBrevesJours`/`collectProjetsIdees` exportées, chacune renvoie en plus `raw` (le JSON brut) sans changer les champs déjà produits pour les aperçus et le sitemap ; `SITE_URL` et `escapeXml` exportés ; `closeBundle` appelle `writeRssFeeds` avec les pages déjà collectées.
- `index.html` : 4 balises `<link rel="alternate" type="application/rss+xml">` ajoutées dans `<head>`.
- `src/magazine/magazineText.js` : nouvelle fonction `formatDateLongNoWeekday` (date longue FR/EN sans jour de semaine), réutilisée par `rss.js` pour les titres « Brèves du {date} » — voir DECISIONS.md.
- Vérifications : `npm run build` passe ; `xmllint --noout` OK sur les 4 flux ; contenu relu (magazine, brèves) conforme à D1 ; `npx vite preview` sert `/rss.xml` et `/magazine/rss.xml` en `Content-Type: text/xml` (pas le HTML du site) ; `dist/index.html` et `dist/magazine/index.html` contiennent les 4 balises `alternate` ; `npm run lint` sans erreur.

## Étape 3 (2026-09-30, sur auto/rss-suivre)
- `src/shell/registry.js` : `/breves` et `/breves/:date` ont maintenant un libellé (icône 🗞) au lieu du chemin brut ; date valide → « Brèves — {date longue sans jour de semaine} », date inconnue → libellé de rubrique seul (comme Magazine/Projets). `/suivre` → icône ◉, libellé `suivreNav`. `KNOWN_ROUTES` réduit à `/suivre/?$` (les entrées `/breves` n'y servaient plus qu'au fallback temporaire, remplacé par le vrai libellé) ; commentaire mis à jour en conséquence.
- `src/i18n/ui.js` : nouvelles clés `navSectionSuivre`, `suivreNav`, `suivreNavItem` (fr/en) — `brevesNav` existait déjà. `suivreNavItem` sera utilisé par l'entrée de menu à l'étape 4.
- Vérifications : `npm run build` et `npm run lint` passent. Rendu dans le navigateur (onglet, barre d'état, `/nimporte-quoi` → 404) prévu à l'étape 6 (vérification groupée).

## Étape 4 (2026-09-30, sur auto/rss-suivre)
- `src/suivre/suivreText.js` : `FEEDS` (4 flux avec nom/rythme/URL absolue), `NETWORKS` (LinkedIn, GitHub) en tableau de données, `SUIVRE_TEXT` fr/en.
- `src/suivre/SuivrePage.jsx` : masthead (`MagazineMasthead`), titre + intro, section « Flux RSS » (`FeedRow` : nom, rythme, URL en `<code>` avec `overflowWrap: anywhere`, bouton Copier → `navigator.clipboard.writeText`, libellé « Copié ✓ » 2 s puis retour, repli silencieux en `catch`, lien Ouvrir), section « Réseaux » (`NetworkRow`, `target="_blank" rel="noreferrer"`), `CaseFooter`. Aucun formulaire, aucun service externe.
- `src/App.jsx` : route `suivre` lazy vers `SuivrePage`. `src/shell/Sidebar.jsx` : section « Suivre » ajoutée en dernière position (après Portfolio), `NavItem` icône ◉.
- Vérifications : `npm run build` et `npm run lint` passent (la page `/suivre` n'apparaît pas encore dans les pages d'aperçu ni le sitemap : c'est l'étape 5, D3/D6). Rendu réel dans le navigateur (Copier/Copié, 375 px, menu dans les 3 modes) prévu à l'étape 6.

## Étape 5 (2026-09-30, sur auto/rss-suivre — sous-agent general-purpose, Haiku)
- `scripts/share-previews.js` : `SUIVRE_FIXED` (titre « Suivre le Lab · Misran Labs », description = l'intro FR de D4) ajoutée après `BREVES_FIXED` ; entrée `/suivre` ajoutée dans le tableau `pages` de `closeBundle()`, juste après `/projets/fonctionnement`. Le sitemap se construit déjà à partir de ce tableau : `/suivre` y apparaît sans code supplémentaire.
- Diff relu par la session principale avant validation : conforme à la demande, rien d'autre modifié.
- Vérifications (session principale après relecture) : `npm run build` passe, sitemap 22 → 23 URL, `dist/suivre/index.html` a le bon `<title>`, `dist/sitemap.xml` contient `/suivre`, les 4 flux `.xml` n'y sont pas (D3), `npm run lint` sans erreur.

## Étape 6 (2026-09-30, sur auto/rss-suivre — sous-agent verificateur, Haiku)
- Vérification dans le navigateur via `npx vite preview --port 4321` (pas la preview « dev », refusée en routine). Tous les points OK :
  - a. `/rss.xml` et `/magazine/rss.xml` servent du XML brut, pas le HTML du site.
  - b. `/suivre` : titre, intro, 4 flux avec rythme et URL, bouton Copier → « Copié ✓ » (clic + lecture dans le même passage), LinkedIn/GitHub en `target="_blank"`, pas de défilement horizontal à 375 px, rendu desktop conforme.
  - c. Menu : section « Suivre » en dernière position (après Portfolio), entrée active sur `/suivre`, rendu correct déplié/replié/mobile.
  - d. Onglets : `/breves` → « Brèves · Misran Labs » ; `/breves/2026-09-30` → « Brèves — 30 septembre 2026 · Misran Labs » ; `/suivre` → « Suivre · Misran Labs » ; chemin inexistant → page 404 du site.
  - e. Aucune erreur ni avertissement en console sur les pages testées.
- Serveur `vite preview` arrêté par le sous-agent ; confirmé côté session principale (`ps aux` vide, working tree propre).
- Aucune correction nécessaire à ce stade.
