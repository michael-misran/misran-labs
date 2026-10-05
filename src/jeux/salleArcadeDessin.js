// Dessin pixel art de la salle d'arcade (vue isométrique 2:1), sans
// dépendance : la scène est calculée dans un tampon basse résolution puis
// posée dans un <canvas> agrandi en image-rendering: pixelated.
//
// Repère monde : x le long du grand mur (vers la droite), y vers le
// spectateur (vers le bas à gauche), z vers le haut. Une unité ≈ un pixel.

export const LARGEUR = 264
export const HAUTEUR = 226
const OX = 86
const OY = 97

// Dimensions de la pièce
const LX = 170
const LY = 78
const HZ = 92

// Borne : largeur (x), profondeur (y), profil de côté (y, z) du dos au
// fronton, comme une vraie borne (caisson, pupitre en saillie, écran
// incliné, fronton en surplomb).
const BORNE_L = 24
const BORNE_Y0 = 3
const PROFIL = [
  [0, 0], [17, 0], [17, 26], [21, 27], [21, 31], [15, 33], [12, 47], [17, 48], [17, 60], [0, 60],
]
const ECART = 10

// Palette « salle d'arcade des années 80 » : pièce sombre (briques,
// moquette bleu nuit à confettis fluo), bornes de couleurs vives, enseigne
// néon rose et cyan.
export const NEON = {
  rose: '#ff3fa4',
  roseClair: '#ffc2e6',
  cyan: '#2fe6ff',
  jaune: '#f7e04a',
  vert: '#5cf06a',
  nuit: '#1c2152',
}

// meta.couleur → caisson et décor de la borne, façon Pac-Man (jaune),
// Donkey Kong (bleu), Space Invaders (blanc)
const BORNES = {
  mandarine: { corps: '#f7c531', art: '#e8402a' },
  violet: { corps: '#3d7fd9', art: '#f7c531' },
  cyan: { corps: '#e9edf2', art: '#2f6fd6' },
}
const BORNE_DEFAUT = { corps: '#e8402a', art: '#f7c531' }
const styleBorne = (jeu) => BORNES[jeu.couleur] ?? BORNE_DEFAUT

// Couleur principale de chaque borne (plaque, lueur au sol)
export const COULEURS = Object.fromEntries(Object.entries(BORNES).map(([k, v]) => [k, v.corps]))

// --- Icônes des jeux (sprites) -----------------------------------------------

const ICONES = {
  'geste-parfait': [
    '..XXXX..',
    '.X....X.',
    'X..XX..X',
    'X.X..X.X',
    'X.X..X.X',
    'X..XX..X',
    '.X....X.',
    '..XXXX..',
  ],
  'a-vue-d-oeil': [
    '..XXXX..',
    '.X....X.',
    'X..WW..X',
    'X.WBBW.X',
    'X.WBBW.X',
    'X..WW..X',
    '.X....X.',
    '..XXXX..',
  ],
  'comme-tout-le-monde': [
    '.XX...XX.',
    '.XX...XX.',
    '.........',
    'XXXX.XXXX',
    'XXXX.XXXX',
    'XXXX.XXXX',
    '.XX...XX.',
    '.XX...XX.',
  ],
}
const ICONE_DEFAUT = [
  '...XX...',
  '...XX...',
  'XXXXXXXX',
  '.XXXXXX.',
  '..XXXX..',
  '.XX..XX.',
  'XX....XX',
  '........',
]

const FANTOME = [
  '...XXXX...',
  '.XXXXXXXX.',
  'XXWWXXXWWX',
  'XWWBBXWWBB',
  'XXWWXXXWWX',
  'XXXXXXXXXX',
  'XXXXXXXXXX',
  'XXXXXXXXXX',
  'X.XX..XX.X',
]

const ENVAHISSEUR = [
  '..X.....X..',
  '...X...X...',
  '..XXXXXXX..',
  '.XX.XXX.XX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
]

