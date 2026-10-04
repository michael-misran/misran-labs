import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { dossierNo } from './projects'
import { Stamp, Barcode } from '../design-system/ArchiveMarks'
import { t } from '../i18n/ui'
import { KRAFT, CASE_CHROME } from './caseChrome'
import { TamponDeclassifie, OngletClasseur } from './DossierParts'

// Gabarit commun des fiches d'archive, devenu l'habillage « dossier
// confidentiel » de la refonte kiosque (D3) : une chemise kraft en tête, des
// champs tapés à la machine, des onglets de classeur, un pied de document.
// Les exports et leurs props ne changent pas : toute page qui les
// utilisait avant continue de fonctionner sans modification — seul le
// rendu change.

export function CaseMasthead({ c, lang }) {
  const chrome = CASE_CHROME[lang] ?? CASE_CHROME.fr

  return (
    <div
      style={{
        background: KRAFT.chemise,
        border: 'var(--border-regular) solid var(--border)',
        padding: '14px 18px',
        marginBottom: 'var(--space-lg)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-md)',
        flexWrap: 'wrap',
        color: 'var(--text)',
      }}
    >
      <div>
        <Link to="/lab" style={{ fontFamily: "var(--font-machine)", fontSize: 12, color: 'var(--text)', textDecoration: 'none' }}>
          {t(lang, 'backToLab')}
        </Link>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 15, letterSpacing: '0.03em', color: 'var(--text)', marginTop: 'var(--space-2xs)' }}>
          {c.fileNo}
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.1em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {c.mastheadCenter}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, color: 'var(--text)' }}>{c.mastheadRight}</div>
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 10, color: 'var(--text2)' }}>{c.mastheadRightSub}</div>
        </div>
        <TamponDeclassifie barre={chrome.tamponBarre} bas={chrome.tamponBas} size="petit" />
      </div>
    </div>
  )
}

// Rangée de méta-données bordée sous le titre — période, outils, rôle...
// `columns`: [{ label, value }] pour une valeur simple, ou
// [{ label, chips: [...] }] pour une liste de puces mono. Devient un
// tableau de champs tapés (D3) : « LABEL : valeur », police machine.
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
          <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: col.chips ? 6 : 'var(--space-2xs)' }}>
            {col.label} :
          </div>
          {col.chips ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {col.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "var(--font-machine)",
                    fontSize: 12,
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
  const isMobile = useIsMobile()
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', borderTop: '4px solid var(--titre-lab)', marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', padding: '18px var(--space-lg)', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-machine)",
              fontSize: 22,
              lineHeight: 1.1,
              color: 'var(--titre-lab)',
            }}
          >
            {dossierNo(project?.slug) ?? '—'}
          </span>
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)' }}>
              {c.title}
            </h1>
            {c.role && (
              <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, letterSpacing: '0.02em', color: 'var(--text2)' }}>{c.role}</div>
            )}
          </div>
        </div>
        {/* Tampon masqué sur mobile : il coinçait le titre dans une colonne étroite */}
        {!isMobile && <Stamp label={c.stampLabel ?? 'MISRAN · LABS · ARCHIVE ·'} size={72} />}
      </div>

      {children}
    </div>
  )
}

// Onglets du dossier — devenus des onglets de classeur kraft (D3) : celui
// qu'on ouvre est sur papier blanc, les autres restent en kraft, légèrement
// en retrait comme des intercalaires fermés.
export function CaseTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 'var(--space-3xs)', marginBottom: 'var(--space-xs)', overflowX: 'auto' }}>
      {tabs.map((tab, i) => (
        <OngletClasseur key={tab.id} index={i} active={active === tab.id} onClick={() => onChange(tab.id)}>
          {tab.label}
        </OngletClasseur>
      ))}
    </div>
  )
}

export function CaseFooter({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 40, paddingTop: 'var(--space-md)', borderTop: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.03em', color: 'var(--muted)' }}>
        {c.docId} — {c.clearance}
      </div>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, letterSpacing: '0.01em', color: 'var(--text)', textAlign: 'center', flex: '1 1 240px' }}>
        {c.tagline}
      </div>
      <Barcode />
    </div>
  )
}
