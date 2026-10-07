import { Link } from 'react-router-dom'
import Logo1977 from './Logo1977'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { formatDateLong } from './dates'
import useIsMobile from './useIsMobile'

// En-tête pulp de la maison, façon couverture DoggyBags : bandeau rouge,
// carton kraft, grand titre crème cerné de noir avec ombre rouge sang.
// Maquette de référence : screens/header-doggybags.html.

function todayIso() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

// Grain de papier (bruit SVG), posé par-dessus le bandeau et le carton
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3  0 0 0 0 .25  0 0 0 0 .15  0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function Grain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        opacity: 0.55,
        backgroundImage: GRAIN,
      }}
    />
  )
}

// Désordre du lettrage « fait main » : [rotation en degrés, décalage vertical
// en em, taille relative], une entrée par caractère de « Misran Labs ».
const DECALAGES = [
  [-4, -0.03, 1.18], [2, 0.02, 1], [-1, -0.02, 1], [3, 0.01, 1], [-2, 0.03, 1], [1, -0.02, 1],
  [0, 0, 1], [-3, 0.02, 1.12], [2, -0.01, 1], [-1, 0.03, 1], [3, -0.02, 1],
]

// Rond entre deux noms du bandeau, comme les portraits d'auteurs de la couverture
function Medaillon({ children, taille }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: taille,
        height: taille,
        borderRadius: '50%',
        background: 'var(--masthead-lettre)',
        border: `${taille > 24 ? 3 : 2}px solid var(--masthead-encre)`,
        display: 'grid',
        placeItems: 'center',
        fontSize: taille * 0.46,
        lineHeight: 1,
        color: 'var(--masthead-encre)',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  )
}

