import { PHASES, STATUS } from './phases'

export default function PhaseCoverage({ phases = {} }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          marginBottom: 10,
        }}
      >
        {'// COUVERTURE DU PROCESS'}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PHASES.map(phase => {
          const status = phases[phase.id] ?? 'skipped'
          const s = STATUS[status]

          return (
            <div
              key={phase.id}
              title={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 4,
                border: `1px solid ${s.color}`,
                background: status === 'done' ? 'rgba(37,226,204,0.06)' : 'transparent',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: s.color,
                  flexShrink: 0,
                  opacity: status === 'skipped' ? 0.5 : 1,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: status === 'skipped' ? 'var(--muted)' : '#e8f4f8',
                }}
              >
                {phase.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
