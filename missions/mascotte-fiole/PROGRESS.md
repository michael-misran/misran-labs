# Mission mascotte-fiole — PROGRESS

**Statut :** mission terminée (RAPPORT.md écrit, étape 7)
**Prochaine action :** clôture (session interactive avec Michael, voir missions/README.md)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, main b9ebe79)
- `npm run build` : passe (sitemap 22 URL)
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30)
- `npm run build` : passe (sitemap 22 URL), identique à l'état initial.
- `npm run lint` : aucune erreur, identique à l'état initial.

## Étape 2 (2026-09-30)
- `src/shell/mascotte/sprites.js` créé par sous-agent Haiku, relu par la session principale : grilles fiole/toxique conformes à la maquette, `PAL` en noms de tokens (D2), phrases FR/EN de la Fiole (D7), phrase secrète FR/EN de la Fiole toxique (D6).
- Correction apportée après relecture : retrait d'un doublon de phrases sur `toxique` (non prévu par la SPEC, la Fiole toxique n'affiche que sa phrase secrète).
- Lint sur le nouveau fichier : aucune erreur.

## Étape 3 (2026-09-30)
- `src/shell/mascotte/Fiole.jsx` et `fiole.css` créés : bouton natif (Entrée/Espace gratuits), états `base/blink/look/sleep/happy` pilotés par des refs miroirs pour éviter les fermetures obsolètes dans les minuteries récursives (clignement, dodo).
- Bulle et particules rendues via `createPortal` dans `document.body`, position calculée depuis `getBoundingClientRect()` de la Fiole ; bulle ancrée sur son bord droit (`right`, jamais `left`) pour ne jamais dépasser l'écran (D4).
- Secret du 10ᵉ clic (D6) : séquence de minuteries `spin` (0,8 s) → orbites 1 s → bulle 2,5 s → retour Fiole normale à 4 s ; un clic pendant la transformation incrémente le compteur sans relancer la séquence.
- Réduction des animations (D8) : `prefers-reduced-motion` déjà neutralisé globalement par `tokens.css` pour les animations CSS ; en plus, `spawnParticles` teste `matchMedia` en JS et ne crée aucune particule si l'utilisateur le demande.
- Nettoyage : toutes les minuteries annulées au démontage (D9) ; `toxicTimers`/`particleTimers` mutés en place (jamais réassignés) pour que la référence capturée dans l'effet de nettoyage reste valide.
- Lint : 0 erreur, 0 avertissement sur les deux fichiers.
- Intégration dans `Statusbar.jsx` pas encore faite (étape 4) : le composant n'est pour l'instant pas monté nulle part.

## Étape 4 (2026-09-30)
- `Statusbar.jsx` : `<Fiole />` ajoutée en fin de footer (desktop comme mobile). Desktop : les 3 textes regroupés dans un conteneur `flex:1` en `space-between`, la Fiole en dehors avec un `gap: 12` garanti. Mobile : le fil d'Ariane en `flex:1` centré, la Fiole à droite.
- Chaque texte a `overflow: hidden`, `textOverflow: ellipsis`, `minWidth: 0` (nécessaire pour qu'un enfant flex accepte de rétrécir sous sa taille de contenu).
- `overflow: visible` sur le `<footer>` (D4). Décision notée dans DECISIONS.md : la portée de ce changement s'arrête au footer, sans toucher `shell-grid`/`html`/`body` dans Shell.jsx (hors fichier de l'étape) — risque mineur de rognage de quelques px pendant la pirouette, à surveiller à l'étape 5.
- `npm run build` : passe (sitemap 22 URL, bundle +6 Ko environ pour la Fiole).
- `npm run lint` : aucune erreur, aucun avertissement.

## Étape 5 (2026-09-30)
- Vérification déléguée au sous-agent `verificateur` (Haiku), via `npx vite preview` (pas de preview « dev » en routine).
- Conforme : critères 1 (dimensions), 2 (mobile, pas de scroll horizontal), 7 (anglais), 8 (pas d'erreur console).
- Un vrai bug repéré par le sous-agent : sur `/magazine`, `/breves`, `/projets`, `/lab/design-system`, la Fiole dépassait de ~1 px sous le bas de la fenêtre.
- Rapporté « non conforme »/« doute » à tort : critères 3 (bulle au clic), 4 (10ᵉ clic), 6 (clavier) — le sous-agent testait clic puis vérification DOM dans deux appels d'outil séparés, dépassant les 1,8 s d'affichage de la bulle. Voir DECISIONS.md.

## Étape 6 (2026-09-30)
- Bug du dépassement de 1 px corrigé : `border-top` remplacé par une ombre interne dans `Statusbar.jsx` (voir DECISIONS.md). Re-vérifié après rebuild sur `/`, `/magazine`, `/breves` : la Fiole est exactement à `bottom: 900` (fenêtre 900 px), plus de dépassement.
- Re-vérification manuelle de la session principale (en regroupant clic + lecture DOM dans un seul appel, pour éviter le délai réseau qui avait trompé le sous-agent) : bulle au clic (FR et EN), 10ᵉ clic → Fiole toxique + phrase secrète (FR et EN), clavier (Tab atteint le bouton, Entrée déclenche), dodo après 30 s + réveil au survol — tous conformes.
- Gap desktop entre le texte de déploiement et la Fiole mesuré : exactement 12 px (D3).
- `npm run build` et `npm run lint` (après correction) : passent, aucune erreur ni avertissement.
- `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/` : aucun résultat (critère 9).
- 4 captures enregistrées dans le dossier scratchpad de la session (desktop, mobile, bulle ouverte, Fiole toxique) ; jointes au RAPPORT.
- Serveur `vite preview` arrêté, navigateur fermé.
