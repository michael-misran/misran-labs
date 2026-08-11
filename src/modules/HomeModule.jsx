import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CASE_STUDIES } from '../portfolio/caseStudies'
import VisuallyHidden from '../components/VisuallyHidden'
import useIsMobile from '../shell/useIsMobile'

const LAB_ITEMS = [
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
    desc: 'Sessions de build documentées avec logs complets',
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
    id: 'api-monitor',
    icon: '◬',
    title: 'API Cost Monitor',
    desc: 'Monitoring tokens · coûts · alertes budget',
    status: 'READY',
    tags: ['Simulation', 'Anthropic API', 'Budget'],
  },
  {
    id: 'cv',
    icon: '◫',
    title: 'CV',
    desc: 'Parcours et compétences',
    status: 'READY',
    tags: ['Profil'],
  },
]

function Card({ icon, status, title, desc, tags, hoverable }) {
  const [hovered, setHovered] = useState(false)
  const isReady = status === 'READY'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0d1220',
        border: `1px solid ${hovered && isReady && hoverable ? '#25e2cc' : '#1a2a3a'}`,
        borderRadius: 8,
        padding: 24,
        cursor: isReady && hoverable ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered && isReady && hoverable ? '0 0 20px rgba(37,226,204,0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        opacity: isReady ? 1 : 0.6,
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#25e2cc' }}>{icon}</span>
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
          {status}
        </span>
      </div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#e8f4f8', margin: 0, lineHeight: 1.3 }}>
        {title}
      </h3>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5', margin: 0, lineHeight: 1.6, flex: 1 }}>
        {desc}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(tag => (
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
      )}
    </div>
  )
}

function SectionHead({ eyebrow, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
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
          {eyebrow}
        </span>
        <div style={{ flex: 1, height: 1, background: '#1a2a3a' }} />
      </div>
      {subtitle && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5' }}>{subtitle}</p>}
    </div>
  )
}

export default function HomeModule() {
  const featuredCaseStudies = CASE_STUDIES.filter(cs => cs.status === 'READY').slice(0, 3)
  const readyLabCount = LAB_ITEMS.filter(m => m.status === 'READY').length
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 20 : 40, overflowY: 'auto', height: '100%', fontFamily: "'Inter', sans-serif", color: '#e8f4f8' }}>
      <VisuallyHidden as="h1">Michael Misran — Product Designer & Lab Home</VisuallyHidden>

      {/* Portfolio — mis en avant */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead eyebrow="// PORTFOLIO" subtitle="Case studies design — process, décisions, résultats." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
          {featuredCaseStudies.map(cs => (
            <Link key={cs.slug} to={`/portfolio/${cs.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card icon={cs.icon} status={cs.status} title={cs.title} desc={cs.summary} tags={cs.tags} hoverable />
            </Link>
          ))}
        </div>
        <Link
          to="/portfolio"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#25e2cc',
            textDecoration: 'none',
          }}
        >
          {'Voir tout le portfolio →'}
        </Link>
      </section>

      {/* Lab — modules techniques */}
      <section>
        <SectionHead eyebrow="// LAB MODULES" subtitle={`${readyLabCount} modules · Misran Labs v2.0.0`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {LAB_ITEMS.map(m => (
            <Link key={m.id} to={`/lab/${m.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card icon={m.icon} status={m.status} title={m.title} desc={m.desc} tags={m.tags} hoverable />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
