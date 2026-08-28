import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FieldLabel from '../design-system/FieldLabel'
import { inputStyle, buttonStyle } from './maiaShared'

export { inputStyle, buttonStyle }

// Trame réelle : SIST BTP Seine & Marne — Mode Opératoire SS4 (art. R.4412-146
// du Code du travail, travaux exposant à l'amiante, sous-section 4).
// Intitulés repris mot pour mot — ils renvoient à des articles réglementaires précis.
export const SECTIONS = [
  {
    id: 'localisation',
    title: 'Localisation et nature des travaux',
    items: [
      { id: 'loc-description', label: 'Description' },
    ],
  },
  {
    id: 'materiaux',
    title: 'Matériaux concernés',
    items: [
      { id: 'mat-description', label: 'Description' },
    ],
  },
  {
    id: 'empoussierement',
    title: "Niveau d'empoussièrement",
    items: [
      { id: 'emp-estimation', label: "Estimation d'empoussièrement (R4412-98)" },
      { id: 'emp-prelevement-operateur', label: 'Prélèvement sur opérateur prévus durant les phases opérationnelles' },
      { id: 'emp-prelevement-environnemental', label: 'Prélèvement environnementaux prévus durant les opérationnelles' },
      { id: 'emp-frequence', label: 'Fréquence et nombre de contrôle précisés' },
    ],
  },
  {
    id: 'organisation',
    title: 'Organisation du travail, moyens techniques, prévention collective',
    items: [
      { id: 'org-processus', label: 'Les processus opérationnels sont-ils décrits' },
      { id: 'org-moyens', label: 'Les moyens techniques sont-ils décrits' },
      { id: 'org-prevention', label: 'La prévention collective est-elle décrite, suffisante (R4412-108,109)' },
      { id: 'org-phases', label: 'Les différentes phases des processus sont-elles décrites' },
    ],
  },
  {
    id: 'protection',
    title: 'Les équipements de protection',
    items: [
      { id: 'epi-decrits', label: 'Les équipements de protection sont-ils décrits et adaptés' },
      { id: 'epi-relation-empoussierement', label: "Sont-ils en relation avec le niveau d'empoussièrement" },
      { id: 'epi-individuel', label: 'Les équipements de protection individuel sont-ils décrit' },
      { id: 'epi-adapte', label: "Sont adaptés au niveau d'empoussièrement" },
    ],
  },
  {
    id: 'decontamination',
    title: 'Les procédures de décontamination',
    items: [
      { id: 'decon-salarie', label: 'La procédure de décontamination du salarié est-elle décrite et détaillée' },
      { id: 'decon-materiel', label: "La procédure de décontamination du matériel est-elle décrite et détaillée avec l'estimation du niveau d'empoussièrement à ce moment" },
    ],
  },
  {
    id: 'notices',
    title: 'Les notices de postes (Art R4412-145, 39)',
    items: [
      { id: 'notice-existe', label: "Existe-t-il une notice de poste pour chaque opération exposant le salarié à l'amiante" },
      { id: 'notice-procedes', label: 'Les procédés sont-ils simples, clairs et synthétiques' },
      { id: 'notice-intitule', label: "L'intitulé du poste et la situation de travail sont-ils précisés" },
      { id: 'notice-empoussierement', label: "Le niveau d'empoussièrement est-il précisé" },
      { id: 'notice-risques', label: 'Les risques sont-ils énoncés et clairs' },
      { id: 'notice-protection-collective', label: 'Les moyens de protection collective sont-ils bien indiqués' },
      { id: 'notice-epi', label: 'Les EPI sont-ils bien indiqués' },
      { id: 'notice-hygiene', label: "Les règles d'hygiène sont-elles bien indiquées et claires" },
      { id: 'notice-urgence', label: "Les mesures d'urgence sont-elles indiquées" },
    ],
  },
  {
    id: 'dechets',
    title: 'Gestion des déchets',
    items: [
      { id: 'dechets-emballage', label: "La procédure d'emballage des déchets avec les normes des contenant existe-t-elle" },
      { id: 'dechets-evacuation', label: "L'évacuation, le stockage et le devenir des déchets sont-ils décrits" },
    ],
  },
  {
    id: 'durees',
    title: 'Durées des phases habillage/décontamination et temps de travail',
    items: [
      { id: 'duree-travail', label: 'La durée du temps de travail est-elle définie et correspond-elle à la courbe de Meyer' },
      { id: 'duree-vacations-nombre', label: 'Le nombre de vacations est-il défini et réglementaire' },
      { id: 'duree-vacation-conformite', label: "La durée de la vacation est-elle en conformité avec le taux d'empoussièrement" },
      { id: 'duree-pause', label: 'Le temps de pause est-il défini' },
      { id: 'duree-habillage', label: "Les temps d'habillage, douche et déshabillage est-il prévu et cohérent" },
    ],
  },
]

