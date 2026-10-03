# Mission kiosque-maison — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-03. Brief de Michael : « ça me plaît, on peut organiser cette migration ? » (à propos de la maquette `screens/accueil-kiosque.html`).

## Contexte
Michael a validé un nouveau concept pour tout le site : **Misran Labs devient une maison d'édition**, à la manière du Label 619 qui publie LowReader. Le site devient son « kiosque » et chaque rubrique est un **titre** de la maison, avec sa propre tête et sa propre typo :

| Titre | Route actuelle | Rythme | Couleur | Univers typo |
|---|---|---|---|---|
| La Gazette du Lab | `/breves` | quotidien | rouge `#b3301d` | gothique (titre), lettres de bois, Crimson Pro |
| Le Magazine | `/magazine` | hebdo | bleu `#2b3a9b` | Playfair Display italique 900 |
| Le Zine | (n'existe pas encore) | mensuel | rose fluo `#ff4f8b` | Anton + lettrage BD |
| Les Jeux | `/jeux` | toujours ouverts | orange `#ff8a1f` | rétro gaming : Press Start 2P, VT323 |
| Le Lab | `/` aujourd'hui (ArchiveHome) + `/lab/:slug` | dossiers | vert `#1f7a4d` | dossier confidentiel : Special Elite |

ADN commun à tous les titres : papier `#f6f1e6`, blanc cassé `#fffdf8`, encre `#16120e`, gris `#4b443c`, filet `#a79f93`, **doubles filets** (`3px double`), lettres de bois (Ultra, Alfa Slab One, Rye), étiquettes en Oswald capitales espacées, chapeaux en IM Fell English italique.

**Référence visuelle** : `screens/accueil-kiosque.src.html`. Ce fichier est local et exclu de Git, mais présent dans le dossier de travail : le lire, ne jamais le commiter. Il contient la tête de la maison, la navigation par titres et le bandeau défilant à reproduire dans cette mission. L'accueil (la Gazette à la une, les présentoirs, le bulletin) est réservé à la mission suivante.

Aujourd'hui le site a un cadre « système d'archive » : `src/shell/Shell.jsx` en grille plein écran avec Topbar, Sidebar, Statusbar (et la mascotte Fiole perchée dessus), et un défilement interne dans `.shell-main`. Les styles sont écrits en ligne (`style={{…}}`) et consomment les tokens sémantiques de `src/styles/tokens.css` (primitive → semantic → component). Les polices viennent de Google Fonts via `index.html` (Fraunces, Work Sans, JetBrains Mono).

**Refonte livrée d'un seul coup (décision de Michael)** : rien ne doit changer en ligne avant la fin de toutes les missions de la refonte. Les missions partent donc de la branche d'intégration `refonte-kiosque`, et non de `main` (voir D1).

## Objectif
Le site entier tourne dans le nouveau cadre « maison d'édition » : en-tête de la maison, navigation par titres, bandeau défilant et colophon, avec des tokens aux couleurs et polices de la maison. Les pages intérieures gardent leur mise en page actuelle et héritent seulement des nouveaux tokens. Leur refonte est faite par les missions suivantes.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Branche d'intégration.** `auto/kiosque-maison` part de `refonte-kiosque` (créée depuis `main` le 2026-10-03). C'est une exception, validée par Michael, à la règle « une mission part de `main` ». À la clôture, la pull request vise `refonte-kiosque`, pas `main`. Une PR finale `refonte-kiosque` → `main` mettra tout en ligne à la fin de la refonte.

**D2 — Polices 100 % libres (décision de Michael).** Le site n'utilise que des polices Google Fonts sous licence SIL OFL ou Apache 2.0, chargées par le lien de `index.html`, comme aujourd'hui. Aucun fichier de police n'est commité. Les remplacements des polices privées de Michael sont imposés : **UnifrakturMaguntia** à la place de Plain Germanica (titre de la Gazette ; espacement des mots régulier, réduire `word-spacing` si l'espace paraît trop large, comme demandé par Michael pour le journal papier) et **Comic Neue** gras italique à la place de Comic Book (lettrage BD du Zine). Familles à charger : Ultra, Alfa Slab One, Rye, Oswald (500, 700), IM Fell English (normal + italique), Crimson Pro (400, 600, 700 + italiques 400, 600), Playfair Display (900 + italique 900), Anton, Press Start 2P, VT323, Special Elite, UnifrakturMaguntia, Comic Neue (italique 700), IBM Plex Mono (400, 600). Fraunces, Work Sans et JetBrains Mono restent chargées tant que des pages les utilisent encore.

