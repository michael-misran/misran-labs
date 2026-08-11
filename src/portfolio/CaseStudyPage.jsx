import { useParams, Link } from 'react-router-dom'
import { getCaseStudy } from './caseStudies'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const cs = getCaseStudy(slug)

  if (!cs || !cs.component) {
    return (
      <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: '#7a9bb5' }}>
        <p style={{ marginBottom: 16 }}>Case study introuvable ou pas encore publiée.</p>
        <Link to="/portfolio" style={{ color: '#25e2cc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          {'← Retour au portfolio'}
        </Link>
      </div>
    )
  }

  const Component = cs.component
  return <Component />
}
