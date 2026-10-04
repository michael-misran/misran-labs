# Mission kiosque-une — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « vas-y » (cadrer la mission suivante de la refonte kiosque, la page d'accueil).

## Contexte
Deuxième mission de la refonte « maison d'édition / kiosque ». La première, `kiosque-maison`, est fusionnée dans `refonte-kiosque` : tout le site a déjà le nouveau cadre (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`), les tokens de la maison (`--titre-*`, `--font-bois`, `--font-bois-2`, `--font-bois-3`, `--font-etiquette`, `--font-chapo`, `--font-gothique`, `--font-bd`, `--font-pixel`, `--font-ecran`, `--font-machine` dans `src/styles/tokens.css`) et les polices libres chargées par `index.html`. `/` affiche encore `ArchiveHome` (l'index du Lab), qui est aussi servi à `/lab`.

**Référence visuelle** : `screens/accueil-kiosque.src.html`, sections « À la une », « Sur les présentoirs » et « Bulletin d'abonnement ». Ce fichier est local et exclu de Git : le lire, ne jamais le commiter. Ses polices privées (Plain Germanica, Comic Book) et sa photo picsum **ne sont pas** à reprendre (voir D7).

Données disponibles (déjà utilisées par `Defilant.jsx`) :
- `getDays()` dans `src/breves/jours.js` : jours de la Gazette, du plus récent au plus ancien. Chaque jour contient `{ date, breves: [{ rubrique: 'ia'|'tech', titre:{fr,en}, resume:{fr,en}, sources }], mot: { terme, definition:{fr,en} } }`.
- `getIssues()` dans `src/magazine/numeros.js` : numéros du Magazine, du plus récent au plus ancien, sous la forme `{ numero, date, titre:{fr,en}, edito, articles: [{ titre:{fr,en}, … }] }`.
- `listeJeux()` dans `src/jeux/registre.js` : les jeux, avec `slug`, `titre:{fr,en}` et `accroche:{fr,en}`.
- `visibleProjects()` et `pt(project, lang)` dans `src/lab/projects.js` : les projets du Lab.
- `FEEDS` dans `src/suivre/suivreText.js` : les flux RSS (`key`, `path`, `url`, `name`, `rythme`).

## Objectif
`/` devient le kiosque de la maison d'édition : la Gazette du jour à la une, une couverture par titre sur les présentoirs et un bulletin d'abonnement, tout alimenté par les vraies données et bilingue. L'en-tête de la maison devient aussi plus compact sur téléphone.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Branche.** `auto/kiosque-une` part de `refonte-kiosque` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.

**D2 — Routes.** `/` affiche un nouveau composant `src/kiosque/KiosqueHome.jsx`. `/lab` continue d'afficher `ArchiveHome`. Le titre de l'onglet de `/` ne change pas (`homeDocumentTitle`). Les textes fr/en de la page vont dans `src/kiosque/kiosqueText.js`, sans composant dans ce fichier, sur le modèle de `brevesText.js`. Les sous-composants peuvent aller dans `src/kiosque/KiosqueParts.jsx`. Les styles s'écrivent en ligne, avec les tokens de la maison, comme le reste du site.

**D3 — Titres de section.** Chaque section commence par un titre façon kiosque, comme dans la référence : grand titre en `--font-bois-2` capitales, sous-titre en `--font-chapo` italique, double filet qui va jusqu'au bord droit. Les sections sont « À la une / la Gazette de ce matin » et « Sur les présentoirs / les autres titres de la maison ». Sur mobile, le sous-titre est masqué.

