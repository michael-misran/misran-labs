// Registre des jeux (D1, D2) : un jeu = un dossier avec meta.js (données
// pures, lisibles par scripts/share-previews.js côté Node) et Jeu.jsx
// (composant, chargé à la demande). Modèle : src/breves/jours.js.
import { lazy } from 'react'

const metaModules = import.meta.glob('./*/meta.js', { eager: true })
const composantLoaders = import.meta.glob('./*/Jeu.jsx')

function isBilingueNonVide(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.fr === 'string' && value.fr.trim() !== '' &&
    typeof value.en === 'string' && value.en.trim() !== ''
  )
}

function validationError(meta, slugAttendu) {
  if (meta == null || typeof meta !== 'object') return 'meta.js ne exporte pas un objet'
  if (meta.slug !== slugAttendu) return `slug "${meta.slug}" ne correspond pas au dossier "${slugAttendu}"`
  if (!isBilingueNonVide(meta.titre)) return 'titre.fr/en manquant ou vide'
  if (!isBilingueNonVide(meta.accroche)) return 'accroche.fr/en manquant ou vide'
  return null
}

function loadJeux() {
  const jeux = []

  for (const [chemin, mod] of Object.entries(metaModules)) {
    const slug = chemin.split('/')[1]
    const meta = mod.default ?? mod
    const error = validationError(meta, slug)
    if (error) {
      console.warn(`[jeux] jeu ignoré (${slug}) : ${error}`)
      continue
    }

    const composantChemin = `./${slug}/Jeu.jsx`
    const charger = composantLoaders[composantChemin]
    if (!charger) {
      console.warn(`[jeux] jeu ignoré (${slug}) : Jeu.jsx introuvable`)
      continue
    }

    jeux.push({
      ...meta,
      entrainement: meta.entrainement !== false,
      demo: meta.demo === true,
      // lazy() appelé une fois ici, au chargement du module : jamais
      // pendant un rendu (react-hooks/static-components).
      Composant: lazy(charger),
    })
  }

  jeux.sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
  return jeux
}

const JEUX = loadJeux()

export function listeJeux() {
  return JEUX
}

export function getJeu(slug) {
  return JEUX.find((jeu) => jeu.slug === slug)
}
