import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { ENCARTS } from './encarts'
import { LT, lt } from './midnightTexte'
import { getNumero, getNumeroParDefaut, estParu } from './numeros'
import './midnight.css'

// Le livre Midnight Snack : même mécanique de tourne-page que le portfolio
// (src/portfolio/PortfolioLivre.jsx), avec une parution datée par numéro
// (SPEC D2) et des pages propres au magazine (D3-D5).

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const modeAtelier = (search) => import.meta.env.DEV || new URLSearchParams(search).has('atelier')

const formatDate = (dateStr, lang) =>
  new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${dateStr}T00:00:00`))

function useNoindex(actif) {
  useEffect(() => {
    if (!actif) return
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    meta.setAttribute('content', 'noindex')
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [actif])
}

// ---------- Éléments communs ----------

function Encart({ id, lang, atelier, grand }) {
  const e = ENCARTS[id]
  if (!e) return null
  const style = e.ratio ? { aspectRatio: e.ratio } : undefined
  return (
    <figure className={`ms-encart${grand ? ' ms-encart-grand' : ''}`}>
      {e.image ? (
        <img className="ms-encart-image" src={e.image} alt={lt(e.legende, lang)} style={style} />
      ) : (
        <div className="ms-encart-cadre" style={style}>
          <span className="ms-repere ms-repere-hg" aria-hidden="true" />
          <span className="ms-repere ms-repere-bd" aria-hidden="true" />
          {atelier && (
            <div className="ms-consigne">
              <b>{lt(LT.aAjouter, lang)}</b>
              <span>{e.consigne}</span>
              {e.promptGemini && (
                <>
                  <b>{lt(LT.promptGemini, lang)}</b>
                  <i>{e.promptGemini}</i>
                </>
              )}
              <small>public/midnight/{id}.jpg{e.ratio ? ` · ${e.ratio.replace(/ /g, '')}` : ''}</small>
            </div>
          )}
        </div>
      )}
      <figcaption>{lt(e.legende, lang)}</figcaption>
    </figure>
  )
}

function Page({ folio, tete, classe = '', children }) {
  const cote = folio % 2 === 0 ? 'gauche' : 'droite'
  return (
    <section className={`ms-page ms-page-${cote} ${classe}`}>
      <div className="ms-marge">
        {tete && <div className="ms-tete">{tete}</div>}
        <div className="ms-contenu">{children}</div>
        <div className="ms-folio">{folio}</div>
      </div>
    </section>
  )
}

function Intertitre({ children }) {
  return <h3 className="ms-intertitre">{children}</h3>
}

// ---------- Les pages ----------

function Couverture({ numero, lang }) {
  return (
    <section className="ms-page ms-couverture" style={{ backgroundImage: `url(${numero.couvertureImage})` }}>
      <div className="ms-couv-cadre">
        <h1 className="ms-couv-titre">MIDNIGHT</h1>
        <p className="ms-couv-sous">SNACK!</p>
        <span className="ms-couv-edition">{lt(numero.sousTitre, lang)} · 1977 Éditions</span>
      </div>
    </section>
  )
}

function QuatriemeCouverture({ numero, lang }) {
  return (
    <section className="ms-page ms-couverture ms-quatrieme">
      <div className="ms-couv-cadre">
        <h2 className="ms-quatrieme-titre">{lt(numero.quatrieme.titre, lang)}</h2>
        <p className="ms-quatrieme-texte">{lt(numero.quatrieme.texte, lang)}</p>
      </div>
    </section>
  )
}

function PageSommaireEdito({ numero, lang }) {
  const edito = lt(numero.edito, lang)
  return (
    <Page folio={2} classe="ms-garde">
      <h2 className="ms-titre-page">{lt(LT.surTitre, lang)}</h2>
      <Intertitre>{lang === 'fr' ? 'Sommaire' : 'Contents'}</Intertitre>
      <ol className="ms-sommaire">
        {numero.sommaire.map((s) => (
          <li key={s.folio}><span>{lt(s.titre, lang)}</span><i aria-hidden="true" /><b>{s.folio}</b></li>
        ))}
      </ol>
      <Intertitre>{lang === 'fr' ? 'Édito du raton' : 'The raccoon’s editorial'}</Intertitre>
      <div className="ms-edito">
        {edito.map((p, i) => (
          <p key={i} className={i === edito.length - 1 ? 'ms-signature' : undefined}>{p}</p>
        ))}
      </div>
    </Page>
  )
}

function PageRecitOuverture({ recit, lang }) {
  return (
    <Page folio={recit.folioDebut} tete={lt(recit.titre, lang)} classe="ms-recit">
      <header className="ms-recit-ouverture">
        <h2 className="ms-titre-page">{lt(recit.titre, lang)}</h2>
        <p className="ms-chapo">{lt(recit.chapo, lang)}</p>
      </header>
      {lt(recit.paragraphes, lang)[0].map((p, i) => <p key={i}>{p}</p>)}
    </Page>
  )
}

function PageRecitSuite({ recit, lang, atelier, page }) {
  const classe = page === 1 ? 'ms-recit-page2' : 'ms-recit-page3'
  return (
    <Page folio={recit.folioDebut + page} tete={lt(recit.titre, lang)} classe={`ms-recit ${classe}`}>
      {lt(recit.paragraphes, lang)[page].map((p, i) => <p key={i}>{p}</p>)}
      {page === 2 && recit.encart && <Encart id={recit.encart} lang={lang} atelier={atelier} />}
    </Page>
  )
}

function PageSaviezVous({ data, lang }) {
  return (
    <Page folio={data.folio} tete={lt(LT.surTitre, lang)}>
      <h2 className="ms-titre-page">{lt(data.titre, lang)}</h2>
      <ul className="ms-faits">
        {data.faits.map((f, i) => <li key={i}>{lt(f, lang)}</li>)}
      </ul>
    </Page>
  )
}

function PageReclames({ data, lang }) {
  return (
    <Page folio={data.folio} tete={lt(LT.surTitre, lang)}>
      <h2 className="ms-titre-page">{lang === 'fr' ? 'Réclames rétro' : 'Retro ads'}</h2>
      <div className="ms-reclames">
        {data.items.map((it, i) => (
          <div key={i} className="ms-reclame">
            <h3>{lt(it.titre, lang)}</h3>
            <p>{lt(it.texte, lang)}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function PageRecette({ data, lang, atelier }) {
  return (
    <Page folio={data.folio} tete={lt(LT.surTitre, lang)}>
      <h2 className="ms-titre-page">{lt(data.titre, lang)}</h2>
      <p className="ms-chapo">{lt(data.sousTitre, lang)}</p>
      <p>{lt(data.intro, lang)}</p>
      <div className="ms-recette-grille">
        <div>
          <Intertitre>{lang === 'fr' ? 'Ingrédients' : 'Ingredients'}</Intertitre>
          <ul>{lt(data.ingredients, lang).map((x, i) => <li key={i}>{x}</li>)}</ul>
        </div>
        <div>
          <Intertitre>{lang === 'fr' ? 'Étapes' : 'Steps'}</Intertitre>
          <ol>{lt(data.etapes, lang).map((x, i) => <li key={i}>{x}</li>)}</ol>
        </div>
      </div>
      <Encart id={data.encart} lang={lang} atelier={atelier} />
    </Page>
  )
}

function PageCourrier({ data, lang }) {
  return (
    <Page folio={data.folio} tete={lt(LT.surTitre, lang)}>
      <h2 className="ms-titre-page">{lt(data.titre, lang)}</h2>
      <div className="ms-courrier">
        {data.lettres.map((l, i) => (
          <div className="ms-lettre" key={i}>
            <p className="ms-q">{lt(l.question, lang)}</p>
            <p className="ms-r">{lt(l.reponse, lang)}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

function PageFeuilleton1({ data, lang, atelier }) {
  const texte = data.texte ? lt(data.texte, lang) : null
  return (
    <Page folio={data.folioDebut} tete={lt(data.titre, lang)} classe="ms-recit">
      <h2 className="ms-titre-page">{lt(data.titre, lang)}</h2>
      <Encart id={data.encart} lang={lang} atelier={atelier} grand />
      {texte ? (
        texte.slice(0, Math.ceil(texte.length / 2)).map((p, i) => <p key={i}>{p}</p>)
      ) : (
        <div className="ms-attente-encadre">{lt(atelier ? LT.texteDeMichael : LT.aParaitre, lang)}</div>
      )}
    </Page>
  )
}

function PageFeuilleton2({ data, lang }) {
  const texte = data.texte ? lt(data.texte, lang) : null
  return (
    <Page folio={data.folioDebut + 1} tete={lt(data.titre, lang)} classe="ms-recit">
      {texte ? (
        texte.slice(Math.ceil(texte.length / 2)).map((p, i) => <p key={i}>{p}</p>)
      ) : (
        <div className="ms-attente-encadre">{lt(LT.aParaitre, lang)}</div>
      )}
      <p className="ms-reclame-jeu">
        <Link to={data.lienJeu}>{lang === 'fr' ? 'Jouez à The Lost Cauldron →' : 'Play The Lost Cauldron →'}</Link>
      </p>
    </Page>
  )
}

function PageMarmite({ data, lang, atelier }) {
  const titre = lang === 'fr' ? 'Dans la marmite' : 'In the cauldron'
  return (
    <Page folio={data.folio} tete={titre}>
      <h2 className="ms-titre-page">{titre}</h2>
      <Encart id={data.encart} lang={lang} atelier={atelier} />
      <div className="ms-marmite-colonnes">
        {data.colonnes.map((col, i) => (
          <div key={i}>
            <h3>{lt(col.titre, lang)}</h3>
            {col.texte ? lt(col.texte, lang).map((p, j) => <p key={j}>{p}</p>) : (
              <p className="ms-note">{lt(LT.texteDeMichaelCourt, lang)}</p>
            )}
          </div>
        ))}
      </div>
      <p className="ms-reclame-jeu">
        <Link to={data.lienJeu}>{lang === 'fr' ? 'Version du mois jouable →' : 'This month’s playable build →'}</Link>
      </p>
    </Page>
  )
}

// Labyrinthe : mur par mur, dessiné à la main (grille 5×5, départ en haut à
// gauche, sortie en bas à droite), viewBox 0 0 240 240.
const MAZE_WALLS = [
  [20, 20, 220, 20], [20, 220, 220, 220], [20, 60, 20, 220], [220, 20, 220, 180],
  [140, 20, 140, 60], [180, 20, 180, 60],
  [60, 60, 60, 100], [100, 60, 100, 100], [140, 60, 140, 100], [180, 60, 180, 100],
  [140, 100, 140, 140], [180, 100, 180, 140],
  [60, 140, 60, 180], [100, 140, 100, 180], [180, 140, 180, 180],
  [140, 180, 140, 220],
  [20, 60, 60, 60], [20, 100, 60, 100],
  [60, 60, 100, 60], [60, 100, 100, 100], [60, 140, 100, 140], [60, 180, 100, 180],
  [100, 140, 140, 140],
  [140, 60, 180, 60], [140, 100, 180, 100], [140, 140, 180, 140],
  [180, 60, 220, 60], [180, 100, 220, 100], [180, 140, 220, 140], [180, 180, 220, 180],
]

function Labyrinthe({ data, lang }) {
  const titre = lt(data.titre, lang)
  return (
    <div className="ms-labyrinthe">
      <Intertitre>{titre}</Intertitre>
      <svg viewBox="0 0 240 240" role="img" aria-label={titre}>
        {MAZE_WALLS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ms-encre)" strokeWidth="3" strokeLinecap="square" />
        ))}
        <circle cx="40" cy="40" r="9" fill="var(--ms-rouge)" />
        <text x="40" y="13" textAnchor="middle" fontSize="11" fill="var(--ms-encre)">{lt(data.depart, lang)}</text>
        <circle cx="200" cy="200" r="9" fill="var(--ms-jaune-fonce)" />
        <text x="200" y="234" textAnchor="middle" fontSize="11" fill="var(--ms-encre)">{lt(data.arrivee, lang)}</text>
      </svg>
    </div>
  )
}

// Grille des mots croisés : 7 lignes × 6 colonnes, null = case noire, sinon
// une case blanche, numérotée au début d'un mot (voir numeros/01.js pour les
// solutions FR et EN, construites sur deux grilles différentes).
const MC_GRILLE = [
  [null, null, null, { n: 1 }, null, { n: 2 }],
  [null, null, null, {}, null, {}],
  [{ n: 3 }, {}, { n: 4 }, {}, {}, {}],
  [null, null, {}, null, { n: 5 }, {}],
  [{ n: 6 }, {}, {}, {}, {}, {}],
  [null, null, {}, null, {}, null],
  [null, null, null, null, {}, null],
]

function MotsCroises({ data, lang }) {
  const d = lang === 'en' ? data.en : data.fr
  const horizontales = d.clues.filter((c) => c.dir === 'h').sort((a, b) => a.n - b.n)
  const verticales = d.clues.filter((c) => c.dir === 'v').sort((a, b) => a.n - b.n)
  return (
    <div className="ms-mots-croises">
      <Intertitre>{lt(data.titre, lang)}</Intertitre>
      <div className="ms-grille-mc" style={{ gridTemplateColumns: `repeat(${MC_GRILLE[0].length}, 1fr)` }}>
        {MC_GRILLE.flatMap((ligne, r) =>
          ligne.map((c, col) => (
            <div key={`${r}-${col}`} className={`ms-case-mc${c ? '' : ' ms-case-vide'}`}>
              {c?.n && <b>{c.n}</b>}
            </div>
          )),
        )}
      </div>
      <div className="ms-clues">
        <div>
          <Intertitre>{lang === 'fr' ? 'Horizontales' : 'Across'}</Intertitre>
          {horizontales.map((c) => <p key={c.n}>{c.n}. {c.texte}</p>)}
        </div>
        <div>
          <Intertitre>{lang === 'fr' ? 'Verticales' : 'Down'}</Intertitre>
          {verticales.map((c) => <p key={c.n}>{c.n}. {c.texte}</p>)}
        </div>
      </div>
      <p className="ms-solution">{d.solution}</p>
    </div>
  )
}

function PageJeu({ data, lang }) {
  return (
    <Page folio={data.folio} tete={lt(LT.surTitre, lang)} classe="ms-jeu-page">
      <h2 className="ms-titre-page">{lt(data.titre, lang)}</h2>
      <Labyrinthe data={data.labyrinthe} lang={lang} />
      <MotsCroises data={data.motsCroises} lang={lang} />
    </Page>
  )
}

// Liste des 20 pages du numéro, dans l'ordre de lecture (= position/folio)
function pagesDuNumero(numero, lang, atelier) {
  const [recit1, recit2, recit3] = numero.recits
  return [
    () => <Couverture numero={numero} lang={lang} />,
    () => <PageSommaireEdito numero={numero} lang={lang} />,
    () => <PageRecitOuverture recit={recit1} lang={lang} />,
    () => <PageRecitSuite recit={recit1} lang={lang} atelier={atelier} page={1} />,
    () => <PageRecitSuite recit={recit1} lang={lang} atelier={atelier} page={2} />,
    () => <PageSaviezVous data={numero.saviezVous} lang={lang} />,
    () => <PageRecitOuverture recit={recit2} lang={lang} />,
    () => <PageRecitSuite recit={recit2} lang={lang} atelier={atelier} page={1} />,
    () => <PageRecitSuite recit={recit2} lang={lang} atelier={atelier} page={2} />,
    () => <PageReclames data={numero.reclames} lang={lang} />,
    () => <PageRecette data={numero.recette} lang={lang} atelier={atelier} />,
    () => <PageRecitOuverture recit={recit3} lang={lang} />,
    () => <PageRecitSuite recit={recit3} lang={lang} atelier={atelier} page={1} />,
    () => <PageRecitSuite recit={recit3} lang={lang} atelier={atelier} page={2} />,
    () => <PageCourrier data={numero.courrier} lang={lang} />,
    () => <PageFeuilleton1 data={numero.feuilleton} lang={lang} atelier={atelier} />,
    () => <PageFeuilleton2 data={numero.feuilleton} lang={lang} />,
    () => <PageMarmite data={numero.marmite} lang={lang} atelier={atelier} />,
    () => <PageJeu data={numero.jeu} lang={lang} />,
    () => <QuatriemeCouverture numero={numero} lang={lang} />,
  ]
}

// Regroupe les pages en planches : couverture seule à droite, puis les pages
// deux par deux, la 4ᵉ de couverture seule à gauche
function enPlanches(pages) {
  const planches = [[null, pages[0]]]
  for (let i = 1; i < pages.length; i += 2) planches.push([pages[i], pages[i + 1] ?? null])
  return planches
}

function Cote({ page, cote }) {
  if (!page) return <div className={`ms-cote ms-cote-${cote} ms-cote-vide`} />
  return <div className={`ms-cote ms-cote-${cote}`}>{page()}</div>
}

// ---------- Page d'attente (numéro pas encore paru, sans ?epreuve) ----------

function PageAttente({ numero, lang }) {
  useNoindex(true)
  useEffect(() => {
    document.title = `${lt(LT.surTitre, lang)} · 1977 Éditions`
  }, [lang])

  if (!numero) {
    return (
      <div className="ms-attente">
        <h1>MIDNIGHT SNACK</h1>
        <p>{lt(LT.attenteAucun, lang)}</p>
        <Link to="/">← {lt(LT.bibliotheque, lang)}</Link>
      </div>
    )
  }
  return (
    <div className="ms-attente">
      <h1>MIDNIGHT SNACK</h1>
      <p className="ms-attente-date">
        {lt(numero.sousTitre, lang)} · {lt(LT.attenteEnKiosque, lang)} {formatDate(numero.parution, lang)}
      </p>
      <p>{lt(LT.attenteTexte, lang)}</p>
      <Link to="/">← {lt(LT.bibliotheque, lang)}</Link>
    </div>
  )
}

// ---------- Le livre ouvert (numéro paru, ou épreuve) ----------

function LivreOuvert({ numero, lang, atelier, epreuve, basculerLangue }) {
  const pages = pagesDuNumero(numero, lang, atelier)
  const planches = enPlanches(pages)
  const derniere = planches.length - 1

  const [planche, setPlanche] = useState(() => {
    const n = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), derniere) : 0
  })
  const [tour, setTour] = useState(null)

  useNoindex(epreuve)
  useEffect(() => {
    document.title = `${lt(LT.surTitre, lang)} · 1977 Éditions`
  }, [lang])
  useEffect(() => {
    window.history.replaceState(null, '', planche ? `#${planche}` : window.location.pathname + window.location.search)
  }, [planche])

  const aller = useCallback((vers) => {
    if (tour || vers < 0 || vers > derniere || vers === planche) return
    if (mouvementReduit()) { setPlanche(vers); return }
    setTour({ vers, sens: vers > planche ? 'avant' : 'arriere' })
  }, [tour, derniere, planche])
  const finTour = () => {
    if (!tour) return
    setPlanche(tour.vers)
    setTour(null)
  }

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'ArrowRight') aller(planche + 1)
      if (e.key === 'ArrowLeft') aller(planche - 1)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [aller, planche])

  const [x0, setX0] = useState(null)
  const glisser = {
    onTouchStart: (e) => setX0(e.touches[0].clientX),
    onTouchEnd: (e) => {
      if (x0 === null) return
      const dx = e.changedTouches[0].clientX - x0
      if (Math.abs(dx) > 50) aller(planche + (dx < 0 ? 1 : -1))
      setX0(null)
    },
  }

  const [g, d] = planches[planche]
  let gauche = g
  let droite = d
  let feuillet = null
  if (tour) {
    const [vg, vd] = planches[tour.vers]
    if (tour.sens === 'avant') {
      droite = vd
      feuillet = { cote: 'droite', recto: d, verso: vg }
    } else {
      gauche = vg
      feuillet = { cote: 'gauche', recto: g, verso: vd }
    }
  }
  const ferme = planche === 0 && !tour

  return (
    <div className="ms-table">
      <nav className="ms-bandeau no-print">
        <Link to="/" className="ms-retour">← {lt(LT.bibliotheque, lang)}</Link>
        <span className="ms-bandeau-titre">{lt(LT.surTitre, lang)}</span>
        <span className="ms-bandeau-droite">
          <button type="button" onClick={() => window.print()}>{lt(LT.imprimer, lang)}</button>
          <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </span>
      </nav>

      {epreuve && (
        <div className="ms-epreuve no-print">
          {lt(LT.epreuveBandeau, lang)} — {lt(numero.sousTitre, lang)} · {lt(LT.attenteEnKiosque, lang)} {formatDate(numero.parution, lang)}
        </div>
      )}

      <div className={`ms-livre no-print${ferme ? ' ms-ferme' : ''}${planche === derniere && !tour ? ' ms-dos' : ''}`} {...glisser}>
        <Cote page={gauche} cote="gauche" />
        <Cote page={droite} cote="droite" />
        {feuillet && (
          <div
            key={`${planche}>${tour.vers}`}
            className={`ms-feuillet ms-feuillet-${feuillet.cote}`}
            onAnimationEnd={finTour}
            aria-hidden="true"
          >
            <div className="ms-face ms-recto">{feuillet.recto?.()}</div>
            <div className="ms-face ms-verso">{feuillet.verso?.()}</div>
          </div>
        )}
        {planche > 0 && <button type="button" className="ms-zone ms-zone-gauche" aria-label={lt(LT.precedente, lang)} onClick={() => aller(planche - 1)} />}
        {planche < derniere && <button type="button" className="ms-zone ms-zone-droite" aria-label={planche === 0 ? lt(LT.ouvrir, lang) : lt(LT.suivante, lang)} onClick={() => aller(planche + 1)} />}
      </div>

      <div className="ms-commandes no-print">
        <button type="button" onClick={() => aller(planche - 1)} disabled={planche === 0} aria-label={lt(LT.precedente, lang)}>‹</button>
        <span className="ms-pagination">
          {planches.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === planche ? 'actif' : ''}
              aria-current={i === planche ? 'page' : undefined}
              aria-label={`${i + 1} / ${planches.length}`}
              onClick={() => aller(i)}
            />
          ))}
        </span>
        <button type="button" onClick={() => aller(planche + 1)} disabled={planche === derniere} aria-label={lt(LT.suivante, lang)}>›</button>
      </div>

      {/* Téléphone et impression : toutes les pages, l'une sous l'autre */}
      <div className="ms-pile">
        {pages.map((page, i) => (
          <div key={i} className="ms-pile-page">{page()}</div>
        ))}
      </div>
    </div>
  )
}

export default function MidnightLivre() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const { numero: numeroParam } = useParams()
  const { search } = useLocation()
  const epreuve = new URLSearchParams(search).has('epreuve')
  const atelier = modeAtelier(search)

  const numero = numeroParam ? getNumero(Number(numeroParam)) : getNumeroParDefaut()
  const paru = numero ? estParu(numero) : false

  if (!numero || (!paru && !epreuve)) {
    return <PageAttente numero={numero} lang={lang} />
  }

  return <LivreOuvert numero={numero} lang={lang} atelier={atelier} epreuve={!paru} basculerLangue={basculerLangue} />
}
