import { useState } from 'react'

// Bouton icône du Lab — règle unique pour tout bouton icône interactif :
// transparent au repos, carré #EDECE8 (radius 6px) au survol. Utilisé pour
// la langue, le thème, le repli du menu, la fermeture mobile, etc.
export default function IconButton({ onClick, label, children, size = 25 }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      title={label}
      style={{
        background: hovered ? '#EDECE8' : 'none',
        border: 'none',
        borderRadius: 6,
        color: 'var(--text)',
        cursor: 'pointer',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'background 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}
