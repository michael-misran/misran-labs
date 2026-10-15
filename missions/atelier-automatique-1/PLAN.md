# Mission atelier-automatique-1 — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser. Référence visuelle : `screens/atelier-automatique.html` (sur le disque, hors Git).

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [ ] 2. Squelette : `src/atelier/` (AtelierLivre.jsx avec la mécanique copiée du Portfolio, atelierTexte.js, atelier.css), route `/atelier` dans App.jsx, tokens `--titre-atelier` ; pages vides numérotées ; build OK → session principale (Sonnet)
- [ ] 3. Couverture, garde « Avant de lire », sommaire, 4e de couverture, fidèles à la maquette → session principale (Sonnet)
- [ ] 4. Partie 0 — Consignes de sécurité (FR/EN), sources : CLAUDE.md, missions/README.md, UtilisationIA.jsx (incident du token) → session principale (Sonnet)
- [ ] 5. Partie 1 — Présentation de l'appareil : schéma SVG de l'atelier + page d'explication (FR/EN) → session principale (Sonnet)
- [ ] 6. Partie 2 — Le personnel : ouverture + double page controleur (maquette) + 6 fiches agents avec pictogrammes ; sources : `.claude/agents/*.md` et `~/.claude/agents/*.md` → session principale (Sonnet)
- [ ] 7. Partie 3 — Les automates : ouverture + une page par routine + tableau des horaires ; source : SalleDesMachines.jsx → session principale (Sonnet)
- [ ] 8. Relecture de la forme FR/EN de `src/atelier/atelierTexte.js` → secretaire (Sonnet) ; puis appliquer les corrections → session principale (Sonnet)
- [ ] 9. Vérification finale : build, lint, greps du critère 5 par la session principale ; navigateur (critères 1 à 4, captures 375 px et 1300 px, comparaison avec la maquette) → verificateur (Haiku)
- [ ] 10. RAPPORT.md (avec la liste de la mission 2 : parties 4 à 8, glossaire, transfert depuis le Lab, place sur le présentoir) → session principale (Sonnet)
