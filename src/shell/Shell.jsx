import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Statusbar from './Statusbar'
import { resolveRouteMeta } from './registry'

export default function Shell() {
  const location = useLocation()
  const meta = resolveRouteMeta(location.pathname)
  const [history, setHistory] = useState([])
  const prevPathname = useRef(null)

  useEffect(() => {
    document.title = meta.label ? `${meta.label} — Michael Misran` : 'Michael Misran'
  }, [meta.label])

  useEffect(() => {
    if (prevPathname.current && prevPathname.current !== location.pathname) {
      setHistory(prev => [prevPathname.current, ...prev].slice(0, 3))
    }
    prevPathname.current = location.pathname
  }, [location.pathname])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; background: #0a0e17; }
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
        <Topbar moduleLabel={meta.label.toUpperCase()} />

        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <Sidebar history={history} />
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
            <Outlet />
          </div>
        </div>

        <Statusbar moduleLabel={meta.label} />
      </div>
    </>
  )
}