**D4 — À la une : la Gazette du jour**, d'après le jour `getDays()[0]`.
- Un cadre blanc cassé à double filet, avec l'ombre décalée d'encre de la référence.
- La tête : à gauche « N° — · Édition du matin » (sans numéro, les Brèves n'en ont pas, donc seulement « Édition du matin »), au centre « La Gazette du Lab » en `--font-gothique` avec le G et le L en `--titre-gazette`, à droite la date longue du jour et « Prix : un café ».
- L'étiquette noire « ☞ À la une · IA ». La manchette est le titre de la brève `ia` (à défaut, la première brève), en `--font-bois` capitales, taille fluide d'environ 32 à 46 px. Le `resume` de cette brève est sur 2 colonnes, avec une lettrine encadrée en `--font-bois-3`. Il n'y a pas de chapeau : les données n'en ont pas.
- Deux liens : « Lire la Gazette du jour → » vers `/breves/<date>`, et « Toutes les éditions » vers `/breves`.
- Une colonne de côté : « Les autres brèves », c'est-à-dire les autres brèves du jour avec rubrique, titre et résumé. Puis l'encadré « Le mot du jour » avec le terme et sa définition.
- Si `getDays()` est vide, la section « À la une » n'est pas affichée.

**D5 — Sur les présentoirs : 4 couvertures** au format portrait (≈ 3 / 4,1), chacune posée sur son bout de tablette noire avec sa légende dessous (nom du titre et rythme), et soulevée au survol, sauf avec `prefers-reduced-motion: reduce`.
- **Le Magazine** → lien `/magazine/<date du dernier numéro>`. Bandeau bleu `--titre-magazine` avec « Le Magazine », le numéro et la date. Le titre du numéro en Playfair Display italique 900. Les titres des 4 premiers articles, numérotés.
- **Le Zine** → pas de lien (`aria-disabled="true"`), mention « bientôt ». Fond rose `--titre-zine`, tête « Misran Zine » en Anton et « #1 ». À la place de la photo, une **trame de points en CSS pur** (dégradés radiaux), sans aucune image, avec une étoile « Bientôt ! » en `--font-bd` (Comic Neue gras italique, capitales).
- **Les Jeux** → lien `/jeux`. Boîte de jeu rétro : fond quadrillé, « LES JEUX » en `--font-pixel`, et un écran cathodique avec lignes de balayage, scores, l'envahisseur en pixels (`box-shadow`) et « INSERT COIN » qui clignote. Le menu liste **tous** les noms de `listeJeux()` en `--font-ecran`, avec un curseur ▶. En bas : « 1 JOUEUR · 0 € · 0 PUB ». Le clignotement est coupé avec `prefers-reduced-motion`.
- **Le Lab** → lien `/lab`. Chemise kraft de dossier confidentiel en `--font-machine` : onglet « ML-LAB », étiquette « DOSSIERS DU LAB · AGENT : M. MISRAN · CLASSEMENT : ouvert au public · PIÈCES : <nombre de visibleProjects()> », tampon « ~~CONFIDENTIEL~~ DÉCLASSIFIÉ » en `--titre-lab`, liste des 6 premiers projets.

Grille : 4 colonnes sur desktop, 2 en dessous de 960 px, 1 en dessous de 520 px. Les tailles de texte des couvertures s'adaptent pour que rien ne déborde.

**D6 — Bulletin d'abonnement.** Un cadre en pointillés avec des ciseaux ✂, comme dans la référence. Le titre « Bulletin d'abonnement » est en `--font-bois`, avec la phrase « Cochez vos titres. C'est gratuit, sans compte, par flux RSS. ». Il y a une case ☐ par entrée de `FEEDS`, chaque lien pointant vers son `path`, avec le nom et le rythme en fr/en. Au survol, la case devient ☒. Un dernier lien « Tous les flux et réseaux → » mène à `/suivre`. Les noms des flux viennent de `FEEDS` tels quels (leur harmonisation avec les noms des titres est prévue par la mission kiosque-annexes).

**D7 — Aucune ressource externe ni privée.** Pas d'image distante (picsum, unsplash…), pas de fichier de police. Uniquement les polices déjà chargées (D2 de kiosque-maison) et du CSS.

**D8 — En-tête compact sur mobile.** Dans `Masthead.jsx`, en dessous de 600 px de large, il ne faut plus que ça prenne la moitié de l'écran : badge ML d'environ 48 px, « MISRAN LABS » sur une seule ligne si possible (taille fluide), et phrase d'accroche masquée. Le filet haut reste lisible. La hauteur totale du `header` de la maison (filet haut + tête) doit être au plus de **200 px** à 375 px de large.

## Critères d'acceptation
Chaque critère doit être vérifiable par une session seule (commande, page, valeur).
1. `/` affiche `KiosqueHome` et `/lab` affiche toujours `ArchiveHome`. `document.title` de `/` est identique à celui de `refonte-kiosque`, en fr comme en en.
2. Sur `/`, la manchette est égale au titre (fr) de la brève `ia` de `getDays()[0]`, soit aujourd'hui « Anthropic lance une académie pour former 10 000 ingénieurs de déploiement » si le dernier jour est le 2026-10-03. Le lien « Lire la Gazette du jour » pointe vers `/breves/<cette date>`. Le terme du mot du jour est affiché.
3. Présentoirs : 4 couvertures. La couverture du Magazine pointe vers `/magazine/<date de getIssues()[0]>` et affiche son titre. Le Zine n'a pas de `href` et porte `aria-disabled="true"`. La couverture des Jeux pointe vers `/jeux` et contient le titre fr de chaque jeu de `listeJeux()`. Celle du Lab pointe vers `/lab` et affiche « PIÈCES : <n> », où n est le nombre de `visibleProjects()`.
4. Le bulletin contient un lien par entrée de `FEEDS` (vers son `path`) et un lien vers `/suivre`.
5. En anglais (bouton FR/EN), aucun texte de la page ne reste en français, hormis les noms propres (titres des titres, noms des jeux s'ils sont identiques, contenu « Prix : un café » traduit en « Price: one coffee »). Toutes les chaînes viennent de `kiosqueText.js` ou des données.
6. À 375 px : `document.documentElement.scrollWidth === window.innerWidth` sur `/`, et la hauteur du header de la maison ≤ 200 px. À 1366 px : les 4 couvertures sont sur une seule ligne.
7. Avec `prefers-reduced-motion: reduce` émulé, l'`animation-name` du texte « INSERT COIN » vaut `none`.
8. `git grep -nE "picsum|unsplash|\\.otf|\\.ttf|woff2?" -- src index.html` ne trouve rien de nouveau par rapport à `refonte-kiosque`.
9. Aucune erreur console sur `/`, `/lab`, `/breves`, `/magazine`, `/jeux`.
10. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
11. Tout est commité sur `auto/kiosque-une`, rien sur `main` ni sur `refonte-kiosque`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Refonte des pages `/breves`, `/magazine`, `/jeux`, `/lab` (missions gazette-web, magazine-web, jeux-arcade, lab-dossiers).
- Harmonisation des noms des flux RSS, de la page `/suivre` et de la 404 (mission kiosque-annexes).
- La rubrique Zine elle-même (à cadrer avec Michael).
- Toute modification de `Defilant.jsx`, `NavTitres.jsx` ou `Colophon.jsx` (seul `Masthead.jsx` change, pour D8).
