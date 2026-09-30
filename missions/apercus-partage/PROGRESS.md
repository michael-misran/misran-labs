# Mission apercus-partage — PROGRESS

**Statut :** étape 7 terminée
**Prochaine action :** étape 8 (RAPPORT.md)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur main de357bb)
- `npm run build` : passe — `index-BfD88Off.js` 319,78 kB (gzip 101,99 kB), aucun avertissement. `dist/` ne contient qu'un seul `index.html`.
- `npm run lint` : 0 erreur.
- `import('./src/lab/projects.js')` depuis Node : fonctionne, 9 projets visibles (design-system-multimarques, lost-cauldron-game, design-system, workflow, exp-003, cv, lab-tokens, utilisation-ia, audit-tokens).
- Données : 2 numéros du Magazine (2026-09-27, 2026-09-28), 5 idées (P-001 à P-005).

## Étape 1 (confirmé sur auto/apercus-partage, 2026-09-30)
- `npm run build` : passe. `find dist -name index.html` → `dist/index.html`, `dist/games/lost-cauldron-game/index.html`, `dist/games/lost-cauldron-game-v0.2/index.html` (fichiers statiques des jeux, hors périmètre du plugin). Bundle principal `index-BfD88Off.js` 319,78 kB.
- `npm run lint` : 0 erreur.

## Étape 2 (2026-09-30)
- `scripts/share-previews.js` créé : lecture `dist/index.html`, remplacement précis de `<title>`, `meta description`, `og:*`, `twitter:*`, ajout/mise à jour de `<link rel="canonical">` ; échec du build si une balise attendue est introuvable ; échappement HTML de toute valeur insérée ; troncature au dernier espace avant 155 caractères (+ « … ») si le texte dépasse 160 caractères ; espaces/retours à la ligne ramenés à un seul espace.
- Lecture directe des JSON (`fs`) pour Magazine (`src/magazine/numeros/*.json`) et Idées (`src/projets/idees/*.json`) ; un fichier illisible ou sans les champs requis (`date`/`id` cohérent avec le nom de fichier, `numero`, `titre.fr`, `edito.fr`/`resume.fr`) est ignoré avec avertissement console, sans faire échouer le build.
- **Bug trouvé et corrigé pendant l'étape** : `numero: 0` (numéro 0 du Magazine, « Présentation ») était rejeté à tort par un test `if (!value)` — `0` est falsy en JS. Corrigé en testant explicitement `undefined`/`null`/`''`. Voir DECISIONS.md.
- `visibleProjects()` de `src/lab/projects.js` importé tel quel (`await import()`), pas de duplication de la liste.
- Branché dans `vite.config.js` (`plugins: [..., sharePreviewsPlugin()]`), `apply: 'build'` + hook `closeBundle`.
- Build : 19 pages générées (`/magazine`, `/magazine/2026-09-27`, `/magazine/2026-09-28`, `/projets`, `/projets/fonctionnement`, `/projets/P-001` à `P-005`, `/lab/<9 slugs>`). `find dist -name index.html` ne contient, en plus, que les deux `dist/games/*/index.html` préexistants (fichiers statiques de `public/games/`, non générés par le plugin, non listés en D2 mais non privés).
- Vérifié : `dist/magazine/2026-09-28/index.html` et `dist/index.html` référencent exactement les mêmes `/assets/*.js`/`*.css` (`diff` identique).
- `<link rel="canonical" href="https://misran-labs.vercel.app/">` ajouté dans `dist/index.html`.

## Étape 3 (2026-09-30)
Textes fixes de D2 déjà rédigés dans le plugin à l'étape 2 (`MAGAZINE_FIXED`, `PROJETS_FIXED`, `PROJETS_FONCTIONNEMENT_FIXED`). Build relancé, greps du critère 2 sur un fichier de chaque type :

```
== / (home) ==
<title>Misran Labs — le laboratoire de Michael Misran</title>
og:type=website · og:title=idem · canonical=https://misran-labs.vercel.app/

== /magazine ==
<title>Lab Magazine — veille IA hebdomadaire · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/magazine

== /magazine/2026-09-28 ==
<title>Nº 1 — Prix en baisse, agents en expansion · Lab Magazine</title>
og:type=article · canonical=https://misran-labs.vercel.app/magazine/2026-09-28

== /projets ==
<title>Projets — idées en développement · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/projets

== /projets/fonctionnement ==
<title>Comment fonctionnent les Projets · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/projets/fonctionnement

== /projets/P-001 ==
<title>P-001 — Application de prise de mandat pour agent immobilier · Misran Labs</title>
og:type=article · canonical=https://misran-labs.vercel.app/projets/P-001

== /lab/lab-tokens ==
<title>Tokens du Lab — Lab · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/lab/lab-tokens
```

`find dist -name index.html` (critère 7) :
```
dist/games/lost-cauldron-game-v0.2/index.html   ← préexistant, public/games/, hors plugin
dist/games/lost-cauldron-game/index.html        ← préexistant, public/games/, hors plugin
dist/index.html
dist/lab/audit-tokens/index.html
dist/lab/cv/index.html
dist/lab/design-system-multimarques/index.html
dist/lab/design-system/index.html
dist/lab/exp-003/index.html
dist/lab/lab-tokens/index.html
dist/lab/lost-cauldron-game/index.html
dist/lab/utilisation-ia/index.html
dist/lab/workflow/index.html
dist/magazine/2026-09-27/index.html
dist/magazine/2026-09-28/index.html
dist/magazine/index.html
dist/projets/P-001/index.html
dist/projets/P-002/index.html
dist/projets/P-003/index.html
dist/projets/P-004/index.html
dist/projets/P-005/index.html
dist/projets/fonctionnement/index.html
dist/projets/index.html
```
Aucune page privée (MAIA, Conforma, backlog) générée : ces chemins n'existent pas dans `src/App.jsx` et ne sont pas dans les données lues par le plugin.

