import { useState } from 'react'
import { lireAdresse, explorerDepot, lireContenus, filtrerCandidatsLus } from '../../audit/github'
import { avertissement } from '../../audit/outils'
import { TEXTES } from './textes'
import { Bouton } from './ui'
import { FORMAT_LABEL_MONO } from './styles'

const ADRESSE_SITE = 'https://github.com/michael-misran/misran-labs'

// Un seul argument, aucun en-tête : rien d'autre que l'adresse ne part vers GitHub.
const lireUrl = (url) => fetch(url)

/* --- Bloc « Depuis GitHub » ---------------------------------------------- *
 * Aucun appel réseau avant un clic. « Explorer » : 2 requêtes vers
 * api.github.com. « Analyser » : les fichiers choisis, lus sur
 * raw.githubusercontent.com. Le résultat est remis à la page par `onAnalyser`.
 * ------------------------------------------------------------------- */
export default function SourceGithub({ c, lang, onAnalyser }) {
  const t = c.gh
  const [adresse, setAdresse] = useState('')
  const [phase, setPhase] = useState('repos') // 'repos' | 'exploration' | 'explore' | 'analyse'
  const [depot, setDepot] = useState(null) // résultat de explorerDepot
  const [coches, setCoches] = useState(() => new Set())
  const [erreur, setErreur] = useState(null) // { fr, en }
  const [message, setMessage] = useState(null) // texte simple (rien à analyser)
  const [progression, setProgression] = useState(null) // { faits, total }

  const occupe = phase === 'exploration' || phase === 'analyse'

  async function explorer() {
    if (occupe) return
    setPhase('exploration')
    setErreur(null)
    setMessage(null)
    setDepot(null)
    const resultat = await explorerDepot(lireAdresse(adresse), lireUrl)
    if (!resultat.ok) {
      setErreur(resultat.erreur)
      setPhase('repos')
      return
    }
    setDepot(resultat)
    setCoches(new Set(resultat.candidats.map((f) => f.chemin)))
    setPhase('explore')
  }

  function basculer(chemin) {
    setCoches((prev) => {
      const suivant = new Set(prev)
      if (suivant.has(chemin)) suivant.delete(chemin)
      else suivant.add(chemin)
      return suivant
    })
  }

  async function analyser() {
    if (!depot || occupe) return
    const cheminsTokens = depot.candidats.map((f) => f.chemin).filter((chemin) => coches.has(chemin))
    const cheminsCode = depot.echantillon.map((f) => f.chemin)
    if (cheminsTokens.length + cheminsCode.length === 0) {
      setMessage(t.nothingToRead)
      return
    }
    setMessage(null)
    setPhase('analyse')
    setProgression({ faits: 0, total: cheminsTokens.length + cheminsCode.length })
    const lecture = await lireContenus(depot, [...cheminsTokens, ...cheminsCode], lireUrl, (faits, total) =>
      setProgression({ faits, total })
    )

    const ensembleTokens = new Set(cheminsTokens)
    const prefixe = `${depot.proprietaire}/${depot.depot}/`
    const tokensLus = lecture.fichiers.filter((f) => ensembleTokens.has(f.nom))
    const { gardes, avertissements: ecartes } = filtrerCandidatsLus(tokensLus)
    const avertissements = [
      ...depot.avertissements,
      ...ecartes,
      ...lecture.echecs.map((e) =>
        // Les avertissements du moteur sont bilingues : on écrit les deux langues.
        avertissement(e.chemin, TEXTES.fr.gh.unreadable(e.erreur.fr), TEXTES.en.gh.unreadable(e.erreur.en))
      ),
    ]

    onAnalyser({
      fichiersTokens: gardes.map((f) => ({ nom: prefixe + f.nom, contenu: f.contenu })),
      fichiersCode: lecture.fichiers.filter((f) => !ensembleTokens.has(f.nom)),
      avertissements,
      source: {
        depot: `${depot.proprietaire}/${depot.depot}`,
        branche: depot.branche,
        analyses: cheminsCode.length,
        eligibles: depot.eligibles,
      },
    })
    setProgression(null)
    setPhase('explore')
  }

  const inputStyle = {
    flex: '1 1 260px',
    minWidth: 0,
    boxSizing: 'border-box',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--text)',
    background: 'var(--bg)',
    border: 'var(--border-thin) solid var(--border)',
    padding: '8px 10px',
  }

  return (
    <section aria-labelledby="audit-github-titre" style={{ marginBottom: 18, paddingBottom: 16, borderBottom: 'var(--border-thin) solid var(--grid-line)' }}>
      <div id="audit-github-titre" style={{ ...FORMAT_LABEL_MONO, marginBottom: 8 }}>
        {t.title}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          explorer()
        }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}
      >
        <input
          type="text"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.addressLabel}
          spellCheck={false}
          autoComplete="off"
          disabled={occupe}
          style={inputStyle}
        />
        <Bouton principal disabled={occupe || adresse.trim() === ''} onClick={explorer}>
          {phase === 'exploration' ? t.exploring : t.explore}
        </Bouton>
        <Bouton disabled={occupe} onClick={() => setAdresse(ADRESSE_SITE)}>
          {t.trySite}
        </Bouton>
      </form>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, margin: '6px 0 0', maxWidth: '75ch' }}>{t.help}</p>

      <div aria-live="polite">
        {erreur && (
          <p
            role="alert"
            style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)', border: 'var(--border-thin) solid var(--error)', borderLeft: 'var(--border-thick) solid var(--error)', background: 'var(--bg)', padding: '8px 12px', margin: '10px 0 0', overflowWrap: 'anywhere' }}
          >
            {erreur[lang] ?? erreur.fr}
          </p>
        )}

        {depot && (
          <div style={{ marginTop: 12, border: 'var(--border-thin) solid var(--border)', background: 'var(--bg)', padding: '10px 12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>
              <span style={{ overflowWrap: 'anywhere' }}>
                <span style={FORMAT_LABEL_MONO}>{t.repo} </span>
                {depot.proprietaire}/{depot.depot}
              </span>
              <span style={{ overflowWrap: 'anywhere' }}>
                <span style={FORMAT_LABEL_MONO}>{t.branch} </span>
                {depot.branche}
              </span>
              {depot.dossier && (
                <span style={{ overflowWrap: 'anywhere' }}>
                  <span style={FORMAT_LABEL_MONO}>{t.folder} </span>
                  {depot.dossier}
                </span>
              )}
              {depot.taille !== null && <span style={{ color: 'var(--muted)' }}>{t.size(depot.taille)}</span>}
            </div>

            <div style={{ ...FORMAT_LABEL_MONO, margin: '12px 0 6px' }}>{t.tokensTitle}</div>
            {depot.candidats.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, margin: 0 }}>{t.noTokens}</p>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>{t.tokensFound(depot.candidats.length, depot.candidatsTotal)}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: 'var(--border-thin) solid var(--border)' }}>
                  {depot.candidats.map((f) => (
                    <li key={f.chemin} style={{ borderBottom: 'var(--border-thin) solid var(--grid-line)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', cursor: occupe ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', overflowWrap: 'anywhere' }}>
                        <input type="checkbox" checked={coches.has(f.chemin)} disabled={occupe} onChange={() => basculer(f.chemin)} style={{ flexShrink: 0 }} />
                        {f.chemin}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, margin: '12px 0 0' }}>
              {depot.echantillon.length > 0 ? t.sample(depot.echantillon.length, depot.eligibles) : t.noCode}
            </p>

            {depot.avertissements.map((a, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--warning)', lineHeight: 1.5, margin: '6px 0 0' }}>
                {a.detail[lang] ?? a.detail.fr}
              </p>
            ))}

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <Bouton principal disabled={occupe} onClick={analyser}>
                {t.analyze}
              </Bouton>
              {progression && (
                <span role="status" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)' }}>
                  {t.progress(progression.faits, progression.total)}
                </span>
              )}
            </div>
            {message && <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', margin: '8px 0 0' }}>{message}</p>}
          </div>
        )}
      </div>
    </section>
  )
}
