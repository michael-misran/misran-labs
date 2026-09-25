import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { visibleProjects, pt } from '../lab/projects'
import IconButton from '../design-system/IconButton'
import { Icon } from '../design-system/kit'
import LabLogo from '../design-system/LabLogo'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

const PROJECTS = visibleProjects()

// Les bascules de langue et de thème vivaient ici. La langue est remontée
// dans la Topbar avec le sélecteur de kit, et le thème clair/sombre a
// disparu : un kit est un rendu unique. Le chevron de repli était un SVG
// maison défini à côté d'elles ; il passe sur l'icône du kit.

function SidebarHeader({ lang, collapsed, isMobile, onCloseMobile, onCollapse, onExpand }) {
  if (collapsed && !isMobile) {
    return (
      <div
        style={{
          padding: '14px 0 12px',
          borderBottom: 'var(--border-thin) solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <LabLogo size={22} />
        </div>
        <IconButton onClick={onExpand} label={t(lang, 'expandNav')}>
          <Icon name="chevronRight" size="var(--icon-md)" />
        </IconButton>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 12px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LabLogo size={20} variant="compact" />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--primary)',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
          >
            M.LABS
          </span>
        </div>
        {isMobile && <IconButton onClick={onCloseMobile} label={t(lang, 'closeNav')}>✕</IconButton>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            </div>
        {!isMobile && onCollapse && (
          <IconButton onClick={onCollapse} label={t(lang, 'collapseNav')}>
            <Icon name="chevronRight" size="var(--icon-md)" />
          </IconButton>
        )}
      </div>
    </div>
  )
}

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
              color: isActive ? 'var(--primary)' : 'var(--muted)',
              fontFamily: "var(--font-mono)",
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
              background: isActive ? 'var(--selected-surface)' : 'none',
              boxShadow: isActive ? 'var(--elev-pressed)' : 'none',
              color: isActive ? 'var(--on-selected)' : 'var(--text)',
              borderRadius: 'var(--radius-sm)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--hover-tint)' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none' }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: 'var(--primary)',
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
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: 'inherit',
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
  const { lang } = useLanguage()

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
    boxShadow: mobileOpen ? 'var(--elev-4)' : 'none',
  }

  const desktopStyle = {
    width: collapsed ? 52 : 260,
    minWidth: collapsed ? 52 : 260,
    transition: 'width 0.25s ease, min-width 0.25s ease',
  }

  const navList = (collapsed) => (
    <>
      <NavItem to="/" icon="⬡" label={t(lang, 'labHome')} collapsed={collapsed} />
      {PROJECTS.map(p => (
        <NavItem key={p.slug} to={`/lab/${p.slug}`} icon={p.icon} label={pt(p, lang).title} collapsed={collapsed} />
      ))}
    </>
  )

  return (
    <nav
      className="shell-chrome"
      aria-label={t(lang, 'navAria')}
      style={{
        ...(isMobile ? mobileStyle : desktopStyle),
        overflow: 'hidden',
        overflowY: (isMobile ? false : collapsed) ? 'hidden' : 'auto',
        background: 'var(--bg3)',
        borderRight: 'var(--border-thin) solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {isMobile ? (
        <>
          <SidebarHeader lang={lang} collapsed={false} isMobile onCloseMobile={onCloseMobile} />
          <div style={{ paddingTop: 8 }} />
          {navList(false)}
        </>
      ) : collapsed ? (
        <>
          <SidebarHeader lang={lang} collapsed onExpand={() => setCollapsed(false)} />
          {navList(true)}
        </>
      ) : (
        <>
          <SidebarHeader lang={lang} collapsed={false} onCollapse={() => setCollapsed(true)} />
          <div style={{ paddingTop: 8 }} />
          {navList(false)}
        </>
      )}
    </nav>
  )
}
