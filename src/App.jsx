import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import ModuleZone from './shell/ModuleZone'
import HomeModule from './modules/HomeModule'
import PortfolioIndex from './portfolio/PortfolioIndex'
import CaseStudyPage from './portfolio/CaseStudyPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<HomeModule />} />
        <Route path="portfolio" element={<PortfolioIndex />} />
        <Route path="portfolio/:slug" element={<CaseStudyPage />} />
        <Route path="lab/:moduleId" element={<ModuleZone />} />
      </Route>
    </Routes>
  )
}
