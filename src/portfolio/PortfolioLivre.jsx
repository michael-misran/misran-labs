import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { CV } from '../modules/cvDonnees'
import { ENCARTS } from './encarts'
import { LT, lt } from './livreTexte'
import './portfolio.css'

// Le portfolio de Michael, pour les recruteurs : un livre relié rangé dans la
// bibliothèque du Lab. Il s'ouvre en double page sur la table de lecture ;
// on tourne les pages avec les flèches, le clavier, un clic sur la page ou un
// glissé du doigt. Sur téléphone, les pages s'empilent. Impression : une page
// A5 par page du livre.
// Les emplacements d'images (« encarts ») se remplissent dans encarts.js.

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Consignes des encarts visibles en local, ou avec ?atelier dans l'adresse
const modeAtelier = (search) => import.meta.env.DEV || new URLSearchParams(search).has('atelier')

const ROMAINS = ['I', 'II', 'III', 'IV', 'V', 'VI']

// ---------- Éléments communs ----------

// Emplacement d'image ou de maquette
function Encart({ id, lang, atelier, grand }) {
  const e = ENCARTS[id]
  const style = e.ratio ? { aspectRatio: e.ratio } : undefined
  return (
    <figure className={`pf-encart${e.ratio ? '' : ' pf-encart-libre'}${grand ? ' pf-encart-grand' : ''}`}>
      {e.image ? (
        <img className={`pf-encart-image${e.entier ? ' pf-encart-entier' : ''}`} src={e.image} alt={lt(e.legende, lang)} style={style} />
      ) : (
        <div className="pf-encart-cadre" style={style}>
          <span className="pf-repere pf-repere-hg" aria-hidden="true" />
          <span className="pf-repere pf-repere-bd" aria-hidden="true" />
          {atelier && (
            <div className="pf-consigne">
              <b>{lt(LT.aAjouter, lang)}</b>
              <span>{e.consigne}</span>
              <small>public/portfolio/{id}.jpg{e.ratio ? ` · ${e.ratio.replace(/ /g, '')}` : ''}</small>
            </div>
          )}
        </div>
      )}
      <figcaption>{lt(e.legende, lang)}</figcaption>
    </figure>
  )
}

// Page du livre : tête courante, contenu, folio
function Page({ folio, tete, classe = '', children }) {
  const cote = folio % 2 === 0 ? 'gauche' : 'droite'
  return (
    <section className={`pf-page pf-page-${cote} ${classe}`}>
      <div className="pf-marge">
        {tete && <div className="pf-tete">{tete}</div>}
        <div className="pf-contenu">{children}</div>
        <div className="pf-folio">{folio}</div>
      </div>
    </section>
  )
}

// Ouverture de chapitre : numéro romain, titre, chapô
function Chapitre({ n, titre, chapo }) {
  return (
    <header className="pf-chapitre">
      <span className="pf-chapitre-num">{ROMAINS[n - 1]}</span>
      <h2>{titre}</h2>
      <p className="pf-chapo">{chapo}</p>
    </header>
  )
}

function Intertitre({ children }) {
  return <h3 className="pf-intertitre">{children}</h3>
}

