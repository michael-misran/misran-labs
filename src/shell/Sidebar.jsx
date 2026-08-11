import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { visibleProjects } from '../lab/projects'

const PROJECTS = visibleProjects()

function NavItem({ to, icon, label, collapsed }) {
  return (
    <NavLink to={to} end style={{ textDecoration: 'none' }}>
      {({ isActive }) =>
        collapsed ? (
          <button
            title={label}
            style={{
              background: 'none',
              border: 'none',
              color: isActive ? '#25e2cc' : 'var(--muted)',
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
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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

export default function Sidebar({ isMobile, mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false)

  const mobileStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 260,
    minWidth: 260,
    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.25s ease',
    zIndex: 50,
    boxShadow: mobileOpen ? '8px 0 24px rgba(0,0,0,0.4)' : 'none',
  }

  const desktopStyle = {
    width: collapsed ? 52 : 260,
    minWidth: collapsed ? 52 : 260,
    transition: 'width 0.25s ease, min-width 0.25s ease',
  }

  const navList = (collapsed) => (
    <>
      <NavItem to="/" icon="⬡" label="Lab Home" collapsed={collapsed} />
      {PROJECTS.map(p => (
        <NavItem key={p.slug} to={`/lab/${p.slug}`} icon={p.icon} label={p.title} collapsed={collapsed} />
      ))}
    </>
  )

  return (
    <nav
      aria-label="Navigation principale"
      style={{
        ...(isMobile ? mobileStyle : desktopStyle),
        overflow: 'hidden',
        overflowY: (isMobile ? false : collapsed) ? 'hidden' : 'auto',
        background: '#0d1220',
        borderRight: '1px solid #1a2a3a',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {isMobile ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em' }}>
              {'// LAB'}
            </span>
            <button
              onClick={onCloseMobile}
              aria-label="Fermer la navigation"
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 16, cursor: 'pointer', padding: '2px 4px', lineHeight: 1 }}
            >
              ✕
            </button>
          </div>
          {navList(false)}
        </>
      ) : collapsed ? (
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
          {navList(true)}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em' }}>
              {'// LAB'}
            </span>
            <button
              onClick={() => setCollapsed(true)}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, cursor: 'pointer', padding: '2px 4px', lineHeight: 1 }}
            >
              ◀
            </button>
          </div>
          {navList(false)}
        </>
      )}
    </nav>
  )
}
