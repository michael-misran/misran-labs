import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pt } from './projects'
import Tag from '../design-system/Tag'
import { Badge } from '../design-system/kit'
import { useLanguage } from '../shell/LanguageContext'
import { t } from '../i18n/ui'

// Carte de projet de la home. Suit le contrat du kit : élévation 3 au repos,
// 4 au survol. Avant, la carte changeait sa couleur de bordure et ajoutait
// une lueur — deux signaux que le reste du système n'utilise pas.
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
          background: 'var(--surface-raised)',
          boxShadow: hovered ? 'var(--elev-4)' : 'var(--elev-3)',
          border: 'none',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-lg)',
          cursor: 'pointer',
          transition: 'box-shadow 0.18s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              flexShrink: 0,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-inset)',
              boxShadow: 'var(--elev-inset)',
              color: 'var(--primary)',
              fontFamily: "var(--font-mono)",
              fontSize: 16,
            }}
          >
            {project.icon}
          </span>
          {project.type === 'case-study' && <Badge tone="soft">{t(lang, 'caseStudy')}</Badge>}
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
