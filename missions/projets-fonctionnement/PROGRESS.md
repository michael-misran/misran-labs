# Mission projets-fonctionnement — PROGRESS

**Statut :** en cours (étape 2 terminée)
**Prochaine action :** étape 3 (rédaction FR : sections, arborescences `Pre`, circuit en 5 étapes, deux cas « on développe »)
**Blocages :** aucun

## État initial (2026-09-28, depuis main cb943a6)
- `npm run build` : OK (avertissement de taille de chunk, préexistant)
- `npm run lint` : 6 erreurs, préexistantes, hors périmètre

## Étape 2 (2026-09-28)
- Route `projets/fonctionnement` ajoutée avant `projets/:id` dans `App.jsx`.
- Squelette `ProjetsFonctionnement.jsx` (masthead, hero, lien retour, footer) + `fonctionnementText.js` (`sections: []` vide, à remplir à l'étape 3).
- Lien « Comment ça marche → » ajouté sous le paragraphe `concept` de `ProjetsHome.jsx` (texte `howLink` dans `projetsText.js`).
- Build OK, lint : mêmes 6 erreurs préexistantes.
