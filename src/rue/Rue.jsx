import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import Logo1977 from '../shell/Logo1977'
import { LEDS_RUE_NOEL } from './leds-noel'
import { FLAMMES_RUE_HALLOWEEN } from './lumieres-halloween'
import './rue.css'

// Page d'accueil : la rue de 1977 Éditions (illustration Gemini). Deux
// boutiques, un univers chacune : la librairie « L'Entre Deux Pages » (livres)
// et l'arcade « Insert Coin » (jeux). Michael est assis sur les marches de la
// librairie : il mène au portfolio. Enseignes vides dans l'image, noms écrits
// ici en code. Un clic zoome vers la porte puis change de page.
// Maquette d'origine : screens/rue-v3.html.

const RATIO = 2752 / 1548

// Décors de saison : même cadrage, mêmes mesures. Dates incluses (mois-jour).
// Lueurs = citrouilles allumées : centre (x, y) et largeur en % de l'image.
// Pour forcer : /?saison=halloween ou /?saison=normale
const NORMALE = { id: 'normale', image: '/rue/rue.jpg', lueurs: [] }
const SAISONS = [
  {
    id: 'halloween', image: '/rue/rue-halloween.jpg', du: '10-15', au: '11-02',
    // Citrouilles au sol et en vitrine, guirlande de citrouilles, lanternes à bougie
    lueurs: [
      [17, 78.1, 4.4], [8.9, 87.4, 3.2], [49.3, 85.4, 2.6], [57.5, 88.7, 2.6], [73.1, 77.3, 3], [63.2, 72.8, 2.2], [92.1, 87.7, 3], [98.6, 77.8, 2.8],
      [47.9, 44.5, 2.4], [54.4, 41, 2], [92, 43.8, 2.4], [97.9, 40.9, 2.2],
      [14.6, 73, 2.6], [16.3, 87.4, 2.6], [34, 79, 2.6], [36.8, 87.4, 2.6], [46.3, 85, 2.4], [61.1, 87.4, 2.4], [75.6, 76.9, 2.4],
    ],
    // Gemini a peint un fantôme sur le chevalet : pas de texte à la craie par-dessus
    sansArdoisePied: true,
    // Petites flammes qui vacillent + feuilles mortes emportées par le vent de temps en temps
    flammes: FLAMMES_RUE_HALLOWEEN,
    feuilles: true,
  },
  // Noël : retouche ChatGPT de la rue normale, alignée au pixel, agrandie avec Upscayl
  // Ampoules des guirlandes qui scintillent + neige qui tombe (en CSS, rien à charger)
  { id: 'noel', image: '/rue/rue-noel.jpg', du: '12-01', au: '01-06', lueurs: [], leds: LEDS_RUE_NOEL, neige: true },
]

// Feuilles mortes (Halloween) : hauteur de départ en %, taille, couleur et rythme.
// Elles traversent l'écran par rafales : chacune n'est visible qu'une partie de son cycle.
const FEUILLES = [
  { y: 18, taille: 4.2, couleur: 'orange', delai: 2, duree: 16 },
  { y: 32, taille: 3.4, couleur: 'rouge', delai: 3.2, duree: 16 },
  { y: 9, taille: 2.9, couleur: 'jaune', delai: 4.1, duree: 16 },
  { y: 46, taille: 3.8, couleur: 'brun', delai: 2.6, duree: 16 },
  { y: 26, taille: 2.6, couleur: 'orange', delai: 11, duree: 19 },
  { y: 55, taille: 3.5, couleur: 'rouge', delai: 12.4, duree: 19 },
  { y: 38, taille: 3.0, couleur: 'jaune', delai: 13.1, duree: 19 },
]

function saisonDuJour(date = new Date()) {
  const jour = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return SAISONS.find((s) => (s.du <= s.au ? jour >= s.du && jour <= s.au : jour >= s.du || jour <= s.au)) ?? NORMALE
}

