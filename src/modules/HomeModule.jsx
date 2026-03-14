import { useState } from 'react'

const MODULES = [
  {
    id: 'exp-001',
    icon: '◈',
    title: 'UX Audit Engine',
    desc: 'Upload screenshot → audit structuré en streaming',
    status: 'READY',
    tags: ['React', 'FileReader', 'Streaming'],
  },
  {
    id: 'exp-002',
    icon: '◎',
    title: 'Brief Machine',
    desc: 'Une phrase → brief produit complet en 30 secondes',
    status: 'READY',
    tags: ['React', 'Simulation'],
  },
  {
    id: 'exp-003',
    icon: '▣',
    title: 'Session Replay',
    desc: '15 sessions de build documentées avec logs complets',
    status: 'READY',
    tags: ['React', 'Accordéon', 'iframe'],
  },
  {
    id: 'exp-005',
    icon: '◉',
    title: 'SaaS Generator',
    desc: 'Une phrase → landing page SaaS rendue en iframe',
    status: 'READY',
    tags: ['iframe', 'Streaming', 'HTML'],
  },
  {
    id: 'exp-004',
    icon: '◇',
    title: 'Token Extractor',
    desc: 'Screenshot → design tokens Figma. En développement.',
    status: 'IN PROGRESS',
    tags: ['Vision', 'Figma API'],
  },
  {
    id: 'api-monitor',
    icon: '◬',
    title: 'API Cost Monitor',
    desc: 'Monitoring tokens · coûts · alertes budget',
    status: 'READY',
    tags: ['Simulation', 'Anthropic API', 'Budget'],
  },
]

function ModuleCard({ mod, navigateTo }) {
  const [hovered, setHovered] = useState(false)
  const isReady = mod.status === 'READY'

  return (
    <div
      onClick={() => isReady && navigateTo(mod.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0d1220',
        border: `1px solid ${hovered && isReady ? '#25e2cc' : '#1a2a3a'}`,
        borderRadius: 8,
        padding: 24,
        cursor: isReady ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered && isReady ? '0 0 20px rgba(37,226,204,0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        opacity: isReady ? 1 : 0.6,
      }}
    >
      {/* Header: icon + status badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: '#25e2cc',
            lineHeight: 1,
          }}
        >
          {mod.icon}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: isReady ? '#25e2cc' : '#f59e0b',
            border: `1px solid ${isReady ? '#25e2cc' : '#f59e0b'}`,
            borderRadius: 3,
            padding: '2px 7px',
            letterSpacing: '0.1em',
          }}
        >
          {mod.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: '#e8f4f8',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {mod.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#7a9bb5',
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {mod.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {mod.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#25e2cc',
              background: 'rgba(37,226,204,0.06)',
              border: '1px solid rgba(37,226,204,0.2)',
              borderRadius: 3,
              padding: '2px 8px',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HomeModule({ navigateTo }) {
  return (
    <div
      style={{
        padding: 40,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'Inter', sans-serif",
        color: '#e8f4f8',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#25e2cc',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {'// LAB MODULES'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5' }}>
          5 modules · Misran Labs v2.0.0
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {MODULES.map(mod => (
          <ModuleCard key={mod.id} mod={mod} navigateTo={navigateTo} />
        ))}
      </div>
    </div>
  )
}
