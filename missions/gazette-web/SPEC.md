# Mission gazette-web — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : cadrer la suite de la refonte kiosque (« ok fusionné »), troisième mission prévue : les pages de la Gazette.

## Contexte
Troisième mission de la refonte « maison d'édition / kiosque ». Elle s'appuie sur ce qui est déjà fusionné dans `refonte-kiosque` :
- le cadre de la maison (`src/shell/`) ;
- les tokens de la maison dans `src/styles/tokens.css` : `--titre-gazette` (rouge `#b3301d`), `--font-gothique` (UnifrakturMaguntia), `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-body` (Crimson Pro) ;
- le kiosque à `/`, dont `src/kiosque/KiosqueParts.jsx` (fonction `GazetteALaUne`) donne déjà une version web de la une de la Gazette. Il est à réutiliser comme modèle visuel, pas à importer.

Les pages de la Gazette ont encore leur ancienne mise en page « fiche d'archive » :
- `src/breves/BrevesHome.jsx` (`/breves`) utilise `MagazineHero`, `CaseMasthead`, `CaseMetaRow`, `CaseFooter`, `Tag` et `SuivreBandeau` ;
- `src/breves/BrevesJour.jsx` (`/breves/:date`) utilise `MagazineMasthead` et `CaseFooter` ;
- `src/breves/BrevesParts.jsx` contient `RubriqueMark`, `SourceLinks`, `BreveCard`, `WordFigureBox` et `DayRow`.

Données dans `src/breves/jours.js` : `getDays()` (du plus récent au plus ancien), `getDay(date)` et `getAdjacentDays(date)`, qui renvoie `{ previous, next }`. Un jour contient `{ date, breves: [{ rubrique: 'ia'|'tech', titre:{fr,en}, resume:{fr,en}, sources:[{titre,url}] }], mot?: { terme, definition:{fr,en} }, chiffre?: { valeur, texte:{fr,en} } }`. Les textes de la page sont dans `src/breves/brevesText.js`.

**Références visuelles** (locales, exclues de Git : les lire, ne jamais les commiter) :
- `screens/accueil-kiosque.src.html`, section « À la une » : la tête de la Gazette, la manchette, la lettrine et les colonnes de côté ;
- le journal papier A4 dont s'inspire tout le style (broadsheet façon « Daily Prophet ») : `src/private/journal/gabarit-a4.html`. C'est un dossier privé : s'en inspirer, **ne rien en copier de privé** (irritants, business, énigme, carnet) et ne pas reprendre sa police Plain Germanica.

## Objectif
`/breves` et `/breves/:date` ressemblent à une vraie page de journal : la Gazette du Lab sur le web, cohérente avec le journal papier et la une du kiosque. Elles ne dépendent plus des composants du Magazine ni des fiches d'archive du Lab.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Branche.** `auto/gazette-web` part de `refonte-kiosque`. La pull request de clôture vise `refonte-kiosque`.

**D2 — Composants dédiés.** Les nouveaux composants vont dans `src/breves/GazetteParts.jsx`. `BrevesHome.jsx` et `BrevesJour.jsx` n'importent plus rien de `src/magazine/` ni de `src/lab/` (`CaseFile`, `caseChrome`), ni `SuivreBandeau`. Les composants de `BrevesParts.jsx` devenus inutiles sont supprimés, et le fichier aussi s'il est vide. **Ne pas modifier** `src/magazine/`, `src/lab/` ni `src/kiosque/`. Les styles s'écrivent en ligne avec les tokens de la maison, et tous les textes fr/en vont dans `brevesText.js`.

**D3 — Tête de journal (`GazetteTete`)**, commune aux deux pages, en pleine largeur dans un cadre blanc cassé à double filet :
- deux « oreilles » encadrées : « Édition du matin » à gauche, « Prix : un café » à droite ;
- au centre, « La Gazette du Lab » en `--font-gothique`, avec le G et le L en `--titre-gazette` ;
- dessous, la devise « Le quotidien du Lab, à lire avec le café — IA · Tech » en `--font-chapo` italique ;
- puis une ligne de date entre doubles filets, en `--font-etiquette` capitales : date longue du jour affiché à gauche, « Paraît chaque matin » au centre, nombre de brèves du jour à droite.

Sur mobile, les oreilles passent sous le titre ou sont masquées, et le titre ne doit pas déborder.

