export const PHASES = [
  { id: 'business',    label: 'Étude business' },
  { id: 'research',    label: 'Recherche & cadrage' },
  { id: 'design',      label: 'Product design' },
  { id: 'validation',  label: 'Validation' },
  { id: 'feasibility', label: 'Faisabilité technique' },
  { id: 'development', label: 'Développement' },
  { id: 'qa',          label: 'QA / tests' },
  { id: 'launch',      label: 'Lancement' },
  { id: 'iteration',   label: 'Itération' },
]

export const STATUS = {
  done:    { label: 'Fait',            color: '#25e2cc' },
  partial: { label: 'Partiel',         color: '#f59e0b' },
  skipped: { label: 'Non applicable',  color: 'var(--muted)' },
}
