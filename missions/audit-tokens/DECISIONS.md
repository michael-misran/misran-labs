# Mission audit-tokens — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | La mission construit l'outil seul, pas le service | Le service demande de la prospection par Michael, impossible en mission autonome |
| 2026-09-28 | 0 | Appel à l'action vers LinkedIn, sans prix | Pas de route `/contact` ; lien LinkedIn déjà public ; économie réservée à la note privée |
| 2026-09-28 | 0 | Recadrage : JSON (DTCG + Tokens Studio) obligatoire, GitHub et grille complète en missions 2 et 3 | Demande de Michael ; choix validés : dépôts publics, dans le Lab, sans IA |
| 2026-09-28 | 2 | R1 ne porte que sur les références des tokens, pas sur les `var()` des déclarations ordinaires (celles-ci comptent seulement comme « usage » pour R6) | Coller un CSS de composants sans ses tokens inonderait le rapport de faux positifs ; D6 parle de références de tokens |
| 2026-09-28 | 2 | Contexte CSS = chaîne complète des sélecteurs englobants (`@media print :root`) | Une redéfinition dans `@media print` n'est pas un doublon du `:root` principal pour R4 |
| 2026-09-28 | 2 | R4 exige au moins deux noms distincts ; la normalisation retire aussi les espaces autour de `, ( ) /` | `rgba(0, 0, 0, .5)` et `rgba(0,0,0,.5)` sont la même valeur ; une surcharge de même nom n'est pas un doublon |
| 2026-09-28 | 2 | R7 ne signale que le sommet d'une chaîne trop longue ; R2 un seul constat par cycle | Éviter un constat par maillon |
| 2026-09-28 | 2 | Le modèle de token gagne `format` (css/dtcg/tokens-studio) et `repli` (CSS : références avec valeur de secours) ; `lireFichiers` renvoie aussi `declarations` et `fichiers` | Nécessaires au résumé par format, à R1 (gravité) et à R3 ; D2/D4 restent respectés |
| 2026-09-28 | 3 | Références Tokens Studio résolues par nom sur l'ensemble des fichiers (index global), sans priorité à l'ensemble courant | Le graphe d'alias est par nom ; la priorité au même ensemble ne changerait aucun constat de R1 à R8 |
| 2026-09-28 | 3 | Un token Tokens Studio posé à la racine (sans ensemble) est accepté avec `contexte: null` ; un JSON reconnu mais sans aucun token lu donne l'avertissement « aucun token reconnu » | Tolérance sans étendre le périmètre (Style Dictionary legacy reste hors périmètre) |
| 2026-09-28 | 3 | Valeurs JSON scalaires (nombre, booléen) converties en chaîne ; composites gardés tels quels | R4 compare des chaînes ; D3 exige les composites intacts |
| 2026-09-28 | 4 | Les exemples et « Auditer les tokens de ce site » remplacent les fichiers chargés et lancent l'analyse tout de suite ; « Analyser » analyse la liste de fichiers + le texte collé (nom `texte-colle.txt`) | Un clic = un rapport ; le texte collé n'entre pas dans la liste, son format apparaît dans le résultat |
| 2026-09-28 | 4 | Numéro de dossier calculé par `dossierNo(slug)` (009) au lieu d'être codé en dur | Une seule source de vérité, comme le prévoit `projects.js` |
| 2026-09-28 | 4 | Constats affichés par paquets de 25 par règle (bouton « Afficher les N autres ») ; glisser-déposer possible sur la zone d'entrée ; fichier lu sur ses 400 000 premiers octets au plus | Éviter un DOM énorme sur R6 ; la SPEC dit « colle ou dépose » ; la limite du moteur (300 000 caractères) tronque le reste avec avertissement |
| 2026-09-28 | 4 | Info = `--text2`, avertissement = `--warning` en bordure et pastille seulement (texte en `--text`) | Du texte crème sur fond ambre manquerait de contraste |
