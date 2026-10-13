import { t } from '../i18n/ui'
import { getParutions } from '../saviez-vous/parutions'

// Chemin de fer du magazine : l'ordre des pages du site. On ne navigue plus
// par menu mais en tournant les pages, du sommaire ou par les renvois.
// Le numéro s'ouvre toujours en double page (une « planche ») :
// - format 'page' : page du numéro au format A (couverture, réclames, dossier…),
//   posée en vis-à-vis d'une autre page sur la même planche
// - format 'double' : rubrique du site, sur toute une double page ; si elle
//   déborde, elle continue sur les planches suivantes (« suites », calculées
//   à l'affichage par le Shell)
// - prefixe : les adresses enfants (/breves/2026-10-07, /jeux/geste-parfait…)
//   appartiennent à cette page du chemin de fer.

// theme : ambiance de couleurs propre au numéro (classe theme-<nom> sur la table, voir magazine.css)
const NUMERO = { numero: 1, mois: { fr: 'octobre 2026', en: 'October 2026' }, theme: 'halloween' }

const tr = (v, lang) => v[lang] ?? v.fr

// Rubriques du site
const R = {
  edito: { path: '/edito', format: 'double', cle: 'editoNav', chapo: 'sommaireEdito', couleur: 'var(--edito-bleu)', police: 'var(--font-pulp)' },
  breves: { path: '/breves', format: 'double', prefixe: true, cle: 'brevesNav', chapo: 'sommaireGazette', couleur: 'var(--titre-gazette)', police: 'var(--font-gothique)' },
  projets: { path: '/projets', format: 'double', prefixe: true, cle: 'mastheadIdees', chapo: 'sommaireIdees', couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
  lab: { path: '/lab', format: 'double', prefixe: true, cle: 'navTitreLab', chapo: 'sommaireLab', couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
  jeux: { path: '/jeux', format: 'double', prefixe: true, cle: 'jeuxNav', chapo: 'sommaireJeux', couleur: 'var(--titre-jeux)', police: 'var(--font-enseigne)' },
  // Le Zine est annoncé en couverture : sa page existe même avant le premier numéro
  zine: { path: '/zine', format: 'double', prefixe: true, cle: 'navTitreZine', chapo: 'sommaireZine', couleur: 'var(--titre-zine)', police: 'var(--font-bd)' },
  saviez: { path: '/saviez-vous', format: 'double', prefixe: true, cle: 'saviezVousNav', chapo: 'sommaireSaviezVous', couleur: 'var(--saviez-encre)', police: 'var(--font-bois-3)' },
  kiosque: { path: '/kiosque', format: 'double', cle: 'kiosqueNav', chapo: 'sommaireKiosque', couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
  suivre: { path: '/suivre', format: 'double', cle: 'mastheadAbonner', chapo: 'sommaireAbonner', couleur: 'var(--titre-gazette)', police: 'var(--font-pulp)' },
  cv: { path: '/lab/cv', format: 'double', cle: 'mastheadCV', chapo: 'sommaireCV', couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
}
// Page du numéro
const P = (path, fr, en) => ({ path, format: 'page', titre: { fr, en } })

// Le numéro, planche par planche : [page de gauche, page de droite] pour les
// pages du numéro (null = côté vide : la couverture est seule à droite, la
// 4ᵉ de couverture seule à gauche), ou une rubrique sur toute la planche.
function planches() {
  const saviezExiste = getParutions().length > 0
  return [
    [null, P('/magazine', 'Couverture', 'Cover')],
    [P('/sommaire', 'Courrier et sommaire', 'Letters and contents'), P('/reclames', 'Réclames', 'Adverts')],
    R.edito,
    R.projets,
    [P('/dossier', 'Le bureau qui travaille la nuit', 'The office that works at night'), P('/lab/presente', 'Le Lab vous présente', 'The Lab presents')],
    R.lab,
    [P('/avertissement', 'Avertissement au joueur', 'Warning to players'), P('/jeux/presente', 'Ma salle de jeu présente', 'My game room presents')],
    R.jeux,
    [P('/dossier/suite', 'Le bureau (suite et fin)', 'The office (continued)'), P('/derniere-minute', 'Dernière minute', 'Stop press')],
    ...(saviezExiste ? [R.saviez] : []),
    R.kiosque,
    R.suivre,
    R.cv,
    [P('/a-suivre', 'À suivre (4ᵉ de couverture)', 'To be continued (back cover)'), null],
  ]
}

// Aplatit les planches en pages, dans l'ordre de lecture, avec leur planche,
// leur côté et leur numéro de page imprimé : la couverture est la page 1 (à
// droite), ensuite les pages paires sont à gauche ; une rubrique compte pour
// 2 pages (sa première double page)
function entrees() {
  const liste = []
  let folio = 1
  planches().forEach((pl, planche) => {
    if (planche === 0) {
      liste.push({ ...pl[1], planche, cote: 'droite', folio })
      folio += 1
    } else if (Array.isArray(pl)) {
      pl.forEach((e, i) => {
        if (e) liste.push({ ...e, planche, cote: i === 0 ? 'gauche' : 'droite', folio: folio + i })
      })
      folio += 2
    } else {
      liste.push({ ...pl, planche, cote: 'double', folio })
      folio += 2
    }
  })
  return liste
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

// Numéro de page imprimé
export function folioDe(path) {
  const e = CHEMIN.find((x) => x.path === path)
  return e ? e.folio : 0
}

// Pages d'une planche, de gauche à droite (une seule pour une rubrique)
export function pagesDe(planche) {
  return CHEMIN.filter((e) => e.planche === planche)
}

// Nombre de planches du numéro
export function nombrePlanches() {
  return CHEMIN[CHEMIN.length - 1].planche + 1
}

// Remplace les renvois « {/chemin} » d'un texte par leur numéro de page
export function avecFolios(texte) {
  return texte.replace(/\{(\/[^}]*)\}/g, (_, path) => String(folioDe(path)))
}
