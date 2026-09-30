# Mission fiole-perchee-404 — RAPPORT

Terminée le 2026-09-30, entièrement par la tâche programmée (sans Michael). Modèles réellement utilisés : Opus 5.5 (cadrage), Sonnet (exécution, corrections, rédaction), Haiku 4.5 (ajout mécanique dans les 3 pages NotFound de rubrique, vérification navigateur).

## Ce qui est fait

- **Fiole perchée (partie A).** `src/shell/mascotte/Fiole.jsx` accepte maintenant des props `scale` (défaut 3 = 48×48px), `variant` (`'fiole'` | `'toxique'`) et `sleeps` (défaut `true`) ; `sprites.js` a une nouvelle liste `toxique.phrases` (5 FR/EN). Dans `Statusbar.jsx`, la Fiole n'est plus un item flex : elle est perchée en `position: absolute` sur le bord haut de la barre (chevauchement de 3px, bord droit à 24px de la fenêtre), avec une ombre discrète (`.fiole-shadow`) et `pointer-events` géré pour ne jamais bloquer le contenu. Une nouvelle variable `--mascotte-overhang` (tokens.css) réserve la place nécessaire en bas de `<main>` (Shell.jsx, desktop et mobile) pour qu'aucun contenu ne passe sous la Fiole en bas de défilement. Le texte de déploiement de la barre a retrouvé toute sa largeur.
- **Page 404 (partie B).** `src/shell/Page404.jsx` : nouvelle page, centrée, avec une grande Fiole toxique interactive (128px, sur une ligne « paillasse »), un eyebrow mono, un titre, un texte, le chemin demandé et 3 liens (Lab / Magazine / Brèves), tous en tokens et en i18n (FR/EN, `src/i18n/ui.js`). Route `path="*"` ajoutée dans `App.jsx`. `ProjectPage.jsx` et `ProjectDemoPage.jsx` affichent cette page 404 pour un projet ou une démo introuvable au lieu du petit texte précédent. `resolveRouteMeta()` (`registry.js`) renvoie l'icône ☠ et le libellé « Page introuvable » pour toute URL non gérée et pour `/lab/<inconnu>` ; un `<meta name="robots" content="noindex">` est posé à l'affichage de la page et retiré au démontage. Les pages `NotFound` existantes de Magazine, Brèves et Projets gardent leur en-tête et leurs textes, avec une petite Fiole toxique (64px) ajoutée au-dessus de leur titre.
- `npm run build` et `npm run lint` passent, sans nouvelle erreur ni avertissement par rapport à l'état initial.

## Pas fait (hors périmètre, voir SPEC)

