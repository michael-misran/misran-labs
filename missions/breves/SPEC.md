# Mission breves — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « tirer du journal quotidien une version publique légère avec un lien vers l'article entier ; le travail est fait, autant que la tâche en fasse aussi une version web ». Option A validée : une pull request par jour, Michael fusionne.

## Contexte
- Le **Journal du matin** (routine `lab-magazine-quotidien`, 5 h 30, 7/7) produit chaque jour `src/private/journal/numeros/<date>.json` (hors Git public, format dans `src/private/journal/REDACTION.md` §5). Chaque article a déjà ses `sources` (URLs complètes) et passe par le `relecteur`.
- Le site a déjà un **Magazine hebdo** (`src/magazine/` : `numeros.js` charge et valide les JSON via `import.meta.glob`, `MagazineHome.jsx`, `MagazineIssue.jsx`, `MagazineParts.jsx`, `magazineText.js` pour les textes fr/en). C'est le modèle à suivre.
- Le site est **bilingue fr/en** (`useLanguage`), les aperçus de partage et le sitemap sont générés par `scripts/share-previews.js`.
- Modèle de données réel : `src/private/journal/numeros/2026-09-30.json` (lecture seule).

## Objectif
Une rubrique publique **Brèves** (`/breves`) : chaque jour, 3 à 5 brèves courtes tirées du journal, avec lien vers la source, plus le mot et le chiffre du jour. La mission livre la page, le format et la procédure d'extraction ; le branchement sur la routine quotidienne se fait à la clôture.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Ce qui devient public.** Uniquement : l'article `une` (À la une · IA), les articles de `type` `tech` (grands et « éclair ») des pages 2-3, le `mot` et le `chiffre` de la page 4. **Jamais** : irritants, idées de business, études de cas, modèles économiques, chiffre qui dérange, énigme, bonus, carnet. Ces rubriques nourrissent les idées P-NNN de Michael.

**D2 — Format : un fichier par jour** `src/breves/jours/<date>.json`, documenté dans `src/breves/FORMAT.md` :
```json
{
  "date": "AAAA-MM-JJ",
  "breves": [
    { "rubrique": "ia | tech",
      "titre": { "fr": "…", "en": "…" },
      "resume": { "fr": "…", "en": "…" },
      "sources": [{ "titre": "Nom du site", "url": "https://…" }] }
  ],
  "mot": { "terme": "…", "definition": { "fr": "…", "en": "…" } },
  "chiffre": { "valeur": "…", "texte": { "fr": "…", "en": "…" } }
}
```
`breves` : 1 à 5 éléments, `sources` ≥ 1 en https. `mot` et `chiffre` facultatifs. `resume` : 2-3 phrases (≤ 60 mots), **rédigé à nouveau** à partir du journal, jamais le texte d'une source. HTML autorisé : `<i>`, `<b>` seulement. Pas de champ `numero` (pas de séquence à maintenir).

**D3 — Bilingue.** Comme le Magazine : `fr` et `en` obligatoires. La traduction est faite à l'extraction.

**D4 — Chargement et validation** dans `src/breves/jours.js`, sur le modèle de `src/magazine/numeros.js` : `import.meta.glob` eager, un fichier invalide est ignoré avec `console.error` (règle violée), jamais d'écran cassé. Le nom du fichier doit correspondre à `date`.

