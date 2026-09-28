import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseMetaRow, CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { MagazineMasthead, MagazineHero, ArticleCard } from './MagazineParts'
import { MAG_TEXT, categoryLabel, issueNo, formatDateShort, formatDateLong } from './magazineText'
import { getIssue } from './numeros'

function NotFound({ date, lang }) {
  const isMobile = useIsMobile()
  const t = MAG_TEXT[lang].issue

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/magazine"
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
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', margin: '10px 0 8px' }}>
          {t.notFoundTitle}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--text2)', margin: '0 0 20px' }}>
          {t.notFoundBody}
        </p>
        <Link to="/magazine" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', textDecoration: 'none' }}>
          {t.backToList}
        </Link>
      </div>
    </div>
  )
}

export default function MagazineIssue() {
  const { date } = useParams()
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = MAG_TEXT[lang].issue
  const chrome = CASE_CHROME[lang]
  const issue = getIssue(date)

  if (!issue) return <NotFound date={date} lang={lang} />

  const categories = [...new Set(issue.articles.map(a => a.categorie))]

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/magazine"
        backLabel={t.backLabel}
        fileNo={`MAGAZINE Nº ${issueNo(issue.numero)}`}
        center={t.mastheadCenter}
        right={t.right}
        rightSub={formatDateShort(issue.date)}
      />

      <MagazineHero
        number={issueNo(issue.numero)}
        title={issue.titre[lang]}
        subtitle={formatDateLong(issue.date, lang).toUpperCase()}
      >
        <CaseMetaRow
          columns={[
            { label: t.articlesLabel, value: issue.articles.length },
            { label: t.sectionsLabel, chips: categories.map(c => categoryLabel(c, lang)) },
            { label: t.editorialLabel, value: t.editorialValue },
          ]}
        />
      </MagazineHero>

      <SectionTitle>{t.editoTitle}</SectionTitle>
      <div style={{ maxWidth: 720, marginBottom: 40, borderLeft: 'var(--border-thick) solid var(--primary)', paddingLeft: isMobile ? 14 : 20 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: isMobile ? 17 : 19, lineHeight: 1.5, color: 'var(--text)', margin: 0 }}>
          {issue.edito[lang]}
        </p>
        <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {t.editoSignature}
        </div>
      </div>

      <SectionTitle>{t.articlesTitle}</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
        {issue.articles.map((article, i) => (
          <ArticleCard key={i} article={article} index={i} total={issue.articles.length} lang={lang} />
        ))}
      </div>

      <Link to="/magazine" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {t.backToList}
      </Link>

      <CaseFooter c={{ docId: `${t.docId}-${issueNo(issue.numero)}`, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
