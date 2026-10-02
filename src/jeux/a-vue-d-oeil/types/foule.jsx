// Rendu SVG du type « foule vue de haut » (D2.3). Logique dans foule.generer.js.
import { genererFoule } from './foule.generer'

const VB = 300

function dessinerFoule(tetes) {
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width={VB} height={VB} fill="#e8e3d8" />
      {tetes.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.couleur} />
      ))}
    </svg>
  )
}

export default {
  id: 'foule',
  nom: { fr: 'Foule vue de haut', en: 'Crowd from above' },
  question: { fr: 'Combien de personnes dans la foule ?', en: 'How many people are in the crowd?' },
  unite: { fr: 'personnes', en: 'people' },
  generer(rng) {
    const { valeur, tetes } = genererFoule(rng)
    return { valeur, Svg: () => dessinerFoule(tetes) }
  },
}
