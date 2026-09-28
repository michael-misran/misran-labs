# Mission audit-github — SPEC

Rédigée par Opus (cadrage), 2026-09-28. Brief de Michael : P-004, mission 2 sur 3 — l'outil d'audit doit « se connecter sur GitHub ». Choix validés : **dépôts publics seulement**, pas de connexion, pas de secret, pas d'IA.

## Contexte
La mission 1 (`audit-tokens`, fusionnée) a livré `/lab/audit-tokens` :
- Moteur pur `src/lab/audit/` : `analyse(fichiers)` avec `fichiers = [{ nom, contenu }]` → `{ tokens, fichiers, constats, resume, avertissements }` ; lecteurs CSS / DTCG / Tokens Studio ; règles R1 à R8 dans `regles.js` (tableau `REGLES`) ; `preparerContexte` construit `utilises` (noms référencés) à partir des tokens et des `declarations` CSS.
- Page `src/lab/projects/AuditTokens.jsx` (≈ 720 lignes) : état `fichiers` (`[{ id, nom, contenu, info }]`), textes `FR`/`EN`, composants `Bouton`, `Tuile`, `PastilleGravite`… ; vérification Node `missions/audit-tokens/verifier-analyse.mjs`.
- Limite actuelle : R6 « token inutilisé » ne voit que les fichiers fournis, et rien ne mesure si le code d'un produit utilise vraiment ses tokens.

## Objectif
Sur la même page, on saisit l'adresse d'un dépôt GitHub public : l'outil trouve seul les fichiers de tokens, les analyse avec le moteur existant, et mesure la **couverture** du code (part des valeurs de style qui passent par un token plutôt qu'une valeur en dur), avec les valeurs en dur les plus répétées et celles qui ont **déjà** un token.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Fichiers.** Moteur (pur, sans React ni Vite, importable par Node) :
- `src/lab/audit/github.js` : lecture d'un dépôt. Toutes les fonctions réseau reçoivent `fetch` en paramètre (injection, pour tester sous Node sans réseau).
- `src/lab/audit/couverture.js` : `mesurerCouverture(fichiersCode, tokens)` → résultat D6, sans réseau.
Interface : `src/lab/projects/audit/SourceGithub.jsx` (saisie, exploration, choix des fichiers) et `src/lab/projects/audit/Couverture.jsx` (affichage D6), importés par `AuditTokens.jsx`. Réutiliser `Bouton`, `Tuile`, etc. en les exportant depuis `AuditTokens.jsx` ou en les déplaçant dans `src/lab/projects/audit/ui.jsx` (au choix, noté dans DECISIONS).

**D2 — Adresse acceptée.** `https://github.com/<o>/<r>`, avec ou sans `.git`, `/`, `/tree/<branche>[/<dossier>]` ; ou `<o>/<r>`. `lireAdresse(texte)` → `{ proprietaire, depot, branche|null, dossier|null }` ou `null` (message clair). Si `dossier` est donné, l'exploration se limite à ce sous-dossier. Branche contenant un `/` : non gérée (prendre le premier segment, noté dans l'interface d'aide).

