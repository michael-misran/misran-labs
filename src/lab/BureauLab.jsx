// Accueil du Lab : le bureau d'une agence des années 80, illustration BD en
// fond (public/decors/bureau-lab.jpg) et, posés par-dessus en SVG dans le
// même repère de pixels (1376 × 768) : les étiquettes et tiroirs du classeur
// (dossiers du Lab), les fiches du tableau en liège (idées ouvertes), la
// feuille de la machine à écrire (dernier dossier) et l'écran vert. Un
// nouveau dossier ou une nouvelle idée apparaît tout seul.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { visibleProjects, pt, dossierNo } from './projects'
import { getIdeas } from '../projets/idees'
import { statutLabel } from '../projets/projetsText'
import { useLanguage } from '../shell/LanguageContext'

const IMAGE = '/decors/bureau-lab.jpg'
const LARGEUR = 1376
const HAUTEUR = 768
const ENCRE = '#1a1109'
const JAUNE = '#ffd84a'
const KRAFT = '#d9b87a'
const PAPIER = '#f4ecd2'
const MACHINE = "var(--font-machine)"

const COPY = {
  fr: {
    description: 'Le bureau du Lab, la nuit : un classeur de dossiers, un tableau en liège avec les idées, une machine à écrire et un ordinateur.',
    accueilOnglet: 'DOSSIERS DU LAB',
    accueilTitre: 'Le bureau du Lab',
    accueilTexte: 'Un journal de bord honnête, pas un catalogue lissé. Les dossiers sont rangés dans le classeur, les idées du dimanche épinglées au tableau.',
    tiroir: (k) => `TIROIR ${k}`,
    tiroirTitre: (a, b) => (a === b ? `Dossier ${a}` : `Dossiers ${a} à ${b}`),
    tiroirTexte: 'Les dossiers rangés dans ce tiroir :',
    archives: 'ARCHIVES',
    archivesTitre: 'Idées classées',
    archivesTexte: 'Les idées réalisées ou arrêtées, sorties du tableau :',
    vide: 'VIDE',
    ideeOnglet: (id) => `IDÉE ${id}`,
    ouvrirFiche: 'OUVRIR LA FICHE ▶',
    toutesIdees: 'Toutes les idées',
    ecranOnglet: 'LAB_OS',
    ecranTitre: 'Index complet',
    ecranTexte: (d, o, c) => `${d} dossiers, ${o} idées ouvertes et ${c} classées.`,
    ecranLignes: (d, o, c) => [`${d} DOSSIERS`, `${o} IDÉES OUVERTES`, `${c} CLASSÉES`],
    machineOnglet: (no) => `DOSSIER Nº ${no}`,
    machineTexte: 'Le dernier dossier, encore dans la machine à écrire.',
    lireDossier: 'LIRE LE DOSSIER ▶',
    chemisesOnglet: 'MODE D’EMPLOI',
    chemisesTitre: 'Comment ça marche',
    chemisesTexte: 'Comment naissent les idées du dimanche, et comment elles deviennent des dossiers.',
    lire: 'LIRE ▶',
    telOnglet: 'STANDARD',
    telTitre: 'Rester en contact',
    telTexte: 'Être prévenu des nouveaux dossiers et des nouvelles idées.',
    sabonner: 'S’ABONNER ▶',
    fermer: 'Fermer le tiroir',
    aide: 'Survole le classeur, le tableau, la machine à écrire, l’ordinateur ou le téléphone. Clique sur un tiroir pour l’ouvrir.',
  },
  en: {
    description: 'The Lab office at night: a filing cabinet of case files, a cork board with ideas, a typewriter and a computer.',
    accueilOnglet: 'LAB FILES',
    accueilTitre: 'The Lab office',
    accueilTexte: 'An honest logbook, not a polished catalogue. Case files are in the cabinet, Sunday ideas pinned to the board.',
    tiroir: (k) => `DRAWER ${k}`,
    tiroirTitre: (a, b) => (a === b ? `File ${a}` : `Files ${a} to ${b}`),
    tiroirTexte: 'The files in this drawer:',
    archives: 'ARCHIVES',
    archivesTitre: 'Filed ideas',
    archivesTexte: 'Ideas done or stopped, taken off the board:',
    vide: 'EMPTY',
    ideeOnglet: (id) => `IDEA ${id}`,
    ouvrirFiche: 'OPEN THE CARD ▶',
    toutesIdees: 'All ideas',
    ecranOnglet: 'LAB_OS',
    ecranTitre: 'Full index',
    ecranTexte: (d, o, c) => `${d} files, ${o} open ideas and ${c} filed.`,
    ecranLignes: (d, o, c) => [`${d} FILES`, `${o} OPEN IDEAS`, `${c} FILED`],
    machineOnglet: (no) => `FILE Nº ${no}`,
    machineTexte: 'The latest file, still in the typewriter.',
    lireDossier: 'READ THE FILE ▶',
    chemisesOnglet: 'HOW-TO',
    chemisesTitre: 'How it works',
    chemisesTexte: 'How Sunday ideas are born, and how they become case files.',
    lire: 'READ ▶',
    telOnglet: 'SWITCHBOARD',
    telTitre: 'Stay in touch',
    telTexte: 'Get notified of new files and new ideas.',
    sabonner: 'SUBSCRIBE ▶',
    fermer: 'Close the drawer',
    aide: 'Hover the cabinet, the board, the typewriter, the computer or the phone. Click a drawer to open it.',
  },
}

