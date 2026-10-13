import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { Couverture } from '../numero/Etagere.jsx'
import { VOLUMES } from '../numero/volumes'
import { NT, nt } from '../numero/numeroText'
import '../numero/etagere.css'
import './bibliotheque.css'

// Page d'accueil : la bibliothèque du Lab, dans une pièce claire (mur blanc,
// parquet, deux bibliothèques en bois blond). Les publications du
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

// Couleurs des livres de décor
const TEINTES = ['#b5372e', '#d9c7a5', '#2f4a6d', '#e9e1cf', '#c55a2b', '#5b7a5a', '#e8b44a', '#7a2e3a', '#f3eee4', '#3a3a3a', '#8fa6b8', '#a8763e', '#d06c7a', '#264653', '#c9b48a', '#6d4c7d']

// Hasard reproductible : les mêmes livres à chaque visite
function hasard(graine) {
  let a = graine
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Une rangée de livres de décor : largeur totale en % de l'étagère
function livresDecor(graine, largeur) {
  const r = hasard(graine)
  const livres = []
  let total = 0
  while (total < largeur) {
    const l = 2.2 + r() * 3.2
    if (total + l > largeur) break
    livres.push({ l, h: 66 + r() * 28, c: TEINTES[Math.floor(r() * TEINTES.length)], filet: r() > 0.55, penche: r() > 0.93 })
    total += l + 0.15
  }
  return livres
}

// Pile de livres couchés
function Pile({ graine, n = 4 }) {
  const r = hasard(graine)
  return (
    <span className="sl-pile" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ width: `${70 + r() * 30}%`, background: TEINTES[Math.floor(r() * TEINTES.length)] }} />
      ))}
    </span>
  )
}

function Decor({ graine, largeur }) {
  return livresDecor(graine, largeur).map((b, i) => (
    <span
      key={i}
      className={`sl-livre${b.filet ? ' filet' : ''}${b.penche ? ' penche' : ''}`}
      style={{ width: `${b.l}%`, height: `${b.h}%`, background: b.c }}
      aria-hidden="true"
    />
  ))
}

