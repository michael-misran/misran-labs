# Mission projets — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : une rubrique où Claude propose chaque semaine des idées de fonctionnalités, d'améliorations et de **projets qui peuvent rapporter de l'argent** (tous projets, y compris nouveaux) ; des **numéros** devant les titres pour que Michael dise ce qu'il garde, développe ou arrête. Décisions de Michael : **page publique**, **routine hebdomadaire**, **tout projet** ; le **modèle économique reste privé** (fichiers locaux, hors Git), consultable en local et en demandant à Claude.

Cette mission construit **la rubrique et les formats**. La routine qui proposera les idées est la mission suivante (configurée avec Michael). Comme pour le Magazine : ajouter ou faire évoluer une idée = **modifier des fichiers de données, jamais le code**.

## Contexte
- Modèle à suivre : le Magazine (`src/magazine/` : `numeros.js` avec `import.meta.glob` + validation, `FORMAT.md`, `MagazineHome.jsx`, `MagazineIssue.jsx`, `MagazineParts.jsx`, `magazineText.js`), routes dans `src/App.jsx`, section de sidebar dans `src/shell/Sidebar.jsx` (`NavSectionLabel`, `NavItem` avec `end={false}`), titres d'onglet dans `src/shell/registry.js`, textes d'interface dans `src/i18n/ui.js`.
- `.gitignore` ignore déjà `/src/private/`.

## Décisions (tranchées)

**D1 — Données publiques.** Une idée = un fichier `src/projets/idees/P-NNN.json` (numéro sur 3 chiffres, jamais réutilisé). Chargement + validation dans `src/projets/idees.js` (`import.meta.glob`, eager), tri par numéro décroissant. Format :
```json
{
  "id": "P-001",
  "date": "2026-09-27",
  "titre": { "fr": "…", "en": "…" },
  "resume": { "fr": "1-2 phrases", "en": "…" },
  "probleme": { "fr": "Le problème réel, pour qui", "en": "…" },
  "idee": { "fr": "Ce qu'on construirait", "en": "…" },
  "type": "produit | service | outil | contenu | amelioration",
  "taille": "petite | moyenne | grosse",
  "statut": "proposee | gardee | en-cours | faite | arretee",
  "decision": { "date": "AAAA-MM-JJ", "note": { "fr": "…", "en": "…" } },
  "mission": "nom-de-mission (si en-cours ou faite)"
}
```
`decision` obligatoire pour `gardee`, `arretee`, `en-cours`, `faite` (pour `arretee` : la raison, pour ne pas reproposer l'idée) ; `mission` obligatoire pour `en-cours` et `faite`.

**D2 — Validation stricte = garde-fou de confidentialité.** Un fichier public qui contient **une clé non prévue par D1** (ex. `prix`, `revenus`, `modele`) est **rejeté** (non affiché, `console.error` explicite). Ainsi une information économique ne peut pas être publiée par erreur. Autres règles : textes FR et EN non vides ; valeurs de `type`/`taille`/`statut` dans les listes ; nom de fichier = `id`.

**D3 — Données privées (locales, hors Git).** Une note par idée : `src/private/projets/P-NNN.md` (Markdown libre). Gabarit documenté dans `FORMAT.md` : cible et marché (sources si chiffres), modèle économique, prix envisagés, **hypothèses** de revenus (présentées comme telles), temps avant le premier euro, risques, première étape de validation peu coûteuse. Le dossier `src/private/` est déjà ignoré par Git : **ne jamais le commiter**.

**D4 — Pages publiques.**
- `/projets` : en-tête de rubrique (explique le principe : idées proposées chaque semaine par une routine Claude, triées par Michael, y compris celles arrêtées — le modèle économique n'est pas publié), filtres par statut (comme les filtres de `LabTokens.jsx`), compteurs par statut, liste des idées : **numéro en évidence** (`P-001`), titre, résumé, type, taille, statut.
- `/projets/:id` : une idée — problème, idée, type, taille, statut, décision datée, lien vers la mission si elle existe. Id inconnu → « Idée introuvable » + retour.
- Statuts avec libellé texte (pas seulement une couleur) : Proposée, Gardée, En cours, Faite, Arrêtée (FR/EN).

**D5 — Vue privée locale.** Sur `/projets/:id`, **uniquement en développement** (`import.meta.env.DEV`), afficher sous l'idée un bloc « Notes privées (local) » avec le contenu de `src/private/projets/<id>.md` s'il existe (texte brut dans un bloc lisible, pas de dépendance Markdown). Le chargement doit se faire dans une branche `if (import.meta.env.DEV)` avec un `import.meta.glob` **non eager**, pour que ces fichiers **n'entrent jamais dans le build de production**.

**D6 — Navigation.** Section de sidebar **« Projets »** (FR « Projets », EN « Projects ») juste après « Magazine », un lien `/projets` actif aussi sur `/projets/:id` (`end={false}`), symbole `◇`. Titre d'onglet/barre d'état dans `registry.js` (« Projets », « Projets — P-001 · <titre> »).

**D7 — Esthétique.** Univers « archive imprimée » du site, cohérent avec le Magazine ; tokens uniquement ; lisible à 375 px.

**D8 — Documentation.** `src/projets/FORMAT.md` : format public (D1–D2), gabarit privé (D3), et la marche à suivre pour la routine : ajouter une idée, changer un statut, noter une décision.

**D9 — Première idée (réelle, pas inventée).** `P-001` : l'**application de prise de mandat pour agent immobilier**, idée que Michael a citée le 2026-09-26 comme exemple de projet à construire en autonomie. Statut `proposee`. Fichier privé `src/private/projets/P-001.md` créé avec le gabarit D3, **sections laissées « à évaluer »** : aucun chiffre ni marché inventé.

## Critères d'acceptation
1. Sidebar : « Projets » après « Magazine » (FR/EN), actif sur `/projets` et `/projets/P-001`.
2. `/projets` et `/projets/P-001` s'affichent en FR et EN ; les filtres par statut fonctionnent ; `/projets/P-999` → « Idée introuvable ».
3. Validation : un fichier de test avec une clé `prix` et un autre sans `en` sont rejetés avec un `console.error` explicite, puis **supprimés** (jamais commités).
4. Vue privée : en dev, le bloc « Notes privées (local) » apparaît sur `/projets/P-001`. **Build de production** : écrire temporairement une chaîne repère unique dans `src/private/projets/P-001.md`, lancer `npm run build`, vérifier que la chaîne est **absente** de `dist/` (`grep -r`), puis retirer la chaîne repère.
5. `git status` : aucun fichier de `src/private/` suivi ; `git check-ignore src/private/projets/P-001.md` confirme qu'il est ignoré.
6. Aucune erreur console sur `/projets`, `/projets/P-001` (FR et EN), `/`, `/magazine`.
7. 375 px : pas de débordement horizontal sur les deux pages.
8. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/projets/*.jsx` ne renvoie rien.
9. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers de la mission.
10. Tout est commité sur `auto/projets` (sauf `src/private/`), rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- La routine hebdomadaire de propositions (mission suivante).
- La sauvegarde des notes privées dans un dépôt GitHub privé (à faire avec l'accord de Michael, action sur son compte).
- Une version en ligne protégée par mot de passe des notes privées.
- Boutons de vote ou de décision sur la page : Michael décide en écrivant à Claude.