**D4 — Édition du jour (`GazetteEdition({ day })`)**, utilisée par les deux pages :
- **Une** : la brève `ia` (à défaut, la première) avec l'étiquette noire « ☞ À la une · IA », la manchette en `--font-bois` capitales (taille fluide ≈ 24 à 52 px) et le résumé sur 2 colonnes (1 sur mobile) avec une lettrine encadrée en `--font-bois-3`.
- **Autres brèves** : une grille de colonnes séparées par des filets fins. Chacune a l'étiquette de rubrique en `--font-etiquette`, couleur `--titre-gazette`, et un titre dans une police « bois » qui alterne d'une brève à l'autre (`--font-bois-2`, `--font-bois-3`, `--font-etiquette` en gras), comme dans le journal papier. Puis le résumé, justifié.
- **Sources** : sous chaque brève, « Source : <titre ↗> » en petit italique, liens externes avec `target="_blank" rel="noopener noreferrer"`. On reprend le comportement de `SourceLinks`.
- **Le mot et le chiffre** (s'ils existent) : deux encadrés à double filet, côte à côte sur desktop. Le terme est en `--font-bois-3`, et la valeur du chiffre en très gros `--font-bois`.
- Les blocs sont séparés par des doubles filets, avec un ornement ❧ centré entre la une et les autres brèves.

**D5 — `/breves` (accueil de la Gazette)** : `GazetteTete`, puis l'édition du dernier jour (`getDays()[0]`). Dessous, un encadré « S'abonner à la Gazette » qui pointe vers le flux `/breves/rss.xml` et vers `/suivre`. Enfin, la section « Les éditions précédentes » : la liste des autres jours, façon index de journal. Chaque ligne affiche la date longue, puis les titres de ses brèves séparés par « · », avec une ligne de points de conduite, et renvoie vers `/breves/<date>`. Si `getDays()` est vide, afficher un message en style Gazette : « Aucune édition pour l'instant. »

**D6 — `/breves/:date` (une édition)** : `GazetteTete` à la date de ce jour, `GazetteEdition`, puis une barre de navigation entre doubles filets : « ← Édition précédente » et « Édition suivante → » (via `getAdjacentDays`, masqués s'ils n'existent pas) et « Toutes les éditions » vers `/breves`. Date inconnue : une page en style Gazette (même tête), qui affiche « Pas d'édition ce jour-là », la date demandée et un lien vers `/breves`.

**D7 — Inchangé.** Les URL, les données JSON, les flux RSS, les scripts de build (`scripts/rss.js`, `scripts/share-previews.js`), `resolveRouteMeta` et `document.title` ne bougent pas.

## Critères d'acceptation
Chaque critère doit être vérifiable par une session seule (commande, page, valeur).
1. `git grep -nE "magazine/|lab/CaseFile|lab/caseChrome|SuivreBandeau" -- src/breves/` ne renvoie rien. `git diff --stat refonte-kiosque...auto/gazette-web` ne touche ni `src/magazine/`, ni `src/lab/`, ni `src/kiosque/`, ni `src/breves/jours/`.
2. Sur `/breves`, la tête affiche « La Gazette du Lab » en UnifrakturMaguntia (police calculée) avec G et L en `rgb(179, 48, 29)`, et la manchette est le titre (fr) de la brève `ia` de `getDays()[0]`.
3. Sur `/breves`, chaque brève du dernier jour apparaît avec ses sources cliquables (`target="_blank"`), et le mot du jour apparaît s'il existe.
4. « Les éditions précédentes » liste tous les jours sauf le premier, chacun avec un lien vers `/breves/<date>`.
5. Sur `/breves/<le jour le plus ancien>`, le lien « Édition suivante » existe et « Édition précédente » est absent. Sur le jour le plus récent, c'est l'inverse. `/breves/1999-01-01` affiche « Pas d'édition ce jour-là » sans erreur console.
6. En anglais, aucun texte de ces pages ne reste en français, hormis `mot.terme` (donnée monolingue, comportement existant).
7. À 375 px : `document.documentElement.scrollWidth === window.innerWidth` sur `/breves` et `/breves/<date>`, et le titre gothique ne déborde pas de son cadre.
8. `document.title` de `/breves` et `/breves/2026-10-03` est identique à celui de `refonte-kiosque`.
9. Aucune erreur console sur `/breves`, `/breves/<chaque date existante>`, `/breves/1999-01-01`, `/` et `/magazine`.
10. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
11. Tout est commité sur `auto/gazette-web`, rien sur `main` ni sur `refonte-kiosque`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Le Magazine (mission magazine-web), les Jeux (jeux-arcade), le Lab et les idées (lab-dossiers), `/suivre` et la 404 générale (kiosque-annexes).
- Toute modification du format JSON des jours, des flux RSS ou des aperçus de partage.
- Ajouter un numéro d'édition public (les Brèves n'en ont pas).
- Traduire `mot.terme` (changement de schéma).
