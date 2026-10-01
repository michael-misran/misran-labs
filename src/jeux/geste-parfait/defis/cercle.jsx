import { useRef, useState } from 'react'
import { useLanguage } from '../../../shell/LanguageContext'

const TAILLE = 280
const RAYON_MIN = 40
const BALAYAGE_MIN_DEG = 300
const POINTS_MIN = 12

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function angleEntre(centre, p) {
  return Math.atan2(p.y - centre.y, p.x - centre.x)
}

function normaliserAngle(a) {
  let r = a
  while (r > Math.PI) r -= 2 * Math.PI
  while (r < -Math.PI) r += 2 * Math.PI
  return r
}

// Score = 100 × (1 − écart-type des distances au centre / rayon moyen), D8.1.
// Refusé (retourne null) si le tracé est trop court, trop petit, ou ne
// balaie pas au moins ~300° autour de son centre.
function evaluerTrace(points) {
  if (points.length < POINTS_MIN) return null

  const centre = points.reduce(
    (acc, p) => ({ x: acc.x + p.x / points.length, y: acc.y + p.y / points.length }),
    { x: 0, y: 0 },
  )
  const distances = points.map((p) => distance(p, centre))
  const rayonMoyen = distances.reduce((a, b) => a + b, 0) / distances.length
  if (rayonMoyen < RAYON_MIN) return null

  let balayage = 0
  for (let i = 1; i < points.length; i++) {
    const a1 = angleEntre(centre, points[i - 1])
    const a2 = angleEntre(centre, points[i])
    balayage += Math.abs(normaliserAngle(a2 - a1))
  }
  if ((balayage * 180) / Math.PI < BALAYAGE_MIN_DEG) return null

  const variance = distances.reduce((acc, d) => acc + (d - rayonMoyen) ** 2, 0) / distances.length
  const ecartType = Math.sqrt(variance)
  const score = Math.max(0, Math.min(100, 100 * (1 - ecartType / rayonMoyen)))

  return { centre, rayonMoyen, score }
}

function couleurSegment(ecartRelatif) {
  const t = Math.max(0, Math.min(1, ecartRelatif))
  const teinte = 120 * (1 - t) // 120 = vert, 0 = rouge
  return `hsl(${teinte}, 70%, 45%)`
}

// Le tracé demande un pointeur (souris, doigt, stylet) : indiqué dans la
// consigne du défi (D11), pas de repli clavier pour ce défi précis.
export default function Cercle({ onTermine }) {
  const { lang } = useLanguage()
  const svgRef = useRef(null)
  const points = useRef([])
  const enCours = useRef(false)
  const [trace, setTrace] = useState([])
  const [resultat, setResultat] = useState(null)
  const [message, setMessage] = useState(null)

  function position(e) {
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * TAILLE,
      y: ((e.clientY - rect.top) / rect.height) * TAILLE,
    }
  }

  function onPointerDown(e) {
    if (resultat) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    svgRef.current.setPointerCapture(e.pointerId)
    enCours.current = true
    points.current = [position(e)]
    setTrace([...points.current])
    setMessage(null)
  }

  function onPointerMove(e) {
    if (!enCours.current) return
    points.current.push(position(e))
    setTrace([...points.current])
  }

  function onPointerUp() {
    if (!enCours.current) return
    enCours.current = false
    const evalu = evaluerTrace(points.current)
    if (!evalu) {
      setMessage(
        lang === 'fr'
          ? 'Trace un cercle plus complet et plus large, d’un seul geste.'
          : 'Draw a fuller, wider circle in a single stroke.',
      )
      setTrace([])
      points.current = []
      return
    }
    setResultat(evalu)
    onTermine(evalu.score, { rayonMoyen: evalu.rayonMoyen })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 var(--space-sm)' }}>
        {lang === 'fr'
          ? 'Trace un cercle d’un seul geste, à la souris, au doigt ou au stylet.'
          : 'Draw a circle in a single stroke, with your mouse, finger, or stylus.'}
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${TAILLE} ${TAILLE}`}
        style={{
          touchAction: 'none',
          background: 'var(--bg2)',
          borderRadius: 'var(--radius-md)',
          border: 'var(--border-thin) solid var(--border)',
          width: '100%',
          maxWidth: TAILLE,
          height: 'auto',
          aspectRatio: '1 / 1',
          cursor: resultat ? 'default' : 'crosshair',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {trace.slice(1).map((p, i) => {
          const p0 = trace[i]
          let couleur = 'var(--primary)'
          if (resultat) {
            const d = distance(p, resultat.centre)
            couleur = couleurSegment(Math.abs(d - resultat.rayonMoyen) / resultat.rayonMoyen)
          }
          return <line key={i} x1={p0.x} y1={p0.y} x2={p.x} y2={p.y} stroke={couleur} strokeWidth={4} strokeLinecap="round" />
        })}
      </svg>
      {message && (
        <p role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--warning)', margin: 'var(--space-sm) 0 0' }}>
          {message}
        </p>
      )}
    </div>
  )
}
