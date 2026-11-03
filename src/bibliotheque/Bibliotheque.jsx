import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { Couverture } from '../numero/Etagere.jsx'
import Logo1977 from '../shell/Logo1977'
import { VOLUMES } from '../numero/volumes'
import { NT, nt } from '../numero/numeroText'
import { LEDS_NOEL } from './leds-noel'
import '../numero/etagere.css'
import './bibliotheque.css'

// La librairie L'Entre Deux Pages (/librairie), librairie de 1977 Éditions, vue de face (illustration
// Gemini en fond). Les publications du Lab sont exposées de face sur le
// présentoir, au centre ; un clic en sort une, sa couverture s'affiche en
// grand avec « Lire ». Les volumes : numero/volumes.js.

const IMAGE = '/bibliotheque/librairie-alcoves.jpg'
const RATIO = 2752 / 1548

// Date locale du lecteur (AAAA-MM-JJ), même mécanisme que midnight/numeros.js :
// une parution datée dans le futur reste cachée jusqu'à son jour.
function aujourdhui() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// Les 4 dernières parutions, du plus récent au plus ancien : ce que montre
// le présentoir « Nouveautés ». Un volume peut être à la fois en vitrine et
// dans son rayon.
function nouveautes() {
  return VOLUMES
    .filter((v) => v.parution && v.parution <= aujourdhui())
    .sort((a, b) => (a.parution < b.parution ? 1 : -1))
    .slice(0, 4)
}

// Les 4 alcôves du mur, de gauche à droite : le nom gravé sur la plaque de
// laiton peinte en haut de l'arche, les volumes de la collection (2 maximum
// à cette taille), posés de face sur le rebord vide.
const RAYON_TOP = 35.5
// Plaque peinte : haut, hauteur et largeur en % de l'image
const PLAQUE = { top: 12.36, height: 2.93, width: 5.25 }
const RAYON_LARGEUR = 5
const RAYON_ECART = 5.7
const RAYONS = [
  { collection: 'journaux', left: 28.55, titre: { fr: 'Journaux', en: 'Newspapers' } },
  { collection: 'magazines', left: 42.85, titre: { fr: 'Magazines', en: 'Magazines' } },
  { collection: 'manuels', left: 57.15, titre: { fr: 'Manuels', en: 'Manuals' } },
  { collection: 'carnets', left: 71.45, titre: { fr: 'Carnets', en: 'Notebooks' } },
]

// Emplacements des volumes d'un rayon, groupe centré sur la colonne
// (2 livres maximum ; au-delà, ignorés — aucun rayon n'en a plus à ce jour)
function placesDuRayon(rayon) {
  const volumes = VOLUMES.filter((v) => v.collection === rayon.collection).slice(0, 2)
  const n = volumes.length
  return volumes.map((v, i) => ({
    v,
    left: rayon.left - RAYON_LARGEUR / 2 - ((n - 1) * RAYON_ECART) / 2 + i * RAYON_ECART,
  }))
}

// Décors de saison : même librairie, même cadrage, présentoir au même
// endroit. Dates incluses, au format mois-jour (une saison peut passer
// d'une année à l'autre). Tant que l'image d'une saison n'est pas dans
// public/bibliotheque/, la librairie normale s'affiche.
// Pour voir une saison avant l'heure : /?saison=halloween, /?saison=noel
// ou /?saison=normale
const SAISONS = [
  // Décor à repeindre sur la boutique aux alcôves, lueurs à mesurer ensuite
  { id: 'halloween', image: '/bibliotheque/librairie-alcoves-halloween.jpg', du: '10-15', au: '11-02' },
  { id: 'noel', image: '/bibliotheque/librairie-alcoves-noel.jpg', du: '12-01', au: '01-06', leds: LEDS_NOEL, lueurs: [{ x: 2.9, y: 12.9, l: 4.5 }] },
]

