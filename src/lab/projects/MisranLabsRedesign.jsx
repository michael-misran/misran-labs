import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SiteMapDiagram from '../../components/diagrams/SiteMapDiagram'

const SITE_V1 = {
  label: 'misran-labs.com',
  children: [
    {
      label: 'Sidebar (liste plate)',
      children: [
        { label: 'Lab Home' },
        { label: 'UX Audit' },
        { label: 'Brief Machine' },
        { label: 'Session Replay' },
        { label: 'SaaS Generator' },
        { label: 'API Monitor' },
        { label: 'CV' },
      ],
    },
  ],
}

const SITE_V2 = {
  label: 'michaelmisran.com — v2',
  children: [
    {
      label: '// Portfolio (mis en avant)',
      children: [
        { label: 'Index case studies' },
        { label: 'Case study : cette refonte' },
      ],
    },
    {
      label: '// Lab (technique, second plan)',
      children: [
        { label: 'Lab Home' },
        { label: 'UX Audit, Brief Machine…' },
        { label: 'CV' },
      ],
    },
  ],
}

const SITE_V3 = {
  label: 'michaelmisran.com — v3',
  children: [
    {
      label: '// Lab (un seul espace)',
      children: [
        { label: 'Case study : cette refonte' },
        { label: 'UX Audit, Brief Machine…' },
        { label: 'CV' },
      ],
    },
  ],
}

const DECISION_FLOW = [
  { label: 'Constat', sublabel: 'Recherche de poste product designer, besoin de preuves concrètes' },
  { label: 'Option écartée', sublabel: 'Tout supprimer et repartir sur un portfolio générique' },
  { label: 'Décision v2', sublabel: 'Garder le Lab (preuve builder) + Portfolio en premier plan, en deux sections séparées' },
]

const ITERATION_FLOW = [
  { label: 'Remise en question', sublabel: 'Le split Portfolio/Lab segmente par audience, pas par réalité — tout est un projet du lab, y compris ce site' },
  { label: 'Risque identifié', sublabel: 'Ne pas casser la lisibilité pour un recruteur pressé qui cherche la preuve design en premier' },
  { label: 'Décision v3', sublabel: 'Un seul espace « projets », un champ type (case-study / tool) plutôt qu\'une IA séparée, featured pour la mise en avant' },
]

export default function MisranLabsRedesign({ project }) {
  return (
    <CaseStudyLayout
      title="Création du lab"
      role="Product Designer & Développeur — seul sur le projet"
      period="Août 2026"
      tools={['React', 'React Router', 'SVG fait main']}
      phases={project?.phases}
    >
      <Section title="Contexte">
        <p>
          Misran Labs était à l'origine un environnement de démonstration technique — une série de
          modules (UX Audit, Brief Machine, Session Replay…) montrant des compétences de builder.
          En me repositionnant pour une recherche d'emploi product designer, ce lab seul ne suffisait
          plus : il manquait une preuve directe de raisonnement design (recherche, décisions,
          arbitrages), pas seulement du code qui fonctionne.
        </p>
      </Section>

      <Section title="Problème">
        <p>
          Comment intégrer un vrai portfolio de case studies sans perdre ce que le Lab démontrait déjà
          (capacité à livrer, à coder, à itérer vite) ? Deux options s'opposaient : tout remplacer par
          un portfolio classique, ou superposer les deux sans hiérarchie claire — au risque de noyer le
          message.
        </p>
      </Section>

      <Section title="Process — première décision (v2)">
        <FlowDiagram steps={DECISION_FLOW} direction="vertical" />
      </Section>

      <Section title="Architecture de l'information — v1 → v2">
        <p style={{ marginBottom: 16 }}>
          La sidebar plate à un seul niveau ne permettait pas de hiérarchiser. Passage à deux sections
          explicites, la première mise en avant :
        </p>
        <SiteMapDiagram before={SITE_V1} after={SITE_V2} />
      </Section>

      <Section title="Itération — remise en question du split">
        <p style={{ marginBottom: 16 }}>
          En relisant la v2, le découpage Portfolio/Lab s'est révélé être une IA pensée pour deux
          audiences plutôt que pour la réalité du travail : tout ce qui est construit — y compris ce
          site — est un projet du lab. Ranger le case study de cette refonte hors du lab créait une
          incohérence, et n'aurait pas tenu une fois des projets d'écriture ou de musique ajoutés :
          chacun aurait fallu classer arbitrairement d'un côté ou de l'autre.
        </p>
        <FlowDiagram steps={ITERATION_FLOW} direction="vertical" />
      </Section>

      <Section title="Architecture de l'information — v2 → v3">
        <p style={{ marginBottom: 16 }}>
          Un seul espace « projets », où le type (case study vs outil) est un attribut de rendu, pas
          une séparation structurelle. Les case studies restent mises en avant via un flag{' '}
          <code>featured</code>, sans dupliquer l'arborescence :
        </p>
        <SiteMapDiagram before={SITE_V2} after={SITE_V3} />
      </Section>

      <Section title="Contrainte technique découverte en cours de route">
        <p>
          La navigation reposait uniquement sur un state React local (aucune URL réelle par module).
          Or un portfolio destiné à des recruteurs a besoin de liens partageables et persistants après
          un rafraîchissement de page. <code>react-router-dom</code> était déjà présente comme
          dépendance mais jamais branchée — je l'ai activée pour donner une URL propre à chaque page
          (<code>/lab/:slug</code>) plutôt que de recoder une solution maison.
        </p>
      </Section>

      <Section title="Résultat">
        <p>
          Un registre unique de projets (<code>type</code>, <code>featured</code>, composant associé),
          un template de case study réutilisable, des composants de diagramme réemployables, et une
          sidebar allégée — les widgets système (horloge, météo, uptime) ont été retirés une fois que
          la navigation est devenue le seul contenu réellement utile de la sidebar.
        </p>
      </Section>

      <Section title="Apprentissages">
        <p>
          Documenter une décision au moment où elle est prise — puis la remettre en question
          publiquement quand elle ne tient plus — donne un case study plus honnête qu'un récit
          linéaire reconstruit après coup. La v2 n'était pas une erreur : c'était une étape nécessaire
          pour voir pourquoi elle ne correspondait pas à la réalité du projet.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
