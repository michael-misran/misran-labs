# Rédaction d'un numéro du Magazine — procédure de la routine

Document lu par la routine « misran-labs — magazine du lundi » à chaque exécution. Il se suffit à lui-même avec `FORMAT.md` (le format d'un numéro). Décisions de Michael (2026-09-27) : **un numéro par semaine, le lundi matin**, **publié par pull request** (Michael relit et fusionne), **angle orienté designers et développeurs**, **bilingue FR/EN**.

## 0. Règles absolues
- **Aucune actualité inventée.** Chaque fait vient d'une page lue pendant cette exécution (WebFetch), jamais de la mémoire du modèle.
- **Résumés rédigés, jamais copiés.** Pas de citation de plus de 15 mots, au plus une par article, entre guillemets.
- **Pas de rumeur, pas de fuite, pas de « selon des sources ».** Seulement des annonces officielles ou des faits publiés et vérifiables.
- **Semaine calme = pas de numéro.** Moins de 2 nouveautés vraiment utiles : on ne publie rien (voir §6).
- Site public au nom de Michael : ton factuel, sobre, sans superlatifs marketing.

## 1. Déterminer la date et le numéro
1. Lire les fichiers de `src/magazine/numeros/` : le plus récent donne `dernier_numero` et `derniere_date`.
2. **Date de parution** = le lundi de la semaine en cours si on est lundi, sinon le prochain lundi (format `AAAA-MM-JJ`).
3. Si un fichier existe déjà pour cette date → **arrêter** : rien à faire cette semaine.
4. `numero` = `dernier_numero` + 1.
5. **Fenêtre de veille** : jusqu'à aujourd'hui inclus. Début = le plus ancien entre « aujourd'hui − 7 jours » et « lendemain de `derniere_date` » (pour rattraper des semaines sautées), sans remonter au-delà de « aujourd'hui − 14 jours ». Les chevauchements sont sans risque : le §3 écarte les sujets déjà traités.

## 2. Collecte (sous-agent `veilleur`, Haiku)
Lui transmettre la fenêtre de dates et la liste de sources ci-dessous. Il renvoie une liste de candidats (titre, date de publication, URL, 2 lignes de résumé factuel), uniquement dans la fenêtre.

**Sources prioritaires** (pages officielles de nouveautés) :
- Anthropic (news, release notes Claude / Claude Code)
- OpenAI (blog, release notes)
- Google (blog Gemini / DeepMind, Google AI for Developers)
- Figma (blog, release notes)
- GitHub (changelog, blog Copilot)
- Vercel (blog, changelog)
- Cursor (changelog)
- Hugging Face (blog)

**Sources secondaires**, seulement pour repérer un sujet, puis toujours remonter à l'annonce officielle : Simon Willison's Weblog, The Verge (rubrique IA), Hacker News.

## 3. Sélection (session principale, Sonnet)
- **Retenir 3 à 5 nouveautés** (maximum absolu : 5 ; minimum pour publier : 2).
- Critère principal : **qu'est-ce que ça change concrètement pour un designer ou un développeur** qui travaille avec l'IA (outils, modèles, workflows, design, code).
- Écarter : levées de fonds, polémiques, annonces sans disponibilité réelle, doublons.
- **Pas de sujet déjà traité** : relire les titres et sources des numéros précédents.
- Pour chaque sujet retenu : **ouvrir la source officielle avec WebFetch** et vérifier les faits, la date et la disponibilité. Si la vérification échoue, écarter le sujet.

## 4. Rédaction
- Suivre `FORMAT.md` à la lettre (champs, catégories, 1 à 5 articles, au moins une source `https://` par article).
- `titre` du numéro : court, reflète le sujet dominant de la semaine.
- `edito` : 2-3 phrases, la tendance de la semaine.
- Chaque article : `resume` en 3-5 phrases, `pourquoi` en 1-3 phrases orientées usage.
- **FR d'abord, puis EN** : traduction naturelle, pas mot à mot. Noms de produits inchangés.

## 5. Relecture factuelle (sous-agent `relecteur`, Sonnet) — obligatoire
Pourquoi : le numéro 1 (test du 2026-09-27) contenait trois erreurs typiques d'un résumé IA — des chiffres vrais mais mal reliés (baisse du coût total présentée comme baisse du prix unitaire, crédits d'essai attribués à deux produits au lieu d'un, « évaluations internes » au lieu de benchmarks publics).

1. Une fois le fichier JSON écrit, lancer le sous-agent `relecteur` avec son chemin. Il rouvre chaque source et renvoie un verdict par affirmation : `CONFIRMÉ`, `INEXACT` ou `INTROUVABLE`.
2. Corriger chaque `INEXACT` avec la formulation donnée par la source, en FR **et** en EN.
3. Supprimer chaque affirmation `INTROUVABLE`. Si un article perd son information principale, le retirer du numéro (et si moins de 2 articles restent : pas de numéro, cf. §6).
4. S'il y a eu plus de 3 corrections, relancer le `relecteur` une seconde fois sur le fichier corrigé.
5. Garder le bilan (N affirmations vérifiées, X corrigées, Y retirées) pour la description de la pull request.

## 5 bis. Contrôles
1. Générer l'image de partage : `node scripts/og-numero.js <date>` ; l'ouvrir (outil Read) et vérifier que le titre est lisible et ne sort pas du cadre. Si la commande échoue, continuer sans image (le site utilise l'image de rubrique) et le signaler dans la pull request.
2. `npm run build` passe.
3. Dans le navigateur (preview « dev » : `preview_start`, sinon `npx vite preview` après le build) : `/magazine` liste le nouveau numéro, `/magazine/<date>` s'affiche en FR et en EN, **aucun message `[magazine]` ni erreur dans la console**. Arrêter le serveur ensuite.
4. Relire le JSON une dernière fois : aucune affirmation sans source, aucune citation longue.

## 6. Publication
1. Partir de `main` à jour : `git checkout main`, puis `git pull`.
2. Créer la branche : `git checkout -b auto/magazine-<date>`.
3. Ajouter **uniquement** `src/magazine/numeros/<date>.json` et, s'il a été généré, `public/og/magazine/<date>.png`. Commit : `git commit -m "Magazine issue <numero> (<date>)" -m "<résumé en une ligne>" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" -m "Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"`.
4. Pousser la branche : `git push -u origin auto/magazine-<date>` (seul push autorisé ; jamais `main`, jamais `--force`).
5. Ouvrir la pull request : `gh pr create --base main --head auto/magazine-<date> --title "Magazine Nº <numero> — <titre fr>" --body "<liste des articles avec leurs sources, puis le bilan de la relecture factuelle (§5)>"`, avec en dernière ligne `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
6. **Ne jamais fusionner.** Michael relit la prévisualisation Vercel et fusionne.
7. Revenir sur `main` : `git checkout main`.

**Semaine calme** : ne rien créer (ni branche, ni fichier, ni PR). Terminer par une phrase : « Pas de numéro cette semaine : N candidat(s), aucun assez utile », avec la liste des candidats écartés.

## 7. Commandes shell
Une commande simple par appel (pas de `&&`, `;`, boucle, `$(…)`, heredoc) : les autorisations ne reconnaissent pas les commandes composées, et personne n'est là pour répondre à une demande.
