// Rendu serveur de la page Tokens du Lab en FR et EN, sans ouvrir de port.
import { createServer } from 'vite'
const errors = []
const origError = console.error
console.error = (...a) => { errors.push(a.map(String).join(' ')); }
for (const lang of ['fr', 'en']) {
  globalThis.localStorage = { getItem: () => lang, setItem() {} }
  const vite = await createServer({ root: process.cwd(), server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
  const { renderToString } = await import('react-dom/server')
  const React = (await import('react')).default
  const { MemoryRouter } = await import('react-router')
  const { LanguageProvider } = await vite.ssrLoadModule('/src/shell/LanguageContext.jsx')
  const projects = await vite.ssrLoadModule('/src/lab/projects.js')
  const list = Object.values(projects).find(v => Array.isArray(v) && v.some(p => p?.slug === 'lab-tokens'))
  const project = list.find(p => p.slug === 'lab-tokens')
  const html = renderToString(React.createElement(MemoryRouter, { initialEntries: ['/lab/lab-tokens'] }, React.createElement(LanguageProvider, null, React.createElement(project.component, { project }))))
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'")
  const count = (text.match(/\d+ tokens (affichés|shown)/) || [])[0]
  const errs = (text.match(/\d+ erreurs? détectées?|\d+ errors? detected/) || ['aucun compteur d\'erreurs'])[0]
  const badges = (html.match(/⚠/g) || []).length
  process.stdout.write(`${lang}: ${count} | ${errs} | badges ⚠ : ${badges} | intro: ${text.includes(lang === 'fr' ? 'Trois niveaux' : 'Three tiers')}\n`)
  await vite.close()
}
console.error = origError
console.log('console.error pendant le rendu :', errors.length ? errors : 'aucune')
