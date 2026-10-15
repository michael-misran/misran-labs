# Mission atelier-automatique-1 — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-10-15. Brief de Michael : « Misran Labs c'est un peu le bordel. J'aimerais découper un peu tout ça et faire d'autres livres. Par exemple toute la doc sur l'IA qu'on a mise en place peut avoir son propre livre. » Nom, sommaire et direction visuelle validés en conversation ; maquette validée : `screens/atelier-automatique.html`.

## Contexte
La doc sur l'IA est éparpillée dans les dossiers du Lab : `src/lab/projects/UtilisationIA.jsx` (chronologie, ~1300 lignes) et `src/lab/projects/SalleDesMachines.jsx` (routines, agents, schémas). Elle devient un livre à part de 1977 Éditions : **« L'Atelier automatique — Manuel d'utilisation et d'entretien »**, mis en page comme une notice technique des années 70.

Le livre complet a 9 parties + une annexe :
0. Consignes de sécurité · 1. Présentation de l'appareil · 2. Le personnel · 3. Les automates · 4. Les missions autonomes · 5. Les accessoires · 6. Réglages et consommation · 7. Pannes et dépannage · 8. Carnet d'entretien · Annexe : glossaire.

**Cette mission (1/2) construit le livre et les parties 0 à 3.** La mission 2 fera les parties 4 à 8, le glossaire et le transfert depuis le Lab.

Modèle technique à suivre : le livre Portfolio (`src/portfolio/PortfolioLivre.jsx`, `livreTexte.js`, `portfolio.css`) : double page sur une table de lecture, flèches / clavier / clic / glissé, pages empilées sur téléphone, impression A5, textes FR/EN avec `lt()`.

## Objectif
`/atelier` ouvre « L'Atelier automatique » : couverture, sommaire, parties 0 à 3 complètes en FR et EN, quatrième de couverture, fidèle à la maquette.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers.** Nouveau dossier `src/atelier/` : `AtelierLivre.jsx`, `atelierTexte.js` (textes FR/EN), `atelier.css`, et si utile `schemas.jsx` (les SVG). Route `/atelier` dans `src/App.jsx`, hors du Shell, montée avec `livre(...)` comme `/portfolio`.

**D2 — Mécanique copiée, pas mutualisée.** Reprendre la mécanique du Portfolio (tourne-pages, clavier, glissé, empilement mobile, `prefers-reduced-motion`, impression une page A5 par page) en la copiant dans `AtelierLivre.jsx`. Ne pas modifier `src/portfolio/` (pas de refactor commun : risque de casser un livre en ligne).

**D3 — Fidélité à la maquette.** `screens/atelier-automatique.html` est la référence visuelle (couleurs, polices, quadrillage bleu de plan, plaque signalétique, encadré ATTENTION à bandes, écran VT323, cartouches « Fig. n »). Le dossier `screens/` est exclu de Git : la maquette se lit sur le disque, elle ne se commite pas. Le CSS de la maquette peut être repris tel quel (unités `cqw`), préfixé `at-`.

**D4 — Tokens.** Ajouter dans `src/styles/tokens.css` la couleur du titre : `--primitive-titre-atelier: #1f4f86` (primitive) et `--titre-atelier` (sémantique), à côté des autres `--titre-*`. Les autres couleurs (crème, trait de plan, jaune, métal) restent des variables locales dans `atelier.css`. Polices : uniquement celles déjà chargées par `index.html` (Oswald, Special Elite, VT323). Aucune nouvelle police.

