import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { visibleProjects, pt, dossierNo } from '../lab/projects'
import IconButton from '../design-system/IconButton'
import { Icon } from '../design-system/kit'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

const PROJECTS = visibleProjects()
const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map(p => [p.slug, p]))

// Deux sections dans la nav : le Lab (exploration, méthode) et le
// Portfolio (les pièces qu'on montre en priorité). Une page qui n'est
// dans aucune des deux listes reste accessible par son URL, juste hors
// du menu — décision explicite, pas un oubli.
const LAB_SLUGS = ['design-system', 'lab-tokens', 'lost-cauldron-game', 'exp-003']
const PORTFOLIO_SLUGS = ['cv', 'design-system-multimarques', 'workflow']

// Les bascules de langue et de thème vivaient ici. La langue est remontée
// dans la Topbar avec le sélecteur de kit, et le thème clair/sombre a
// disparu : un kit est un rendu unique. Le chevron de repli était un SVG
// maison défini à côté d'elles ; il passe sur l'icône du kit.

// Plus de logo ni de wordmark ici — juste le contrôle de repli. Une seule
// icône, un seul geste : le chevron pointe vers la droite pour déplier,
// vers la gauche (rotation 180°, pas une seconde icône) pour replier.
function SidebarHeader({ lang, collapsed, isMobile, onCloseMobile, onCollapse, onExpand }) {
  if (isMobile) {
    return (
      <div
        style={{
          padding: '10px 12px',
          borderBottom: 'var(--border-thin) solid var(--border)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={onCloseMobile} label={t(lang, 'closeNav')}>✕</IconButton>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: collapsed ? '12px 0' : '10px 12px',
        borderBottom: 'var(--border-thin) solid var(--border)',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'flex-end',
      }}
    >
      <IconButton onClick={collapsed ? onExpand : onCollapse} label={t(lang, collapsed ? 'expandNav' : 'collapseNav')}>
        <Icon name="chevronRight" size="var(--icon-md)" style={{ transform: collapsed ? 'none' : 'rotate(180deg)' }} />
      </IconButton>
    </div>
  )
}

function NavItem({ to, number, label, collapsed }) {
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
              fontSize: 11,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              padding: '12px 0',
              width: '100%',
              textAlign: 'center',
              transition: 'color 0.15s ease',
            }}
          >
            {number}
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
                fontSize: 10,
                color: isActive ? 'var(--on-selected)' : 'var(--primary)',
                lineHeight: 1,
                width: 24,
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              {number}
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

function NavSectionLabel({ children, collapsed }) {
  if (collapsed) {
    return <div style={{ borderTop: 'var(--border-thin) solid var(--border)', margin: '8px 12px' }} />
  }
  return (
    <div
      style={{
        padding: '16px 16px 6px',
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}
    >
      {children}
    </div>
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
      <NavSectionLabel collapsed={collapsed}>{t(lang, 'navSectionLab')}</NavSectionLabel>
      <NavItem to="/" number="✛" label={t(lang, 'labHome')} collapsed={collapsed} />
      {LAB_SLUGS.map(slug => PROJECTS_BY_SLUG[slug]).filter(Boolean).map(p => (
        <NavItem key={p.slug} to={`/lab/${p.slug}`} number={dossierNo(p.slug)} label={pt(p, lang).title} collapsed={collapsed} />
      ))}

      <NavSectionLabel collapsed={collapsed}>{t(lang, 'navSectionPortfolio')}</NavSectionLabel>
      {PORTFOLIO_SLUGS.map(slug => PROJECTS_BY_SLUG[slug]).filter(Boolean).map(p => (
        <NavItem key={p.slug} to={`/lab/${p.slug}`} number={dossierNo(p.slug)} label={pt(p, lang).title} collapsed={collapsed} />
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
