import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import SecondarySidebar from '../design-system/SecondarySidebar'
import { SecondarySidebarContext } from './SecondarySidebarContext'
import { resolveRouteMeta } from './registry'
import useIsMobile from './useIsMobile'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { getNumero, entreeDe, titreDe, pagesDe, nombrePlanches } from '../numero/chemin'
import { PAGES } from '../numero/pages'
import { NT, nt } from '../numero/numeroText'
import './magazine.css'

// Le site est un magazine, toujours ouvert en double page (une « planche »)
// posée sur une table de lecture, à la taille de l'écran :
// - les pages du numéro (couverture, sommaire, dossier…) vont par deux ;
// - une rubrique occupe toute la planche ; si elle déborde, la suite passe
//   sur la planche suivante (adresse ?suite=2, 3…), comme dans une revue.
// On tourne les pages avec les flèches des côtés, les coins de page, le
// sommaire déroulant du bandeau ou les renvois. Le chemin de fer : numero/chemin.js.

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Garde une copie de la planche au moment où l'on tourne la page : React
// appelle getSnapshotBeforeUpdate juste avant de remplacer l'affichage,
// l'ancienne planche est donc encore lisible. Sert à l'effet livre.
class Instantane extends Component {
  getSnapshotBeforeUpdate(avant) {
    const { tour, noeud } = this.props
    if (avant.tour === tour || !noeud.current) return null
    // Suite « fin » qui se résout en numéro : même planche, pas de page tournée
    if (avant.tour.endsWith('#fin') && avant.tour.split('#')[0] === tour.split('#')[0]) return null
    const n = noeud.current
    const r = n.getBoundingClientRect()
    return { html: n.innerHTML, classe: n.className.replace(/\bsous-page\b/g, ''), largeur: r.width, hauteur: r.height, de: avant.tour }
  }
  componentDidUpdate(_p, _s, copie) {
    if (copie) this.props.surTour(copie)
  }
  render() {
    return this.props.children
  }
}

