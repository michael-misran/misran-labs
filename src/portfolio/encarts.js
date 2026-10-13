// Encarts du portfolio : les emplacements d'images et de maquettes du livre.
// Pour remplir un encart : déposer le fichier dans public/portfolio/ et
// renseigner `image` (ex. '/portfolio/workflow-board.jpg'). Tant que `image`
// vaut null, le livre affiche un cadre vide :
// - en local (npm run dev) ou avec ?atelier dans l'adresse : la consigne
//   « À ajouter » est lisible dans le cadre ;
// - en production : seulement le cadre hachuré et la légende.
// - ratio : proportion conseillée du visuel (largeur / hauteur) ; sans ratio,
//   l'encart prend toute la place libre de la page.

export const ENCARTS = {
  portrait: {
    image: null,
    ratio: '4 / 5',
    legende: { fr: 'Michael Misran', en: 'Michael Misran' },
    consigne: 'Une photo portrait, lumière naturelle, fond neutre. Pas forcément souriant : net et sobre.',
  },
  'workflow-board': {
    image: null,
    legende: { fr: 'Le tableau de bord du run et de l’unification', en: 'The run & unification board' },
    consigne: 'Capture du board (Figma / FigJam / Notion) qui montre les demandes produit A, B, C et la colonne design system. Flouter les noms de clients.',
  },
  'workflow-rituels': {
    image: null,
    ratio: '16 / 9',
    legende: { fr: 'Un atelier de co-conception (Europe, Amérique, Inde)', en: 'A co-design workshop (Europe, Americas, India)' },
    consigne: 'Photo ou capture d’un atelier : post-its, FigJam, tableau blanc. Sans visage identifiable sans accord.',
  },
  'ds-figma': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Variables Figma : primitives, sémantiques, composants', en: 'Figma variables: primitive, semantic, component' },
    consigne: 'Capture du panneau Variables de Figma avec les collections par marque (modes). Idéalement deux marques côte à côte.',
  },
  'ds-github': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Les tokens synchronisés dans le dépôt GitHub', en: 'Tokens synced into the GitHub repo' },
    consigne: 'Capture d’une pull request automatique de tokens (diff JSON) ou du fichier tokens dans le dépôt. Masquer le nom de l’organisation.',
  },
  'ds-composants': {
    image: null,
    ratio: '16 / 9',
    legende: { fr: 'Un même composant, trois marques', en: 'One component, three brands' },
    consigne: 'Planche Figma : un bouton ou une carte décliné dans les marques (marque blanche). Exporter en PNG 2x.',
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
