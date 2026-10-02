import { useMemo, useState } from 'react'
import { useLanguage } from '../../shell/LanguageContext'
import { numeroDuJour } from '../socle/jour'
import { lireResultat, enregistrerResultat, serie } from '../socle/serie'
import ResultatPartage from '../socle/ResultatPartage'
import { jt } from '../jeuxText'
import questions from './questions.json'
import { trouverReponse } from './correspondance'

const CROIX_MAX = 3
// SITE_URL dupliqué depuis scripts/share-previews.js, comme dans
// socle/partage.js : non importable côté navigateur.
const SITE_URL = 'https://misran-labs.vercel.app'

// Texte de partage propre à ce jeu (D5) : une case par réponse (trouvée ou
// non), jamais de libellé. Ne réutilise pas construireTextePartage du socle
// (barre 10 cases non adaptée à N réponses).
function construireTexte({ jeu, numero, lang, reponses, trouvees, croix, score, jours }) {
  const domaine = SITE_URL.replace(/^https?:\/\//, '')
  const cases = reponses.map((_, i) => (trouvees.includes(i) ? '🟩' : '⬛')).join('')
  const lignes = [`${jeu.titre[lang]} n° ${numero} ${jeu.icone}`, `${cases} ${Math.round(score)} pts`]
  if (croix > 0) lignes.push('❌'.repeat(croix))
  if (jours > 0) lignes.push(jt(lang, 'serieJours', jours))
  lignes.push(`${domaine}/jeux/${jeu.slug}`)
  return lignes.join('\n')
}

function reduitMouvementPrefere() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

export default function Jeu({ jeu, date }) {
  const { lang } = useLanguage()
  const numero = numeroDuJour(date)
  const question = questions[((numero % questions.length) + questions.length) % questions.length]

  const resultatSauvegarde = useMemo(() => lireResultat(jeu.slug, date), [jeu.slug, date])
  const jours = useMemo(() => serie(jeu.slug, date), [jeu.slug, date])
  const reduitMouvement = useMemo(() => reduitMouvementPrefere(), [])

  const [trouvees, setTrouvees] = useState(() => resultatSauvegarde?.detail?.trouvees ?? [])
  const [croix, setCroix] = useState(() => resultatSauvegarde?.detail?.croix ?? 0)
  const [saisie, setSaisie] = useState('')
  const [message, setMessage] = useState('')

  const termine = Boolean(resultatSauvegarde) || croix >= CROIX_MAX || trouvees.length === question.reponses.length

  function finaliserSiNecessaire(listeTrouvees, nbCroix) {
    const fini = nbCroix >= CROIX_MAX || listeTrouvees.length === question.reponses.length
    if (fini) {
      const score = listeTrouvees.reduce((somme, i) => somme + question.reponses[i].pct, 0)
      enregistrerResultat(jeu.slug, date, score, { trouvees: listeTrouvees, croix: nbCroix })
    }
  }

  function valider(e) {
    e.preventDefault()
    if (termine || saisie.trim() === '') return

    const index = trouverReponse(saisie, question.reponses, lang)
    setSaisie('')

    if (index === -1) {
      const nouveauCroix = croix + 1
      setCroix(nouveauCroix)
      setMessage(lang === 'fr' ? 'Pas trouvé.' : 'Not found.')
      finaliserSiNecessaire(trouvees, nouveauCroix)
      return
    }

    if (trouvees.includes(index)) {
      setMessage(lang === 'fr' ? 'Déjà trouvée !' : 'Already found!')
      return
    }

    const nouvellesTrouvees = [...trouvees, index]
    setTrouvees(nouvellesTrouvees)
    const reponse = question.reponses[index]
    setMessage(
      lang === 'fr' ? `Trouvé : ${reponse.fr[0]} (${reponse.pct} %)` : `Found: ${reponse.en[0]} (${reponse.pct}%)`,
    )
    finaliserSiNecessaire(nouvellesTrouvees, croix)
  }

  const score = trouvees.reduce((somme, i) => somme + question.reponses[i].pct, 0)
  const texteAPartager = termine
    ? construireTexte({ jeu, numero, lang, reponses: question.reponses, trouvees, croix, score, jours })
    : ''

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, margin: '0 0 var(--space-sm)', color: 'var(--text)' }}>
        {question.question[lang]}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xs)', marginBottom: 'var(--space-md)' }}>
        {question.reponses.map((r, i) => {
          const revele = trouvees.includes(i) || termine
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-sm)',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-sm)',
                border: 'var(--border-thin) solid var(--border)',
                background: revele ? `color-mix(in srgb, var(--${jeu.couleur}) 14%, var(--bg2))` : 'var(--bg2)',
                opacity: reduitMouvement ? 1 : undefined,
                transition: reduitMouvement ? 'none' : 'background 0.3s ease',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', minWidth: 18 }}>{i + 1}</span>
              {revele ? (
                <>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text)', flex: 1 }}>{r[lang][0]}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{r.pct} %</span>
                </>
              ) : (
                <span style={{ flex: 1 }} />
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2xs)', justifyContent: 'center', marginBottom: 'var(--space-sm)', fontSize: 18 }}>
        {Array.from({ length: CROIX_MAX }).map((_, i) => (
          <span key={i} style={{ opacity: i < croix ? 1 : 0.25 }}>
            ❌
          </span>
        ))}
      </div>

      <p aria-live="polite" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', textAlign: 'center', minHeight: 16, margin: '0 0 var(--space-sm)' }}>
        {message}
      </p>

      {!termine && (
        <form onSubmit={valider} style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <input
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            enterKeyHint="send"
            autoComplete="off"
            placeholder={lang === 'fr' ? 'Ta réponse…' : 'Your answer…'}
            style={{
              flex: 1,
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              padding: 'var(--space-xs) var(--space-sm)',
              borderRadius: 'var(--radius-sm)',
              border: 'var(--border-thin) solid var(--border)',
              background: 'var(--bg2)',
              color: 'var(--text)',
            }}
          />
          <button type="submit" style={boutonPrincipal}>
            {lang === 'fr' ? 'Valider' : 'Submit'}
          </button>
        </form>
      )}

      {termine && (
        <div style={{ marginTop: 'var(--space-md)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
            {lang === 'fr'
              ? 'Pourcentages indicatifs : ils seront remplacés par les vraies réponses des joueurs.'
              : 'Indicative percentages: they will be replaced by real players’ answers.'}
          </p>
          <ResultatPartage score={score} jours={jours} texte={texteAPartager} />
        </div>
      )}
    </div>
  )
}

const boutonPrincipal = {
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  padding: 'var(--space-xs) var(--space-md)',
  borderRadius: 'var(--radius-pill)',
  border: 'none',
  background: 'var(--primary-surface)',
  color: 'var(--on-primary-surface)',
  cursor: 'pointer',
}
