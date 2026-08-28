import { createContext, useContext, useEffect } from 'react'

// Lets a page register a secondary nav (section links for that page) which
// Shell renders as its own column, flush against the main Sidebar — not
// floating inside the page's own padded content.
export const SecondarySidebarContext = createContext(null)

export function useSecondarySidebar(items, active, onChange) {
  const setNav = useContext(SecondarySidebarContext)

  useEffect(() => {
    if (!setNav) return
    setNav({ items, active, onChange })
    return () => setNav(null)
  }, [setNav, items, active, onChange])
}
