# Mission zine — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 7 (vérification finale)
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

## Étape 6 (exécution, 2026-10-04, D6)
- Créé `src/zine/numeros/01.json` (numéro d'essai temporaire) : blocs `etoile`, `bulle`, `texte`, `carnet`, sans aucune image (`src`), conformément à D6.
- `npm run build` : OK. Serveur `npx vite preview` lancé en arrière-plan par la session principale elle-même (pas de sous-agent pour ce test, fait main pour pouvoir supprimer le fichier juste après).
- Vérifié dans le navigateur, en anglais puis en français :
  - `/zine` : la vedette affiche le numéro d'essai (bandeau à l'encre `#ff4f8b`, « Nº 01 · November 2026 », titre, édito, lien « Read the issue → »). Le lien « Le Zine »/« The Zine » de `NavTitres` est devenu cliquable et actif (soulignement de la couleur du titre, « MONTHLY » au lieu de « coming soon »). La couverture Zine du kiosque (`/`) pointe maintenant vers `/zine/1`.
  - `/zine/1` : édito, puis les 4 blocs rendus correctement — étoile à 20 pointes « TEST! », bulle BD avec pointe « IT WORKS! », bloc texte avec titre et paragraphe, bloc carnet sur fond à lignes en `--font-chapo` italique.
  - `/zine/2` (numéro inexistant) : « This issue doesn't exist » / en FR « Ce numéro n'existe pas », sans erreur console.
  - FR : tout le texte de `/zine/1` est bien en français (aucun résidu anglais).
  - 375 px sur `/zine` et `/zine/1` : `document.documentElement.scrollWidth === window.innerWidth`, aucun débordement.
  - Aucune erreur console sur aucune des pages testées.
- Chemins non exercés par ce test (pas d'image disponible sans violer « aucune ressource externe », D1) : les blocs `photo`, `dessin` et `jeu` avec `src` — leur code a été relu avec soin (styles en ligne, pas de logique conditionnelle risquée) mais pas vu s'afficher avec une vraie image. Noté en recommandation du RAPPORT.
- Numéro d'essai supprimé (`rm src/zine/numeros/01.json`) avant tout commit — il n'a jamais été ajouté à Git (`git status` : working tree clean juste après suppression). Seul `.gitkeep` reste dans `src/zine/numeros/`.
- Rebuild + relint après suppression : OK.
