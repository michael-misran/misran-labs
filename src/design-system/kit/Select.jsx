import { useId } from 'react'
import Icon from './Icon'

// Liste déroulante du kit. Même creux que le champ texte : toute zone de
// saisie est un trou dans la surface. Le <select> natif est conservé —
// remplacer un select par un menu custom coûte cher en accessibilité et en
// comportement mobile, pour un gain purement esthétique.

export default function Select({ label, value, onChange, options, disabled = false, width = '100%' }) {
  const id = useId()

  return (
    <div style={{ width, fontFamily: 'var(--font-body)' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6 }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            appearance: 'none',
            background: disabled ? 'var(--surface-pressed)' : 'var(--surface-inset)',
            color: disabled ? 'var(--muted)' : 'var(--text)',
            border: 'var(--border-regular) solid transparent',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--elev-inset)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            padding: '10px 36px 10px 12px',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text2)', pointerEvents: 'none', display: 'flex' }}
        >
          <Icon name="chevronDown" size="var(--icon-sm)" />
        </span>
      </div>
    </div>
  )
}
