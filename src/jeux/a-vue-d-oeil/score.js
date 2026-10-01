// Score et classification de l'écart (D4). Les types « à compter » (bocal,
// ciel, foule, allumettes) utilisent un écart relatif ; le type « pois »
// (pourcentage) utilise un écart absolu en points, déjà dans la même unité
// qu'un pourcentage, donc comparable aux mêmes seuils.
export function calculerEcart(type, valeur, reponse) {
  if (type.id === 'pois') return Math.abs(reponse - valeur)
  return valeur === 0 ? 0 : Math.abs(reponse - valeur) / valeur
}

export function calculerScore(type, valeur, reponse) {
  const ecart = calculerEcart(type, valeur, reponse)
  if (type.id === 'pois') return Math.max(0, 100 - 2 * ecart)
  return Math.max(0, 100 * (1 - ecart))
}

// Écart affiché (D6, D7) : déjà en points pour « pois », converti en
// pourcentage pour les autres.
export function ecartAffichagePourcent(type, valeur, reponse) {
  const ecart = calculerEcart(type, valeur, reponse)
  return type.id === 'pois' ? ecart : ecart * 100
}

export function emojiEcart(type, valeur, reponse) {
  const seuil = ecartAffichagePourcent(type, valeur, reponse)
  if (seuil <= 5) return '🎯'
  if (seuil <= 15) return '🟩'
  if (seuil <= 35) return '🟨'
  return '🟥'
}

// Pas de flèche en cas d'égalité exacte : 🎯 suffit à le signaler (D4).
export function flecheEcart(reponse, valeur) {
  if (reponse === valeur) return ''
  return reponse < valeur ? '⬆️' : '⬇️'
}
