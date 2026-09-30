import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { BREVES_TEXT, rubriqueLabel, rubriqueColor, formatDateShort } from './brevesText'

// Pastille de rubrique — même principe que CategoryMark du Magazine
// (src/magazine/MagazineParts.jsx), mais sur la table RUBRIQUES (ia/tech)
// plutôt que CATEGORIES : les deux taxonomies ne se recouvrent pas.
export function RubriqueMark({ rubrique, lang }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--text2)', textTransform: 'uppercase', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '2px 8px', background: 'var(--bg)' }}>
      <span aria-hidden="true" style={{ width: 8, height: 8, flexShrink: 0, background: rubriqueColor(rubrique), border: 'var(--border-thin) solid var(--border)' }} />
      {rubriqueLabel(rubrique, lang)}
    </span>
  )
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

// Liens sources d'une brève — texte visible "Lire la source ↗" (D5),
// le nom du site en repère juste à côté. Nouvel onglet, jamais
// d'opener laissé à la page cible.
export function SourceLinks({ sources, lang }) {
  const t = BREVES_TEXT[lang].home
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {sources.map((source, i) => {
        const hostname = hostnameOf(source.url)
        return (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {t.sourceLink}
            </a>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)' }}>
              {source.titre}{hostname ? ` · ${hostname}` : ''}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// Une brève — carte courte, pas la fiche complète des articles du Magazine
// (pas de "pourquoi" pour une brève).
export function BreveCard({ breve, lang }) {
  const isMobile = useIsMobile()
  return (
    <article style={{ background: 'var(--bg2)', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xl)', padding: isMobile ? 16 : 22, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
      <RubriqueMark rubrique={breve.rubrique} lang={lang} />
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: isMobile ? 17 : 19, lineHeight: 1.25, color: 'var(--text)', margin: 0, overflowWrap: 'anywhere' }}
        dangerouslySetInnerHTML={{ __html: breve.titre[lang] }}
      />
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: 'var(--prose)', margin: 0 }}
        dangerouslySetInnerHTML={{ __html: breve.resume[lang] }}
      />
      <SourceLinks sources={breve.sources} lang={lang} />
    </article>
  )
}

// Encadré mot + chiffre du jour, partagé entre /breves et /breves/:date.
export function WordFigureBox({ mot, chiffre, lang }) {
  const t = BREVES_TEXT[lang].home
  const isMobile = useIsMobile()
  if (!mot && !chiffre) return null

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0, border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      {mot && (
        <div style={{ flex: 1, padding: isMobile ? '14px 16px' : '16px 20px', borderRight: !isMobile && chiffre ? 'var(--border-thin) solid var(--border)' : 'none', borderBottom: isMobile && chiffre ? 'var(--border-thin) solid var(--border)' : 'none' }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', marginBottom: 6 }}>{t.wordLabel}</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{mot.terme}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: 'var(--text2)' }} dangerouslySetInnerHTML={{ __html: mot.definition[lang] }} />
        </div>
      )}
      {chiffre && (
        <div style={{ flex: 1, padding: isMobile ? '14px 16px' : '16px 20px' }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', marginBottom: 6 }}>{t.figureLabel}</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{chiffre.valeur}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: 'var(--text2)' }} dangerouslySetInnerHTML={{ __html: chiffre.texte[lang] }} />
        </div>
      )}
    </div>
  )
}

// Une ligne de la liste des jours précédents — date + titres des brèves,
// mène à /breves/:date. Registre, comme IssueRow du Magazine, mais sans
// numéro de séquence (les jours n'en ont pas, D2).
export function DayRow({ day, lang }) {
  const isMobile = useIsMobile()
  const titles = day.breves.map((b) => b.titre[lang]).join(' · ')

  return (
    <Link
      to={`/breves/${day.date}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        borderTop: 'var(--border-thin) solid var(--border)',
        padding: isMobile ? '12px 8px' : '14px 12px',
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--text2)', marginBottom: 4 }}>
        {formatDateShort(day.date)}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--text)', overflowWrap: 'anywhere' }}>
        {titles}
      </div>
    </Link>
  )
}
