import { useState } from 'react'
import Section from '../design-system/Section'
import FieldLabel from '../design-system/FieldLabel'
import {
  useJarvisData, inputStyle, buttonStyle, rowStyle, Switch,
  CONTRACT_TYPES, TypeBadge, daysUntil, BackToMaia,
} from './maiaShared'

export default function MAIAContrats() {
  const { items, save, error } = useJarvisData('subscriptions')
  const [name, setName] = useState('')
  const [type, setType] = useState('abonnement')
  const [contractNumber, setContractNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [cancellationRequestDate, setCancellationRequestDate] = useState('')
  const [effectiveEndDate, setEffectiveEndDate] = useState('')
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [reminderDaysBefore, setReminderDaysBefore] = useState(7)
  const [formError, setFormError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState(null)

  const startEdit = (it) => {
    setEditingId(it.id)
    setEditDraft({ ...it, reminderDaysBefore: it.reminderDaysBefore ?? 7 })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setEditDraft(null)
  }
  const setDraftField = (field, value) => setEditDraft((d) => ({ ...d, [field]: value }))
  const saveEdit = () => {
    save(items.map((it) => (it.id === editingId
      ? { ...editDraft, reminderDaysBefore: editDraft.reminderEnabled ? Number(editDraft.reminderDaysBefore) : null }
      : it)))
    setEditingId(null)
    setEditDraft(null)
  }

  const addSubscription = (e) => {
    e.preventDefault()
    if (!name) {
      setFormError('Le nom est obligatoire.')
      return
    }
    setFormError('')
    save([
      ...(items ?? []),
      {
        id: crypto.randomUUID(),
        name,
        type,
        contractNumber,
        startDate,
        cancellationRequestDate,
        effectiveEndDate,
        reminderEnabled,
        reminderDaysBefore: reminderEnabled ? Number(reminderDaysBefore) : null,
      },
    ])
    setName('')
    setType('abonnement')
    setContractNumber('')
    setStartDate('')
    setCancellationRequestDate('')
    setEffectiveEndDate('')
    setReminderEnabled(false)
    setReminderDaysBefore(7)
  }

  const remove = (id) => save(items.filter((it) => it.id !== id))

  const groups = {}
  ;(items ?? []).forEach((it) => {
    if (!groups[it.name]) groups[it.name] = []
    groups[it.name].push(it)
  })
  const groupNames = Object.keys(groups)

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <BackToMaia />
      <Section title="Contrats">
        <form onSubmit={addSubscription} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input style={{ ...inputStyle, flex: 2, minWidth: 160 }} placeholder="Nom (ex: Navigo)" value={name} onChange={(e) => setName(e.target.value)} />
            <select style={{ ...inputStyle, flex: 1, minWidth: 160 }} value={type} onChange={(e) => setType(e.target.value)}>
              {CONTRACT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="N° de contrat" value={contractNumber} onChange={(e) => setContractNumber(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <FieldLabel>Début</FieldLabel>
              <input style={inputStyle} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <FieldLabel>Résiliation demandée</FieldLabel>
              <input style={inputStyle} type="date" value={cancellationRequestDate} onChange={(e) => setCancellationRequestDate(e.target.value)} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <FieldLabel>Fin effective</FieldLabel>
              <input style={inputStyle} type="date" value={effectiveEndDate} onChange={(e) => setEffectiveEndDate(e.target.value)} />
            </label>
            <Switch checked={reminderEnabled} onChange={setReminderEnabled} label="Rappel" />
            {reminderEnabled && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 90 }}>
                <FieldLabel>Jours avant</FieldLabel>
                <input style={inputStyle} type="number" min={0} value={reminderDaysBefore} onChange={(e) => setReminderDaysBefore(e.target.value)} />
              </label>
            )}
            <button style={{ ...buttonStyle, alignSelf: 'flex-end' }} type="submit">Ajouter</button>
          </div>
        </form>

        {formError && <p style={{ color: 'var(--error)', fontSize: 12, marginBottom: 8 }}>{formError}</p>}
        {error && <p style={{ color: 'var(--error)', fontSize: 12 }}>{error}</p>}
        {items === null && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Chargement…</p>}
        {items?.length === 0 && <p style={{ color: 'var(--text2)', fontSize: 12 }}>Aucun contrat.</p>}

        {groupNames.map((groupName) => {
          const group = groups[groupName].slice().sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))
          const isHistory = group.length > 1

          return (
            <div key={groupName} style={{ marginBottom: 14 }}>
              {isHistory && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>
                  {groupName.toUpperCase()} · HISTORIQUE ({group.length})
                </p>
              )}

              {group.map((it, idx) => {
                const isPast = isHistory && idx < group.length - 1

                if (editingId === it.id) {
                  return (
                    <div key={it.id} style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input style={{ ...inputStyle, flex: 2, minWidth: 160 }} placeholder="Nom" value={editDraft.name} onChange={(e) => setDraftField('name', e.target.value)} />
                        <select style={{ ...inputStyle, flex: 1, minWidth: 160 }} value={editDraft.type} onChange={(e) => setDraftField('type', e.target.value)}>
                          {CONTRACT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        <input style={{ ...inputStyle, flex: 1, minWidth: 140 }} placeholder="N° de contrat" value={editDraft.contractNumber} onChange={(e) => setDraftField('contractNumber', e.target.value)} />
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
                          <FieldLabel>Début</FieldLabel>
                          <input style={inputStyle} type="date" value={editDraft.startDate} onChange={(e) => setDraftField('startDate', e.target.value)} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
                          <FieldLabel>Résiliation demandée</FieldLabel>
                          <input style={inputStyle} type="date" value={editDraft.cancellationRequestDate} onChange={(e) => setDraftField('cancellationRequestDate', e.target.value)} />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
                          <FieldLabel>Fin effective</FieldLabel>
                          <input style={inputStyle} type="date" value={editDraft.effectiveEndDate} onChange={(e) => setDraftField('effectiveEndDate', e.target.value)} />
                        </label>
                        <Switch checked={editDraft.reminderEnabled} onChange={(v) => setDraftField('reminderEnabled', v)} label="Rappel" />
                        {editDraft.reminderEnabled && (
                          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 90 }}>
                            <FieldLabel>Jours avant</FieldLabel>
                            <input style={inputStyle} type="number" min={0} value={editDraft.reminderDaysBefore} onChange={(e) => setDraftField('reminderDaysBefore', e.target.value)} />
                          </label>
                        )}
                        <button onClick={saveEdit} style={{ ...buttonStyle, alignSelf: 'flex-end' }} type="button">Enregistrer</button>
                        <button onClick={cancelEdit} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text2)', cursor: 'pointer', fontSize: 11, padding: '7px 14px', alignSelf: 'flex-end' }} type="button">Annuler</button>
                      </div>
                    </div>
                  )
                }

                const remindersOn = it.reminderEnabled !== false && it.reminderDaysBefore != null
                const d = remindersOn && it.effectiveEndDate ? daysUntil(it.effectiveEndDate) : null
                const soon = d !== null && d <= it.reminderDaysBefore
                return (
                  <div key={it.id} style={{ ...rowStyle, flexWrap: 'wrap', opacity: isPast ? 0.55 : 1 }}>
                    <TypeBadge value={it.type} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', flex: 1, minWidth: 120 }}>
                      {it.name}
                      {it.contractNumber && <span style={{ color: 'var(--text2)' }}> · n° {it.contractNumber}</span>}
                      {isPast && <span style={{ color: 'var(--muted)' }}> · remplacé</span>}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: soon ? 'var(--warning)' : 'var(--text2)' }}>
                      {it.startDate && `début ${it.startDate} · `}
                      {it.cancellationRequestDate && `résiliation demandée ${it.cancellationRequestDate} · `}
                      {it.effectiveEndDate ? `fin effective ${it.effectiveEndDate}` : 'pas de date de fin renseignée'}
                      {remindersOn ? ` · rappel J-${it.reminderDaysBefore}` : ' · pas de rappel'}
                      {soon ? ` · dans ${d} j` : ''}
                    </span>
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
