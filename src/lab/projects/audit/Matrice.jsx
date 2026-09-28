import { FORMAT_LABEL_MONO } from './styles'
import { QUADRANTS } from '../../audit/priorites'

// Matrice impact × effort : 4 quadrants (une colonne sur téléphone), les sujets déjà agrégés par prioriser().
export default function Matrice({ priorites, c, lang }) {
  const t = c.grille
  return (
    <section aria-labelledby="audit-matrice-titre" style={{ marginBottom: 28 }}>
      <div id="audit-matrice-titre" style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>
        {t.matrixTitle}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 10px' }}>{t.matrixIntro}</p>

      {priorites.sujets.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: 0 }}>{t.noSubjects}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 10 }}>
          {QUADRANTS.map((q) => {
            const sujets = priorites.quadrants[q.id]
            return (
              <section key={q.id} aria-label={q.titre[lang]} style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)' }}>
                <header style={{ padding: '8px 14px', borderBottom: 'var(--border-thin) solid var(--border)', background: 'var(--bg3)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, margin: 0, color: 'var(--text)' }}>{q.titre[lang]}</h3>
                </header>
                {sujets.length === 0 ? (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', margin: 0, padding: '10px 14px' }}>{t.emptyQuadrant}</p>
                ) : (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {sujets.map((s) => (
                      <li key={s.id} style={{ padding: '8px 14px', borderBottom: 'var(--border-thin) solid var(--grid-line)' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)', lineHeight: 1.4, overflowWrap: 'anywhere' }}>{s.titre[lang]}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                          {s.compte} {s.unite[lang]} · {t.impact} {t.levels[s.impact]} · {t.effort} {t.levels[s.effort]}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      )}
    </section>
  )
}
