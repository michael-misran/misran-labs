import { useState } from 'react'
import { Bouton } from './ui'
import { emplacementTexte } from './rapportTexte'

const AFFICHAGE_INITIAL = 25 // constats affichés par règle avant « Afficher les autres »

const ACCENT_GRAVITE = {
  erreur: 'var(--error)',
  avertissement: 'var(--warning)',
  info: 'var(--text2)',
}

export function PastilleGravite({ gravite, label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        border: `var(--border-thin) solid ${ACCENT_GRAVITE[gravite]}`,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT_GRAVITE[gravite], flexShrink: 0 }} />
      {label}
    </span>
  )
}

export function FiltreGravite({ gravite, label, nombre, actif, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: actif ? 'var(--text)' : 'var(--muted)',
        background: actif ? 'var(--bg2)' : 'var(--bg3)',
        border: `var(--border-thin) solid ${actif ? ACCENT_GRAVITE[gravite] : 'var(--border)'}`,
        padding: '7px 12px',
        cursor: 'pointer',
        fontWeight: actif ? 700 : 400,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: actif ? ACCENT_GRAVITE[gravite] : 'transparent',
          border: `1px solid ${ACCENT_GRAVITE[gravite]}`,
          flexShrink: 0,
        }}
      />
      {label} · {nombre}
    </button>
  )
}

export function GroupeRegle({ groupe, c, lang }) {
  const [tout, setTout] = useState(false)
  const visibles = tout ? groupe.constats : groupe.constats.slice(0, AFFICHAGE_INITIAL)
  const reste = groupe.constats.length - visibles.length
  const regle = c.rules[groupe.id]

  return (
    <section style={{ border: 'var(--border-thin) solid var(--border)', marginBottom: 16, background: 'var(--bg2)' }}>
      <header style={{ padding: '10px 14px', borderBottom: 'var(--border-thin) solid var(--border)', background: 'var(--bg3)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>{groupe.id}</span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0, color: 'var(--text)' }}>{regle.titre}</h3>
          {groupe.gravites.map((g) => (
            <PastilleGravite key={g} gravite={g} label={c.severities[g]} />
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{c.findingsCount(groupe.constats.length)}</span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: '6px 0 0', maxWidth: '75ch' }}>
          {regle.explication}
        </p>
      </header>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {visibles.map((k, i) => {
          const lieu = emplacementTexte(k, c)
          const noms = k.tokens.slice(0, 6)
          return (
            <li
              key={i}
              style={{
                padding: '10px 14px',
                borderBottom: 'var(--border-thin) solid var(--grid-line)',
                borderLeft: `var(--border-thick) solid ${ACCENT_GRAVITE[k.gravite]}`,
              }}
            >
              {noms.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                  {noms.map((n, j) => (
                    <code
                      key={j}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text)',
                        background: 'var(--bg3)',
                        border: 'var(--border-thin) solid var(--border)',
                        padding: '1px 6px',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {n}
                    </code>
                  ))}
                  {k.tokens.length > noms.length && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{c.moreTokens(k.tokens.length - noms.length)}</span>
                  )}
                </div>
              )}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--prose)', lineHeight: 1.5, margin: 0, overflowWrap: 'anywhere' }}>
                {k.detail[lang] ?? k.detail.fr}
              </p>
              {lieu && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 4, overflowWrap: 'anywhere' }}>{lieu}</div>
              )}
            </li>
          )
        })}
      </ul>
      {reste > 0 && (
        <div style={{ padding: '10px 14px' }}>
          <Bouton onClick={() => setTout(true)}>{c.showMore(reste)}</Bouton>
        </div>
      )}
    </section>
  )
}
