import { visibleProjects } from '../lab/projects'
import VisuallyHidden from '../components/VisuallyHidden'
import useIsMobile from '../shell/useIsMobile'
import ProjectCard from '../lab/ProjectCard'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function HomeModule() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const projects = visibleProjects()

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "'Inter', sans-serif", color: 'var(--text)' }}>
      <VisuallyHidden as="h1">Michael Misran — Product Designer & Lab</VisuallyHidden>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--teal)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {t(lang, 'lab')}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text2)' }}>
          {t(lang, 'projectsCount', projects.length)}
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
