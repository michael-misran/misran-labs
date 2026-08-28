import SectionTitle from '../design-system/SectionTitle'
import LabLogo from '../design-system/LabLogo'

function Grid({ children, style }) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        backgroundImage:
          'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function CommunicationPage() {
  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', marginBottom: 32, maxWidth: 640 }}>
        Captures d'écran pour X — photo de profil (400×400 recommandé) et bannière (1500×500 recommandé).
        X redimensionne à l'upload, pas besoin d'exactitude au pixel près.
      </p>

      <div style={{ marginBottom: 40 }}>
        <SectionTitle>Photo de profil</SectionTitle>
        <Grid style={{ width: 400, height: 400, borderRadius: '50%', border: '1px solid var(--border)' }}>
          <LabLogo size={140} />
        </Grid>
      </div>

      <div>
        <SectionTitle>Bannière</SectionTitle>
        <Grid style={{ width: '100%', maxWidth: 900, aspectRatio: '3 / 1', border: '1px solid var(--border)', justifyContent: 'flex-start', padding: '0 48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <LabLogo size={40} />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 44, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                M.LABS
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: 'var(--text2)',
                letterSpacing: '0.08em',
                marginTop: 10,
                marginLeft: 2,
              }}
            >
              // LABORATOIRE D'EXPÉRIMENTATION
            </div>
          </div>
        </Grid>
      </div>
    </div>
  )
}
