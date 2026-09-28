// Lecteur JSON W3C DTCG : un token est un objet qui a `$value`. Le `$type`
// est hérité du groupe parent s'il manque ; le nom est le chemin des groupes
// joint par des points ; les clés qui commencent par `$` ne sont pas des groupes.
import { extraireReferencesAccolades, valeurJson } from '../outils.js'

const PROFONDEUR_MAX = 50

const estObjet = (v) => v && typeof v === 'object' && !Array.isArray(v)

export function lireDtcg(json, fichier) {
  const tokens = []

  const parcourir = (noeud, chemin, typeHerite) => {
    if (chemin.length > PROFONDEUR_MAX) return
    const type = typeof noeud.$type === 'string' ? noeud.$type : typeHerite
    for (const [cle, enfant] of Object.entries(noeud)) {
      if (cle.startsWith('$') || !estObjet(enfant)) continue
      const nouveauChemin = [...chemin, cle]
      if (Object.prototype.hasOwnProperty.call(enfant, '$value')) {
        const nom = nouveauChemin.join('.')
        tokens.push({
          nom,
          valeur: valeurJson(enfant.$value),
          type: typeof enfant.$type === 'string' ? enfant.$type : type,
          references: extraireReferencesAccolades(enfant.$value),
          repli: [],
          fichier,
          emplacement: nom,
          contexte: null,
          format: 'dtcg',
        })
      } else {
        parcourir(enfant, nouveauChemin, type)
      }
    }
  }

  if (estObjet(json)) parcourir(json, [], null)
  return { tokens, declarations: [], avertissements: [] }
}
