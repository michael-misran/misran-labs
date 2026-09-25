import { useState } from 'react'

// Sous-navigation de page, rendue par Shell collée à la Sidebar principale
// (voir src/shell/Shell.jsx + SecondarySidebarContext) — pas flottante dans
// le contenu paginé de la page. Une page s'y branche en appelant
// useSecondarySidebar(items, active, onChange). Un item peut porter un
// tableau `children` pour des sous-items.
//
// Contrat du kit : l'item actif est enfoncé, pas simplement teinté. La
// profondeur porte l'information, la couleur la confirme. On descend jusqu'à
// --selected-surface et non --surface-inset, parce que la colonne est déjà
// au ton creux : un inset sur un inset ne se verrait pas. La sélection est
// une paire --selected-surface / --on-selected, sinon un kit qui remplit la
// sélection d'une couleur vive garde le texte clair par-dessus.
function NavButton({ label, isActive, onClick, indent }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive ? 'var(--selected-surface)' : hovered ? 'var(--hover-surface)' : 'none',
        boxShadow: isActive ? 'var(--elev-pressed)' : 'none',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        width: 'calc(100% - 16px)',
        margin: '0 8px',
        color: isActive ? 'var(--on-selected)' : 'var(--text2)',
        fontFamily: "var(--font-body)",
        fontSize: indent ? 12 : 13,
        fontWeight: isActive ? 600 : 400,
        textAlign: 'left',
        padding: indent ? '7px 12px 7px 24px' : '9px 12px',
        cursor: 'pointer',
        transition: 'background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
      }}
    >
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
      {items.map((item) => (
        <div key={item.id}>
          <NavButton label={item.label} isActive={active === item.id} onClick={() => onChange(item.id)} />
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
