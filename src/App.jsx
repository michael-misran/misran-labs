import { useState } from 'react'
import Shell from './shell/Shell'

export default function App() {
  const [activeModule, setActiveModule] = useState('home')
  const [moduleHistory, setModuleHistory] = useState([])

  function navigateTo(id) {
    setModuleHistory(prev => [activeModule, ...prev].slice(0, 3))
    setActiveModule(id)
  }

  return <Shell activeModule={activeModule} navigateTo={navigateTo} moduleHistory={moduleHistory} />
}