// Lumières de la boutique, toute l'année : centre (x, y) et largeur en % de l'image.
// Le type donne la couleur et le rythme (bibliotheque.css).
const LUMIERES = [
  // Les 4 lampes des alcôves ; celle des Manuels a un faux contact
  { type: 'lampe', x: 28.7, y: 21.9, l: 8 },
  { type: 'lampe', x: 42.85, y: 21.9, l: 8 },
  { type: 'contact', x: 57.1, y: 21.9, l: 8 },
  { type: 'lampe', x: 71.3, y: 21.9, l: 8 },
  // Pièces de côté : cuisine, frigo, kiosque, établi, bureau
  { type: 'lampe', x: 10.5, y: 25.3, l: 6 },
  { type: 'hublot', x: 14.5, y: 37.1, l: 3.6 },
  // Le kiosque est caché par le sapin à Noël
  { type: 'bougie', x: 5.5, y: 30.2, l: 4.5, hors: 'noel' },
  { type: 'lampe', x: 83.1, y: 40, l: 4 },
  { type: 'verte', x: 95.6, y: 38.8, l: 6.5 },
  // La lanterne posée au sol
  { type: 'bougie', x: 4.6, y: 70.2, l: 5.5 },
]
// Néon bleu de l'établi : un tube, donc un rectangle
const NEON = { left: 82, top: 26.9, width: 6.6, height: .8 }
// Vapeur du chocolat chaud, au-dessus de la tasse
const VAPEUR = { left: 97.5, top: 70 }

function saisonDuJour(date = new Date()) {
  const jour = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return SAISONS.find((s) => (s.du <= s.au ? jour >= s.du && jour <= s.au : jour >= s.du || jour <= s.au))
}

// Les 4 places du présentoir, du plus récent (gauche) au plus ancien (droite) —
// la place n'est pas liée à un volume fixe, voir `nouveautes()`.
// Chaque place = les 4 coins de la face du livre blanc peint, en % de l'image
// (x, y), dans l'ordre haut-gauche, haut-droite, bas-droite, bas-gauche :
// la couverture est déformée pour tomber exactement dessus (perspective du
// pupitre). Pour les régler à la main : /?reglage
const PRESENTOIR = [
  [[35.75, 54.25], [41.05, 54.25], [41.05, 66.76], [35.75, 66.76]],
  [[43.35, 54.25], [48.70, 54.25], [48.70, 66.76], [43.35, 66.76]],
  [[51.05, 54.25], [56.45, 54.25], [56.45, 66.76], [51.05, 66.76]],
  [[58.72, 54.25], [64.15, 54.25], [64.15, 66.76], [58.72, 66.76]],
]
// Proportions des couvertures (largeur / hauteur)
const RATIO_COUV = 3320 / 4887

// Déformation qui envoie un rectangle w × h (coin haut-gauche en 0,0) sur un
// quadrilatère quelconque (coins en px, même ordre que PRESENTOIR) :
// homographie carré → quadrilatère (Heckbert), écrite en matrix3d CSS.
function matrice(w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3
  const det = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / det
  const k = (dx1 * dy3 - dx3 * dy1) / det
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3
  return `matrix3d(${[a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1].join(',')})`
}

// Largeur de la scène en px, suivie au redimensionnement (la déformation se calcule en px)
function useLargeur(ref) {
  const [largeur, setLargeur] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    // Mesure immédiate : ResizeObserver ne se déclenche pas dans un onglet en arrière-plan
    setLargeur(el.getBoundingClientRect().width)
    const obs = new ResizeObserver(([entree]) => setLargeur(entree.contentRect.width))
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return largeur
}

// Bouton du volume sorti : on le repose sur le présentoir
const REPOSER = { fr: 'Reposer sur le présentoir', en: 'Put it back' }

