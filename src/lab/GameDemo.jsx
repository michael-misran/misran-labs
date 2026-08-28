import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

const CONTENT = {
  fr: {
    title: 'The Lost Cauldron — Secteur Religion (pilote)',
    note: "Secteur pilote uniquement, ~3 min de run. Déplacement WASD/flèches, combat automatique. Le chargement peut prendre quelques secondes (moteur de jeu ~38 Mo).",
    back: '← Retour au projet',
  },
  en: {
    title: 'The Lost Cauldron — Religion sector (pilot)',
    note: 'Pilot sector only, ~3 min run. WASD/arrow keys to move, combat is automatic. Loading may take a few seconds (~38MB game engine).',
    back: '← Back to project',
  },
}

export default function GameDemo() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          padding: '12px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link
            to="/lab/lost-cauldron-game"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}
          >
            {c.back}
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            {c.title}
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--muted)', maxWidth: 480 }}>
          {c.note}
        </span>
      </div>

      <iframe
        src="/games/lost-cauldron-game/index.html"
        title={c.title}
        style={{ flex: 1, width: '100%', border: 'none', background: '#000' }}
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
