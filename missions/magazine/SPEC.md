# Mission magazine — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : un magazine de veille IA sur le site, alimenté par une routine. Décisions de Michael : **un numéro par semaine (lundi matin)**, **publication par pull request** (il valide), **angle orienté designers et développeurs** (outils, workflows, Claude, Figma…), **bilingue FR/EN**.

Cette mission construit **la rubrique et le format**. La routine de veille qui écrira les numéros est la mission suivante (non incluse ici) : tout doit donc être conçu pour qu'une session automatique puisse publier un numéro **en ajoutant un seul fichier de données, sans toucher au code**.

## Contexte
- Routes : `src/App.jsx` (react-router, dans `<Shell />`). Vercel réécrit toutes les URL vers `index.html` (`vercel.json`) : de nouvelles routes fonctionnent en ligne sans configuration.
- Sidebar : `src/shell/Sidebar.jsx`, sections « Le Lab » et « Portfolio » (`NavSectionLabel`, `NavItem`). Textes d'interface dans `src/i18n/ui.js` (`t(lang, clé)`).
- Esthétique : archive / dossiers imprimés (voir `src/lab/CaseFile.jsx`, `src/lab/projects/WorkflowSolo.jsx`). Tokens dans `src/styles/tokens.css`.
- Langue : `useLanguage()` ; responsive : `useIsMobile()`.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Données.** Un numéro = un fichier JSON : `src/magazine/numeros/AAAA-MM-JJ.json` (date du lundi de parution). Chargement de tous les numéros avec `import.meta.glob('./numeros/*.json', { eager: true })` (fonction native de Vite, **aucune dépendance**). Tri du plus récent au plus ancien. JSON plutôt que Markdown : pas de parseur à ajouter, structure vérifiable.

**D2 — Format d'un numéro.**
```json
{
  "numero": 1,
  "date": "2026-09-28",
  "titre": { "fr": "…", "en": "…" },
  "edito": { "fr": "2-3 phrases", "en": "…" },
  "articles": [
    {
      "titre": { "fr": "…", "en": "…" },
      "resume": { "fr": "3-5 phrases, rédigées, jamais copiées", "en": "…" },
      "pourquoi": { "fr": "Pourquoi ça compte pour un designer / développeur", "en": "…" },
      "categorie": "outils | modeles | design | dev | workflow",
      "sources": [ { "titre": "Nom de la source", "url": "https://…" } ]
    }
  ]
}
```
Règles : chaque texte existe en `fr` **et** `en` ; 1 à 5 articles ; au moins une source `https://` par article ; `numero` = précédent + 1.

**D3 — Documentation du format.** `src/magazine/FORMAT.md` : le schéma ci-dessus, les règles, un exemple complet, et la marche à suivre pour publier (« ajouter un fichier, rien d'autre »). C'est le document que lira la routine de veille : il doit se suffire à lui-même.

**D4 — Validation.** `src/magazine/numeros.js` charge les fichiers et les **valide** selon D2. Un numéro invalide n'est pas affiché et produit un `console.error` explicite (fichier + règle violée). Aucun plantage de la page.

**D5 — Pages et routes.**
- `/magazine` : en-tête de rubrique (titre, sous-titre expliquant le magazine : veille IA hebdomadaire, orientée design et dev, préparée par une routine Claude et validée par Michael), puis la liste des numéros (numéro, date, titre, nombre d'articles).
- `/magazine/:date` : un numéro — en-tête (Nº, date, titre), édito, puis les articles (catégorie, titre, résumé, « Pourquoi ça compte », sources en liens externes `target="_blank" rel="noopener noreferrer"`). Lien retour vers `/magazine`. Numéro inconnu → message « Numéro introuvable » + lien retour.
- Composants dans `src/magazine/` (ex. `MagazineHome.jsx`, `MagazineIssue.jsx`).

**D6 — Navigation.** Nouvelle section de sidebar **« Magazine »** (clé i18n, FR « Magazine », EN « Magazine »), placée **entre « Le Lab » et « Portfolio »**, avec un seul lien vers `/magazine`. Ce lien reste actif (surligné) sur `/magazine/:date` aussi : ajouter une prop optionnelle à `NavItem` pour désactiver `end`, sans changer le comportement des liens existants. Numéro affiché dans la sidebar : `✎` (comme `✛` pour Lab Home).

**D7 — Esthétique.** Même univers que le reste du site (archive imprimée, en-tête façon dossier, typographies et tokens existants). Réutiliser les composants existants quand ils conviennent (`Section`, `SectionTitle`, `Tag`, en-têtes de `CaseFile`) ; sinon composants locaux. **Tokens uniquement**, aucune couleur brute. Lisible à 375 px sans débordement horizontal.

**D8 — Numéro 0.** Créer `src/magazine/numeros/2026-09-28.json`, **numéro 0 « Présentation »**, qui présente le magazine (édito) et contient **un seul article, factuel et vérifiable** : la mise en place du système de missions autonomes sur ce site, avec pour source la page du site `https://misran-labs.vercel.app/lab/utilisation-ia` (URL publique du site, vérifiée au cadrage : champ « homepage » du dépôt GitHub). **Aucune actualité inventée.**

## Critères d'acceptation
1. La sidebar affiche la section « Magazine » entre « Le Lab » et « Portfolio » (FR et EN) ; le lien est surligné sur `/magazine` et sur `/magazine/2026-09-28`.
2. `/magazine` liste le numéro 0 ; `/magazine/2026-09-28` l'affiche entièrement, en FR et en EN ; `/magazine/1999-01-01` affiche « Numéro introuvable ».
3. Validation : un fichier de test invalide (ex. `en` manquant), ajouté temporairement, n'est pas affiché et produit un `console.error` explicite ; le fichier de test est ensuite **supprimé** (ne pas le commiter).
4. Aucune erreur console sur `/magazine`, `/magazine/2026-09-28` (FR et EN), `/` et `/lab/utilisation-ia`.
5. 375 px : aucun débordement horizontal sur les deux pages du magazine.
6. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/magazine/*.jsx` ne renvoie rien.
7. `src/magazine/FORMAT.md` existe et suffit à écrire un numéro valide sans lire le code.
8. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers de la mission.
9. Tout est commité sur `auto/magazine`, rien sur `main`, rien de poussé.

## Hors périmètre
- La routine de veille elle-même (mission suivante).
- Flux RSS, newsletter, commentaires, recherche.
- Mise en avant du magazine sur la home (à proposer en recommandation).
