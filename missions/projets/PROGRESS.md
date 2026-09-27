# Mission projets — PROGRESS

**Statut :** étape 4 faite
**Prochaine action :** étape 5 (vérification des critères 1 à 10) — **attention** : cette session (tâche programmée) n'a pas d'accès navigateur ; les contrôles visuels (rendu FR/EN, filtres, 375 px, absence d'erreur console) n'ont pas pu être faits ici et restent à faire en session interactive avant clôture.
**Blocages :** aucun (voir note ci-dessus pour l'étape 5)

## Étape 3 (données)
`src/projets/projetsText.js` (statuts/types/tailles + textes fr/en), `src/projets/idees.js` (validation stricte D1–D2 : clés inconnues rejetées, textes bilingues, decision/mission obligatoires selon statut), `src/projets/idees/P-001.json` (idée réelle citée par Michael, statut `proposee`, aucun chiffre inventé), `src/projets/FORMAT.md` (D8), `src/private/projets/P-001.md` (gabarit D3, hors Git, sections « à évaluer »).

## Étape 4 (pages, routes, nav)
`src/projets/ProjetsParts.jsx` (ProjetsHero, StatusMark, StatusFilter, IdeaRow, PrivateNotes), `src/projets/ProjetsHome.jsx` (liste + filtres), `src/projets/ProjetIdee.jsx` (détail + NotFound), routes dans `src/App.jsx`, section sidebar dans `src/shell/Sidebar.jsx` (après Magazine, symbole ◇), titres d'onglet dans `src/shell/registry.js`, textes `navSectionProjets`/`projetsNav` dans `src/i18n/ui.js`.

Vérifications faites sans navigateur (session sans accès) :
- `npm run build` : OK, aucun avertissement nouveau.
- `npm run lint` : 6 erreurs, toutes préexistantes (aucune dans les fichiers de la mission) — un premier passage avait introduit une 7e erreur (`react-hooks/set-state-in-effect` dans `PrivateNotes`), corrigée en dérivant l'état initial du chargement au lieu d'appeler `setState` en tête d'effet.
- **Critère 4 (notes privées hors build prod)** : chaîne repère ajoutée dans `src/private/projets/P-001.md`, `npm run build`, `grep -r` sur `dist/` → absente, chaîne retirée ensuite. Le mécanisme (`import.meta.env.DEV` + `import.meta.glob` non eager) fonctionne comme prévu par D5.
- **Critère 3 (validation stricte)** : deux fichiers temporaires créés dans `src/projets/idees/` (un avec une clé `prix`, un sans texte `en`), logique de validation d'`idees.js` rejouée dans un script Node autonome (import.meta.glob n'existe pas hors Vite) → les deux sont bien rejetés, `P-001.json` reste valide. Fichiers supprimés ensuite, jamais commités.
- `git status` / `git check-ignore src/private/projets/P-001.md` : confirmé, rien de `src/private/` n'est suivi.
- `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\("` sur `src/projets/*.jsx` : aucun résultat.

**Non vérifié ici (nécessite un navigateur)** : rendu réel de `/projets` et `/projets/P-001` en FR/EN, `/projets/P-999` → « Idée introuvable », fonctionnement des filtres au clic, absence d'erreur console, comportement à 375 px, bloc « Notes privées (local) » visible en dev. À faire en session interactive (celle qui clôturera la mission) avant tout push.

## Étape 2 (direction visuelle)
Direction complète rédigée par l'expert (Opus) dans DECISIONS.md (§ Direction visuelle — étape 2, A à G). Tokens utilisés vérifiés présents dans `src/styles/tokens.css` (`--cyan`, `--violet`, `--primary`, `--error`, `--text2`, `--border-thick`, `--hover-tint`, `--radius-xs`). À suivre telle quelle aux étapes 3-4.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx).
