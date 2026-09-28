// Point d'entrée unique du moteur d'audit : analyse(fichiers) avec
// fichiers = [{ nom, contenu }]. Déterministe, sans réseau, sans IA :
// tout se passe dans le navigateur (ou dans Node pour les vérifications).
import { lireFichiers } from './lireFichiers.js'
import { REGLES } from './regles.js'
import { GRAVITES, avertissement } from './outils.js'

// Index des noms, ensemble des noms référencés et graphe des alias.
function preparerContexte(tokens, declarations) {
  const index = new Map()
  for (const t of tokens) {
    if (!index.has(t.nom)) index.set(t.nom, [])
    index.get(t.nom).push(t)
  }

  const utilises = new Set()
  const graphe = new Map()
  for (const [nom, definitions] of index) {
    const refs = new Set()
    for (const t of definitions) {
      for (const ref of t.references) {
        utilises.add(ref)
        if (index.has(ref)) refs.add(ref)
      }
    }
    graphe.set(nom, [...refs])
  }
  for (const d of declarations) for (const ref of d.references) utilises.add(ref)

  return { tokens, declarations, index, utilises, graphe }
}

function calculerResume(fichiers, tokens, constats) {
  const tokensParFormat = {}
  const tokensParType = {}
  for (const t of tokens) {
    tokensParFormat[t.format] = (tokensParFormat[t.format] ?? 0) + 1
    const type = t.type ?? 'inconnu'
    tokensParType[type] = (tokensParType[type] ?? 0) + 1
  }
  const constatsParGravite = Object.fromEntries(GRAVITES.map((g) => [g, 0]))
  const nomsAffectes = new Set()
  for (const c of constats) {
    constatsParGravite[c.gravite]++
    if (c.gravite !== 'info') for (const nom of c.tokens) nomsAffectes.add(nom)
  }
  const tokensSains = tokens.filter((t) => !nomsAffectes.has(t.nom)).length
  return {
    fichiers: fichiers.length,
    tokens: tokens.length,
    tokensParFormat,
    tokensParType,
    constatsParGravite,
    tokensSains,
    partSaine: tokens.length === 0 ? null : tokensSains / tokens.length,
  }
}

export function analyse(fichiers) {
  let lecture = { tokens: [], declarations: [], avertissements: [], fichiers: [] }
  try {
    lecture = lireFichiers(fichiers)
    const contexte = preparerContexte(lecture.tokens, lecture.declarations)

    const constats = []
    const avertissements = [...lecture.avertissements]
    for (const regle of REGLES) {
      try {
        for (const c of regle.verifier(contexte)) {
          constats.push({ regle: regle.id, ...c, gravite: c.gravite ?? regle.gravite })
        }
      } catch (e) {
        avertissements.push(
          avertissement(
            null,
            `La règle ${regle.id} n'a pas pu s'exécuter : ${e.message}`,
            `Rule ${regle.id} could not run: ${e.message}`
          )
        )
      }
    }
    constats.sort(
      (a, b) => GRAVITES.indexOf(a.gravite) - GRAVITES.indexOf(b.gravite) || a.regle.localeCompare(b.regle)
    )

    return {
      tokens: lecture.tokens,
      fichiers: lecture.fichiers,
      constats,
      resume: calculerResume(lecture.fichiers, lecture.tokens, constats),
      avertissements,
    }
  } catch (e) {
    // Dernier filet : jamais d'exception vers la page.
    return {
      tokens: [],
      fichiers: lecture.fichiers,
      constats: [],
      resume: calculerResume([], [], []),
      avertissements: [
        avertissement(null, `Analyse impossible : ${e.message}`, `Analysis failed: ${e.message}`),
      ],
    }
  }
}
