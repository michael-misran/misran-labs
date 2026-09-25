import { createContext, useContext, useEffect, useState } from 'react'
import { KITS, DEFAULT_KIT, getKit } from '../kits/registry'

// Kit UI actif. Écrit data-kit sur <html> — toute la cascade des tokens en
// découle — et persiste le choix. Les polices du kit sont injectées à la
// demande : on ne télécharge pas les fontes d'un kit qu'on n'affiche pas.

const KitContext = createContext(null)
const FONT_LINK_ID = 'kit-fonts'

function getInitial() {
  try {
    const saved = localStorage.getItem('kit')
    if (saved && KITS.some((k) => k.id === saved)) return saved
  } catch {
    // localStorage indisponible (navigation privée, stockage bloqué) :
    // on retombe simplement sur le kit par défaut.
  }
  return DEFAULT_KIT
}

export function KitProvider({ children }) {
  const [kitId, setKitId] = useState(getInitial)

  useEffect(() => {
    const kit = getKit(kitId)
    document.documentElement.setAttribute('data-kit', kit.id)

    if (kit.fonts) {
      let link = document.getElementById(FONT_LINK_ID)
      if (!link) {
        link = document.createElement('link')
        link.id = FONT_LINK_ID
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
      if (link.href !== kit.fonts) link.href = kit.fonts
    }

    try {
      localStorage.setItem('kit', kit.id)
    } catch {
      // Choix non persisté, mais le kit s'applique quand même.
    }
  }, [kitId])

  const kit = getKit(kitId)
  const next = () => {
    const i = KITS.findIndex((k) => k.id === kitId)
    setKitId(KITS[(i + 1) % KITS.length].id)
  }

  return (
    <KitContext.Provider value={{ kit, kitId, setKitId, kits: KITS, next }}>
      {children}
    </KitContext.Provider>
  )
}

export function useKit() {
  const ctx = useContext(KitContext)
  if (!ctx) throw new Error('useKit must be used within a KitProvider')
  return ctx
}
