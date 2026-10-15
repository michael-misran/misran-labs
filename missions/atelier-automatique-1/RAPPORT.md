# Mission atelier-automatique-1 — RAPPORT

## Fait

Le livre **« L'Atelier automatique — Manuel d'utilisation et d'entretien »** (1977 Éditions) est accessible sur `/atelier`, avec les parties 0 à 3 complètes en français et en anglais :

- **Squelette** : `src/atelier/` (`AtelierLivre.jsx`, `atelierTexte.js`, `atelier.css`, `schemas.jsx`), route `/atelier` dans `App.jsx`, token `--titre-atelier` dans `tokens.css`. Mécanique du tourne-pages copiée (pas mutualisée) de `src/portfolio/PortfolioLivre.jsx` : clavier, clic, glissé tactile, empilement sur téléphone, impression A5.
- **Couverture, garde « Avant de lire », sommaire, 4ᵉ de couverture**, fidèles à la maquette `screens/atelier-automatique.html` (bleu de plan, papier crème, plaque signalétique, étiquette « lire avant toute utilisation »).
- **Partie 0 — Consignes de sécurité** (2 pages) : règles Git et dépôt public en encadrés ATTENTION, cas d'école de l'incident du token en clair (source : `src/lab/projects/UtilisationIA.jsx`).
- **Partie 1 — Présentation de l'appareil** (2 pages) : schéma du circuit d'une idée (Michael → session → routines/missions → agents → branche/PR → site) et le texte qui l'explique.
- **Partie 2 — Le personnel** (10 pages) : ouverture en double planche, double page du controleur (fig. 7 reprise de la maquette + fiche), et une page par agent (relecteur, secretaire, veilleur, verificateur, explorateur, expert) avec un pictogramme au trait. Sources : `.claude/agents/*.md`, `~/.claude/agents/*.md`.
- **Partie 3 — Les automates** (7 pages) : ouverture, une page par routine (Oracle du Matin, missions autonomes, idées du dimanche, carnet, retour de routine), tableau des horaires de marche. Source : `src/lab/projects/SalleDesMachines.jsx`.
- Une page **Notes** vierge à lignes ajoutée (D5) pour garder un nombre de pages pair (26) et finir sur la 4ᵉ de couverture seule.
- Relecture de la forme par l'agent `secretaire` : apostrophes harmonisées, un contresens FR/EN corrigé, une abréviation d'horaire adaptée à l'anglais.

## Pas fait (hors périmètre de cette mission, voir Recommandations)

- Parties 4 à 8 (missions autonomes en détail, accessoires, réglages, pannes, carnet d'entretien) et l'annexe glossaire : listées « en préparation » dans le sommaire.
- Retrait ou redirection des dossiers IA du Lab (`UtilisationIA.jsx`, `SalleDesMachines.jsx`) : toujours en place, seulement utilisés comme sources.
- Place du livre sur le présentoir de la bibliothèque.
- Version PDF imprimable dédiée (l'impression navigateur A5 existe via la mécanique copiée du Portfolio, mais n'a pas été vérifiée page par page).

## Critères d'acceptation

1. **`/atelier` : couverture, tourne-pages clavier/flèches jusqu'à la 4ᵉ de couverture, aucune erreur console.** ✅ Vérifié deux fois (session principale avec le navigateur intégré au premier plan, puis l'agent `verificateur`) : navigation complète dans les deux sens, console propre.
2. **Toutes les pages de D5, dans l'ordre, en FR et en EN.** ✅ Vérifié page par page (26 pages) dans les deux langues.
3. **375 px : pages empilées, aucun défilement horizontal, aucun texte qui déborde.** ✅ Vérifié (`scrollWidth === innerWidth` dans le navigateur intégré ; re-testé par le verificateur dans un contexte différent, sans débordement non plus).
4. **1300 px : double page côte à côte ; couverture et double page du controleur fidèles à la maquette (capture).** ✅ Captures prises et comparées à la maquette (couleurs, polices, schémas, plaque signalétique, tampon).
5. **`grep` sur `src/atelier/` : aucune occurrence de `/Users/`, `@gmail`, `ghp_` ni le nom d'utilisateur du Mac.** ✅ Vérifié après chaque étape de contenu ; une décision a été nécessaire (voir Décisions) pour que l'exemple pédagogique du cas d'école ne contienne pas la sous-chaîne `ghp_`, même masquée.
6. **`--titre-atelier` défini dans `tokens.css` et utilisé par `atelier.css`.** ✅ `--primitive-titre-atelier` + `--titre-atelier` dans `tokens.css`, repris par `--at-plan` dans `atelier.css`.
7. **Relecture de la forme par `secretaire`, corrections appliquées.** ✅ 3 points relevés, tous corrigés (voir Délégations).
8. **`npm run build` passe ; `npm run lint` sans nouvelle erreur.** ✅ Build et lint propres, vérifiés après chaque étape de contenu et une dernière fois à la clôture.
9. **Tout commité sur `auto/atelier-automatique-1`, rien sur `main`, rien de poussé.** ✅ Deux commits sur la branche ; aucun push, aucune action sur `main`.

## Comment vérifier

```bash
cd ~/Documents/Projets/misran-labs
git checkout auto/atelier-automatique-1
npm run build && npx vite preview --port 4173
```
Puis ouvrir `http://localhost:4173/atelier` : tourner les pages (flèches ou clic), basculer FR/EN en haut à droite, réduire la fenêtre à 375 px pour voir l'empilement.

## Décisions

Voir `DECISIONS.md` pour le détail. Les plus notables :
- Étapes 2 à 7 faites dans une même passe (la pagination de la double page du controleur dépend de l'ensemble du contenu), avec build/lint vérifiés après chaque bloc plutôt qu'à chaque étape isolée.
- Ouverture de la partie 2 étalée sur sa propre planche (numéro + titre à gauche, texte à droite) pour que la double page du controleur (fig. 7 + fiche) tombe bien sur une seule et même planche, comme dans la maquette.
- Page « Notes » ajoutée pour garder un nombre de pages pair (autorisé par D5).
- Exemple du cas d'école écrit sans la sous-chaîne `ghp_` pour ne pas faire échouer le critère d'acceptation 5.

## Délégations

Voir `DELEGATIONS.md`. Modèles réellement utilisés : Opus 5.5 (cadrage), Sonnet (exécution de toutes les étapes de contenu et application des corrections), Sonnet pour `secretaire`, Haiku pour `verificateur`.

## Recommandations pour la mission 2

- Parties 4 à 8 + glossaire, dans l'ordre du sommaire.
- Décider avec Michael si les dossiers `UtilisationIA.jsx` / `SalleDesMachines.jsx` du Lab doivent rediriger vers `/atelier` une fois le livre complet, ou coexister.
- Revoir la place du livre dans la bibliothèque quand Misran Labs sera démonté (D9 de la SPEC).
- Si une version PDF imprimable est souhaitée un jour, vérifier d'abord le rendu `@media print` page par page (non testé en détail ici).
