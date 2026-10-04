import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stamp } from '../design-system/ArchiveMarks'
import useIsMobile from '../shell/useIsMobile'
import { PROJ_TEXT, STATUTS, statutLabel, typeLabel, tailleLabel, formatDateShort } from './projetsText'

// Teinte kraft des onglets de classeur (D2) : même valeur que celle posée
// indépendamment dans src/lab/DossierParts.jsx (mission lab-dossiers, en
// parallèle) — ces deux fichiers ne s'importent pas l'un l'autre (D1),
// donc la constante est redéclarée ici plutôt que partagée.
const ONGLET_KRAFT = '#c9ae7c'

// Inclinaison du tampon de statut (D2) : une valeur par statut, pas un
// hasard à chaque rendu — sinon le tampon "saute" à chaque re-rendu.
const STATUT_TILT = {
  proposee: -4,
  gardee: -9,
  'en-cours': 6,
  faite: -7,
  arretee: 10,
}

// Même structure de hero que CaseHero (numéro, titre, sous-titre, tampon,
// enfants), seul le tampon change de libellé selon la rubrique.
// Numéro et sous-titre tapés à la machine (D6) ; le titre reste en
// --font-heading, plus lisible pour un texte qui peut être long.
export function ProjetsHero({ number, title, subtitle, children }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', padding: isMobile ? 'var(--space-md) var(--space-md)' : '18px var(--space-lg)', borderBottom: children ? 'var(--border-thin) solid var(--border)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-machine)",
              fontSize: 22,
              lineHeight: 1.2,
              color: 'var(--titre-lab)',
            }}
          >
            {number}
          </span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)', overflowWrap: 'anywhere' }}>
              {title}
            </h1>
            {subtitle && (
              <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, letterSpacing: '0.02em', color: 'var(--text2)' }}>{subtitle}</div>
            )}
          </div>
        </div>
        <Stamp label="MISRAN · LABS · PROJETS ·" size={isMobile ? 52 : 72} />
      </div>

      {children}
    </div>
  )
}

// Bandeau de tête d'une note (D3, D4) : même rôle que l'ancien bandeau du
// Magazine (supprimé depuis), redéclaré ici en Special Elite — D1
// permet de remplacer un élément d'habillage emprunté à une autre rubrique
// par un équivalent local plutôt que de modifier le fichier emprunté.
export function NoteMasthead({ backTo, backLabel, fileNo, center, right, rightSub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
      <div>
        <Link to={backTo} style={{ fontFamily: "var(--font-machine)", fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}>
          {backLabel}
        </Link>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 12, letterSpacing: '0.02em', color: 'var(--titre-lab)', marginTop: 'var(--space-2xs)' }}>{fileNo}</div>
      </div>
      <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.06em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {center}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 13, color: 'var(--text)' }}>{right}</div>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 10, color: 'var(--muted)' }}>{rightSub}</div>
      </div>
    </div>
  )
}

// Le tampon de statut d'une fiche bristol (D2) : taille et inclinaison
// d'un vrai tampon encreur, couleur et libellé du statut.
export function StampStatut({ statut, lang }) {
  const s = STATUTS[statut]
  const color = s?.color ?? 'var(--muted)'
  const border = s?.border ?? 'solid'
  const tilt = STATUT_TILT[statut] ?? 0

  return (
    <span
      style={{
        position: 'absolute',
        right: 14,
        bottom: 14,
        fontFamily: "var(--font-machine)",
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color,
        border: `2px ${border} ${color}`,
        padding: '4px 8px 3px',
        transform: `rotate(${tilt}deg)`,
        opacity: 0.85,
        background: 'color-mix(in srgb, var(--bg2) 85%, transparent)',
      }}
    >
      {statutLabel(statut, lang)}
    </span>
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
        fontFamily: "var(--font-machine)",
        fontSize: fontSize + 1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        border: `var(--border-thin) ${border} ${color}`,
        borderRadius: 'var(--radius-xs)',
        padding: 'var(--space-3xs) var(--space-xs)',
        background: 'var(--bg)',
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true" style={{ color, fontSize: 11, lineHeight: 1 }}>{s?.glyphe ?? '?'}</span>
      {statutLabel(statut, lang)}
    </span>
  )
}

