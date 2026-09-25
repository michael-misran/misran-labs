// Parcours en étapes du kit. Trois états par étape — faite, courante, à
// venir — distingués par le remplissage ET par le libellé, jamais par la
// seule couleur. L'étape courante porte une bulle de contexte.

export default function Stepper({ steps, current = 1, hint }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {hint && (
        <div
          style={{
            display: 'inline-block',
            background: 'var(--text)',
            color: 'var(--bg2)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--elev-4)',
            fontSize: 11,
            lineHeight: 1.4,
            padding: '8px 12px',
            marginBottom: 14,
          }}
        >
          {hint}
        </div>
      )}

      <ol style={{ display: 'flex', alignItems: 'flex-start', listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((step, i) => {
          const n = i + 1
          const done = n < current
          const isCurrent = n === current
          const filled = done || isCurrent

          return (
            <li key={step} style={{ display: 'flex', alignItems: 'flex-start', flex: i === steps.length - 1 ? '0 0 auto' : 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 72 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: filled ? 'var(--primary)' : 'var(--surface-inset)',
                    color: filled ? 'var(--on-primary)' : 'var(--muted)',
                    boxShadow: isCurrent ? 'var(--elev-3)' : filled ? 'var(--elev-2)' : 'var(--elev-inset)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {n}
                </span>
                <span
                  aria-current={isCurrent ? 'step' : undefined}
                  style={{
                    fontSize: 11,
                    textAlign: 'center',
                    color: isCurrent ? 'var(--text)' : 'var(--text2)',
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {n}. {step}
                </span>
              </div>

              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    height: 2,
                    marginTop: 14,
                    borderRadius: 'var(--radius-pill)',
                    background: n < current ? 'var(--primary)' : 'var(--border)',
                  }}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
