import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { BREVES_TEXT, formatDateLong, rubriqueLabel } from './brevesText'
import { getAdjacentDays, getDay, getDays } from './jours'
import { aNumero, chargerNumero, lienPdf } from './numeros'
import './gazette-journal.css'

// La Gazette du Lab, rangée dans la bibliothèque : un vrai quotidien plié en
// deux, posé sur la table. On le déplie (la moitié du bas descend), on lit la
// une du jour ; les numéros précédents attendent en pile à côté.
// /oracle = le numéro du jour, /oracle/:date = un ancien numéro.

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const TX = {
  retour: { fr: 'Retour à la librairie', en: 'Back to the bookshop' },
  deplier: { fr: 'Déplier le journal', en: 'Unfold the paper' },
  anciens: { fr: 'Numéros précédents', en: 'Back issues' },
  aujourdhui: { fr: 'Le numéro du jour', en: 'Today’s issue' },
  rss: { fr: 'Flux RSS', en: 'RSS feed' },
  suivre: { fr: 'S’abonner', en: 'Subscribe' },
  pdf: { fr: 'Télécharger le PDF', en: 'Download the PDF' },
  pdfDetail: { fr: 'A4 recto verso, à imprimer', en: 'Double-sided A4, ready to print' },
  numero: { fr: 'N°', en: 'No.' },
  enigme: { fr: 'L’énigme', en: 'The riddle' },
  voirReponse: { fr: 'Voir la réponse', en: 'Show the answer' },
  defi: { fr: 'Le mini-défi', en: 'Mini challenge' },
  question: { fr: 'La question', en: 'The question' },
  citation: { fr: 'La citation', en: 'The quote' },
  cout: { fr: 'Coût de lancement', en: 'Launch cost' },
  difficulte: { fr: 'Difficulté', en: 'Difficulty' },
  potentiel: { fr: 'Potentiel', en: 'Potential' },
}
const tx = (v, lang) => v[lang] ?? v.fr
const champ = (v, lang) => (typeof v === 'string' ? v : v?.[lang] ?? v?.fr ?? '')

// Sources d'une brève, en italique sous le texte
function Sources({ sources, lang }) {
  const t = BREVES_TEXT[lang].edition
  return (
    <p className="gz-sources">
      {sources.map((s, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          {t.sourceLabel} : <a href={s.url} target="_blank" rel="noopener noreferrer">{s.titre} ↗</a>
        </span>
      ))}
    </p>
  )
}

// La page du journal : tête, une, autres brèves en colonnes, mot et chiffre
function PageJournal({ jour, lang }) {
  const tete = BREVES_TEXT[lang].tete
  const ed = BREVES_TEXT[lang].edition
  const home = BREVES_TEXT[lang].home
  const une = jour.breves.find((b) => b.rubrique === 'ia') ?? jour.breves[0]
  const autres = jour.breves.filter((b) => b !== une)

  return (
    <article className="gz-page">
      <header className="gz-tete">
        <span className="gz-oreille">{tete.oreilleGauche}</span>
        <h1>
          {tete.titre.map((seg, i) => <span key={i} className={i % 2 ? 'gz-initiale' : undefined}>{seg}</span>)}
        </h1>
        <span className="gz-oreille gz-oreille-droite">{tete.oreilleDroite}</span>
        <p className="gz-devise">{tete.devise}</p>
        <div className="gz-ligne-date">
          <span>{formatDateLong(jour.date, lang)}</span>
          <span>{tete.paraitChaque}</span>
          <span>{tete.brevesCount(jour.breves.length)}</span>
        </div>
      </header>

      <section className="gz-une">
        <span className="gz-kicker">☞ {ed.kickerPrefix} · {rubriqueLabel(une.rubrique, lang)}</span>
        <h2 dangerouslySetInnerHTML={{ __html: champ(une.titre, lang) }} />
        <div className="gz-colonnes gz-lettrine">
          <p dangerouslySetInnerHTML={{ __html: champ(une.resume, lang) }} />
        </div>
        <Sources sources={une.sources} lang={lang} />
      </section>

      {autres.length > 0 && (
        <section className="gz-autres">
          {autres.map((b, i) => (
            <div key={i} className="gz-breve">
              <span className="gz-rubrique">{rubriqueLabel(b.rubrique, lang)}</span>
              <h3 dangerouslySetInnerHTML={{ __html: champ(b.titre, lang) }} />
              <p dangerouslySetInnerHTML={{ __html: champ(b.resume, lang) }} />
              <Sources sources={b.sources} lang={lang} />
            </div>
          ))}
        </section>
      )}

      {(jour.mot || jour.chiffre) && (
        <section className="gz-encadres">
          {jour.mot && (
            <div className="gz-encadre">
              <span className="gz-rubrique">{home.wordLabel}</span>
              <b className="gz-mot">{jour.mot.terme}</b>
              <p dangerouslySetInnerHTML={{ __html: champ(jour.mot.definition, lang) }} />
            </div>
          )}
          {jour.chiffre && (
            <div className="gz-encadre">
              <span className="gz-rubrique">{home.figureLabel}</span>
              <b className="gz-chiffre">{jour.chiffre.valeur}</b>
              <p dangerouslySetInnerHTML={{ __html: champ(jour.chiffre.texte, lang) }} />
            </div>
          )}
        </section>
      )}
    </article>
  )
}

