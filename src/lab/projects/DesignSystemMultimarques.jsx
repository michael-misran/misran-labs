import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, BulletList } from '../CaseStudyLayout'
import { Stamp, Barcode } from '../../design-system/ArchiveMarks'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import { useLanguage } from '../../shell/LanguageContext'
import { t } from '../../i18n/ui'
import useIsMobile from '../../shell/useIsMobile'

const DEV = import.meta.env.DEV

/* --- Confidentialité -------------------------------------------------- *
 * Rien de nominatif dans cette page : pas de nom de design system interne,
 * pas de nom de librairie de composants, pas de nom de client. Les exemples
 * de tokens utilisent le préfixe neutre « ds. ». Ne pas réintroduire les
 * noms internes, même dans un commentaire.
 * --------------------------------------------------------------------- */

function SimpleTable({ columns, rows, monoColumn = null }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  borderBottom: 'var(--border-thin) solid var(--border)',
                  padding: '8px 12px 8px 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    borderBottom: 'var(--border-thin) solid var(--border)',
                    padding: '10px 12px 10px 0',
                    color: j === 0 ? 'var(--text)' : 'var(--text2)',
                    fontWeight: j === 0 ? 600 : 400,
                    fontFamily: j === monoColumn ? 'var(--font-mono)' : 'var(--font-body)',
                    fontSize: j === monoColumn ? 12 : 13,
                    verticalAlign: 'top',
                    lineHeight: 1.6,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TokenAnatomy({ segments }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 10 }}>
        {segments.map((seg, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                background: 'var(--bg2)',
                border: 'var(--border-thin) solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: '3px 7px',
                color: i === 0 ? 'var(--muted)' : 'var(--text)',
              }}
            >
              {seg.value}
            </span>
            {i < segments.length - 1 && <span style={{ color: 'var(--muted)' }}>.</span>}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {segments.map((seg, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            {seg.role}
          </span>
        ))}
      </div>
    </div>
  )
}

function PlanNote({ children }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--muted)',
        lineHeight: 1.7,
        borderLeft: 'var(--border-regular) solid var(--border)',
        paddingLeft: 14,
        margin: '0 0 40px',
      }}
    >
      {children}
    </p>
  )
}

/* --- Aides de rédaction, visibles en dev uniquement (jamais en prod) --- */

