// Règles d'audit. Ajouter une règle = ajouter un objet au tableau REGLES :
// { id, gravite, verifier(contexte) → constats[] }. La gravité de la règle
// est la valeur par défaut ; un constat peut porter la sienne (R1 en CSS).
//
// Le contexte fourni à `verifier` :
//   tokens        tous les tokens (modèle commun)
//   declarations  déclarations CSS ordinaires (R3)
//   index         Map nom → tokens[] (un nom peut être défini dans plusieurs contextes)
//   utilises      Set des noms référencés quelque part (tokens ou déclarations)
//   graphe        Map nom → tableau des noms référencés et définis
import { analyserCouleur, cleCouleur, normaliserValeur } from './outils.js'

function constat({ gravite, tokens = [], fichier = null, emplacement = null, fr, en }) {
  return { gravite, tokens, fichier, emplacement, detail: { fr, en } }
}

const estBrut = (t) => typeof t.valeur === 'string' && t.references.length === 0 && t.valeur !== ''

/* --- R1 Référence cassée ------------------------------------------------ */
const r1 = {
  id: 'R1',
  gravite: 'erreur',
  verifier({ tokens, index }) {
    const constats = []
    for (const t of tokens) {
      for (const ref of t.references) {
        if (index.has(ref)) continue
        const avecRepli = t.format === 'css' && t.repli?.includes(ref)
        constats.push(
          constat({
            gravite: avecRepli ? 'avertissement' : 'erreur',
            tokens: [t.nom],
            fichier: t.fichier,
            emplacement: t.emplacement,
            fr: avecRepli
              ? `« ${t.nom} » référence « ${ref} », défini nulle part, mais une valeur de secours évite la panne.`
              : `« ${t.nom} » référence « ${ref} », qui n'est défini dans aucun des fichiers fournis.`,
            en: avecRepli
              ? `"${t.nom}" references "${ref}", which is defined nowhere, but a fallback value avoids a failure.`
              : `"${t.nom}" references "${ref}", which is not defined in any of the provided files.`,
          })
        )
      }
    }
    return constats
  },
}

/* --- R2 Référence circulaire -------------------------------------------- */
const r2 = {
  id: 'R2',
  gravite: 'erreur',
  verifier({ index, graphe }) {
    const constats = []
    const vus = new Set()
    const etat = new Map() // 1 = en cours, 2 = terminé

    const visiter = (nom, chemin) => {
      etat.set(nom, 1)
      chemin.push(nom)
      for (const ref of graphe.get(nom) ?? []) {
        if (etat.get(ref) === 1) {
          const cycle = chemin.slice(chemin.indexOf(ref))
          // Rotation canonique : le plus petit nom en tête, pour ne signaler qu'une fois.
          const debut = cycle.indexOf([...cycle].sort()[0])
          const canon = [...cycle.slice(debut), ...cycle.slice(0, debut)]
          const cle = canon.join('>')
          if (!vus.has(cle)) {
            vus.add(cle)
            const premier = index.get(canon[0])?.[0]
            const boucle = [...canon, canon[0]].join(' → ')
            constats.push(
              constat({
                gravite: 'erreur',
                tokens: canon,
                fichier: premier?.fichier ?? null,
                emplacement: premier?.emplacement ?? null,
                fr: `Référence circulaire : ${boucle}. Aucune de ces valeurs ne peut être résolue.`,
                en: `Circular reference: ${boucle}. None of these values can be resolved.`,
              })
            )
          }
        } else if (!etat.has(ref)) {
          visiter(ref, chemin)
        }
      }
      chemin.pop()
      etat.set(nom, 2)
    }

    for (const nom of graphe.keys()) if (!etat.has(nom)) visiter(nom, [])
    return constats
  },
}

