import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Stamp } from '../design-system/ArchiveMarks'
import Tag from '../design-system/Tag'
import useIsMobile from '../shell/useIsMobile'
import { MAG_TEXT, categoryLabel, categoryColor, issueNo, formatDateShort } from './magazineText'

// Même bandeau que CaseMasthead (src/lab/CaseFile.jsx), mais le lien retour
// est paramétrable : CaseMasthead pointe toujours vers "/", ce qui ne
// convient pas à la page d'un numéro (retour vers /magazine).
export function MagazineMasthead({ backTo, backLabel, fileNo, center, right, rightSub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 24, flexWrap: 'wrap' }}>
      <div>
        <Link to={backTo} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {backLabel}
        </Link>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 4 }}>{fileNo}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {center}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{right}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{rightSub}</div>
      </div>
    </div>
  )
}

// Même bloc que CaseHero, mais le numéro est fourni directement (CaseHero le
// tire de dossierNo(), figé sur la position d'un projet dans le Lab).
export function MagazineHero({ number, title, subtitle, children }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: isMobile ? '16px 16px' : '18px 24px', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1,
              color: 'var(--primary)',
            }}
          >
            {number}
          </span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)', overflowWrap: 'anywhere' }}>
              {title}
            </h1>
            {subtitle && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.04em', color: 'var(--text2)' }}>{subtitle}</div>
            )}
          </div>
        </div>
        <Stamp label="MISRAN · LABS · MAGAZINE ·" size={isMobile ? 52 : 72} />
      </div>

      {children}
    </div>
  )
}

// Marque de catégorie : un carré de couleur (repère de tri) + un libellé
// texte qui porte l'information à lui seul (lisible sans la couleur).
export function CategoryMark({ categorie, lang }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--text2)', textTransform: 'uppercase', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '2px 8px', background: 'var(--bg)' }}>
      <span aria-hidden="true" style={{ width: 8, height: 8, flexShrink: 0, background: categoryColor(categorie), border: 'var(--border-thin) solid var(--border)' }} />
      {categoryLabel(categorie, lang)}
    </span>
  )
}

function articleCountLabel(count, lang) {
  const t = MAG_TEXT[lang].home
  return `${count} ${count === 1 ? t.articleCountOne : t.articleCountMany}`
}

// Une ligne du registre des numéros sur /magazine — un registre d'archive
// se lit en lignes, pas en fiches (les fiches sont réservées aux articles).
export function IssueRow({ issue, lang, latest }) {
  const isMobile = useIsMobile()
  const t = MAG_TEXT[lang].home
  const [hover, setHover] = useState(false)

  return (
    <Link
      to={`/magazine/${issue.date}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr auto' : '88px 1fr auto',
        alignItems: 'center',
        columnGap: 20,
        rowGap: 6,
        textDecoration: 'none',
        color: 'inherit',
        borderTop: 'var(--border-thin) solid var(--border)',
        padding: isMobile ? '14px 8px' : '16px 12px',
        background: hover ? 'var(--hover-tint)' : 'none',
        transition: 'background 0.15s ease',
      }}
    >
      {isMobile ? (
        <>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--text2)', marginBottom: 4 }}>
              Nº {issueNo(issue.numero)} · {formatDateShort(issue.date)}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: 'var(--text)', overflowWrap: 'anywhere' }}>
              {issue.titre[lang]}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 6 }}>
              {latest && <Tag>{t.latestTag}</Tag>}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {articleCountLabel(issue.articles.length, lang)}
              </span>
            </div>
          </div>
          <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: 'var(--primary)' }}>→</span>
        </>
      ) : (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1, color: 'var(--primary)', whiteSpace: 'nowrap' }}>
            Nº {issueNo(issue.numero)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: 'var(--text)', overflowWrap: 'anywhere' }}>
              {issue.titre[lang]}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', letterSpacing: '0.08em', marginTop: 4 }}>
              {formatDateShort(issue.date)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {latest && <Tag>{t.latestTag}</Tag>}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {articleCountLabel(issue.articles.length, lang)}
            </span>
            <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: 'var(--primary)' }}>→</span>
          </div>
        </>
      )}
    </Link>
  )
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function SourceList({ sources, lang }) {
  const t = MAG_TEXT[lang].issue
  return (
    <div style={{ borderTop: 'var(--border-thin) solid var(--border)', paddingTop: 12 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 6 }}>
        {t.sourcesLabel}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sources.map((source, i) => {
          const hostname = hostnameOf(source.url)
          return (
            <li key={i}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: 3, overflowWrap: 'anywhere' }}>
                {source.titre} <span aria-hidden="true" style={{ color: 'var(--primary)' }}>↗</span>
              </a>
              {hostname && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', marginLeft: 8 }}>{hostname}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Une fiche article — dérivée de la carte StakeholderCard (WorkflowSolo.jsx).
export function ArticleCard({ article, index, total, lang }) {
  const isMobile = useIsMobile()
  const t = MAG_TEXT[lang].issue

  return (
    <article style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', padding: isMobile ? 20 : 28, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <CategoryMark categorie={article.categorie} lang={lang} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {t.articlesLabel} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: isMobile ? 19 : 22, lineHeight: 1.2, color: 'var(--text)', margin: 0, overflowWrap: 'anywhere' }}>
        {article.titre[lang]}
      </h2>

      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', margin: 0 }}>
        {article.resume[lang]}
      </p>

      <div style={{ background: 'var(--active-tint)', borderRadius: 'var(--radius-md)', padding: isMobile ? '12px 14px' : '14px 16px' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 4 }}>
          {t.whyItMatters}
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>
          {article.pourquoi[lang]}
        </div>
      </div>

      <SourceList sources={article.sources} lang={lang} />
    </article>
  )
}
