// Accueil de la Gazette : un kiosque à journaux parisien à l'aube,
// illustration BD en fond (public/decors/kiosque-gazette.jpg) et, posés
// par-dessus en SVG dans le même repère de pixels (1376 × 768) : le titre
// peint du fronton, la Gazette du jour suspendue en vitrine, les affiches
// du mot et du chiffre, les 4 numéros précédents sur l'étal et la date à
// la craie sur l'ardoise. Une coupure de presse sous la scène décrit ce
// qu'on survole et, par défaut, liste toutes les éditions.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { formatDateLong } from './brevesText'
import { getDays } from './jours'

const IMAGE = '/decors/kiosque-gazette.jpg'
const LARGEUR = 1376
const HAUTEUR = 768
const ENCRE = '#1a1109'
const ENCRE_CORPS = '#2a2018'
const PAPIER = '#f3ead2'
const ROUGE = '#b3261e'
const JAUNE = '#ffd84a'

// Polices : familles réelles (pour la mesure au canvas) et tokens (pour le rendu)
const GOTHIQUE = 'var(--font-gothique)'
const TITRE = 'var(--font-etiquette)'
const CORPS = 'var(--font-chapo)'
const CRAIE = "'Caveat', cursive"

const COPY = {
  fr: {
    description: 'Un kiosque à journaux parisien à l’aube : la Gazette du Lab du jour accrochée en vitrine.',
    leMot: 'LE MOT',
    leChiffre: 'LE CHIFFRE',
    enBref: 'EN BREF',
    motDuJour: 'LE MOT DU JOUR',
    chiffreDuJour: 'LE CHIFFRE DU JOUR',
    aujourdhui: 'AUJOURD’HUI',
    alaUne: 'À LA UNE · IA',
    tech: 'TECH',
    leMotPrefixe: 'Le mot : ',
    ancienNumero: 'ANCIEN NUMÉRO',
    lireNumero: 'LIRE CE NUMÉRO ▶',
    lireDuJour: 'LIRE LA GAZETTE DU JOUR ▶',
    brevesAuSommaire: (n) => `${n} brève${n > 1 ? 's' : ''} au sommaire`,
    toutesEditions: 'TOUTES LES ÉDITIONS',
    numeros: (n) => `${n} numéro${n > 1 ? 's' : ''}`,
    ouvert: 'Le kiosque est ouvert dès 5 h 30',
    accroche: 'Chaque matin, la Gazette du Lab : l’actualité IA à la une, la tech en brèves, le mot du jour.',
    craie: ['toutes les', 'éditions →'],
    rss: 'Flux RSS',
    suivre: 'Suivre',
    aide: 'Survole le journal, les affiches, les piles d’anciens numéros ou l’ardoise.',
    vide: 'Aucune édition pour l’instant.',
    locale: 'fr-FR',
  },
  en: {
    description: 'A Parisian newspaper kiosk at dawn: today’s Lab Gazette hanging in the window.',
    leMot: 'THE WORD',
    leChiffre: 'THE FIGURE',
    enBref: 'IN BRIEF',
    motDuJour: 'WORD OF THE DAY',
    chiffreDuJour: 'FIGURE OF THE DAY',
    aujourdhui: 'TODAY',
    alaUne: 'FRONT PAGE · AI',
    tech: 'TECH',
    leMotPrefixe: 'The word: ',
    ancienNumero: 'BACK ISSUE',
    lireNumero: 'READ THIS ISSUE ▶',
    lireDuJour: 'READ TODAY’S GAZETTE ▶',
    brevesAuSommaire: (n) => `${n} brief${n > 1 ? 's' : ''} in this issue`,
    toutesEditions: 'ALL ISSUES',
    numeros: (n) => `${n} issue${n > 1 ? 's' : ''}`,
    ouvert: 'The kiosk opens at 5:30 am',
    accroche: 'Every morning, the Lab Gazette: AI news on the front page, tech in brief, the word of the day.',
    craie: ['all', 'issues →'],
    rss: 'RSS feed',
    suivre: 'Follow',
    aide: 'Hover the newspaper, the posters, the stacks of back issues or the chalkboard.',
    vide: 'No issue yet.',
    locale: 'en-GB',
  },
}

