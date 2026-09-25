import CaseStudyLayout, { Section } from './CaseStudyLayout'
import { LinkButton } from '../design-system/kit'
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
          <LinkButton to={`/lab/${project.slug}/demo`} trailing="→">
            {t(lang, 'seeDemo')}
          </LinkButton>
        </Section>
      )}
    </CaseStudyLayout>
  )
}
