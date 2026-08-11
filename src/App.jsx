import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import HomeModule from './modules/HomeModule'
import ProjectPage from './lab/ProjectPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<HomeModule />} />
        <Route path="lab/:slug" element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}
