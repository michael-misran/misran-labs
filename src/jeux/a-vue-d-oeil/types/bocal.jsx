// Rendu SVG du type « bocal » (D2.1). Logique de génération dans
// bocal.generer.js (testable depuis Node, sans JSX).
import { JAR, genererBocal } from './bocal.generer'

const VB = 300

// En minuscule volontairement (pas « DessinerBonbons ») : react-refresh
// exige que tout fichier qui exporte un composant n'exporte QUE des
// composants, or ce fichier exporte un objet meta (D2). Une fonction non
// capitalisée qui rend du JSX échappe à la règle sans changer le rendu.
function dessinerBonbons(bonbons) {
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect x={JAR.x - 6} y={JAR.y - 6} width={JAR.w + 12} height={JAR.h + 12} rx={JAR.rx + 4} fill="none" stroke="#6b7280" strokeWidth={4} opacity={0.5} />
      <rect x={JAR.x + 14} y={JAR.y - 34} width={JAR.w - 28} height={28} rx={8} fill="none" stroke="#6b7280" strokeWidth={4} opacity={0.5} />
      {bonbons.map((b, i) =>
        b.ovale ? (
          <ellipse key={i} cx={b.x} cy={b.y} rx={b.r} ry={b.r * 0.65} transform={`rotate(${b.angle} ${b.x} ${b.y})`} fill={b.couleur} />
        ) : (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={b.couleur} />
        ),
      )}
    </svg>
  )
}

export default {
  id: 'bocal',
  nom: { fr: 'Bocal', en: 'Jar' },
  question: { fr: 'Combien de bonbons dans le bocal ?', en: 'How many candies are in the jar?' },
  unite: { fr: 'bonbons', en: 'candies' },
  generer(rng) {
    const { valeur, bonbons } = genererBocal(rng)
    return { valeur, Svg: () => dessinerBonbons(bonbons) }
  },
}
