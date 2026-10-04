#!/usr/bin/env node
// Génère l'image de partage d'un numéro du Magazine (public/og/magazine/<date>.png)
// en rendant un gabarit HTML avec Chrome headless. Lancé à la main sur le Mac de
// Michael (la routine du lundi), jamais au build sur Vercel (pas de Chrome).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const TEMPLATE_PATH = path.join(__dirname, 'og-numero-template.html')
const NUMEROS_DIR = path.join(rootDir, 'src/magazine/numeros')
const OUTPUT_DIR = path.join(rootDir, 'public/og/magazine')

class OgNumeroError extends Error {}

function fail(message) {
  throw new OgNumeroError(message)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Valide une date AAAA-MM-JJ en rejetant les valeurs hors calendrier
// (Date normalise silencieusement un mois ou un jour hors plage : on
// recompose la date obtenue et on la compare à l'entrée).
function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const [, year, month, day] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null
  }
  return { year, month, day }
}

function formatDateFr({ year, month, day }) {
  const pad2 = (n) => String(n).padStart(2, '0')
  return `${pad2(day)}.${pad2(month)}.${year}`
}

function titleFontSize(titre) {
  if (titre.length <= 30) return 88
  if (titre.length <= 55) return 72
  return 58
}

function generateOne(dateStr) {
  const parsedDate = parseIsoDate(dateStr)
  if (!parsedDate) {
    fail(`date invalide : "${dateStr}" (attendu AAAA-MM-JJ, calendrier valide)`)
  }

  const jsonPath = path.join(NUMEROS_DIR, `${dateStr}.json`)
  if (!fs.existsSync(jsonPath)) {
    fail(`numéro introuvable : ${jsonPath}`)
  }

  let data
  try {
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  } catch (err) {
    fail(`JSON invalide : ${jsonPath} — ${err.message}`)
  }

  const numero = data.numero
  const titreFr = data.titre?.fr
  if (numero === undefined || numero === null || !data.date || !titreFr) {
    fail(`champs manquants ("numero", "date", "titre.fr") dans ${jsonPath}`)
  }

  if (!fs.existsSync(CHROME_PATH)) {
    fail(`Chrome introuvable : ${CHROME_PATH}`)
  }

  const eyebrow = `LE MAGAZINE · Nº ${numero} · ${formatDateFr(parsedDate)}`
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8')
  const html = template
    .replaceAll('{{TAILLE_TITRE}}', String(titleFontSize(titreFr)))
    .replaceAll('{{EYEBROW}}', escapeHtml(eyebrow))
    .replaceAll('{{TITRE}}', escapeHtml(titreFr))

  const tempHtmlPath = path.join(os.tmpdir(), `og-numero-${dateStr}-${Date.now()}.html`)
  fs.writeFileSync(tempHtmlPath, html)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  const outputPath = path.join(OUTPUT_DIR, `${dateStr}.png`)

  try {
    execFileSync(CHROME_PATH, [
      '--headless=new',
      `--screenshot=${outputPath}`,
      '--window-size=1200,630',
      '--virtual-time-budget=4000',
      `file://${tempHtmlPath}`,
    ], { stdio: 'pipe' })
  } catch (err) {
    fs.rmSync(tempHtmlPath, { force: true })
    fail(`Chrome a échoué pour ${dateStr} : ${err.message}`)
  }

  fs.rmSync(tempHtmlPath, { force: true })

  if (!fs.existsSync(outputPath)) {
    fail(`image non produite : ${outputPath}`)
  }

  console.log(`[og-numero] ${outputPath}`)
  return outputPath
}

function main() {
  const arg = process.argv[2]

  if (!arg) {
    fail('usage : node scripts/og-numero.js <AAAA-MM-JJ> | --all')
  }

  if (arg === '--all') {
    if (!fs.existsSync(NUMEROS_DIR)) {
      fail(`dossier introuvable : ${NUMEROS_DIR}`)
    }
    const dates = fs
      .readdirSync(NUMEROS_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .sort()

    let hadFailure = false
    for (const dateStr of dates) {
      const outputPath = path.join(OUTPUT_DIR, `${dateStr}.png`)
      if (fs.existsSync(outputPath)) {
        console.log(`[og-numero] déjà présent, ignoré : ${outputPath}`)
        continue
      }
      try {
        generateOne(dateStr)
      } catch (err) {
        console.error(`[og-numero] ${err.message}`)
        hadFailure = true
      }
    }
    if (hadFailure) process.exit(1)
    return
  }

  generateOne(arg)
}

try {
  main()
} catch (err) {
  console.error(`[og-numero] ${err.message}`)
  process.exit(1)
}
