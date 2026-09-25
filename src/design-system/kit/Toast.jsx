import Icon from './Icon'

// Notification du kit. Élévation 3, empilable. Le type est porté par une
// icône et par le texte, pas seulement par la couleur.

const TONES = {
  success: { icon: 'check', color: 'var(--primary)' },
  info: { icon: 'info', color: 'var(--cyan)' },
  error: { icon: 'alert', color: 'var(--error)' },
}

export function Toast({ tone = 'info', children }) {
  const t = TONES[tone] ?? TONES.info

  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--surface-raised)',
        boxShadow: 'var(--elev-3)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text)',
      }}
    >
      <span style={{ flex: 1 }}>{children}</span>
      <span style={{ color: t.color, display: 'flex' }}><Icon name={t.icon} size="var(--icon-md)" /></span>
    </div>
  )
}

export function ToastStack({ children }) {
  return (
    <div aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {children}
    </div>
  )
}

export default Toast
