import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import ArchiveHome from './modules/ArchiveHome'
import { LanguageProvider } from './shell/LanguageProvider'

const KiosqueHome = lazy(() => import('./kiosque/KiosqueHome'))
const ProjectPage = lazy(() => import('./lab/ProjectPage'))
const ProjectDemoPage = lazy(() => import('./lab/ProjectDemoPage'))
const MagazineHome = lazy(() => import('./magazine/MagazineHome'))
const MagazineIssue = lazy(() => import('./magazine/MagazineIssue'))
const BrevesHome = lazy(() => import('./breves/BrevesHome'))
const BrevesJour = lazy(() => import('./breves/BrevesJour'))
const ProjetsHome = lazy(() => import('./projets/ProjetsHome'))
const ProjetIdee = lazy(() => import('./projets/ProjetIdee'))
const ProjetsFonctionnement = lazy(() => import('./projets/ProjetsFonctionnement'))
const SuivrePage = lazy(() => import('./suivre/SuivrePage'))
const JeuxHome = lazy(() => import('./jeux/JeuxHome'))
const JeuPage = lazy(() => import('./jeux/JeuPage'))
const Page404 = lazy(() => import('./shell/Page404'))

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<KiosqueHome />} />
          <Route path="lab" element={<ArchiveHome />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          <Route path="magazine" element={<MagazineHome />} />
          <Route path="magazine/:date" element={<MagazineIssue />} />
          <Route path="breves" element={<BrevesHome />} />
          <Route path="breves/:date" element={<BrevesJour />} />
          <Route path="projets" element={<ProjetsHome />} />
          <Route path="projets/fonctionnement" element={<ProjetsFonctionnement />} />
          <Route path="projets/:id" element={<ProjetIdee />} />
          <Route path="suivre" element={<SuivrePage />} />
          <Route path="jeux" element={<JeuxHome />} />
          <Route path="jeux/:slug" element={<JeuPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
