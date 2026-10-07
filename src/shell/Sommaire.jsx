import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { getNumeros } from '../zine/numeros'
import useIsMobile from './useIsMobile'

// Sommaire façon magazine : une page de papier qui s'ouvre par-dessus le site,
// numéros de page en gros chiffres, l'édito toujours en tête. Ouvert depuis
// le bouton « Sommaire » du bandeau (Masthead).

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

// Entrées du sommaire, dans l'ordre du magazine ; page = numéro décoratif
function entrees(lang) {
  const zineExiste = getNumeros().length > 0
  return [
    { page: 3, to: '/', match: ['/'], titre: t(lang, 'editoNav'), chapo: t(lang, 'sommaireEdito'), couleur: 'var(--edito-bleu)', police: 'var(--font-pulp)' },
    { page: 5, to: '/breves', match: ['/breves'], titre: t(lang, 'brevesNav'), chapo: t(lang, 'sommaireGazette'), couleur: 'var(--titre-gazette)', police: 'var(--font-gothique)' },
    ...(zineExiste
      ? [{ page: 12, to: '/zine', match: ['/zine'], titre: t(lang, 'navTitreZine'), chapo: t(lang, 'sommaireZine'), couleur: 'var(--titre-zine)', police: 'var(--font-bd)' }]
      : []),
    { page: 20, to: '/jeux', match: ['/jeux'], titre: t(lang, 'jeuxNav'), chapo: t(lang, 'sommaireJeux'), couleur: 'var(--titre-jeux)', police: 'var(--font-enseigne)' },
    { page: 28, to: '/lab', match: ['/lab'], titre: t(lang, 'navTitreLab'), chapo: t(lang, 'sommaireLab'), couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
    { page: 36, to: '/projets', match: ['/projets'], titre: t(lang, 'mastheadIdees'), chapo: t(lang, 'sommaireIdees'), couleur: 'var(--titre-lab)', police: 'var(--font-machine)' },
    { page: 42, to: '/kiosque', match: ['/kiosque'], titre: t(lang, 'kiosqueNav'), chapo: t(lang, 'sommaireKiosque'), couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
    { page: 46, to: '/suivre', match: ['/suivre'], titre: t(lang, 'mastheadAbonner'), chapo: t(lang, 'sommaireAbonner'), couleur: 'var(--titre-gazette)', police: 'var(--font-pulp)' },
    { page: 48, to: '/lab/cv', match: ['/lab/cv'], titre: t(lang, 'mastheadCV'), chapo: t(lang, 'sommaireCV'), couleur: 'var(--masthead-encre)', police: 'var(--font-pulp)' },
  ]
}

function estActif(pathname, match) {
  return match.some((p) => (p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(`${p}/`)))
}

export default function Sommaire({ ouvert, onFermer }) {
  const { lang } = useLanguage()
  const { pathname } = useLocation()
  const isNarrow = useIsMobile(600)
  const fermerRef = useRef(null)

  // Fermeture à la navigation
  useEffect(() => { onFermer() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Échap pour fermer, défilement de la page bloqué, focus sur le bouton fermer
  useEffect(() => {
    if (!ouvert) return
    const surTouche = (e) => { if (e.key === 'Escape') onFermer() }
    window.addEventListener('keydown', surTouche)
    const ancien = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    fermerRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', surTouche)
      document.body.style.overflow = ancien
    }
  }, [ouvert, onFermer])

  if (!ouvert) return null

  return (
    <div
      className="no-print"
      role="dialog"
      aria-modal="true"
      aria-label={t(lang, 'sommaireTitre')}
      onClick={onFermer}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(26, 17, 9, 0.55)',
        overflowY: 'auto',
        padding: isNarrow ? '16px' : '40px 20px',
        animation: 'fadeIn .15s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 760,
          margin: '0 auto',
          background: 'var(--masthead-fond)',
          border: '4px solid var(--masthead-encre)',
          boxShadow: '8px 8px 0 var(--masthead-encre)',
          color: 'var(--masthead-encre)',
          padding: isNarrow ? '20px 16px 24px' : '32px 40px 36px',
        }}
      >
        <button
          ref={fermerRef}
          type="button"
          onClick={onFermer}
          aria-label={t(lang, 'sommaireFermer')}
          style={{
            ...etiquette,
            position: 'absolute',
            top: 12,
            right: 12,
            fontWeight: 700,
            fontSize: 12,
            background: 'var(--masthead-encre)',
            color: 'var(--masthead-lettre)',
            border: 'none',
            padding: '6px 10px',
            cursor: 'pointer',
          }}
        >
          ✕ {t(lang, 'sommaireFermerCourt')}
        </button>

        {/* Titre du sommaire, filet double dessous comme dans les vieux magazines */}
        <span style={{ ...etiquette, display: 'block', fontWeight: 600, fontSize: 12, paddingRight: 96 }}>{t(lang, 'mastheadBrand')}</span>
        <h2
          style={{
            fontFamily: 'var(--font-pulp)',
            fontWeight: 400,
            fontSize: isNarrow ? 48 : 76,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: 'var(--masthead-lettre)',
            WebkitTextStroke: '.09em var(--masthead-encre)',
            paintOrder: 'stroke fill',
            textShadow: '.05em .05em 0 var(--masthead-ombre)',
            margin: '6px 0 14px',
          }}
        >
          {t(lang, 'sommaireTitre')}
        </h2>
        <div style={{ borderTop: '4px solid var(--masthead-encre)', borderBottom: '1px solid var(--masthead-encre)', height: 7, marginBottom: 8 }} />

        <ol style={{ listStyle: 'none' }}>
          {entrees(lang).map((e) => {
            const actif = estActif(pathname, e.match)
            return (
              <li key={e.to} style={{ borderBottom: '1px dashed var(--masthead-encre)' }}>
                <Link
                  to={e.to}
                  onClick={onFermer}
                  aria-current={actif ? 'page' : undefined}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `${isNarrow ? 52 : 80}px minmax(0, 1fr)`,
                    gap: isNarrow ? 12 : 20,
                    alignItems: 'baseline',
                    padding: isNarrow ? '10px 0' : '12px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: actif ? 'var(--masthead-fond-ombre)' : 'transparent',
                  }}
                >
                  {/* Numéro de page, gros chiffre de couverture */}
                  <span
                    style={{
                      fontFamily: 'var(--font-affiche)',
                      fontSize: isNarrow ? 34 : 52,
                      lineHeight: 1,
                      color: e.couleur,
                      WebkitTextStroke: '2px var(--masthead-encre)',
                      paintOrder: 'stroke fill',
                      textAlign: 'right',
                    }}
                  >
                    {String(e.page).padStart(2, '0')}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: e.police,
                        fontSize: isNarrow ? 22 : 30,
                        lineHeight: 1.1,
                        color: e.couleur,
                        WebkitTextStroke: '3px var(--masthead-lettre)',
                        paintOrder: 'stroke fill',
                      }}
                    >
                      {e.titre}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        marginTop: 4,
                        fontFamily: 'var(--font-chapo)',
                        fontStyle: 'italic',
                        fontSize: isNarrow ? 14 : 16,
                        lineHeight: 1.35,
                      }}
                    >
                      {e.chapo}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
