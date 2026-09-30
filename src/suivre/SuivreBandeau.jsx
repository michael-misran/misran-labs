import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { FEEDS, BANDEAU_TEXT } from './suivreText'

// Bandeau discret posé juste au-dessus du CaseFooter des pages de rubrique :
// invite à suivre la rubrique (page /suivre) ou à s'abonner à son flux RSS.
export default function SuivreBandeau({ rubrique }) {
  const { lang } = useLanguage()
  const t = BANDEAU_TEXT[lang] ?? BANDEAU_TEXT.fr
  const feed = FEEDS.find((f) => f.key === rubrique)

  const linkStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }

  return (
    <aside
      style={{
        marginTop: 40,
        border: 'var(--border-thin) dashed var(--border)',
        padding: 'var(--space-md)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>
        <span aria-hidden="true" style={{ color: 'var(--primary)', marginRight: 8 }}>◉</span>
        {t.phrase[rubrique]}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Link to="/suivre" style={{ ...linkStyle, color: 'var(--primary)' }}>{t.suivre}</Link>
        {feed && (
          <>
            <span aria-hidden="true" style={{ ...linkStyle, color: 'var(--muted)' }}>·</span>
            <a href={feed.url} style={{ ...linkStyle, color: 'var(--muted)' }}>{t.rss}</a>
          </>
        )}
      </div>
    </aside>
  )
}
