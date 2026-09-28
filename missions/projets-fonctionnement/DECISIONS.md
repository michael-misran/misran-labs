# Mission projets-fonctionnement — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 2 | Branche `auto/projets-fonctionnement` traitée comme mission malgré le préfixe `projets-` | La règle d'ignorer `auto/projets-*` vise les branches de routine `auto/projets-<date>` ; celle-ci porte un dossier de mission complet sans RAPPORT.md, sinon elle ne serait jamais exécutée |
| 2026-09-28 | 2 | Texte du lien d'accès dans `PROJ_TEXT.home.howLink` (`projetsText.js`) | `ProjetsHome` lit déjà `PROJ_TEXT` ; évite un second import |
