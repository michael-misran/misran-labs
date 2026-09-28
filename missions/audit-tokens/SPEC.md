# Mission audit-tokens — SPEC

Rédigée par Opus (cadrage), 2026-09-28. Brief de Michael : « on développe P-004 », précisé ensuite : l'outil doit à terme faire tout l'audit d'un design system, se connecter à GitHub, et **le format JSON est impératif**.

## Contexte
P-004 (`src/projets/idees/P-004.json`) : audit de design system. Choix de Michael (2026-09-28) :
- l'outil vit **dans le Lab** pour commencer ;
- **dépôts GitHub publics** d'abord (pas de connexion, pas de secret) ;
- **pas d'IA** à l'exécution : analyse par règles, chiffrée.

L'outil complet est découpé en 3 missions successives (voir « Feuille de route » en bas). **Celle-ci est la première** : le moteur d'analyse des tokens, multi-formats, et sa page. Il doit être conçu pour que les missions 2 (GitHub) et 3 (grille complète) s'y branchent sans le réécrire.

Existant utile :
- Le Lab (`src/lab/projects.js`, tableau `PROJECTS`) : chaque projet a un `slug`, un `component`, s'affiche sur `/lab/<slug>` avec un numéro de dossier calculé (`dossierNo`).
- `src/lab/projects/LabTokens.jsx` (dossier 007) : page interactive au même habillage (`CaseMasthead`, `CaseHero`, `CaseFooter` de `src/lab/CaseFile.jsx`, `useIsMobile`, `useLanguage`). **Modèle de mise en page à suivre.**
- `src/styles/tokens.css` : tokens du site (primitive → semantic → component), nettoyés par la mission `tokens-fix`.
- Aucun framework de test, aucune route `/contact`. Lien LinkedIn public dans `src/modules/CVModule.jsx`.

## Objectif
Une page `/lab/audit-tokens` où l'on colle ou dépose un ou plusieurs fichiers de tokens — **CSS, JSON W3C (DTCG) ou JSON Tokens Studio** — et où l'on obtient immédiatement, dans le navigateur, un rapport clair des incohérences, en FR et en EN.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Emplacement.** Nouveau projet du Lab : slug `audit-tokens`, icône `◎`, `type: 'tool'`, `status: 'READY'`, `featured: false`, `phases: {}`, ajouté **à la fin** de `PROJECTS` (numéros de dossier existants inchangés). Titre FR « Audit de design system », EN « Design system audit ». Composant `src/lab/projects/AuditTokens.jsx`, mise en page calquée sur `LabTokens.jsx`.

**D2 — Architecture du moteur (pensée pour les missions 2 et 3).** Dossier `src/lab/audit/`, modules ES purs, **sans import React ni Vite**, importables par Node :
- `lireFichiers.js` : `lireFichiers(fichiers)` où `fichiers = [{ nom, contenu }]` → détecte le format de chaque fichier (D3), appelle le bon lecteur, renvoie `{ tokens, avertissements }` (modèle commun D4). Un fichier illisible produit un avertissement, jamais une exception.
- `lecteurs/css.js`, `lecteurs/dtcg.js`, `lecteurs/tokensStudio.js` : un lecteur par format.
- `regles.js` : un tableau de règles, chacune `{ id, gravite, verifier(contexte) → constats[] }`. Ajouter une règle = ajouter un objet, rien d'autre (les missions suivantes en ajouteront).
- `analyse.js` : `analyse(fichiers)` → `{ tokens, constats, resume, avertissements }`. Point d'entrée unique de la page et des missions suivantes.
La page ne fait qu'afficher ce résultat.

**D3 — Formats et détection.**
- **CSS** (fichier `.css`/`.scss`, ou texte non JSON) : propriétés personnalisées `--nom: valeur;` avec ligne et sélecteur englobant ; déclarations ordinaires relevées pour R3. Commentaires `/* */` retirés en conservant les numéros de ligne. Références = `var(--x)` (avec ou sans fallback).
- **JSON W3C DTCG** : un token est un objet qui a `$value` ; `$type` hérité du groupe parent s'il manque ; nom = chemin des groupes joint par des points (`color.brand.primary`) ; références = `{color.brand.primary}` dans une valeur texte. Clés commençant par `$` ignorées comme groupes.
- **JSON Tokens Studio** : un token est un objet qui a `value` (et en général `type`) ; les ensembles de premier niveau (`global`, `light`, `dark`…) deviennent le **contexte** du token ; `$themes` et `$metadata` ignorés ; références `{…}` comme DTCG, résolues d'abord dans le même ensemble puis dans tous.
- Détection : JSON valide contenant au moins un `$value` → DTCG ; sinon JSON contenant au moins un objet avec `value` → Tokens Studio ; JSON sans token → avertissement « aucun token reconnu » ; JSON invalide → avertissement avec la position de l'erreur.
- Valeurs composites JSON (ombre, typographie : objets ou tableaux) : conservées telles quelles, références cherchées dans toutes leurs chaînes, exclues des règles R4 et R5.

