# Mission audit-github — RAPPORT

2026-09-28. Branche `auto/audit-github`, rien poussé, rien sur `main`.

## Fait
- **Lecture d'un dépôt GitHub public** `src/lab/audit/github.js` (module pur, `fetch` injecté) : `lireAdresse` (toutes les formes de D2), `explorerDepot` (2 requêtes vers `api.github.com`, sans en-tête), `reperer` (candidats tokens ≤ 20, échantillon de code ≤ 60), `lireContenus` (6 en parallèle sur `raw.githubusercontent.com`, progression, un fichier en échec n'arrête rien), `filtrerCandidatsLus`. Erreurs bilingues : dépôt introuvable ou privé, branche introuvable, limite de GitHub atteinte avec l'heure de reprise, erreur réseau. Aucune exception vers la page.
- **Mesure de couverture** `src/lab/audit/couverture.js` : usages `var(--…)`, valeurs en dur (couleurs, px), taux, top 10 fichiers, top 10 valeurs répétées, valeurs en dur qui ont déjà un token. Heuristique expliquée sur la page.
- **`analyse(fichiers, options)`** : option `usagesExternes` ; R6 tient compte des usages du code. Sans option, résultat strictement identique (vérifié).
- **Interface** `src/lab/projects/audit/` : `SourceGithub.jsx` (bloc « Depuis GitHub » en tête de la zone d'entrée), `Couverture.jsx`, `textes.js` (FR + EN), `ui.jsx`, `styles.js` ; `AuditTokens.jsx` les intègre. Le rapport copié inclut la couverture.
- **Vérification sans réseau** `missions/audit-github/verifier-github.mjs` (33 vérifications, `fetch` simulé) + fixtures.

## Pas fait
- Dépôts privés, connexion GitHub, jeton personnel (hors périmètre : demande Michael + secrets).
- GitLab, Bitbucket, branches contenant un `/`.
- Tout ce qui relève de la mission 3 (grille notée, contrastes, composants, documentation, gouvernance, export PDF).
- Mémoriser les dépôts explorés, partager un lien vers un rapport.

## Critères d'acceptation
1. **OK** — `node missions/audit-github/verifier-github.mjs` (33 vérifications) et `node missions/audit-tokens/verifier-analyse.mjs` : code de sortie 0.
2. **OK** — « Essayer avec ce site » puis « Explorer » : dépôt `michael-misran/misran-labs`, branche `main`, 4 fichiers de tokens cochés dont `src/styles/tokens.css`, « 60 fichiers sur 104 éligibles ». « Analyser ce dépôt » : rapport habituel (164 tokens, 84 % sains) **et** section Couverture : **82 %**, 661 usages de tokens, 150 valeurs en dur, trois listes (vu par la session principale et par le vérificateur).
3. **OK** — R6 : 11 constats avec le code du dépôt (14 infos au total), contre 55 (56 infos) pour « Auditer les tokens de ce site » sans code. Les usages du code sont pris en compte.
4. **OK** — Adresse invalide et `michael-misran/nexiste-pas-xyz` : message clair (« Dépôt introuvable ou privé. »), page intacte (vérifié par le vérificateur ; la session principale n'a pas refait ce cas à la main, il est couvert aussi par le script sur `fetch` simulé). Réserve : le navigateur écrit lui-même « Failed to load resource: 404 » dans la console pour la requête vers un dépôt inexistant ; aucune erreur JavaScript.
5. **OK** — Réseau relevé par la session principale pendant une exploration + analyse : 2 requêtes `api.github.com` (dépôt, arborescence) et 64 `raw.githubusercontent.com` (4 fichiers de tokens + 60 de code) ; les seules autres origines sont les polices Google déjà présentes sur toute la page. Rien avant le clic. `fetch` est appelé avec un seul argument (pas d'en-tête, contrôlé par le script). Aucune requête pendant l'analyse d'exemples ou de fichiers collés (vérificateur).
6. **OK** — FR et EN complets (page en anglais vue par la session principale ; textes traduits relus). À 375 px : pas de défilement horizontal, constaté par le vérificateur ; la session principale n'a mesuré que `scrollWidth` = `innerWidth` à 1024 px.
7. **OK** — Exemples CSS / DTCG / Tokens Studio et « Auditer les tokens de ce site » fonctionnent (vérificateur : 18, 8 et 11 tokens, puis 153). Le dépôt de fichier n'a pas été retesté (aucun code touché côté lecture des fichiers).
8. **OK** — `npm run build` passe ; `npm run lint` : 6 erreurs, les mêmes qu'à l'état initial (VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell), aucune nouvelle.
9. **OK** — Recherche de secrets, jetons et mots de passe dans les fichiers du diff : rien (seules occurrences : la SPEC et des textes de pages existantes). Aucun chiffre économique.
10. **OK** — Tout est commité sur `auto/audit-github`, rien sur `main`, rien poussé.

## Comment vérifier
```bash
node missions/audit-github/verifier-github.mjs
node missions/audit-tokens/verifier-analyse.mjs
```
Puis `npm run build`, `npx vite preview`, ouvrir `http://localhost:4173/lab/audit-tokens`, cliquer « Essayer avec ce site », « Explorer », « Analyser ce dépôt » (réseau requis), regarder la section Couverture, passer en EN, réduire à 375 px.

## Décisions (détail dans DECISIONS.md)
- Exclusions de dossiers par segment entier (`dist/` n'écarte pas `redist/`) ; tri par code de caractères, pas par locale.
- Couverture : dans le code JS/TS/Vue/Svelte, couleurs et px ne sont comptés que dans les chaînes de caractères et les blocs `<style>` ; en CSS, seulement les valeurs de déclarations (un `#id { }` n'est jamais une couleur).
- Une couleur qui contient un `var(…)` n'est pas comptée en dur ; une valeur vue une seule fois n'est pas « répétée ».
- Le code du dépôt reste en mémoire pour un nouveau clic sur « Analyser », sauf si du texte est collé ou des fichiers ajoutés à la main.

## Délégations (modèles réellement utilisés)
- Étape 0 (cadrage) : Opus. Étapes 1 à 4, 6 (build, lint, scripts, contrôles réseau) et 7 : Sonnet, session principale.
- Étape 5 : agent `general-purpose`, **Haiku**, traduction EN de `textes.js` ; relue, une correction (« Ko » → « KB »).
- Étape 6 : agent `verificateur`, **Haiku**, contrôle dans le navigateur (points 2 à 8). Son rapport était très court : la session principale a refait elle-même le contrôle du réseau, de la section Couverture, de l'anglais et de l'absence de messages de lecture inattendus. Aucun agent `expert`.

## Recommandations
- **Mission 3** (grille notée, contrastes, composants, documentation, gouvernance) : à cadrer ; la couverture et le taux de tokens sont prêts à devenir des critères notés.
- Le texte d'appel à l'action de la page (« un audit complet regarde aussi la couverture dans le code… ») est maintenant en partie obsolète : à reformuler quand la mission 3 sera cadrée.
- Sur le site lui-même, l'échantillon de 60 fichiers inclut `src/lab/audit/exemples/exemple.css` (exemple volontairement fautif) : il fait monter les valeurs en dur. Une exclusion des dossiers `exemples/`, `fixtures/`, `mocks/` dans D5 serait plus juste.
- Les valeurs qui reviennent le plus (`12px` ×15, `8px` ×15) ont déjà un token (`--primitive-size-12`, `--primitive-size-8`) : première correction concrète à proposer sur le site.
- Limite connue de l'heuristique : ne voit ni les classes utilitaires, ni les unités `rem`/`em`, ni les thèmes définis en JavaScript ; un `'#add'` passé à `querySelector` serait compté comme couleur.
- Sans connexion, GitHub limite à 60 requêtes/heure : chaque exploration en consomme 2 (les fichiers passent par `raw.githubusercontent.com`, non comptés). Pour des dépôts privés ou un usage intensif, il faudrait un jeton (décision et secret à traiter avec Michael).
