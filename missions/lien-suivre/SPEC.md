# Mission lien-suivre — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : ajouter un lien discret vers `/suivre` en bas des pages Magazine, Brèves et Projets (recommandation du RAPPORT de la mission rss-suivre).

## Contexte
- Page `/suivre` et flux RSS en production depuis la PR #26 : `src/suivre/SuivrePage.jsx`, `src/suivre/suivreText.js` (URL des flux, rythmes), flux `/magazine/rss.xml`, `/breves/rss.xml`, `/projets/rss.xml`.
- Les pages de rubrique se terminent toutes par `<CaseFooter … />` (`src/lab/CaseFile.jsx` l. 169) : `src/magazine/MagazineHome.jsx`, `MagazineIssue.jsx`, `src/breves/BrevesHome.jsx`, `BrevesJour.jsx`, `src/projets/ProjetsHome.jsx`, `ProjetIdee.jsx`, `ProjetsFonctionnement.jsx`.
- État initial (2026-09-30, `main` 0b8bebb) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
Un bandeau discret, juste au-dessus du `CaseFooter`, invite à suivre la rubrique, sur les 7 pages listées.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Composant `src/suivre/SuivreBandeau.jsx`**, prop `rubrique` (`'magazine' | 'breves' | 'projets'`), langue via `useLanguage()`, textes dans `suivreText.js` (réutiliser les URL de flux déjà présentes, ne pas les réécrire). Styles via tokens uniquement, dans le langage des pages « dossier » : bloc pleine largeur, `marginTop: 40`, bordure fine en pointillés (`--border-thin dashed --border`), padding `--space-md`, `display: flex`, `flexWrap: wrap`, `gap: 12`, `alignItems: center`, `justifyContent: space-between`.

**D2 — Contenu** (FR / EN) :
- À gauche : `◉` en `--primary` + une phrase selon la rubrique, en `--font-body` 14 px, couleur `--text2` :
  - magazine : « Le prochain numéro sort lundi. » / « The next issue comes out on Monday. »
  - breves : « Les Brèves reviennent demain matin. » / « The Briefs are back tomorrow morning. »
  - projets : « De nouvelles idées chaque dimanche. » / « New ideas every Sunday. »
- À droite, en `--font-mono` 11 px, majuscules, `letterSpacing: 0.06em` : un lien interne (react-router `Link`) « Suivre le Lab → » / « Follow the Lab → » vers `/suivre`, en `--primary` ; puis, séparé par « · », un lien « RSS » vers le flux de la rubrique (URL absolue, `<a>` simple, même onglet), en `--muted`.
- À 375 px, les deux parties passent l'une sous l'autre sans débordement.

**D3 — Placement** : immédiatement avant `<CaseFooter … />` dans les 7 fichiers ; `rubrique` = `'magazine'` pour les pages Magazine, `'breves'` pour Brèves, `'projets'` pour les 3 pages Projets. Ne pas toucher aux `NotFound` des rubriques ni à la page 404. Ne rien changer d'autre dans ces fichiers que l'import et la ligne du bandeau.

## Critères d'acceptation
1. Sur `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-09-30`, `/projets`, `/projets/P-005`, `/projets/fonctionnement` : le bandeau est présent juste au-dessus du pied de page, avec la bonne phrase ; le lien « Suivre le Lab → » mène à `/suivre` (navigation interne, pas de rechargement) ; le lien RSS pointe sur le bon flux.
2. Pas de bandeau sur `/magazine/1999-01-01`, `/breves/1999-01-01`, `/projets/P-999`, `/nimporte-quoi`, `/`, `/suivre`.
3. En anglais : textes anglais.
4. À 375×812 : bandeau lisible, pas de défilement horizontal ; en bas de défilement, le bandeau n'est pas caché par la Fiole.
5. Aucune erreur ni avertissement en console.
6. `grep -rn "#[0-9a-fA-F]\{6\}" src/suivre/SuivreBandeau.jsx` ne renvoie rien.
7. Captures au RAPPORT : bandeau desktop (Magazine) et 375 px (Brèves).
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/lien-suivre`, rien sur `main`, rien de poussé.

## Hors périmètre
- Lien vers `/suivre` sur l'accueil ou dans les pages du Lab.
- Newsletter, réseaux supplémentaires.
