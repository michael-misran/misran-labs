// Palette : table lettre → nom de token CSS primitif
export const PAL = {
  k: '--primitive-ink-900',
  d: '--primitive-coral-700',
  c: '--primitive-coral-500',
  o: '--primitive-coral-400',
  r: '--primitive-coral-tint-200',
  w: '--primitive-cream-100',
  h: '--primitive-cream-50',
  E: '--primitive-ink-900',
};

// Sprites des personnages
export const SPRITES = {
  fiole: {
    base: [
      '................',
      '.....kkkkkk.....',
      '.....kddddk.....',
      '.....kkkkkk.....',
      '......kwwk......',
      '......kwhk......',
      '.....kwwwwk.....',
      '....kwhwwwwk....',
      '...kwhwwwwwwk...',
      '..kcccccccccck..',
      '.kcccEccccEccck.',
      '.kcccEccccEccck.',
      '.kcrccckkcccrck.',
      '.kcccccccccccck.',
      '..kcccccccccck..',
      '...kkkkkkkkkk...'
    ],
    blink: {
      10: '.kcccccccccccck.'
    },
    look: {
      9: '..kccEccccEcck..',
      11: '.kcccccccccccck.'
    },
    sleep: {
      10: '.kcccccccccccck.',
      12: '.kcrcccckcccrck.'
    },
    happy: {
      10: '.kccEcEccEcEcck.',
      11: '.kcccccccccccck.'
    },
    phrases: {
      fr: ['Blop !', 'Expérience en cours…', 'Attention, ça mousse', 'Tu as lu la Gazette ?', 'Formule secrète : café'],
      en: ['Blop!', 'Experiment in progress…', 'Careful, it fizzes', 'Read today\'s Briefs?', 'Secret formula: coffee']
    }
  },
  // L'Alambic, mascotte de la maison d'édition : cucurbite cuivrée au visage
  // de la Fiole, chapiteau, col de cygne, serpentin, goutte et petite fiole
  // qui recueille le distillat, flammes dessous.
  alambic: {
    base: [
      '.....k..........',
      '....kdk.........',
      '...kdddkkkk.....',
      '..kdhdddk...k...',
      '..kkkkkkk....k..',
      '....kwk.....kkkk',
      '..kkkckkk...kwkk',
      '.kccccccck..kkwk',
      'kccEcccEcck.kwkk',
      'kccEcccEcck.kkkk',
      'kcrckckcrck..k..',
      'kcccckcccck..c..',
      '.kccccccck..k.k.',
      '..kkkkkkk..kccck',
      '...o.o.o...kccck',
      '..ooooooo...kkk.'
    ],
    blink: {
      8: 'kccccccccck.kwkk'
    },
    look: {
      8: 'kcccEcccEck.kwkk',
      9: 'kcccEcccEck.kkkk'
    },
    // Endormi : yeux fermés, bouche plate, feu en veilleuse
    sleep: {
      8: 'kccccccccck.kwkk',
      10: 'kcrcckccrck..k..',
      11: 'kccccccccck..c..',
      14: '...........kccck',
      15: '...ooooo....kkk.'
    },
    happy: {
      8: 'kcEcEcEcEck.kwkk',
      9: 'kccccccccck.kkkk'
    },
    // Animation continue, pas à pas : [x, y, pixel] posés sur l'image du
    // moment. Les flammes vacillent, la goutte tombe dans la petite fiole.
    cycle: [
      [],
      [[13, 11, '.'], [13, 12, 'c'], [3, 14, '.'], [5, 14, '.'], [7, 14, '.'], [4, 14, 'o'], [6, 14, 'o'], [2, 15, '.'], [8, 15, '.']],
      [[13, 11, '.']],
      [[13, 11, '.'], [3, 14, '.'], [5, 14, '.'], [7, 14, '.'], [4, 14, 'o'], [6, 14, 'o'], [2, 15, '.'], [8, 15, '.']]
    ],
    phrases: {
      fr: ['Blop !', 'Distillation en cours…', 'Goutte à goutte', 'Tu as lu la Gazette ?', 'Cuvée maison'],
      en: ['Blop!', 'Distilling…', 'Drop by drop', 'Read today\'s Briefs?', 'House vintage']
    }
  },
  // Secret du 10ᵉ clic de l'Alambic : il explose, puis reste un moment
  // noirci de suie (chapiteau envolé, fumée, yeux sonnés, panse fêlée).
  explosion: {
    base: [
      '........k.......',
      '.k.....dd.......',
      '.......cc.....k.',
      '...cd..cc..dc...',
      '...docdoodcod...',
      '....coowwooc....',
      '....dowhhwod....',
      '.dccowhhhhwoccd.',
      '.dccowhhhhwoccd.',
      'k...dowhhwod....',
      '....coowwooc....',
      '...docdoodcod...',
      '...cd..cc..dc..k',
      '.......cc.......',
      '...k...dd.......',
      '............k...'
    ]
  },
  suie: {
    base: [
      '....w...w.......',
      '.....w.w........',
      '....w...w.......',
      '...........k....',
      '...k.k.......k..',
      '....kwk.....kkkk',
      '..kkkdkkk...kwkk',
      '.kddkdddk...kkwk',
      'kdEdEdEdEdk.kwkk',
      'kddEdddEddk.kkkk',
      'kdEdEdEdEdk..k..',
      'kdrdkdkdrdk.....',
      '.kdddkdddk..k.k.',
      '..kkkkkkk..kccck',
      '...........kccck',
      '............kkk.'
    ],
    phrases: {
      fr: 'Oups… recette instable',
      en: 'Oops… unstable recipe'
    }
  },
  toxique: {
    base: [
      '................',
      '.....kkkkkk.....',
      '.....kddddk.....',
      '.....kkkkkk.....',
      '......kwwk......',
      '......kwhk......',
      '.....kwwwwk.....',
      '....kwhwwwwk....',
      '...kwhwwwwwwk...',
      '..kcccccccccck..',
      '.kcccwwwwwwccck.',
      '.kccwEEwwEEwcck.',
      '.kccwEEwwEEwcck.',
      '.kcccwwkkwwccck.',
      '..kccwkwwkwcck..',
      '...kkkkkkkkkk...'
    ],
    blink: {
      11: '.kccwwwwwwwwcck.'
    },
    look: {
      12: '.kccwwwwwwwwcck.'
    },
    sleep: {
      11: '.kccwwwwwwwwcck.',
      12: '.kccwEEwwEEwcck.'
    },
    happy: {
      11: '.kccwoowwoowcck.',
      12: '.kccwoowwoowcck.'
    },
    secret: {
      fr: 'Tu l\'as bien cherché ☠',
      en: 'You asked for it ☠'
    },
    phrases: {
      fr: ['Ne pas boire.', 'Toxique… mais sympa', 'Danger : curiosité', 'Qui a secoué la fiole ?', 'Poison maison'],
      en: ['Do not drink.', 'Toxic… but friendly', 'Danger: curiosity', 'Who shook the flask?', 'Homemade poison']
    }
  }
};

// Particules FX (mini-sprites)
export const FX = {
  bubble: ['.w.', 'w.w', '.w.'],
  poison: ['.c.', 'c.c', '.c.'],
  eclat: ['.d.', 'dck', '.k.'],
  etincelle: ['.o.', 'oho', '.o.']
};
