# Mission jeux-majorite — RAPPORT

## Fait
- Prérequis vérifié : `src/jeux/socle/` présent (mission `jeux-geste` fusionnée, PR #34).
- Troisième jeu **Comme tout le monde** (`src/jeux/comme-tout-le-monde/`) : une question du quotidien par jour, le joueur a 3 essais (croix) pour deviner les réponses les plus populaires d'une banque simulée.
  - `meta.js` : slug `comme-tout-le-monde`, icône 👥, couleur `cyan`, `demo: true`, `entrainement: false`.
  - `correspondance.js` (D4) : normalisation (minuscules, sans accents, sans ponctuation, sans article en tête, un seul « s »/« x » final retiré) et correspondance par distance de Levenshtein (tolérance 1, ou 2 si le synonyme fait 8 caractères ou plus), aucune IA ni service externe.
  - `questions.json` : 30 questions bilingues (`questions[numeroDuJour % 30]`), sujets quotidien/maison/nourriture/vacances/travail/enfance/animaux, aucun sujet interdit (politique, religion, santé, sexualité, personnes réelles, marques). 6 à 8 réponses par question, pourcentages décroissants sommant entre 85 et 100.
  - `Jeu.jsx` : tableau de cases numérotées triées par %, saisie avec `enterkeyhint="send"`/`autocomplete="off"`, retournement animé en CSS (désactivé sous `prefers-reduced-motion`), zone `aria-live` pour annoncer chaque résultat, fin de partie à 3 croix ou toutes les réponses trouvées avec révélation complète, phrase « démo honnête » (D6), `ResultatPartage` du socle, texte de partage D5 (cases 🟩/⬛ + croix, jamais de libellé).
  - `JeuxHome.jsx` : `A_VENIR` passé de 2 à 1 sur cette branche (voir DECISIONS.md pour le conflit d'une ligne attendu à la fusion avec `jeux-estimation`).
- `missions/jeux-majorite/verifier-questions.mjs` : contrôle Node — 30 questions, 6 à 8 réponses chacune, somme des % entre 85 et 100, % décroissants, fr/en non vides, aucun synonyme partagé entre deux réponses d'une même question, ids uniques, et les 4 tests de correspondance de la SPEC (« Les chargeurs » → chargeur, « brosse a dent » → brosse à dents, « Chargeur. » → chargeur, « avion » → aucune). Tous les contrôles passent.

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté (voir « Hors périmètre » ci-dessous pour ce qui était explicitement exclu).

## Critères d'acceptation
1. **OK** — `/jeux` affiche la carte « Comme tout le monde » avec son icône 👥 (vérifié en direct par le verificateur).
2. **OK** — bandeau de démo, question du jour, cases masquées numérotées. Vérifié en direct sur la question réelle du jour (« plage-apporter ») : « serviette » retourne la bonne case (24 %), une réponse fausse ajoute une croix, 3 croix arrêtent la partie et révèlent les 7 réponses avec leurs %.
3. **OK** — `node missions/jeux-majorite/verifier-questions.mjs` : 30 questions conformes à D2 (nombre de réponses, somme des %, ordre décroissant, fr/en non vides, aucun synonyme partagé, ids uniques).
4. **OK** — mêmes script : les 4 tests de correspondance de la SPEC passent (« Les chargeurs » → chargeur, « brosse a dent » → brosse à dents, « Chargeur. » → chargeur, « avion » → aucune), sur la question d'exemple de la banque réelle.
5. **OK** — rechargement après la partie : résultat final réaffiché directement (cases révélées, score identique), pas de nouvel essai (vérifié en direct). La série utilise le socle commun (`serie.js`), déjà testé par `jeux-geste`.
6. **OK** — texte de partage conforme à D5 (une case par réponse, croix, série, domaine), aucun libellé de réponse. Confirmé par relecture du code à partir des valeurs réelles observées (serviette trouvée, 3 croix, score 24 %) : la lecture directe du presse-papiers a été refusée par permission dans le navigateur du sous-agent de vérification (`NotAllowedError`) — voir DECISIONS.md, même limitation déjà rencontrée sur `jeux-estimation`.
7. **OK** — en anglais, question et synonymes fonctionnent (vérifié en direct : question affichée en anglais, « towel » retrouve correctement la bonne case).
8. **OK** — à 375 px : pas de défilement horizontal, tableau lisible, champ de saisie accessible (document flow normal, pas de positionnement fixe pouvant être masqué par un clavier virtuel).
9. **OK** — `git diff --stat main...auto/jeux-majorite` : seuls `src/jeux/comme-tout-le-monde/**`, `missions/jeux-majorite/**` et la ligne `A_VENIR` de `src/jeux/JeuxHome.jsx` sont modifiés.
10. **OK** — `package.json`/`package-lock.json` inchangés ; aucune couleur en dur (grep vide sur `Jeu.jsx`/`correspondance.js`/`meta.js`). `npm run build` et `npm run lint` : OK, 0 nouvelle erreur.
11. **OK** — tout commité sur `auto/jeux-majorite` (`git status` propre), rien sur `main`, rien poussé.

## Comment vérifier
1. `npm run build` puis `npx vite preview`.
2. Ouvrir `/jeux` : carte « Comme tout le monde » visible. Ouvrir `/jeux/comme-tout-le-monde` : bandeau démo, question du jour, tableau de cases, saisie, croix, fin de partie avec révélation et partage.
3. `node missions/jeux-majorite/verifier-questions.mjs` pour le contrôle automatisé des questions et de la correspondance (critères 3 et 4).
4. Pour l'anglais : changer la langue du site puis rejouer `/jeux/comme-tout-le-monde` (vider le `localStorage` si une partie du jour est déjà enregistrée).

## Décisions (voir DECISIONS.md pour le détail complet)
- `verifier-questions.mjs` écrit avec son contrôle complet dès l'étape 2 (30 questions, structure, synonymes partagés), alors que `questions.json` ne contenait que la question d'exemple — le total (1/30) échouait alors, attendu, corrigé à l'étape 3.
- Question d'exemple « vacances-oubli » complétée à 6 réponses à partir des 2 données par la SPEC à titre d'illustration du format JSON.
- 30 questions rédigées avec 1 à 3 entrées par réponse (libellé + 1-2 synonymes), en dessous de la fourchette indicative « 3 à 6 en moyenne » de D2 — priorité donnée à des synonymes exacts et non ambigus (zéro collision détectée) plutôt qu'à la quantité, vu le volume (30 questions × ~6,5 réponses × 2 langues). Voir recommandation ci-dessous.
- « vacances-destination-reve » : destinations génériques (île tropicale, montagne…), aucun nom de pays, par prudence au-delà des interdits stricts de D2.
- « métier-enfance-reve » : aucun métier médical, par prudence vis-à-vis de l'interdit « santé ».
- Couleur de carte `cyan` (`mandarine` et `violet` déjà pris par les 2 jeux précédents).
- `A_VENIR` : 2 → 1 sur cette branche, pas 0 — cette branche part de `main` avant la fusion de `jeux-estimation` ; D1/contexte de la SPEC anticipe ce conflit d'une ligne à résoudre à la clôture.
- Pas de persistance de l'état « en cours » (réponses trouvées avant la fin), seulement le résultat final, même convention que `geste-parfait`.
- Animation de retournement simplifiée en transition de fond CSS plutôt qu'un flip 3D (« animée en CSS » n'impose pas un flip 3D).
- Critère 6 accepté sur relecture de code plutôt que lecture réelle du presse-papiers (limitation du navigateur de vérification automatisée, pas du code).

## Délégations (voir DELEGATIONS.md pour le détail)
- Étape 5 (vérification navigateur) : sous-agent `verificateur` en Haiku 4.5. OK sur les critères 1, 2, 5, 7, 8 ; critère 6 non vérifiable en direct (permission presse-papiers refusée par le navigateur de vérification), contourné par relecture de code par la session principale.
- Toutes les autres étapes (1 à 4, 6, 7) : session principale en Sonnet 5.

## Recommandations (hors périmètre de cette mission)
- **Enrichir les synonymes de `questions.json`** : actuellement 1 à 3 entrées par réponse (label + variantes), en dessous de la fourchette indicative de D2 (« 3 à 6 en moyenne »). C'est un changement de données pur, sans risque, qui peut être fait à tout moment par Michael ou une mission future, réponse par réponse.
- **Résoudre le conflit d'une ligne sur `A_VENIR`** à la fusion avec `jeux-estimation` (toutes deux le décrémentent depuis `main` ; valeur finale attendue : 0).
- **Vraies réponses des joueurs** : la banque reste une démo (bandeau affiché) ; nécessiterait une base de données partagée (coût et décision à valider par Michael), comme déjà noté pour les 2 missions précédentes.
- **Plus de 30 questions** : explicitement hors périmètre, la rotation recommence après 30 jours.
- **Image d'aperçu de partage propre à « Comme tout le monde »** : l'image par défaut du site est actuellement réutilisée.
