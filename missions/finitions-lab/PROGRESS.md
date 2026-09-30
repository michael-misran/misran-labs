# Mission finitions-lab — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (lien « Suivre » sur l'accueil, D2)
**Blocages :** aucun

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
