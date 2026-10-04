# Mission zine — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 6 (numéro d'essai temporaire, D6)
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

## Étape 3 (exécution, 2026-10-04)
- `src/zine/zineText.js` créé : textes fr/en, `zt(lang, key)`, `formatMoisAnnee`, `numeroAffiche`.
- `src/zine/ZineParts.jsx` créé : `MastheadZine` (tête « MISRAN ZINE » en Anton, encre paramétrable), `TrameDots` et `Etoile` (étoile à 20 pointes en `clip-path`, même polygone que `KiosqueParts.CouvertureZine`, redéclaré sans l'importer, D1), `Bulle` (BD, bordure + pointe en triangles CSS), `PageCarnet`/`PagePhoto`/`PageDessin`/`PageTexte`/`PageJeu` (un composant par type de bloc D2), `BlocZine` (dispatcheur par `type`), `CouvertureNumero` (réutilisable vedette/grille).
- `src/zine/ZineHome.jsx` créé : page d'attente (`Attente`, sans numéro — tête + étoile « LE #1 ARRIVE ! » + bulle, trame de points, aucune image) et page normale (vedette + grille des numéros précédents) selon que `getNumeros()` est vide ou non.
- `npm run build` et `npm run lint` : OK (le fichier n'est pas encore routé, étape 5).

## Étape 4 (exécution, 2026-10-04)
- `src/zine/ZineNumero.jsx` créé : en-tête (`MastheadZine` à l'encre du numéro), titre + Nº/date, édito, puis chaque bloc de `pages` rendu via `BlocZine`, lien de retour. Page « Ce numéro n'existe pas » (mascotte Fiole, même style que les autres 404 de section).
- `npm run build` et `npm run lint` : OK (toujours pas routé).

## Étape 5 (exécution, 2026-10-04)
- `App.jsx` : 2 routes (`zine`, `zine/:numero`), `lazy()`.
- `registry.js` : `/zine` et `/zine/:numero` renvoient le libellé d'onglet « Le Zine »/« The Zine » (`t(lang, 'navTitreZine')`, déjà existant dans `i18n/ui.js` — aucune clé ajoutée), avec le titre du numéro s'il existe (même schéma que Magazine/Jeux).
- `NavTitres.jsx` : `zineExiste = getNumeros().length > 0` ; si vrai, `to: '/zine'` et `rythme: t(lang, 'navRythmeZine')` (clé déjà présente dans `i18n/ui.js`, jamais utilisée jusqu'ici) ; sinon comportement identique à avant (`to: null`, `navBientot`).
- `KiosqueParts.jsx` : `CouvertureZine` lit `getNumeros()[0]` et passe `to={dernier ? '/zine/'+dernier.numero : null}` à `CarteCouverture`. Rien d'autre ne change dans ce composant : sans numéro, le rendu visuel est strictement identique à avant (D5).
- Aucune ligne ajoutée à `src/i18n/ui.js` (interdit) : les clés `navTitreZine`/`navRythmeZine`/`navBientot` existaient déjà, prêtes pour ce branchement.
- Critère d'acceptation 1 vérifié : `git diff --stat refonte-kiosque...HEAD -- . ':!missions/zine'` ne montre que des fichiers de `src/zine/`, `public/zine/` et les 4 fichiers d'exception listés par D1.
- `npm run build` et `npm run lint` : OK.
