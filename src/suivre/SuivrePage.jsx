import { useState } from 'react'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MagazineMasthead } from '../magazine/MagazineParts'
import { CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { FEEDS, NETWORKS, SUIVRE_TEXT } from './suivreText'

const COPY_RESET_MS = 2000

function FeedRow({ feed, lang, t, copiedKey, onCopy }) {
  const isMobile = useIsMobile()
  const copied = copiedKey === feed.key

  return (
    <li
      style={{
        borderTop: 'var(--border-thin) solid var(--border)',
        padding: isMobile ? '14px var(--space-xs)' : 'var(--space-md) var(--space-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--space-xs)' }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>
          {feed.name[lang] ?? feed.name.fr}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {feed.rythme[lang] ?? feed.rythme.fr}
        </span>
      </div>

      <code
        style={{
          fontFamily: "var(--font-mono)",
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
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: '0.04em',
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
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: '0.04em',
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
    </li>
  )
}

function NetworkRow({ network, lang }) {
  const isMobile = useIsMobile()
  return (
    <li style={{ borderTop: 'var(--border-thin) solid var(--border)', padding: isMobile ? '14px var(--space-xs)' : 'var(--space-md) var(--space-sm)' }}>
      <a
        href={network.url}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--space-xs)', textDecoration: 'none', color: 'inherit' }}
      >
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{network.name}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--prose)' }}>{network.description[lang] ?? network.description.fr}</span>
        <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--primary)' }}>↗</span>
      </a>
    </li>
  )
}

export default function SuivrePage() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = SUIVRE_TEXT[lang]
  const chrome = CASE_CHROME[lang]
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
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/"
        backLabel={t.backLabel}
        fileNo={t.fileNo}
        center={t.mastheadCenter}
        right={t.mastheadRight}
        rightSub={t.mastheadRightSub}
      />

      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.1, margin: '0 0 var(--space-sm)', color: 'var(--text)' }}>
        {t.title}
      </h1>
      <p style={{ maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', margin: '0 0 var(--space-xl)' }}>
        {t.intro}
      </p>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <SectionTitle>{t.feedsTitle}</SectionTitle>
        <ul style={{ listStyle: 'none', margin: '0 0 var(--space-sm)', padding: 0, borderBottom: 'var(--border-thin) solid var(--border)' }}>
          {FEEDS.map((feed) => (
            <FeedRow key={feed.key} feed={feed} lang={lang} t={t} copiedKey={copiedKey} onCopy={handleCopy} />
          ))}
        </ul>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)', margin: 0 }}>{t.feedsHelp}</p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <SectionTitle>{t.networksTitle}</SectionTitle>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: 'var(--border-thin) solid var(--border)' }}>
          {NETWORKS.map((network) => (
            <NetworkRow key={network.name} network={network} lang={lang} />
          ))}
        </ul>
      </section>

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
