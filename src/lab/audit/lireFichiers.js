// Détecte le format de chaque fichier, appelle le bon lecteur et fusionne
// le résultat dans le modèle commun de tokens. Un fichier illisible produit
// un avertissement, jamais une exception.
import { lireCss } from './lecteurs/css.js'
import { avertissement } from './outils.js'

export const LIMITE_CARACTERES = 300000

// Formats connus. Les lecteurs JSON sont branchés à l'étape suivante.
export const FORMATS = ['css', 'dtcg', 'tokens-studio']

// Détection d'un fichier : renvoie { format, json } où `json` est le contenu
// analysé (JSON) ou null. `format` vaut null quand rien n'est reconnu ;
// `erreur` porte le message d'un JSON invalide.
export function detecterFormat(nom, contenu) {
  const texte = contenu.trim()
  const extension = /\.([a-z0-9]+)$/i.exec(nom)?.[1]?.toLowerCase() ?? ''
  if (extension === 'css' || extension === 'scss') return { format: 'css', json: null }

  const ressembleAJson = extension === 'json' || texte.startsWith('{') || texte.startsWith('[')
  if (!ressembleAJson) return { format: 'css', json: null }

  let json
  try {
    json = JSON.parse(texte)
  } catch (e) {
    return { format: null, json: null, erreur: e.message }
  }
  if (contientCle(json, '$value')) return { format: 'dtcg', json }
  if (contientObjetAvecValue(json)) return { format: 'tokens-studio', json }
  return { format: null, json, aucunToken: true }
}

function contientCle(noeud, cle, profondeur = 0) {
  if (!noeud || typeof noeud !== 'object' || profondeur > 50) return false
  if (!Array.isArray(noeud) && Object.prototype.hasOwnProperty.call(noeud, cle)) return true
  return Object.values(noeud).some((v) => contientCle(v, cle, profondeur + 1))
}

function contientObjetAvecValue(noeud, profondeur = 0) {
  if (!noeud || typeof noeud !== 'object' || profondeur > 50) return false
  if (!Array.isArray(noeud) && Object.prototype.hasOwnProperty.call(noeud, 'value')) return true
  return Object.values(noeud).some((v) => contientObjetAvecValue(v, profondeur + 1))
}

const LECTEURS_JSON = {}

// Permet aux lecteurs JSON de s'enregistrer sans import circulaire.
export function enregistrerLecteurJson(format, lecteur) {
  LECTEURS_JSON[format] = lecteur
}

export function lireFichiers(fichiers) {
  const tokens = []
  const declarations = []
  const avertissements = []
  const lus = []

  const liste = Array.isArray(fichiers) ? fichiers : []
  let restant = LIMITE_CARACTERES

  liste.forEach((fichier, index) => {
    const nom = typeof fichier?.nom === 'string' && fichier.nom ? fichier.nom : `fichier-${index + 1}`
    let contenu = typeof fichier?.contenu === 'string' ? fichier.contenu : ''

    if (restant <= 0) {
      avertissements.push(
        avertissement(
          nom,
          `Fichier ignoré : la limite de ${LIMITE_CARACTERES} caractères au total est atteinte.`,
          `File skipped: the ${LIMITE_CARACTERES}-character total limit has been reached.`
        )
      )
      return
    }
    if (contenu.length > restant) {
      contenu = contenu.slice(0, restant)
      avertissements.push(
        avertissement(
          nom,
          `Contenu tronqué à ${LIMITE_CARACTERES} caractères au total : la fin du fichier n'est pas analysée.`,
          `Content truncated to ${LIMITE_CARACTERES} characters in total: the end of the file is not analysed.`
        )
      )
    }
    restant -= contenu.length

    try {
      const detection = detecterFormat(nom, contenu)

      if (detection.erreur) {
        avertissements.push(
          avertissement(
            nom,
            `JSON invalide : ${detection.erreur}`,
            `Invalid JSON: ${detection.erreur}`
          )
        )
        lus.push({ nom, format: null, tokens: 0 })
        return
      }
      if (detection.aucunToken) {
        avertissements.push(
          avertissement(nom, 'Aucun token reconnu dans ce JSON.', 'No token recognised in this JSON.')
        )
        lus.push({ nom, format: null, tokens: 0 })
        return
      }

      let resultat
      if (detection.format === 'css') {
        resultat = lireCss(contenu, nom)
        if (resultat.tokens.length === 0) {
          resultat.avertissements.push(
            avertissement(
              nom,
              'Aucun token (propriété personnalisée --nom) trouvé dans ce fichier.',
              'No token (--name custom property) found in this file.'
            )
          )
        }
      } else if (LECTEURS_JSON[detection.format]) {
        resultat = LECTEURS_JSON[detection.format](detection.json, nom)
      } else {
        resultat = {
          tokens: [],
          declarations: [],
          avertissements: [
            avertissement(
              nom,
              'Ce format JSON n\'est pas encore pris en charge.',
              'This JSON format is not supported yet.'
            ),
          ],
        }
      }

      tokens.push(...resultat.tokens)
      declarations.push(...(resultat.declarations ?? []))
      avertissements.push(...resultat.avertissements)
      lus.push({ nom, format: detection.format, tokens: resultat.tokens.length })
    } catch (e) {
      avertissements.push(
        avertissement(
          nom,
          `Fichier illisible : ${e.message}`,
          `Unreadable file: ${e.message}`
        )
      )
      lus.push({ nom, format: null, tokens: 0 })
    }
  })

  return { tokens, declarations, avertissements, fichiers: lus }
}
