// Logo de la maison d'édition 1977 Éditions : « 19 » sur « 77 » dans un bloc
// façon caractère de bois, et « ÉDITIONS » au pied. Maquettes : screens/logo-1977-situation.html.
// L'encre suit `color` (currentColor) ; `fond` est la couleur du papier
// derrière (chiffres découpés dans le bloc).
// La version `carre` (bloc seul, sans « éditions ») sert aux petits formats.

// Réglages de Fraunces : graisse maximale, empattements arrondis (« Soft »)
const CHIFFRES = {
  fontFamily: 'var(--font-1977)',
  fontWeight: 900,
  fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 0",
}

export default function Logo1977({
  largeur = 92,
  fond = 'var(--bg)',
  carre = false,
  titre = '1977 Éditions',
}) {
  const chiffres = (x, y1, y2, taille, longueur) => (
    <>
      <text x={x} y={y1} fill="var(--fond)" fontSize={taille} textAnchor="middle" textLength={longueur} lengthAdjust="spacingAndGlyphs" style={CHIFFRES}>19</text>
      <text x={x} y={y2} fill="var(--fond)" fontSize={taille} textAnchor="middle" textLength={longueur} lengthAdjust="spacingAndGlyphs" style={CHIFFRES}>77</text>
    </>
  )

  return (
    <svg
      viewBox={carre ? '0 0 240 240' : '0 0 240 280'}
      width={largeur}
      role="img"
      aria-label={titre}
      style={{ display: 'block', height: 'auto', overflow: 'visible', '--fond': fond }}
    >
      {carre ? (
        <>
          <rect x="10" y="10" width="220" height="220" rx="8" fill="currentColor" />
          {chiffres(120, 110, 208, 104, 180)}
        </>
      ) : (
        <>
          <rect x="20" y="20" width="200" height="200" rx="6" fill="currentColor" />
          {chiffres(120, 112, 202, 98, 164)}
          <text
            x="120"
            y="270"
            fill="currentColor"
            fontSize="30"
            textAnchor="middle"
            textLength="200"
            lengthAdjust="spacing"
            style={{ fontFamily: 'var(--font-etiquette)', fontWeight: 700 }}
          >
            ÉDITIONS
          </text>
        </>
      )}
    </svg>
  )
}
