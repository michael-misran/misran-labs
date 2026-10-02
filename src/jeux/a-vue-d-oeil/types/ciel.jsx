// Rendu SVG du type « ciel étoilé » (D2.2). Logique dans ciel.generer.js.
import { genererCiel } from './ciel.generer'

const VB = 300

function dessinerCiel(etoiles) {
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width={VB} height={VB} fill="#0b1026" />
      {etoiles.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#ffffff" opacity={e.opacite} />
      ))}
    </svg>
  )
}

export default {
  id: 'ciel',
  nom: { fr: 'Ciel étoilé', en: 'Starry sky' },
  question: { fr: 'Combien d’étoiles dans le ciel ?', en: 'How many stars are in the sky?' },
  unite: { fr: 'étoiles', en: 'stars' },
  generer(rng) {
    const { valeur, etoiles } = genererCiel(rng)
    return { valeur, Svg: () => dessinerCiel(etoiles) }
  },
}
