export const PHASES = {
  fr: [
    { id: 'business',    label: 'Étude business' },
    { id: 'research',    label: 'Recherche & cadrage' },
    { id: 'design',      label: 'Product design' },
    { id: 'validation',  label: 'Validation' },
    { id: 'feasibility', label: 'Faisabilité technique' },
    { id: 'development', label: 'Développement' },
    { id: 'qa',          label: 'QA / tests' },
    { id: 'launch',      label: 'Lancement' },
    { id: 'iteration',   label: 'Itération' },
  ],
  en: [
    { id: 'business',    label: 'Business case' },
    { id: 'research',    label: 'Research & framing' },
    { id: 'design',      label: 'Product design' },
    { id: 'validation',  label: 'Validation' },
    { id: 'feasibility', label: 'Technical feasibility' },
    { id: 'development', label: 'Development' },
    { id: 'qa',          label: 'QA / testing' },
    { id: 'launch',      label: 'Launch' },
    { id: 'iteration',   label: 'Iteration' },
  ],
}

// One color per Méthode step (Observation, Hypothèse, Expérimentation, Analyse, Conclusion).
// A step falls back to STATUS.skipped's gray whenever it hasn't been done.
export const METHOD_STEP_COLORS = [
  'var(--mandarine)',
  'var(--violet)',
  'var(--warning)',
  'var(--primary)',
  'var(--pink)',
]

export const STATUS = {
  fr: {
    done:    { label: 'Fait',            color: 'var(--primary)' },
    partial: { label: 'Partiel',         color: 'var(--warning)' },
    skipped: { label: 'Non applicable',  color: 'var(--muted)' },
  },
  en: {
    done:    { label: 'Done',            color: 'var(--primary)' },
    partial: { label: 'Partial',         color: 'var(--warning)' },
    skipped: { label: 'Not applicable',  color: 'var(--muted)' },
  },
}
