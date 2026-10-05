// La chambre des années 80 de /jeux : une illustration BD en fond
// (public/arcade/chambre-80s.jpg) et, posés par-dessus en SVG dans le même
// repère de pixels (1376 × 768), les cartouches du rayon vide de la
// bibliothèque et l'écran allumé de la télé. Un nouveau jeu du registre
// ajoute une cartouche sur le rayon, sans toucher à l'image.
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jt } from './jeuxText'

const IMAGE = '/arcade/chambre-80s.jpg'
const LARGEUR = 1376
const HAUTEUR = 768

// Rayon vide de la bibliothèque, en pixels de l'illustration
const RAYON = { gauche: 984, droite: 1236, sol: 441 }
const L = 44
const H = 60
const ECHELLE = 1.3
const PLACES = 4
const PAS = (RAYON.droite - RAYON.gauche) / PLACES

// Écran bombé de la télé dessinée
const FORME_ECRAN =
  'M498 389 Q553 384 608 389 Q620 391 621 404 Q624 441 621 478 Q620 491 608 493 Q553 498 498 493 Q487 491 486 478 Q483 441 486 404 Q487 391 498 389 Z'

const ENCRE = '#1a1109'
const JAUNE = '#ffd84a'

// meta.couleur → couleur de l'étiquette de la cartouche
const ETIQUETTES = {
  mandarine: '#f0a02c',
  violet: '#7656c8',
  cyan: '#33b8d4',
}
const ETIQUETTE_DEFAUT = '#e8402a'

// Découpe un titre en deux lignes courtes
function lignes(titre) {
  const mots = titre.split(' ')
  if (mots.length === 1) return [titre]
  const milieu = Math.ceil(mots.length / 2)
  return [mots.slice(0, milieu).join(' '), mots.slice(milieu).join(' ')]
}

// Clignotement de « PRESS START », seulement si le visiteur accepte l'animation
function useClignote() {
  const [allume, setAllume] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setAllume((a) => !a), 500)
    return () => clearInterval(id)
  }, [])
  return allume
}

function Cartouche({ jeu, lang, x, active, joue, onChoisir }) {
  const couleur = ETIQUETTES[jeu.couleur] ?? ETIQUETTE_DEFAUT
  const [l1, l2] = lignes(jeu.titre[lang].toUpperCase())
  const cx = 4 + (L - 12) / 2

  return (
    <g transform={`translate(${x} ${RAYON.sol - H * ECHELLE}) scale(${ECHELLE})`}>
      {/* Ombre portée sur le fond du rayon (lumière de la lampe, à gauche) */}
      <path d={`M${L} 4 L${L + 9} 8 L${L + 9} ${H} L${L} ${H} Z`} fill="#1a0c02" opacity={0.45} />

      <Link
        to={`/jeux/${jeu.slug}`}
        aria-label={`${jeu.titre[lang]} — ${jeu.accroche[lang]}`}
        className={`cartouche${active ? ' active' : ''}`}
        onMouseEnter={onChoisir}
        onFocus={onChoisir}
      >
        <rect className="halo" x={-4} y={-4} width={L + 8} height={H + 8} rx={5} fill="none" stroke={JAUNE} strokeWidth={3} />
        {/* Boîtier gris, épaulé en haut comme une cartouche de console */}
        <path d={`M0 ${H} V6 Q0 2 4 2 H${L - 4} Q${L} 2 ${L} 6 V${H} Z`} fill="#8d877e" stroke={ENCRE} strokeWidth={2.2} strokeLinejoin="round" />
        <path d={`M${L - 7} 4 H${L - 2} V${H - 1} H${L - 7} Z`} fill="#5d5851" />
        {[0, 1, 2].map((r) => (
          <path key={r} d={`M6 ${8 + r * 4} H${L - 10}`} stroke={ENCRE} strokeWidth={1.2} />
        ))}
        {/* Étiquette */}
        <rect x={4} y={21} width={L - 12} height={H - 25} fill={couleur} stroke={ENCRE} strokeWidth={1.6} />
        <rect x={4} y={21} width={L - 12} height={7} fill={ENCRE} />
        <text x={cx} y={43} textAnchor="middle" fontSize={12} fill={ENCRE}>{jeu.icone}</text>
        {[l1, l2].filter(Boolean).map((l, k) => (
          <text key={k} x={cx} y={50 + k * 5} textAnchor="middle" fontSize={4.6} fontWeight={700} fill={ENCRE} fontFamily="var(--font-bd)">
            {l}
          </text>
        ))}
        {/* Pastille « joué aujourd'hui » */}
        {joue && (
          <g transform={`translate(${L - 8} 22)`}>
            <circle r={6} fill="#5cc85a" stroke={ENCRE} strokeWidth={1.4} />
            <path d="M-3 0 L-1 2.5 L3 -2.5" fill="none" stroke={ENCRE} strokeWidth={1.6} strokeLinecap="round" />
          </g>
        )}
        {/* Ombre du compartiment par-dessus, pour fondre la cartouche dans le dessin */}
        <rect x={0} y={2} width={L} height={H - 2} fill="url(#chambre-ombre-rayon)" pointerEvents="none" />
      </Link>
    </g>
  )
}