// Couleur des tampons de statut sur les fiches (encre de tampon, en dur)
const ENCRE_TAMPON = {
  proposee: '#2f5fb3',
  gardee: '#2e8b3e',
  'en-cours': '#d4731c',
  faite: '#555',
  arretee: '#b3261e',
}
const PUNAISE = { proposee: '#d6c23a', gardee: '#2e8b3e', 'en-cours': '#e8402a' }
const OUVERTES = ['proposee', 'gardee', 'en-cours']

// Façades des 4 tiroirs du classeur dans l'illustration
const FACADES = [
  { x: 182, y: 262, l: 130, h: 92 },
  { x: 182, y: 364, l: 130, h: 92 },
  { x: 182, y: 466, l: 130, h: 92 },
  { x: 182, y: 563, l: 130, h: 96 },
]

// Tableau en liège : 4 colonnes × 3 rangs de fiches dans le liège visible
// (x 1008–1308, y 98–302)
const COLS = 4
const PLACES_TABLEAU = 12
const PAS_X = 73
const PAS_Y = 66
const X0 = 1020
const Y0 = 112
const FL = 58
const FH = 44
const ANGLES = [-4, 3, -2, 5, 2, -5, 4, -3, 1, -1, 3, -4]

// Zones simples (contour au survol)
const ZONES = {
  ecran: { x: 822, y: 333, l: 116, h: 93 },
  machine: { x: 606, y: 384, l: 148, h: 104 },
  chemises: { x: 718, y: 376, l: 80, h: 116 },
  telephone: { x: 386, y: 418, l: 140, h: 84 },
}

function Contour({ x, y, l, h, rx = 8 }) {
  return <rect className="bureau-contour" x={x} y={y} width={l} height={h} rx={rx} fill="none" stroke={JAUNE} strokeWidth={3} strokeDasharray="7 5" />
}

// Coupe un titre en lignes courtes pour la feuille de la machine à écrire
function couper(texte, max) {
  const lignes = []
  let courante = ''
  for (const mot of texte.split(' ')) {
    if ((courante + ' ' + mot).trim().length > max && courante) {
      lignes.push(courante)
      courante = mot
    } else {
      courante = (courante + ' ' + mot).trim()
    }
  }
  if (courante) lignes.push(courante)
  return lignes
}

// La feuille se tape lettre par lettre (texte complet si animations réduites)
function useFrappe(lignes) {
  const total = lignes.join('\n').length
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(total)
      return
    }
    let i = 0
    let id
    const suivant = () => {
      i++
      setN(i)
      if (i < total) id = setTimeout(suivant, 70 + Math.random() * 60)
    }
    id = setTimeout(suivant, 400)
    return () => clearTimeout(id)
  }, [total])
  let reste = n
  return lignes.map((l) => {
    const morceau = l.slice(0, Math.max(0, reste))
    reste -= l.length + 1
    return morceau
  })
}