const PLANTE = [
  '........G.........',
  '...G....Gg....G...',
  '....G..gGg...Gg...',
  'G...Gg.gGgG.GgG..g',
  '.GG..GgGgGgGgG..gG',
  '..GGg.GgGgGgG.gGG.',
  '....GGgGgGgGgGg...',
  'GGg...gGgGgGg...gG',
  '.gGGgGgGgGgGgGgGG.',
  '...gGgGgGgGgGgGg..',
  '.....gGgGgGgGg....',
  '......gGgGgGg.....',
  '.....bBBBBBBBb....',
  '.....bBBBBBBBb....',
  '......bBBBBBb.....',
  '......bBBBBBb.....',
  '......bBBBBBb.....',
  '.......bbbbb......',
]

const ROBOT = [
  '...RRRR...',
  '...RWWR...',
  '...RRRR...',
  '....GG....',
  '.BBBBBBBB.',
  'BB.BBBB.BB',
  'BB.BYYB.BB',
  'BB.BBBB.BB',
  'RR.BBBB.RR',
  '...BB.BB..',
  '...BB.BB..',
  '..RRR.RRR.',
]

const FLECHE = [
  'XXXXXXX',
  '.XXXXX.',
  '..XXX..',
  '...X...',
]

const COCHE = [
  '....X',
  '...XX',
  'X.XX.',
  'XXX..',
  '.X...',
]

// Police 3 × 5 pour le néon
const POLICE = {
  A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'],
  B: ['XX.', 'X.X', 'XX.', 'X.X', 'XX.'],
  C: ['.XX', 'X..', 'X..', 'X..', '.XX'],
  D: ['XX.', 'X.X', 'X.X', 'X.X', 'XX.'],
  E: ['XXX', 'X..', 'XX.', 'X..', 'XXX'],
  F: ['XXX', 'X..', 'XX.', 'X..', 'X..'],
  G: ['.XX', 'X..', 'X.X', 'X.X', '.XX'],
  H: ['X.X', 'X.X', 'XXX', 'X.X', 'X.X'],
  I: ['XXX', '.X.', '.X.', '.X.', 'XXX'],
  J: ['..X', '..X', '..X', 'X.X', '.X.'],
  K: ['X.X', 'X.X', 'XX.', 'X.X', 'X.X'],
  L: ['X..', 'X..', 'X..', 'X..', 'XXX'],
  M: ['X.X', 'XXX', 'XXX', 'X.X', 'X.X'],
  N: ['XX.', 'X.X', 'X.X', 'X.X', 'X.X'],
  O: ['.X.', 'X.X', 'X.X', 'X.X', '.X.'],
  P: ['XX.', 'X.X', 'XX.', 'X..', 'X..'],
  Q: ['.X.', 'X.X', 'X.X', 'XX.', '.XX'],
  R: ['XX.', 'X.X', 'XX.', 'X.X', 'X.X'],
  S: ['.XX', 'X..', '.X.', '..X', 'XX.'],
  T: ['XXX', '.X.', '.X.', '.X.', '.X.'],
  U: ['X.X', 'X.X', 'X.X', 'X.X', 'XXX'],
  V: ['X.X', 'X.X', 'X.X', 'X.X', '.X.'],
  W: ['X.X', 'X.X', 'XXX', 'XXX', 'X.X'],
  X: ['X.X', 'X.X', '.X.', 'X.X', 'X.X'],
  Y: ['X.X', 'X.X', '.X.', '.X.', '.X.'],
  Z: ['XXX', '..X', '.X.', 'X..', 'XXX'],
  '’': ['X', 'X', '.', '.', '.'],
  "'": ['X', 'X', '.', '.', '.'],
}

// Texte → sprite (lettres de 3 px, espace de 1 px)
function texteSprite(texte) {
  const lignes = ['', '', '', '', '']
  for (const car of texte.toUpperCase()) {
    const g = POLICE[car] ?? ['...', '...', '...', '...', '...']
    for (let i = 0; i < 5; i++) lignes[i] += g[i] + '.'
  }
  return lignes.map((l) => l.slice(0, -1))
}

