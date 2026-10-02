// Distribution simulée des réponses des joueurs (D5), affichée comme telle
// (bandeau de démo géré par le socle via meta.demo). Déterministe : toujours
// appelée avec la graine du jour, jamais Math.random().
const TAILLE = 500
const SIGMA_LOG = 0.35
const FACTEUR_SOUS_ESTIMATION = 0.9

// Box-Muller : transforme deux tirages uniformes [0, 1) en une normale(0, 1).
function normaleStandard(rng) {
  const u1 = Math.max(rng(), 1e-9)
  const u2 = rng()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

// 500 réponses log-normales centrées sur 0,9 × la vraie valeur (on sous-estime
// en général les grandes quantités), écart-type log ≈ 0,35 (D5).
export function genererReponsesSimulees(rng, vraie) {
  const mu = Math.log(Math.max(vraie, 1) * FACTEUR_SOUS_ESTIMATION)
  const reponses = []
  for (let i = 0; i < TAILLE; i++) {
    reponses.push(Math.exp(mu + SIGMA_LOG * normaleStandard(rng)))
  }
  return reponses
}
