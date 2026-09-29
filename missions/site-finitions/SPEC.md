# Mission site-finitions — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-29. Brief de Michael : « les deux » (réparer les petits défauts du site : icône d'onglet, aperçu de partage, langue, vitesse de chargement, doublon du jeu).

## Contexte
- `index.html` : icône d'onglet `/vite.svg` (logo Vite par défaut), `lang="en"` alors que la langue par défaut du site est le français (`src/shell/LanguageProvider.jsx` met ensuite `lang` à jour selon la langue choisie), aucune `meta description`, aucun Open Graph ni Twitter card : un lien partagé (LinkedIn, messageries) s'affiche sans titre propre, sans texte ni image.
- Build : un seul fichier JS de **760,13 kB (gzip 233,87 kB)** + CSS 6,55 kB, avertissement Vite « chunks larger than 500 kB ». Cause principale : `src/App.jsx` importe toutes les pages en statique, et `src/lab/projects.js` importe en statique tous les composants de projets (DesignSystemMultimarques, DesignSystem, LabTokens, TheLostCauldronGame, WorkflowSolo, UtilisationIA, AuditTokens, GameDemo, GameDemoV2, ToolProcessTemplate, SessionReplay, CVModule).
- `public/games/` : `lost-cauldron-game` (36 Mo) et `lost-cauldron-game-v0.2` (36 Mo). **Les deux sont utilisés** : `src/lab/GameDemo.jsx` (démo v1) et `src/lab/GameDemoV2.jsx` (démo v2), liés depuis `TheLostCauldronGame.jsx`.
- URL de production : `https://misran-labs.vercel.app`.

## Objectif
Le site a une icône d'onglet à son image, un aperçu propre quand on partage un lien, déclare le français, et charge nettement moins de JavaScript à la première visite, sans aucun changement visible du rendu.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Favicon « M ».** `public/favicon.svg` : cercle corail `#dd5a3e` (anneau extérieur épais + anneau intérieur fin, comme le tampon de la couverture du Lab Magazine), lettre « M » en Fraunces 900 corail centrée. Le SVG ne doit pas dépendre d'une police web : convertir le « M » en tracé (`<path>`) ou utiliser une pile `Georgia, serif` en gras si la conversion n'est pas possible sans dépendance (le noter dans DECISIONS). Ajouter aussi `public/apple-touch-icon.png` 180×180 (fond crème `#f3ebdc`, même motif). Supprimer `public/vite.svg` s'il n'est plus référencé nulle part.
**D2 — Aperçu de partage.** Dans `index.html` : `meta name="description"`, `og:title`, `og:description`, `og:type=website`, `og:url=https://misran-labs.vercel.app/`, `og:image=https://misran-labs.vercel.app/og-image.png` (1200×630), `og:locale=fr_FR` + `og:locale:alternate=en_US`, `twitter:card=summary_large_image`, `theme-color` crème. Titre : « Misran Labs — le laboratoire de Michael Misran ». Description (≤ 160 caractères) : vitrine de designer UX/UI et développeur fullstack, expériences IA, design system, magazine et idées. Pas de nouvelle donnée personnelle (pas d'e-mail, pas de téléphone).
**D3 — Image de partage.** `public/og-image.png` 1200×630 dans l'identité du site (fond crème `#f3ebdc`, cadre fin encre, « Misran Labs » en Fraunces 900, sous-titre en JetBrains Mono, tampon corail). Fabrication sans nouvelle dépendance npm : écrire un SVG/HTML source dans `missions/site-finitions/`, puis le rendre en PNG avec Chrome headless (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --screenshot=… --window-size=1200,630 …`) ou `sips`. Garder la source dans le dossier de la mission.
**D4 — Découpage du JS.** `React.lazy` + `Suspense` pour les pages de `src/App.jsx` (sauf `Shell`, `LanguageProvider` et la page d'accueil `ArchiveHome`, chargés d'office), **et** chargement paresseux des composants de projets dans `src/lab/projects.js` (même API pour les appelants : si un composant est utilisé comme `<p.component />`, un `lazy(() => import(…))` convient ; entourer les points de rendu d'un `Suspense`). Repli de `Suspense` : un bloc vide de hauteur raisonnable ou le texte mono existant du site — **pas** de spinner nouveau, pas de saut de mise en page visible. Ne pas utiliser `manualChunks` sauf si le découpage par import dynamique ne suffit pas.
**D5 — Jeu : on garde les deux versions.** Les deux dossiers sont référencés (démo v1 et démo v2) : ne rien supprimer. Une éventuelle optimisation des assets du jeu est hors périmètre.
**D6 — `lang="fr"`** dans `index.html` (valeur initiale ; `LanguageProvider` continue de la mettre à jour).

## Critères d'acceptation
1. `index.html` : plus aucune référence à `vite.svg` ; `lang="fr"` ; balises de D2 présentes ; `grep -rn "vite.svg" index.html src public` ne renvoie rien (hors `node_modules`).
2. `public/favicon.svg`, `public/apple-touch-icon.png` (180×180) et `public/og-image.png` (1200×630, vérifié avec `sips -g pixelWidth -g pixelHeight`) existent ; l'image de partage est lisible (capture vérifiée par la session).
3. Build : le fichier JS chargé par la page d'accueil (entrée `index-*.js`) passe **sous 350 kB** minifié (avant : 760,13 kB), et l'avertissement « chunks larger than 500 kB » disparaît ou ne concerne qu'un chunk non chargé à l'accueil (le justifier dans DECISIONS). Mesures avant/après dans RAPPORT.md.
4. Rendu identique : `/`, `/lab/design-system`, `/lab/lab-tokens`, `/lab/audit-tokens`, `/lab/lost-cauldron-game`, `/lab/lost-cauldron-game/demo`, `/magazine`, `/projets` s'affichent sans erreur console, en FR et en EN, avec le même contenu qu'avant (capture ou lecture de page par le verificateur, avant/après). Navigation d'une page à l'autre par la barre latérale : pas d'écran blanc.
5. `npm run build` passe ; `npm run lint` : 0 erreur (état initial : 0).
6. Tout est commité sur `auto/site-finitions`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Pré-rendu HTML des pages pour le référencement (SSG) — à décider avec Michael.
- Optimisation / compression des 72 Mo du jeu Lost Cauldron.
- Section publique « Carnet » (`/carnet`) — mission séparée, cadrée avec Michael.
- Balises Open Graph propres à chaque page (demande un rendu côté serveur ou un pré-rendu).