// --- Couleurs -----------------------------------------------------------------

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Mélange de deux couleurs [r,g,b] (t = part de b)
function mix(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t].map(Math.round)
}

const NOIR = [17, 17, 17]
const BLANC = [255, 255, 255]
const ombre = (c, t) => mix(c, NOIR, t)
const clair = (c, t) => mix(c, BLANC, t)

// --- Moteur -------------------------------------------------------------------

function creerTampon() {
  return {
    px: new Uint8ClampedArray(LARGEUR * HAUTEUR * 4),
    id: new Int16Array(LARGEUR * HAUTEUR),
  }
}

function proj(x, y, z) {
  return [OX + x - y, OY + (x + y) / 2 - z]
}

function poser(t, sx, sy, c, id) {
  const px = Math.floor(sx + 1e-6)
  const py = Math.floor(sy + 1e-6)
  if (px < 0 || py < 0 || px >= LARGEUR || py >= HAUTEUR) return
  const i = py * LARGEUR + px
  t.px[i * 4] = c[0]
  t.px[i * 4 + 1] = c[1]
  t.px[i * 4 + 2] = c[2]
  t.px[i * 4 + 3] = 255
  t.id[i] = id
}

// Face plane en parallélogramme : origine o, directions unitaires u et v,
// longueurs lu et lv. tex(a, b) renvoie une couleur ou null (transparent).
// Rendu par échantillonnage serré : pas de trous, bords en escalier 2:1.
function face(t, o, u, v, lu, lv, tex, id = 0) {
  for (let a = 0; a < lu; a += 0.5) {
    for (let b = 0; b < lv; b += 0.5) {
      const c = tex(a, b)
      if (!c) continue
      const [sx, sy] = proj(o[0] + u[0] * a + v[0] * b, o[1] + u[1] * a + v[1] * b, o[2] + u[2] * a + v[2] * b)
      poser(t, sx, sy, c, id)
    }
  }
}

// Sprite posé dans un plan (affiche, icône) : chaque caractère = 1 unité
function spriteTex(sprite, palette, a0 = 0, b0 = 0) {
  return (a, b) => {
    const ligne = sprite[Math.floor(b - b0)]
    if (!ligne) return null
    const car = ligne[Math.floor(a - a0)]
    return car && car !== '.' ? palette[car] : null
  }
}

// Sprite à plat sur l'écran (objets posés au sol, flèche)
function spriteEcran(t, sx, sy, sprite, palette, id = 0) {
  sprite.forEach((ligne, j) => {
    for (let i = 0; i < ligne.length; i++) {
      const c = palette[ligne[i]]
      if (c) poser(t, sx + i, sy + j, c, id)
    }
  })
}

// Sprite debout au sol : pieds centrés sur le point (x, y)
function surSol(t, x, y, sprite, palette, id) {
  const [sx, sy] = proj(x, y, 0)
  spriteEcran(t, Math.round(sx - sprite[0].length / 2), Math.round(sy) - sprite.length, sprite, palette, id)
}

function dansPolygone(p, y, z) {
  let dedans = false
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [yi, zi] = p[i]
    const [yj, zj] = p[j]
    if (zi > z !== zj > z && y < ((yj - yi) * (z - zi)) / (zj - zi) + yi) dedans = !dedans
  }
  return dedans
}

// Contour sombre des objets : un pixel au bord d'un objet (voisin d'un
// autre identifiant) est assombri, comme le trait des sprites.
function contours(t) {
  const copie = new Uint8ClampedArray(t.px)
  for (let y = 0; y < HAUTEUR; y++) {
    for (let x = 0; x < LARGEUR; x++) {
      const i = y * LARGEUR + x
      const id = t.id[i]
      if (id <= 0) continue
      const voisins = [x > 0 ? i - 1 : -1, x < LARGEUR - 1 ? i + 1 : -1, y > 0 ? i - LARGEUR : -1, y < HAUTEUR - 1 ? i + LARGEUR : -1]
      if (voisins.some((n) => n >= 0 && t.id[n] !== id)) {
        copie[i * 4] = t.px[i * 4] * 0.3
        copie[i * 4 + 1] = t.px[i * 4 + 1] * 0.3
        copie[i * 4 + 2] = t.px[i * 4 + 2] * 0.35
      }
    }
  }
  t.px.set(copie)
}

