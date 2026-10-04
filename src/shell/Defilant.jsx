import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { getDays } from '../breves/jours'
import { getIssues } from '../magazine/numeros'
import { listeJeux } from '../jeux/registre'
import { visibleProjects } from '../lab/projects'

function dernierTitreBreveIA(lang) {
  const jour = getDays()[0]
  const breve = jour?.breves.find((b) => b.rubrique === 'ia') ?? jour?.breves[0]
  return breve ? (breve.titre[lang] ?? breve.titre.fr) : null
}

function dernierTitreMagazine(lang) {
  const numero = getIssues()[0]
  return numero ? (numero.titre[lang] ?? numero.titre.fr) : null
}

function nomsJeux(lang) {
  return listeJeux()
    .map((jeu) => jeu.titre[lang] ?? jeu.titre.fr)
    .join(', ')
}

export default function Defilant() {
  const { lang } = useLanguage()

  const segments = [
    { id: 'gazette', couleur: 'var(--titre-gazette)', titre: t(lang, 'navTitreGazettePrefix') + t(lang, 'navTitreGazetteInitiale') + t(lang, 'navTitreGazetteReste'), texte: dernierTitreBreveIA(lang) },
    { id: 'magazine', couleur: 'var(--titre-magazine)', titre: t(lang, 'navTitreMagazine'), texte: dernierTitreMagazine(lang) },
    { id: 'jeux', couleur: 'var(--titre-jeux)', titre: t(lang, 'navTitreJeux'), texte: `${t(lang, 'defilantJeuxIntro')} : ${nomsJeux(lang)}` },
    { id: 'lab', couleur: 'var(--titre-lab)', titre: t(lang, 'navTitreLab'), texte: t(lang, 'defilantLabTexte', visibleProjects().length) },
  ].filter((segment) => segment.texte)

  const item = (segment, suffixe) => (
    <span key={`${segment.id}-${suffixe}`}>
      <b style={{ color: segment.couleur }}>{segment.titre}</b>
      {' — '}
      {segment.texte}
      <i aria-hidden="true" style={{ fontStyle: 'normal', margin: '0 22px' }}>✦</i>
    </span>
  )

  return (
    <div
      className="no-print"
      aria-hidden="true"
      style={{
        background: 'var(--text)',
        color: 'var(--bg)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <style>{`
        .defilant-piste { display: inline-block; animation: defilant-scroll 60s linear infinite; }
        .defilant-piste:hover { animation-play-state: paused; }
        @keyframes defilant-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .defilant-piste { animation: none; }
        }
      `}</style>
      <div
        className="defilant-piste"
        style={{
          padding: '11px 0',
          fontFamily: 'var(--font-etiquette)',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {segments.map((segment) => item(segment, 1))}
        {segments.map((segment) => item(segment, 2))}
      </div>
    </div>
  )
}