**D4 — Modèle commun d'un token.** `{ nom, valeur, type, references: [noms], fichier, emplacement, contexte }` — `emplacement` = numéro de ligne (CSS) ou chemin JSON ; `contexte` = sélecteur (CSS) ou ensemble (Tokens Studio) ou `null` ; `type` = `$type`/`type` du JSON, ou déduit pour le CSS (`color` si la valeur brute est une couleur, `dimension` si longueur, sinon `null`). Pour que les règles restent communes, les noms CSS sont gardés avec leurs `--`.

**D5 — Aucune IA, aucun appel réseau, tolérance.** Analyse déterministe 100 % dans le navigateur : rien n'est envoyé nulle part, et la page le dit. Entrées au-delà de 300 000 caractères au total tronquées avec un avertissement. Toute erreur interne est attrapée et affichée comme message, jamais de page cassée.

**D6 — Règles (exactement celles-ci).** Chaque constat : `{ regle, gravite, tokens: [noms], fichier, emplacement, detail: { fr, en } }`. Gravités : `erreur`, `avertissement`, `info`.
- **R1 Référence cassée** (erreur) : référence vers un token défini nulle part (tous fichiers confondus). En CSS, un `var(--x, fallback)` cassé est un **avertissement**, pas une erreur.
- **R2 Référence circulaire** (erreur) : `a` → `b` → … → `a`.
- **R3 Valeur codée en dur hors tokens** (avertissement, CSS seulement) : dans une déclaration ordinaire, couleur littérale (`#hex`, `rgb()/rgba()`, `hsl()/hsla()`) ou longueur en `px` autre que `0`/`1px`, sans `var(`.
- **R4 Doublon de valeur** (avertissement) : au moins deux tokens à valeur brute (sans référence) dans le même fichier et le même contexte ont exactement la même valeur normalisée (espaces réduits, minuscules, hex court développé : `#fff` = `#ffffff`). Un constat par groupe, qui liste les noms.
- **R5 Couleurs quasi identiques** (info) : deux tokens couleur à valeur brute, opaques, dont chaque composante RGB diffère de ≤ 3 sans être égales. Formats de couleur à lire : `#rgb`, `#rrggbb`, `rgb()`, `rgba()` avec alpha 1.
- **R6 Token inutilisé** (info) : token jamais référencé dans les fichiers fournis. Le détail précise qu'il peut être utilisé ailleurs (code, autres fichiers).
- **R7 Chaîne d'alias trop longue** (info) : plus de 3 références successives avant la valeur finale.
- **R8 Type manquant** (info, JSON seulement) : token sans `$type`/`type`, ni hérité.
Un même nom défini dans plusieurs contextes (`:root` et `[data-invert]`, ensembles `light` et `dark`) est une **surcharge normale**, pas un doublon ni une redéfinition.

**D7 — Résumé.** `resume` = nombre de fichiers, de tokens par format et par type, de constats par gravité, et part de tokens « sains » (sans constat erreur ni avertissement). Des chiffres bruts, pas de note sur 100 (la grille notée arrive en mission 3).

