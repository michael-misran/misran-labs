// Textes fr/en des pages du magazine et table des catégories d'article.
// Séparé de MagazineParts.jsx (pas de composants ici) pour ne déclencher
// aucun avertissement react-refresh/only-export-components.

export const CATEGORIES = {
  outils: { fr: 'OUTILS', en: 'TOOLS', color: 'var(--mandarine)' },
  modeles: { fr: 'MODÈLES', en: 'MODELS', color: 'var(--violet)' },
  design: { fr: 'DESIGN', en: 'DESIGN', color: 'var(--pink)' },
  dev: { fr: 'DEV', en: 'DEV', color: 'var(--cyan)' },
  workflow: { fr: 'WORKFLOW', en: 'WORKFLOW', color: 'var(--warning)' },
}

// Repli pour une catégorie inconnue — ne devrait pas arriver, la validation
// de numeros.js rejette déjà tout numéro dont une catégorie n'est pas dans
// CATEGORIES.
export function categoryLabel(categorie, lang) {
  const cat = CATEGORIES[categorie]
  if (!cat) return String(categorie).toUpperCase()
  return cat[lang] ?? cat.fr
}

export function categoryColor(categorie) {
  return CATEGORIES[categorie]?.color ?? 'var(--muted)'
}

// "0" → "000", "12" → "012".
export function issueNo(numero) {
  return String(numero).padStart(3, '0')
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

// "2026-09-28" → "28 septembre 2026" / "September 28, 2026" : comme
// formatDateLong, sans le jour de la semaine (libellés d'onglet, flux RSS).
export function formatDateLongNoWeekday(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const MAG_TEXT = {
  fr: {
    home: {
      fileNo: 'RUBRIQUE — MAGAZINE',
      mastheadCenter: 'ARCHIVE DU LAB //// REVUE DE VEILLE',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'HEBDOMADAIRE',
      title: 'Magazine',
      subtitle: 'VEILLE IA HEBDOMADAIRE — DESIGN & DEV',
      publishedLabel: 'PARUTION',
      publishedValue: 'Chaque lundi',
      editorialLabel: 'RÉDACTION',
      editorialValue: 'Routine Claude, relue par Michael',
      sectionsLabel: 'RUBRIQUES',
      concept: "Une veille IA hebdomadaire pour les designers et les développeurs : outils, modèles, workflows, Claude, Figma. Chaque lundi, une routine Claude sélectionne et résume l'essentiel de la semaine, puis Michael relit et valide le numéro avant sa parution.",
      issuesTitle: 'Numéros',
      empty: 'Aucun numéro publié pour l’instant.',
      latestTag: 'DERNIER NUMÉRO',
      articleCountOne: 'ARTICLE',
      articleCountMany: 'ARTICLES',
      docId: 'ID RUBRIQUE — ML-MAGAZINE',
      lireLabel: 'Lire le numéro →',
      rssLabel: 'Flux RSS',
    },
    issue: {
      mastheadCenter: 'ARCHIVE DU LAB //// REVUE DE VEILLE',
      backLabel: '← Magazine',
      right: 'MISRAN LABS',
      articlesLabel: 'ARTICLES',
      sectionsLabel: 'RUBRIQUES',
      editorialLabel: 'RÉDACTION',
      editorialValue: 'Routine Claude, relue par Michael',
      editoTitle: 'Édito',
      editoSignature: '— LA RÉDACTION · MISRAN LABS',
      articlesTitle: 'Articles',
      whyItMatters: 'POURQUOI ÇA COMPTE',
      sourcesLabel: 'SOURCES',
      backToList: '← Tous les numéros',
      contentsTitle: 'Sommaire',
      previousLabel: '← Numéro précédent',
      nextLabel: 'Numéro suivant →',
      docId: 'ID NUMÉRO — ML-MAG',
      notFoundFileNo: 'MAGAZINE Nº ???',
      notFoundRight: '—',
      notFoundLabel: 'RÉFÉRENCE DEMANDÉE',
      notFoundTitle: 'Numéro introuvable',
      notFoundBody: 'Aucun numéro ne correspond à cette date.',
    },
  },
  en: {
    home: {
      fileNo: 'SECTION — MAGAZINE',
      mastheadCenter: 'LAB ARCHIVE //// WATCH REVIEW',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'WEEKLY',
      title: 'Magazine',
      subtitle: 'WEEKLY AI WATCH — DESIGN & DEV',
      publishedLabel: 'PUBLISHED',
      publishedValue: 'Every Monday',
      editorialLabel: 'EDITORIAL',
      editorialValue: 'Claude routine, reviewed by Michael',
      sectionsLabel: 'SECTIONS',
      concept: 'A weekly AI watch for designers and developers: tools, models, workflows, Claude, Figma. Every Monday, a Claude routine selects and summarizes what mattered that week, then Michael reviews and approves the issue before it goes out.',
      issuesTitle: 'Issues',
      empty: 'No issue published yet.',
      latestTag: 'LATEST',
      articleCountOne: 'ARTICLE',
      articleCountMany: 'ARTICLES',
      docId: 'SECTION ID — ML-MAGAZINE',
      lireLabel: 'Read the issue →',
      rssLabel: 'RSS feed',
    },
    issue: {
      mastheadCenter: 'LAB ARCHIVE //// WATCH REVIEW',
      backLabel: '← Magazine',
      right: 'MISRAN LABS',
      articlesLabel: 'ARTICLES',
      sectionsLabel: 'SECTIONS',
      editorialLabel: 'EDITORIAL',
      editorialValue: 'Claude routine, reviewed by Michael',
      editoTitle: 'Editorial',
      editoSignature: '— THE EDITORS · MISRAN LABS',
      articlesTitle: 'Articles',
      whyItMatters: 'WHY IT MATTERS',
      sourcesLabel: 'SOURCES',
      backToList: '← All issues',
      contentsTitle: 'Contents',
      previousLabel: '← Previous issue',
      nextLabel: 'Next issue →',
      docId: 'ISSUE ID — ML-MAG',
      notFoundFileNo: 'MAGAZINE Nº ???',
      notFoundRight: '—',
      notFoundLabel: 'REQUESTED REFERENCE',
      notFoundTitle: 'Issue not found',
      notFoundBody: 'No issue matches this date.',
    },
  },
}
