import { useId, useState } from 'react'

// Zone de texte du kit. Même contrat que TextField — creux, anneau de focus
// à l'accent, helper ou erreur reliés par aria-describedby.

export default function Textarea({ label, placeholder, helper, error, value, onChange, rows = 4, disabled = false, width = '100%' }) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const describedBy = error ? `${id}-error` : helper ? `${id}-helper` : undefined
  const ring = error ? 'var(--error)' : focused ? 'var(--primary)' : 'transparent'

  return (
    <div style={{ width, fontFamily: 'var(--font-body)' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6 }}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
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
          lineHeight: 1.6,
          padding: '10px 12px',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.18s ease',
        }}
      />

      {error ? (
        <div id={`${id}-error`} style={{ fontSize: 11, color: 'var(--error)', marginTop: 6 }}>{error}</div>
      ) : helper ? (
        <div id={`${id}-helper`} style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{helper}</div>
      ) : null}
    </div>
  )
}
