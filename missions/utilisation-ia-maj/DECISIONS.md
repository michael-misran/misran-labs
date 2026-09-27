# Mission utilisation-ia-maj — DECISIONS

Décisions prises sans Michael. Les décisions D1–D6 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 0 | « Regarde si c'est à jour » interprété comme audit + mise à jour, audit gardé en livrable séparé | Michael délègue en fondateur ; l'audit seul demanderait une mission de plus. |
| 2026-09-27 | 0 | Pas d'étape expert planifiée | Ajout de contenu dans une structure déjà conçue par Opus ; expert disponible si la structure pose problème. |
| 2026-09-27 | 3 | `gitFlow` (section « La clôture ») corrigé en plus de `finalFlow` | Même défaut que le circuit final : attribue le push des branches de mission à Michael. Trouvé à l'audit, pas listé dans CONTENU-MAJ §A. |
| 2026-09-27 | 3 | `wrapupItems` et l'arborescence de « La mise en place » (TREE_PROJECT) conservés tels quels | Ce sont des récits datés de la mission 2 (26/09), vrais à leur date (D2 de la SPEC). La croissance du projet est couverte par les nouvelles sections. |
| 2026-09-27 | 3 | 6 nouvelles sections (pas une par sous-lettre B-I) | « Titres courts » (D3) ; B+C partagent un thème (fin des interruptions), F+G aussi (pilotage + mot de clôture). |
| 2026-09-27 | 3 | Circuit final réduit de 10 à 9 étapes (3×3 en grille) | Fusion des anciennes étapes « Vérification / Push / Pull request » en une seule étape « Vérification, push, pull requests (Claude) », puisque c'est désormais Claude qui fait les trois à la suite lors de la clôture. |

## Plan détaillé des modifications (étape 3)

### Corrections (§A + le point `gitFlow` trouvé à l'audit)
- `finalFlow` (circuit final) : 9 étapes — brief, cadrage, branche, tâche programmée (file d'attente), étapes+commits, rapport, « clôture les missions » (mot-clé, moi), vérification+push+PR (Claude), fusion (moi).
- `gitFlow` (La clôture) : étape « Push (moi) » → « Push (Claude) », sous-légende actualisée (push de `main` réservé à moi, sur demande).
- `remaining` : « Le push et la fusion » → « La fusion (et le push de `main`, sur ma demande explicite) ».
- `modelChart` + `modelsTableRows` : ajout de veilleur (Haiku) et relecteur (Sonnet) → 5 sous-agents.
- `metaP` : la page a été écrite par la mission 2, elle est désormais entretenue par le système lui-même (mission 7 = cette mise à jour).

### Nouvelles sections (avant « Le circuit final »), dans l'ordre
1. **La 3ᵉ mission, et la fin des interruptions** (§B+C) — mission `circuits-colonnes` (3 schémas, pas 2 ; grille serpentin ; hauteurs ÷2,75 à ÷3,5 ; Haiku+Sonnet, pas d'Opus) ; blocages d'autonomie identifiés pendant la mission 2 et corrections (mode Auto, permissions complétées, une commande simple par appel, arrêt des serveurs, seule la session principale commite) ; résultat (zéro demande d'autorisation en mission 3).
2. **Le Magazine** (§D) — décisions de Michael (hebdo, PR, angle designers/développeurs, bilingue) ; mission 4 (`/magazine`, JSON validé, FORMAT.md, numéro 0, modèles) ; routine du lundi 7 h 30 (veilleur → Sonnet → relecteur → push+PR, seule exception au « jamais de push » des routines) ; le test (3 inexactitudes trouvées et corrigées, création du relecteur).
3. **La file d'attente** (§E) — problème (visibilité par branche), solution (recherche dans les branches, plus ancienne sans rapport, enchaînement), premier usage (missions 5+6 à la suite, ~30 min).
4. **Piloter depuis le téléphone** (§F+G) — Remote Control déjà connu, cloud étudié puis écarté (raisons) ; session interactive = tour de contrôle ; nouveau schéma (téléphone → session tour de contrôle → routine → vérification → pull requests → fusion dans l'app GitHub, `FlowDiagram` grid 3 colonnes comme les autres) ; « clôture les missions » en un mot, ce que ça déclenche, ce qui bloque encore (le point de blocage).
5. **Le push de `main` : un compromis** (§H) — proposition de Michael, rappel de Claude (mise en prod immédiate, permissions valables pour toutes les sessions), compromis (session interactive + demande explicite uniquement, jamais en routine, force-push/fusion toujours interdits), le refus de contourner le verrou.
6. **Bilan chiffré** (§I) — tableau 7 missions (durée, modèles) + note sur la routine Magazine et la tendance (moins d'interventions, Opus réservé au cadrage/direction visuelle).

### Chronologie (Timeline)
Six nouveaux jalons (10 à 15), un par nouvelle section, même ton que les jalons 01-09.

### Schémas
- `ModelOrgChart` agrandi : viewBox 480×480 (au lieu de 348), deuxième rangée de 2 boîtes (veilleur, relecteur) sous la rangée existante, reliée par un tronc vertical depuis le centre de la rangée du haut.
- Nouveau composant local `PhoneFlow` ou réutilisation directe de `FlowDiagram` avec un tableau `phoneFlow` de 6 étapes (section « Piloter depuis le téléphone »), `direction={isMobile ? 'vertical' : 'grid'} columns={3}`.

Traduction EN : même structure, même contenu, ton identique aux sections existantes.
