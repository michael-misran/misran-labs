// Textes fr/en communs à la rubrique /jeux (D1). Les textes propres à un
// jeu vivent dans son propre dossier.
export const JEUX_TEXT = {
  fr: {
    jeuxTitre: 'Ma salle de jeu',
    intro: 'Un petit défi chaque jour, noté sur 100 et partageable en un clic.',
    joueAujourdhui: 'Joué aujourd’hui ✓',
    nouveauDefi: 'Nouveau défi',
    bientot: 'Bientôt',
    partager: 'Partager',
    copie: 'Copié ✓',
    rejouerEntrainement: 'Rejouer pour s’entraîner',
    voirResultatDuJour: 'Revenir au résultat du jour',
    modeEntrainement: 'Entraînement — ce résultat n’est pas enregistré',
    serieJours: (n) => `🔥 ${n} jour${n === 1 ? '' : 's'}`,
    demoBandeau: 'Démo : les réponses des autres joueurs sont simulées pour l’instant.',
    arcadeTitre: 'MA SALLE DE JEU',
    joueur1: '1 JOUEUR',
    zeroPub: '0 PUB',
    bravo: 'BRAVO !',
    inserer: 'INSÉRER ▶',
    chambreDescription: 'Une chambre des années 80 : une étagère de cartouches de jeux vidéo à côté d’une télé.',
  },
  en: {
    jeuxTitre: 'My game room',
    intro: 'One small challenge a day, scored out of 100 and shareable in one tap.',
    joueAujourdhui: 'Played today ✓',
    nouveauDefi: 'New challenge',
    bientot: 'Coming soon',
    partager: 'Share',
    copie: 'Copied ✓',
    rejouerEntrainement: 'Replay to practice',
    voirResultatDuJour: "Back to today’s result",
    modeEntrainement: 'Practice — this result is not saved',
    serieJours: (n) => `🔥 ${n} day${n === 1 ? '' : 's'}`,
    demoBandeau: 'Demo: other players’ answers are simulated for now.',
    arcadeTitre: 'MY GAME ROOM',
    joueur1: '1 PLAYER',
    zeroPub: '0 ADS',
    bravo: 'WELL PLAYED !',
    inserer: 'INSERT ▶',
    chambreDescription: 'A 1980s bedroom: a shelf of video game cartridges next to a TV.',
  },
}

export function jt(lang, key, ...args) {
  const value = JEUX_TEXT[lang]?.[key] ?? JEUX_TEXT.fr[key]
  return typeof value === 'function' ? value(...args) : value
}
