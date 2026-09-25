import { useId } from 'react'

// Groupe de boutons radio du kit. Même logique d'élévation que la case à
// cocher : creux au repos, point en relief quand l'option est retenue.
// Un seul <fieldset> par groupe, pour que le libellé du groupe soit lu.

export default function Radio({ legend, name, options, value, onChange, disabled = false }) {
  const groupId = useId()

  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
      {legend && (
        <legend style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, padding: 0 }}>
          {legend}
        </legend>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt) => {
          const id = `${groupId}-${opt.value}`
          const selected = value === opt.value

          return (
            <label
              key={opt.value}
              htmlFor={id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: disabled ? 'var(--muted)' : 'var(--text)',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <input
                id={id}
                type="radio"
                name={name ?? groupId}
                value={opt.value}
                checked={selected}
                onChange={() => onChange?.(opt.value)}
                disabled={disabled}
                style={{ position: 'absolute', opacity: 0, width: 1, height: 1, margin: 0 }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 20,
                  height: 20,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: selected ? 'var(--primary)' : 'var(--surface-inset)',
                  boxShadow: selected ? 'var(--elev-2)' : 'var(--elev-inset)',
                  transition: 'background 0.18s ease, box-shadow 0.18s ease',
                }}
              >
                {selected && (
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--on-primary)' }} />
                )}
              </span>
              {opt.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
