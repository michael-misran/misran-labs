import './couverture.css'

// Couverture de « Canopée », partagée entre le livre et la librairie, comme
// CouvertureAtelier : toutes les tailles sont en cqw, elle s'adapte à son cadre.
// L'idée : une planche de botanique, au-dessus du sol ce que l'IA voit, au-dessous
// le mycélium, ce qu'elle ne voit pas.

const TITRE = 'Canopée'
const SOUS_TITRE = 'Huit jours pour faire travailler l’IA sur des données privées, mesures et incidents compris'

// Suite pseudo-aléatoire fixe : le dessin est le même à chaque affichage
function suite(graine) {
  let x = graine
  return () => {
    x = (x * 16807) % 2147483647
    return (x - 1) / 2147483646
  }
}

// Feuillage : amas de cercles posés sur la ligne d'horizon
const FEUILLES = (() => {
  const r = suite(1977)
  const tronc = [[50, 62, 1], [116, 44, 1.25], [184, 74, 1.05], [246, 48, 1.3], [298, 78, .9]]
  return tronc.map(([x, haut, t]) => ({
    x,
    t,
    haut,
    cercles: Array.from({ length: 16 }, () => ({
      cx: x + (r() - .5) * 62 * t,
      cy: haut + r() * 46 * t,
      r: (9 + r() * 12) * t,
      fonce: r() > .55,
    })),
  }))
})()

// Mycélium : fils qui se ramifient sous le sol, depuis le pied de chaque arbre
const FILS = (() => {
  const r = suite(26)
  const fils = []
  const pousse = (x, y, angle, n) => {
    if (n === 0 || y > 322) return
    const long = 14 + r() * 18
    const ax = x + Math.cos(angle) * long
    const ay = y + Math.sin(angle) * long
    const cx = x + Math.cos(angle + (r() - .5)) * long * .5
    const cy = y + Math.sin(angle + (r() - .5)) * long * .5
    fils.push({ d: `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ax.toFixed(1)} ${ay.toFixed(1)}`, n, ax, ay })
    pousse(ax, ay, angle + (r() - .5) * .9, n - 1)
    if (r() > .35) pousse(ax, ay, angle + (r() > .5 ? 1 : -1) * (.5 + r() * .7), n - 1)
  }
  FEUILLES.forEach(({ x }) => {
    pousse(x, 214, Math.PI * .28, 6)
    pousse(x, 214, Math.PI * .72, 6)
    pousse(x, 214, Math.PI * .5, 6)
  })
  return fils
})()

export function CouvertureCanopee() {
  return (
    <section className="cn-couv cn-couv-coupe">
      <svg viewBox="0 0 332 489" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="332" height="214" fill="#efe7d3" />
        <rect y="214" width="332" height="275" fill="#231b13" />
        {FEUILLES.map(({ x, t, haut }) => (
          <rect key={x} x={x - 3 * t} y={haut + 30} width={6 * t} height={214 - haut - 30} fill="#2a2015" />
        ))}
        {FEUILLES.map(({ x, cercles }) => cercles.map((c, i) => (
          <circle key={`${x}-${i}`} cx={c.cx} cy={c.cy} r={c.r} fill={c.fonce ? '#3f5a2e' : '#6d8a45'} stroke="#2c4020" strokeWidth=".5" />
        )))}
        {FILS.map((f, i) => (
          <path key={i} d={f.d} fill="none" stroke="#e7dcc0" strokeWidth={f.n * .28 + .2} strokeLinecap="round" opacity={.45 + f.n * .1} />
        ))}
        {FILS.filter((f) => f.n === 1).map((f, i) => (
          <circle key={i} cx={f.ax} cy={f.ay} r="1.5" fill="#d8b75c" />
        ))}
        <line x1="0" x2="332" y1="214" y2="214" stroke="#efe7d3" strokeWidth="1" />
      </svg>
      <div className="cn-cc-tete"><span>1977 Éditions</span><span>Planche I</span></div>
      <h2 className="cn-cc-titre">{TITRE}</h2>
      <span className="cn-cc-repere cn-cc-haut">Ce que l’IA voit</span>
      <span className="cn-cc-repere cn-cc-bas">Ce qu’elle ne voit pas</span>
      <p className="cn-cc-sous">{SOUS_TITRE}</p>
    </section>
  )
}
