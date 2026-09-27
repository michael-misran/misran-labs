// Textes fr/en de la rubrique Projets et table des statuts/types/tailles.
// Séparé de ProjetsParts.jsx (pas de composants ici) pour ne déclencher
// aucun avertissement react-refresh/only-export-components.

export { formatDateShort } from '../magazine/magazineText'

// Statut : glyphe + couleur (jamais utilisée seule, voir StatusMark dans
// ProjetsParts.jsx) + style de bordure. Ordre = ordre du cycle de vie,
// utilisé pour l'ordre d'affichage des filtres.
export const STATUTS = {
  proposee: { fr: 'PROPOSÉE', en: 'PROPOSED', glyphe: '○', color: 'var(--text2)', border: 'dashed' },
  gardee: { fr: 'GARDÉE', en: 'KEPT', glyphe: '◆', color: 'var(--cyan)', border: 'solid' },
  'en-cours': { fr: 'EN COURS', en: 'IN PROGRESS', glyphe: '◐', color: 'var(--violet)', border: 'solid' },
  faite: { fr: 'FAITE', en: 'DONE', glyphe: '✓', color: 'var(--primary)', border: 'solid' },
  arretee: { fr: 'ARRÊTÉE', en: 'STOPPED', glyphe: '✕', color: 'var(--error)', border: 'solid' },
}

export const TYPES = {
  produit: { fr: 'PRODUIT', en: 'PRODUCT' },
  service: { fr: 'SERVICE', en: 'SERVICE' },
  outil: { fr: 'OUTIL', en: 'TOOL' },
  contenu: { fr: 'CONTENU', en: 'CONTENT' },
  amelioration: { fr: 'AMÉLIORATION', en: 'IMPROVEMENT' },
}

export const TAILLES = {
  petite: { fr: 'PETITE', en: 'SMALL' },
  moyenne: { fr: 'MOYENNE', en: 'MEDIUM' },
  grosse: { fr: 'GROSSE', en: 'LARGE' },
}

export function statutLabel(statut, lang) {
  const s = STATUTS[statut]
  if (!s) return String(statut).toUpperCase()
  return s[lang] ?? s.fr
}

export function typeLabel(type, lang) {
  const t = TYPES[type]
  if (!t) return String(type).toUpperCase()
  return t[lang] ?? t.fr
}

export function tailleLabel(taille, lang) {
  const ta = TAILLES[taille]
  if (!ta) return String(taille).toUpperCase()
  return ta[lang] ?? ta.fr
}

