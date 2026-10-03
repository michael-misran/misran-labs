// Textes fr/en des pages de Brèves et table des rubriques.
// Séparé de BrevesParts.jsx (pas de composants ici) pour ne déclencher
// aucun avertissement react-refresh/only-export-components — même
// découpage que src/magazine/magazineText.js.
import { formatDateShort, formatDateLong } from '../magazine/magazineText'

export { formatDateShort, formatDateLong }

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

export const BREVES_TEXT = {
  fr: {
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
      previousDaysTitle: 'Jours précédents',
      empty: 'Aucune brève publiée pour l\'instant.',
      docId: 'ID RUBRIQUE — ML-BREVES',
    },
    day: {
      mastheadCenter: 'ARCHIVE DU LAB //// ACTU DU JOUR',
      backLabel: '← La Gazette',
      right: 'MISRAN LABS',
      wordLabel: 'LE MOT',
      figureLabel: 'LE CHIFFRE',
      sourceLink: 'Lire la source ↗',
      previousDay: '← Jour précédent',
      nextDay: 'Jour suivant →',
      backToList: '← Toutes les éditions',
      docId: 'ID JOUR — ML-BREVES',
      notFoundFileNo: 'GAZETTE — ???',
      notFoundRight: '—',
      notFoundLabel: 'RÉFÉRENCE DEMANDÉE',
      notFoundTitle: 'Aucune brève ce jour-là',
      notFoundBody: 'Aucune brève n\'a été publiée à cette date.',
    },
  },
  en: {
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
      previousDaysTitle: 'Previous days',
      empty: 'No briefs published yet.',
      docId: 'SECTION ID — ML-BREVES',
    },
    day: {
      mastheadCenter: 'LAB ARCHIVE //// DAILY BRIEFS',
      backLabel: '← The Gazette',
      right: 'MISRAN LABS',
      wordLabel: 'THE WORD',
      figureLabel: 'THE FIGURE',
      sourceLink: 'Read the source ↗',
      previousDay: '← Previous day',
      nextDay: 'Next day →',
      backToList: '← All editions',
      docId: 'DAY ID — ML-BREVES',
      notFoundFileNo: 'GAZETTE — ???',
      notFoundRight: '—',
      notFoundLabel: 'REQUESTED REFERENCE',
      notFoundTitle: 'No briefs that day',
      notFoundBody: 'No briefs were published on this date.',
    },
  },
}
