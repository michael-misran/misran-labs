import { useState } from 'react'
import Section from '../design-system/Section'
import FieldLabel from '../design-system/FieldLabel'
import { useJarvisData, inputStyle, buttonStyle, rowStyle, Switch, APPLICATION_STATUSES, BackToMaia } from './maiaShared'

export default function MAIACandidatures() {
  const { items, save, error } = useJarvisData('jobApplications')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [role, setRole] = useState('')
  const [sentDate, setSentDate] = useState('')
  const [status, setStatus] = useState('to_process')
  const [notes, setNotes] = useState('')
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [reminderDaysBefore, setReminderDaysBefore] = useState(14)
  const [formError, setFormError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState(null)

  const startEdit = (it) => {
    setEditingId(it.id)
    setEditDraft({ ...it, reminderDaysBefore: it.reminderDaysBefore ?? 14 })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setEditDraft(null)
  }
  const setDraftField = (field, value) => setEditDraft((d) => ({ ...d, [field]: value }))
  const saveEdit = () => {
    if (!editDraft.company) return
    save(items.map((it) => (it.id === editingId
      ? { ...editDraft, reminderDaysBefore: editDraft.reminderEnabled ? Number(editDraft.reminderDaysBefore) : null }
      : it)))
    setEditingId(null)
    setEditDraft(null)
  }

  const addApplication = (e) => {
    e.preventDefault()
    if (!company) {
      setFormError("L'entreprise est obligatoire.")
      return
    }
    setFormError('')
    save([
      ...(items ?? []),
      {
        id: crypto.randomUUID(),
        company,
        contact,
        role,
        sentDate,
        status,
        notes,
        reminderEnabled,
        reminderDaysBefore: reminderEnabled ? Number(reminderDaysBefore) : null,
      },
    ])
    setCompany('')
    setContact('')
    setRole('')
    setSentDate('')
    setStatus('to_process')
    setNotes('')
    setReminderEnabled(false)
    setReminderDaysBefore(14)
  }

  const updateStatus = (id, newStatus) => save(items.map((it) => (it.id === id ? { ...it, status: newStatus } : it)))
  const remove = (id) => save(items.filter((it) => it.id !== id))

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <BackToMaia />
      <Section title="Candidatures">
        <form onSubmit={addApplication} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input style={{ ...inputStyle, flex: 2, minWidth: 160 }} placeholder="Entreprise" value={company} onChange={(e) => setCompany(e.target.value)} />
            <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="Poste" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <FieldLabel>Date d'envoi</FieldLabel>
              <input style={inputStyle} type="date" value={sentDate} onChange={(e) => setSentDate(e.target.value)} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 160 }}>
              <FieldLabel>Statut</FieldLabel>
              <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                {APPLICATION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
            <Switch checked={reminderEnabled} onChange={setReminderEnabled} label="Relance" />
            {reminderEnabled && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 90 }}>
                <FieldLabel>Jours avant</FieldLabel>
                <input style={inputStyle} type="number" min={0} value={reminderDaysBefore} onChange={(e) => setReminderDaysBefore(e.target.value)} />
              </label>
            )}
            <button style={{ ...buttonStyle, alignSelf: 'flex-end' }} type="submit">Ajouter</button>
          </div>
          <input style={inputStyle} placeholder="Notes (optionnel)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </form>

        {formError && <p style={{ color: 'var(--error)', fontSize: 12, marginBottom: 8 }}>{formError}</p>}
        {error && <p style={{ color: 'var(--error)', fontSize: 12 }}>{error}</p>}
        {items === null && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Chargement…</p>}
        {items?.length === 0 && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Aucune candidature.</p>}

        {APPLICATION_STATUSES.map((s) => {
          const group = items?.filter((it) => it.status === s.value) ?? []
          if (group.length === 0) return null
          return (
            <div key={s.value} style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: s.color, marginBottom: 6 }}>
                {s.label.toUpperCase()} ({group.length})
              </p>
              {group.map((it) => {
                if (editingId === it.id) {
                  return (
                    <div key={it.id} style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input style={{ ...inputStyle, flex: 2, minWidth: 160 }} placeholder="Entreprise" value={editDraft.company} onChange={(e) => setDraftField('company', e.target.value)} />
                        <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="Contact" value={editDraft.contact} onChange={(e) => setDraftField('contact', e.target.value)} />
                        <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="Poste" value={editDraft.role} onChange={(e) => setDraftField('role', e.target.value)} />
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
                          <FieldLabel>Date d'envoi</FieldLabel>
                          <input style={inputStyle} type="date" value={editDraft.sentDate} onChange={(e) => setDraftField('sentDate', e.target.value)} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 160 }}>
                          <FieldLabel>Statut</FieldLabel>
                          <select style={inputStyle} value={editDraft.status} onChange={(e) => setDraftField('status', e.target.value)}>
                            {APPLICATION_STATUSES.map((s2) => <option key={s2.value} value={s2.value}>{s2.label}</option>)}
                          </select>
                        </label>
                        <Switch checked={editDraft.reminderEnabled} onChange={(v) => setDraftField('reminderEnabled', v)} label="Relance" />
                        {editDraft.reminderEnabled && (
                          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 90 }}>
                            <FieldLabel>Jours avant</FieldLabel>
                            <input style={inputStyle} type="number" min={0} value={editDraft.reminderDaysBefore} onChange={(e) => setDraftField('reminderDaysBefore', e.target.value)} />
                          </label>
                        )}
                        <button onClick={saveEdit} style={{ ...buttonStyle, alignSelf: 'flex-end' }} type="button">Enregistrer</button>
                        <button onClick={cancelEdit} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text2)', cursor: 'pointer', fontSize: 11, padding: '7px 14px', alignSelf: 'flex-end' }} type="button">Annuler</button>
                      </div>
                      <input style={inputStyle} placeholder="Notes (optionnel)" value={editDraft.notes} onChange={(e) => setDraftField('notes', e.target.value)} />
                    </div>
                  )
                }

                return (
                  <div key={it.id} style={{ ...rowStyle, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', flex: 1, minWidth: 160 }}>
                      {it.company}
                      {it.role && <span style={{ color: 'var(--text2)' }}> · {it.role}</span>}
                      {it.contact && <span style={{ color: 'var(--text2)' }}> · {it.contact}</span>}
                      {it.notes && <div style={{ color: 'var(--text2)', fontSize: 11, marginTop: 2 }}>{it.notes}</div>}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)' }}>
                      {it.sentDate && `envoyée ${it.sentDate}`}
                    </span>
                    <select
                      value={it.status}
                      onChange={(e) => updateStatus(it.id, e.target.value)}
                      style={{ ...inputStyle, fontSize: 11, padding: '4px 8px' }}
                    >
                      {APPLICATION_STATUSES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <button onClick={() => startEdit(it)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }} aria-label="Modifier">✏️</button>
                    <button onClick={() => remove(it.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }} aria-label="Supprimer">✕</button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </Section>
    </div>
  )
}
