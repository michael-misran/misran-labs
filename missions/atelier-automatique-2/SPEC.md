# Mission atelier-automatique-2 — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-10-15. Brief de Michael : « Cadre la mission 2 du livre de l'IA maintenant, avec la fiche 0 "Le rédacteur". » Suite de `atelier-automatique-1` (PR #141, fusionnée) : le livre existe sur `/atelier` avec les parties 0 à 3.

## Contexte
« L'Atelier automatique — Manuel d'utilisation et d'entretien » vit dans `src/atelier/` : `AtelierLivre.jsx` (liste ordonnée des pages, folios écrits en dur dans les commentaires et les calculs comme `12 + i`), `atelierTexte.js` (textes FR/EN, `lt()`), `atelier.css`, `schemas.jsx` (SVG). 26 pages aujourd'hui : couverture, garde, sommaire, parties 0 à 3, une page « Notes », 4e de couverture. Le sommaire marque les parties 4 à 8 et le glossaire « en préparation ».

En lisant les fiches, Michael a remarqué qu'aucun des 7 agents ne rédige : celui qui écrit, c'est la session principale (Claude), et le manuel ne le dit pas.

Référence visuelle : `screens/atelier-automatique.html` (sur le disque, hors Git) et les pages déjà en ligne.

## Objectif
Le livre est complet : fiche n° 0 « Le rédacteur » dans la partie 2, parties 4 à 8 et glossaire rédigés en FR et EN, sommaire à jour sans aucune mention « en préparation ».

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fiche n° 0 « Le rédacteur ».** Double page placée juste après l'ouverture de la partie 2 et avant le controleur, sur le modèle de la double page du controleur : page gauche en bleu de plan avec une vue éclatée numérotée d'une **machine à écrire** (A rouleau / B clavier / C levier de retour / D feuille), cartouche « Fig. n — Le rédacteur » ; page droite papier avec la fiche : rôle (la session principale : elle écrit le code et les textes, puis appelle les agents), qui l'occupe (avec Michael en session interactive : Opus ; dans les routines et missions : Sonnet), appelle (veilleur, relecteur, secrétaire, controleur, vérificateur, explorateur, expert selon le travail), ne fait jamais (fusionner, pousser `main` hors des exceptions écrites), un encadré ATTENTION (« Seule la session principale commite ; les agents jamais ») et un écran VT323 (exemple : la routine de l'Oracle qui rédige puis appelle veilleur, relecteur, secrétaire). Mettre à jour l'ouverture de la partie 2 (« huit postes », « le rédacteur et sept agents ») et la garde. La couverture ne change pas.

**D2 — Contenu des parties 4 à 8 et de l'annexe.** Ton et composants identiques aux parties 0 à 3 (fiches, encadrés ATTENTION, écrans VT323, figures en bleu de plan avec cartouche). Chaque partie a une ouverture (comme la partie 3) puis :
- **Partie 4 — Les missions autonomes** (≈ 5 pages) : figure du cycle d'une mission (cadrage → branche `auto/<nom>` → SPEC/PLAN → exécution étape par étape → RAPPORT → clôture → pull request → fusion par Michael), les 6 fichiers d'une mission (fiche), la file d'attente et la reprise, le modèle par étape, le cas de la première mission (13 min, 7 commits).
- **Partie 5 — Les accessoires** (≈ 4 pages) : les mods (garde-git, garde-controleur, retour de routine, kiosque), le skill `/mission`, les connexions utiles (navigateur intégré, Figma, Lightpanda en secours). Une fiche par famille.
- **Partie 6 — Réglages et consommation** (≈ 3 pages) : la limite glissante de l'abonnement, les vrais leviers sur le quota, économiser les tokens (tâche qui se désactive quand la file est vide, agents Haiku), tableau « quel modèle pour quel travail » (Opus / Sonnet / Haiku).
- **Partie 7 — Pannes et dépannage** (≈ 4 pages) : présentation façon tableau de dépannage de notice : colonnes **Symptôme / Cause / Remède**. Au minimum : abandon de l'IA locale (Lily), session arrêtée par la limite de quota, sous-agent sans verdict, sous-agent lancé en arrière-plan qui coupe la routine, commande shell composée qui bloque une routine, deuxième avis Gemini, navigateur qui renvoie 403 (Lightpanda). Uniquement des pannes décrites dans les sources.
- **Partie 8 — Carnet d'entretien** (≈ 3 à 4 pages) : journal de bord daté façon registre (colonnes Date / Intervention / Opérateur), condensé de la chronologie de `UtilisationIA.jsx` (une ligne par entrée marquante, pas de recopie intégrale).
- **Annexe — Glossaire** (≈ 2 pages) : 15 à 25 termes (branche, commit, pull request, fusion, `main`, worktree, token, modèle, session, routine, mission, sous-agent, skill, mod, MCP, quota, preview…), définitions d'une ligne pour quelqu'un qui n'est pas développeur.

