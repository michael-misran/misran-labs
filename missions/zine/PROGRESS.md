# Mission zine — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (`ZineParts.jsx`, `ZineHome.jsx`, `zineText.js`)
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.

## Étape 2 (exécution, 2026-10-04)
- `src/zine/numeros.js` créé : chargement par `import.meta.glob`, validation des champs de tête et de chaque type de bloc de `pages`, `getNumeros()`/`getNumero(numero)`. Modèle : `src/magazine/numeros.js` (séquence `numero` = position + 1) et `src/breves/jours.js` (nom de fichier = clé). Séquence démarrant à 1 (pas 0, pour que `/zine/1` soit un numéro « normal » une fois publié).
- `src/zine/FORMAT.md` créé : schéma complet, les 7 types de bloc (`photo`, `dessin`, `texte`, `carnet`, `jeu`, `bulle`, `etoile`), règles, exemple complet. Modèle : `src/breves/FORMAT.md`.
- `src/zine/numeros/.gitkeep` et `public/zine/.gitkeep` créés.
- `npm run lint` sur `numeros.js` : OK.
