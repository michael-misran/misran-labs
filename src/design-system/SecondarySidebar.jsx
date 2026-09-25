import { useState } from 'react'

// Sous-navigation de page, rendue par Shell collée à la Sidebar principale
// (voir src/shell/Shell.jsx + SecondarySidebarContext) — pas flottante dans
// le contenu paginé de la page. Une page s'y branche en appelant
// useSecondarySidebar(items, active, onChange). Un item peut porter un
// tableau `children` pour des sous-items.
//
// L'item actif se marque d'une croix de repérage (✛) et d'un filet
// vertical, comme un onglet de sommaire de planche imprimée — pas d'un
// bloc enfoncé façon surface numérique. Les items de premier niveau
// portent leur numéro d'ordre au repos.
function NavButton({ label, isActive, onClick, indent, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: hovered && !isActive ? 'var(--hover-surface)' : 'none',
        border: 'none',
        borderLeft: isActive ? '2px solid var(--primary)' : '2px solid transparent',
        borderRadius: 0,
        width: 'calc(100% - 16px)',
        margin: '0 8px',
        color: isActive ? 'var(--text)' : 'var(--text2)',
        fontFamily: "var(--font-body)",
        fontSize: indent ? 12 : 13,
        fontWeight: isActive ? 600 : 400,
        textAlign: 'left',
        padding: indent ? '7px 12px 7px 24px' : '9px 12px 9px 10px',
        cursor: 'pointer',
        transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
      }}
    >
      {!indent && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: isActive ? 'var(--primary)' : 'var(--muted)', flexShrink: 0 }}>
          {isActive ? '✛' : String(index + 1).padStart(2, '0')}
        </span>
      )}
      {label}
    </button>
  )
}

export default function SecondarySidebar({ items, active, onChange, width = 190 }) {
  return (
    <nav
      className="shell-chrome"
      style={{
        width,
        minWidth: width,
        flexShrink: 0,
        background: 'var(--bg3)',
        borderRight: 'var(--border-thin) solid var(--border)',
        overflowY: 'auto',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {items.map((item, i) => (
        <div key={item.id}>
          <NavButton label={item.label} isActive={active === item.id} onClick={() => onChange(item.id)} index={i} />
          {item.children && item.children.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
              {item.children.map((child) => (
                <NavButton
                  key={child.id}
                  label={child.label}
                  isActive={active === child.id}
                  onClick={() => onChange(child.id)}
                  indent
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
