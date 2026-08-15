import { useParams, Link } from 'react-router-dom'
import { getProject } from './projects'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { lang } = useLanguage()

  if (!project || !project.component) {
    return (
      <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
        <p style={{ marginBottom: 16 }}>{t(lang, 'projectNotFound')}</p>
        <Link to="/" style={{ color: 'var(--teal)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          {t(lang, 'backToLabLink')}
        </Link>
      </div>
    )
  }

  const Component = project.component
  return <Component project={project} />
}
