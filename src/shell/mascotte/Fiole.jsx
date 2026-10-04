import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../LanguageContext'
import { SPRITES, FX, PAL } from './sprites'
import './fiole.css'

const BLINK_MIN = 2200
const BLINK_RANGE = 2600
const BLINK_DURATION = 140
const DODO_DELAY = 30000
const WOBBLE_DURATION = 600
const HAPPY_DURATION = 650
const BUBBLE_DURATION = 1800
const TOXIC_BUBBLE_DURATION = 2500
const TOXIC_SPIN_DURATION = 800
const TOXIC_GLOW_DURATION = 1000
const TOXIC_TOTAL_DURATION = 4000
const CYCLE_DURATION = 380
// Explosion de l'Alambic au 10ᵉ clic : tremblement, boum, suie, retour
const SHAKE_DURATION = 900
const BOOM_DURATION = 450
const SUIE_DURATION = 3200
const PHRASE_SURCHAUFFE = { fr: 'Ça chauffe…', en: 'Heating up…' }
const PHRASE_BOUM = { fr: 'BOUM !', en: 'BOOM!' }

const ARIA_LABELS = {
  fiole: { fr: 'Fiole, la mascotte du Lab', en: 'Flask, the Lab mascot' },
  alambic: { fr: "L'Alambic, la mascotte de la maison", en: 'The Alembic, the house mascot' },
  toxique: { fr: 'Fiole toxique', en: 'Toxic flask' },
}

function frameRows(sprite, frame) {
  if (frame === 'base' || !sprite[frame]) return sprite.base
  const rows = sprite.base.slice()
  Object.entries(sprite[frame]).forEach(([i, row]) => { rows[Number(i)] = row })
  return rows
}

// Pose un pas de l'animation continue (`cycle` du sprite) sur l'image
function applyCycle(rows, pixels) {
  if (!pixels || !pixels.length) return rows
  const out = rows.map((row) => [...row])
  pixels.forEach(([x, y, c]) => { out[y][x] = c })
  return out.map((row) => row.join(''))
}

function renderPixels(rows, scale) {
  const width = rows[0].length
  const height = rows.length
  const cells = []
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const token = PAL[row[x]]
      if (token) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={`var(${token})`} />)
    }
  })
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      aria-hidden="true"
      style={{ display: 'block', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      {cells}
    </svg>
  )
}

