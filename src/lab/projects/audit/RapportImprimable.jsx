import { QUADRANTS } from '../../audit/priorites'
import { formaterNombre, texteMoyenne, texteNoteAxe, uniteSujet } from './rapportGrille'

const NB_CONSTATS = 10
const NB_FICHIERS_CITES = 8

// Rapport d'audit pour l'impression (« Exporter en PDF » = impression du navigateur).
// Masqué à l'écran par la classe `print-only` de Shell.jsx ; en impression, le reste
// de la page (`no-print`) disparaît. Fond clair, texte foncé, filets seulement : pas de couleur pleine.
export default function RapportImprimable({ c, lang, grille, priorites, resultat, couverture, contexte }) {
  const t = c.impression
  const g = c.grille
  const source = contexte?.source
  const noms = contexte?.noms ?? []
  const cites = noms.slice(0, NB_FICHIERS_CITES).join(', ')
  const reste = noms.length - NB_FICHIERS_CITES
  const texteSource = source
    ? t.sourceRepo(source.depot, source.branche)
    : noms.length > 0
      ? t.sourceFiles(reste > 0 ? `${cites} ${g.others(reste)}` : cites)
      : t.sourceNone
  const date = contexte?.date ? new Date(`${contexte.date}T12:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  const constats = resultat.constats.slice(0, NB_CONSTATS)

  const titre = { fontFamily: 'var(--font-heading)', fontSize: 16, margin: '18px 0 6px', color: 'var(--text)' }
  const cellule = { border: 'var(--border-thin) solid var(--border)', padding: '5px 8px', verticalAlign: 'top', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text)' }
  const paragraphe = { fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', margin: '0 0 4px' }

  return (
    <article className="print-only rapport-imprimable" aria-label={t.title} style={{ background: 'var(--bg)', color: 'var(--text)', padding: 24 }}>
      <style>{`
        @media print {
          .rapport-imprimable table { border-collapse: collapse; width: 100%; }
          .rapport-imprimable tr, .rapport-imprimable li { break-inside: avoid; }
          .rapport-imprimable h2 { break-after: avoid; }
        }
      `}</style>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, margin: '0 0 6px', color: 'var(--text)' }}>{c.title}</h1>
      <p style={paragraphe}>
        <strong>{t.sourceLabel}</strong> — {texteSource}
      </p>
      {date && (
        <p style={paragraphe}>
          <strong>{t.dateLabel}</strong> — {date}
        </p>
      )}
      <p style={{ ...paragraphe, fontSize: 14, marginTop: 8 }}>
        <strong>{texteMoyenne(grille, c, lang)}</strong>
      </p>

      <h2 style={titre}>{g.reportGrid}</h2>
      <table>
        <thead>
          <tr>
            <th style={cellule}>{g.colAxis}</th>
            <th style={cellule}>{g.colScore}</th>
            <th style={cellule}>{g.colComment}</th>
          </tr>
        </thead>
        <tbody>
          {grille.axes.map((axe) => (
            <tr key={axe.id}>
              <td style={cellule}>
                <strong>{axe.titre[lang]}</strong>
                <div style={{ fontSize: 10 }}>{axe.resume[lang]}</div>
              </td>
              <td style={cellule}>{texteNoteAxe(axe, c)}</td>
              <td style={{ ...cellule, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{axe.commentaire || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={titre}>{g.matrixTitle.charAt(0) + g.matrixTitle.slice(1).toLowerCase()}</h2>
      {priorites.sujets.length === 0 ? (
        <p style={paragraphe}>{g.noSubjects}</p>
      ) : (
        QUADRANTS.filter((q) => priorites.quadrants[q.id].length > 0).map((q) => (
          <div key={q.id} style={{ marginBottom: 6 }}>
            <div style={{ ...paragraphe, fontWeight: 700 }}>{q.titre[lang]}</div>
            <ul style={{ margin: '0 0 4px', paddingLeft: 18 }}>
              {priorites.quadrants[q.id].map((s) => (
                <li key={s.id} style={paragraphe}>
                  {s.titre[lang]} — {s.compte} {uniteSujet(s, lang)} ({g.impact} {g.levels[s.impact]}, {g.effort} {g.levels[s.effort]})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {constats.length > 0 && (
        <>
          <h2 style={titre}>{t.findingsTitle(constats.length)}</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {constats.map((k, i) => (
              <li key={i} style={paragraphe}>
                <strong>{c.severities[k.gravite]}</strong> · {k.regle} — {k.detail[lang] ?? k.detail.fr}
              </li>
            ))}
          </ul>
        </>
      )}

      {couverture && (
        <>
          <h2 style={titre}>{c.cov.reportTitle}</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li style={paragraphe}>
              {c.cov.reportRate} : {couverture.taux === null ? '—' : `${formaterNombre(Math.round(couverture.taux * 100), lang)} %`}
            </li>
            <li style={paragraphe}>
              {c.cov.reportUsages} : {couverture.usagesTokens}
            </li>
            <li style={paragraphe}>
              {c.cov.reportHard} : {couverture.valeursEnDur}
            </li>
          </ul>
        </>
      )}

      <h2 style={titre}>{t.methodTitle}</h2>
      <ol style={{ margin: 0, paddingLeft: 18 }}>
        {t.method.map((ligne, i) => (
          <li key={i} style={paragraphe}>
            {ligne}
          </li>
        ))}
      </ol>

      <p style={{ ...paragraphe, marginTop: 18, paddingTop: 8, borderTop: 'var(--border-thin) solid var(--border)', fontSize: 10 }}>{t.footer}</p>
    </article>
  )
}
