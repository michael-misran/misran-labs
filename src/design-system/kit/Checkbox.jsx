import { useId } from 'react'
import Icon from './Icon'

// Case à cocher du kit. Décochée : creux dans la surface. Cochée : pastille
// en relief remplie de l'accent. L'input natif reste dans le DOM pour le
// clavier et les lecteurs d'écran, simplement masqué visuellement.

export default function Checkbox({ label, checked = false, onChange, disabled = false }) {
  const id = useId()

  return (
    <label
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
        type="checkbox"
        checked={checked}
        onChange={onChange}
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
          borderRadius: 'var(--radius-xs)',
          background: checked ? 'var(--primary)' : 'var(--surface-inset)',
          color: 'var(--on-primary)',
          boxShadow: checked ? 'var(--elev-2)' : 'var(--elev-inset)',
          transition: 'background 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        {checked && <Icon name="check" size="13px" />}
      </span>
      {label}
    </label>
  )
}
