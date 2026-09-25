// Pagination du kit. La page courante est la seule pastille en relief
// remplie de l'accent ; les bornes Précédent / Suivant se désactivent
// d'elles-mêmes aux extrémités.

export default function Pagination({ page = 1, pages = 1, onChange, labels }) {
  const l = labels ?? { prev: 'PREV', next: 'NEXT', nav: 'Pagination' }
  const list = Array.from({ length: pages }, (_, i) => i + 1)

  const arrow = (dir, enabled) => (
    <button
      onClick={enabled ? () => onChange?.(dir === 'prev' ? page - 1 : page + 1) : undefined}
      disabled={!enabled}
      style={{
        background: 'none',
        border: 'none',
        color: enabled ? 'var(--text2)' : 'var(--muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.06em',
        cursor: enabled ? 'pointer' : 'not-allowed',
        padding: '6px 4px',
      }}
    >
      {dir === 'prev' ? l.prev : l.next}
    </button>
  )

  return (
    <nav aria-label={l.nav} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {arrow('prev', page > 1)}
      {list.map((n) => {
        const current = n === page
        return (
          <button
            key={n}
            onClick={() => onChange?.(n)}
            aria-current={current ? 'page' : undefined}
            style={{
              minWidth: 30,
              height: 30,
              background: current ? 'var(--primary)' : 'transparent',
              color: current ? 'var(--on-primary)' : 'var(--text2)',
              boxShadow: current ? 'var(--elev-3)' : 'var(--elev-1)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: current ? 600 : 400,
              cursor: 'pointer',
              transition: 'box-shadow 0.18s ease, background 0.18s ease',
            }}
          >
            {n}
          </button>
        )
      })}
      {arrow('next', page < pages)}
    </nav>
  )
}
