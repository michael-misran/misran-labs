import { useParams, Link } from 'react-router-dom'
import { getProject } from './projects'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project || !project.component) {
    return (
      <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: '#7a9bb5' }}>
        <p style={{ marginBottom: 16 }}>Projet introuvable ou pas encore publié.</p>
        <Link to="/" style={{ color: '#25e2cc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          {'← Retour au lab'}
        </Link>
      </div>
    )
  }

  const Component = project.component
  return <Component project={project} />
}
