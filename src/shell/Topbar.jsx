import { useLanguage } from './LanguageContext'

// Barre de contrôle d'apparence, exactement la hauteur du footer
// (--chrome-height). Elle portait aussi le sélecteur de kit UI — retiré
// avec le reste du système de kits : il n'y a plus qu'un rendu, plus
// rien à choisir ici. Elle ne garde que la langue.

export default function Topbar({ isMobile }) {
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
        padding: isMobile ? '0 10px 0 52px' : '0 20px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
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

      <button onClick={toggleLang} style={chip} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>
    </header>
  )
}
