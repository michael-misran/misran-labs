# Mission mascotte-fiole — RAPPORT

Terminée le 2026-09-30, entièrement par la tâche programmée (sans Michael). Modèles réellement utilisés : Opus 5.5 (cadrage), Sonnet (exécution, vérification, corrections), Haiku (sprites.js, vérification navigateur).

## Ce qui est fait

- `src/shell/mascotte/sprites.js` : grilles pixel art 16×16 de la Fiole et de la Fiole toxique (base + états `blink`/`look`/`sleep`/`happy`), copiées à l'identique de la maquette ; table lettre → token CSS (`PAL`) ; phrases FR/EN de la Fiole ; phrase secrète FR/EN de la Fiole toxique.
- `src/shell/mascotte/Fiole.jsx` : composant React — rendu SVG pixel art (×2, 32×32 px), clignement aléatoire, regard au survol, réaction au clic (tangage + bulle + particules), dodo après 30 s d'inactivité, secret du 10ᵉ clic (Fiole toxique, 4 s), bulle et particules en portail (`createPortal` dans `document.body`), réduction des animations (`prefers-reduced-motion`), nettoyage de toutes les minuteries au démontage.
- `src/shell/mascotte/fiole.css` : animations (`bob`, `breathe`, `wobble`, `spin`, `zz`, `pop`, `rise`), toutes en tokens CSS.
- `src/shell/Statusbar.jsx` : Fiole intégrée à droite de la barre d'état, desktop et mobile ; textes tronqués par ellipsis ; bordure supérieure remplacée par une ombre interne (voir « Décisions » ci-dessous).
- `npm run build` et `npm run lint` : passent, aucune erreur ni avertissement (identique à l'état initial).

## Pas fait (hors périmètre, voir SPEC)

- Réactions selon la page (journal sur /magazine, café sur /breves).
- Page 404 avec la Fiole toxique.
- Déclinaison en avatar réseaux sociaux (PNG 400×400).
- Compteur de clics conservé entre deux visites.

## Critères d'acceptation

| # | Critère | Résultat |
|---|---|---|
| 1 | Desktop 1280×900 : Fiole 32×32 px, rien de rogné, texte de déploiement entier | **Conforme.** Vérifié sur `/`, `/magazine`, `/breves`, `/projets`, `/lab/design-system`. Un dépassement réel de ~1 px sous le bas de la fenêtre a été détecté puis corrigé (voir Décisions) ; après correction, `getBoundingClientRect()` de la Fiole donne exactement `bottom: 900` pour une fenêtre de 900 px. Gap avec le texte de déploiement mesuré à 12 px. |
| 2 | Mobile 375×812 : Fiole visible, pas de chevauchement, pas de scroll horizontal | **Conforme.** `scrollWidth` = 375 = `innerWidth` ; rectangles Fiole/fil d'Ariane disjoints. |
| 3 | Clic → bulle avec phrase FR, dans la fenêtre, disparaît après ~2 s | **Conforme.** Vérifié directement (capture `captures/bulle-ouverte.jpg`). |
| 4 | 10 clics → Fiole toxique + « Tu l'as bien cherché ☠ » (FR), retour après ~4 s, recommence au 20ᵉ | **Conforme.** Vérifié directement (capture `captures/fiole-toxique.jpg`, classe `fiole-spin` observée). |
| 5 | 30 s d'inactivité → dodo (« z »), réveil au survol | **Conforme.** Vérifié directement (élément `.fiole-zzz` apparaît puis disparaît au survol). |
| 6 | Clavier : Tab atteint la Fiole, Entrée déclenche | **Conforme.** Bouton natif (`tabIndex: 0`), focus puis Entrée déclenchent la bulle. |
| 7 | Anglais : phrases et `aria-label` en anglais | **Conforme.** `aria-label` = « Flask, the Lab mascot », bulle = « Secret formula: coffee » / « You asked for it ☠ » testées. |
| 8 | Aucune erreur/avertissement console, pas d'erreur de minuterie au changement de page | **Conforme.** Vérifié sur plusieurs pages et après navigation avec minuteries actives. |
| 9 | `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/` ne renvoie rien | **Conforme.** |
| 10 | Captures jointes | **Conforme.** Voir `captures/` : `desktop-1280x900.jpg`, `mobile-375x812.jpg`, `bulle-ouverte.jpg`, `fiole-toxique.jpg`. |
| 11 | `npm run build` passe ; `npm run lint` sans nouvelle erreur | **Conforme.** |
| 12 | Tout commité sur `auto/mascotte-fiole`, rien sur `main`, rien poussé | **Conforme.** |

## Comment vérifier

```bash
git checkout auto/mascotte-fiole
npm run build
npx vite preview
```
Ouvrir http://localhost:4173, cliquer sur la Fiole en bas à droite de la barre d'état (bulle), cliquer 10 fois (Fiole toxique), attendre 30 s sans y toucher (dodo), basculer la langue (EN), redimensionner à 375 px de large.

## Décisions prises sans Michael

Détail complet dans `DECISIONS.md`. Deux points notables :

1. **Bordure de la barre remplacée par une ombre interne.** `border-top: 1px` (en `box-sizing: border-box`) réduisait la hauteur de contenu utile de la barre d'état de 32 px à 31 px, alors que la Fiole fait 32 px — elle dépassait de 0,5 à 1 px sous le bas de la fenêtre sur toutes les pages sauf l'accueil (visible d'abord par le sous-agent de vérification, confirmé et corrigé par la session principale). `boxShadow: inset` dessine le même trait sans consommer d'espace de boîte.
2. **Faux négatifs du sous-agent `verificateur`** sur les critères 3, 4 et 6 : il testait clic puis lecture du DOM dans deux appels d'outil séparés, dont le délai réseau dépassait souvent les 1,8 s d'affichage de la bulle. Re-testé en regroupant clic et lecture dans un seul appel (`browser_batch`) : tout fonctionne. Aucun changement de code nécessaire pour ces trois critères.

## Délégations

Détail complet dans `DELEGATIONS.md`. Sous-agents utilisés : `general-purpose` (Haiku) pour `sprites.js`, `verificateur` (Haiku) pour la vérification navigateur.

## Recommandations

- Le dépassement de 1 px corrigé ici (barre d'état) pourrait exister ailleurs sur le site partout où `border-top`/`border-bottom` est combiné à `height: var(--chrome-height)` en `box-sizing: border-box` et un contenu qui a besoin des 32 px pleins (ex. `Topbar.jsx` utilise le même motif avec `borderBottom`, mais n'a pour l'instant aucun élément aussi précisément dimensionné). À surveiller si un futur ajout dans le Topbar a besoin d'une taille exacte.
- Envisager, dans une mission future si Michael le souhaite, une ou deux des idées hors périmètre listées ci-dessus (notamment la page 404 avec la Fiole toxique, qui reprendrait directement les assets déjà en place).
