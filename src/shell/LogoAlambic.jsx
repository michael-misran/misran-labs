// Logo de la maison d'édition L'Alambic (essai) : un alambic au trait vintage,
// une seule encre, même facture que LogoFiole. La cucurbite garde le visage de
// la mascotte Fiole dans son liquide ; « L'ALAMBIC » en Chango dessous.
// L'encre suit `color` (currentColor) ; `fond` est la couleur du papier
// derrière (verre, cuivre, yeux et sourire découpés).
export default function LogoAlambic({ largeur = 92, fond = 'var(--bg)', titre = "L'Alambic" }) {
  return (
    <svg
      viewBox="0 0 240 232"
      width={largeur}
      role="img"
      aria-label={titre}
      style={{ display: 'block', height: 'auto', overflow: 'visible', '--fond': fond }}
    >
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Col de cygne : du chapiteau jusqu'au serpentin */}
        <path d="M106 46 Q150 22 180 82" fill="none" stroke="currentColor" strokeWidth="7" />
        {/* Col de la cucurbite */}
        <rect x="82" y="70" width="20" height="24" fill="var(--fond)" stroke="currentColor" strokeWidth="7" />
        {/* Chapiteau en bulbe, et son bouton */}
        <path d="M70 74 Q70 42 92 34 Q114 42 114 74 Z" fill="var(--fond)" stroke="currentColor" strokeWidth="7" />
        <circle cx="92" cy="28" r="5" fill="currentColor" />
        <path d="M80 66 Q80 52 90 46" fill="none" stroke="currentColor" strokeWidth="4" />
        {/* Cucurbite : la panse ronde */}
        <circle cx="92" cy="126" r="36" fill="var(--fond)" stroke="currentColor" strokeWidth="7" />
        {/* Liquide, avec les yeux et le sourire de la mascotte */}
        <path d="M58 128 Q75 120 92 128 Q109 136 126 126 A34 34 0 0 1 58 128 Z" fill="currentColor" />
        <ellipse cx="81" cy="141" rx="3.8" ry="5.8" fill="var(--fond)" />
        <ellipse cx="103" cy="141" rx="3.8" ry="5.8" fill="var(--fond)" />
        <path d="M86 151 Q92 157 98 151" fill="none" stroke="var(--fond)" strokeWidth="3.5" />
        {/* Reflet sur la panse */}
        <path d="M68 116 Q71 104 82 98" fill="none" stroke="currentColor" strokeWidth="4" />
        {/* Flammes sous la panse */}
        <g fill="currentColor">
          <path d="M78 186 Q69 176 76 166 Q78 174 84 176 Q88 182 78 186 Z" />
          <path d="M92 188 Q82 176 92 162 Q102 176 92 188 Z" />
          <path d="M106 186 Q96 182 100 176 Q106 174 108 166 Q115 176 106 186 Z" />
        </g>
        {/* Serpentin : cuve de refroidissement et spires du tube */}
        <rect x="164" y="80" width="32" height="46" rx="4" fill="var(--fond)" stroke="currentColor" strokeWidth="7" />
        <path d="M169 92 L191 98 M169 104 L191 110 M169 116 L191 122" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M180 126 V136" fill="none" stroke="currentColor" strokeWidth="5" />
        {/* La goutte distillée */}
        <path d="M180 140 Q186 148 180 152 Q174 148 180 140 Z" fill="currentColor" />
        {/* Petite fiole qui recueille le distillat */}
        <path d="M174 158 H186 V164 Q198 169 198 176 Q198 186 180 186 Q162 186 162 176 Q162 169 174 164 Z" fill="var(--fond)" stroke="currentColor" strokeWidth="5" />
        <path d="M165 177 Q180 173 195 177 Q194 184 180 184 Q166 184 165 177 Z" fill="currentColor" />
      </g>
      <g transform="translate(120 236) skewX(-8) translate(-120 -236)" fill="currentColor" fontFamily="var(--font-logo)" textAnchor="middle">
        <text x="120" y="222" fontSize="34" textLength="200" lengthAdjust="spacingAndGlyphs">L’ALAMBIC</text>
      </g>
    </svg>
  )
}