// Vecteurs usuels
const X = [1, 0, 0]
const Y = [0, 1, 0]
const Zbas = [0, 0, -1]
const Zhaut = [0, 0, 1]

// --- Pièce ----------------------------------------------------------------------

// Hachage entier pour placer les confettis de la moquette
function hache(a, b) {
  let h = (a * 73856093) ^ (b * 19349663)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return (h ^ (h >>> 16)) >>> 0
}

const CONFETTIS = [NEON.rose, NEON.cyan, NEON.jaune, NEON.vert].map(rgb)

function sol(t, lueurs) {
  const fond = rgb(NEON.nuit)
  face(t, [0, 0, 0], X, Y, LX, LY, (x, y) => {
    // Moquette « cosmique » : un petit motif fluo dans une case de 7 sur 3
    const cx = Math.floor(x / 7)
    const cy = Math.floor(y / 7)
    const h = hache(cx, cy)
    const lx = Math.floor(x - cx * 7)
    const ly = Math.floor(y - cy * 7)
    let c = fond
    if (h % 2 === 0) {
      const forme = (h >>> 3) % 3
      const dans =
        forme === 0 ? (lx === 2 && ly === 2) || (lx === 3 && ly === 3) || (lx === 4 && ly === 2)
          : forme === 1 ? ly === 3 && lx >= 1 && lx <= 4
            : (lx === 2 && ly >= 2 && ly <= 4) || (ly === 4 && lx === 3)
      if (dans) c = CONFETTIS[(h >>> 6) % 4]
    }
    for (const l of lueurs) {
      const dx = (x - l.x) / l.rx
      const dy = (y - l.y) / l.ry
      const d = dx * dx + dy * dy
      if (d < 1) c = mix(c, l.c, d < 0.4 ? 0.4 : 0.2)
    }
    return c
  })
  // Tranche du plancher
  face(t, [0, LY, 0], X, Zbas, LX, 4, () => rgb('#12153a'))
  face(t, [LX, 0, 0], Y, Zbas, LY, 4, () => rgb('#0d102c'))
}

// Briques rouges (u = position le long du mur, b = distance depuis le
// haut), un peu assombries : la salle est dans la pénombre
const BRIQUES = ['#a63f2c', '#9a3827', '#b04732'].map(rgb)
const JOINT = rgb('#5e241b')

function brique(u, b) {
  const rang = Math.floor(b / 4)
  const decal = rang % 2 ? 4 : 0
  if (b % 4 < 1 || (u + decal) % 8 < 1) return JOINT
  const c = BRIQUES[hache(Math.floor((u + decal) / 8), rang) % 3]
  // Pénombre en haut du mur
  return b < 10 ? ombre(c, 0.35) : b < 20 ? ombre(c, 0.18) : c
}

function murs(t) {
  const plinthe = rgb('#2a1a18')
  face(t, [0, 0, HZ], X, Zbas, LX, HZ, (x, b) => (b > HZ - 3 ? plinthe : brique(x, b)))
  // Petit mur, plus sombre
  face(t, [0, 0, HZ], Y, Zbas, LY, HZ, (y, b) => (b > HZ - 3 ? plinthe : ombre(brique(y + 3, b), 0.22)))
  // Épaisseur des murs : chants et dessus
  const chant = rgb('#4a2c26')
  face(t, [-4, -4, HZ], X, Y, LX + 4, 4, () => chant)
  face(t, [-4, 0, HZ], X, Y, 4, LY, () => chant)
  face(t, [LX, -4, HZ], Y, Zbas, 4, HZ, () => rgb('#3a201b'))
  face(t, [-4, LY, HZ], X, Zbas, 4, HZ + 4, () => rgb('#2e1915'))
}

