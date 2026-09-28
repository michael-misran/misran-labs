import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MagazineMasthead } from '../magazine/MagazineParts'
import { CaseFooter, CASE_CHROME } from '../lab/CaseFile'
import { ProjetsHero } from './ProjetsParts'
import { FONCT_TEXT } from './fonctionnementText'

export default function ProjetsFonctionnement() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = FONCT_TEXT[lang]
  const chrome = CASE_CHROME[lang]

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/projets"
        backLabel={t.backLabel}
        fileNo={t.fileNo}
        center={t.mastheadCenter}
        right={t.mastheadRight}
        rightSub={t.mastheadRightSub}
      />

      <ProjetsHero number={t.heroNumber} title={t.title} subtitle={t.subtitle} />

      <Link to="/projets" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {t.backToList}
      </Link>

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
