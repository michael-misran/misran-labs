import SectionTitle from './SectionTitle'

// Single source of truth for the gap between sections. Every section on the
// site — case-study Contexte/Méthode, wherever — goes through this so the
// spacing can never drift between them again.
export default function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  )
}
