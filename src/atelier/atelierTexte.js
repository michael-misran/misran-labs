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
  enPreparation: { fr: 'en préparation', en: 'in preparation' },
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
    fr: 'Sept automates secondent la session principale. Aucun ne commite : ils lisent, vérifient, collectent ou tranchent, puis rendent leur réponse à la session qui les a appelés.',
    en: 'Seven automatons assist the main session. None of them commit: they read, check, gather or settle a question, then report back to the session that called them.',
  },
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