export default function Masthead() {
  const { lang, toggle: toggleLang } = useLanguage()
  const isMobile = useIsMobile()
  // En dessous de 600 px (D8), l'en-tête se resserre encore : pastille plus
  // petite, accroche et cartouche masqués — pour que le header de la maison
  // tienne en moins de 200 px à 375 px de large.
  const isNarrow = useIsMobile(600)
  const today = formatDateLong(todayIso(), lang)

  const lien = {
    fontFamily: 'var(--font-bandeau)',
    fontSize: isNarrow ? 18 : isMobile ? 22 : 28,
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    color: 'var(--masthead-lettre)',
    WebkitTextStroke: `${isNarrow ? 4 : 5}px var(--masthead-encre)`,
    paintOrder: 'stroke fill',
    textDecoration: 'none',
  }
  const tailleMedaillon = isNarrow ? 20 : 28
  const largeurLogo = isNarrow ? 56 : isMobile ? 72 : 96

  return (
    <div className="no-print">
      {/* Bandeau rouge du haut */}
      <div
        style={{
          position: 'relative',
          background: 'var(--masthead-bandeau)',
          borderBottom: '4px solid var(--masthead-encre)',
        }}
      >
        <Grain />
        <div
          style={{
            position: 'relative',
            maxWidth: 1240,
            margin: '0 auto',
            padding: isNarrow ? '6px 16px' : '6px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {!isNarrow && (
            <span style={{ ...etiquette, fontWeight: 500, fontSize: 12, color: 'var(--masthead-lettre)' }}>
              {t(lang, 'mastheadBrand')}
            </span>
          )}
          <nav style={{ display: 'flex', alignItems: 'center', gap: isNarrow ? 8 : 10 }}>
            <Link to="/projets" style={lien}>{t(lang, 'mastheadIdees')}</Link>
            <Medaillon taille={tailleMedaillon}>★</Medaillon>
            <Link to="/suivre" style={lien}>{t(lang, 'mastheadAbonner')}</Link>
            <Medaillon taille={tailleMedaillon}>✦</Medaillon>
            <Link to="/lab/cv" style={lien}>{t(lang, 'mastheadCV')}</Link>
          </nav>
          <button
            onClick={toggleLang}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            style={{
              ...etiquette,
              letterSpacing: '0.1em',
              fontWeight: 700,
              fontSize: 12,
              lineHeight: 1,
              background: 'var(--masthead-encre)',
              color: 'var(--masthead-lettre)',
              border: 'none',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>

      {/* Carton kraft, assombri sur les bords */}
      <header
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: [
            'radial-gradient(ellipse at 50% 40%, transparent 45%, var(--masthead-fond-ombre) 100%)',
            'var(--masthead-fond)',
          ].join(', '),
        }}
      >
        <Grain />
        <div
          style={{
            position: 'relative',
            maxWidth: 1240,
            margin: '0 auto',
            // Bas généreux : les rythmes et le haut des titres du menu (NavTitres) débordent ici
            padding: isNarrow ? '14px 16px 44px' : '22px 20px 52px',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto minmax(0, 1fr)' : 'auto minmax(0, 1fr) auto',
            gap: isNarrow ? 14 : 28,
            alignItems: 'center',
          }}
        >
          {/* Logo de la maison d'édition 1977 Éditions */}
          <span style={{ color: 'var(--masthead-encre)' }}>
            <Logo1977 largeur={largeurLogo} fond="var(--masthead-logo-fond)" />
          </span>

          <div style={{ minWidth: 0 }}>
            <h1
              aria-label="Misran Labs"
              style={{
                fontFamily: 'var(--font-pulp)',
                fontWeight: 400,
                // Le titre fait ~8,1 em de large : sa taille suit la place laissée
                // par la pastille et le cartouche, avec une marge d'air avant ce dernier.
                fontSize: isNarrow ? '8.4vw' : isMobile ? 'clamp(40px, 9vw, 64px)' : 'clamp(40px, calc(12.3vw - 53px), 98px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: 'var(--masthead-lettre)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'flex-end',
                filter: `drop-shadow(${isNarrow ? '3px 4px' : '6px 7px'} 0 var(--masthead-encre))`,
              }}
            >
              {[...'Misran Labs'].map((c, i) => {
                if (c === ' ') return <span key={i} style={{ width: '.34em', flexShrink: 0 }} />
                const [rot, y, taille] = DECALAGES[i]
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      flexShrink: 0,
                      transform: `translateY(${y}em) rotate(${rot}deg)`,
                      fontSize: `${taille}em`,
                      WebkitTextStroke: '.11em var(--masthead-encre)',
                      paintOrder: 'stroke fill',
                      textShadow: '.05em .05em 0 var(--masthead-ombre)',
                    }}
                  >
                    {c}
                  </span>
                )
              })}
            </h1>
            {!isNarrow && (
              <p
                style={{
                  fontFamily: 'var(--font-bd)',
                  fontWeight: 700,
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.35,
                  marginTop: 14,
                  maxWidth: 640,
                  color: 'var(--masthead-encre)',
                }}
              >
                {t(lang, 'mastheadTagline')}
              </p>
            )}
          </div>

          {/* Cartouche penché, comme « Suspense, frissons & horreur !! » */}
          {!isMobile && (
            <div
              style={{
                background: 'var(--masthead-lettre)',
                border: '3px solid var(--masthead-encre)',
                boxShadow: '5px 5px 0 var(--masthead-encre)',
                padding: '10px 14px',
                justifySelf: 'end',
                transform: 'rotate(4deg)',
                textAlign: 'center',
                color: 'var(--masthead-encre)',
              }}
            >
              <span style={{ ...etiquette, fontWeight: 700, fontSize: 11 }}>{t(lang, 'mastheadOuvertLabel')}</span>
              <b
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-affiche)',
                  fontWeight: 400,
                  fontSize: 30,
                  lineHeight: 1,
                  letterSpacing: '0.03em',
                  color: 'var(--masthead-bandeau)',
                  margin: '4px 0',
                }}
              >
                {t(lang, 'mastheadOuvertHeure')} !!
              </b>
              <span style={{ ...etiquette, fontWeight: 700, fontSize: 11 }}>{t(lang, 'mastheadOuvertTous')}</span>
              <span
                style={{
                  ...etiquette,
                  fontWeight: 700,
                  fontSize: 11,
                  display: 'block',
                  marginTop: 6,
                  paddingTop: 6,
                  borderTop: '2px solid var(--masthead-encre)',
                }}
              >
                {today}
              </span>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}