// Rectangle peint sur le grand mur (x0, z du haut)
function surGrandMur(t, x0, zHaut, l, h, tex) {
  face(t, [x0, 0.01, zHaut], X, Zbas, l, h, tex)
}

// Rectangle peint sur le petit mur (y0, z du haut)
function surPetitMur(t, y0, zHaut, l, h, tex) {
  face(t, [0.01, y0, zHaut], Y, Zbas, l, h, tex)
}

// Enseigne néon : lettres roses en tube (police 3 × 5 doublée), cadre en
// tube cyan, halo qui teinte les briques. Éteinte, elle redevient grise.
export function largeurEnseigne(texte) {
  return texteSprite(texte)[0].length * 2 + 12
}

function enseigne(t, texte, x0, allume) {
  const sprite = texteSprite(texte)
  const W = largeurEnseigne(texte)
  const H = 18
  const zHaut = 89
  const lettre = (a, b) => sprite[Math.floor((b - 4) / 2)]?.[Math.floor((a - 6) / 2)] === 'X'
  const rose = rgb(NEON.rose)
  const cyan = rgb(NEON.cyan)
  surGrandMur(t, x0, zHaut, W, H, (a, b) => {
    const mur = brique(x0 + a, HZ - zHaut + b)
    if (lettre(a, b)) {
      if (!allume) return rgb('#6b3150')
      // Reflet clair en haut à gauche de chaque tube
      return (a - 6) % 2 < 1 && (b - 4) % 2 < 1 ? rgb(NEON.roseClair) : rose
    }
    const tube = (a >= 1 && a < 2) || (a >= W - 2 && a < W - 1) || (b >= 1 && b < 2) || (b >= H - 2 && b < H - 1)
    const dansCadre = a >= 1 && a < W - 1 && b >= 1 && b < H - 1
    if (tube && dansCadre && !(a < 3 && b < 3) && !(a >= W - 3 && b < 3) && !(a < 3 && b >= H - 3) && !(a >= W - 3 && b >= H - 3)) {
      return allume ? cyan : rgb('#2c5560')
    }
    if (!allume) return null
    // Halo : rose autour des lettres, cyan autour du cadre
    if (lettre(a - 1, b) || lettre(a + 1, b) || lettre(a, b - 1) || lettre(a, b + 1)) return mix(mur, rose, 0.5)
    if (lettre(a - 2, b - 1) || lettre(a + 2, b + 1) || lettre(a + 1, b - 2) || lettre(a - 1, b + 2)) return mix(mur, rose, 0.25)
    if (a < 3 || a >= W - 3 || b < 3 || b >= H - 3) return mix(mur, cyan, 0.3)
    return null
  })
}

