import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stamp } from '../design-system/ArchiveMarks'
import useIsMobile from '../shell/useIsMobile'
import { PROJ_TEXT, STATUTS, statutLabel, typeLabel, tailleLabel, formatDateShort } from './projetsText'

// Même bloc que MagazineHero (src/magazine/MagazineParts.jsx), seul le
// tampon change de libellé — la structure du hero (numéro, titre,
// sous-titre, tampon, enfants) est commune aux trois rubriques du site.
export function ProjetsHero({ number, title, subtitle, children }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: isMobile ? '16px 16px' : '18px 24px', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1,
              color: 'var(--primary)',
            }}
          >
            {number}
          </span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)', overflowWrap: 'anywhere' }}>
              {title}
            </h1>
            {subtitle && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.04em', color: 'var(--text2)' }}>{subtitle}</div>
            )}
          </div>
        </div>
        <Stamp label="MISRAN · LABS · PROJETS ·" size={isMobile ? 52 : 72} />
      </div>

      {children}
    </div>
  )
}

// Marque de statut à triple codage (glyphe + libellé texte + couleur) :
// le sens est toujours porté par le texte, la couleur n'est jamais le
// seul repère (D4 de la SPEC).
export function StatusMark({ statut, lang, size = 'sm' }) {
  const s = STATUTS[statut]
  const color = s?.color ?? 'var(--muted)'
  const border = s?.border ?? 'solid'
  const fontSize = size === 'md' ? 11 : 10

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        border: `var(--border-thin) ${border} ${color}`,
        borderRadius: 'var(--radius-xs)',
        padding: '2px 8px',
        background: 'var(--bg)',
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true" style={{ color, fontSize: 11, lineHeight: 1 }}>{s?.glyphe ?? '?'}</span>
      {statutLabel(statut, lang)}
    </span>
  )
}

export function StatusFilter({ statut, count, active, lang, onClick }) {
  const s = STATUTS[statut]
  const color = s?.color ?? 'var(--muted)'
  const border = s?.border ?? 'solid'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: active ? 'var(--text)' : 'var(--muted)',
        background: active ? 'var(--bg2)' : 'var(--bg3)',
        border: `var(--border-thin) ${active ? border : 'solid'} ${active ? color : 'var(--border)'}`,
        borderRadius: 'var(--radius-xs)',
        padding: '7px 12px',
        minHeight: 36,
        cursor: 'pointer',
        fontWeight: active ? 700 : 400,
      }}
    >
      <span aria-hidden="true" style={{ color: active ? color : 'var(--muted)', fontSize: 11, lineHeight: 1 }}>{s?.glyphe ?? '?'}</span>
      {statutLabel(statut, lang)}
      <span style={{ fontWeight: 400, color: 'var(--muted)' }}>· {count}</span>
    </button>
  )
}

function metaLine(idee, lang) {
  return `${typeLabel(idee.type, lang)} · ${tailleLabel(idee.taille, lang)} · ${formatDateShort(idee.date)}`
}

// Une ligne du registre des idées sur /projets — même logique de rangée
// que IssueRow du Magazine (registre d'archive = lignes, pas de fiches).
export function IdeaRow({ idee, lang }) {
  const isMobile = useIsMobile()
  const [hover, setHover] = useState(false)
  const arretee = idee.statut === 'arretee'

  return (
    <Link
      to={`/projets/${idee.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: isMobile ? 'block' : 'grid',
        gridTemplateColumns: isMobile ? undefined : '96px 1fr auto',
        columnGap: 20,
        alignItems: 'start',
        textDecoration: 'none',
        color: 'inherit',
        borderTop: 'var(--border-thin) solid var(--border)',
        padding: isMobile ? '14px 8px' : '18px 12px',
        background: hover ? 'var(--hover-tint)' : 'none',
        transition: 'background 0.15s ease',
      }}
    >
      {isMobile ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1, color: arretee ? 'var(--muted)' : 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
              {idee.id}
            </span>
            <StatusMark statut={idee.statut} lang={lang} />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: arretee ? 'var(--text2)' : 'var(--text)', marginTop: 8, overflowWrap: 'anywhere' }}>
            {idee.titre[lang]}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--prose)', margin: '6px 0 0' }}>
            {idee.resume[lang]}
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>
            {metaLine(idee, lang)}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1, color: arretee ? 'var(--muted)' : 'var(--primary)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', paddingTop: 2 }}>
            {idee.id}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: arretee ? 'var(--text2)' : 'var(--text)', overflowWrap: 'anywhere' }}>
              {idee.titre[lang]}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: 'var(--prose)', margin: '6px 0 0' }}>
              {idee.resume[lang]}
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>
              {metaLine(idee, lang)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StatusMark statut={idee.statut} lang={lang} />
            <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: 'var(--primary)' }}>→</span>
          </div>
        </>
      )}
    </Link>
  )
}

// Chargement des notes privées — dev uniquement (D5). `import.meta.glob`
// non eager : chaque fichier devient un import() séparé, jamais résolu
// hors développement (le composant renvoie null en dehors de DEV, avant
// même de lire `modules`).
const loadPrivateNotes = import.meta.env.DEV
  ? import.meta.glob('/src/private/projets/*.md', { query: '?raw', import: 'default' })
  : null

// `key={id}` côté appelant (ProjetIdee.jsx) force un remontage à chaque
// changement d'idée, pour que `content` reparte de son état initial.
export function PrivateNotes({ id, lang }) {
  const isMobile = useIsMobile()
  const loader = import.meta.env.DEV ? loadPrivateNotes[`/src/private/projets/${id}.md`] : null
  const [content, setContent] = useState(() => (loader ? undefined : null)) // undefined = en cours, null = absent
  const t = PROJ_TEXT[lang].prive

  useEffect(() => {
    if (!loader) return undefined
    let cancelled = false
    loader().then((text) => {
      if (!cancelled) setContent(text)
    }).catch(() => {
      if (!cancelled) setContent(null)
    })
    return () => { cancelled = true }
  }, [loader])

  if (!import.meta.env.DEV) return null

  return (
    <aside
      aria-label="Notes privées (local)"
      style={{
        border: 'var(--border-thick) dashed var(--error)',
        background: 'var(--bg3)',
        padding: isMobile ? 14 : 20,
        maxWidth: 720,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          borderBottom: 'var(--border-thin) dashed var(--error)',
          paddingBottom: 10,
          marginBottom: 12,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--error)' }}>
          {t.banner}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', overflowWrap: 'anywhere' }}>
          src/private/projets/{id}.md
        </span>
      </div>

      {content === undefined ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)' }}>{t.loading}</div>
      ) : content === null ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: 'var(--text2)', margin: 0 }}>{t.missing(id)}</p>
      ) : (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, color: 'var(--text)', margin: 0, background: 'transparent' }}>
          {content}
        </pre>
      )}
    </aside>
  )
}
