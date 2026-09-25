import { useEffect, useRef } from 'react'
import Icon from './Icon'
import Button from './Button'

// Modale de confirmation du kit. Élévation 4. Ferme à l'Échap, rend le focus
// à l'élément qui l'a ouverte, et l'action destructrice n'est jamais le
// bouton par défaut du clavier.

export default function Modal({ open, title, question, icon = 'alert', confirmLabel, cancelLabel, tone = 'danger', onConfirm, onCancel }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onCancel?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        background: 'var(--surface-raised)',
        boxShadow: 'var(--elev-4)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-lg)',
        maxWidth: 300,
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 18 }}>
        {title}
      </div>

      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 62,
          height: 62,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-inset)',
          boxShadow: 'var(--elev-inset)',
          color: 'var(--warning)',
          marginBottom: 18,
        }}
      >
        <Icon name={icon} size="30px" />
      </span>

      <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>{question}</div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button
          ref={cancelRef}
          onClick={onCancel}
          style={{
            background: 'var(--surface-raised)',
            color: 'var(--text)',
            border: 'var(--border-thin) solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--elev-2)',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 600,
            padding: '8px 18px',
            cursor: 'pointer',
          }}
        >
          {cancelLabel}
        </button>
        <Button tone={tone} size="sm" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </div>
  )
}
