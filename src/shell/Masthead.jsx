import { Link } from 'react-router-dom'
import LogoFiole from './LogoFiole'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { formatDateLong } from '../magazine/magazineText'
import useIsMobile from './useIsMobile'

function todayIso() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

export default function Masthead() {
  const { lang, toggle: toggleLang } = useLanguage()
  const isMobile = useIsMobile()
  // En dessous de 600 px (D8), l'en-tête se resserre encore : badge plus
  // petit, nom sur une seule ligne, accroche masquée — pour que le header
  // de la maison tienne en moins de 200 px à 375 px de large.
  const isNarrow = useIsMobile(600)
  const today = formatDateLong(todayIso(), lang)

  return (
    <div className="no-print" style={{ background: 'var(--bg)' }}>
      <div
        style={{
          borderBottom: 'var(--border-thin) solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: isNarrow ? '6px 16px 5px' : '8px 20px 7px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '4px 16px',
            ...etiquette,
            fontWeight: 600,
            fontSize: 12,
            color: 'var(--text)',
          }}
        >
          <span>{t(lang, 'mastheadBrand')}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {!isMobile && <span style={{ color: 'var(--text2)' }}>{today}</span>}
            <Link to="/projets" style={{ color: 'inherit' }}>{t(lang, 'mastheadIdees')}</Link>
            <Link to="/suivre" style={{ color: 'inherit' }}>{t(lang, 'mastheadAbonner')}</Link>
            <Link to="/lab/cv" style={{ color: 'inherit' }}>{t(lang, 'mastheadCV')}</Link>
            <button
              onClick={toggleLang}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: 0,
                ...etiquette,
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </div>

      <header>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: isNarrow ? '14px 16px 12px' : '22px 20px 18px',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto 1fr' : 'auto 1fr auto',
            gap: isMobile ? 16 : 28,
            alignItems: 'center',
          }}
        >
          {/* Logo de la maison : la Fiole seule (le nom est juste à côté) */}
          <span style={{ color: 'var(--text)' }}>
            <LogoFiole largeur={isNarrow ? 38 : isMobile ? 54 : 80} />
          </span>

          <div>
            <h1
              style={{
                fontFamily: 'var(--font-logo)',
                fontWeight: 400,
                fontSize: isNarrow ? 'clamp(20px, 7.4vw, 30px)' : 'clamp(40px, 6.4vw, 86px)',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '0',
                transform: 'skewX(-8deg)',
                transformOrigin: 'left bottom',
                color: 'var(--text)',
                whiteSpace: isNarrow ? 'nowrap' : 'normal',
              }}
            >
              Misran Labs
            </h1>
            {!isNarrow && (
              <p
                style={{
                  fontFamily: 'var(--font-chapo)',
                  fontStyle: 'italic',
                  fontSize: isMobile ? 17 : 21,
                  marginTop: 8,
                  color: 'var(--text)',
                }}
              >
                {t(lang, 'mastheadTagline')}
              </p>
            )}
          </div>

          {!isMobile && (
            <div
              style={{
                border: '3px double var(--border)',
                padding: '10px 14px',
                textAlign: 'center',
                transform: 'rotate(3deg)',
                background: 'var(--bg2)',
              }}
            >
              <span style={{ ...etiquette, fontWeight: 700, fontSize: 11 }}>{t(lang, 'mastheadOuvertLabel')}</span>
              <b style={{ fontFamily: 'var(--font-bois-3)', fontWeight: 400, fontSize: 26, display: 'block', lineHeight: 1, margin: '4px 0' }}>
                {t(lang, 'mastheadOuvertHeure')}
              </b>
              <span style={{ ...etiquette, fontWeight: 700, fontSize: 11 }}>{t(lang, 'mastheadOuvertTous')}</span>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}
