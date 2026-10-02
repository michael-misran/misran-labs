// Données pures (D2) : lu à la fois par le registre (navigateur, Vite) et
// par scripts/share-previews.js (Node) — aucun JSX ni import de composant ici.
export default {
  slug: 'a-vue-d-oeil',
  ordre: 2,
  icone: '👁',
  couleur: 'violet',
  titre: { fr: 'À vue d’œil', en: 'Eyeball it' },
  accroche: {
    fr: 'Une image, un coup d’œil, une estimation : où te situes-tu sur la courbe ?',
    en: 'One glance, one guess: where do you land on the curve?',
  },
  demo: true,
  entrainement: false,
}