export default function ChambreArcade({ jeux, lang, estJoue }) {
  const [selection, setSelection] = useState(0)
  const [neige, setNeige] = useState(false)
  const navigate = useNavigate()
  const clignote = useClignote()
  const courant = jeux[selection]
  const joue = courant ? estJoue(courant.slug) : false

  // Petit grésillement de la télé au changement de cartouche
  function choisir(i) {
    if (i === selection) return
    setSelection(i)
    setNeige(true)
  }
  useEffect(() => {
    if (!neige) return
    const id = setTimeout(() => setNeige(false), 260)
    return () => clearTimeout(id)
  }, [neige])

  // Navigation au clavier : flèches pour changer de cartouche, Entrée pour jouer
  useEffect(() => {
    function onKeyDown(e) {
      if (jeux.length === 0) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        changer((selection + 1) % jeux.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        changer((selection - 1 + jeux.length) % jeux.length)
      } else if (e.key === 'Enter' && !e.target.closest?.('a, button, input, textarea, select')) {
        navigate(`/jeux/${jeux[selection].slug}`)
      }
    }
    function changer(i) {
      setSelection(i)
      setNeige(true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [jeux, selection, navigate])

  const [titre1, titre2] = courant ? lignes(courant.titre[lang].toUpperCase()) : ['', '']
  const visibles = jeux.slice(0, PLACES)

  return (
    <>
      <style>{`
        .cartouche { cursor: pointer; transition: transform .18s ease; outline: none; }
        .cartouche:hover, .cartouche:focus-visible { transform: translateY(-5px); }
        .cartouche.active { transform: translateY(-9px); }
        .cartouche .halo { opacity: 0; transition: opacity .2s; }
        .cartouche.active .halo, .cartouche:focus-visible .halo { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .cartouche, .cartouche .halo { transition: none; } }
      `}</style>

      <svg
        viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
        role="img"
        aria-label={jt(lang, 'chambreDescription')}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <defs>
          {/* Trait d'encre légèrement tremblé, pour coller au dessin */}
          <filter id="chambre-encre" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="1.8" />
          </filter>
          <pattern id="chambre-balayage" width="4" height="3" patternUnits="userSpaceOnUse">
            <rect width="4" height="1" fill="#000" opacity=".35" />
          </pattern>
          <pattern id="chambre-bruit" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#8a8a8a" />
            <rect width="2" height="2" fill="#eee" />
            <rect x="3" y="2" width="2" height="2" fill="#333" />
            <rect x="1" y="4" width="2" height="2" fill="#ccc" />
            <rect x="4" y="4" width="2" height="1" fill="#222" />
          </pattern>
          <radialGradient id="chambre-lueur-tele" cx="553" cy="440" r="210" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7fe0ff" stopOpacity=".22" />
            <stop offset="1" stopColor="#7fe0ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="chambre-verre" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#2c3a6a" />
            <stop offset=".7" stopColor="#121733" />
            <stop offset="1" stopColor="#05060d" />
          </radialGradient>
          <clipPath id="chambre-forme-ecran">
            <path d={FORME_ECRAN} />
          </clipPath>
          {/* Ombre du compartiment : plus sombre vers la droite, loin de la lampe */}
          <linearGradient id="chambre-ombre-rayon" x1="0" x2="1">
            <stop offset="0" stopColor="#1a0c02" stopOpacity="0" />
            <stop offset="1" stopColor="#1a0c02" stopOpacity=".4" />
          </linearGradient>
        </defs>

        <image href={IMAGE} width={LARGEUR} height={HAUTEUR} />

        {/* Lueur de la télé dans la pièce */}
        <rect width={LARGEUR} height={HAUTEUR} fill="url(#chambre-lueur-tele)" style={{ mixBlendMode: 'screen' }} pointerEvents="none" />

        {/* Écran de la télé */}
        <g clipPath="url(#chambre-forme-ecran)" pointerEvents="none" aria-hidden="true">
          <rect x="480" y="380" width="150" height="120" fill="url(#chambre-verre)" />
          {[titre1, titre2].map((l, k) => (
            <text
              key={k}
              x="553"
              y={titre2 ? 432 + k * 13 : 438}
              textAnchor="middle"
              fontFamily="var(--font-pixel)"
              fontSize="8.5"
              fill={JAUNE}
              style={{ filter: 'drop-shadow(0 0 3px #ff9a3c)' }}
            >
              {l}
            </text>
          ))}
          {clignote && (
            <text x="553" y="472" textAnchor="middle" fontFamily="var(--font-ecran)" fontSize="15" fill="#bff7ff" style={{ filter: 'drop-shadow(0 0 3px #2fe6ff)' }}>
              PRESS START
            </text>
          )}
          {neige && <rect x="480" y="380" width="150" height="120" fill="url(#chambre-bruit)" />}
          <rect x="480" y="380" width="150" height="120" fill="url(#chambre-balayage)" />
          {/* Reflet du verre, comme sur le dessin */}
          <path d="M592 398 Q606 400 608 414" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        </g>

        {/* Écran de l'ordinateur */}
        <g pointerEvents="none" aria-hidden="true" fontFamily="var(--font-ecran)" fontSize="11" fill="#6bff7a" opacity=".85">
          <text x="776" y="408">] RUN LAB</text>
          <text x="776" y="420">READY.</text>
          {clignote && <rect x="776" y="424" width="6" height="8" />}
        </g>

        {/* Cartouches sur le rayon, emplacements libres en pointillés */}
        <g filter="url(#chambre-encre)">
          {Array.from({ length: PLACES }, (_, i) => {
            const x = RAYON.gauche + i * PAS + (PAS - L * ECHELLE) / 2
            const jeu = visibles[i]
            if (!jeu) {
              return (
                <rect
                  key={`libre-${i}`}
                  x={x + 2}
                  y={RAYON.sol - H * ECHELLE + 4}
                  width={L * ECHELLE - 4}
                  height={H * ECHELLE - 4}
                  fill="none"
                  stroke="#e0b57a"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  opacity={0.35}
                />
              )
            }
            return (
              <Cartouche
                key={jeu.slug}
                jeu={jeu}
                lang={lang}
                x={x}
                active={i === selection}
                joue={estJoue(jeu.slug)}
                onChoisir={() => choisir(i)}
              />
            )
          })}
        </g>
      </svg>

      {/* Récitatif BD sous la scène : le jeu de la cartouche choisie */}
      {courant && (
        <div
          style={{
            width: 'calc(100% - 32px)',
            maxWidth: 760,
            margin: 'clamp(12px, 2vw, 20px) auto 0',
            background: JAUNE,
            color: ENCRE,
            border: `4px solid ${ENCRE}`,
            boxShadow: `7px 7px 0 ${ENCRE}`,
            padding: '14px 18px',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 260px' }}>
            <div style={{ fontFamily: 'var(--font-bd)', fontWeight: 700, fontSize: 22, textTransform: 'uppercase', lineHeight: 1.1 }}>
              {courant.icone} {courant.titre[lang]}
            </div>
            <p style={{ fontFamily: 'var(--font-bd)', fontSize: 16, lineHeight: 1.3, margin: '4px 0 0' }}>{courant.accroche[lang]}</p>
          </div>
          <Link
            to={`/jeux/${courant.slug}`}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 10,
              color: joue ? ENCRE : '#fff',
              background: joue ? '#5cc85a' : '#e8402a',
              border: `3px solid ${ENCRE}`,
              boxShadow: `4px 4px 0 ${ENCRE}`,
              padding: '10px 14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {joue ? jt(lang, 'joueAujourdhui') : jt(lang, 'inserer')}
          </Link>
        </div>
      )}
    </>
  )
}
