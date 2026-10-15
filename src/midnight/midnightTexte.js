// Textes d'interface du livre Midnight Snack (FR / EN). Les textes des numéros
// eux-mêmes (récits, rubriques...) vivent dans numeros/<NN>.js, pas ici.

export const LT = {
  surTitre: { fr: 'Midnight Snack', en: 'Midnight Snack' },
  bibliotheque: { fr: 'Retour à la librairie', en: 'Back to the bookshop' },
  precedente: { fr: 'Page précédente', en: 'Previous page' },
  suivante: { fr: 'Page suivante', en: 'Next page' },
  imprimer: { fr: 'Imprimer / PDF', en: 'Print / PDF' },
  ouvrir: { fr: 'Ouvrir le livre', en: 'Open the book' },
  aAjouter: { fr: 'À ajouter', en: 'To add' },
  promptGemini: { fr: 'Prompt Gemini', en: 'Gemini prompt' },

  // Bandeau d'épreuve (numéro pas encore paru, consulté via ?epreuve)
  epreuveBandeau: {
    fr: 'ÉPREUVE — non publié',
    en: 'PROOF — unpublished',
  },

  // Page d'attente (numéro pas encore paru, sans ?epreuve)
  attenteEnKiosque: {
    fr: 'en kiosque le',
    en: 'on sale',
  },
  attenteTexte: {
    fr: 'Le raton range encore le frigo. Revenez le jour J.',
    en: 'The raccoon is still restocking the fridge. Come back on the day.',
  },
  attenteProchain: {
    fr: 'Prochain numéro',
    en: 'Next issue',
  },
  attenteAucun: {
    fr: 'Aucun numéro de Midnight Snack n’est encore prévu.',
    en: 'No issue of Midnight Snack is scheduled yet.',
  },

  // Pages en attente de Michael (feuilleton, Dans la marmite)
  aParaitre: { fr: 'à paraître', en: 'coming soon' },
  texteDeMichael: { fr: 'Texte de Michael : environ 1 000 à 1 200 mots', en: 'Michael’s text: about 1,000–1,200 words' },
  texteDeMichaelCourt: { fr: 'Texte en attente', en: 'Text pending' },
}

export const lt = (v, lang) => v[lang] ?? v.fr
