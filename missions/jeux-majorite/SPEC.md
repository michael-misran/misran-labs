# Mission jeux-majorite — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « une famille en or : une question par jour, puis voir si on pense comme la majorité ».

**Prérequis : la mission `jeux-geste` est fusionnée dans `main`** (socle `src/jeux/`). La branche `auto/jeux-majorite` est créée depuis `main` après cette fusion. Si `src/jeux/socle/` est absent : noter le blocage dans PROGRESS.md, écrire RAPPORT.md (« prérequis manquant ») et s'arrêter. Elle ne dépend pas de `jeux-estimation` : les deux touchent chacune leur dossier, plus une ligne commune (`A_VENIR`). Si les deux sont fusionnées, Michael aura au pire un conflit d'une ligne, à résoudre à la clôture.

## Contexte
- Lire `missions/jeux-geste/SPEC.md` (D1 à D11) : mêmes conventions (dossier par jeu, `meta.js` en données pures, essai quotidien, partage, série).
- Ajouter le jeu = créer `src/jeux/comme-tout-le-monde/`. Seule ligne partagée : `A_VENIR` dans `JeuxHome.jsx`, qui perd une unité, avec un minimum de 0.

## Objectif
`/jeux/comme-tout-le-monde` pose chaque jour une question du quotidien (« Qu'est-ce qu'on oublie toujours en partant en vacances ? »). Le joueur a 3 essais pour trouver les réponses les plus populaires. Chaque réponse trouvée rapporte le % de gens qui l'ont donnée, à la manière du jeu télévisé.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Nom : pas de marque existante.** « Une famille en or » et « Family Feud » sont des marques d'émissions TV : ni le nom, ni le logo, ni l'habillage ne sont repris. Nom : fr « Comme tout le monde », en « Great minds » (Michael pourra renommer : seuls `meta.js` et les textes changent). Slug `comme-tout-le-monde`, icône 👥, `ordre: 3`, `demo: true`, `entrainement: false`.

**D2 — Banque de questions : `questions.json`, 30 questions, rédigées par la mission.** Forme d'une entrée :
```json
{
  "id": "vacances-oubli",
  "question": { "fr": "Qu'est-ce qu'on oublie toujours en partant en vacances ?", "en": "What do people always forget when going on holiday?" },
  "reponses": [
    { "pct": 34, "fr": ["chargeur", "chargeur de téléphone"], "en": ["charger", "phone charger"] },
    { "pct": 21, "fr": ["brosse à dents"], "en": ["toothbrush"] }
  ]
}
```
- 6 à 8 réponses par question. Somme des % entre 85 et 100 (le reste = « autres »). Pourcentages décroissants.
- Le premier élément de chaque liste est le libellé affiché, les suivants sont des synonymes acceptés (3 à 6 par réponse en moyenne : singulier/pluriel, familier, variantes).
- Sujets universels, drôles et sans risque : quotidien, maison, nourriture, vacances, travail, enfance, animaux. **Interdits** : politique, religion, santé, sexualité, personnes réelles, marques, tout ce qui peut blesser.
- Les % sont **inventés** (plausibles) : ils sont affichés comme une démo (D6). Les versions fr et en d'une question partagent les mêmes %. Traduire l'idée, pas mot à mot : les synonymes en sont propres à l'anglais.
- Question du jour : `questions[numeroDuJour % 30]`. Au-delà de 30 jours, la rotation recommence (acceptable tant qu'il n'y a pas de vraies données).

**D3 — Déroulé d'une partie.** Question affichée, et le tableau des réponses en cases masquées (numérotées 1 à N, triées par %). Le joueur tape une réponse et valide :
- Trouvée → la case se retourne (libellé + %), le % s'ajoute au score.
- Pas trouvée → une croix ✕ (3 croix = fin).
- Déjà trouvée → message, sans pénalité.
La partie finit à 3 croix ou quand tout est trouvé. Toutes les cases se révèlent alors. Score = somme des % trouvés (0 à 100).

**D4 — Correspondance des réponses (`correspondance.js`, fonctions pures).** Normalisation : minuscules, sans accents (`normalize('NFD')`), sans ponctuation, sans articles en tête (fr : le, la, les, l', un, une, des, du, de, mon, ma, mes, son, sa, ses ; en : the, a, an, my, his, her, their), espaces fusionnés, et un « s » ou « x » final retiré des deux côtés. Correspondance si le texte normalisé est égal à un synonyme normalisé, ou à une distance de Levenshtein ≤ 1 (≤ 2 si le synonyme fait 8 caractères ou plus). Si plusieurs réponses correspondent, on prend la plus précise (distance la plus faible, puis le % le plus élevé). Aucune IA, aucun service externe.

**D5 — Partage.**
```
Comme tout le monde n° 12 👥
🟩🟩🟩⬛⬛⬛ 68 pts
❌❌
🔥 4 jours
misran-labs…/jeux/comme-tout-le-monde
```
Une case par réponse, dans l'ordre du tableau : 🟩 trouvée, ⬛ manquée. Suivent les croix utilisées. Jamais de libellé de réponse dans le partage.

**D6 — Démo honnête.** `meta.demo: true` déclenche le bandeau du socle. Sous le tableau final, une phrase : « Pourcentages indicatifs : ils seront remplacés par les vraies réponses des joueurs. »

**D7 — Bilingue, accessible, mobile.** La langue du site choisit la question et les synonymes acceptés. Saisie avec `enterkeyhint="send"` et `autocomplete="off"`. Le retournement des cases est animé en CSS, et désactivé si `prefers-reduced-motion`. Les résultats sont annoncés via une zone `aria-live`.

## Critères d'acceptation
1. `/jeux` affiche la carte « Comme tout le monde » (et `A_VENIR` baisse d'une unité, minimum 0).
2. `/jeux/comme-tout-le-monde` : bandeau de démo, question du jour, cases masquées. Taper un synonyme retourne la bonne case, une réponse fausse ajoute une croix, et la partie s'arrête à 3 croix avec toutes les réponses révélées.
3. `missions/jeux-majorite/verifier-questions.mjs` (Node) : 30 questions, 6 à 8 réponses chacune, somme des % entre 85 et 100, % décroissants, fr et en non vides, aucun synonyme partagé entre deux réponses d'une même question (après normalisation), ids uniques.
4. Le même script teste `correspondance.js` : « Les chargeurs » → chargeur, « brosse a dent » → brosse à dents, « Chargeur. » → chargeur, « avion » → aucune (sur la question d'exemple, qui fait partie de la banque).
5. Recharger après la partie réaffiche le résultat sans nouvel essai. La série fonctionne (socle).
6. Le texte de partage suit D5 sans aucun libellé de réponse.
7. En anglais, la question et les synonymes sont en anglais.
8. À 375 px, pas de défilement horizontal, et le clavier ne masque pas le champ de saisie (champ en bas, le tableau défile).
9. Aucun fichier modifié hors de `src/jeux/comme-tout-le-monde/`, `missions/jeux-majorite/` et la ligne `A_VENIR` (`git diff --stat main...`).
10. Pas de dépendance, pas de couleur en dur, `build` passe, `lint` sans nouvelle erreur.
11. Tout est commité sur `auto/jeux-majorite`, rien sur `main`, rien de poussé.

## Hors périmètre
- Collecte des vraies réponses (sondage en 2 temps : répondre un jour, jouer le lendemain). C'est la vraie version du jeu, mais il faut une base : à décider par Michael.
- Correspondance « intelligente » par IA.
- Plus de 30 questions.
