import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import ArchiveHome from './modules/ArchiveHome'
import ProjectPage from './lab/ProjectPage'
import ProjectDemoPage from './lab/ProjectDemoPage'
import MagazineHome from './magazine/MagazineHome'
import MagazineIssue from './magazine/MagazineIssue'
import ProjetsHome from './projets/ProjetsHome'
import ProjetIdee from './projets/ProjetIdee'
import ProjetsFonctionnement from './projets/ProjetsFonctionnement'
import { LanguageProvider } from './shell/LanguageContext'

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
