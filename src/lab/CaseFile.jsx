import { Link } from 'react-router-dom'
import { dossierNo } from './projects'
import { Stamp, Barcode } from '../design-system/ArchiveMarks'
import { t } from '../i18n/ui'

// Gabarit commun des fiches d'archive — la même planche que la home et
// que le premier dossier migré (Design System multi-marques), extraite
// pour que chaque nouvelle fiche ne réécrive pas son masthead, son
// tampon et son cartouche de bas de page. Une page assemble
// CaseMasthead + CaseHero (+ CaseMetaRow) + éventuellement CaseTabs +
// son contenu + CaseFooter.

export function CaseMasthead({ c, lang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
      <div>
        <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {t(lang, 'backToLab')}
        </Link>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 'var(--space-2xs)' }}>{c.fileNo}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {c.mastheadCenter}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{c.mastheadRight}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{c.mastheadRightSub}</div>
      </div>
    </div>
  )
}

// Rangée de méta-données bordée sous le titre — période, outils, rôle...
// `columns`: [{ label, value }] pour une valeur simple, ou
// [{ label, chips: [...] }] pour une liste de puces mono.
export function CaseMetaRow({ columns }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {columns.map((col, i) => (
        <div
          key={col.label}
          style={{
            flex: col.grow === false ? '0 0 auto' : '1 1 220px',
            minWidth: col.grow === false ? 180 : undefined,
            padding: 'var(--space-sm) var(--space-lg)',
            borderRight: i < columns.length - 1 ? 'var(--border-thin) solid var(--border)' : 'none',
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: col.chips ? 6 : 'var(--space-2xs)' }}>
            {col.label}
          </div>
          {col.chips ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {col.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: 'var(--text2)',
                    border: 'var(--border-thin) solid var(--border)',
                    padding: '3px var(--space-xs)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{col.value}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export function CaseHero({ project, c, children }) {
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', padding: '18px var(--space-lg)', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1,
              color: 'var(--primary)',
            }}
          >
            {dossierNo(project?.slug) ?? '—'}
          </span>
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)' }}>
              {c.title}
            </h1>
            {c.role && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.04em', color: 'var(--text2)' }}>{c.role}</div>
            )}
          </div>
        </div>
        <Stamp label={c.stampLabel ?? 'MISRAN · LABS · ARCHIVE ·'} size={72} />
      </div>

      {children}
    </div>
  )
}

// Onglets du dossier — côte à côte, chacun avec sa propre teinte comme un
// intercalaire de tiroir d'archives. Celui qu'on ouvre se détache du lot
// (teinte neutre, à plat, marqué ✛) sans empiéter sur ses voisins.
//
// Les teintes sont des tokens de niveau composant (--case-tabs-tint-N,
// voir tokens.css) : ce sont les seules du site à en avoir besoin, donc
// la décision vit à côté des autres composants sans rôle sémantique, pas
// recalculée ici à chaque rendu.
const TAB_TINTS = [
  'var(--case-tabs-tint-1)',
  'var(--case-tabs-tint-2)',
  'var(--case-tabs-tint-3)',
  'var(--case-tabs-tint-4)',
  'var(--case-tabs-tint-5)',
]

export function CaseTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 'var(--space-3xs)', marginBottom: 'var(--space-xs)', overflowX: 'auto' }}>
      {tabs.map((tab, i) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2xs)',
              flexShrink: 0,
              background: isActive ? 'var(--bg2)' : TAB_TINTS[i % TAB_TINTS.length],
              border: 'var(--border-thin) solid var(--border)',
              borderBottom: isActive ? 'var(--border-regular) solid var(--primary)' : 'var(--border-thin) solid var(--border)',
              borderRadius: '3px 3px 0 0',
              padding: '6px 7px',
              cursor: 'pointer',
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--text)' : 'var(--text2)',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            <span style={{ color: isActive ? 'var(--primary)' : 'var(--muted)' }}>
              {isActive ? '✛' : String(i + 1).padStart(2, '0')}
            </span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export function CaseFooter({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 40, paddingTop: 'var(--space-md)', borderTop: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.06em', color: 'var(--muted)' }}>
        {c.docId} — {c.clearance}
      </div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', color: 'var(--text)', textAlign: 'center', flex: '1 1 240px' }}>
        {c.tagline}
      </div>
      <Barcode />
    </div>
  )
}
