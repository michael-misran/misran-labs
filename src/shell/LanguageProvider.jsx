import { useEffect, useState } from 'react'
import { LanguageContext } from './LanguageContext'

function getSaved() {
  const saved = localStorage.getItem('lang')
  return saved === 'fr' || saved === 'en' ? saved : null
}

function getInitial() {
  const saved = getSaved()
  if (saved) return saved
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitial)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggle = () => setLang(l => (l === 'fr' ? 'en' : 'fr'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}
