// Composants de l'armoire à dossiers confidentiels (refonte kiosque, D2-D4).
// Palette kraft dans caseChrome.js (KRAFT) : même choix de couleurs en dur
// que la couverture Lab du kiosque (KiosqueParts.CouvertureLab), inspirée
// sans être importée.
import { KRAFT } from './caseChrome'

const tapee = { fontFamily: 'var(--font-machine)' }

// Le tampon « ~~CONFIDENTIEL~~ DÉCLASSIFIÉ » (D2, D3) : texte barré en
// dessous, légende en vert --titre-lab, légèrement tourné.
export function TamponDeclassifie({ barre, bas, size = 'normal' }) {
  const petit = size === 'petit'
  return (
    <div
      aria-hidden="true"
      style={{
        ...tapee,
        display: 'inline-block',
        background: 'color-mix(in srgb, var(--titre-lab) 8%, transparent)',
        border: `${petit ? 2 : 3}px solid var(--titre-lab)`,
        color: 'var(--titre-lab)',
        fontSize: petit ? 10 : 17,
        lineHeight: 1,
        letterSpacing: '0.08em',
        padding: petit ? '4px 7px 3px' : '6px 10px 4px',
        transform: 'rotate(-10deg)',
        textAlign: 'center',
        opacity: 0.9,
        whiteSpace: 'nowrap',
      }}
    >
      <s>{barre}</s>
      <br />
      {bas}
    </div>
  )
}

// L'étiquette tapée à la machine, collée sur la chemise kraft (D2) : fond
// papier clair, filet au-dessus du corps du texte.
export function EtiquetteTapee({ titre, children }) {
  return (
    <div style={{ background: KRAFT.papier, border: 'var(--border-regular) solid var(--border)', padding: '12px 16px 10px', color: 'var(--text)' }}>
      {titre && (
        <h2 style={{ ...tapee, fontWeight: 400, fontSize: 22, lineHeight: 1, letterSpacing: '0.03em', margin: '0 0 6px' }}>{titre}</h2>
      )}
      <div style={{ ...tapee, fontSize: 13, lineHeight: 1.6, borderTop: titre ? 'var(--border-thin) solid var(--border)' : 'none', paddingTop: titre ? 6 : 0 }}>
        {children}
      </div>
    </div>
  )
}

// Un onglet de classeur (D3) : teinte kraft au repos, papier blanc et
// légèrement avancé quand il est actif — comme un intercalaire qu'on tire.
export function OngletClasseur({ children, active, onClick, index }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2xs)',
        flexShrink: 0,
        background: active ? 'var(--bg2)' : KRAFT.onglet,
        color: active ? 'var(--text)' : '#3a2f1e',
        border: 'var(--border-thin) solid var(--border)',
        borderBottom: active ? 'var(--border-regular) solid var(--titre-lab)' : 'var(--border-thin) solid var(--border)',
        borderRadius: '4px 10px 0 0',
        padding: '7px 10px',
        marginTop: active ? 0 : 4,
        cursor: 'pointer',
        ...tapee,
        fontSize: 12,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        fontWeight: active ? 700 : 400,
        whiteSpace: 'nowrap',
        transition: 'background 0.15s ease, margin-top 0.15s ease',
      }}
    >
      <span style={{ color: active ? 'var(--titre-lab)' : '#5a4a30' }}>
        {active ? '✛' : String(index + 1).padStart(2, '0')}
      </span>
      {children}
    </button>
  )
}
