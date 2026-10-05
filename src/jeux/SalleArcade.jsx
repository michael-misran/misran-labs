// La salle d'arcade de /jeux, en pixel art isométrique : la pièce est
// dessinée pixel par pixel dans un petit canvas (salleArcadeDessin.js) puis
// agrandie sans lissage. Chaque borne est un vrai <Link>, posé par-dessus le
// canvas et découpé à la silhouette de la borne.
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jt } from './jeuxText'
import { COULEURS, HAUTEUR, LARGEUR, NEON, dessinerSalle, zonesBornes } from './salleArcadeDessin'

const pixel = { fontFamily: 'var(--font-pixel)', fontWeight: 400 }
const ecran = { fontFamily: 'var(--font-ecran)', fontWeight: 400 }

// Animation (clignotement, néon) seulement si le visiteur l'accepte
function useAnimation() {
  const [tic, setTic] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTic((n) => n + 1), 500)
    return () => clearInterval(id)
  }, [])
  return tic
}

export default function SalleArcade({ jeux, lang, estJoue }) {
  const [selection, setSelection] = useState(0)
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const tic = useAnimation()
  const titre = jt(lang, 'arcadeTitre')

  // Navigation au clavier : flèches pour changer de borne, Entrée pour jouer
  useEffect(() => {
    function onKeyDown(e) {
      if (jeux.length === 0) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelection((s) => (s + 1) % jeux.length)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setSelection((s) => (s - 1 + jeux.length) % jeux.length)
      } else if (e.key === 'Enter' && !e.target.closest?.('a, button, input, textarea, select')) {
        navigate(`/jeux/${jeux[selection].slug}`)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [jeux, selection, navigate])

  // Redessin de la scène à chaque changement de borne ou tic d'animation
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    dessinerSalle(ctx, {
      jeux,
      selection,
      joue: estJoue,
      clignote: tic % 2 === 0,
      // Le néon grésille brièvement de temps en temps
      neonAllume: tic % 13 !== 5 && tic % 13 !== 7,
      titre,
    })
  }, [jeux, selection, estJoue, tic, titre])

  const zones = zonesBornes(jeux.length)
  const courant = jeux[selection]

  const joue = courant ? estJoue(courant.slug) : false

  return (
    <>
      {/* Fond de nuit violet sombre, comme la moquette des salles des années 80 */}
      <div
        style={{
          border: '3px solid var(--border)',
          boxShadow: '6px 6px 0 var(--primitive-encre-a18)',
          padding: 'clamp(8px, 3vw, 28px)',
          background: 'radial-gradient(ellipse at 50% 40%, #2a2470 0%, #141638 60%, #0b0c22 100%)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: 760, margin: '0 auto', aspectRatio: `${LARGEUR} / ${HAUTEUR}` }}>
          <canvas
            ref={canvasRef}
            width={LARGEUR}
            height={HAUTEUR}
            role="img"
            aria-label={titre}
            style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated' }}
          />
          {jeux.map((jeu, i) => (
            <Link
              key={jeu.slug}
              to={`/jeux/${jeu.slug}`}
              aria-label={`${jeu.titre[lang]} — ${jeu.accroche[lang]}`}
              onMouseEnter={() => setSelection(i)}
              onFocus={() => setSelection(i)}
              style={{
                position: 'absolute',
                inset: 0,
                outline: 'none',
                clipPath: `polygon(${zones[i].map(([x, y]) => `${(x / LARGEUR) * 100}% ${(y / HAUTEUR) * 100}%`).join(', ')})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Plaque sous la salle, en néon : le jeu de la borne survolée */}
      {courant && (
        <div
          style={{
            marginTop: 'var(--space-md-plus)',
            background: '#141638',
            border: `3px solid ${NEON.cyan}`,
            boxShadow: `0 0 12px color-mix(in srgb, ${NEON.cyan} 45%, transparent), 5px 5px 0 var(--primitive-encre-a18)`,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 260px' }}>
            <div
              style={{
                ...pixel,
                fontSize: 13,
                lineHeight: 1.4,
                textTransform: 'uppercase',
                color: NEON.rose,
                textShadow: `0 0 6px ${NEON.rose}`,
              }}
            >
              {courant.icone} {courant.titre[lang]}
            </div>
            <p style={{ ...ecran, fontSize: 19, lineHeight: 1.2, color: '#bff7ff', margin: '6px 0 0' }}>{courant.accroche[lang]}</p>
          </div>
          <Link
            to={`/jeux/${courant.slug}`}
            style={{
              ...pixel,
              fontSize: 10,
              color: '#141638',
              background: joue ? NEON.vert : COULEURS[courant.couleur] ?? NEON.jaune,
              border: '2px solid #0b0c22',
              boxShadow: '3px 3px 0 #0b0c22',
              padding: '8px 12px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {joue ? jt(lang, 'joueAujourdhui') : 'PRESS START ▶'}
          </Link>
        </div>
      )}
    </>
  )
}
