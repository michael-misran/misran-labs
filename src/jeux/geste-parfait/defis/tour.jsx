import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../shell/LanguageContext'

const LARGEUR_ZONE = 280
const LARGEUR_INITIALE = 140
const HAUTEUR_BLOC = 18
const VITESSE_PX_FRAME = 2.4 // fixe, sans aléatoire (D8.4)
const NB_BLOCS = 12

// Un bloc va et vient horizontalement, un clic/toucher/espace le pose, la
// partie qui dépasse tombe (Stack). Score = largeur finale / largeur
// initiale × 100.
export default function Tour({ onTermine }) {
  const { lang } = useLanguage()
  const [empiles, setEmpiles] = useState([{ x: (LARGEUR_ZONE - LARGEUR_INITIALE) / 2, largeur: LARGEUR_INITIALE }])
  const [mobile, setMobile] = useState({ x: 0, largeur: LARGEUR_INITIALE, direction: 1 })
  const [termine, setTermine] = useState(false)
  const frame = useRef(null)
  const mobileRef = useRef(mobile)
  const empilesRef = useRef(empiles)
  const termineRef = useRef(termine)
  useEffect(() => {
    mobileRef.current = mobile
    empilesRef.current = empiles
    termineRef.current = termine
  })

  useEffect(() => {
    if (termine) return undefined
    function pas() {
      setMobile((m) => {
        let x = m.x + VITESSE_PX_FRAME * m.direction
        let direction = m.direction
        if (x <= 0) {
          x = 0
          direction = 1
        }
        if (x + m.largeur >= LARGEUR_ZONE) {
          x = LARGEUR_ZONE - m.largeur
          direction = -1
        }
        return { ...m, x, direction }
      })
      frame.current = requestAnimationFrame(pas)
    }
    frame.current = requestAnimationFrame(pas)
    return () => cancelAnimationFrame(frame.current)
  }, [termine, empiles.length])

  function poser() {
    if (termineRef.current) return
    const precedent = empilesRef.current[empilesRef.current.length - 1]
    const courant = mobileRef.current
    const debut = Math.max(precedent.x, courant.x)
    const fin = Math.min(precedent.x + precedent.largeur, courant.x + courant.largeur)
    const largeur = fin - debut

    if (largeur <= 0) {
      setTermine(true)
      onTermine(0, { blocsPoses: empilesRef.current.length - 1 })
      return
    }

    const nouveauxEmpiles = [...empilesRef.current, { x: debut, largeur }]
    setEmpiles(nouveauxEmpiles)

    if (nouveauxEmpiles.length - 1 >= NB_BLOCS) {
      setTermine(true)
      onTermine((largeur / LARGEUR_INITIALE) * 100, { blocsPoses: NB_BLOCS })
      return
    }

    setMobile({ x: 0, largeur, direction: 1 })
  }

  const poserRef = useRef(poser)
  useEffect(() => {
    poserRef.current = poser
  })

  useEffect(() => {
    function surTouche(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        poserRef.current()
      }
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [])

  const hauteurZone = (NB_BLOCS + 2) * HAUTEUR_BLOC

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        role="button"
        tabIndex={0}
        onPointerDown={poser}
        style={{
          touchAction: 'none',
          position: 'relative',
          width: LARGEUR_ZONE,
          height: hauteurZone,
          margin: '0 auto',
          background: 'var(--bg2)',
          border: 'var(--border-thin) solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          cursor: termine ? 'default' : 'pointer',
        }}
      >
        {empiles.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              bottom: i * HAUTEUR_BLOC,
              width: b.largeur,
              height: HAUTEUR_BLOC - 2,
              background: 'var(--primary)',
            }}
          />
        ))}
        {!termine && (
          <div
            style={{
              position: 'absolute',
              left: mobile.x,
              bottom: empiles.length * HAUTEUR_BLOC,
              width: mobile.largeur,
              height: HAUTEUR_BLOC - 2,
              background: 'var(--primary)',
              opacity: 0.6,
            }}
          />
        )}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: 'var(--space-sm) 0 0' }}>
        {lang === 'fr' ? 'Clique, touche ou appuie sur Espace pour poser le bloc.' : 'Click, tap, or press Space to drop the block.'}
      </p>
    </div>
  )
}
