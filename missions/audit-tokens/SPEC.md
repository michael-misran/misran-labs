# Mission audit-tokens — SPEC

Rédigée par Opus (cadrage), 2026-09-28. Brief de Michael : « on développe P-004 » (idée `src/projets/idees/P-004.json` : audit de design system assisté par IA, en service ou petit outil).

## Contexte
P-004 a deux volets : un **service** d'audit (vendu par Michael, prospection comprise, hors de portée d'une mission) et un **petit outil** qui analyse un fichier de tokens et produit un rapport des incohérences. Cette mission construit l'outil, qui sert à la fois de démonstration, d'aimant à prospects sur le portfolio et de base pour les audits payants.

Existant utile :
- Le Lab (`src/lab/projects.js`, tableau `PROJECTS`) : chaque projet a un `slug`, un `component`, et s'affiche sur `/lab/<slug>` avec un numéro de dossier calculé (`dossierNo`).
- `src/lab/projects/LabTokens.jsx` (dossier 007) : page interactive au même habillage (`CaseMasthead`, `CaseHero`, `CaseFooter` de `src/lab/CaseFile.jsx`, `useIsMobile`, `useLanguage`). **Modèle de mise en page à suivre.**
- `src/styles/tokens.css` : les tokens du site (primitive → semantic → component), déjà nettoyés par la mission `tokens-fix` (0 valeur brute dans les semantics).
- Aucun framework de test ni route `/contact` dans le projet. Lien LinkedIn public déjà présent dans `src/modules/CVModule.jsx`.

## Objectif
Une page du Lab `/lab/audit-tokens` où l'on colle un fichier CSS de tokens et où l'on obtient immédiatement, dans le navigateur, un rapport clair des incohérences, en FR et en EN.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Emplacement.** Nouveau projet du Lab : slug `audit-tokens`, icône `◎`, `type: 'tool'`, `status: 'READY'`, `featured: false`, `phases: {}`, ajouté **à la fin** de `PROJECTS` (le numéro de dossier des projets existants ne change pas). Titre FR « Audit de tokens », EN « Token audit ». Composant `src/lab/projects/AuditTokens.jsx`, mise en page calquée sur `LabTokens.jsx`.

**D2 — Moteur séparé et pur.** Toute l'analyse vit dans `src/lab/audit/analyseTokens.js` : module ES pur, **sans import React ni Vite**, exportant `analyseTokens(cssText)` qui renvoie `{ tokens, findings, summary }`. Il doit pouvoir être importé tel quel par Node (critère 3). La page ne fait qu'afficher ce résultat.

**D3 — Aucune IA à l'exécution, aucun appel réseau.** Analyse déterministe par règles, 100 % côté navigateur : rien n'est envoyé nulle part. La page le dit explicitement (argument de confiance). Le « assisté par IA » de l'idée désigne la façon dont l'outil est construit (missions autonomes), et la page peut le mentionner honnêtement. Pas de saisie d'URL (CORS + appel externe) : on colle du texte.

**D4 — Analyseur CSS maison, tolérant.** Pas de dépendance. Retirer les commentaires `/* */` en conservant les numéros de ligne ; relever chaque déclaration de propriété personnalisée `--nom: valeur;` (nom, valeur, ligne, sélecteur englobant) et chaque déclaration ordinaire hors propriétés personnalisées (propriété, valeur, ligne, sélecteur). Un CSS invalide, vide ou énorme ne doit **jamais** faire planter la page : entrée tronquée au-delà de 300 000 caractères avec un avertissement, erreurs internes attrapées et affichées comme message.

**D5 — Règles (exactement celles-ci).** Chaque constat : `{ regle, gravite, token?, ligne, detail }`. Gravités : `erreur`, `avertissement`, `info`.
- **R1 Référence cassée** (erreur) : `var(--x)` sans fallback alors que `--x` n'est défini nulle part dans le texte.
- **R2 Référence circulaire** (erreur) : `--a` → `--b` → … → `--a`.
- **R3 Valeur codée en dur hors tokens** (avertissement) : dans une déclaration ordinaire (pas une propriété personnalisée), une couleur littérale (`#hex`, `rgb()/rgba()`, `hsl()/hsla()`) ou une longueur en `px` différente de `0`/`1px`, sans `var(`.
- **R4 Doublon de valeur** (avertissement) : au moins deux tokens à valeur brute (sans `var(`) dans le même sélecteur ont **exactement** la même valeur normalisée (espaces réduits, minuscules, hex court développé : `#fff` = `#ffffff`). Un seul constat par groupe, qui liste les noms.
- **R5 Couleurs quasi identiques** (info) : deux tokens couleur à valeur brute, opaques, dont les composantes RGB diffèrent chacune de ≤ 3 sans être égales.
- **R6 Token inutilisé** (info) : token jamais référencé par `var(--nom` dans le texte collé. Le détail précise qu'il peut être utilisé ailleurs (JS, autres fichiers).
- **R7 Chaîne d'alias trop longue** (info) : plus de 3 sauts de `var()` avant la valeur finale.
Le même token défini dans plusieurs sélecteurs (ex. `:root` et `[data-invert]`) est une **surcharge normale**, pas un doublon.