function DevTodo({ title, items }) {
  if (!DEV) return null
  return (
    <div style={{ border: '1px dashed var(--warning)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 32 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--warning)', marginBottom: 10 }}>
        {'// ' + title + ' — VISIBLE EN DEV UNIQUEMENT'}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}

function VisualSlot({ label, file }) {
  if (!DEV) return null
  return (
    <div
      style={{
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '28px 20px',
        textAlign: 'center',
        marginBottom: 40,
        color: 'var(--muted)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
        [ VISUEL À AJOUTER ]
      </div>
      <div style={{ fontSize: 13, color: 'var(--text2)', maxWidth: 480, margin: '0 auto' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 8 }}>{file}</div>
    </div>
  )
}

const CONTENT = {
  fr: {
    title: 'Design System multi-marques',
    role: 'Product Designer Senior — design system, DesignOps, pipeline design-to-code',
    period: 'Mai 2024 – Août 2026',
    tools: ['Figma (Variables, Auto-layout)', 'Tokens Studio', 'Style Dictionary', 'GitHub', 'Figma MCP', 'Agents IA custom'],
    tabs: [
      { id: 'overview', label: 'Vue d’ensemble' },
      { id: 'tokens', label: 'Architecture des tokens' },
      { id: 'pipeline', label: 'Pipeline design-to-code' },
      { id: 'governance', label: 'Gouvernance' },
      { id: 'results', label: 'Résultats' },
    ],

    fileNo: 'DOSSIER Nº 001',
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    roleLabel: 'RÔLE',
    periodLabel: 'PÉRIODE',
    toolsLabel: 'OUTILS',
    docId: 'ID DOSSIER — ML-ARCHIVE-001',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',

    planNote:
      "La grille des 5 étapes de la démarche scientifique s’applique à mes projets, pas à mon parcours : sur deux ans de poste, elle serait reconstituée après coup, donc plus belle que la réalité. Cette page suit un autre plan — contexte, problème, ce que j’ai construit, résultats.",

    contextTitle: 'Contexte',
    context:
      "Plusieurs produits, plusieurs marques, une seule équipe design. Chaque produit avançait à son propre rythme avec ses propres écrans, et la cohérence de marque se rattrapait après coup — au moment où elle coûte le plus cher. Ma mission sur ces deux ans : faire exister un design system commun qui serve tous les produits sans bloquer aucun d’entre eux, et le relier au code pour qu’une décision de design ne soit plus retranscrite à la main par un développeur.",
    contextScope:
      "Le run produit se faisait sur des parcours réglementés — onboarding et collecte de pièces justificatives pour une banque privée, vérification d’identité, outils métiers internes. Des formulaires longs, des contraintes de conformité, des états d’erreur qui comptent autant que le chemin nominal. C’est ce terrain qui a produit la méthode décrite dans la page Workflow.",
    contextConfidentiality:
      "Les noms du design system interne, de la librairie de composants et des clients ne figurent pas sur cette page. Les exemples de tokens utilisent un préfixe neutre. L’architecture et les règles, elles, sont décrites telles qu’elles ont été mises en place.",

    problemTitle: 'Le problème',
    problemIntro: 'Trois symptômes, une même cause.',
    problem: [
      "Le même composant était redessiné dans plusieurs produits, avec des écarts de couleur, d’espacement et de comportement que personne n’avait décidés.",
      "Chaque évolution du design system devait être retranscrite à la main dans le code. Donc elle ne l’était pas toujours, et l’écart entre la maquette et la production grandissait en silence.",
      "Décliner une marque revenait à réécrire des écrans, pas à changer des valeurs — ce qui rendait toute nouvelle marque coûteuse et donc repoussée.",
    ],
    problemCause:
      "La cause commune : aucune décision de design n’existait à un seul endroit. Elle était prise dans une maquette, recopiée dans une autre, puis retapée dans du code. Trois copies, trois occasions de divergence. La question à résoudre n’était donc pas « comment mieux documenter », mais « comment faire en sorte qu’une décision soit prise une seule fois, nommée une seule fois, et consommée à l’identique partout ».",

    builtTitle: 'Ce que j’ai construit',
    builtIntro:
      "Trois chantiers menés en parallèle, jamais en séquence — parce que mener le design system après le run revient à ne jamais le mener. Chacun a son onglet.",
    builtItems: [
      "Une architecture de tokens en trois tiers avec chaîne d’alias obligatoire : aucun token ne porte une valeur brute s’il existe un niveau au-dessus de lui. C’est cette contrainte qui rend la marque blanche possible sans fork.",
      "Un pipeline design-to-code construit avec la Lead Tech : les tokens partent de Figma, sont versionnés et revus en pull request dans le dépôt, puis transformés automatiquement en variables CSS. L’étape de retranscription manuelle disparaît au lieu d’être mieux documentée.",
      "Une documentation de gouvernance : convention de nommage, checklist imposée pour ajouter un composant, règles d’arbitrage entre le besoin d’un produit et la cohérence du système. C’est la partie la moins visible du travail et la plus déterminante sur la durée.",
    ],
    builtIntlTitle: 'La contrainte qui a façonné le reste',
    builtIntl:
      "Les décisions ne se prenaient pas dans une seule pièce : PO, PM et Tech Leads répartis sur l’Europe, l’Amérique et l’Inde. Une maquette non annotée dans un autre fuseau horaire coûte un cycle de 24 h à chaque question. Ça impose d’écrire les arbitrages au lieu de les expliquer — et c’est en grande partie pour ça que la gouvernance est devenue un livrable à part entière plutôt qu’une habitude d’équipe.",

    lessonsTitle: 'Ce que je referais autrement',
    lessons: [
      "Documenter la gouvernance dès le premier composant, pas après coup. Les écarts créés avant l’existence de la convention ont coûté plus cher à rattraper qu’ils n’auraient coûté à éviter.",
      "Mettre en place la mesure d’adoption en même temps que le système, pas à la fin. C’est exactement ce qui manque à l’onglet Résultats de cette page — et la raison pour laquelle la page Workflow définit ses indicateurs avant de commencer.",
      "Traiter la double maintenance entre la librairie Figma et la librairie de composants plus tôt. La piste explorée en fin de parcours — générer les maquettes directement depuis le dépôt produit via Figma MCP et des agents custom — aurait mérité d’être testée dès le départ.",
    ],

    tokensTitle: 'Architecture des tokens',
    tokensIntro:
      "Trois niveaux, une règle : un token ne référence jamais une valeur brute s’il existe un niveau au-dessus de lui. C’est cette contrainte — plus que la palette elle-même — qui permet de changer une marque sans toucher aux écrans.",
    tokensTiersTitle: 'Les trois tiers',
    tokensTiersColumns: ['Tier', 'Ce qu’il porte', 'Exemple'],
    tokensTiersRows: [
      ['Primitive', "Les valeurs brutes. Une échelle d’options, aucune intention. Ne s’applique jamais directement à une interface.", 'ds.primitive.color.blue.800'],
      ['Semantic', "Un rôle nommé. Le primitive reçoit un alias qui décrit son intention. C’est le niveau que designers et devs consomment au quotidien.", 'ds.semantic.color.primary.default'],
      ['Component', "Portée à un seul composant. Créé uniquement quand le composant s’écarte réellement de l’intention du token sémantique.", 'ds.component.button.primary.contained.bg.hover'],
    ],

    tokensAnatomyTitle: 'Anatomie d’un nom',
    tokensAnatomyIntro:
      "Un nom de token est un identifiant technique : c’est par lui que l’outil rattache le token à l’élément dans Figma. S’il est mal formé, le rattachement casse. D’où une formule unique, lue de gauche à droite, chaque segment rétrécissant la portée de la décision.",
    tokensAnatomySegments: [
      { value: 'ds', role: 'namespace' },
      { value: 'component', role: 'tier' },
      { value: 'button', role: 'catégorie' },
      { value: 'primary', role: 'rôle' },
      { value: 'contained', role: 'variante' },
      { value: 'bg', role: 'propriété' },
      { value: 'hover', role: 'état' },
    ],
    tokensAnatomyNote:
      "Tous les segments ne sont pas obligatoires : un token d’espacement ou de typographie n’a ni rôle de couleur ni état. On n’utilise que ce qui rend l’intention non ambiguë.",

    tokensChainTitle: 'La chaîne de résolution',
    tokensChainIntro:
      "Exemple réel : la couleur de fond d’un bouton primaire au survol. Quatre maillons, un seul endroit où la valeur existe vraiment.",
    tokensChainFlow: [
      { label: 'Primitive', sublabel: 'ds.primitive.color.blue.800 — seule occurrence de la valeur brute' },
      { label: 'Semantic', sublabel: 'ds.semantic.color.primary.hover — alias du primitive, porte le rôle' },
      { label: 'Component', sublabel: 'ds.component.button.primary.contained.bg.hover — alias du sémantique, portée bouton' },
      { label: 'Variable CSS', sublabel: '--ds-component-button-primary-contained-bg-hover — ce que consomme le produit' },
    ],
    tokensChainNote:
      "Conséquence concrète : une marque se décline en surchargeant le niveau primitive, ou en activant un autre jeu de tokens. Aucun écran, aucun composant, aucune feuille de style n’est réécrit.",

    tokensCategoriesTitle: 'Les catégories couvertes',
    tokensCategoriesColumns: ['Catégorie', 'Ce qu’elle couvre', 'Exemple sémantique'],
    tokensCategoriesRows: [
      ['color', 'Fonds, bordures, textes, icônes', 'ds.semantic.color.primary.default'],
      ['typography', 'Famille, taille, graisse, interlignage', 'ds.semantic.typography.label.md'],
      ['spacing', 'Paddings et espacements de mise en page', 'ds.semantic.spacing.padding.horizontal.md'],
      ['elevation', 'Ombres et élévation des surfaces', 'ds.semantic.elevation.raised'],
      ['border', 'Épaisseurs et rayons', 'ds.semantic.border.radius.component.md'],
    ],
    tokensScalesTitle: 'Les échelles de base',
    tokensScales: [
      "Dimensions : une échelle unique de 4 à 48 px par pas de 4, nommée 2xs → 7xl. Aucune valeur intermédiaire ne peut être inventée dans une maquette.",
      "Points de rupture : xs 0 · sm 600 · md 900 · lg 1200 · xl 1536 — les mêmes côté Figma et côté code.",
      "Thèmes : clair et sombre sont deux jeux de tokens aux noms identiques. Jamais de suffixe -light ou -dark dans un nom ; c’est le jeu actif qui résout la valeur.",
      "Rôles de couleur : primary, error, success, warning, inherit (neutre), text, border. Le rôle décrit l’intention, jamais la teinte.",
      "États, toujours en dernier segment : default, hover, pressed, focus, disabled. Le focus est toujours un anneau visible — exigence WCAG.",
    ],
    tokensVisual: 'La chaîne d’alias telle qu’elle apparaît dans Figma, et un extrait des trois niveaux de tokens',
    tokensVisualFile: 'src/assets/case-studies/design-system/tokens-tiers.png',

    pipelineTitle: 'Pipeline design-to-code',
    pipelineIntro:
      "Le point de départ : un développeur qui retranscrit une valeur à la main est une source de dérive garantie. L’objectif était donc de supprimer l’étape de retranscription, pas de mieux la documenter. Construit avec la Lead Tech.",
    pipelineFlow: [
      { label: 'Figma', sublabel: 'Variables et composants. Les propriétés de composant portent exactement le nom utilisé par les tokens' },
      { label: 'Tokens Studio', sublabel: 'Rattachement des tokens aux éléments, jeux clair / sombre aux noms identiques' },
      { label: 'Dépôt GitHub', sublabel: 'Les tokens sont versionnés et revus en pull request, comme du code' },
      { label: 'Style Dictionary', sublabel: 'Transformation automatique en variables CSS, et autres formats si besoin' },
      { label: 'Produits', sublabel: 'Chaque produit consomme les mêmes variables ; une marque est une surcharge, pas un fork' },
    ],
    pipelineRulesTitle: 'Les règles qui font tenir le pipeline',
    pipelineRules: [
      "Le nom du token reprend mot pour mot le nom de la propriété Figma. Si la propriété s’appelle contained, le token dit contained — pas filled. Pas de couche de traduction, donc rien à maintenir entre les deux mondes.",
      "Séparateur : le point, jamais le tiret. Le point crée des groupes manipulables en masse dans l’outil ; le tiret produit une liste plate.",
      "Minuscules, chiffres et points uniquement. Tout autre caractère casse la transformation.",
      "Un token qui manque est signalé comme un manque. On n’approxime jamais avec le primitive le plus proche, et on ne crée pas de valeur ponctuelle.",
    ],
    pipelineVisual: 'Une pull request de synchronisation des tokens, et le même composant avant / après bascule de marque',
    pipelineVisualFile: 'src/assets/case-studies/design-system/pipeline-pr.png',

    governanceTitle: 'Gouvernance',
    governanceIntro:
      "Un design system sans règle d’entrée devient une bibliothèque de composants orphelins en six mois. La partie la moins visible du travail — et la plus déterminante — a été de décider qui peut ajouter quoi, et à quelle condition.",
    governanceChecklistTitle: 'Ajouter un composant : l’ordre est imposé',
    governanceChecklist: [
      "1. Vérifier qu’un token sémantique ne couvre pas déjà la décision. La plupart des choix de couleur, d’espacement et de typographie d’un nouveau composant doivent réutiliser l’existant, pas créer du neuf.",
      "2. Si le composant s’écarte réellement de l’intention du sémantique, créer un token composant qui référence ce sémantique — et dont le nom colle à la propriété Figma.",
      "3. Si aucun sémantique ne couvre la décision, créer d’abord le sémantique. On ne saute jamais le tier.",
      "4. Si aucun primitive ne porte la valeur, créer d’abord le primitive. La chaîne doit toujours résoudre : composant → sémantique → primitive → valeur.",
    ],
    governanceArbitrationTitle: 'Arbitrage run / unification',
    governanceArbitration: [
      "Un pattern rejoint le système s’il sert au moins deux produits, ou s’il est structurant pour la marque. Sinon il reste local, et c’est assumé comme tel.",
      "Une exception demandée par un produit est d’abord écoutée comme une contrainte réelle — business, technique ou utilisateur — avant d’être refusée.",
      "Si la dérogation est nécessaire, elle est documentée comme une dette, avec une date de revue. Ce qui n’est pas écrit devient la norme silencieuse du produit.",
      "Séparation stricte entre le token de marque, surchargeable, et le token structurel, non négociable. C’est la ligne qui rend la marque blanche gouvernable.",
    ],
    governanceVisual: 'La documentation de gouvernance : convention de nommage, checklist d’ajout, process de mise à jour',
    governanceVisualFile: 'src/assets/case-studies/design-system/governance-doc.png',

    resultsTitle: 'Résultats',
    resultsIntro:
      "La règle du Lab s’applique aussi ici : ce qui est vérifié est présenté comme vérifié, ce qui ne l’est pas ne devient pas une affirmation.",
    resultsVerifiedTitle: 'Vérifié',
    resultsVerified: [
      "La chaîne d’alias résout de bout en bout : une valeur modifiée au niveau primitive atteint la variable CSS consommée en production sans intervention manuelle.",
      "Les deux thèmes partagent des noms de tokens identiques — changer de thème ne demande aucune modification de nom ni de composant.",
      "Les tokens sont versionnés et revus en pull request : une évolution du design system laisse une trace consultable, au même titre qu’un changement de code.",
      "La convention de nommage est écrite et applicable par quelqu’un d’autre que son auteur. C’est ce qui la distingue d’une habitude personnelle — et ce qui fait qu’elle survit à un départ.",
      "Décliner une marque ne demande plus de réécrire des écrans : la surcharge se fait au niveau des valeurs.",
    ],
    resultsNoNumbersTitle: 'Pourquoi il n’y a pas de chiffres ici',
    resultsNoNumbers:
      "Les indicateurs qui compteraient — taux d’adoption par produit, gain de temps sur le handoff, taux de retouche après développement, délai de déclinaison d’une marque — vivent dans les outils de l’entreprise. Je n’y ai plus accès depuis mon départ, et je n’avais pas mis la mesure en place assez tôt pour en avoir gardé une trace. Les estimer aujourd’hui produirait exactement le genre de chiffre qui ne résiste pas à une question en entretien.",
    resultsNoNumbersLesson:
      "C’est la leçon la plus utile que je retire de ce poste, et elle est visible ailleurs sur ce site : la page Workflow définit ses indicateurs de succès avant de commencer, précisément pour ne plus avoir à les reconstituer à la fin. Sur le prochain système que je mettrai en place, la mesure fera partie de la première itération, pas de la dernière.",

    devTodoDecisionsTitle: 'DÉCISIONS PRISES — NE PAS RÉINTRODUIRE',
    devTodoDecisions: [
      "Confidentialité : préfixe de tokens neutre « ds. », aucun nom de design system interne, de librairie de composants ni de client sur la page. Tenu aussi dans les commentaires du fichier.",
      "Forme : pas de grille des 5 étapes sur cette page — elle serait reconstituée après coup. Plan retenu : contexte, problème, ce que j’ai construit, résultats. La note en haut de la Vue d’ensemble l’assume explicitement.",
      "Chiffres : aucun accès aux métriques depuis le départ de l’entreprise. L’onglet Résultats le dit et en tire une leçon, plutôt que de laisser un trou ou d’estimer.",
      "Sources du contenu : les trois fichiers de tokens et le guide de nommage conservés dans mes archives du poste, plus la page CV. Rien d’autre.",
      "À vérifier une fois : la couverture de process (phases) dans projects.js est une estimation prudente, et les dates viennent de la page CV.",
    ],
    devTodoVisualsTitle: 'VISUELS — LE POINT LE PLUS IMPORTANT',
    devTodoVisuals: [
      "Trois emplacements sont réservés (onglets Tokens, Pipeline, Gouvernance) et n’apparaissent qu’en dev.",
      "Dépose les fichiers dans src/assets/case-studies/design-system/ aux noms indiqués, puis remplace le VisualSlot par une balise img.",
      "Le plus convaincant, dans l’ordre : la chaîne d’alias visible dans Figma, une pull request de synchronisation des tokens, le même composant sous deux marques, un avant / après d’écran.",
      "Tes exports d’écrans dans tes archives du poste sont utilisables à condition de remplacer les données, les logos et tout élément nominatif.",
      "Sans visuel, cette page reste du texte — et c’est le seul point de l’analyse qu’aucune réécriture ne peut régler.",
    ],
  },

  en: {
    title: 'Multi-brand Design System',
    role: 'Senior Product Designer — design system, DesignOps, design-to-code pipeline',
    period: 'May 2024 – Aug 2026',
    tools: ['Figma (Variables, Auto-layout)', 'Tokens Studio', 'Style Dictionary', 'GitHub', 'Figma MCP', 'Custom AI agents'],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'tokens', label: 'Token architecture' },
      { id: 'pipeline', label: 'Design-to-code pipeline' },
      { id: 'governance', label: 'Governance' },
      { id: 'results', label: 'Results' },
    ],

    fileNo: 'FILE Nº 001',
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    roleLabel: 'ROLE',
    periodLabel: 'PERIOD',
    toolsLabel: 'TOOLS',
    docId: 'DOCUMENT ID — ML-ARCHIVE-001',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',

    planNote:
      'The 5-step scientific method applies to my projects, not to my career: across two years in a role it would be reconstructed after the fact, and therefore prettier than reality. This page follows a different outline — context, problem, what I built, results.',

    contextTitle: 'Context',
    context:
      'Several products, several brands, one design team. Each product moved at its own pace with its own screens, and brand consistency got caught up after the fact — exactly when it costs the most. My mandate over those two years: make a shared design system exist for every product without blocking any of them, and wire it to the code so a design decision is no longer retyped by hand by a developer.',
    contextScope:
      'The product run happened on regulated journeys — onboarding and document collection for a private bank, identity verification, internal business tools. Long forms, compliance constraints, error states that matter as much as the happy path. That ground is what produced the method described on the Workflow page.',
    contextConfidentiality:
      'The names of the internal design system, the component library and the clients do not appear on this page. Token examples use a neutral prefix. The architecture and the rules, however, are described exactly as they were put in place.',

    problemTitle: 'The problem',
    problemIntro: 'Three symptoms, one root cause.',
    problem: [
      'The same component was being redrawn across products, with colour, spacing and behaviour gaps nobody had actually decided on.',
      'Every design system change had to be retyped into the code by hand. So it often wasn’t, and the gap between mockup and production grew silently.',
      'Spinning up a brand meant rewriting screens rather than changing values — which made any new brand expensive, and therefore postponed.',
    ],
    problemCause:
      'The common cause: no design decision existed in a single place. It was made in one mockup, copied into another, then retyped into code. Three copies, three chances to diverge. So the question was not "how do we document this better", but "how do we make a decision get taken once, named once, and consumed identically everywhere".',

    builtTitle: 'What I built',
    builtIntro:
      'Three tracks run in parallel, never in sequence — because running the design system after the product run means never running it at all. Each has its own tab.',
    builtItems: [
      'A three-tier token architecture with a mandatory alias chain: no token carries a raw value if a tier exists above it. That constraint is what makes white-labelling possible without forking.',
      'A design-to-code pipeline built with the Lead Tech: tokens leave Figma, get versioned and reviewed in pull requests in the repo, then transformed automatically into CSS variables. The manual retyping step disappears rather than being better documented.',
      'Governance documentation: naming convention, an imposed checklist for adding a component, arbitration rules between a product’s need and the system’s consistency. The least visible part of the work, and the most decisive over time.',
    ],
    builtIntlTitle: 'The constraint that shaped everything else',
    builtIntl:
      'Decisions were not made in one room: POs, PMs and Tech Leads spread across Europe, the Americas and India. An unannotated mockup in another time zone costs a 24-hour cycle per question. That forces you to write arbitrations down rather than explain them — and it is largely why governance became a deliverable in its own right rather than a team habit.',

    lessonsTitle: 'What I would do differently',
    lessons: [
      'Document governance from the very first component, not after the fact. The gaps created before the convention existed cost more to fix than they would have cost to prevent.',
      'Set up adoption measurement alongside the system, not at the end. That is exactly what is missing from the Results tab on this page — and the reason the Workflow page defines its indicators before starting.',
      'Tackle the double maintenance between the Figma library and the component library earlier. The track explored late — generating mockups straight from the product repo via Figma MCP and custom agents — deserved to be tested from the start.',
    ],

    tokensTitle: 'Token architecture',
    tokensIntro:
      'Three tiers, one rule: a token never references a raw value if a tier exists above it. That constraint — more than the palette itself — is what lets you change a brand without touching a single screen.',
    tokensTiersTitle: 'The three tiers',
    tokensTiersColumns: ['Tier', 'What it carries', 'Example'],
    tokensTiersRows: [
      ['Primitive', 'Raw values. A scale of options, no intent. Never applied directly to an interface.', 'ds.primitive.color.blue.800'],
      ['Semantic', 'A named role. The primitive gets an alias describing its intent. This is the tier designers and developers consume day to day.', 'ds.semantic.color.primary.default'],
      ['Component', 'Scoped to a single component. Created only when the component genuinely departs from the semantic token’s intent.', 'ds.component.button.primary.contained.bg.hover'],
    ],

    tokensAnatomyTitle: 'Anatomy of a name',
    tokensAnatomyIntro:
      'A token name is a technical identifier: it is how the tooling attaches the token to the element in Figma. Get it wrong and the attachment breaks. Hence a single formula, read left to right, each segment narrowing the scope of the decision.',
    tokensAnatomySegments: [
      { value: 'ds', role: 'namespace' },
      { value: 'component', role: 'tier' },
      { value: 'button', role: 'category' },
      { value: 'primary', role: 'role' },
      { value: 'contained', role: 'variant' },
      { value: 'bg', role: 'property' },
      { value: 'hover', role: 'state' },
    ],
    tokensAnatomyNote:
      'Not every segment is required: a spacing or typography token has neither a colour role nor a state. You only use what makes the intent unambiguous.',

    tokensChainTitle: 'The resolution chain',
    tokensChainIntro:
      'A real example: the background colour of a primary button on hover. Four links, one single place where the value actually exists.',
    tokensChainFlow: [
      { label: 'Primitive', sublabel: 'ds.primitive.color.blue.800 — the only occurrence of the raw value' },
      { label: 'Semantic', sublabel: 'ds.semantic.color.primary.hover — alias of the primitive, carries the role' },
      { label: 'Component', sublabel: 'ds.component.button.primary.contained.bg.hover — alias of the semantic, button scope' },
      { label: 'CSS variable', sublabel: '--ds-component-button-primary-contained-bg-hover — what the product consumes' },
    ],
    tokensChainNote:
      'The practical consequence: a brand is created by overriding the primitive tier, or by activating another token set. No screen, no component, no stylesheet gets rewritten.',

    tokensCategoriesTitle: 'Categories covered',
    tokensCategoriesColumns: ['Category', 'What it covers', 'Semantic example'],
    tokensCategoriesRows: [
      ['color', 'Fills, borders, text, icons', 'ds.semantic.color.primary.default'],
      ['typography', 'Family, size, weight, line height', 'ds.semantic.typography.label.md'],
      ['spacing', 'Padding and layout spacing', 'ds.semantic.spacing.padding.horizontal.md'],
      ['elevation', 'Shadows and surface lift', 'ds.semantic.elevation.raised'],
      ['border', 'Widths and corner radii', 'ds.semantic.border.radius.component.md'],
    ],
    tokensScalesTitle: 'The base scales',
    tokensScales: [
      'Sizing: one scale from 4 to 48 px in steps of 4, named 2xs → 7xl. No in-between value can be invented in a mockup.',
      'Breakpoints: xs 0 · sm 600 · md 900 · lg 1200 · xl 1536 — identical in Figma and in code.',
      'Themes: light and dark are two token sets with identical names. Never a -light or -dark suffix in a name; the active set resolves the value.',
      'Colour roles: primary, error, success, warning, inherit (neutral), text, border. The role describes intent, never the shade.',
      'States, always the last segment: default, hover, pressed, focus, disabled. Focus is always a visible ring — WCAG requirement.',
    ],
    tokensVisual: 'The alias chain as it appears in Figma, and an excerpt of the three token tiers',
    tokensVisualFile: 'src/assets/case-studies/design-system/tokens-tiers.png',

    pipelineTitle: 'Design-to-code pipeline',
    pipelineIntro:
      'The premise: a developer retyping a value by hand is a guaranteed source of drift. So the goal was to remove the retyping step, not to document it better. Built with the Lead Tech.',
    pipelineFlow: [
      { label: 'Figma', sublabel: 'Variables and components. Component properties carry exactly the name the tokens use' },
      { label: 'Tokens Studio', sublabel: 'Tokens attached to elements, light / dark sets with identical names' },
      { label: 'GitHub repo', sublabel: 'Tokens are versioned and reviewed in pull requests, like code' },
      { label: 'Style Dictionary', sublabel: 'Automatic transformation into CSS variables, and other formats when needed' },
      { label: 'Products', sublabel: 'Every product consumes the same variables; a brand is an override, not a fork' },
    ],
    pipelineRulesTitle: 'The rules that hold the pipeline together',
    pipelineRules: [
      'The token name matches the Figma property name word for word. If the property is called contained, the token says contained — not filled. No translation layer, so nothing to maintain between the two worlds.',
      'Separator: the period, never the hyphen. Periods create groups you can bulk-edit in the tooling; hyphens produce a flat list.',
      'Lowercase letters, digits and periods only. Any other character breaks the transformation.',
      'A missing token is reported as a gap. You never approximate with the nearest primitive, and you never create a one-off value.',
    ],
    pipelineVisual: 'A token sync pull request, and the same component before / after a brand switch',
    pipelineVisualFile: 'src/assets/case-studies/design-system/pipeline-pr.png',

    governanceTitle: 'Governance',
    governanceIntro:
      'A design system with no entry rule becomes a library of orphan components within six months. The least visible part of the work — and the most decisive — was deciding who can add what, and on what condition.',
    governanceChecklistTitle: 'Adding a component: the order is imposed',
    governanceChecklist: [
      '1. Check whether a semantic token already covers the decision. Most colour, spacing and typography choices in a new component should reuse what exists rather than create something new.',
      '2. If the component genuinely departs from the semantic intent, create a component token that references that semantic — and whose name matches the Figma property.',
      '3. If no semantic covers the decision, create the semantic first. You never skip a tier.',
      '4. If no primitive carries the value, create the primitive first. The chain must always resolve: component → semantic → primitive → value.',
    ],
    governanceArbitrationTitle: 'Run vs unification arbitration',
    governanceArbitration: [
      'A pattern joins the system if it serves at least two products, or if it is structural for the brand. Otherwise it stays local, and that is owned as such.',
      'An exception requested by a product is first listened to as a real constraint — business, technical or user — before being refused.',
      'If the exception is necessary, it is documented as debt, with a review date. What is not written down becomes the product’s silent norm.',
      'Strict separation between the brand token, which can be overridden, and the structural token, which cannot. That line is what makes white-labelling governable.',
    ],
    governanceVisual: 'The governance documentation: naming convention, add-a-component checklist, update process',
    governanceVisualFile: 'src/assets/case-studies/design-system/governance-doc.png',

    resultsTitle: 'Results',
    resultsIntro:
      'The Lab’s rule applies here too: what is verified is presented as verified, and what isn’t does not become a claim.',
    resultsVerifiedTitle: 'Verified',
    resultsVerified: [
      'The alias chain resolves end to end: a value changed at the primitive tier reaches the CSS variable consumed in production with no manual step.',
      'Both themes share identical token names — switching theme requires no name change and no component change.',
      'Tokens are versioned and reviewed in pull requests: a design system change leaves a trace anyone can consult, exactly like a code change.',
      'The naming convention is written and usable by someone other than its author. That is what separates it from a personal habit — and what makes it survive a departure.',
      'Spinning up a brand no longer requires rewriting screens: the override happens at the value level.',
    ],
    resultsNoNumbersTitle: 'Why there are no numbers here',
    resultsNoNumbers:
      'The indicators that would matter — per-product adoption, time saved on handoff, post-development rework rate, brand spin-up time — live in the company’s tools. I no longer have access to them since leaving, and I had not set up measurement early enough to have kept a record. Estimating them today would produce exactly the kind of figure that does not survive one question in an interview.',
    resultsNoNumbersLesson:
      'That is the most useful lesson I take from this role, and it shows elsewhere on this site: the Workflow page defines its success indicators before starting, precisely so they never have to be reconstructed at the end. On the next system I set up, measurement will be part of the first iteration, not the last.',

    devTodoDecisionsTitle: 'DECISIONS MADE — DO NOT REINTRODUCE',
    devTodoDecisions: [
      'Confidentiality: neutral token prefix "ds.", no internal design system name, component library name or client name on the page. Held in the file comments too.',
      'Form: no 5-step grid on this page — it would be reconstructed after the fact. Outline used: context, problem, what I built, results. The note at the top of Overview states this explicitly.',
      'Numbers: no access to the metrics since leaving the company. The Results tab says so and draws a lesson from it, rather than leaving a hole or estimating.',
      'Content sources: the three token files and the naming guide kept in my archives from that role, plus the CV page. Nothing else.',
      'To check once: the process coverage (phases) in projects.js is a conservative estimate, and the dates come from the CV page.',
    ],
    devTodoVisualsTitle: 'VISUALS — THE MOST IMPORTANT POINT',
    devTodoVisuals: [
      'Three slots are reserved (Tokens, Pipeline, Governance tabs) and only show in dev.',
      'Drop the files into src/assets/case-studies/design-system/ under the names shown, then replace the VisualSlot with an img tag.',
      'Most convincing, in order: the alias chain visible in Figma, a token sync pull request, the same component under two brands, a screen before / after.',
      'Your screen exports in your archives from that role work as long as you replace the data, the logos and anything nominative.',
      'Without visuals this page is still text — and that is the one point in the analysis no rewrite can fix.',
    ],
  },
}

/* --- En-tête et pied de page façon dossier ----------------------------- *
 * Cette page ne passe plus par CaseStudyLayout pour son titre : un dossier
 * d'archive a son propre masthead, un tampon, une table de méta plutôt
 * qu'une simple liste, et un cartouche de bas de page — le même langage
 * que la home (voir ArchiveHome.jsx), appliqué à une fiche plutôt qu'à
 * l'index.
 * ------------------------------------------------------------------- */

function CaseMasthead({ c, lang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: 'var(--border-regular) solid var(--border)', marginBottom: 24, flexWrap: 'wrap' }}>
      <div>
        <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--text2)', textDecoration: 'none' }}>
          {t(lang, 'backToLab')}
        </Link>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 4 }}>{c.fileNo}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', color: 'var(--text2)', textAlign: 'center', flex: '1 1 200px' }}>
        {c.mastheadCenter}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text)' }}>{c.mastheadRight}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)' }}>{c.mastheadRightSub}</div>
      </div>
    </div>
  )
}

