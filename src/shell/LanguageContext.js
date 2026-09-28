import { createContext, useContext } from 'react'

// Contexte et hook de langue. Le composant LanguageProvider vit dans
// LanguageProvider.jsx : un fichier ne mélange pas composants et non-composants
// (rechargement à chaud de React).
export const LanguageContext = createContext(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
