import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

// Le fil d'Ariane du footer suit le langage du reste du chrome : une
// croix de repérage d'imprimerie, pas une flèche générique, pour que
// « vous êtes ici » se lise pareil partout sur le site.
const MARKER = '✛'

export default function Statusbar({ moduleLabel, isMobile }) {
  const { lang } = useLanguage()

  return (
    <footer
      className="shell-chrome"
      style={{
        height: 'var(--chrome-height)',
        background: 'var(--bg3)',
        borderTop: 'var(--border-thin) solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        padding: '0 20px',
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: 'var(--muted)',
        letterSpacing: '0.06em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {isMobile ? (
        <span>{MARKER} {moduleLabel}</span>
      ) : (
        <>
          <span>{t(lang, 'statusbarBrand')}</span>
          <span>{MARKER} {moduleLabel}</span>
          <span>{t(lang, 'statusbarDeploy')}</span>
        </>
      )}
    </footer>
  )
}
