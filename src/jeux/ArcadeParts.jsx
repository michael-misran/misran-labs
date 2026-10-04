// Composants de la salle d'arcade rétro (refonte kiosque, D2-D4). Couleurs
// d'écran cathodique en dur (#0b1a10 etc.), pas de token dédié : même choix
// que la couverture Jeux du kiosque (KiosqueParts.CouvertureJeux), inspirée
// sans être importée.
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jt } from './jeuxText'

const pixel = { fontFamily: 'var(--font-pixel)', fontWeight: 400 }
const ecran = { fontFamily: 'var(--font-ecran)', fontWeight: 400 }

// L'envahisseur en pixels (carré de 4px répété en box-shadow), repris du
// motif de CouvertureJeux côté kiosque.
function Envahisseur() {
  // Cadre à la taille réelle du dessin (44 × 32 px agrandi 2,4 fois) : le point
  // de 4 px seul ne réservait pas sa place et chevauchait « INSERT COIN »
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: 106, height: 77, flexShrink: 0 }}>
    <div
      style={{
        width: 4,
        height: 4,
        color: 'var(--titre-jeux)',
        transform: 'scale(2.4)',
        transformOrigin: '0 0',
        boxShadow: `8px 0, 32px 0, 12px 4px, 28px 4px, 8px 8px, 12px 8px, 16px 8px, 20px 8px, 24px 8px, 28px 8px, 32px 8px,
          4px 12px, 8px 12px, 16px 12px, 20px 12px, 24px 12px, 32px 12px, 36px 12px,
          0 16px, 4px 16px, 8px 16px, 12px 16px, 16px 16px, 20px 16px, 24px 16px, 28px 16px, 32px 16px, 36px 16px, 40px 16px,
          0 20px, 8px 20px, 12px 20px, 16px 20px, 20px 20px, 24px 20px, 28px 20px, 32px 20px, 40px 20px,
          0 24px, 8px 24px, 32px 24px, 40px 24px, 12px 28px, 16px 28px, 24px 28px, 28px 28px`,
      }}
    />
    </div>
  )
}

// La borne (D2) : écran cathodique, scores décoratifs, envahisseur,
// « INSERT COIN » clignotant. Titre en --font-pixel orange.
export function EcranCathodique({ lang }) {
  return (
    <header
      style={{
        background: '#111',
        border: '3px solid var(--border)',
        boxShadow: '8px 8px 0 var(--primitive-encre-a18)',
        padding: 'var(--space-md-plus)',
        marginBottom: 'var(--space-xl)',
      }}
    >
      <div style={{ ...pixel, fontSize: 'clamp(20px, 4vw, 32px)', color: 'var(--titre-jeux)', textAlign: 'center', marginBottom: 14 }}>
        {jt(lang, 'arcadeTitre')}
      </div>
      <div
        style={{
          background: '#0b1a10',
          border: '4px solid #2a2a2a',
          borderRadius: '14px / 18px',
          minHeight: 160,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 28px rgba(0,0,0,.9)',
          // Colonne : l'envahisseur puis « INSERT COIN » dessous, sans chevauchement
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          padding: '36px 14px 16px',
        }}
      >
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,.35) 0 1px, transparent 1px 3px)' }}
        />
        <div style={{ position: 'absolute', top: 10, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', ...pixel, fontSize: 11, color: '#7dff9a' }}>
          <span>1UP 000300</span>
          <span>HI 999990</span>
        </div>
        <Envahisseur />
        <div className="arcade-blink" style={{ position: 'relative', ...pixel, fontSize: 13, color: '#ffd84a' }}>
          INSERT COIN
        </div>
      </div>
    </header>
  )
}

