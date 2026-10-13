# Mission p006-maquettes — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md, ajouter la ligne de l'étape dans DELEGATIONS.md (D14 de la SPEC : une ligne par étape, même faite par la session principale) et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, fiche P-006 → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus 5.5, fait au cadrage)
- [x] 2. `REGLES.md` (règles de D8 détaillées, avec exemples) et `cas-tarot.json` : au moins 24 cas couvrant toute la liste de D11, résultat attendu par joueur → session principale (Sonnet)
- [x] 3. Vérification indépendante des 24 cas : recalculer chaque cas à la main depuis `REGLES.md` seul, sans lire `cas-tarot.json` ni aucun code, et lister les écarts → sous-agent general-purpose (Haiku). La session principale tranche chaque écart (correction des cas ou des règles) et le note dans DECISIONS.md
- [x] 4. `public/screens/p006/p006-calcul.js` (fonctions pures, D4) et `missions/p006-maquettes/verifier-calcul.mjs` ; `node missions/p006-maquettes/verifier-calcul.mjs` doit afficher `N/N cas OK` → session principale (Sonnet)
- [ ] 5. `p006.css` (cadre D7, thème D6, composants : boutons 48 px, cartes, tableau de scores, champs) et `p006.js` (stockage D10, partie d'exemple, rendu commun), puis `index.html` → session principale (Sonnet)
- [ ] 6. `donne.html` : saisie de D9 avec résultat en direct → session principale (Sonnet)
- [ ] 7. `scores.html` (totaux, qui mène, historique, correction et suppression d'une donne) et `joueurs.html` (3 à 5 joueurs) → session principale (Sonnet)
- [ ] 8. `accueil.html`, `fin.html` et `pro.html`, en réutilisant uniquement les composants de `p006.css` et les fonctions de `p006.js` (pas de nouveau style hors petits ajustements) → sous-agent general-purpose (Haiku), relu par la session principale avant commit
- [ ] 9. Relecture des textes visibles des 7 pages (orthographe, typographie, cohérence des libellés) → secretaire (Sonnet) ; la session principale applique les corrections
- [ ] 10. Vérification navigateur : critères 1, 2, 4, 5, 6 et 7 de la SPEC (parcours complets à 3, 4 et 5 joueurs, 390 et 375 px, console, réseau) → verificateur (Haiku). Build et lint : session principale
- [ ] 11. Contrôle de la branche avant rapport (lint, build, secrets, fichiers qui ne doivent pas partir, cohérence avec la SPEC) → controleur (Haiku)
- [ ] 12. `RAPPORT.md` avec la section « Qui a fait quoi » (D14), les points à faire valider par Michael (arrondi des demi-points, nom provisoire, direction visuelle) et les missions suivantes proposées → session principale (Sonnet)
