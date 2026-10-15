// Textes de la couverture de « L’Atelier automatique » (FR / EN). Module à
// part pour que la librairie affiche la vraie couverture sans charger tout le livre.

export const TEXTE_COUV = {
  bandeauCentre: { fr: 'Notice n° MM-1977', en: 'Manual No. MM-1977' },
  titreL1: { fr: 'L’Atelier', en: 'The Automatic' },
  titreL2: { fr: 'Automatique', en: 'Workshop' },
  sousL1: { fr: 'Manuel d’utilisation', en: 'Operation and' },
  sousL2: { fr: 'et d’entretien', en: 'maintenance manual' },
  editionCouv: { fr: 'Édition 01', en: 'Edition 01' },
  avisL1: { fr: 'Lire avant', en: 'Read before' },
  avisL2: { fr: 'toute utilisation', en: 'any use' },
  figCouverture: { fr: 'Fig. 1 — Vue éclatée de l’atelier', en: 'Fig. 1 — Exploded view of the workshop' },
  legendeAgents: ['Controleur', 'Relecteur', 'Secrétaire', 'Veilleur', 'Vérificateur', 'Explorateur', 'Expert'],
  plaqueModeleK: { fr: 'Modèle', en: 'Model' },
  plaqueModeleV: { fr: 'MM-1977 · série 01', en: 'MM-1977 · series 01' },
  plaqueAlimK: { fr: 'Alimentation', en: 'Power' },
  plaqueAlimV: { fr: '1 humain, quelques idées', en: '1 human, a few ideas' },
  plaqueFabK: { fr: 'Fabrication', en: 'Built' },
  plaqueFabV: { fr: 'à la main, avec des machines', en: 'by hand, with machines' },
}

export const lt = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.fr : v)