// Piles de journaux sur l'étal (x, largeur, haut de la pile)
const PILES = [
  { x: 482, l: 116, haut: 498 },
  { x: 595, l: 92, haut: 512 },
  { x: 709, l: 90, haut: 508 },
  { x: 791, l: 110, haut: 496 },
]
const ANGLES_ETIQUETTES = [-3, 2, -2, 3]

// Surfaces dessinées en biais ou en perspective dans l'illustration : les
// 4 coins sont relevés dans les pixels de l'image (bords du papier, du
// bandeau ou de l'ardoise), avec une taille de repère local. Le contenu est
// mis en page à plat dans ce repère (0..l × 0..h), puis chaque ligne est
// posée sur la surface à sa hauteur : elle suit l'inclinaison ET le
// resserrement de perspective (bords haut et bas qui convergent).
const SURFACES = {
  pageGauche: { hg: [593, 314], hd: [686, 328], bg: [596, 468], bd: [687, 484], l: 90, h: 147 },
  pageDroite: { hg: [690, 328], hd: [786, 314], bg: [690, 484], bd: [783, 469], l: 90, h: 152 },
  afficheGauche: { hg: [346, 336], hd: [415, 328], bg: [346, 523], bd: [415, 531], l: 70, h: 192 },
  afficheDroite: { hg: [962, 327], hd: [1031, 336], bg: [962, 531], bd: [1031, 523], l: 70, h: 192 },
  bandeauGauche: { hg: [338, 261.6], hd: [425, 241.9], bg: [338, 291.2], bd: [425, 274.8], l: 87, h: 31 },
  bandeauDroit: { hg: [955, 243.5], hd: [1038, 262.3], bg: [955, 276.5], bd: [1038, 291.7], l: 83, h: 33 },
  ardoise: { hg: [471, 607], hd: [546, 610], bg: [480, 721], bd: [557, 717], l: 75, h: 114 },
}

const mix = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]

// Transformation d'une ligne posée à la hauteur locale `v` : l'horizontale
// locale va du bord gauche au bord droit de la surface à cette hauteur, la
// verticale suit la pente moyenne des deux bords.
function ligne(S, v) {
  const t = v / S.h
  const pg = mix(S.hg, S.bg, t)
  const pd = mix(S.hd, S.bd, t)
  const a = (pd[0] - pg[0]) / S.l
  const b = (pd[1] - pg[1]) / S.l
  const c = (S.bg[0] - S.hg[0] + S.bd[0] - S.hd[0]) / (2 * S.h)
  const d = (S.bg[1] - S.hg[1] + S.bd[1] - S.hd[1]) / (2 * S.h)
  return `matrix(${a} ${b} ${c} ${d} ${pg[0] - c * v} ${pg[1] - d * v})`
}

// Contour (et zone de survol) d'une surface
function cheminSurface({ hg, hd, bg, bd }, marge = 4) {
  return `M${hg[0] - marge} ${hg[1] - marge} L${hd[0] + marge} ${hd[1] - marge} L${bd[0] + marge} ${bd[1] + marge} L${bg[0] - marge} ${bg[1] + marge} Z`
}

// Texte et filet posés sur une surface, à la hauteur locale `y`.
// L'espacement des lettres ajoute un blanc après la dernière : on le
// compense pour qu'un texte centré le soit vraiment.
function T({ s, x, y, children, letterSpacing, textAnchor, ...attrs }) {
  const dx = letterSpacing && textAnchor === 'middle' ? Number(letterSpacing) / 2 : 0
  return (
    <text transform={ligne(s, y)} x={x + dx} y={y} letterSpacing={letterSpacing} textAnchor={textAnchor} {...attrs}>
      {children}
    </text>
  )
}
function Filet({ s, y, x0, x1, ...attrs }) {
  return <path transform={ligne(s, y)} d={`M${x0} ${y} H${x1}`} {...attrs} />
}

