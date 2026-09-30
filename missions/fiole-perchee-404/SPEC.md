# Mission fiole-perchee-404 — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « la 404 et aussi je trouve que la fiole ne respire pas assez là où elle est ». Choix de Michael pour la place : **Fiole perchée sur la barre** (plus grande, assise sur le bord haut de la barre d'état, comme sur une étagère).

## Contexte
- Mission précédente `mascotte-fiole` (fusionnée, PR #24) : `src/shell/mascotte/` (`sprites.js`, `Fiole.jsx`, `fiole.css`), Fiole en ×2 (32 px) **dans** la barre d'état de 32 px (`src/shell/Statusbar.jsx`, footer en `overflow: visible`, textes en ellipsis). Elle touche le haut et le bas de la barre : elle ne « respire » pas.
- Bulle et particules déjà rendues en portail (`position: fixed`), calculées depuis `getBoundingClientRect()` : elles suivront la nouvelle position.
- Zone de contenu : `<main className="shell-main">` dans `src/shell/Shell.jsx` (l. ~130), `overflowY: auto` (sa barre de défilement est au bord droit, juste au-dessus de la Fiole).
- Pages introuvables aujourd'hui :
  - URL sans route (`/nimporte-quoi`) : rien ne s'affiche dans la zone de contenu (`src/App.jsx` n'a pas de route `*`) ; Vercel réécrit tout vers `index.html` (`vercel.json`), donc c'est à React d'afficher la 404.
  - `/lab/<inconnu>` : petit texte `projectNotFound` + lien (`src/lab/ProjectPage.jsx` l. 11-20) ; `ProjectDemoPage.jsx` : à vérifier.
  - `/magazine/<date inconnue>`, `/breves/<date inconnue>`, `/projets/<id inconnu>` : chacun a son composant `NotFound` local, avec son en-tête de rubrique (à garder).
- Titre d'onglet et libellé de la barre d'état : `resolveRouteMeta()` dans `src/shell/registry.js` ; pour une URL inconnue il renvoie le chemin brut.
- État initial (2026-09-30, `main` b8e7ac3) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
1. La Fiole de la barre d'état est plus grande et perchée sur le bord haut de la barre, avec de l'air autour.
2. Une vraie page 404 « Cette page a été dissoute », avec une grande Fiole toxique interactive, pour toute URL inconnue.

## Décisions (tranchées, ne pas rediscuter)

### A. Fiole perchée
**D1 — Taille ×3 (48×48 px).** Même grille 16×16, même rendu pixel. Le `bob` passe à −3 px (1 pixel du sprite à ×3). Rendre l'échelle paramétrable (prop `scale`, défaut 3 pour la barre) : elle sert aussi à la 404 (D6).

**D2 — Position.** La Fiole est posée **sur** le bord haut de la barre d'état : le bas de son dessin (ligne 15 de la grille, le contour du fond) chevauche la barre de **3 px** (1 pixel du sprite), comme un objet posé sur une étagère ; le reste dépasse au-dessus, dans le coin bas-droit de la zone de contenu. Bord droit de la Fiole à **24 px** du bord droit de la fenêtre, pour ne jamais recouvrir la barre de défilement de la zone de contenu. Garder la petite ombre au sol (`.shadow` de la maquette, ou équivalent) posée sur le bord de la barre si elle est déjà présente ; sinon en ajouter une discrète (ellipse `--primitive-ink-900-a12`), c'est elle qui donne l'effet « posée ».
Le texte de déploiement (desktop) n'est plus concurrencé par la Fiole : il retrouve sa place d'origine à droite de la barre (padding droit normal) ; la Fiole est au-dessus de lui, sans le masquer (la Fiole ne descend que de 3 px dans la barre, au-dessus du texte : vérifier qu'aucune lettre n'est couverte, sinon décaler le texte vers la gauche de la largeur de la Fiole + 12 px et le noter dans DECISIONS).

