import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

// Barre de contrôle d'apparence, exactement la hauteur du footer
// (--chrome-height). Elle portait aussi le sélecteur de kit UI — retiré
// avec le reste du système de kits : il n'y a plus qu'un rendu, plus
// rien à choisir ici. Elle ne garde que la langue.

export default function Topbar({ isMobile, navOpen, onToggleNav }) {
  const { lang, toggle: toggleLang } = useLanguage()

  const chip = {
    background: 'none',
    border: 'none',
    color: 'var(--text2)',
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    padding: '3px 6px',
  }

  return (
    <header
      className="shell-chrome"
      style={{
        height: 'var(--chrome-height)',
        background: 'var(--bg3)',
        borderBottom: 'var(--border-thin) solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: isMobile ? '0 var(--space-sm) 0 0' : '0 20px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
        {isMobile && (
          <button
            onClick={onToggleNav}
            aria-label={t(lang, navOpen ? 'closeNav' : 'openNav')}
            aria-expanded={navOpen}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: 16,
              lineHeight: 1,
              height: 'var(--chrome-height)',
              padding: '0 var(--space-sm)',
              cursor: 'pointer',
            }}
          >
            {navOpen ? '✕' : '☰'}
          </button>
        )}

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.1em',
          }}
        >
          M.LABS ARCHIVE
        </span>
      </div>

      <button onClick={toggleLang} style={chip} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>
    </header>
  )
}