// L'écran « SELECT GAME » (D2) : menu vertical navigable au clavier
// (flèches + Entrée), curseur ▶ clignotant sur la ligne survolée/sélectionnée,
// accroche affichée dessous. Chaque ligne reste un <Link> réel.
export function MenuSelectGame({ jeux, lang }) {
  const [selection, setSelection] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    function onKeyDown(e) {
      if (jeux.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelection((s) => (s + 1) % jeux.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelection((s) => (s - 1 + jeux.length) % jeux.length)
      } else if (e.key === 'Enter' && !e.target.closest?.('a, button, input, textarea, select')) {
        // Entrée sur un lien ou un bouton déjà focalisé garde son comportement normal
        navigate(`/jeux/${jeux[selection].slug}`)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [jeux, selection, navigate])

  if (jeux.length === 0) return null
  const courant = jeux[selection]

  return (
    <section style={{ marginBottom: 'var(--space-xl)' }}>
      <div style={{ ...pixel, fontSize: 12, color: 'var(--titre-jeux)', textAlign: 'center', marginBottom: 10 }}>
        SELECT GAME
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: '3px double var(--border)' }}>
        {jeux.map((jeu, i) => (
          <li key={jeu.slug} style={{ borderBottom: i < jeux.length - 1 ? '1px dotted var(--border)' : 'none' }}>
            <Link
              to={`/jeux/${jeu.slug}`}
              onMouseEnter={() => setSelection(i)}
              onFocus={() => setSelection(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                textDecoration: 'none',
                color: 'var(--text)',
                background: i === selection ? 'color-mix(in srgb, var(--titre-jeux) 10%, transparent)' : 'transparent',
              }}
            >
              <span aria-hidden="true" className="arcade-cursor" style={{ width: '1em', color: 'var(--titre-jeux)', visibility: i === selection ? 'visible' : 'hidden' }}>
                ▶
              </span>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{jeu.icone}</span>
              <span style={{ ...ecran, fontSize: 22, textTransform: 'uppercase' }}>{jeu.titre[lang]}</span>
            </Link>
          </li>
        ))}
      </ul>
      {courant && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', textAlign: 'center', margin: '10px 0 0' }}>
          {courant.accroche[lang]}
        </p>
      )}
    </section>
  )
}

// Boîte de jeu en jaquette de cartouche (D2). Le pied garde l'indication
// « joué aujourd'hui »/« nouveau défi » déjà affichée avant la refonte.
export function BoiteJeu({ jeu, lang, joue }) {
  return (
    <Link to={`/jeux/${jeu.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="arcade-boite"
        style={{
          height: '100%',
          border: '3px solid var(--border)',
          boxShadow: '5px 5px 0 var(--primitive-encre-a18)',
          background: '#111',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          color: '#f4f0e6',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ fontSize: 34, lineHeight: 1 }}>{jeu.icone}</div>
        <h2 style={{ ...pixel, fontSize: 15, lineHeight: 1.3, color: 'var(--titre-jeux)', margin: 0 }}>{jeu.titre[lang]}</h2>
        <p style={{ ...ecran, fontSize: 17, lineHeight: 1.2, color: '#d8d4c8', margin: 0, flex: 1 }}>{jeu.accroche[lang]}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dotted #555', paddingTop: 8, ...pixel, fontSize: 7, color: '#aaa' }}>
          <span>{jt(lang, 'joueur1')} · 0 € · {jt(lang, 'zeroPub')}</span>
        </div>
        <span
          style={{
            alignSelf: 'center',
            ...pixel,
            fontSize: 9,
            color: joue ? '#7dff9a' : '#ffd84a',
            border: '2px solid currentColor',
            padding: '5px 10px',
          }}
        >
          {joue ? jt(lang, 'joueAujourdhui') : 'PRESS START'}
        </span>
      </div>
    </Link>
  )
}

// La barre de jeu de /jeux/:slug (D3) : retour au menu, titre, accroche.
export function BarreJeu({ jeu, lang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 'var(--space-md-plus)' }}>
      <Link to="/jeux" style={{ ...pixel, fontSize: 10, color: 'var(--titre-jeux)', textDecoration: 'none' }}>
        ◀ MENU
      </Link>
      <h1 style={{ ...pixel, fontSize: 'clamp(14px, 2.4vw, 18px)', color: 'var(--text)', margin: 0 }}>{jeu.titre[lang]}</h1>
      <span style={{ ...ecran, fontSize: 18, color: 'var(--text2)' }}>{jeu.accroche[lang]}</span>
    </div>
  )
}

// Le cadre de borne (D3) autour du jeu : bordure épaisse arrondie, coins à
// vis en CSS. Fond clair à l'intérieur, car les jeux supposent un fond clair.
export function CadreBorne({ children }) {
  const vis = {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #ddd, #999 60%, #666)',
    boxShadow: 'inset 0 0 2px rgba(0,0,0,.6)',
  }

  return (
    <div
      style={{
        position: 'relative',
        border: '6px solid #2a2a2a',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg)',
        padding: 'var(--space-md-plus)',
      }}
    >
      <span aria-hidden="true" style={{ ...vis, top: 6, left: 6 }} />
      <span aria-hidden="true" style={{ ...vis, top: 6, right: 6 }} />
      <span aria-hidden="true" style={{ ...vis, bottom: 6, left: 6 }} />
      <span aria-hidden="true" style={{ ...vis, bottom: 6, right: 6 }} />
      {children}
    </div>
  )
}
