// Interrupteur du kit. La piste est en creux, le curseur en relief — c'est
// ce contraste qui rend l'état lisible sans dépendre de la seule couleur.
// Les libellés ON / OFF sont optionnels mais recommandés : la couleur seule
// ne suffit pas pour un daltonien.
//
// Deux tailles : md par défaut, sm pour les formulaires denses (c'est ce qui
// a permis de supprimer l'interrupteur maison des pages privées).
//
// Le conteneur est un <span> et non un <label> : imbriquer un <button> dans
// un <label> ne rend pas le libellé cliquable et embrouille les lecteurs
// d'écran. L'accessibilité passe par role="switch" + aria-checked + aria-label.

const SIZES = {
  sm: { w: 40, h: 22, knob: 16, pad: 3 },
  md: { w: 56, h: 30, knob: 24, pad: 3 },
}

export default function Switch({
  checked = false,
  onChange,
  label,
  showState = true,
  size = 'md',
  disabled = false,
}) {
  const s = SIZES[size] ?? SIZES.md

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-body)',
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 600,
        color: disabled ? 'var(--muted)' : 'var(--text2)',
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        style={{
          position: 'relative',
          width: s.w,
          height: s.h,
          flexShrink: 0,
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--primary)' : 'var(--surface-inset)',
          boxShadow: 'var(--elev-inset)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: 0,
          transition: 'background 0.2s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: s.pad,
            left: checked ? s.w - s.knob - s.pad : s.pad,
            width: s.knob,
            height: s.knob,
            borderRadius: '50%',
            background: 'var(--surface-raised)',
            boxShadow: 'var(--elev-3)',
            transition: 'left 0.2s ease',
          }}
        />
      </button>
      {showState && (checked ? 'ON' : 'OFF')}
      {label && !showState && label}
    </span>
  )
}
