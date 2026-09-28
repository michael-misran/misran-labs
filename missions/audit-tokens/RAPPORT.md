# Mission audit-tokens — RAPPORT

2026-09-28. Branche `auto/audit-tokens`, rien poussé, rien sur `main`.

## Fait
- **Moteur d'audit** `src/lab/audit/` (modules purs, sans React ni Vite, testables sous Node) :
  - `analyse.js` (point d'entrée unique), `lireFichiers.js` (détection du format + limite de 300 000 caractères), `regles.js` (R1 à R8, une règle = un objet), `outils.js`.
  - Trois lecteurs : `lecteurs/css.js`, `lecteurs/dtcg.js`, `lecteurs/tokensStudio.js`.
  - Trois exemples dans `exemples/` qui déclenchent ensemble R1 à R8.
- **Page** `/lab/audit-tokens` (`src/lab/projects/AuditTokens.jsx`), dossier 009 dans l'index du Lab, FR et EN : zone de collage, sélecteur de fichiers multiple + glisser-déposer, liste des fichiers (format, nombre de tokens, retrait), Analyser, trois exemples, « Auditer les tokens de ce site », résumé chiffré, constats groupés par règle et filtrés par gravité, « Copier le rapport » (Markdown), appel à l'action LinkedIn sans prix.
- **Script de vérification** `missions/audit-tokens/verifier-analyse.mjs` (29 vérifications).

## Pas fait
- Le projet n'est pas dans la **barre latérale** (voir recommandations).
- Rien des missions 2 et 3, ni des formats hors périmètre (Style Dictionary legacy, variables Figma, SCSS `$variables`).
- `src/styles/tokens.css` non touché (D12).

## Critères d'acceptation
1. **OK** — `/lab/audit-tokens` s'affiche en FR et EN avec l'habillage de la page Tokens ; présent dans l'index de la home (dossier 009, vérifié) ; numéros 001 à 008 inchangés. Absent de la sidebar (liste choisie à la main).
2. **OK** — Les trois exemples s'analysent : CSS montre R1 à R7, DTCG et Tokens Studio montrent R1, R4, R5, R6, R8 ; R8 n'existe que côté JSON. « Auditer les tokens de ce site » : 153 tokens, 0 erreur, 3 avertissements, 56 infos, sans plantage.
3. **OK** — Un `test.json` injecté dans l'`input[type=file]` est lu, affiché « JSON DTCG · 1 token », retirable.
4. **OK** — `node missions/audit-tokens/verifier-analyse.mjs` : code de sortie 0.
5. **OK** — `}}}{{`, texte vide, JSON invalide, CSS sans token : pas de plantage, pas d'erreur console, messages clairs.
6. **OK** — Aucune requête réseau déclenchée par une analyse ou un dépôt de fichier.
7. **OK** — À 375 px, `scrollWidth` = `innerWidth` (pas de défilement horizontal de la page).
8. **OK** — Aucun prix ni chiffre économique dans le diff (les seules occurrences sont les mentions « sans prix » de la SPEC et des DECISIONS).
9. **OK** — `npm run build` passe ; `npm run lint` : 6 erreurs, les mêmes qu'à l'état initial (aucune nouvelle).
10. **OK** — Tout est commité sur `auto/audit-tokens`, rien sur `main`, rien poussé.

## Audit des tokens du site (D12, `src/styles/tokens.css`)
153 tokens (CSS : 36 couleurs, 13 dimensions, 104 sans type déduit). **0 erreur (R1, R2)**, 3 avertissements, 56 infos ; 131 tokens sains sur 153 (86 %). Rien à corriger côté erreurs. Les infos sont surtout des R6 « inutilisé dans ce fichier seul » (les rôles sémantiques sont consommés par les composants, hors du fichier) : attendu, pas un défaut.

## Comment vérifier
```bash
node missions/audit-tokens/verifier-analyse.mjs
```
Puis `npm run build`, `npx vite preview`, ouvrir `http://localhost:4173/lab/audit-tokens`, cliquer les trois exemples et « Auditer les tokens de ce site », passer en EN, réduire à 375 px.

## Décisions (détail dans DECISIONS.md)
- R1 ne porte que sur les références de tokens, pas sur les `var()` des déclarations ordinaires (faux positifs sinon) ; celles-ci comptent comme « usage » pour R6.
- Contexte CSS = chaîne complète des sélecteurs (`@media print :root`) ; R4 exige deux noms distincts et normalise aussi les espaces autour de `, ( ) /` ; R7 et R2 signalent une fois par chaîne / cycle.
- Le modèle de token gagne `format` et `repli` ; `lireFichiers` renvoie aussi `declarations` et `fichiers`.
- Références Tokens Studio résolues par nom sur l'ensemble des fichiers.
- Exemples et « Auditer ce site » remplacent les fichiers chargés et analysent tout de suite ; constats affichés par paquets de 25 par règle.
- Projet non ajouté à la sidebar (hors périmètre).

## Délégations (modèles réellement utilisés)
- Étape 0 : Opus (cadrage).
- Étapes 1 à 4 et 7 : session principale, Sonnet 5.
- Étape 5 : `general-purpose`, **Haiku 4.5** — traduction EN. Relue par Sonnet : une apostrophe non échappée (`auditSite`) faisait planter la syntaxe, corrigée ; clés FR/EN identiques.
- Étape 6 : `verificateur`, **Haiku 4.5** — contrôle navigateur ; le serveur `vite preview` est tombé une fois pendant le contrôle et a été relancé ; le seul KO signalé (sidebar) est analysé ci-dessus.

## Recommandations
1. **Ajouter le projet à la sidebar** : `'audit-tokens'` dans `LAB_SLUGS` de `src/shell/Sidebar.jsx` (une ligne) — sinon l'outil n'est accessible que depuis l'index ou par son URL.
2. **Mission 2 — `audit-github`** : saisir l'adresse d'un dépôt public ; arborescence via l'API GitHub (`git/trees?recursive=1`), fichiers lus sur `raw.githubusercontent.com` ; repérer les fichiers de tokens (CSS avec `--`, `*.tokens.json`, dossier `tokens/`) et les proposer à `analyse()` ; scanner un échantillon de code (`.css`, `.scss`, `.jsx`, `.tsx`, `.vue`) pour mesurer la **couverture** (part des valeurs de style qui passent par un token) ; gérer la limite de 60 requêtes/heure sans connexion. Le moteur est prêt : il suffit de lui passer `[{ nom, contenu }]` et d'ajouter des règles au tableau `REGLES`.
3. **Mission 3 — `audit-grille`** : grille notée de 0 à 3 sur 7 axes (architecture des tokens, couverture, accessibilité/contrastes, composants, documentation, gouvernance, parité Figma ↔ code) ; matrice impact × effort ; rapport exportable (Markdown + impression PDF).
4. **Plus tard, avec Michael** (secrets et comptes) : dépôts privés via connexion GitHub, lecture directe de Figma, recommandations rédigées par IA.
5. Améliorations possibles du moteur : lecture des `$variables` SCSS, du format Style Dictionary legacy et des variables Figma exportées ; contrôle des contrastes texte/fond (mission 3).
