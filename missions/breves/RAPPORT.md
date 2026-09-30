# Mission breves — RAPPORT

Terminée le 2026-09-30, sur la branche `auto/breves`.

## Fait

- `src/breves/FORMAT.md` : format documenté d'un jour de Brèves (D2), public et autonome.
- `src/breves/jours.js` : chargement et validation (`import.meta.glob`, sur le modèle de `src/magazine/numeros.js`), sans champ `numero` (D2/D4). Un fichier invalide est ignoré avec `console.error`, jamais d'écran cassé. `getDays()`, `getDay(date)`, `getAdjacentDays(date)`.
- `src/breves/jours/2026-09-30.json` : premier jour réel (D8), extrait de `src/private/journal/numeros/2026-09-30.json` — la une (OpenAI DevDay), Starship, le Walkman (les deux seuls articles `type: "tech"` des pages 2-3), le mot CMP, le chiffre 844. Résumés réécrits, bilingues fr/en, sources reprises du journal.
- `src/breves/brevesText.js`, `src/breves/BrevesParts.jsx`, `src/breves/BrevesHome.jsx`, `src/breves/BrevesJour.jsx` : pages `/breves` et `/breves/:date` (D5), réutilisant `MagazineHero`/`MagazineMasthead` du Magazine, `CaseMasthead`/`CaseMetaRow`/`CaseFooter` de `CaseFile.jsx`, `SectionTitle`/`Tag` du design-system. `/breves` affiche le dernier jour en entier puis la liste des jours précédents ; `/breves/:date` affiche un jour avec navigation précédent/suivant, ou le message vide si la date est inconnue.
- Routes `/breves` et `/breves/:date` ajoutées en `lazy` dans `App.jsx` (D6 pour le routage).
- Entrée « Brèves » dans `Sidebar.jsx`, juste sous « Magazine » dans la même section, libellés `brevesNav` dans `src/i18n/ui.js` fr/en (D6).
- `scripts/share-previews.js` : page fixe `/breves` et une entrée par jour `/breves/<date>`, image `og-magazine.png` réutilisée, sitemap mis à jour (D7).
- `src/breves/EXTRACTION.md` : procédure d'extraction complète (D9), publique et autonome, lue par la routine du Journal du matin.

## Pas fait (hors périmètre de la SPEC, à faire en clôture)

- Modifier `src/private/journal/REDACTION.md` (étape « Version web → suivre `src/breves/EXTRACTION.md` », lever l'interdit Git pour cette étape).
- Modifier la tâche programmée `lab-magazine-quotidien` pour appeler l'extraction.
- Ajouter dans `CLAUDE.md` l'exception Git « routine des brèves » et exclure `auto/breves-20*` de la liste des missions (comme pour `auto/magazine-20*` et `auto/projets-20*`).
- Bandeau « Aujourd'hui » sur la page d'accueil ; analytique Umami.

## Critères d'acceptation

1. **PASS** — `/breves` affiche le 2026-09-30 (3 brèves, mot, chiffre) en fr et en, chaque lien source en nouvel onglet (`target="_blank"`, `rel="noopener noreferrer"`) vers l'URL du journal. Vérifié navigateur (verificateur, Haiku).
2. **PASS** — `/breves/2026-09-30` fonctionne ; `/breves/2000-01-01` affiche le message vide sans erreur console. Vérifié navigateur.
3. **PASS** — un fichier invalide (titre sans `en`) n'apparaît pas et produit un `console.error` nommant le fichier et la règle violée ; testé puis retiré, rien ne reste sur le disque. Vérifié navigateur.
4. **PASS** — entrée « Brèves » visible dans la sidebar (desktop, active sur `/breves`) et dans le menu mobile. Vérifié navigateur.
5. **PASS** — à 375 px, `document.documentElement.scrollWidth <= 375` sur `/breves` et `/breves/2026-09-30`. Vérifié navigateur.
6. **PASS** — `npm run build` passe ; `dist/sitemap.xml` contient `/breves` et `/breves/2026-09-30` ; `dist/breves/index.html` contient le titre D7. Vérifié session principale.
7. **PASS** — `grep -rniE "irritant|piste de business|carnet|duolingo|cookie" src/breves/jours/` ne renvoie rien. Vérifié session principale (la définition du mot CMP a été reformulée pour l'éviter, voir DECISIONS.md).
8. **PASS** — `src/breves/FORMAT.md` et `src/breves/EXTRACTION.md` existent et décrivent D1-D3 et D9.
9. **PASS** — `npm run lint` : aucune erreur (état initial déjà à zéro erreur, inchangé).
10. **PASS** — tout commité sur `auto/breves` (9 commits), rien sur `main`, rien poussé ; aucun fichier de `src/private/` modifié.

## Comment vérifier

```bash
git checkout auto/breves
npm run build
npm run lint
npx vite preview
```
Puis ouvrir `http://localhost:4173/breves` et `http://localhost:4173/breves/2026-09-30` dans un navigateur, en fr et en (sélecteur de langue), et à 375 px de large.

## Décisions

Voir `missions/breves/DECISIONS.md` — notamment la reformulation de la définition du mot CMP pour éviter le mot « cookie » (critère 7), et le choix de garder les 3 URL de sources de la une telles quelles.

## Délégations (modèles réellement utilisés)

Voir `missions/breves/DELEGATIONS.md` — cadrage (Opus 5.5, session interactive antérieure), exécution du plan (Sonnet 5, cette session), nav (agent `general-purpose`, Haiku 4.5), vérification navigateur (agent `verificateur`, Haiku 4.5).

## Recommandations

- Faire les 4 points « hors périmètre » ci-dessus lors de la clôture (session avec Michael) : brancher `EXTRACTION.md` sur la routine du Journal, exclure `auto/breves-20*` de la liste des missions dans `CLAUDE.md` comme les autres routines datées.
- Envisager de produire une image de partage propre à `/breves` (`og/breves.png`) plutôt que de réutiliser `og-magazine.png`, une fois le premier mois de brèves publié — actuellement hors périmètre (D7).
- La routine `EXTRACTION.md` crée une branche `auto/breves-<date>` par jour, donc une pull request par jour : si le rythme quotidien s'avère trop de bruit pour Michael, une option à trancher en clôture est de grouper plusieurs jours dans une seule pull request hebdomadaire.
