import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ClockWidget from '../widgets/ClockWidget'
import WeatherWidget from '../widgets/WeatherWidget'
import UptimeWidget from '../widgets/UptimeWidget'
import ActiveModuleWidget from '../widgets/ActiveModuleWidget'
import { LAB_MODULES } from './registry'
import { CASE_STUDIES } from '../portfolio/caseStudies'

const READY_CASE_STUDIES = CASE_STUDIES.filter(cs => cs.status === 'READY')

function NavItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end
      style={{ textDecoration: 'none' }}
    >
      {({ isActive }) =>
        collapsed ? (
          <button
            title={label}
            style={{
              background: 'none',
              border: 'none',
              color: isActive ? '#25e2cc' : '#4a7a94',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              cursor: 'pointer',
              padding: '12px 0',
              width: '100%',
              textAlign: 'center',
              transition: 'color 0.15s ease',
            }}
          >
            {icon}
          </button>
        ) : (
          <div
            style={{
              background: isActive ? 'rgba(37,226,204,0.06)' : 'none',
              borderLeft: isActive ? '2px solid #25e2cc' : '2px solid transparent',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              cursor: 'pointer',
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
              {icon}
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
              {label}
            </span>
          </div>
        )
      }
    </NavLink>
  )
}

function SectionHeader({ children }) {
  return (
    <div style={{ padding: '16px 16px 8px' }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#4a7a94',
          letterSpacing: '0.12em',
        }}
      >
        {children}
      </span>
    </div>
  )
}

export default function Sidebar({ history }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      style={{
        width: collapsed ? 52 : 260,
        minWidth: collapsed ? 52 : 260,
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflow: 'hidden',
        overflowY: collapsed ? 'hidden' : 'auto',
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
          <NavItem to="/" icon="⬡" label="Lab Home" collapsed />
          {READY_CASE_STUDIES.map(cs => (
            <NavItem key={cs.slug} to={`/portfolio/${cs.slug}`} icon={cs.icon} label={cs.title} collapsed />
          ))}
          {LAB_MODULES.map(m => (
            <NavItem key={m.id} to={`/lab/${m.id}`} icon={m.icon} label={m.label} collapsed />
          ))}
        </>
      ) : (
        /* ── Expanded ── */
        <>
          {/* Header */}
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
              {'// NAVIGATION'}
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

          <NavItem to="/" icon="⬡" label="Lab Home" />

          {/* Portfolio section */}
          <SectionHeader>{'// PORTFOLIO'}</SectionHeader>
          <NavItem to="/portfolio" icon="◆" label="Tous les case studies" />
          {READY_CASE_STUDIES.map(cs => (
            <NavItem key={cs.slug} to={`/portfolio/${cs.slug}`} icon={cs.icon} label={cs.title} />
          ))}

          {/* Lab section */}
          <SectionHeader>{'// LAB'}</SectionHeader>
          {LAB_MODULES.map(m => (
            <NavItem key={m.id} to={`/lab/${m.id}`} icon={m.icon} label={m.label} />
          ))}

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
          <ActiveModuleWidget history={history} />
        </>
      )}
    </div>
  )
}
