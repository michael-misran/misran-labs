import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { GazetteTete, GazetteEdition } from './GazetteParts'
import { BREVES_TEXT, formatDateLong } from './brevesText'
import { getDays } from './jours'

export default function BrevesHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = BREVES_TEXT[lang].home
  const days = getDays()
  const today = days[0]
  const previousDays = days.slice(1)

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <GazetteTete date={today?.date} count={today?.breves.length} lang={lang} />

      {!today ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted)', textAlign: 'center' }}>{t.empty}</p>
      ) : (
        <>
          <GazetteEdition day={today} lang={lang} />

          <div style={{ border: '3px double var(--border)', padding: isMobile ? '18px 16px' : '20px 28px', margin: '36px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.subscribeTitle}</div>
              <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 13, color: 'var(--text2)', margin: '4px 0 0' }}>{t.subscribeBody}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <a href="/breves/rss.xml" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, fontSize: 13, color: 'var(--titre-gazette)', textDecoration: 'none', borderBottom: '2px solid var(--titre-gazette)', paddingBottom: 2 }}>
                {t.rssLabel}
              </a>
              <Link to="/suivre" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, fontSize: 13, color: 'var(--text)', textDecoration: 'none', borderBottom: '2px solid var(--border)', paddingBottom: 2 }}>
                {t.suivreLabel}
              </Link>
            </div>
          </div>

          {previousDays.length > 0 && (
            <>
              <h2
                style={{
                  fontFamily: 'var(--font-etiquette)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--text)',
                  borderBottom: '3px double var(--border)',
                  paddingBottom: 8,
                  margin: '0 0 var(--space-md-plus)',
                }}
              >
                {t.previousDaysTitle}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {previousDays.map((day) => {
                  const titles = day.breves.map((b) => b.titre[lang] ?? b.titre.fr).join(' · ')
                  return (
                    <Link
                      key={day.date}
                      to={`/breves/${day.date}`}
                      style={{ display: 'flex', alignItems: 'baseline', gap: 8, textDecoration: 'none', color: 'inherit', padding: '10px 0', borderBottom: '1px solid var(--border)' }}
                    >
                      <span style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                        {formatDateLong(day.date, lang)}
                      </span>
                      <span aria-hidden="true" style={{ flex: 1, borderBottom: '2px dotted var(--muted)', transform: 'translateY(-4px)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', textAlign: 'right', overflowWrap: 'anywhere' }}>
                        {titles}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
