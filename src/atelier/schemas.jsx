// Schémas SVG du livre « L'Atelier automatique », au trait, style bleu de
// plan (cyanotype) — repris et adaptés de screens/atelier-automatique.html
// (D3). Les quelques mots inscrits dans les tracés changent avec `lang`.

const TRAIT = { fill: 'none', stroke: '#e9f1f8', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

// Fig. 1 — vue éclatée de l'atelier (couverture) : trémie d'idées, machine
// centrale, sortie des pages, sept rouages = les sept agents.
export function SchemaEclateAtelier({ lang }) {
  const idees = lang === 'en' ? 'IDEAS' : 'IDÉES'
  const pages = lang === 'en' ? 'PAGES' : 'PAGES'
  return (
    <svg className="at-eclate" viewBox="0 0 300 220" {...TRAIT} fontFamily="Oswald" aria-label={lang === 'en' ? 'Exploded view of the workshop' : "Vue éclatée de l'atelier"}>
      <path d="M120 18 L180 18 L165 48 L135 48 Z" />
      <text x="150" y="12" fill="#e9f1f8" stroke="none" fontSize="7" textAnchor="middle" letterSpacing="1.5">{idees}</text>
      <path d="M150 48 L150 62" strokeDasharray="3 3" />
      <rect x="100" y="62" width="100" height="78" rx="3" />
      <rect x="108" y="70" width="44" height="28" rx="2" />
      <path d="M112 78 h10 M112 84 h22 M112 90 h16" strokeWidth="1.2" />
      <circle cx="175" cy="84" r="11" /><path d="M175 84 L182 78" strokeWidth="1.4" />
      <circle cx="120" cy="120" r="4" /><circle cx="135" cy="120" r="4" /><circle cx="150" cy="120" r="4" />
      <rect x="165" y="112" width="26" height="16" rx="1.5" />
      <text x="178" y="123" fill="#e9f1f8" stroke="none" fontSize="6.5" textAnchor="middle" fontWeight="700">CC</text>
      <path d="M200 120 L238 120 L246 140 L208 140 Z" />
      <path d="M212 126 L240 126 M214 132 L242 132" strokeWidth="1" />
      <text x="228" y="152" fill="#e9f1f8" stroke="none" fontSize="7" textAnchor="middle" letterSpacing="1.5">{pages}</text>
      <path d="M108 140 L104 152 M192 140 L196 152 M98 152 L202 152" />
      <g strokeWidth="5" strokeDasharray="3.2 3">
        <circle cx="42" cy="40" r="16" /><circle cx="34" cy="108" r="13" /><circle cx="60" cy="178" r="14" />
        <circle cx="150" cy="196" r="11" /><circle cx="252" cy="186" r="12" /><circle cx="262" cy="96" r="13" /><circle cx="250" cy="30" r="16" />
      </g>
      <g strokeWidth="1.4">
        <circle cx="42" cy="40" r="11" /><circle cx="34" cy="108" r="8.5" /><circle cx="60" cy="178" r="9.5" />
        <circle cx="150" cy="196" r="7" /><circle cx="252" cy="186" r="7.5" /><circle cx="262" cy="96" r="8.5" /><circle cx="250" cy="30" r="11" />
      </g>
      <g strokeDasharray="2 3" strokeWidth="1">
        <path d="M56 50 L104 70" /><path d="M47 106 L100 100" /><path d="M72 170 L110 146" />
        <path d="M150 185 L150 152" /><path d="M240 180 L196 146" /><path d="M249 98 L200 96" /><path d="M236 40 L196 66" />
      </g>
      <g fill="#e9f1f8" stroke="none" fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="42" y="44">1</text><text x="34" y="112">2</text><text x="60" y="182">3</text>
        <text x="150" y="200">4</text><text x="252" y="190">5</text><text x="262" y="100">6</text><text x="250" y="34">7</text>
      </g>
    </svg>
  )
}

// Fig. 2 — circuit d'une idée : Michael, la session, les routines et
// missions, les agents, les branches et pull requests, le site.
export function SchemaCircuit({ lang }) {
  const T = lang === 'en'
    ? ['ME', 'INTERACTIVE SESSION', 'ROUTINES & MISSIONS', 'AGENTS', 'BRANCH + PULL REQUEST', 'SITE']
    : ['MOI', 'SESSION INTERACTIVE', 'ROUTINES & MISSIONS', 'AGENTS', 'BRANCHE + PULL REQUEST', 'SITE']
  const boites = [
    { y: 14, h: 22, t: T[0] },
    { y: 50, h: 22, t: T[1] },
    { y: 86, h: 22, t: T[2] },
    { y: 122, h: 22, t: T[3] },
    { y: 158, h: 26, t: T[4] },
    { y: 198, h: 22, t: T[5] },
  ]
  return (
    <svg className="at-fig-plan" viewBox="0 0 220 230" {...TRAIT} fontFamily="Oswald" aria-label={lang === 'en' ? 'Circuit of an idea through the workshop' : "Circuit d'une idée dans l'atelier"}>
      {boites.map((b, i) => (
        <g key={i}>
          <rect x="20" y={b.y} width="180" height={b.h} rx="2" />
          <text x="110" y={b.y + b.h / 2 + 3} fill="#e9f1f8" stroke="none" fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="0.6">{b.t}</text>
        </g>
      ))}
      {boites.slice(0, -1).map((b, i) => (
        <path key={i} d={`M110 ${b.y + b.h} L110 ${boites[i + 1].y}`} strokeDasharray="3 3" markerEnd="url(#at-fleche)" />
      ))}
      <defs>
        <marker id="at-fleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#e9f1f8" stroke="none" />
        </marker>
      </defs>
    </svg>
  )
}

// Fig. 7 — le controleur en vue éclatée : poignée, corps, semelle gravée,
// empreinte tamponnée sur la pull request.
export function SchemaControleur({ lang }) {
  const tampon = lang === 'en' ? 'STAMPED' : 'TAMPONNÉ'
  return (
    <svg viewBox="0 0 200 230" {...TRAIT} fontFamily="Oswald" aria-label={lang === 'en' ? 'The controleur, exploded view' : 'Le controleur en vue éclatée'}>
      <ellipse cx="100" cy="26" rx="18" ry="6" />
      <path d="M82 26 C82 46 90 52 92 62 M118 26 C118 46 110 52 108 62" />
      <ellipse cx="100" cy="62" rx="8" ry="2.6" />
      <path d="M100 70 L100 86 M100 128 L100 146 M100 176 L100 190" strokeDasharray="3 3" strokeWidth="1" />
      <path d="M62 92 L138 92 L138 120 L62 120 Z" />
      <path d="M62 92 L76 86 L152 86 L138 92 M138 120 L152 114 L152 86" />
      <path d="M70 106 h52" strokeWidth="1" strokeDasharray="1 2.5" />
      <path d="M58 150 L142 150 L142 170 L58 170 Z" />
      <path d="M58 150 L72 144 L156 144 L142 150 M142 170 L156 164 L156 144" />
      <text x="100" y="164" fill="#e9f1f8" stroke="none" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">{tampon}</text>
      <path d="M40 196 L160 196 L170 226 L30 226 Z" strokeWidth="1.2" />
      <rect x="74" y="203" width="56" height="16" transform="rotate(-5 102 211)" strokeWidth="1.8" />
      <text x="102" y="215" fill="#e9f1f8" stroke="none" fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="1.5" transform="rotate(-5 102 211)">{tampon}</text>
      <g strokeWidth="1"><path d="M122 30 L168 30" /><path d="M156 100 L178 100" /><path d="M160 156 L178 156" /><path d="M164 210 L182 210" /></g>
      <g fill="#173d69" strokeWidth="1.4"><circle cx="176" cy="30" r="8" /><circle cx="186" cy="100" r="8" /><circle cx="186" cy="156" r="8" /><circle cx="190" cy="210" r="8" /></g>
      <g fill="#e9f1f8" stroke="none" fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="176" y="34">A</text><text x="186" y="104">B</text><text x="186" y="160">C</text><text x="190" y="214">D</text>
      </g>
    </svg>
  )
}

// Pictogrammes au trait, un par agent (sauf le controleur : fig. 7)
const PICTOS = {
  loupe: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <circle cx="40" cy="40" r="22" /><path d="M57 57 L78 78" strokeWidth="5" />
    </g>
  ),
  lunette: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <path d="M18 80 L68 28" strokeWidth="9" />
      <circle cx="72" cy="24" r="11" />
      <circle cx="15" cy="83" r="4" />
    </g>
  ),
  crayon: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <path d="M22 78 L58 22 L72 32 L36 88 Z" />
      <path d="M58 22 L72 32" />
      <path d="M22 78 L18 90 L30 86 Z" />
    </g>
  ),
  coche: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <circle cx="50" cy="50" r="30" />
      <path d="M36 50 L46 62 L66 36" strokeWidth="4" />
    </g>
  ),
  ecran: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <rect x="16" y="22" width="68" height="46" rx="2" />
      <path d="M24 32 h20 M24 42 h34 M24 52 h26" strokeWidth="1.4" />
      <path d="M42 68 L42 80 M58 68 L58 80 M30 80 h40" />
    </g>
  ),
  cle: (
    <g {...TRAIT} stroke="var(--at-trait)">
      <circle cx="22" cy="22" r="13" />
      <path d="M31 31 L76 76" strokeWidth="7" />
      <path d="M60 60 L67 53 M68 68 L75 61" strokeWidth="5" />
    </g>
  ),
}

export function Pictogramme({ nom }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {PICTOS[nom]}
    </svg>
  )
}
