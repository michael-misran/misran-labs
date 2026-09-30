// Petits composants partagés par la page d'audit (AuditTokens) et ses blocs.
import { FORMAT_LABEL_MONO } from './styles'

export function Bouton({ children, onClick, principal = false, disabled = false, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        ...style,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: principal ? 'var(--on-primary-surface)' : 'var(--text)',
        background: principal ? 'var(--primary-surface)' : 'var(--bg3)',
        border: `var(--border-thin) solid ${principal ? 'var(--primary-surface)' : 'var(--border)'}`,
        padding: 'var(--space-xs) 14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: principal ? 700 : 400,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Tuile({ label, valeur, note }) {
  return (
    <div style={{ flex: '1 1 130px', border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: 'var(--space-xs-plus) var(--space-sm)' }}>
      <div style={FORMAT_LABEL_MONO}>{label}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 24, color: 'var(--text)', lineHeight: 1.2 }}>{valeur}</div>
      {note && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)' }}>{note}</div>}
    </div>
  )
}
