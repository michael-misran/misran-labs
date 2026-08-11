import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Statusbar from './Statusbar'
import { resolveRouteMeta } from './registry'
import useIsMobile from './useIsMobile'

export default function Shell() {
  const location = useLocation()
  const meta = resolveRouteMeta(location.pathname)
  const isMobile = useIsMobile()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    document.title = meta.label ? `${meta.label} — Michael Misran` : 'Michael Misran'
  }, [meta.label])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; background: #0a0e17; }
        a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
          outline: 2px solid #25e2cc;
          outline-offset: 2px;
          border-radius: 2px;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: '48px 1fr 32px',
          height: '100vh',
          overflow: 'hidden',
          background: '#0a0e17',
          backgroundImage:
            'linear-gradient(rgba(26,42,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          fontFamily: "'Inter', sans-serif",
          color: '#e8f4f8',
        }}
      >
        <Topbar
          moduleLabel={meta.label.toUpperCase()}
          isMobile={isMobile}
          onToggleMobileNav={() => setMobileNavOpen(o => !o)}
        />

        <div style={{ display: 'flex', overflow: 'hidden', position: 'relative' }}>
          <Sidebar
            isMobile={isMobile}
            mobileOpen={mobileNavOpen}
            onCloseMobile={() => setMobileNavOpen(false)}
          />

          {isMobile && mobileNavOpen && (
            <div
              onClick={() => setMobileNavOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 40,
              }}
            />
          )}

          <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            <Outlet />
          </main>
        </div>

        <Statusbar moduleLabel={meta.label} isMobile={isMobile} />
      </div>
    </>
  )
}
