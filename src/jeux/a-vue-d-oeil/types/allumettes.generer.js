// Logique pure du type « allumettes en vrac » (D2.5), sans JSX. Dispersion
// libre dans le cadre : pas de contrainte de chevauchement (des allumettes
// jetées en vrac se touchent naturellement), valeur = n exactement.
export const PLAGE = [30, 250]
const LONGUEUR_MIN = 16
const LONGUEUR_MAX = 26
const COULEURS_TETE = ['#d7263d', '#f46036', '#c81d25']

export function genererAllumettes(rng) {
  const n = Math.round(PLAGE[0] + rng() * (PLAGE[1] - PLAGE[0]))
  const allumettes = []
  for (let i = 0; i < n; i++) {
    allumettes.push({
      x: 14 + rng() * (300 - 28),
      y: 14 + rng() * (300 - 28),
      angle: rng() * Math.PI * 2,
      longueur: LONGUEUR_MIN + rng() * (LONGUEUR_MAX - LONGUEUR_MIN),
      couleurTete: COULEURS_TETE[Math.floor(rng() * COULEURS_TETE.length)],
    })
  }
  return { valeur: allumettes.length, allumettes }
}