// Les trois entrées : zone cliquable et point visé par le zoom, en % de l'image
const ENTREES = [
  {
    id: 'moi', to: '/portfolio', porte: [27.5, 78],
    titre: { fr: 'Qui suis-je ?', en: 'Who am I?' },
    sous: { fr: 'Parcours · CV · Portfolio', en: 'Background · CV · Portfolio' },
  },
  {
    id: 'livres', to: '/librairie', porte: [22.1, 65],
    titre: { fr: "L'Entre Deux Pages", en: "L'Entre Deux Pages" },
    sous: { fr: 'Librairie · romans', en: 'Bookshop · novels' },
  },
  {
    id: 'jeux', to: '/jeux', porte: [81.8, 73.7],
    titre: { fr: 'Insert Coin', en: 'Insert Coin' },
    sous: { fr: 'Arcade · jeux jouables', en: 'Arcade · playable games' },
  },
]

const T = {
  bulle: { fr: "Salut, c'est Michael !", en: "Hi, I'm Michael!" },
  glisse: { fr: "← Glissez vers l'arcade →", en: '← Swipe to the arcade →' },
  saisons: {
    halloween: { fr: 'Halloween', en: 'Halloween' },
    noel: { fr: 'Noël', en: 'Christmas' },
    normale: { fr: 'Toute l’année', en: 'All year' },
  },
  ardoiseMur: { fr: ['Nouveau', 'roman'], en: ['New', 'novel'] },
  ardoisePied: { fr: ['Démo', 'jouable', '→'], en: ['Playable', 'demo', '→'] },
  alt: {
    fr: 'Une rue au crépuscule : une librairie rouge à gauche, une boutique de jeux vidéo en briques à droite, et Michael qui lit sur les marches de la librairie',
    en: 'A street at dusk: a red bookshop on the left, a brick video game shop on the right, and Michael reading on the bookshop steps',
  },
}

