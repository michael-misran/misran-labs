import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { Couverture } from '../numero/Etagere.jsx'
import { VOLUMES } from '../numero/volumes'
import { NT, nt } from '../numero/numeroText'
import { LEDS_NOEL } from './leds-noel'
import '../numero/etagere.css'
import './bibliotheque.css'

// Page d'accueil : la Librairie du Chocolat Chaud, librairie de 1977 Éditions, vue de face (illustration
// Gemini en fond). Les publications du Lab sont exposées de face sur le
// présentoir, au centre ; un clic en sort une, sa couverture s'affiche en
// grand avec « Lire ». Les volumes : numero/volumes.js.

const IMAGE = '/bibliotheque/librairie.jpg'
const RATIO = 1376 / 768

// Décors de saison : même librairie, même cadrage, présentoir au même
// endroit. Dates incluses, au format mois-jour (une saison peut passer
// d'une année à l'autre). Tant que l'image d'une saison n'est pas dans
// public/bibliotheque/, la librairie normale s'affiche.
// Pour voir une saison avant l'heure : /?saison=halloween, /?saison=noel
// ou /?saison=normale
const SAISONS = [
  {
    id: 'halloween', image: '/bibliotheque/librairie-halloween.jpg', du: '10-15', au: '11-02',
    // Lueurs de bougie : centre (x, y) et largeur en % de l'image
    lueurs: [
      // Citrouilles
      { x: 17.4, y: 39.6, l: 6.2 },
      { x: 66.9, y: 85.4, l: 8.4 },
      { x: 92.2, y: 27.3, l: 4.6 },
      // Bougies sur la table de gauche (flammes)
      { x: 1.7, y: 53.7, l: 3.4 },
      { x: 3.05, y: 56.8, l: 2.8 },
      // Bougie sur l'étagère murale de droite
      { x: 92.2, y: 38.4, l: 2.8 },
    ],
    // Soirée : l'image est assombrie sauf autour des sources de lumière.
    // Ellipses : centre (x, y) et demi-axes (rx, ry) en % de l'image
    eclaire: [
      // Les 3 suspensions et leur cône de lumière
      { x: 24.9, y: 36, rx: 10, ry: 24 },
      { x: 49.9, y: 40, rx: 13, ry: 30 },
      { x: 75.1, y: 36, rx: 10, ry: 24 },
      // Ampoules murales
      { x: 10.4, y: 21, rx: 5, ry: 10 },
      { x: 89.5, y: 21, rx: 5, ry: 10 },
      // Citrouilles
      { x: 17.4, y: 39.6, rx: 8, ry: 14 },
      { x: 66.9, y: 85.4, rx: 10, ry: 17 },
      { x: 92.2, y: 27.3, rx: 6, ry: 10 },
      // Bougies
      { x: 2.4, y: 55.5, rx: 6, ry: 11 },
      { x: 92.2, y: 38.4, rx: 4, ry: 8 },
    ],
  },
  {
    id: 'noel', image: '/bibliotheque/librairie-noel.jpg', du: '12-01', au: '01-06', leds: LEDS_NOEL,
    // Début de soirée, plaid et chocolat chaud : voile plus léger et plus chaud qu'à Halloween
    voile: 'rgba(52, 24, 40, .4)',
    eclaire: [
      // Les 3 suspensions et leur cône de lumière
      { x: 24.9, y: 36, rx: 11, ry: 26 },
      { x: 49.9, y: 40, rx: 14, ry: 32 },
      { x: 75.1, y: 36, rx: 11, ry: 26 },
      // Ampoules murales
      { x: 10.3, y: 21, rx: 6, ry: 11 },
      { x: 89.3, y: 21, rx: 6, ry: 11 },
      // Grande guirlande du haut
      { x: 50, y: 9, rx: 46, ry: 11 },
      // Guirlandes des étagères murales
      { x: 4, y: 27, rx: 7, ry: 8 },
      { x: 4, y: 42, rx: 7, ry: 8 },
      { x: 96, y: 32, rx: 7, ry: 8 },
      { x: 96, y: 45, rx: 7, ry: 8 },
      // Sapin, et le fauteuil au plaid à côté
      { x: 86, y: 57, rx: 10, ry: 22 },
      { x: 91, y: 72, rx: 10, ry: 18 },
    ],
  },
]

function saisonDuJour(date = new Date()) {
  const jour = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return SAISONS.find((s) => (s.du <= s.au ? jour >= s.du && jour <= s.au : jour >= s.du || jour <= s.au))
}

// Masque du voile de nuit : une ellipse transparente par source de lumière,
// combinées en intersection (le voile ne reste que hors de toutes les ellipses)
function masqueNuit(zones) {
  return zones
    .map((z) => `radial-gradient(ellipse ${z.rx}% ${z.ry}% at ${z.x}% ${z.y}%, transparent 20%, #000 100%)`)
    .join(', ')
}

