# Journal des modifications

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), classé par date, sans numéro de version : le site est déployé en continu sur Vercel. Une entrée par pull request fusionnée.

## Non publié

### Mission « site-avant-apres »
- Corail plus foncé sous le texte : nouvelle paire `--primary-surface` / `--on-primary-surface` (corail 700, 4,80:1) ; `--on-primary` supprimé ; `--selected-surface` et `--on-selected` suivent. Le corail vif reste l'accent partout ailleurs.
- Valeurs en dur remplacées par des tokens semantic de même rôle (`--space-*`, `--border-thick`, `--radius-xs`) dans 20 fichiers.
- Anneau de focus du navigateur restauré sur les champs `TextField` et `Textarea`.
- Lint à zéro erreur (déplacement de `CASE_CHROME` et du contexte de langue, menu mobile sans effet en cascade).
- Gouvernance : `CHANGELOG.md`, `.github/CODEOWNERS`, vérification automatique GitHub (`.github/workflows/verifier.yml`), `LICENSE`.
- Mesure avant / après avec l'outil d'audit du site (voir `missions/site-avant-apres/AVANT-APRES.md`).

## 2026-09-28

- **#16 — Audit, grille** : grille d'évaluation par axes, matrice impact × effort, rapport imprimable et export PDF (P-004, mission 3/3).
- **#15 — Audit, source GitHub** : lecture d'un dépôt public et mesure de la couverture du code par les tokens (P-004, mission 2/3).
- **#14 — Audit des tokens** : outil d'audit du design system (formats CSS, DTCG et Tokens Studio), page `/lab/audit-tokens` (P-004, mission 1/3).
- **#13 — Projets** : page « Comment ça marche » dans la section Projets.
- **#12 — Utilisation de l'IA** : second avis Gemini et économies de tokens sur la page (mission 8).
- **#11 — Missions** : réduction de la consommation de tokens du système de missions.

## 2026-09-27

- **#10 — Projets** : idées de la semaine (2026-09-27).
- **#9 — Projets** : section Projets (idées numérotées, fiches, routine du dimanche).
- **#8 — Utilisation de l'IA** : mise à jour de la page.
- **#7 — Accueil et Magazine** : mission `home-magazine`.
- **#6 — Workflow** : mission `workflow-grille`.
- **#5 — Magazine** : numéro 1, « Prix en baisse, agents en expansion ».
- **#4 — Magazine** : ajout de la section Magazine (veille IA hebdomadaire, numéro 0).
- **#3 — Utilisation de l'IA** : schémas de flux en serpent sur 3 colonnes (bureau).
- **#2 — Utilisation de l'IA** : dossier 008 « Comment j'utilise l'IA » dans le Lab.

## 2026-09-26

- **#1 — Design tokens** : correction des 34 tokens semantic qui portaient des valeurs brutes.
