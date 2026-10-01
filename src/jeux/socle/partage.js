// SITE_URL dupliqué depuis scripts/share-previews.js (côté Node, non
// importable dans le bundle navigateur), comme dans src/suivre/suivreText.js.
const SITE_URL = 'https://misran-labs.vercel.app'

// 10 cases : round(score/10) 🟩 puis ⬜ (D7).
export function barreEmoji(score) {
  const pleines = Math.max(0, Math.min(10, Math.round(score / 10)))
  return '🟩'.repeat(pleines) + '⬜'.repeat(10 - pleines)
}

// Une décimale, virgule en fr, point en en (D8).
export function texteScoreAvecUnite(score, lang) {
  const valeur = (Math.round(score * 10) / 10).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
  return `${valeur} %`
}

// Forme commune du texte de partage (D7) :
// Le geste parfait n° 12 ◎
// Cercle : 94,3 %
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜
// 🔥 5 jours
// misran-labs.vercel.app/jeux/geste-parfait
export function construireTextePartage({ titreJeu, numero, icone, ligneScore, score, jours, slug }) {
  const domaine = SITE_URL.replace(/^https?:\/\//, '')
  const lignes = [`${titreJeu} n° ${numero} ${icone}`, ligneScore, barreEmoji(score)]
  if (jours > 0) {
    lignes.push(`🔥 ${jours} jour${jours === 1 ? '' : 's'}`)
  }
  lignes.push(`${domaine}/jeux/${slug}`)
  return lignes.join('\n')
}

// navigator.share sur mobile si disponible, sinon copie dans le
// presse-papiers. Retourne la méthode utilisée pour que l'appelant puisse
// afficher « Copié ✓ ».
export async function partager(texte) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text: texte })
      return 'partage'
    } catch {
      // annulé par la personne, ou API indisponible malgré sa présence :
      // on retombe sur la copie.
    }
  }
  try {
    await navigator.clipboard.writeText(texte)
    return 'copie'
  } catch {
    return 'echec'
  }
}
