# Contenu de mise à jour — « Utilisation de l'IA »

Rédigé par la session de cadrage (Opus), qui a vécu toute la suite avec Michael le 2026-09-27. **Seule source de faits pour ce qui s'est passé après la page actuelle** (celle-ci s'arrête à la création du skill `/mission`, le 26/09). Ne rien inventer, ne rien extrapoler. Heures en heure de Paris.

⚠️ Site et dépôt publics : aucun token, aucun chemin `/Users/…`, aucun email.

---

## A. Ce qui a changé et rend la page actuelle inexacte (état au 27/09)

| Passage actuel de la page | Réalité au 27/09 |
|---|---|
| Circuit final, étape « Push (moi) — interdit à Claude par les permissions » | Sur « clôture les missions », **Claude** vérifie, **pousse les branches de mission** et ouvre les pull requests. Michael ne fait plus que **fusionner**. Ensuite Claude remet le Mac à jour (`git pull`) et fait le ménage des branches. |
| « Ce qui me reste » : « Le push et la fusion » | Il reste **la fusion** (et le push de `main` quand il le demande, voir §H). Le push des branches de mission est fait par Claude lors de la clôture. |
| Organigramme : 3 sous-agents (explorateur, verificateur, expert) | **5 sous-agents** : explorateur (Haiku), verificateur (Haiku), expert (Opus), **veilleur** (Haiku, recherche web pour le Magazine), **relecteur** (Sonnet, vérification factuelle du Magazine). |
| Arborescence du projet (§ mise en place) | S'ajoutent : `missions/` contient maintenant 6 missions ; `.claude/agents/` a 5 fiches ; `src/magazine/` (rubrique Magazine, `FORMAT.md`, `REDACTION.md`, un fichier JSON par numéro). |
| Circuit : « la tâche programmée reprend » une mission | La routine gère une **file d'attente** : plusieurs missions cadrées d'avance, traitées à la suite (§E). |
| Clôture : Michael au Mac | Tout peut se faire **depuis le téléphone** (§F). |
| La mise en abyme parle de « la deuxième mission » | Cette mise à jour est la **septième** mission du système (§I). |