export default function Rue() {
  const { lang, toggle: basculerLangue } = useLanguage()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const force = params.get('saison')
  // Saison du moment (ou forcée par l'adresse) ; le visiteur peut basculer vers la rue normale
  const duMoment = force === 'normale' ? NORMALE : SAISONS.find((s) => s.id === force) ?? saisonDuJour()
  const [choix, setChoix] = useState(null)
  const saison = choix ?? duMoment
  // Image de saison absente : retour à la rue normale
  const [enEchec, setEnEchec] = useState(null)
  const image = saison.image !== enEchec ? saison.image : NORMALE.image
  // Décors animés seulement si l'image de la saison est bien affichée
  const decor = image === saison.image
  const lueurs = decor ? saison.lueurs : []

  // Entrée dans une boutique : zoom vers sa porte, fondu, puis changement de page
  const [entree, setEntree] = useState(null)
  const entrer = (e, ent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    e.preventDefault()
    setEntree(ent)
    setTimeout(() => navigate(ent.to), 900)
  }

  // Téléphone (< 700 px) : la scène défile dans son cadre ; départ sur la
  // librairie et Michael (≈ 28 % de l'image), indication jusqu'au 1er glissement
  const cadreRef = useRef(null)
  const [aGlisse, setAGlisse] = useState(false)
  useEffect(() => {
    const el = cadreRef.current
    if (!el) return undefined
    const depart = Math.max(0, el.scrollWidth * 0.28 - el.clientWidth / 2)
    el.scrollLeft = depart
    // Le défilement de départ ne compte pas : seul un vrai déplacement (> 20 px) masque l'indication
    const surDefilement = () => { if (Math.abs(el.scrollLeft - depart) > 20) setAGlisse(true) }
    el.addEventListener('scroll', surDefilement, { passive: true })
    return () => el.removeEventListener('scroll', surDefilement)
  }, [])

  useEffect(() => {
    document.title = lang === 'fr' ? '1977 Éditions — la rue' : '1977 Éditions — the street'
  }, [lang])

  return (
    <div className={`rue${entree ? ' rue-entree' : ''}`}>
      <header className="rue-bandeau">
        <span className="rue-marque">
          <Logo1977 carre largeur={26} fond="#3a2e24" />
          1977 Éditions
        </span>
        <nav>
          <Link to="/librairie">{lang === 'fr' ? 'Librairie' : 'Bookshop'}</Link>
          <Link to="/jeux">{lang === 'fr' ? 'Jeux' : 'Games'}</Link>
          <Link to="/portfolio">{lang === 'fr' ? 'Qui suis-je' : 'About'}</Link>
          <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </nav>
      </header>

      <div className="rue-cadre" ref={cadreRef}>
        <main className="rue-scene" style={{ '--ratio': RATIO }}>
          {/* Calque qui zoome à l'entrée : image + enseignes + lueurs */}
          <div
            className="rue-monde"
            style={entree ? { transformOrigin: `${entree.porte[0]}% ${entree.porte[1]}%` } : undefined}
          >
            <img className="rue-image" src={image} alt={T.alt[lang]} onError={() => image !== NORMALE.image && setEnEchec(image)} />
            <p className="rue-enseigne-livres">L'Entre<br />Deux Pages</p>
            <p className="rue-enseigne-jeux">Insert Coin</p>
            <p className="rue-ardoise rue-ardoise-mur">{T.ardoiseMur[lang].map((l, i) => <span key={i}>{l}</span>)}</p>
            {!(image === saison.image && saison.sansArdoisePied) && (
              <p className="rue-ardoise rue-ardoise-pied">{T.ardoisePied[lang].map((l, i) => <span key={i}>{l}</span>)}</p>
            )}
            {decor && saison.leds?.map(([x, y], i) => (
              <span
                key={`led-${i}`}
                className="rue-led"
                aria-hidden="true"
                style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${1.6 + ((i * 7) % 11) * 0.23}s`, animationDelay: `${-((i * 13) % 17) * 0.29}s` }}
              />
            ))}
            {decor && saison.flammes?.map(([x, y], i) => (
              <span
                key={`flamme-${i}`}
                className="rue-flamme"
                aria-hidden="true"
                style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${1.3 + ((i * 7) % 9) * 0.17}s`, animationDelay: `${-((i * 11) % 13) * 0.21}s` }}
              />
            ))}
            {decor && saison.neige && <div className="rue-neige" aria-hidden="true" />}
            {decor && saison.feuilles && (
              <div className="rue-feuilles" aria-hidden="true">
                {FEUILLES.map((f, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className={`rue-feuille rue-feuille-${f.couleur}`}
                    style={{ top: `${f.y}%`, '--taille': `${f.taille}cqh`, animationDelay: `${f.delai}s`, animationDuration: `${f.duree}s` }}
                  >
                    {/* Feuille et sa nervure */}
                    <path d="M12 1c6 4 9 11 2 19l-1 3h-2l-1-3C3 12 6 5 12 1z" fill="currentColor" stroke="#2a1608" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M12 4v17" stroke="rgba(60,25,10,.45)" strokeWidth="1" fill="none" />
                  </svg>
                ))}
              </div>
            )}
            {lueurs.map(([x, y, l], i) => (
              <span key={i} className="rue-lueur" aria-hidden="true" style={{ left: `${x}%`, top: `${y}%`, width: `${l}%`, animationDelay: `${-i * 0.6}s` }} />
            ))}
          </div>

          {/* Michael d'abord : sa zone passe au-dessus de celle de la librairie */}
          {ENTREES.map((ent) => (
            <Link key={ent.id} to={ent.to} className={`rue-zone rue-z-${ent.id}`} onClick={(e) => entrer(e, ent)}>
              {ent.id === 'moi' && <span className="rue-bulle" aria-hidden="true">{T.bulle[lang]}</span>}
              <span className="rue-etiquette">{ent.titre[lang]}<small>{ent.sous[lang]}</small></span>
            </Link>
          ))}
        </main>
      </div>
      <div className="rue-voile" aria-hidden="true" />
      {!aGlisse && <p className={`rue-glisse${duMoment !== NORMALE ? ' rue-glisse-haut' : ''}`} aria-hidden="true">{T.glisse[lang]}</p>}
      {/* Une saison est en cours : on montre aussi la rue normale, pour voir l'univers changer */}
      {duMoment !== NORMALE && (
        <div className="rue-saisons" role="group" aria-label={lang === 'fr' ? 'Décor de la rue' : 'Street decor'}>
          {[duMoment, NORMALE].map((x) => (
            <button key={x.id} type="button" aria-pressed={saison === x} className={saison === x ? 'actif' : ''} onClick={() => setChoix(x)}>
              {T.saisons[x.id][lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
