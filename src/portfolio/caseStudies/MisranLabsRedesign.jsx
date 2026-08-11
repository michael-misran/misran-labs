import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SiteMapDiagram from '../../components/diagrams/SiteMapDiagram'

const SITE_BEFORE = {
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

const SITE_AFTER = {
  label: 'michaelmisran.com',
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

const DECISION_FLOW = [
  { label: 'Constat', sublabel: 'Recherche de poste product designer, besoin de preuves concrètes' },
  { label: 'Option écartée', sublabel: 'Tout supprimer et repartir sur un portfolio générique' },
  { label: 'Décision', sublabel: 'Garder le Lab (preuve builder) + Portfolio en premier plan' },
  { label: 'Conséquence', sublabel: 'IA en deux sections, home mixte, routing réel ajouté' },
]

export default function MisranLabsRedesign() {
  return (
    <CaseStudyLayout
      title="Transformer un lab technique en portfolio design"
      role="Product Designer & Développeur — seul sur le projet"
      period="Août 2026"
      tools={['React', 'React Router', 'SVG fait main']}
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

      <Section title="Process — décision">
        <FlowDiagram steps={DECISION_FLOW} direction="vertical" />
      </Section>

      <Section title="Process — architecture de l'information">
        <p style={{ marginBottom: 16 }}>
          La sidebar plate à un seul niveau ne permettait pas de hiérarchiser. Passage à deux sections
          explicites, la première mise en avant :
        </p>
        <SiteMapDiagram before={SITE_BEFORE} after={SITE_AFTER} />
      </Section>

      <Section title="Contrainte technique découverte en cours de route">
        <p>
          La navigation reposait uniquement sur un state React local (aucune URL réelle par module).
          Or un portfolio destiné à des recruteurs a besoin de liens partageables et persistants après
          un rafraîchissement de page. <code>react-router-dom</code> était déjà présente comme
          dépendance mais jamais branchée — je l'ai activée pour donner une URL propre à chaque page
          (<code>/portfolio/:slug</code>, <code>/lab/:moduleId</code>) plutôt que de recoder une
          solution maison.
        </p>
      </Section>

      <Section title="Résultat">
        <p>
          Une structure en deux blocs clairs, un template de case study réutilisable, et des composants
          de diagramme (flux de décision, arborescence avant/après) pensés pour être réemployés sur les
          prochaines études de cas — pas seulement celle-ci.
        </p>
      </Section>

      <Section title="Apprentissages">
        <p>
          Documenter une décision au moment où elle est prise (plutôt que la reconstituer après coup)
          donne un case study plus honnête : les options écartées et les contraintes découvertes en
          cours de route sont normalement la partie la plus difficile à retranscrire fidèlement.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
