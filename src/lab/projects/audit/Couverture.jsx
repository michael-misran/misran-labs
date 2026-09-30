import { Tuile } from './ui'
import { FORMAT_LABEL_MONO } from './styles'

const MAX_FICHIERS_CITES = 3

function Liste({ titre, note, vide, c, elements }) {
  return (
    <section style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', marginBottom: 'var(--space-sm)' }}>
      <header style={{ padding: 'var(--space-xs) 14px', borderBottom: 'var(--border-thin) solid var(--border)', background: 'var(--bg3)' }}>
        <div style={FORMAT_LABEL_MONO}>{titre}</div>
        {note && <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: 'var(--space-2xs) 0 0' }}>{note}</p>}
      </header>
      {elements.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', margin: 0, padding: 'var(--space-xs-plus) 14px' }}>{vide ?? c.empty}</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {elements.map((e, i) => (
            <li
              key={i}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--space-3xs) var(--space-sm)', padding: 'var(--space-xs) 14px', borderBottom: 'var(--border-thin) solid var(--grid-line)' }}
            >
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', flex: '1 1 200px', minWidth: 0, overflowWrap: 'anywhere' }}>{e.principal}</code>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', overflowWrap: 'anywhere' }}>{e.secondaire}</span>
              {e.detail && (
                <span style={{ flexBasis: '100%', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', overflowWrap: 'anywhere' }}>{e.detail}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// Section « Couverture du code » : affiche le résultat de mesurerCouverture (D6).
// `couverture` = résultat du moteur + `source` { depot, branche, analyses, eligibles }.
export default function Couverture({ couverture, c }) {
  const t = c.cov
  const { source } = couverture
  const pourcent = couverture.taux === null ? '—' : `${Math.round(couverture.taux * 100)} %`

  const fichiers = couverture.parFichier.map((f) => ({
    principal: f.fichier,
    secondaire: `${t.hardShort(f.valeursEnDur)} · ${t.tokensShort(f.usagesTokens)}`,
  }))
  const repetees = couverture.valeursRepetees.map((v) => {
    const cites = v.fichiers.slice(0, MAX_FICHIERS_CITES).join(', ')
    const reste = v.fichiers.length - MAX_FICHIERS_CITES
    return {
      principal: v.valeur,
      secondaire: `${t.times(v.occurrences)} · ${t.inFiles(v.fichiers.length)}`,
      detail: reste > 0 ? `${cites} ${t.others(reste)}` : cites,
    }
  })
  const dejaTokenisees = couverture.dejaTokenisees.map((v) => ({
    principal: v.valeur,
    secondaire: `→ ${v.token} · ${t.times(v.occurrences)}`,
  }))
  const resteDeja = couverture.nombreDejaTokenisees - couverture.dejaTokenisees.length
  if (resteDeja > 0) dejaTokenisees.push({ principal: t.others(resteDeja), secondaire: '' })

  return (
    <section aria-labelledby="audit-couverture-titre" style={{ marginTop: 28, marginBottom: 'var(--space-lg)' }}>
      <div id="audit-couverture-titre" style={{ ...FORMAT_LABEL_MONO, marginBottom: 'var(--space-2xs)' }}>
        {t.title}
      </div>
      {source && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 'var(--space-xs-plus)', overflowWrap: 'anywhere' }}>
          {t.source(source.depot, source.branche, couverture.fichiersAnalyses, source.eligibles)}
        </div>
      )}

      {couverture.taux === null ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 var(--space-sm)' }}>{t.noValues}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs-plus)', marginBottom: 'var(--space-sm)' }}>
          <Tuile label={t.rate} valeur={pourcent} note={t.rateNote} />
          <Tuile label={t.usages} valeur={couverture.usagesTokens} note={t.usagesNote} />
          <Tuile label={t.hard} valeur={couverture.valeursEnDur} note={t.hardNote} />
        </div>
      )}

      <div style={{ border: 'var(--border-thin) solid var(--border)', borderLeft: 'var(--border-thick) solid var(--primary)', background: 'var(--bg2)', padding: 'var(--space-xs) 14px', marginBottom: 'var(--space-md)' }}>
        <div style={FORMAT_LABEL_MONO}>{t.methodTitle}</div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, margin: 'var(--space-2xs) 0 0', maxWidth: '75ch' }}>{t.method}</p>
      </div>

      <Liste c={t} titre={t.byFileTitle} elements={fichiers} />
      <Liste c={t} titre={t.repeatedTitle} elements={repetees} />
      <Liste c={t} titre={t.alreadyTitle} note={t.alreadyHint} elements={dejaTokenisees} />
    </section>
  )
}
