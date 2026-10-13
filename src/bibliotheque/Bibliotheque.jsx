import { useEffect } from 'react'
import { useLanguage } from '../shell/LanguageContext'
import Etagere from '../numero/Etagere.jsx'
import './bibliotheque.css'

// Page d'accueil : la bibliothèque du Lab. On choisit un livre sur l'étagère
// (le magazine, la Gazette, le portfolio…), il s'ouvre sur sa propre table de
// lecture, d'où l'on revient ici. Les volumes : numero/volumes.js.
export default function Bibliotheque() {
  const { lang, toggle: basculerLangue } = useLanguage()

  useEffect(() => {
    document.title = lang === 'fr' ? 'Misran Labs — la bibliothèque' : 'Misran Labs — the library'
  }, [lang])

  return (
    <div className="bibli">
      <header className="bibli-bandeau">
        <span className="bibli-marque">Misran Labs</span>
        <span className="bibli-aide">{lang === 'fr' ? 'Choisissez un livre sur l’étagère' : 'Pick a book from the shelf'}</span>
        <button type="button" onClick={basculerLangue} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>
      <main className="bibli-meuble">
        <Etagere cote="plein" />
      </main>
    </div>
  )
}
