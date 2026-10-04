import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { TeteRevue, CouvertureNumero } from './RevueParts'
import { MAG_TEXT } from './magazineText'
import { getIssues } from './numeros'

export default function MagazineHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = MAG_TEXT[lang].home
  const issues = getIssues()
  const [vedette, ...precedents] = issues

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <style>{`
        .mag-dropcap::first-letter {
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

      <TeteRevue title={t.title} subtitle={t.subtitle} />

      {issues.length === 0 ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--muted)' }}>{t.empty}</p>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '360px 1fr',
              gap: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)',
              alignItems: 'start',
              marginBottom: 'var(--space-xl)',
            }}
          >
            <CouvertureNumero issue={vedette} lang={lang} variante="vedette" />

            <div>
              <div style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, fontSize: 12, color: 'var(--titre-magazine)', marginBottom: 8 }}>
                {t.latestTag}
              </div>
              <p className="mag-dropcap" style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.65, color: 'var(--prose)', margin: '0 0 14px' }}>
                {vedette.edito[lang] ?? vedette.edito.fr}
              </p>
              <Link
                to={`/magazine/${vedette.date}`}
                style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: 14, color: 'var(--titre-magazine)', textDecoration: 'none', borderBottom: '2px solid var(--titre-magazine)', paddingBottom: 2 }}
              >
                {t.lireLabel}
              </Link>
            </div>
          </div>

          {precedents.length > 0 && (
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
                {t.issuesTitle}
              </h2>
              <div
                style={{
                  display: 'grid',
                  // auto-fill : un numéro seul garde la largeur d'une colonne au lieu de s'étirer
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 'var(--space-md-plus)',
                  marginBottom: 'var(--space-xl)',
                }}
              >
                {precedents.map((issue) => (
                  <Link key={issue.date} to={`/magazine/${issue.date}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CouvertureNumero issue={issue} lang={lang} variante="grille" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Encadré d'abonnement, même composition que celui de la Gazette, en bleu revue */}
      <div style={{ border: '3px double var(--titre-magazine)', padding: isMobile ? '18px 16px' : '20px 28px', margin: '0 0 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: 14, color: 'var(--titre-magazine)' }}>{t.subscribeTitle}</div>
          <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 13, color: 'var(--text2)', margin: '4px 0 0' }}>{t.subscribeBody}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          {/* Fichier statique généré au build : lien classique, pas une route SPA */}
          <a href="/magazine/rss.xml" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, fontSize: 13, color: 'var(--titre-magazine)', textDecoration: 'none', borderBottom: '2px solid var(--titre-magazine)', paddingBottom: 2 }}>
            {t.rssLabel}
          </a>
          <Link to="/suivre" style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, fontSize: 13, color: 'var(--text)', textDecoration: 'none', borderBottom: '2px solid var(--border)', paddingBottom: 2 }}>
            {t.suivreLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