## Étape 4 (2026-09-30)
- **Découverte importante** : un fichier `src/magazine/numeros/*.json` syntaxiquement invalide (JSON cassé) fait échouer `npm run build` **avant même** que le plugin s'exécute — cause : `src/magazine/numeros.js` charge déjà tous ces fichiers avec `import.meta.glob('./numeros/*.json', { eager: true })`, et Vite doit pouvoir parser chaque fichier JSON comme module au moment du bundle, indépendamment de notre plugin. C'est un comportement préexistant du site (non introduit par cette mission) ; testé puis noté dans DECISIONS.md. Le critère 3 de la SPEC est donc vérifié avec un JSON syntaxiquement **valide** mais sémantiquement incomplet (champ manquant), scénario que notre plugin couvre réellement.
- Test « champ manquant » : fichier temporaire `src/magazine/numeros/2026-09-29.json` avec `edito.en` mais sans `edito.fr` → `npm run build` passe, log `[share-previews] ignoré (champ "edito.fr" manquant) : .../2026-09-29.json`, fichier supprimé avant commit.
- Test échappement : fichier temporaire avec `titre.fr` = `Test "robuste" & <échappé>` et `edito.fr` contenant `"` et `&` → sortie `dist/magazine/2026-09-29/index.html` : `<title>Nº 2 — Test &quot;robuste&quot; &amp; &lt;échappé&gt; · Lab Magazine</title>`, `og:description` avec `&quot;`/`&amp;` corrects. Fichier supprimé avant commit, `git status` vérifié propre (aucun fichier de test resté, `dist/` est gitignored).

## Étape 5 (2026-09-30)
- Sources HTML dans `missions/apercus-partage/` : `og-magazine-source.html`, `og-projets-source.html`, `og-lab-source.html` — dérivées d'`missions/site-finitions/og-image-source.html` (même fond `#f3ebdc`, cadre encre, tampon corail « MISRAN · LABS · M », Fraunces 900 pour le titre, JetBrains Mono pour l'eyebrow « MISRAN LABS » et le sous-titre).
- Rendu PNG via Chrome headless (`--headless=new --window-size=1200,630 --virtual-time-budget=4000`), comme dans `site-finitions`.
- `public/og-magazine.png`, `public/og-projets.png`, `public/og-lab.png` : 1200×630 confirmé par `sips -g pixelWidth -g pixelHeight`. Contrôle visuel : lisibles, cohérentes entre elles et avec `og-image.png`.

## Étape 6 (2026-09-30, sous-agent general-purpose/Haiku)
- Une ligne ajoutée en fin de `src/magazine/FORMAT.md` : « L'aperçu de partage (titre, description) est généré automatiquement au build à partir de `titre.fr` et `edito.fr` — aucune action supplémentaire n'est nécessaire. »
- Une ligne ajoutée en fin de `src/projets/FORMAT.md` : « L'aperçu de partage (titre, description) est généré automatiquement au build à partir de `titre.fr` et `resume.fr` — aucune action supplémentaire n'est nécessaire. »
- Diff relu par la session principale avant commit : rien d'autre modifié.

## Étape 7 (2026-09-30)
- `npm run build` : passe, 19 pages générées (inchangé). `npm run lint` : **1 erreur trouvée** (`'process' is not defined` dans `scripts/share-previews.js`) — corrigée en ajoutant `scripts/**/*.js` aux globals Node de `eslint.config.js` (même traitement que `vite.config.js`/`api/**/*.js`, voir DECISIONS.md). Après correction : 0 erreur.
- `npx vite preview` (port 4173) lancé en arrière-plan par la session principale.
- **Découverte** : `vite preview` (via `sirv`) ne résout la copie statique `dist/<chemin>/index.html` que si l'URL a un **slash final** (`/magazine/2026-09-28/`) ; sans slash final, il retombe systématiquement sur `dist/index.html` (accueil), y compris pour des pages non générées comme `/lab/lost-cauldron-game/demo`. C'est une particularité du serveur de test local (`sirv`/`vite preview`), **pas** du comportement de Vercel : Vercel sert nativement `<chemin>/index.html` pour `<chemin>` sans exiger de slash final (vérifié au cadrage, SPEC § Contexte). Testé les deux formes ci-dessous ; noté dans DECISIONS.md.
- `curl` (critère 4, avec slash final pour contourner la particularité de `vite preview`) :
  - `http://localhost:4173/magazine/2026-09-28/` → `<title>Nº 1 — Prix en baisse, agents en expansion · Lab Magazine</title>` ✓
  - `http://localhost:4173/lab/lab-tokens/` → `<title>Tokens du Lab — Lab · Misran Labs</title>` ✓
  - `http://localhost:4173/lab/lost-cauldron-game/demo` (page non générée, sans ni avec slash) → `<title>Misran Labs — le laboratoire de Michael Misran</title>` (aperçu d'accueil) ✓
- Vérification navigateur déléguée à `verificateur` (Haiku) sur les 7 pages du critère 4 : chargement direct + navigation par la barre latérale + bascule FR/EN sur 2 pages. **Aucune régression visuelle, aucune erreur console** (seuls 3 avertissements WebGL Godot normaux au démarrage du jeu, page 7). Rapport complet dans DELEGATIONS.md.
- Serveur `vite preview` arrêté en fin d'étape.