**D5 — Pagination des parties 0 à 3.**
- p. 1 couverture (celle de la maquette) ; p. 2 garde « Avant de lire » (comment utiliser ce manuel, en quelques lignes) ; p. 3 sommaire.
- Le sommaire liste les 9 parties et l'annexe ; les parties 4 à 8 et l'annexe portent la mention « en préparation » au lieu d'un folio.
- **Partie 0 — Consignes de sécurité** (2 pages) : les règles absolues (Git : jamais de commit ni de push sur `main` sans Michael, branche → controleur → pull request, Michael fusionne ; dépôt public : aucun secret ni donnée personnelle) en encadrés ATTENTION ; l'incident du token en clair raconté comme cas d'école.
- **Partie 1 — Présentation de l'appareil** (2 pages) : une page « Fig. » en bleu de plan avec un schéma SVG de l'atelier (Michael → session interactive / « tour de contrôle » → routines et missions → agents → branches et pull requests → site) et une page de texte qui l'explique.
- **Partie 2 — Le personnel** : une ouverture de partie, puis une fiche par agent : controleur, relecteur, secrétaire, veilleur, vérificateur, explorateur, expert. Le controleur reprend la double page de la maquette (Fig. 7 tampon éclaté + fiche). Les six autres : une page chacun, fiche (rôle / appelé quand / ne fait jamais / modèle) + un petit pictogramme SVG au trait dans le style de plan (ex. loupe pour l'explorateur, lunette pour le veilleur, crayon rouge pour la secrétaire).
- **Partie 3 — Les automates** : une ouverture, puis une page par routine : Oracle du Matin, missions autonomes, idées du dimanche, carnet, retour de routine, avec horaire, modèle, ce qu'elle produit, ce qui reste à Michael. Un tableau récapitulatif « horaires de marche ».
- Dernière page : quatrième de couverture (plaque signalétique, une phrase de présentation, « 1977 Éditions »).
- Nombre de pages pair (ajouter une page « Notes » vierge à lignes si besoin pour finir sur la 4e de couverture).

**D6 — Sources, rien d'inventé.** Chaque fait vient d'un fichier du dépôt ou des agents : `src/lab/projects/UtilisationIA.jsx`, `src/lab/projects/SalleDesMachines.jsx`, `missions/README.md`, `CLAUDE.md`, `.claude/agents/*.md`, `~/.claude/agents/*.md` (controleur, expert, explorateur, verificateur). Pas de chiffre, date, horaire ou modèle qui n'y figure pas. Ton : celui d'un manuel (phrases courtes, impératif pour les consignes), une pointe d'humour comme sur la maquette.

**D7 — Dépôt public.** Aucun chemin absolu contenant le nom d'utilisateur du Mac, aucune adresse e-mail, aucun token ou extrait de token, aucun nom de dépôt privé.

**D8 — Bilingue.** Tous les textes en FR et EN via le même mécanisme que le Portfolio (`useLanguage` + `lt`). L'anglais : traduction soignée, pas mot à mot.

**D9 — Pas sur le présentoir.** Le livre n'est accessible que par `/atelier` pour l'instant. Ne pas toucher à `src/bibliotheque/`, `src/numero/volumes.js`, ni aux dossiers du Lab.

## Critères d'acceptation
1. `/atelier` affiche la couverture ; on tourne les pages au clavier (←/→) et par les flèches jusqu'à la 4e de couverture ; aucune erreur dans la console.
2. Toutes les pages de D5 existent, dans cet ordre, en FR et en EN (bascule de langue du site).
3. À 375 px de large : pages empilées, aucun défilement horizontal, aucun texte qui déborde d'une page.
4. À 1300 px : double page côte à côte ; la couverture et la double page du controleur ressemblent à la maquette (vérification visuelle avec capture).
5. `grep` sur `src/atelier/` : aucune occurrence de `/Users/`, `@gmail`, `ghp_`, `michaelmisran`.
6. `--titre-atelier` défini dans `tokens.css` et utilisé par `atelier.css`.
7. Relecture de la forme (orthographe, typographie française, traductions) par l'agent `secretaire` : corrections appliquées.
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
9. Tout est commité sur `auto/atelier-automatique-1`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Parties 4 à 8 et glossaire (mission 2).
- Retrait ou redirection des dossiers IA du Lab (mission 2).
- Place du livre sur le présentoir de la librairie (décision à prendre avec Michael quand Misran Labs sera démonté).
- Version PDF imprimable dédiée.
