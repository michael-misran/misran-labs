// Avatar du kit. Initiales sur surface en creux, anneau en relief autour :
// pas de photo par défaut, donc pas de dépendance à une banque d'images.
// `src` reste possible pour une vraie photo.

const SIZES = { sm: 28, md: 38, lg: 46 }

export default function Avatar({ name = '', src, size = 'md' }) {
  const px = SIZES[size] ?? SIZES.md
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  return (
    <span
      title={name || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px,
        height: px,
        flexShrink: 0,
        borderRadius: '50%',
        background: 'var(--surface-inset)',
        color: 'var(--primary)',
        boxShadow: 'var(--elev-3)',
        border: 'var(--border-regular) solid var(--surface-raised)',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        fontSize: px * 0.34,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials || '·'
      )}
    </span>
  )
}
