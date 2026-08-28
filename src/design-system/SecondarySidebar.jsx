// A page-level sub-navigation column, rendered by Shell flush against the
// main Sidebar (see src/shell/Shell.jsx + SecondarySidebarContext) — not
// floating inside the page's own padded content. Pages opt in by calling
// useSecondarySidebar(items, active, onChange) from SecondarySidebarContext.
// Items can carry a `children` array for nested sub-items.
function NavButton({ label, isActive, onClick, indent }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? 'var(--active-tint)' : 'none',
        border: 'none',
        width: '100%',
        color: 'var(--text)',
        fontFamily: "var(--font-body)",
        fontSize: indent ? 12 : 13,
        fontWeight: 400,
        textAlign: 'left',
        padding: indent ? '7px 16px 7px 30px' : '9px 16px',
        cursor: 'pointer',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--hover-tint)' }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'none' }}
    >
      {label}
    </button>
  )
}

export default function SecondarySidebar({ items, active, onChange, width = 190 }) {
  return (
    <nav
      style={{
        width,
        minWidth: width,
        flexShrink: 0,
        background: 'var(--bg3)',
        borderRight: '1px solid var(--border)',
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
