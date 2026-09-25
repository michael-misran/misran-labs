// Onglets du kit. L'onglet actif est en relief et détaché de la piste en
// creux : la profondeur porte l'information, la couleur ne fait que la
// confirmer. Rôles ARIA tablist / tab pour la navigation clavier.

export default function Tabs({ tabs, active, onChange, label }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      style={{
        display: 'inline-flex',
        gap: 4,
        background: 'var(--surface-inset)',
        boxShadow: 'var(--elev-inset)',
        borderRadius: 'var(--radius-md)',
        padding: 4,
      }}
    >
      {tabs.map((tab) => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange?.(tab.id)}
            style={{
              background: selected ? 'var(--surface-raised)' : 'transparent',
              boxShadow: selected ? 'var(--elev-3)' : 'var(--elev-1)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: selected ? 'var(--text)' : 'var(--text2)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: selected ? 600 : 400,
              padding: '8px 16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
