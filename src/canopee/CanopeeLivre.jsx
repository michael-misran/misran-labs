import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { CouvertureCanopee } from './CouvertureCanopee'
import SOMMAIRE from './sommaire.json'
import './canopee.css'

// « Canopée », le livre de 1977 Éditions sur l'IA d'entreprise. Contrairement à
// L'Atelier automatique, le texte est trop long pour des pages A5 fixes : une
// page de lecture par partie, avec un sommaire. Le contenu vient de
// scripts/canopee-convertir.mjs et n'est jamais retouché ici. Il n'existe qu'en
// français, le bouton FR / EN ne change donc que les libellés de navigation.

const TITRE = 'Canopée'
const SOUS_TITRE = 'Huit jours pour faire travailler l’IA sur des données privées, mesures et incidents compris'

const UI = {
  retour: { fr: 'Retour à la librairie', en: 'Back to the bookshop' },
  sommaire: { fr: 'Sommaire', en: 'Contents' },
  commencer: { fr: 'Commencer la lecture', en: 'Start reading' },
  imprimer: { fr: 'Imprimer cette partie', en: 'Print this part' },
  precedent: { fr: 'Précédent', en: 'Previous' },
  suivant: { fr: 'Suivant', en: 'Next' },
  chapitres: { fr: 'Le récit', en: 'The story' },
  annexes: { fr: 'Annexes', en: 'Appendices' },
  francais: { fr: '', en: 'This book is available in French only.' },
  agrandir: { fr: 'Ouvrir le schéma en grand', en: 'Open full size' },
  glisser: { fr: '← Glissez pour tout voir →', en: '← Swipe to see it all →' },
  tableau: { fr: 'Tableau, défilable', en: 'Scrollable table' },
  chargement: { fr: 'Chargement…', en: 'Loading…' },
}

// Une partie = un fichier chargé à la demande : ouvrir le livre ne télécharge pas les 20
const FICHIERS = import.meta.glob('./parties/*.json')
const chargerPartie = (fichier) => FICHIERS[`./parties/${fichier}.json`]()

// ---------- Rendu du contenu converti ----------

function EnLigne({ x }) {
  return x.map((m, i) => {
    if (typeof m === 'string') return m
    if (m.c !== undefined) return <code key={i}>{m.c}</code>
    if (m.g) return <strong key={i}><EnLigne x={m.g} /></strong>
    return <em key={i}><EnLigne x={m.i} /></em>
  })
}

function Bloc({ b, lang }) {
  switch (b.t) {
    case 'h1': return null // le titre de la partie est composé par Partie
    case 'h2': return <h2 id={b.id}><EnLigne x={b.x} /></h2>
    case 'h3': return <h3 id={b.id}><EnLigne x={b.x} /></h3>
    case 'p': return <p><EnLigne x={b.x} /></p>
    case 'ul': return <ul>{b.items.map((x, i) => <li key={i}><EnLigne x={x} /></li>)}</ul>
    case 'ol': return <ol start={b.debut}>{b.items.map((x, i) => <li key={i}><EnLigne x={x} /></li>)}</ol>
    case 'cite': return <blockquote><Blocs blocs={b.blocs} lang={lang} /></blockquote>
    case 'code': return <pre tabIndex={0}><code>{b.texte}</code></pre>
    case 'table':
      return (
        <div className="cn-tableau" role="region" aria-label={UI.tableau[lang]} tabIndex={0}>
          <table>
            {/* Les tableaux à en-tête vide (« En résumé ») n'affichent pas de ligne vide */}
            {b.entete.some((c) => c.length > 0) && (
              <thead><tr>{b.entete.map((c, i) => <th key={i} scope="col"><EnLigne x={c} /></th>)}</tr></thead>
            )}
            <tbody>
              {b.lignes.map((l, i) => <tr key={i}>{l.map((c, j) => <td key={j}><EnLigne x={c} /></td>)}</tr>)}
            </tbody>
          </table>
        </div>
      )
    case 'fig':
      return (
        <figure className="cn-figure">
          <div className="cn-figure-cadre" tabIndex={0} role="group" aria-label={b.alt}>
            <img src={`/canopee/visuels/${b.src}`} alt={b.alt} width="720" loading="lazy" decoding="async" />
          </div>
          <figcaption className="cn-figure-outils">
            <span className="cn-glisser" aria-hidden="true">{UI.glisser[lang]}</span>
            <a href={`/canopee/visuels/${b.src}`} target="_blank" rel="noreferrer">{UI.agrandir[lang]}</a>
          </figcaption>
        </figure>
      )
    default: return null
  }
}

function Blocs({ blocs, lang }) {
  return blocs.map((b, i) => <Bloc key={i} b={b} lang={lang} />)
}

// ---------- Sommaire ----------

const RECIT = SOMMAIRE.filter((p) => !p.annexe)
const ANNEXES = SOMMAIRE.filter((p) => p.annexe)

function ListeSommaire({ lang, actif, surChoix }) {
  const groupe = (parties) => (
    <ol className="cn-liste">
      {parties.map((p) => (
        <li key={p.slug}>
          <Link
            to={`/canopee/${p.slug}`}
            aria-current={p.slug === actif ? 'page' : undefined}
            onClick={surChoix}
          >
            <small>{p.etiquette}</small>
            <span>{p.titre}</span>
          </Link>
        </li>
      ))}
    </ol>
  )
  return (
    <>
      <h2 className="cn-groupe">{UI.chapitres[lang]}</h2>
      {groupe(RECIT)}
      <h2 className="cn-groupe">{UI.annexes[lang]}</h2>
      {groupe(ANNEXES)}
    </>
  )
}

