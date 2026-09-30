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
        gap: 'var(--space-xs)',
        background: hovered && !isActive ? 'var(--hover-surface)' : 'none',
        border: 'none',
        borderLeft: isActive ? 'var(--border-thick) solid var(--primary)' : 'var(--border-thick) solid transparent',
        borderRadius: 0,
        width: 'calc(100% - 2 * var(--space-xs))',
        margin: '0 var(--space-xs)',
        color: isActive ? 'var(--text)' : 'var(--text2)',
        fontFamily: "var(--font-body)",
        fontSize: indent ? 12 : 13,
        fontWeight: isActive ? 600 : 400,
        textAlign: 'left',
        padding: indent ? '7px var(--space-sm) 7px var(--space-lg)' : '9px var(--space-sm) 9px var(--space-xs-plus)',
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
        padding: 'var(--space-md) 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3xs)',
      }}
    >
      {items.map((item, i) => (
        <div key={item.id}>
          <NavButton label={item.label} isActive={active === item.id} onClick={() => onChange(item.id)} index={i} />
          {item.children && item.children.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xs)', marginTop: 'var(--space-3xs)' }}>
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
