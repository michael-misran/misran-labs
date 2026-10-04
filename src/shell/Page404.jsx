import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'

// Affiche western « avis de recherche » (mission kiosque-annexes, D4). Textes
// propres à cette page (pas de clés i18n/ui.js : cette mission ne doit pas
// toucher ce fichier). Pas de <head> figé côté build (Vercel réécrit tout
// vers index.html) : le `noindex` est posé et retiré à la volée ici.
const PAGE404_TEXT = {
  fr: {
    kicker: 'Avis de recherche',
    title: 'Page disparue',
    addressLabel: 'Adresse demandée',
    lastSeenLabel: 'Dernière fois vue',
    lastSeen: 'Nulle part',
    rewardLabel: 'Récompense',
    reward: 'Un café',
    links: [
      { to: '/', label: 'Le kiosque', color: 'var(--text)' },
      { to: '/breves', label: 'La Gazette du Lab', color: 'var(--titre-gazette)' },
      { to: '/magazine', label: 'Le Magazine', color: 'var(--titre-magazine)' },
      { to: '/jeux', label: 'Les Jeux', color: 'var(--titre-jeux)' },
      { to: '/lab', label: 'Le Lab', color: 'var(--titre-lab)' },
    ],
  },
  en: {
    kicker: 'Wanted',
    title: 'Page missing',
    addressLabel: 'Address requested',
    lastSeenLabel: 'Last seen',
    lastSeen: 'Nowhere',
    rewardLabel: 'Reward',
    reward: 'One coffee',
    links: [
      { to: '/', label: 'The kiosk', color: 'var(--text)' },
      { to: '/breves', label: 'The Lab Gazette', color: 'var(--titre-gazette)' },
      { to: '/magazine', label: 'The Magazine', color: 'var(--titre-magazine)' },
      { to: '/jeux', label: 'Games', color: 'var(--titre-jeux)' },
      { to: '/lab', label: 'The Lab', color: 'var(--titre-lab)' },
    ],
  },
}

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

export default function Page404() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()
  const t = PAGE404_TEXT[lang] ?? PAGE404_TEXT.fr
  // Espace avant les deux-points en français seulement
  const sep = lang === 'fr' ? ' : ' : ': '

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    meta.setAttribute('content', 'noindex')
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [])

  return (
    <div style={{ padding: '48px var(--space-md-plus)', maxWidth: 560, margin: '0 auto' }}>
      <div
        style={{
          border: '3px double var(--border)',
          padding: '32px 24px',
          background: 'var(--bg2)',
          textAlign: 'center',
        }}
      >
        <div style={{ ...etiquette, fontSize: 12, color: 'var(--text2)', marginBottom: 'var(--space-sm)' }}>
          {t.kicker}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-bois-3)',
            fontWeight: 400,
            fontSize: 'clamp(40px, 10vw, 64px)',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: '0 0 var(--space-md)',
            color: 'var(--text)',
          }}
        >
          {t.title}
        </h1>

        <div
          style={{
            border: 'var(--border-thin) solid var(--border)',
            background: 'var(--bg)',
            padding: 'var(--space-sm) var(--space-md)',
            margin: '0 0 var(--space-md)',
          }}
        >
          <div style={{ ...etiquette, fontSize: 10, color: 'var(--text2)', marginBottom: 4 }}>
            {t.addressLabel}
          </div>
          <div style={{ fontFamily: 'var(--font-machine)', fontSize: 15, color: 'var(--text)', overflowWrap: 'anywhere' }}>
            {pathname}
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 16, color: 'var(--text)', margin: '0 0 var(--space-xs)' }}>
          {t.lastSeenLabel}{sep}{t.lastSeen}
        </p>
        <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 16, color: 'var(--text)', margin: '0 0 var(--space-lg)' }}>
          {t.rewardLabel}{sep}{t.reward}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center' }}>
          {t.links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...etiquette,
                fontSize: 11,
                color: link.color,
                border: `var(--border-thin) solid ${link.color}`,
                borderRadius: 'var(--radius-xs)',
                padding: '8px 14px',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
