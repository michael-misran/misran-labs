import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'

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

const CV = {
  fr: {
    labels: {
      cv: 'CV',
      profile: 'Profil',
      expertise: 'Expertise & compétences clés',
      experience: 'Expériences professionnelles',
      education: 'Formation',
    },
    subtitle: 'Senior Product Designer · DesignOps & AI Strategy',
    location: '📍 Paris & Périphérie (Hybride / Remote)',
    profileIntro: 'Product Designer Senior au profil hybride',
    profileRest: ", appuyé sur un socle technique de 7 ans en développement Full-Stack. Spécialiste de l'industrialisation des écosystèmes design (DesignOps, Design Systems), de l'automatisation par l'Intelligence Artificielle (Figma MCP, agents custom) et du rapprochement Design-to-Code (Tokens, CI/CD GitHub). Expérience confirmée dans le pilotage de la stratégie produit au sein d'environnements internationaux complexes et distribués. Process de conception et arbitrages documentés en continu sur ce lab personnel.",
    expertise: [
      { label: 'DesignOps & IA Strategy', text: "Workflows IA générative, Figma MCP, création d'agents custom, automatisation de production." },
      { label: 'Product Design & Systems', text: 'Architecture de composants, Design Tokens, gouvernance, UX Research, UX/UI.' },
      { label: 'Design-to-Code & Tooling', text: 'Intégration GitHub, modélisation JSON/Tokens, suppression de la dette de handoff.' },
      { label: 'Stack Technique', text: 'Figma (Variables, Auto-layout), GitHub, JS/HTML/CSS, architecture logicielle.' },
    ],
    concentrixTitle: 'Concentrix — Product Designer Senior',
    concentrixDate: 'Mai 2024 – Août 2026',
    concentrixBullets: [
      { label: 'Innovation IA & Automatisation', text: "Pionnier de l'intégration de l'IA générative dans le workflow de design. Configuration d'outils avancés (Figma MCP, agents IA) pour automatiser la production et accélérer l'idéation." },
      { label: 'Pipeline Design-to-Code (GitHub)', text: 'Connexion directe de Figma aux dépôts GitHub avec la Lead Tech. Synchronisation automatique des Design Tokens, garantissant la cohérence en production.' },
      { label: 'Gouvernance & Scalabilité', text: "Conception et maintenance d'un Design System multi-marques pour accélérer le Time-to-Market." },
      { label: 'Alignement International', text: "Animation d'ateliers de co-conception avec les PO, PM et Tech Leads sur 3 zones (Europe, Amérique, Inde), pour fluidifier la prise de décision produit à l'échelle internationale." },
    ],
    iadTitle: 'IAD France',
    iadDate: 'Févr. 2011 – Oct. 2023',
    iadDesignTitle: 'UI-UX Designer / Product Designer',
    iadDesignDate: 'Janv. 2018 – Oct. 2023',
    iadDesignBullets: [
      { label: 'Pivot Produit Interne', text: "Accompagnement de la transition vers une culture produit et industrialisation de l'écosystème applicatif." },
      { label: "Conception d'Applications Métiers", text: 'Lead design sur les outils de facturation, suivi de rémunération, moteurs de rapprochement.' },
      { label: 'Démarche Centrée Utilisateur', text: "Animation d'ateliers de recherche, prototypage et sessions de tests utilisateurs." },
    ],
    iadDevTitle: 'Développeur Full Stack',
    iadDevDate: 'Févr. 2011 – Janv. 2018',
    iadDevBullets: [
      { label: 'Ingénierie Logicielle', text: "Développement et architecture d'applications web scalables (PHP, MySQL, Zend, CodeIgniter, JS)." },
      { label: 'Cadrage & Spécifications', text: 'Traduction des besoins métiers en spécifications fonctionnelles et techniques détaillées.' },
    ],
    planNetTitle: 'Plan-net & MEMOBOX — Concepteur Technique & Développeur Web',
    planNetDate: '2007 – 2011',
    planNetText: "Discovery produit, développement d'applications d'analyse et scripts sur-mesure (JavaScript, PHP).",
    eduTitle: 'BTS Informatique Industrielle — Info-Sup',
    eduDate: '1998 – 2000',
    eduText: 'Projet : logiciel de reconnaissance faciale en C++.',
  },
  en: {
    labels: {
      cv: 'CV',
      profile: 'Profile',
      expertise: 'Expertise & Key Skills',
      experience: 'Professional Experience',
      education: 'Education',
    },
    subtitle: 'Senior Product Designer · DesignOps & AI Strategy',
    location: '📍 Paris & Greater Paris (Hybrid / Remote)',
    profileIntro: 'Senior Product Designer with a hybrid profile',
    profileRest: ', backed by 7 years of full-stack development experience. Specialist in scaling design ecosystems (DesignOps, Design Systems), AI-driven automation (Figma MCP, custom agents), and closing the design-to-code gap (Tokens, CI/CD GitHub). Proven track record leading product strategy within complex, distributed international environments. Design process and decisions documented continuously on this personal lab.',
    expertise: [
      { label: 'DesignOps & AI Strategy', text: 'Generative AI workflows, Figma MCP, custom agent creation, production automation.' },
      { label: 'Product Design & Systems', text: 'Component architecture, Design Tokens, governance, UX Research, UX/UI.' },
      { label: 'Design-to-Code & Tooling', text: 'GitHub integration, JSON/Tokens modeling, removing handoff debt.' },
      { label: 'Technical Stack', text: 'Figma (Variables, Auto-layout), GitHub, JS/HTML/CSS, software architecture.' },
    ],
    concentrixTitle: 'Concentrix — Senior Product Designer',
    concentrixDate: 'May 2024 – August 2026',
    concentrixBullets: [
      { label: 'AI Innovation & Automation', text: 'Pioneered the integration of generative AI into the design workflow. Set up advanced tooling (Figma MCP, AI agents) to automate production and speed up ideation.' },
      { label: 'Design-to-Code Pipeline (GitHub)', text: 'Direct connection from Figma to GitHub repos with the Lead Tech. Automatic Design Token sync, ensuring production consistency.' },
      { label: 'Governance & Scalability', text: 'Designed and maintained a multi-brand Design System to speed up time-to-market.' },
      { label: 'International Alignment', text: 'Ran co-design workshops with POs, PMs and Tech Leads across 3 regions (Europe, Americas, India), streamlining product decision-making at an international scale.' },
    ],
    iadTitle: 'IAD France',
    iadDate: 'Feb 2011 – Oct 2023',
    iadDesignTitle: 'UI-UX Designer / Product Designer',
    iadDesignDate: 'Jan 2018 – Oct 2023',
    iadDesignBullets: [
      { label: 'Internal Product Pivot', text: 'Supported the shift toward a product culture and the industrialization of the application ecosystem.' },
      { label: 'Business Application Design', text: 'Led design on billing tools, compensation tracking, and reconciliation engines.' },
      { label: 'User-Centered Approach', text: 'Ran research workshops, prototyping, and user testing sessions.' },
    ],
    iadDevTitle: 'Full-Stack Developer',
    iadDevDate: 'Feb 2011 – Jan 2018',
    iadDevBullets: [
      { label: 'Software Engineering', text: 'Built and architected scalable web applications (PHP, MySQL, Zend, CodeIgniter, JS).' },
      { label: 'Scoping & Specifications', text: 'Translated business needs into detailed functional and technical specifications.' },
    ],
    planNetTitle: 'Plan-net & MEMOBOX — Technical Designer & Web Developer',
    planNetDate: '2007 – 2011',
    planNetText: 'Product discovery, development of analytics applications and custom scripts (JavaScript, PHP).',
    eduTitle: 'BTS in Industrial Computing — Info-Sup',
    eduDate: '1998 – 2000',
    eduText: 'Project: facial recognition software in C++.',
  },
}