**D3 — Tokens.** Dans `tokens.css`, ajouter les primitives de la maison (papier, blanc cassé, encre, gris, filet, les 5 couleurs de titres, les familles de D2), puis **réaffecter les sémantiques existantes** sans les renommer : fonds → papier et blanc cassé, textes → encre et gris, bordures → encre et filet, `--primary` et ses dérivés → rouge de la maison `#b3301d`, `--font-heading` → Alfa Slab One, `--font-body` → Crimson Pro, `--font-mono` → IBM Plex Mono. Ajouter des tokens sémantiques de titres (`--titre-gazette`, `--titre-magazine`, `--titre-zine`, `--titre-jeux`, `--titre-lab`) et de typo (`--font-bois`, `--font-bois-2`, `--font-bois-3`, `--font-etiquette`, `--font-chapo`, `--font-gothique`, `--font-bd`, `--font-pixel`, `--font-ecran`, `--font-machine`). Mettre à jour le commentaire d'en-tête du fichier. Ne pas toucher aux tokens component (onglets de CaseFile).

**D4 — Défilement du document.** On abandonne la grille plein écran et le défilement interne `.shell-main` : c'est la page qui défile, et l'en-tête de la maison part avec elle. Seule la barre de navigation par titres reste collée en haut (`position: sticky`). Aucun code du site ne dépend du défilement de `.shell-main` (vérifié au cadrage). Les règles d'impression de `Shell.jsx` sont adaptées en conséquence.

**D5 — Nouveaux composants de cadre** dans `src/shell/`, en styles en ligne comme le reste du site, avec des textes fr/en dans `src/i18n/ui.js` :
- `Masthead.jsx` : un filet haut (à gauche « Misran Labs · maison d'édition indépendante », puis la date du jour en toutes lettres, des liens « Les idées » → `/projets`, « S'abonner » → `/suivre`, « CV » → `/lab/cv`, et le bouton FR/EN repris de `Topbar.jsx`). Dessous : le badge « ML Label », « MISRAN LABS » en Ultra, la phrase d'accroche et le cartouche « Kiosque ouvert dès 5 h 30 », masqué sur mobile.
- `NavTitres.jsx` : les 5 titres, chacun dans sa typo, avec son rythme dessous et un état actif selon la route (`/breves*` = Gazette, `/magazine*`, `/jeux*`, `/lab*` et `/projets*` = Lab). Le Zine n'est pas un lien : il porte la mention « bientôt » (`aria-disabled`). Sur mobile, la barre défile horizontalement, sans menu hamburger. Elle reste collée en haut au défilement.
- `Defilant.jsx` : bandeau noir défilant, alimenté par les **vraies données**. Le dernier jour des Brèves (titre de la brève IA), le dernier numéro du Magazine (titre), les noms des jeux (registre de `src/jeux/`) et le nombre de projets visibles du Lab. Chaque titre dans sa couleur. Contenu dupliqué pour une boucle sans saut. Pause au survol, et animation coupée avec `prefers-reduced-motion: reduce`.
- `Colophon.jsx` : pied de page avec un petit badge ML, le texte de la maison (voir la référence), un lien vers le dépôt GitHub et le numéro de version qu'affichait la Statusbar.

**D6 — La mascotte Fiole reste.** Elle n'a plus de barre d'état où se percher : elle est posée en `position: fixed` en bas à droite (desktop et mobile), avec le même comportement et sans être rognée. `--mascotte-overhang` est réutilisé ou supprimé selon le besoin.

