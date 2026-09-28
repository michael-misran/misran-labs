import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MagazineMasthead } from '../magazine/MagazineParts'
import { CaseFooter } from '../lab/CaseFile'
import { CASE_CHROME } from '../lab/caseChrome'
import SectionTitle from '../design-system/SectionTitle'
import FlowDiagram from '../components/diagrams/FlowDiagram'
import { ProjetsHero } from './ProjetsParts'
import { FONCT_TEXT } from './fonctionnementText'

// Même bloc que `Pre` de src/lab/projects/UtilisationIA.jsx (copié, pas
// importé : on ne dépend pas d'un fichier du Lab). Le défilement horizontal
// reste dans le bloc, la page ne déborde jamais.
function Pre({ isMobile, children }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: isMobile ? 11 : 12,
        lineHeight: 1.6,
        color: 'var(--text2)',
        background: 'var(--bg2)',
        border: 'var(--border-thin) solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        margin: 0,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  )
}

// Texte avec des `extraits de code` entre accents graves.
function Rich({ text }) {
  return text.split('`').map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} style={{ fontFamily: "var(--font-mono)", fontSize: '0.9em', color: 'var(--text)', background: 'var(--bg2)', padding: '1px 5px', borderRadius: 'var(--radius-xs)', overflowWrap: 'anywhere' }}>
        {part}
      </code>
    ) : (
      part
    ),
  )
}

const PROSE = { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: 'var(--prose)', maxWidth: 720 }

function Paragraph({ text }) {
  return (
    <p style={{ ...PROSE, margin: '0 0 16px' }}>
      <Rich text={text} />
    </p>
  )
}

function NumberedList({ items }) {
  return (
    <ol style={{ ...PROSE, margin: '0 0 16px', paddingLeft: 22 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 8 }}>
          <Rich text={item} />
        </li>
      ))}
    </ol>
  )
}

function Levels({ items, isMobile }) {
  return (
    <ol style={{ listStyle: 'none', margin: '0 0 16px', padding: 0, display: 'grid', gap: 12, maxWidth: 720 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: isMobile ? 12 : 16, border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: isMobile ? 12 : 16 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1, color: 'var(--primary)' }}>
            {i + 1}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, lineHeight: 1.2, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--prose)' }}>
              <Rich text={item.text} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Cases({ items, isMobile }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 16, margin: '0 0 16px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: isMobile ? 14 : 20, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: 8 }}>
            {String.fromCharCode(65 + i)}
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, lineHeight: 1.25, color: 'var(--text)', marginBottom: 8, overflowWrap: 'anywhere' }}>{item.title}</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--prose)', margin: item.list ? '0 0 12px' : 0 }}>
            <Rich text={item.text} />
          </p>
          {item.list && (
            <ol style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--prose)', margin: 0, paddingLeft: 20 }}>
              {item.list.map((step, j) => (
                <li key={j} style={{ marginBottom: 8 }}>
                  <Rich text={step} />
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  )
}

function Block({ block, isMobile }) {
  switch (block.type) {
    case 'p':
      return <Paragraph text={block.text} />
    case 'levels':
      return <Levels items={block.items} isMobile={isMobile} />
    case 'tree':
      return (
        <div style={{ margin: '0 0 16px' }}>
          <Pre isMobile={isMobile}>{block.text}</Pre>
        </div>
      )
    case 'flow':
      // Vertical sur mobile (240 px de large, texte lisible), en grille sinon.
      return (
        <div style={{ margin: '0 0 16px' }}>
          <FlowDiagram steps={block.steps} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        </div>
      )
    case 'list':
      return <NumberedList items={block.items} />
    case 'cases':
      return <Cases items={block.items} isMobile={isMobile} />
    default:
      return null
  }
}

export default function ProjetsFonctionnement() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const t = FONCT_TEXT[lang]
  const chrome = CASE_CHROME[lang]

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <MagazineMasthead
        backTo="/projets"
        backLabel={t.backLabel}
        fileNo={t.fileNo}
        center={t.mastheadCenter}
        right={t.mastheadRight}
        rightSub={t.mastheadRightSub}
      />

      <ProjetsHero number={t.heroNumber} title={t.title} subtitle={t.subtitle} />

      {t.sections.map((section) => (
        <section key={section.id} style={{ marginBottom: 32 }}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} isMobile={isMobile} />
          ))}
        </section>
      ))}

      <Link to="/projets" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {t.backToList}
      </Link>

      <CaseFooter c={{ docId: t.docId, clearance: chrome.clearance, tagline: chrome.tagline }} />
    </div>
  )
}
