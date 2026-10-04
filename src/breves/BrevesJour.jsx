import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { GazetteTete, GazetteEdition } from './GazetteParts'
import { BREVES_TEXT } from './brevesText'
import { getDay, getAdjacentDays } from './jours'
import Fiole from '../shell/mascotte/Fiole'

function NotFound({ date, lang }) {
  const isMobile = useIsMobile()
  const t = BREVES_TEXT[lang].day

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <GazetteTete lang={lang} />

      <div style={{ border: '3px solid var(--border)', padding: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', overflowWrap: 'anywhere' }}>
          {t.notFoundLabel} : {date}
        </div>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <Fiole scale={4} variant="toxique" sleeps={false} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-bois)', fontWeight: 400, textTransform: 'uppercase', fontSize: 'clamp(24px, 3.4vw, 34px)', margin: 'var(--space-xs-plus) 0 var(--space-xs)', color: 'var(--text)' }}>
          {t.notFoundTitle}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', margin: '0 0 var(--space-md-plus)' }}>
          {t.notFoundBody}
        </p>
        <Link to="/breves" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 12, fontWeight: 700, color: 'var(--titre-gazette)', textDecoration: 'none' }}>
          {t.backToList}
        </Link>
      </div>
    </div>
  )
}

export default function BrevesJour() {
  const { date } = useParams()
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = BREVES_TEXT[lang].day
  const day = getDay(date)

  if (!day) return <NotFound date={date} lang={lang} />

  const { previous, next } = getAdjacentDays(date)

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <GazetteTete date={day.date} count={day.breves.length} lang={lang} />

      <GazetteEdition day={day} lang={lang} />

      <nav
        style={{
          // Trois colonnes égales : « Toutes les éditions » reste centré même
          // quand l'édition précédente ou suivante n'existe pas
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'baseline',
          gap: 16,
          borderTop: '3px double var(--border)',
          paddingTop: 'var(--space-md)',
          marginTop: 28,
          marginBottom: 40,
        }}
      >
        <span>
          {previous ? (
            <Link to={`/breves/${previous.date}`} style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 12, fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>
              {t.previousDay}
            </Link>
          ) : null}
        </span>
        <Link to="/breves" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 12, fontWeight: 700, color: 'var(--titre-gazette)', textDecoration: 'none' }}>
          {t.backToList}
        </Link>
        <span style={{ textAlign: 'right' }}>
          {next ? (
            <Link to={`/breves/${next.date}`} style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 12, fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>
              {t.nextDay}
            </Link>
          ) : null}
        </span>
      </nav>
    </div>
  )
}
