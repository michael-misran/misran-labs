import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseMasthead, CaseMetaRow, CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { MagazineHero } from '../magazine/MagazineParts'
import Tag from '../design-system/Tag'
import { BreveCard, WordFigureBox, DayRow } from './BrevesParts'
import { BREVES_TEXT, RUBRIQUES, formatDateLong } from './brevesText'
import { getDays } from './jours'

export default function BrevesHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = BREVES_TEXT[lang].home
  const chrome = CASE_CHROME[lang]
  const days = getDays()
  const today = days[0]
  const previousDays = days.slice(1)

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead
        c={{ fileNo: t.fileNo, mastheadCenter: t.mastheadCenter, mastheadRight: t.mastheadRight, mastheadRightSub: t.mastheadRightSub }}
        lang={lang}
      />

      <MagazineHero number="✎" title={t.title} subtitle={t.subtitle}>
        <CaseMetaRow
          columns={[
            { label: t.publishedLabel, value: t.publishedValue },
            { label: t.editorialLabel, value: t.editorialValue },
            { label: t.sectionsLabel, chips: Object.values(RUBRIQUES).map(r => r[lang]) },
          ]}
        />
      </MagazineHero>

      <p style={{ maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', margin: '0 0 40px' }}>
        {t.concept}
      </p>

      {!today ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--muted)' }}>{t.empty}</p>
      ) : (
        <>
          <SectionTitle>{t.todayTitle}</SectionTitle>
          <div style={{ marginBottom: 16 }}>
            <Tag>{formatDateLong(today.date, lang).toUpperCase()}</Tag>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {today.breves.map((breve, i) => (
              <BreveCard key={i} breve={breve} lang={lang} />
            ))}
          </div>

          <div style={{ marginBottom: 40 }}>
            <WordFigureBox mot={today.mot} chiffre={today.chiffre} lang={lang} />
          </div>

          {previousDays.length > 0 && (
            <>
              <SectionTitle>{t.previousDaysTitle}</SectionTitle>
              <div style={{ borderBottom: 'var(--border-thin) solid var(--border)', marginBottom: 40 }}>
                {previousDays.map((day) => (
                  <DayRow key={day.date} day={day} lang={lang} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
