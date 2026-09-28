// Lecteur JSON Tokens Studio : un token est un objet qui a `value` (et en
// général `type`). Les ensembles de premier niveau (global, light, dark…)
// deviennent le contexte du token ; `$themes` et `$metadata` sont ignorés.
// Les références {chemin} sont résolues par nom sur l'ensemble des fichiers :
// un token défini dans `global` reste trouvable depuis `light` ou `dark`.
import { extraireReferencesAccolades, valeurJson } from '../outils.js'

const PROFONDEUR_MAX = 50

const estObjet = (v) => v && typeof v === 'object' && !Array.isArray(v)
const aValue = (o) => Object.prototype.hasOwnProperty.call(o, 'value')
const typeDe = (o) => (typeof o.type === 'string' ? o.type : typeof o.$type === 'string' ? o.$type : null)

export function lireTokensStudio(json, fichier) {
  const tokens = []

  const ajouter = (jeu, chemin, noeud, typeHerite) => {
    const nom = chemin.join('.')
    tokens.push({
      nom,
      valeur: valeurJson(noeud.value),
      type: typeDe(noeud) ?? typeHerite,
      references: extraireReferencesAccolades(noeud.value),
      repli: [],
      fichier,
      emplacement: jeu ? `${jeu}.${nom}` : nom,
      contexte: jeu,
      format: 'tokens-studio',
    })
  }

  const parcourir = (jeu, noeud, chemin, typeHerite) => {
    if (chemin.length > PROFONDEUR_MAX) return
    const type = typeDe(noeud) ?? typeHerite
    for (const [cle, enfant] of Object.entries(noeud)) {
      if (cle.startsWith('$') || !estObjet(enfant)) continue
      const nouveauChemin = [...chemin, cle]
      if (aValue(enfant)) ajouter(jeu, nouveauChemin, enfant, type)
      else parcourir(jeu, enfant, nouveauChemin, type)
    }
  }

  if (estObjet(json)) {
    for (const [cle, enfant] of Object.entries(json)) {
      if (cle.startsWith('$') || !estObjet(enfant)) continue
      // Un token posé directement à la racine n'a pas d'ensemble.
      if (aValue(enfant)) ajouter(null, [cle], enfant, null)
      else parcourir(cle, enfant, [], null)
    }
  }
  return { tokens, declarations: [], avertissements: [] }
}
