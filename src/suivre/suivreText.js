// Textes fr/en de la page /suivre et données des flux RSS / réseaux.
// Séparé du composant (pas de composants ici) pour ne déclencher aucun
// avertissement react-refresh/only-export-components.
// SITE_URL dupliqué depuis scripts/share-previews.js (côté Node, non
// importable dans le bundle navigateur) et index.html.

const SITE_URL = 'https://misran-labs.vercel.app'

const FEEDS_BASE = [
  { key: 'breves', path: '/breves/rss.xml', name: { fr: 'La Gazette du Lab', en: 'The Lab Gazette' }, rythme: { fr: 'Chaque matin', en: 'Every morning' } },
  { key: 'projets', path: '/projets/rss.xml', name: { fr: 'Les idées du Lab', en: "The Lab's ideas" }, rythme: { fr: 'Chaque dimanche', en: 'Every Sunday' } },
  { key: 'tout', path: '/rss.xml', name: { fr: 'Tout le kiosque', en: 'The whole kiosk' }, rythme: { fr: 'Tout à la fois', en: 'All at once' } },
]

// Un flux = { key, url, name: {fr,en}, rythme: {fr,en} }.
export const FEEDS = FEEDS_BASE.map((f) => ({ ...f, url: `${SITE_URL}${f.path}` }))

// Un réseau = { name, url, description: {fr,en} } — tableau de données pour
// en ajouter un en une ligne (D4 de la SPEC de la mission rss-suivre).
export const NETWORKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/michael-misran',
    description: { fr: 'Parcours et actualité professionnelle.', en: 'Career background and professional updates.' },
  },
  {
    name: 'GitHub',
    url: 'https://github.com/michael-misran/misran-labs',
    description: { fr: 'Le code source du Lab, en public.', en: "The Lab's source code, in the open." },
  },
]

// Bulletin d'abonnement en forme de coupon à découper (mission kiosque-annexes, D3).
export const SUIVRE_TEXT = {
  fr: {
    kicker: 'Bulletin à découper',
    title: 'Bulletin d’abonnement',
    intro: 'Aucun compte à créer : cochez un flux ou suivez un réseau, et les nouveautés viennent à vous.',
    decouper: 'Découper ici',
    feedsHelp: 'Collez l’adresse dans votre lecteur (Feedly, NetNewsWire, Inoreader…).',
    copyLabel: 'Copier',
    copiedLabel: 'Copié ✓',
    openLabel: 'Ouvrir',
    networksTitle: 'Autres façons de nous lire',
  },
  en: {
    kicker: 'Cut-out coupon',
    title: 'Subscription coupon',
    intro: 'No account needed: check a feed or follow a network, and updates come to you.',
    decouper: 'Cut here',
    feedsHelp: 'Paste the address into your reader (Feedly, NetNewsWire, Inoreader…).',
    copyLabel: 'Copy',
    copiedLabel: 'Copied ✓',
    openLabel: 'Open',
    networksTitle: 'Other ways to read us',
  },
}

// Bandeau « Suivre » en bas des pages de rubrique (mission lien-suivre, D2).
export const BANDEAU_TEXT = {
  fr: {
    phrase: {
      breves: 'La Gazette revient demain matin.',
      projets: 'De nouvelles idées chaque dimanche.',
    },
    suivre: 'Suivre le Lab →',
    rss: 'RSS',
  },
  en: {
    phrase: {
      breves: 'The Briefs are back tomorrow morning.',
      projets: 'New ideas every Sunday.',
    },
    suivre: 'Follow the Lab →',
    rss: 'RSS',
  },
}
