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
      fr: ['Blop !', 'Expérience en cours…', 'Attention, ça mousse', 'Tu as lu les Brèves ?', 'Formule secrète : café'],
      en: ['Blop!', 'Experiment in progress…', 'Careful, it fizzes', 'Read today\'s Briefs?', 'Secret formula: coffee']
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
    }
  }
};

// Particules FX (mini-sprites)
export const FX = {
  bubble: ['.w.', 'w.w', '.w.'],
  poison: ['.c.', 'c.c', '.c.']
};
