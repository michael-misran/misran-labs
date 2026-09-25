import { useId } from 'react'

// Curseur du kit. Piste en creux, portion parcourue remplie de l'accent,
// poignée en relief. La valeur est affichée en bulle au-dessus de la
// poignée — le nombre est toujours lisible, on ne le devine pas.

export default function Slider({
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  ticks,
  suffix = '%',
  onChange,
  disabled = false,
}) {
  const id = useId()
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6 }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative', paddingTop: 30 }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: `calc(${pct}% - 20px)`,
            width: 40,
            textAlign: 'center',
            background: 'var(--text)',
            color: 'var(--bg2)',
            borderRadius: 'var(--radius-xs)',
            boxShadow: 'var(--elev-3)',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 0',
          }}
        >
          {value}{suffix}
        </div>

        <div
          style={{
            position: 'relative',
            height: 10,
            borderRadius: 'var(--radius-pill)',
            background: 'var(--surface-inset)',
            boxShadow: 'var(--elev-inset)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: `${pct}%`,
              background: 'var(--primary)',
              borderRadius: 'var(--radius-pill)',
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -6,
              left: `calc(${pct}% - 11px)`,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'var(--surface-raised)',
              boxShadow: 'var(--elev-3)',
            }}
          />
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(Number(e.target.value))}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              opacity: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          />
        </div>

        {ticks && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
            {ticks.map((tick) => <span key={tick}>{tick}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}
