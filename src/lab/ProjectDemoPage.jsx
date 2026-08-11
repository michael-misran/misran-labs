import { useParams, Link } from 'react-router-dom'
import { getProject } from './projects'

export default function ProjectDemoPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project || !project.demoComponent) {
    return (
      <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: '#7a9bb5' }}>
        <p style={{ marginBottom: 16 }}>Démo introuvable pour ce projet.</p>
        <Link to={`/lab/${slug}`} style={{ color: '#25e2cc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          {'← Retour au projet'}
        </Link>
      </div>
    )
  }

  const Demo = project.demoComponent
  return <Demo />
}
