import { Link } from 'react-router-dom'
import { visibleProjects } from '../lab/projects'
import VisuallyHidden from '../components/VisuallyHidden'
import useIsMobile from '../shell/useIsMobile'
import ProjectCard from '../lab/ProjectCard'

export default function HomeModule() {
  const isMobile = useIsMobile()
  const projects = visibleProjects()

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "'Inter', sans-serif", color: '#e8f4f8' }}>
      <VisuallyHidden as="h1">Michael Misran — Product Designer & Lab</VisuallyHidden>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#25e2cc',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {'// LAB'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5' }}>
          {projects.length} projets · Misran Labs v2.0.0
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
