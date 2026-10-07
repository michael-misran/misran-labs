// Textes fr/en de la rubrique « Le saviez-vous ? ».
export const SAVIEZ_TEXT = {
  fr: {
    presente: 'Misran Labs présente : le saviez-vous ?',
    parution: 'Parution du',
    illustrationAttente: 'Planche en préparation à l’atelier',
    sources: 'Sources',
    archives: 'Les semaines précédentes',
    vide: 'Le premier sujet est encore sous presse. Revenez bientôt.',
    retour: '← Cette semaine',
    introuvableTitre: 'Rien à cette date',
    introuvableTexte: 'Aucune parution ce jour-là.',
    reclamesTitre: 'Réclames',
    reclames: [
      { to: '/breves', police: 'var(--font-gothique)', titre: 'La Gazette', accroche: 'Tous les matins dès 5 h 30 !', texte: 'Les nouvelles de l’IA, sans le blabla. Lecture garantie avant le café.' },
      { to: '/jeux', police: 'var(--font-enseigne)', titre: 'Déstockage !', accroche: 'Mini-jeux à 0 €', texte: 'Un nouveau chaque jour, noté sur 100. Quantités illimitées.' },
      { to: '/lab', police: 'var(--font-machine)', titre: 'Devenez savant fou !', accroche: 'Le Lab vous attend', texte: 'Expériences, maquettes et études. Sans danger*.', note: '*ou presque' },
      { to: '/suivre', police: 'var(--font-pulp)', titre: 'Ne ratez plus rien', accroche: 'Abonnez-vous !', texte: 'Flux RSS, sans compte à créer, sans spam, sans rien.' },
    ],
  },
  en: {
    presente: 'Misran Labs presents: did you know?',
    parution: 'Issue of',
    illustrationAttente: 'Plate in the works at the studio',
    sources: 'Sources',
    archives: 'Previous weeks',
    vide: 'The first story is still at the printer’s. Come back soon.',
    retour: '← This week',
    introuvableTitre: 'Nothing on this date',
    introuvableTexte: 'No issue that day.',
    reclamesTitre: 'Advertisements',
    reclames: [
      { to: '/breves', police: 'var(--font-gothique)', titre: 'La Gazette', accroche: 'Every morning from 5:30!', texte: 'AI news without the fluff. Read it before your coffee.' },
      { to: '/jeux', police: 'var(--font-enseigne)', titre: 'Clearance!', accroche: 'Mini-games for $0', texte: 'A new one every day, scored out of 100. Unlimited stock.' },
      { to: '/lab', police: 'var(--font-machine)', titre: 'Become a mad scientist!', accroche: 'The Lab awaits', texte: 'Experiments, mock-ups and studies. Perfectly safe*.', note: '*almost' },
      { to: '/suivre', police: 'var(--font-pulp)', titre: 'Never miss a thing', accroche: 'Subscribe!', texte: 'RSS feeds, no account, no spam, no nothing.' },
    ],
  },
}

export function st(lang, key) {
  return SAVIEZ_TEXT[lang]?.[key] ?? SAVIEZ_TEXT.fr[key]
}
