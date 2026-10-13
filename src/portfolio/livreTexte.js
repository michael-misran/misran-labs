// Textes du livre portfolio (FR / EN). Le parcours détaillé vient du CV du
// Lab (modules/CVModule.jsx) : une seule source pour les dates et les postes.

export const LT = {
  // Couverture et commandes
  surTitre: { fr: 'Portfolio', en: 'Portfolio' },
  nom: { fr: 'Michael Misran', en: 'Michael Misran' },
  metier: { fr: 'Product Designer Senior', en: 'Senior Product Designer' },
  specialite: { fr: 'DesignOps · Design systems · IA', en: 'DesignOps · Design systems · AI' },
  edition: { fr: 'Édition 2026', en: '2026 edition' },
  bibliotheque: { fr: 'Retour à la bibliothèque', en: 'Back to the library' },
  precedente: { fr: 'Page précédente', en: 'Previous page' },
  suivante: { fr: 'Page suivante', en: 'Next page' },
  imprimer: { fr: 'Imprimer / PDF', en: 'Print / PDF' },
  ouvrir: { fr: 'Ouvrir le livre', en: 'Open the book' },
  aAjouter: { fr: 'À ajouter', en: 'To add' },

  // Page de garde
  gardeTitre: { fr: 'Avant de commencer', en: 'Before you start' },
  gardeTexte: {
    fr: 'Douze ans de développement, huit de design produit. Ce livre rassemble ce que je fais le mieux : relier le design et le code, faire tenir plusieurs produits dans un même système, et mettre l’IA au service de l’équipe plutôt que l’inverse.',
    en: 'Twelve years of development, eight of product design. This book gathers what I do best: bridging design and code, keeping several products in one system, and making AI serve the team rather than the other way round.',
  },
  gardeLecture: {
    fr: 'Chaque chapitre tient en une double page : le contexte et la méthode à gauche, les preuves à droite.',
    en: 'Each chapter fits on one spread: context and method on the left, evidence on the right.',
  },
  sommaire: { fr: 'Sommaire', en: 'Contents' },

  // Portrait
  profil: { fr: 'Profil', en: 'Profile' },
  contact: { fr: 'Contact', en: 'Contact' },
  lieu: { fr: 'Paris et périphérie · hybride ou remote', en: 'Paris area · hybrid or remote' },

  // Parcours
  parcours: { fr: 'Parcours', en: 'Experience' },
  parcoursSuite: { fr: 'Parcours (suite)', en: 'Experience (continued)' },
  competences: { fr: 'Compétences clés', en: 'Key skills' },
  formation: { fr: 'Formation', en: 'Education' },
  outils: { fr: 'Outils', en: 'Tools' },

  // Chapitres
  ch1: { fr: 'Le workflow multi-produits', en: 'The multi-product workflow' },
  ch1Chapo: {
    fr: 'Deux responsabilités en même temps, jamais l’une après l’autre : répondre aux besoins de chaque produit (le run) et garder un design system commun à tous (l’unification).',
    en: 'Two responsibilities at once, never one after the other: serving each product’s needs (the run) and keeping one design system for all of them (unification).',
  },
  ch1Regle: {
    fr: 'L’unification n’est pas une tâche en plus : c’est un filtre appliqué à chaque tâche du run.',
    en: 'Unification is not an extra task: it is a filter applied to every run task.',
  },
  ch1Temps: { fr: 'Répartition du temps', en: 'Time split' },
  ch1Blocs: [
    { part: 60, fr: 'Run produit A / B / C : réactif, au rythme des sprints', en: 'Run for products A / B / C: reactive, sprint-paced' },
    { part: 25, fr: 'Design system et composants transverses : proactif', en: 'Design system and shared components: proactive' },
    { part: 15, fr: 'Rituels avec les parties prenantes : fixe', en: 'Stakeholder rituals: fixed' },
  ],
  ch1Alerte: {
    fr: 'Si le run dépasse 70 % deux semaines de suite : signal d’alerte, on repriorise.',
    en: 'If the run goes over 70% two weeks in a row: warning sign, we reprioritise.',
  },

  ch2: { fr: 'Le design system multi-marques', en: 'The multi-brand design system' },
  ch2Chapo: {
    fr: 'Un seul système pour plusieurs marques, du fichier Figma jusqu’au code en production, sans ressaisie à la main.',
    en: 'One system for several brands, from the Figma file all the way to production code, with no manual re-entry.',
  },
  ch2Tiers: [
    { nom: { fr: 'Primitives', en: 'Primitives' }, fr: 'les valeurs brutes : couleurs, tailles, polices', en: 'raw values: colours, sizes, fonts' },
    { nom: { fr: 'Sémantiques', en: 'Semantic' }, fr: 'le sens : fond, texte, action, alerte', en: 'meaning: background, text, action, alert' },
    { nom: { fr: 'Composants', en: 'Component' }, fr: 'le bouton, la carte, le champ', en: 'the button, the card, the field' },
  ],
  ch2Pipeline: { fr: 'Le pipeline', en: 'The pipeline' },
  ch2Etapes: [
    { fr: 'Variables Figma', en: 'Figma variables' },
    { fr: 'Export JSON', en: 'JSON export' },
    { fr: 'Pull request GitHub', en: 'GitHub pull request' },
    { fr: 'CSS en production', en: 'CSS in production' },
  ],
  ch2Resultat: {
    fr: 'Résultat : la dette de handoff disparaît, une nouvelle marque se décline en changeant un mode, pas en redessinant.',
    en: 'Result: handoff debt disappears; a new brand is a new mode, not a redesign.',
  },

  ch3: { fr: 'L’IA dans mon atelier', en: 'AI in my workshop' },
  ch3Chapo: {
    fr: 'J’utilise l’IA comme une équipe que je dirige : je cadre, elle produit, je relis et je tranche.',
    en: 'I use AI like a team I lead: I frame the work, it produces, I review and decide.',
  },
  ch3Points: [
    { titre: { fr: 'Figma MCP', en: 'Figma MCP' }, fr: 'l’agent lit la maquette et écrit le code, ou l’inverse.', en: 'the agent reads the mockup and writes the code, or the other way round.' },
    { titre: { fr: 'Agents sur mesure', en: 'Custom agents' }, fr: 'un contrôleur, un vérificateur, un relecteur : chacun son rôle, ses limites.', en: 'a checker, a verifier, a proofreader: each with its role and its limits.' },
    { titre: { fr: 'Idéation accélérée', en: 'Faster ideation' }, fr: 'des variantes de maquettes et de parcours produites en quelques minutes, triées ensuite en atelier.', en: 'mockup and journey variants produced in minutes, then sorted out in workshops.' },
  ],
  ch3Preuve: {
    fr: 'L’IA accélère la production ; la décision reste à l’équipe.',
    en: 'AI speeds up production; decisions stay with the team.',
  },

  chAgents: { fr: 'Ma rédaction d’agents', en: 'My newsroom of agents' },
  chAgentsChapo: {
    fr: 'Sur mes projets personnels, je dirige une petite équipe d’agents IA comme une rédaction : chacun son poste, son modèle, ses limites. Moi, je suis le rédacteur en chef.',
    en: 'On my personal projects, I run a small team of AI agents like a newsroom: each has a role, a model and limits. I am the editor-in-chief.',
  },
  chAgentsEquipe: { fr: 'L’équipe', en: 'The team' },
  chAgentsChef: { fr: 'Moi · rédacteur en chef', en: 'Me · editor-in-chief' },
  chAgentsChefRole: { fr: 'je donne le brief, je tranche, je fusionne', en: 'I brief, decide and merge' },
  chAgentsTour: { fr: 'Tour de contrôle', en: 'Control tower' },
  chAgentsTourRole: { fr: 'la session principale : cadre, délègue, vérifie', en: 'the main session: frames, delegates, checks' },
  chAgentsRoles: [
    { nom: 'Explorateur', modele: 'Haiku', fr: 'cherche dans le code, en lecture seule', en: 'searches the code, read-only' },
    { nom: 'Vérificateur', modele: 'Haiku', fr: 'ouvre le site, traque les erreurs', en: 'opens the site, hunts for errors' },
    { nom: 'Veilleur', modele: 'Haiku', fr: 'collecte l’actualité IA sourcée', en: 'collects sourced AI news' },
    { nom: 'Relecteur', modele: 'Sonnet', fr: 'revérifie chaque chiffre avant publication', en: 're-checks every figure before publishing' },
    { nom: 'Contrôleur', modele: 'Haiku', fr: 'audite une branche avant la pull request', en: 'audits a branch before the pull request' },
    { nom: 'Expert', modele: 'Opus', fr: 'appelé seulement après deux échecs', en: 'called only after two failures' },
  ],
  chAgentsRegle: {
    fr: 'Le bon modèle à la bonne étape : le plus petit qui fait le travail. Le plus gros est réservé au cadrage et à la direction visuelle.',
    en: 'The right model for each step: the smallest that does the job. The biggest is kept for framing and visual direction.',
  },
  chAgentsCircuit: { fr: 'Le circuit d’une mission', en: 'How a mission runs' },
  chAgentsEtapes: [
    { fr: 'Mon brief', en: 'My brief' },
    { fr: 'Cadrage : spec et plan', en: 'Framing: spec and plan' },
    { fr: 'Une branche à part', en: 'A separate branch' },
    { fr: 'L’IA travaille la nuit', en: 'AI works overnight' },
    { fr: 'Rapport et pull request', en: 'Report and pull request' },
    { fr: 'Je relis et je fusionne', en: 'I review and merge' },
  ],
  chAgentsGardeFous: { fr: 'Les garde-fous', en: 'Guardrails' },
  chAgentsRegles: [
    { fr: 'Jamais de mise en production sans mon accord explicite.', en: 'Never ships to production without my explicit go-ahead.' },
    { fr: 'Les agents qui vérifient ne corrigent rien : ils rapportent.', en: 'Checking agents fix nothing: they report.' },
    { fr: 'Dépôt public : aucun secret, aucune donnée personnelle.', en: 'Public repo: no secrets, no personal data.' },
  ],
  chAgentsChiffres: [
    { n: '40+', fr: 'missions menées seules', en: 'missions run on their own' },
    { n: '90+', fr: 'pull requests fusionnées', en: 'pull requests merged' },
    { n: '4', fr: 'routines programmées', en: 'scheduled routines' },
  ],
  chAgentsPreuve: {
    fr: 'Le site sur lequel vous lisez ce livre a été construit ainsi.',
    en: 'The site you are reading this book on was built this way.',
  },

  ch4: { fr: 'Applications métiers', en: 'Business applications' },
  ch4Chapo: {
    fr: 'Chez IAD France, j’ai accompagné le passage à une culture produit et mené le design des outils internes.',
    en: 'At IAD France, I helped the shift to a product culture and led the design of internal tools.',
  },
  ch4Outils: [
    { fr: 'Facturation des conseillers', en: 'Advisor billing' },
    { fr: 'Suivi de rémunération', en: 'Compensation tracking' },
    { fr: 'Moteurs de rapprochement', en: 'Reconciliation engines' },
  ],
  ch4Methode: { fr: 'La méthode', en: 'The method' },
  ch4Etapes: [
    { fr: 'Ateliers de recherche avec les équipes métier', en: 'Research workshops with business teams' },
    { fr: 'Prototypes testables dès la première semaine', en: 'Testable prototypes from week one' },
    { fr: 'Tests utilisateurs, puis itérations', en: 'User tests, then iterations' },
  ],
  ch4Atout: {
    fr: 'Mon passé de développeur sur ces mêmes outils : je savais ce qui était faisable, et à quel prix.',
    en: 'My past as a developer on the very same tools: I knew what was feasible, and at what cost.',
  },

  ch5: { fr: 'Au Lab', en: 'At the Lab' },
  ch5Chapo: {
    fr: 'Ce que je construis pour moi : des terrains d’essai pour les idées que je défendrai ensuite en équipe.',
    en: 'What I build for myself: testing grounds for ideas I later bring to teams.',
  },
  ch5Projets: [
    { titre: { fr: 'Misran Labs', en: 'Misran Labs' }, fr: 'ce site-magazine : design system en trois tiers, construit avec des agents IA.', en: 'this magazine-site: three-tier design system, built with AI agents.', to: '/' },
    { titre: { fr: 'Audit de design system', en: 'Design system audit' }, fr: 'un outil qui lit vos tokens et chiffre les incohérences.', en: 'a tool that reads your tokens and counts the inconsistencies.', to: '/lab/audit-tokens' },
    { titre: { fr: 'The Lost Cauldron', en: 'The Lost Cauldron' }, fr: 'un jeu Godot tiré de mon roman de fantasy.', en: 'a Godot game based on my fantasy novel.', to: '/lab/lost-cauldron-game' },
  ],

  temoignages: { fr: 'Ce qu’on en dit', en: 'What people say' },
  finTitre: { fr: 'Travaillons ensemble', en: 'Let’s work together' },
  finTexte: {
    fr: 'Je cherche une équipe produit qui veut industrialiser son design sans perdre son âme : design system, DesignOps, IA au service des gens.',
    en: 'I am looking for a product team that wants to scale its design without losing its soul: design systems, DesignOps, AI that serves people.',
  },
  quatrieme: {
    fr: '« Le design est une intention. Les détails sont tout. »',
    en: '“Design is intent. Details are everything.”',
  },
}

export const lt = (v, lang) => v[lang] ?? v.fr
