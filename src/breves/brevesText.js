// Textes fr/en des pages de Brèves et table des rubriques.
// Séparé de GazetteParts.jsx (pas de composants ici) pour ne déclencher
// aucun avertissement react-refresh/only-export-components. `formatDateShort`/
// `formatDateLong` sont redéclarées ici : cette rubrique ne dépend d'aucune
// autre section de la maison.

export const RUBRIQUES = {
  ia: { fr: 'IA', en: 'AI', color: 'var(--violet)' },
  tech: { fr: 'TECH', en: 'TECH', color: 'var(--cyan)' },
}

// Repli pour une rubrique inconnue — ne devrait pas arriver, la validation
// de jours.js rejette déjà tout jour dont une rubrique n'est pas dans
// RUBRIQUES.
export function rubriqueLabel(rubrique, lang) {
  const r = RUBRIQUES[rubrique]
  if (!r) return String(rubrique).toUpperCase()
  return r[lang] ?? r.fr
}

export function rubriqueColor(rubrique) {
  return RUBRIQUES[rubrique]?.color ?? 'var(--muted)'
}

// "2026-09-28" → "28.09.2026". Concaténation manuelle : même rendu FR et EN.
export function formatDateShort(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

// "2026-09-28" → "lundi 28 septembre 2026" / "Monday, September 28, 2026".
// Découpage manuel de la chaîne avant new Date() : "2026-09-28" seul est
// interprété en UTC par le moteur JS et peut retomber sur la veille selon
// le fuseau local.
export function formatDateLong(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const BREVES_TEXT = {
  fr: {
    tete: {
      oreilleGauche: 'Édition du matin',
      oreilleDroite: 'Prix : un café',
      titre: ['La ', 'G', 'azette du ', 'L', 'ab'],
      devise: 'Le quotidien du Lab, à lire avec le café — IA · Tech',
      paraitChaque: 'Paraît chaque matin',
      brevesCount: (n) => `${n} brève${n === 1 ? '' : 's'}`,
    },
    edition: {
      kickerPrefix: 'À la une',
      sourceLabel: 'Source',
    },
    home: {
      fileNo: 'RUBRIQUE — GAZETTE',
      mastheadCenter: 'ARCHIVE DU LAB //// ACTU DU JOUR',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'QUOTIDIEN',
      title: 'La Gazette du Lab',
      subtitle: 'LES BRÈVES IA & TECH DU JOUR',
      publishedLabel: 'PARUTION',
      publishedValue: 'Chaque jour',
      editorialLabel: 'RÉDACTION',
      editorialValue: 'Routine Claude, tirée de l\'édition papier du matin',
      sectionsLabel: 'RUBRIQUES',
      concept: "Chaque jour, quelques brèves tirées de La Gazette du Lab, le journal papier du matin de Michael : l'actu IA et tech du moment, en 2 à 3 phrases, avec un lien vers la source. Plus le mot et le chiffre du jour.",
      todayTitle: 'Aujourd\'hui',
      wordLabel: 'LE MOT',
      figureLabel: 'LE CHIFFRE',
      sourceLink: 'Lire la source ↗',
      previousDaysTitle: 'Les éditions précédentes',
      empty: 'Aucune édition pour l\'instant.',
      docId: 'ID RUBRIQUE — ML-BREVES',
      subscribeTitle: 'S\'abonner à la Gazette',
      subscribeBody: 'Dans votre lecteur de flux, ou via la page Suivre.',
      rssLabel: 'Flux RSS',
      suivreLabel: 'Suivre',
    },
    day: {
      mastheadCenter: 'ARCHIVE DU LAB //// ACTU DU JOUR',
      backLabel: '← La Gazette',
      right: 'MISRAN LABS',
      wordLabel: 'LE MOT',
      figureLabel: 'LE CHIFFRE',
      sourceLink: 'Lire la source ↗',
      previousDay: '← Édition précédente',
      nextDay: 'Édition suivante →',
      backToList: 'Toutes les éditions',
      docId: 'ID JOUR — ML-BREVES',
      notFoundFileNo: 'GAZETTE — ???',
      notFoundRight: '—',
      notFoundLabel: 'DATE DEMANDÉE',
      notFoundTitle: 'Pas d\'édition ce jour-là',
      notFoundBody: 'Aucune édition n\'a été publiée à cette date.',
    },
  },
  en: {
    tete: {
      oreilleGauche: 'Morning edition',
      oreilleDroite: 'Price: one coffee',
      titre: ['The ', 'L', 'ab ', 'G', 'azette'],
      devise: 'The Lab\'s daily, best read with coffee — AI · Tech',
      paraitChaque: 'Published every morning',
      brevesCount: (n) => `${n} brief${n === 1 ? '' : 's'}`,
    },
    edition: {
      kickerPrefix: 'Front page',
      sourceLabel: 'Source',
    },
    home: {
      fileNo: 'SECTION — GAZETTE',
      mastheadCenter: 'LAB ARCHIVE //// DAILY BRIEFS',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'DAILY',
      title: 'The Lab Gazette',
      subtitle: 'TODAY\'S AI & TECH BRIEFS',
      publishedLabel: 'PUBLISHED',
      publishedValue: 'Every day',
      editorialLabel: 'EDITORIAL',
      editorialValue: 'Claude routine, drawn from the morning paper edition',
      sectionsLabel: 'SECTIONS',
      concept: "Every day, a handful of briefs drawn from The Lab Gazette, Michael's morning paper: the latest in AI and tech, in 2 to 3 sentences, with a link to the source. Plus the word and the figure of the day.",
      todayTitle: 'Today',
      wordLabel: 'THE WORD',
      figureLabel: 'THE FIGURE',
      sourceLink: 'Read the source ↗',
      previousDaysTitle: 'Previous editions',
      empty: 'No edition yet.',
      docId: 'SECTION ID — ML-BREVES',
      subscribeTitle: 'Subscribe to the Gazette',
      subscribeBody: 'In your feed reader, or via the Follow page.',
      rssLabel: 'RSS feed',
      suivreLabel: 'Follow',
    },
    day: {
      mastheadCenter: 'LAB ARCHIVE //// DAILY BRIEFS',
      backLabel: '← The Gazette',
      right: 'MISRAN LABS',
      wordLabel: 'THE WORD',
      figureLabel: 'THE FIGURE',
      sourceLink: 'Read the source ↗',
      previousDay: '← Previous edition',
      nextDay: 'Next edition →',
      backToList: 'All editions',
      docId: 'DAY ID — ML-BREVES',
      notFoundFileNo: 'GAZETTE — ???',
      notFoundRight: '—',
      notFoundLabel: 'REQUESTED DATE',
      notFoundTitle: 'No edition that day',
      notFoundBody: 'No edition was published on this date.',
    },
  },
}
