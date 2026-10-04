# Mission kiosque-annexes — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 8e mission : pages annexes et partage).

## Contexte
- **`/suivre`** (`src/suivre/SuivrePage.jsx`, `suivreText.js`, `SuivreBandeau.jsx`) liste les flux RSS (`FEEDS`) et les réseaux. Les noms des flux sont « Lab Magazine », « La Gazette du Lab », « Projets » et « Tout ». Le bulletin du kiosque (`/`) les reprend tels quels.
- **La 404** est `src/shell/Page404.jsx`, en style archive. Le build produit aussi `dist/404.html` via `scripts/share-previews.js`.
- **Les aperçus de partage** sont générés au build par `scripts/share-previews.js` (balises meta, sitemap). Les images OG des numéros viennent de `scripts/og-numero.js` et `scripts/og-numero-template.html`, avec encore les couleurs et polices de l'ancienne identité (crème, corail, Fraunces).
- **Les flux RSS** sont générés par `scripts/rss.js`. Leurs titres actuels sont « Lab Magazine », « La Gazette du Lab », Projets et Tout.
- `index.html` contient le `theme-color` et les meta par défaut.

## Objectif
Les dernières pages et tout ce qui sort du site (aperçus, images OG, flux) parlent la langue de la maison d'édition, avec des noms de titres cohérents partout.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** `src/suivre/SuivrePage.jsx`, `src/suivre/suivreText.js`, `src/suivre/SuivreBandeau.jsx`, `src/shell/Page404.jsx` (exception à la règle commune sur `src/shell/` : ce seul fichier), `scripts/share-previews.js`, `scripts/og-numero.js`, `scripts/og-numero-template.html`, `scripts/rss.js`, et `index.html` (balise `theme-color` uniquement : **ne pas toucher** au lien Google Fonts).

**D2 — Noms des titres harmonisés** dans `FEEDS` et dans les titres des flux RSS : « Le Magazine » / « The Magazine », « La Gazette du Lab » / « The Lab Gazette » (inchangé), « Les idées du Lab » / « The Lab's ideas » (au lieu de « Projets »), « Tout le kiosque » / « The whole kiosk » (au lieu de « Tout »). Les URL des flux ne changent pas : les abonnés existants ne perdent rien.

**D3 — `/suivre`, le bulletin d'abonnement.** Une grande page en forme de **bulletin à découper** : cadre en pointillés, ciseaux ✂ et titre « Bulletin d'abonnement » en `--font-bois`. Chaque flux est une ligne à cocher ☐ (☒ au survol), avec le nom du titre **dans la typo de ce titre** (Gazette en gothique avec G rouge, Magazine en Playfair italique bleu, idées en machine à écrire verte, tout le kiosque en lettres de bois), son rythme, son URL copiable et le lien du flux. Les réseaux existants viennent dessous, en « Autres façons de nous lire ». `SuivreBandeau` (s'il est encore utilisé ailleurs) adopte le même style de coupon.

**D4 — La 404, l'avis de recherche.** Une affiche « AVIS DE RECHERCHE » façon western, en lettres de bois (Rye et Ultra), sur papier : « PAGE DISPARUE », l'adresse demandée tapée à la machine, « Dernière fois vue : nulle part », « Récompense : un café », et des liens vers le kiosque `/` et vers les 4 titres. Le contenu de `dist/404.html` produit par `share-previews.js` reste cohérent (titre et description).

**D5 — Aperçus et images OG.** `og-numero-template.html` passe aux couleurs de la maison : papier `#f6f1e6`, encre `#16120e`, bandeau du titre concerné (bleu pour le Magazine, rouge pour la Gazette si des images de Gazette existent). Les polices sont **libres et déjà utilisées** : Playfair Display pour le Magazine, UnifrakturMaguntia pour la Gazette, Oswald pour les étiquettes. Le chargement reste celui qu'utilise déjà le script (lire `og-numero.js` avant de changer quoi que ce soit). Les titres et descriptions par défaut de `share-previews.js` parlent de « Misran Labs, maison d'édition indépendante » sans changer les URL ni le sitemap. `theme-color` passe à `#16120e`.

## Critères d'acceptation
1. Le diff ne touche que les fichiers de D1 et `missions/kiosque-annexes/`.
2. `FEEDS` contient les 4 noms de D2 en fr et en en. Après `npm run build`, `dist/magazine/rss.xml` a pour `<title>` « Le Magazine », `dist/projets/rss.xml` « Les idées du Lab » et `dist/rss.xml` « Tout le kiosque ». Les URL des flux ne changent pas.
3. `/suivre` affiche les 4 flux, chacun avec son lien vers son `path`, et les réseaux existants. Aucune erreur console. Pas de débordement à 375 px.
4. `/une-page-qui-n-existe-pas` affiche « AVIS DE RECHERCHE », l'adresse demandée, et des liens vers `/`, `/breves`, `/magazine`, `/jeux` et `/lab`.
5. Le build régénère les images OG sans erreur. Une image OG de numéro du Magazine, ouverte avec l'outil Read, montre la palette de la maison et le bandeau bleu.
6. `index.html` : `theme-color` vaut `#16120e`, et le lien Google Fonts est identique à celui de `refonte-kiosque`.
7. En anglais, aucun texte de `/suivre` ni de la 404 ne reste en français.
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/kiosque-annexes`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- Le bulletin de la page d'accueil (`src/kiosque/`), qui prendra automatiquement les nouveaux noms de `FEEDS`.
- Changer les URL, le sitemap ou la logique de génération des aperçus.
- Supprimer `SuivreBandeau` s'il devient inutilisé (mission de finitions).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.

## Ajout du 2026-10-04 (après le cadrage)
Le titre gothique passera de UnifrakturMaguntia à **Germanica** (police de Paul Lloyd, « 100 % Free » sur dafont), via la PR #44 vers `refonte-kiosque`. Partout où cette mission écrit en `--font-gothique`, ajouter `wordSpacing: 'var(--font-gothique-espace, normal)'`. L'espace entre les mots de Germanica est très large, et ce token le resserre. Avec UnifrakturMaguntia, le repli `normal` garde l'espacement actuel.
