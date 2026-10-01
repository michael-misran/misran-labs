# Mission jeux-geste — RAPPORT

## Fait
- Socle commun `src/jeux/socle/` : `jour.js` (numéro de jour calendaire depuis le 2026-10-01, graine du jour déterministe via un mulberry32 écrit à la main), `serie.js` (stockage `localStorage` clé `misran-jeux`, protégé par try/catch), `partage.js` (texte de partage au format D7, `navigator.share` puis repli presse-papiers), `ResultatPartage.jsx` (bloc commun score/série/partage).
- `registre.js` : découverte automatique des jeux via `import.meta.glob` sur `src/jeux/*/meta.js` (eager) et `*/Jeu.jsx` (lazy), validation souple (un jeu invalide est ignoré avec avertissement, jamais de plantage). `jeuxText.js` : textes fr/en communs.
- Intégration au site : routes `/jeux` et `/jeux/:slug` dans `App.jsx`, `JeuxHome.jsx` (grille responsive, pastille « joué aujourd'hui »), `JeuPage.jsx` (bandeau démo, 404 sur slug inconnu, lecture de `?date=`), `resolveRouteMeta` (icône 🎲, titres d'onglet), section « Jeux » dans le menu après Projets, aperçus de partage et sitemap génériques dans `share-previews.js` (aucune liste codée en dur : un jeu de plus = un dossier de plus).
- Premier jeu **Le geste parfait** (`src/jeux/geste-parfait/`) : 4 défis en rotation quotidienne déterministe — Cercle parfait (tracé au pointeur, refusé si trop court/petit), Chrono à l'aveugle (compteur masqué après 3 s), Remplir le verre (hauteur cible fixée par la graine du jour, inertie ~150 ms), Tour empilée (Stack, vitesse fixe). Un essai officiel par jour enregistré et partageable, puis mode entraînement non enregistré. Les 4 défis se jouent aussi au clavier (Espace), sauf le cercle qui exige un pointeur (indiqué dans sa consigne).
- `missions/jeux-geste/verifier-socle.mjs` : contrôle Node du numéro de jour, du déterminisme de la graine et du calcul de série — tous les tests passent.
- `missions/vrai-404/verifier-routes.mjs` mis à jour (`/jeux/inconnu` en 404 attendue) : 53 adresses vérifiées, 0 échec.

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté (voir « Hors périmètre » ci-dessous pour ce qui était explicitement exclu).