// Une publication exposée : sa couverture en miniature. `place` donne soit
// `bottom` (présentoir, le livre grandit depuis le rebord), soit `top`
// (rayon, posé à une hauteur fixe sur la planche).
function Expose({ v, place, style, lang, sorti, onSortir, rayon = false }) {
  const position = place.bottom !== undefined
    ? { bottom: `${place.bottom}%` }
    : { top: `${place.top}%` }
  return (
    <button
      type="button"
      className={`lb-livre${rayon ? ' lb-livre-rayon' : ''}${v.id === sorti ? ' sortie' : ''}`}
      style={style ?? { left: `${place.left}%`, width: `${place.width}%`, ...position }}
      aria-label={`${nt(v.titre, lang)} · ${nt(v.sous, lang)}`}
      aria-pressed={v.id === sorti}
      onClick={() => onSortir(v.id === sorti ? null : v.id)}
    >
      <span className="lb-echelle" aria-hidden="true"><Couverture v={v} lang={lang} /></span>
      {!v.to && <span className="lb-tampon" aria-hidden="true">{nt(NT.etagereAParaitre, lang)}</span>}
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

  // Présentoir : coins des livres, réglables à la souris en mode /?reglage
  // (gardés dans le navigateur pendant le réglage, à recopier ensuite dans PRESENTOIR)
  const reglage = params.has('reglage')
  const sceneRef = useRef(null)
  const largeur = useLargeur(sceneRef)
  const hauteur = largeur / RATIO
  const [coins, setCoins] = useState(() => {
    if (!reglage) return PRESENTOIR
    try { return JSON.parse(localStorage.getItem('lb-reglage')) ?? PRESENTOIR } catch { return PRESENTOIR }
  })
  const [prise, setPrise] = useState(null)
  const [copie, setCopie] = useState(false)
  useEffect(() => {
    if (!reglage) return
    try { localStorage.setItem('lb-reglage', JSON.stringify(coins)) } catch { /* navigation privée */ }
  }, [coins, reglage])
  const deplacer = (e) => {
    const r = sceneRef.current.getBoundingClientRect()
    const x = Math.round(((e.clientX - r.left) / r.width) * 10000) / 100
    const y = Math.round(((e.clientY - r.top) / r.height) * 10000) / 100
    const [i, j] = prise
    setCoins((c) => c.map((quad, a) => (a !== i ? quad : quad.map((p, b) => (b === j ? [x, y] : p)))))
  }
  const copier = () => {
    const texte = `const PRESENTOIR = [\n${coins.map((q) => `  [${q.map(([x, y]) => `[${x.toFixed(2)}, ${y.toFixed(2)}]`).join(', ')}],`).join('\n')}\n]`
    navigator.clipboard?.writeText(texte).then(() => { setCopie(true); setTimeout(() => setCopie(false), 1500) })
  }

  // Téléphone (< 700 px) : la scène défile dans son cadre, centrée au
  // départ sur le présentoir (D6) ; l'indication de glissement disparaît
  // dès le premier défilement.
  const cadreRef = useRef(null)
  const [aGlisse, setAGlisse] = useState(false)
  useEffect(() => {
    const el = cadreRef.current
    if (!el) return undefined
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    const surDefilement = () => setAGlisse(true)
    el.addEventListener('scroll', surDefilement, { once: true, passive: true })
    return () => el.removeEventListener('scroll', surDefilement)
  }, [])

  useEffect(() => {
    document.title = "L'Entre Deux Pages — 1977 Éditions"
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
        {/* Le logo ramène dans la rue (l'accueil) */}
        <Link to="/" className="sl-marque" aria-label={lang === 'fr' ? 'Retour dans la rue' : 'Back to the street'}>
          <Logo1977 carre largeur={26} fond="#3a2e24" />
          ← {lang === 'fr' ? 'La rue' : 'The street'}
        </Link>
        <span className="sl-aide">{lang === 'fr' ? 'Choisissez un livre sur le présentoir ou dans les rayons' : 'Pick a book from the display or the shelves'}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>

      <div className="sl-cadre" ref={cadreRef}>
      <main className="sl-scene" ref={sceneRef} style={{ '--ratio': RATIO }}>
        <img className="sl-image" src={image} alt="" onError={() => image !== IMAGE && setEnEchec(image)} />
        {/* Lumières de la boutique, sous les livres */}
        {LUMIERES.filter((g) => !(g.hors && image === saison?.image && saison.id === g.hors)).map((g, i) => (
          <span
            key={i}
            className={`lb-lum lb-lum-${g.type}`}
            aria-hidden="true"
            style={{ left: `${g.x}%`, top: `${g.y}%`, width: `${g.l}%`, animationDelay: `${-i * 1.37}s` }}
          />
        ))}
        <span
          className="lb-neon"
          aria-hidden="true"
          style={{ left: `${NEON.left}%`, top: `${NEON.top}%`, width: `${NEON.width}%`, height: `${NEON.height}%` }}
        />
        <span className="lb-vapeur" aria-hidden="true" style={{ left: `${VAPEUR.left}%`, top: `${VAPEUR.top}%` }}>
          <i /><i /><i />
        </span>
        {/* LED des guirlandes qui scintillent, chacune à son rythme */}
        {image === saison?.image && saison.leds?.map(([x, y], i) => (
          <span
            key={i}
            className="lb-led"
            aria-hidden="true"
            style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${1.6 + ((i * 7) % 11) * 0.23}s`, animationDelay: `${-((i * 13) % 17) * 0.29}s` }}
          />
        ))}
        {/* Lueurs de saison, comme l'étoile du sapin (seulement si l'image de saison est bien affichée) */}
        {image === saison?.image && saison.lueurs?.map((g, i) => (
          <span
            key={i}
            className="lb-lueur"
            aria-hidden="true"
            style={{ left: `${g.x}%`, top: `${g.y}%`, width: `${g.l}%`, animationDelay: `${-i * 0.73}s` }}
          />
        ))}
        {/* Rayons muraux : une plaque par collection, les volumes posés de face */}
        {RAYONS.map((rayon) => (
          <div key={rayon.collection} className="lb-plaque" style={{ left: `${rayon.left}%`, top: `${PLAQUE.top}%`, width: `${PLAQUE.width}%`, height: `${PLAQUE.height}%` }}>
            {/* Plaque peinte trop petite pour le sous-titre : le nom seul */}
            {nt(rayon.titre, lang)}
          </div>
        ))}
        {RAYONS.flatMap((rayon) => placesDuRayon(rayon)).map(({ v, left }) => (
          <Expose
            key={v.id}
            v={v}
            place={{ left, width: RAYON_LARGEUR, top: RAYON_TOP }}
            lang={lang}
            sorti={sorti}
            onSortir={setSorti}
            rayon
          />
        ))}

        {/* Présentoir : les 4 dernières parutions */}
        <p className="lb-nouveautes">{lang === 'fr' ? 'Nouveautés' : 'New releases'}</p>
        {/* Pupitre : chaque couverture déformée sur les 4 coins de son livre peint */}
        <div className="lb-pupitre">
          {largeur > 0 && coins.map((quad, i) => {
            const v = nouveautes()[i]
            if (!v) return null
            const px = quad.map(([x, y]) => [(x / 100) * largeur, (y / 100) * hauteur])
            // Rectangle de départ ≈ taille du livre peint, pour une déformation douce
            const h = Math.hypot(px[3][0] - px[0][0], px[3][1] - px[0][1])
            const w = h * RATIO_COUV
            return (
              <Expose
                key={v.id}
                v={v}
                place={{}}
                style={{ left: 0, top: 0, width: `${w}px`, height: `${h}px`, transform: matrice(w, h, px) }}
                lang={lang}
                sorti={sorti}
                onSortir={setSorti}
              />
            )
          })}
        </div>

        {/* Mode réglage (/?reglage) : une poignée par coin, à glisser sur les coins peints */}
        {reglage && coins.map((quad, i) => quad.map(([x, y], j) => (
          <span
            key={`${i}-${j}`}
            className="lb-poignee"
            style={{ left: `${x}%`, top: `${y}%` }}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setPrise([i, j]) }}
            onPointerMove={(e) => prise?.[0] === i && prise?.[1] === j && deplacer(e)}
            onPointerUp={() => setPrise(null)}
          />
        )))}
      </main>
      </div>
      {reglage && (
        <div className="lb-reglage">
          <p>Glissez les poignées sur les coins des livres peints.</p>
          <button type="button" onClick={copier}>{copie ? 'Copié !' : 'Copier les valeurs'}</button>
          <button type="button" onClick={() => setCoins(PRESENTOIR)}>Réinitialiser</button>
        </div>
      )}
      {!aGlisse && (
        <p className="sl-glisse" aria-hidden="true">
          {lang === 'fr' ? '← Glissez pour voir les rayons →' : '← Swipe to see the shelves →'}
        </p>
      )}

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
