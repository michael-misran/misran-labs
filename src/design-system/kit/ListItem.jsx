import { useState } from 'react'
import Avatar from './Avatar'

// Ligne de liste du kit. Au repos elle est à plat sur la surface ; au survol
// elle se creuse légèrement (--elev-inset) au lieu de se colorer. C'est la
// contrepartie de la carte, qui se soulève.

export default function ListItem({ name, description, right, onClick }) {
  const [hovered, setHovered] = useState(false)
  const interactive = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        background: interactive && hovered ? 'var(--surface-inset)' : 'transparent',
        boxShadow: interactive && hovered ? 'var(--elev-inset)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        fontFamily: 'var(--font-body)',
        transition: 'background 0.18s ease, box-shadow 0.18s ease',
      }}
    >
      <Avatar name={name} size="sm" />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{name}</div>
        {description && <div style={{ fontSize: 12, color: 'var(--text2)' }}>{description}</div>}
      </div>
      {right}
    </div>
  )
}
