import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseMasthead, CaseMetaRow, CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { MagazineHero, IssueRow } from './MagazineParts'
import { MAG_TEXT, CATEGORIES } from './magazineText'
import { getIssues } from './numeros'

export default function MagazineHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = MAG_TEXT[lang].home
  const chrome = CASE_CHROME[lang]
  const issues = getIssues()

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
            { label: t.sectionsLabel, chips: Object.values(CATEGORIES).map(c => c[lang]) },
          ]}
        />
      </MagazineHero>

      <p style={{ maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', margin: '0 0 40px' }}>
        {t.concept}
      </p>

      <SectionTitle>{t.issuesTitle}</SectionTitle>

      {issues.length === 0 ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--muted)' }}>{t.empty}</p>
      ) : (
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: 'var(--border-thin) solid var(--border)' }}>
          {issues.map((issue, i) => (
            <li key={issue.date}>
              <IssueRow issue={issue} lang={lang} latest={i === 0} />
            </li>
          ))}
        </ol>
      )}

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
