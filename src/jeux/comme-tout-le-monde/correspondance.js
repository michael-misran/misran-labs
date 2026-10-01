// Normalisation et correspondance des réponses saisies (D4). Fonctions
// pures, sans dépendance, aucune IA ni service externe : testées depuis Node
// par missions/jeux-majorite/verifier-questions.mjs.
const ARTICLES = {
  fr: ['le', 'la', 'les', "l'", 'un', 'une', 'des', 'du', 'de', 'mon', 'ma', 'mes', 'son', 'sa', 'ses'],
  en: ['the', 'a', 'an', 'my', 'his', 'her', 'their'],
}

// Minuscules, sans accents, sans ponctuation, sans article en tête, espaces
// fusionnés, puis un seul « s » ou « x » final retiré (D4).
export function normaliser(texte, lang = 'fr') {
  let t = texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const mots = t.split(' ').filter(Boolean)
  const articles = ARTICLES[lang] ?? ARTICLES.fr
  if (mots.length > 0) {
    if (articles.includes(mots[0])) {
      mots.shift()
    } else if (lang === 'fr' && mots[0].startsWith("l'") && mots[0].length > 2) {
      mots[0] = mots[0].slice(2)
    }
  }
  t = mots.join(' ')

  if (t.length > 1 && (t.endsWith('s') || t.endsWith('x'))) {
    t = t.slice(0, -1)
  }
  return t
}

// Distance de Levenshtein classique (programmation dynamique).
export function distanceLevenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const lignes = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) lignes[i][0] = i
  for (let j = 0; j <= n; j++) lignes[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cout = a[i - 1] === b[j - 1] ? 0 : 1
      lignes[i][j] = Math.min(lignes[i - 1][j] + 1, lignes[i][j - 1] + 1, lignes[i - 1][j - 1] + cout)
    }
  }
  return lignes[m][n]
}

// Tolérance (D4) : 1 de distance, 2 si le synonyme normalisé fait 8
// caractères ou plus.
function seuilTolere(synonymeNormalise) {
  return synonymeNormalise.length >= 8 ? 2 : 1
}

// Cherche la réponse de `reponses` (tableau D2 d'une question) qui
// correspond le mieux à `saisie`. Retourne l'index trouvé, ou -1. En cas
// d'ambiguïté : distance la plus faible, puis le % le plus élevé (D4).
export function trouverReponse(saisie, reponses, lang = 'fr') {
  const saisieNormalisee = normaliser(saisie, lang)
  if (saisieNormalisee === '') return -1

  let meilleur = null
  reponses.forEach((reponse, index) => {
    for (const synonyme of reponse[lang] ?? []) {
      const synonymeNormalise = normaliser(synonyme, lang)
      const distance = distanceLevenshtein(saisieNormalisee, synonymeNormalise)
      if (distance > seuilTolere(synonymeNormalise)) continue
      if (!meilleur || distance < meilleur.distance || (distance === meilleur.distance && reponse.pct > meilleur.pct)) {
        meilleur = { index, distance, pct: reponse.pct }
      }
    }
  })

  return meilleur ? meilleur.index : -1
}
