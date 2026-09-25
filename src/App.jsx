import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import ArchiveHome from './modules/ArchiveHome'
import ProjectPage from './lab/ProjectPage'
import ProjectDemoPage from './lab/ProjectDemoPage'
import { LanguageProvider } from './shell/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<ArchiveHome />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
