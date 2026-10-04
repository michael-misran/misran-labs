// Composants du Magazine « revue bleue » (refonte kiosque), pour
// /magazine et /magazine/:date uniquement — les autres sections qui
// affichaient l'ancien style d'archive gardent leurs propres composants.
import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { categoryColor, categoryLabel, formatDateLong, formatDateShort } from './magazineText'

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
}

const couvertureChrome = {
  border: '3px solid var(--border)',
  background: 'var(--bg2)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}

// Tête de revue (D2) : grand bandeau bleu, titre Playfair italique 900.
export function TeteRevue({ title, subtitle }) {
  return (
    <header
      style={{
        background: 'var(--titre-magazine)',
        color: 'var(--on-primary-surface)',
        border: '3px solid var(--border)',
        boxShadow: '8px 8px 0 var(--primitive-encre-a18)',
        padding: '34px 28px 28px',
        textAlign: 'center',
        marginBottom: 'var(--space-xl)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--primitive-font-playfair-display)',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 'clamp(40px, 8vw, 76px)',
          lineHeight: 1,
          margin: 0,
        }}
      >
        {title}
      </h1>
      <p style={{ ...etiquette, fontWeight: 700, fontSize: 13, margin: '10px 0 0' }}>{subtitle}</p>
    </header>
  )
}

// Couverture de numéro réutilisable (D2) : bandeau, numéro, date, titre,
// et — en "vedette" — les 4 premiers articles numérotés. Inspirée de la
// couverture du kiosque (KiosqueParts.CouvertureMagazine) sans la réutiliser.
export function CouvertureNumero({ issue, lang, variante = 'vedette' }) {
  const vedette = variante === 'vedette'
  const articles = issue.articles.slice(0, 4)

  return (
    <div style={{ ...couvertureChrome, boxShadow: vedette ? '8px 8px 0 var(--primitive-encre-a18)' : '5px 5px 0 var(--primitive-encre-a18)' }}>
      <div
        style={{
          background: 'var(--titre-magazine)',
          color: 'var(--on-primary-surface)',
          padding: vedette ? '14px 20px 12px' : '8px 12px 7px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 10,
        }}
      >
        {vedette && (
          <b style={{ fontFamily: 'var(--primitive-font-playfair-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 22, lineHeight: 1 }}>
            MAGAZINE
          </b>
        )}
        <span style={{ ...etiquette, fontWeight: 700, fontSize: vedette ? 12 : 10, textAlign: 'right', marginLeft: 'auto' }}>
          N° {issue.numero} · {formatDateShort(issue.date)}
        </span>
      </div>

      <div style={{ padding: vedette ? '22px 24px 16px' : '12px 12px 8px' }}>
        <h3
          style={{
            fontFamily: 'var(--primitive-font-playfair-display)',
            fontStyle: 'italic',
            fontWeight: 900,
            color: 'var(--text)',
            fontSize: vedette ? 'clamp(26px, 4vw, 40px)' : 'clamp(16px, 2.4vw, 19px)',
            lineHeight: 1.08,
            margin: 0,
          }}
        >
          {issue.titre[lang] ?? issue.titre.fr}
        </h3>
      </div>

      {vedette && (
        <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: '0 24px 20px', fontSize: 14.5, lineHeight: 1.3 }}>
          {articles.map((article, i) => (
            <li key={i} style={{ borderTop: '1px solid var(--muted)', padding: '7px 0', color: 'var(--text)' }}>
              <b style={{ color: 'var(--titre-magazine)', fontFamily: 'var(--font-etiquette)', marginRight: 6 }}>
                {String(i + 1).padStart(2, '0')}
              </b>
              {article.titre[lang] ?? article.titre.fr}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// En-tête d'un numéro (D3) : bandeau bleu plein cadre, retour, "N° x · date
// longue", titre en très grand — la "couverture" de la page /magazine/:date.
export function UneNumero({ issue, lang, backLabel }) {
  const isMobile = useIsMobile()

  return (
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <Link to="/magazine" style={{ ...etiquette, fontWeight: 700, fontSize: 12, color: 'inherit', textDecoration: 'none' }}>
          {backLabel}
        </Link>
        <span style={{ ...etiquette, fontWeight: 700, fontSize: 12 }}>
          N° {issue.numero} · {formatDateLong(issue.date, lang)}
        </span>
      </div>
      <h1
        style={{
          fontFamily: 'var(--primitive-font-playfair-display)',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 'clamp(32px, 7vw, 64px)',
          lineHeight: 1.02,
          margin: isMobile ? '18px 0 0' : '22px 0 0',
        }}
      >
        {issue.titre[lang] ?? issue.titre.fr}
      </h1>
    </header>
  )
}

// Un article (D3) : catégorie colorée, titre Playfair italique 900, résumé,
// encadré "pourquoi ça compte" sur fond bleu très clair, sources externes.
export function ArticleRevue({ article, index, lang, t, anchorId }) {
  return (
    <article
      id={anchorId}
      style={{
        scrollMarginTop: 90,
        paddingTop: index > 0 ? 'var(--space-lg)' : 0,
        marginTop: index > 0 ? 'var(--space-lg)' : 0,
        borderTop: index > 0 ? '3px solid var(--titre-magazine)' : 'none',
      }}
    >
      <div style={{ ...etiquette, fontWeight: 700, fontSize: 12, color: categoryColor(article.categorie) }}>
        {categoryLabel(article.categorie, lang)}
      </div>
      <h3
        style={{
          fontFamily: 'var(--primitive-font-playfair-display)',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 'clamp(22px, 3.2vw, 30px)',
          lineHeight: 1.1,
          margin: '6px 0 10px',
          color: 'var(--text)',
        }}
      >
        {article.titre[lang] ?? article.titre.fr}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.65, color: 'var(--prose)', margin: '0 0 14px' }}>
        {article.resume[lang] ?? article.resume.fr}
      </p>
      <div
        style={{
          background: 'color-mix(in srgb, var(--titre-magazine) 8%, var(--bg))',
          borderLeft: '4px solid var(--titre-magazine)',
          padding: '12px 16px',
          margin: '0 0 16px',
        }}
      >
        <b style={{ ...etiquette, fontWeight: 700, fontSize: 11, color: 'var(--titre-magazine)', display: 'block', marginBottom: 4 }}>
          {t.whyItMatters}
        </b>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text)' }}>
          {article.pourquoi[lang] ?? article.pourquoi.fr}
        </p>
      </div>
      <div style={{ ...etiquette, fontWeight: 700, fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>{t.sourcesLabel}</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {article.sources.map((source, i) => (
          <li key={i}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)' }}
            >
              {source.titre} ↗
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
