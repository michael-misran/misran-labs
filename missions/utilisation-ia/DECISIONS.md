# Mission utilisation-ia — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D8 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 2 | `SiteMapDiagram` a ses titres de colonnes ("AVANT"/"APRÈS") codés en dur en français, non paramétrables. Pour les deux arborescences (§7, §10), on privilégiera un bloc `pre` stylé aux tokens plutôt que `SiteMapDiagram`, sauf si l'étape 3 juge que ça reste lisible tel quel. Modifier le composant est hors périmètre (sauf bug bloquant, ce n'en est pas un). | D8 exige la traduction complète y compris les libellés des schémas ; D4-7 autorise explicitement l'alternative « bloc pre stylé » si le composant ne s'y prête pas. |
| 2026-09-27 | 3 | Architecture complète de la page tranchée par l'expert (Opus), voir section ci-dessous. Point clé : confirmation de `<pre>` (pas `SiteMapDiagram`) pour §7 et §10 ; tous les `FlowDiagram` en vertical ; un composant local `DiagramBox` pour les schémas 4 et 5 (organigramme des modèles, local vs cloud), qu'aucun composant existant ne couvre. | Détails et justifications dans le document ci-dessous. |
| 2026-09-27 | 5–6 | Rédaction FR (étape 5) et traduction EN (étape 6) faites en un seul passage par la session principale (Sonnet), au lieu de deux commits séparés. Toutes les sections et les 7 schémas de l'architecture (étape 3) sont couverts, dans les deux langues. Vérification immédiate : build OK, lint sans nouvelle erreur, greps confidentialité/couleurs propres, rendu navigateur FR et EN via un serveur de prévisualisation statique (`vite preview`, la session ne peut pas lancer de serveur de développement sans supervision), aucune erreur console, aucun débordement horizontal à 375 px, « Utilisation de l'IA » / « How I use AI » bien juste sous « Tokens du Lab » dans la sidebar et sur la home. | Les deux étapes touchent le même fichier et le même objet `CONTENT` ; les séparer aurait juste dédoublé la relecture sans réduire le risque. L'étape 7 (verificateur) reste prévue pour un contrôle indépendant formel sur les 6 critères d'acceptation. |

---

## Étape 3 : architecture de la page (expert, Opus, 2026-09-27)

### A. Règles communes
- Même conteneur que `WorkflowSolo.jsx` : `padding: isMobile ? 20 : 40`, `maxWidth: 880`, puis `CaseMasthead`, `CaseHero`, un paragraphe d'intro, les sections, et `CaseFooter`.
- Copier le composant `Table` de `WorkflowSolo.jsx` à l'identique : `minWidth 420` dans un conteneur à `overflowX: auto`.
- Tous les `FlowDiagram` sont en `direction="vertical"`. En horizontal, la largeur vaut n×240 + (n−1)×56, trop large dès 6 étapes.
- Longueurs à respecter :
  - `label` de `FlowDiagram` : 30 caractères au plus.
  - `sublabel` : 100 caractères au plus (le composant coupe à 34 caractères par ligne).
  - `label` de `Timeline` : 55 caractères au plus, sur une seule ligne, sans retour possible dans la zone de 520 de large.
- Tout texte qui contient des chevrons (`<`, `>`) va dans une chaîne JS de `CONTENT`, jamais en JSX brut.
- Critère 5 : aucun `#` suivi de 3 caractères hexadécimaux ou plus dans les textes. « PR #1 » passe, « #abc » ne passe pas.

### B. Composant local `DiagramBox`, pour les schémas 4 et 5
- `wrapText(text, maxChars)` : copie locale de celle de `FlowDiagram`, qui n'est pas exportée. Modifier `FlowDiagram` est hors périmètre.
- `DiagramBox({ x, y, w, h, label, sublabel, accent, dashed })` :
  - `rect` avec `rx={20}`, `fill="var(--bg2)"`, `stroke={accent ? 'var(--primary)' : 'var(--border)'}`, `strokeWidth={1}` et `strokeDasharray={dashed ? '4 3' : undefined}`.
  - `label` : `x={x + w/2}`, `y={y + 26}`, `textAnchor="middle"`, `var(--font-mono)`, taille 12, graisse 600, `var(--text)`.
  - `sublabel` coupé à `Math.floor((w - 24) / 5.6)` caractères. Lignes à `y + 50 + i*14`, `var(--font-body)`, taille 10.5, `var(--text2)`.
