import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import { MagazineMasthead } from '../magazine/MagazineParts'
import { BreveCard, WordFigureBox } from './BrevesParts'
import { BREVES_TEXT, formatDateShort, formatDateLong } from './brevesText'
import { getDay, getAdjacentDays } from './jours'
import Fiole from '../shell/mascotte/Fiole'

function NotFound({ date, lang }) {
  const isMobile = useIsMobile()
  const t = BREVES_TEXT[lang].day

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/breves"
        backLabel={t.backLabel}
        fileNo={t.notFoundFileNo}
        center={t.mastheadCenter}
        right={t.right}
        rightSub={t.notFoundRight}
      />

      <div style={{ border: 'var(--border-regular) solid var(--border)', padding: isMobile ? 20 : 32 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', overflowWrap: 'anywhere' }}>
          {t.notFoundLabel} : {date}
        </div>
        <div style={{ marginBottom: 8 }}>
          <Fiole scale={4} variant="toxique" sleeps={false} />
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', margin: '10px 0 8px' }}>
          {t.notFoundTitle}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--text2)', margin: '0 0 20px' }}>
          {t.notFoundBody}
        </p>
        <Link to="/breves" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', textDecoration: 'none' }}>
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
  const chrome = CASE_CHROME[lang]
  const day = getDay(date)

  if (!day) return <NotFound date={date} lang={lang} />

  const { previous, next } = getAdjacentDays(date)

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/breves"
        backLabel={t.backLabel}
        fileNo="BRÈVES"
        center={t.mastheadCenter}
        right={t.right}
        rightSub={formatDateShort(day.date)}
      />

      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(22px, 3.2vw, 30px)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--text)' }}>
        {formatDateLong(day.date, lang)}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {day.breves.map((breve, i) => (
          <BreveCard key={i} breve={breve} lang={lang} />
        ))}
      </div>

      <div style={{ marginBottom: 40 }}>
        <WordFigureBox mot={day.mot} chiffre={day.chiffre} lang={lang} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
        {previous ? (
          <Link to={`/breves/${previous.date}`} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
            {t.previousDay}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/breves/${next.date}`} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
            {t.nextDay}
          </Link>
        ) : <span />}
      </div>

      <Link to="/breves" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {t.backToList}
      </Link>

      <CaseFooter c={{ docId: `${t.docId}-${day.date}`, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
