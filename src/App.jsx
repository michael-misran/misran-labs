import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './shell/Shell'
import BureauLab from './lab/BureauLab'
import { LanguageProvider } from './shell/LanguageProvider'

const KiosqueHome = lazy(() => import('./kiosque/KiosqueHome'))
const ProjectPage = lazy(() => import('./lab/ProjectPage'))
const ProjectDemoPage = lazy(() => import('./lab/ProjectDemoPage'))
const BrevesHome = lazy(() => import('./breves/BrevesHome'))
const BrevesJour = lazy(() => import('./breves/BrevesJour'))
const ProjetsHome = lazy(() => import('./projets/ProjetsHome'))
const ProjetIdee = lazy(() => import('./projets/ProjetIdee'))
const ProjetsFonctionnement = lazy(() => import('./projets/ProjetsFonctionnement'))
const SuivrePage = lazy(() => import('./suivre/SuivrePage'))
const EditoPage = lazy(() => import('./edito/EditoPage'))
const JeuxHome = lazy(() => import('./jeux/JeuxHome'))
const JeuPage = lazy(() => import('./jeux/JeuPage'))
const ZineHome = lazy(() => import('./zine/ZineHome'))
const ZineNumero = lazy(() => import('./zine/ZineNumero'))
const Page404 = lazy(() => import('./shell/Page404'))

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Shell />}>
          {/* L'édito est la page d'accueil ; l'ancienne vitrine passe sur /kiosque */}
          <Route index element={<EditoPage />} />
          <Route path="kiosque" element={<KiosqueHome />} />
          <Route path="lab" element={<BureauLab />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          <Route path="breves" element={<BrevesHome />} />
          <Route path="breves/:date" element={<BrevesJour />} />
          <Route path="projets" element={<ProjetsHome />} />
          <Route path="projets/fonctionnement" element={<ProjetsFonctionnement />} />
          <Route path="projets/:id" element={<ProjetIdee />} />
          <Route path="suivre" element={<SuivrePage />} />
          <Route path="edito" element={<Navigate to="/" replace />} />
          <Route path="jeux" element={<JeuxHome />} />
          <Route path="jeux/:slug" element={<JeuPage />} />
          <Route path="zine" element={<ZineHome />} />
          <Route path="zine/:numero" element={<ZineNumero />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
