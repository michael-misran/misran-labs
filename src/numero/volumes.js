// Volumes rangés sur l'étagère de la bibliothèque (page d'accueil). Pour ajouter un
// numéro, un livre ou une autre revue : une entrée de plus ici.
// - rayon : 0 (haut) ou 1 (bas)
// - couverture : modèle de couverture affiché quand on sort le volume
//   ('numero', 'midnight', 'gazette', 'zine', 'prochain')
// - collection : 'journaux' | 'magazines' | 'manuels' | 'carnets' — pour le rayon de la bibliothèque
// - parution : date ISO AAAA-MM-JJ, ou null si pas encore parue
// - to : adresse ouverte par « Lire » (null = pas encore paru)
// - hauteur / epaisseur : taille de la tranche, en % de la hauteur du rayon
//   et en % de la largeur de l'étagère
import { getNumero, estParu } from '../midnight/numeros'

export const VOLUMES = [
  {
    id: 'numero-1',
    rayon: 0,
    couverture: 'numero',
    collection: 'magazines',
    parution: '2026-10-01',
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
    collection: 'magazines',
    parution: '2026-11-01',
    titre: { fr: 'Midnight Snack', en: 'Midnight Snack' },
    sous: { fr: 'N°1 · novembre 2026', en: 'No. 1 · November 2026' },
    image: '/decors/couverture-midnight-snack.jpg',
    // Parue le 2026-11-01 (SPEC midnight-snack-1 D2) : /midnight/1 s'ouvre tout seul ce jour-là
    to: estParu(getNumero(1)) ? '/midnight/1' : null,
    tranche: { fond: '#f7c86a', encre: '#e8352b', police: 'var(--font-affiche)' },
    hauteur: 92,
    epaisseur: 10,
  },
  {
    id: 'gazette',
    rayon: 1,
    couverture: 'gazette',
    collection: 'journaux',
    parution: '2026-09-29',
    titre: { fr: 'L’Oracle du Matin', en: 'The Morning Oracle' },
    sous: { fr: 'Chaque matin dès 5 h 30', en: 'Every morning from 5:30 am' },
    // Texte court pour la tranche (sinon : sous)
    sousTranche: { fr: 'Quotidien', en: 'Daily' },
    to: '/oracle',
    tranche: { fond: '#f1e7cf', encre: '#b3301d', police: 'var(--font-gothique)' },
    hauteur: 94,
    epaisseur: 8,
  },
  {
    // Portfolio relié pour les recruteurs (src/portfolio/)
    id: 'portfolio',
    rayon: 1,
    couverture: 'portfolio',
    collection: 'carnets',
    parution: '2026-10-13',
    titre: { fr: 'Portfolio', en: 'Portfolio' },
    sous: { fr: 'Michael Misran · Product Designer', en: 'Michael Misran · Product Designer' },
    sousTranche: { fr: 'M. Misran', en: 'M. Misran' },
    to: '/portfolio',
    tranche: { fond: '#1d3a2f', encre: '#d4b06a', police: 'var(--font-chapo)' },
    hauteur: 88,
    epaisseur: 9,
  },
  {
    id: 'atelier',
    rayon: 0,
    couverture: 'atelier',
    collection: 'manuels',
    parution: '2026-10-15',
    titre: { fr: 'L’Atelier automatique', en: 'The Automatic Workshop' },
    sous: { fr: 'Manuel d’utilisation et d’entretien', en: 'Operation and maintenance manual' },
    to: '/atelier',
    tranche: { fond: '#173d69', encre: '#e9f1f8', police: 'var(--font-etiquette)' },
    hauteur: 90,
    epaisseur: 9,
  },
  {
    id: 'nuancier',
    rayon: 0,
    couverture: 'nuancier',
    collection: 'manuels',
    parution: null,
    titre: { fr: 'Le Nuancier', en: 'The Colour Chart' },
    sous: { fr: 'À paraître', en: 'Coming soon' },
    to: null,
    tranche: { fond: '#efe6d2', encre: '#2a1d14', police: 'var(--font-etiquette)' },
    hauteur: 86,
    epaisseur: 7,
  },
  {
    id: 'carnet',
    rayon: 1,
    couverture: 'carnet',
    collection: 'carnets',
    parution: null,
    titre: { fr: 'Carnet d’inventions', en: 'Notebook of Inventions' },
    sous: { fr: 'À paraître', en: 'Coming soon' },
    to: null,
    tranche: { fond: '#1d1a16', encre: '#e9e2d0', police: 'var(--font-machine)' },
    hauteur: 80,
    epaisseur: 6,
  },
]
