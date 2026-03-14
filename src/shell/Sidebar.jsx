import { useState } from 'react'
import ClockWidget from '../widgets/ClockWidget'
import WeatherWidget from '../widgets/WeatherWidget'
import UptimeWidget from '../widgets/UptimeWidget'
import ActiveModuleWidget from '../widgets/ActiveModuleWidget'

const MODULES = [
  { id: 'home',    icon: '⬡', label: 'Lab Home' },
  { id: 'exp-001', icon: '◈', label: 'UX Audit' },
  { id: 'exp-002', icon: '◎', label: 'Brief Machine' },
  { id: 'exp-003', icon: '▣', label: 'Session Replay' },
  { id: 'exp-005', icon: '◉', label: 'SaaS Generator' },
  { id: 'api-monitor', icon: '◬', label: 'API Monitor' },
]

export default function Sidebar({ activeModule, navigateTo, moduleHistory }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      style={{
        width: collapsed ? 52 : 260,
        minWidth: collapsed ? 52 : 260,
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflow: 'hidden',
        background: '#0d1220',
        borderRight: '1px solid #1a2a3a',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {collapsed ? (
        /* ── Collapsed ── */
        <>
          <button
            onClick={() => setCollapsed(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#7a9bb5',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              cursor: 'pointer',
              padding: '12px 0',
              width: '100%',
              textAlign: 'center',
              borderBottom: '1px solid #1a2a3a',
            }}
          >
            ▶
          </button>
          {MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => navigateTo(m.id)}
              title={m.label}
              style={{
                background: 'none',
                border: 'none',
                color: activeModule === m.id ? '#25e2cc' : '#4a7a94',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                cursor: 'pointer',
                padding: '12px 0',
                width: '100%',
                textAlign: 'center',
                transition: 'color 0.15s ease',
              }}
            >
              {m.icon}
            </button>
          ))}
        </>
      ) : (
        /* ── Expanded ── */
        <>
          {/* Modules header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 16px 8px',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4a7a94',
                letterSpacing: '0.12em',
              }}
            >
              {'// MODULES'}
            </span>
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4a7a94',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                cursor: 'pointer',
                padding: '2px 4px',
                lineHeight: 1,
              }}
            >
              ◀
            </button>
          </div>

          {/* Module list */}
          {MODULES.map(m => {
            const isActive = activeModule === m.id
            return (
              <button
                key={m.id}
                onClick={() => navigateTo(m.id)}
                style={{
                  background: isActive ? 'rgba(37,226,204,0.06)' : 'none',
                  border: 'none',
                  borderLeft: isActive ? '2px solid #25e2cc' : '2px solid transparent',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(26,42,58,0.4)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none' }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    color: '#25e2cc',
                    lineHeight: 1,
                    width: 18,
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  {m.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: isActive ? '#e8f4f8' : '#7a9bb5',
                    transition: 'color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.label}
                </span>
              </button>
            )
          })}

          {/* Separator */}
          <div style={{ height: 1, background: '#1a2a3a', margin: '8px 0' }} />

          {/* System header */}
          <div style={{ padding: '8px 16px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4a7a94',
                letterSpacing: '0.12em',
              }}
            >
              {'// SYSTÈME'}
            </span>
          </div>

          {/* Widgets */}
          <ClockWidget />
          <WeatherWidget />
          <UptimeWidget />
          <ActiveModuleWidget activeModule={activeModule} moduleHistory={moduleHistory} />
        </>
      )}
    </div>
  )
}
