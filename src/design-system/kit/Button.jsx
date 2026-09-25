import { useState } from 'react'
import Icon from './Icon'
import { buttonVisuals } from './buttonStyles'

// Bouton du kit. Quatre états visuels — repos, survol, pressé, désactivé —
// plus un état de chargement. Le pressé s'obtient en creux (--elev-pressed),
// pas en assombrissant la couleur : c'est ce qui donne la sensation de relief.
// Le style vient de buttonStyles.js, partagé avec LinkButton.

export default function Button({
  children,
  tone = 'primary',
  variant = 'solid',
  size = 'md',
  icon,
  trailing,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isOff = disabled || loading
  const state = isOff ? 'off' : pressed ? 'pressed' : hovered ? 'hover' : 'default'

  return (
    <button
      type={type}
      onClick={isOff ? undefined : onClick}
      disabled={isOff}
      aria-busy={loading || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...buttonVisuals({ tone, variant, size, state }),
        cursor: isOff ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'kit-spin 0.7s linear infinite',
          }}
        />
      )}
      {!loading && icon && <Icon name={icon} size="var(--icon-sm)" />}
      {children}
      {trailing && <span aria-hidden="true">{trailing}</span>}
    </button>
  )
}
