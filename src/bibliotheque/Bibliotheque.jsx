import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { Couverture } from '../numero/Etagere.jsx'
import { VOLUMES } from '../numero/volumes'
import { NT, nt } from '../numero/numeroText'
import '../numero/etagere.css'
import './bibliotheque.css'

// Page d'accueil : la bibliothèque du Lab, une pièce claire vue de face
// (illustration en fond, une version paysage et une portrait). Les publications du
// Lab sont rangées parmi les autres livres ; un clic en sort une, sa
// couverture s'affiche avec « Lire ». Les volumes : numero/volumes.js.

// Titre court sur la tranche (le titre complet s'affiche au survol)
const TRANCHES = {
  'numero-1': { fr: 'N°1', en: 'No. 1' },
  'numero-2': { fr: 'N°2', en: 'No. 2' },
  gazette: { fr: 'Gazette', en: 'Gazette' },
  portfolio: { fr: 'Portfolio', en: 'Portfolio' },
}
// Plaque sur le chant de la tablette, sous les publications
const PLAQUES = {
  0: { fr: 'Le magazine', en: 'The magazine' },
  1: { fr: 'Gazette · Portfolio', en: 'Gazette · Portfolio' },
}

// Les deux illustrations de la pièce (Gemini, d'après le dessin de Michael) et
// l'emplacement des trous laissés sur les étagères, en % de l'image :
// left / width = bord gauche et largeur du trou, bottom = dessus de la tablette,
// height = hauteur libre jusqu'à la tablette du dessus.
const SCENES = {
  paysage: {
    image: '/bibliotheque/salon-paysage.jpg',
    ratio: 1312 / 816,
    trous: [
      { meuble: 0, ids: ['numero-1', 'numero-2'], left: 21.9, width: 6.2, bottom: 54.7, height: 16.2 },
      { meuble: 1, ids: ['gazette', 'portfolio'], left: 69.7, width: 5.6, bottom: 54.7, height: 16.2 },
    ],
  },
  portrait: {
    image: '/bibliotheque/salon-portrait.jpg',
    ratio: 768 / 1376,
    trous: [
      { meuble: 0, ids: ['numero-1', 'numero-2'], left: 21.1, width: 13, bottom: 63.4, height: 8.7 },
      { meuble: 1, ids: ['gazette', 'portfolio'], left: 62.1, width: 17.8, bottom: 63.4, height: 8.7 },
    ],
  },
}

// Écran en hauteur (téléphone) : l'illustration en portrait
const REQUETE_PORTRAIT = '(max-aspect-ratio: 4/5)'
function usePortrait() {
  const [portrait, setPortrait] = useState(() => window.matchMedia(REQUETE_PORTRAIT).matches)
  useEffect(() => {
    const mq = window.matchMedia(REQUETE_PORTRAIT)
    const surChange = () => setPortrait(mq.matches)
    mq.addEventListener('change', surChange)
    return () => mq.removeEventListener('change', surChange)
  }, [])
  return portrait
}

// Une publication du Lab, rangée parmi les livres
function Volume({ v, lang, sorti, onSortir }) {
  return (
    <button
      type="button"
      className={`sl-volume${v.id === sorti ? ' sortie' : ''}${v.tranche.pointille ? ' pointille' : ''}`}
      style={{ '--fond': v.tranche.fond, '--encre': v.tranche.encre, '--police': v.tranche.police, height: `${Math.min(97, v.hauteur + 4)}%` }}
      aria-label={`${nt(v.titre, lang)} · ${nt(v.sous, lang)}`}
      aria-pressed={v.id === sorti}
      onClick={() => onSortir(v.id === sorti ? null : v.id)}
    >
      <span className="sl-volume-titre">{nt(TRANCHES[v.id] ?? v.titre, lang)}</span>
      <span className="sl-etiquette" aria-hidden="true">{nt(v.titre, lang)}<small>{nt(v.sous, lang)}</small></span>
    </button>
  )
}

export default function Bibliotheque() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const [sorti, setSorti] = useState(null)
  const volume = VOLUMES.find((v) => v.id === sorti)
  const scene = SCENES[usePortrait() ? 'portrait' : 'paysage']

  useEffect(() => {
    document.title = lang === 'fr' ? '1977 Éditions — la bibliothèque' : '1977 Éditions — the library'
  }, [lang])
  useEffect(() => {
    if (!sorti) return undefined
    const surTouche = (e) => { if (e.key === 'Escape') setSorti(null) }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [sorti])

  const props = { lang, sorti, onSortir: setSorti }

  return (
    <div className="salon">
      <header className="sl-bandeau">
        <span className="sl-marque">1977 Éditions</span>
        <span className="sl-aide">{lang === 'fr' ? 'Choisissez un livre sur l’étagère' : 'Pick a book from the shelf'}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>

      <main className="sl-scene" style={{ '--ratio': scene.ratio }}>
        <img className="sl-image" src={scene.image} alt="" />
        {scene.trous.map((t) => (
          <span key={t.meuble} className="sl-groupe" style={{ left: `${t.left}%`, width: `${t.width}%`, bottom: `${t.bottom}%`, height: `${t.height}%` }}>
            {t.ids.map((id) => VOLUMES.find((v) => v.id === id)).filter(Boolean).map((v) => <Volume key={v.id} v={v} {...props} />)}
            <span className="sl-plaque" aria-hidden="true">{nt(PLAQUES[t.meuble], lang)}</span>
          </span>
        ))}
      </main>

      {/* Volume sorti : sa couverture, et de quoi l'ouvrir */}
      {volume && (
        <div className="sl-sorti" role="dialog" aria-label={nt(volume.titre, lang)}>
          <button type="button" className="etg-fond" aria-label={nt(NT.etagereRanger, lang)} onClick={() => setSorti(null)} />
          <div className="etg-presentoir">
            <Couverture v={volume} lang={lang} />
            <div className="etg-actions">
              {volume.to ? (
                <Link to={volume.to} className="etg-lire">{nt(NT.etagereLire, lang)} →</Link>
              ) : (
                <span className="etg-lire etg-lire-off">{nt(NT.etagereAParaitre, lang)}</span>
              )}
              <button type="button" className="etg-ranger" onClick={() => setSorti(null)}>
                {nt(NT.etagereRanger, lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
