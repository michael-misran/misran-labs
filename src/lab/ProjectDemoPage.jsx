import { useParams, Link } from 'react-router-dom'
import { getProject } from './projects'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function ProjectDemoPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { lang } = useLanguage()

  if (!project || !project.demoComponent) {
    return (
      <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
        <p style={{ marginBottom: 16 }}>{t(lang, 'demoNotFound')}</p>
        <Link to={`/lab/${slug}`} style={{ color: 'var(--teal)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          {t(lang, 'backToProjectLink')}
        </Link>
      </div>
    )
  }

  const Demo = project.demoComponent
  return <Demo />
}
