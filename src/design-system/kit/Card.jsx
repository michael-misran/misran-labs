import { useState } from 'react'
import Icon from './Icon'

// Carte du kit. Élévation 3 au repos, 4 au survol quand la carte est
// interactive — le passage de niveau est la seule chose qui change, pas la
// couleur. Sans `onAction`, la carte reste une surface de lecture.
//
// `emphasis` bascule la carte sur la portée inversée du kit : c'est comme
// ça qu'on obtient une carte noire au milieu de cartes claires sans coder
// une seule couleur dans ce fichier.

export default function Card({ icon = 'box', title, description, action, onAction, emphasis = false, children }) {
  const [hovered, setHovered] = useState(false)
  const interactive = Boolean(onAction)

  return (
    <div
      data-invert={emphasis ? '' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-raised)',
        boxShadow: interactive && hovered ? 'var(--elev-4)' : 'var(--elev-3)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md)',
        fontFamily: 'var(--font-body)',
        transition: 'box-shadow 0.18s ease',
      }}
    >
      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-inset)',
            boxShadow: 'var(--elev-inset)',
            color: 'var(--primary)',
            marginBottom: 14,
          }}
        >
          <Icon name={icon} size="var(--icon-md)" />
        </span>
      )}

      {title && (
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
          {title}
        </div>
      )}

      {description && (
        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: action ? 16 : 0 }}>
          {description}
        </div>
      )}

      {children}

      {action}
    </div>
  )
}
