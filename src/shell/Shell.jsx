import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Fiole from './mascotte/Fiole'
import SecondarySidebar from '../design-system/SecondarySidebar'
import { SecondarySidebarContext } from './SecondarySidebarContext'
import { resolveRouteMeta } from './registry'
import useIsMobile from './useIsMobile'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'
import { getChemin, getNumero, entreeDe, titreDe, folioDe } from '../numero/chemin'
import { NT, nt } from '../numero/numeroText'
import './magazine.css'

// Le site est un magazine : plus de bandeau ni de menu, l'en-tête est la
// couverture (/). Chaque adresse est une page du chemin de fer
// (numero/chemin.js) posée sur une table de lecture ; on la tourne avec les
// boutons du bas, les onglets de page, le sommaire ou les renvois.
// Les rubriques s'ouvrent en double page, avec une tête courante façon revue.

const mouvementReduit = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, toggle: basculerLangue } = useLanguage()
  const meta = resolveRouteMeta(location.pathname, lang)
  const isMobile = useIsMobile()
  const [secondaryNav, setSecondaryNav] = useState(null)

  const chemin = getChemin()
  const entree = entreeDe(location.pathname)
  const index = entree ? entree.index : -1
  const format = entree ? entree.format : 'double'
  const prec = index > 0 ? chemin[index - 1] : null
  const suiv = index >= 0 && index < chemin.length - 1 ? chemin[index + 1] : null

  // Sens de la page qui tourne (en avant ou en arrière dans le numéro)
  const [suivi, setSuivi] = useState({ index, sens: 'avant' })
  if (suivi.index !== index) setSuivi({ index, sens: index >= suivi.index ? 'avant' : 'arriere' })

  // Effet livre : au départ d'une page, on en garde une copie (« fantôme »)
  // qui pivote autour de son bord gauche, montre son verso et dévoile la
  // nouvelle page dessous ; en arrière, la nouvelle page revient par la gauche.
  const cle = entree ? entree.path : location.pathname
  // Copies rangées par page (le double montage du mode strict ne les mélange pas)
  const copies = useRef({})
  const [fantome, setFantome] = useState(null)
  // Ref avec nettoyage (React 19) : la feuille qui s'en va est encore lisible ici
  const elFeuille = useRef(null)
  const elFantome = useRef(null)
  const refFeuille = useCallback((noeud) => {
    if (!noeud) return undefined
    elFeuille.current = noeud
    return () => {
      const r = noeud.getBoundingClientRect()
      copies.current[noeud.dataset.cle] = {
        html: noeud.innerHTML,
        classe: noeud.className.replace(/\b(sous-page|page-revient)\b/g, ''),
        decalage: Math.max(0, Math.round(-r.top)),
      }
    }
  }, [])
  // Page tournée à la main (coin attrapé) : { sens, x0, largeur, p (0 → 1), bouge }
  const glisse = useRef(null)
  // Retour arrière après une page lâchée trop tôt : pas de nouvelle animation
  const annule = useRef(false)
  const cleAvant = useRef(cle)
  useLayoutEffect(() => {
    const avant = cleAvant.current
    cleAvant.current = cle
    if (avant === cle) return
    // Avant l'affichage (layout) : la copie doit couvrir la nouvelle page dès la première image
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (annule.current) { annule.current = false; setFantome(null); return }
    const copie = copies.current[avant]
    if (!copie || mouvementReduit()) return
    setFantome({ ...copie, sens: suivi.sens, manuel: !!glisse.current, id: `${avant}>${cle}` })
  }, [cle]) // eslint-disable-line react-hooks/exhaustive-deps
  // Filet de sécurité : la copie disparaît même si la fin d'animation n'arrive pas
  useEffect(() => {
    if (!fantome || fantome.manuel) return undefined
    const minuteur = setTimeout(() => setFantome(null), 1000)
    return () => clearTimeout(minuteur)
  }, [fantome])

  // Pose la page à l'angle du geste : en avant, l'ancienne page (copie) se
  // soulève ; en arrière, la nouvelle page arrive de la gauche
  const appliquer = (g) => {
    if (g.sens === 'avant') {
      const el = elFantome.current
      if (!el) return
      el.style.transform = `perspective(2400px) rotateY(${-180 * g.p}deg)`
      el.style.setProperty('--progres', g.p)
    } else {
      const el = elFeuille.current
      if (el) el.style.transform = `perspective(2400px) rotateY(${-95 * (1 - g.p)}deg)`
    }
  }
  // Lâcher : la page finit de tourner (valider) ou retombe à sa place
  const terminer = (g, valider) => {
    const el = g.sens === 'avant' ? elFantome.current : elFeuille.current
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
    if (!cible || mouvementReduit() || (e.pointerType === 'mouse' && e.button !== 0)) return
    e.preventDefault()
    e.stopPropagation()
    const largeur = elFeuille.current?.getBoundingClientRect().width || 600
    glisse.current = { sens, x0: e.clientX, largeur, p: 0, bouge: false }
    navigate(cible.path)
    const bouger = (ev) => {
      const g = glisse.current
      if (!g) return
      const dx = g.sens === 'avant' ? g.x0 - ev.clientX : ev.clientX - g.x0
      if (Math.abs(dx) > 4) g.bouge = true
      g.p = Math.min(1, Math.max(0, dx / g.largeur))
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
    if (location.pathname === '/') {
      document.title = t(lang, 'homeDocumentTitle')
    } else {
      document.title = meta.label ? `${meta.label} · Misran Labs` : 'Misran Labs'
    }
  }, [location.pathname, meta.label, lang])

  // Nouvelle page : on revient en haut
  const pagePrecedente = useRef(entree?.path)
  useEffect(() => {
    if (pagePrecedente.current !== entree?.path) window.scrollTo(0, 0)
    pagePrecedente.current = entree?.path
  }, [entree?.path])

  // Flèches du clavier et glisser du doigt : seulement sur les pages du numéro
  // (les rubriques ont leurs propres jeux et contrôles)
  useEffect(() => {
    if (format !== 'page') return
    const surTouche = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      if (e.key === 'ArrowRight' && suiv) navigate(suiv.path)
      if (e.key === 'ArrowLeft' && prec) navigate(prec.path)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [format, prec, suiv, navigate])
  const x0 = useRef(null)
  const glisser = format === 'page'
    ? {
        onTouchStart: (e) => { x0.current = e.touches[0].clientX },
        onTouchEnd: (e) => {
          if (x0.current === null) return
          const dx = e.changedTouches[0].clientX - x0.current
          if (Math.abs(dx) > 50) {
            const cible = dx < 0 ? suiv : prec
            if (cible) navigate(cible.path)
          }
          x0.current = null
        },
      }
    : {}

  const numero = getNumero()
  const titre = entree ? titreDe(entree, lang) : meta.label

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
        <div className="scene">
        {fantome && (
          <div
            key={fantome.id}
            ref={elFantome}
            className={`fantome fantome-${fantome.sens}${fantome.manuel ? ' fantome-manuel' : ''} ${fantome.classe}`}
            aria-hidden="true"
            inert
            onAnimationEnd={(e) => { if (e.target === e.currentTarget) setFantome(null) }}
          >
            <div className="fantome-recto">
              <div style={{ marginTop: -fantome.decalage }} dangerouslySetInnerHTML={{ __html: fantome.html }} />
            </div>
            <div className="fantome-verso" />
          </div>
        )}
        <div
          key={cle}
          ref={refFeuille}
          data-cle={cle}
          className={`feuille feuille-${format}${fantome ? (fantome.manuel ? (fantome.sens === 'arriere' ? ' page-manuelle' : '') : (fantome.sens === 'avant' ? ' sous-page' : ' page-revient')) : ''}`}
          {...glisser}
        >
          {/* Coins de page : on les corne pour tourner la page */}
          {suiv && (
            <Link
              to={suiv.path}
              className="coin coin-suivant no-print"
              aria-label={`${nt(NT.suivante, lang)} : ${titreDe(suiv, lang)}`}
              onPointerDown={(e) => attraperCoin(e, 'avant')}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { if (glisse.current) e.preventDefault() }}
            />
          )}
          {prec && (
            <Link
              to={prec.path}
              className="coin coin-precedent no-print"
              aria-label={`${nt(NT.precedente, lang)} : ${titreDe(prec, lang)}`}
              onPointerDown={(e) => attraperCoin(e, 'arriere')}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { if (glisse.current) e.preventDefault() }}
            />
          )}
          {format === 'double' && (
            <header className="tete-courante no-print">
              <Link to="/" className="tc-titre">MISRAN LABS <span>#{numero.numero}</span></Link>
              <span className="tc-rubrique" style={{ color: entree?.couleur }}>{titre}</span>
              <Link to="/sommaire" className="tc-sommaire">{nt(NT.sommaireBtn, lang)}{entree ? ` · p. ${index + 1}` : ''}</Link>
            </header>
          )}

          {format === 'double' ? (
            <div className="feuille-corps" style={{ fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
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
              {entree && <div className="folio-double">{index + 1}</div>}
            </div>
          ) : (
            <main>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </main>
          )}
        </div>
        </div>

        {/* Commandes de lecture : la seule navigation du site */}
        <nav className="commandes no-print" aria-label={t(lang, 'navAria')}>
          <div className="onglets">
            {chemin.map((e, i) => (
              <Link
                key={e.path}
                to={e.path}
                className={i === index ? 'on' : ''}
                title={`${i === 0 ? '' : `p. ${i + 1} · `}${titreDe(e, lang)}`}
                aria-label={titreDe(e, lang)}
                aria-current={i === index ? 'page' : undefined}
                style={e.format === 'double' ? { '--onglet': e.couleur } : undefined}
              >
                {i === 0 ? 'C' : i + 1}
              </Link>
            ))}
          </div>
          {prec ? (
            <Link to={prec.path} className="tourner">
              <small>← {nt(NT.precedente, lang)}{prec.path === '/' ? '' : ` · p. ${folioDe(prec.path)}`}</small>
              {titreDe(prec, lang)}
            </Link>
          ) : <span />}
          <div className="commandes-milieu">
            <Link to="/sommaire" className="petit-bouton">{nt(NT.sommaireBtn, lang)}</Link>
            <button
              type="button"
              className="petit-bouton"
              onClick={basculerLangue}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
          {suiv ? (
            <Link to={suiv.path} className="tourner suivante">
              <small>{nt(NT.suivante, lang)} · p. {folioDe(suiv.path)} →</small>
              {titreDe(suiv, lang)}
            </Link>
          ) : (
            <Link to="/" className="tourner suivante">
              <small>{nt(NT.fin, lang)}</small>
              {titreDe(chemin[0], lang)}
            </Link>
          )}
        </nav>
        {format === 'page' && <p className="astuce no-print">{nt(NT.astuce, lang)}</p>}
      </div>

      <span
        className="no-print"
        style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 20, pointerEvents: 'none' }}
      >
        <span className="fiole-shadow" aria-hidden="true" />
        <Fiole variant="alambic" />
      </span>
    </>
  )
}