// ---------- Numéro complet : le même contenu que le journal papier ----------

// Sources du numéro complet : de simples adresses, affichées par leur domaine
function SourcesNumero({ sources, lang }) {
  if (!sources?.length) return null
  const t = BREVES_TEXT[lang].edition
  return (
    <p className="gz-sources">
      {sources.map((url, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          {i === 0 && `${t.sourceLabel} : `}
          <a href={url} target="_blank" rel="noopener noreferrer">{domaine(url)} ↗</a>
        </span>
      ))}
    </p>
  )
}
const domaine = (url) => { try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url } }
// Pastille citrouille en pixel art (10 × 10) : signale un film d'horreur sur son affiche
const CITROUILLE = ['.....GG...', '....GG....', '..ODOODO..', '.OODOODOO.', 'OOKKOOKKOO', 'OOKKOOKKOO', 'OODOOOODOO', 'OOKOKKOKOO', '.OOKDDKOO.', '..OOOOOO..']
const COULEURS_CITROUILLE = { O: '#e8731c', D: '#b9520f', G: '#3d6b2a', K: '#16110c' }
function Citrouille({ lang }) {
  return (
    <span className="gz-citrouille" title={lang === 'en' ? 'Horror film' : 'Film d’horreur'}>
      <svg viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
        {CITROUILLE.flatMap((ligne, y) => [...ligne].map((c, x) => COULEURS_CITROUILLE[c] && (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COULEURS_CITROUILLE[c]} />
        )))}
      </svg>
    </span>
  )
}
const points = (n) => '●'.repeat(n) + '○'.repeat(3 - n)

// Un article de la page 2 ou 3 : rubrique, titre, chapo, texte et encadrés
function ArticleNumero({ art, i, lang }) {
  return (
    <article className={`gz-art${art.taille === 'petit' ? ' gz-art-petit' : ''}`}>
      <span className="gz-rubrique">{art.rubrique}</span>
      <h3 className={`gz-art-titre gz-bois-${i % 3}`} dangerouslySetInnerHTML={{ __html: art.titre }} />
      {art.chapo && <p className="gz-chapo" dangerouslySetInnerHTML={{ __html: art.chapo }} />}
      {(art.paragraphes || []).map((p, k) => <p key={k} dangerouslySetInnerHTML={{ __html: p }} />)}
      {art.rappel && (
        <div className="gz-rappel"><b>{art.rappel.annee}</b><p dangerouslySetInnerHTML={{ __html: art.rappel.texte }} /></div>
      )}
      {art.encadre && (
        <div className={`gz-boite${art.encadre.plein ? ' gz-boite-pleine' : ''}`}>
          <b>{art.encadre.titre}</b>
          <p dangerouslySetInnerHTML={{ __html: art.encadre.texte }} />
        </div>
      )}
      {art.jauge && (
        <dl className="gz-jauge">
          <dt>{tx(TX.cout, lang)}</dt><dd>{points(art.jauge.cout)}</dd>
          <dt>{tx(TX.difficulte, lang)}</dt><dd>{points(art.jauge.difficulte)}</dd>
          <dt>{tx(TX.potentiel, lang)}</dt><dd>{points(art.jauge.potentiel)}</dd>
        </dl>
      )}
      <SourcesNumero sources={art.sources} lang={lang} />
    </article>
  )
}

