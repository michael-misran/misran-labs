// Textes fr/en de la page /suivre et données des flux RSS / réseaux.
// Séparé du composant (pas de composants ici) pour ne déclencher aucun
// avertissement react-refresh/only-export-components.
// SITE_URL dupliqué depuis scripts/share-previews.js (côté Node, non
// importable dans le bundle navigateur) et index.html.

const SITE_URL = 'https://misran-labs.vercel.app'

const FEEDS_BASE = [
  { key: 'magazine', path: '/magazine/rss.xml', name: { fr: 'Lab Magazine', en: 'Lab Magazine' }, rythme: { fr: 'Chaque lundi', en: 'Every Monday' } },
  { key: 'breves', path: '/breves/rss.xml', name: { fr: 'Brèves', en: 'Briefs' }, rythme: { fr: 'Chaque matin', en: 'Every morning' } },
  { key: 'projets', path: '/projets/rss.xml', name: { fr: 'Projets', en: 'Projects' }, rythme: { fr: 'Chaque dimanche', en: 'Every Sunday' } },
  { key: 'tout', path: '/rss.xml', name: { fr: 'Tout', en: 'Everything' }, rythme: { fr: 'Tout à la fois', en: 'All at once' } },
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

export const SUIVRE_TEXT = {
  fr: {
    backLabel: '← Lab',
    fileNo: 'SUIVRE',
    mastheadCenter: 'ARCHIVE DU LAB //// FLUX & RÉSEAUX',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'SUIVI',
    title: 'Suivre le Lab',
    intro: "Pas de compte à créer : un lecteur RSS ou un réseau, et les nouveautés viennent à vous.",
    feedsTitle: 'Flux RSS',
    feedsHelp: 'Collez l’adresse dans votre lecteur (Feedly, NetNewsWire, Inoreader…).',
    copyLabel: 'Copier',
    copiedLabel: 'Copié ✓',
    openLabel: 'Ouvrir',
    networksTitle: 'Réseaux',
    docId: 'DOC-SUIVRE',
  },
  en: {
    backLabel: '← Lab',
    fileNo: 'FOLLOW',
    mastheadCenter: 'LAB ARCHIVE //// FEEDS & NETWORKS',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'FOLLOW',
    title: 'Follow the Lab',
    intro: 'No account needed: an RSS reader or a network, and updates come to you.',
    feedsTitle: 'RSS feeds',
    feedsHelp: 'Paste the address into your reader (Feedly, NetNewsWire, Inoreader…).',
    copyLabel: 'Copy',
    copiedLabel: 'Copied ✓',
    openLabel: 'Open',
    networksTitle: 'Networks',
    docId: 'DOC-FOLLOW',
  },
}

// Bandeau « Suivre » en bas des pages de rubrique (mission lien-suivre, D2).
export const BANDEAU_TEXT = {
  fr: {
    phrase: {
      magazine: 'Le prochain numéro sort lundi.',
      breves: 'Les Brèves reviennent demain matin.',
      projets: 'De nouvelles idées chaque dimanche.',
    },
    suivre: 'Suivre le Lab →',
    rss: 'RSS',
  },
  en: {
    phrase: {
      magazine: 'The next issue comes out on Monday.',
      breves: 'The Briefs are back tomorrow morning.',
      projets: 'New ideas every Sunday.',
    },
    suivre: 'Follow the Lab →',
    rss: 'RSS',
  },
}
