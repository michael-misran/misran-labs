import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { BREVES_TEXT, formatDateLong, rubriqueLabel } from './brevesText'
import { getAdjacentDays, getDay, getDays } from './jours'
import './gazette-journal.css'

// La Gazette du Lab, rangée dans la bibliothèque : un vrai quotidien plié en
// deux, posé sur la table. On le déplie (la moitié du bas descend), on lit la
// une du jour ; les numéros précédents attendent en pile à côté.
// /breves = le numéro du jour, /breves/:date = un ancien numéro.

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const TX = {
  retour: { fr: 'Retour à la bibliothèque', en: 'Back to the library' },
  deplier: { fr: 'Déplier le journal', en: 'Unfold the paper' },
  anciens: { fr: 'Numéros précédents', en: 'Back issues' },
  aujourdhui: { fr: 'Le numéro du jour', en: 'Today’s issue' },
  rss: { fr: 'Flux RSS', en: 'RSS feed' },
  suivre: { fr: 'S’abonner', en: 'Subscribe' },
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

export default function GazetteJournal() {
  const { date } = useParams()
  const navigate = useNavigate()
  const { lang, toggle: basculerLangue } = useLanguage()
  const jours = getDays()
  const jour = date ? getDay(date) : jours[0]
  const { previous, next } = jour ? getAdjacentDays(jour.date) : { previous: null, next: null }
  const tDay = BREVES_TEXT[lang].day

  // Le journal arrive plié ; une fois déplié, il le reste d'un numéro à l'autre
  const [etat, setEtat] = useState(() => (mouvementReduit() ? 'ouvert' : 'plie'))
  const deplier = () => setEtat((e) => (e === 'plie' ? 'depli' : e))

  useEffect(() => {
    document.title = `${BREVES_TEXT[lang].home.title} · Misran Labs`
  }, [lang])

  // Flèches du clavier : numéro précédent / suivant
  useEffect(() => {
    const surTouche = (e) => {
      if (etat !== 'ouvert') { if (e.key === 'Enter' || e.key === ' ') deplier(); return }
      if (e.key === 'ArrowLeft' && previous) navigate(`/breves/${previous.date}`)
      if (e.key === 'ArrowRight' && next) navigate(`/breves/${next.date}`)
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
              <PageJournal jour={jour} lang={lang} />
            </div>

            {/* Pendant le dépliage : la moitié du bas descend autour de la pliure */}
            {etat === 'depli' && (
              <div className="gz-rabat" aria-hidden="true" inert onAnimationEnd={() => setEtat('ouvert')}>
                <div className="gz-rabat-recto">
                  <div className="gz-rabat-decale"><PageJournal jour={jour} lang={lang} /></div>
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
                <span>{previous && <Link to={`/breves/${previous.date}`}>{tDay.previousDay}</Link>}</span>
                <span>
                  <a href="/breves/rss.xml">{tx(TX.rss, lang)}</a> · <Link to="/suivre">{tx(TX.suivre, lang)}</Link>
                </span>
                <span>{next && <Link to={`/breves/${next.date}`}>{tDay.nextDay}</Link>}</span>
              </nav>
            )}
          </div>
        ) : (
          <div className="gz-journal gz-ouvert">
            <div className="gz-feuille gz-introuvable">
              <h2>{jours.length ? tDay.notFoundTitle : BREVES_TEXT[lang].home.empty}</h2>
              {jours.length > 0 && <p>{tDay.notFoundBody}</p>}
              {jours.length > 0 && <Link to="/breves">{tx(TX.aujourdhui, lang)} →</Link>}
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
                    to={i === 0 ? '/breves' : `/breves/${j.date}`}
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
