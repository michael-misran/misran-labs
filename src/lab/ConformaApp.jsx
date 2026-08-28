import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../design-system/SectionTitle'
import FieldLabel from '../design-system/FieldLabel'
import { useSecondarySidebar } from '../shell/SecondarySidebarContext'
import useIsMobile from '../shell/useIsMobile'
import {
  SECTIONS,
  STATUS_OPTIONS,
  statusMeta,
  CONTEXTE_OPTIONS,
  useConformaStudies,
  studyLabel,
  uploadModeOperatoire,
  BackToLab,
  Field,
  inputStyle,
  buttonStyle,
} from './conformaShared'

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="no-print" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 24, overflowX: 'auto' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: active === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
            color: active === tab.id ? 'var(--text)' : 'var(--text2)',
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: active === tab.id ? 600 : 400,
            padding: '10px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function Summary({ results }) {
  const counts = { oui: 0, partiel: 0, non: 0, '': 0 }
  Object.values(results).forEach((r) => { counts[r.statut ?? ''] = (counts[r.statut ?? ''] ?? 0) + 1 })

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
      {STATUS_OPTIONS.filter((s) => s.value).map((s) => (
        <div key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
          <span style={{ color: 'var(--text2)' }}>{s.label}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: 'var(--text)' }}>{counts[s.value]}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)', opacity: 0.5, flexShrink: 0 }} />
        <span style={{ color: 'var(--text2)' }}>À analyser</span>
        <span style={{ fontFamily: "var(--font-mono)", color: 'var(--text)' }}>{counts['']}</span>
      </div>
    </div>
  )
}

function AutoTextarea({ value, onChange, placeholder }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <>
      <textarea
        ref={ref}
        className="no-print"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={1}
        style={{ ...inputStyle, fontSize: 12, fontFamily: "var(--font-body)", resize: 'none', overflow: 'hidden' }}
      />
      {/* Fixed-height textareas can't reflow for print's different page width — show plain
          wrapped text instead, which sizes itself correctly at whatever width printing uses. */}
      <div
        className="print-only"
        style={{ ...inputStyle, fontSize: 12, fontFamily: "var(--font-body)", whiteSpace: 'pre-wrap', height: 'auto' }}
      >
        {value}
      </div>
    </>
  )
}

function LabeledField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <AutoTextarea value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

function ItemRow({ item, result, onChange }) {
  const meta = statusMeta(result.statut)
  return (
    <div
      style={{
        padding: '10px 0',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: 10, alignItems: 'start' }}>
        <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</div>

        <select
          value={result.statut}
          onChange={(e) => onChange({ ...result, statut: e.target.value })}
          style={{ ...inputStyle, color: meta.color, fontFamily: "var(--font-mono)", fontSize: 11 }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <LabeledField
        label="RÉFÉRENCE"
        placeholder="Référence (page, passage…)"
        value={result.reference}
        onChange={(e) => onChange({ ...result, reference: e.target.value })}
      />

      <LabeledField
        label="COMMENTAIRE"
        placeholder="Commentaire"
        value={result.commentaire}
        onChange={(e) => onChange({ ...result, commentaire: e.target.value })}
      />

      <LabeledField
        label="JUSTIFICATION DE L'ANALYSE"
        placeholder="Pourquoi ce statut — ce qui est couvert, ce qui manque…"
        value={result.justification}
        onChange={(e) => onChange({ ...result, justification: e.target.value })}
      />
    </div>
  )
}

function SectionBlock({ section, results, onItemChange }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle>{section.title}</SectionTitle>
      <div
        className="no-print"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 150px',
          gap: 10,
          padding: '0 0 6px',
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.06em',
        }}
      >
        <span>CRITÈRE</span>
        <span>STATUT</span>
      </div>
      {section.items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          result={results[item.id] ?? { statut: '', reference: '', justification: '', commentaire: '' }}
          onChange={(next) => onItemChange(item.id, next)}
        />
      ))}
    </div>
  )
}

