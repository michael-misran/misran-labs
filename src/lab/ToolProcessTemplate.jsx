import { Section } from './CaseStudyLayout'
import { CaseMasthead, CaseHero, CaseMetaRow, CaseFooter, CASE_CHROME } from './CaseFile'
import PhaseCoverage from './PhaseCoverage'
import { LinkButton } from '../design-system/kit'
import { pt, dossierNo } from './projects'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'
import useIsMobile from '../shell/useIsMobile'

export default function ToolProcessTemplate({ project }) {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const { title, summary, tags } = pt(project, lang)
  const chrome = CASE_CHROME[lang] ?? CASE_CHROME.fr
  const no = dossierNo(project.slug) ?? '—'

  const c = {
    title,
    role: t(lang, 'soloExploration'),
    fileNo: lang === 'fr' ? `DOSSIER Nº ${no}` : `FILE Nº ${no}`,
    mastheadCenter: chrome.mastheadCenter,
    mastheadRight: chrome.mastheadRight,
    mastheadRightSub: chrome.mastheadRightSub,
    docId: `${lang === 'fr' ? 'ID DOSSIER' : 'DOCUMENT ID'} — ML-ARCHIVE-${no}`,
    clearance: chrome.clearance,
    tagline: chrome.tagline,
  }

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c}>
        <CaseMetaRow columns={[{ label: chrome.toolsLabel, chips: tags }]} />
      </CaseHero>

      {project.phases && <PhaseCoverage phases={project.phases} />}

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

      <CaseFooter c={c} />
    </div>
  )
}
