import { useState } from 'react'
import { Bouton } from './ui'
import { FORMAT_LABEL_MONO } from './styles'
import { echecsContraste, formaterNombre, texteMoyenne, texteNote } from './rapportGrille'

const NOTES = [0, 1, 2, 3]

// Barre de 3 segments : autant de segments pleins que la note.
function Jauge({ note }) {
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3 }}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 18,
            height: 8,
            border: 'var(--border-thin) solid var(--border)',
            background: note !== null && i <= note ? 'var(--primary)' : 'transparent',
          }}
        />
      ))}
    </span>
  )
}

function EditeurAjustement({ axe, c, lang, onValider, onAnnuler }) {
  const t = c.grille
  const [note, setNote] = useState(axe.noteFinale === null ? 'na' : String(axe.noteFinale))
  const [commentaire, setCommentaire] = useState(axe.commentaire)
  const nom = `note-${axe.id}`

  return (
    <div style={{ borderTop: 'var(--border-thin) solid var(--grid-line)', background: 'var(--bg)', padding: '12px 14px' }}>
      <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 8 }}>
        {t.adjustTitle} — {axe.titre[lang]}
      </div>
      <fieldset style={{ border: 'none', margin: '0 0 10px', padding: 0 }}>
        <legend style={{ ...FORMAT_LABEL_MONO, padding: 0, marginBottom: 6 }}>{t.noteLabel}</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[...NOTES.map(String), 'na'].map((valeur) => (
            <label
              key={valeur}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text)',
                border: `var(--border-thin) solid ${note === valeur ? 'var(--primary)' : 'var(--border)'}`,
                background: note === valeur ? 'var(--bg2)' : 'var(--bg3)',
                padding: '6px 10px',
                cursor: 'pointer',
              }}
            >
              <input type="radio" name={nom} value={valeur} checked={note === valeur} onChange={() => setNote(valeur)} />
              {valeur === 'na' ? t.notRated : valeur}
            </label>
          ))}
        </div>
      </fieldset>
      <label style={{ display: 'block' }}>
        <span style={{ ...FORMAT_LABEL_MONO, display: 'block', marginBottom: 6 }}>{t.commentLabel}</span>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder={t.commentPlaceholder}
          rows={3}
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            lineHeight: 1.5,
            color: 'var(--text)',
            background: 'var(--bg2)',
            border: 'var(--border-thin) solid var(--border)',
            padding: 8,
            resize: 'vertical',
          }}
        />
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        <Bouton principal onClick={() => onValider({ note: note === 'na' ? null : Number(note), commentaire })}>
          {t.apply}
        </Bouton>
        <Bouton onClick={() => onValider(null)}>{t.reset}</Bouton>
        <Bouton onClick={onAnnuler}>{t.cancel}</Bouton>
      </div>
    </div>
  )
}

function CarteAxe({ axe, c, lang, contrastes, onAjuster }) {
  const t = c.grille
  const [edition, setEdition] = useState(false)
  const echecs = axe.id === 'accessibilite' ? echecsContraste(contrastes) : null
  const idTitre = `audit-axe-${axe.id}`
  const grise = axe.noteFinale === null

  return (
    <section
      aria-labelledby={idTitre}
      style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', opacity: grise ? 0.85 : 1 }}
    >
      <header style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 12px' }}>
        <h3 id={idTitre} style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0, color: 'var(--text)', flex: '1 1 180px' }}>
          {axe.titre[lang]}
        </h3>
        <Jauge note={axe.noteFinale} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 700,
            color: grise ? 'var(--muted)' : 'var(--text)',
            whiteSpace: 'nowrap',
          }}
        >
          {texteNote(axe.noteFinale, c)}
        </span>
        {axe.ajustee && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', border: 'var(--border-thin) solid var(--primary)', padding: '2px 6px', whiteSpace: 'nowrap' }}>
            {t.adjustedTag}
          </span>
        )}
        {axe.ajustee && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
            {t.computedNote(texteNote(axe.note, c))}
          </span>
        )}
        <Bouton onClick={() => setEdition((e) => !e)} aria-expanded={edition} style={{ padding: '4px 10px' }}>
          {t.adjust}
        </Bouton>
      </header>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: 0, padding: '0 14px 10px' }}>{axe.resume[lang]}</p>

      {axe.commentaire && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--prose)', lineHeight: 1.5, margin: '0 14px 10px', padding: '6px 10px', borderLeft: 'var(--border-thick) solid var(--primary)', background: 'var(--bg)', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>
          {axe.commentaire}
        </p>
      )}

      {axe.criteres.length > 0 && (
        <ul aria-label={t.criteria} style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: 'var(--border-thin) solid var(--grid-line)' }}>
          {axe.criteres.map((cr) => {
            const etat = cr.ok === null ? 'na' : cr.ok ? 'ok' : 'ko'
            return (
              <li
                key={cr.id}
                style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '7px 14px', borderBottom: 'var(--border-thin) solid var(--grid-line)' }}
              >
                <span
                  role="img"
                  aria-label={t.markLabels[etat]}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: etat === 'ko' ? 'var(--error)' : etat === 'ok' ? 'var(--text)' : 'var(--muted)', flexShrink: 0, width: 14 }}
                >
                  {t.marks[etat]}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: etat === 'na' ? 'var(--muted)' : 'var(--prose)', lineHeight: 1.5, overflowWrap: 'anywhere' }}>{cr.detail[lang]}</span>
              </li>
            )
          })}
        </ul>
      )}

      {echecs && echecs.affiches.length > 0 && (
        <div style={{ padding: '10px 14px', borderTop: 'var(--border-thin) solid var(--grid-line)' }}>
          <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>{t.contrastFailures(contrastes.echecs)}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {echecs.affiches.map((p, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', padding: '2px 0', overflowWrap: 'anywhere' }}>
                {t.contrastLine(p.texte, p.fond, formaterNombre(p.ratio, lang))}
                {p.contexte ? ` · ${p.contexte}` : ''}
              </li>
            ))}
          </ul>
          {echecs.reste > 0 && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{t.others(echecs.reste)}</div>}
        </div>
      )}

      {edition && (
        <EditeurAjustement
          axe={axe}
          c={c}
          lang={lang}
          onAnnuler={() => setEdition(false)}
          onValider={(ajustement) => {
            onAjuster(axe.id, ajustement)
            setEdition(false)
          }}
        />
      )}
    </section>
  )
}

// Grille d'évaluation : `grille` est le résultat de appliquerAjustements (noteFinale, ajustee, commentaire).
export default function Grille({ grille, contrastes, c, lang, onAjuster }) {
  const t = c.grille
  return (
    <section aria-labelledby="audit-grille-titre" style={{ marginBottom: 28 }}>
      <div id="audit-grille-titre" style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>
        {t.title}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 10px' }}>{t.intro}</p>
      <div
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, color: 'var(--text)', border: 'var(--border-thin) solid var(--border)', borderLeft: 'var(--border-thick) solid var(--primary)', background: 'var(--bg2)', padding: '10px 14px', marginBottom: 12 }}
      >
        {texteMoyenne(grille, c, lang)}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {grille.axes.map((axe) => (
          <CarteAxe key={axe.id} axe={axe} c={c} lang={lang} contrastes={contrastes} onAjuster={onAjuster} />
        ))}
      </div>
    </section>
  )
}
