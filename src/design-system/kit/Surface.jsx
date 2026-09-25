// Surface du kit — la brique de toutes les autres. Cinq niveaux d'élévation
// en relief, plus deux variantes en creux (inset, pressed). Aucun composant
// du kit ne code une ombre en dur : tout passe par ces niveaux.
//
//   1 = flat  ·  2 = hover  ·  3 = raised  ·  4 = modal  ·  5 = popover
//
// `invert` bascule le sous-arbre sur la portée inversée (data-invert).
// Ce n'est pas un mode sombre : c'est un rôle de surface, pour mettre un
// bloc en avant au milieu de blocs ordinaires — le bloc corail plein
// cadre d'une planche d'identité.

const LEVEL_SHADOW = {
  1: 'var(--elev-1)',
  2: 'var(--elev-2)',
  3: 'var(--elev-3)',
  4: 'var(--elev-4)',
  5: 'var(--elev-5)',
}

export default function Surface({
  level = 1,
  variant = 'raised',
  radius = 'var(--radius-lg)',
  padding = 0,
  invert = false,
  as: Tag = 'div',
  style,
  children,
  ...rest
}) {
  const inset = variant === 'inset' || variant === 'pressed'

  return (
    <Tag
      data-invert={invert ? '' : undefined}
      style={{
        background: inset
          ? (variant === 'pressed' ? 'var(--surface-pressed)' : 'var(--surface-inset)')
          : 'var(--surface-raised)',
        boxShadow: inset
          ? (variant === 'pressed' ? 'var(--elev-pressed)' : 'var(--elev-inset)')
          : LEVEL_SHADOW[level],
        border: level === 1 && !inset ? 'var(--border-thin) solid var(--border)' : 'none',
        borderRadius: radius,
        padding,
        transition: 'box-shadow 0.18s ease, background 0.18s ease',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
