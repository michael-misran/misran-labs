// Matrice impact × effort : des sujets agrégés (pas un point par constat), issus
// d'une table fixe. Module pur, sans React ni Vite.

const bilingue = (fr, en) => ({ fr, en })

export const QUADRANTS = [
  { id: 'gains-rapides', titre: bilingue('Gains rapides', 'Quick wins') },
  { id: 'chantiers', titre: bilingue('Chantiers structurants', 'Structural projects') },
  { id: 'appoint', titre: bilingue('Améliorations d’appoint', 'Minor improvements') },
  { id: 'plus-tard', titre: bilingue('À planifier plus tard', 'Plan for later') },
]

export function quadrantDe(impact, effort) {
  if (impact === 'fort') return effort === 'fort' ? 'chantiers' : 'gains-rapides'
  return effort === 'faible' ? 'appoint' : 'plus-tard'
}

const nombreConstats = (resultat, regles) => (resultat?.constats ?? []).filter((c) => regles.includes(c.regle)).length

// Nombre d'éléments manquants d'un axe : somme des `manque` des critères non remplis
// ou, à défaut, un par critère non rempli. `seulementMesures` : ignore les critères sans `manque`.
const manquesAxe = (grille, id, seulementMesures = false) => {
  const axe = grille?.axes?.find((a) => a.id === id)
  if (!axe) return 0
  return axe.criteres
    .filter((c) => c.ok === false && (!seulementMesures || c.manque !== undefined))
    .reduce((s, c) => s + (c.manque ?? 1), 0)
}

// entrees : { resultat, couverture | null, grille, contrastes | null } → { sujets, quadrants }
// `sujets` : [{ id, titre, unite, compte, impact, effort, quadrant }] dans l'ordre de la table ;
// `quadrants` : { [idQuadrant]: sujets[] }. Un sujet sans occurrence n'apparaît pas.
export function prioriser({ resultat, couverture = null, grille, contrastes = null } = {}) {
  const taux = couverture?.taux ?? null
  const table = [
    { id: 'references', titre: bilingue('Références cassées ou circulaires', 'Broken or circular references'), unite: bilingue('constats', 'findings'), compte: nombreConstats(resultat, ['R1', 'R2']), impact: 'fort', effort: 'faible' },
    { id: 'deja-tokenisees', titre: bilingue('Valeurs en dur qui ont déjà un token', 'Hard-coded values that already have a token'), unite: bilingue('valeurs', 'values'), compte: couverture?.nombreDejaTokenisees ?? 0, impact: 'fort', effort: 'faible' },
    { id: 'contrastes', titre: bilingue('Contrastes insuffisants', 'Insufficient contrast'), unite: bilingue('paires', 'pairs'), compte: contrastes?.echecs ?? 0, impact: 'fort', effort: 'moyen' },
    { id: 'doublons', titre: bilingue('Doublons et couleurs quasi identiques', 'Duplicates and near-identical colors'), unite: bilingue('constats', 'findings'), compte: nombreConstats(resultat, ['R4', 'R5']), impact: 'moyen', effort: 'faible' },
    { id: 'couverture', titre: bilingue('Couverture du code inférieure à 80 %', 'Code coverage below 80%'), unite: bilingue('valeurs en dur', 'hard-coded values'), compte: taux !== null && taux < 0.8 ? couverture.valeursEnDur : 0, impact: 'fort', effort: 'fort' },
    { id: 'composants', titre: bilingue('Composants sans stories ou sans tests', 'Components without stories or tests'), unite: bilingue('manques', 'gaps'), compte: manquesAxe(grille, 'composants', true), impact: 'moyen', effort: 'fort' },
    { id: 'documentation', titre: bilingue('Documentation manquante', 'Missing documentation'), unite: bilingue('éléments', 'items'), compte: manquesAxe(grille, 'documentation'), impact: 'moyen', effort: 'moyen' },
    { id: 'gouvernance', titre: bilingue('Gouvernance manquante', 'Missing governance'), unite: bilingue('éléments', 'items'), compte: manquesAxe(grille, 'gouvernance'), impact: 'moyen', effort: 'faible' },
    { id: 'hygiene', titre: bilingue('Valeurs en dur dans les tokens, types manquants, chaînes d’alias longues', 'Hard-coded values in tokens, missing types, long alias chains'), unite: bilingue('constats', 'findings'), compte: nombreConstats(resultat, ['R3', 'R7', 'R8']), impact: 'faible', effort: 'faible' },
    { id: 'inutilises', titre: bilingue('Tokens inutilisés', 'Unused tokens'), unite: bilingue('tokens', 'tokens'), compte: nombreConstats(resultat, ['R6']), impact: 'faible', effort: 'moyen' },
  ]
  const sujets = table
    .filter((s) => s.compte > 0)
    .map((s) => ({ ...s, quadrant: quadrantDe(s.impact, s.effort) }))
  const quadrants = Object.fromEntries(QUADRANTS.map((q) => [q.id, sujets.filter((s) => s.quadrant === q.id)]))
  return { sujets, quadrants }
}
