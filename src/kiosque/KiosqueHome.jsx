import { useLanguage } from '../shell/LanguageContext'
import { getDays } from '../breves/jours'
import { getIssues } from '../magazine/numeros'
import { listeJeux } from '../jeux/registre'
import { visibleProjects } from '../lab/projects'
import { FEEDS } from '../suivre/suivreText'
import { KIOSQUE_TEXT } from './kiosqueText'
import { SectionTitreKiosque, GazetteALaUne, Presentoirs, Bulletin } from './KiosqueParts'

// Le kiosque de la maison d'édition (D2) : la Gazette du jour à la une,
// une couverture par titre sur les présentoirs, un bulletin d'abonnement.
// Tout en données réelles, bilingue. /lab garde ArchiveHome (App.jsx).
export default function KiosqueHome() {
  const { lang } = useLanguage()
  const t = KIOSQUE_TEXT[lang]
  const day = getDays()[0]
  const issue = getIssues()[0]
  const jeux = listeJeux()
  const nbProjets = visibleProjects().length

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px 60px' }}>
      {/* CSS impossible en style inline : survol des couvertures (désactivé
          sous prefers-reduced-motion), lettrine de la Gazette, case à
          cocher du bulletin, clignotement d'INSERT COIN. */}
      <style>{`
        .kiq-dropcap p:first-child::first-letter,
        .kiq-dropcap::first-letter {
          float: left;
          font-family: var(--font-bois-3);
          font-size: 58px;
          line-height: 0.9;
          border: 3px solid var(--border);
          padding: 6px 8px 0;
          margin: 4px 10px 0 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .kiq-couv-link:hover .kiq-couv {
            transform: translateY(-10px) rotate(-1deg);
            box-shadow: 10px 16px 0 var(--primitive-encre-a18);
            transition: transform .18s, box-shadow .18s;
          }
        }
        .kiq-case::before { content: "☐"; font-size: 22px; line-height: 1; }
        .kiq-case:hover::before { content: "☒"; }
        @keyframes kiq-clignote { 50% { opacity: 0; } }
        .kiq-insert { animation: kiq-clignote 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .kiq-insert { animation: none; }
        }
      `}</style>

      {day && (
        <>
          <SectionTitreKiosque title={t.sections.alaUne.title} subtitle={t.sections.alaUne.subtitle} />
          <GazetteALaUne day={day} lang={lang} t={t} />
        </>
      )}

      <SectionTitreKiosque title={t.sections.presentoirs.title} subtitle={t.sections.presentoirs.subtitle} />
      <Presentoirs lang={lang} t={t} issue={issue} jeux={jeux} nbProjets={nbProjets} />

      <Bulletin lang={lang} t={t} feeds={FEEDS} />
    </div>
  )
}
