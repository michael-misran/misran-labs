# Mission site-avant-apres — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial **avant toute modification** : build, lint, 3 scripts ; `mesurer-audit.mjs` écrit puis lancé → `mesure-avant.json` ; snapshot des tokens → `snapshot-avant.json` (navigateur) → session principale (Sonnet)
- [x] 2. Inventaire D3 (`--on-primary`, fonds `--primary` sous du texte, `--selected-surface`, `--on-selected`) et D5 (valeurs de `dejaTokenisees` : fichier, ligne, rôle, token semantic cible ou « aucun ») → `INVENTAIRE.md` → explorateur (Haiku)
- [x] 3. Contraste : tokens (D2), composants (D3), documentation `LabTokens.jsx` (D4) → session principale (Sonnet)
- [x] 4. Valeurs en dur → tokens semantic selon `INVENTAIRE.md` (D5), sans toucher aux exemples → sous-agent (Haiku), diff relu par la session principale
- [x] 5. Lint à 0 erreur (D7) → session principale (Sonnet)
- [x] 6. Gouvernance : `CHANGELOG.md`, `.github/CODEOWNERS`, `.github/workflows/verifier.yml`, `LICENSE` (D8) → sous-agent (Haiku), relu par la session principale
- [x] 7. Vérification : build, lint, scripts, greps, `mesure-apres.json` par la session principale ; navigateur (snapshot après, échantillon D6, page Tokens 0 erreur FR/EN, console, menu, langue, 375 px) → verificateur (Haiku), au premier plan
- [x] 8. Corrections éventuelles, `AVANT-APRES.md` (D9), RAPPORT.md → session principale (Sonnet)
