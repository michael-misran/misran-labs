import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ModuleZone from './ModuleZone'
import Statusbar from './Statusbar'

export const MODULE_LABELS = {
  home:      'LAB HOME',
  'exp-001': 'UX AUDIT ENGINE',
  'exp-002': 'BRIEF MACHINE',
  'exp-003': 'SESSION REPLAY',
  'exp-005': 'SAAS GENERATOR',
}

export default function Shell({ activeModule, navigateTo, moduleHistory }) {
  const moduleLabel = MODULE_LABELS[activeModule] ?? activeModule.toUpperCase()

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
        <Topbar moduleLabel={moduleLabel} />

        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <Sidebar
            activeModule={activeModule}
            navigateTo={navigateTo}
            moduleHistory={moduleHistory}
          />
          <ModuleZone activeModule={activeModule} navigateTo={navigateTo} />
        </div>

        <Statusbar activeModule={activeModule} moduleLabel={moduleLabel} />
      </div>
    </>
  )
}
