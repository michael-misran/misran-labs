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
      fileNo: 'RUBRIQUE — BRÈVES',
      mastheadCenter: 'ARCHIVE DU LAB //// ACTU DU JOUR',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'QUOTIDIEN',
      title: 'Brèves',
      subtitle: 'L\'ACTU IA & TECH DU JOUR',
      publishedLabel: 'PARUTION',
      publishedValue: 'Chaque jour',
      editorialLabel: 'RÉDACTION',
      editorialValue: 'Routine Claude, tirée du Journal du matin',
      sectionsLabel: 'RUBRIQUES',
      concept: "Chaque jour, quelques brèves tirées du Journal du matin de Michael : l'actu IA et tech du moment, en 2 à 3 phrases, avec un lien vers la source. Plus le mot et le chiffre du jour.",
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
      backLabel: '← Brèves',
      right: 'MISRAN LABS',
      wordLabel: 'LE MOT',
      figureLabel: 'LE CHIFFRE',
      sourceLink: 'Lire la source ↗',
      previousDay: '← Jour précédent',
      nextDay: 'Jour suivant →',
      backToList: '← Toutes les brèves',
      docId: 'ID JOUR — ML-BREVES',
      notFoundFileNo: 'BRÈVES — ???',
      notFoundRight: '—',
      notFoundLabel: 'RÉFÉRENCE DEMANDÉE',
      notFoundTitle: 'Aucune brève ce jour-là',
      notFoundBody: 'Aucune brève n\'a été publiée à cette date.',
    },
  },
  en: {
    home: {
      fileNo: 'SECTION — BRIEFS',
      mastheadCenter: 'LAB ARCHIVE //// DAILY BRIEFS',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'DAILY',
      title: 'Briefs',
      subtitle: 'TODAY\'S AI & TECH NEWS',
      publishedLabel: 'PUBLISHED',
      publishedValue: 'Every day',
      editorialLabel: 'EDITORIAL',
      editorialValue: 'Claude routine, drawn from the morning journal',
      sectionsLabel: 'SECTIONS',
      concept: "Every day, a handful of briefs drawn from Michael's morning journal: the latest in AI and tech, in 2 to 3 sentences, with a link to the source. Plus the word and the figure of the day.",
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
      backLabel: '← Briefs',
      right: 'MISRAN LABS',
      wordLabel: 'THE WORD',
      figureLabel: 'THE FIGURE',
      sourceLink: 'Read the source ↗',
      previousDay: '← Previous day',
      nextDay: 'Next day →',
      backToList: '← All briefs',
      docId: 'DAY ID — ML-BREVES',
      notFoundFileNo: 'BRIEFS — ???',
      notFoundRight: '—',
      notFoundLabel: 'REQUESTED REFERENCE',
      notFoundTitle: 'No briefs that day',
      notFoundBody: 'No briefs were published on this date.',
    },
  },
}