**D8 — Interface.** Dans l'ordre :
1. Court texte d'intro : ce que fait l'outil, formats acceptés, rien ne quitte le navigateur.
2. Zone d'entrée : une zone de texte monospace (un fichier collé, format détecté automatiquement) **et** un sélecteur de fichiers local multiple (`<input type="file" multiple accept=".css,.scss,.json">`, lu avec `FileReader`/`file.text()`, jamais envoyé). Les fichiers chargés s'affichent en liste (nom, format détecté, nombre de tokens), chacun retirable.
3. Boutons : « Analyser » ; « Exemples » avec trois choix (CSS, DTCG, Tokens Studio : fichiers `src/lab/audit/exemples/exemple.css`, `exemple.dtcg.json`, `exemple.tokens-studio.json`, qui à eux trois déclenchent **chacune** des règles R1 à R8) ; « Auditer les tokens de ce site » (charge `src/styles/tokens.css` via `?raw`).
4. Résumé, puis constats groupés par règle, triés par gravité (erreur d'abord) : tokens concernés, fichier, ligne ou chemin, explication. Filtre par gravité.
5. Bouton « Copier le rapport » (Markdown, via `navigator.clipboard`, repli silencieux).
Aucun constat → message positif clair. Styles : uniquement les tokens existants (`var(--…)`), comme `LabTokens.jsx`.

**D9 — Appel à l'action.** En bas de page, section courte : « Besoin d'un audit complet de votre design system ? » + lien LinkedIn `https://www.linkedin.com/in/michael-misran`. **Aucun prix, aucun chiffre économique** (dépôt public).

**D10 — Bilingue.** Tous les textes FR et EN, y compris explications des règles (`detail`) et rapport copié.

**D11 — Vérification sans framework.** Script `missions/audit-tokens/verifier-analyse.mjs`, lancé par `node missions/audit-tokens/verifier-analyse.mjs` : lit les trois exemples et `src/styles/tokens.css` avec `fs`, appelle `analyse`, vérifie avec `assert` : détection correcte des trois formats ; chaque règle R1 à R8 déclenchée au moins une fois par les exemples ; résolution d'une référence DTCG et d'une référence Tokens Studio entre ensembles ; cas limites sans exception (texte vide, `}}}{{`, JSON invalide, JSON sans token, CSS sans token). Affiche le résumé des tokens du site. Code de sortie ≠ 0 en cas d'échec.

**D12 — Tokens du site.** Si l'audit de `tokens.css` trouve des erreurs (R1, R2), **ne pas corriger** `tokens.css` : les lister dans le RAPPORT.

## Critères d'acceptation
1. `/lab/audit-tokens` s'affiche en FR et en EN, même habillage que la page Tokens du Lab ; le projet apparaît dans l'index du Lab ; numéros de dossier existants inchangés.
2. Chacun des trois exemples se charge et s'analyse ; ensemble, ils affichent au moins un constat de chaque règle R1 à R8. « Auditer les tokens de ce site » affiche un rapport sans planter.
3. Un fichier `.json` déposé via le sélecteur de fichiers est lu, son format détecté et affiché.
4. `node missions/audit-tokens/verifier-analyse.mjs` passe (code de sortie 0).
5. Coller `}}}{{`, un texte vide, un JSON invalide ou du CSS sans token n'affiche aucune erreur console et ne casse pas la page.
6. Aucune requête réseau déclenchée par une analyse ou un dépôt de fichier.
7. Lisible à 375 px, sans défilement horizontal de la page (le code peut défiler dans sa propre zone).
8. Aucun prix ni chiffre économique dans `git diff main...auto/audit-tokens`.
9. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial (6).
10. Tout est commité sur `auto/audit-tokens`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Tout ce qui relève des missions 2 et 3 ci-dessous (GitHub, grille, contrastes, composants, export).
- Formats Style Dictionary « legacy » (`value` sans ensembles) au-delà de ce que le lecteur Tokens Studio accepte déjà, variables Figma exportées, SCSS `$variables`.
- Correction de `src/styles/tokens.css`.

## Feuille de route (pour le RAPPORT — ne pas faire ici)
Chaque mission est cadrée après la fusion de la précédente, depuis `main`.
- **Mission 2 — `audit-github`** : saisir l'adresse d'un dépôt **public** ; l'outil liste l'arborescence (API GitHub, une requête `git/trees?recursive=1`, fichiers lus sur `raw.githubusercontent.com`), repère les fichiers de tokens (CSS avec `--`, `*.tokens.json`, dossier `tokens/`), les propose à l'analyse ; puis scanne un échantillon du code (`.css`, `.scss`, `.jsx`, `.tsx`, `.vue`) pour mesurer la **couverture** : part des valeurs de style qui passent par un token plutôt qu'une valeur en dur. Gestion de la limite de 60 requêtes/heure sans connexion.
- **Mission 3 — `audit-grille`** : la grille complète notée 0 à 3 sur 7 axes — architecture des tokens, couverture, accessibilité (contrastes des paires texte/fond), composants (inventaire, stories, états), documentation (README, Storybook, dossier docs), gouvernance (CHANGELOG, CODEOWNERS, versions), parité Figma ↔ code (saisie manuelle en attendant l'API Figma) ; matrice impact × effort des constats ; rapport exportable (Markdown + mise en page d'impression pour PDF).
- **Plus tard, avec Michael** (secrets et comptes à créer) : dépôts privés via connexion GitHub, lecture directe d'un fichier Figma, recommandations rédigées par IA.
