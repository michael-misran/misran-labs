// Logique pure du type « ciel étoilé » (D2.2), sans JSX. Les étoiles sont de
// simples points : aucun placement ne peut échouer, valeur = n exactement.
export const PLAGE = [80, 600]

export function genererCiel(rng) {
  const n = Math.round(PLAGE[0] + rng() * (PLAGE[1] - PLAGE[0]))
  const etoiles = []
  for (let i = 0; i < n; i++) {
    etoiles.push({ x: rng() * 300, y: rng() * 300, r: 0.6 + rng() * 1.8, opacite: 0.5 + rng() * 0.5 })
  }
  return { valeur: etoiles.length, etoiles }
}
