import Icon from './Icon'

// En-tête de tableau compact du kit. La colonne triée est la seule en creux,
// et porte aria-sort pour que l'ordre soit annoncé et pas seulement dessiné.

export default function TableHeader({ columns, sortBy, direction = 'asc', onSort, actions = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-body)' }}>
      <div
        role="row"
        style={{
          display: 'flex',
          flex: 1,
          gap: 4,
          background: 'var(--surface-raised)',
          boxShadow: 'var(--elev-2)',
          borderRadius: 'var(--radius-md)',
          padding: 4,
          overflowX: 'auto',
        }}
      >
        {columns.map((col) => {
          const sorted = col.id === sortBy
          return (
            <button
              key={col.id}
              role="columnheader"
              aria-sort={sorted ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              onClick={() => onSort?.(col.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: sorted ? 'var(--surface-inset)' : 'transparent',
                boxShadow: sorted ? 'var(--elev-inset)' : 'none',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: sorted ? 'var(--text)' : 'var(--text2)',
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: sorted ? 600 : 400,
                padding: '8px 14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.18s ease, background 0.18s ease',
              }}
            >
              {col.label}
              {sorted && <Icon name="chevronDown" size="var(--icon-sm)" style={{ transform: direction === 'asc' ? 'none' : 'rotate(180deg)' }} />}
            </button>
          )
        })}
      </div>

      {actions && (
        <div style={{ display: 'flex', gap: 10, color: 'var(--text2)' }}>
          <Icon name="filter" size="var(--icon-md)" title="Filtrer" />
          <Icon name="sort" size="var(--icon-md)" title="Trier" />
        </div>
      )}
    </div>
  )
}
