# Mission projets-fonctionnement — RAPPORT

Exécutée le 2026-09-28 par la tâche programmée `misran-labs-missions` (Sonnet 5), sur la branche `auto/projets-fonctionnement`.

## Fait
- Page « Comment ça marche » / « How it works » sur `/projets/fonctionnement`, FR et EN, sections §0 à §8 de `CONTENU.md`.
- Route déclarée avant `projets/:id` dans `src/App.jsx`.
- Lien « Comment ça marche → » sous le paragraphe d'intro de `/projets` (`ProjetsHome.jsx`, texte dans `projetsText.js`).
- Six schémas : 4 arborescences (bloc `Pre` local), circuit en 5 étapes (`FlowDiagram`, grille sur desktop, vertical sur mobile), deux cas « on développe P-NNN » (deux blocs, empilés sur mobile).
- Fichiers créés : `src/projets/ProjetsFonctionnement.jsx`, `src/projets/fonctionnementText.js`.

## Pas fait
- Rien de la SPEC. Hors périmètre respecté : fiches d'idées, `FORMAT.md`, `PROPOSITIONS.md`, page « Utilisation de l'IA », sidebar non touchés.

## Critères d'acceptation
1. Lien sur `/projets` → `/projets/fonctionnement`, FR et EN : **OK** (vérifié dans le navigateur).
2. `/projets/P-003` s'affiche normalement : **OK**.
3. §0 à §8 couverts, 6 schémas présents (4 `pre`, 1 SVG de circuit, 2 blocs de cas) : **OK**.
4. Aucune erreur console sur `/projets`, `/projets/fonctionnement` (FR, EN), `/projets/P-003` : **OK**.
5. 375 px : `scrollWidth` = `innerWidth` = 375, FR et EN : **OK**.
6. Greps couleurs brutes et secrets/chemins sur les deux fichiers : **vides**, OK.
7. `npm run build` : OK ; `npm run lint` : 6 erreurs préexistantes, aucune dans les fichiers de la mission (`eslint src/projets` : 0) : **OK**.
8. Tout commité sur `auto/projets-fonctionnement`, rien sur `main`, rien de poussé : **OK**.

## Comment vérifier
```
git checkout auto/projets-fonctionnement
npm run dev
```
Puis ouvrir `/projets` (lien sous l'intro) et `/projets/fonctionnement`, basculer FR/EN, réduire la fenêtre à 375 px.

## Décisions
Voir `DECISIONS.md`. À retenir : la branche `auto/projets-fonctionnement` a été traitée comme mission malgré le préfixe `projets-` ; textes en blocs typés ; circuit vertical sur mobile ; statut `en-cours` et nom de fichier `RAPPORT` gardés tels quels dans la traduction EN.

## Délégations (modèles réellement utilisés)
- Étapes 2 et 3 : session principale, Sonnet 5.
- Étape 4 : sous-agent `general-purpose`, Haiku (traduction EN), relu et corrigé par Sonnet 5.
- Étape 5 : agent `verificateur`, Haiku (navigateur, sur `vite preview`), tous contrôles OK. Le build, le lint et les greps ont été lancés par la session principale.

## Recommandations
- Point d'attention pour la clôture : la règle « ignorer `auto/projets-*` » (README des missions, tâche programmée) est ambiguë pour une mission dont le nom commence par `projets-`. Renommer la règle en `auto/projets-20*` ou nommer les futures missions autrement éviterait de la contourner.
- Ajouter éventuellement un lien vers cette page depuis la fiche P-003 (hors périmètre ici).
