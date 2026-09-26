// Rendu serveur de l'app complète sur / et /lab/lab-tokens (FR), sans port.
import { createServer } from 'vite'
const errors = []
console.error = (...a) => errors.push(a.map(String).join(' ').slice(0, 300))
console.warn = (...a) => errors.push('warn: ' + a.map(String).join(' ').slice(0, 300))
globalThis.localStorage = { getItem: () => 'fr', setItem() {}, removeItem() {} }
const vite = await createServer({ root: process.cwd(), server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
const React = (await import('react')).default
const { renderToString } = await import('react-dom/server')
const { MemoryRouter } = await import('react-router')
const App = (await vite.ssrLoadModule('/src/App.jsx')).default
for (const url of ['/', '/lab/lab-tokens']) {
  try {
    const html = renderToString(React.createElement(MemoryRouter, { initialEntries: [url] }, React.createElement(App)))
    process.stdout.write(`${url}: ${html.length} caractères rendus, ⚠ ${(html.match(/⚠/g) || []).length}\n`)
  } catch (e) { process.stdout.write(`${url}: ÉCHEC ${e.message}\n`) }
}
await vite.close()
process.stdout.write('console.error/warn : ' + (errors.length ? JSON.stringify(errors, null, 1) : 'aucune') + '\n')
