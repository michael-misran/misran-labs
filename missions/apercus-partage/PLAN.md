# Mission apercus-partage — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build (liste des fichiers de `dist/`), lint, notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. Plugin `scripts/share-previews.js` (D1, D3, D4, D5) : lecture des données, échappement, troncature, remplacement des balises avec échec si balise introuvable, écriture des copies ; branchement dans `vite.config.js` ; `canonical` dans `index.html` → session principale (Sonnet)
- [x] 3. Textes fixes de D2 (`/magazine`, `/projets`, `/projets/fonctionnement`) rédigés dans le plugin ; build ; greps du critère 2 et `find` du critère 7 copiés dans PROGRESS.md → session principale (Sonnet)
- [x] 4. Tests de robustesse du critère 3 (JSON invalide temporaire, échappement), fichiers temporaires supprimés avant commit → session principale (Sonnet)
- [ ] 5. Trois images de rubrique (D6) : sources HTML dans le dossier de mission, rendu PNG via Chrome headless, dimensions vérifiées avec `sips`, contrôle visuel → session principale (Sonnet)
- [ ] 6. Documentation D7 : une ligne dans `src/magazine/FORMAT.md` et `src/projets/FORMAT.md` → sous-agent (Haiku)
- [ ] 7. Vérification finale : build, lint, `curl` du critère 4 sur `npx vite preview` par la session principale ; rendu des 7 pages du critère 4 en FR/EN, arrivée directe + navigation par la barre latérale, console → verificateur (Haiku)
- [ ] 8. RAPPORT.md (pages générées, exemples d'aperçus, marche à suivre pour Michael sur l'aperçu Vercel avec LinkedIn Post Inspector, recommandations hors périmètre) → session principale (Sonnet)