// Cadre posé sur une étagère : un petit paysage dessiné, pas de photo
function Cadre({ variante }) {
  return (
    <span className={`sl-cadre sl-cadre-${variante}`} aria-hidden="true">
      <svg viewBox="0 0 40 50" preserveAspectRatio="none">
        <rect width="40" height="50" fill="#efe6d4" />
        {variante === 1 ? (
          <>
            <rect x="6" y="6" width="28" height="38" fill="#9fc0d8" />
            <circle cx="26" cy="16" r="4" fill="#f2c14e" />
            <path d="M6 44 L16 26 L24 36 L30 30 L34 36 L34 44 Z" fill="#5b7a5a" />
          </>
        ) : (
          <>
            <rect x="6" y="6" width="28" height="38" fill="#e7cfb4" />
            <path d="M6 32 Q20 22 34 30 V44 H6 Z" fill="#c55a2b" />
            <path d="M6 38 Q20 30 34 38 V44 H6 Z" fill="#7a2e3a" />
          </>
        )}
      </svg>
    </span>
  )
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

// Les quatre rayons de chaque meuble : ce qui y est posé
function contenu(meuble, rayon, volumes, props) {
  const vols = (ids) => (
    <span className="sl-groupe">
      {ids.map((id) => volumes.find((v) => v.id === id)).filter(Boolean).map((v) => <Volume key={v.id} v={v} {...props} />)}
      <span className="sl-plaque" aria-hidden="true">{nt(PLAQUES[meuble], props.lang)}</span>
    </span>
  )
  if (meuble === 0) {
    if (rayon === 0) return <><Cadre variante={1} /><Cadre variante={2} /><Decor graine={11} largeur={44} /></>
    if (rayon === 1) return <><Decor graine={12} largeur={26} />{vols(['numero-1', 'numero-2'])}<Decor graine={13} largeur={40} /></>
    if (rayon === 2) return <><Decor graine={14} largeur={62} /><Pile graine={15} /></>
    return <Decor graine={16} largeur={92} />
  }
  if (rayon === 0) return <><Decor graine={21} largeur={58} /><Pile graine={22} n={3} /></>
  if (rayon === 1) return <><Decor graine={23} largeur={30} />{vols(['gazette', 'portfolio'])}<Decor graine={24} largeur={36} /></>
  if (rayon === 2) return <Decor graine={25} largeur={92} />
  return <><Pile graine={26} n={5} /><Decor graine={27} largeur={66} /></>
}

export default function Bibliotheque() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const [sorti, setSorti] = useState(null)
  const volume = VOLUMES.find((v) => v.id === sorti)

  useEffect(() => {
    document.title = lang === 'fr' ? 'Misran Labs — la bibliothèque' : 'Misran Labs — the library'
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
      {/* La pièce : mur et parquet */}
      <div className="sl-parquet" aria-hidden="true" />

      <header className="sl-bandeau">
        <span className="sl-marque">Misran Labs</span>
        <span className="sl-aide">{lang === 'fr' ? 'Choisissez un livre sur l’étagère' : 'Pick a book from the shelf'}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>

      <main className="sl-scene">
        {/* Lampe arquée, derrière la guitare */}
        <svg className="sl-lampe" viewBox="0 0 60 200" aria-hidden="true">
          <path d="M40 198 V40 Q40 8 14 10" fill="none" stroke="#9a9a96" strokeWidth="2.4" />
          <path d="M2 22 Q14 4 26 18 Z" fill="#e9e7e1" stroke="#b9b6ae" strokeWidth="1" />
          <ellipse cx="40" cy="198" rx="10" ry="2.4" fill="#7d7b76" />
        </svg>

        {/* Les deux bibliothèques */}
        {[0, 1].map((m) => (
          <div key={m} className={`sl-meuble sl-meuble-${m}`}>
            <div className="sl-dessus" aria-hidden="true">
              {m === 0 ? (
                <>
                  <span className="sl-figurine" /><span className="sl-figurine sl-figurine-2" />
                  <svg className="sl-arrosoir" viewBox="0 0 40 24"><path d="M8 8 H26 V22 H8 Z M26 12 L38 4 L39 6 L28 15 Z M12 8 Q17 0 22 8" fill="#3d3b38" stroke="#3d3b38" strokeWidth="1.5" /></svg>
                </>
              ) : (
                <>
                  <svg className="sl-vase" viewBox="0 0 30 40"><path d="M10 2 H20 L19 8 Q30 16 26 30 Q24 38 15 38 Q6 38 4 30 Q0 16 11 8 Z" fill="#c9b08a" /></svg>
                  <span className="sl-boite" />
                </>
              )}
            </div>
            {[0, 1, 2, 3].map((r) => (
              <div key={r} className="sl-rayon">
                <div className="sl-livres">{contenu(m, r, VOLUMES, props)}</div>
              </div>
            ))}
          </div>
        ))}

        {/* Guéridon et plante, panier, guitare */}
        <svg className="sl-plante" viewBox="0 0 100 150" aria-hidden="true">
          <g fill="#3f5b3a">
            <path d="M50 70 Q20 30 8 6 Q30 28 52 66 Z" />
            <path d="M50 70 Q78 26 96 10 Q74 34 54 70 Z" fill="#4c6b45" />
            <path d="M48 70 Q36 20 40 0 Q46 26 52 68 Z" fill="#567a4d" />
            <path d="M52 70 Q66 34 70 14 Q66 40 56 70 Z" />
            <path d="M48 72 Q16 54 0 50 Q24 50 50 70 Z" fill="#567a4d" />
            <path d="M52 72 Q84 56 100 56 Q76 60 52 74 Z" fill="#4c6b45" />
          </g>
          <path d="M32 70 H68 L64 94 H36 Z" fill="#c8a777" />
          <path d="M33 76 H67 M34 82 H66 M35 88 H65" stroke="#a88a5e" strokeWidth="1.4" />
          <ellipse cx="50" cy="96" rx="34" ry="5" fill="#1f1f1f" />
          <path d="M47 100 H53 V146 H47 Z" fill="#1f1f1f" />
          <ellipse cx="50" cy="147" rx="16" ry="3" fill="#1f1f1f" />
        </svg>

        <svg className="sl-panier" viewBox="0 0 100 90" aria-hidden="true">
          <path d="M44 4 H86 V34 H44 Z" fill="#c9a36b" />
          <path d="M44 4 H86 L80 0 H50 Z" fill="#dcb880" />
          <path d="M8 22 Q14 6 34 12 Q46 4 54 18 Q50 30 30 28 Q12 32 8 22 Z" fill="#eef0f2" />
          <path d="M6 30 H94 L88 88 H12 Z" fill="#cfb38a" />
          <g stroke="#a98c62" strokeWidth="1.3">
            <path d="M7 40 H93 M8 50 H92 M9 60 H91 M10 70 H90 M11 80 H89" />
            <path d="M20 30 V88 M34 30 V88 M48 30 V88 M62 30 V88 M76 30 V88" strokeDasharray="3 3" />
          </g>
        </svg>

        <svg className="sl-guitare" viewBox="0 0 60 200" aria-hidden="true">
          <defs>
            <radialGradient id="sl-bois-guitare" cx="40%" cy="40%">
              <stop offset="0" stopColor="#e3a564" />
              <stop offset="1" stopColor="#b06a2c" />
            </radialGradient>
          </defs>
          <path d="M26 4 H34 L33 16 H27 Z" fill="#3a2a1f" />
          <rect x="27.5" y="14" width="5" height="84" fill="#5a3b25" />
          <path d="M30 92 C16 92 14 106 18 114 C8 120 6 140 12 152 C18 164 42 164 48 152 C54 140 52 120 42 114 C46 106 44 92 30 92 Z" fill="url(#sl-bois-guitare)" stroke="#7a4a20" strokeWidth="1" />
          <circle cx="30" cy="122" r="6" fill="#2c1d12" />
          <rect x="24" y="142" width="12" height="3" fill="#3a2a1f" />
          <path d="M18 158 L10 196 M42 158 L50 196 M30 164 V196" stroke="#2d2d2d" strokeWidth="2.6" />
        </svg>
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
