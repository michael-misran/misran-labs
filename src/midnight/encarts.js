// Encarts d'illustration du livre Midnight Snack : mêmes principes que
// src/portfolio/encarts.js, avec un champ en plus : `promptGemini`, un prompt
// prêt à copier dans Gemini (D5 — aucune image générée ni téléchargée par la
// mission elle-même). Tant que `image` vaut null, le livre affiche un cadre
// vide ; en atelier (npm run dev ou ?atelier), la consigne et le prompt sont
// lisibles dans le cadre. Pour remplir un encart : déposer le fichier dans
// public/midnight/ et renseigner `image` (ex. '/midnight/recit-frigo.jpg').

export const ENCARTS = {
  'recit-frigo': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'La lumière qui ne devrait pas être là', en: 'The light that shouldn’t be there' },
    consigne: 'Une cuisine la nuit, dans le noir, avec un rectangle de lumière froide au mur — l’ombre d’un frigo qui n’existe pas.',
    promptGemini: 'Illustration pulp horror comic style, dark kitchen at night, a rectangle of cold blue light glowing on an empty wall where a fridge should be, no actual fridge visible, unsettling, muted colors, grain, in the style of 1980s horror comic covers',
  },
  'recit-commit': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'Minuit pile, le terminal répond tout seul', en: 'Midnight exactly, the terminal answers on its own' },
    consigne: 'Un bureau de développeur la nuit, écran qui affiche du code, mais une ligne de terminal écrite par « quelqu’un d’autre ».',
    promptGemini: 'Illustration pulp techno-horror comic style, dark home office at night lit only by a monitor, terminal window with glowing green text typing itself, developer leaning back startled, eerie cyberpunk mood, grain, 1980s comic ink style',
  },
  'recit-cartouche': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'La cartouche sans étiquette, trouvée dans une caisse', en: 'The unlabeled cartridge, found in a crate' },
    consigne: 'Une cartouche de jeu vidéo grise, sans étiquette, posée sur une table de vide-grenier encombrée, lumière de fin d’après-midi.',
    promptGemini: 'Illustration pulp retro-horror comic style, a blank unlabeled grey video game cartridge sitting on a cluttered flea market table, late afternoon light, slightly ominous close-up, 1980s comic ink style, warm nostalgic colors turning cold at the edges',
  },
  'recette-casse-croute': {
    image: null,
    ratio: '4 / 3',
    legende: { fr: 'Le casse-croûte du raton', en: 'The raccoon’s midnight snack' },
    consigne: 'Photo ou illustration façon fiche cuisine des années 1970 : l’assiette finale du casse-croûte de minuit, vue de dessus.',
    promptGemini: 'Retro 1970s cookbook photography style, top-down view of a midnight snack plate on a checkered tablecloth, warm kitchen lighting, slightly kitsch styling, film grain, muted orange and brown tones',
  },
  'feuilleton-cauldron': {
    image: null,
    ratio: '16 / 10',
    legende: { fr: 'The Lost Cauldron — épisode 1', en: 'The Lost Cauldron — episode 1' },
    consigne: 'Rendu Blender de Michael (pas une image générée) : scène clé de l’épisode 1 du feuilleton.',
    promptGemini: null,
  },
  'marmite-avant-apres': {
    image: null,
    ratio: '16 / 9',
    legende: { fr: 'Du croquis au sprite', en: 'From sketch to sprite' },
    consigne: 'Montage en trois temps : croquis papier → rendu Blender → sprite final dans le jeu.',
    promptGemini: null,
  },
}
