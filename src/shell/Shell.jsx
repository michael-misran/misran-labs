import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Statusbar from './Statusbar'
import SecondarySidebar from '../design-system/SecondarySidebar'
import { SecondarySidebarContext } from './SecondarySidebarContext'
import { resolveRouteMeta } from './registry'
import useIsMobile from './useIsMobile'
import Topbar from './Topbar'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

export default function Shell() {
  const location = useLocation()
  const { lang } = useLanguage()
  const meta = resolveRouteMeta(location.pathname, lang)
  const isMobile = useIsMobile()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [secondaryNav, setSecondaryNav] = useState(null)

  useEffect(() => {
    document.title = meta.label ? `${meta.label} — Michael Misran` : 'Michael Misran'
  }, [meta.label])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; background: var(--bg); }
        a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
          outline: var(--border-regular) solid var(--primary);
          outline-offset: 2px;
          border-radius: 2px;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .print-only { display: none; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          html, body, #root { height: auto !important; overflow: visible !important; background: var(--bg) !important; }
          .shell-grid { display: block !important; height: auto !important; overflow: visible !important; }
          .shell-body { display: block !important; overflow: visible !important; }
          .shell-main { overflow: visible !important; height: auto !important; }
        }
      `}</style>

      <div
        className="shell-grid"
        style={{
          display: 'grid',
          gridTemplateRows: 'var(--chrome-height) 1fr var(--chrome-height)',
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--bg)',
          fontFamily: "var(--font-body)",
          color: 'var(--text)',
        }}
      >
        <div className="no-print" style={{ display: 'contents' }}>
          <Topbar isMobile={isMobile} />
        </div>

        <div className="shell-body" style={{ display: 'flex', overflow: 'hidden', position: 'relative' }}>
          <div className="no-print" style={{ display: 'contents' }}>
            <Sidebar
              isMobile={isMobile}
              mobileOpen={mobileNavOpen}
              onCloseMobile={() => setMobileNavOpen(false)}
            />
          </div>

          {isMobile && !mobileNavOpen && (
            <button
              className="no-print"
              onClick={() => setMobileNavOpen(true)}
              aria-label={t(lang, 'openNav')}
              style={{
                position: 'absolute',
                top: 'calc(var(--chrome-height) + 12px)',
                left: 12,
                zIndex: 45,
                background: 'var(--bg2)',
                border: 'var(--border-thin) solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary)',
                fontSize: 16,
                cursor: 'pointer',
                padding: '6px 10px',
                lineHeight: 1,
              }}
            >
              ☰
            </button>
          )}

          {isMobile && mobileNavOpen && (
            <div
              onClick={() => setMobileNavOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'color-mix(in srgb, var(--bg3) 55%, transparent)',
                zIndex: 40,
              }}
            />
          )}

          {!isMobile && secondaryNav && (
            <div className="no-print" style={{ display: 'contents' }}>
              <SecondarySidebar items={secondaryNav.items} active={secondaryNav.active} onChange={secondaryNav.onChange} />
            </div>
          )}

          <main className="shell-main" style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            <SecondarySidebarContext.Provider value={setSecondaryNav}>
              <Outlet />
            </SecondarySidebarContext.Provider>
          </main>
        </div>

        <div className="no-print" style={{ display: 'contents' }}>
          <Statusbar moduleLabel={meta.label} isMobile={isMobile} />
        </div>
      </div>
    </>
  )
}