export default function ConformaApp() {
  const { studies, activeId, setActiveId, data, save, createStudy, error, saving } = useConformaStudies()
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)
  const isMobile = useIsMobile()

  const tabs = studies.map((s) => ({ id: s.id, label: studyLabel(s) }))
  useSecondarySidebar(tabs, activeId, setActiveId)

  if (!data) {
    return <div style={{ padding: 40 }}>{error ? `Erreur : ${error}` : 'Chargement…'}</div>
  }

  const setField = (key, value) => save({ ...data, [key]: value })
  const setFooterField = (key, value) => save({ ...data, footer: { ...data.footer, [key]: value } })
  const setItemResult = (itemId, result) => save({ ...data, results: { ...data.results, [itemId]: result } })

  const processFiles = async (files) => {
    const pdfFiles = files.filter((f) => f.type === 'application/pdf')
    if (pdfFiles.length === 0) {
      if (files.length > 0) setUploadError('Le(s) fichier(s) doivent être des PDF')
      return
    }
    setUploading(true)
    setUploadError(null)
    try {
      const uploaded = []
      for (const file of pdfFiles) {
        const res = await uploadModeOperatoire(activeId, file)
        uploaded.push(res.filename)
      }
      const existing = data.uploadedFilenames ?? []
      const merged = [...existing, ...uploaded.filter((f) => !existing.includes(f))]
      await save({ ...data, uploadedFilenames: merged })
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleUpload = (e) => processFiles(Array.from(e.target.files ?? []))

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    processFiles(Array.from(e.dataTransfer.files ?? []))
  }

  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%', maxWidth: 980, margin: '0 auto' }}>
      <BackToLab />

      <div className="no-print" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
        <SectionTitle>Conforma — Mode Opératoire SS4</SectionTitle>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={buttonStyle} onClick={() => window.print()}>Export PDF</button>
          <button style={buttonStyle} onClick={createStudy}>+ Nouvelle étude</button>
        </div>
      </div>

      {isMobile && tabs.length > 0 && <TabBar tabs={tabs} active={activeId} onChange={setActiveId} />}

      {data.contexteDossier === 'appel-offre' && (
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--warning)', borderRadius: 20, padding: 16, marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--warning)', marginBottom: 6 }}>
            DOSSIER D'APPEL D'OFFRE
          </div>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            Le chantier n'est pas encore attribué : les données spécifiques au site (niveau d'empoussièrement mesuré,
            lieu, personnel affecté, références de traçabilité déchets…) sont normalement absentes à ce stade — un
            Non/Partiellement dessus n'indique pas une lacune de l'entreprise. Ce qui reste à évaluer pleinement, c'est
            la méthode : le cadre et le processus sont-ils décrits, même sans valeurs chiffrées finales.
          </div>
        </div>
      )}

      <div className="no-print" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: 16, marginBottom: 32 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--warning)', marginBottom: 6 }}>
          V0 — ANALYSE MANUELLE
        </div>
        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
          Pas d'appel API branché. Une fois le(s) document(s) uploadé(s) (mode opératoire, notice de poste, fiches
          processus…), demande à Claude Code (dans la session de dev) de les analyser — les statuts et références
          seront écrits ici. Fichiers actuels :{' '}
          <strong style={{ color: 'var(--text)' }}>
            {data.uploadedFilenames?.length ? data.uploadedFilenames.join(', ') : 'aucun'}
          </strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <Field label="Entreprise" value={data.entreprise} onChange={(e) => setField('entreprise', e.target.value)} />
        <Field label="Référence du mode opératoire" value={data.reference} onChange={(e) => setField('reference', e.target.value)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <FieldLabel>Contexte du dossier</FieldLabel>
          <select
            value={data.contexteDossier}
            onChange={(e) => setField('contexteDossier', e.target.value)}
            style={inputStyle}
          >
            {CONTEXTE_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <Field label="Date du mode opératoire" value={data.dateModeOperatoire} onChange={(e) => setField('dateModeOperatoire', e.target.value)} />
        <Field label="Date de l'analyse" value={data.dateAnalyse} onChange={(e) => setField('dateAnalyse', e.target.value)} />
        <Field label="Durée de l'analyse (min)" type="number" value={data.dureeAnalyseMinutes} onChange={(e) => setField('dureeAnalyseMinutes', e.target.value)} />
      </div>

      <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <input ref={fileInputRef} type="file" accept="application/pdf" multiple onChange={handleUpload} style={{ fontSize: 12, color: 'var(--text2)' }} />

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            flex: 1,
            minWidth: 220,
            padding: '10px 16px',
            borderRadius: 8,
            border: `1px dashed ${dragging ? 'var(--primary)' : 'var(--border)'}`,
            background: dragging ? 'var(--active-tint)' : 'var(--bg2)',
            color: dragging ? 'var(--text)' : 'var(--text2)',
            fontSize: 12,
            textAlign: 'center',
            transition: 'border-color 0.15s ease, background 0.15s ease',
          }}
        >
          Glisser-déposer un ou plusieurs PDF ici
        </div>
      </div>

      <div className="no-print" style={{ marginBottom: 32 }}>
        {uploading && <span style={{ fontSize: 12, color: 'var(--text2)' }}>Envoi…</span>}
        {uploadError && <span style={{ fontSize: 12, color: 'var(--error)' }}>{uploadError}</span>}
      </div>

      <Summary results={data.results} />

      {SECTIONS.map((section) => (
        <SectionBlock key={section.id} section={section} results={data.results} onItemChange={setItemResult} />
      ))}

      <div style={{ marginTop: 8 }}>
        <SectionTitle>Pied de page</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 8 }}>
          <Field label="Lecteur (médecin du travail)" value={data.footer.lecteur} onChange={(e) => setFooterField('lecteur', e.target.value)} />
          <Field label="Date de lecture" value={data.footer.dateLecture} onChange={(e) => setFooterField('dateLecture', e.target.value)} />
          <Field label="Signature" value={data.footer.signature} onChange={(e) => setFooterField('signature', e.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <FieldLabel>Commentaires</FieldLabel>
          <AutoTextarea
            value={data.footer.commentaires}
            onChange={(e) => setFooterField('commentaires', e.target.value)}
          />
        </div>
      </div>

      {error && <div style={{ marginTop: 24, fontSize: 12, color: 'var(--error)' }}>Erreur : {error}</div>}
      {saving && <div className="no-print" style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>Enregistrement…</div>}
    </div>
  )
}
