import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FieldLabel from '../design-system/FieldLabel'

export function useJarvisData(domain) {
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/jarvis/${domain}`)
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => setError(err.message))
  }, [domain])

  const save = async (next) => {
    setItems(next)
    try {
      await fetch(`/api/jarvis/${domain}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return { items, save, error }
}

export const inputStyle = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  color: 'var(--text)',
  fontFamily: "var(--font-body)",
  fontSize: 13,
  padding: '7px 10px',
}

export const buttonStyle = {
  background: 'var(--active-tint)',
  border: '1px solid var(--primary)',
  borderRadius: 4,
  color: 'var(--primary)',
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  padding: '7px 14px',
  cursor: 'pointer',
}

export const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 4,
  marginBottom: 6,
}

export function Switch({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 34,
          height: 20,
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: checked ? 'var(--primary)' : 'var(--bg2)',
          position: 'relative',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'background 0.15s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 1,
            left: checked ? 15 : 1,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: checked ? 'var(--bg)' : 'var(--muted)',
            transition: 'left 0.15s ease',
          }}
        />
      </button>
      {label && <FieldLabel>{label}</FieldLabel>}
    </label>
  )
}

export const CONTRACT_TYPES = [
  { value: 'abonnement', label: 'Abonnement', color: 'var(--primary)' },
  { value: 'assurance-auto', label: 'Assurance auto', color: 'var(--cyan)' },
  { value: 'assurance-habitation', label: 'Assurance habitation', color: 'var(--violet)' },
  { value: 'assurance-vie', label: 'Assurance vie', color: 'var(--pink)' },
  { value: 'autre', label: 'Autre', color: 'var(--muted)' },
]

export function contractType(value) {
  return CONTRACT_TYPES.find((t) => t.value === value) ?? CONTRACT_TYPES[0]
}

export function TypeBadge({ value }) {
  const t = contractType(value)
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: t.color,
        border: `1px solid ${t.color}`,
        background: `color-mix(in srgb, ${t.color} 12%, transparent)`,
        borderRadius: 4,
        padding: '2px 8px',
        whiteSpace: 'nowrap',
      }}
    >
      {t.label}
    </span>
  )
}

export function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date(new Date().toDateString())
  return Math.round(diff / 86400000)
}

export const APPLICATION_STATUSES = [
  { value: 'to_process', label: 'À traiter', color: 'var(--cyan)' },
  { value: 'not_applying', label: 'Ne pas postuler', color: 'var(--muted)' },
  { value: 'sent', label: 'Envoyée', color: 'var(--warning)' },
  { value: 'interview', label: 'Entretien', color: 'var(--violet)' },
  { value: 'offer', label: 'Offre reçue', color: 'var(--primary)' },
  { value: 'rejected', label: 'Refusée', color: 'var(--error)' },
]

export function BackToMaia() {
  return (
    <Link
      to="/maia"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: 'var(--text2)',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: 24,
      }}
    >
      ← MAIA
    </Link>
  )
}
