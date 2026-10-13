// Volumes rangés sur l'étagère de la bibliothèque (page d'accueil). Pour ajouter un
// numéro, un livre ou une autre revue : une entrée de plus ici.
// - rayon : 0 (haut) ou 1 (bas)
// - couverture : modèle de couverture affiché quand on sort le volume
//   ('numero', 'midnight', 'gazette', 'zine', 'prochain')
// - to : adresse ouverte par « Lire » (null = pas encore paru)
// - hauteur / epaisseur : taille de la tranche, en % de la hauteur du rayon
//   et en % de la largeur de l'étagère

export const VOLUMES = [
  {
    id: 'numero-1',
    rayon: 0,
    couverture: 'numero',
    titre: { fr: 'Misran Labs', en: 'Misran Labs' },
    sous: { fr: 'N°1 · octobre 2026', en: 'No. 1 · October 2026' },
    image: '/decors/couverture-halloween.jpg',
    to: '/magazine',
    tranche: { fond: '#2a1640', encre: '#ff7518', police: 'var(--font-pulp)' },
    hauteur: 92,
    epaisseur: 10,
  },
  {
    // Le nouveau magazine de 1977 Éditions, qui prend la suite de Misran Labs
    id: 'midnight-1',
    rayon: 0,
    couverture: 'midnight',
    titre: { fr: 'Midnight Snack', en: 'Midnight Snack' },
    sous: { fr: 'N°1 · novembre 2026', en: 'No. 1 · November 2026' },
    image: '/decors/couverture-midnight-snack.jpg',
    to: null,
    tranche: { fond: '#f7c86a', encre: '#e8352b', police: 'var(--font-affiche)' },
    hauteur: 92,
    epaisseur: 10,
  },
  {
    id: 'gazette',
    rayon: 1,
    couverture: 'gazette',
    titre: { fr: 'La Gazette du Lab', en: 'La Gazette du Lab' },
    sous: { fr: 'Chaque matin dès 5 h 30', en: 'Every morning from 5:30 am' },
    // Texte court pour la tranche (sinon : sous)
    sousTranche: { fr: 'Quotidien', en: 'Daily' },
    to: '/breves',
    tranche: { fond: '#f1e7cf', encre: '#b3301d', police: 'var(--font-gothique)' },
    hauteur: 94,
    epaisseur: 8,
  },
  {
    // Portfolio relié pour les recruteurs (src/portfolio/)
    id: 'portfolio',
    rayon: 1,
    couverture: 'portfolio',
    titre: { fr: 'Portfolio', en: 'Portfolio' },
    sous: { fr: 'Michael Misran · Product Designer', en: 'Michael Misran · Product Designer' },
    sousTranche: { fr: 'M. Misran', en: 'M. Misran' },
    to: '/portfolio',
    tranche: { fond: '#1d3a2f', encre: '#d4b06a', police: 'var(--font-chapo)' },
    hauteur: 88,
    epaisseur: 9,
  },
]
