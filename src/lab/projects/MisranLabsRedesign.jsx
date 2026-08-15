import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SiteMapDiagram from '../../components/diagrams/SiteMapDiagram'
import ThemeSwatch from '../ThemeSwatch'

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
      label: '// Un seul registre de projets',
      children: [
        { label: 'type' },
        { label: 'phases' },
        { label: 'featured' },
      ],
    },
  ],
}

const STRUCTURE_FLOW = [
  { label: 'Constat', sublabel: "Un roman, un jeu vidéo et une application n'ont presque rien en commun dans leur forme" },
  { label: 'Risque', sublabel: "Prévoir une section par type de projet — ça ne tient plus dès le premier projet qui ne rentre dans aucune case" },
  { label: 'Décision', sublabel: "Un seul registre de projets, où le type est un attribut (case-study, outil, écriture, jeu…) plutôt qu'une structure séparée" },
]

const THEME_FLOW = [
  { label: 'Retour utilisateur', sublabel: 'Difficulté à lire le thème sombre, malgré des contrastes WCAG mesurés très au-dessus du minimum' },
  { label: 'Diagnostic', sublabel: "Le contraste n'est pas le problème — la lecture de prose longue est presque toujours plus confortable en texte sombre sur fond clair, surtout en usage prolongé de bureau" },
  { label: 'Décision', sublabel: "Toggle clair/sombre plutôt qu'un remplacement total : respecte la préférence système par défaut, garde le choix ouvert, conserve l'identité terminal dans les deux thèmes" },
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
          Misran Labs c'est un laboratoire d'expérimentation. Ce qui compte, c'est ce qui va être
          construit et comment je vais le construire : un roman, un jeu vidéo, une application, ou
          autre chose encore. Chaque projet qui passera par ce lab sera documenté avec la même
          exigence : les étapes suivies, les réflexions et les doutes en cours de route, et les
          chiffres quand il y en a.
        </p>
      </Section>

      <Section title="Problème">
        <p>
          Le premier projet à passer par ce format est le lab lui-même. Le problème de départ : un
          roman, un jeu vidéo et une application n'ont presque rien en commun dans leur forme —
          comment construire un espace capable d'accueillir n'importe lequel d'entre eux sans devoir
          tout reconstruire à chaque nouveau type de projet ?
        </p>
      </Section>

      <Section title="Décision — un registre, pas une structure par type">
        <FlowDiagram steps={STRUCTURE_FLOW} direction="vertical" />
      </Section>

      <Section title="Architecture de l'information">
        <p style={{ marginBottom: 16 }}>
          Passage d'une sidebar plate à un registre structuré : chaque entrée porte un{' '}
          <code>type</code> (case-study, outil, écriture, jeu…), les <code>phases</code> qu'elle
          couvre réellement, et un flag <code>featured</code> pour la mise en avant — plutôt que
          d'appartenir à une section figée :
        </p>
        <SiteMapDiagram before={SITE_BEFORE} after={SITE_AFTER} />
      </Section>

      <Section title="Itération — lisibilité et thème clair">
        <p style={{ marginBottom: 16 }}>
          En relisant le site une fois la structure posée : le thème sombre est fatigant sur de la
          prose longue, même si les contrastes calculés (17:1 pour le texte principal) passent très
          largement les seuils d'accessibilité. Le problème n'était donc pas technique mais ergonomique
          — au lieu de tout basculer en clair et perdre l'identité « lab », un toggle expose les deux,
          avec la même structure et la même typographie monospace dans les deux cas.
        </p>
        <FlowDiagram steps={THEME_FLOW} direction="vertical" />
      </Section>

      <Section title="Avant / après — thème">
        <p style={{ marginBottom: 16 }}>
          Les tokens de couleur ont été entièrement revus pour le clair plutôt qu'inversés
          mécaniquement — l'accent teal, par exemple, devient plus foncé en clair pour rester lisible
          en tant que texte, alors qu'en sombre il peut rester vif sans perdre en contraste :
        </p>
        <ThemeSwatch />
      </Section>

      <Section title="Contrainte technique découverte en cours de route">
        <p>
          La navigation reposait uniquement sur un state React local (aucune URL réelle par projet).
          Un lab pensé pour durer a besoin de liens partageables et persistants après un
          rafraîchissement de page. <code>react-router-dom</code> était déjà présente comme dépendance
          mais jamais branchée — je l'ai activée pour donner une URL propre à chaque page
          (<code>/lab/:slug</code>) plutôt que de recoder une solution maison.
        </p>
      </Section>

      <Section title="Résultat">
        <p>
          Un registre unique de projets (<code>type</code>, <code>featured</code>, composant associé,
          étapes couvertes), un template de case study réutilisable, des composants de diagramme
          réemployables, une sidebar allégée — les widgets système (horloge, météo, uptime) ont été
          retirés une fois que la navigation est devenue le seul contenu réellement utile de la
          sidebar — et un thème clair complet, activable via un bouton dans la Topbar et respectant la
          préférence système par défaut.
        </p>
      </Section>

      <Section title="Apprentissages">
        <p>
          Documenter une décision au moment où elle est prise, plutôt que raconter une version lissée
          reconstruite après coup, donne un résultat plus honnête — y compris quand ça veut dire montrer
          un chantier qui démarre avec presque rien dedans. Même logique pour le thème sombre : de bons
          contrastes mesurés ne garantissent pas un confort de lecture réel, les deux se vérifient
          séparément.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