// ---------- Bandeau ----------

function Bandeau({ lang, basculerLangue, imprimable }) {
  return (
    <nav className="cn-nav">
      <Link to="/librairie" className="cn-retour">← {UI.retour[lang]}</Link>
      <Link to="/canopee" className="cn-nav-titre">{TITRE}</Link>
      <span className="cn-nav-droite">
        {imprimable && <button type="button" onClick={() => window.print()}>{UI.imprimer[lang]}</button>}
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </span>
    </nav>
  )
}

// ---------- Page d'ouverture : couverture et sommaire ----------

function Ouverture({ lang }) {
  useEffect(() => { document.title = `${TITRE} · 1977 Éditions` }, [])
  return (
    <main className="cn-ouverture">
      <div className="cn-ouverture-couv"><div className="cn-couv-cadre"><CouvertureCanopee /></div></div>
      <div className="cn-ouverture-texte">
        <p className="cn-maison">1977 Éditions</p>
        <h1><span>{TITRE}.</span> {SOUS_TITRE}</h1>
        {UI.francais[lang] && <p className="cn-note" lang="en">{UI.francais[lang]}</p>}
        <Link className="cn-commencer" to={`/canopee/${SOMMAIRE[0].slug}`}>{UI.commencer[lang]} →</Link>
        <ListeSommaire lang={lang} />
      </div>
    </main>
  )
}

// ---------- Une partie ----------

function Partie({ partie, lang }) {
  const index = SOMMAIRE.indexOf(partie)
  const precedente = SOMMAIRE[index - 1]
  const suivante = SOMMAIRE[index + 1]
  const [charge, setCharge] = useState({ fichier: null, blocs: null })
  const [ouvert, setOuvert] = useState(false)
  const blocs = charge.fichier === partie.fichier ? charge.blocs : null

  useEffect(() => {
    let actif = true
    chargerPartie(partie.fichier).then((m) => {
      if (actif) setCharge({ fichier: partie.fichier, blocs: m.default.blocs })
    })
    return () => { actif = false }
  }, [partie.fichier])

  useEffect(() => {
    document.title = `${partie.etiquette} · ${TITRE} · 1977 Éditions`
  }, [partie])

  // En changeant de partie, on repart du haut, ou de l'intertitre demandé
  useEffect(() => {
    if (!blocs) return
    const cible = window.location.hash.slice(1)
    const el = cible && document.getElementById(decodeURIComponent(cible))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [blocs])

  // Sommaire latéral : la partie ouverte reste visible dans sa liste
  useEffect(() => {
    const cadre = document.querySelector('.cn-cote-fixe')
    const lien = cadre?.querySelector('[aria-current]')
    if (lien) cadre.scrollTop = lien.offsetTop - cadre.offsetTop - cadre.clientHeight / 3
  }, [])

  return (
    <div className="cn-lecture">
      <aside className="cn-cote">
        <details className="cn-tiroir" open={ouvert} onToggle={(e) => setOuvert(e.currentTarget.open)}>
          <summary>{UI.sommaire[lang]}<i>{partie.etiquette}</i></summary>
          <div className="cn-tiroir-corps">
            <ListeSommaire lang={lang} actif={partie.slug} surChoix={() => setOuvert(false)} />
          </div>
        </details>
        <div className="cn-cote-fixe">
          <ListeSommaire lang={lang} actif={partie.slug} />
        </div>
      </aside>

      <main className="cn-page">
        <article lang="fr">
          <header className="cn-tete">
            <p>{partie.etiquette}</p>
            <h1>{partie.titre}</h1>
          </header>
          {UI.francais[lang] && <p className="cn-note" lang="en">{UI.francais[lang]}</p>}
          {partie.intertitres.length > 2 && (
            <ul className="cn-plan">
              {partie.intertitres.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.x}</a></li>)}
            </ul>
          )}
          {blocs ? <Blocs blocs={blocs} lang={lang} /> : <p className="cn-attente">{UI.chargement[lang]}</p>}
        </article>

        <nav className="cn-suite" aria-label={UI.sommaire[lang]}>
          {precedente ? (
            <Link to={`/canopee/${precedente.slug}`} rel="prev"><small>← {UI.precedent[lang]}</small><span>{precedente.etiquette}. {precedente.titre}</span></Link>
          ) : <span />}
          {suivante ? (
            <Link to={`/canopee/${suivante.slug}`} rel="next" className="cn-suivant"><small>{UI.suivant[lang]} →</small><span>{suivante.etiquette}. {suivante.titre}</span></Link>
          ) : <span />}
        </nav>
      </main>
    </div>
  )
}

export default function CanopeeLivre() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const { partie: slug } = useParams()
  const partie = SOMMAIRE.find((p) => p.slug === slug)

  if (slug && !partie) return <Navigate to="/canopee" replace />

  return (
    <div className="cn-livre">
      <Bandeau lang={lang} basculerLangue={basculerLangue} imprimable={Boolean(partie)} />
      {partie
        ? <Partie key={partie.slug} partie={partie} lang={lang} />
        : <Ouverture lang={lang} />}
    </div>
  )
}
