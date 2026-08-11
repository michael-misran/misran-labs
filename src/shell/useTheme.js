import { useEffect, useState } from 'react'

function getSaved() {
  const saved = localStorage.getItem('theme')
  return saved === 'light' || saved === 'dark' ? saved : null
}

function systemPrefersLight() {
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

export default function useTheme() {
  const [override, setOverride] = useState(getSaved)

  useEffect(() => {
    if (override) {
      document.documentElement.setAttribute('data-theme', override)
      localStorage.setItem('theme', override)
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('theme')
    }
  }, [override])

  const isLight = override ? override === 'light' : systemPrefersLight()

  const toggle = () => setOverride(isLight ? 'dark' : 'light')

  return { isLight, toggle }
}
