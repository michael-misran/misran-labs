import Icon from './Icon'

// État vide du kit. Bordure en pointillés — la zone est un contenant en
// attente, pas une carte. Toujours une action de sortie : un état vide sans
// bouton laisse l'utilisateur bloqué.

export default function EmptyState({ title, description, action, icon = 'window' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        border: 'var(--border-regular) dashed var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-xl) var(--space-lg)',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      <span style={{ position: 'relative', color: 'var(--muted)', display: 'flex' }}>
        <Icon name={icon} size="46px" />
        <span style={{ position: 'absolute', right: -4, bottom: -4, color: 'var(--text2)', background: 'var(--bg)', borderRadius: '50%', padding: 2, display: 'flex' }}>
          <Icon name="search" size="var(--icon-md)" />
        </span>
      </span>

      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
      {description && <div style={{ fontSize: 13, color: 'var(--text2)', maxWidth: 260 }}>{description}</div>}
      {action}
    </div>
  )
}
