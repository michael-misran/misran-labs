import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { FEEDS, BANDEAU_TEXT } from './suivreText'

// Bandeau discret posé juste au-dessus du footer des pages de rubrique :
// invite à suivre la rubrique (page /suivre) ou à s'abonner à son flux RSS.
// Même style de coupon que le bulletin d'abonnement (D3 de la mission
// kiosque-annexes) : cadre en pointillés et étiquette ✂ dans le même esprit,
// en plus discret.
export default function SuivreBandeau({ rubrique }) {
  const { lang } = useLanguage()
  const t = BANDEAU_TEXT[lang] ?? BANDEAU_TEXT.fr
  const feed = FEEDS.find((f) => f.key === rubrique)

  const linkStyle = {
    fontFamily: 'var(--font-etiquette)',
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }

  return (
    <aside
      style={{
        marginTop: 40,
        border: 'var(--border-thin) dashed var(--border)',
        borderRadius: 'var(--radius-xs)',
        padding: 'var(--space-md)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-sm)',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p style={{ margin: 0, fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 15, color: 'var(--text)' }}>
        <span aria-hidden="true" style={{ marginRight: 'var(--space-xs)' }}>✂</span>
        {t.phrase[rubrique]}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
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