export default function CVModule() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const c = CV[lang] ?? CV.fr

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
            {`// ${c.labels.cv}`}
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
          {c.subtitle}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', fontSize: 12, color: 'var(--text2)' }}>
          <span>{c.location}</span>
          <span>✉️ misranmichael@gmail.com</span>
          <span>📱 06 07 69 75 17</span>
          <a href="https://www.linkedin.com/in/michael-misran" target="_blank" rel="noreferrer" style={{ color: 'var(--teal)', textDecoration: 'none' }}>
            🔗 LinkedIn
          </a>
        </div>
      </div>

      {/* Profil */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>{c.labels.profile}</SectionHeader>
        <p style={{ fontSize: 13.5, color: 'var(--prose)', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: 'var(--text)' }}>{c.profileIntro}</strong>
          {c.profileRest}
        </p>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>{c.labels.expertise}</SectionHeader>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px 24px' }}>
          {c.expertise.map(item => (
            <div key={item.label} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>{item.label} : </strong>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Expérience */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader>{c.labels.experience}</SectionHeader>

        <div style={{ marginBottom: 28 }}>
          <RoleHeader title={c.concentrixTitle} date={c.concentrixDate} />
          <Bullets items={c.concentrixBullets} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <RoleHeader title={c.iadTitle} date={c.iadDate} />

          <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)', marginBottom: 16 }}>
            <RoleHeader title={c.iadDesignTitle} date={c.iadDesignDate} size={13} />
            <Bullets items={c.iadDesignBullets} />
          </div>

          <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)' }}>
            <RoleHeader title={c.iadDevTitle} date={c.iadDevDate} size={13} />
            <Bullets items={c.iadDevBullets} />
          </div>
        </div>

        <div>
          <RoleHeader title={c.planNetTitle} date={c.planNetDate} />
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
            {c.planNetText}
          </p>
        </div>
      </div>

      {/* Formation */}
      <div>
        <SectionHeader>{c.labels.education}</SectionHeader>
        <RoleHeader title={c.eduTitle} date={c.eduDate} />
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
          {c.eduText}
        </p>
      </div>
    </div>
  )
}
