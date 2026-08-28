import { useState } from 'react'
import Section from '../design-system/Section'
import { useJarvisData, inputStyle, buttonStyle, rowStyle, Switch, daysUntil, BackToMaia } from './maiaShared'

export default function MAIAFactures() {
  const { items, save, error } = useJarvisData('bills')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [reminderDaysBefore, setReminderDaysBefore] = useState(3)
  const [formError, setFormError] = useState('')

  const addBill = (e) => {
    e.preventDefault()
    if (!name || !dueDate) {
      setFormError('Le nom et la date d\'échéance sont obligatoires.')
      return
    }
    setFormError('')
    save([
      ...(items ?? []),
      {
        id: crypto.randomUUID(),
        name,
        amount: Number(amount) || 0,
        dueDate,
        status: 'pending',
        reminderEnabled,
        reminderDaysBefore: reminderEnabled ? Number(reminderDaysBefore) : null,
      },
    ])
    setName('')
    setAmount('')
    setDueDate('')
    setReminderEnabled(false)
    setReminderDaysBefore(3)
  }

  const toggleStatus = (id) => save(items.map((it) => (it.id === id ? { ...it, status: it.status === 'pending' ? 'paid' : 'pending' } : it)))
  const remove = (id) => save(items.filter((it) => it.id !== id))

  const pending = items?.filter((it) => it.status === 'pending') ?? []
  const paid = items?.filter((it) => it.status === 'paid') ?? []

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <BackToMaia />
      <Section title="Factures">
        <form onSubmit={addBill} style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <input style={{ ...inputStyle, flex: 2, minWidth: 160 }} placeholder="Nom (ex: EDF)" value={name} onChange={(e) => setName(e.target.value)} />
          <input style={{ ...inputStyle, width: 100 }} type="number" step="0.01" min={0} placeholder="Montant €" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Switch checked={reminderEnabled} onChange={setReminderEnabled} label="Rappel" />
          {reminderEnabled && (
            <input style={{ ...inputStyle, width: 90 }} type="number" min={0} value={reminderDaysBefore} onChange={(e) => setReminderDaysBefore(e.target.value)} title="Jours de rappel avant" />
          )}
          <button style={buttonStyle} type="submit">Ajouter</button>
        </form>

        {formError && <p style={{ color: 'var(--error)', fontSize: 12, marginBottom: 8 }}>{formError}</p>}
        {error && <p style={{ color: 'var(--error)', fontSize: 12 }}>{error}</p>}
        {items === null && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Chargement…</p>}

        {pending.length > 0 && (
          <>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--warning)', marginBottom: 6 }}>EN ATTENTE ({pending.length})</p>
            {pending.map((it) => {
              const remindersOn = it.reminderEnabled !== false && it.reminderDaysBefore != null
              const d = remindersOn ? daysUntil(it.dueDate) : null
              const soon = d !== null && d <= it.reminderDaysBefore
              return (
                <div key={it.id} style={rowStyle}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', flex: 1 }}>{it.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: soon ? 'var(--warning)' : 'var(--text2)' }}>
                    {it.amount.toFixed(2)}€ · éch. {it.dueDate}{soon ? ` · dans ${d} j` : ''}
                  </span>
                  <button onClick={() => toggleStatus(it.id)} style={{ ...buttonStyle, padding: '4px 10px' }}>Payée</button>
                  <button onClick={() => remove(it.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }} aria-label="Supprimer">✕</button>
                </div>
              )
            })}
          </>
        )}

        {paid.length > 0 && (
          <>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', margin: '16px 0 6px' }}>PAYÉES ({paid.length})</p>
            {paid.map((it) => (
              <div key={it.id} style={{ ...rowStyle, opacity: 0.6 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', flex: 1, textDecoration: 'line-through' }}>{it.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)' }}>{it.amount.toFixed(2)}€</span>
                <button onClick={() => toggleStatus(it.id)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text2)', cursor: 'pointer', fontSize: 11, padding: '4px 10px' }}>Ré-ouvrir</button>
                <button onClick={() => remove(it.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }} aria-label="Supprimer">✕</button>
              </div>
            ))}
          </>
        )}

        {items?.length === 0 && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Aucune facture.</p>}
      </Section>
    </div>
  )
}
