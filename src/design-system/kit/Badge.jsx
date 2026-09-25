// Badge du kit — étiquette courte et non interactive. Trois tonalités :
// solid (accent plein), soft (accent très clair), neutral (sur la surface).
// À ne pas confondre avec Tag.jsx, qui est l'étiquette du Lab hors kit.

const TONES = {
  solid: { background: 'var(--primary)', color: 'var(--on-primary)', border: 'transparent' },
  soft: { background: 'color-mix(in srgb, var(--primary) 16%, var(--surface-raised))', color: 'var(--primary)', border: 'transparent' },
  neutral: { background: 'var(--surface-raised)', color: 'var(--text2)', border: 'var(--border)' },
}

export default function Badge({ children, tone = 'soft' }) {
  const t = TONES[tone] ?? TONES.soft

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: t.background,
        color: t.color,
        border: `var(--border-thin) solid ${t.border}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--elev-2)',
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1,
        padding: '5px 10px',
      }}
    >
      {children}
    </span>
  )
}
