import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import DesignSystemPage from './pages/DesignSystemPage'
import JournalPage from './pages/JournalPage'
import ProcessPage from './pages/ProcessPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lab" element={<LabPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
