import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

export default function Statusbar({ moduleLabel, isMobile }) {
  const { lang } = useLanguage()

  return (
    <footer
      style={{
        height: 32,
        background: 'var(--bg3)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        padding: '0 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: 'var(--muted)',
        letterSpacing: '0.06em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {isMobile ? (
        <span>▸ {moduleLabel}</span>
      ) : (
        <>
          <span>{t(lang, 'statusbarBrand')}</span>
          <span>▸ {moduleLabel}</span>
          <span>{t(lang, 'statusbarDeploy')}</span>
        </>
      )}
    </footer>
  )
}
