// Données pures (D2) : lu à la fois par le registre (navigateur, Vite) et
// par scripts/share-previews.js (Node) — aucun JSX ni import de composant ici.
export default {
  slug: 'comme-tout-le-monde',
  ordre: 3,
  icone: '👥',
  couleur: 'cyan',
  titre: { fr: 'Comme tout le monde', en: 'Great minds' },
  accroche: {
    fr: 'Une question par jour : trouve les réponses les plus populaires avant 3 croix.',
    en: 'One question a day: find the most popular answers before 3 strikes.',
  },
  demo: true,
  entrainement: false,
}