**D3 — Le contenu ne passe pas sous la Fiole.** Nouvelle variable CSS `--mascotte-overhang` dans `src/styles/tokens.css` (niveau component, à côté de `--mobile-nav-offset`) = hauteur qui dépasse au-dessus de la barre + une marge `--space-sm`. Elle sert à la fois au positionnement de la Fiole et à un `padding-bottom` de `<main className="shell-main">` (desktop et mobile), pour qu'en bas de défilement la dernière ligne de contenu soit au-dessus de la Fiole. Pas de modification page par page.

**D4 — Superpositions.** La Fiole ne capte les clics que sur son propre bouton (pas de conteneur invisible qui bloque le contenu : `pointer-events: none` sur tout enveloppe, `auto` sur le bouton). Menu mobile ouvert : la Fiole passe **sous** le menu et son fond (z-index). La Fiole ne crée aucun défilement horizontal.

**D5 — Pas d'autre changement de comportement.** Clignement, survol, clic, dodo, secret du 10ᵉ clic, bulle, particules, réduction des animations : inchangés (hormis l'échelle). Vérifier que la bulle et les particules partent bien du nouvel emplacement.

### B. Page 404
**D6 — Composant `src/shell/Page404.jsx`**, rendu dans le Shell (sidebar, topbar, barre d'état visibles), centré verticalement et horizontalement dans la zone de contenu, max-width 560 px, styles via tokens uniquement (police titre `--font-heading`, labels `--font-mono`, texte `--font-body`, couleurs sémantiques). De haut en bas :
1. Grande **Fiole toxique** ×8 (128×128 px), interactive (voir D7), posée sur une ligne horizontale type paillasse (`border-bottom` `--border-regular` `--border`, largeur ~200 px) avec son ombre.
2. Label mono : FR « ERREUR 404 · ÉCHANTILLON INTROUVABLE » / EN « ERROR 404 · SAMPLE NOT FOUND ».
3. Titre : FR « Cette page a été dissoute. » / EN « This page has been dissolved. »
4. Texte : FR « Elle a sans doute réagi avec autre chose. Rien de grave : le reste du Lab est intact. » / EN « It probably reacted with something else. No harm done: the rest of the Lab is intact. »
5. Le chemin demandé en mono discret (`location.pathname`, avec `overflow-wrap: anywhere`).
6. Trois liens (style bouton du site s'il existe dans `src/design-system/kit/`, sinon liens mono `--primary`) : « ← Retour au Lab » (`/`), « Lire le Magazine » (`/magazine`), « Les Brèves du jour » (`/breves`) ; EN : « ← Back to the Lab », « Read the Magazine », « Today's Briefs ».
Textes FR/EN dans `src/i18n/ui.js` (clés préfixées `notFound404…`), selon `useLanguage()`.

**D7 — Fiole toxique de la 404.** Réutiliser le composant de `Fiole.jsx` (props, par ex. `variant="toxique"`, `scale={8}`, `sleeps={false}`), pas de copie du code. Comportement : clignement aléatoire (frame `blink` de la toxique), regard au survol (`look`), clic → tangage + orbites allumées (`happy`) 650 ms + particules `poison` + bulle avec une phrase au hasard parmi (à ajouter dans `sprites.js`, `toxique.phrases`) :
FR « Ne pas boire. », « Toxique… mais sympa », « Danger : curiosité », « Qui a secoué la fiole ? », « Poison maison » ;
EN « Do not drink. », « Toxic… but friendly », « Danger: curiosity », « Who shook the flask? », « Homemade poison ».
Pas de dodo, pas de secret du 10ᵉ clic sur la 404. `aria-label` FR « Fiole toxique » / EN « Toxic flask ». La Fiole de la barre d'état reste la Fiole normale sur la 404.

**D8 — Où s'affiche la 404.**
- Route `path="*"` dans `src/App.jsx`, enfant du Shell (lazy comme les autres pages).
- `/lab/<slug inconnu>` (`ProjectPage.jsx`) et, si le cas existe, `/lab/<slug inconnu>/demo` (`ProjectDemoPage.jsx`) : rendent `Page404` à la place du petit texte actuel. Si la clé i18n `projectNotFound` n'est plus utilisée nulle part, la laisser (ne pas nettoyer i18n) et le noter.
- Les `NotFound` des rubriques (Magazine, Brèves, Projets) **gardent** leur en-tête et leurs textes, mais affichent la Fiole toxique interactive en ×4 (64 px) au-dessus de leur titre, alignée à gauche comme le titre.

**D9 — Titre et référencement.** Pour une URL qui ne correspond à aucune route (et pour `/lab/<inconnu>`), `resolveRouteMeta()` renvoie `{ icon: '☠', label: t(lang, 'notFound404Tab') }` avec FR « Page introuvable » / EN « Page not found » → onglet « Page introuvable · Misran Labs », même libellé dans la barre d'état. Les routes connues gardent leur libellé actuel. `Page404` ajoute `<meta name="robots" content="noindex">` dans `<head>` à l'affichage et le retire au démontage.

## Critères d'acceptation
1. Desktop 1280×900 sur `/`, `/magazine`, `/breves`, `/projets`, `/lab/design-system` : la Fiole fait 48×48 px ; son `bottom` = haut de la barre d'état + 3 px (± 1 px) ; son bord droit est à 24 px (± 1) du bord droit de la fenêtre ; elle ne recouvre pas la barre de défilement de `.shell-main` ; aucune lettre des textes de la barre n'est sous la Fiole (rectangles des `<span>` de texte disjoints du rectangle de la Fiole, hors 3 px de chevauchement de la barre si aucun texte n'y est).
2. En bas de défilement de `/magazine` et `/lab/design-system` : le dernier élément de texte de la page ne chevauche pas la Fiole.
3. Un clic juste à gauche de la Fiole (à 4 px de son bord) atteint bien le contenu (`document.elementFromPoint` ne renvoie pas un élément de la mascotte).
4. 375×812 sur les mêmes pages : Fiole 48 px visible, pas de défilement horizontal, menu ☰ ouvert → la Fiole est sous le menu (`elementFromPoint` au centre de la Fiole renvoie le menu ou son fond).
5. Clic sur la Fiole de la barre : bulle au-dessus de la Fiole, dans la fenêtre ; 10ᵉ clic : Fiole toxique ; comportements de la mission précédente inchangés.
6. `/nimporte-quoi`, `/lab/inconnu` : page 404 avec la Fiole toxique 128 px, les textes FR, le chemin demandé, les 3 liens fonctionnels ; onglet « Page introuvable · Misran Labs » ; `<meta name="robots" content="noindex">` présent, et absent après navigation vers `/`.
7. Clic sur la Fiole de la 404 : tangage, orbites allumées, bulle avec une des 5 phrases toxiques, particules poison ; pas de dodo après 30 s.
8. `/magazine/1999-01-01`, `/breves/1999-01-01`, `/projets/P-999` : en-tête et textes de rubrique inchangés + Fiole toxique 64 px au-dessus du titre.
9. En anglais : textes de la 404, phrases toxiques et `aria-label` en anglais.
10. 375×812 sur `/nimporte-quoi` : 404 lisible, pas de défilement horizontal.
11. Aucune erreur ni avertissement en console pendant ces tests.
12. `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/ src/shell/Page404.jsx` ne renvoie rien.
13. Captures jointes au RAPPORT : barre desktop (Fiole perchée), 375 px, 404 desktop, 404 avec bulle, 404 d'une rubrique.
14. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
15. Tout est commité sur `auto/fiole-perchee-404`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Vrai code HTTP 404 côté Vercel (aujourd'hui toutes les URL répondent 200 via la réécriture vers `index.html`).
- Réactions de la Fiole selon la page.
- Avatar réseaux sociaux.
