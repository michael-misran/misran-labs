// Composants de la salle d'arcade rétro (refonte kiosque, D2-D4). Couleurs
// d'écran cathodique en dur (#0b1a10 etc.), pas de token dédié : même choix
// que la couverture Jeux du kiosque (KiosqueParts.CouvertureJeux), inspirée
// sans être importée.
import { Link } from 'react-router-dom'

const pixel = { fontFamily: 'var(--font-pixel)', fontWeight: 400 }
const ecran = { fontFamily: 'var(--font-ecran)', fontWeight: 400 }

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
