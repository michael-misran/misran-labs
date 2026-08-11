import { Link } from 'react-router-dom'
import CaseStudyLayout, { Section } from './CaseStudyLayout'

export default function ToolProcessTemplate({ project }) {
  return (
    <CaseStudyLayout
      title={project.title}
      role="Solo — exploration lab"
      tools={project.tags}
      phases={project.phases}
    >
      <Section title="Contexte">
        <p>{project.summary}</p>
      </Section>

      <Section title="Process">
        <p>
          Exploration rapide en solo, sans process formalisé au-delà des étapes marquées ci-dessus —
          voir la carte de couverture pour le détail de ce qui a été fait, partiel, ou volontairement
          non applicable sur ce projet.
        </p>
      </Section>

      {project.demoComponent && (
        <Section title="Résultat">
          <Link
            to={`/lab/${project.slug}/demo`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#25e2cc',
              textDecoration: 'none',
            }}
          >
            {'Voir la démo →'}
          </Link>
        </Section>
      )}
    </CaseStudyLayout>
  )
}
