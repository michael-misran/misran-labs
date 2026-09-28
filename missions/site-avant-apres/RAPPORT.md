# Mission site-avant-apres — RAPPORT

Exécutée le 2026-09-28 sur la branche `auto/site-avant-apres` (cadrage : Opus ; exécution : Sonnet). Rien poussé, rien sur `main`.

## Résultat en une ligne
Moyenne à l'audit du site : **0,8 → 1,5 / 3** (Accessibilité 0 → 1, Gouvernance 0 → 3), sans autre changement visuel que le corail plus foncé sous le texte. Détail : [AVANT-APRES.md](AVANT-APRES.md).

## Fait
- **Mesure** : `mesurer-audit.mjs` (avant / après), `snapshot-avant.json` / `snapshot-apres.json` (tokens calculés).
- **Contraste (D2, D3, D4)** : paire `--primary-surface` (corail 700) / `--on-primary-surface` ; `--on-primary` supprimé ; `--selected-surface` et `--on-selected` alignés ; 11 composants ou pages adaptés (voir `INVENTAIRE.md`) ; documentation `LabTokens.jsx` à jour.
- **Valeurs en dur (D5)** : 20 fichiers, remplacements par `--space-*`, `--border-thick`, `--radius-xs`, à valeur identique.
- **Lint (D7)** : 6 erreurs → 0.
- **Gouvernance (D8)** : `CHANGELOG.md`, `.github/CODEOWNERS`, `.github/workflows/verifier.yml`, `LICENSE`.
- **Avant / après (D9)** : `AVANT-APRES.md`.

## Pas fait / écarts
- **Focus des champs (écart volontaire)** : l'axe Accessibilité ne pouvait monter que par le critère `focus-visible` (les paires de contraste `[data-invert]` restent sous 4,5:1 par choix de Michael). J'ai retiré `outline: 'none'` de `TextField.jsx` et `Textarea.jsx` : l'anneau global `:focus-visible` de `tokens.css` (1 px corail, décalage 2 px) s'ajoute à l'anneau de bordure existant, uniquement au focus de ces deux champs. **À regarder par Michael** ; annulable en remettant `outline: 'none'`.
- **Critère « déjà tokenisées < 10 » non atteint** (31 occurrences, contre 78) : il faudrait des tokens d'espacement à 2, 4, 10, 20 px (hors périmètre).
- **D5 limité aux 60 fichiers que l'audit lit** (les premiers de `src/` par ordre alphabétique) : le reste du code garde ses valeurs en dur ; l'audit ne les voit pas, mais elles existent.
- **Sous-agents** : les lancements ont échoué (« classifieur sans verdict »), donc toutes les étapes, y compris l'inventaire (Haiku prévu), les valeurs en dur (Haiku), la gouvernance (Haiku) et la vérification navigateur (Haiku), ont été faites par la session principale (Sonnet). Aucun sous-agent n'a travaillé.
- Un léger écart hors périmètre : dans un bloc `[data-invert]`, le texte des boutons `danger` et de la pastille d'avertissement de la page Tokens (fond `--error`) passe de corail 500 à corail 700 (déjà illisible avant).

