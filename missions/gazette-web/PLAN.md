# Mission gazette-web — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint (déjà relevés au cadrage, à reconfirmer) → session principale (Sonnet)
- [x] 2. `GazetteParts.jsx` : `GazetteTete` (D3) et les textes fr/en dans `brevesText.js` → session principale (Sonnet)
- [x] 3. `GazetteEdition` : la une, les autres brèves, les sources, le mot et le chiffre, les filets et l'ornement (D4) → session principale (Sonnet)
- [ ] 4. `/breves` : la tête, l'édition du jour, l'encadré d'abonnement et l'index des éditions précédentes (D5). Retirer les imports du Magazine, du Lab et de SuivreBandeau → session principale (Sonnet)
- [ ] 5. `/breves/:date` : la tête, l'édition, la navigation entre éditions et la page « Pas d'édition ce jour-là » (D6). Supprimer ce qui ne sert plus dans `BrevesParts.jsx` → session principale (Sonnet)
- [ ] 6. Vérification finale : build, lint et greps du critère 1 par la session principale ; critères 2 à 9 dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 7. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`, puis lister les missions suivantes) → session principale (Sonnet)
