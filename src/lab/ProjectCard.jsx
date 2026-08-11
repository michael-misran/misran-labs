import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={`/lab/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#0d1220',
          border: `1px solid ${hovered ? '#25e2cc' : '#1a2a3a'}`,
          borderRadius: 8,
          padding: 24,
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: hovered ? '0 0 20px rgba(37,226,204,0.1)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#25e2cc' }}>
            {project.icon}
          </span>
          {project.type === 'case-study' && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.4)',
                borderRadius: 3,
                padding: '2px 7px',
                letterSpacing: '0.1em',
              }}
            >
              CASE STUDY
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#e8f4f8', margin: 0, lineHeight: 1.3 }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7a9bb5', margin: 0, lineHeight: 1.6, flex: 1 }}>
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(tag => (
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
    </Link>
  )
}
