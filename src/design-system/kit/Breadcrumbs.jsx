// Fil d'Ariane du kit, posé sur une surface en relief. Le dernier segment
// est la page courante : il n'est pas cliquable et porte aria-current.

export default function Breadcrumbs({ items, label = 'Fil d’Ariane' }) {
  return (
    <nav
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        background: 'var(--surface-raised)',
        boxShadow: 'var(--elev-2)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
      }}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {last ? (
              <span aria-current="page" style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.label}</span>
            ) : (
              <a href={item.href ?? '#'} style={{ color: 'var(--text2)', textDecoration: 'none' }}>{item.label}</a>
            )}
            {!last && <span aria-hidden="true" style={{ color: 'var(--muted)' }}>/</span>}
          </span>
        )
      })}
    </nav>
  )
}
