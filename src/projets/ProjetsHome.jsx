import { useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { CaseMasthead, CaseMetaRow, CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { ProjetsHero, StatusFilter, FicheBristol } from './ProjetsParts'
import { PROJ_TEXT, STATUTS } from './projetsText'
import { getIdeas } from './idees'
import SuivreBandeau from '../suivre/SuivreBandeau'

const STATUT_KEYS = Object.keys(STATUTS)

export default function ProjetsHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = PROJ_TEXT[lang].home
  const chrome = CASE_CHROME[lang]
  const ideas = getIdeas()
  const [actifs, setActifs] = useState(() => new Set(STATUT_KEYS))

  function toggleStatut(statut) {
    setActifs((prev) => {
      // Tout est affiché : le premier clic isole le statut choisi
      if (prev.size === STATUT_KEYS.length) return new Set([statut])
      const next = new Set(prev)
      if (next.has(statut)) next.delete(statut)
      else next.add(statut)
      // Plus aucun statut coché : on revient à « tout »
      return next.size === 0 ? new Set(STATUT_KEYS) : next
    })
  }

  const counts = {}
  for (const statut of STATUT_KEYS) {
    counts[statut] = ideas.filter((idee) => idee.statut === statut).length
  }

  const visible = ideas.filter((idee) => actifs.has(idee.statut))
  const allActive = actifs.size === STATUT_KEYS.length

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead
        c={{ fileNo: t.fileNo, mastheadCenter: t.mastheadCenter, mastheadRight: t.mastheadRight, mastheadRightSub: t.mastheadRightSub }}
        lang={lang}
      />

      <ProjetsHero number="◇" title={t.title} subtitle={t.subtitle}>
        <CaseMetaRow
          columns={[
            { label: t.countLabel, value: ideas.length },
            { label: t.cadenceLabel, value: t.cadenceValue },
            { label: t.decisionLabel, value: t.decisionValue },
          ]}
        />
      </ProjetsHero>

      <p style={{ maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', margin: '0 0 var(--space-sm)' }}>
        {t.concept}
      </p>
      <Link to="/projets/fonctionnement" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-xl)' }}>
        {t.howLink}
      </Link>

      <div style={{ marginBottom: 'var(--space-xs)' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>
          {t.filterLabel}
        </div>
        <div role="group" aria-label={t.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
          {STATUT_KEYS.map((statut) => (
            <StatusFilter
              key={statut}
              statut={statut}
              count={counts[statut]}
              active={!allActive && actifs.has(statut)}
              lang={lang}
              onClick={() => toggleStatut(statut)}
            />
          ))}
          {!allActive && (
            <button
              type="button"
              onClick={() => setActifs(new Set(STATUT_KEYS))}
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '7px var(--space-2xs)' }}
            >
              {t.showAll}
            </button>
          )}
        </div>
      </div>

      <div aria-live="polite" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', margin: 'var(--space-md) 0 var(--space-xs)' }}>
        {t.resultLabel(visible.length, ideas.length)}
      </div>

      <SectionTitle>{t.registerTitle}</SectionTitle>

      {ideas.length === 0 ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--muted)' }}>{t.empty}</p>
      ) : visible.length === 0 ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--muted)' }}>
          {t.emptyFiltered}{' '}
          <button
            type="button"
            onClick={() => setActifs(new Set(STATUT_KEYS))}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
          >
            {t.showAll}
          </button>
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
          {visible.map((idee) => (
            <FicheBristol key={idee.id} idee={idee} lang={lang} />
          ))}
        </div>
      )}

      <SuivreBandeau rubrique="projets" />

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
