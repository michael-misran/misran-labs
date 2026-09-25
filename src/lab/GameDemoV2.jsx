import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'

const CONTENT = {
  fr: {
    title: 'The Lost Cauldron — V0.2',
    note: "Marcus remplace le sprite placeholder, les 3 ennemis du secteur Religion sont animés (plus des cercles), premier décor de niveau (rues de la ville haute de Provins, placeholders de tuiles/maisons), manette supportée. Déplacement WASD/flèches ou stick gauche, combat automatique. Chargement ~38 Mo.",
    back: '← Retour au projet',
  },
  en: {
    title: 'The Lost Cauldron — V0.2',
    note: 'Marcus replaces the placeholder sprite, all 3 Religion sector enemies are animated (no more circles), first level decor pass (Provins upper-town streets, placeholder tiles/houses), gamepad supported. WASD/arrow keys or left stick to move, combat is automatic. ~38MB load.',
    back: '← Back to project',
  },
}

export default function GameDemoV2() {
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
          borderBottom: 'var(--border-thin) solid var(--border)',
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
        src="/games/lost-cauldron-game-v0.2/index.html"
        title={c.title}
        style={{ flex: 1, width: '100%', border: 'none', background: '#000' }}
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