**D3 — Appels réseau (exactement ceux-ci, sans en-tête d'authentification).**
1. `GET https://api.github.com/repos/<o>/<r>` → branche par défaut (sauf branche donnée), taille, visibilité.
2. `GET https://api.github.com/repos/<o>/<r>/git/trees/<branche>?recursive=1` → arborescence (si `truncated: true` : avertissement, on continue avec ce qui est reçu).
3. Contenu : `GET https://raw.githubusercontent.com/<o>/<r>/<branche>/<chemin>` (non compté dans la limite de l'API), au plus 6 en parallèle.
Erreurs : 404 → « dépôt introuvable ou privé » ; 403/429 avec `x-ratelimit-remaining: 0` → « limite de GitHub atteinte (60 requêtes/heure sans connexion), réessaie après HH:MM » (heure locale lue dans `x-ratelimit-reset`) ; erreur réseau → message clair. Jamais d'exception vers la page. Rien d'autre n'est envoyé que l'adresse du dépôt ; aucun appel sans clic.

**D4 — Repérage des fichiers de tokens.** Parmi les fichiers (`type: 'blob'`) :
- Exclus partout : chemins contenant `node_modules/`, `dist/`, `build/`, `.next/`, `vendor/`, `coverage/`, `.git/` ; fichiers `*.min.css`, `package.json`, `package-lock.json`, `tsconfig*.json`, `*.lock` ; fichiers > 300 Ko (champ `size`).
- **Candidats tokens** : `.json` dont le chemin contient `token` (insensible à la casse) ou situé dans un dossier `tokens/` ou `design-tokens/` ; `.css`/`.scss` dont le nom contient `token`, `variables`, `theme` ou `vars`.
- Au plus 20 candidats (tri par chemin), présentés en liste à cocher, tous cochés par défaut. Après lecture, un `.css`/`.scss` sans aucune propriété personnalisée est écarté avec un avertissement.

**D5 — Échantillon de code pour la couverture.** Extensions `.css .scss .less .js .jsx .ts .tsx .vue .svelte`, mêmes exclusions que D4, hors candidats tokens, hors fichiers de test (`.test.`, `.spec.`, dossiers `__tests__/`). Priorité aux chemins sous `src/`, `app/`, `components/`, `packages/`, puis le reste ; tri par chemin ; **au plus 60 fichiers**, chacun ≤ 200 Ko. Le nombre de fichiers retenus / éligibles est affiché.

**D6 — Mesure de couverture (`couverture.js`), heuristique assumée et expliquée sur la page.**
- **Usage de token** : chaque `var(--nom…)`.
- **Valeur en dur** : couleur littérale (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()/rgba()`, `hsl()/hsla()`) ou longueur en `px` autre que `0`/`1px`, **hors** d'un `var(...)` (valeur de secours) et hors commentaires (`/* */`, `//` en début de ligne pour JS/TS). Dans les `.js/.ts/.jsx/.tsx/.vue/.svelte`, un `#hex` n'est compté que s'il est entre guillemets ou dans un bloc `<style>` (évite les ancres `#id`).
- Résultat : `{ fichiersAnalyses, usagesTokens, valeursEnDur, taux (usages / (usages + enDur), null si 0), parFichier: top 10 fichiers par valeurs en dur, valeursRepetees: top 10 valeurs en dur (normalisées avec normaliserValeur d'outils.js) avec nombre et fichiers, dejaTokenisees: valeurs en dur égales à la valeur brute d'un token existant → { valeur, token, occurrences } }`.
- **Usages externes pour R6** : `analyse(fichiers, options)` accepte `options.usagesExternes` (ensemble de noms). Chaque `var(--a-b-c)` du code marque utilisés `--a-b-c` **et** `a.b.c` (noms DTCG/Tokens Studio). R6 ne signale plus ces tokens. `analyse(fichiers)` sans option garde exactement le comportement actuel.

**D7 — Interface.** En tête de la zone d'entrée, un bloc « Depuis GitHub » : champ d'adresse, bouton « Explorer », lien-bouton « Essayer avec ce site » (remplit `https://github.com/michael-misran/misran-labs`). Après exploration : dépôt, branche, nombre de fichiers, liste des candidats tokens à cocher, taille de l'échantillon de code, bouton « Analyser ». Pendant les chargements : indication de progression (« 12 / 60 fichiers »), boutons désactivés. L'analyse remplit la liste de fichiers existante (préfixe `<o>/<r>/` dans le nom) et le rapport habituel, puis une section « Couverture du code » (D6) : tuile taux, tuiles usages / valeurs en dur, trois listes. Si aucun candidat tokens n'est trouvé : le dire, et proposer quand même la couverture. Styles : uniquement les tokens existants, comme le reste de la page.

**D8 — Honnêteté sur la confidentialité.** Le texte d'intro devient : les fichiers collés ou déposés ne quittent jamais le navigateur ; le mode GitHub lit des fichiers **publics** directement depuis GitHub, sans compte, et n'envoie rien d'autre que l'adresse du dépôt. Aucune autre requête.

**D9 — Bilingue.** Tous les nouveaux textes FR et EN (messages d'erreur, explication de l'heuristique, rapport copié qui inclut désormais la couverture).

**D10 — Vérification sans réseau.** `missions/audit-github/verifier-github.mjs` (Node, `assert`), avec un `fetch` simulé et des fixtures dans `missions/audit-github/fixtures/` (réponse `repos`, arbre `git/trees` d'une vingtaine de chemins couvrant chaque règle de D4/D5, quelques fichiers) : `lireAdresse` sur toutes les formes de D2 et 3 adresses invalides ; repérage des candidats et de l'échantillon ; gestion 404, limite atteinte (heure de reprise), arbre tronqué ; `mesurerCouverture` sur des extraits CSS et JSX connus (compte exact attendu, `#id` non compté, `var(--x, #fff)` non compté) ; `dejaTokenisees` ; `usagesExternes` qui fait disparaître un constat R6, et `analyse` sans option inchangée (relancer aussi `node missions/audit-tokens/verifier-analyse.mjs`).

**D11 — Réseau pendant la mission.** Exception unique aux « pas d'appels à des services externes » : la vérification dans le navigateur peut explorer **le seul** dépôt public `michael-misran/misran-labs` (quelques requêtes GitHub en lecture). Aucun autre dépôt, aucun autre service.

## Critères d'acceptation
1. `node missions/audit-github/verifier-github.mjs` et `node missions/audit-tokens/verifier-analyse.mjs` passent (code 0).
2. Sur `/lab/audit-tokens`, « Essayer avec ce site » puis « Explorer » affiche le dépôt, sa branche, au moins `src/styles/tokens.css` parmi les candidats, et un échantillon de code ; « Analyser » affiche le rapport habituel **et** la section Couverture (taux, listes).
3. Dans ce rapport, R6 signale moins de tokens inutilisés que « Auditer les tokens de ce site » (qui en signale 56 infos au total) : les usages du code sont pris en compte.
4. Adresse invalide et dépôt inexistant (`michael-misran/nexiste-pas-xyz`, 1 requête) : message clair, pas d'erreur console, page intacte.
5. Onglet réseau : pendant une exploration + analyse, seules des requêtes vers `api.github.com` (au plus 2) et `raw.githubusercontent.com` ; aucune requête avant le clic ; aucune pendant une analyse de fichiers collés.
6. FR et EN complets ; lisible à 375 px sans défilement horizontal de la page.
7. Les fonctionnalités de la mission 1 marchent toujours (exemples, « Auditer les tokens de ce site », dépôt de fichier).
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
9. Aucun secret, jeton ou chiffre économique dans `git diff main...auto/audit-github`.
10. Tout est commité sur `auto/audit-github`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Dépôts privés, connexion GitHub, jeton personnel (demande Michael + secrets).
- GitLab, Bitbucket, branches contenant `/`.
- Tout ce qui relève de la mission 3 (grille notée, contrastes, composants, documentation, gouvernance, export PDF).
- Mémoriser les dépôts explorés, partager un lien vers un rapport.
