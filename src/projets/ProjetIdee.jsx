import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MagazineMasthead } from '../magazine/MagazineParts'
import { CaseMetaRow, CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import { ProjetsHero, StatusMark, PrivateNotes } from './ProjetsParts'
import { PROJ_TEXT, typeLabel, tailleLabel, formatDateShort } from './projetsText'
import { getIdea } from './idees'
import Fiole from '../shell/mascotte/Fiole'
import SuivreBandeau from '../suivre/SuivreBandeau'

function NotFound({ id, lang }) {
  const isMobile = useIsMobile()
  const t = PROJ_TEXT[lang].idee

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/projets"
        backLabel={t.backLabel}
        fileNo={t.notFoundFileNo}
        center={t.mastheadCenter}
        right={t.right}
        rightSub={t.notFoundRight}
      />

      <div style={{ border: 'var(--border-regular) solid var(--border)', padding: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', overflowWrap: 'anywhere' }}>
          {t.notFoundLabel} : {id}
        </div>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <Fiole scale={4} variant="toxique" sleeps={false} />
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', margin: 'var(--space-xs-plus) 0 var(--space-xs)' }}>
          {t.notFoundTitle}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--text2)', margin: '0 0 var(--space-md-plus)' }}>
          {t.notFoundBody}
        </p>
        <Link to="/projets" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', textDecoration: 'none' }}>
          {t.backToList}
        </Link>
      </div>
    </div>
  )
}

function MissionLink({ idee, lang }) {
  const t = PROJ_TEXT[lang].idee
  if (!idee.mission) return null

  return (
    <div style={{ borderTop: 'var(--border-thin) solid var(--border)', paddingTop: 'var(--space-sm)', marginTop: 14 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)', marginRight: 'var(--space-xs)' }}>{t.missionLabel}</span>
      {idee.statut === 'faite' ? (
        <a
          href={`https://github.com/michael-misran/misran-labs/tree/main/missions/${idee.mission}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: 3, overflowWrap: 'anywhere' }}
        >
          {idee.mission} <span aria-hidden="true" style={{ color: 'var(--primary)' }}>↗</span>
        </a>
      ) : (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text)', overflowWrap: 'anywhere' }}>{idee.mission}</span>
      )}
    </div>
  )
}

function DecisionBox({ idee, lang }) {
  const t = PROJ_TEXT[lang].idee

  return (
    <div style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: 'var(--space-md-plus)', maxWidth: 720 }}>
      {idee.decision ? (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-xs-plus)' }}>
            <StatusMark statut={idee.statut} lang={lang} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)' }}>
              {t.decisionOn(formatDateShort(idee.decision.date))}
            </span>
          </div>
          {idee.statut === 'arretee' && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--error)', letterSpacing: '0.06em', marginTop: 'var(--space-xs-plus)' }}>
              {t.stoppedReason}
            </div>
          )}
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--text)', margin: 'var(--space-xs-plus) 0 0' }}>
            {idee.decision.note[lang]}
          </p>
          <MissionLink idee={idee} lang={lang} />
        </>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-xs-plus)' }}>
          <StatusMark statut={idee.statut} lang={lang} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--text2)' }}>{t.awaitingDecision}</span>
        </div>
      )}
    </div>
  )
}

export default function ProjetIdee() {
  const { id } = useParams()
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = PROJ_TEXT[lang].idee
  const chrome = CASE_CHROME[lang]
  const idee = getIdea(id)

  if (!idee) return <NotFound id={id} lang={lang} />

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/projets"
        backLabel={t.backLabel}
        fileNo={`${lang === 'en' ? 'PROJECT' : 'PROJET'} ${idee.id}`}
        center={t.mastheadCenter}
        right={t.right}
        rightSub={formatDateShort(idee.date)}
      />

      <ProjetsHero number={idee.id} title={idee.titre[lang]} subtitle={t.proposedOn(formatDateShort(idee.date))}>
        <CaseMetaRow
          columns={[
            { label: t.typeLabel, value: typeLabel(idee.type, lang) },
            { label: t.tailleLabel, value: tailleLabel(idee.taille, lang) },
            { label: t.statutLabel, value: <StatusMark statut={idee.statut} lang={lang} size="md" /> },
          ]}
        />
      </ProjetsHero>

      <div style={{ maxWidth: 720, marginBottom: 40, borderLeft: 'var(--border-thick) solid var(--primary)', paddingLeft: isMobile ? 14 : 'var(--space-md-plus)' }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: isMobile ? 17 : 19, lineHeight: 1.5, color: 'var(--text)', margin: 0 }}>
          {idee.resume[lang]}
        </p>
      </div>

      <SectionTitle>{t.problemTitle}</SectionTitle>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', maxWidth: 720, margin: '0 0 var(--space-xl)' }}>
        {idee.probleme[lang]}
      </p>

      <SectionTitle>{t.ideaTitle}</SectionTitle>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', maxWidth: 720, margin: '0 0 var(--space-xl)' }}>
        {idee.idee[lang]}
      </p>

      <SectionTitle>{t.decisionTitle}</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <DecisionBox idee={idee} lang={lang} />
      </div>

      <div style={{ marginBottom: 40 }}>
        <PrivateNotes key={idee.id} id={idee.id} lang={lang} />
      </div>

      <Link to="/projets" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {t.backToList}
      </Link>

      <SuivreBandeau rubrique="projets" />

      <CaseFooter c={{ docId: `${t.docId}-${idee.id}`, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
