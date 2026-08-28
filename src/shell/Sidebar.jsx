import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { visibleProjects, pt } from '../lab/projects'
import IconButton from '../design-system/IconButton'
import LabLogo from '../design-system/LabLogo'
import { useLanguage } from './LanguageContext'
import { useAuth } from './AuthContext'
import { t } from '../i18n/ui'

const PROJECTS = visibleProjects()

function LanguageToggle({ lang, onToggle }) {
  return (
    <IconButton onClick={onToggle} label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.06em' }}>
        {lang === 'fr' ? 'EN' : 'FR'}
      </span>
    </IconButton>
  )
}

function ThemeToggle({ isLight, onToggle, lang }) {
  return (
    <IconButton onClick={onToggle} label={isLight ? t(lang, 'themeToDark') : t(lang, 'themeToLight')}>
      <span style={{ fontSize: 14, lineHeight: 1 }}>{isLight ? '☾' : '☀'}</span>
    </IconButton>
  )
}

function CollapseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}

function SidebarHeader({ lang, toggleLang, isLight, onToggleTheme, collapsed, isMobile, onCloseMobile, onCollapse, onExpand }) {
  if (collapsed && !isMobile) {
    return (
      <div
        style={{
          padding: '14px 0 12px',
          borderBottom: '1px solid var(--border)',
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
          <CollapseIcon />
        </IconButton>
        <LanguageToggle lang={lang} onToggle={toggleLang} />
        <ThemeToggle isLight={isLight} onToggle={onToggleTheme} lang={lang} />
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
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
          <LanguageToggle lang={lang} onToggle={toggleLang} />
          <ThemeToggle isLight={isLight} onToggle={onToggleTheme} lang={lang} />
        </div>
        {!isMobile && onCollapse && (
          <IconButton onClick={onCollapse} label={t(lang, 'collapseNav')}>
            <CollapseIcon />
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
              background: isActive ? 'var(--active-tint)' : 'none',
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
                color: 'var(--text)',
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

function LoginFooter({ collapsed, authenticated, loginOpen, onToggleLogin, onLogout, password, setPassword, error, submitting, onSubmit }) {
  const footerButtonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'none',
    border: 'none',
    color: 'var(--text)',
    fontFamily: "var(--font-body)",
    fontSize: 13,
    cursor: 'pointer',
    padding: '8px 4px',
  }
  const iconSpanStyle = { fontFamily: "var(--font-mono)", fontSize: 14, color: 'var(--primary)', width: 18, textAlign: 'center', flexShrink: 0 }

  if (collapsed) {
    return (
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={authenticated ? onLogout : onToggleLogin} label={authenticated ? 'Déconnexion' : 'Connexion'}>
          <span style={{ fontSize: 14 }}>{authenticated ? '🔓' : '🔑'}</span>
        </IconButton>
      </div>
    )
  }

  return (
    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', padding: 12 }}>
      {authenticated ? (
        <button onClick={onLogout} style={footerButtonStyle}>
          <span style={iconSpanStyle}>🔓</span>
          Déconnexion
        </button>
      ) : loginOpen ? (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            style={{
              width: '100%',
              fontFamily: "var(--font-body)",
              fontSize: 13,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--text)',
              padding: '6px 10px',
            }}
          />
          {error && <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: 'var(--warning)' }}>{error}</span>}
          <button
            type="submit"
            disabled={submitting}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              background: 'var(--primary)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: 6,
              padding: '6px 10px',
              cursor: submitting ? 'default' : 'pointer',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? '…' : 'Connexion'}
          </button>
        </form>
      ) : (
        <button onClick={onToggleLogin} style={footerButtonStyle}>
          <span style={iconSpanStyle}>🔑</span>
          Connexion
        </button>
      )}
    </div>
  )
}

export default function Sidebar({ isMobile, mobileOpen, onCloseMobile, isLight, onToggleTheme }) {
  const [collapsed, setCollapsed] = useState(false)
  const { lang, toggle: toggleLang } = useLanguage()
  const { authenticated, login, logout } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLoginSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setLoginError('')
    try {
      await login(password)
      setPassword('')
      setLoginOpen(false)
    } catch (err) {
      setLoginError(err.message || 'Mot de passe incorrect')
    } finally {
      setSubmitting(false)
    }
  }

  function handleToggleLogin() {
    if (collapsed && !isMobile) setCollapsed(false)
    setLoginError('')
    setLoginOpen((o) => !o)
  }

  async function handleLogout() {
    await logout()
  }

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
      <NavItem to="/" icon="⬡" label={t(lang, 'labHome')} collapsed={collapsed} />
      {PROJECTS.map(p => (
        <NavItem key={p.slug} to={`/lab/${p.slug}`} icon={p.icon} label={pt(p, lang).title} collapsed={collapsed} />
      ))}
      {authenticated && (
        <>
          <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }} />
          <NavItem to="/prive" icon="🔒" label="Backlog" collapsed={collapsed} />
          <NavItem to="/communication" icon="📣" label="Communication" collapsed={collapsed} />
        </>
      )}
      {import.meta.env.DEV && (
        <>
          <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }} />
          <NavItem to="/maia" icon="🤖" label="MAIA · app" collapsed={collapsed} />
          <NavItem to="/conforma" icon="☑" label="Conforma · app" collapsed={collapsed} />
        </>
      )}
    </>
  )

  return (
    <nav
      aria-label={t(lang, 'navAria')}
      style={{
        ...(isMobile ? mobileStyle : desktopStyle),
        overflow: 'hidden',
        overflowY: (isMobile ? false : collapsed) ? 'hidden' : 'auto',
        background: 'var(--bg3)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {isMobile ? (
        <>
          <SidebarHeader lang={lang} toggleLang={toggleLang} isLight={isLight} onToggleTheme={onToggleTheme} collapsed={false} isMobile onCloseMobile={onCloseMobile} />
          <div style={{ paddingTop: 8 }} />
          {navList(false)}
        </>
      ) : collapsed ? (
        <>
          <SidebarHeader lang={lang} toggleLang={toggleLang} isLight={isLight} onToggleTheme={onToggleTheme} collapsed onExpand={() => setCollapsed(false)} />
          {navList(true)}
        </>
      ) : (
        <>
          <SidebarHeader lang={lang} toggleLang={toggleLang} isLight={isLight} onToggleTheme={onToggleTheme} collapsed={false} onCollapse={() => setCollapsed(true)} />
          <div style={{ paddingTop: 8 }} />
          {navList(false)}
        </>
      )}

      <LoginFooter
        collapsed={!isMobile && collapsed}
        authenticated={authenticated}
        loginOpen={loginOpen}
        onToggleLogin={handleToggleLogin}
        onLogout={handleLogout}
        password={password}
        setPassword={setPassword}
        error={loginError}
        submitting={submitting}
        onSubmit={handleLoginSubmit}
      />
    </nav>
  )
}