// Le numéro complet, mis en page comme un journal
function PageNumero({ n, lang }) {
  const tete = BREVES_TEXT[lang].tete
  const home = BREVES_TEXT[lang].home
  const { une, page2, page3, page4 } = n
  const B = page4.bonus
  const sections = [page2, page3]
  let compteur = 0

  return (
    <article className="gz-page">
      <header className="gz-tete">
        <span className="gz-oreille">{tete.oreilleGauche}</span>
        <h1>
          {tete.titre.map((seg, i) => <span key={i} className={i % 2 ? 'gz-initiale' : undefined}>{seg}</span>)}
        </h1>
        <span className="gz-oreille gz-oreille-droite">{tete.oreilleDroite}</span>
        <p className="gz-devise">{tete.devise}</p>
        <div className="gz-ligne-date">
          <span>{formatDateLong(n.date, lang)}</span>
          <span>{tete.paraitChaque}</span>
          <span>{tx(TX.numero, lang)} {String(n.numero).padStart(3, '0')}</span>
        </div>
      </header>

      <section className="gz-une">
        <span className="gz-kicker">☞ {une.rubrique}</span>
        <h2 dangerouslySetInnerHTML={{ __html: une.titre }} />
        {une.chapo && <p className="gz-chapo gz-chapo-une" dangerouslySetInnerHTML={{ __html: une.chapo }} />}
        {une.paragraphes.length > 0 && (
          <div className="gz-colonnes gz-lettrine">
            {une.paragraphes.map((p, k) => <p key={k} dangerouslySetInnerHTML={{ __html: p }} />)}
          </div>
        )}
        {/* Mercredi : les sorties cinéma du jour, affiches en noir et blanc */}
        {une.films?.length > 0 && (
          <div className="gz-films">
            {une.films.map((f, k) => (
              <div key={k} className="gz-film">
                {f.affiche && (
                  <div className="gz-affiche">
                    <img src={`/oracle/affiches/${f.affiche}`} alt={f.titre} loading="lazy" />
                    {f.horreur && <Citrouille lang={lang} />}
                  </div>
                )}
                <div>
                  <b dangerouslySetInnerHTML={{ __html: f.titre }} />
                  {f.titre_original && f.titre_original !== f.titre && <i>{f.titre_original}</i>}
                  <span>{[f.realisateur, f.genre, f.duree].filter(Boolean).join(' · ')}</span>
                  <p dangerouslySetInnerHTML={{ __html: f.texte }} />
                </div>
              </div>
            ))}
          </div>
        )}
        <SourcesNumero sources={une.sources} lang={lang} />
      </section>

      <section className="gz-encadres">
        <div className="gz-encadre">
          <span className="gz-rubrique">{home.wordLabel}</span>
          <b className="gz-mot">{page4.mot.terme}</b>
          <p><i>{page4.mot.nature}</i> <span dangerouslySetInnerHTML={{ __html: page4.mot.definition }} /></p>
        </div>
        <div className="gz-encadre">
          <span className="gz-rubrique">{home.figureLabel}</span>
          <b className="gz-chiffre">{page4.chiffre.valeur}</b>
          <p dangerouslySetInnerHTML={{ __html: page4.chiffre.texte }} />
        </div>
      </section>

      {sections.map((sec, k) => (
        <section key={k} className="gz-section">
          <h2 className="gz-section-titre"><span>{sec.section}</span></h2>
          <div className="gz-articles">
            {sec.articles.map((art) => <ArticleNumero key={compteur} art={art} i={compteur++} lang={lang} />)}
          </div>
        </section>
      ))}

      <section className="gz-recre">
        {B && (
          <div className="gz-encadre">
            <span className="gz-rubrique">{tx(B.type === 'defi' ? TX.defi : B.type === 'citation' ? TX.citation : TX.question, lang)}</span>
            <p dangerouslySetInnerHTML={{ __html: B.texte }} />
            {B.auteur && <p className="gz-auteur">— {B.auteur}</p>}
          </div>
        )}
        <div className="gz-encadre">
          <span className="gz-rubrique">{tx(TX.enigme, lang)}</span>
          <p dangerouslySetInnerHTML={{ __html: page4.enigme.question }} />
          <details className="gz-reponse">
            <summary>{tx(TX.voirReponse, lang)}</summary>
            <p dangerouslySetInnerHTML={{ __html: page4.enigme.reponse }} />
          </details>
        </div>
      </section>

      <a className="gz-telecharger" href={lienPdf(n.date, lang)} download={`oracle-du-matin-${n.date}${lang === 'en' ? '-en' : ''}.pdf`}>
        <b>⤓ {tx(TX.pdf, lang)}</b>
        <span>{tx(TX.pdfDetail, lang)}</span>
      </a>
    </article>
  )
}