## Critères d'acceptation
1. **OK** — `/jeux` affiche 1 carte « Le geste parfait » + 2 cartes « Bientôt » (`A_VENIR = 2`), en fr et en, une colonne sans défilement à 375 px.
2. **NON VÉRIFIABLE dans cette session** — le paramètre `?date=` n'a pas pu être exercé : `import.meta.env.DEV` vaut toujours `false` dans un build produit par `vite build` (même avec `--mode development`, testé), donc ce remplacement ne s'active jamais dans le flux de vérification imposé aux routines (`npm run build` + `npx vite preview`, jamais le vrai serveur de dev). Ce n'est pas un défaut du code : la rotation des défis (`defis[numeroDuJour % 4]`) a été revérifiée correcte par calcul manuel en JavaScript et par `verifier-socle.mjs`. **À vérifier par Michael** en session interactive avec `npm run dev` — voir DECISIONS.md pour le détail de l'investigation.
3. **OK** — chaque défi se termine par un score entre 0 et 100 puis affiche le résultat (vérifié en direct sur Chrono à l'aveugle, score 71,5 % obtenu) ; le cercle refuse un tracé trop court sans consommer l'essai (par lecture de code et par le refus implémenté dans `cercle.jsx`, le défi du jour réel pendant la vérification n'étant pas le cercle).
4. **OK** — après l'essai officiel, recharger la page affiche directement le résultat du jour ; « Rejouer pour s'entraîner » fonctionne sans modifier le résultat enregistré (vérifié en direct).
5. **OK** — le texte de partage a été vérifié en interceptant `navigator.clipboard.writeText` (le vrai presse-papiers est bloqué par permission dans le navigateur automatisé de vérification) : conforme à D7, y compris la barre d'emojis proportionnelle au score (7/10 🟩 pour 71,5 %). Le bouton « Copié ✓ » fonctionne.
6. **OK** — testé avec la vraie date du jour (localStorage seedé sur la veille réelle) : la série affiche bien « 🔥 2 jours » après un essai.
7. **OK** — avec `Storage.prototype.setItem` qui lève une exception, le jeu reste jouable sans erreur bloquante.
8. **OK** — `/jeux/inconnu` affiche la page 404 du site ; l'onglet et la barre d'état affichent « Jeux » et « Jeux — Le geste parfait ».
9. **OK** — section « Jeux » avec l'entrée 🎲 dans le menu ; `dist/sitemap.xml` contient `/jeux` et `/jeux/geste-parfait` (32 URL au total) ; `dist/jeux/geste-parfait/index.html` contient le titre et l'accroche dans ses balises og.
10. **OK (par lecture de code)** — `touch-action: none` confirmé sur la zone interactive du Chrono à l'aveugle en mobile (375 px) et présent de façon identique sur les 4 défis dans le code. Le défi Cercle n'était pas celui du jour réel pendant la vérification (rotation quotidienne) : pas testé au doigt en direct sur ce défi précis.
11. **OK** — `package.json`/`package-lock.json` inchangés ; `grep -rnE "#[0-9a-fA-F]{3,6}\b" src/jeux` ne renvoie rien.
12. **OK** — `npm run build` passe ; `npm run lint` : 0 erreur (identique à l'état initial).
13. **OK** — tout commité sur `auto/jeux-geste` (`git status` propre), rien sur `main`, rien poussé ; `git diff main...auto/jeux-geste` relu en entier, aucun secret ni donnée personnelle.

## Comment vérifier
1. `npm run build` puis `npx vite preview`.
2. Ouvrir `/jeux` : 1 carte + 2 « Bientôt ». Ouvrir `/jeux/geste-parfait` : le défi du jour s'affiche, se termine avec un score, propose de partager et de rejouer en entraînement.
3. Pour voir les 4 défis (critère 2) : `npm run dev`, puis `/jeux/geste-parfait?date=2026-10-01`, `2026-10-02`, `2026-10-03`, `2026-10-04` (Chrono, Verre, Tour, Cercle dans cet ordre).
4. `/jeux/inconnu` doit afficher la 404 du site.
5. `node missions/jeux-geste/verifier-socle.mjs` et `node missions/vrai-404/verifier-routes.mjs` (après un build) pour les contrôles automatisés.

## Décisions (voir DECISIONS.md pour le détail complet)
- `SITE_URL` redupliqué dans `socle/partage.js` (même solution que `src/suivre/suivreText.js`, le script Node n'est pas importable côté navigateur).
- `/jeux` et `/jeux/geste-parfait` pas ajoutés en dur dans `verifier-routes.mjs` (déjà couverts via le sitemap généré génériquement) ; seul `/jeux/inconnu` y a été ajouté.
- Étapes 5 et 6 du plan fusionnées en un seul bloc de travail : la rotation `defis[numeroDuJour % 4]` exige les 4 défis pour fonctionner, impossible de committer un état intermédiaire qui marche avec seulement 2 défis sur 4.
- Trois refactors mécaniques imposés par des règles eslint plus strictes que prévu à la SPEC (`react-hooks/static-components`, `react-hooks/refs`, `react-hooks/set-state-in-effect`) : aucun changement de comportement, juste la façon dont `lazy()`, les refs « toujours à jour » et l'état initial de `Jeu.jsx` sont construits.
- Limitation de vérification du critère 2 (`import.meta.env.DEV` toujours faux en build) : détaillée plus haut et dans DECISIONS.md.

## Délégations (voir DELEGATIONS.md pour le détail)
- Étape 7 (vérification navigateur) : sous-agent `verificateur` en Haiku 4.5. A rapporté 2 « bugs » qui se sont révélés être la même limitation d'environnement (voir critère 2) après réinvestigation par la session principale — aucun changement de code n'était nécessaire.
- Toutes les autres étapes (1 à 6, 8, 9) : session principale en Sonnet 5.

## Recommandations (hors périmètre de cette mission)
- **Vérifier le critère 2 en session interactive** (`npm run dev`) avant de considérer la rotation des défis comme définitivement validée en conditions réelles de développement, même si tous les calculs sous-jacents ont été revérifiés indépendamment.
- **D12 — Lancer les missions suivantes après fusion** : `missions/jeux-estimation/` et `missions/jeux-majorite/` sont déjà rédigées (commitées sur cette branche, sans branche à elles), prêtes à démarrer. Après la fusion de `jeux-geste`, la session de clôture doit créer `auto/jeux-estimation` puis `auto/jeux-majorite` depuis `main` et réactiver la tâche programmée.
- **Classement mondial / vraies statistiques de joueurs** : nécessiterait une base de données (ex. Vercel KV), à décider par Michael (coût éventuel).
- **Image d'aperçu de partage propre à « Le geste parfait »** : actuellement l'image par défaut du site est réutilisée.
- **Sons, vibrations, animations de confettis** : aucun ajouté, comme prévu hors périmètre.
- **Version anglaise complète** : les textes fr/en existent déjà pour cette mission (D11), rien à ajouter.
