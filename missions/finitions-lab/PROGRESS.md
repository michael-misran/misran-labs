# Mission finitions-lab — PROGRESS

**Statut :** étape 6 terminée
**Prochaine action :** étape 7 (tokens D5, copie des scripts de mesure, mesure « avant » + snapshots « avant »)
**Blocages :** aucun

## Étape 5 — découpage de AuditTokens.jsx (D3) + texte D4
- Créé `src/lab/projects/audit/contenu.js` (FR, EN, CONTENT), `src/lab/projects/audit/Constats.jsx` (ACCENT_GRAVITE, PastilleGravite, FiltreGravite, GroupeRegle), `src/lab/projects/audit/rapportTexte.js` (libelleFormat, emplacementTexte, construireRapport). Code déplacé tel quel.
- Texte D4 appliqué directement dans `contenu.js` en déplaçant `ctaText` (FR/EN).
- Deux ajustements non listés dans D3, nécessaires pour atteindre l'objectif « sous 450 lignes » (noté dans DECISIONS.md) :
  - `AFFICHAGE_INITIAL` (utilisé seulement par `GroupeRegle`) déplacé avec lui dans `Constats.jsx`.
  - `REGLES_IDS` (utilisé par `construireRapport` et par la page) déplacé dans `rapportTexte.js` et exporté ; `AuditTokens.jsx` l'importe désormais depuis là.
  - Après le découpage D3 strict, le fichier faisait encore 462 lignes (> 450). La section « Appel à l'action » (JSX autonome, ne dépend que de `c`) a été extraite dans un nouveau `src/lab/projects/audit/Cta.jsx`, sur le modèle des autres sous-composants déjà présents dans ce dossier (Couverture, Grille, Matrice). `AuditTokens.jsx` fait maintenant 437 lignes.
- `npm run build` et `npm run lint` : passent.

## Étape 6 — vérification après découpage (verificateur, Haiku + contrôle session principale)
- `missions/finitions-lab/audit-apres.txt` écrit avec le même format que `audit-avant.txt`.
- `diff audit-avant.txt audit-apres.txt` (vérifié par la session principale) : seules différences, les 4 occurrences du texte `ctaText` (changé intentionnellement par D4) ; tout le reste (grille, tuiles, filtres, constats par règle, couverture) rigoureusement identique. Critère 4 (rendu identique) et critère 8 confirmés pour cette page.
- Texte D4 vérifié visuellement en EN également (« Need a full audit of your design system? » / « This tool does the survey, the 7-axis score and the priority matrix... ») — critère 5 atteint dans les deux langues.
- Aucune erreur console pendant les tests (FR et EN).

## Étape 4 — relevé de référence audit (verificateur, Haiku)
- `missions/finitions-lab/audit-avant.txt` écrit (27 018 caractères), une section par bouton : CSS (~8000 car.), DTCG (~5200 car.), Tokens Studio (~5700 car.), Auditer les tokens de ce site (~8100 car.).
- Aucune erreur console pendant les 4 clics.

## Étape 3 — lien « Suivre » sur l'accueil (D2)
- `src/modules/ArchiveHome.jsx` : clé `magFollow` ajoutée dans `COPY.fr` (« Suivre le Lab ») et `COPY.en` (« Follow the Lab »).
- Troisième `Link` ajouté dans la rangée de `LatestIssue`, `to="/suivre"`, `marginLeft: 'auto'`, même style que `magAll` (mono 10 px, `letterSpacing: '0.08em'`, `--text2`, sans soulignement) ; le `◉` dans un `<span>` en `--primary`.
- Vérifié avec `vite preview` : lien visible sur `/`, clic → navigation vers `/suivre` sans rechargement (SPA, pas d'erreur console), à 375 px `scrollWidth === clientWidth` (aucun débordement horizontal).

## Étape 2 — moteur Godot partagé (D1)
- `public/games/godot-engine/` créé, contient `index.js`, `index.wasm`, `index.audio.worklet.js`, `index.audio.position.worklet.js` (déplacés depuis v0.1 par `git mv`), supprimés de v0.2 par `git rm`.
- `GameDemo.jsx`/`GameDemoV2.jsx` ne référencent que l'iframe `src="/games/<dossier>/index.html"` : aucun changement nécessaire dans ces fichiers (confirmé par grep).
- Dans les deux `index.html` : `<script src="../godot-engine/index.js">`, `GODOT_CONFIG.executable = "../godot-engine/index"`, `mainPack: "index.pck"` ajouté explicitement. Clé `fileSizes` du wasm adaptée en `"../godot-engine/index.wasm"` (c'est la clé réellement utilisée par le moteur : `fileSizes[\`${basePath}.wasm\`]` où `basePath = executable`, vérifié en lisant `index.js`). La clé `index.pck` reste inchangée (taille par version : 89616 pour v0.1, 92888 pour v0.2).
- `du -sh public/games` = 37 Mo (< 40 Mo, critère 1 atteint).
- Vérifié avec `npm run build` puis `npx vite preview --port 4173` (routine, pas de preview « dev ») : `/lab/lost-cauldron-game/demo` et `/lab/lost-cauldron-game/demo/v2` affichent le canvas jusqu'à l'écran de jeu, aucune erreur console, `GET /games/godot-engine/index.wasm → 200` pour les deux versions (critère 2 atteint). Serveur `vite preview` arrêté après vérification.

## État initial (relevé au cadrage, 2026-09-30, main 5f5a316)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30, reconfirmé sur auto/finitions-lab)
- `npm run build` : passe (22 pages d'aperçu générées, sitemap et flux RSS écrits)
- `npm run lint` : aucune erreur
