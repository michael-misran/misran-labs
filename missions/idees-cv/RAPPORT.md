# Mission idees-cv — RAPPORT

**Branche** : `auto/idees-cv`, partie de `refonte-kiosque` (07a40cd). Rien commité sur `main` ni `refonte-kiosque`. Rien poussé.
**La pull request de clôture doit viser `refonte-kiosque`**, pas `main` (règle commune aux missions de la refonte kiosque).

## Fait
- `src/projets/ProjetsParts.jsx` : `NoteMasthead` (remplace localement `MagazineMasthead`, emprunté au Magazine), `StampStatut` (tampon de statut coloré et incliné par statut), `FicheBristol` (remplace `IdeaRow` : fiche à lignes bleues, trou de perforation en CSS, décision annotée en `--font-chapo` italique si elle existe), `StatusFilter` restylé en onglet de classeur kraft, `StatusMark`/`ProjetsHero` passés en Special Elite.
- `src/projets/projetsText.js` : ajout de `noteDeService`/`clearancePublic` (fr/en) ; valeur de `home.subtitle` changée en « NOTES DE RECHERCHE — LES IDÉES DU LAB ».
- `src/projets/ProjetsHome.jsx` : grille de `FicheBristol`.
- `src/projets/ProjetIdee.jsx` : `NoteMasthead`, en-tête « NOTE P-NNN · CLASSEMENT : public », étiquettes en Special Elite.
- `src/projets/ProjetsFonctionnement.jsx` : `NoteMasthead`, étiquette « NOTE DE SERVICE ».
- `src/modules/CVModule.jsx` : bandeau « FICHE AGENT · M. MISRAN », `CadrePhoto` (« PHOTO NON COMMUNIQUÉE »), champs tapés RÔLE/SPÉCIALITÉS, sections en Special Elite, kicker « RAPPORTS DE MISSION ».
- Aucune donnée ni contenu existant modifié : seul l'habillage change, comme demandé.

## Pas fait
- Rien du périmètre de la SPEC n'a été laissé de côté.
- Hors périmètre (prévu ainsi) : `CaseFile.jsx` (mission `lab-dossiers`, en parallèle), une vraie photo de Michael, la routine des idées et son format JSON.

## Critères d'acceptation
1. Diff limité aux fichiers de D1 et `missions/idees-cv/` : vérifié par `git diff --stat refonte-kiosque...auto/idees-cv` (hors dossier de suivi). ✅
2. `/projets` : une fiche par idée de `getIdeas()`, chacune avec lien et tampon de statut ; filtres fonctionnels (testé : désactiver un statut puis « Tout afficher »). ✅
3. `/projets/<id>` et `/projets/fonctionnement` : sans erreur console, contenu présent et complet (testé sur 2 idées dont une arrêtée). ✅
4. `/lab/cv` : « FICHE AGENT » et tout le contenu du CV présents. Aperçu d'impression demandé au `verificateur` mais non détaillé dans son rapport (voir Recommandations). ⚠️
5. En anglais, aucun texte ajouté par la mission resté en français. Vérifié sur `/projets` et `/lab/cv`. ✅
6. À 375 px : aucun débordement horizontal sur `/projets`, `/projets/<id>`, `/lab/cv`. Vérifié. ✅
7. `document.title` inchangé sur ces pages (logique non touchée). Valeurs notées par le `verificateur`. ✅
8. `npm run build` : OK. `npm run lint` : OK, 0 erreur (vérifié après chaque étape). ✅
9. Tout commité sur `auto/idees-cv`, rien sur `main` ni `refonte-kiosque`, rien poussé. ✅

## Comment vérifier
1. `git log --oneline refonte-kiosque..auto/idees-cv` pour voir les 6 commits de la mission.
2. `npm run build` puis `npx vite preview` (en routine, pas `preview_start`), visiter `/projets` et `/lab/cv` en FR et EN, à largeur normale puis 375 px.
3. Sur `/projets`, tester les filtres de statut.
4. Sur `/lab/cv`, émuler l'impression (Ctrl/Cmd+P ou outil d'aperçu) et vérifier que tout reste lisible — point à repasser en revue, voir ci-dessous.

## Décisions prises sans Michael
Détail dans `DECISIONS.md`. En résumé :
- `MagazineMasthead` remplacé par un `NoteMasthead` local (D1 l'autorise explicitement).
- Teinte kraft des onglets redéclarée localement dans `ProjetsParts.jsx` (pas d'import de `src/lab/*`, interdit).
- Inclinaison du tampon de statut fixe par statut, pas aléatoire (stabilité visuelle).
- « NOTE DE SERVICE » ajouté via `projetsText.js`, pas `fonctionnementText.js` (interdit en écriture).
- Pas de champ « années d'expérience » sur la fiche agent du CV : aucune donnée de ce type n'existe sans la recalculer, ce qui changerait le contenu (interdit par D5).

## Délégations (modèles réellement utilisés)
- Cadrage (étape 0) : Opus 5.5.
- Étapes 1 à 4 et 6 : session principale, Sonnet 5.5.
- Étape 5 (vérification navigateur) : sous-agent `verificateur`, Haiku — lancé avec succès au premier essai.

## Recommandations
- Avant fusion, vérifier soi-même l'aperçu d'impression de `/lab/cv` (Ctrl/Cmd+P) : le `verificateur` n'a pas confirmé en détail ce point précis de sa vérification, même si rien dans les changements (styles en ligne, pas de couleur comme seul vecteur d'information) ne devrait poser problème — les élévations sont déjà aplaties à l'impression par `tokens.css`.
- La mission **kiosque-finitions** pourra revoir si le bandeau « FICHE AGENT » et le cadre photo méritent d'être repris une fois `CaseFile.jsx` fusionné (habillage kraft de `lab-dossiers`), pour une cohérence visuelle parfaite entre les deux.

## Retouches à la clôture (session interactive, 2026-10-04)
- Vérifié avec `lab-dossiers` déjà fusionnée (essai local combiné, non poussé) : `/projets`, une idée, `/projets/fonctionnement` et `/lab/cv`, sur ordinateur et à 375 px, sans débordement.
- Fiche bristol : les lignes bleues (tous les 27 px) tombaient en travers du numéro et des titres. L’en-tête est maintenant uni, fermé par un filet rouge, et seul le résumé est ligné, au pas du texte (22 px).
- Pas vérifié : l’aperçu d’impression de `/lab/cv`.
