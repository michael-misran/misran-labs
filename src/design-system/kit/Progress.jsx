// Indicateurs de progression du kit.
//   - ProgressBar : progression connue, piste en creux, valeur annoncée.
//   - Spinner : durée inconnue, douze branches, respecte prefers-reduced-motion
//     via la règle globale de tokens.css.
//   - Skeleton : structure attendue pendant le chargement, jamais un spinner
//     plein écran quand la forme du contenu est déjà connue.

export function ProgressBar({ value = 0, label, showValue = true }) {
  const pct = Math.max(0, Math.min(100, value))

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text2)', marginBottom: 8 }}>
          <span>{label}</span>
          {showValue && <span style={{ fontWeight: 600 }}>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        style={{
          height: 10,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-inset)',
          boxShadow: 'var(--elev-inset)',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 'var(--radius-pill)', transition: 'width 0.3s ease' }} />
      </div>
    </div>
  )
}

export function Spinner({ size = 34, label = 'Chargement' }) {
  const branches = Array.from({ length: 12 }, (_, i) => i)

  return (
    <span
      role="status"
      aria-label={label}
      style={{ position: 'relative', display: 'inline-block', width: size, height: size, animation: 'kit-spin 1s steps(12) infinite' }}
    >
      {branches.map((i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 2,
            height: size * 0.26,
            marginLeft: -1,
            borderRadius: 'var(--radius-pill)',
            background: 'var(--primary)',
            opacity: 0.15 + (i / 12) * 0.85,
            transformOrigin: `center ${size / 2}px`,
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}
    </span>
  )
}

export function Skeleton({ rows = 3, label = 'Contenu en cours de chargement' }) {
  const widths = ['100%', '92%', '64%', '80%', '48%']

  return (
    <div aria-busy="true" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            height: 10,
            width: widths[i % widths.length],
            borderRadius: 'var(--radius-pill)',
            background: 'var(--surface-pressed)',
            animation: 'kit-pulse 1.6s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}