// Une demi-planche de la copie : la copie entière, décalée pour ne montrer qu'une moitié
function Moitie({ copie, html, classe, droite }) {
  return (
    <div
      className={classe}
      style={{ position: 'absolute', top: 0, left: droite ? -copie.largeur / 2 : 0, width: copie.largeur, height: copie.hauteur }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// Flèche fine des côtés du livre (pointe à droite, retournée en CSS pour la précédente)
function FlecheIcone() {
  return (
    <svg viewBox="0 0 152 63" aria-hidden="true">
      <path d="M115.7 29L92.8 6.3c-.9-.9-1.2-2.8-.6-4.3.6-1.4 1.8-1.9 2.8-1l28.4 28.1c.6.6.9 1.6.9 2.6s-.4 2-.9 2.6L95 62.4c-.3.3-.7.5-1.1.5-.7 0-1.3-.5-1.7-1.4-.6-1.4-.3-3.4.6-4.3L115.3 35H3.4C2 35 .9 33.7.9 32s1.1-3 2.5-3h112.3z" />
    </svg>
  )
}

export default function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { lang, toggle: basculerLangue } = useLanguage()
  const meta = resolveRouteMeta(location.pathname, lang)
  const isMobile = useIsMobile()
  const [secondaryNav, setSecondaryNav] = useState(null)

  // Sommaire déroulant du bandeau : se ferme en changeant de page, au clic
  // à côté ou avec Échap
  // (on retient l'adresse où il a été ouvert : ailleurs, il est fermé)
  const [sommaireIci, setSommaireIci] = useState(null)
  const sommaireOuvert = sommaireIci === location.pathname
  const setSommaireOuvert = (o) => {
    const ouvert = typeof o === 'function' ? o(sommaireOuvert) : o
    setSommaireIci(ouvert ? location.pathname : null)
  }
  const elSommaire = useRef(null)
  useEffect(() => {
    if (!sommaireOuvert) return undefined
    const surClic = (e) => { if (!elSommaire.current?.contains(e.target)) setSommaireIci(null) }
    const surTouche = (e) => { if (e.key === 'Escape') setSommaireIci(null) }
    document.addEventListener('pointerdown', surClic)
    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('pointerdown', surClic)
      document.removeEventListener('keydown', surTouche)
    }
  }, [sommaireOuvert])

  const nbPlanches = nombrePlanches()
  const entree = entreeDe(location.pathname)
  const planche = entree ? entree.planche : -1
  const format = entree ? entree.format : 'double'
  const pages = planche >= 0 ? pagesDe(planche) : []

  // Planche affichée : la feuille ne change (et le contenu n'est remonté)
  // qu'en passant à une autre planche ; les suites d'une rubrique ne font que
  // décaler la coulée du texte
  const cle = format === 'page' ? `planche-${planche}` : (entree ? entree.path : location.pathname)

  // Suites d'une rubrique : nombre de doubles pages mesuré à l'affichage
  const [mesure, setMesure] = useState({ cle: null, n: 1 })
  const nbSuites = mesure.cle === cle ? mesure.n : 1
  const suiteDemandee = format === 'double' ? params.get('suite') : null
  const suite = suiteDemandee === 'fin'
    ? nbSuites - 1
    : Math.min(Math.max(1, parseInt(suiteDemandee, 10) || 1), nbSuites) - 1
  const tour = `${cle}#${suiteDemandee === 'fin' && mesure.cle !== cle ? 'fin' : suite}`

  // Pages voisines : la suite de la rubrique, sinon la planche voisine (en
  // arrière, on retombe sur la dernière double page d'une rubrique)
  const adresseSuite = (n) => (n <= 0 ? location.pathname : `${location.pathname}?suite=${n + 1}`)
  const titre = entree ? titreDe(entree, lang) : meta.label
  const versPlanche = (i, fin) => {
    const ps = pagesDe(i)
    const e = ps[0]
    return {
      to: e.format === 'double' && fin ? `${e.path}?suite=fin` : e.path,
      titre: ps.map((p) => titreDe(p, lang)).join(' · '),
      folio: e.folio,
    }
  }
  const suiv = format === 'double' && suite < nbSuites - 1
    ? { to: adresseSuite(suite + 1), titre: `${titre} (${nt(NT.suite, lang)})`, folio: null }
    : planche >= 0 && planche < nbPlanches - 1 ? versPlanche(planche + 1) : null
  const prec = format === 'double' && suite > 0
    ? { to: adresseSuite(suite - 1), titre, folio: null }
    : planche > 0 ? versPlanche(planche - 1, true) : null

  // Mesure des suites : la rubrique coule en colonnes de la largeur de la
  // planche ; on compte la colonne où tombe la fin du texte
  const elFenetre = useRef(null)
  const elCoulee = useRef(null)
  const elFin = useRef(null)
  useEffect(() => {
    if (format !== 'double') return undefined
    const mesurer = () => {
      const c = elCoulee.current
      const f = elFin.current
      if (!c || !f) return
      const largeur = c.clientWidth || 1
      const n = Math.max(1, Math.floor((f.getBoundingClientRect().left - c.getBoundingClientRect().left + 1) / largeur) + 1)
      setMesure((m) => (m.cle === cle && m.n === n ? m : { cle, n }))
    }
    mesurer()
    const ro = new ResizeObserver(mesurer)
    if (elFenetre.current) ro.observe(elFenetre.current)
    const mo = new MutationObserver(mesurer)
    if (elCoulee.current) mo.observe(elCoulee.current, { childList: true, subtree: true, characterData: true })
    const surCharge = () => mesurer()
    elCoulee.current?.addEventListener('load', surCharge, true)
    document.fonts?.ready.then(mesurer)
    const c = elCoulee.current
    return () => {
      ro.disconnect()
      mo.disconnect()
      c?.removeEventListener('load', surCharge, true)
    }
  }, [cle, format])
  // « ?suite=fin » (retour en arrière) : une fois mesurée, l'adresse donne le vrai numéro
  useEffect(() => {
    if (suiteDemandee === 'fin' && mesure.cle === cle) navigate(adresseSuite(nbSuites - 1), { replace: true })
  }, [suiteDemandee, mesure, cle]) // eslint-disable-line react-hooks/exhaustive-deps

  // Effet livre : la copie de l'ancienne planche reste posée ; sa moitié
  // droite (en avant) ou gauche (en arrière) se soulève autour de la pliure,
  // montre au verso la moitié correspondante de la nouvelle planche et
  // retombe de l'autre côté
  const [fantome, setFantome] = useState(null)
  const elFeuille = useRef(null)
  const elFeuillet = useRef(null)
  // Page tournée à la main (coin attrapé) : { sens, x0, largeur, p (0 → 1), bouge }
  const glisse = useRef(null)
  // Retour arrière après une page lâchée trop tôt : pas de nouvelle animation
  const annule = useRef(false)
  const indexTour = (cleTour) => {
    const [c, s] = cleTour.split('#')
    const e = entreeDe(c.startsWith('planche-') ? pagesDe(Number(c.slice(8)))[0]?.path ?? '/' : c)
    return (e ? e.planche : 0) * 1000 + (Number(s) || 0)
  }
  const surTour = (copie) => {
    if (annule.current) { annule.current = false; setFantome(null); return }
    if (mouvementReduit() || isMobile) return
    const sens = indexTour(tour) >= indexTour(copie.de) ? 'avant' : 'arriere'
    const neuf = elFeuille.current
    setFantome({ ...copie, sens, verso: neuf ? neuf.innerHTML : '', classeVerso: neuf ? neuf.className : '', manuel: !!glisse.current, id: `${copie.de}>${tour}` })
  }
  // Filet de sécurité : la copie disparaît même si la fin d'animation n'arrive pas
  useEffect(() => {
    if (!fantome || fantome.manuel) return undefined
    const minuteur = setTimeout(() => setFantome(null), 1200)
    return () => clearTimeout(minuteur)
  }, [fantome])

  // Pose le feuillet à l'angle du geste
  const appliquer = (g) => {
    const el = elFeuillet.current
    if (!el) return
    el.style.transform = `perspective(2400px) rotateY(${(g.sens === 'avant' ? -180 : 180) * g.p}deg)`
    el.style.setProperty('--progres', g.p)
  }
  // Lâcher : la page finit de tourner (valider) ou retombe à sa place
  const terminer = (g, valider) => {
    const el = elFeuillet.current
    const fin = () => {
      glisse.current = null
      if (el) { el.style.transition = ''; el.style.transform = '' }
      if (valider) setFantome(null)
      else { annule.current = true; navigate(-1) }
    }
    if (!el) { fin(); return }
    const cible = valider ? 1 : 0
    const duree = Math.max(0.15, Math.abs(cible - g.p) * 0.7)
    el.style.transition = `transform ${duree}s cubic-bezier(.3,.6,.35,1)`
    requestAnimationFrame(() => { g.p = cible; appliquer(g) })
    setTimeout(fin, duree * 1000 + 40)
  }
  const attraperCoin = (e, sens) => {
    const cible = sens === 'avant' ? suiv : prec
    if (!cible || mouvementReduit() || isMobile || (e.pointerType === 'mouse' && e.button !== 0)) return
    e.preventDefault()
    e.stopPropagation()
    const largeur = (elFeuille.current?.getBoundingClientRect().width || 1200) / 2
    glisse.current = { sens, x0: e.clientX, largeur, p: 0, bouge: false }
    navigate(cible.to)
    const bouger = (ev) => {
      const g = glisse.current
      if (!g) return
      const dx = g.sens === 'avant' ? g.x0 - ev.clientX : ev.clientX - g.x0
      if (Math.abs(dx) > 4) g.bouge = true
      g.p = Math.min(1, Math.max(0, dx / (2 * g.largeur)))
      appliquer(g)
    }
    const lacher = () => {
      window.removeEventListener('pointermove', bouger)
      window.removeEventListener('pointerup', lacher)
      window.removeEventListener('pointercancel', lacher)
      const g = glisse.current
      // Simple clic : la page tourne toute seule ; geste : au-delà d'un tiers
      if (g) terminer(g, !g.bouge || g.p > 0.33)
    }
    window.addEventListener('pointermove', bouger)
    window.addEventListener('pointerup', lacher)
    window.addEventListener('pointercancel', lacher)
  }

  useEffect(() => {
    if (location.pathname === '/magazine') {
      document.title = t(lang, 'homeDocumentTitle')
    } else {
      document.title = meta.label ? `${meta.label} · 1977 Éditions` : '1977 Éditions'
    }
  }, [location.pathname, meta.label, lang])

  // Nouvelle planche : on revient en haut (utile sur téléphone, où les pages s'empilent)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  // Flèches du clavier : partout, sauf dans les jeux et démos (qui s'en
  // servent) et quand une rubrique a déjà pris la touche (preventDefault,
  // ex. les cartouches de /jeux). Glisser du doigt : pages du numéro seulement
  const versSuiv = suiv?.to
  const versPrec = prec?.to
  // (les pages du numéro restent libres : /jeux/presente n'est pas un jeu)
  const clavierLibre = format === 'page' || !/^\/jeux\/[^/]+|^\/lab\/[^/]+\/demo/.test(location.pathname)
  useEffect(() => {
    if (!clavierLibre) return undefined
    const surTouche = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      const cible = e.key === 'ArrowRight' ? versSuiv : versPrec
      if (!cible) return
      // On attend la fin de la propagation pour savoir si une rubrique a pris la touche
      setTimeout(() => { if (!e.defaultPrevented) navigate(cible) }, 0)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [clavierLibre, versPrec, versSuiv, navigate])
  const x0 = useRef(null)
  const glisser = format === 'page'
    ? {
        onTouchStart: (e) => { x0.current = e.touches[0].clientX },
        onTouchEnd: (e) => {
          if (x0.current === null) return
          const dx = e.changedTouches[0].clientX - x0.current
          if (Math.abs(dx) > 50) {
            const cible = dx < 0 ? suiv : prec
            if (cible) navigate(cible.to)
          }
          x0.current = null
        },
      }
    : {}

  const numero = getNumero()
  // Une page du numéro, ou le côté libre de la couverture / 4ᵉ de couverture :
  // la table de lecture, avec le chemin du retour à la bibliothèque
  const cote = (e, sens) => {
    if (!e) {
      return (
        <div className={`cote cote-vide cote-table cote-table-${sens}`}>
          <Link to="/librairie" className="retour-bibliotheque no-print">← {nt(NT.bibliotheque, lang)}</Link>
        </div>
      )
    }
    const Page = PAGES[e.path]
    return (
      <div className={`cote cote-${e.cote}`}>
        <Suspense fallback={<div className="page" />}>
          <Page />
        </Suspense>
      </div>
    )
  }
  const gauche = pages.find((p) => p.cote === 'gauche') ?? null
  const droite = pages.find((p) => p.cote === 'droite') ?? null
  const folioDouble = entree
    ? suite === 0
      ? `${entree.folio} – ${entree.folio + 1}`
      : `${titre} · ${nt(NT.suite, lang)} ${suite + 1}/${nbSuites}`
    : ''

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
          outline: var(--border-regular) solid var(--primary);
          outline-offset: 2px;
          border-radius: 2px;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .print-only { display: none; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
      `}</style>

      <div className={`magazine${numero.theme ? ` theme-${numero.theme}` : ''}`}>
        <div className="scene" style={{ '--lues': nbPlanches > 1 ? Math.max(planche, 0) / (nbPlanches - 1) : 0 }}>
          <span className="tranche tranche-gauche no-print" aria-hidden="true" />
          <span className="tranche tranche-droite no-print" aria-hidden="true" />
        {fantome && (
          <div
            key={fantome.id}
            className={`fantome fantome-${fantome.sens}${fantome.manuel ? ' fantome-manuel' : ''}`}
            style={{ width: fantome.largeur, height: fantome.hauteur }}
            aria-hidden="true"
            inert
            onAnimationEnd={(e) => { if (e.target.classList.contains('feuillet')) setFantome(null) }}
          >
            {/* La moitié qui reste posée */}
            <div className={`demi demi-${fantome.sens === 'avant' ? 'gauche' : 'droite'}`}>
              <Moitie copie={fantome} html={fantome.html} classe={fantome.classe} droite={fantome.sens !== 'avant'} />
            </div>
            {/* Le feuillet qui tourne autour de la pliure */}
            <div ref={elFeuillet} className={`feuillet demi demi-${fantome.sens === 'avant' ? 'droite' : 'gauche'}`}>
              <div className="feuillet-recto">
                <Moitie copie={fantome} html={fantome.html} classe={fantome.classe} droite={fantome.sens === 'avant'} />
              </div>
              <div className="feuillet-verso">
                <Moitie copie={fantome} html={fantome.verso} classe={fantome.classeVerso} droite={fantome.sens !== 'avant'} />
              </div>
            </div>
          </div>
        )}
        <Instantane tour={tour} noeud={elFeuille} surTour={surTour}>
        <div
          key={cle}
          ref={elFeuille}
          className={`feuille feuille-${format}${fantome && fantome.sens === 'avant' && !fantome.manuel ? ' sous-page' : ''}`}
          {...glisser}
        >
          {/* Coins de page : on les corne pour tourner la page */}
          {suiv && (
            <Link
              to={suiv.to}
              className="coin coin-suivant no-print"
              aria-label={`${nt(NT.suivante, lang)} : ${suiv.titre}`}
              onPointerDown={(e) => attraperCoin(e, 'avant')}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { if (glisse.current) e.preventDefault() }}
            />
          )}
          {prec && (
            <Link
              to={prec.to}
              className="coin coin-precedent no-print"
              aria-label={`${nt(NT.precedente, lang)} : ${prec.titre}`}
              onPointerDown={(e) => attraperCoin(e, 'arriere')}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { if (glisse.current) e.preventDefault() }}
            />
          )}

          {format === 'double' ? (
            <>
              <header className="tete-courante no-print">
                <Link to="/magazine" className="tc-titre">MISRAN LABS <span>#{numero.numero}</span></Link>
                <span className="tc-rubrique" style={{ color: entree?.couleur }}>{titre}</span>
                <Link to="/sommaire" className="tc-sommaire">{nt(NT.sommaireBtn, lang)}{entree ? ` · p. ${entree.folio}` : ''}</Link>
              </header>
              {/* Fenêtre de la planche : la rubrique y coule en colonnes de sa
                  largeur, une colonne par double page ; on décale la coulée */}
              <div ref={elFenetre} className="fenetre" style={{ fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
                <div ref={elCoulee} className="coulee" style={{ transform: `translateX(${-100 * suite}%)` }}>
                  <div className="shell-body" style={{ display: 'flex', position: 'relative' }}>
                    {!isMobile && secondaryNav && (
                      <div className="no-print" style={{ display: 'contents' }}>
                        <SecondarySidebar items={secondaryNav.items} active={secondaryNav.active} onChange={secondaryNav.onChange} />
                      </div>
                    )}
                    <main className="shell-main" style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                      <SecondarySidebarContext.Provider value={setSecondaryNav}>
                        <Suspense fallback={null}>
                          <Outlet />
                        </Suspense>
                      </SecondarySidebarContext.Provider>
                    </main>
                  </div>
                  <span ref={elFin} className="fin-coulee" />
                </div>
              </div>
              <div className="folio-double">
                {folioDouble}
                {/* Renvoi cliquable : tourne la page comme la flèche */}
                {suite < nbSuites - 1 && <Link to={adresseSuite(suite + 1)} className="a-suivre-coin">{nt(NT.suiteAuDos, lang)} →</Link>}
              </div>
            </>
          ) : (
            <main className="planche">
              {cote(gauche, 'gauche')}
              {cote(droite, 'droite')}
            </main>
          )}
        </div>
        </Instantane>
        </div>

        {/* Bandeau discret au-dessus du livre : sommaire déroulant à gauche,
            titre du numéro et langue à droite */}
        <nav className="bandeau no-print" aria-label={t(lang, 'navAria')} ref={elSommaire}>
          <div className={`bandeau-sommaire${sommaireOuvert ? ' ouvert' : ''}`}>
            <button
              type="button"
              className="sommaire-bouton"
              aria-expanded={sommaireOuvert}
              onClick={() => setSommaireOuvert((o) => !o)}
            >
              {nt(NT.sommaireBtn, lang)} <span className="plus" aria-hidden="true" />
            </button>
            <span className="chapitre">{titre}</span>
            <ol className="toc">
              {Array.from({ length: nbPlanches }, (_, i) => {
                const ps = pagesDe(i)
                const etiquette = i === 0 ? 'C' : i === nbPlanches - 1 ? '4ᵉ' : String(ps[0].folio).padStart(2, '0')
                return (
                  <li key={i} style={{ '--i': i }}>
                    <Link
                      to={ps[0].path}
                      className={i === planche ? 'actif' : ''}
                      aria-current={i === planche ? 'page' : undefined}
                      style={ps[0].format === 'double' ? { '--c': ps[0].couleur } : undefined}
                      onClick={() => setSommaireOuvert(false)}
                    >
                      <span>{etiquette}</span>
                      {ps.map((p) => titreDe(p, lang)).join(' · ')}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="bandeau-droite">
            <Link to="/librairie" className="bandeau-bibliotheque">← {nt(NT.bibliotheque, lang)}</Link>
            <Link to="/magazine">Misran Labs</Link> · <b>N°{numero.numero}</b> · {numero.mois[lang] ?? numero.mois.fr}
            <button
              type="button"
              className="langue"
              onClick={basculerLangue}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </nav>

        {/* Flèches fines de part et d'autre du livre */}
        {prec && (
          <Link to={prec.to} className="fleche fleche-prec no-print" aria-label={`${nt(NT.precedente, lang)} : ${prec.titre}`} title={prec.titre}>
            <FlecheIcone />
          </Link>
        )}
        {suiv ? (
          <Link to={suiv.to} className="fleche fleche-suiv no-print" aria-label={`${nt(NT.suivante, lang)} : ${suiv.titre}`} title={suiv.titre}>
            <FlecheIcone />
          </Link>
        ) : (
          <Link to="/librairie" className="fleche fleche-suiv no-print" aria-label={nt(NT.bibliotheque, lang)} title={nt(NT.bibliotheque, lang)}>
            <FlecheIcone />
          </Link>
        )}
      </div>
    </>
  )
}
