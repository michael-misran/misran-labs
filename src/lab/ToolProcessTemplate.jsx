import { Link } from 'react-router-dom'
import CaseStudyLayout, { Section } from './CaseStudyLayout'
import { pt } from './projects'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function ToolProcessTemplate({ project }) {
  const { lang } = useLanguage()
  const { title, summary, tags } = pt(project, lang)

  return (
    <CaseStudyLayout
      title={title}
      role={t(lang, 'soloExploration')}
      tools={tags}
      phases={project.phases}
    >
      <Section title={t(lang, 'context')}>
        <p>{summary}</p>
      </Section>

      <Section title={t(lang, 'process')}>
        <p>{t(lang, 'soloExplorationBody')}</p>
      </Section>

      {project.demoComponent && (
        <Section title={t(lang, 'result')}>
          <Link
            to={`/lab/${project.slug}/demo`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: 'var(--teal)',
              textDecoration: 'none',
            }}
          >
            {t(lang, 'seeDemo')}
          </Link>
        </Section>
      )}
    </CaseStudyLayout>
  )
}
