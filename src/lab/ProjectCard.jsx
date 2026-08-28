import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pt } from './projects'
import Tag from '../design-system/Tag'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLanguage()
  const { title, summary, tags } = pt(project, lang)

  return (
    <Link to={`/lab/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg2)',
          border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 20,
          padding: 24,
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: hovered ? '0 0 20px var(--active-tint)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: 'var(--primary)' }}>
            {project.icon}
          </span>
          {project.type === 'case-study' && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: 'var(--cyan)',
                border: '1px solid var(--cyan)',
                borderRadius: 3,
                padding: '2px 7px',
                letterSpacing: '0.1em',
              }}
            >
              {t(lang, 'caseStudy')}
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.6, flex: 1 }}>
          {summary}
        </p>

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}
      </div>
    </Link>
  )
}