function affiches(t) {
  const noir = rgb('#141418')
  const cadre = rgb('#1a1918')
  const encadre = (l, h, interieur) => (a, b) =>
    a < 1 || b < 1 || a >= l - 1 || b >= h - 1 ? cadre : interieur(a - 1, b - 1)

  // Grand mur, à gauche : envahisseur
  surGrandMur(t, 4, 52, 16, 13, encadre(16, 13, (a, b) =>
    spriteTex(ENVAHISSEUR, { X: rgb(NEON.vert) }, 2, 2)(a, b) ?? noir))

  // Grand mur, à droite : pop art en quatre cases
  const cases = [
    [NEON.jaune, NEON.rose],
    [NEON.cyan, '#2f6fd6'],
    [NEON.rose, NEON.jaune],
    ['#2f6fd6', NEON.cyan],
  ].map(([f, r]) => [rgb(f), rgb(r)])
  surGrandMur(t, 140, 54, 18, 18, encadre(18, 18, (a, b) => {
    const i = (a >= 8 ? 1 : 0) + (b >= 8 ? 2 : 0)
    const cx = (a % 8) - 4
    const cy = (b % 8) - 4
    return cx * cx + cy * cy < 7 ? cases[i][1] : cases[i][0]
  }))

  // Petit mur : deux fantômes et un Pac-Man
  const fantome = (couleur) => encadre(14, 13, (a, b) =>
    spriteTex(FANTOME, { X: rgb(couleur), W: BLANC, B: rgb('#2340ff') }, 1, 1.5)(a, b) ?? noir)
  surPetitMur(t, 6, 62, 14, 13, fantome('#ff2a2a'))
  surPetitMur(t, 24, 56, 22, 18, encadre(22, 18, (a, b) => {
    const cx = a - 8
    const cy = b - 8
    const bouche = cx > 0 && Math.abs(cy) < cx * 0.7
    if (cx * cx + cy * cy < 36 && !bouche) return rgb('#ffe100')
    if (b >= 7.5 && b < 8.5 && a >= 15 && Math.floor(a) % 3 === 0) return rgb('#ffb8ae')
    return rgb('#0c0c30')
  }))
  surPetitMur(t, 52, 62, 14, 13, fantome('#ffb8ff'))
  // Pong, plus bas
  surPetitMur(t, 50, 42, 18, 13, encadre(18, 13, (a, b) => {
    if (a >= 2 && a < 3 && b >= 3 && b < 7) return BLANC
    if (a >= 13 && a < 14 && b >= 4 && b < 8) return BLANC
    if (a >= 9 && a < 10 && b >= 5 && b < 6) return BLANC
    if (a >= 7.5 && a < 8 && Math.floor(b) % 2 === 0) return rgb('#777777')
    return noir
  }))
}

// --- Objets au sol --------------------------------------------------------------

// Pavé isométrique : dessus, face avant (+y), flanc (+x)
function pave(t, x, y, z, dx, dy, dz, textures, id) {
  // Une couleur unie est acceptée à la place d'une fonction de texture
  const [dessus, avant, flanc] = ['dessus', 'avant', 'flanc'].map((k) =>
    typeof textures[k] === 'function' ? textures[k] : () => textures[k])
  face(t, [x, y + dy, z + dz], X, Zbas, dx, dz, avant, id)
  face(t, [x + dx, y, z + dz], Y, Zbas, dy, dz, flanc, id)
  face(t, [x, y, z + dz], X, Y, dx, dy, dessus, id)
}

function rubik(t, x, y, id) {
  const coul = ['#e83b3b', '#ffffff', '#2b7de9', '#ffd84a', '#4fd06a', '#ff8a1f'].map(rgb)
  const grille = (decal, sombre) => (a, b) => {
    if (a % 2 < 0.5 || b % 2 < 0.5) return NOIR
    const i = (Math.floor(a / 2) * 3 + Math.floor(b / 2) + decal) % 6
    return sombre ? ombre(coul[i], sombre) : coul[i]
  }
  pave(t, x, y, 0, 6.5, 6.5, 6.5, { dessus: grille(0, 0), avant: grille(2, 0.15), flanc: grille(4, 0.35) }, id)
}

function tabouret(t, x, y, id) {
  const pied = rgb('#9aa0a6')
  const assise = rgb('#e8402a')
  pave(t, x + 3, y + 3, 0, 2, 2, 10, { dessus: pied, avant: pied, flanc: ombre(pied, 0.3) }, id)
  pave(t, x, y, 10, 8, 8, 3, { dessus: clair(assise, 0.15), avant: assise, flanc: ombre(assise, 0.3) }, id)
}

// --- Bornes ---------------------------------------------------------------------

function positionsBornes(n) {
  const total = n * BORNE_L + (n - 1) * ECART
  const depart = Math.round(LX / 2 - total / 2)
  return Array.from({ length: n }, (_, i) => depart + i * (BORNE_L + ECART))
}

