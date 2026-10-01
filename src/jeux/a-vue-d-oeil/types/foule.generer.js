// Logique pure du type « foule vue de haut » (D2.3), sans JSX. Regroupements
// irréguliers : quelques « grappes » tirées au sort, chaque tête rattachée à
// l'une d'elles avec un décalage aléatoire dans son rayon.
export const PLAGE = [50, 500]
const VB = 300
const GRAPPES_MIN = 4
const GRAPPES_MAX = 8
const RAYON_MIN = 4
const RAYON_MAX = 7
const TENTATIVES_MAX = 20
const COULEURS = ['#caa472', '#8d5524', '#c68642', '#e0ac69', '#f1c27d', '#5c3a21']

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function genererFoule(rng) {
  const cible = Math.round(PLAGE[0] + rng() * (PLAGE[1] - PLAGE[0]))
  const nbGrappes = GRAPPES_MIN + Math.floor(rng() * (GRAPPES_MAX - GRAPPES_MIN + 1))
  const grappes = Array.from({ length: nbGrappes }, () => ({
    x: 30 + rng() * (VB - 60),
    y: 30 + rng() * (VB - 60),
    rayon: 25 + rng() * 45,
  }))

  const tetes = []
  for (let i = 0; i < cible; i++) {
    const grappe = grappes[Math.floor(rng() * grappes.length)]
    for (let t = 0; t < TENTATIVES_MAX; t++) {
      const angle = rng() * Math.PI * 2
      const rad = rng() * grappe.rayon
      const x = Math.min(VB - 8, Math.max(8, grappe.x + Math.cos(angle) * rad))
      const y = Math.min(VB - 8, Math.max(8, grappe.y + Math.sin(angle) * rad))
      const r = RAYON_MIN + rng() * (RAYON_MAX - RAYON_MIN)
      const chevauche = tetes.some((h) => distance(h, { x, y }) < (h.r + r) * 0.65)
      if (!chevauche) {
        tetes.push({ x, y, r, couleur: COULEURS[Math.floor(rng() * COULEURS.length)] })
        break
      }
    }
  }
  return { valeur: tetes.length, tetes }
}
