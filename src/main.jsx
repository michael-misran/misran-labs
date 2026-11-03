import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import App from './App.jsx'

// Éditeur de tokens (idée P-020) : ajouter ?tokens à n'importe quelle adresse.
// Sans ce paramètre, son fichier n'est jamais téléchargé (import dynamique) :
// le site normal ne s'alourdit pas et rien ne change à l'écran.
const avecTokens = new URLSearchParams(window.location.search).has('tokens')
const EditeurTokens = avecTokens ? lazy(() => import('./editeur/EditeurTokens.jsx')) : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {EditeurTokens && <Suspense fallback={null}><EditeurTokens /></Suspense>}
  </StrictMode>,
)
