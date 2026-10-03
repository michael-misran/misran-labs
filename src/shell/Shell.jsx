import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Masthead from './Masthead'
import NavTitres from './NavTitres'
import Defilant from './Defilant'
import Colophon from './Colophon'
import Fiole from './mascotte/Fiole'
import SecondarySidebar from '../design-system/SecondarySidebar'
import { SecondarySidebarContext } from './SecondarySidebarContext'
import { resolveRouteMeta } from './registry'
import useIsMobile from './useIsMobile'
import { useLanguage } from './LanguageContext'
import { t } from '../i18n/ui'

export default function Shell() {
  const location = useLocation()
  const { lang } = useLanguage()
  const meta = resolveRouteMeta(location.pathname, lang)
  const isMobile = useIsMobile()
  const [secondaryNav, setSecondaryNav] = useState(null)

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = t(lang, 'homeDocumentTitle')
    } else {
      document.title = meta.label ? `${meta.label} · Misran Labs` : 'Misran Labs'
    }
  }, [location.pathname, meta.label, lang])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); }
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
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          fontFamily: "var(--font-body)",
          color: 'var(--text)',
        }}
      >
        <Masthead />
        <NavTitres />
        <Defilant />

        <div className="shell-body" style={{ display: 'flex', position: 'relative' }}>
          {!isMobile && secondaryNav && (
            <div className="no-print" style={{ display: 'contents' }}>
              <SecondarySidebar items={secondaryNav.items} active={secondaryNav.active} onChange={secondaryNav.onChange} />
            </div>
          )}

          <main className="shell-main" style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <SecondarySidebarContext.Provider value={setSecondaryNav}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </SecondarySidebarContext.Provider>
          </main>
        </div>

        <Colophon />
      </div>

      <span
        className="no-print"
        style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 20, pointerEvents: 'none' }}
      >
        <span className="fiole-shadow" aria-hidden="true" />
        <Fiole />
      </span>
    </>
  )
}
