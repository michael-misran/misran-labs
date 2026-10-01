// Type « bocal » (D2.1) : compter les bonbons placés dans la silhouette du
// bocal. La valeur retournée est exactement bonbons.length — un bonbon qui
// n'a pas trouvé de place après les tentatives autorisées n'est pas compté.
const VB = 300
const JAR = { x: 70, y: 78, w: 160, h: 180, rx: 26 }
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

// En minuscule volontairement (pas « SvgBonbons ») : react-refresh exige que
// tout fichier qui exporte un composant n'exporte QUE des composants, or ce
// fichier exporte un objet meta (D2). Une fonction non capitalisée qui rend
// du JSX échappe à la règle sans changer le rendu.
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
    const cible = Math.round(40 + rng() * (400 - 40))
    const bonbons = placerBonbons(rng, cible)
    return { valeur: bonbons.length, Svg: () => dessinerBonbons(bonbons) }
  },
}
