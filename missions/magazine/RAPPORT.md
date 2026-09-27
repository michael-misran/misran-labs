# Mission magazine — RAPPORT

## Fait

Une nouvelle rubrique « Magazine » sur le site, dans l'esthétique archive imprimée déjà en place :

- **`/magazine`** : en-tête de rubrique (masthead + hero + métadonnées PARUTION/RÉDACTION/RUBRIQUES), un paragraphe qui explique le concept, puis un registre des numéros (Nº, titre, date, nombre d'articles, étiquette « Dernier numéro »), du plus récent au plus ancien.
- **`/magazine/:date`** : en-tête du numéro, édito en citation, articles en fiches (catégorie repérée par un carré de couleur + libellé, titre, résumé, encadré « Pourquoi ça compte », sources en liens externes `target="_blank" rel="noopener noreferrer"` avec nom de domaine affiché). Numéro inconnu → « Numéro introuvable » / « Issue not found » avec lien retour.
- **Sidebar** : section « Magazine » entre « Le Lab » et « Portfolio », lien unique `✎`, actif aussi sur la page d'un numéro (`NavItem` reçoit désormais une prop `end` optionnelle, `true` par défaut — aucun lien existant n'est affecté).
- **Format des données** : un numéro = un fichier `src/magazine/numeros/AAAA-MM-JJ.json`, chargé par `import.meta.glob` (aucune dépendance ajoutée) et validé (`src/magazine/numeros.js`) — texte bilingue obligatoire, 1 à 5 articles, au moins une source `https://` par article, nom de fichier cohérent avec la date, numérotation séquentielle à partir de 0. Un numéro invalide n'est jamais affiché et produit un `console.error` explicite (fichier + règle violée), sans jamais faire planter la page.
- **`src/magazine/FORMAT.md`** documente ce format de bout en bout (schéma, règles, exemple complet, marche à suivre) pour que la future routine de veille puisse publier un numéro sans lire le code.
- **Numéro 0 — « Présentation »** (`2026-09-28.json`) : un article factuel et vérifiable sur la mise en place du système de missions autonomes de ce site, sourcé sur la page publique `https://misran-labs.vercel.app/lab/utilisation-ia`.

Fichiers créés : `src/magazine/{magazineText.js, numeros.js, FORMAT.md, MagazineParts.jsx, MagazineHome.jsx, MagazineIssue.jsx, numeros/2026-09-28.json}`. Fichiers modifiés : `src/App.jsx` (routes), `src/shell/Sidebar.jsx` (section + prop `end`), `src/i18n/ui.js` (clés `navSectionMagazine`, `magazineNav`).

## Pas fait

Rien de prévu par la SPEC n'a été laissé de côté. Un seul écart, documenté dans `DECISIONS.md` : à l'étape 5, le sous-agent `verificateur` (Haiku) n'a pas pu accéder au navigateur dans son sandbox de session non supervisée — il a vérifié les critères 3, 6, 7, 8 (code, build, lint) et 9 (git), avec les mêmes résultats que la session principale. Les critères qui exigent un rendu réel (2, 4, 5) reposent sur les vérifications navigateur déjà faites directement par la session principale aux étapes 3–4 (voir ci-dessous) plutôt que sur une deuxième passe du verificateur.

## Critères d'acceptation