// `scale` : facteur d'agrandissement de la grille 16×16 (3 = 48×48 px dans la
// barre d'état, 4 pour l'en-tête des rubriques introuvables, 8 pour la 404).
// `variant` : sprite de repos ('fiole' pour la mascotte normale, 'toxique'
// pour la Fiole dédiée de la page 404 — comportement propre, voir D7 ;
// 'alambic' pour la mascotte de la maison d'édition, animée en continu).
// `sleeps` : autorise ou non l'endormissement après 30 s d'inactivité.
export default function Fiole({ scale = 3, variant = 'fiole', sleeps = true }) {
  const { lang } = useLanguage()
  const buttonRef = useRef(null)
  const clicksRef = useRef(0)
  const reducedMotionRef = useRef(false)

  const [frame, setFrameState] = useState('base')
  const frameRef = useRef('base')
  const setFrame = (f) => { frameRef.current = f; setFrameState(f) }

  const [toxic, setToxicState] = useState(false)
  const toxicRef = useRef(false)
  const setToxic = (v) => { toxicRef.current = v; setToxicState(v) }

  const [animClass, setAnimClass] = useState(null)
  const [bubble, setBubble] = useState(null)
  const [bubbleRect, setBubbleRect] = useState(null)
  const [particles, setParticles] = useState([])
  const [pas, setPas] = useState(0)
  // Image exceptionnelle qui remplace le sprite : 'explosion' ou 'suie'
  const [special, setSpecial] = useState(null)

  const blinkTimer = useRef(null)
  const blinkBackTimer = useRef(null)
  const dodoTimer = useRef(null)
  const bubbleTimer = useRef(null)
  const wobbleTimer = useRef(null)
  const happyTimer = useRef(null)
  const toxicTimers = useRef([])
  const particleTimers = useRef([])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Clignement aléatoire des yeux, tant que la Fiole est au repos (D5).
  useEffect(() => {
    let cancelled = false
    const schedule = () => {
      blinkTimer.current = setTimeout(() => {
        if (cancelled) return
        if (frameRef.current === 'base') {
          setFrame('blink')
          blinkBackTimer.current = setTimeout(() => {
            if (!cancelled && frameRef.current === 'blink') setFrame('base')
          }, BLINK_DURATION)
        }
        schedule()
      }, BLINK_MIN + Math.random() * BLINK_RANGE)
    }
    schedule()
    return () => {
      cancelled = true
      clearTimeout(blinkTimer.current)
      clearTimeout(blinkBackTimer.current)
    }
  }, [])

  // Animation continue du sprite (flammes, goutte de l'alambic), pas à pas.
  useEffect(() => {
    if (!SPRITES[variant].cycle || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const longueur = SPRITES[variant].cycle.length
    const minuterie = setInterval(() => setPas((p) => (p + 1) % longueur), CYCLE_DURATION)
    return () => clearInterval(minuterie)
  }, [variant])

  // Nettoyage de toutes les minuteries au démontage (D9).
  useEffect(() => {
    const toxicTimersList = toxicTimers.current
    const particleTimersList = particleTimers.current
    return () => {
      clearTimeout(dodoTimer.current)
      clearTimeout(bubbleTimer.current)
      clearTimeout(wobbleTimer.current)
      clearTimeout(happyTimer.current)
      toxicTimersList.forEach(clearTimeout)
      particleTimersList.forEach(clearTimeout)
    }
  }, [])

  const wake = () => {
    clearTimeout(dodoTimer.current)
    if (frameRef.current === 'sleep') setFrame('base')
    if (!sleeps) return
    dodoTimer.current = setTimeout(() => {
      if (!toxicRef.current) setFrame('sleep')
    }, DODO_DELAY)
  }

  useEffect(() => {
    wake()
    return () => clearTimeout(dodoTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const spawnParticles = (kind, count, ecart = 60) => {
    if (reducedMotionRef.current || !buttonRef.current) return
    const r = buttonRef.current.getBoundingClientRect()
    const particleScale = Math.max(2, scale / 2)
    const created = []
    for (let i = 0; i < count; i++) {
      const id = `${Date.now()}-${i}-${Math.random()}`
      created.push({
        id,
        kind,
        scale: particleScale,
        dx: (Math.random() - 0.5) * ecart,
        left: r.left + r.width * (0.3 + Math.random() * 0.4),
        top: r.top + Math.random() * r.height * 0.3,
        delay: i * 70,
      })
      const t = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
        const idx = particleTimers.current.indexOf(t)
        if (idx !== -1) particleTimers.current.splice(idx, 1)
      }, 1200 + i * 70)
      particleTimers.current.push(t)
    }
    setParticles((prev) => [...prev, ...created])
  }

  const showBubble = (text, duration) => {
    if (!buttonRef.current) return
    clearTimeout(bubbleTimer.current)
    setBubbleRect(buttonRef.current.getBoundingClientRect())
    setBubble(text)
    bubbleTimer.current = setTimeout(() => setBubble(null), duration)
  }

  const reactNormally = () => {
    setAnimClass('wobble')
    clearTimeout(wobbleTimer.current)
    wobbleTimer.current = setTimeout(() => setAnimClass(null), WOBBLE_DURATION)

    setFrame('happy')
    clearTimeout(happyTimer.current)
    happyTimer.current = setTimeout(() => {
      if (frameRef.current === 'happy') setFrame('base')
    }, HAPPY_DURATION)

    spawnParticles('bubble', 4)
    const phrases = SPRITES[variant].phrases[lang] || SPRITES[variant].phrases.fr
    showBubble(phrases[Math.floor(Math.random() * phrases.length)], BUBBLE_DURATION)
  }

  // Réaction de la Fiole toxique de la 404 (D7) : même tangage que la
  // réaction normale, particules et phrase toxiques ; pas de bascule de
  // sprite (elle est toxique en permanence), pas de secret du 10ᵉ clic.
  const reactToxicPage = () => {
    setAnimClass('wobble')
    clearTimeout(wobbleTimer.current)
    wobbleTimer.current = setTimeout(() => setAnimClass(null), WOBBLE_DURATION)

    setFrame('happy')
    clearTimeout(happyTimer.current)
    happyTimer.current = setTimeout(() => {
      if (frameRef.current === 'happy') setFrame('base')
    }, HAPPY_DURATION)

    spawnParticles('poison', 6)
    const phrases = SPRITES.toxique.phrases[lang] || SPRITES.toxique.phrases.fr
    showBubble(phrases[Math.floor(Math.random() * phrases.length)], BUBBLE_DURATION)
  }

  const reactToxic = () => {
    toxicTimers.current.forEach(clearTimeout)
    toxicTimers.current.length = 0

    setToxic(true)
    setAnimClass('spin')
    setFrame('happy')
    spawnParticles('poison', 12)
    const secret = SPRITES.toxique.secret[lang] || SPRITES.toxique.secret.fr
    showBubble(secret, TOXIC_BUBBLE_DURATION)

    toxicTimers.current.push(setTimeout(() => setAnimClass(null), TOXIC_SPIN_DURATION))
    toxicTimers.current.push(setTimeout(() => setFrame('base'), TOXIC_GLOW_DURATION))
    toxicTimers.current.push(setTimeout(() => {
      setToxic(false)
      setFrame('base')
      spawnParticles('bubble', 4)
    }, TOXIC_TOTAL_DURATION))
  }

  // Secret du 10ᵉ clic de l'Alambic : la distillation tourne mal. Il tremble,
  // explose en éclats de cuivre et étincelles, reste noirci un moment, puis
  // se remet en état. Les clics pendant ce temps ne relancent rien.
  const reactExplosion = () => {
    toxicTimers.current.forEach(clearTimeout)
    toxicTimers.current.length = 0
    toxicRef.current = true

    setAnimClass('shake')
    setFrame('happy')
    showBubble(PHRASE_SURCHAUFFE[lang] || PHRASE_SURCHAUFFE.fr, SHAKE_DURATION)

    toxicTimers.current.push(setTimeout(() => {
      setAnimClass(null)
      setSpecial('explosion')
      spawnParticles('eclat', 10, 160)
      spawnParticles('etincelle', 10, 140)
      showBubble(PHRASE_BOUM[lang] || PHRASE_BOUM.fr, BOOM_DURATION + 400)
    }, SHAKE_DURATION))
    toxicTimers.current.push(setTimeout(() => {
      setSpecial('suie')
      setFrame('base')
      const phrases = SPRITES.suie.phrases
      showBubble(phrases[lang] || phrases.fr, SUIE_DURATION - 400)
    }, SHAKE_DURATION + BOOM_DURATION))
    toxicTimers.current.push(setTimeout(() => {
      setSpecial(null)
      toxicRef.current = false
      setAnimClass('wobble')
      wobbleTimer.current = setTimeout(() => setAnimClass(null), WOBBLE_DURATION)
      spawnParticles('bubble', 4)
      wake()
    }, SHAKE_DURATION + BOOM_DURATION + SUIE_DURATION))
  }

  const handleClick = () => {
    wake()
    if (variant === 'toxique') {
      reactToxicPage()
      return
    }
    clicksRef.current += 1
    // Un clic pendant la transformation compte, mais ne la relance pas :
    // elle va à son terme (D6).
    if (toxicRef.current) return
    if (clicksRef.current % 10 === 0) {
      if (variant === 'alambic') reactExplosion()
      else reactToxic()
    }
    else reactNormally()
  }

  const onMouseEnter = () => {
    wake()
    if (frameRef.current === 'base') setFrame('look')
  }
  const onMouseLeave = () => {
    if (frameRef.current === 'look') setFrame('base')
  }

  const sprite = SPRITES[special || (toxic ? 'toxique' : variant)]
  // Pas d'animation continue endormi : le feu est en veilleuse
  const rows = applyCycle(frameRows(sprite, frame), frame === 'sleep' || special ? null : sprite.cycle?.[pas])
  const btnClass = ['fiole-btn', animClass ? `fiole-${animClass}` : null, frame === 'sleep' ? 'fiole-sleep' : null]
    .filter(Boolean)
    .join(' ')
  const labels = ARIA_LABELS[variant]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={btnClass}
        aria-label={labels[lang] || labels.fr}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ '--fiole-bob': `${scale}px` }}
      >
        <span className="fiole-inner">{renderPixels(rows, scale)}</span>
        {frame === 'sleep' && <span className="fiole-zzz" aria-hidden="true">z</span>}
      </button>

      {createPortal(
        <>
          {bubble && bubbleRect && (
            <div
              className="fiole-bubble"
              role="status"
              aria-live="polite"
              style={{
                position: 'fixed',
                bottom: window.innerHeight - bubbleRect.top + 8,
                right: Math.max(8, window.innerWidth - bubbleRect.right),
              }}
            >
              {bubble}
            </div>
          )}
          {particles.map((p) => (
            <div
              key={p.id}
              className="fiole-particle"
              style={{
                position: 'fixed',
                left: p.left,
                top: p.top,
                animationDelay: `${p.delay}ms`,
                '--dx': `${p.dx}px`,
              }}
            >
              {renderPixels(FX[p.kind], p.scale)}
            </div>
          ))}
        </>,
        document.body
      )}
    </>
  )
}
