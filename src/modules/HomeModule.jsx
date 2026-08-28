import { visibleProjects } from '../lab/projects'
import VisuallyHidden from '../components/VisuallyHidden'
import useIsMobile from '../shell/useIsMobile'
import ProjectCard from '../lab/ProjectCard'
import SectionTitle from '../design-system/SectionTitle'
import { STATUS, METHOD_STEP_COLORS } from '../lab/phases'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

const RULES_CONTENT = {
  fr: {
    title: 'Les règles du Lab',
    intro: "Chaque projet de ce Lab est documenté avec la même grille — les 5 étapes de la démarche scientifique. Le but : pouvoir raconter honnêtement où en est un projet, plutôt qu'une histoire plus belle que la réalité après coup.",
    steps: [
      { title: "L'Observation et la Problématique", desc: 'Un problème réel, observé, reformulé en question précise et vérifiable.' },
      { title: "L'Hypothèse", desc: 'Une réponse provisoire, formulée de façon réfutable — on doit pouvoir dire à l\'avance ce qui la contredirait.' },
      { title: "L'Expérimentation", desc: "Ce qui a été construit ou testé pour vérifier l'hypothèse." },
      { title: "L'Analyse des résultats", desc: 'Ce qui a été vérifié, honnêtement — y compris ce qui ne fonctionne pas encore.' },
      { title: "La Conclusion et l'Itération", desc: "Ce qu'on en tire, et la suite : itérer, arrêter, ou changer de piste." },
    ],
    statusLabel: 'STATUTS UTILISÉS',
  },
  en: {
    title: 'The Lab’s rules',
    intro: "Every project in this Lab is documented with the same framework — the 5 steps of the scientific method. The point: being able to honestly say where a project actually stands, rather than a nicer story told after the fact.",
    steps: [
      { title: 'Observation and the Problem', desc: 'A real problem, observed, reframed into a precise, checkable question.' },
      { title: 'The Hypothesis', desc: "A provisional answer, stated so it's falsifiable — you should be able to say in advance what would prove it wrong." },
      { title: 'Experimentation', desc: 'What was built or tested to check the hypothesis.' },
      { title: 'Analyzing the Results', desc: "What was actually verified, honestly — including what doesn't work yet." },
      { title: 'Conclusion and Iteration', desc: 'What comes out of it, and what’s next: iterate, stop, or change direction.' },
    ],
    statusLabel: 'STATUSES USED',
  },
}

function RuleStep({ n, color, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          marginTop: 6,
        }}
      />
      <div>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
          {n}. {title}
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
          {desc}
        </div>
      </div>
    </div>
  )
}

function LabRules({ lang }) {
  const c = RULES_CONTENT[lang] ?? RULES_CONTENT.fr
  const statusMap = STATUS[lang] ?? STATUS.fr

  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
      }}
    >
      <SectionTitle>{c.title}</SectionTitle>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--prose)', lineHeight: 1.6, marginBottom: 20, maxWidth: 640 }}>
        {c.intro}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {c.steps.map((step, i) => (
          <RuleStep key={i} n={i + 1} color={METHOD_STEP_COLORS[i]} title={step.title} desc={step.desc} />
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 8 }}>
        {c.statusLabel}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {Object.entries(statusMap).map(([key, s]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: s.color,
                flexShrink: 0,
                opacity: key === 'skipped' ? 0.5 : 1,
              }}
            />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--text2)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomeModule() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const projects = visibleProjects()

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)' }}>
      <VisuallyHidden as="h1">Michael Misran — Product Designer & Lab</VisuallyHidden>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: 'var(--primary)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {t(lang, 'lab')}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)' }}>
          {t(lang, 'projectsCount', projects.length)}
        </p>
      </div>

      <LabRules lang={lang} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
