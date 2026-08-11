import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CASE_STUDIES } from './caseStudies'
import VisuallyHidden from '../components/VisuallyHidden'
import useIsMobile from '../shell/useIsMobile'

function CaseStudyCard({ cs }) {
  const [hovered, setHovered] = useState(false)
  const isReady = cs.status === 'READY'

  const card = (
    <div
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
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#25e2cc' }}>
          {cs.icon}
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
          {cs.status}
        </span>
      </div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#e8f4f8', margin: 0, lineHeight: 1.3 }}>
        {cs.title}
      </h3>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5', margin: 0, lineHeight: 1.6, flex: 1 }}>
        {cs.summary}
      </p>

      {cs.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {cs.tags.map(tag => (
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
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  if (!isReady) return card

  return (
    <Link to={`/portfolio/${cs.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      {card}
    </Link>
  )
}

export default function PortfolioIndex() {
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 20 : 40, overflowY: 'auto', height: '100%', fontFamily: "'Inter', sans-serif", color: '#e8f4f8' }}>
      <VisuallyHidden as="h1">Portfolio — Case studies design</VisuallyHidden>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#25e2cc', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
            {'// PORTFOLIO'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5' }}>
          Case studies design — process, décisions, résultats.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {CASE_STUDIES.map(cs => (
          <CaseStudyCard key={cs.slug} cs={cs} />
        ))}
      </div>
    </div>
  )
}