const sansHtml = (texte) => (texte ?? '').replace(/<[^>]+>/g, '')

// "2026-10-05" → Date locale (sans glissement UTC)
function enDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Mesure au canvas pour couper un texte à la largeur d'une page de journal.
// Les polices web n'étant pas forcément chargées au premier rendu, on
// recalcule une fois document.fonts prêt.
let ctxMesure = null
function couper(texte, police, largeur) {
  if (!ctxMesure) ctxMesure = document.createElement('canvas').getContext('2d')
  ctxMesure.font = police
  const lignes = []
  let ligne = ''
  for (const mot of texte.split(' ')) {
    const essai = (ligne + ' ' + mot).trim()
    if (ctxMesure.measureText(essai).width > largeur && ligne) {
      lignes.push(ligne)
      ligne = mot
    } else {
      ligne = essai
    }
  }
  if (ligne) lignes.push(ligne)
  return lignes
}
// Taille de police maximale pour qu'un texte tienne sur une seule ligne de
// la largeur donnée (le chiffre du jour sur l'affiche, ex. « 84,4 % »)
function tailleAjustee(texte, police, tailleMax, largeur) {
  if (!ctxMesure) ctxMesure = document.createElement('canvas').getContext('2d')
  ctxMesure.font = police.replace('{taille}', tailleMax)
  const mesure = ctxMesure.measureText(texte).width
  return mesure > largeur ? Math.floor((tailleMax * largeur) / mesure * 10) / 10 : tailleMax
}
// Texte des petits bandeaux peints : 15 px au plus, avec une marge de 8 px
// de chaque côté. Un mot long resserre d'abord son interlettrage (non compté
// par le canvas), puis réduit sa taille.
function styleBandeau(texte, largeurBandeau) {
  for (const espace of [3, 2, 1, 0.5]) {
    const taille = tailleAjustee(texte, '700 {taille}px Oswald', 15, largeurBandeau - 16 - espace * texte.length)
    if (taille >= 12 || espace === 0.5) return { fontSize: taille, letterSpacing: String(espace) }
  }
}
function usePolicesPretes() {
  const [pretes, setPretes] = useState(0)
  useEffect(() => {
    let actif = true
    document.fonts?.ready.then(() => actif && setPretes((n) => n + 1))
    return () => {
      actif = false
    }
  }, [])
  return pretes
}

// Page de droite du journal : titre puis résumé de chaque brève tech,
// empilés de haut en bas. Renvoie les blocs positionnés et le bas de page.
function mettreEnPageTech(breves) {
  let y = 27
  const blocs = breves.map((b) => {
    const titre = couper(b.titre, '500 6px Oswald', 74)
    const yTitre = y
    y += titre.length * 7 + 2
    const resume = couper(b.resume, "5px 'IM Fell English'", 74).slice(0, 5)
    const yResume = y
    y += resume.length * 6 + 6
    return { titre, yTitre, resume, yResume }
  })
  return { blocs, yFin: y }
}

// Empile des groupes de lignes à partir de `y0` (pas entre lignes, écart entre groupes)
function empiler(groupes, y0, pas, ecart) {
  let y = y0
  return groupes.map((lignes) => {
    const bloc = { lignes, y }
    y += lignes.length * pas + ecart
    return bloc
  })
}

function Lignes({ s, lignes, x, y, pas, ...attrs }) {
  return lignes.map((l, i) => (
    <T key={i} s={s} x={x} y={y + i * pas} {...attrs}>
      {l}
    </T>
  ))
}

function Contour(props) {
  return <path className="kiosque-contour" fill="none" stroke={JAUNE} strokeWidth={3} strokeDasharray="8 5" {...props} />
}

