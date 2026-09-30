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
        // Un `border-top` grignote 1 px de la hauteur de contenu (box-sizing:
        // border-box) : la Fiole en 32×32 px déborderait des 31 px restants.
        // Une ombre interne dessine le même trait sans consommer d'espace.
        boxShadow: 'inset 0 var(--border-thin) 0 0 var(--border)',
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
        // Perchée hors du flux (position: absolute plus bas), la Fiole n'est
        // plus un item flex : le texte reprend toute la largeur (D2).
        position: 'relative',
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

      {/* Fiole perchée sur le bord haut de la barre (D2) : le bas de son
          dessin chevauche la barre de 3 px, le reste dépasse au-dessus.
          `pointer-events: none` sur l'enveloppe, `auto` sur le bouton
          (voir fiole.css) pour ne jamais bloquer le contenu (D4). Passe
          sous le menu mobile (zIndex 40/50 dans Shell.jsx et Sidebar.jsx). */}
      <span
        className="fiole-perch"
        style={{
          position: 'absolute',
          right: 24,
          bottom: 'calc(var(--chrome-height) - 3px)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <span className="fiole-shadow" aria-hidden="true" />
        <Fiole />
      </span>
    </footer>
  )
}
