// Encarts du portfolio : les emplacements d'images et de maquettes du livre.
// Pour remplir un encart : déposer le fichier dans public/portfolio/ et
// renseigner `image` (ex. '/portfolio/workflow-board.jpg'). Tant que `image`
// vaut null, le livre affiche un cadre vide :
// - en local (npm run dev) ou avec ?atelier dans l'adresse : la consigne
//   « À ajouter » est lisible dans le cadre ;
// - en production : seulement le cadre hachuré et la légende.
// - ratio : proportion conseillée du visuel (largeur / hauteur) ; sans ratio,
//   l'encart prend toute la place libre de la page.
// - entier: true : l'image est affichée en entier, jamais rognée (schémas).

export const ENCARTS = {
  portrait: {
    image: null,
    ratio: '4 / 5',
    legende: { fr: 'Michael Misran', en: 'Michael Misran' },
    consigne: 'Une photo portrait, lumière naturelle, fond neutre. Pas forcément souriant : net et sobre.',
  },
  'workflow-board': {
    image: '/portfolio/workflow-board.jpg',
    entier: true,
    legende: { fr: 'La feuille de route du design system, de février à avril', en: 'The design system roadmap, February to April' },
    consigne: 'Gantt de la roadmap (POC, primitives, sémantique, composants, passation), extrait du fichier Figma « workflow ».',
  },
  'workflow-rituels': {
    image: '/portfolio/workflow-rituels.jpg',
    entier: true,
    ratio: '16 / 9',
    legende: { fr: 'Plusieurs designers sur un même système : branches et relecture', en: 'Several designers, one system: branches and peer review' },
    consigne: 'Workflow de branches Figma entre designers, extrait du fichier Figma « workflow ».',
  },
  'ds-figma': {
    image: '/portfolio/ds-figma.jpg',
    entier: true,
    ratio: '16 / 10',
    legende: { fr: 'Variables Figma : primitives, sémantiques, composants', en: 'Figma variables: primitive, semantic, component' },
    consigne: 'Capture du panneau Variables de Figma avec les collections par marque (modes). Idéalement deux marques côte à côte.',
  },
  'ds-github': {
    image: '/portfolio/ds-github.jpg',
    entier: true,
    ratio: '16 / 10',
    legende: { fr: 'De la variable Figma au thème du code : quatre niveaux', en: 'From Figma variable to code theme: four levels' },
    consigne: 'Schéma des quatre niveaux de tokens (primitive, sémantique, composant, thème MUI), extrait du fichier Figma « workflow ».',
  },
  'ds-composants': {
    image: '/portfolio/ds-composants.jpg',
    entier: true,
    ratio: '16 / 9',
    legende: { fr: 'Avant de créer un composant : l’arbre de décision', en: 'Before building a component: the decision tree' },
    consigne: 'Arbre de décision « nouveau composant », extrait du fichier Figma « workflow », logo du client retiré.',
  },
  'ia-session': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Une mission autonome en cours dans Claude Code', en: 'An autonomous mission running in Claude Code' },
    consigne: 'Capture d’une session Claude Code ou du dossier missions/ (SPEC, PLAN, RAPPORT). Vérifier qu’aucun secret n’apparaît.',
  },
  'ia-figma-mcp': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Figma MCP : de la maquette au code, et retour', en: 'Figma MCP: from mockup to code and back' },
    consigne: 'Avant / après : une maquette Figma et l’écran généré à côté, ou une capture de l’agent qui lit la maquette.',
  },
  'agents-mission': {
    image: null,
    legende: { fr: 'Le rapport d’une mission menée de nuit', en: 'The report of an overnight mission' },
    consigne: 'Capture d’un RAPPORT.md de mission ou de la pull request ouverte par la routine (liste des étapes, modèle par étape). Vérifier qu’aucun secret n’apparaît.',
  },
  'iad-ecran': {
    image: null,
    legende: { fr: 'Outil de facturation des conseillers (refonte)', en: 'Advisor billing tool (redesign)' },
    consigne: 'La maquette la plus forte des outils métiers IAD (facturation, rémunération ou rapprochement). Données fictives ou floutées : demander l’accord si besoin.',
  },
  'iad-parcours': {
    image: null,
    ratio: '16 / 9',
    legende: { fr: 'Parcours utilisateur et tests', en: 'User journey and testing' },
    consigne: 'Un parcours utilisateur, un wireframe annoté ou une photo de session de test.',
  },
  'lab-site': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Misran Labs, le magazine', en: 'Misran Labs, the magazine' },
    consigne: 'Capture de la couverture du magazine ou de la bibliothèque (ce site).',
  },
  'lab-audit': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'L’outil d’audit de tokens', en: 'The token audit tool' },
    consigne: 'Capture du rapport d’audit (/lab/audit-tokens) avec un jeu de tokens d’exemple.',
  },
  'lab-jeu': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'The Lost Cauldron (Godot)', en: 'The Lost Cauldron (Godot)' },
    consigne: 'Capture du jeu en action, ou d’une planche de personnages.',
  },
  recommandations: {
    image: null,
    legende: { fr: 'Ils ont travaillé avec moi', en: 'People I worked with' },
    consigne: 'Deux ou trois recommandations LinkedIn (capture ou texte recopié avec le nom et le poste de la personne, avec son accord).',
  },
}
