import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import HomeModule from './modules/HomeModule'
import ProjectPage from './lab/ProjectPage'
import ProjectDemoPage from './lab/ProjectDemoPage'
import { LanguageProvider } from './shell/LanguageContext'
import { KitProvider } from './shell/KitContext'

export default function App() {
  return (
    <LanguageProvider>
      <KitProvider>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<HomeModule />} />
            <Route path="lab/:slug" element={<ProjectPage />} />
            <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          </Route>
        </Routes>
      </KitProvider>
    </LanguageProvider>
  )
}