export default function BrevesHome() {
  const { lang } = useLanguage()
  const c = COPY[lang] ?? COPY.fr
  usePolicesPretes()
  const [actif, setActif] = useState(null)

  const jours = getDays()
  const jour = jours[0]
  const anciennes = jours.slice(1, 1 + PILES.length).reverse()

  if (!jour) {
    return <p style={{ fontFamily: CORPS, fontSize: 15, color: 'var(--muted)', textAlign: 'center', padding: 40 }}>{c.vide}</p>
  }

  const t = (v) => (typeof v === 'string' ? v : v?.[lang] ?? v?.fr ?? '')
  const une = jour.breves.find((b) => b.rubrique === 'ia') ?? jour.breves[0]
  const tech = jour.breves.filter((b) => b !== une)
  const dateLongue = (iso) => formatDateLong(iso, lang)
  const dateCourte = (iso) => {
    const d = enDate(iso)
    const jourSemaine = d.toLocaleDateString(c.locale, { weekday: 'short' }).replace('.', '')
    return `${jourSemaine}. ${d.getDate()}/${d.getMonth() + 1}`
  }
  const dj = enDate(jour.date)
  const jourSemaine = dj.toLocaleDateString(c.locale, { weekday: 'long' }).replace(/^./, (x) => x.toUpperCase())
  const jourMois = dj.toLocaleDateString(c.locale, { day: 'numeric', month: 'short' })

  // ----- Page de gauche : la une -----
  const stTitre = { fontFamily: TITRE, fontWeight: 700, fontSize: 8.4, fill: ENCRE }
  const titreUne = couper(t(une.titre).toUpperCase(), '700 8.4px Oswald', 74)
  const yCorps = 47 + titreUne.length * 9 + 4
  const corpsUne = couper(sansHtml(t(une.resume)), "5.2px 'IM Fell English'", 74).slice(0, Math.max(0, Math.floor((SURFACES.pageGauche.h - 6 - yCorps) / 6.2)))

  // ----- Page de droite : brèves tech + mot -----
  const { blocs: blocsTech, yFin: yMotPage } = mettreEnPageTech(tech.map((b) => ({ titre: t(b.titre), resume: sansHtml(t(b.resume)) })))

  // ----- Affiches -----
  const motTerme = jour.mot ? couper(jour.mot.terme, "16px 'IM Fell English'", 60) : []
  const yDefMot = 40 + motTerme.length * 17 + 6
  const motDef = jour.mot ? couper(t(jour.mot.definition), "italic 7.4px 'IM Fell English'", 58).slice(0, 12) : []
  const texteBandeauDroit = jour.chiffre ? c.leChiffre : c.enBref
  const chiffreTaille = jour.chiffre ? tailleAjustee(jour.chiffre.valeur, "700 {taille}px Oswald", 30, 56) : 30
  const chiffreTexte = jour.chiffre ? couper(t(jour.chiffre.texte), "7.4px 'IM Fell English'", 60).slice(0, 12) : []
  const titresDroite = empiler(jour.breves.map((b) => couper(t(b.titre), '500 8.2px Oswald', 56).slice(0, 5)), 32, 10, 16)

  // ----- Coupure de presse : contenus -----
  const lienJour = { to: `/breves/${jour.date}`, texte: c.lireDuJour, principal: true }
  const coupures = {
    une: { rubrique: c.alaUne, date: dateLongue(jour.date), titre: t(une.titre), texte: sansHtml(t(une.resume)), liens: [lienJour] },
    mot: jour.mot && { rubrique: c.motDuJour, date: dateLongue(jour.date), titre: jour.mot.terme, texte: t(jour.mot.definition), liens: [lienJour] },
    droite: jour.chiffre
      ? { rubrique: c.chiffreDuJour, date: dateLongue(jour.date), titre: jour.chiffre.valeur, texte: t(jour.chiffre.texte), liens: [lienJour] }
      : { rubrique: c.aujourdhui, date: dateLongue(jour.date), titre: c.brevesAuSommaire(jour.breves.length), puces: jour.breves.map((b) => t(b.titre)), liens: [lienJour] },
    toutes: {
      rubrique: c.toutesEditions,
      date: c.numeros(jours.length),
      titre: c.ouvert,
      texte: c.accroche,
      liens: [
        ...jours.map((j, i) => ({ to: `/breves/${j.date}`, texte: dateLongue(j.date), principal: i === 0 })),
        { href: '/breves/rss.xml', texte: c.rss },
        { to: '/suivre', texte: c.suivre },
      ],
    },
  }
  anciennes.forEach((ed) => {
    const ia = ed.breves.find((b) => b.rubrique === 'ia') ?? ed.breves[0]
    coupures[ed.date] = {
      rubrique: c.ancienNumero,
      date: dateLongue(ed.date),
      titre: t(ia.titre),
      puces: ed.breves.filter((b) => b !== ia).map((b) => t(b.titre)),
      liens: [{ to: `/breves/${ed.date}`, texte: c.lireNumero, principal: true }],
    }
  })
  const coupure = (actif && coupures[actif]) || coupures.toutes

  const zone = (cle) => ({
    onMouseEnter: () => setActif(cle),
    onFocus: () => setActif(cle),
    className: `kiosque-zone${actif === cle ? ' actif' : ''}`,
  })

  return (
    <div style={{ background: '#171a2a', minHeight: 'calc(100vh - 320px)', marginBottom: -60, paddingBottom: 48 }}>
      <style>{`
        .kiosque-zone { cursor: pointer; outline: none; }
        .kiosque-zone .kiosque-contour { opacity: 0; transition: opacity .15s; }
        .kiosque-zone:hover .kiosque-contour, .kiosque-zone:focus-visible .kiosque-contour, .kiosque-zone.actif .kiosque-contour { opacity: 1; }
        .kiosque-pile { transition: transform .15s; }
        .kiosque-pile:hover, .kiosque-pile:focus-visible, .kiosque-pile.actif { transform: translateY(-5px); }
        @media (prefers-reduced-motion: reduce) { .kiosque-pile, .kiosque-zone .kiosque-contour { transition: none; } }
      `}</style>

      <div style={{ maxWidth: LARGEUR, margin: '0 auto' }}>
        <svg viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`} role="img" aria-label={c.description} style={{ display: 'block', width: '100%', height: 'auto' }}>
          <defs>
            {/* Encre qui a un peu bavé sur le papier */}
            <filter id="kiosque-impression" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" />
              <feDisplacementMap in="SourceGraphic" scale="0.7" />
            </filter>
            {/* Craie : le trait est troué par endroits */}
            <filter id="kiosque-craie" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="bruit" />
              <feColorMatrix in="bruit" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.6 1.4" result="trous" />
              <feComposite in="SourceGraphic" in2="trous" operator="in" />
            </filter>
            <linearGradient id="kiosque-dorure" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f6dc8c" />
              <stop offset=".55" stopColor="#d9a94a" />
              <stop offset="1" stopColor="#a8762a" />
            </linearGradient>
          </defs>

          <image href={IMAGE} width={LARGEUR} height={HAUTEUR} />

          {/* Fronton : le titre peint */}
          <text x="689" y="270" textAnchor="middle" fontFamily={GOTHIQUE} fontSize="40" fill="url(#kiosque-dorure)" stroke="#0e1f17" strokeWidth="1.2" paintOrder="stroke" wordSpacing="-12">
            La Gazette du Lab
          </text>

          {/* Petits bandeaux au-dessus des affiches, peints sur les pans en biais */}
          <g fontFamily={TITRE} fontWeight="700" fill="url(#kiosque-dorure)">
            <T s={SURFACES.bandeauGauche} x={SURFACES.bandeauGauche.l / 2} y={21} textAnchor="middle" {...styleBandeau(c.leMot, SURFACES.bandeauGauche.l)}>{c.leMot}</T>
            <T s={SURFACES.bandeauDroit} x={SURFACES.bandeauDroit.l / 2} y={22} textAnchor="middle" {...styleBandeau(texteBandeauDroit, SURFACES.bandeauDroit.l)}>{texteBandeauDroit}</T>
          </g>

          {/* Le journal du jour, suspendu : chaque ligne suit sa page */}
          <Link to={`/breves/${jour.date}`} {...zone('une')} aria-label={`${c.alaUne} — ${t(une.titre)}`}>
            <g filter="url(#kiosque-impression)" style={{ mixBlendMode: 'multiply' }}>
              {/* Page de gauche : en-tête et une IA */}
              <T s={SURFACES.pageGauche} x={47} y={14} textAnchor="middle" fontFamily={GOTHIQUE} fontSize="11.5" fill={ENCRE} wordSpacing="-4">La Gazette du Lab</T>
              <Filet s={SURFACES.pageGauche} y={19} x0={9} x1={85} stroke={ENCRE} strokeWidth=".7" />
              <Filet s={SURFACES.pageGauche} y={21.5} x0={9} x1={85} stroke={ENCRE} strokeWidth=".7" />
              <T s={SURFACES.pageGauche} x={47} y={28} textAnchor="middle" fontFamily={TITRE} fontSize="4.6" letterSpacing=".6" fill={ENCRE}>{dateLongue(jour.date).toUpperCase()}</T>
              <Filet s={SURFACES.pageGauche} y={31} x0={9} x1={85} stroke={ENCRE} strokeWidth=".7" />
              <T s={SURFACES.pageGauche} x={9} y={39} fontFamily={TITRE} fontWeight="700" fontSize="4.6" letterSpacing=".8" fill={ROUGE}>{c.alaUne}</T>
              <Lignes s={SURFACES.pageGauche} lignes={titreUne} x={9} y={48} pas={9} {...stTitre} />
              <Lignes s={SURFACES.pageGauche} lignes={corpsUne} x={9} y={yCorps + 1} pas={6.2} fontFamily={CORPS} fontSize={5.2} fill={ENCRE_CORPS} />

              {/* Page de droite : brèves tech et mot du jour */}
              {tech.length > 0 && (
                <>
                  <T s={SURFACES.pageDroite} x={7} y={13} fontFamily={TITRE} fontWeight="700" fontSize="6" letterSpacing="1.2" fill={ROUGE}>{c.tech}</T>
                  <Filet s={SURFACES.pageDroite} y={17} x0={7} x1={83} stroke={ENCRE} strokeWidth=".7" />
                </>
              )}
              {blocsTech.map((b, i) => (
                <g key={i}>
                  <Lignes s={SURFACES.pageDroite} lignes={b.titre} x={7} y={b.yTitre} pas={7} fontFamily={TITRE} fontWeight={500} fontSize={6} fill={ENCRE} />
                  <Lignes s={SURFACES.pageDroite} lignes={b.resume} x={7} y={b.yResume} pas={6} fontFamily={CORPS} fontSize={5} fill={ENCRE_CORPS} />
                </g>
              ))}
              {jour.mot && yMotPage < SURFACES.pageDroite.h - 14 && (
                <>
                  <Filet s={SURFACES.pageDroite} y={yMotPage} x0={7} x1={83} stroke={ENCRE} strokeWidth=".7" />
                  <T s={SURFACES.pageDroite} x={7} y={yMotPage + 9} fontFamily={CORPS} fontStyle="italic" fontSize="6" fill={ENCRE}>
                    {c.leMotPrefixe}{jour.mot.terme}
                  </T>
                </>
              )}
            </g>
            <path d={`${cheminSurface(SURFACES.pageGauche, 0)} ${cheminSurface(SURFACES.pageDroite, 0)}`} fill="transparent" />
            <Contour d={`${cheminSurface(SURFACES.pageGauche)} ${cheminSurface(SURFACES.pageDroite)}`} />
          </Link>

          {/* Affiche de gauche : le mot du jour */}
          <Link to={`/breves/${jour.date}`} {...zone('mot')} aria-label={c.motDuJour}>
            {jour.mot && (
              <g filter="url(#kiosque-impression)" style={{ mixBlendMode: 'multiply' }}>
                <T s={SURFACES.afficheGauche} x={35} y={14} textAnchor="middle" fontFamily={TITRE} fontWeight="700" fontSize="6.4" letterSpacing="1.2" fill={ROUGE}>{c.motDuJour}</T>
                <Lignes s={SURFACES.afficheGauche} lignes={motTerme} x={35} y={40} pas={17} textAnchor="middle" fontFamily={CORPS} fontSize={16} fill={ENCRE} />
                <Filet s={SURFACES.afficheGauche} y={yDefMot - 8} x0={15} x1={55} stroke={ENCRE} strokeWidth="1" />
                <Lignes s={SURFACES.afficheGauche} lignes={motDef} x={35} y={yDefMot + 6} pas={9.5} textAnchor="middle" fontFamily={CORPS} fontStyle="italic" fontSize={7.4} fill={ENCRE_CORPS} />
              </g>
            )}
            <path d={cheminSurface(SURFACES.afficheGauche, 0)} fill="transparent" />
            <Contour d={cheminSurface(SURFACES.afficheGauche, 6)} />
          </Link>

          {/* Affiche de droite : le chiffre du jour, sinon les titres du jour */}
          <Link to={`/breves/${jour.date}`} {...zone('droite')} aria-label={jour.chiffre ? c.chiffreDuJour : c.aujourdhui}>
            <g filter="url(#kiosque-impression)" style={{ mixBlendMode: 'multiply' }}>
              {jour.chiffre ? (
                <>
                  <T s={SURFACES.afficheDroite} x={35} y={14} textAnchor="middle" fontFamily={TITRE} fontWeight="700" fontSize="6.4" letterSpacing="1.2" fill={ROUGE}>{c.chiffreDuJour}</T>
                  <T s={SURFACES.afficheDroite} x={35} y={74} textAnchor="middle" fontFamily={TITRE} fontWeight="700" fontSize={chiffreTaille} fill={ROUGE}>{jour.chiffre.valeur}</T>
                  <Lignes s={SURFACES.afficheDroite} lignes={chiffreTexte} x={35} y={98} pas={9.5} textAnchor="middle" fontFamily={CORPS} fontSize={7.4} fill={ENCRE_CORPS} />
                </>
              ) : (
                <>
                  <T s={SURFACES.afficheDroite} x={35} y={14} textAnchor="middle" fontFamily={TITRE} fontWeight="700" fontSize="6.4" letterSpacing="1.2" fill={ROUGE}>{c.aujourdhui}</T>
                  {titresDroite.map((b, i) => (
                    <g key={i}>
                      {i > 0 && <Filet s={SURFACES.afficheDroite} y={b.y - 9} x0={11} x1={59} stroke={ENCRE} strokeWidth=".8" />}
                      <Lignes s={SURFACES.afficheDroite} lignes={b.lignes} x={35} y={b.y} pas={10} textAnchor="middle" fontFamily={TITRE} fontWeight={500} fontSize={8.2} fill={ENCRE} />
                    </g>
                  ))}
                </>
              )}
            </g>
            <path d={cheminSurface(SURFACES.afficheDroite, 0)} fill="transparent" />
            <Contour d={cheminSurface(SURFACES.afficheDroite, 6)} />
          </Link>

          {/* Piles : les numéros précédents, du plus ancien au plus récent */}
          {anciennes.map((ed, i) => {
            const p = PILES[i]
            const ex = p.x + p.l / 2
            const angle = ANGLES_ETIQUETTES[i]
            return (
              <Link
                key={ed.date}
                to={`/breves/${ed.date}`}
                {...zone(ed.date)}
                className={`kiosque-zone kiosque-pile${actif === ed.date ? ' actif' : ''}`}
                aria-label={`${c.ancienNumero} — ${dateLongue(ed.date)}`}
              >
                <rect x={p.x} y={p.haut} width={p.l} height={66} fill="transparent" />
                {/* Étiquette de date accrochée au bord de l'étal */}
                <g transform={`rotate(${angle} ${ex} 573)`}>
                  <rect x={ex - 24} y={566} width={48} height={15} fill={PAPIER} stroke={ENCRE} strokeWidth={1.5} />
                  <text x={ex} y={577} textAnchor="middle" fontFamily={TITRE} fontWeight={500} fontSize={8.5} fill={ENCRE}>{dateCourte(ed.date)}</text>
                </g>
                <Contour d={`M${p.x - 4} ${p.haut - 6} H${p.x + p.l + 4} V${p.haut + 86} H${p.x - 4} Z`} />
              </Link>
            )
          })}

          {/* Ardoise : la date à la craie, inclinée comme le chevalet */}
          <g {...zone('toutes')} tabIndex={0} role="button" aria-label={c.toutesEditions}>
            <g filter="url(#kiosque-craie)" fontFamily={CRAIE} fontWeight="600" fill="#f2f2ea">
              <T s={SURFACES.ardoise} x={37.5} y={27} textAnchor="middle" fontSize="17">{jourSemaine}</T>
              <T s={SURFACES.ardoise} x={37.5} y={50} textAnchor="middle" fontSize="20">{jourMois}</T>
              <path transform={ligne(SURFACES.ardoise, 60)} d="M12 60 Q37.5 56 63 60" stroke="#f2f2ea" strokeWidth="1.5" fill="none" />
              <T s={SURFACES.ardoise} x={37.5} y={78} textAnchor="middle" fontSize="11">{c.craie[0]}</T>
              <T s={SURFACES.ardoise} x={37.5} y={91} textAnchor="middle" fontSize="11">{c.craie[1]}</T>
            </g>
            <path d={cheminSurface(SURFACES.ardoise, 0)} fill="transparent" />
            <Contour d={cheminSurface(SURFACES.ardoise, 5)} />
          </g>
        </svg>
      </div>

      {/* Coupure de presse sous la scène */}
      <div
        style={{
          width: 'calc(100% - 32px)',
          maxWidth: 820,
          margin: '28px auto 0',
          background: PAPIER,
          color: ENCRE,
          border: `3px solid ${ENCRE}`,
          boxShadow: '7px 7px 0 rgba(0,0,0,.55)',
          padding: '16px 22px 20px',
        }}
      >
        <div
          style={{
            fontFamily: TITRE,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.14em',
            color: ROUGE,
            borderBottom: `2px solid ${ENCRE}`,
            paddingBottom: 6,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span>{coupure.rubrique}</span>
          <span>{coupure.date}</span>
        </div>
        <h1 style={{ fontFamily: CORPS, fontSize: 26, fontWeight: 400, lineHeight: 1.15, margin: '10px 0 0' }}>{coupure.titre}</h1>
        {coupure.texte && <p style={{ fontFamily: CORPS, fontSize: 17, lineHeight: 1.4, margin: '8px 0 0' }}>{coupure.texte}</p>}
        {coupure.puces && (
          <ul style={{ fontFamily: CORPS, fontSize: 17, lineHeight: 1.4, margin: '8px 0 0', paddingLeft: 20 }}>
            {coupure.puces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
          {coupure.liens.map((l) => {
            const style = {
              fontFamily: TITRE,
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              color: l.principal ? '#fff' : ENCRE,
              background: l.principal ? ROUGE : '#fff',
              border: `2px solid ${ENCRE}`,
              boxShadow: `3px 3px 0 ${ENCRE}`,
              padding: '6px 12px',
            }
            return l.href ? (
              <a key={l.href} href={l.href} style={style}>{l.texte}</a>
            ) : (
              <Link key={l.to} to={l.to} style={style}>{l.texte}</Link>
            )
          })}
        </div>
      </div>

      <p style={{ fontFamily: CORPS, fontStyle: 'italic', textAlign: 'center', fontSize: 15, color: PAPIER, opacity: 0.6, margin: '22px 16px 0' }}>{c.aide}</p>
    </div>
  )
}
