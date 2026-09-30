import { Suspense } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import Page404 from '../shell/Page404'
import { getJeu } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'

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

  return (
    <div style={{ padding: 'var(--space-md-plus)', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>{jeu.icone}</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, margin: 0, color: 'var(--text)' }}>{jeu.titre[lang]}</h1>
      </div>

      {jeu.demo && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--muted)',
            border: 'var(--border-thin) solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-xs) var(--space-sm)',
            marginBottom: 'var(--space-md)',
          }}
        >
          {jt(lang, 'demoBandeau')}
        </div>
      )}

      <Suspense fallback={null}>
        <jeu.Composant jeu={jeu} date={date} />
      </Suspense>
    </div>
  )
}
