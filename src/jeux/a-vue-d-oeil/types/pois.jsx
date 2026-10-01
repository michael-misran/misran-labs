// Rendu SVG du type « carte à pois » (D2.4). Logique dans pois.generer.js.
import { COLONNES, LIGNES, genererPois } from './pois.generer'

const VB = 300
const CELL = VB / COLONNES

function dessinerPois(cellules) {
  const rects = []
  for (let x = 0; x < COLONNES; x++) {
    for (let y = 0; y < LIGNES; y++) {
      if (cellules.has(`${x},${y}`)) {
        rects.push(<rect key={`${x},${y}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL} fill="#4a7a96" />)
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width={VB} height={VB} fill="#f1ede3" />
      {rects}
    </svg>
  )
}

export default {
  id: 'pois',
  nom: { fr: 'Carte à pois', en: 'Dot map' },
  question: { fr: 'Quel pourcentage de la surface est coloré ?', en: 'What percentage of the area is colored?' },
  unite: { fr: '%', en: '%' },
  generer(rng) {
    const { valeur, cellules } = genererPois(rng)
    return { valeur, Svg: () => dessinerPois(cellules) }
  },
}
