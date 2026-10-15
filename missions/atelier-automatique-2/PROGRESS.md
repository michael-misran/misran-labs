# Mission atelier-automatique-2 — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 11 (vérification finale)
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

## Étape 5 — Partie 5, Les accessoires (2026-10-15)
Ouverture + 4 pages papier : les mods (garde-git, retour-routine, kiosque,
garde-controleur, répartis sur 2 pages), le skill /mission (table des
modes), les connexions utiles (navigateur intégré, Figma, Lightpanda en
secours). Livre à 40 pages ; vérifié avec `npx vite preview` à 375 px :
aucun débordement, aucune erreur console, contenu des pages mods conforme.
`npm run build` et `npm run lint` : OK.

## Étape 6 — Partie 6, Réglages et consommation (2026-10-15)
Ouverture (limite glissante de 5 h, pas de surcoût sans usage payant) + 3
pages papier : les vrais leviers sur le quota, économiser les tokens
(tableau avant/après des 3 principaux postes + Lightpanda en note), quel
modèle pour quel travail (tableau Opus/Sonnet/Haiku). Livre à 44 pages ;
vérifié avec `npx vite preview` à 375 px : aucun débordement, aucune erreur
console. `npm run build` et `npm run lint` : OK.

## Étape 7 — Partie 7, Pannes et dépannage (2026-10-15)
Ouverture + 3 pages tableau Symptôme/Cause/Remède (7 pannes réparties sur
les 3 pages) : abandon de l'IA locale, session arrêtée par la limite de
quota, sous-agent sans verdict, sous-agent en arrière-plan qui coupe la
routine, commande shell composée, premier essai Gemini raté, navigateur
403 (Lightpanda). Livre à 48 pages ; vérifié avec `npx vite preview` à
375 px : aucun débordement malgré les textes denses, aucune erreur
console. `npm run build` et `npm run lint` : OK.

## Étape 8 — Partie 8, Carnet d'entretien (2026-10-15)
Ouverture + 3 pages registre (8 entrées chacune, colonnes Entrée/
Intervention/Opérateur), condensé des 24 entrées de la chronologie
d'UtilisationIA.jsx. Colonne « Entrée » (numéro) au lieu de « Date » et
« Opérateur » limité aux modèles sourcés par entrée (voir DECISIONS.md).
Livre à 52 pages ; vérifié avec `npx vite preview` à 375 px : aucun
débordement, contenu des 3 pages conforme, aucune erreur console.
`npm run build` et `npm run lint` : OK.

## Étape 9 — Annexe glossaire, sommaire, parité D3 (2026-10-15)
Annexe glossaire : 2 pages papier, 19 termes (branche, commit, pull
request, fusion, main, worktree, token, modèle, session, routine,
mission, sous-agent, agent, skill, mod, MCP, quota, prévisualisation,
verdict). Sommaire nettoyé : ternaire « en préparation » et clé LT
supprimées (toutes les parties ont maintenant un vrai folio) ; critère 3
vérifié par grep, aucun résultat. Livre à 54 pages (pair), 4ᵉ de
couverture seule en dernier ; toutes les ouvertures de partie en bleu de
plan sur un folio pair (D3). Un débordement détecté sur la page 1 du
glossaire (texte trop dense) et un autre sur la page des leviers du
quota (partie 6, version FR plus longue) : contenu raccourci dans les
deux cas, revérifié FR et EN à 375 px, aucun débordement restant.
Critère 6 (secrets) : seules les mentions attendues dans SPEC.md elle-même
(qui documente la commande de contrôle). `npm run build` et
`npm run lint` : OK.

## Étape 10 — Relecture secretaire (2026-10-15)
Agent secretaire (Sonnet) lancé sur les textes ajoutés par cette mission
(p2Redacteur*, p4 à p8, glossaire). 4 corrections de cohérence
terminologique appliquées (« 2 h » au lieu de « deux/2 heures »,
« relecteur » non traduit en anglais, « Sunday ideas » au lieu d'une
variante incohérente) ; aucune faute d'orthographe ou de typographie
relevée. Voir DELEGATIONS.md. `npm run build` et `npm run lint` : OK
après corrections.