function borne(t, x0, jeu, { active, joue, clignote }, id) {
  const y0 = BORNE_Y0
  const { corps: corpsHex, art } = styleBorne(jeu)
  const corps = rgb(corpsHex)
  const coul = rgb(art)
  const icone = ICONES[jeu.slug] ?? ICONE_DEFAUT

  // Les arêtes du profil (avant), du bas vers le haut : face visible si sa
  // normale regarde vers le spectateur (+y, +z).
  for (let i = 1; i < PROFIL.length - 1; i++) {
    const [ya, za] = PROFIL[i]
    const [yb, zb] = PROFIL[i + 1]
    const dy = yb - ya
    const dz = zb - za
    if (dz - dy <= 0) continue
    const lv = Math.hypot(dy, dz)
    const v = [0, dy / lv, dz / lv]
    // Origine en haut de l'arête pour que b descende (sprites à l'endroit)
    const o = [x0, y0 + yb, zb]
    const vBas = [0, -v[1], -v[2]]
    let tex
    if (i === 1) {
      // Caisson : monnayeur et bandes de couleur
      tex = (a, b) => {
        if (a < 2 || a >= BORNE_L - 2) return coul
        if (a >= 8 && a < 16 && b >= 3 && b < 9) {
          if (a < 9 || a >= 15 || b < 4 || b >= 8) return rgb('#4a4846')
          if ((a >= 10 && a < 11) || (a >= 13 && a < 14)) return b >= 5 && b < 7 ? rgb('#ff3b3b') : rgb('#2a0d0d')
          return rgb('#1a1918')
        }
        return corps
      }
    } else if (i === 3) {
      tex = () => rgb('#1f1e1d')
    } else if (i === 4) {
      // Pupitre : joystick et trois boutons
      tex = (a, b) => {
        const ia = Math.floor(a)
        if (b > 2 && b < 4.5) {
          if (ia === 5 || ia === 6) return rgb('#d42020')
          if (ia === 13) return rgb(NEON.jaune)
          if (ia === 16) return rgb(NEON.cyan)
          if (ia === 19) return rgb(NEON.rose)
        }
        return rgb('#4a4846')
      }
    } else if (i === 5) {
      // Écran incliné : cadre, fond vert, lignes de balayage, icône
      const W = BORNE_L
      tex = (a, b) => {
        if (a < 2 || a >= W - 2 || b < 1.5 || b >= lv - 1) return rgb('#1a1918')
        const ia = a - 2
        const ib = b - 1.5
        const ic = spriteTex(icone, { X: corps, W: BLANC, B: rgb('#111111') }, (W - 4 - icone[0].length) / 2, 0.5)(ia, ib)
        let fond = active ? rgb('#1d4644') : rgb('#10201f')
        if (Math.floor(ib) % 2 === 1) fond = ombre(fond, 0.35)
        if (ic) return active ? ic : ombre(ic, 0.45)
        // Barre « PRESS START » clignotante ou coche verte
        if (ib >= 9 && ib < 10) {
          if (joue) return fond
          if (active && clignote && ia >= 3 && ia < W - 7) return rgb(NEON.jaune)
        }
        return fond
      }
    } else if (i === 7) {
      // Fronton lumineux, icône en noir
      tex = (a, b) => {
        const ic = spriteTex(icone, { X: NOIR, W: NOIR, B: coul }, (BORNE_L - icone[0].length) / 2, 0.5)(a, b)
        if (ic) return ic
        const base = active ? clair(coul, 0.25) : coul
        return b < 2 ? clair(base, 0.35) : base
      }
    } else {
      // Dessus
      tex = () => ombre(corps, 0.25)
    }
    face(t, o, X, vBas, BORNE_L, lv, tex, id)

    // Coche « joué aujourd'hui » posée sur l'écran
    if (i === 5 && joue) {
      const [sx, sy] = proj(x0 + BORNE_L - 8, y0 + 14, 36)
      spriteEcran(t, sx, sy, COCHE, { X: rgb(NEON.vert) }, id)
    }
  }

  // Flanc droit (plan x = x0 + L) : couleur du caisson, grande bande de
  // décor en diagonale, plinthe sombre
  const flanc = ombre(corps, 0.18)
  const decor = ombre(coul, 0.1)
  const xf = x0 + BORNE_L
  for (let y = 0; y < 21; y += 0.5) {
    for (let z = 0; z < 60; z += 0.5) {
      if (!dansPolygone(PROFIL, y + 0.25, z + 0.25)) continue
      const d = (y * 0.8 + z) % 22
      let c = d < 5 ? decor : d < 6 ? rgb('#141418') : flanc
      if (z < 3) c = rgb('#141418')
      const [sx, sy] = proj(xf, y0 + y, z)
      poser(t, sx, sy, c, id)
    }
  }

  // Manche du joystick : petite boule qui dépasse du pupitre
  const [jx, jy] = proj(x0 + 5.5, y0 + 18.5, 32)
  spriteEcran(t, jx - 1, jy - 4, ['.RR', 'RRR', '.G.', '.G.'], { R: rgb('#e8402a'), G: rgb('#bbbbbb') }, id)
}

