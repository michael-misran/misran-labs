import { useParams, Link } from 'react-router-dom'
import ApiMonitorModule from '../modules/ApiMonitorModule'
import CVModule from '../modules/CVModule'
import UXAuditEngine from '../experiences/UXAuditEngine'
import ProductBriefMachine from '../experiences/ProductBriefMachine'
import SessionReplay from '../experiences/SessionReplay'
import MicroSaaSGenerator from '../experiences/MicroSaaSGenerator'

export default function ModuleZone() {
  const { moduleId } = useParams()

  function renderModule() {
    switch (moduleId) {
      case 'api-monitor': return <ApiMonitorModule />
      case 'cv':          return <CVModule />
      case 'exp-001':     return <UXAuditEngine />
      case 'exp-002':     return <ProductBriefMachine />
      case 'exp-003':     return <SessionReplay />
      case 'exp-005':     return <MicroSaaSGenerator />
      default:
        return (
          <div style={{ padding: 40, fontFamily: "'Inter', sans-serif", color: '#7a9bb5' }}>
            <p style={{ marginBottom: 16 }}>Module introuvable.</p>
            <Link to="/" style={{ color: '#25e2cc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              {'← Retour au Lab Home'}
            </Link>
          </div>
        )
    }
  }

  return (
    <div key={moduleId} style={{ animation: 'fadeIn 0.2s ease', height: '100%' }}>
      {renderModule()}
    </div>
  )
}