function CaseHero({ project, c }) {
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '18px 24px', borderBottom: 'var(--border-thin) solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              flexShrink: 0,
              border: 'var(--border-thin) solid var(--border)',
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              color: 'var(--primary)',
            }}
          >
            {project?.icon ?? '◼'}
          </span>
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.05, margin: '0 0 6px', color: 'var(--text)' }}>
              {c.title}
            </h1>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.04em', color: 'var(--text2)' }}>{c.role}</div>
          </div>
        </div>
        <Stamp label={c.stampLabel} size={72} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto', minWidth: 180, padding: '12px 24px', borderRight: 'var(--border-thin) solid var(--border)' }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 4 }}>{c.periodLabel}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{c.period}</div>
        </div>
        <div style={{ flex: '1 1 260px', padding: '12px 24px' }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 6 }}>{c.toolsLabel}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {c.tools.map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: 'var(--text2)',
                  border: 'var(--border-thin) solid var(--border)',
                  padding: '3px 8px',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Onglets du dossier — côte à côte, chacun avec sa propre teinte comme un
// intercalaire de tiroir d'archives. Celui qu'on ouvre se détache du lot
// (teinte neutre, à plat, marqué ✛) sans empiéter sur ses voisins.
const TAB_TINTS = [
  'color-mix(in srgb, var(--mandarine) 20%, var(--bg3))',
  'color-mix(in srgb, var(--violet) 16%, var(--bg3))',
  'color-mix(in srgb, var(--pink) 16%, var(--bg3))',
  'color-mix(in srgb, var(--warning) 18%, var(--bg3))',
  'color-mix(in srgb, var(--cyan) 16%, var(--bg3))',
]

function CaseTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 2, marginBottom: 8, overflowX: 'auto' }}>
      {tabs.map((tab, i) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
              background: isActive ? 'var(--bg2)' : TAB_TINTS[i % TAB_TINTS.length],
              border: 'var(--border-thin) solid var(--border)',
              borderBottom: isActive ? 'var(--border-regular) solid var(--primary)' : 'var(--border-thin) solid var(--border)',
              borderRadius: '3px 3px 0 0',
              padding: '6px 7px',
              cursor: 'pointer',
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--text)' : 'var(--text2)',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            <span style={{ color: isActive ? 'var(--primary)' : 'var(--muted)' }}>
              {isActive ? '✛' : String(i + 1).padStart(2, '0')}
            </span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function CaseFooter({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 40, paddingTop: 16, borderTop: 'var(--border-regular) solid var(--border)' }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.06em', color: 'var(--muted)' }}>
        {c.docId} — {c.clearance}
      </div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', color: 'var(--text)', textAlign: 'center', flex: '1 1 240px' }}>
        {c.tagline}
      </div>
      <Barcode />
    </div>
  )
}

