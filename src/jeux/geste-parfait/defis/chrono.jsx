import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../shell/LanguageContext'

const CIBLE_S = 10
const SEUIL_MASQUAGE_MS = 3000

// Score = max(0, 100 − |écart en s| × 20), soit 1 s d'écart = 80 % (D8.2).
export default function Chrono({ onTermine }) {
  const { lang } = useLanguage()
  const [etat, setEtat] = useState('attente') // attente | encours | masque | fini
  const [tempsAffiche, setTempsAffiche] = useState(0)
  const debut = useRef(null)
  const frame = useRef(null)

  useEffect(() => {
    if (etat !== 'encours') return undefined
    function pas() {
      const ecoule = performance.now() - debut.current
      if (ecoule >= SEUIL_MASQUAGE_MS) {
        setEtat('masque')
        return
      }
      setTempsAffiche(ecoule)
      frame.current = requestAnimationFrame(pas)
    }
    frame.current = requestAnimationFrame(pas)
    return () => cancelAnimationFrame(frame.current)
  }, [etat])

  function demarrer() {
    debut.current = performance.now()
    setTempsAffiche(0)
    setEtat('encours')
  }

  function arreter() {
    const ecouleS = (performance.now() - debut.current) / 1000
    const ecart = Math.abs(ecouleS - CIBLE_S)
    const score = Math.max(0, 100 - ecart * 20)
    setEtat('fini')
    onTermine(score, { tempsObtenu: ecouleS })
  }

  function toggle() {
    if (etat === 'attente') demarrer()
    else if (etat === 'encours' || etat === 'masque') arreter()
  }

  const toggleRef = useRef(toggle)
  useEffect(() => {
    toggleRef.current = toggle
  })

  useEffect(() => {
    function surTouche(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        toggleRef.current()
      }
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [])

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onPointerDown={toggle}
        style={{
          touchAction: 'none',
          cursor: etat === 'fini' ? 'default' : 'pointer',
          textAlign: 'center',
          padding: 'var(--space-xl)',
          background: 'var(--bg2)',
          borderRadius: 'var(--radius-md)',
          border: 'var(--border-thin) solid var(--border)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, color: 'var(--text)' }}>
          {etat === 'masque' ? '••.••' : (tempsAffiche / 1000).toFixed(2)}
        </div>
        {/* La consigne (« arrête à 10,00 s ») n'est affichée qu'une fois, par
            Jeu.jsx au-dessus (D7, mission kiosque-finitions) : une fois le
            chrono démarré, ce paragraphe ne sert plus qu'à expliquer le geste
            de départ, pas à la répéter. */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: 'var(--space-sm) 0 0' }}>
          {etat === 'attente'
            ? lang === 'fr'
              ? 'Clique, touche ou appuie sur Espace pour démarrer.'
              : 'Click, tap, or press Space to start.'
            : ''}
        </p>
      </div>
    </div>
  )
}
