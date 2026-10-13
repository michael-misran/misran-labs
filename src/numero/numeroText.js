// Textes du numéro feuilletable #1, en français et en anglais.
// Les brèves, le chiffre et les statuts des idées viennent des vraies données.

export const NT = {
  // Commandes de lecture
  precedente: { fr: 'Page précédente', en: 'Previous page' },
  suivante: { fr: 'Tournez la page', en: 'Turn the page' },
  fin: { fr: 'Fin du numéro', en: 'End of issue' },
  sommaireBtn: { fr: 'Sommaire', en: 'Contents' },
  page: { fr: 'Page', en: 'Page' },
  suite: { fr: 'suite', en: 'continued' },
  suiteAuDos: { fr: 'Suite page suivante', en: 'Continued overleaf' },

  // Couverture
  uneMeta: { fr: '4 titres · 1 kiosque', en: '4 titles · 1 newsstand' },
  uneDirige: { fr: 'Revue d’anthologie dirigée par M. Misran', en: 'Anthology magazine edited by M. Misran' },
  unePrix: { fr: 'Prix libre', en: 'Pay what' },
  unePrix2: { fr: '0,00 €', en: 'you want' },
  uneTampon: { fr: 'Fait main assisté par IA', en: 'Handmade, AI-assisted' },
  titres: {
    gazette: { fr: 'L’Oracle du Matin', en: 'The Morning Oracle' },
    zine: { fr: 'Le Zine', en: 'The Zine' },
    jeux: { fr: 'Ma salle de jeu', en: 'My game room' },
    lab: { fr: 'Le Lab', en: 'The Lab' },
  },
  pastille1: { fr: 'Spécial IA !', en: 'AI special!' },
  pastille2: { fr: 'Spécial Halloween !', en: 'Halloween special!' },
  uneBulle: { fr: 'Tournez la page, lecteur !', en: 'Turn the page, reader!' },
  unePied: { fr: 'Numéro d’', en: 'Issue of ' },
  uneFeuilleter: { fr: 'à feuilleter', en: 'flip through it' },

  // Courrier + sommaire
  chere: { fr: 'Chère', en: 'Dear' },
  fiole: { fr: 'FIOLE', en: 'FLASK' },
  courrier: { fr: 'courrier des lecteurs du Lab', en: 'letters to the Lab' },
  lettres: [
    {
      q: { fr: 'Bonjour, est-ce vrai que vos missions travaillent la nuit pendant que vous dormez ?', en: 'Hello, is it true your missions work at night while you sleep?' },
      sig: { fr: 'Kevin du 69', en: 'Kevin, Lyon' },
      r: { fr: 'Oui. Et elles ne réclament même pas d’heures sup’. La Fiole.', en: 'Yes. And they don’t even ask for overtime. The Flask.' },
    },
    {
      q: { fr: 'J’ai joué au Geste parfait trois heures d’affilée. Est-ce normal ?', en: 'I played The perfect touch for three hours straight. Is that normal?' },
      sig: { fr: 'Une lectrice inquiète', en: 'A worried reader' },
      r: { fr: 'Parfaitement normal. Un seul défi par jour, pourtant…', en: 'Perfectly normal. Even though there’s only one challenge a day…' },
    },
    {
      q: { fr: 'Pourquoi un site en papier alors que c’est un site ?', en: 'Why a paper website when it’s a website?' },
      sig: { fr: 'Bernard, 53 ans', en: 'Bernard, 53' },
      r: { fr: 'Parce qu’on préfère l’odeur de l’encre. Même numérique.', en: 'Because we prefer the smell of ink. Even digital ink.' },
    },
  ],
  sommaire: { fr: 'SOMMAIRE', en: 'CONTENTS' },
  vos4titres: { fr: 'Les rubriques', en: 'Sections' },
  dansCeNumero: { fr: 'Dans ce numéro', en: 'In this issue' },

  // Réclames : chaque idée P-NNN devient une pub d'époque
  pubAcheter: { fr: 'Achetez sans réfléchir !', en: 'Buy without thinking!' },
  pubTitre: { fr: 'RÉCLAMES', en: 'ADVERTS' },
  pubVoter: { fr: 'Décision le dimanche soir !', en: 'Decided Sunday night!' },
  pubSous: { fr: 'triple dose d’idées · triple dose d’idées', en: 'triple dose of ideas · triple dose of ideas' },
  pubTampon: { fr: 'Idées du dimanche', en: 'Sunday ideas' },
  pubs: {
    'P-009': {
      sur: { fr: 'Nouveau ! Exclusivité du Lab', en: 'New! A Lab exclusive' },
      titre: { fr: 'Le minuteur qui ne ment jamais !', en: 'The timer that never lies!' },
      texte: { fr: 'Fini les œufs trop cuits et les réunions trop longues. Précis, soigné, sans publicité (sauf celle-ci).', en: 'No more overcooked eggs or overlong meetings. Precise, polished, ad-free (except this one).' },
    },
    'P-011': {
      titre: { fr: 'Soirée bloquée ?', en: 'Party stuck?' },
      texte: { fr: 'Le tirage au sort qui choisit à votre place. Les disputes, c’est terminé !', en: 'The party picker decides for you. No more arguments!' },
    },
    'P-006': {
      titre: { fr: 'Qui a gagné ?', en: 'Who won?' },
      texte: { fr: 'Le compteur de points pour jeux de société. Même tonton ne pourra plus tricher.', en: 'The board game score keeper. Even your uncle can’t cheat anymore.' },
    },
    'P-008': {
      titre: { fr: 'Combien de pots de peinture ?', en: 'How many paint cans?' },
      texte: { fr: 'Calculatrices de chantier', en: 'Home improvement calculators' },
    },
    'P-013': {
      titre: { fr: 'Où passe votre argent ?', en: 'Where does your money go?' },
      texte: { fr: 'Le carnet des abonnements', en: 'The subscriptions tracker' },
    },
    'P-014': {
      titre: { fr: 'Garantie expirée ?', en: 'Warranty expired?' },
      texte: { fr: 'Le carnet des factures', en: 'The receipt book' },
    },
  },
  statuts: {
    proposee: { fr: 'proposée', en: 'proposed' },
    gardee: { fr: 'gardée', en: 'kept' },
    'en-cours': { fr: 'en cours', en: 'in progress' },
    faite: { fr: 'faite', en: 'done' },
    arretee: { fr: 'arrêtée', en: 'stopped' },
  },

  // Le Lab vous présente
  labOutil: { fr: 'Outil · prêt à l’emploi', en: 'Tool · ready to use' },
  labBandeau: { fr: 'Le Lab vous présente votre première expérience', en: 'The Lab presents your first experiment' },
  labTitre: { fr: ['AUDIT', 'DE DESIGN', 'SYSTEM'], en: ['DESIGN', 'SYSTEM', 'AUDIT'] },
  labSous: { fr: 'par un outil qui compte les couleurs', en: 'by a tool that counts the colors' },
  labTexte: {
    fr: 'Combien de gris différents dans vos tokens ? Plus que vous ne le pensez. Collez-les, le rapport chiffré tombe, sans quitter votre navigateur.',
    en: 'How many different grays in your tokens? More than you think. Paste them and get a numbers-based report, right in your browser.',
  },
  labBouton: { fr: 'Ouvrir le dossier →', en: 'Open the file →' },

  // Avertissement
  avertTitre: { fr: ['AVERTISSEMENT', 'AU JOUEUR'], en: ['WARNING', 'TO PLAYERS'] },
  avertTexte: {
    fr: 'Les jeux qui suivent ont été conçus par un humain et une intelligence artificielle. Aucun high score n’a été maltraité pendant la fabrication.',
    en: 'The following games were made by a human and an artificial intelligence. No high score was harmed in the making.',
  },
  avertSous: { fr: 'UN JOUEUR AVERTI EN VAUT DEUX', en: 'FOREWARNED IS FOREARMED' },
  avertClasse: { fr: ['Réservé aux joueurs', 'de plus de 8 ans', 'et de moins de 99 ans'], en: ['For players', 'aged over 8', 'and under 99'] },

  // Dossier (deux morceaux)
  dossierOnglet: { fr: 'Les dossiers du Lab', en: 'The Lab files' },
  dossierSuiteOnglet: { fr: 'Les dossiers du Lab · suite', en: 'The Lab files · continued' },
  confidentiel: { fr: 'CONFIDENTIEL', en: 'CONFIDENTIAL' },
  dossierTitre1: { fr: 'Le bureau qui', en: 'The office that' },
  dossierTitre2: { fr: 'travaille', en: 'works' },
  dossierTitre3: { fr: 'la nuit', en: 'at night' },
  dossierFin: { fr: '(fin)', en: '(end)' },
  dossierChapo: {
    fr: 'Chaque soir, quand Michael éteint la lumière, une routine se réveille. Elle lit une fiche, ouvre une branche, écrit du code et laisse un rapport sur le bureau. Enquête sur des collègues qui ne dorment jamais.',
    en: 'Every evening, when Michael turns off the light, a routine wakes up. It reads a brief, opens a branch, writes code and leaves a report on the desk. An investigation into colleagues who never sleep.',
  },
  d1: [
    { h: { fr: 'Une fiche, une branche', en: 'One brief, one branch' } },
    { p: { fr: 'Tout commence par une SPEC : quelques lignes qui disent quoi faire et, surtout, quoi ne jamais faire. Pas de déploiement, pas de branche principale, aucun secret.', en: 'It all starts with a SPEC: a few lines saying what to do and, above all, what never to do. No deployment, no main branch, no secrets.' } },
    { p: { fr: 'La mission travaille dans son coin, sur une branche qui porte son nom. Si elle se trompe, rien n’est perdu : on jette la branche, comme on froisse une page de brouillon.', en: 'The mission works in its own corner, on a branch bearing its name. If it gets things wrong, nothing is lost: the branch is thrown away, like a crumpled draft.' } },
    { fiche: { fr: 'PROGRESS.md : « Étape 3 terminée. Le bouton est rouge, comme demandé. Je n’ai touché à rien d’autre. »', en: 'PROGRESS.md: “Step 3 done. The button is red, as requested. I touched nothing else.”' }, n: 1 },
    { citation: { fr: '« Le matin, je trouve un rapport. Comme un cordonnier qui retrouve ses chaussures réparées par des lutins. »', en: '“In the morning I find a report. Like a shoemaker finding his shoes mended by elves.”' } },
    { h: { fr: 'Les lutins ont des règles', en: 'The elves have rules' } },
    { p: { fr: 'Une mission ne fusionne jamais elle-même son travail. Elle s’arrête au seuil et attend que l’humain relise et dise oui…', en: 'A mission never merges its own work. It stops at the threshold and waits for the human to review and say yes…' } },
  ],
  suiteDossier: { fr: 'Suite du dossier page {/dossier/suite} →', en: 'Continued on page {/dossier/suite} →' },
  debutDossier: { fr: '← Début du dossier page {/dossier}', en: '← Start of the file, page {/dossier}' },
  bulleChut: { fr: 'Chut ! Ils bossent !', en: 'Shh! They’re working!' },
  d2: [
    { p: { fr: '…et c’est tout le sel de l’affaire. La machine propose, l’humain dispose. Une pull request attend sur le comptoir, avec un rapport et la liste des décisions prises en chemin.', en: '…and that’s the whole point. The machine proposes, the human disposes. A pull request waits on the counter, with a report and the list of decisions made along the way.' } },
    { h: { fr: 'Le dimanche, 19 h', en: 'Sunday, 7 pm' } },
    { p: { fr: 'Une autre routine fait la tournée des idées. Elle cherche des petits outils utiles, chiffre leur intérêt et les dépose au guichet. Vous en avez croisé quelques-unes déguisées en réclames, page {/reclames}.', en: 'Another routine does the rounds of ideas. It looks for small useful tools, sizes up their interest and drops them at the counter. You met a few of them disguised as adverts on page {/reclames}.' } },
    { fiche: { fr: '« Garde 2, arrête 4 parce que… » : la phrase qui décide du sort des idées.', en: '“Keep 2, stop 4 because…”: the sentence that decides the fate of ideas.' }, n: 2 },
    { h: { fr: 'Et le matin ?', en: 'And in the morning?' } },
    { p: { fr: 'L’Oracle du Matin sort des presses. Une page A5 façon vieux journal, et sa version web page {/derniere-minute}.', en: 'The Morning Oracle rolls off the press. An A5 page styled like an old newspaper, with its web version on page {/derniere-minute}.' } },
    { citation: { fr: '« Je ne suis pas remplacé. Je suis rédacteur en chef d’une équipe qui ne prend jamais de café. »', en: '“I’m not replaced. I’m the editor-in-chief of a team that never takes a coffee break.”' } },
  ],
  pieceConviction: { fr: 'Pièce à conviction n°', en: 'Exhibit no.' },
  pieceClassee: { fr: 'Pièce classée', en: 'Case closed' },
  lireGazette: { fr: 'Lire l’Oracle du jour →', en: 'Read today’s Oracle →' },

  // Salle de jeu
  jeuPresente: { fr: 'MA SALLE DE JEU PRÉSENTE', en: 'MY GAME ROOM PRESENTS' },
  jeuTexte: {
    fr: 'Un défi d’adresse par jour : cercle, chrono, verre ou tour. Une seule chance. Votre main tremblera-t-elle ?',
    en: 'One precision challenge a day: circle, timer, glass or tower. One chance. Will your hand shake?',
  },
  jeuPiece: { fr: ['INSÉRER', 'UNE PIÈCE'], en: ['INSERT', 'COIN'] },

  // Dernière page
  derniereMinute: { fr: 'Dernière minute', en: 'Stop press' },
  gazetteTitre: { fr: 'L’Oracle du Matin', en: 'The Morning Oracle' },
  gazetteSous: { fr: 'Les brèves du jour, tirées à part', en: 'Today’s briefs, printed separately' },
  uneIA: { fr: 'La une IA', en: 'AI front page' },
  tech: { fr: 'Tech', en: 'Tech' },
  leChiffre: { fr: 'Le chiffre', en: 'The figure' },
  toutesBreves: { fr: 'Toutes les brèves du jour →', en: 'All of today’s briefs →' },
  prochainTitre: { fr: 'AU PROCHAIN NUMÉRO', en: 'IN THE NEXT ISSUE' },
  prochainTexte: { fr: 'Tout est annoncé en 4ᵉ de couverture, page {/a-suivre}.', en: 'It’s all on the back cover, page {/a-suivre}.' },

  // 4e de couverture : ce qui va suivre
  finBandeau: { fr: 'À SUIVRE…', en: 'TO BE CONTINUED…' },
  finNumero: { fr: 'Midnight Snack #1 · novembre 2026', en: 'Midnight Snack #1 · November 2026' },
  finTitre: { fr: ['AU PROCHAIN', 'NUMÉRO'], en: ['IN THE NEXT', 'ISSUE'] },
  finChapo: { fr: 'Le kiosque ne ferme jamais : voici ce qui se prépare dans l’atelier.', en: 'The newsstand never closes: here is what’s cooking in the workshop.' },
  finTeasers: [
    { to: '/portfolio', couleur: '#d4b06a', police: 'var(--font-chapo)', icone: '❦', sticker: { fr: 'Relié', en: 'Bound' },
      titre: { fr: 'Le portfolio s’illustre', en: 'The portfolio gets its pictures' },
      texte: { fr: 'Maquettes, captures et coulisses, page après page.', en: 'Mockups, screenshots and behind the scenes, page after page.' } },
    { to: '/jeux', couleur: 'var(--titre-jeux)', police: 'var(--font-pixel)', icone: '◎', sticker: { fr: 'Inédit', en: 'New' },
      titre: { fr: 'Une nouvelle cartouche', en: 'A new cartridge' },
      texte: { fr: 'Un jeu de plus dans la chambre. Préparez vos pouces.', en: 'One more game in the bedroom. Ready your thumbs.' } },
    { to: '/sommaire', couleur: 'var(--titre-gazette)', police: 'var(--font-bois-3)', icone: '✉', sticker: { fr: 'Écrivez !', en: 'Write in!' },
      titre: { fr: 'La Fiole répond à vos lettres', en: 'The Flask answers your letters' },
      texte: { fr: 'Le courrier des lecteurs, avec de vrais lecteurs cette fois.', en: 'Letters to the editor, with real readers this time.' } },
    { to: '/projets', couleur: 'var(--titre-lab)', police: 'var(--font-bois-2)', icone: '★', sticker: { fr: 'Dimanche', en: 'Sunday' },
      titre: { fr: 'De nouvelles idées au guichet', en: 'New ideas at the counter' },
      texte: { fr: 'Celles qui seront gardées… et celles qui seront arrêtées.', en: 'The ones we keep… and the ones we stop.' } },
  ],
  finBulle: { fr: 'Rendez-vous le mois prochain, lecteur !', en: 'See you next month, reader!' },
  finRelire: { fr: '↺ Relire depuis la couverture', en: '↺ Read again from the cover' },
  finPrix: { fr: 'Prix libre · 0,00 €', en: 'Pay what you want' },
  bulleDemain: { fr: 'À demain, lecteur !', en: 'See you tomorrow, reader!' },

  // Couverture : le portfolio dans la barre des titres
  navTitrePortfolio: { fr: 'Portfolio', en: 'Portfolio' },
  navRythmePortfolio: { fr: 'Relié', en: 'Bound' },
  // Côté libre de la couverture et de la 4ᵉ : retour à la bibliothèque
  bibliotheque: { fr: 'Retour à la bibliothèque', en: 'Back to the library' },

  // Étagère (page d'accueil : la bibliothèque)
  etagereTitre: { fr: 'La bibliothèque du Lab', en: 'The Lab library' },
  etagereLire: { fr: 'Lire', en: 'Read' },
  etagereReprendre: { fr: 'Ouvrir ce numéro', en: 'Open this issue' },
  etagereAParaitre: { fr: 'À paraître', en: 'Coming soon' },
  etagereRanger: { fr: 'Remettre sur l’étagère', en: 'Put it back' },
  etagereReserve: { fr: 'Place réservée aux prochains numéros', en: 'Space saved for future issues' },
  etagereQuotidien: { fr: 'Quotidien', en: 'Daily' },
}

export const nt = (v, lang) => v[lang] ?? v.fr