## Critères d'acceptation
1. **OK** — `mesure-avant.json` produit à l'étape 1 avant toute modification (commit `99d564c`), `mesure-apres.json` à la fin, `AVANT-APRES.md` copié des deux.
2. **OK (en partie par une autre voie)** — Accessibilité 0 → 1. Les paires `--on-primary-surface`/`--primary-surface` et `--on-selected`/`--selected-surface` sont à 4,80:1 dans `:root` **et** `[data-invert]`. La hausse de l'axe vient du critère `focus-visible`, pas des contrastes.
3. **Partiel** — Gouvernance 3 / 3 : OK. Moyenne 1,5 > 0,8 : OK. (Cet énoncé regroupait deux points ; les deux sont vrais.)
4. **OK** — `grep -rnE "on-primary([^-]|$)" src` : aucun résultat.
5. **OK** — Snapshot : seules différences = tokens D2 (`--on-primary` supprimé, `--primary-surface`, `--on-primary-surface` ajoutés, `--selected-surface` et `--on-selected` changés). Styles calculés (padding, margin, largeurs de bordure, rayons, gaps, taille de police) comparés élément par élément entre le build de `main` et le build de la branche, sur 6 pages (`/`, `/lab/lab-tokens`, `/lab/audit-tokens`, `/projets`, `/lab/design-system`, `/lab/exp-003`, 150 à 1 300 éléments chacune) : **0 différence**, sauf 12 lignes de `/lab/lab-tokens` décalées par les 2 lignes de tokens ajoutées (désalignement, pas un changement de style). Éléments touchés par D5 présents dans ces pages : au moins 30 (ex. en-tête de fiche `padding: 18px var(--space-lg)`, blocs de méta `var(--space-sm) var(--space-lg)`). Largeurs/hauteurs exclues de la comparaison (elles dépendent du chargement des polices web).
6. **OK** — Page Tokens du Lab : 121 tokens affichés (= les 121 propriétés du CSS), 0 marqueur d'avertissement (⚠), FR et EN ; `--primary-surface` et `--on-primary-surface` présents, `--on-primary` absent.
7. **OK** — `npm run lint` : 0 erreur ; `npm run build` passe ; les 3 scripts affichent « Toutes les vérifications passent ».
8. **OK** — `verifier.yml` lu par `js-yaml` (déjà dans `node_modules`) : clés valides, `permissions: contents: read`, aucun secret, aucun déploiement.
9. **OK** — Aucune erreur console sur l'accueil, `/lab/lab-tokens`, `/lab/audit-tokens`, `/projets`, `/lab/design-system`. Menu mobile (375 px), bascule de langue (FR ↔ EN, titre et `lang` mis à jour) : comportement identique au build de `main` (ouvrir, fermer au clic sur un lien, fermer à l'historique arrière).
10. **OK** (à revérifier à la clôture par le `git diff` demandé) — aucun secret ni donnée personnelle ajouté : fichiers de code, CSS, documents Markdown, un CI sans secret.
11. **OK** — tout est commité sur `auto/site-avant-apres`, `main` intacte, rien poussé.

## Comment vérifier
- `git diff main...auto/site-avant-apres --stat` ; `npm run lint && npm run build`.
- `node missions/site-avant-apres/mesurer-audit.mjs apres` (recalcule la note ; résultats dans `mesure-apres.json`).
- Aperçu : `npm run dev`, puis regarder un bouton corail (`/lab/audit-tokens` « Explorer »), l'entrée active du menu, et cliquer dans un champ de `/lab/design-system` (anneau de focus).
- Après fusion et déploiement, relancer l'outil sur le dépôt GitHub : la note publique doit refléter `mesure-apres.json`.

## Décisions
Voir `DECISIONS.md` (paire dédiée, D5 limité aux 60 fichiers audités, retrait de `outline: none`, déplacements de lint, CHANGELOG sans invention).

## Délégations
Aucune réussie : `explorateur` (Haiku) lancé deux fois à l'étape 2, en échec (« classifieur sans verdict ») ; les autres étapes déléguées au plan ont été faites directement par Sonnet. Voir `DELEGATIONS.md`.

## Recommandations
- Décider si l'on garde l'anneau de focus ajouté aux champs (sinon, autre moyen de gagner l'axe Accessibilité : des blocs `[data-invert]` accessibles).
- Ajouter des tokens d'espacement (2, 4, 10, 20 px) pour vider les « déjà tokenisées ».
- Échelle typographique (tokens de taille de police), Storybook, stories, tests de composants (axe Composants), `CONTRIBUTING.md`, dossier `docs/`.
- Page ou section publique « avant / après » sur le site, à décider après la fusion.
- Étendre D5 aux fichiers hors des 60 audités.
