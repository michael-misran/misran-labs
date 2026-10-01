// Logique pure du type « carte à pois » (D2.4), sans JSX. Grille fine,
// croissance organique depuis quelques graines (flood-fill aléatoire) pour
// obtenir un pourcentage colorié précis et un contour irrégulier plausible.
export const PLAGE = [5, 70]
export const COLONNES = 30
export const LIGNES = 30

function voisins(x, y) {
  const liste = []
  if (x > 0) liste.push([x - 1, y])
  if (x < COLONNES - 1) liste.push([x + 1, y])
  if (y > 0) liste.push([x, y - 1])
  if (y < LIGNES - 1) liste.push([x, y + 1])
  return liste
}

export function genererPois(rng) {
  const total = COLONNES * LIGNES
  const cible = PLAGE[0] + rng() * (PLAGE[1] - PLAGE[0])
  const cibleCount = Math.round((cible / 100) * total)

  const colore = new Set()
  const frontiere = []
  const nbGraines = 3 + Math.floor(rng() * 4)
  for (let i = 0; i < nbGraines; i++) {
    const x = Math.floor(rng() * COLONNES)
    const y = Math.floor(rng() * LIGNES)
    const cle = `${x},${y}`
    if (!colore.has(cle)) {
      colore.add(cle)
      frontiere.push([x, y])
    }
  }

  while (colore.size < cibleCount && frontiere.length > 0) {
    const idx = Math.floor(rng() * frontiere.length)
    const [cx, cy] = frontiere.splice(idx, 1)[0]
    for (const [nx, ny] of voisins(cx, cy)) {
      if (colore.size >= cibleCount) break
      const cle = `${nx},${ny}`
      if (!colore.has(cle)) {
        colore.add(cle)
        frontiere.push([nx, ny])
      }
    }
  }

  const valeur = Math.round((colore.size / total) * 1000) / 10
  return { valeur, cellules: colore }
}
