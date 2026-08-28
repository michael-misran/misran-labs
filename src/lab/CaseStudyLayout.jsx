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

export default function CaseStudyLayout({ title, phases, children }) {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        fontFamily: "var(--font-body)",
        color: 'var(--text)',
        maxWidth: 880,
        margin: '0 auto',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: 'var(--text2)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 24,
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
          margin: '0 0 16px',
          lineHeight: 1.05,
        }}
      >
        {title}
      </h1>

      {phases && <PhaseCoverage phases={phases} />}

      {children}
    </div>
  )
}