**D3 — Pagination.** Renuméroter tout le livre après l'insertion. Règles : chaque double page « figure + fiche » (rédacteur, controleur) commence sur un folio pair ; les ouvertures de partie en bleu de plan sont à gauche (folio pair) ; nombre total de pages pair, la 4e de couverture seule en dernier ; la page « Notes » peut être gardée, déplacée ou supprimée pour respecter la parité. Le sommaire affiche les vrais folios de chaque partie et de l'annexe. Remplacer les folios en dur par un calcul ou les mettre à jour partout (commentaires compris) ; aucune page ne doit porter un folio faux.

**D4 — Sources, rien d'inventé.** Faits pris uniquement dans : `src/lab/projects/UtilisationIA.jsx`, `src/lab/projects/SalleDesMachines.jsx`, `missions/README.md`, `CLAUDE.md`, `~/Documents/Projets/CLAUDE.md`, `.claude/agents/*.md`, `~/.claude/agents/*.md`, `~/.claude/skills/mission/SKILL.md`. Pas de chiffre, date, horaire ou modèle absent de ces fichiers. Si une source manque pour un point prévu en D2, l'omettre et le noter dans DECISIONS.md.

**D5 — Dépôt public.** Aucun chemin absolu (`/Users/…`), aucune adresse e-mail, aucun token ni extrait de token (pas même la sous-chaîne `ghp_`), aucun nom de dépôt privé, rien sur les candidatures ni sur les notes privées (`src/private/`). Les projets privés (retouche photo, traitement de texte) ne sont pas cités.

**D6 — Bilingue.** Tout en FR et EN via `lt()`, anglais soigné.

**D7 — Ne pas toucher** à `src/portfolio/`, `src/bibliotheque/`, `src/numero/volumes.js`, ni aux dossiers du Lab. Pas de nouvelle police, pas de dépendance.

## Critères d'acceptation
1. `/atelier` : on tourne toutes les pages jusqu'à la 4e de couverture ; console sans erreur ni avertissement React.
2. La fiche n° 0 « Le rédacteur » est une double page (figure à gauche sur folio pair, fiche à droite) juste avant le controleur, qui reste lui aussi sur une double page.
3. Parties 4 à 8 et glossaire présents, en FR et EN ; `grep -n "enPreparation\|en préparation\|in preparation" src/atelier/` ne trouve plus d'usage affiché.
4. Les folios du sommaire correspondent aux folios réellement imprimés en bas des pages (vérifié pour chaque partie).
5. À 375 px : aucun défilement horizontal, aucune page dont le contenu déborde (`.at-corps` : `scrollHeight <= clientHeight`).
6. `grep -rn "/Users/\|@gmail\|ghp_" src/atelier/ missions/atelier-automatique-2/` : aucun résultat.
7. Relecture de la forme par l'agent `secretaire` (FR/EN), corrections appliquées.
8. `npm run build` passe ; `npm run lint` : 0 erreur.
9. Tout est commité sur `auto/atelier-automatique-2`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Redirection ou retrait des dossiers IA du Lab (`UtilisationIA`, `SalleDesMachines`) : décision de Michael.
- Place du livre sur le présentoir de la librairie.
- Vérification détaillée de l'impression A5.
