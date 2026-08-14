import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SiteMapDiagram from '../../components/diagrams/SiteMapDiagram'
import ThemeSwatch from '../ThemeSwatch'

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
  { label: 'Constat', sublabel: 'Le Lab doit pouvoir montrer des projets vendables, pas seulement des expérimentations techniques' },
  { label: 'Option écartée', sublabel: 'Tout supprimer et repartir sur un portfolio générique' },
  { label: 'Décision v2', sublabel: 'Garder le Lab (preuve builder) + Portfolio en premier plan, en deux sections séparées' },
]

const ITERATION_FLOW = [
  { label: 'Remise en question', sublabel: 'Le split Portfolio/Lab segmente par audience, pas par réalité — tout est un projet du lab, y compris ce site' },
  { label: 'Risque identifié', sublabel: 'Ne pas casser la lisibilité pour un visiteur pressé qui cherche la preuve de valeur en premier' },
  { label: 'Décision v3', sublabel: 'Un seul espace « projets », un champ type (case-study / tool) plutôt qu\'une IA séparée, featured pour la mise en avant' },
]

const THEME_FLOW = [
  { label: 'Retour utilisateur', sublabel: 'Difficulté à lire le thème sombre, malgré des contrastes WCAG mesurés très au-dessus du minimum' },
  { label: 'Diagnostic', sublabel: 'Le contraste n\'est pas le problème — la lecture de prose longue est presque toujours plus confortable en texte sombre sur fond clair, surtout en usage prolongé de bureau' },
  { label: 'Décision v4', sublabel: 'Toggle clair/sombre plutôt qu\'un remplacement total : respecte la préférence système par défaut, garde le choix ouvert, conserve l\'identité terminal dans les deux thèmes' },
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
          Misran Labs est l'endroit où je regroupe les différents projets que je développe, documentés
          avec la même exigence à chaque fois : les étapes suivies, les réflexions et les doutes en
          cours de route, et les chiffres quand il y en a — pas seulement le résultat fini une fois
          poli.
        </p>
      </Section>

      <Section title="Problème">
        <p>
          Un des premiers projets à passer par ce format a été la refonte de ce site lui-même : le Lab
          seul, avec ses modules techniques, ne suffisait plus à présenter des projets vendables — il
          manquait le raisonnement produit et design derrière chaque décision (recherche, arbitrages),
          pas seulement du code qui fonctionne. Comment intégrer un vrai portfolio de case studies sans
          perdre ce que le Lab démontrait déjà (capacité à livrer, à coder, à itérer vite) ? Deux
          options s'opposaient : tout remplacer par un portfolio classique, ou superposer les deux sans
          hiérarchie claire — au risque de noyer le message.
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

      <Section title="Itération — lisibilité et thème clair">
        <p style={{ marginBottom: 16 }}>
          Après la v3, le retour direct en relisant le site : le thème sombre est fatigant sur de la
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
          La navigation reposait uniquement sur un state React local (aucune URL réelle par module).
          Or un portfolio de projets vendables a besoin de liens partageables et persistants après
          un rafraîchissement de page. <code>react-router-dom</code> était déjà présente comme
          dépendance mais jamais branchée — je l'ai activée pour donner une URL propre à chaque page
          (<code>/lab/:slug</code>) plutôt que de recoder une solution maison.
        </p>
      </Section>

      <Section title="Résultat">
        <p>
          Un registre unique de projets (<code>type</code>, <code>featured</code>, composant associé),
          un template de case study réutilisable, des composants de diagramme réemployables, une
          sidebar allégée — les widgets système (horloge, météo, uptime) ont été retirés une fois que
          la navigation est devenue le seul contenu réellement utile de la sidebar — et un thème clair
          complet, activable via un bouton dans la Topbar et respectant la préférence système par
          défaut.
        </p>
      </Section>

      <Section title="Apprentissages">
        <p>
          Documenter une décision au moment où elle est prise — puis la remettre en question
          publiquement quand elle ne tient plus — donne un case study plus honnête qu'un récit
          linéaire reconstruit après coup. La v2 n'était pas une erreur : c'était une étape nécessaire
          pour voir pourquoi elle ne correspondait pas à la réalité du projet. Même chose pour le thème
          sombre : de bons contrastes mesurés ne garantissent pas un confort de lecture réel — les deux
          se vérifient séparément.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