// Fiche kraft du tiroir ouvert, à droite du classeur, avec une pointe vers
// le tiroir. Positionnée en % du dessin, texte en px pour rester lisible.
function BulleTiroir({ tiroir, facade, bas, onFermer, libelleFermer }) {
  const { onglet, titre, texte, liens } = tiroir.chemise
  const gauche = ((facade.x + facade.l + 24) / LARGEUR) * 100
  const ancrage = bas
    ? { bottom: `${((HAUTEUR - (facade.y + facade.h)) / HAUTEUR) * 100}%` }
    : { top: `${((facade.y - 8) / HAUTEUR) * 100}%` }
  return (
    <div
      className="bureau-bulle"
      style={{
        position: 'absolute',
        left: `${gauche}%`,
        ...ancrage,
        width: 'min(320px, 30%)',
        background: KRAFT,
        color: ENCRE,
        border: `3px solid ${ENCRE}`,
        boxShadow: '6px 6px 0 rgba(0,0,0,.6)',
        padding: '12px 14px 14px',
        fontFamily: MACHINE,
        zIndex: 2,
      }}
    >
      {/* Pointe vers le tiroir */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: -15,
          [bas ? 'bottom' : 'top']: 26,
          width: 0,
          height: 0,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderRight: `14px solid ${ENCRE}`,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: -9,
          [bas ? 'bottom' : 'top']: 30,
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: `9px solid ${KRAFT}`,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 12, letterSpacing: '0.08em', background: ENCRE, color: KRAFT, padding: '2px 8px' }}>{onglet}</span>
        <button
          type="button"
          onClick={onFermer}
          aria-label={libelleFermer}
          style={{ fontFamily: MACHINE, fontSize: 18, lineHeight: 1, background: 'none', border: 'none', color: ENCRE, cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      <div style={{ fontSize: 18, marginTop: 8 }}>{titre}</div>
      {texte && <div style={{ fontSize: 13, marginTop: 4, opacity: 0.8 }}>{texte}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        {liens.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              fontFamily: MACHINE,
              fontSize: 14,
              color: ENCRE,
              background: PAPIER,
              border: `2px solid ${ENCRE}`,
              boxShadow: `2px 2px 0 ${ENCRE}`,
              padding: '5px 9px',
              textDecoration: 'none',
            }}
          >
            {l.texte}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function BureauLab() {
  const { lang } = useLanguage()
  const c = COPY[lang] ?? COPY.fr
  const [actif, setActif] = useState(null)
  const [ouvert, setOuvert] = useState(-1)

  // Dossiers du Lab, numérotés comme partout ailleurs
  const dossiers = visibleProjects().map((p) => ({ slug: p.slug, no: dossierNo(p.slug), titre: pt(p, lang).title }))
  const idees = getIdeas()
  const ouvertes = idees.filter((i) => OUVERTES.includes(i.statut))
  const classees = idees.filter((i) => !OUVERTES.includes(i.statut)).reverse()
  // Les 12 idées ouvertes les plus récentes, punaisées dans l'ordre des numéros
  const auTableau = ouvertes.slice(0, PLACES_TABLEAU).reverse()

  // 3 tiroirs de dossiers, remplis à parts égales, + 1 tiroir d'archives
  const parTiroir = Math.max(1, Math.ceil(dossiers.length / 3))
  const tiroirs = [0, 1, 2].map((k) => {
    const contenu = dossiers.slice(k * parTiroir, (k + 1) * parTiroir)
    const premier = contenu[0]?.no
    const dernier = contenu[contenu.length - 1]?.no
    return {
      etiquette: contenu.length ? (premier === dernier ? premier : `${premier}-${dernier}`) : c.vide,
      onglets: contenu.map((d) => d.no),
      chemise: {
        onglet: c.tiroir(k + 1),
        titre: contenu.length ? c.tiroirTitre(premier, dernier) : c.vide,
        texte: contenu.length ? c.tiroirTexte : '',
        liens: contenu.map((d) => ({ to: `/lab/${d.slug}`, texte: `Nº ${d.no} · ${d.titre}` })),
      },
    }
  })
  tiroirs.push({
    etiquette: c.archives,
    onglets: classees.map((i) => i.id.slice(2)),
    chemise: {
      onglet: c.tiroir(4),
      titre: c.archivesTitre,
      texte: c.archivesTexte,
      liens: classees.map((i) => ({ to: `/projets/${i.id}`, texte: `${i.id} · ${statutLabel(i.statut, lang)}` })),
    },
  })

  const dernier = dossiers[dossiers.length - 1]
  const feuille = useFrappe(dernier ? [`${c.machineOnglet(dernier.no)}`, ...couper(dernier.titre.toUpperCase(), 16)].slice(0, 4) : [])

  // Contenu de la chemise kraft selon la zone survolée
  const chemises = {
    ecran: {
      onglet: c.ecranOnglet,
      titre: c.ecranTitre,
      texte: c.ecranTexte(dossiers.length, ouvertes.length, classees.length),
      liens: [
        ...dossiers.map((d) => ({ to: `/lab/${d.slug}`, texte: `Nº ${d.no} · ${d.titre}` })),
        { to: '/projets', texte: c.toutesIdees },
      ],
    },
    machine: dernier && {
      onglet: c.machineOnglet(dernier.no),
      titre: dernier.titre,
      texte: c.machineTexte,
      liens: [{ to: `/lab/${dernier.slug}`, texte: c.lireDossier, principal: true }],
    },
    chemises: {
      onglet: c.chemisesOnglet,
      titre: c.chemisesTitre,
      texte: c.chemisesTexte,
      liens: [{ to: '/projets/fonctionnement', texte: c.lire, principal: true }],
    },
    telephone: {
      onglet: c.telOnglet,
      titre: c.telTitre,
      texte: c.telTexte,
      liens: [{ to: '/suivre', texte: c.sabonner, principal: true }],
    },
  }
  for (const idee of auTableau) {
    chemises[idee.id] = {
      onglet: c.ideeOnglet(idee.id),
      titre: idee.titre[lang] ?? idee.titre.fr,
      tampon: idee.statut,
      texte: idee.resume?.[lang] ?? idee.resume?.fr ?? '',
      liens: [
        { to: `/projets/${idee.id}`, texte: c.ouvrirFiche, principal: true },
        { to: '/projets', texte: c.toutesIdees },
      ],
    }
  }
  tiroirs.forEach((t, k) => {
    chemises[`tiroir-${k}`] = t.chemise
  })

  // Par défaut, la chemise donne l'index complet : sur mobile, le dessin est
  // trop petit pour viser un tiroir, la liste reste toujours accessible.
  const chemise = (actif && chemises[actif]) || { onglet: c.accueilOnglet, titre: c.accueilTitre, texte: c.accueilTexte, liens: chemises.ecran.liens }
  const survol = (cle) => ({
    onMouseEnter: () => setActif(cle),
    onFocus: () => setActif(cle),
    className: `bureau-zone${actif === cle ? ' actif' : ''}`,
  })
  useEffect(() => {
    if (ouvert === -1) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOuvert(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ouvert])

  const basculer = (k) => {
    setOuvert((o) => (o === k ? -1 : k))
    setActif(`tiroir-${k}`)
  }

  const [ecran1, ecran2, ecran3] = c.ecranLignes(dossiers.length, ouvertes.length, classees.length)

  return (
    <div style={{ background: '#0f1218', minHeight: 'calc(100vh - 320px)', marginBottom: -60, paddingBottom: 48 }}>
      <style>{`
        .bureau-zone { cursor: pointer; outline: none; }
        .bureau-zone .bureau-contour { opacity: 0; transition: opacity .15s; }
        .bureau-zone:hover .bureau-contour, .bureau-zone:focus-visible .bureau-contour, .bureau-zone.actif .bureau-contour { opacity: 1; }
        .bureau-fiche { transition: transform .15s; transform-box: fill-box; transform-origin: 50% 0; }
        .bureau-fiche:hover, .bureau-fiche:focus-visible, .bureau-fiche.actif { transform: scale(1.18); }
        @keyframes bureau-clignote { 50% { opacity: 0; } }
        .bureau-clignote { animation: bureau-clignote 1s steps(1) infinite; }
        .bureau-bulle { animation: bureau-bulle .18s ease-out; }
        @keyframes bureau-bulle { from { opacity: 0; transform: translateX(-8px); } }
        /* Sur mobile, le dessin est trop petit : la chemise du bas suffit */
        @media (max-width: 700px) { .bureau-bulle { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .bureau-bulle { animation: none; }
          .bureau-fiche, .bureau-zone .bureau-contour { transition: none; }
          .bureau-clignote { animation: none; }
        }
      `}</style>

      <div style={{ maxWidth: LARGEUR, margin: '0 auto', position: 'relative' }}>
        <svg viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`} role="img" aria-label={c.description} style={{ display: 'block', width: '100%', height: 'auto' }}>
          <defs>
            <filter id="bureau-encre" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="5" />
              <feDisplacementMap in="SourceGraphic" scale="1.5" />
            </filter>
            <pattern id="bureau-balayage" width="4" height="3" patternUnits="userSpaceOnUse">
              <rect width="4" height="1" fill="#000" opacity=".3" />
            </pattern>
            <clipPath id="bureau-forme-ecran">
              <rect x="829" y="340" width="102" height="79" rx="10" />
            </clipPath>
            <clipPath id="bureau-forme-feuille">
              <rect x="640" y="388" width="76" height="46" />
            </clipPath>
          </defs>

          <image href={IMAGE} width={LARGEUR} height={HAUTEUR} />

          {/* Écran vert de l'ordinateur : l'index complet */}
          <g {...survol('ecran')} tabIndex={0} role="button" aria-label={c.ecranTitre}>
            <g clipPath="url(#bureau-forme-ecran)">
              <rect x="825" y="336" width="110" height="88" fill="#0c2414" />
              <g fontFamily="var(--font-ecran)" fontSize="10" fill="#6bff7a" style={{ filter: 'drop-shadow(0 0 2px #3dff5a)' }}>
                <text x="836" y="356">LAB_OS 1.0</text>
                <text x="836" y="369">{ecran1}</text>
                <text x="836" y="381">{ecran2}</text>
                <text x="836" y="393">{ecran3}</text>
                <text x="836" y="408">
                  &gt; <tspan className="bureau-clignote">█</tspan>
                </text>
              </g>
              <rect x="825" y="336" width="110" height="88" fill="url(#bureau-balayage)" />
              <path d="M842 348 Q846 343 856 343" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".35" strokeLinecap="round" />
            </g>
            <Contour {...ZONES.ecran} rx={12} />
          </g>

          {/* Feuille dans la machine à écrire : le dernier dossier */}
          {dernier && (
            <Link to={`/lab/${dernier.slug}`} {...survol('machine')} aria-label={`${c.machineOnglet(dernier.no)} — ${dernier.titre}`}>
              <g clipPath="url(#bureau-forme-feuille)">
                <rect x="641" y="388" width="74" height="50" fill="#f6f1e4" />
                <g fontFamily={MACHINE} fontSize="6.2" fill={ENCRE}>
                  {feuille.map((l, i) => (
                    <text key={i} x="646" y={399 + i * 9}>{l}</text>
                  ))}
                </g>
              </g>
              <rect x={ZONES.machine.x} y={ZONES.machine.y} width={ZONES.machine.l} height={ZONES.machine.h} fill="transparent" />
              <Contour {...ZONES.machine} />
            </Link>
          )}

          {/* Pile de chemises : mode d'emploi */}
          <Link to="/projets/fonctionnement" {...survol('chemises')} aria-label={c.chemisesTitre}>
            <rect x={ZONES.chemises.x} y={ZONES.chemises.y} width={ZONES.chemises.l} height={ZONES.chemises.h} fill="transparent" />
            <Contour {...ZONES.chemises} rx={6} />
          </Link>

          {/* Téléphone à cadran : s'abonner */}
          <Link to="/suivre" {...survol('telephone')} aria-label={c.telTitre}>
            <rect x={ZONES.telephone.x} y={ZONES.telephone.y} width={ZONES.telephone.l} height={ZONES.telephone.h} fill="transparent" />
            <Contour {...ZONES.telephone} />
          </Link>

          {/* Classeur : 3 tiroirs de dossiers + archives */}
          <g filter="url(#bureau-encre)">
            {tiroirs.map((t, k) => {
              const f = FACADES[k]
              const estOuvert = k === ouvert
              const pas = Math.min(34, (f.l - 36) / Math.max(1, t.onglets.length - 1))
              return (
                <g
                  key={k}
                  {...survol(`tiroir-${k}`)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={estOuvert}
                  aria-label={`${c.tiroir(k + 1)} — ${t.etiquette}`}
                  onClick={() => basculer(k)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      basculer(k)
                    }
                  }}
                >
                  {estOuvert && (
                    <>
                      {/* Tiroir tiré vers nous : intérieur sombre, onglets des chemises */}
                      <rect x={f.x + 4} y={f.y - 20} width={f.l - 8} height={26} fill="#23262c" stroke={ENCRE} strokeWidth={2.5} />
                      {t.onglets.map((o, i) => {
                        const ox = f.x + 12 + i * pas
                        const dy = (i % 2) * 3
                        return (
                          <g key={o}>
                            <path
                              d={`M${ox} ${f.y + 4} V${f.y - 12 + dy} Q${ox} ${f.y - 16 + dy} ${ox + 4} ${f.y - 16 + dy} H${ox + 26} Q${ox + 30} ${f.y - 16 + dy} ${ox + 30} ${f.y - 12 + dy} V${f.y + 4} Z`}
                              fill={KRAFT}
                              stroke={ENCRE}
                              strokeWidth={2}
                            />
                            <text x={ox + 15} y={f.y - 6 + dy} textAnchor="middle" fontFamily={MACHINE} fontSize={8} fill={ENCRE}>{o}</text>
                          </g>
                        )
                      })}
                      {/* Façade avancée, un peu plus grande, ombre en dessous */}
                      <rect x={f.x - 4} y={f.y + 4} width={f.l + 8} height={f.h + 4} fill="#000" opacity={0.35} />
                      <rect x={f.x - 4} y={f.y} width={f.l + 8} height={f.h} rx={3} fill="#6f7682" stroke={ENCRE} strokeWidth={3} />
                      <rect x={f.x + 2} y={f.y + 6} width={f.l - 4} height={f.h - 12} rx={2} fill="none" stroke="#565c66" strokeWidth={2} />
                      <path d={`M${f.x + f.l / 2 - 26} ${f.y + 56} H${f.x + f.l / 2 + 26}`} stroke={ENCRE} strokeWidth={6} strokeLinecap="round" />
                      <path d={`M${f.x + f.l / 2 - 24} ${f.y + 55} H${f.x + f.l / 2 + 24}`} stroke="#c9ccd2" strokeWidth={2} strokeLinecap="round" />
                    </>
                  )}
                  {/* Étiquette dans le porte-étiquette */}
                  <rect x={f.x + 45} y={f.y + 15} width={40} height={21} fill="#f6f1e4" stroke={ENCRE} strokeWidth={2} />
                  <text x={f.x + 65} y={f.y + 29} textAnchor="middle" fontFamily={MACHINE} fontSize={t.etiquette.length > 7 ? 6.5 : 7.5} fill={ENCRE}>
                    {t.etiquette}
                  </text>
                  <rect x={f.x} y={f.y} width={f.l} height={f.h} fill="transparent" />
                  <Contour x={f.x - 6} y={f.y - (estOuvert ? 24 : 2)} l={f.l + 12} h={f.h + (estOuvert ? 28 : 4)} rx={5} />
                </g>
              )
            })}
          </g>

          {/* Tableau en liège : une fiche punaisée par idée ouverte */}
          <g filter="url(#bureau-encre)">
            {auTableau.map((idee, i) => {
              const col = i % COLS
              const rang = Math.floor(i / COLS)
              const x = X0 + col * PAS_X + (rang % 2) * 6
              const y = Y0 + rang * PAS_Y
              const couleur = ENCRE_TAMPON[idee.statut]
              return (
                // Rotation sur le groupe parent, agrandissement au survol sur le lien
                <g key={idee.id} transform={`rotate(${ANGLES[i % ANGLES.length]} ${x + FL / 2} ${y})`}>
                  <Link
                    to={`/projets/${idee.id}`}
                    {...survol(idee.id)}
                    className={`bureau-zone bureau-fiche${actif === idee.id ? ' actif' : ''}`}
                    aria-label={`${idee.id} — ${idee.titre[lang] ?? idee.titre.fr}`}
                  >
                    <rect x={x + 3} y={y + 3} width={FL} height={FH} fill="#000" opacity={0.3} />
                    <rect x={x} y={y} width={FL} height={FH} fill={PAPIER} stroke={ENCRE} strokeWidth={1.8} />
                    <path d={`M${x + 4} ${y + 14} H${x + FL - 4}`} stroke="#c0392b" strokeWidth={1} />
                    {[0, 1, 2].map((r) => (
                      <path key={r} d={`M${x + 4} ${y + 21 + r * 6} H${x + FL - 4 - r * 8}`} stroke="#9fb6d6" strokeWidth={0.8} />
                    ))}
                    <text x={x + 5} y={y + 11} fontFamily={MACHINE} fontSize={9} fill={ENCRE}>{idee.id}</text>
                    {/* Tampon de statut */}
                    <g transform={`rotate(-8 ${x + FL / 2} ${y + 33})`}>
                      <rect x={x + 8} y={y + 27} width={FL - 16} height={11} fill="none" stroke={couleur} strokeWidth={1.5} opacity={0.9} />
                      <text x={x + FL / 2} y={y + 35.5} textAnchor="middle" fontFamily="var(--font-etiquette)" fontWeight={700} fontSize={6.5} fill={couleur} letterSpacing={0.5}>
                        {statutLabel(idee.statut, lang)}
                      </text>
                    </g>
                    {/* Punaise */}
                    <circle cx={x + FL / 2} cy={y + 2} r={4.5} fill={PUNAISE[idee.statut]} stroke={ENCRE} strokeWidth={1.5} />
                    <circle cx={x + FL / 2 - 1.3} cy={y + 0.8} r={1.2} fill="#fff" opacity={0.8} />
                    <rect className="bureau-contour" x={x - 3} y={y - 5} width={FL + 6} height={FH + 8} fill="none" stroke={JAUNE} strokeWidth={2.5} strokeDasharray="6 4" />
                  </Link>
                </g>
              )
            })}
          </g>
        </svg>

        {/* Fiche du tiroir ouvert, posée à côté du classeur : visible sans défiler */}
        {ouvert !== -1 && <BulleTiroir tiroir={tiroirs[ouvert]} facade={FACADES[ouvert]} bas={ouvert >= 2} onFermer={() => setOuvert(-1)} libelleFermer={c.fermer} />}
      </div>

      {/* Chemise kraft sous la scène : ce qu'on survole */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% - 32px)',
          maxWidth: 820,
          margin: '36px auto 0',
          background: KRAFT,
          color: ENCRE,
          border: `3px solid ${ENCRE}`,
          boxShadow: '7px 7px 0 rgba(0,0,0,.6)',
          padding: '18px 22px 20px',
          fontFamily: MACHINE,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -31,
            left: 24,
            background: KRAFT,
            border: `3px solid ${ENCRE}`,
            borderBottom: 'none',
            padding: '4px 14px',
            fontSize: 13,
            letterSpacing: '0.08em',
          }}
        >
          {chemise.onglet}
        </div>
        <h1 style={{ fontFamily: MACHINE, fontSize: 22, fontWeight: 400, margin: 0 }}>
          {chemise.titre}
          {chemise.tampon && (
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-etiquette)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.1em',
                color: ENCRE_TAMPON[chemise.tampon],
                border: '2px solid currentColor',
                padding: '1px 6px',
                transform: 'rotate(-4deg)',
                marginLeft: 8,
                verticalAlign: 'middle',
              }}
            >
              {statutLabel(chemise.tampon, lang)}
            </span>
          )}
        </h1>
        {chemise.texte && <p style={{ fontSize: 15, lineHeight: 1.4, margin: '6px 0 0' }}>{chemise.texte}</p>}
        {chemise.liens.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
            {chemise.liens.map((l) => (
              <Link
                key={l.to + l.texte}
                to={l.to}
                style={{
                  fontFamily: MACHINE,
                  fontSize: 14,
                  textDecoration: 'none',
                  color: l.principal ? PAPIER : ENCRE,
                  background: l.principal ? ENCRE : PAPIER,
                  border: `2px solid ${ENCRE}`,
                  boxShadow: `3px 3px 0 ${ENCRE}`,
                  padding: '7px 12px',
                }}
              >
                {l.texte}
              </Link>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontFamily: MACHINE, textAlign: 'center', fontSize: 14, color: PAPIER, opacity: 0.55, margin: '24px 16px 0' }}>{c.aide}</p>
    </div>
  )
}
