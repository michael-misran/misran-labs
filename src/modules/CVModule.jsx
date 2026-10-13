import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseMasthead, CaseHero, CaseFooter } from '../lab/CaseFile'
import { CV } from './cvDonnees'

// Titre de section en Special Elite (D6) — le "//" reste, c'est un repère
// visuel, pas un mot à traduire.
function SectionHeader({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xs)' }}>
      <span
        style={{
          fontFamily: "var(--font-machine)",
          fontSize: 12,
          color: 'var(--titre-lab)',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        {`// ${children.toUpperCase()}`}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.45 }}>
          <strong style={{ fontFamily: "var(--font-machine)", fontWeight: 400, color: 'var(--text)' }}>{item.label} : </strong>
          {item.text}
        </li>
      ))}
    </ul>
  )
}

// L'en-tête d'un rapport de mission (D5) : titre tapé, date à droite en
// vert --titre-lab.
function RoleHeader({ title, date, size = 13 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xs)', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "var(--font-machine)", fontSize: size + 1, color: 'var(--text)' }}>
        {title}
      </span>
      {date && (
        <span style={{ fontFamily: "var(--font-machine)", fontSize: 11, color: 'var(--titre-lab)', whiteSpace: 'nowrap' }}>
          {date}
        </span>
      )}
    </div>
  )
}

// Cadre photo vide façon dossier (D5) : trame diagonale, pas de photo de
// Michael (hors périmètre, à lui de décider plus tard).
function CadrePhoto({ label }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 68,
        height: 90,
        flexShrink: 0,
        border: 'var(--border-regular) solid var(--border)',
        background: 'repeating-linear-gradient(45deg, var(--bg2), var(--bg2) 6px, var(--bg3) 6px, var(--bg3) 7px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <span style={{ fontFamily: "var(--font-machine)", fontSize: 9, lineHeight: 1.25, color: 'var(--muted)', letterSpacing: '0.01em' }}>
        {label}
      </span>
    </div>
  )
}

// Un champ tapé "LABEL : valeur" (D5).
function ChampTape({ label, value }) {
  return (
    <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, color: 'var(--text2)' }}>
      <span style={{ color: 'var(--muted)' }}>{label} : </span>
      {value}
    </div>
  )
}


export default function CVModule({ project }) {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const c = CV[lang] ?? CV.fr

  return (
    <div
      style={{
        padding: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)',
        fontFamily: "var(--font-body)",
        color: 'var(--text)',
        maxWidth: 820,
        margin: '0 auto',
      }}
    >
      <CaseMasthead c={c} lang={lang} />

      <div
        style={{
          background: 'var(--titre-lab)',
          color: 'var(--on-primary-surface)',
          border: 'var(--border-regular) solid var(--border)',
          borderBottom: 'none',
          padding: isMobile ? '8px 14px' : '10px 18px',
          fontFamily: "var(--font-machine)",
          fontSize: 13,
          letterSpacing: '0.03em',
        }}
      >
        {c.bandeauAgent}
      </div>

      <CaseHero project={project} c={{ ...c, title: 'Michael Misran', role: c.subtitle }}>
        <div style={{ padding: 'var(--space-sm) var(--space-lg)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <CadrePhoto label={c.photoLabel} />
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.02em', color: 'var(--muted)', marginBottom: 6 }}>{c.contactLabel}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', fontSize: 12, color: 'var(--text2)', marginBottom: 10 }}>
              <span>{c.location}</span>
              <span>✉️ misranmichael@gmail.com</span>
              <span>📱 06 07 69 75 17</span>
              <a href="https://www.linkedin.com/in/michael-misran" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                🔗 LinkedIn
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px' }}>
              <ChampTape label={c.roleFieldLabel} value={c.subtitle} />
              <ChampTape label={c.specialtiesLabel} value={c.expertise.map((item) => item.label).join(' · ')} />
            </div>
          </div>
        </div>
      </CaseHero>

      {/* Profil */}
      <div style={{ marginBottom: 18 }}>
        <SectionHeader>{c.labels.profile}</SectionHeader>
        <p style={{ fontSize: 13, color: 'var(--prose)', lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: 'var(--text)' }}>{c.profileIntro}</strong>
          {c.profileRest}
        </p>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: 18 }}>
        <SectionHeader>{c.labels.expertise}</SectionHeader>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--space-xs) var(--space-lg)' }}>
          {c.expertise.map(item => (
            <div key={item.label} style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.45 }}>
              <strong style={{ color: 'var(--text)' }}>{item.label} : </strong>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Expérience */}
      <div style={{ marginBottom: 18 }}>
        <SectionHeader>{c.labels.experience}</SectionHeader>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 10, letterSpacing: '0.02em', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>
          {c.reportsKicker}
        </div>

        <div style={{ marginBottom: 14 }}>
          <RoleHeader title={c.concentrixTitle} date={c.concentrixDate} />
          <Bullets items={c.concentrixBullets} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <RoleHeader title={c.iadTitle} />

          <div style={{ paddingLeft: 'var(--space-md)', borderLeft: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-xs)' }}>
            <RoleHeader title={c.iadDesignTitle} date={c.iadDesignDate} size={13} />
            <Bullets items={c.iadDesignBullets} />
          </div>

          <div style={{ paddingLeft: 'var(--space-md)', borderLeft: 'var(--border-regular) solid var(--border)' }}>
            <RoleHeader title={c.iadDevTitle} date={c.iadDevDate} size={13} />
            <Bullets items={c.iadDevBullets} />
          </div>
        </div>

        <div>
          <RoleHeader title={c.planNetTitle} date={c.planNetDate} />
          <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.45, margin: 0 }}>
            {c.planNetText}
          </p>
        </div>
      </div>

      {/* Formation */}
      <div>
        <SectionHeader>{c.labels.education}</SectionHeader>
        <RoleHeader title={c.eduTitle} date={c.eduDate} />
        <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.45, margin: 0 }}>
          {c.eduText}
        </p>
      </div>

      <CaseFooter c={c} />
    </div>
  )
}
