// Registre des kits UI.
//
// Pour ajouter un kit : créer src/kits/<id>.css avec un bloc
// [data-kit="<id>"] qui redéfinit les tokens d'expression (et, si le kit
// en a besoin, un bloc [data-kit="<id>"] [data-invert] pour sa portée
// inversée et [data-kit="<id>"] .shell-chrome pour le chrome), importer
// ce fichier ci-dessous, puis ajouter une entrée dans KITS. Rien d'autre.
// Aucun composant ne connaît la liste des kits.

import './neumorphism.css'
import './brutalist.css'
import './retro.css'

export const KITS = [
  {
    id: 'neumorphism',
    label: { fr: 'Neumorphisme', en: 'Neumorphism' },
    short: 'NEUMO',
    description: {
      fr: 'Crème et teal profond. La profondeur porte l’information : relief, creux, enfoncé.',
      en: 'Cream and deep teal. Depth carries the information: raised, inset, pressed.',
    },
    // Polices chargées uniquement quand le kit est actif.
    fonts: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap',
  },
  {
    id: 'brutalist',
    label: { fr: 'Brutaliste', en: 'Brutalist' },
    short: 'BRUTAL',
    description: {
      fr: 'Papier, encre noire, accent citron. Rayon zéro, bordures épaisses, décalages sans flou.',
      en: 'Paper, ink black, lime accent. Zero radius, thick borders, hard offsets with no blur.',
    },
    fonts: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap',
  },
  {
    id: 'retro',
    label: { fr: 'Rétro', en: 'Retro' },
    short: 'RETRO',
    description: {
      fr: 'Crème et corail brûlé. Filets fins, aplats nets, une seule couleur qui porte l’emphase.',
      en: 'Cream and burnt coral. Hairline rules, flat blocks, one color carries the emphasis.',
    },
    fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,900&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap',
  },
]

export const DEFAULT_KIT = 'retro'

export function getKit(id) {
  return KITS.find((k) => k.id === id) ?? KITS[0]
}

export function kitLabel(kit, lang) {
  return kit.label[lang] ?? kit.label.fr
}

export function kitDescription(kit, lang) {
  return kit.description[lang] ?? kit.description.fr
}