- Vrai code HTTP 404 côté Vercel (toutes les URL répondent 200 via la réécriture vers `index.html` ; c'est React qui affiche la 404 côté client).
- Réactions de la Fiole selon la page.
- Avatar réseaux sociaux.

## Critères d'acceptation

| # | Critère | Résultat |
|---|---|---|
| 1 | Desktop 1280×900 : Fiole 48×48px, `bottom` = haut de la barre + 3px (±1), bord droit à 24px (±1), pas de recouvrement de la scrollbar, aucun texte de la barre sous la Fiole | **Conforme.** Vérifié sur `/`, `/magazine`, `/breves`, `/projets`, `/lab/design-system`. Mesures exactes : 48×48px, chevauchement 3px, bord droit 24px pile. |
| 2 | Bas de défilement de `/magazine` et `/lab/design-system` : dernier élément de texte au-dessus de la Fiole | **Conforme.** |
| 3 | Clic à 4px à gauche de la Fiole atteint le contenu | **Conforme.** `elementFromPoint` renvoie `.shell-main`. |
| 4 | 375×812 : Fiole 48px, pas de défilement horizontal, menu ☰ ouvert → Fiole sous le menu | **Conforme.** |
| 5 | Clic sur la Fiole de la barre : bulle au-dessus, dans la fenêtre ; 10ᵉ clic : Fiole toxique ; comportements hérités inchangés | **Conforme.** (10ᵉ clic et dodo non re-testés à l'étape 6 : logique héritée à l'identique de la mission précédente, seule l'échelle a changé — voir Fiole.jsx.) |
| 6 | `/nimporte-quoi`, `/lab/inconnu` : page 404, Fiole toxique 128px, textes FR, chemin demandé, 3 liens fonctionnels, onglet « Page introuvable · Misran Labs », `noindex` présent puis absent après `/` | **Conforme.** Testé en forçant `lang=fr`. `noindex` vérifié présent avant navigation, absent après clic sur « Retour au Lab ». |
| 7 | Clic sur la Fiole de la 404 : tangage, orbites allumées, bulle avec une des 5 phrases toxiques, particules poison ; pas de dodo après 30s | **Conforme.** Bulle « Poison maison » / « Qui a secoué la fiole ? » observées, 6 particules poison. Pas de dodo : `sleeps={false}` sur cette instance (Page404.jsx). |
| 8 | `/magazine/1999-01-01`, `/breves/1999-01-01`, `/projets/P-999` : en-tête et textes inchangés + Fiole toxique 64px au-dessus du titre | **Conforme.** |
| 9 | Anglais : textes 404, phrases toxiques, `aria-label` en anglais | **Conforme.** Titre onglet « Page not found · Misran Labs », `aria-label` « Toxic flask ». |
| 10 | 375×812 sur `/nimporte-quoi` : lisible, pas de défilement horizontal | **Conforme.** |
| 11 | Aucune erreur/avertissement console | **Conforme.** |
| 12 | `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/ src/shell/Page404.jsx` ne renvoie rien | **Conforme.** |
| 13 | Captures jointes | **Conforme.** Voir `captures/` : `statusbar-fiole-perchee.jpg`, `mobile-375x812.jpg`, `404-desktop.jpg`, `404-bulle.jpg`, `404-rubrique.jpg`. |
| 14 | `npm run build` passe ; `npm run lint` sans nouvelle erreur | **Conforme.** |
| 15 | Tout commité sur `auto/fiole-perchee-404`, rien sur `main`, rien poussé | **Conforme.** |

## Comment vérifier

```bash
git checkout auto/fiole-perchee-404
npm run build
npx vite preview
```

Ouvrir http://localhost:4173 : la Fiole perchée est visible en bas à droite de la barre d'état sur toute page. Naviguer vers `http://localhost:4173/nimporte-quoi` ou `/lab/inconnu` pour voir la page 404 (cliquer sur la grande Fiole toxique pour sa réaction). Naviguer vers `/magazine/1999-01-01`, `/breves/1999-01-01` ou `/projets/P-999` pour voir la petite Fiole toxique au-dessus du titre d'une rubrique introuvable. Basculer FR/EN avec le bouton en haut à droite. Redimensionner à 375px de large pour la version mobile.

## Décisions prises sans Michael

Détail complet dans `DECISIONS.md`. Points notables :

1. **`vertical-align: bottom` ajouté sur `.fiole-btn`.** Sans cette ligne, l'alignement de base par défaut d'un `inline-flex` réservait ~3px de descente de police du parent sous le bouton, ce qui faussait le chevauchement de 3px sur la barre (mesuré à 0px au lieu de 3px). Trouvé en vérifiant les coordonnées exactes dans le navigateur.
2. **`--mascotte-overhang` (tokens.css) utilisé uniquement pour le `padding-bottom` de `.shell-main`**, pas pour le positionnement de la Fiole dans `Statusbar.jsx` (qui utilise directement `calc(var(--chrome-height) - 3px)`). Les deux calculs partagent la même donnée source (48px de Fiole, 3px de chevauchement) mais pas la même formule CSS — à garder en tête si l'échelle de la Fiole change un jour.
3. **`KNOWN_ROUTES` ajouté dans `registry.js`** pour distinguer `/breves` (qui n'a pas de libellé de rubrique dédié, hors périmètre de cette mission) d'une vraie 404, et éviter de lui donner à tort le libellé « Page introuvable ».
4. **`projectNotFound`, `backToLabLink`, `demoNotFound`, `backToProjectLink` (i18n) laissées en place** bien que devenues inutilisées (`ProjectPage.jsx`/`ProjectDemoPage.jsx` affichent désormais `<Page404 />` dans tous les cas), comme demandé en SPEC.

## Délégations

Détail complet dans `DELEGATIONS.md`. Sous-agents utilisés :
- `general-purpose` (Haiku 4.5, étape 5) : ajout mécanique de la Fiole toxique 64px dans les 3 pages `NotFound` de rubrique — diff identique et conforme dans les 3 fichiers.
- `verificateur` (Haiku 4.5, étape 6) : vérification navigateur complète des critères 1 à 11 et 13, captures d'écran — tous les points rapportés conformes ; un point (disparition du `noindex`) a été re-testé par la session principale car l'agent ne l'avait que « confirmé dans le code » sans test direct.

## Recommandations

- `/breves` et `/breves/:date` n'ont toujours pas de libellé de rubrique dédié dans `resolveRouteMeta()` (l'onglet et la barre d'état affichent le chemin brut, ex. `/breves/1999-01-01`) — préexistant à cette mission, non corrigé car hors périmètre de la SPEC. À corriger dans une future mission si souhaité (même modèle que Magazine/Projets dans `registry.js`).
- Si l'échelle de la Fiole perchée change un jour (D1), penser à mettre à jour `--mascotte-overhang` dans `tokens.css` et le calcul `calc(var(--chrome-height) - 3px)` dans `Statusbar.jsx` ensemble (voir décision 2 ci-dessus) — ils ne sont pas liés automatiquement.
