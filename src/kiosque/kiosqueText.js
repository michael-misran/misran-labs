// Textes fr/en de la page d'accueil (le kiosque). Pas de composants ici
// (react-refresh/only-export-components), même découpage que
// src/breves/brevesText.js.
import { formatDateLong } from '../magazine/magazineText'

export { formatDateLong }

export const KIOSQUE_TEXT = {
  fr: {
    sections: {
      alaUne: { title: 'À la une', subtitle: 'la Gazette de ce matin' },
      presentoirs: { title: 'Sur les présentoirs', subtitle: 'les autres titres de la maison' },
    },
    gazette: {
      // Le "G" et le "L" (index impairs) sont mis en --titre-gazette (D4).
      titre: ['La ', 'G', 'azette du ', 'L', 'ab'],
      editionLabel: 'Édition du matin',
      prixLabel: 'Prix : un café',
      kickerPrefix: '☞ À la une',
      lireLabel: 'Lire la Gazette du jour →',
      toutesLabel: 'Toutes les éditions',
      autresBrevesLabel: 'Les autres brèves',
      motDuJourLabel: 'Le mot du jour',
    },
    presentoirs: {
      magazine: {
        bandeauNom: ['Le', 'Magazine'],
        bandeauSub: 'Hebdo',
        legendeNom: 'Le Magazine',
        legendeRythme: 'chaque lundi',
      },
      zine: {
        tetiereNom: ['Misran', 'Zine'],
        tetiereNumero: '#1',
        bientot: 'Bientôt !',
        legendeNom: 'Le Zine',
        legendeRythme: 'bientôt · mensuel',
      },
      jeux: {
        titre: 'LES JEUX',
        sousTitre: ['MISRAN', 'LABS'],
        joueurs: '1 JOUEUR · 0 € · 0 PUB',
        legendeNom: 'Les Jeux',
        legendeRythme: 'toujours ouverts',
      },
      lab: {
        onglet: 'ML-LAB',
        etiquetteTitre: 'DOSSIERS DU LAB',
        agent: 'AGENT : M. MISRAN',
        classement: 'CLASSEMENT : ouvert au public',
        piecesLabel: 'PIÈCES : ',
        tamponBarre: 'CONFIDENTIEL',
        tamponBas: 'DÉCLASSIFIÉ',
        legendeNom: 'Le Lab',
        legendeRythme: 'projets & portfolio',
      },
    },
    bulletin: {
      titre: 'Bulletin d’abonnement',
      phrase: 'Cochez vos titres. C’est gratuit, sans compte, par flux RSS.',
      tousLesFlux: 'Tous les flux et réseaux →',
    },
  },
  en: {
    sections: {
      alaUne: { title: 'Front page', subtitle: 'this morning’s Gazette' },
      presentoirs: { title: 'On the newsstand', subtitle: 'the house’s other titles' },
    },
    gazette: {
      // "L" and "G" (odd indexes) are set in --titre-gazette (D4).
      titre: ['The ', 'L', 'ab ', 'G', 'azette'],
      editionLabel: 'Morning edition',
      prixLabel: 'Price: one coffee',
      kickerPrefix: '☞ Front page',
      lireLabel: 'Read today’s Gazette →',
      toutesLabel: 'All editions',
      autresBrevesLabel: 'Other briefs',
      motDuJourLabel: 'Word of the day',
    },
    presentoirs: {
      magazine: {
        bandeauNom: ['The', 'Magazine'],
        bandeauSub: 'Weekly',
        legendeNom: 'The Magazine',
        legendeRythme: 'every monday',
      },
      zine: {
        tetiereNom: ['Misran', 'Zine'],
        tetiereNumero: '#1',
        bientot: 'Coming soon!',
        legendeNom: 'The Zine',
        legendeRythme: 'coming soon · monthly',
      },
      jeux: {
        titre: 'THE GAMES',
        sousTitre: ['MISRAN', 'LABS'],
        joueurs: '1 PLAYER · 0 € · 0 ADS',
        legendeNom: 'The Games',
        legendeRythme: 'always open',
      },
      lab: {
        onglet: 'ML-LAB',
        etiquetteTitre: 'LAB CASE FILES',
        agent: 'AGENT: M. MISRAN',
        classement: 'CLEARANCE: open to the public',
        piecesLabel: 'FILES: ',
        tamponBarre: 'CLASSIFIED',
        tamponBas: 'DECLASSIFIED',
        legendeNom: 'The Lab',
        legendeRythme: 'projects & portfolio',
      },
    },
    bulletin: {
      titre: 'Subscription form',
      phrase: 'Check your titles. Free, no account, by RSS feed.',
      tousLesFlux: 'All feeds and networks →',
    },
  },
}
