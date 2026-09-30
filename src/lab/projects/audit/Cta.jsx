const LIEN_LINKEDIN = 'https://www.linkedin.com/in/michael-misran'

export default function Cta({ c }) {
  return (
    <section style={{ border: 'var(--border-regular) solid var(--border)', background: 'var(--bg2)', padding: 'var(--space-md-plus) var(--space-lg)', marginTop: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, margin: '0 0 var(--space-xs)', color: 'var(--text)' }}>{c.ctaTitle}</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 14px' }}>{c.ctaText}</p>
      <a
        href={LIEN_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--on-primary-surface)',
          background: 'var(--primary-surface)',
          border: 'var(--border-thin) solid var(--primary-surface)',
          padding: 'var(--space-xs) 14px',
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        {c.ctaLink} ↗
      </a>
    </section>
  )
}
