// Logo de la maison : la Fiole de la mascotte au trait vintage, une seule encre
// (inspiré d'une enseigne « Atomic Age »). Avec `avecTexte`, « MISRAN » et
// « — LABS — » en Chango sous la fiole ; sans, la fiole seule (en-tête, icône).
// L'encre suit `color` (currentColor) ; `fond` est la couleur du papier derrière,
// utilisée pour le verre et pour les yeux et le sourire découpés dans le liquide.
export default function LogoFiole({ largeur = 92, avecTexte = false, fond = 'var(--bg)', titre = 'Misran Labs' }) {
  const viewBox = avecTexte ? '0 0 240 268' : '70 -2 100 168'
  return (
    <svg
      viewBox={viewBox}
      width={largeur}
      role="img"
      aria-label={titre}
      style={{ display: 'block', height: 'auto', overflow: 'visible', '--fond': fond }}
    >
      {/* Bulles qui s'échappent du bouchon */}
      <g fill="currentColor">
        <circle cx="128" cy="28" r="6" />
        <circle cx="112" cy="16" r="4" />
        <circle cx="133" cy="6" r="3" />
      </g>
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Bouchon */}
        <rect x="102" y="42" width="36" height="20" rx="4" fill="currentColor" stroke="var(--fond)" strokeWidth="5" paintOrder="stroke" />
        {/* Verre : col et ventre rond */}
        <path d="M109 62 H131 V82 Q162 94 162 124 Q162 162 120 162 Q78 162 78 124 Q78 94 109 82 Z" fill="var(--fond)" stroke="currentColor" strokeWidth="7" />
        {/* Liquide, avec les yeux et le sourire de la mascotte */}
        <path d="M84 118 Q100 110 120 118 Q140 126 156 116 Q158 122 158 126 Q156 156 120 156 Q84 156 82 126 Q82 121 84 118 Z" fill="currentColor" />
        <ellipse cx="106" cy="130" rx="4.2" ry="6.5" fill="var(--fond)" />
        <ellipse cx="134" cy="130" rx="4.2" ry="6.5" fill="var(--fond)" />
        <path d="M112 143 Q120 150 128 143" fill="none" stroke="var(--fond)" strokeWidth="3.5" />
        {/* Reflet sur le verre */}
        <path d="M92 108 Q96 96 108 90" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="113" cy="74" r="2.5" fill="currentColor" />
      </g>
      {avecTexte && (
        <g transform="translate(120 236) skewX(-8) translate(-120 -236)" fill="currentColor" fontFamily="var(--font-logo)" textAnchor="middle">
          <text x="120" y="222" fontSize="38" textLength="192" lengthAdjust="spacingAndGlyphs">MISRAN</text>
          <text x="120" y="258" fontSize="23.5" letterSpacing="3">LABS</text>
          <rect x="52" y="241" width="34" height="6" rx="3" />
          <rect x="154" y="241" width="34" height="6" rx="3" />
        </g>
      )}
    </svg>
  )
}
