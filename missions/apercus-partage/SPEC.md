# Mission apercus-partage — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « lance la mission sur les aperçus de partage » (suite de la recommandation n° 1 du RAPPORT de `site-finitions`).

## Contexte
- Le site est une application React en une seule page (Vite). `vercel.json` renvoie toutes les URL vers `/index.html` (`rewrites`). Les robots de partage (LinkedIn, WhatsApp, iMessage, Slack, X) **n'exécutent pas le JavaScript** : ils lisent seulement le HTML reçu.
- Depuis `site-finitions`, `index.html` contient un aperçu unique (titre, description, `og-image.png`) : un lien vers un numéro du Magazine, une idée ou un projet du Lab s'affiche exactement comme l'accueil.
- Pages publiques (`src/App.jsx`) : `/`, `/lab/:slug`, `/lab/:slug/demo/:version?`, `/magazine`, `/magazine/:date`, `/projets`, `/projets/fonctionnement`, `/projets/:id`.
- Données :
  - Magazine : un JSON par numéro dans `src/magazine/numeros/AAAA-MM-JJ.json` (`numero`, `date`, `titre.fr/en`, `edito.fr/en`, …). Ajouté chaque lundi par la routine du Magazine.
  - Idées : un JSON par idée dans `src/projets/idees/P-NNN.json` (`id`, `titre.fr/en`, `resume.fr/en`, …). Ajouté le dimanche par la routine des idées.
  - Projets du Lab : `PROJECTS` / `visibleProjects()` dans `src/lab/projects.js` (`slug`, `title.fr/en`, `summary.fr/en`, `status`). **Vérifié au cadrage : ce module s'importe tel quel depuis Node** (`import('./src/lab/projects.js')`), car ses composants sont en `lazy()` et ne sont jamais chargés à l'import.
- Vercel sert un fichier statique existant **avant** d'appliquer les `rewrites` : un fichier `dist/magazine/2026-09-28/index.html` est servi pour `/magazine/2026-09-28`, les autres URL retombent sur `/index.html`.
- URL de production : `https://misran-labs.vercel.app`.

## Objectif
Chaque page publique a son propre aperçu de partage (titre, description, image de sa rubrique, URL), présent dans le HTML servi — sans rendu serveur, sans nouvelle dépendance, et sans aucun changement du rendu du site. Un nouveau numéro du Magazine ou une nouvelle idée a son aperçu automatiquement au build suivant, sans rien toucher.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Pré-génération au build par un plugin Vite maison.** Un plugin `sharePreviewsPlugin()` dans un fichier séparé `scripts/share-previews.js` (importé et ajouté à la liste `plugins` de `vite.config.js`), actif **seulement au build** (`apply: 'build'`, hook `closeBundle`). Il lit `dist/index.html` produit par Vite et écrit, pour chaque page listée en D2, une copie `dist/<chemin>/index.html` dont seules les balises d'aperçu sont remplacées. Le JS/CSS référencés restent identiques : l'application démarre normalement et React Router affiche la bonne page. Pas de rendu serveur, pas de `manualChunks`, pas de nouvelle dépendance, `vercel.json` inchangé.

