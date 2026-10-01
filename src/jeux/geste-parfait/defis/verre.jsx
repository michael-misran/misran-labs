import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../shell/LanguageContext'

const HAUTEUR_MIN = 40
const HAUTEUR_MAX = 85
const INERTIE_MS = 150
const VITESSE_PAR_MS = 0.045 // % de hauteur par ms pendant qu'on maintient

// `graine` (0-1, déterministe pour le jour) fixe la hauteur cible entre 40 %
// et 85 % du verre (D8.3). Score = max(0, 100 − |écart en % de hauteur| × 5).
export default function Verre({ onTermine, graine }) {
  const { lang } = useLanguage()
  const cible = HAUTEUR_MIN + graine * (HAUTEUR_MAX - HAUTEUR_MIN)
  const [niveau, setNiveau] = useState(0)
  const [fini, setFini] = useState(false)
  const maintenu = useRef(false)
  const frame = useRef(null)
  const dernierTick = useRef(null)
  const relacheA = useRef(null)
  const niveauRef = useRef(0)

  function terminer(niveauFinal) {
    const ecart = Math.abs(niveauFinal - cible)
    const score = Math.max(0, 100 - ecart * 5)
    setFini(true)
    onTermine(score, { niveauObtenu: niveauFinal, cible })
  }

  function boucle(t) {
    if (dernierTick.current == null) dernierTick.current = t
    const dt = t - dernierTick.current
    dernierTick.current = t

    const enInertie = relacheA.current != null && t - relacheA.current < INERTIE_MS
    if (maintenu.current || enInertie) {
      const suivant = Math.min(100, niveauRef.current + dt * VITESSE_PAR_MS)
      niveauRef.current = suivant
      setNiveau(suivant)
      frame.current = requestAnimationFrame(boucle)
    } else if (relacheA.current != null) {
      terminer(niveauRef.current)
    }
  }

  function commencer(e) {
    e.preventDefault()
    if (fini || maintenu.current) return
    maintenu.current = true
    relacheA.current = null
    dernierTick.current = null
    frame.current = requestAnimationFrame(boucle)
  }

  function relacher() {
    if (!maintenu.current) return
    maintenu.current = false
    relacheA.current = performance.now()
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  // Refs pour toujours appeler la version la plus fraîche de commencer/relacher
  // (état `fini` notamment) depuis un écouteur global posé une seule fois (D11).
  const commencerRef = useRef(commencer)
  const relacherRef = useRef(relacher)
  useEffect(() => {
    commencerRef.current = commencer
    relacherRef.current = relacher
  })

  useEffect(() => {
    function surToucheBas(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        commencerRef.current(e)
      }
    }
    function surToucheHaut(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        relacherRef.current()
      }
    }
    window.addEventListener('keydown', surToucheBas)
    window.addEventListener('keyup', surToucheHaut)
    return () => {
      window.removeEventListener('keydown', surToucheBas)
      window.removeEventListener('keyup', surToucheHaut)
    }
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        role="button"
        tabIndex={0}
        onPointerDown={commencer}
        onPointerUp={relacher}
        onPointerLeave={relacher}
        onPointerCancel={relacher}
        style={{
          touchAction: 'none',
          width: 120,
          height: 220,
          margin: '0 auto',
          border: 'var(--border-regular) solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          position: 'relative',
          background: 'var(--bg2)',
          cursor: fini ? 'default' : 'pointer',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: `${niveau}%`,
            background: 'var(--primary)',
          }}
        />
        {fini && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${cible}%`,
              borderTop: '2px dashed var(--warning)',
            }}
          />
        )}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: 'var(--space-sm) 0 0' }}>
        {lang === 'fr' ? 'Maintiens appuyé pour verser, relâche au bon moment.' : 'Hold to pour, release at the right moment.'}
      </p>
    </div>
  )
}
