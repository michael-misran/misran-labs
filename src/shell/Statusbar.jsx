import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import Fiole from './mascotte/Fiole'

// Le fil d'Ariane du footer suit le langage du reste du chrome : une
// croix de repérage d'imprimerie, pas une flèche générique, pour que
// « vous êtes ici » se lise pareil partout sur le site.
const MARKER = '✛'

// Un texte tronqué a besoin d'une largeur bornée : sans min-width: 0,
// un enfant flex ne rétrécit jamais sous la taille de son contenu.
const ellipsis = { overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }

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
        padding: '0 20px',
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: 'var(--muted)',
        letterSpacing: '0.06em',
        // La Fiole (bob, tangage, pirouette) ne doit pas être rognée :
        // le texte, lui, reste tronqué par ellipsis (voir `ellipsis` ci-dessus).
        overflow: 'visible',
        whiteSpace: 'nowrap',
        gap: 12,
      }}
    >
      {isMobile ? (
        <span style={{ ...ellipsis, flex: 1, textAlign: 'center' }}>{MARKER} {moduleLabel}</span>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, minWidth: 0, gap: 12 }}>
          <span style={ellipsis}>{t(lang, 'statusbarBrand')}</span>
          <span style={ellipsis}>{MARKER} {moduleLabel}</span>
          <span style={ellipsis}>{t(lang, 'statusbarDeploy')}</span>
        </div>
      )}
      <Fiole />
    </footer>
  )
}