// Expérience du CV : poste, date, puces
function Poste({ titre, date, puces, texte }) {
  return (
    <div className="pf-poste">
      <div className="pf-poste-tete">
        <b>{titre}</b>
        {date && <span>{date}</span>}
      </div>
      {texte && <p>{texte}</p>}
      {puces && (
        <ul>
          {puces.map((p) => (
            <li key={p.label}><em>{p.label}.</em> {p.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---------- Les pages ----------

function Couverture({ lang }) {
  return (
    <section className="pf-page pf-couverture">
      <div className="pf-couv-cadre">
        <span className="pf-couv-sur">{lt(LT.surTitre, lang)}</span>
        <span className="pf-couv-fleuron" aria-hidden="true">❦</span>
        <h1>{lt(LT.nom, lang)}</h1>
        <span className="pf-couv-filet" aria-hidden="true" />
        <p className="pf-couv-metier">{lt(LT.metier, lang)}</p>
        <p className="pf-couv-spe">{lt(LT.specialite, lang)}</p>
        <span className="pf-couv-edition">{lt(LT.edition, lang)} · 1977 Éditions</span>
      </div>
    </section>
  )
}

function QuatriemeCouverture({ lang }) {
  return (
    <section className="pf-page pf-couverture pf-quatrieme">
      <div className="pf-couv-cadre">
        <span className="pf-couv-fleuron" aria-hidden="true">❦</span>
        <p className="pf-quatrieme-citation">{lt(LT.quatrieme, lang)}</p>
        <span className="pf-couv-filet" aria-hidden="true" />
        <span className="pf-couv-edition">misranmichael@gmail.com</span>
        <span className="pf-couv-edition">linkedin.com/in/michael-misran</span>
      </div>
    </section>
  )
}

// Liste des pages du livre, dans l'ordre de lecture (folio = position)
function pagesDuLivre(lang, atelier) {
  const c = CV[lang] ?? CV.fr
  const E = (id, grand) => <Encart id={id} lang={lang} atelier={atelier} grand={grand} />
  const chapitres = [
    { titre: lt(LT.parcours, lang), folio: 4 },
    { titre: lt(LT.ch1, lang), folio: 6 },
    { titre: lt(LT.ch2, lang), folio: 8 },
    { titre: lt(LT.ch3, lang), folio: 10 },
    { titre: lt(LT.chAgents, lang), folio: 12 },
    { titre: lt(LT.ch4, lang), folio: 14 },
    { titre: lt(LT.ch5, lang), folio: 16 },
    { titre: lt(LT.temoignages, lang), folio: 18 },
  ]

  return [
    // 1 — couverture
    () => <Couverture lang={lang} />,

    // 2 — page de garde et sommaire
    () => (
      <Page folio={2} classe="pf-garde">
        <h2 className="pf-titre-page">{lt(LT.gardeTitre, lang)}</h2>
        <p className="pf-lettrine">{lt(LT.gardeTexte, lang)}</p>
        <p className="pf-note">{lt(LT.gardeLecture, lang)}</p>
        <Intertitre>{lt(LT.sommaire, lang)}</Intertitre>
        <ol className="pf-sommaire">
          {chapitres.map((ch) => (
            <li key={ch.folio}>
              <span>{ch.titre}</span>
              <i aria-hidden="true" />
              <b>{ch.folio}</b>
            </li>
          ))}
        </ol>
      </Page>
    ),

    // 3 — portrait
    () => (
      <Page folio={3} classe="pf-portrait">
        <div className="pf-portrait-photo">{E('portrait')}</div>
        <h2 className="pf-titre-page">{lt(LT.nom, lang)}</h2>
        <p className="pf-sous-titre">{c.subtitle}</p>
        <Intertitre>{lt(LT.profil, lang)}</Intertitre>
        <p><strong>{c.profileIntro}</strong>{c.profileRest}</p>
        <Intertitre>{lt(LT.contact, lang)}</Intertitre>
        <ul className="pf-contact">
          <li>{lt(LT.lieu, lang)}</li>
          <li><a href="mailto:misranmichael@gmail.com">misranmichael@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/michael-misran" target="_blank" rel="noreferrer">linkedin.com/in/michael-misran</a></li>
        </ul>
      </Page>
    ),

    // 4 — parcours
    () => (
      <Page folio={4} tete={lt(LT.parcours, lang)}>
        <h2 className="pf-titre-page">{lt(LT.parcours, lang)}</h2>
        <Poste titre={c.concentrixTitle} date={c.concentrixDate} puces={c.concentrixBullets} />
        <Poste titre={`${c.iadTitle} — ${c.iadDesignTitle}`} date={c.iadDesignDate} puces={c.iadDesignBullets} />
      </Page>
    ),

    // 5 — parcours (suite), compétences, formation
    () => (
      <Page folio={5} tete={lt(LT.parcoursSuite, lang)}>
        <Poste titre={`${c.iadTitle} — ${c.iadDevTitle}`} date={c.iadDevDate} puces={c.iadDevBullets} />
        <Poste titre={c.planNetTitle} date={c.planNetDate} texte={c.planNetText} />
        <Intertitre>{lt(LT.competences, lang)}</Intertitre>
        <dl className="pf-competences">
          {c.expertise.map((x) => (
            <div key={x.label}><dt>{x.label}</dt><dd>{x.text}</dd></div>
          ))}
        </dl>
        <Intertitre>{lt(LT.formation, lang)}</Intertitre>
        <Poste titre={c.eduTitle} date={c.eduDate} texte={c.eduText} />
      </Page>
    ),

    // 6 — chapitre I : workflow multi-produits
    () => (
      <Page folio={6} tete={`${ROMAINS[0]} · ${lt(LT.ch1, lang)}`}>
        <Chapitre n={1} titre={lt(LT.ch1, lang)} chapo={lt(LT.ch1Chapo, lang)} />
        <blockquote className="pf-regle">{lt(LT.ch1Regle, lang)}</blockquote>
        <Intertitre>{lt(LT.ch1Temps, lang)}</Intertitre>
        <ul className="pf-barres">
          {LT.ch1Blocs.map((b) => (
            <li key={b.part}>
              <span className="pf-barre" style={{ '--part': b.part }}><b>{b.part} %</b></span>
              <span>{lt(b, lang)}</span>
            </li>
          ))}
        </ul>
        <p className="pf-note">{lt(LT.ch1Alerte, lang)}</p>
      </Page>
    ),

    // 7 — preuves du chapitre I
    () => (
      <Page folio={7} tete={`${ROMAINS[0]} · ${lt(LT.ch1, lang)}`} classe="pf-preuves">
        {E('workflow-board', true)}
        {E('workflow-rituels')}
      </Page>
    ),

    // 8 — chapitre II : design system client
    () => (
      <Page folio={8} tete={`${ROMAINS[1]} · ${lt(LT.ch2, lang)}`}>
        <Chapitre n={2} titre={lt(LT.ch2, lang)} chapo={lt(LT.ch2Chapo, lang)} />
        <ol className="pf-tiers">
          {LT.ch2Tiers.map((t, i) => (
            <li key={i} style={{ '--i': i }}>
              <b>{lt(t.nom, lang)}</b>
              <span>{lt(t, lang)}</span>
            </li>
          ))}
        </ol>
        <Intertitre>{lt(LT.ch2Pipeline, lang)}</Intertitre>
        <ol className="pf-pipeline">
          {LT.ch2Etapes.map((e, i) => <li key={i}>{lt(e, lang)}</li>)}
        </ol>
        <p className="pf-note">{lt(LT.ch2Resultat, lang)}</p>
      </Page>
    ),

    // 9 — preuves du chapitre II
    () => (
      <Page folio={9} tete={`${ROMAINS[1]} · ${lt(LT.ch2, lang)}`} classe="pf-preuves">
        {E('ds-figma')}
        {E('ds-github')}
        {E('ds-composants')}
      </Page>
    ),

    // 10 — chapitre III : l'IA
    () => (
      <Page folio={10} tete={`${ROMAINS[2]} · ${lt(LT.ch3, lang)}`}>
        <Chapitre n={3} titre={lt(LT.ch3, lang)} chapo={lt(LT.ch3Chapo, lang)} />
        <dl className="pf-points">
          {LT.ch3Points.map((p, i) => (
            <div key={i}><dt>{lt(p.titre, lang)}</dt><dd>{lt(p, lang)}</dd></div>
          ))}
        </dl>
        <blockquote className="pf-regle">{lt(LT.ch3Preuve, lang)}</blockquote>
      </Page>
    ),

    // 11 — preuves du chapitre III
    () => (
      <Page folio={11} tete={`${ROMAINS[2]} · ${lt(LT.ch3, lang)}`} classe="pf-preuves">
        {E('ia-session')}
        {E('ia-figma-mcp')}
      </Page>
    ),

    // 12 — chapitre IV : les agents sur mes projets perso
    () => (
      <Page folio={12} tete={`${ROMAINS[3]} · ${lt(LT.chAgents, lang)}`}>
        <Chapitre n={4} titre={lt(LT.chAgents, lang)} chapo={lt(LT.chAgentsChapo, lang)} />
        <Intertitre>{lt(LT.chAgentsEquipe, lang)}</Intertitre>
        <div className="pf-organigramme">
          <div className="pf-org-chef"><b>{lt(LT.chAgentsChef, lang)}</b><span>{lt(LT.chAgentsChefRole, lang)}</span></div>
          <div className="pf-org-tour"><b>{lt(LT.chAgentsTour, lang)}</b><span>{lt(LT.chAgentsTourRole, lang)}</span></div>
          <ul className="pf-org-agents">
            {LT.chAgentsRoles.map((a) => (
              <li key={a.nom}>
                <b>{a.nom}</b>
                <i className={`pf-modele pf-modele-${a.modele.toLowerCase()}`}>{a.modele}</i>
                <span>{lt(a, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="pf-note">{lt(LT.chAgentsRegle, lang)}</p>
      </Page>
    ),

    // 13 — circuit, garde-fous, chiffres
    () => (
      <Page folio={13} tete={`${ROMAINS[3]} · ${lt(LT.chAgents, lang)}`}>
        <Intertitre>{lt(LT.chAgentsCircuit, lang)}</Intertitre>
        <ol className="pf-pipeline">
          {LT.chAgentsEtapes.map((e, i) => <li key={i}>{lt(e, lang)}</li>)}
        </ol>
        <Intertitre>{lt(LT.chAgentsGardeFous, lang)}</Intertitre>
        <ul className="pf-contact">
          {LT.chAgentsRegles.map((r, i) => <li key={i}>{lt(r, lang)}</li>)}
        </ul>
        <ul className="pf-chiffres">
          {LT.chAgentsChiffres.map((c) => (
            <li key={c.n}><b>{c.n}</b><span>{lt(c, lang)}</span></li>
          ))}
        </ul>
        <div className="pf-encart-souple">{E('agents-mission')}</div>
        <blockquote className="pf-regle">{lt(LT.chAgentsPreuve, lang)}</blockquote>
      </Page>
    ),

    // 14 — chapitre V : applications métiers
    () => (
      <Page folio={14} tete={`${ROMAINS[4]} · ${lt(LT.ch4, lang)}`}>
        <Chapitre n={5} titre={lt(LT.ch4, lang)} chapo={lt(LT.ch4Chapo, lang)} />
        <ul className="pf-etiquettes">
          {LT.ch4Outils.map((o, i) => <li key={i}>{lt(o, lang)}</li>)}
        </ul>
        <Intertitre>{lt(LT.ch4Methode, lang)}</Intertitre>
        <ol className="pf-pipeline pf-pipeline-vertical">
          {LT.ch4Etapes.map((e, i) => <li key={i}>{lt(e, lang)}</li>)}
        </ol>
        <blockquote className="pf-regle">{lt(LT.ch4Atout, lang)}</blockquote>
      </Page>
    ),

    // 15 — preuves du chapitre V
    () => (
      <Page folio={15} tete={`${ROMAINS[4]} · ${lt(LT.ch4, lang)}`} classe="pf-preuves">
        {E('iad-ecran', true)}
        {E('iad-parcours')}
      </Page>
    ),

    // 16 — chapitre VI : au Lab
    () => (
      <Page folio={16} tete={`${ROMAINS[5]} · ${lt(LT.ch5, lang)}`}>
        <Chapitre n={6} titre={lt(LT.ch5, lang)} chapo={lt(LT.ch5Chapo, lang)} />
        <dl className="pf-points">
          {LT.ch5Projets.map((p) => (
            <div key={p.to}>
              <dt><Link to={p.to}>{lt(p.titre, lang)} →</Link></dt>
              <dd>{lt(p, lang)}</dd>
            </div>
          ))}
        </dl>
      </Page>
    ),

    // 17 — preuves du chapitre VI
    () => (
      <Page folio={17} tete={`${ROMAINS[5]} · ${lt(LT.ch5, lang)}`} classe="pf-preuves">
        {E('lab-site')}
        {E('lab-audit')}
        {E('lab-jeu')}
      </Page>
    ),

    // 18 — témoignages
    () => (
      <Page folio={18} tete={lt(LT.temoignages, lang)} classe="pf-preuves">
        <h2 className="pf-titre-page">{lt(LT.temoignages, lang)}</h2>
        {E('recommandations', true)}
      </Page>
    ),

    // 19 — fin : contact
    () => (
      <Page folio={19} classe="pf-fin">
        <span className="pf-couv-fleuron" aria-hidden="true">❦</span>
        <h2 className="pf-titre-page">{lt(LT.finTitre, lang)}</h2>
        <p>{lt(LT.finTexte, lang)}</p>
        <ul className="pf-contact">
          <li><a href="mailto:misranmichael@gmail.com">misranmichael@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/michael-misran" target="_blank" rel="noreferrer">linkedin.com/in/michael-misran</a></li>
          <li><Link to="/lab/cv">{lt(LT.parcours, lang)} · misran-labs</Link></li>
        </ul>
      </Page>
    ),

    // 20 — 4ᵉ de couverture
    () => <QuatriemeCouverture lang={lang} />,
  ]
}

// Regroupe les pages en planches : couverture seule à droite, puis les pages
// deux par deux, la 4ᵉ de couverture seule à gauche
function enPlanches(pages) {
  const planches = [[null, pages[0]]]
  for (let i = 1; i < pages.length; i += 2) planches.push([pages[i], pages[i + 1] ?? null])
  return planches
}

// Un côté de la planche (vide : la table de lecture apparaît)
function Cote({ page, cote }) {
  if (!page) return <div className={`pf-cote pf-cote-${cote} pf-cote-vide`} />
  return <div className={`pf-cote pf-cote-${cote}`}>{page()}</div>
}

export default function PortfolioLivre() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const { search } = useLocation()
  const atelier = modeAtelier(search)
  const pages = pagesDuLivre(lang, atelier)
  const planches = enPlanches(pages)
  const derniere = planches.length - 1

  // Planche ouverte, retenue dans l'adresse (#4) pour partager une page précise
  const [planche, setPlanche] = useState(() => {
    const n = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), derniere) : 0
  })
  // Page en train de tourner : { vers, sens }
  const [tour, setTour] = useState(null)

  useEffect(() => {
    document.title = `${lt(LT.surTitre, lang)} · Michael Misran`
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

  // Clavier
  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'ArrowRight') aller(planche + 1)
      if (e.key === 'ArrowLeft') aller(planche - 1)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [aller, planche])

  // Glisser du doigt
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

  // Ce qui est posé à plat pendant qu'une page tourne, et le feuillet qui tourne
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
    <div className="pf-table">
      <nav className="pf-bandeau no-print">
        <Link to="/" className="pf-retour">← {lt(LT.bibliotheque, lang)}</Link>
        <span className="pf-bandeau-titre">{lt(LT.nom, lang)} · <i>{lt(LT.surTitre, lang)}</i></span>
        <span className="pf-bandeau-droite">
          <button type="button" onClick={() => window.print()}>{lt(LT.imprimer, lang)}</button>
          <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </span>
      </nav>

      {/* Le livre ouvert : une planche, deux pages */}
      <div className={`pf-livre no-print${ferme ? ' pf-ferme' : ''}${planche === derniere && !tour ? ' pf-dos' : ''}`} {...glisser}>
        <Cote page={gauche} cote="gauche" />
        <Cote page={droite} cote="droite" />
        {feuillet && (
          <div
            key={`${planche}>${tour.vers}`}
            className={`pf-feuillet pf-feuillet-${feuillet.cote}`}
            onAnimationEnd={finTour}
            aria-hidden="true"
          >
            <div className="pf-face pf-recto">{feuillet.recto?.()}</div>
            <div className="pf-face pf-verso">{feuillet.verso?.()}</div>
          </div>
        )}
        {/* Clic sur une page : on la tourne */}
        {planche > 0 && <button type="button" className="pf-zone pf-zone-gauche" aria-label={lt(LT.precedente, lang)} onClick={() => aller(planche - 1)} />}
        {planche < derniere && <button type="button" className="pf-zone pf-zone-droite" aria-label={planche === 0 ? lt(LT.ouvrir, lang) : lt(LT.suivante, lang)} onClick={() => aller(planche + 1)} />}
      </div>

      <div className="pf-commandes no-print">
        <button type="button" onClick={() => aller(planche - 1)} disabled={planche === 0} aria-label={lt(LT.precedente, lang)}>‹</button>
        <span className="pf-pagination">
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
      <div className="pf-pile">
        {pages.map((page, i) => (
          <div key={i} className="pf-pile-page">{page()}</div>
        ))}
      </div>
    </div>
  )
}
