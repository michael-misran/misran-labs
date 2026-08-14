import useIsMobile from '../shell/useIsMobile'

function SectionHeader({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--teal)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {`// ${children.toUpperCase()}`}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>{item.label} : </strong>
          {item.text}
        </li>
      ))}
    </ul>
  )
}

function RoleHeader({ title, date, size = 13 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: size, fontWeight: 600, color: 'var(--text)' }}>
        {title}
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
        {date}
      </span>
    </div>
  )
}

const CONCENTRIX_BULLETS = [
  { label: 'Innovation IA & Automatisation', text: "Pionnier de l'intégration de l'IA générative dans le workflow de design. Configuration d'outils avancés (Figma MCP, agents IA) pour automatiser la production et accélérer l'idéation." },
  { label: 'Pipeline Design-to-Code (GitHub)', text: 'Connexion directe de Figma aux dépôts GitHub avec la Lead Tech. Synchronisation automatique des Design Tokens, garantissant la cohérence en production.' },
  { label: 'Gouvernance & Scalabilité', text: "Conception et maintenance d'un Design System multi-marques pour accélérer le Time-to-Market." },
  { label: 'Alignement International', text: "Animation d'ateliers de co-conception avec les PO, PM et Tech Leads sur 3 zones (Europe, Amérique, Inde), pour fluidifier la prise de décision produit à l'échelle internationale." },
]

const IAD_DESIGN_BULLETS = [
  { label: 'Pivot Produit Interne', text: "Accompagnement de la transition vers une culture produit et industrialisation de l'écosystème applicatif." },
  { label: "Conception d'Applications Métiers", text: 'Lead design sur les outils de facturation, suivi de rémunération, moteurs de rapprochement.' },
  { label: 'Démarche Centrée Utilisateur', text: "Animation d'ateliers de recherche, prototypage et sessions de tests utilisateurs." },
]

const IAD_DEV_BULLETS = [
  { label: 'Ingénierie Logicielle', text: 'Développement et architecture d\'applications web scalables (PHP, MySQL, Zend, CodeIgniter, JS).' },
  { label: 'Cadrage & Spécifications', text: 'Traduction des besoins métiers en spécifications fonctionnelles et techniques détaillées.' },
]

export default function CVModule() {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        fontFamily: "'Inter', sans-serif",
        color: 'var(--text)',
        maxWidth: 820,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--teal)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {'// CV'}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            margin: '0 0 6px',
          }}
        >
          Michael Misran
        </h1>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--teal)', marginBottom: 14 }}>
          Senior Product Designer · DesignOps & AI Strategy
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', fontSize: 12, color: 'var(--text2)' }}>
          <span>📍 Paris & Périphérie (Hybride / Remote)</span>
          <span>✉️ misranmichael@gmail.com</span>
          <span>📱 06 07 69 75 17</span>
          <a href="https://www.linkedin.com/in/michael-misran" target="_blank" rel="noreferrer" style={{ color: 'var(--teal)', textDecoration: 'none' }}>
            🔗 LinkedIn
          </a>
        </div>
      </div>

      {/* Profil */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>Profil</SectionHeader>
        <p style={{ fontSize: 13.5, color: 'var(--prose)', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: 'var(--text)' }}>Product Designer Senior au profil hybride</strong>, appuyé sur
          un socle technique de 7 ans en développement Full-Stack. Spécialiste de l'industrialisation des
          écosystèmes design (DesignOps, Design Systems), de l'automatisation par l'Intelligence Artificielle
          (Figma MCP, agents custom) et du rapprochement Design-to-Code (Tokens, CI/CD GitHub). Expérience
          confirmée dans le pilotage de la stratégie produit au sein d'environnements internationaux complexes
          et distribués. Process de conception et arbitrages documentés en continu sur ce lab personnel.
        </p>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>Expertise & compétences clés</SectionHeader>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px 24px' }}>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>DesignOps & IA Strategy : </strong>
            Workflows IA générative, Figma MCP, création d'agents custom, automatisation de production.
          </div>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Product Design & Systems : </strong>
            Architecture de composants, Design Tokens, gouvernance, UX Research, UX/UI.
          </div>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Design-to-Code & Tooling : </strong>
            Intégration GitHub, modélisation JSON/Tokens, suppression de la dette de handoff.
          </div>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Stack Technique : </strong>
            Figma (Variables, Auto-layout), GitHub, JS/HTML/CSS, architecture logicielle.
          </div>
        </div>
      </div>

      {/* Expérience */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>Expériences professionnelles</SectionHeader>

        <div style={{ marginBottom: 28 }}>
          <RoleHeader title="Concentrix — Product Designer Senior" date="Mai 2024 – Août 2026" />
          <Bullets items={CONCENTRIX_BULLETS} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <RoleHeader title="IAD France" date="Févr. 2011 – Oct. 2023" />

          <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)', marginBottom: 16 }}>
            <RoleHeader title="UI-UX Designer / Product Designer" date="Janv. 2018 – Oct. 2023" size={13} />
            <Bullets items={IAD_DESIGN_BULLETS} />
          </div>

          <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)' }}>
            <RoleHeader title="Développeur Full Stack" date="Févr. 2011 – Janv. 2018" size={13} />
            <Bullets items={IAD_DEV_BULLETS} />
          </div>
        </div>

        <div>
          <RoleHeader title="Plan-net & MEMOBOX — Concepteur Technique & Développeur Web" date="2007 – 2011" />
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
            Discovery produit, développement d'applications d'analyse et scripts sur-mesure (JavaScript, PHP).
          </p>
        </div>
      </div>

      {/* Formation */}
      <div>
        <SectionHeader>Formation</SectionHeader>
        <RoleHeader title="BTS Informatique Industrielle — Info-Sup" date="1998 – 2000" />
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
          Projet : logiciel de reconnaissance faciale en C++.
        </p>
      </div>
    </div>
  )
}
