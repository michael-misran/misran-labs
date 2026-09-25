import Icon from './Icon'

// Bandeau d'alerte du kit — le seul élément large rempli de l'accent.
// Réservé aux messages de niveau système ; s'il y en a deux à l'écran,
// c'est qu'un des deux devrait être une notification.

export default function AlertBanner({ title, children, icon = 'info' }) {
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: 'var(--primary)',
        color: 'var(--on-primary)',
        boxShadow: 'var(--elev-3)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <span style={{ display: 'flex', marginTop: 1 }}><Icon name={icon} size="var(--icon-md)" /></span>
      <span>
        {title && <strong style={{ fontWeight: 700 }}>{title} </strong>}
        {children}
      </span>
    </div>
  )
}
