import { Suspense } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import Page404 from '../shell/Page404'
import { getJeu, listeJeux } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'
import { BarreJeu, FondChambre, TeleCathodique } from './ArcadeParts'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export default function JeuPage() {
  const { slug } = useParams()
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const jeu = getJeu(slug)

  if (!jeu) return <Page404 />

  const dateParam = searchParams.get('date')
  // `?date=` uniquement en dev (D3) : permet de vérifier les 4 défis sur 4
  // jours consécutifs sans attendre.
  const date = import.meta.env.DEV && dateParam && DATE_RE.test(dateParam) ? dateParam : dateLocaleAujourdhui()

  // Numéro de chaîne de la télé : la place de la cartouche sur l'étagère
  const chaine = listeJeux().findIndex((j) => j.slug === jeu.slug) + 1

  return (
    <FondChambre>
    <div style={{ padding: 'var(--space-lg) clamp(8px, 3vw, 24px) 64px', maxWidth: 820, margin: '0 auto' }}>
      <style>{`
        @keyframes arcade-clignote { 50% { opacity: 0; } }
        .arcade-blink { animation: arcade-clignote 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .arcade-blink { animation: none; }
        }
      `}</style>

      <BarreJeu jeu={jeu} lang={lang} />

      {jeu.demo && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: '#e9d9b8',
            border: 'var(--border-thin) solid rgba(233,217,184,.4)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-xs) var(--space-sm)',
            marginBottom: 'var(--space-md)',
          }}
        >
          {jt(lang, 'demoBandeau')}
        </div>
      )}

      <TeleCathodique chaine={chaine}>
        <Suspense fallback={null}>
          <jeu.Composant key={date} jeu={jeu} date={date} />
        </Suspense>
      </TeleCathodique>
    </div>
    </FondChambre>
  )
}