// Les 4 emplacements du présentoir, en % de l'image : left / width = bord
// gauche et largeur de la carte blanche ; REBORD = hauteur du rebord où
// les livres sont posés, depuis le bas de l'image
const PRESENTOIR = [
  { id: 'numero-1', left: 39.7, width: 4.1 },
  { id: 'midnight-1', left: 45.1, width: 4.1 },
  { id: 'gazette', left: 50.6, width: 4.1 },
  { id: 'portfolio', left: 56.3, width: 4.1 },
]
const REBORD = 35.5

// Bouton du volume sorti : on le repose sur le présentoir
const REPOSER = { fr: 'Reposer sur le présentoir', en: 'Put it back' }

// Une publication exposée : sa couverture en miniature
function Expose({ v, place, lang, sorti, onSortir }) {
  return (
    <button
      type="button"
      className={`lb-livre${v.id === sorti ? ' sortie' : ''}`}
      style={{ left: `${place.left}%`, width: `${place.width}%`, bottom: `${REBORD}%` }}
      aria-label={`${nt(v.titre, lang)} · ${nt(v.sous, lang)}`}
      aria-pressed={v.id === sorti}
      onClick={() => onSortir(v.id === sorti ? null : v.id)}
    >
      <span className="lb-echelle" aria-hidden="true"><Couverture v={v} lang={lang} /></span>
      <span className="sl-etiquette" aria-hidden="true">{nt(v.titre, lang)}<small>{nt(v.sous, lang)}</small></span>
    </button>
  )
}

export default function Bibliotheque() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const [sorti, setSorti] = useState(null)
  const volume = VOLUMES.find((v) => v.id === sorti)
  const [params] = useSearchParams()
  const force = params.get('saison')
  const saison = force === 'normale' ? null : SAISONS.find((x) => x.id === force) ?? saisonDuJour()
  // Image de saison qui n'a pas pu se charger : on revient à la librairie normale
  const [enEchec, setEnEchec] = useState(null)
  const image = saison && saison.image !== enEchec ? saison.image : IMAGE

  useEffect(() => {
    document.title = 'Librairie du Chocolat Chaud — 1977 Éditions'
  }, [lang])
  useEffect(() => {
    if (!sorti) return undefined
    const surTouche = (e) => { if (e.key === 'Escape') setSorti(null) }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [sorti])

  return (
    <div className="salon">
      <header className="sl-bandeau">
        <span className="sl-marque">1977 Éditions</span>
        <span className="sl-aide">{lang === 'fr' ? 'Choisissez un livre sur le présentoir' : 'Pick a book from the display'}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>

      <main className="sl-scene" style={{ '--ratio': RATIO }}>
        <img className="sl-image" src={image} alt="" onError={() => image !== IMAGE && setEnEchec(image)} />
        {/* Ambiance de soirée : voile sombre percé là où il y a de la lumière */}
        {image === saison?.image && saison.eclaire && (
          <span
            className="lb-nuit"
            aria-hidden="true"
            style={{ '--trous': masqueNuit(saison.eclaire), ...(saison.voile && { background: saison.voile }) }}
          />
        )}
        {/* LED des guirlandes qui scintillent, chacune à son rythme */}
        {image === saison?.image && saison.leds?.map(([x, y], i) => (
          <span
            key={i}
            className="lb-led"
            aria-hidden="true"
            style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${1.6 + ((i * 7) % 11) * 0.23}s`, animationDelay: `${-((i * 13) % 17) * 0.29}s` }}
          />
        ))}
        {/* Bougies dans les citrouilles (seulement si l'image de saison est bien affichée) */}
        {image === saison?.image && saison.lueurs?.map((g, i) => (
          <span
            key={i}
            className="lb-lueur"
            aria-hidden="true"
            style={{ left: `${g.x}%`, top: `${g.y}%`, width: `${g.l}%`, animationDelay: `${-i * 0.73}s` }}
          />
        ))}
        {/* Enseigne clouée sur la ceinture de la table du présentoir */}
        <p className="lb-enseigne">Librairie du Chocolat Chaud</p>
        {PRESENTOIR.map((place) => {
          const v = VOLUMES.find((x) => x.id === place.id)
          return v && <Expose key={v.id} v={v} place={place} lang={lang} sorti={sorti} onSortir={setSorti} />
        })}
      </main>

      {/* Volume sorti : sa couverture, et de quoi l'ouvrir */}
      {volume && (
        <div className="sl-sorti" role="dialog" aria-label={nt(volume.titre, lang)}>
          <button type="button" className="etg-fond" aria-label={nt(REPOSER, lang)} onClick={() => setSorti(null)} />
          <div className="etg-presentoir">
            <Couverture v={volume} lang={lang} />
            <div className="etg-actions">
              {volume.to ? (
                <Link to={volume.to} className="etg-lire">{nt(NT.etagereLire, lang)} →</Link>
              ) : (
                <span className="etg-lire etg-lire-off">{nt(NT.etagereAParaitre, lang)}</span>
              )}
              <button type="button" className="etg-ranger" onClick={() => setSorti(null)}>
                {nt(REPOSER, lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
