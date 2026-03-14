import HomeModule from '../modules/HomeModule'
import UXAuditEngine from '../experiences/UXAuditEngine'
import ProductBriefMachine from '../experiences/ProductBriefMachine'
import SessionReplay from '../experiences/SessionReplay'
import MicroSaaSGenerator from '../experiences/MicroSaaSGenerator'

export default function ModuleZone({ activeModule, navigateTo }) {
  function renderModule() {
    switch (activeModule) {
      case 'home':    return <HomeModule navigateTo={navigateTo} />
      case 'exp-001': return <UXAuditEngine />
      case 'exp-002': return <ProductBriefMachine />
      case 'exp-003': return <SessionReplay />
      case 'exp-005': return <MicroSaaSGenerator />
      default:        return <HomeModule navigateTo={navigateTo} />
    }
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        background: 'transparent',
        position: 'relative',
      }}
    >
      <div
        key={activeModule}
        style={{ animation: 'fadeIn 0.2s ease', height: '100%' }}
      >
        {renderModule()}
      </div>
    </div>
  )
}
