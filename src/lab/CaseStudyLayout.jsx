import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import PhaseCoverage from './PhaseCoverage'
import DSSection from '../design-system/Section'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export function Section({ title, children }) {
  return (
    <DSSection title={title}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--prose)', lineHeight: 1.7 }}>
        {children}
      </div>
    </DSSection>
  )
}

// Liste à puces au format de lecture des case studies.
export function BulletList({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  )
}

// Période, rôle et outils d'un projet. Chaque case study passait déjà
// role / period / tools à CaseStudyLayout, mais rien ne les affichait :
// les trois infos étaient silencieusement ignorées. C'est ici qu'elles vivent
// maintenant, donc toutes les pages les récupèrent d'un coup.
function ProjectMeta({ role, period, tools }) {
  if (!role && !period && !(tools && tools.length)) return null

  return (
    <div style={{ marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {period && (
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, color: 'var(--muted)', letterSpacing: '0.03em' }}>
          {period}
        </div>
      )}
      {role && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--text2)' }}>{role}</div>
      )}
      {tools && tools.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          {tools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-machine)",
                fontSize: 12,
                color: 'var(--text2)',
                border: 'var(--border-thin) solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: '3px var(--space-xs)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CaseStudyLayout({ title, role, period, tools, phases, children }) {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()

  return (
    <div
      style={{
        padding: isMobile ? 'var(--space-md-plus)' : 40,
        fontFamily: "var(--font-body)",
        color: 'var(--text)',
        maxWidth: 880,
        margin: '0 auto',
      }}
    >
      <Link
        to="/lab"
        style={{
          fontFamily: "var(--font-machine)",
          fontSize: 12,
          color: 'var(--text2)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 'var(--space-lg)',
        }}
      >
        {t(lang, 'backToLab')}
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 var(--space-md)',
          lineHeight: 1.05,
          borderLeft: '4px solid var(--titre-lab)',
          paddingLeft: 'var(--space-sm)',
        }}
      >
        {title}
      </h1>

      <ProjectMeta role={role} period={period} tools={tools} />

      {phases && <PhaseCoverage phases={phases} />}

      {children}
    </div>
  )
}
