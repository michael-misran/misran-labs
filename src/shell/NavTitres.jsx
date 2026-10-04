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
  color: 'var(--text2)',
  display: 'block',
  marginBottom: 2,
}

// Médaillon posé entre deux titres
function Medaillon({ children }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(50%, -50%)',
        zIndex: 1,
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: 'var(--masthead-lettre)',
        border: '2px solid var(--masthead-encre)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
        lineHeight: 1,
        color: 'var(--masthead-encre)',
      }}
    >
      {children}
    </span>
  )
}

const SYMBOLES = ['★', '✦', '☠', '✺']

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
      style: { fontFamily: 'var(--font-gothique)', wordSpacing: 'var(--font-gothique-espace)', fontSize: 'clamp(28px, 3vw, 38px)' },
    },
    {
      id: 'magazine',
      to: '/magazine',
      actif: estActif(pathname, ['/magazine']),
      couleur: 'var(--titre-magazine)',
      rythme: t(lang, 'navRythmeMagazine'),
      nom: t(lang, 'navTitreMagazine'),
      style: { fontFamily: 'var(--primitive-font-playfair-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 32px)' },
    },
    {
      id: 'zine',
      to: zineExiste ? '/zine' : null,
      actif: zineExiste && estActif(pathname, ['/zine']),
      couleur: 'var(--titre-zine)',
      rythme: zineExiste ? t(lang, 'navRythmeZine') : t(lang, 'navBientot'),
      nom: t(lang, 'navTitreZine'),
      style: { fontFamily: 'var(--font-bd)', fontStyle: 'italic', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(22px, 2.4vw, 30px)' },
    },
    {
      id: 'jeux',
      to: '/jeux',
      actif: estActif(pathname, ['/jeux']),
      couleur: 'var(--titre-jeux)',
      rythme: t(lang, 'navRythmeJeux'),
      nom: t(lang, 'navTitreJeux'),
      style: { fontFamily: 'var(--font-pixel)', fontSize: 'clamp(14px, 1.55vw, 19px)', lineHeight: 1.6 },
    },
    {
      id: 'lab',
      to: '/lab',
      actif: estActif(pathname, ['/lab', '/projets']),
      couleur: 'var(--titre-lab)',
      rythme: t(lang, 'navRythmeLab'),
      nom: t(lang, 'navTitreLab'),
      style: { fontFamily: 'var(--font-machine)', letterSpacing: '0.02em', fontSize: 'clamp(24px, 2.6vw, 32px)' },
    },
  ]

  return (
    <nav
      className="no-print"
      aria-label="Titres de la maison"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--bg2)',
        borderBottom: '3px double var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(175px, 1fr))',
          overflowX: 'auto',
        }}
      >
        {titres.map((titre, i) => {
          const contenu = (
            <>
              <span style={rythme}>{titre.rythme}</span>
              {/* Rangée du titre, avec le médaillon qui le sépare du suivant */}
              <span style={{ position: 'relative', display: 'block', padding: '4px 0' }}>
                <span
                  style={{
                    display: 'inline-block',
                    lineHeight: 1.05,
                    color: titre.couleur,
                    WebkitTextStroke: '3px var(--masthead-encre)',
                    paintOrder: 'stroke fill',
                    transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                    ...titre.style,
                  }}
                >
                  {titre.nom}
                </span>
                {i < titres.length - 1 && <Medaillon>{SYMBOLES[i]}</Medaillon>}
              </span>
            </>
          )

          const commonStyle = {
            display: 'block',
            padding: '8px 0 8px',
            textAlign: 'center',
            borderBottom: titre.actif ? `3px solid ${titre.couleur}` : '3px solid transparent',
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