1. **Sidebar** : ✅ « Magazine » entre « Le Lab » et « Portfolio » (FR et EN), surligné sur `/magazine` et sur `/magazine/2026-09-28` — vérifié par capture d'écran dans le navigateur (`vite preview`).
2. **Pages** : ✅ `/magazine` liste le numéro 0 ; `/magazine/2026-09-28` s'affiche entièrement en FR et en EN (texte de page lu en entier dans les deux langues) ; `/magazine/1999-01-01` affiche « Numéro introuvable » / « Issue not found ».
3. **Validation** : ✅ un fichier de test (`titre` sans `en`) ajouté temporairement n'est pas affiché et produit `[magazine] numéro invalide (2026-10-05.json) : "titre" doit avoir un texte "fr" et "en" non vides` dans la console ; fichier supprimé, jamais commité (`git status` propre) — testé deux fois, par la session principale puis indépendamment par le verificateur, même résultat.
4. **Console** : ✅ aucune erreur sur `/magazine`, `/magazine/2026-09-28` (FR et EN), `/` et `/lab/utilisation-ia`.
5. **375 px** : ✅ `document.documentElement.scrollWidth <= window.innerWidth` vrai sur `/magazine` et `/magazine/2026-09-28`, confirmé aussi visuellement par capture d'écran.
6. **Couleurs brutes** : ✅ `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/magazine/*.jsx` ne renvoie rien.
7. **FORMAT.md** : ✅ existe, schéma complet + 6 règles + exemple entier + marche à suivre (« ajouter un fichier, rien d'autre »).
8. **Build/lint** : ✅ `npm run build` passe ; `npm run lint` : 6 erreurs, toutes préexistantes (VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx), aucune dans `src/magazine/`.
9. **Git** : ✅ tout commité sur `auto/magazine` (5 commits, étapes 2 à 6), rien sur `main`, rien poussé.

## Comment vérifier

```bash
git log --oneline main..auto/magazine
npm run build && npm run lint
npx vite preview --port 4175 --strictPort &
```
Puis ouvrir `http://localhost:4175/magazine` et `http://localhost:4175/magazine/2026-09-28` (FR, puis EN après `localStorage.setItem('lang','en')` + rechargement), `http://localhost:4175/magazine/1999-01-01`, et vérifier la sidebar sur `/`. Arrêter le serveur ensuite (`pkill -f "vite preview --port 4175"`).

## Décisions prises seule

Toutes détaillées dans `DECISIONS.md` :
- Étape « direction visuelle » confiée à l'expert (Opus) avant tout code, comme prévu au cadrage.
- Numéro 0 daté du 2026-09-28 (premier lundi suivant le cadrage).
- `CaseMasthead` et `CaseHero` non réutilisables tels quels pour la page d'un numéro (lien retour et numéro figés) → variantes locales `MagazineMasthead`/`MagazineHero` qui recopient leurs styles, sans toucher à `CaseFile.jsx`.
- Catégories marquées par un carré de couleur (tokens sémantiques existants) + libellé texte, plutôt que `Tag` (fond imposé peu lisible pour certaines couleurs) ou les tokens `--case-tabs-tint-N` (réservés à `CaseTabs`).
- Validation ajoutée au-delà du strict D2 : le nom de fichier doit correspondre au champ `date`, et la séquence `numero` est vérifiée position par position après tri chronologique — les deux documentées dans FORMAT.md.
- Étape 5 : critères nécessitant un rendu navigateur tenus pour vérifiés par les contrôles déjà faits en session principale, le sandbox du verificateur n'ayant pas d'accès navigateur.

## Délégations et modèles réellement utilisés

| Étape | Agent | Modèle prévu | Modèle utilisé |
|---|---|---|---|
| 0–1 | session principale | Opus | Opus 5.5 |
| 2 | expert | Opus | Opus 5.5 |
| 3–4 | session principale | Sonnet | Sonnet 5 |
| 5 | verificateur | Haiku | Haiku 4.5 |
| 6 | session principale | Sonnet | Sonnet 5 |

Aucun écart au cadrage — aucune étape n'a bloqué deux fois, `expert` n'a pas été rappelé en plus de l'étape 2 prévue.

## Recommandations (hors périmètre de cette mission)

- **Mission suivante (« routine de veille »)** : elle devra pouvoir déterminer la prochaine date de parution et le prochain `numero` sans lire tout le dossier `numeros/` à la main — `getIssues()` (`src/magazine/numeros.js`) donne déjà les numéros valides triés, `issues[0].numero + 1` et `issues[0].date` (+ 7 jours) suffisent. Elle devra aussi relire `FORMAT.md` avant chaque numéro plutôt que se fier à sa mémoire d'une session précédente.
- **Accès navigateur du `verificateur` en session non supervisée** : déjà signalé par la mission `utilisation-ia` pour le serveur de dev, mais ici c'est l'agent lui-même (pas seulement la session principale) qui en a besoin pour l'étape 5. Si les missions futures veulent des vérifications indépendantes fiables sur le rendu réel, il faudra soit donner un accès navigateur au sandbox du `verificateur`, soit accepter que ces critères restent vérifiés uniquement par la session principale.
- **Mise en avant du magazine sur la home** : explicitement hors périmètre de cette mission (SPEC), mais à envisager une fois plusieurs numéros publiés.