// Enveloppe des bornes à l'écran : polygones (en pixels du tampon) pour les
// zones cliquables posées par-dessus le canvas.
export function zonesBornes(n) {
  return positionsBornes(n).map((x0) => {
    const pts = []
    for (const [y, z] of PROFIL) {
      pts.push(proj(x0, BORNE_Y0 + y, z), proj(x0 + BORNE_L, BORNE_Y0 + y, z))
    }
    return enveloppe(pts)
  })
}

// Enveloppe convexe (algorithme de la chaîne monotone)
function enveloppe(points) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const bas = []
  for (const q of p) {
    while (bas.length >= 2 && cross(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop()
    bas.push(q)
  }
  const haut = []
  for (const q of [...p].reverse()) {
    while (haut.length >= 2 && cross(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop()
    haut.push(q)
  }
  return [...bas.slice(0, -1), ...haut.slice(0, -1)]
}

// --- Scène complète ------------------------------------------------------------

// etat : { jeux, selection, joue(slug), clignote, neonAllume, titre }
export function dessinerSalle(ctx, etat) {
  const { jeux, selection, joue, clignote, neonAllume, titre } = etat
  const t = creerTampon()
  const xs = positionsBornes(jeux.length)

  // Fond hors de la pièce : transparent (le cadre HTML porte la couleur)
  const lueurs = xs.map((x0, i) => ({
    x: x0 + BORNE_L / 2,
    y: BORNE_Y0 + 23,
    rx: 15,
    ry: 6,
    c: i === selection ? rgb(styleBorne(jeux[i]).corps) : null,
  })).filter((l) => l.c)

  sol(t, lueurs)
  murs(t)
  enseigne(t, titre, LX / 2 - largeurEnseigne(titre) / 2, neonAllume)
  affiches(t)

  jeux.forEach((jeu, i) => {
    borne(t, xs[i], jeu, { active: i === selection, joue: joue(jeu.slug), clignote }, i + 1)
  })

  // Objets au premier plan
  tabouret(t, 44, 34, 93)
  tabouret(t, 112, 34, 94)
  surSol(t, 8, 64, PLANTE, {
    g: rgb('#2f9a3a'), G: rgb('#46c052'), b: rgb('#8a5a32'), B: rgb('#a26c3e'),
  }, 90)
  rubik(t, 24, 60, 91)
  rubik(t, 128, 62, 92)
  surSol(t, 152, 64, ROBOT, {
    R: rgb('#e83b3b'), W: BLANC, G: rgb('#9aa0a6'), B: rgb('#2b7de9'), Y: rgb('#ffd84a'),
  }, 95)

  contours(t)

  // Flèche au-dessus de la borne active, qui sautille
  if (jeux.length > 0) {
    const [fx, fy] = proj(xs[selection] + BORNE_L / 2, BORNE_Y0 + 9, 60)
    spriteEcran(t, Math.round(fx) - 3, Math.round(fy) - (clignote ? 12 : 10), FLECHE, { X: rgb(NEON.jaune) })
  }

  ctx.putImageData(new ImageData(t.px, LARGEUR, HAUTEUR), 0, 0)
}
