const MODULE_INFO = {
  home:      { icon: '⬡', label: 'Lab Home' },
  'exp-001': { icon: '◈', label: 'UX Audit' },
  'exp-002': { icon: '◎', label: 'Brief Machine' },
  'exp-003': { icon: '▣', label: 'Session Replay' },
  'exp-005': { icon: '◉', label: 'SaaS Generator' },
}

export default function ActiveModuleWidget({ activeModule, moduleHistory }) {
  const active = MODULE_INFO[activeModule] ?? { icon: '◌', label: activeModule }

  return (
    <div
      style={{
        background: 'rgba(10,14,23,0.4)',
        borderBottom: '1px solid #1a2a3a',
        padding: '12px 16px',
      }}
    >
      {/* Active */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#4a7a94',
          letterSpacing: '0.1em',
          marginBottom: 6,
        }}
      >
        ACTIF
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#25e2cc' }}>
          {active.icon}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e8f4f8' }}>
          {active.label}
        </span>
      </div>

      {/* History */}
      {moduleHistory.length > 0 && (
        <>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#4a7a94',
              letterSpacing: '0.1em',
              marginBottom: 4,
            }}
          >
            HISTORIQUE
          </div>
          {moduleHistory.map((id, i) => {
            const m = MODULE_INFO[id] ?? { icon: '◌', label: id }
            return (
              <div
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#4a7a94',
                  lineHeight: 1.8,
                }}
              >
                {m.icon} {m.label}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
