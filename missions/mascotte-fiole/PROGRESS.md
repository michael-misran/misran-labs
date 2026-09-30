# Mission mascotte-fiole — PROGRESS

**Statut :** étape 3 terminée
**Prochaine action :** étape 4 (intégration dans Statusbar.jsx)
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
