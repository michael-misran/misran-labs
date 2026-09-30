import fs from 'node:fs'
import path from 'node:path'
import { SITE_URL, escapeXml } from './share-previews.js'
import { formatDateLongNoWeekday } from '../src/magazine/magazineText.js'

const MAX_ITEMS = 30

const RFC822_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const RFC822_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// pubDate RFC 822 à 07:00 heure de Paris, approximée par le mois (avril à
// octobre = été, +0200 ; sinon +0100) plutôt que par un vrai calcul de
// fuseau — suffisant pour l'ordre et l'affichage d'un flux RSS (D1 SPEC).
function rfc822PubDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const dow = new Date(y, m - 1, d).getDay()
  const offset = m >= 4 && m <= 10 ? '+0200' : '+0100'
  return `${RFC822_DAYS[dow]}, ${String(d).padStart(2, '0')} ${RFC822_MONTHS[m - 1]} ${y} 07:00:00 ${offset}`
}

function buildRssXml({ title, link, description, selfHref, items }) {
  const sorted = [...items].sort((a, b) => (a.dateIso < b.dateIso ? 1 : a.dateIso > b.dateIso ? -1 : 0)).slice(0, MAX_ITEMS)
  const itemsXml = sorted
    .map(
      (item) => `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <guid isPermaLink="true">${escapeXml(item.link)}</guid>
    <description>${escapeXml(item.description)}</description>
    <pubDate>${rfc822PubDate(item.dateIso)}</pubDate>
  </item>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(link)}</link>
  <description>${escapeXml(description)}</description>
  <language>fr</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${escapeXml(selfHref)}" rel="self" type="application/rss+xml" />
${itemsXml}
</channel>
</rss>
`
}

function magazineItems(magazinePages) {
  return magazinePages.map((page) => ({
    title: `N° ${page.raw.numero} — ${page.raw.titre.fr}`,
    link: `${SITE_URL}${page.path}`,
    description: page.raw.edito.fr,
    dateIso: page.raw.date,
  }))
}

function brevesItems(brevesPages) {
  return brevesPages.map((page) => {
    const day = page.raw
    const titres = day.breves.map((b) => b.titre.fr).join(' · ')
    let description = titres
    if (day.mot) description += ` · Le mot : ${day.mot.terme}`
    if (day.chiffre) description += ` · Le chiffre : ${day.chiffre.valeur} ${day.chiffre.texte.fr}`
    return {
      title: `Brèves du ${formatDateLongNoWeekday(day.date, 'fr')}`,
      link: `${SITE_URL}${page.path}`,
      description,
      dateIso: day.date,
    }
  })
}

function projetsItems(projetsPages) {
  return projetsPages.map((page) => ({
    title: `${page.raw.id} — ${page.raw.titre.fr}`,
    link: `${SITE_URL}${page.path}`,
    description: page.raw.resume.fr,
    dateIso: page.raw.date,
  }))
}

// Construit et écrit les 4 flux RSS 2.0 (D1 SPEC) à partir des pages déjà
// collectées par sharePreviewsPlugin (magazinePages/brevesPages/projetsPages,
// chacune avec son JSON brut dans `raw`) — aucune relecture des fichiers ici.
export function writeRssFeeds({ distDir, magazinePages, brevesPages, projetsPages }) {
  const magazine = magazineItems(magazinePages)
  const breves = brevesItems(brevesPages)
  const projets = projetsItems(projetsPages)

  const feeds = [
    {
      slug: 'magazine/rss.xml',
      title: 'Lab Magazine',
      link: `${SITE_URL}/magazine`,
      description: 'Une veille IA chaque lundi, pour designers et développeurs.',
      selfHref: `${SITE_URL}/magazine/rss.xml`,
      items: magazine,
    },
    {
      slug: 'breves/rss.xml',
      title: 'Brèves',
      link: `${SITE_URL}/breves`,
      description: "Chaque jour, quelques brèves d'actu IA et tech, avec le mot et le chiffre du jour.",
      selfHref: `${SITE_URL}/breves/rss.xml`,
      items: breves,
    },
    {
      slug: 'projets/rss.xml',
      title: 'Projets',
      link: `${SITE_URL}/projets`,
      description: 'Des idées de produits numérotées, étudiées puis gardées ou arrêtées.',
      selfHref: `${SITE_URL}/projets/rss.xml`,
      items: projets,
    },
    {
      slug: 'rss.xml',
      title: 'Misran Labs — tout',
      link: `${SITE_URL}/`,
      description: 'Tout le Lab de Michael Misran : Magazine, Brèves et Projets réunis.',
      selfHref: `${SITE_URL}/rss.xml`,
      items: [
        ...magazine.map((item) => ({ ...item, title: `Magazine · ${item.title}` })),
        ...breves.map((item) => ({ ...item, title: `Brèves · ${item.title}` })),
        ...projets.map((item) => ({ ...item, title: `Projets · ${item.title}` })),
      ],
    },
  ]

  for (const feed of feeds) {
    const filePath = path.join(distDir, feed.slug)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, buildRssXml(feed))
  }

  console.log(`[rss] ${feeds.length} flux écrits : ${feeds.map((f) => '/' + f.slug).join(', ')}`)
}
