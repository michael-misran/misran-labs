# Mission atelier-automatique-2 — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5 (partie 5 — Les accessoires)
**Blocages :** aucun

## État initial (2026-10-15, depuis main 6a4fb06)
- `npm run build` : OK
- `npm run lint` : OK, 0 erreur, 0 avertissement
- Livre : 26 pages, parties 0 à 3 ; parties 4 à 8 et glossaire « en préparation »

## Étape 2 — Pagination calculée (2026-10-15)
`pagesDuLivre` construit maintenant une liste d'entrées `[cle, rendu]` ; le
folio de chaque page est sa position (`i + 1`) et n'est plus écrit en dur.
Les parties du sommaire portent une `cle` (`p0`…`p8`, `glossaire`) au lieu
d'un folio fixe ; une table `folios` calculée une fois par rendu du livre
fait le lien. Vérifié avec `npx vite preview` : 26 pages, folios 2 à 25
identiques à avant, sommaire identique (4/6/8/18 + « en préparation »),
aucune erreur console, aucun débordement à 375 px. `npm run build` et
`npm run lint` : OK.

## Étape 3 — Fiche n° 0 « Le rédacteur » (2026-10-15)
Double page insérée juste après l'ouverture de la partie 2, avant le
controleur : figure `SchemaRedacteur` (machine à écrire éclatée, A rouleau /
B clavier / C levier de retour / D feuille, Fig. 6) à gauche, fiche à droite
(rôle, qui l'occupe, appelé, ne fait jamais, encadré ATTENTION, écran VT323
avec l'exemple de la routine Oracle). Ouverture de la partie 2 mise à jour
(« huit postes », « le rédacteur et sept agents »). Livre à 28 pages ;
vérifié avec `npx vite preview` à 375 px : folios 2 à 27 continus, sommaire
recalculé (partie « Les automates » passée de 18 à 20), aucune erreur
console, aucun débordement. `npm run build` et `npm run lint` : OK.

## Étape 4 — Partie 4, Les missions autonomes (2026-10-15)
Ouverture + figure du cycle (`SchemaCycleMission`, Fig. 9, cadrage → branche
→ exécution → RAPPORT → clôture → fusion → mission suivante) + 5 pages
papier (texte, les six fichiers d'une mission, file d'attente et reprise,
modèle par étape, cas d'école de la première mission : 13 min, 7 commits).
Insérée avant la page « Notes » (jamais après — voir DECISIONS.md). Livre à
35 pages ; vérifié avec `npx vite preview` à 375 px : folios continus,
sommaire à jour (partie 4 → folio 27), aucune erreur console, aucun
débordement. `npm run build` et `npm run lint` : OK.