**D7 — Anciens composants.** `Topbar.jsx`, `Sidebar.jsx` et `Statusbar.jsx` ne sont plus rendus et sont supprimés s'ils ne servent plus nulle part (Git garde l'historique). `SecondarySidebar` (la navigation interne de certaines pages du Lab, du Magazine, des Brèves…) continue de fonctionner : colonne à gauche du contenu sur desktop, comme aujourd'hui. `resolveRouteMeta` et la logique de `document.title` sont conservés.

**D8 — Route `/lab`.** Ajouter la route `/lab`, qui affiche `ArchiveHome` : c'est l'index du Lab, cible du titre « Le Lab ». `/` affiche toujours `ArchiveHome` dans cette mission. L'accueil kiosque viendra à la mission suivante.

**D9 — Les idées (Projets) appartiennent au Lab** : elles allument le titre « Le Lab » dans la navigation, et sont accessibles par le lien « Les idées » du filet haut. Pas de titre séparé.

## Critères d'acceptation
Chaque critère doit être vérifiable par une session seule (commande, page, valeur).
1. `index.html` charge les familles de D2 en un seul lien Google Fonts. `git diff refonte-kiosque...auto/kiosque-maison --stat` ne contient aucun fichier `.otf`, `.ttf`, `.woff` ni `.woff2`, et aucun fichier de `screens/`.
2. Dans le navigateur, `getComputedStyle(document.body).backgroundColor` vaut `rgb(246, 241, 230)`, et `--font-body` se résout en Crimson Pro.
3. `src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx` et `Colophon.jsx` existent et sont rendus par `Shell.jsx`. `Topbar`, `Sidebar` et `Statusbar` ne sont plus importés nulle part.
4. Ces routes s'affichent sans erreur console dans le nouveau cadre : `/`, `/lab`, `/lab/design-system`, `/lab/cv`, `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-10-03`, `/projets`, `/projets/fonctionnement`, `/suivre`, `/jeux`, `/jeux/<un slug du registre>`, `/page-inexistante` (la 404).
5. La navigation pointe vers `/breves`, `/magazine`, `/jeux` et `/lab`. Le Zine n'est pas cliquable. Le titre actif est marqué (`aria-current="page"`) sur `/breves/2026-10-03` (Gazette), `/projets` (Lab) et `/jeux` (Jeux).
6. Le bandeau défilant contient le titre de la brève IA du dernier jour de `src/breves/jours/` et le titre du dernier numéro du Magazine. Avec `prefers-reduced-motion: reduce` émulé, son `animation-name` calculé vaut `none`.
7. À 375 px de large, `document.documentElement.scrollWidth === window.innerWidth` sur `/`, `/breves` et `/lab/design-system`. La barre de navigation reste visible en haut après défilement.
8. Le bouton FR/EN change la langue et les textes du cadre. `document.title` est inchangé par rapport à `refonte-kiosque` sur `/`, `/breves` et `/jeux`.
9. La Fiole est visible et entière en bas à droite, sur desktop comme à 375 px.
10. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
11. Tout est commité sur `auto/kiosque-maison`, rien sur `main` ni sur `refonte-kiosque`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire. Ce sont les missions suivantes de la refonte, dans cet ordre :
- **kiosque-une** : la page d'accueil kiosque à `/` (la Gazette du jour à la une, les présentoirs de couvertures, le bulletin d'abonnement), avec les vraies données.
- **gazette-web** : `/breves` et `/breves/:date` en style Gazette (tête gothique, manchette, colonnes, lettrines).
- **magazine-web** : `/magazine` et ses numéros en style magazine classique bleu.
- **jeux-arcade** : `/jeux` et le cadre des pages de jeu en rétro gaming (sans toucher à la mécanique des jeux).
- **lab-dossiers** : l'index du Lab, les fiches projets, le CV et les idées en dossiers confidentiels, ainsi que la mise à jour de la page « Tokens du Lab ».
- **kiosque-annexes** : `/suivre` en bulletin d'abonnement, la 404, et les couleurs des aperçus de partage et des images OG.
- **zine** : la nouvelle rubrique, à cadrer avec Michael (il faut son contenu).
- Toute restyle de page intérieure dans cette mission-ci.
