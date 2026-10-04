import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { UneNumero, ArticleRevue } from './RevueParts'
import { MAG_TEXT, formatDateShort } from './magazineText'
import { getIssue, getIssues } from './numeros'
import Fiole from '../shell/mascotte/Fiole'
import SuivreBandeau from '../suivre/SuivreBandeau'

function NotFound({ date, lang }) {
  const isMobile = useIsMobile()
  const t = MAG_TEXT[lang].issue

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <header
        style={{
          background: 'var(--titre-magazine)',
          color: 'var(--on-primary-surface)',
          border: '3px solid var(--border)',
          boxShadow: '8px 8px 0 var(--primitive-encre-a18)',
          padding: isMobile ? 'var(--space-md-plus)' : '22px 28px 30px',
          marginBottom: 'var(--space-xl)',
        }}
      >
        <Link to="/magazine" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, fontSize: 12, color: 'inherit', textDecoration: 'none' }}>
          {t.backLabel}
        </Link>
        <h1
          style={{
            fontFamily: 'var(--primitive-font-playfair-display)',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(28px, 6vw, 48px)',
            margin: '18px 0 0',
          }}
        >
          {t.notFoundTitle}
        </h1>
      </header>

      <div style={{ border: '3px solid var(--border)', padding: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', overflowWrap: 'anywhere' }}>
          {t.notFoundLabel} : {date}
        </div>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <Fiole scale={4} variant="toxique" sleeps={false} />
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--text2)', margin: '0 0 var(--space-md-plus)' }}>
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
  const issue = getIssue(date)

  if (!issue) return <NotFound date={date} lang={lang} />

  const issues = getIssues()
  const idx = issues.findIndex((i) => i.date === issue.date)
  const previousIssue = issues[idx + 1]
  const nextIssue = issues[idx - 1]

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 960, margin: '0 auto' }}>
      <style>{`
        .mag-dropcap p:first-child::first-letter {
          float: left;
          font-family: var(--primitive-font-playfair-display);
          font-style: italic;
          font-weight: 900;
          font-size: 54px;
          line-height: 0.8;
          color: var(--titre-magazine);
          margin: 2px 8px 0 0;
        }
      `}</style>

      <UneNumero issue={issue} lang={lang} backLabel={t.backLabel} />

      <h2
        style={{
          fontFamily: 'var(--font-etiquette)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--titre-magazine)',
          margin: '0 0 var(--space-xs-plus)',
        }}
      >
        {t.editoTitle}
      </h2>
      <div
        className="mag-dropcap"
        style={{
          columnCount: isMobile ? 1 : 2,
          columnGap: 28,
          marginBottom: 'var(--space-xl)',
        }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.65, color: 'var(--prose)', margin: 0 }}>
          {issue.edito[lang] ?? issue.edito.fr}
        </p>
        <div style={{ marginTop: 'var(--space-xs-plus)', fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {t.editoSignature}
        </div>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-etiquette)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--titre-magazine)',
          margin: '0 0 var(--space-xs-plus)',
        }}
      >
        {t.contentsTitle}
      </h2>
      <ol style={{ listStyle: 'none', margin: '0 0 var(--space-xl)', padding: 0, borderTop: '3px double var(--border)' }}>
        {issue.articles.map((article, i) => (
          <li key={i} style={{ borderBottom: '1px dotted var(--muted)' }}>
            <a
              href={`#article-${i}`}
              style={{ display: 'flex', gap: 10, padding: '8px 0', fontFamily: "var(--font-body)", fontSize: 14.5, color: 'var(--text)', textDecoration: 'none' }}
            >
              <b style={{ color: 'var(--titre-magazine)', fontFamily: 'var(--font-etiquette)' }}>{String(i + 1).padStart(2, '0')}</b>
              {article.titre[lang] ?? article.titre.fr}
            </a>
          </li>
        ))}
      </ol>

      <div style={{ marginBottom: 'var(--space-xl)' }}>
        {issue.articles.map((article, i) => (
          <ArticleRevue key={i} article={article} index={i} lang={lang} t={t} anchorId={`article-${i}`} />
        ))}
      </div>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          borderTop: '3px double var(--border)',
          paddingTop: 'var(--space-md)',
          marginBottom: 40,
        }}
      >
        <span>
          {previousIssue ? (
            <Link to={`/magazine/${previousIssue.date}`} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
              {t.previousLabel} ({formatDateShort(previousIssue.date)})
            </Link>
          ) : null}
        </span>
        <Link to="/magazine" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {t.backToList}
        </Link>
        <span>
          {nextIssue ? (
            <Link to={`/magazine/${nextIssue.date}`} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
              {t.nextLabel} ({formatDateShort(nextIssue.date)})
            </Link>
          ) : null}
        </span>
      </nav>

      <SuivreBandeau rubrique="magazine" />
    </div>
  )
}
