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

// Barre d'onglets d'un case study. Une seule implémentation pour toutes les
// pages qui en ont une — avant, chaque case study gardait sa copie locale.
//
// La marque d'onglet actif est une croix de repérage d'imprimerie (✛)
// plutôt qu'un soulignement, et les onglets inactifs portent leur numéro
// d'ordre — un sommaire de planche, pas une barre d'onglets générique.
export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: 'var(--border-thin) solid var(--border)', marginBottom: 32, overflowX: 'auto' }}>
      {tabs.map((tab, i) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              color: isActive ? 'var(--text)' : 'var(--text2)',
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              padding: '10px 16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease, border-color 0.15s ease',
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: isActive ? 'var(--primary)' : 'var(--muted)',
              }}
            >
              {isActive ? '✛' : String(i + 1).padStart(2, '0')}
            </span>
            {tab.label}
          </button>
        )
      })}
    </div>
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
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
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
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: 'var(--text2)',
                border: 'var(--border-thin) solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: '3px 8px',
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

      <ProjectMeta role={role} period={period} tools={tools} />

      {phases && <PhaseCoverage phases={phases} />}

      {children}
    </div>
  )
}