**D6 — Résumé.** `summary` = nombre de tokens, nombre de constats par gravité, et part de tokens « sains » (sans constat erreur ou avertissement). Pas de note sur 100 inventée : des chiffres bruts.

**D7 — Interface.** Dans l'ordre : court texte d'intro (ce que fait l'outil, que rien ne quitte le navigateur) ; zone de texte monospace ; trois boutons : « Analyser », « Charger un exemple » (fichier d'exemple `src/lab/audit/exemple.css` qui déclenche **chacune** des règles R1 à R7 au moins une fois), « Auditer les tokens de ce site » (charge `src/styles/tokens.css` via `import … from '../../styles/tokens.css?raw'`) ; puis le résumé ; puis les constats groupés par règle, triés par gravité (erreur d'abord), avec token, ligne et explication ; bouton « Copier le rapport » (Markdown, via `navigator.clipboard`, avec repli silencieux si indisponible). Aucun constat → message positif clair. Styles : uniquement les tokens existants (`var(--…)`), aucune couleur ni taille codée en dur nouvelle hors échelles déjà utilisées dans `LabTokens.jsx`.

**D8 — Appel à l'action.** En bas de page, section courte : « Besoin d'un audit complet de votre design system ? » + lien vers LinkedIn `https://www.linkedin.com/in/michael-misran` (déjà public). **Aucun prix, aucun chiffre économique** (ils restent dans la note privée, dépôt public).

**D9 — Bilingue.** Tous les textes FR et EN, y compris les explications de chaque règle et le rapport copié. Les textes des règles vivent dans le moteur ou dans un objet de textes de la page, jamais en dur dans le JSX sans traduction.

**D10 — Vérification sans framework.** Script `missions/audit-tokens/verifier-analyse.mjs` lancé par `node missions/audit-tokens/verifier-analyse.mjs` : lit `src/lab/audit/exemple.css` et `src/styles/tokens.css` avec `fs`, appelle `analyseTokens`, vérifie avec `assert` que l'exemple déclenche R1 à R7, et que des cas limites (texte vide, `}}}{{`, CSS sans token) ne lèvent pas d'exception. Affiche le résumé des tokens du site. Sort avec un code ≠ 0 en cas d'échec.

**D11 — Tokens du site.** Si l'audit de `tokens.css` trouve de vraies erreurs (R1, R2), **ne pas corriger** `tokens.css` : les lister dans le RAPPORT comme recommandation.

## Critères d'acceptation
1. `/lab/audit-tokens` s'affiche en FR et en EN, avec le même habillage que la page Tokens du Lab ; le projet apparaît dans l'index du Lab et les numéros de dossier des projets existants sont inchangés.
2. « Charger un exemple » puis « Analyser » affiche au moins un constat de chacune des règles R1 à R7 ; « Auditer les tokens de ce site » affiche un rapport sans planter.
3. `node missions/audit-tokens/verifier-analyse.mjs` passe (code de sortie 0).
4. Coller `}}}{{`, un texte vide, ou du CSS sans token n'affiche aucune erreur console et ne casse pas la page.
5. Aucune requête réseau déclenchée par une analyse (vérifié dans l'onglet réseau).
6. Lisible à 375 px de large, sans défilement horizontal de la page (le code peut défiler dans sa propre zone).
7. Aucun prix ni chiffre économique dans les fichiers modifiés (`git diff main...auto/audit-tokens`).
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial (6).
9. Tout est commité sur `auto/audit-tokens`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Analyse par une IA (appel API) pour des suggestions rédigées.
- Import par URL, par fichier Figma / Tokens Studio / JSON W3C.
- Export PDF du rapport, envoi du rapport par e-mail, formulaire de contact.
- Page de présentation du service d'audit, grille tarifaire.
- Correction de `src/styles/tokens.css`.
