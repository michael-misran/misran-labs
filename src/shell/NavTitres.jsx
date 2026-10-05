import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { getNumeros } from '../zine/numeros'

const rythme = {
  fontFamily: 'var(--font-etiquette)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--masthead-encre)',
  display: 'block',
  marginBottom: 2,
  whiteSpace: 'nowrap',
}

// Barre fine façon sommaire de couverture pulp : les titres, plus hauts
// qu'elle, la chevauchent. Le rythme (« Quotidien »…) déborde au-dessus,
// sur le carton du header, comme les noms d'auteurs sur la couverture.
const BARRE = 22
const DEBORD_HAUT = 52
const DEBORD_BAS = 26
const FILET = 4

// Fond des zones de débordement, posé seulement quand la barre est collée
// en haut de l'écran : sinon le contenu de la page passe derrière les titres
function fondDebord(haut, hauteur, fond) {
  return { position: 'absolute', left: 0, right: 0, top: haut, height: hauteur, background: fond }
}

function estActif(pathname, match) {
  return match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export default function NavTitres() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()
  const zineExiste = getNumeros().length > 0

  const titres = [
    {
      id: 'gazette',
      to: '/breves',
      actif: estActif(pathname, ['/breves']),
      couleur: 'var(--titre-gazette)',
      rythme: t(lang, 'navRythmeGazette'),
      nom: (
        <>
          {t(lang, 'navTitreGazettePrefix')}
          {t(lang, 'navTitreGazetteInitiale')}
          {t(lang, 'navTitreGazetteReste')}
        </>
      ),
      style: { fontFamily: 'var(--font-gothique)', wordSpacing: 'var(--font-gothique-espace)', fontSize: 'clamp(32px, 3.6vw, 46px)' },
    },
    {
      id: 'zine',
      to: zineExiste ? '/zine' : null,
      actif: zineExiste && estActif(pathname, ['/zine']),
      couleur: 'var(--titre-zine)',
      rythme: zineExiste ? t(lang, 'navRythmeZine') : t(lang, 'navBientot'),
      nom: t(lang, 'navTitreZine'),
      style: { fontFamily: 'var(--font-bd)', fontStyle: 'italic', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(26px, 2.9vw, 36px)' },
    },
    {
      id: 'jeux',
      to: '/jeux',
      actif: estActif(pathname, ['/jeux']),
      couleur: 'var(--titre-jeux)',
      rythme: t(lang, 'navRythmeJeux'),
      nom: t(lang, 'navTitreJeux'),
      style: { fontFamily: 'var(--font-pixel)', fontSize: 'clamp(16px, 1.9vw, 23px)', lineHeight: 1.6 },
    },
    {
      id: 'lab',
      to: '/lab',
      actif: estActif(pathname, ['/lab', '/projets']),
      couleur: 'var(--titre-lab)',
      rythme: t(lang, 'navRythmeLab'),
      nom: t(lang, 'navTitreLab'),
      style: { fontFamily: 'var(--font-machine)', letterSpacing: '0.02em', fontSize: 'clamp(28px, 3.1vw, 38px)' },
    },
  ]

  const navRef = useRef(null)
  const [collee, setCollee] = useState(false)
  useEffect(() => {
    const surveiller = () => {
      if (navRef.current) setCollee(navRef.current.getBoundingClientRect().top <= DEBORD_HAUT)
    }
    surveiller()
    window.addEventListener('scroll', surveiller, { passive: true })
    window.addEventListener('resize', surveiller)
    return () => {
      window.removeEventListener('scroll', surveiller)
      window.removeEventListener('resize', surveiller)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="no-print"
      aria-label="Titres de la maison"
      style={{
        position: 'sticky',
        // Collée sous ce qui déborde au-dessus, pour que les titres restent entiers
        top: DEBORD_HAUT,
        zIndex: 30,
        height: BARRE,
        background: 'var(--masthead-sommaire)',
        borderTop: `${FILET}px solid var(--masthead-encre)`,
        borderBottom: `${FILET}px solid var(--masthead-encre)`,
        // Place laissée sous la barre pour le bas des titres, qui déborde
        marginBottom: DEBORD_BAS,
        boxSizing: 'content-box',
        // Empêche la marge négative de la zone de défilement de « fusionner »
        // avec celle de la barre (sans bordure haute, elle remonterait toute la barre)
        display: 'flow-root',
      }}
    >
      {collee && (
        <>
          {/* Carton kraft au-dessus, comme le header ; fond de page en dessous */}
          <span aria-hidden="true" style={fondDebord(-(DEBORD_HAUT + FILET), DEBORD_HAUT, 'var(--masthead-fond)')} />
          <span aria-hidden="true" style={fondDebord(BARRE + FILET, DEBORD_BAS, 'var(--bg)')} />
        </>
      )}
      {/* Zone de défilement agrandie (marges négatives + padding) : sur mobile
          le menu défile de côté sans rogner ce qui déborde de la barre */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: `-${DEBORD_HAUT}px auto -${DEBORD_BAS}px`,
          padding: `${DEBORD_HAUT}px 0 ${DEBORD_BAS}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${titres.length}, minmax(175px, 1fr))`,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {titres.map((titre, i) => {
          const contenu = (
            <>
              {/* Titre centré sur la barre, rythme posé au-dessus */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <span
                  style={{
                    ...rythme,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '100%',
                    color: titre.actif ? titre.couleur : rythme.color,
                  }}
                >
                  {titre.rythme}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    lineHeight: 1.05,
                    color: titre.couleur,
                    WebkitTextStroke: '3px var(--masthead-lettre)',
                    paintOrder: 'stroke fill',
                    transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                    ...titre.style,
                  }}
                >
                  {titre.nom}
                </span>
              </span>
            </>
          )

          const commonStyle = {
            position: 'relative',
            display: 'block',
            height: BARRE,
            textAlign: 'center',
            textDecoration: 'none',
          }

          if (!titre.to) {
            return (
              <span key={titre.id} aria-disabled="true" style={{ ...commonStyle, cursor: 'not-allowed' }}>
                {contenu}
              </span>
            )
          }

          return (
            <Link
              key={titre.id}
              to={titre.to}
              aria-current={titre.actif ? 'page' : undefined}
              style={commonStyle}
            >
              {contenu}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
