import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import App from './App.jsx'

// Éditeur de tokens : en dev seulement (/?tokens ou Ctrl+Alt+T) ; absent du build de production
const EditeurTokens = import.meta.env.DEV ? lazy(() => import('./editeur/EditeurTokens.jsx')) : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {EditeurTokens && <Suspense fallback={null}><EditeurTokens /></Suspense>}
  </StrictMode>,
)
