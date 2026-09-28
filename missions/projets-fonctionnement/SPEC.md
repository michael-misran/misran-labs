# Mission projets-fonctionnement — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-28. Brief de Michael : « tu peux rajouter une page dans la partie projet qui explique tout ce qu'on vient de dire avec les arborescences… »

## Contexte
La rubrique Projets (`/projets`) : `src/projets/ProjetsHome.jsx` (registre), `ProjetIdee.jsx` (fiche `/projets/:id`), `ProjetsParts.jsx` (composants dont `ProjetsHero`), `projetsText.js` (textes FR/EN, séparés des composants pour la règle lint react-refresh). Routes dans `src/App.jsx`.
Modèle pour les arborescences : composant `Pre` de `src/lab/projects/UtilisationIA.jsx` (bloc `pre` stylé avec tokens, défilement horizontal interne). Schéma d'étapes : `src/components/diagrams/FlowDiagram.jsx`.
**Toute l'information à présenter est dans `CONTENU.md`** (ce dossier) : seule source de faits.

## Objectif
Une page « Comment ça marche » dans la rubrique Projets, FR et EN, qui explique avec des arborescences comment le système de missions s'emboîte (ordinateur / projet / GitHub + tâche programmée) et ce qui se passe quand Michael dit « on développe P-NNN ».

## Décisions (tranchées, ne pas rediscuter)

**D1 — Route.** `/projets/fonctionnement`, déclarée dans `App.jsx` **avant** `projets/:id` (React Router 7 donne de toute façon la priorité au segment statique ; l'ordre sert la lisibilité). Aucun identifiant d'idée ne peut valoir `fonctionnement` (format `P-NNN`).

**D2 — Fichiers.** Composant `src/projets/ProjetsFonctionnement.jsx`. Textes FR/EN dans un nouveau fichier `src/projets/fonctionnementText.js` (objet `FONCT_TEXT = { fr, en }`), pas dans le composant (règle react-refresh). Arborescences stockées comme chaînes dans ce fichier texte, traduites pour l'EN (commentaires après `←`), noms de fichiers inchangés.

**D3 — Structure de page.** Même habillage que `ProjetsHome.jsx` : `CaseMasthead`, `ProjetsHero` (numéro `?` ou `◇`, titre « Comment ça marche » / « How it works »), sections avec `SectionTitle`, `CaseFooter`. Un lien « ← Projets » en haut, comme dans `ProjetIdee.jsx`. Sections dans l'ordre de CONTENU.md §0 à §8.

**D4 — Schémas.**
1. Arborescence « où sont les niveaux » (§1).
2. Arborescence niveau 1 (§2).
3. Arborescence niveau 2 (§3).
4. Arborescence niveau 3 (§4).
5. Circuit en 5 étapes (§5) : `FlowDiagram` s'il s'y prête, sinon liste numérotée.
6. Les deux cas de « on développe P-NNN » (§7) : deux colonnes (ou deux blocs empilés sur mobile) ; le cas « dépôt à part » en étapes numérotées.
Rendu des arborescences : un composant `Pre` local, copié de `UtilisationIA.jsx` (pas d'import depuis un fichier du Lab). **Aucune nouvelle dépendance.**

**D5 — Lien d'accès.** Dans `ProjetsHome.jsx`, sous le paragraphe `concept`, un lien discret « Comment ça marche → » / « How it works → » vers `/projets/fonctionnement` (style des liens mono existants, couleur `var(--primary)`). Sur la fiche `P-003`, rien à ajouter (hors périmètre).

**D6 — Tokens uniquement.** Aucune couleur brute (hex, rgb) dans les nouveaux fichiers : uniquement `var(--…)`.

**D7 — Confidentialité.** Site et dépôt publics : aucun chemin `/Users/…`, aucun email, aucun token. `~/.claude/` et `Documents/Projets/` sont acceptables.

**D8 — Responsive.** Lisible à 375 px : aucun débordement horizontal de la page (les arborescences défilent dans leur propre conteneur).

**D9 — EN.** Traduction complète et naturelle de tous les textes, y compris les commentaires des arborescences.

**D10 — Ton.** Phrases courtes, simples, pour quelqu'un qui n'est pas à l'aise avec Git. Troisième personne (« Michael tape /mission »), comme le reste de la rubrique.

## Critères d'acceptation
1. `/projets` affiche le lien « Comment ça marche → » ; il mène à `/projets/fonctionnement`, qui s'affiche en FR et en EN.
2. `/projets/P-003` s'affiche toujours normalement (la nouvelle route ne casse pas les fiches).
3. Les §0 à §8 de CONTENU.md sont tous couverts ; les 6 schémas de D4 sont présents.
4. Aucune erreur console sur `/projets`, `/projets/fonctionnement` (FR et EN), `/projets/P-003`.
5. À 375 px : `document.documentElement.scrollWidth <= innerWidth` sur `/projets/fonctionnement`.
6. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/projets/ProjetsFonctionnement.jsx src/projets/fonctionnementText.js` ne renvoie rien ; `grep -nE "ghp_|gho_|/Users/|@gmail" ` sur les mêmes fichiers ne renvoie rien.
7. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers de la mission.
8. Tout est commité sur `auto/projets-fonctionnement`, rien sur `main`, rien de poussé.

## Hors périmètre
- Modifier les fiches d'idées, `FORMAT.md`, `PROPOSITIONS.md`, la page « Utilisation de l'IA ».
- Modifier les composants de schéma existants.
- Ajouter une entrée dans la sidebar.
