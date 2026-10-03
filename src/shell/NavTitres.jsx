import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

const rythme = {
  fontFamily: 'var(--font-etiquette)',
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--text2)',
  display: 'block',
  marginTop: 4,
}

function estActif(pathname, match) {
  return match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export default function NavTitres() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()

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
          <span style={{ color: 'var(--titre-gazette)' }}>{t(lang, 'navTitreGazetteInitiale')}</span>
          {t(lang, 'navTitreGazetteReste')}
        </>
      ),
      style: { fontFamily: 'var(--font-gothique)', fontSize: 27 },
    },
    {
      id: 'magazine',
      to: '/magazine',
      actif: estActif(pathname, ['/magazine']),
      couleur: 'var(--titre-magazine)',
      rythme: t(lang, 'navRythmeMagazine'),
      nom: t(lang, 'navTitreMagazine'),
      style: { fontFamily: 'var(--primitive-font-playfair-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 24 },
    },
    {
      id: 'zine',
      to: null,
      actif: false,
      couleur: 'var(--titre-zine)',
      rythme: t(lang, 'navBientot'),
      nom: t(lang, 'navTitreZine'),
      style: { fontFamily: 'var(--font-bd)', fontStyle: 'italic', fontWeight: 700, textTransform: 'uppercase', fontSize: 22 },
    },
    {
      id: 'jeux',
      to: '/jeux',
      actif: estActif(pathname, ['/jeux']),
      couleur: 'var(--titre-jeux)',
      rythme: t(lang, 'navRythmeJeux'),
      nom: t(lang, 'navTitreJeux'),
      style: { fontFamily: 'var(--font-pixel)', fontSize: 15, lineHeight: 1.6 },
    },
    {
      id: 'lab',
      to: '/lab',
      actif: estActif(pathname, ['/lab', '/projets']),
      couleur: 'var(--titre-lab)',
      rythme: t(lang, 'navRythmeLab'),
      nom: t(lang, 'navTitreLab'),
      style: { fontFamily: 'var(--font-machine)', letterSpacing: '0.02em', fontSize: 24 },
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
        borderTop: '3px double var(--border)',
        borderBottom: '3px double var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(120px, 1fr))',
          overflowX: 'auto',
        }}
      >
        {titres.map((titre, i) => {
          const contenu = (
            <>
              <span style={{ display: 'block', lineHeight: 1.05, color: 'var(--text)', ...titre.style }}>{titre.nom}</span>
              <span style={rythme}>{titre.rythme}</span>
            </>
          )

          const commonStyle = {
            display: 'block',
            padding: '12px 10px 10px',
            textAlign: 'center',
            borderRight: i < titres.length - 1 ? 'var(--border-thin) solid var(--border)' : 'none',
            borderBottom: titre.actif ? `3px solid ${titre.couleur}` : '3px solid transparent',
            textDecoration: 'none',
          }

          if (!titre.to) {
            return (
              <span key={titre.id} aria-disabled="true" style={{ ...commonStyle, cursor: 'not-allowed', opacity: 0.6 }}>
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
