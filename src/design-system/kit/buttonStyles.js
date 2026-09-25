// Contrat visuel du bouton, partagé par Button (<button>) et LinkButton
// (<Link> de react-router). Une seule définition : sans ça, un lien-bouton
// et un bouton finiraient par diverger, ce qui est exactement la dette que
// le kit existe pour éviter.

export const TONES = {
  primary: { bg: 'var(--primary)', fg: 'var(--on-primary)' },
  danger: { bg: 'var(--error)', fg: 'var(--on-primary)' },
}

export const SIZES = {
  sm: { padding: '7px 14px', fontSize: 12 },
  md: { padding: '10px 20px', fontSize: 13 },
}

// state : 'default' | 'hover' | 'pressed' | 'off'
export function buttonVisuals({ tone = 'primary', variant = 'solid', size = 'md', state = 'default' }) {
  const t = TONES[tone] ?? TONES.primary
  const s = SIZES[size] ?? SIZES.md
  const ghost = variant === 'ghost'

  let background = ghost ? 'transparent' : t.bg
  let color = ghost ? 'var(--text)' : t.fg
  let boxShadow = ghost ? 'var(--elev-1)' : 'var(--elev-2)'

  if (state === 'off') {
    background = ghost ? 'transparent' : 'var(--surface-pressed)'
    color = 'var(--muted)'
    boxShadow = 'var(--elev-1)'
  } else if (state === 'pressed') {
    boxShadow = 'var(--elev-pressed)'
  } else if (state === 'hover') {
    background = ghost ? 'var(--hover-surface)' : t.bg
    boxShadow = 'var(--elev-3)'
  }

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background,
    color,
    boxShadow,
    border: ghost ? 'var(--border-thin) solid var(--border)' : 'none',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 600,
    padding: s.padding,
    textDecoration: 'none',
    transition: 'box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease',
  }
}
