import LogoFiole from './LogoFiole'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

export default function Colophon() {
  const { lang } = useLanguage()

  return (
    <footer
      className="no-print"
      style={{
        marginTop: 60,
        borderTop: '3px double var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '18px 20px 50px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 26,
          alignItems: 'center',
        }}
      >
        <span style={{ color: 'var(--text)' }}>
          <LogoFiole largeur={104} avecTexte />
        </span>

        <div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text2)' }}>
            {t(lang, 'colophonTexte')}
          </p>
          {/* Crédit des polices (Comic Book est sous OFL, hommage à son auteur) */}
          <p style={{ marginTop: 6, fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 13, lineHeight: 1.4, color: 'var(--muted)' }}>
            {t(lang, 'colophonPolices')}
          </p>
          <p style={{ marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="https://github.com/michael-misran/misran-labs"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-etiquette)',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              }}
            >
              {t(lang, 'colophonGithub')}
            </a>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.06em',
                color: 'var(--muted)',
              }}
            >
              {t(lang, 'statusbarBrand')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
