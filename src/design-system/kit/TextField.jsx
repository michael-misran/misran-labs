import { useId, useState } from 'react'

// Champ texte du kit. Le champ est toujours en creux (--elev-inset) : la
// saisie est un trou dans la surface, pas une carte posée dessus. Trois
// états signalés au-delà de la couleur — helper, erreur, focus visible.

export default function TextField({
  label,
  placeholder,
  helper,
  error,
  value,
  onChange,
  type = 'text',
  disabled = false,
  width = '100%',
}) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const describedBy = error ? `${id}-error` : helper ? `${id}-helper` : undefined

  const ring = error ? 'var(--error)' : focused ? 'var(--primary)' : 'transparent'

  return (
    <div style={{ width, fontFamily: 'var(--font-body)' }}>
      {label && (
        <label
          htmlFor={id}
          style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6 }}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: disabled ? 'var(--surface-pressed)' : 'var(--surface-inset)',
          color: disabled ? 'var(--muted)' : 'var(--text)',
          border: `var(--border-regular) solid ${ring}`,
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--elev-inset)',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          padding: '10px 12px',
          outline: 'none',
          transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
        }}
      />

      {error ? (
        <div id={`${id}-error`} style={{ fontSize: 11, color: 'var(--error)', marginTop: 6 }}>
          {error}
        </div>
      ) : helper ? (
        <div id={`${id}-helper`} style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
          {helper}
        </div>
      ) : null}
    </div>
  )
}
