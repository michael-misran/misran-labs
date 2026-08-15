import { PHASES, STATUS } from './phases'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function PhaseCoverage({ phases = {} }) {
  const { lang } = useLanguage()
  const phaseList = PHASES[lang] ?? PHASES.fr
  const statusMap = STATUS[lang] ?? STATUS.fr

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
        {t(lang, 'processCoverage')}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {phaseList.map(phase => {
          const status = phases[phase.id] ?? 'skipped'
          const s = statusMap[status]

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
                background: status === 'done' ? 'var(--active-tint)' : 'transparent',
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
                  color: status === 'skipped' ? 'var(--muted)' : 'var(--text)',
                }}
              >
                {phase.label}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12 }}>
        {Object.entries(statusMap).map(([key, s]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: s.color,
                flexShrink: 0,
                opacity: key === 'skipped' ? 0.5 : 1,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: 'var(--muted)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
