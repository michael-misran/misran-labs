// Logique pure du type « bocal » (D2.1), sans JSX : importable depuis Node
// par missions/jeux-estimation/verifier-types.mjs (critère 4).
export const PLAGE = [40, 400]
export const JAR = { x: 70, y: 78, w: 160, h: 180, rx: 26 }
const RAYON_MIN = 5
const RAYON_MAX = 9
const TENTATIVES_MAX = 30
const PALETTE = ['#e4572e', '#f3a712', '#a8c66c', '#4a7a96', '#8d5a97', '#f06292', '#f9e94e', '#5bc8af']

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function placerBonbons(rng, cible) {
  const bonbons = []
  for (let i = 0; i < cible; i++) {
    for (let t = 0; t < TENTATIVES_MAX; t++) {
      const r = RAYON_MIN + rng() * (RAYON_MAX - RAYON_MIN)
      const x = JAR.x + r + rng() * (JAR.w - 2 * r)
      const y = JAR.y + r + rng() * (JAR.h - 2 * r)
      // Chevauchement partiel toléré (~45 %) : « plausible », pas empilé (D2).
      const chevauche = bonbons.some((b) => distance(b, { x, y }) < (b.r + r) * 0.55)
      if (!chevauche) {
        bonbons.push({ x, y, r, couleur: PALETTE[Math.floor(rng() * PALETTE.length)], ovale: rng() > 0.5, angle: Math.round(rng() * 360) })
        break
      }
    }
  }
  return bonbons
}

// La valeur retournée est exactement bonbons.length : un bonbon qui n'a pas
// trouvé de place après les tentatives autorisées n'est pas compté (D2).
export function genererBocal(rng) {
  const cible = Math.round(PLAGE[0] + rng() * (PLAGE[1] - PLAGE[0]))
  const bonbons = placerBonbons(rng, cible)
  return { valeur: bonbons.length, bonbons }
}