export const STATUS_OPTIONS = [
  { value: '', label: '— à analyser —', color: 'var(--muted)' },
  { value: 'oui', label: 'Oui', color: 'var(--primary)' },
  { value: 'partiel', label: 'Partiellement', color: 'var(--warning)' },
  { value: 'non', label: 'Non', color: 'var(--error)' },
]

export function statusMeta(value) {
  return STATUS_OPTIONS.find((s) => s.value === value) ?? STATUS_OPTIONS[0]
}

// Calibrates how an absent chantier-specific value should read: normal and
// expected in a tender response (no site assigned yet), or a real gap in an
// operational document meant to run an actual chantier.
export const CONTEXTE_OPTIONS = [
  { value: '', label: '— non précisé —' },
  { value: 'appel-offre', label: "Appel d'offre (dossier type / modèle)" },
  { value: 'chantier-reel', label: 'Chantier réel (document opérationnel)' },
]

export function contexteMeta(value) {
  return CONTEXTE_OPTIONS.find((c) => c.value === value) ?? CONTEXTE_OPTIONS[0]
}

function emptyResults() {
  const results = {}
  SECTIONS.forEach((section) => {
    section.items.forEach((item) => {
      results[item.id] = { statut: '', reference: '', justification: '', commentaire: '' }
    })
  })
  return results
}

export function emptyConformaData() {
  return {
    entreprise: '',
    reference: '',
    contexteDossier: '',
    dateModeOperatoire: '',
    dateAnalyse: '',
    dureeAnalyseMinutes: '',
    uploadedFilenames: [],
    results: emptyResults(),
    footer: { commentaires: '', lecteur: '', dateLecture: '', signature: '' },
  }
}

export function newStudyId() {
  return `etude-${Date.now().toString(36)}`
}

export function studyLabel(study) {
  const name = study.entreprise?.trim() || 'Nouvelle étude'
  return study.reference?.trim() ? `${name} · ${study.reference.trim()}` : name
}

// Manages the list of studies (one per company mode opératoire) plus the
// currently active one — mirrors the tab pattern used by DesignSystem.jsx,
// but the "tabs" are fetched studies instead of a static list.
export function useConformaStudies() {
  const [studies, setStudies] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const refreshList = () =>
    fetch('/api/conforma/studies')
      .then((r) => r.json())
      .then(setStudies)
      .catch((err) => setError(err.message))

  useEffect(() => {
    refreshList().then(() => {})
  }, [])

  useEffect(() => {
    if (studies === null) return
    if (studies.length === 0) {
      createStudy()
      return
    }
    if (!activeId) setActiveId(studies[0].id)
  }, [studies])

  useEffect(() => {
    if (!activeId) return
    setData(null)
    fetch(`/api/conforma/studies/${activeId}`)
      .then((r) => r.json())
      .then((loaded) => setData(loaded ?? emptyConformaData()))
      .catch((err) => setError(err.message))
  }, [activeId])

  const save = async (next) => {
    if (!activeId) return
    setData(next)
    setSaving(true)
    try {
      await fetch(`/api/conforma/studies/${activeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
      refreshList()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const createStudy = async () => {
    const id = newStudyId()
    const blank = emptyConformaData()
    await fetch(`/api/conforma/studies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blank),
    })
    await refreshList()
    setActiveId(id)
    setData(blank)
  }

  return { studies: studies ?? [], activeId, setActiveId, data, save, createStudy, error, saving }
}

export async function uploadModeOperatoire(studyId, file) {
  const res = await fetch(`/api/conforma/studies/${studyId}/upload?filename=${encodeURIComponent(file.name)}`, {
    method: 'POST',
    headers: { 'Content-Type': file.type || 'application/pdf' },
    body: file,
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export function BackToLab() {
  return (
    <Link
      to="/"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: 'var(--text2)',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: 24,
      }}
    >
      ← Lab
    </Link>
  )
}

export function Field({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <FieldLabel>{label}</FieldLabel>
      <input style={inputStyle} {...props} />
    </div>
  )
}
