import { useParams, Link } from 'react-router-dom'
import { getProject } from './projects'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function ProjectDemoPage() {
  const { slug, version } = useParams()
  const project = getProject(slug)
  const { lang } = useLanguage()

  const Demo = version === 'v2' ? project?.demoComponentV2 : project?.demoComponent

  if (!project || !Demo) {
    return (
      <div style={{ padding: 40, fontFamily: "var(--font-body)", color: 'var(--text2)' }}>
        <p style={{ marginBottom: 16 }}>{t(lang, 'demoNotFound')}</p>
        <Link to={`/lab/${slug}`} style={{ color: 'var(--primary)', fontFamily: "var(--font-mono)", fontSize: 12 }}>
          {t(lang, 'backToProjectLink')}
        </Link>
      </div>
    )
  }

  return <Demo />
}