export const PROJ_TEXT = {
  fr: {
    home: {
      fileNo: 'RUBRIQUE — PROJETS',
      mastheadCenter: 'ARCHIVE DU LAB //// REGISTRE DES IDÉES',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'HEBDOMADAIRE',
      title: 'Projets',
      subtitle: 'IDÉES PROPOSÉES PAR CLAUDE — TRIÉES PAR MICHAEL',
      countLabel: 'IDÉES',
      cadenceLabel: 'CADENCE',
      cadenceValue: 'Chaque semaine',
      decisionLabel: 'DÉCISION',
      decisionValue: 'Michael, sur proposition d’une routine Claude',
      concept: "Chaque semaine, une routine Claude propose des idées de fonctionnalités, d'améliorations et de projets — y compris des projets qui peuvent rapporter de l'argent. Chaque idée porte un numéro qui n'est jamais réutilisé, même arrêtée : les idées arrêtées restent visibles pour ne pas être reproposées. Le modèle économique de chaque idée n'est pas publié.",
      filterLabel: 'FILTRER PAR STATUT',
      showAll: 'Tout afficher',
      resultLabel: (shown, total) => `${shown} idée${shown === 1 ? '' : 's'} affichée${shown === 1 ? '' : 's'} sur ${total}`,
      registerTitle: 'Registre',
      empty: 'Aucune idée proposée pour l’instant.',
      emptyFiltered: 'Aucune idée pour ce filtre.',
      docId: 'ID RUBRIQUE — ML-PROJETS',
    },
    idee: {
      mastheadCenter: 'ARCHIVE DU LAB //// REGISTRE DES IDÉES',
      backLabel: '← Projets',
      right: 'MISRAN LABS',
      typeLabel: 'TYPE',
      tailleLabel: 'TAILLE',
      statutLabel: 'STATUT',
      proposedOn: (date) => `PROPOSÉE LE ${date}`,
      problemTitle: 'Le problème',
      ideaTitle: 'L’idée',
      decisionTitle: 'Décision',
      decisionOn: (date) => `DÉCISION DU ${date}`,
      stoppedReason: 'RAISON DE L’ARRÊT',
      awaitingDecision: 'En attente de décision — Michael tranche en écrivant à Claude.',
      missionLabel: 'MISSION',
      backToList: '← Toutes les idées',
      docId: 'ID IDÉE — ML',
      notFoundFileNo: 'PROJET P-???',
      notFoundRight: '—',
      notFoundLabel: 'RÉFÉRENCE DEMANDÉE',
      notFoundTitle: 'Idée introuvable',
      notFoundBody: 'Aucune idée ne porte ce numéro.',
    },
    prive: {
      banner: '✕ NOTES PRIVÉES (LOCAL) — DEV UNIQUEMENT · NON PUBLIÉ',
      loading: 'Chargement…',
      missing: (id) => `Aucune note privée pour cette idée. Créer src/private/projets/${id}.md (gabarit dans src/projets/FORMAT.md).`,
    },
  },
  en: {
    home: {
      fileNo: 'SECTION — PROJECTS',
      mastheadCenter: 'LAB ARCHIVE //// IDEA REGISTER',
      mastheadRight: 'MISRAN LABS',
      mastheadRightSub: 'WEEKLY',
      title: 'Projects',
      subtitle: 'IDEAS PROPOSED BY CLAUDE — SORTED BY MICHAEL',
      countLabel: 'IDEAS',
      cadenceLabel: 'CADENCE',
      cadenceValue: 'Every week',
      decisionLabel: 'DECISION',
      decisionValue: "Michael, on a Claude routine's proposal",
      concept: "Every week, a Claude routine proposes ideas for features, improvements and projects — including projects that could make money. Each idea carries a number that is never reused, even when stopped: stopped ideas stay visible so they are not proposed again. Each idea's business model is not published.",
      filterLabel: 'FILTER BY STATUS',
      showAll: 'Show all',
      resultLabel: (shown, total) => `${shown} of ${total} idea${total === 1 ? '' : 's'} shown`,
      registerTitle: 'Register',
      empty: 'No idea proposed yet.',
      emptyFiltered: 'No idea matches this filter.',
      docId: 'SECTION ID — ML-PROJECTS',
    },
    idee: {
      mastheadCenter: 'LAB ARCHIVE //// IDEA REGISTER',
      backLabel: '← Projects',
      right: 'MISRAN LABS',
      typeLabel: 'TYPE',
      tailleLabel: 'SIZE',
      statutLabel: 'STATUS',
      proposedOn: (date) => `PROPOSED ON ${date}`,
      problemTitle: 'The problem',
      ideaTitle: 'The idea',
      decisionTitle: 'Decision',
      decisionOn: (date) => `DECISION OF ${date}`,
      stoppedReason: 'WHY IT WAS STOPPED',
      awaitingDecision: 'Awaiting decision — Michael decides by writing to Claude.',
      missionLabel: 'MISSION',
      backToList: '← All ideas',
      docId: 'IDEA ID — ML',
      notFoundFileNo: 'PROJECT P-???',
      notFoundRight: '—',
      notFoundLabel: 'REQUESTED REFERENCE',
      notFoundTitle: 'Idea not found',
      notFoundBody: 'No idea has this number.',
    },
    prive: {
      banner: '✕ PRIVATE NOTES (LOCAL) — DEV ONLY · NOT PUBLISHED',
      loading: 'Loading…',
      missing: (id) => `No private note for this idea. Create src/private/projets/${id}.md (template in src/projets/FORMAT.md).`,
    },
  },
}
