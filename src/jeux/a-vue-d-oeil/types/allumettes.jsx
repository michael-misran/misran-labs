// Rendu SVG du type « allumettes en vrac » (D2.5). Logique dans
// allumettes.generer.js.
import { genererAllumettes } from './allumettes.generer'

const VB = 300

function dessinerAllumettes(allumettes) {
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width={VB} height={VB} fill="#ded6c3" />
      {allumettes.map((a, i) => {
        const x2 = a.x + Math.cos(a.angle) * a.longueur
        const y2 = a.y + Math.sin(a.angle) * a.longueur
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={x2} y2={y2} stroke="#b5894a" strokeWidth={2} strokeLinecap="round" />
            <circle cx={x2} cy={y2} r={2.6} fill={a.couleurTete} />
          </g>
        )
      })}
    </svg>
  )
}

export default {
  id: 'allumettes',
  nom: { fr: 'Allumettes', en: 'Matchsticks' },
  question: { fr: 'Combien d’allumettes en vrac ?', en: 'How many scattered matchsticks?' },
  unite: { fr: 'allumettes', en: 'matchsticks' },
  generer(rng) {
    const { valeur, allumettes } = genererAllumettes(rng)
    return { valeur, Svg: () => dessinerAllumettes(allumettes) }
  },
}
