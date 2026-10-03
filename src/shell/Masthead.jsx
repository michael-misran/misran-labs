import { Link } from 'react-router-dom'
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
            padding: '8px 20px 7px',
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
            padding: '22px 20px 18px',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto 1fr' : 'auto 1fr auto',
            gap: isMobile ? 16 : 28,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: isMobile ? 62 : 92,
              height: isMobile ? 70 : 104,
              background: 'var(--text)',
              color: 'var(--bg)',
              borderRadius: '50% 50% 46% 46%',
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            <div>
              <b style={{ fontFamily: 'var(--font-bois-2)', fontWeight: 400, fontSize: isMobile ? 22 : 34, display: 'block' }}>
                {t(lang, 'mastheadLabel')}
              </b>
              <span style={{ ...etiquette, fontWeight: 700, fontSize: 10 }}>{t(lang, 'mastheadLabelSub')}</span>
            </div>
          </div>

          <div>
            <h1
              style={{
                fontFamily: 'var(--font-bois)',
                fontWeight: 400,
                fontSize: 'clamp(52px, 8vw, 104px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'var(--text)',
              }}
            >
              Misran Labs
            </h1>
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