// Filtre de statut en onglet de classeur (D2) : kraft au repos, papier et
// avancé quand actif — même logique que les onglets de dossier du Lab,
// redéclarée ici localement (D1 interdit d'importer src/lab/*).
export function StatusFilter({ statut, count, active, lang, onClick }) {
  const s = STATUTS[statut]
  const color = s?.color ?? 'var(--muted)'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "var(--font-machine)",
        fontSize: 12,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: active ? 'var(--text)' : '#3a2f1e',
        background: active ? 'var(--bg2)' : ONGLET_KRAFT,
        border: 'var(--border-thin) solid var(--border)',
        borderBottom: active ? 'var(--border-regular) solid var(--titre-lab)' : 'var(--border-thin) solid var(--border)',
        borderRadius: '4px 10px 0 0',
        padding: '7px var(--space-sm)',
        marginTop: active ? 0 : 4,
        minHeight: 32,
        cursor: 'pointer',
        fontWeight: active ? 700 : 400,
        transition: 'background 0.15s ease, margin-top 0.15s ease',
      }}
    >
      <span aria-hidden="true" style={{ color: active ? color : '#5a4a30', fontSize: 11, lineHeight: 1 }}>{s?.glyphe ?? '?'}</span>
      {statutLabel(statut, lang)}
      <span style={{ fontWeight: 400, color: active ? 'var(--muted)' : '#5a4a30' }}>· {count}</span>
    </button>
  )
}

function metaLine(idee, lang) {
  return `${typeLabel(idee.type, lang)} · ${tailleLabel(idee.taille, lang)} · ${formatDateShort(idee.date)}`
}

// Une fiche bristol du tiroir des idées (D2) : papier blanc à lignes
// fines bleues, trou de perforation, « P-NNN » tapé en gros, titre, méta,
// décision annotée à la main si elle existe, tampon de statut.
export function FicheBristol({ idee, lang }) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      to={`/projets/${idee.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          minHeight: 190,
          // Fond uni : les lignes bleues ne sont tracées que sous le résumé, au pas du texte
          background: hover ? 'var(--hover-tint)' : 'var(--bg2)',
          border: 'var(--border-thin) solid var(--border)',
          padding: '20px 16px 44px 34px',
          transition: 'background 0.15s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 13,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: 'var(--bg)',
            border: 'var(--border-thin) solid var(--border)',
          }}
        />

        <div style={{ fontFamily: "var(--font-machine)", fontSize: 22, lineHeight: 1, color: 'var(--titre-lab)', marginBottom: 6 }}>
          {idee.id}
        </div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, lineHeight: 1.25, color: 'var(--text)', marginBottom: 6, overflowWrap: 'anywhere' }}>
          {idee.titre[lang]}
        </div>
        <div style={{ fontFamily: "var(--font-machine)", fontSize: 11, letterSpacing: '0.02em', color: 'var(--text2)', paddingBottom: 8, marginBottom: 6, borderBottom: '2px solid color-mix(in srgb, var(--error) 55%, transparent)' }}>
          {metaLine(idee, lang)}
        </div>
        {/* Corps de la fiche : une ligne bleue tous les 22 px, même pas que le texte, qui se pose dessus */}
        <div style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 21px, color-mix(in srgb, var(--cyan) 30%, transparent) 21px 22px)' }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: '22px', color: 'var(--prose)', margin: 0 }}>
            {idee.resume[lang]}
          </p>
          {idee.decision?.note && (
            <p style={{ fontFamily: "var(--font-chapo)", fontStyle: 'italic', fontSize: 14, lineHeight: '22px', color: 'var(--text2)', margin: 0 }}>
              “{idee.decision.note[lang]}”
            </p>
          )}
        </div>

        <StampStatut statut={idee.statut} lang={lang} />
      </div>
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
        padding: isMobile ? 14 : 'var(--space-md-plus)',
        maxWidth: 720,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-xs)',
          borderBottom: 'var(--border-thin) dashed var(--error)',
          paddingBottom: 'var(--space-xs-plus)',
          marginBottom: 'var(--space-sm)',
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