**D5 — Pages.**
- `/breves` : en-tête dans le style du Magazine (`CaseMasthead`, hero, `CaseFooter`), puis **le dernier jour en entier** (brèves en cartes ou lignes avec pastille de rubrique, lien « Lire la source ↗ » qui s'ouvre dans un nouvel onglet avec `rel="noopener noreferrer"`, encadré mot + chiffre), puis la liste des jours précédents (date + titres) qui mène à `/breves/:date`.
- `/breves/:date` : un jour en entier, liens jour précédent / suivant. Date inconnue → message « aucune brève ce jour-là » + lien vers `/breves`.
- Tous les textes d'interface dans `src/breves/brevesText.js` (fr/en). Composants partagés : réutiliser ceux du Magazine et du `design-system`, aucune valeur de couleur ou de taille en dur hors des tokens (`src/styles/tokens.css`).
- Mobile correct (`useIsMobile`), pas de défilement horizontal.

**D6 — Navigation.** Entrée « Brèves » dans `Sidebar.jsx`, dans la section Magazine, juste sous « Magazine » (libellés dans `src/i18n/ui.js`). Routes ajoutées dans `App.jsx` en `lazy`, comme le Magazine.

**D7 — Aperçus et sitemap.** `scripts/share-previews.js` : page fixe `/breves` (titre « Brèves — l'actu IA et tech du jour · Misran Labs », image `og-magazine.png` réutilisée) et une entrée par jour `/breves/<date>` (titre = titre de la première brève). Pas de nouvelle image.

**D8 — Premier jour réel.** Créer `src/breves/jours/2026-09-30.json` à partir du journal du 2026-09-30 selon D1-D3 : la une (OpenAI DevDay), « Starship atteint l'orbite », « Un Walkman dans un iPhone pliable », le mot (CMP) et le chiffre (844). Faits repris **tels quels** du journal (déjà relus), aucun ajout. Titres des sources = nom du site.

**D9 — Procédure d'extraction** dans `src/breves/EXTRACTION.md` (public, se suffit à lui-même), lue par la routine du journal après sa fabrication du PDF :
1. Lire `src/private/journal/numeros/<date>.json` ; si `src/breves/jours/<date>.json` existe déjà sur `origin/main` ou une branche `auto/breves-<date>` existe, arrêter.
2. Extraire selon D1, rédiger selon D2-D3 (résumés courts, aucun fait absent du journal, aucune donnée personnelle, aucune mention du carnet ni des irritants).
3. **Git dans un worktree séparé**, pour ne jamais toucher le dossier de travail (une mission peut être en cours dessus) : `git fetch origin`, `git worktree add <scratchpad>/breves-<date> -b auto/breves-<date> origin/main`, y écrire le fichier, `npm run build` n'est pas nécessaire (validation : `node` + JSON.parse), commit, `git push -u origin auto/breves-<date>`, `gh pr create` (titre « Brèves du <date> », corps = titres des brèves), puis `git worktree remove`.
4. Jamais `main`, jamais de fusion, jamais `--force`. Une commande par appel (pas de `&&`).
5. Résumé : lien de la PR.

## Critères d'acceptation
1. `/breves` affiche le jour 2026-09-30 (3 brèves, mot, chiffre) en fr et en en ; chaque lien source pointe vers l'URL du journal et s'ouvre dans un nouvel onglet.
2. `/breves/2026-09-30` fonctionne ; `/breves/2000-01-01` affiche le message vide sans erreur.
3. Un fichier invalide ajouté temporairement dans `src/breves/jours/` (ex. `titre` sans `en`) n'apparaît pas et produit un `console.error` ; il est retiré avant commit.
4. Entrée « Brèves » visible dans la barre latérale (desktop et menu mobile), active sur `/breves`.
5. À 375 px de large : pas de défilement horizontal (`document.documentElement.scrollWidth <= 375`).
6. `npm run build` passe et `dist/sitemap.xml` contient `/breves` et `/breves/2026-09-30` ; `dist/breves/index.html` contient le titre de D7.
7. `grep -rniE "irritant|piste de business|carnet|duolingo|cookie" src/breves/jours/` ne renvoie rien.
8. `src/breves/FORMAT.md` et `src/breves/EXTRACTION.md` existent et décrivent D1-D3 et D9.
9. `lint` : pas de nouvelle erreur par rapport à l'état initial.
10. Tout est commité sur `auto/breves`, rien sur `main`, rien de poussé ; aucun fichier de `src/private/` modifié.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire (fait à la clôture, en session avec Michael) :
- Modifier `src/private/journal/REDACTION.md` (ajouter l'étape « Version web → suivre `src/breves/EXTRACTION.md` » et lever l'interdit Git pour cette étape seulement).
- Modifier la tâche programmée `lab-magazine-quotidien`.
- Ajouter dans `CLAUDE.md` l'exception Git « routine des brèves » et exclure `auto/breves-20*` de la liste des missions.
- Bandeau « Aujourd'hui » sur la page d'accueil ; analytique Umami (sujet séparé).
