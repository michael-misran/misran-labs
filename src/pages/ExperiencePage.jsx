import { useParams, Link } from 'react-router-dom'
import ProductBriefMachine from '../experiences/ProductBriefMachine'

const EXPERIENCE_MAP = {
  'exp-002': ProductBriefMachine,
}

export default function ExperiencePage() {
  const { slug } = useParams()
  const Component = EXPERIENCE_MAP[slug]

  if (Component) return <Component />

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
      `}</style>
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0e17',
          backgroundImage:
            'linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#f59e0b',
              border: '1px solid #f59e0b',
              borderRadius: 3,
              padding: '2px 10px',
              letterSpacing: '0.1em',
              display: 'inline-block',
              marginBottom: 24,
            }}
          >
            IN PROGRESS
          </span>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: '#e8f4f8',
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Expérience en cours de construction
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#7a9bb5',
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Cette expérience n'est pas encore disponible. Reviens bientôt.
          </p>
          <Link
            to="/lab"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: '#25e2cc',
              background: 'rgba(37,226,204,0.12)',
              border: '1px solid #25e2cc',
              borderRadius: 6,
              padding: '12px 24px',
              display: 'inline-block',
            }}
          >
            ← Retour au Lab
          </Link>
        </div>
      </div>
    </>
  )
}
