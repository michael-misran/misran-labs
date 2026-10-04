# Mission gazette-web — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 1 | `formatDateShort`/`formatDateLong` redéclarées dans `brevesText.js` plutôt qu'importées de `magazine/magazineText.js` | Le critère d'acceptation 1 interdit tout import de `src/magazine/` depuis `src/breves/` ; seul `rubriqueLabel` était importé depuis l'extérieur (`KiosqueParts.jsx`), donc aucun risque à retirer le ré-export |
| 2026-10-04 | 5 | `BrevesParts.jsx` supprimé entièrement (pas seulement vidé) | Les 5 exports (`RubriqueMark`, `SourceLinks`, `BreveCard`, `WordFigureBox`, `DayRow`) n'avaient plus aucun importeur après la réécriture de `BrevesHome.jsx`/`BrevesJour.jsx` ; D2 demande explicitement de supprimer le fichier s'il devient vide |
| 2026-10-04 | 5 | Commentaire de `brevesText.js` reformulé pour ne plus contenir les mots « magazine/ » en toutes lettres | Le critère d'acceptation 1 fait un `git grep` littéral sur `src/breves/` ; un commentaire expliquant la décision déclenchait un faux positif |
| 2026-10-04 | clôture | Navigation entre éditions en grille `1fr auto 1fr` au lieu de `flex` + `space-between` | Un côté vide (premier ou dernier jour) faisait 0 px de large et décalait « Toutes les éditions » |
