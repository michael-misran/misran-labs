import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { LT, lt, PICTO_AGENT } from './atelierTexte'
import { SchemaEclateAtelier, SchemaCircuit, SchemaControleur, Pictogramme } from './schemas'
import './atelier.css'

// « L'Atelier automatique », le livre de l'IA de 1977 Éditions, mis en page
// comme une notice technique des années 70. Mécanique du tourne-pages copiée
// de src/portfolio/PortfolioLivre.jsx (D2 de la SPEC : pas de mutualisation).

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// ---------- Éléments communs ----------

function Tetiere({ g, d }) {
  return (
    <div className="at-tetiere">
      <span>{g}</span>
      <span>{d}</span>
    </div>
  )
}

function FolioNum({ n }) {
  return <div className="at-folio">{n}</div>
}

function Intertitre({ children }) {
  return <h3 className="at-intertitre">{children}</h3>
}

// Page de texte (papier), côté déduit de la parité du folio comme au Portfolio
function PagePapier({ folio, tete, classe = '', children }) {
  const cote = folio % 2 === 0 ? 'gauche' : 'droite'
  return (
    <section className={`at-page at-papier at-${cote} ${classe}`}>
      {tete && <Tetiere g={tete[0]} d={tete[1]} />}
      <div className="at-corps">{children}</div>
      <FolioNum n={folio} />
    </section>
  )
}

// ---------- Couverture ----------

function Couverture({ lang }) {
  return (
    <section className="at-page at-plan at-couv">
      <div className="at-bandeau">
        <span>1977 Éditions</span>
        <span>{lt(LT.bandeauCentre, lang)}</span>
        <span>{lang.toUpperCase()}</span>
      </div>
      <div className="at-titre">
        <span className="at-l1">{lt(LT.titreL1, lang)}</span>
        <span className="at-l2">{lt(LT.titreL2, lang)}</span>
        <div className="at-sous">
          <span>{lt(LT.sousL1, lang)}<br />{lt(LT.sousL2, lang)}</span>
          <span>{lt(LT.editionCouv, lang)}</span>
        </div>
      </div>
      <SchemaEclateAtelier lang={lang} />
      <div className="at-fig">{lt(LT.figCouverture, lang)}</div>
      <div className="at-avis">{lt(LT.avisL1, lang)}<br />{lt(LT.avisL2, lang)}</div>
      <div className="at-legende">
        {LT.legendeAgents.map((nom, i) => (
          <div key={nom}><b>{i + 1}</b>{nom}</div>
        ))}
      </div>
      <div className="at-plaque">
        <span className="at-k">{lt(LT.plaqueModeleK, lang)}</span><span className="at-v">{lt(LT.plaqueModeleV, lang)}</span>
        <span className="at-k">{lt(LT.plaqueAlimK, lang)}</span><span className="at-v">{lt(LT.plaqueAlimV, lang)}</span>
        <span className="at-k">{lt(LT.plaqueFabK, lang)}</span><span className="at-v">{lt(LT.plaqueFabV, lang)}</span>
      </div>
    </section>
  )
}

function QuatriemeCouverture({ lang }) {
  return (
    <section className="at-page at-plan at-quatrieme">
      <div className="at-corps">
        <span className="at-fleuron" aria-hidden="true">⚙</span>
        <p className="at-phrase">{lt(LT.quatriemePhrase, lang)}</p>
        <span className="at-edition">1977 Éditions</span>
      </div>
      <div className="at-plaque">
        <span className="at-k">{lt(LT.plaqueModeleK, lang)}</span><span className="at-v">{lt(LT.plaqueModeleV, lang)}</span>
        <span className="at-k">{lt(LT.plaqueAlimK, lang)}</span><span className="at-v">{lt(LT.plaqueAlimV, lang)}</span>
      </div>
    </section>
  )
}

