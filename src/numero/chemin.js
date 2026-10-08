import { t } from '../i18n/ui'
import { getParutions } from '../saviez-vous/parutions'

// Chemin de fer du magazine : l'ordre des pages du site. On ne navigue plus
// par menu mais en tournant les pages, du sommaire ou par les renvois.
// - format 'page' : page du numéro au format A (couverture, réclames, dossier…)
// - format 'double' : rubrique du site, ouverte comme une double page
// - prefixe : les adresses enfants (/breves/2026-10-07, /jeux/geste-parfait…)
//   appartiennent à cette page du chemin de fer.

// theme : ambiance de couleurs propre au numéro (classe theme-<nom> sur la table, voir magazine.css)
const NUMERO = { numero: 1, mois: { fr: 'octobre 2026', en: 'October 2026' }, theme: 'halloween' }

const tr = (v, lang) => v[lang] ?? v.fr

function entrees() {
  const saviezExiste = getParutions().length > 0
  return [
    { path: '/', format: 'page', titre: { fr: 'Couverture', en: 'Cover' } },
    { path: '/sommaire', format: 'page', titre: { fr: 'Courrier et sommaire', en: 'Letters and contents' } },
    { path: '/edito', format: 'double', cle: 'editoNav', chapo: 'sommaireEdito', couleur: 'var(--edito-bleu)', police: 'var(--font-pulp)' },
    { path: '/breves', format: 'double', prefixe: true, cle: 'brevesNav', chapo: 'sommaireGazette', couleur: 'var(--titre-gazette)', police: 'var(--font-gothique)' },
    { path: '/reclames', format: 'page', titre: { fr: 'Réclames', en: 'Adverts' } },
    { path: '/projets', format: 'double', prefixe: true, cle: 'mastheadIdees', chapo: 'sommaireIdees', couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
    { path: '/lab/presente', format: 'page', titre: { fr: 'Le Lab vous présente', en: 'The Lab presents' } },
    { path: '/lab', format: 'double', prefixe: true, cle: 'navTitreLab', chapo: 'sommaireLab', couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
    { path: '/dossier', format: 'page', titre: { fr: 'Le bureau qui travaille la nuit', en: 'The office that works at night' } },
    { path: '/avertissement', format: 'page', titre: { fr: 'Avertissement au joueur', en: 'Warning to players' } },
    { path: '/jeux/presente', format: 'page', titre: { fr: 'Ma salle de jeu présente', en: 'My game room presents' } },
    { path: '/jeux', format: 'double', prefixe: true, cle: 'jeuxNav', chapo: 'sommaireJeux', couleur: 'var(--titre-jeux)', police: 'var(--font-enseigne)' },
    { path: '/dossier/suite', format: 'page', titre: { fr: 'Le bureau (suite et fin)', en: 'The office (continued)' } },
    // Le Zine est annoncé en couverture : sa page existe même avant le premier numéro
    { path: '/zine', format: 'double', prefixe: true, cle: 'navTitreZine', chapo: 'sommaireZine', couleur: 'var(--titre-zine)', police: 'var(--font-bd)' },
    ...(saviezExiste
      ? [{ path: '/saviez-vous', format: 'double', prefixe: true, cle: 'saviezVousNav', chapo: 'sommaireSaviezVous', couleur: 'var(--saviez-encre)', police: 'var(--font-bois-3)' }]
      : []),
    { path: '/kiosque', format: 'double', cle: 'kiosqueNav', chapo: 'sommaireKiosque', couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
    { path: '/suivre', format: 'double', cle: 'mastheadAbonner', chapo: 'sommaireAbonner', couleur: 'var(--titre-gazette)', police: 'var(--font-pulp)' },
    { path: '/lab/cv', format: 'double', cle: 'mastheadCV', chapo: 'sommaireCV', couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
    { path: '/derniere-minute', format: 'page', titre: { fr: 'Dernière minute', en: 'Stop press' } },
    { path: '/a-suivre', format: 'page', titre: { fr: 'À suivre (4ᵉ de couverture)', en: 'To be continued (back cover)' } },
  ]
}

const CHEMIN = entrees()

export function getNumero() {
  return NUMERO
}

export function getChemin() {
  return CHEMIN
}

// Titre d'une page du chemin de fer, dans la langue courante
export function titreDe(entree, lang) {
  return entree.cle ? t(lang, entree.cle) : tr(entree.titre, lang)
}

// Page du chemin de fer à laquelle appartient une adresse : correspondance
// exacte d'abord, sinon la rubrique dont l'adresse est le plus long préfixe
export function entreeDe(pathname) {
  const chemin = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const exacte = CHEMIN.findIndex((e) => e.path === chemin)
  if (exacte !== -1) return { ...CHEMIN[exacte], index: exacte }
  let meilleure = -1
  CHEMIN.forEach((e, i) => {
    if (e.prefixe && chemin.startsWith(`${e.path}/`) && (meilleure === -1 || e.path.length > CHEMIN[meilleure].path.length)) meilleure = i
  })
  return meilleure === -1 ? null : { ...CHEMIN[meilleure], index: meilleure }
}

// Numéro de page imprimé (la couverture n'en a pas)
export function folioDe(path) {
  const i = CHEMIN.findIndex((e) => e.path === path)
  return i + 1
}

// Remplace les renvois « {/chemin} » d'un texte par leur numéro de page
export function avecFolios(texte) {
  return texte.replace(/\{(\/[^}]*)\}/g, (_, path) => String(folioDe(path)))
}