export default function GazetteJournal() {
  const { date } = useParams()
  const navigate = useNavigate()
  const { lang, toggle: basculerLangue } = useLanguage()
  const jours = getDays()
  const jour = date ? getDay(date) : jours[0]
  const { previous, next } = jour ? getAdjacentDays(jour.date) : { previous: null, next: null }
  const tDay = BREVES_TEXT[lang].day

  // Numéro complet du jour dans la langue choisie ; sans lui, on affiche les brèves
  const complet = jour ? aNumero(jour.date, lang) : false
  const [numero, setNumero] = useState(null)
  useEffect(() => {
    let actif = true
    if (!jour || !complet) return undefined
    chargerNumero(jour.date, lang).then((n) => { if (actif) setNumero({ cle: `${jour.date}-${lang}`, n }) })
    return () => { actif = false }
  }, [jour, complet, lang])
  // Le numéro chargé correspond-il bien au jour et à la langue affichés ?
  const numeroPret = complet && numero?.n && numero.cle === `${jour?.date}-${lang}`
  const page = numeroPret
    ? <PageNumero n={numero.n} lang={lang} />
    : complet ? <div className="gz-page gz-attente" /> : <PageJournal jour={jour} lang={lang} />

  // Le journal arrive plié ; une fois déplié, il le reste d'un numéro à l'autre
  const [etat, setEtat] = useState(() => (mouvementReduit() ? 'ouvert' : 'plie'))
  const deplier = () => setEtat((e) => (e === 'plie' ? 'depli' : e))

  useEffect(() => {
    document.title = `${BREVES_TEXT[lang].home.title} · 1977 Éditions`
  }, [lang])

  // Flèches du clavier : numéro précédent / suivant
  useEffect(() => {
    const surTouche = (e) => {
      if (etat !== 'ouvert') { if (e.key === 'Enter' || e.key === ' ') deplier(); return }
      if (e.key === 'ArrowLeft' && previous) navigate(`/oracle/${previous.date}`)
      if (e.key === 'ArrowRight' && next) navigate(`/oracle/${next.date}`)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [etat, previous, next, navigate])

  return (
    <div className="gz-table">
      <nav className="gz-bandeau">
        <Link to="/">← {tx(TX.retour, lang)}</Link>
        <span className="gz-bandeau-titre">{BREVES_TEXT[lang].home.title}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </nav>

      <div className="gz-plateau">
        {jour ? (
          <div className={`gz-journal gz-${etat}`}>
            {/* La feuille : en entier une fois dépliée, sinon seulement la moitié du haut */}
            <div key={jour.date} className="gz-feuille" onClick={etat === 'plie' ? deplier : undefined}>
              {page}
            </div>

            {/* Pendant le dépliage : la moitié du bas descend autour de la pliure */}
            {etat === 'depli' && (
              <div className="gz-rabat" aria-hidden="true" inert onAnimationEnd={() => setEtat('ouvert')}>
                <div className="gz-rabat-recto">
                  <div className="gz-rabat-decale">{page}</div>
                </div>
                <div className="gz-rabat-verso" />
              </div>
            )}

            {etat === 'plie' && (
              <button type="button" className="gz-deplier" onClick={deplier}>
                <span>{tx(TX.deplier, lang)}</span>
              </button>
            )}

            {etat === 'ouvert' && (
              <nav className="gz-pied">
                <span>{previous && <Link to={`/oracle/${previous.date}`}>{tDay.previousDay}</Link>}</span>
                <span>
                  <a href="/oracle/rss.xml">{tx(TX.rss, lang)}</a> · <Link to="/suivre">{tx(TX.suivre, lang)}</Link>
                </span>
                <span>{next && <Link to={`/oracle/${next.date}`}>{tDay.nextDay}</Link>}</span>
              </nav>
            )}
          </div>
        ) : (
          <div className="gz-journal gz-ouvert">
            <div className="gz-feuille gz-introuvable">
              <h2>{jours.length ? tDay.notFoundTitle : BREVES_TEXT[lang].home.empty}</h2>
              {jours.length > 0 && <p>{tDay.notFoundBody}</p>}
              {jours.length > 0 && <Link to="/oracle">{tx(TX.aujourdhui, lang)} →</Link>}
            </div>
          </div>
        )}

        {/* Les numéros précédents, en pile sur la table */}
        {jours.length > 1 && (
          <aside className="gz-pile" aria-label={tx(TX.anciens, lang)}>
            <h2>{tx(TX.anciens, lang)}</h2>
            <ol>
              {jours.map((j, i) => (
                <li key={j.date} style={{ '--r': `${((i * 37) % 7) - 3}deg` }}>
                  <Link
                    to={i === 0 ? '/oracle' : `/oracle/${j.date}`}
                    className={jour && j.date === jour.date ? 'actif' : undefined}
                    aria-current={jour && j.date === jour.date ? 'page' : undefined}
                    onClick={() => setEtat((e) => (e === 'plie' ? 'depli' : e))}
                  >
                    <b>{formatDateLong(j.date, lang)}</b>
                    <span dangerouslySetInnerHTML={{ __html: champ((j.breves.find((b) => b.rubrique === 'ia') ?? j.breves[0]).titre, lang) }} />
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        )}
      </div>
    </div>
  )
}