// ---------- Liste des pages, dans l'ordre de lecture ----------
//
// Chaque entrée est [cle, rendu] : `rendu(folio, folios)` reçoit son propre
// folio, calculé depuis sa position dans la liste (jamais un nombre en dur),
// et la table `folios` (cle de partie → folio de sa page d'ouverture), pour
// que le sommaire affiche toujours les vrais numéros. `cle` n'est renseignée
// que pour la première page de chaque partie (voir LT.parties).

function pagesDuLivre(lang) {
  const agentFicheRow = (k, v) => (<tr key={k}><th>{k}</th><td>{v}</td></tr>)

  const entrees = [
    // couverture
    [null, () => <Couverture lang={lang} />],

    // garde : avant de lire
    [null, (folio) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.gardeTitre, lang)}</h2>
        <p className="at-lettrine">{lt(LT.gardeTexte, lang)}</p>
        <p>{lt(LT.gardeLecture, lang)}</p>
      </PagePapier>
    )],

    // sommaire
    [null, (folio, folios) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.sommaireTitre, lang)}</h2>
        <ol className="at-liste-sommaire">
          {LT.parties.map((p, i) => (
            <li key={i} className={p.annexe ? 'at-annexe' : ''}>
              <span>{lt(p.titre, lang)}</span>
              <i aria-hidden="true" />
              {folios[p.cle] ? <b>{folios[p.cle]}</b> : <span className="at-prepa">{lt(LT.enPreparation, lang)}</span>}
            </li>
          ))}
        </ol>
      </PagePapier>
    )],

    // partie 0, page 1 : intro + règle Git
    ['p0', (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p0Titre, lang), '0.1']}>
        <h2><small>{lt(LT.p0Chapeau, lang)}</small>{lt(LT.p0Titre, lang)}</h2>
        <p>{lt(LT.p0Intro, lang)}</p>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lt(LT.p0GitTitre, lang)}</strong>{lt(LT.p0GitTexte, lang)}</div>
        </div>
      </PagePapier>
    )],

    // partie 0, page 2 : dépôt public + cas d'école
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p0Titre, lang), '0.2']}>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lt(LT.p0PublicTitre, lang)}</strong>{lt(LT.p0PublicTexte, lang)}</div>
        </div>
        <Intertitre>{lt(LT.p0CasTitre, lang)}</Intertitre>
        <p>{lt(LT.p0CasTexte, lang)}</p>
        <div className="at-ecran">
          {LT.p0Ecran.map((l, i) => (
            <div key={i} className={l.attn ? 'at-attn' : l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
          <div className="at-attn">{lt(LT.p0EcranVerdict, lang)}</div>
        </div>
        <p className="at-note-fig">{lt(LT.p0NoteFig, lang)}</p>
      </PagePapier>
    )],

    // partie 1, figure (plan, gauche)
    ['p1', (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.p1Titre, lang)} d="Fig. 3" />
        <SchemaCircuit lang={lang} />
        <div className="at-cartouche">
          <div><strong>{lt(LT.p1FigLegende, lang)}</strong>{lt(LT.p1Cartouche, lang)}</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 1, texte (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p1Titre, lang), '1.1']}>
        <h2><small>{lang === 'en' ? 'Part 1' : 'Partie 1'}</small>{lt(LT.p1Titre, lang)}</h2>
        <p>{lt(LT.p1Texte1, lang)}</p>
        <p>{lt(LT.p1Texte2, lang)}</p>
        <p>{lt(LT.p1Texte3, lang)}</p>
      </PagePapier>
    )],

    // partie 2, ouverture, gauche (plan)
    ['p2', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">2</span>
          <h2>{lt(LT.p2Titre, lang)}</h2>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, ouverture, droite (papier)
    [null, (folio) => (
      <section className="at-page at-papier at-droite at-ouverture">
        <div className="at-corps">
          <p>{lt(LT.p2OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, le controleur : figure (plan, gauche)
    [null, (folio) => (
      <section className="at-page at-plan at-gauche">
        <Tetiere g={lt(LT.titreOnglet, lang)} d="Fig. 7" />
        <SchemaControleur lang={lang} />
        <div className="at-cartouche">
          <div><strong>{`Fig. 7 — ${lt(LT.p2ControleurTitre, lang)}`}</strong>A {lang === 'en' ? 'handle' : 'poignée'} · B {lang === 'en' ? 'checks' : 'contrôles'} · C {lang === 'en' ? 'verdict' : 'verdict'} · D pull request</div>
          <div>{lang === 'en' ? 'Scale' : 'Échelle'}<br />1 : 1</div>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 2, le controleur : fiche (papier, droite)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p2Chap, lang), '2.1']}>
        <h2><small>{lt(LT.p2ControleurFicheN, lang)}</small>{lt(LT.p2ControleurTitre, lang)}</h2>
        <p>{lt(LT.p2ControleurTexte, lang)}</p>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lang === 'en' ? 'Called' : 'Appelé', lt(LT.p2ControleurAppele, lang))}
          {agentFicheRow(lang === 'en' ? 'Checks' : 'Contrôle', lt(LT.p2ControleurControle, lang))}
          {agentFicheRow(lang === 'en' ? 'Never' : 'Ne fait jamais', lt(LT.p2ControleurJamais, lang))}
        </tbody></table>
        <div className="at-attention">
          <div className="at-bande" />
          <div><strong>{lang === 'en' ? 'Warning' : 'Attention'}</strong>{lt(LT.p2ControleurAttention, lang)}</div>
        </div>
        <div className="at-ecran">
          {LT.p2ControleurEcran.map((l, i) => (
            <div key={i} className={l.ok ? 'at-ok' : ''}>{lt(l, lang)}</div>
          ))}
          <div className="at-ok">{lt(LT.p2ControleurVerdict, lang)}</div>
        </div>
        <p className="at-note-fig">{lt(LT.p2ControleurNoteFig, lang)}</p>
      </PagePapier>
    )],

    // partie 2, les six autres agents (papier)
    ...LT.p2Agents.map((a) => [null, (folio) => (
      <PagePapier key={a.nom} folio={folio} tete={[lt(LT.p2Chap, lang), `2.${a.ficheN}`]}>
        <div className="at-pictogramme"><Pictogramme nom={PICTO_AGENT[a.nom]} /></div>
        <h2><small>{lang === 'en' ? `Staff card no. ${a.ficheN}` : `Fiche agent n° ${a.ficheN}`}</small>{lt(a.titre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lang === 'en' ? 'Role' : 'Rôle', lt(a.texte, lang))}
          {agentFicheRow(lang === 'en' ? 'Called' : 'Appelé', lt(a.appele, lang))}
          {agentFicheRow(lang === 'en' ? 'Never' : 'Ne fait jamais', lt(a.jamais, lang))}
          {agentFicheRow(lang === 'en' ? 'Model' : 'Modèle', a.modele)}
        </tbody></table>
      </PagePapier>
    )]),

    // partie 3, ouverture (plan)
    ['p3', (folio) => (
      <section className="at-page at-plan at-gauche at-ouverture">
        <div className="at-corps">
          <span className="at-num">3</span>
          <h2>{lt(LT.p3Titre, lang)}</h2>
          <p>{lt(LT.p3OuvertureTexte, lang)}</p>
        </div>
        <FolioNum n={folio} />
      </section>
    )],

    // partie 3, une page par routine (papier)
    ...LT.p3Routines.map((r, i) => [null, (folio) => (
      <PagePapier key={i} folio={folio} tete={[lt(LT.p3Chap, lang), `3.${i + 1}`]}>
        <h2>{lt(r.titre, lang)}</h2>
        <table className="at-fiche"><tbody>
          {agentFicheRow(lt(LT.p3HoraireK, lang), lt(r.horaire, lang))}
          {agentFicheRow(lt(LT.p3ModeleK, lang), r.modele)}
          {agentFicheRow(lt(LT.p3ProduitK, lang), lt(r.produit, lang))}
          {agentFicheRow(lt(LT.p3MichaelK, lang), lt(r.michael, lang))}
        </tbody></table>
        <p>{lt(r.texte, lang)}</p>
      </PagePapier>
    )]),

    // partie 3, tableau récapitulatif (papier)
    [null, (folio) => (
      <PagePapier folio={folio} tete={[lt(LT.p3Chap, lang), '3.6']}>
        <h2>{lt(LT.p3TableTitre, lang)}</h2>
        <table className="at-recap">
          <thead>
            <tr>{lt(LT.p3TableCols, lang).map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {LT.p3TableRows.map((row, i) => (
              <tr key={i}>
                <td>{lt(row[0], lang)}</td>
                <td>{lt(row[1], lang)}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PagePapier>
    )],

    // page de notes, lignée
    [null, (folio) => (
      <PagePapier folio={folio}>
        <h2>{lt(LT.notesTitre, lang)}</h2>
        <div className="at-lignes" aria-hidden="true" />
      </PagePapier>
    )],

    // 4ᵉ de couverture
    [null, () => <QuatriemeCouverture lang={lang} />],
  ]

  const folios = {}
  entrees.forEach(([cle], i) => { if (cle) folios[cle] = i + 1 })
  return entrees.map(([, rendu], i) => () => rendu(i + 1, folios))
}

// Regroupe les pages en planches : couverture seule à droite, puis les pages
// deux par deux, la 4ᵉ de couverture seule à gauche
function enPlanches(pages) {
  const planches = [[null, pages[0]]]
  for (let i = 1; i < pages.length; i += 2) planches.push([pages[i], pages[i + 1] ?? null])
  return planches
}

function Cote({ page, cote }) {
  if (!page) return <div className={`at-cote at-cote-${cote} at-cote-vide`} />
  return <div className={`at-cote at-cote-${cote}`}>{page()}</div>
}

export default function AtelierLivre() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const pages = pagesDuLivre(lang)
  const planches = enPlanches(pages)
  const derniere = planches.length - 1

  const [planche, setPlanche] = useState(() => {
    const n = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), derniere) : 0
  })
  const [tour, setTour] = useState(null)

  useEffect(() => {
    document.title = `${lt(LT.titreOnglet, lang)} · 1977 Éditions`
  }, [lang])
  useEffect(() => {
    window.history.replaceState(null, '', planche ? `#${planche}` : window.location.pathname)
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
    <div className="at-table">
      <nav className="at-nav no-print">
        <Link to="/" className="at-retour">← {lt(LT.bibliotheque, lang)}</Link>
        <span className="at-nav-titre">{lt(LT.titreOnglet, lang)}</span>
        <span className="at-nav-droite">
          <button type="button" onClick={() => window.print()}>{lt(LT.imprimer, lang)}</button>
          <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </span>
      </nav>

      <div className={`at-livre no-print${ferme ? ' at-ferme' : ''}${planche === derniere && !tour ? ' at-dos' : ''}`} {...glisser}>
        <Cote page={gauche} cote="gauche" />
        <Cote page={droite} cote="droite" />
        {feuillet && (
          <div
            key={`${planche}>${tour.vers}`}
            className={`at-feuillet at-feuillet-${feuillet.cote}`}
            onAnimationEnd={finTour}
            aria-hidden="true"
          >
            <div className="at-face at-recto">{feuillet.recto?.()}</div>
            <div className="at-face at-verso">{feuillet.verso?.()}</div>
          </div>
        )}
        {planche > 0 && <button type="button" className="at-zone at-zone-gauche" aria-label={lt(LT.precedente, lang)} onClick={() => aller(planche - 1)} />}
        {planche < derniere && <button type="button" className="at-zone at-zone-droite" aria-label={planche === 0 ? lt(LT.ouvrir, lang) : lt(LT.suivante, lang)} onClick={() => aller(planche + 1)} />}
      </div>

      <div className="at-commandes no-print">
        <button type="button" onClick={() => aller(planche - 1)} disabled={planche === 0} aria-label={lt(LT.precedente, lang)}>‹</button>
        <span className="at-pagination">
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

      <div className="at-pile">
        {pages.map((page, i) => (
          <div key={i} className="at-pile-page">{page()}</div>
        ))}
      </div>
    </div>
  )
}