/* --- R3 Valeur codée en dur hors tokens (CSS) --------------------------- */
const RE_HEX = /#[0-9a-f]{3,8}(?![\w-])/gi
const RE_FONCTION_COULEUR = /\b(?:rgba?|hsla?)\([^)]*\)/gi
const RE_PX = /(?<![\w.#])(-?\d*\.?\d+)px(?![\w-])/gi

const r3 = {
  id: 'R3',
  gravite: 'avertissement',
  verifier({ declarations }) {
    const constats = []
    for (const d of declarations) {
      if (d.valeur.includes('var(')) continue
      const sansUrl = d.valeur.replace(/url\([^)]*\)/gi, '').replace(/(["'])(?:\\.|(?!\1).)*\1/g, '')
      const trouvees = [
        ...(sansUrl.match(RE_HEX) ?? []),
        ...(sansUrl.match(RE_FONCTION_COULEUR) ?? []),
        ...[...sansUrl.matchAll(RE_PX)].filter((m) => Math.abs(Number(m[1])) > 1).map((m) => m[0]),
      ]
      if (trouvees.length === 0) continue
      const liste = trouvees.join(', ')
      constats.push(
        constat({
          gravite: 'avertissement',
          fichier: d.fichier,
          emplacement: d.ligne,
          fr: `« ${d.propriete}: ${d.valeur} » (${d.selecteur}) porte une valeur en dur : ${liste}. À remplacer par un token.`,
          en: `"${d.propriete}: ${d.valeur}" (${d.selecteur}) carries a hard-coded value: ${liste}. Replace it with a token.`,
        })
      )
    }
    return constats
  },
}

/* --- R4 Doublon de valeur ----------------------------------------------- */
const r4 = {
  id: 'R4',
  gravite: 'avertissement',
  verifier({ tokens }) {
    const groupes = new Map()
    for (const t of tokens) {
      if (!estBrut(t)) continue
      const cle = `${t.fichier}\u0000${t.contexte ?? ''}\u0000${normaliserValeur(t.valeur)}`
      if (!groupes.has(cle)) groupes.set(cle, [])
      groupes.get(cle).push(t)
    }
    const constats = []
    for (const membres of groupes.values()) {
      const noms = [...new Set(membres.map((t) => t.nom))]
      if (noms.length < 2) continue
      const liste = noms.join(', ')
      const valeur = membres[0].valeur
      constats.push(
        constat({
          gravite: 'avertissement',
          tokens: noms,
          fichier: membres[0].fichier,
          emplacement: membres[0].emplacement,
          fr: `${noms.length} tokens portent la même valeur « ${valeur} » : ${liste}. L'un pourrait être l'alias de l'autre.`,
          en: `${noms.length} tokens carry the same value "${valeur}": ${liste}. One could be an alias of the other.`,
        })
      )
    }
    return constats
  },
}

/* --- R5 Couleurs quasi identiques --------------------------------------- */
const r5 = {
  id: 'R5',
  gravite: 'info',
  verifier({ tokens }) {
    // Regroupe les tokens par couleur opaque : on compare des couleurs, pas des tokens.
    const couleurs = new Map()
    for (const t of tokens) {
      if (!estBrut(t) || (t.type && t.type !== 'color')) continue
      const c = analyserCouleur(t.valeur)
      if (!c || c.a !== 1) continue
      const cle = cleCouleur(c)
      if (!couleurs.has(cle)) couleurs.set(cle, { c, tokens: [] })
      couleurs.get(cle).tokens.push(t)
    }
    const liste = [...couleurs.values()]
    const constats = []
    for (let i = 0; i < liste.length; i++) {
      for (let j = i + 1; j < liste.length; j++) {
        const a = liste[i]
        const b = liste[j]
        const proche =
          Math.abs(a.c.r - b.c.r) <= 3 && Math.abs(a.c.g - b.c.g) <= 3 && Math.abs(a.c.b - b.c.b) <= 3
        if (!proche) continue
        const nomsA = [...new Set(a.tokens.map((t) => t.nom))]
        const nomsB = [...new Set(b.tokens.map((t) => t.nom))]
        // Un même nom redéfini dans un autre contexte n'est pas un doublon.
        if (nomsA.some((n) => nomsB.includes(n))) continue
        constats.push(
          constat({
            gravite: 'info',
            tokens: [...nomsA, ...nomsB],
            fichier: a.tokens[0].fichier,
            emplacement: a.tokens[0].emplacement,
            fr: `Couleurs quasi identiques : ${nomsA.join(', ')} (${a.tokens[0].valeur}) et ${nomsB.join(', ')} (${b.tokens[0].valeur}). Une différence imperceptible est souvent un oubli d'harmonisation.`,
            en: `Nearly identical colors: ${nomsA.join(', ')} (${a.tokens[0].valeur}) and ${nomsB.join(', ')} (${b.tokens[0].valeur}). An imperceptible difference is often a missed harmonisation.`,
          })
        )
      }
    }
    return constats
  },
}

/* --- R6 Token inutilisé ------------------------------------------------- */
const r6 = {
  id: 'R6',
  gravite: 'info',
  verifier({ index, utilises }) {
    const constats = []
    for (const [nom, definitions] of index) {
      if (utilises.has(nom)) continue
      const premier = definitions[0]
      constats.push(
        constat({
          gravite: 'info',
          tokens: [nom],
          fichier: premier.fichier,
          emplacement: premier.emplacement,
          fr: `« ${nom} » n'est référencé nulle part dans les fichiers fournis. Il peut être utilisé ailleurs (code, autres fichiers) : à vérifier avant de le supprimer.`,
          en: `"${nom}" is not referenced anywhere in the provided files. It may be used elsewhere (code, other files): check before removing it.`,
        })
      )
    }
    return constats
  },
}

/* --- R7 Chaîne d'alias trop longue -------------------------------------- */
const MAX_CHAINE = 3

const r7 = {
  id: 'R7',
  gravite: 'info',
  verifier({ index, graphe }) {
    // Profondeur d'un token : nombre de références successives avant la valeur finale.
    const profondeurs = new Map()
    const calculer = (nom, enCours) => {
      if (profondeurs.has(nom)) return profondeurs.get(nom)
      if (enCours.has(nom)) return 0 // cycle : traité par R2
      enCours.add(nom)
      let max = 0
      for (const ref of graphe.get(nom) ?? []) max = Math.max(max, 1 + calculer(ref, enCours))
      enCours.delete(nom)
      profondeurs.set(nom, max)
      return max
    }
    for (const nom of graphe.keys()) calculer(nom, new Set())

    const longs = new Set([...profondeurs].filter(([, p]) => p > MAX_CHAINE).map(([nom]) => nom))
    // On ne signale que le sommet d'une chaîne : pas les maillons d'une chaîne déjà signalée.
    const maillons = new Set()
    for (const nom of longs) for (const ref of graphe.get(nom) ?? []) if (longs.has(ref)) maillons.add(ref)

    const constats = []
    for (const nom of longs) {
      if (maillons.has(nom)) continue
      const premier = index.get(nom)?.[0]
      const chaine = [nom]
      let courant = nom
      for (let n = 0; n < 50; n++) {
        const suivant = (graphe.get(courant) ?? []).find((r) => profondeurs.get(r) === profondeurs.get(courant) - 1)
        if (!suivant || chaine.includes(suivant)) break
        chaine.push(suivant)
        courant = suivant
      }
      const p = profondeurs.get(nom)
      constats.push(
        constat({
          gravite: 'info',
          tokens: chaine,
          fichier: premier?.fichier ?? null,
          emplacement: premier?.emplacement ?? null,
          fr: `Chaîne d'alias de ${p} références : ${chaine.join(' → ')}. Au-delà de ${MAX_CHAINE}, la valeur finale devient difficile à retrouver.`,
          en: `Alias chain of ${p} references: ${chaine.join(' → ')}. Beyond ${MAX_CHAINE}, the final value becomes hard to trace.`,
        })
      )
    }
    return constats
  },
}

/* --- R8 Type manquant (JSON) -------------------------------------------- */
const r8 = {
  id: 'R8',
  gravite: 'info',
  verifier({ tokens }) {
    const constats = []
    for (const t of tokens) {
      if (t.format === 'css' || t.type) continue
      constats.push(
        constat({
          gravite: 'info',
          tokens: [t.nom],
          fichier: t.fichier,
          emplacement: t.emplacement,
          fr: `« ${t.nom} » n'a pas de type (ni propre, ni hérité de son groupe). Les outils ne peuvent pas savoir s'il s'agit d'une couleur, d'une dimension, etc.`,
          en: `"${t.nom}" has no type (neither its own nor inherited from its group). Tools cannot tell whether it is a color, a dimension, etc.`,
        })
      )
    }
    return constats
  },
}

export const REGLES = [r1, r2, r3, r4, r5, r6, r7, r8]
