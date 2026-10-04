import { useState } from 'react'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { FEEDS, NETWORKS, SUIVRE_TEXT } from './suivreText'

const COPY_RESET_MS = 2000

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

// Typo propre à chaque titre (D3), alignée sur celle de NavTitres : Gazette
// en gothique avec initiale rouge, Magazine en Playfair italique bleu, les
// idées du Lab en machine à écrire verte, "tout le kiosque" en lettres de
// bois sans couleur de titre dédiée.
const FEED_STYLE = {
  magazine: { fontFamily: 'var(--primitive-font-playfair-display)', fontStyle: 'italic', fontWeight: 900, color: 'var(--titre-magazine)', fontSize: 18 },
  breves: { fontFamily: 'var(--font-gothique)', color: 'var(--text)', fontSize: 20, wordSpacing: 'var(--font-gothique-espace, normal)' },
  projets: { fontFamily: 'var(--font-machine)', letterSpacing: '0.02em', color: 'var(--titre-lab)', fontSize: 16 },
  tout: { fontFamily: 'var(--font-bois)', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--text)', fontSize: 16 },
}

// La Gazette porte son initiale en rouge (--titre-gazette), comme dans
// NavTitres — "Gazette" apparaît tel quel dans le nom fr et en.
function FeedName({ feed, lang }) {
  const name = feed.name[lang] ?? feed.name.fr
  const style = FEED_STYLE[feed.key] ?? {}
  const idx = feed.key === 'breves' ? name.indexOf('Gazette') : -1

  if (idx !== -1) {
    return (
      <span style={style}>
        {name.slice(0, idx)}
        <span style={{ color: 'var(--titre-gazette)' }}>G</span>
        {name.slice(idx + 1)}
      </span>
    )
  }
  return <span style={style}>{name}</span>
}

function FeedRow({ feed, lang, t, copiedKey, onCopy }) {
  const isMobile = useIsMobile()
  const [hover, setHover] = useState(false)
  const copied = copiedKey === feed.key

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderTop: 'var(--border-thin) solid var(--border)',
        padding: isMobile ? '14px var(--space-2xs)' : 'var(--space-md) var(--space-xs)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 'var(--space-sm)',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1, color: 'var(--text)', flexShrink: 0 }}>
        {hover ? '☒' : '☐'}
      </span>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--space-xs)' }}>
          <FeedName feed={feed} lang={lang} />
          <span style={{ ...etiquette, fontSize: 10, color: 'var(--text2)' }}>
            {feed.rythme[lang] ?? feed.rythme.fr}
          </span>
        </div>

        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text2)',
            background: 'var(--bg2)',
            border: 'var(--border-thin) solid var(--border)',
            borderRadius: 'var(--radius-xs)',
            padding: '6px var(--space-xs-plus)',
            overflowWrap: 'anywhere',
          }}
        >
          {feed.url}
        </code>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          <button
            type="button"
            onClick={() => onCopy(feed)}
            style={{
              ...etiquette,
              fontSize: 11,
              color: 'var(--primary)',
              background: 'var(--bg3)',
              border: 'var(--border-thin) solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              padding: '7px var(--space-sm)',
              cursor: 'pointer',
            }}
          >
            {copied ? t.copiedLabel : t.copyLabel}
          </button>
          <a
            href={feed.url}
            style={{
              ...etiquette,
              fontSize: 11,
              color: 'var(--text2)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '7px var(--space-2xs)',
            }}
          >
            {t.openLabel} →
          </a>
        </div>
      </div>
    </li>
  )
}

function NetworkRow({ network, lang }) {
  const isMobile = useIsMobile()
  return (
    <li style={{ borderTop: 'var(--border-thin) solid var(--border)', padding: isMobile ? '14px var(--space-2xs)' : 'var(--space-md) var(--space-xs)' }}>
      <a
        href={network.url}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--space-xs)', textDecoration: 'none', color: 'inherit' }}
      >
        <span style={{ ...etiquette, fontSize: 14, color: 'var(--text)' }}>{network.name}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--prose)' }}>{network.description[lang] ?? network.description.fr}</span>
        <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)' }}>↗</span>
      </a>
    </li>
  )
}

export default function SuivrePage() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = SUIVRE_TEXT[lang]
  const [copiedKey, setCopiedKey] = useState(null)

  async function handleCopy(feed) {
    try {
      await navigator.clipboard.writeText(feed.url)
      setCopiedKey(feed.key)
      setTimeout(() => setCopiedKey((current) => (current === feed.key ? null : current)), COPY_RESET_MS)
    } catch {
      // Repli silencieux : pas de presse-papiers disponible.
    }
  }

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 760, margin: '0 auto' }}>
      <div style={{ ...etiquette, fontSize: 11, color: 'var(--text2)', marginBottom: 'var(--space-sm)' }}>{t.kicker}</div>

      <h1
        style={{
          fontFamily: 'var(--font-bois)',
          fontWeight: 400,
          textTransform: 'uppercase',
          fontSize: isMobile ? 'clamp(28px, 9vw, 40px)' : 'clamp(36px, 5vw, 56px)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          margin: '0 0 var(--space-sm)',
          color: 'var(--text)',
        }}
      >
        {t.title}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-chapo)',
          fontStyle: 'italic',
          fontSize: isMobile ? 16 : 19,
          lineHeight: 1.5,
          color: 'var(--text)',
          margin: '0 0 var(--space-xl)',
          maxWidth: 560,
        }}
      >
        {t.intro}
      </p>

      <div style={{ position: 'relative' }}>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -13,
            left: isMobile ? 12 : 20,
            background: 'var(--bg)',
            padding: '0 8px',
            ...etiquette,
            fontSize: 11,
            color: 'var(--text2)',
          }}
        >
          ✂ {t.decouper}
        </span>

        <div
          style={{
            border: 'var(--border-regular) dashed var(--border)',
            borderRadius: 'var(--radius-xs)',
            padding: isMobile ? 'var(--space-md) var(--space-xs)' : 'var(--space-lg) var(--space-md)',
          }}
        >
          <ul style={{ listStyle: 'none', margin: '0 0 var(--space-sm)', padding: 0, borderBottom: 'var(--border-thin) solid var(--border)' }}>
            {FEEDS.map((feed) => (
              <FeedRow key={feed.key} feed={feed} lang={lang} t={t} copiedKey={copiedKey} onCopy={handleCopy} />
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', margin: 0 }}>{t.feedsHelp}</p>
        </div>
      </div>

      <section style={{ marginTop: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
          <span style={{ ...etiquette, fontSize: 12, color: 'var(--text)' }}>{t.networksTitle}</span>
          <div style={{ flex: 1, height: 'var(--border-thin)', background: 'var(--border)' }} />
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: 'var(--border-thin) solid var(--border)' }}>
          {NETWORKS.map((network) => (
            <NetworkRow key={network.name} network={network} lang={lang} />
          ))}
        </ul>
      </section>
    </div>
  )
}
