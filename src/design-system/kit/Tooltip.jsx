import { useState } from 'react'

// Infobulle du kit. Apparaît au survol ET au focus clavier — une bulle qui
// ne répond qu'à la souris est inaccessible. Élévation 5 (popover), la plus
// haute du système : rien ne passe au-dessus.

export default function Tooltip({ content, children, placement = 'top' }) {
  const [open, setOpen] = useState(false)
  const above = placement === 'top'

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        hidden={!open}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          [above ? 'bottom' : 'top']: 'calc(100% + 8px)',
          background: 'var(--text)',
          color: 'var(--bg2)',
          borderRadius: 'var(--radius-xs)',
          boxShadow: 'var(--elev-5)',
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          whiteSpace: 'nowrap',
          padding: '6px 10px',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {content}
      </span>
    </span>
  )
}
