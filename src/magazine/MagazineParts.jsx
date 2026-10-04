import { Link } from 'react-router-dom'
import { categoryLabel, categoryColor } from './magazineText'

// Même bandeau que CaseMasthead (src/lab/CaseFile.jsx), mais le lien retour
// est paramétrable : CaseMasthead pointe toujours vers "/", ce qui ne
// convient pas à la page d'un numéro (retour vers /magazine).
export function MagazineMasthead({ backTo, backLabel, fileNo, center, right, rightSub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
      <div>
        <Link to={backTo} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {backLabel}
        </Link>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 'var(--space-2xs)' }}>{fileNo}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {center}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{right}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{rightSub}</div>
      </div>
    </div>
  )
}

// Marque de catégorie : un carré de couleur (repère de tri) + un libellé
// texte qui porte l'information à lui seul (lisible sans la couleur).
export function CategoryMark({ categorie, lang }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', color: 'var(--text2)', textTransform: 'uppercase', border: 'var(--border-thin) solid var(--border)', borderRadius: 'var(--radius-xs)', padding: 'var(--space-3xs) var(--space-xs)', background: 'var(--bg)' }}>
      <span aria-hidden="true" style={{ width: 8, height: 8, flexShrink: 0, background: categoryColor(categorie), border: 'var(--border-thin) solid var(--border)' }} />
      {categoryLabel(categorie, lang)}
    </span>
  )
}