**D2 — Pages couvertes et textes (français uniquement).**
| Page | `<title>` et `og:title` | Description | Image | `og:type` |
|---|---|---|---|---|
| `/` | inchangé (celui d'`index.html`) | inchangée | `og-image.png` | website |
| `/magazine` | « Lab Magazine — veille IA hebdomadaire · Misran Labs » | phrase fixe : veille IA chaque lundi pour designers et développeurs | `og-magazine.png` | website |
| `/magazine/<date>` (chaque JSON de `numeros/`) | « Nº <numero> — <titre.fr> · Lab Magazine » | `edito.fr` tronqué | `og-magazine.png` | article |
| `/projets` | « Projets — idées en développement · Misran Labs » | phrase fixe : idées de produits numérotées, étudiées puis gardées ou arrêtées | `og-projets.png` | website |
| `/projets/fonctionnement` | « Comment fonctionnent les Projets · Misran Labs » | phrase fixe : la routine du dimanche, les fiches publiques, les décisions | `og-projets.png` | website |
| `/projets/<id>` (chaque JSON de `idees/`) | « <id> — <titre.fr> · Misran Labs » | `resume.fr` tronqué | `og-projets.png` | article |
| `/lab/<slug>` (chaque projet de `visibleProjects()`) | « <title.fr> — Lab · Misran Labs » | `summary.fr` tronqué | `og-lab.png` | website |

Les phrases fixes sont rédigées par la session (≤ 160 caractères, ton du site, aucune donnée personnelle, aucun chiffre inventé). Les pages de démo `/lab/:slug/demo/…` ne sont pas générées (elles retombent sur l'aperçu d'accueil). Les pages privées (MAIA, Conforma, backlog, tout ce qui vient de `src/private/`) ne sont **jamais** générées.

**D3 — Balises remplacées.** Dans chaque copie : `<title>`, `meta name="description"`, `og:title`, `og:description`, `og:url` (URL absolue de la page, sans barre finale, ex. `https://misran-labs.vercel.app/magazine/2026-09-28`), `og:image` (URL absolue), `og:type`, `twitter:title`, `twitter:description`, `twitter:image`. Ajouter `<link rel="canonical" href="<og:url>">` dans chaque copie **et** dans `index.html` (accueil : `https://misran-labs.vercel.app/`). Toutes les autres balises (`og:locale`, `twitter:card`, `theme-color`, polices, script) restent telles quelles. Le remplacement cible chaque balise par une expression précise ; si une balise attendue est introuvable dans `dist/index.html`, le plugin fait **échouer le build** avec un message clair (plutôt que de produire un aperçu faux en silence).

**D4 — Textes sûrs.** Toute valeur insérée est échappée pour un attribut HTML (`&`, `<`, `>`, `"`, `'`). Troncature des descriptions : au dernier espace avant 155 caractères, suivi de « … » (pas de troncature si le texte fait déjà ≤ 160 caractères). Espaces multiples et retours à la ligne ramenés à un espace.

**D5 — Lecture des données.** Magazine et idées : lecture directe des fichiers JSON avec `fs` (pas d'`import.meta.glob` hors de Vite). Un fichier illisible ou sans les champs utilisés (`date` au format AAAA-MM-JJ égal au nom de fichier + `numero` + `titre.fr` + `edito.fr` pour un numéro ; `id` égal au nom de fichier + `titre.fr` + `resume.fr` pour une idée) est **ignoré avec un avertissement dans la console du build**, sans faire échouer le build (le site l'ignore déjà de son côté). Projets du Lab : `await import()` de `src/lab/projects.js` puis `visibleProjects()` (vérifié au cadrage) — ne pas dupliquer la liste des projets.

**D6 — Trois images de rubrique.** `public/og-magazine.png`, `public/og-projets.png`, `public/og-lab.png`, 1200×630, déclinaisons de `og-image.png` (même fond crème `#f3ebdc`, même cadre encre, même tampon corail, mêmes polices Fraunces 900 / JetBrains Mono) avec le nom de la rubrique en grand (« Lab Magazine », « Projets », « Lab ») et « Misran Labs » en sous-titre. Partir de `missions/site-finitions/og-image-source.html` : copier/adapter les sources dans `missions/apercus-partage/`, rendu PNG via Chrome headless comme dans `site-finitions` (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --screenshot=… --window-size=1200,630 …`). Pas d'image par numéro ou par idée (hors périmètre).

**D7 — Documentation des routines.** Ajouter une ligne dans `src/magazine/FORMAT.md` et `src/projets/FORMAT.md` : l'aperçu de partage de la page est généré automatiquement au build à partir de `titre.fr` et `edito.fr` / `resume.fr`, rien à faire de plus. Ne rien changer d'autre dans ces fichiers.

## Critères d'acceptation
1. `npm run build` passe et affiche la liste (ou le nombre) des pages d'aperçu générées ; `dist/` contient `magazine/index.html`, `magazine/<date>/index.html` pour **chaque** numéro valide, `projets/index.html`, `projets/fonctionnement/index.html`, `projets/<id>/index.html` pour **chaque** idée, `lab/<slug>/index.html` pour **chaque** projet visible.
2. Chaque fichier généré contient le bon `<title>`, `og:title`, `og:description`, `og:url`, `og:image`, `og:type` et `canonical` selon D2/D3 (vérifié par `grep` sur au moins un fichier de chaque type, résultats copiés dans PROGRESS.md), et référence **exactement les mêmes** fichiers `/assets/*.js` et `*.css` que `dist/index.html`.
3. Test de robustesse : un JSON de numéro volontairement invalide, placé **temporairement** dans `src/magazine/numeros/`, est ignoré avec un avertissement et le build passe ; le fichier est supprimé ensuite (jamais commité). Un titre contenant `"` et `&` (test temporaire, non commité, ou test unitaire du module d'échappement lancé avec `node`) ressort échappé.
4. Avec `npx vite preview` : `curl -s http://localhost:4173/magazine/2026-09-28` renvoie le HTML avec l'aperçu du numéro (titre du numéro dans `og:title`) ; `curl -s http://localhost:4173/lab/lab-tokens` renvoie l'aperçu du projet ; une URL non générée (ex. `/lab/lost-cauldron-game/demo`) renvoie l'aperçu d'accueil. Dans le navigateur, `/`, `/magazine`, `/magazine/2026-09-28`, `/projets`, `/projets/P-001`, `/lab/lab-tokens`, `/lab/lost-cauldron-game/demo` s'affichent **comme avant**, sans erreur console, en FR et EN, y compris en arrivant directement sur l'URL (rechargement) et en naviguant par la barre latérale.
5. `public/og-magazine.png`, `public/og-projets.png`, `public/og-lab.png` existent en 1200×630 (`sips -g pixelWidth -g pixelHeight`), sont lisibles et cohérentes avec `og-image.png` (captures vérifiées par la session).
6. `index.html` contient le `canonical` de l'accueil ; aucun autre changement de rendu. `npm run lint` : 0 erreur (état initial : 0).
7. Aucune page privée générée : `find dist -name index.html` ne liste que les chemins de D2.
8. Tout est commité sur `auto/apercus-partage`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Image de partage propre à chaque numéro ou idée (nécessiterait Chrome au build sur Vercel ou une génération par les routines).
- Aperçus en anglais (les robots ne voient qu'une langue ; une URL `/en/…` serait un autre chantier).
- `document.title` mis à jour par page dans le navigateur (titre d'onglet), `sitemap.xml`, `robots.txt`, données structurées JSON-LD.
- Vérification réelle sur les outils des réseaux (LinkedIn Post Inspector, etc.) : à faire par Michael sur l'aperçu Vercel de la pull request — donner la marche à suivre dans le RAPPORT.
