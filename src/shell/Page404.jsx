import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkButton } from '../design-system/kit'
import Fiole from './mascotte/Fiole'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

// Page 404 générique (D6) : toute URL qui ne correspond à aucune route
// (`path="*"` dans App.jsx) ou à un projet du Lab inconnu (ProjectPage.jsx,
// ProjectDemoPage.jsx). Pas de <head> figé côté build (Vercel réécrit tout
// vers index.html) : le `noindex` est posé et retiré à la volée ici (D9).
export default function Page404() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    meta.setAttribute('content', 'noindex')
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [])

  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          justifyContent: 'center',
          width: 200,
          borderBottom: 'var(--border-regular) solid var(--border)',
          paddingBottom: 16,
          marginBottom: 28,
        }}
      >
        <span className="fiole-shadow" aria-hidden="true" />
        <Fiole scale={8} variant="toxique" sleeps={false} />
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          marginBottom: 16,
        }}
      >
        {t(lang, 'notFound404Eyebrow')}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.4vw, 34px)',
          margin: '0 0 12px',
        }}
      >
        {t(lang, 'notFound404Title')}
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: 'var(--text2)',
          margin: '0 0 20px',
          maxWidth: 480,
        }}
      >
        {t(lang, 'notFound404Body')}
      </p>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: 'var(--muted)',
          overflowWrap: 'anywhere',
          marginBottom: 28,
        }}
      >
        {pathname}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <LinkButton to="/">{t(lang, 'notFound404BackLab')}</LinkButton>
        <LinkButton to="/magazine" variant="ghost">{t(lang, 'notFound404Magazine')}</LinkButton>
        <LinkButton to="/breves" variant="ghost">{t(lang, 'notFound404Breves')}</LinkButton>
      </div>
    </div>
  )
}
