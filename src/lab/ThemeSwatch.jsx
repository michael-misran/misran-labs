import { useKit } from '../shell/KitContext'
import { kitLabel, kitDescription } from '../kits/registry'
import { useLanguage } from '../shell/LanguageContext'

// Ce composant comparait le thème clair et le thème sombre côte à côte,
// avec des valeurs recopiées à la main depuis tokens.css — donc une source
// de dérive garantie. Les thèmes n'existent plus : il montre maintenant le
// kit actif et sa portée inversée, en lisant les tokens réels. Plus aucune
// couleur en dur ici, et l'aperçu suit automatiquement tout kit ajouté.

function Panel({ label, invert }) {
  return (
    <div style={{ flex: '1 1 240px', minWidth: 240 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        data-invert={invert ? '' : undefined}
        style={{
          background: 'var(--bg)',
          border: 'var(--border-thin) solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 14,
        }}
      >
        <div
          style={{
            background: 'var(--surface-raised)',
            boxShadow: 'var(--elev-3)',
            borderRadius: 'var(--radius-md)',
            padding: 14,
          }}
        >
          <div
            style={{
              color: 'var(--primary)',
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 'var(--label-tracking)',
              textTransform: 'var(--label-transform)',
              marginBottom: 8,
            }}
          >
            {'// CONTEXTE'}
          </div>
          <div
            style={{
              color: 'var(--text)',
              fontFamily: "var(--font-heading)",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 'var(--heading-tracking)',
              textTransform: 'var(--heading-transform)',
              marginBottom: 6,
            }}
          >
            Création du lab
          </div>
          <div style={{ color: 'var(--text2)', fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
            Un paragraphe de lecture pour juger le confort visuel du kit.
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              style={{
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                boxShadow: 'var(--elev-2)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                padding: '6px 14px',
                letterSpacing: 'var(--label-tracking)',
                textTransform: 'var(--label-transform)',
              }}
            >
              Action
            </span>
            <span
              style={{
                background: 'var(--surface-inset)',
                boxShadow: 'var(--elev-inset)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: 'var(--text2)',
                padding: '6px 10px',
              }}
            >
              creux
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemeSwatch() {
  const { kit } = useKit()
  const { lang } = useLanguage()

  return (
    <div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16 }}>
        <strong style={{ color: 'var(--text)' }}>{kitLabel(kit, lang)}</strong> — {kitDescription(kit, lang)}
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <Panel label="Portée normale" />
        <Panel label="Portée inversée" invert />
      </div>
    </div>
  )
}
