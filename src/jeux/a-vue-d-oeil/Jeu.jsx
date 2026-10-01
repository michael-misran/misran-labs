import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../../shell/LanguageContext'
import { numeroDuJour, generateurDuJour } from '../socle/jour'
import { lireResultat, enregistrerResultat, serie } from '../socle/serie'
import ResultatPartage from '../socle/ResultatPartage'
import { jt } from '../jeuxText'
import { TYPES } from './types'
import { calculerScore, ecartAffichagePourcent, emojiEcart, flecheEcart } from './score'
import { genererReponsesSimulees } from './distribution'
import Courbe from './Courbe'

const DUREE_MS = 5000
// SITE_URL dupliqué depuis scripts/share-previews.js, comme dans
// socle/partage.js : non importable côté navigateur.
const SITE_URL = 'https://misran-labs.vercel.app'

function formatNombre(n, lang) {
  return n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')
}

// Texte de partage propre à ce jeu (D6) : format fixe qui ne correspond pas
// à construireTextePartage du socle (pas de barre 10 cases, score non
// chiffré, seulement l'écart). On ne donne jamais la vraie valeur.
function construireTexte({ jeu, numero, type, lang, resultat, jours }) {
  const domaine = SITE_URL.replace(/^https?:\/\//, '')
  const ecartTexte = formatNombre(Math.round(resultat.ecart), lang)
  const fleche = resultat.fleche ? ` ${resultat.fleche}` : ''
  const lignes = [
    `${jeu.titre[lang]} n° ${numero} ${jeu.icone}`,
    `${type.nom[lang]} : ${resultat.emoji}${fleche} (${lang === 'fr' ? 'écart' : 'off by'} ${ecartTexte} %)`,
  ]
  if (jours > 0) lignes.push(jt(lang, 'serieJours', jours))
  lignes.push(`${domaine}/jeux/${jeu.slug}`)
  return lignes.join('\n')
}

export default function Jeu({ jeu, date }) {
  const { lang } = useLanguage()
  const numero = numeroDuJour(date)
  const type = TYPES[((numero % TYPES.length) + TYPES.length) % TYPES.length]

  // Génération une fois par jour (D2) : la valeur et le dessin ne bougent
  // plus ensuite, y compris après un rechargement de page.
  const { valeur, Svg } = useMemo(() => {
    const rng = generateurDuJour(jeu.slug, date)
    return type.generer(rng)
  }, [jeu.slug, date, type])

  // Graine distincte de celle de l'image (slug suffixé) : la distribution
  // simulée ne doit pas réutiliser la même suite de nombres (D5).
  const reponsesSimulees = useMemo(
    () => genererReponsesSimulees(generateurDuJour(`${jeu.slug}-courbe`, date), valeur),
    [jeu.slug, date, valeur],
  )

  const resultatSauvegarde = useMemo(() => lireResultat(jeu.slug, date), [jeu.slug, date])
  const jours = useMemo(() => serie(jeu.slug, date), [jeu.slug, date])

  const [etape, setEtape] = useState(resultatSauvegarde ? 'resultat' : 'pret')
  const [reponse, setReponse] = useState('')
  const [resultat, setResultat] = useState(() =>
    resultatSauvegarde ? { score: resultatSauvegarde.score, ...resultatSauvegarde.detail } : null,
  )
  const [restant, setRestant] = useState(1)
  const debutRef = useRef(null)
  const rafRef = useRef(null)

  // Barre de temps (D3) : requestAnimationFrame plutôt que setInterval, pour
  // une barre fluide. Le chrono ne démarre qu'au clic sur « Je suis prêt ».
  useEffect(() => {
    if (etape !== 'regarder') return undefined
    debutRef.current = performance.now()
    function tick() {
      const ecoule = performance.now() - debutRef.current
      const fraction = Math.max(0, 1 - ecoule / DUREE_MS)
      setRestant(fraction)
      if (fraction <= 0) {
        setEtape('reponse')
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [etape])

  function demarrer() {
    setRestant(1)
    setEtape('regarder')
  }

  function valider(e) {
    e.preventDefault()
    const valeurReponse = Number(reponse)
    if (reponse.trim() === '' || !Number.isFinite(valeurReponse)) return
    const score = calculerScore(type, valeur, valeurReponse)
    const ecart = ecartAffichagePourcent(type, valeur, valeurReponse)
    const emoji = emojiEcart(type, valeur, valeurReponse)
    const fleche = flecheEcart(valeurReponse, valeur)
    const detail = { typeId: type.id, valeur, reponse: valeurReponse, ecart, emoji, fleche }
    enregistrerResultat(jeu.slug, date, score, detail)
    setResultat({ score, ...detail })
    setEtape('resultat')
  }

  const texteAPartager = resultat ? construireTexte({ jeu, numero, type, lang, resultat, jours }) : ''

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, margin: '0 0 var(--space-2xs)', color: 'var(--text)' }}>
        {type.nom[lang]}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 var(--space-md)' }}>
        {type.question[lang]}
      </p>

      <div
        role="img"
        aria-label={lang === 'fr' ? 'Image à estimer' : 'Image to estimate'}
        style={{
          position: 'relative',
          background: 'var(--bg2)',
          borderRadius: 'var(--radius-md)',
          border: 'var(--border-thin) solid var(--border)',
          overflow: 'hidden',
          maxWidth: 320,
          margin: '0 auto',
        }}
      >
        {etape === 'pret' ? (
          <div
            style={{
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button type="button" onClick={demarrer} style={boutonPrincipal}>
              {lang === 'fr' ? 'Je suis prêt' : "I'm ready"}
            </button>
          </div>
        ) : (
          <div style={{ filter: etape === 'reponse' ? 'blur(14px)' : 'none', transition: 'filter 0.5s ease' }}>
            <Svg />
          </div>
        )}

        {etape === 'regarder' && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'var(--bg3)' }}>
            <div style={{ height: '100%', width: `${restant * 100}%`, background: 'var(--primary)', transition: 'width 0.05s linear' }} />
          </div>
        )}
      </div>

      {etape === 'reponse' && (
        <form onSubmit={valider} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            {lang === 'fr' ? `Ta réponse (${type.unite.fr})` : `Your guess (${type.unite.en})`}
            <input
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              style={{
                display: 'block',
                margin: 'var(--space-xs) auto 0',
                width: 140,
                textAlign: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: 22,
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                border: 'var(--border-thin) solid var(--border)',
                background: 'var(--bg2)',
                color: 'var(--text)',
              }}
            />
          </label>
          <button type="submit" style={boutonPrincipal}>
            {lang === 'fr' ? 'Valider' : 'Submit'}
          </button>
        </form>
      )}

      {etape === 'resultat' && resultat && (
        <div style={{ marginTop: 'var(--space-md)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', textAlign: 'center' }}>
            {lang === 'fr'
              ? `La vraie valeur était ${formatNombre(resultat.valeur, lang)} ${type.unite.fr}, tu as répondu ${formatNombre(resultat.reponse, lang)}.`
              : `The true value was ${formatNombre(resultat.valeur, lang)} ${type.unite.en}, you answered ${formatNombre(resultat.reponse, lang)}.`}
          </p>

          <ResultatPartage score={resultat.score} jours={jours} texte={texteAPartager} />

          <Courbe
            reponses={reponsesSimulees}
            vraie={resultat.valeur}
            reponseJoueur={resultat.reponse}
            unite={type.unite[lang]}
            lang={lang}
          />
        </div>
      )}
    </div>
  )
}

const boutonPrincipal = {
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  padding: 'var(--space-sm) var(--space-lg)',
  borderRadius: 'var(--radius-pill)',
  border: 'none',
  background: 'var(--primary-surface)',
  color: 'var(--on-primary-surface)',
  cursor: 'pointer',
}
