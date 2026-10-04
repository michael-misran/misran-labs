// Textes fr/en de la rubrique Zine (D3, D4). « MISRAN ZINE » reste
// identique dans les deux langues (nom de la tête de titre).
export const ZINE_TEXT = {
  fr: {
    mastheadTitre: 'MISRAN ZINE',
    mastheadSub: 'FAIT À LA MAIN, PAS À LA CHAÎNE',
    backLabel: '← Zine',
    attenteNumero: 'LE #1 ARRIVE !',
    attenteBulle: 'Photos, dessins, jeux et carnet : en préparation à l’atelier.',
    numerosTitle: 'Numéros précédents',
    lireLabel: 'Lire le numéro →',
    editoTitle: 'Édito',
    notFoundLabel: 'RÉFÉRENCE DEMANDÉE',
    notFoundTitle: 'Ce numéro n’existe pas',
    notFoundBody: 'Aucun numéro ne porte ce numéro.',
    backToList: '← Tous les numéros',
    imprimerLabel: 'À imprimer',
  },
  en: {
    mastheadTitre: 'MISRAN ZINE',
    mastheadSub: 'HANDMADE, NOT MASS-PRODUCED',
    backLabel: '← Zine',
    attenteNumero: 'ISSUE #1 IS COMING!',
    attenteBulle: 'Photos, drawings, games and notebook pages: in the works.',
    numerosTitle: 'Previous issues',
    lireLabel: 'Read the issue →',
    editoTitle: 'Editorial',
    notFoundLabel: 'REQUESTED REFERENCE',
    notFoundTitle: 'This issue doesn’t exist',
    notFoundBody: 'No issue has this number.',
    backToList: '← All issues',
    imprimerLabel: 'Print it',
  },
}

export function zt(lang, key) {
  return ZINE_TEXT[lang]?.[key] ?? ZINE_TEXT.fr[key]
}

// "2026-11" → "novembre 2026" / "November 2026".
export function formatMoisAnnee(iso, lang) {
  const [y, m] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, 1)
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })
}

// "1" → "01".
export function numeroAffiche(numero) {
  return String(numero).padStart(2, '0')
}