Les passages **historiques** (ce qui s'est passé le 26/09 : la première mission, le garde-fou qui a bloqué le push même quand Michael le demandait, etc.) restent vrais **à leur date** : les garder, en les situant dans le temps si besoin.

## B. Mission 3 — `circuits-colonnes` (27/09, 8 h 16 → 8 h 31, 15 min)

- Brief : sur la page Utilisation de l'IA, afficher les longs schémas verticaux sur plusieurs colonnes sur ordinateur.
- Au cadrage, Opus a compté : pas deux mais **trois** schémas concernés (10, 8 et 6 étapes) → tous traités.
- Nouveau mode « grille » en **serpentin** dans le composant de schéma (1 → 2 → 3, puis 6 ← 5 ← 4…), 3 colonnes sur ordinateur, inchangé sur mobile.
- Hauteurs : **916 → 258 px**, **1 240 → 413 px**, **1 564 → 569 px** (÷ 2,75 à ÷ 3,5). Mobile et page Workflow : identiques au caractère près.
- Modèles : Haiku (mesures, vérification) + Sonnet (code). **Pas d'Opus** : architecture tranchée au cadrage.

## C. Autonomie : les réglages qui ont supprimé les interruptions

- Pendant la 2ᵉ mission, des **demandes d'autorisation** ont interrompu l'exécution. Cause analysée : la routine tournait en mode de permission « par défaut », la création de fichiers de code n'était pas autorisée, et les **commandes composées** (`&&`, boucles) ne sont pas reconnues par les règles d'autorisation.
- Corrections : routine en **mode Auto** (réglé par Michael) ; autorisations complétées ; consigne « **une commande simple par appel** ».
- Deux consignes ajoutées après la 3ᵉ mission : **arrêter les serveurs** lancés avant de terminer (une session en avait laissé un tourner) ; **seule la session principale commite**, avec la signature de chaque modèle qui a travaillé (des commits de sous-agents n'étaient pas signés).
- Résultat : la 3ᵉ mission n'a signalé aucune demande d'autorisation.

## D. Le Magazine (27/09)

Idée de Michael : un magazine de veille IA sur le site, alimenté par une routine. Décisions de Michael : **un numéro par semaine, le lundi matin** ; **publication par pull request** (il relit et fusionne) ; **angle orienté designers et développeurs** ; **bilingue FR/EN**.

**Mission 4 — `magazine`** : la rubrique `/magazine` (liste des numéros) et `/magazine/<date>` (un numéro : édito, articles avec résumé, « Pourquoi ça compte », sources). Un numéro = **un fichier JSON**, validé au chargement (un fichier invalide n'est pas affiché, sans casser la page). Le format est documenté dans `FORMAT.md` pour que la routine n'ait qu'à **ajouter un fichier**, sans toucher au code. Numéro 0 « Présentation », sans actualité inventée. Modèles : **Opus** (direction visuelle), Sonnet (code), Haiku (vérification). À la clôture, Claude a corrigé un détail (le titre de l'onglet affichait « /magazine »).

**La routine du lundi (7 h 30)** — configurée directement avec Michael (créer une tâche programmée et changer des permissions sont des actions qu'une session autonome n'a pas le droit de faire) :
1. **veilleur** (Haiku) collecte les annonces de la semaine sur des sources officielles (Anthropic, OpenAI, Google, Figma, GitHub, Vercel, Cursor, Hugging Face…).
2. Sonnet sélectionne 3 à 5 sujets, vérifie chaque source, rédige en FR puis EN.
3. **relecteur** (Sonnet) vérifie chaque affirmation contre ses sources (ajouté après le test, voir ci-dessous).
4. La routine pousse sa branche `auto/magazine-<date>` et ouvre la pull request — **seule exception** au « jamais de push » des routines. Semaine calme = pas de numéro.

**Le test (27/09, 7 min)** a produit le **numéro 1, « Prix en baisse, agents en expansion »** (4 articles : Claude Opus 5.5, GPT-6 Sol et Luna, GitHub Copilot Canvases, Cursor Rollouts et Security Review). En rouvrant les sources une par une, la session interactive a trouvé **trois inexactitudes**, typiques d'un résumé IA — des chiffres vrais mais mal reliés :
- une baisse de coût total (~40 %) présentée comme une baisse du prix unitaire (en réalité −20 %) ;
- des crédits d'essai attribués à deux produits alors qu'ils n'en concernent qu'un ;
- des « évaluations internes » qui étaient des benchmarks publics.
→ Corrigées avant publication, et création du **relecteur** : désormais obligatoire, avec le bilan de la relecture dans chaque pull request. Leçon : c'est exactement pour ça que la publication passe par la validation de Michael.

## E. La file d'attente de missions

- Question de Michael : peut-on empiler des missions ?
- Problème : les fichiers d'une mission n'existent que **sur sa branche** ; la routine ne regardait que la branche ouverte → une deuxième mission aurait été invisible.
- Solution : la routine cherche les missions **dans les branches** `auto/*`, prend **la plus ancienne sans rapport**, puis **enchaîne** sur la suivante s'il reste du quota. Chaque mission part de `main` et donne sa propre pull request.
- Premier usage : **mission 5 `workflow-grille`** (les deux schémas de la page Workflow en grille ; Haiku + Sonnet) et **mission 6 `home-magazine`** (le dernier numéro du Magazine mis en avant sur la home, mis à jour tout seul à chaque nouveau numéro ; Opus pour la direction visuelle, Sonnet, Haiku) ont été exécutées **à la suite, en une seule exécution** (lancée à 12 h 04, environ 30 minutes).

## F. Tout piloter depuis le téléphone

- Michael connaissait déjà Remote Control. Le cloud a été étudié (le « cerveau » et les « mains » dans un ordinateur d'Anthropic, Mac éteint possible) puis **écarté pour l'instant** : il aurait fallu recopier le skill dans le dépôt, remplacer les tâches programmées par des routines cloud, et le navigateur de vérification y est limité. Remote Control suffit.
- **La session interactive devient une tour de contrôle** : Remote Control activé, Michael lui écrit depuis l'app Claude sur son téléphone (« lance la routine des missions »), elle démarre la routine, est prévenue à la fin, vérifie et fait la clôture.
- Premier essai complet depuis le téléphone (27/09) : lancement → 2 missions exécutées à la suite → vérification dans le navigateur par la session → push des branches et ouverture des pull requests par Claude (sur demande de Michael) → prévisualisation et **fusion dans l'app GitHub** par Michael → `git pull` et ménage des branches par Claude. Le Mac n'a servi qu'à rester allumé.

## G. La clôture en un mot

Depuis le 27/09, « **clôture les missions** » suffit (sur Mac comme sur téléphone) : Claude trouve les missions terminées, lit leurs rapports, vérifie dans le navigateur, contrôle qu'aucune donnée sensible ne part sur le dépôt public, pousse chaque branche, ouvre les pull requests et résume. Si un point bloque, il ne pousse pas et explique. Michael fusionne ; Claude remet le Mac à jour.

## H. Le push de `main` : un compromis

- Michael a proposé de retirer l'interdiction de pousser `main` (« au pire on rollback sur Vercel »).
- Claude a rappelé que pousser `main` **met le site en production immédiatement**, et que les réglages de permissions valent pour **toutes** les sessions, y compris les routines de nuit sans personne pour regarder.
- **Compromis retenu** : Claude peut pousser `main` **uniquement dans une session où Michael est présent, sur sa demande explicite** ; les routines et missions autonomes, **jamais**. Forcer un push et fusionner restent interdits à tous.
- Détail notable du 27/09 : avant ce compromis, alors que Michael venait de dire « vas-y », Claude a **refusé de contourner le verrou** en écrivant la commande autrement — le garde-fou n'a de valeur que s'il n'est pas contourné.

## I. Bilan chiffré au 27/09

| Mission | Durée | Modèles |
|---|---|---|
| 1. tokens-fix | 13 min | Opus seul (modèle de la routine pas encore réglé) |
| 2. utilisation-ia | 66 min | Haiku, Opus, Sonnet selon le plan |
| 3. circuits-colonnes | 15 min | Haiku, Sonnet |
| 4. magazine | — | Opus, Sonnet, Haiku |
| 5. workflow-grille | ~30 min pour les 5 et 6 ensemble | Haiku, Sonnet |
| 6. home-magazine | (même exécution) | Opus, Sonnet, Haiku |
| 7. utilisation-ia-maj (cette mise à jour) | — | voir DELEGATIONS.md de la mission |

Plus une routine hebdomadaire : le Magazine (numéro 1 daté du 28/09, fusionné le 27/09 après corrections).

Tendance : de moins en moins d'interventions de Michael, et Opus réservé aux étapes qui en ont besoin (cadrage, direction visuelle).
