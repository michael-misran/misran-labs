// Textes du livre « L’Atelier automatique » (FR / EN). Tous les faits
// viennent du dépôt (D6 de la SPEC) : CLAUDE.md, missions/README.md,
// src/lab/projects/UtilisationIA.jsx, src/lab/projects/SalleDesMachines.jsx,
// .claude/agents/*.md et ~/.claude/agents/*.md.

export const LT = {
  // Navigation
  titreOnglet: { fr: 'L’Atelier automatique', en: 'The Automatic Workshop' },
  surTitre: { fr: 'Manuel d’utilisation et d’entretien', en: 'Operation and maintenance manual' },
  bibliotheque: { fr: 'Retour à la librairie', en: 'Back to the bookshop' },
  precedente: { fr: 'Page précédente', en: 'Previous page' },
  suivante: { fr: 'Page suivante', en: 'Next page' },
  imprimer: { fr: 'Imprimer / PDF', en: 'Print / PDF' },
  ouvrir: { fr: 'Ouvrir le livre', en: 'Open the book' },

  // ---------- Couverture ----------
  bandeauCentre: { fr: 'Notice n° MM-1977', en: 'Manual No. MM-1977' },
  titreL1: { fr: 'L’Atelier', en: 'The Automatic' },
  titreL2: { fr: 'Automatique', en: 'Workshop' },
  sousL1: { fr: 'Manuel d’utilisation', en: 'Operation and' },
  sousL2: { fr: 'et d’entretien', en: 'maintenance manual' },
  editionCouv: { fr: 'Édition 01', en: 'Edition 01' },
  avisL1: { fr: 'Lire avant', en: 'Read before' },
  avisL2: { fr: 'toute utilisation', en: 'any use' },
  figCouverture: { fr: 'Fig. 1 — Vue éclatée de l’atelier', en: 'Fig. 1 — Exploded view of the workshop' },
  legendeAgents: ['Controleur', 'Relecteur', 'Secrétaire', 'Veilleur', 'Vérificateur', 'Explorateur', 'Expert'],
  plaqueModeleK: { fr: 'Modèle', en: 'Model' },
  plaqueModeleV: { fr: 'MM-1977 · série 01', en: 'MM-1977 · series 01' },
  plaqueAlimK: { fr: 'Alimentation', en: 'Power' },
  plaqueAlimV: { fr: '1 humain, quelques idées', en: '1 human, a few ideas' },
  plaqueFabK: { fr: 'Fabrication', en: 'Built' },
  plaqueFabV: { fr: 'à la main, avec des machines', en: 'by hand, with machines' },

  // ---------- Garde : avant de lire ----------
  gardeTitre: { fr: 'Avant de lire', en: 'Before you read' },
  gardeTexte: {
    fr: 'Ce manuel documente l’atelier qui écrit, relit et publie une bonne partie de Misran Labs : les sessions où Michael travaille avec Claude, les automates qui tournent seuls à heure fixe, et les agents spécialisés qu’ils appellent. Quatre parties sont prêtes ; les suivantes sont en chantier.',
    en: 'This manual documents the workshop that writes, checks and publishes much of Misran Labs: the sessions where Michael works with Claude, the automated routines that run on their own on a schedule, and the specialised agents they call. Four parts are ready; the rest are being built.',
  },
  gardeLecture: {
    fr: 'On tourne les pages au clavier (← →), à la souris ou au doigt. FR / EN se bascule en haut de l’écran.',
    en: 'Turn the pages with the keyboard (← →), the mouse or a finger. FR / EN switches at the top of the screen.',
  },
  sommaireTitre: { fr: 'Sommaire', en: 'Contents' },
  // folio calculé à l'affichage (AtelierLivre.jsx) à partir de la position
  // réelle de la page d'ouverture de chaque partie — jamais un nombre en dur.
  parties: [
    { titre: { fr: 'Consignes de sécurité', en: 'Safety instructions' }, cle: 'p0' },
    { titre: { fr: 'Présentation de l’appareil', en: 'Presenting the appliance' }, cle: 'p1' },
    { titre: { fr: 'Le personnel', en: 'Staff' }, cle: 'p2' },
    { titre: { fr: 'Les automates', en: 'The automated routines' }, cle: 'p3' },
    { titre: { fr: 'Les missions autonomes', en: 'Autonomous missions' }, cle: 'p4' },
    { titre: { fr: 'Les accessoires', en: 'Accessories' }, cle: 'p5' },
    { titre: { fr: 'Réglages et consommation', en: 'Settings and consumption' }, cle: 'p6' },
    { titre: { fr: 'Pannes et dépannage', en: 'Troubleshooting' }, cle: 'p7' },
    { titre: { fr: 'Carnet d’entretien', en: 'Maintenance log' }, cle: 'p8' },
    { titre: { fr: 'Glossaire', en: 'Glossary' }, cle: 'glossaire', annexe: true },
  ],

  // ---------- Partie 0 — Consignes de sécurité ----------
  p0Titre: { fr: 'Consignes de sécurité', en: 'Safety instructions' },
  p0Chapeau: { fr: 'Partie 0', en: 'Part 0' },
  p0Intro: {
    fr: 'Les règles qui suivent ne se discutent pas. Elles protègent un dépôt public et un site qui part en production dès que la branche main change.',
    en: 'The rules below are not up for debate. They protect a public repository and a site that goes live the moment the main branch changes.',
  },
  p0GitTitre: { fr: 'Attention — Git', en: 'Warning — Git' },
  p0GitTexte: {
    fr: 'Toujours une branche de travail, jamais main : branche → commit → l’agent controleur pose un verdict → push de la branche → pull request. Michael seul fusionne. Jamais de push direct sur main, jamais de --force.',
    en: 'Always a working branch, never main: branch → commit → the controleur agent returns a verdict → push the branch → pull request. Only Michael merges. Never push straight to main, never --force.',
  },
  p0PublicTitre: { fr: 'Attention — dépôt public', en: 'Warning — public repository' },
  p0PublicTexte: {
    fr: 'Le dépôt est visible de tout le monde. Aucun secret et aucune donnée personnelle dans un commit : ni token, ni mot de passe, ni adresse postale, ni adresse e-mail autre que celle déjà publique.',
    en: 'The repository is visible to everyone. No secret and no personal data in a commit: no token, no password, no postal address, no email address other than the one already public.',
  },
  p0CasTitre: { fr: 'Cas d’école', en: 'Case study' },
  p0CasTexte: {
    fr: 'En inspectant le dépôt, Claude a trouvé un token GitHub écrit en clair dans l’adresse du dépôt distant, dans la configuration Git locale du Mac. Le token a été révoqué, l’adresse nettoyée, la connexion refaite avec GitHub CLI : les identifiants vivent maintenant dans le trousseau macOS, plus aucun secret en clair.',
    en: 'While inspecting the repository, Claude found a GitHub token written in plaintext in the remote repository’s address, inside the Mac’s local Git configuration. The token was revoked, the address cleaned up, and the connection redone with the GitHub CLI: credentials now live in the macOS keychain, no more plaintext secrets.',
  },
  p0Ecran: [
    { fr: '> git remote -v', en: '> git remote -v' },
    { fr: 'AVANT   https://<jeton masqué>@github.com/…', en: 'BEFORE  https://<masked token>@github.com/…', attn: true },
    { fr: 'APRÈS   https://github.com/…', en: 'AFTER   https://github.com/…', ok: true },
  ],
  p0EcranVerdict: { fr: 'VERDICT : CORRIGÉ', en: 'VERDICT: FIXED' },
  p0NoteFig: { fr: 'Fig. 2 — Avant / après le nettoyage de l’adresse du dépôt.', en: 'Fig. 2 — Before / after cleaning up the repository address.' },

  // ---------- Partie 1 — Présentation de l’appareil ----------
  p1Titre: { fr: 'Présentation de l’appareil', en: 'Presenting the appliance' },
  p1FigLegende: { fr: 'Fig. 3 — Circuit d’une idée dans l’atelier', en: 'Fig. 3 — Circuit of an idea through the workshop' },
  p1Cartouche: { fr: 'De Michael au site public, en six étapes.', en: 'From Michael to the live site, in six steps.' },
  p1Texte1: {
    fr: 'Michael travaille avec Claude dans une session interactive, ou une horloge déclenche une routine à sa place. La session exécute directement, ou cadre d’abord une mission autonome qu’une routine mènera seule.',
    en: 'Michael works with Claude in an interactive session, or a clock fires a routine in his place. The session either executes directly, or first scopes an autonomous mission that a routine will then run on its own.',
  },
  p1Texte2: {
    fr: 'Routines et missions délèguent les tâches précises à des agents spécialisés, qui ne commitent jamais. Le résultat s’accumule en commits sur une branche, qui devient une pull request.',
    en: 'Routines and missions hand off precise tasks to specialised agents, which never commit. The result piles up as commits on a branch, which becomes a pull request.',
  },
  p1Texte3: {
    fr: 'Une seule porte mène au site : Michael fusionne la pull request. Dès que la branche main change, Vercel publie. Rien n’y arrive autrement.',
    en: 'Only one door leads to the site: Michael merges the pull request. The moment the main branch changes, Vercel publishes it. Nothing reaches it any other way.',
  },

  // ---------- Partie 2 — Le personnel ----------
  p2Titre: { fr: 'Le personnel', en: 'Staff' },
  p2OuvertureTexte: {
    fr: 'Huit postes : le rédacteur qui écrit, et sept agents qui l’assistent. Aucun agent ne commite : ils lisent, vérifient, collectent ou tranchent, puis rendent leur réponse à la session qui les a appelés.',
    en: 'Eight posts: the rédacteur who writes, and seven agents that assist it. No agent commits: they read, check, gather or settle a question, then report back to the session that called them.',
  },
  p2RedacteurFicheN: { fr: 'Fiche agent n° 0', en: 'Staff card no. 0' },
  p2RedacteurTitre: { fr: 'Le rédacteur', en: 'The rédacteur' },
  p2RedacteurRole: {
    fr: 'Écrit le code et les textes, puis appelle les agents qui l’assistent. C’est lui qui tient la plume : aucun agent ne rédige.',
    en: 'Writes the code and the texts, then calls the agents that assist it. It holds the pen: no agent drafts anything.',
  },
  p2RedacteurQui: {
    fr: 'en session interactive avec Michael : Opus · dans les routines et les missions : Sonnet',
    en: 'in an interactive session with Michael: Opus · in routines and missions: Sonnet',
  },
  p2RedacteurAppelle: {
    fr: 'le controleur, le relecteur, la secrétaire, le veilleur, le vérificateur, l’explorateur, l’expert, selon le travail',
    en: 'the controleur, the relecteur, the secretaire, the veilleur, the verificateur, the explorateur, the expert, depending on the task',
  },
  p2RedacteurJamais: { fr: 'fusionner, pousser main hors des exceptions écrites', en: 'merge, push main outside the written exceptions' },
  p2RedacteurAttention: { fr: 'Seule la session principale commite ; les agents, jamais.', en: 'Only the main session commits; agents never do.' },
  p2RedacteurEcran: [
    { fr: '> routine oracle-du-matin', en: '> routine oracle-du-matin' },
    { fr: 'rédaction .......... en cours', en: 'drafting ............ in progress' },
    { fr: '→ veilleur .......... actualité collectée', en: '→ veilleur ........... news gathered', ok: true },
    { fr: '→ relecteur ......... sources vérifiées', en: '→ relecteur .......... sources checked', ok: true },
    { fr: '→ secrétaire ........ forme relue', en: '→ secretaire .......... copy-edited', ok: true },
  ],
  p2ControleurFicheN: { fr: 'Fiche agent n° 1', en: 'Staff card no. 1' },
  p2ControleurTitre: { fr: 'Le controleur', en: 'The controleur' },
  p2ControleurTexte: {
    fr: 'Dernier poste avant la sortie. Il rend un verdict — OK, ATTENTION ou BLOQUANT — et ne répare rien : il signale, l’atelier corrige.',
    en: 'The last post before the exit. It returns a verdict — OK, ATTENTION or BLOQUANT — and fixes nothing: it reports, the workshop corrects.',
  },
  p2ControleurAppele: { fr: 'avant chaque pull request, même la plus petite (fig. 7, A)', en: 'before every pull request, even the smallest one (fig. 7, A)' },
  p2ControleurControle: {
    fr: 'le build, les secrets, les fichiers interdits, l’accord entre contenu et branche (B)',
    en: 'the build, secrets, forbidden files, and whether the content matches the branch (B)',
  },
  p2ControleurJamais: { fr: 'corriger, commiter, pousser', en: 'fix, commit, push' },
  p2ControleurAttention: {
    fr: 'Une pull request sans tampon OK ou ATTENTION est refusée d’office par le mod garde-controleur. Un commit de plus après son passage, et il faut repasser.',
    en: 'A pull request without an OK or ATTENTION stamp is refused outright by the garde-controleur mod. One more commit after it ran, and it has to run again.',
  },
  p2ControleurEcran: [
    { fr: '> controleur auto/atelier', en: '> controleur auto/atelier' },
    { fr: 'build ........ OK', en: 'build ........ OK', ok: true },
    { fr: 'secrets ...... aucun', en: 'secrets ...... none', ok: true },
    { fr: 'contenu ...... conforme', en: 'content ...... matches', ok: true },
  ],
  p2ControleurVerdict: { fr: 'VERDICT : OK', en: 'VERDICT: OK' },
  p2ControleurNoteFig: { fr: 'Fig. 8 — Sortie écran d’un contrôle réussi.', en: 'Fig. 8 — Screen output of a successful check.' },
  p2Chap: { fr: 'Chap. 2 — Le personnel', en: 'Chap. 2 — Staff' },

  p2Agents: [
    {
      nom: 'relecteur', ficheN: 2, titre: { fr: 'Le relecteur', en: 'The relecteur' },
      texte: {
        fr: 'Rouvre chaque source d’un numéro avant publication et vérifie chaque chiffre, date, nom et disponibilité. Ne fait confiance qu’au texte de la source, jamais à sa mémoire.',
        en: 'Reopens every source of an issue before publication and checks every figure, date, name and availability claim. Trusts only the source’s own text, never memory.',
      },
      appele: { fr: 'avant publication de l’Oracle du Matin et des idées du dimanche', en: 'before publishing the Morning Oracle and the Sunday ideas' },
      jamais: { fr: 'modifier le texte, écrire un article', en: 'edit the text, write an article' },
      modele: 'Sonnet',
    },
    {
      nom: 'secretaire', ficheN: 3, titre: { fr: 'La secrétaire', en: 'The secretaire' },
      texte: {
        fr: 'Relit la forme des textes publiés : orthographe et typographie françaises, traductions anglaises manquantes ou fautives, renvois de pages et sommaire.',
        en: 'Copy-edits the form of published texts: French spelling and typography, missing or faulty English translations, page references and the table of contents.',
      },
      appele: { fr: 'avant publication (numéro, Oracle du Matin, édito, idées, interface)', en: 'before publication (issue, Morning Oracle, editorial, ideas, interface)' },
      jamais: { fr: 'vérifier les faits — c’est le relecteur —, modifier un fichier', en: 'check facts — that is the relecteur’s job —, edit a file' },
      modele: 'Sonnet',
    },
    {
      nom: 'veilleur', ficheN: 4, titre: { fr: 'Le veilleur', en: 'The veilleur' },
      texte: {
        fr: 'Collecte les nouveautés d’une fenêtre de dates sur des sources officielles, pour l’Oracle du Matin et les idées du dimanche. Ne rédige aucun article.',
        en: 'Gathers what is new over a date window from official sources, for the Morning Oracle and the Sunday ideas. Never drafts an article.',
      },
      appele: { fr: 'par les routines Oracle et idées', en: 'by the Oracle and ideas routines' },
      jamais: { fr: 'rédiger un article, se fier à sa mémoire plutôt qu’à la source', en: 'draft an article, trust memory over the source' },
      modele: 'Haiku',
    },
    {
      nom: 'verificateur', ficheN: 5, titre: { fr: 'Le vérificateur', en: 'The verificateur' },
      texte: {
        fr: 'Contrôle le site dans le navigateur : rendu des pages, erreurs console, valeurs calculées des styles. Sépare toujours le symptôme constaté de la cause vérifiée.',
        en: 'Checks the site in the browser: page rendering, console errors, computed style values. Always separates the observed symptom from the verified cause.',
      },
      appele: { fr: 'à la vérification finale d’une mission', en: 'at a mission’s final check' },
      jamais: { fr: 'corriger le code source', en: 'fix the source code' },
      modele: 'Haiku',
    },
    {
      nom: 'explorateur', ficheN: 6, titre: { fr: 'L’explorateur', en: 'The explorateur' },
      texte: {
        fr: 'Recherche en lecture seule dans le code : où une valeur est utilisée, inventaire de fichiers. Répond par une liste courte, sans analyse ni recommandation.',
        en: 'Read-only search through the code: where a value is used, a file inventory. Answers with a short list, no analysis or recommendation.',
      },
      appele: { fr: 'par les missions et la session interactive', en: 'by missions and the interactive session' },
      jamais: { fr: 'modifier un fichier', en: 'edit a file' },
      modele: 'Haiku',
    },
    {
      nom: 'expert', ficheN: 7, titre: { fr: 'L’expert', en: 'The expert' },
      texte: {
        fr: 'N’intervient qu’après deux échecs de la session principale sur le même problème, ou pour trancher une décision d’architecture absente de la SPEC.',
        en: 'Steps in only after the main session has failed twice on the same problem, or to settle an architecture decision the SPEC leaves open.',
      },
      appele: { fr: 'rarement, en dernier recours', en: 'rarely, as a last resort' },
      jamais: { fr: 'être appelé pour une première tentative', en: 'get called for a first attempt' },
      modele: 'Opus',
    },
  ],

  // ---------- Partie 3 — Les automates ----------
  p3Titre: { fr: 'Les automates', en: 'The automated routines' },
  p3OuvertureTexte: {
    fr: 'Cinq automates tournent à heure fixe ou sur un déclencheur, sans que Michael ouvre une session. Chacun produit quelque chose de vérifiable ; aucun ne fusionne sur main.',
    en: 'Five automatons run on a schedule or a trigger, without Michael opening a session. Each one produces something verifiable; none of them ever merges into main.',
  },
  p3Chap: { fr: 'Chap. 3 — Les automates', en: 'Chap. 3 — The automated routines' },
  p3HoraireK: { fr: 'Horaire', en: 'Schedule' },
  p3ModeleK: { fr: 'Modèle', en: 'Model' },
  p3ProduitK: { fr: 'Produit', en: 'Output' },
  p3MichaelK: { fr: 'Reste à Michael', en: 'Left to Michael' },

  p3Routines: [
    {
      titre: { fr: 'L’Oracle du Matin', en: 'The Morning Oracle' },
      horaire: { fr: 'chaque jour, 5 h 30', en: 'daily, 5:30 am' },
      modele: 'Sonnet',
      produit: {
        fr: 'PDF FR/EN (A4 recto verso), pull request auto/breves-<date> avec le numéro complet et les brèves, une notification',
        en: 'FR/EN PDF (A4, both sides), auto/breves-<date> pull request with the full issue and the briefs, a notification',
      },
      michael: { fr: 'fusionner la pull request, le plus souvent depuis l’iPhone', en: 'merge the pull request, usually from the iPhone' },
      texte: {
        fr: 'La routine appelle le veilleur (actualité IA des dernières 72 h, tech 7 jours) puis le relecteur, qui rouvre chaque source. Elle prépare tout dans un dossier à part (un « worktree »), jamais dans le dossier de travail, pour ne jamais changer de branche sous les pieds de Michael.',
        en: 'The routine calls the veilleur (AI news from the last 72 h, tech from the last 7 days) then the relecteur, who reopens every source. It prepares everything in a separate folder (a “worktree”), never in the working folder, so it never switches branches under Michael’s feet.',
      },
    },
    {
      titre: { fr: 'Les missions autonomes', en: 'Autonomous missions' },
      horaire: { fr: 'toutes les 2 h', en: 'every 2 hours' },
      modele: 'Sonnet',
      produit: { fr: 'des commits sur la branche auto/<nom>, un RAPPORT.md à la fin', en: 'commits on the auto/<name> branch, a RAPPORT.md at the end' },
      michael: {
        fr: 'clôturer avec Claude : vérifier, pousser la branche, ouvrir la pull request, fusionner',
        en: 'wrap up with Claude: check, push the branch, open the pull request, merge',
      },
      texte: {
        fr: 'Une mission se cadre d’abord avec Michael (SPEC et PLAN), puis la routine l’exécute seule, étape par étape, en déléguant selon ce que le PLAN indique. Quand la file est vide, la tâche s’éteint pour ne rien consommer.',
        en: 'A mission is first scoped with Michael (SPEC and PLAN), then the routine runs it alone, step by step, delegating as the PLAN directs. When the queue is empty, the task switches itself off so it costs nothing.',
      },
    },
    {
      titre: { fr: 'Les idées du dimanche', en: 'Sunday ideas' },
      horaire: { fr: 'dimanche, 19 h', en: 'Sunday, 7 pm' },
      modele: 'Sonnet',
      produit: {
        fr: 'des fiches P-NNN publiques par pull request, des notes économiques dans le dépôt privé',
        en: 'public P-NNN cards by pull request, business notes in the private repo',
      },
      michael: { fr: 'garder ou arrêter chaque idée, en tour de contrôle', en: 'keep or drop each idea, in the control tower' },
      texte: {
        fr: 'La routine trie d’abord le carnet, puis cherche avec le veilleur et vérifie les chiffres avec le relecteur.',
        en: 'The routine first sorts the notebook, then searches with the veilleur and checks the figures with the relecteur.',
      },
    },
    {
      titre: { fr: 'Le carnet', en: 'The notebook' },
      horaire: { fr: 'à tout moment', en: 'any time' },
      modele: '—',
      produit: { fr: 'une ligne dans la boîte du carnet, triée le dimanche', en: 'a line in the notebook inbox, sorted on Sunday' },
      michael: { fr: 'écrire « note : … » dans n’importe quelle session', en: 'write “note: …” in any session' },
      texte: {
        fr: 'La session en cours répond « Noté. » et reprend ce qu’elle faisait. Le dimanche, la routine des idées trie la boîte et oriente chaque note vers une idée P-NNN, un sujet du journal ou une mission.',
        en: 'The current session answers “Noted.” and carries on. On Sunday, the ideas routine sorts the inbox and routes each note toward a P-NNN idea, a newspaper topic or a mission.',
      },
    },
    {
      titre: { fr: 'Le retour de routine', en: 'Routine report' },
      horaire: { fr: 'à la fin de chaque routine', en: 'at the end of every routine' },
      modele: '—',
      produit: { fr: 'un résumé déposé dans une boîte aux lettres', en: 'a summary dropped in a mailbox' },
      michael: { fr: 'rien : la tour de contrôle relève et résume', en: 'nothing: the control tower checks it and sums it up' },
      texte: {
        fr: 'Un mod (du code, pas un modèle) intercepte la fin de chaque routine et dépose son résumé. La tour de contrôle, quand elle est ouverte, relève la boîte chaque minute et résume à Michael ce qui est fait et ce qui attend.',
        en: 'A mod (code, not a model) catches the end of every routine and drops its summary. The control tower, while it is open, checks the mailbox every minute and sums up for Michael what is done and what is waiting.',
      },
    },
  ],

  p3TableTitre: { fr: 'Horaires de marche', en: 'Operating schedule' },
  p3TableCols: { fr: ['Automate', 'Horaire', 'Modèle'], en: ['Routine', 'Schedule', 'Model'] },
  p3TableRows: [
    [{ fr: 'L’Oracle du Matin', en: 'The Morning Oracle' }, { fr: 'chaque jour, 5 h 30', en: 'daily, 5:30 am' }, 'Sonnet'],
    [{ fr: 'Missions autonomes', en: 'Autonomous missions' }, { fr: 'toutes les 2 h', en: 'every 2 hours' }, 'Sonnet'],
    [{ fr: 'Idées du dimanche', en: 'Sunday ideas' }, { fr: 'dimanche, 19 h', en: 'Sunday, 7 pm' }, 'Sonnet'],
    [{ fr: 'Carnet', en: 'Notebook' }, { fr: 'à tout moment', en: 'any time' }, '—'],
    [{ fr: 'Retour de routine', en: 'Routine report' }, { fr: 'fin de chaque routine', en: 'end of every routine' }, '—'],
  ],

  // ---------- Partie 4 — Les missions autonomes ----------
  p4Titre: { fr: 'Les missions autonomes', en: 'Autonomous missions' },
  p4OuvertureTexte: {
    fr: 'Une mission, c’est un travail délégué : Michael donne un brief, une session le cadre en SPEC et PLAN, puis une tâche programmée l’exécute seule, étape par étape, jusqu’à la pull request. Il ne reste à Michael qu’à fusionner.',
    en: 'A mission is delegated work: Michael gives a brief, a session frames it as a SPEC and a PLAN, then a scheduled task runs it alone, step by step, through to the pull request. All that is left for Michael is to merge.',
  },
  p4Chap: { fr: 'Chap. 4 — Les missions autonomes', en: 'Chap. 4 — Autonomous missions' },
  p4FigLegende: { fr: 'Fig. 9 — Le cycle d’une mission', en: 'Fig. 9 — The cycle of a mission' },
  p4Cartouche: { fr: 'Du cadrage à la fusion, puis la mission suivante.', en: 'From scoping to merge, then the next mission.' },
  p4Texte1: {
    fr: 'Le cadrage se fait avec Michael, en session interactive. La tâche programmée, elle, ne pose jamais de question : elle reprend la plus ancienne mission sans rapport, exécute ses étapes dans l’ordre du plan, et consigne tout sur le disque à chaque étape — pour pouvoir s’arrêter et reprendre à tout moment.',
    en: 'Scoping happens with Michael, in an interactive session. The scheduled task itself never asks a question: it picks up the oldest mission without a report, runs its steps in plan order, and writes everything to disk at every step — so it can stop and resume at any time.',
  },
  p4Texte2: {
    fr: 'Reprise après une coupure de quota : le plan coché, le fichier de progression et un commit par étape suffisent à savoir où on en était. La tâche programmée relance le travail toutes les deux heures.',
    en: 'Resuming after a quota cut-off: the checked-off plan, the progress file and a commit per step are enough to know where things stood. The scheduled task relaunches the work every two hours.',
  },
  p4FichiersTitre: { fr: 'Les six fichiers d’une mission', en: 'The six files of a mission' },
  p4FichiersTexte: {
    fr: 'Une mission vit entièrement dans un dossier, sur sa propre branche. Six fichiers suffisent à la cadrer, la suivre et la clore.',
    en: 'A mission lives entirely in one folder, on its own branch. Six files are enough to scope it, track it and close it out.',
  },
  p4FichiersCols: { fr: ['Fichier', 'Rôle'], en: ['File', 'Role'] },
  p4FichiersRows: [
    ['SPEC.md', { fr: 'Objectif, décisions d’architecture, critères d’acceptation. Ne se modifie pas en cours de route.', en: 'Goal, architecture decisions, acceptance criteria. Never edited once work starts.' }],
    ['PLAN.md', { fr: 'Étapes à cocher au fur et à mesure, chacune avec son agent et son modèle.', en: 'Steps checked off one by one, each with its agent and model.' }],
    ['PROGRESS.md', { fr: 'État courant : où on en est, prochaine action, blocages. Réécrit à chaque étape.', en: 'Current state: where things stand, next action, blockers. Rewritten at every step.' }],
    ['DECISIONS.md', { fr: 'Chaque décision prise sans Michael, avec sa raison.', en: 'Every decision made without Michael, with its reason.' }],
    ['DELEGATIONS.md', { fr: 'Journal de chaque sous-agent lancé : agent, modèle, tâche, résultat.', en: 'A log of every sub-agent launched: agent, model, task, result.' }],
    ['RAPPORT.md', { fr: 'Écrit à la fin : ce qui est fait, ce qui ne l’est pas, comment vérifier.', en: 'Written at the end: what is done, what is not, how to check.' }],
  ],
  p4QueueTitre: { fr: 'La file d’attente et la reprise', en: 'The queue and resuming' },
  p4QueueTexte1: {
    fr: 'Plusieurs missions peuvent être cadrées d’avance : chacune vit sur sa propre branche auto/<nom>, partie de main, et donne sa propre pull request. La tâche programmée cherche les missions dans les branches, jamais dans le dossier ouvert, prend la plus ancienne sans rapport, puis enchaîne sur la suivante s’il reste du quota.',
    en: 'Several missions can be scoped ahead of time: each one lives on its own auto/<name> branch, off main, and gets its own pull request. The scheduled task looks for missions in the branches, never in the open folder, picks the oldest one without a report, then chains to the next if quota remains.',
  },
  p4QueueTexte2: {
    fr: 'Premier usage de la file : deux missions exécutées à la suite, en une seule fois, en une trentaine de minutes.',
    en: 'First use of the queue: two missions run back to back, in a single pass, in about thirty minutes.',
  },
  p4ModeleTitre: { fr: 'Le modèle par étape', en: 'The model per step' },
  p4ModeleTexte: {
    fr: 'Chaque étape du plan porte son modèle, choisi au cadrage selon sa difficulté. La tâche programmée suit cette indication et peut appeler l’expert en plus, jamais en moins.',
    en: 'Every step of the plan carries its own model, chosen at scoping time to fit its difficulty. The scheduled task follows this indication and may call the expert in addition, never instead.',
  },
  p4ModeleCols: { fr: ['Poste', 'Modèle', 'Quand'], en: ['Post', 'Model', 'When'] },
  p4ModeleRows: [
    [{ fr: 'Session principale', en: 'Main session' }, 'Sonnet', { fr: 'exécution du plan, étape par étape', en: 'runs the plan, step by step' }],
    [{ fr: 'Sous-agent mécanique', en: 'Mechanical sub-agent' }, 'Haiku', { fr: 'étape bien décrite : renommage, valeurs listées, donnée au format existant', en: 'well-specified step: renaming, listed values, data in an existing format' }],
    [{ fr: 'Explorateur', en: 'Explorateur' }, 'Haiku', { fr: 'recherche large dans le code, inventaires', en: 'broad code search, inventories' }],
    [{ fr: 'Vérificateur', en: 'Verificateur' }, 'Haiku', { fr: 'contrôle des pages dans le navigateur', en: 'checking pages in the browser' }],
    [{ fr: 'Controleur', en: 'Controleur' }, 'Haiku', { fr: 'avant chaque pull request', en: 'before every pull request' }],
    [{ fr: 'Expert', en: 'Expert' }, 'Opus', { fr: 'après deux échecs, ou décision d’architecture', en: 'after two failures, or an architecture decision' }],
  ],
  p4CasTitre: { fr: 'Cas d’école : la première mission', en: 'Case study: the first mission' },
  p4CasTexte: {
    fr: 'La toute première mission a été cadrée sur Opus, puis lancée pour vérifier que le système tenait debout. Elle a tourné seule, sans aucune question posée, jusqu’à son rapport.',
    en: 'The very first mission was scoped on Opus, then launched to check that the system actually held up. It ran on its own, asking no question, through to its report.',
  },
  p4CasEcran: [
    { fr: '> tâche programmée, lancée 23 h 09', en: '> scheduled task, started 11:09 pm' },
    { fr: '7 commits ..... un par étape (2 à 8)', en: '7 commits ..... one per step (2 to 8)', ok: true },
    { fr: 'durée ......... 13 min, 50 tours', en: 'duration ...... 13 min, 50 turns', ok: true },
    { fr: 'terminée ...... 23 h 22, RAPPORT.md écrit', en: 'finished ...... 11:22 pm, RAPPORT.md written', ok: true },
  ],
  p4CasNoteFig: {
    fr: 'Clôturée ensuite avec Michael : push, prévisualisation, première pull request, fusion.',
    en: 'Then wrapped up with Michael: push, preview, first pull request, merge.',
  },

  // ---------- Partie 5 — Les accessoires ----------
  p5Titre: { fr: 'Les accessoires', en: 'Accessories' },
  p5Chap: { fr: 'Chap. 5 — Les accessoires', en: 'Chap. 5 — Accessories' },
  p5OuvertureTexte: {
    fr: 'Quatre mods, un skill et trois connexions complètent l’atelier. Aucun n’écrit à ma place : ils préparent, vérifient ou signalent.',
    en: 'Four mods, one skill and three connections round out the workshop. None of them writes in my place: they prepare, check or flag.',
  },
  p5ModsIntro: {
    fr: 'Un mod est un petit programme qui s’accroche à Claude Code : il voit passer chaque commande et chaque fin de tour, et peut afficher un panneau. Il ne consomme aucun token — c’est du code, pas un modèle. Les quatre mods se chargent dans toutes les sessions, y compris les routines.',
    en: 'A mod is a small program that plugs into Claude Code: it sees every command and every end of turn go by, and can draw a panel. It uses no tokens — it is code, not a model. All four mods load in every session, routines included.',
  },
  p5OuLabel: { fr: 'Où il agit', en: 'Where it acts' },
  p5QuandLabel: { fr: 'Quand', en: 'When' },
  p5FaitLabel: { fr: 'Ce qu’il fait', en: 'What it does' },
  p5Mods: [
    {
      nom: 'garde-git', commande: '/garde-git',
      ou: { fr: 'Dans chaque session, avant chaque commande touchant git, gh ou vercel.', en: 'In every session, before every command touching git, gh or vercel.' },
      quand: { fr: 'Dès que la commande part.', en: 'The moment the command fires.' },
      fait: {
        fr: 'Bloque le push forcé partout. Dans une routine, bloque aussi : commit hors d’une branche auto/*, push d’autre chose que les branches de l’Oracle et des idées, merge, rebase, fusion de PR, déploiement.',
        en: 'Blocks force-pushes everywhere. In a routine it also blocks: commits outside an auto/* branch, pushing anything but the Oracle and ideas branches, merge, rebase, merging a PR, deploying.',
      },
    },
    {
      nom: 'retour-routine', commande: '/tour-de-controle',
      ou: { fr: 'Dans les routines (dépôt) et la tour de contrôle (relève).', en: 'In routines (drop-off) and the control tower (pick-up).' },
      quand: { fr: 'À la fin de chaque tour d’une routine.', en: 'At the end of every routine turn.' },
      fait: {
        fr: 'Dépose le résumé de la routine dans une boîte aux lettres. La session désignée comme tour de contrôle la relève chaque minute et résume à Michael.',
        en: 'Drops the routine’s summary in a mailbox. The session set as control tower checks it every minute and sums it up for Michael.',
      },
    },
    {
      nom: 'kiosque', commande: '/kiosque',
      ou: { fr: 'Un panneau à côté de la conversation.', en: 'A panel next to the conversation.' },
      quand: { fr: 'À l’ouverture, puis toutes les 10 minutes.', en: 'When opened, then every 10 minutes.' },
      fait: {
        fr: 'Affiche l’état de l’Oracle du jour, les missions en cours avec leurs étapes cochées, les missions à clôturer et les pull requests ouvertes. Lu directement dans git et GitHub.',
        en: 'Shows today’s Oracle status, running missions with their ticked steps, missions to wrap up and open pull requests. Read straight from git and GitHub.',
      },
    },
    {
      nom: 'garde-controleur', commande: '/garde-controleur',
      ou: { fr: 'Dans chaque session, avant l’ouverture d’une pull request.', en: 'In every session, before a pull request is opened.' },
      quand: { fr: 'Sauf les routines de l’Oracle et des idées.', en: 'Except the Oracle and ideas routines.' },
      fait: {
        fr: 'Refuse la PR tant que le controleur n’a pas posé son tampon, OK ou ATTENTION, sur la version exacte de la branche. Un commit de plus après son passage, et il faut repasser.',
        en: 'Refuses the PR until the controleur has stamped the exact version of the branch, OK or ATTENTION. One more commit after it ran, and it has to run again.',
      },
    },
  ],

  p5SkillTitre: { fr: 'Le skill /mission', en: 'The /mission skill' },
  p5SkillTexte: {
    fr: 'Michael tape /mission, écrit « mission : … », ou dit qu’une mission est terminée. Le skill regarde le dossier de travail et choisit un mode.',
    en: 'Michael types /mission, writes “mission: …”, or says a mission is done. The skill looks at the working folder and picks a mode.',
  },
  p5SkillModeCols: { fr: ['Mode', 'Déclencheur'], en: ['Mode', 'Trigger'] },
  p5SkillModes: [
    [{ fr: 'Nouveau projet', en: 'New project' }, { fr: 'dossier vide, ou Michael décrit une idée', en: 'empty folder, or Michael describes an idea' }],
    [{ fr: 'Installation', en: 'Installation' }, { fr: 'projet existant sans section « Missions autonomes »', en: 'existing project without an “Autonomous missions” section' }],
    [{ fr: 'Lancement', en: 'Launch' }, { fr: 'projet déjà installé, plus un brief', en: 'already installed project, plus a brief' }],
    [{ fr: 'Clôture', en: 'Wrap-up' }, { fr: 'Michael dit qu’une mission est terminée ou à fusionner', en: 'Michael says a mission is done or ready to merge' }],
  ],
  p5SkillTexte2: {
    fr: 'Au lancement, le skill cadre SPEC.md, PLAN.md et les fichiers de suivi, crée la branche auto/<nom>, puis réactive la tâche programmée — elle s’était mise en pause faute de mission à traiter.',
    en: 'On launch, the skill scopes SPEC.md, PLAN.md and the tracking files, creates the auto/<name> branch, then re-enables the scheduled task — it had paused itself for lack of a mission to run.',
  },

  p5ConnexTitre: { fr: 'Les connexions utiles', en: 'Useful connections' },
  p5ConnexNavTitre: { fr: 'Le navigateur intégré', en: 'The built-in browser' },
  p5ConnexNavTexte: {
    fr: 'En session interactive, la vérification se fait dans une prévisualisation « dev ». Une routine n’y a pas droit : elle est refusée en session non surveillée. La routine lance alors sa propre prévisualisation du build et vérifie dedans.',
    en: 'In an interactive session, checking happens in a “dev” preview. A routine has no right to it: it is refused in an unsupervised session. The routine then starts its own preview of the build and checks there instead.',
  },
  p5ConnexFigmaTitre: { fr: 'Figma', en: 'Figma' },
  p5ConnexFigmaTexte: {
    fr: 'Workflow conçu comme bidirectionnel entre Figma et Claude Code : les maquettes peuvent partir de Figma ou du code.',
    en: 'A workflow designed to run both ways between Figma and Claude Code: mockups can start in Figma or in the code.',
  },
  p5ConnexLightpandaTitre: { fr: 'Lightpanda, en secours', en: 'Lightpanda, as a fallback' },
  p5ConnexLightpandaTexte: {
    fr: 'Un navigateur sans affichage, pour les agents. L’outil de lecture habituel renvoie un résumé ; Lightpanda renvoie la page entière, utile quand l’outil habituel est refusé (erreur 403). Gratuit, open source, tourne sur le Mac, télémétrie coupée.',
    en: 'A headless browser, for agents. The usual reading tool returns a summary; Lightpanda returns the whole page, useful when the usual tool is refused (a 403 error). Free, open source, runs on the Mac, telemetry switched off.',
  },

  // ---------- Partie 6 — Réglages et consommation ----------
  p6Titre: { fr: 'Réglages et consommation', en: 'Settings and consumption' },
  p6Chap: { fr: 'Chap. 6 — Réglages et consommation', en: 'Chap. 6 — Settings and consumption' },
  p6OuvertureTexte: {
    fr: 'L’abonnement a une limite glissante de 5 heures. Tant que l’usage supplémentaire payant n’est pas activé, l’atelier ne coûte rien de plus : il travaille juste plus lentement, et partage le quota du travail quotidien — idéal la nuit.',
    en: 'The subscription has a rolling 5-hour limit. As long as paid extra usage isn’t switched on, the workshop costs nothing more: it just works more slowly, sharing quota with everyday work — ideal overnight.',
  },
  p6LeviersTitre: { fr: 'Les vrais leviers sur le quota', en: 'The real quota levers' },
  p6Leviers: [
    { fr: 'Choisir le modèle selon la tâche : Sonnet par défaut, Opus pour le difficile.', en: 'Picking the model to fit the task: Sonnet by default, Opus for hard work.' },
    { fr: 'Contexte court : une tâche, une session ; on efface entre deux sujets.', en: 'Short context: one task, one session; clear it between topics.' },
    { fr: 'Éviter les opérations coûteuses : lire le texte plutôt qu’une capture d’écran.', en: 'Avoiding costly operations: reading text rather than a screenshot.' },
    { fr: 'Des sous-agents pour les explorations larges, à contexte vierge.', en: 'Sub-agents for broad explorations, with a clean context.' },
  ],
  p6LeviersNote: {
    fr: 'Un sous-agent reste un coût réel : ses tokens comptent aussi. Le vrai gain, c’est d’alléger le contexte principal.',
    en: 'A sub-agent is still a real cost: its tokens also count. The real gain is lightening the main context.',
  },

  p6EconomieTitre: { fr: 'Économiser les tokens', en: 'Cutting token usage' },
  p6EconomieTexte: {
    fr: 'Objectif : diminuer le coût en tokens du système, en restant aussi efficace. Quatre postes, par ordre d’impact.',
    en: 'Goal: cut the system’s token cost while staying just as effective. Four areas, by order of impact.',
  },
  p6EconomieCols: { fr: ['Poste', 'Avant', 'Après'], en: ['Area', 'Before', 'After'] },
  p6EconomieRows: [
    [
      { fr: 'Tâche programmée', en: 'Scheduled task' },
      { fr: 'Tournait toutes les 2 h même sans mission : chaque lancement chargeait tout le contexte pour répondre « Aucune mission active ».', en: 'Ran every 2 h even with no mission: every launch loaded the whole context just to answer “No active mission”.' },
      { fr: 'Se met en pause toute seule quand la file est vide ; la session de cadrage la réactive.', en: 'Pauses itself when the queue is empty; the scoping session re-enables it.' },
    ],
    [
      { fr: 'Reprise d’une mission', en: 'Resuming a mission' },
      { fr: 'Relecture de tous les fichiers, y compris les journaux qui grossissent à chaque étape.', en: 'Rereading every file, including the logs that grow at every step.' },
      { fr: 'SPEC, PLAN et PROGRESS seulement ; les journaux ne se relisent pas.', en: 'SPEC, PLAN and PROGRESS only; the logs are never reread.' },
    ],
    [
      { fr: 'Build et lint', en: 'Build and lint' },
      { fr: 'Confiés à un sous-agent, qui démarre à froid pour une seule commande.', en: 'Handed to a sub-agent, which starts cold for a single command.' },
      { fr: 'Lancés directement par la session principale.', en: 'Run directly by the main session.' },
    ],
  ],
  p6EconomieNote: {
    fr: 'Non retenus : Gemini dans le navigateur (plus cher qu’il ne fait gagner) et l’IA locale (déjà écartée). Un outil de plus, Lightpanda, ne fait pas gagner de tokens mais lit ce que l’outil habituel refuse (erreur 403) — en secours seulement.',
    en: 'Rejected: Gemini in the browser (costs more than it saves) and local AI (already ruled out). One more tool, Lightpanda, saves no tokens but reads what the usual tool refuses (a 403 error) — a fallback only.',
  },

  p6ModeleTitre: { fr: 'Quel modèle pour quel travail', en: 'Which model for which job' },
  p6ModeleCols: { fr: ['Rôle', 'Modèle', 'Quand'], en: ['Role', 'Model', 'When'] },
  p6ModeleRows: [
    [{ fr: 'Architecte : cadrage, spec, plan', en: 'Architect: scoping, spec, plan' }, 'Opus', { fr: 'une fois, au lancement, en session avec Michael', en: 'once, at launch, in session with Michael' }],
    [{ fr: 'Chef de projet / développeur', en: 'Project lead / developer' }, 'Sonnet', { fr: 'toutes les exécutions programmées', en: 'every scheduled execution' }],
    [{ fr: 'Exécutants : explorateur, vérificateur', en: 'Executors: explorateur, verificateur' }, 'Haiku', { fr: 'recherche dans le code ; contrôles dans le navigateur', en: 'code search; checks in the browser' }],
    [{ fr: 'Expert', en: 'Expert' }, 'Opus', { fr: 'étape délicate, ou après deux échecs', en: 'a delicate step, or after two failures' }],
  ],

  // ---------- Partie 7 — Pannes et dépannage ----------
  p7Titre: { fr: 'Pannes et dépannage', en: 'Troubleshooting' },
  p7Chap: { fr: 'Chap. 7 — Pannes et dépannage', en: 'Chap. 7 — Troubleshooting' },
  p7OuvertureTexte: {
    fr: 'Sept pannes rencontrées, lues comme une notice de dépannage : le symptôme constaté, sa cause, et le remède appliqué.',
    en: 'Seven breakdowns encountered, read like a troubleshooting notice: the observed symptom, its cause, and the fix applied.',
  },
  p7Cols: { fr: ['Symptôme', 'Cause', 'Remède'], en: ['Symptom', 'Cause', 'Fix'] },
  p7Rows1: [
    [
      { fr: 'L’IA locale ne faisait pas vraiment gagner de quota', en: 'Local AI wasn’t really saving quota' },
      { fr: 'Le script renvoyait tout dans le terminal (Claude recopiait puis relisait), affichait son raisonnement, et le calcul de coût mesurait les mauvais tokens', en: 'The script printed everything to the terminal (Claude had to copy it back in, then reread it), showed its reasoning, and the cost calculation measured the wrong tokens' },
      { fr: 'Abandon de l’IA locale (Lily)', en: 'Dropping local AI (Lily)' },
    ],
    [
      { fr: 'La session s’arrête et ne peut pas se relancer seule', en: 'The session stops and cannot relaunch itself' },
      { fr: 'Limite glissante de 5 heures de l’abonnement Pro', en: 'The Pro subscription’s rolling 5-hour limit' },
      { fr: 'État écrit sur le disque (plan coché, PROGRESS.md, un commit par étape) ; la tâche programmée relance toutes les 2 heures et relit SPEC, PLAN, PROGRESS', en: 'State written to disk (checked-off plan, PROGRESS.md, a commit per step); the scheduled task relaunches every 2 hours and rereads SPEC, PLAN, PROGRESS' },
    ],
  ],
  p7Rows2: [
    [
      { fr: 'Un sous-agent ne rend aucun verdict', en: 'A sub-agent returns no verdict' },
      { fr: 'Son lancement a raté', en: 'Its launch failed' },
      { fr: 'Une seule nouvelle tentative, puis faire l’étape soi-même, noté dans DECISIONS.md et DELEGATIONS.md', en: 'One more attempt only, then do the step directly, noted in DECISIONS.md and DELEGATIONS.md' },
    ],
    [
      { fr: 'Le passage d’une routine s’arrête à moitié', en: 'A routine’s turn stops halfway through' },
      { fr: 'Un sous-agent lancé en arrière-plan : la session principale termine son tour pendant qu’il travaille encore', en: 'A sub-agent launched in the background: the main session ends its turn while it is still working' },
      { fr: 'Toujours lancer un sous-agent au premier plan, dans une routine', en: 'Always launch a sub-agent in the foreground, inside a routine' },
    ],
    [
      { fr: 'Une demande d’autorisation à laquelle personne ne répond', en: 'A permission request nobody answers' },
      { fr: 'Commande shell composée (&&, ;, boucle, $(…), heredoc), non reconnue par les autorisations', en: 'A compound shell command (&&, ;, a loop, $(…), a heredoc), not recognised by the permissions' },
      { fr: 'Une seule commande shell simple par appel', en: 'One single, simple shell command per call' },
    ],
  ],
  p7Rows3: [
    [
      { fr: 'Premier essai Gemini : échec', en: 'First Gemini attempt: failure' },
      { fr: 'Extension Claude in Chrome non connectée', en: 'Claude in Chrome extension not connected' },
      { fr: 'Étapes données sans contournement ; deuxième essai réussi', en: 'Steps given, no workaround; second attempt succeeded' },
    ],
    [
      { fr: 'Un site refuse l’outil de lecture habituel', en: 'A site refuses the usual reading tool' },
      { fr: 'Erreur 403', en: 'A 403 error' },
      { fr: 'Lightpanda en secours, qui récupère la page entière', en: 'Lightpanda as a fallback, which retrieves the whole page' },
    ],
  ],

  // ---------- Partie 8 — Carnet d'entretien ----------
  p8Titre: { fr: 'Carnet d’entretien', en: 'Maintenance log' },
  p8Chap: { fr: 'Chap. 8 — Carnet d’entretien', en: 'Chap. 8 — Maintenance log' },
  p8OuvertureTexte: {
    fr: 'Un registre, condensé de la séquence racontée dans le dossier « Utilisation de l’IA » du Lab : une ligne par entrée marquante, l’atelier et le modèle qui l’ont tenue.',
    en: 'A log, condensed from the sequence told in the Lab’s “Using AI” file: one line per notable entry, the workshop and the model that held the pen.',
  },
  p8Cols: { fr: ['Entrée', 'Intervention', 'Opérateur'], en: ['Entry', 'Action', 'Operator'] },
  p8ProgTache: { fr: 'Tâche programmée', en: 'Scheduled task' },
  p8MichaelClaude: { fr: 'Michael + Claude', en: 'Michael + Claude' },
  p8Entries: [
    [{ fr: 'Abandon de l’IA locale (Lily, Qwen3-8B)', en: 'Dropping local AI (Lily, Qwen3-8B)' }, 'mc'],
    [{ fr: 'Les vrais leviers sur le quota', en: 'The real quota levers' }, 'mc'],
    [{ fr: 'Les sous-agents, expliqués', en: 'Sub-agents, explained' }, 'mc'],
    [{ fr: 'Objectif : l’autonomie « fondateur »', en: 'Goal: “founder” autonomy' }, 'michael'],
    [{ fr: 'Incident de sécurité : un token en clair, révoqué', en: 'Security incident: a plaintext token, revoked' }, 'mc'],
    [{ fr: 'Mise en place de la mission test', en: 'Setting up the test mission' }, 'Opus'],
    [{ fr: 'Exécution autonome : 13 min, 7 commits', en: 'Autonomous run: 13 min, 7 commits' }, 'tache'],
    [{ fr: 'Clôture : push, prévisualisation, PR #1, fusion', en: 'Wrap-up: push, preview, PR #1, merge' }, 'mc'],
    [{ fr: 'Skill global /mission pour tous les projets', en: 'Global /mission skill for every project' }, 'mc'],
    [{ fr: 'Mission 3 : schémas en grille, fin des interruptions', en: 'Mission 3: grid diagrams, end of interruptions' }, 'tache'],
    [{ fr: 'Le Magazine, son test et le relecteur', en: 'The Magazine, its test and the fact-checker' }, 'mc'],
    [{ fr: 'La file d’attente de missions', en: 'The mission queue' }, 'tache'],
    [{ fr: 'Piloter depuis le téléphone', en: 'Piloting from the phone' }, 'michael'],
    [{ fr: 'Le compromis sur le push de main', en: 'The main-push compromise' }, 'mc'],
    [{ fr: 'Mise à jour de la page (mission 7)', en: 'Page update (mission 7)' }, 'tache'],
    [{ fr: 'Un deuxième avis : Gemini', en: 'A second opinion: Gemini' }, 'mc'],
    [{ fr: 'Économiser les tokens', en: 'Cutting token usage' }, 'mc'],
    [{ fr: 'Mise à jour de la page (mission 8)', en: 'Page update (mission 8)' }, 'tache'],
    [{ fr: 'Les idées du dimanche', en: 'Sunday’s project ideas' }, 'tache'],
    [{ fr: 'L’Oracle du Matin et le carnet', en: 'The Morning Oracle and the notebook' }, 'tache'],
    [{ fr: 'Une semaine de missions', en: 'A week of missions' }, 'tache'],
    [{ fr: 'La refonte kiosque', en: 'The kiosk redesign' }, 'tache'],
    [{ fr: 'Lightpanda, un navigateur en secours', en: 'Lightpanda, a fallback browser' }, 'mc'],
    [{ fr: 'Cette mise à jour (mission 42)', en: 'This update (mission 42)' }, 'tache'],
  ],

  // ---------- Annexe — Glossaire ----------
  glossaireTitre: { fr: 'Glossaire', en: 'Glossary' },
  glossaireChap: { fr: 'Annexe — Glossaire', en: 'Appendix — Glossary' },
  glossaireTermes1: [
    [{ fr: 'Branche', en: 'Branch' }, { fr: 'Une copie de travail du code, séparée de la version en ligne.', en: 'A working copy of the code, separate from the live version.' }],
    [{ fr: 'Commit', en: 'Commit' }, { fr: 'L’enregistrement d’une modification, avec un message qui explique pourquoi.', en: 'The record of a change, with a message explaining why.' }],
    [{ fr: 'Pull request', en: 'Pull request' }, { fr: 'Une demande d’intégrer une branche ; elle se relit avant d’être acceptée.', en: 'A request to bring in a branch; it gets reviewed before being accepted.' }],
    [{ fr: 'Fusion', en: 'Merge' }, { fr: 'L’action qui intègre une branche dans une autre — ici, dans main.', en: 'The action that brings one branch into another — here, into main.' }],
    [{ fr: 'Main', en: 'Main' }, { fr: 'La branche du site en ligne ; dès qu’elle change, le site change.', en: 'The branch behind the live site; the moment it changes, so does the site.' }],
    [{ fr: 'Worktree', en: 'Worktree' }, { fr: 'Une deuxième copie du dépôt sur le disque, pour travailler sans toucher au dossier principal.', en: 'A second copy of the repository on disk, for working without touching the main folder.' }],
    [{ fr: 'Token', en: 'Token' }, { fr: 'L’unité qui mesure le texte qu’un modèle lit ou écrit ; elle compte dans le quota.', en: 'The unit that measures the text a model reads or writes; it counts against the quota.' }],
    [{ fr: 'Modèle', en: 'Model' }, { fr: 'Le programme d’IA qui comprend et écrit le texte (Opus, Sonnet, Haiku, du plus capable au plus rapide).', en: 'The AI program that understands and writes text (Opus, Sonnet, Haiku, from most capable to fastest).' }],
    [{ fr: 'Session', en: 'Session' }, { fr: 'Une conversation avec Claude, avec sa propre mémoire de travail.', en: 'A conversation with Claude, with its own working memory.' }],
    [{ fr: 'Routine', en: 'Routine' }, { fr: 'Une session qu’une horloge démarre seule, à heure fixe.', en: 'A session a clock starts on its own, at a fixed time.' }],
  ],
  glossaireTermes2: [
    [{ fr: 'Mission', en: 'Mission' }, { fr: 'Un travail délégué, cadré à l’avance puis exécuté seul, étape par étape.', en: 'Delegated work, scoped ahead of time then run alone, step by step.' }],
    [{ fr: 'Sous-agent', en: 'Sub-agent' }, { fr: 'Une autre instance de Claude, lancée pour une tâche précise, qui ne renvoie qu’un résumé.', en: 'Another instance of Claude, launched for one precise task, which returns only a summary.' }],
    [{ fr: 'Agent', en: 'Agent' }, { fr: 'Nom générique des sous-agents spécialisés de l’atelier (controleur, relecteur, et les autres).', en: 'The generic name for the workshop’s specialised sub-agents (controleur, relecteur, and the others).' }],
    [{ fr: 'Skill', en: 'Skill' }, { fr: 'Un ensemble d’instructions prêtes à l’emploi, invoqué par une commande comme /mission.', en: 'A ready-made set of instructions, invoked by a command such as /mission.' }],
    [{ fr: 'Mod', en: 'Mod' }, { fr: 'Un petit programme qui s’accroche à Claude Code et peut bloquer une action ou afficher un panneau, sans consommer de token.', en: 'A small program that plugs into Claude Code and can block an action or draw a panel, using no tokens.' }],
    [{ fr: 'MCP', en: 'MCP' }, { fr: 'Le protocole qui relie Claude à un outil extérieur : un navigateur, un fichier, un service.', en: 'The protocol that connects Claude to an outside tool: a browser, a file, a service.' }],
    [{ fr: 'Quota', en: 'Quota' }, { fr: 'La limite d’usage de l’abonnement ; glissante sur 5 heures pour l’abonnement Pro.', en: 'The subscription’s usage limit; a rolling 5 hours on the Pro subscription.' }],
    [{ fr: 'Prévisualisation', en: 'Preview' }, { fr: 'Une version du site lancée localement, pour la regarder avant publication.', en: 'A version of the site run locally, to look at before publishing.' }],
    [{ fr: 'Verdict', en: 'Verdict' }, { fr: 'La conclusion que rend un agent de contrôle — OK, ATTENTION ou BLOQUANT.', en: 'The conclusion a checking agent returns — OK, ATTENTION or BLOQUANT.' }],
  ],

  notesTitre: { fr: 'Notes', en: 'Notes' },

  // ---------- Quatrième de couverture ----------
  quatriemePhrase: {
    fr: 'Ce manuel documente le système qui écrit, relit et publie une grande partie de ce site : qui appelle qui, avec quel modèle, et où ça s’arrête avant de partir en production.',
    en: 'This manual documents the system that writes, checks and publishes much of this site: who calls whom, with which model, and where it stops before shipping to production.',
  },
}

export const lt = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.fr : v)

// agent → clé de pictogramme (schemas.jsx)
export const PICTO_AGENT = {
  explorateur: 'loupe',
  veilleur: 'lunette',
  secretaire: 'crayon',
  relecteur: 'coche',
  verificateur: 'ecran',
  expert: 'cle',
}