- Connecteurs : `line` avec `stroke="var(--muted)"` et `strokeWidth={1.5}`, sans flèche.
- Chaque SVG est enveloppé ainsi : `<div style={{ overflowX: 'auto' }}><svg viewBox=… style={{ width: '100%', minWidth: 440, maxWidth: 480, height: 'auto', display: 'block' }}>`.

### C. Plan de la page

| # | Titre FR / EN | CONTENU | Contenu et schéma |
|---|---|---|---|
| intro | (pas de titre) | chapeau §0–§12 | 2–3 phrases à la première personne : comment je suis passé de l'IA locale à des missions que Claude mène seul, sur branche, pendant la nuit. |
| 1 | La séquence / The sequence | tout | **Schéma 1 : Timeline** |
| 2 | Point de départ : l'IA locale / Starting point: local AI | §0 | 3 paragraphes courts : Lily ; pourquoi le gain de quota était illusoire ; la décision d'abandonner. |
| 3 | Les vrais leviers sur le quota / The real quota levers | §1 | Liste `<ol>` de 5 points ; le 5e (IA locale) est marqué « abandonnée ». |
| 4 | Les sous-agents / Sub-agents | §2 | Définition, analogie du stagiaire, apports et limites (deux listes), puis `Table` de comparaison IA locale / sous-agent (4 lignes, texte exact de §2). |
| 5 | L'objectif : l'autonomie « fondateur » / The goal: "founder" autonomy | §3 | La citation de Michael en bloc (bordure gauche `var(--primary)`), deux listes « Ce qui bloquait » et « Réponses apportées » (sans les apparier une à une : CONTENU ne donne pas de réponse à la mise en veille), puis **Schéma 3**, puis le paragraphe « sans surcoût sur Pro ». |
| 6 | Le cloud, expliqué / The cloud, explained | §4 | **Schéma 5**, puis une liste des implications (GitHub obligatoire, fichiers non versionnés et secrets absents, Internet restreint), puis la phrase sur le choix du Mac pour le test. |
| 7 | L'organigramme des modèles / The model org chart | §5 | **Schéma 4**, puis la `Table` de §5 (Rôle, Modèle, Quand), puis un paragraphe « Qui choisit » avec l'amélioration « modèle par étape ». |
| 8 | Un incident de sécurité / A security incident | §6 | 4 points : découverte, vérification (89 commits), actions, leçon. |
| 9 | La mise en place / The setup | §7 | La mission test (34 tokens sémantiques), **Schéma 7a** (`<pre>` de l'arborescence du projet), puis une liste des 4 incidents de mise en place. |
| 10 | L'exécution autonome / The autonomous run | §8 | Bloc de chiffres au format `metrics` de `WorkflowSolo` (libellé mono en `var(--primary)` + texte) : durée, résultat, non-régression, page Tokens, décisions, sous-agents, modèle réellement utilisé (Opus), limite rencontrée. |
| 11 | La clôture / Wrap-up | §9 | `<ol>` des 6 points, puis **Schéma 6** (circuit Git), qui illustre le point 6 « GitHub ≠ site en ligne ». |
| 12 | Améliorations après le test / Post-test improvements | §10 | Liste de 4 points, puis **Schéma 7b** (`<pre>` de `~/.claude/`). |
| 13 | Le circuit final / The final loop | §11 | **Schéma 2**, puis le sous-titre « Ce qui reste à Michael » / "What stays with Michael" avec une liste de 6 points. |
| 14 | Mise en abyme / Meta | §12 | Paragraphe qui dit explicitement que cette page est la 2e mission, produite par le système (D3), avec renvoi au dossier `missions/utilisation-ia/`. |

### D. Schémas (données exactes)

**Schéma 1 : chronologie (`Timeline`, section 1)**

`milestonesFr` (jalons FR) :
```js
[
  { date: '01', label: "Abandon de l'IA locale (Lily, Qwen3-8B)" },
  { date: '02', label: 'Les vrais leviers sur le quota' },
  { date: '03', label: 'Les sous-agents, expliqués' },
  { date: '04', label: "Objectif : l'autonomie « fondateur »" },
  { date: '05', label: 'Incident de sécurité : un token en clair, révoqué' },
  { date: '06', label: 'Mise en place de la mission test (Opus)' },
  { date: '07 · 23 H 09 → 23 H 22', label: 'Exécution autonome : 13 min, 7 commits' },
  { date: '08', label: 'Clôture : push, prévisualisation, PR #1, fusion' },
  { date: '09', label: 'Skill global /mission pour tous les projets' },
]
```

`milestonesEn` (jalons EN) :
```js
[
  { date: '01', label: 'Dropping local AI (Lily, Qwen3-8B)' },
  { date: '02', label: 'The real quota levers' },
  { date: '03', label: 'Sub-agents, explained' },
  { date: '04', label: 'Goal: "founder" autonomy' },
  { date: '05', label: 'Security incident: a plaintext token, revoked' },
  { date: '06', label: 'Setting up the test mission (Opus)' },
  { date: '07 · 11:09 → 11:22 PM', label: 'Autonomous run: 13 min, 7 commits' },
  { date: '08', label: 'Wrap-up: push, preview, PR #1, merge' },
  { date: '09', label: 'Global /mission skill for every project' },
]
```

**Schéma 2 : circuit d'une mission (`FlowDiagram` vertical, section 13)**

FR :
```js
[
  { label: '1 · Brief', sublabel: 'Michael : « mission : … »' },
  { label: '2 · Cadrage (Opus)', sublabel: 'Spec tranchée + plan, avec un modèle par étape' },
  { label: '3 · Branche auto/<nom>', sublabel: 'Commits libres uniquement sur les branches auto/*' },
  { label: '4 · Tâche programmée (Sonnet)', sublabel: 'Toutes les 2 heures ; reprend après chaque coupure de quota' },
  { label: '5 · Étapes + commits', sublabel: 'Un commit par étape ; délègue à Haiku ou Opus selon le plan' },
  { label: '6 · Rapport', sublabel: 'RAPPORT.md, écrit par la session' },
  { label: '7 · Vérification', sublabel: 'Avec Michael, dans un vrai navigateur ; aucun secret dans les changements' },
  { label: '8 · Push (Michael)', sublabel: 'Interdit à Claude par les permissions' },
  { label: '9 · Pull request (Claude)', sublabel: 'Après vérification de la prévisualisation Vercel' },
  { label: '10 · Fusion (Michael)', sublabel: 'Clic « Merge », puis git pull' },
]
```

EN :
```js
[
  { label: '1 · Brief', sublabel: 'Michael: "mission: …"' },
  { label: '2 · Framing (Opus)', sublabel: 'A settled spec + a plan, with one model per step' },
  { label: '3 · auto/<name> branch', sublabel: 'Commits allowed only on auto/* branches' },
  { label: '4 · Scheduled task (Sonnet)', sublabel: 'Every 2 hours; picks up again after each quota cut-off' },
  { label: '5 · Steps + commits', sublabel: 'One commit per step; hands off to Haiku or Opus as planned' },
  { label: '6 · Report', sublabel: 'RAPPORT.md, written by the session' },
  { label: '7 · Check', sublabel: 'With Michael, in a real browser; no secrets in the changes' },
  { label: '8 · Push (Michael)', sublabel: 'Blocked for Claude by the permissions' },
  { label: '9 · Pull request (Claude)', sublabel: 'Once the Vercel preview has been checked' },
  { label: '10 · Merge (Michael)', sublabel: 'Click "Merge", then git pull' },
]
```

**Schéma 3 : boucle de reprise après quota (`FlowDiagram` vertical, section 5)**

FR :
```js
[
  { label: '1 · Travail', sublabel: 'Plan coché, PROGRESS.md et un commit après chaque étape : tout est sur le disque' },
  { label: '2 · Quota épuisé', sublabel: "Limite glissante de 5 heures de l'abonnement Pro" },
  { label: '3 · Arrêt', sublabel: "La session s'arrête et ne peut pas se relancer seule" },
  { label: '4 · Relance 2 h plus tard', sublabel: "La tâche programmée repart de zéro ; si rien à faire, elle s'arrête en quelques secondes" },
  { label: '5 · Lecture de PROGRESS.md', sublabel: 'Et des autres fichiers de la mission : la mémoire entre deux reprises' },
  { label: '6 · Reprise ↺', sublabel: "Là où le plan coché s'est arrêté, puis retour à l'étape 1" },
]
```

EN :
```js
[
  { label: '1 · Work', sublabel: 'Checked-off plan, PROGRESS.md and a commit after every step: it all lives on disk' },
  { label: '2 · Quota used up', sublabel: "The Pro plan's rolling 5-hour limit" },
  { label: '3 · Stop', sublabel: "The session stops and can't restart on its own" },
  { label: '4 · Relaunch 2 h later', sublabel: 'The scheduled task starts fresh; with nothing to do, it exits within seconds' },
  { label: '5 · Reading PROGRESS.md', sublabel: 'And the other mission files: the memory between two runs' },
  { label: '6 · Resume ↺', sublabel: 'Where the checked-off plan left off, then back to step 1' },
]
```

**Schéma 4 : organigramme des modèles (SVG dans la page, section 7), `viewBox="0 0 480 348"`**
- Boîte du haut : `x=120 y=0 w=240 h=92`, `accent`.
- Ligne `(240,92)` vers `(240,120)`.
- Boîte du milieu : `x=120 y=120 w=240 h=92`.
- Lignes : `(240,212)` vers `(240,232)` ; `(82,232)` vers `(398,232)` ; puis trois descentes de `y=232` à `y=252`, en `x=82`, `x=240` et `x=398`.
- Boîtes du bas : `y=252 w=148 h=92`, en `x=8`, `x=166` et `x=324`. La 3e (expert) est `dashed`.

| Boîte | FR label / sublabel | EN label / sublabel |
|---|---|---|
| haut | `OPUS · ARCHITECTE` / « Cadrage, spec, plan : une fois, avec Michael » | `OPUS · ARCHITECT` / "Framing, spec, plan: once, with Michael" |
| milieu | `SONNET · CHEF DE PROJET` / « Toutes les exécutions programmées ; choisit les sous-agents » | `SONNET · PROJECT LEAD` / "Every scheduled run; picks the sub-agents" |
| bas 1 | `HAIKU` / « explorateur : recherche » | `HAIKU` / "explorateur: code search" |
| bas 2 | `HAIKU` / « verificateur : build, lint, navigateur » | `HAIKU` / "verificateur: build, lint, browser" |
| bas 3 | `OPUS` / « expert : étape délicate ou 2 échecs » | `OPUS` / "expert: tricky step or 2 failures" |

Les noms d'agents restent en français dans la version EN : ce sont des noms de fichiers.

**Schéma 5 : local vs cloud (SVG dans la page, section 6), `viewBox="0 0 480 280"`**
- Boîte du haut : `x=120 y=0 w=240 h=92`.
- Lignes : `(240,92)` vers `(240,116)` ; `(120,116)` vers `(360,116)` ; puis deux descentes de `y=116` à `y=140`, en `x=120` et `x=360`.
- Boîtes du bas : `y=140 w=224 h=136`, gauche en `x=8` (`accent`, c'est le choix du test), droite en `x=248`.

| Boîte | FR | EN |
|---|---|---|
| haut | `CERVEAU · LE MODÈLE` / « Tourne toujours sur les serveurs d'Anthropic, même en local » | `BRAIN · THE MODEL` / "Always runs on Anthropic's servers, even locally" |
| gauche | `MAINS · MODE LOCAL` / « Sur le Mac : fichiers, commandes, navigateur. Choix du test : l'app Claude doit rester ouverte. » | `HANDS · LOCAL MODE` / "On the Mac: files, commands, browser. Picked for the test: the Claude app must stay open." |
| droite | `MAINS · MODE CLOUD` / « Ordinateur virtuel temporaire : récupère le projet sur GitHub, travaille, renvoie une branche, puis est détruit. Le Mac peut être éteint. » | `HANDS · CLOUD MODE` / "Temporary virtual machine: pulls the project from GitHub, works, sends back a branch, then is destroyed. The Mac can be off." |

**Schéma 6 : circuit Git (`FlowDiagram` vertical, section 11)**

FR :
```js
[
  { label: 'main', sublabel: 'La version publiée : le site en ligne est construit à partir d\'elle' },
  { label: 'auto/<nom>', sublabel: 'Un brouillon, à côté de la version publiée' },
  { label: 'Commits (Claude)', sublabel: 'Un par étape, libres sur auto/* uniquement' },
  { label: 'Push (Michael)', sublabel: 'La branche part sur GitHub. Le code sur GitHub n\'est pas le site en ligne' },
  { label: 'Prévisualisation Vercel', sublabel: 'Construite automatiquement pour la branche, vérifiée par Michael' },
  { label: 'Pull request (Claude)', sublabel: 'Propose de faire entrer le brouillon dans main' },
  { label: 'Fusion (Michael)', sublabel: 'Clic « Merge », puis git pull' },
  { label: 'Site en ligne', sublabel: 'Construit à partir de main : le brouillon devient la version publiée' },
]
```

EN :
```js
[
  { label: 'main', sublabel: 'The published version: the live site is built from it' },
  { label: 'auto/<name>', sublabel: 'A draft, sitting next to the published version' },
  { label: 'Commits (Claude)', sublabel: 'One per step, allowed on auto/* only' },
  { label: 'Push (Michael)', sublabel: 'The branch goes up to GitHub. Code on GitHub is not the live site' },
  { label: 'Vercel preview', sublabel: 'Built automatically for the branch, checked by Michael' },
  { label: 'Pull request (Claude)', sublabel: 'Proposes bringing the draft into main' },
  { label: 'Merge (Michael)', sublabel: 'Click "Merge", then git pull' },
  { label: 'Live site', sublabel: 'Built from main: the draft becomes the published version' },
]
```

**Schémas 7a et 7b : arborescences (`<pre>`, sections 9 et 12)**

Style du bloc :
```js
{
  fontFamily: 'var(--font-mono)',
  fontSize: isMobile ? 11 : 12,
  lineHeight: 1.6,
  color: 'var(--text2)',
  background: 'var(--bg2)',
  border: 'var(--border-thin) solid var(--border)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-md)',
  margin: 0,
  overflowX: 'auto',
  whiteSpace: 'pre',
}
```
- Le texte vient de `c.treeProject` et `c.treeGlobal`, des chaînes multilignes en template literal.
- Les caractères de l'arbre sont identiques en FR et en EN ; seuls les commentaires sont traduits, alignés à la main.
- Le défilement horizontal reste dans le `<pre>`, ce que D7 autorise.

7a, commentaires FR : repris mot pour mot du bloc de §7.

7a, commentaires EN :

| Fichier | Commentaire EN |
|---|---|
| `CLAUDE.md` | project rules (missions, Git, models, launch, wrap-up) |
| `settings.json` | allow list + deny list (push, merge, rebase, npm install, vercel) |
| `explorateur.md` | Haiku — read-only search |
| `verificateur.md` | Haiku — build, lint, browser |
| `expert.md` | Opus — last resort |
| `SPEC.md` | goal, 9 architecture decisions (D1–D9), 6 criteria |
| `PLAN.md` | 8 steps to check off |
| `PROGRESS.md` | where things stand (memory between two runs) |
| `DECISIONS.md` | decisions made without Michael |
| `DELEGATIONS.md` | sub-agent log |
| `RAPPORT.md` | written at the end |

7b, commentaires FR : repris mot pour mot du bloc de §10.

7b, commentaires EN :

| Élément | Commentaire EN |
|---|---|
| `SKILL.md` | picks the mode: new project / install / launch / wrap-up |
| `templates/` | CLAUDE-missions.md, settings.json, task-prompt.md, / SPEC, PLAN, PROGRESS, DECISIONS, DELEGATIONS |
| `nouveau-projet.md` | idea → 3 to 6 questions → project + repo + mission 1 |
| `cloture.md` | check → push → preview → PR → merge |
| `agents/` | explorateur, verificateur, expert (global) |

### E. `SiteMapDiagram` ou `<pre>` : tranché, `<pre>` pour §7 et §10
1. Les colonnes AVANT/APRÈS sont figées en français, ce qui viole D8.
2. Même en français elles seraient fausses : §7 (le projet) et §10 (le dossier `~/.claude/`) ne sont pas un avant/après.
3. `SiteMapDiagram` n'a pas de place pour les commentaires de droite, qui portent l'essentiel de l'information.

`<pre>` est l'alternative prévue par D4-7 et ne demande aucune modification de composant.

### F. Confidentialité (D6)
- Recherche dans `CONTENU.md` : aucun `/Users/`, aucun `@` ni email, aucun `ghp_`/`gho_`/`github_pat`, aucun nom de compte GitHub. Les seuls chemins sont relatifs au dépôt ou en `~/.claude/`, ce que D6 accepte.
- §6 : ne donner aucun préfixe, format, longueur ou fragment du token, ni l'adresse du dépôt distant. Écrire seulement « un token GitHub en clair dans l'adresse du dépôt distant ».
- Ne pas recopier depuis `CLAUDE.md`, la configuration Git ou le journal Git : ni le nom du compte ou du dépôt GitHub, ni l'identité Git, ni l'email, ni les heures des commits (D3 : CONTENU.md seule source). « Pull request #1 » sans lien.
- Ne pas reproduire le contenu de `.claude/settings.json` ni le prompt de la tâche programmée. Les descriptions de §7 suffisent.
- `gh auth login`, « trousseau macOS », « LM Studio » et « Lily » sont sans risque : ce sont des faits publics de §0 et §6.
