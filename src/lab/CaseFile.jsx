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
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 24, flexWrap: 'wrap' }}>
      <div>
        <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {t(lang, 'backToLab')}
        </Link>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 4 }}>{c.fileNo}</div>
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
            padding: '12px 24px',
            borderRight: i < columns.length - 1 ? 'var(--border-thin) solid var(--border)' : 'none',
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: col.chips ? 6 : 4 }}>
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
                    padding: '3px 8px',
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
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '18px 24px', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
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
const TAB_TINTS = [
  'color-mix(in srgb, var(--mandarine) 20%, var(--bg3))',
  'color-mix(in srgb, var(--violet) 16%, var(--bg3))',
  'color-mix(in srgb, var(--pink) 16%, var(--bg3))',
  'color-mix(in srgb, var(--warning) 18%, var(--bg3))',
  'color-mix(in srgb, var(--cyan) 16%, var(--bg3))',
]

export function CaseTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 2, marginBottom: 8, overflowX: 'auto' }}>
      {tabs.map((tab, i) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 40, paddingTop: 16, borderTop: 'var(--border-regular) solid var(--border)' }}>
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

// Textes de bandeau/pied de page communs à toute fiche — seul le numéro,
// le titre et le tampon changent d'une page à l'autre. Un projet fusionne
// ceci avec son propre contenu (title, role, stampLabel, docId...).
export const CASE_CHROME = {
  fr: {
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    periodLabel: 'PÉRIODE',
    toolsLabel: 'OUTILS',
    roleLabel: 'RÔLE',
  },
  en: {
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    periodLabel: 'PERIOD',
    toolsLabel: 'TOOLS',
    roleLabel: 'ROLE',
  },
}