export default function DesignSystemMultimarques({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseTabs tabs={c.tabs} active={activeTab} onChange={setActiveTab} />
      <CaseHero project={project} c={c} />

      {activeTab === 'overview' && (
        <>
          <DevTodo title={c.devTodoDecisionsTitle} items={c.devTodoDecisions} />

          <PlanNote>{c.planNote}</PlanNote>

          <Section title={c.contextTitle}>
            <p style={{ marginTop: 0, marginBottom: 16 }}>{c.context}</p>
            <p style={{ marginTop: 0, marginBottom: 16 }}>{c.contextScope}</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{c.contextConfidentiality}</p>
          </Section>

          <Section title={c.problemTitle}>
            <p style={{ marginTop: 0, marginBottom: 16 }}>{c.problemIntro}</p>
            <BulletList items={c.problem} />
            <p style={{ marginTop: 20, marginBottom: 0 }}>{c.problemCause}</p>
          </Section>

          <Section title={c.builtTitle}>
            <p style={{ marginTop: 0, marginBottom: 16 }}>{c.builtIntro}</p>
            <BulletList items={c.builtItems} />
          </Section>

          <Section title={c.builtIntlTitle}>
            <p style={{ margin: 0 }}>{c.builtIntl}</p>
          </Section>

          <Section title={c.lessonsTitle}>
            <BulletList items={c.lessons} />
          </Section>
        </>
      )}

      {activeTab === 'tokens' && (
        <>
          <Section title={c.tokensTitle}>
            <p style={{ margin: 0 }}>{c.tokensIntro}</p>
          </Section>

          <Section title={c.tokensTiersTitle}>
            <SimpleTable columns={c.tokensTiersColumns} rows={c.tokensTiersRows} monoColumn={2} />
          </Section>

          <Section title={c.tokensAnatomyTitle}>
            <p style={{ marginTop: 0, marginBottom: 24 }}>{c.tokensAnatomyIntro}</p>
            <TokenAnatomy segments={c.tokensAnatomySegments} />
            <p style={{ marginTop: 24, marginBottom: 0, fontSize: 13, color: 'var(--muted)' }}>{c.tokensAnatomyNote}</p>
          </Section>

          <Section title={c.tokensChainTitle}>
            <p style={{ marginTop: 0, marginBottom: 24 }}>{c.tokensChainIntro}</p>
            <div style={{ marginBottom: 24, overflowX: 'auto' }}>
              <FlowDiagram steps={c.tokensChainFlow} direction="vertical" />
            </div>
            <p style={{ margin: 0 }}>{c.tokensChainNote}</p>
          </Section>

          <Section title={c.tokensCategoriesTitle}>
            <SimpleTable columns={c.tokensCategoriesColumns} rows={c.tokensCategoriesRows} monoColumn={2} />
          </Section>

          <Section title={c.tokensScalesTitle}>
            <BulletList items={c.tokensScales} />
          </Section>

          <VisualSlot label={c.tokensVisual} file={c.tokensVisualFile} />
        </>
      )}

      {activeTab === 'pipeline' && (
        <>
          <Section title={c.pipelineTitle}>
            <p style={{ marginTop: 0, marginBottom: 24 }}>{c.pipelineIntro}</p>
            <div style={{ overflowX: 'auto' }}>
              <FlowDiagram steps={c.pipelineFlow} direction="vertical" />
            </div>
          </Section>

          <Section title={c.pipelineRulesTitle}>
            <BulletList items={c.pipelineRules} />
          </Section>

          <VisualSlot label={c.pipelineVisual} file={c.pipelineVisualFile} />
        </>
      )}

      {activeTab === 'governance' && (
        <>
          <Section title={c.governanceTitle}>
            <p style={{ margin: 0 }}>{c.governanceIntro}</p>
          </Section>

          <Section title={c.governanceChecklistTitle}>
            <BulletList items={c.governanceChecklist} />
          </Section>

          <Section title={c.governanceArbitrationTitle}>
            <BulletList items={c.governanceArbitration} />
          </Section>

          <VisualSlot label={c.governanceVisual} file={c.governanceVisualFile} />
        </>
      )}

      {activeTab === 'results' && (
        <>
          <DevTodo title={c.devTodoVisualsTitle} items={c.devTodoVisuals} />

          <Section title={c.resultsTitle}>
            <p style={{ margin: 0 }}>{c.resultsIntro}</p>
          </Section>

          <Section title={c.resultsVerifiedTitle}>
            <BulletList items={c.resultsVerified} />
          </Section>

          <Section title={c.resultsNoNumbersTitle}>
            <p style={{ marginTop: 0, marginBottom: 16 }}>{c.resultsNoNumbers}</p>
            <p style={{ margin: 0 }}>{c.resultsNoNumbersLesson}</p>
          </Section>
        </>
      )}

      <CaseFooter c={c} />
    </div>
  )
}
