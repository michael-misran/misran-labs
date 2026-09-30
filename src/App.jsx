import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import ArchiveHome from './modules/ArchiveHome'
import { LanguageProvider } from './shell/LanguageProvider'

const ProjectPage = lazy(() => import('./lab/ProjectPage'))
const ProjectDemoPage = lazy(() => import('./lab/ProjectDemoPage'))
const MagazineHome = lazy(() => import('./magazine/MagazineHome'))
const MagazineIssue = lazy(() => import('./magazine/MagazineIssue'))
const ProjetsHome = lazy(() => import('./projets/ProjetsHome'))
const ProjetIdee = lazy(() => import('./projets/ProjetIdee'))
const ProjetsFonctionnement = lazy(() => import('./projets/ProjetsFonctionnement'))

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<ArchiveHome />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          <Route path="magazine" element={<MagazineHome />} />
          <Route path="magazine/:date" element={<MagazineIssue />} />
          <Route path="projets" element={<ProjetsHome />} />
          <Route path="projets/fonctionnement" element={<ProjetsFonctionnement />} />
          <Route path="projets/:id" element={<ProjetIdee />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
