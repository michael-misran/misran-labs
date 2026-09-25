import { useKit } from './KitContext'
import { kitLabel, kitDescription } from '../kits/registry'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

// Barre de contrôle d'apparence, exactement la hauteur du footer
// (--chrome-height). Elle porte le choix du kit UI et la langue : les
// réglages d'apparence vivent au même endroit, la sidebar ne s'occupe
// que de navigation.
//
// Le sélecteur de kit est un vrai groupe de boutons radio pour le
// clavier et les lecteurs d'écran : c'est un choix parmi N, pas une
// bascule. Il s'allonge tout seul quand un kit est ajouté au registre.

function KitOption({ kit, active, onSelect, lang, compact }) {
  return (
    <button
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(kit.id)}
      title={kitDescription(kit, lang)}
      style={{
        background: active ? 'var(--primary)' : 'transparent',
        color: active ? 'var(--on-primary)' : 'var(--text2)',
        border: 'none',
        borderRadius: 'var(--radius-xs)',
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: active ? 700 : 400,
        letterSpacing: 'var(--label-tracking)',
        textTransform: 'var(--label-transform)',
        padding: '3px 9px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
    >
      {compact ? kit.short : kitLabel(kit, lang)}
    </button>
  )
}

export default function Topbar({ isMobile }) {
  const { kits, kitId, setKitId } = useKit()
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
      <div
        role="radiogroup"
        aria-label={t(lang, 'kitPickerLabel')}
        style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflowX: 'auto' }}
      >
        {!isMobile && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              marginRight: 6,
            }}
          >
            {t(lang, 'kitPickerLabel').toUpperCase()}
          </span>
        )}
        {kits.map((kit) => (
          <KitOption
            key={kit.id}
            kit={kit}
            active={kit.id === kitId}
            onSelect={setKitId}
            lang={lang}
            compact={isMobile}
          />
        ))}
      </div>

      <button onClick={toggleLang} style={chip} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>
    </header>
  )
}
