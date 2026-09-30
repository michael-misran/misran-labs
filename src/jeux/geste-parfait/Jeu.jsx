import { useMemo, useState } from 'react'
import { useLanguage } from '../../shell/LanguageContext'
import { numeroDuJour, generateurDuJour } from '../socle/jour'
import { lireResultat, enregistrerResultat, serie } from '../socle/serie'
import { construireTextePartage, texteScoreAvecUnite } from '../socle/partage'
import ResultatPartage from '../socle/ResultatPartage'
import { jt } from '../jeuxText'
import Cercle from './defis/cercle'
import Chrono from './defis/chrono'
import Verre from './defis/verre'
import Tour from './defis/tour'

// Rotation des 4 défis (D8) : defis[numeroDuJour % 4].
const DEFIS = [
  {
    id: 'cercle',
    titre: { fr: 'Cercle parfait', en: 'Perfect circle' },
    consigne: {
      fr: 'Trace un cercle d’un seul geste, à la souris, au doigt ou au stylet.',
      en: 'Draw a circle in a single stroke, with your mouse, finger, or stylus.',
    },
    Composant: Cercle,
  },
  {
    id: 'chrono',
    titre: { fr: 'Chrono à l’aveugle', en: 'Blind timer' },
    consigne: {
      fr: 'Arrête le chrono à exactement 10,00 s. Le compteur s’efface après 3 s.',
      en: 'Stop the timer at exactly 10.00 s. The counter hides after 3 s.',
    },
    Composant: Chrono,
  },
  {
    id: 'verre',
    titre: { fr: 'Remplir le verre', en: 'Fill the glass' },
    consigne: {
      fr: 'Maintiens appuyé pour verser, relâche au bon niveau.',
      en: 'Hold to pour, release at the right level.',
    },
    Composant: Verre,
  },
  {
    id: 'tour',
    titre: { fr: 'Tour empilée', en: 'Stacked tower' },
    consigne: {
      fr: 'Clique, touche ou appuie sur Espace pour poser chaque bloc.',
      en: 'Click, tap, or press Space to drop each block.',
    },
    Composant: Tour,
  },
]

export default function Jeu({ jeu, date }) {
  const { lang } = useLanguage()
  const numero = numeroDuJour(date)
  const defi = DEFIS[((numero % DEFIS.length) + DEFIS.length) % DEFIS.length]
  const graine = useMemo(() => generateurDuJour(jeu.slug, date)(), [jeu.slug, date])

  // Initialisation paresseuse à partir des props : un changement de `date`
  // (uniquement en dev, ?date=) remonte le composant via la prop `key` posée
  // par JeuPage, ce qui réinitialise cet état sans effet de synchronisation.
  const [resultatOfficiel, setResultatOfficiel] = useState(() => lireResultat(jeu.slug, date))
  const [jours, setJours] = useState(() => serie(jeu.slug, date))
  const [entrainement, setEntrainement] = useState(false)
  const [resultatEntrainement, setResultatEntrainement] = useState(null)

  function onTermineOfficiel(score, detail) {
    enregistrerResultat(jeu.slug, date, score, detail)
    setResultatOfficiel({ score, detail })
    setJours(serie(jeu.slug, date))
  }

  function onTermineDefi(score, detail) {
    if (entrainement) {
      setResultatEntrainement({ score, detail })
    } else {
      onTermineOfficiel(score, detail)
    }
  }

  const texteAPartager =
    resultatOfficiel &&
    construireTextePartage({
      titreJeu: jeu.titre[lang],
      numero,
      icone: jeu.icone,
      ligneScore: `${defi.titre[lang]} : ${texteScoreAvecUnite(resultatOfficiel.score, lang)}`,
      score: resultatOfficiel.score,
      jours,
      slug: jeu.slug,
    })

  const montrerDefi = (!resultatOfficiel || entrainement) && !resultatEntrainement

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, margin: '0 0 var(--space-2xs)', color: 'var(--text)' }}>
        {defi.titre[lang]}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 var(--space-md)' }}>
        {defi.consigne[lang]}
      </p>

      {resultatOfficiel && !entrainement && (
        <>
          <ResultatPartage score={resultatOfficiel.score} jours={jours} texte={texteAPartager} />
          {jeu.entrainement && (
            <button type="button" onClick={() => setEntrainement(true)} style={boutonSecondaire}>
              {jt(lang, 'rejouerEntrainement')}
            </button>
          )}
        </>
      )}

      {montrerDefi && (
        <defi.Composant
          key={`${defi.id}-${entrainement ? 'entrainement' : 'officiel'}-${date}`}
          graine={graine}
          onTermine={onTermineDefi}
        />
      )}

      {entrainement && resultatEntrainement && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{jt(lang, 'modeEntrainement')}</p>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>
            {texteScoreAvecUnite(resultatEntrainement.score, lang)}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', marginTop: 'var(--space-md)' }}>
            <button type="button" onClick={() => setResultatEntrainement(null)} style={boutonSecondaire}>
              {jt(lang, 'rejouerEntrainement')}
            </button>
            <button type="button" onClick={() => setEntrainement(false)} style={boutonSecondaire}>
              {jt(lang, 'voirResultatDuJour')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const boutonSecondaire = {
  display: 'block',
  margin: 'var(--space-md) auto 0',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  padding: 'var(--space-xs) var(--space-md)',
  borderRadius: 'var(--radius-pill)',
  border: 'var(--border-thin) solid var(--border)',
  background: 'none',
  color: 'var(--primary)',
  cursor: 'pointer',
}
