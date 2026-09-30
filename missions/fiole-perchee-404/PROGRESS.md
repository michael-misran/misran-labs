# Mission fiole-perchee-404 — PROGRESS

**Statut :** mission terminée (RAPPORT.md écrit, étape 8)
**Prochaine action :** aucune — en attente de clôture (session interactive avec Michael)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main b8e7ac3)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30)
- `npm run build` : passe (21 pages d'aperçu générées, sitemap 22 URL)
- `npm run lint` : aucune erreur
- Rien à corriger, état identique au cadrage.

## Étape 2 (2026-09-30)
- `Fiole.jsx` : props `scale` (défaut 3), `variant` (`'fiole'` | `'toxique'`, défaut `'fiole'`), `sleeps` (défaut `true`).
- `PX` constant supprimé, remplacé par la prop `scale` partout (rendu SVG, `--fiole-bob` en CSS, calcul de la taille des particules).
- `fiole.css` : `fiole-bob` utilise `var(--fiole-bob, 2px)` au lieu de `-2px` fixe.
- Nouvelle réaction `reactToxicPage` (clic sur la Fiole toxique de la 404, D7) : tangage + `happy` + 6 particules `poison` + bulle avec une phrase de `SPRITES.toxique.phrases` (5 FR/EN ajoutées dans `sprites.js`).
- `aria-label` dépend du variant (`ARIA_LABEL_TOXIQUE` pour `variant="toxique"`).
- `wake()` ne programme plus l'endormissement si `sleeps={false}`.
- Comportement de la barre (variant par défaut `'fiole'`) inchangé : clignement, survol, 10ᵉ clic → secret toxique, dodo — sauf l'échelle, désormais 3 par défaut (48 px) au lieu de 2 (D1, D5).
- `npm run build` et `npm run lint` : passent.

## Étape 3 (2026-09-30)
- `tokens.css` : `--mascotte-overhang` (component) = `calc(45px + var(--space-sm))` (45 px = 48 px de Fiole − 3 px de chevauchement), à côté de `--mobile-nav-offset`.
- `Shell.jsx` : `padding-bottom: var(--mascotte-overhang)` sur `.shell-main`, desktop et mobile (aucune modification page par page).
- `Statusbar.jsx` : la Fiole n'est plus un item flex ; enveloppe `.fiole-perch` en `position: absolute; right: 24px; bottom: calc(var(--chrome-height) - 3px); z-index: 20; pointer-events: none`, avec une ombre `.fiole-shadow`. Le texte de déploiement retrouve toute la largeur (D2).
- `fiole.css` : `.fiole-btn { pointer-events: auto }` (D4) et surtout `vertical-align: bottom` — sans quoi l'alignement de base par défaut d'un inline-flex réservait ~3 px de descente de police sous le bouton, faussant le chevauchement de 3 px au pixel près (trouvé en vérifiant dans le navigateur, voir DECISIONS.md).
- Vérifié dans le navigateur (`npm run build` + `npx vite preview`, session de routine, pas de preview « dev ») sur `/` et `/lab/design-system`, desktop 1280×900 et mobile 375×812 : Fiole 48×48 px, bord droit à 24 px (exact), chevauchement 3 px (exact) sur la barre, textes de la barre disjoints du rectangle de la Fiole, clic à 4 px à gauche de la Fiole atteint `.shell-main`, bas de défilement de `/lab/design-system` sans chevauchement, pas de défilement horizontal en mobile, menu mobile ouvert → `elementFromPoint` au centre de la Fiole renvoie le fond du menu, bulle du 1ᵉʳ clic visible au-dessus de la Fiole dans la fenêtre.
- `npm run build` et `npm run lint` : passent.

## Étape 4 (2026-09-30)
- `src/shell/Page404.jsx` : nouveau composant (D6), centré dans la zone de contenu, max-width 560px, tokens uniquement. Fiole toxique `scale={8}` `variant="toxique"` `sleeps={false}` sur une ligne « paillasse » (`border-bottom`) avec `.fiole-shadow` réutilisée. Eyebrow mono, titre, texte, chemin (`useLocation().pathname`), trois `LinkButton` du kit (`/`, `/magazine` en ghost, `/breves` en ghost) (D7 comportement géré par Fiole.jsx à l'étape 2). `useEffect` pose `<meta name="robots" content="noindex">` à l'affichage et le retire au démontage (D9).
- `src/i18n/ui.js` : clés `notFound404Tab/Eyebrow/Title/Body/BackLab/Magazine/Breves`, FR/EN.
- `src/App.jsx` : route `path="*"` → `Page404` (lazy), enfant du Shell, en dernière position.
- `src/lab/ProjectPage.jsx`, `src/lab/ProjectDemoPage.jsx` : le petit texte + lien (`projectNotFound`/`demoNotFound`) est remplacé par `<Page404 />`. Ces clés i18n (et `backToLabLink`, `backToProjectLink`) ne sont donc plus utilisées nulle part — laissées en place (ne pas nettoyer i18n, comme demandé en SPEC).
- `src/shell/registry.js` : `resolveRouteMeta()` renvoie `{ icon: '☠', label: t(lang,'notFound404Tab') }` pour `/lab/<inconnu>` et pour toute URL non gérée par le reste de la fonction. **Décision** : `/breves` et `/breves/:date` n'ont pas de cas dédié dans ce fichier (déjà le cas avant la mission, hors périmètre) et retombaient dans le même `return` générique que les vraies 404 ; ajouté un tableau `KNOWN_ROUTES` (regex) pour les distinguer et ne pas leur donner à tort le libellé « Page introuvable » — voir DECISIONS.md.
- Vérifié dans le navigateur (`npx vite preview`) : `/nimporte-quoi` et `/lab/inconnu` → Page404 avec Fiole toxique 128px, textes EN (langue par défaut du navigateur de test), chemin affiché, 3 boutons, onglet et barre d'état « Page not found », `<meta name="robots" content="noindex">` présent ; clic sur la Fiole toxique → tangage, 6 particules poison, bulle avec une des phrases toxiques (« Who shook the flask? ») ; Fiole de la barre (bas droite) reste la Fiole normale, inchangée. `/magazine/1999-01-01` : en-tête et textes de rubrique inchangés, onglet et barre d'état restent « Magazine » (pas de régression sur les URL connues sans ressource).
- `npm run build` et `npm run lint` : passent.

## Étape 5 (2026-09-30)
- Délégué à `general-purpose` (Haiku 4.5) : ajout de `<Fiole scale={4} variant="toxique" sleeps={false} />` (import `../shell/mascotte/Fiole`) juste au-dessus du `<h1>` dans les trois `NotFound` locaux (`src/magazine/MagazineIssue.jsx`, `src/breves/BrevesJour.jsx`, `src/projets/ProjetIdee.jsx`). Diff identique dans les 3 fichiers, revu par la session principale avant `npm run build`/`npm run lint`, puis vérifié dans le navigateur sur `/magazine/1999-01-01`, `/breves/1999-01-01`, `/projets/P-999` : Fiole toxique 64px visible, alignée à gauche au-dessus du titre de chaque rubrique, en-tête et textes de rubrique inchangés.
- `npm run build` et `npm run lint` : passent.

## Étape 6 (2026-09-30)
- Délégué à `verificateur` (Haiku 4.5) : vérification des critères d'acceptation 1 à 11 et 13, captures dans `missions/fiole-perchee-404/captures/` (`statusbar-fiole-perchee.jpg`, `mobile-375x812.jpg`, `404-desktop.jpg`, `404-bulle.jpg`, `404-rubrique.jpg`).
- Tous les points rapportés **conformes** : dimensions et position de la Fiole de la barre (48×48px, 24px du bord, pas de chevauchement avec le texte ni la scrollbar), pas de chevauchement en bas de défilement sur `/magazine` et `/lab/design-system`, clic à 4px de la Fiole atteint le contenu, mobile 375×812 sans défilement horizontal et menu au-dessus de la Fiole, bulle au clic sur la Fiole normale, page 404 conforme en FR (`/nimporte-quoi`, `/lab/inconnu`) avec Fiole toxique 128px et meta `noindex`, réaction de la Fiole toxique (bulle + 6 particules poison), pages NotFound de rubrique avec Fiole toxique 64px au-dessus du titre, textes 404 en anglais après changement de langue, aucune erreur console.
- Point non re-testé par l'agent (seulement « confirmé dans le code ») : disparition du `noindex` après navigation vers `/`. Re-testé moi-même (`npx vite preview`, un seul `javascript_tool` : présence avant clic sur « Retour au Lab », absence après) → **conforme**.
- `npm run build` et `npm run lint` : passent (déjà vérifiés à l'étape 5, aucun changement de code à cette étape).

## Étape 7 (2026-09-30)
- Aucune correction nécessaire : tous les points de l'étape 6 étaient conformes.
- Vérification finale : `npm run build` passe, `npm run lint` sans erreur, `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/ src/shell/Page404.jsx` ne renvoie rien (critère 12 conforme).
